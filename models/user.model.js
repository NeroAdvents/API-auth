const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);



//save user to db
User.addUser = function(user, callback){
    bcrypt.genSalt(10, (err, salt)=>{
        if (err){
            callback('server error 1');
        }else {
            console.log(user);
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if (err){
                    callback('server error 2');
                }else {
                    user.password = hash;
                    user.save((err, result)=>{
                        if(err){
                            console.log(err);
                            return callback('Failed to add', null);
                        } else {
                            callback(null, "user added");
                        }
                    })
                }
            })
        }
    });

};

User.checkUser = function (username, password , callback) {
    User.findOne({username: username}, (err, user)=> {
        if (err){
            console.log(err);
            callback('server error 1');
        }else if(!user || !user.username) {
            callback('user not found');
        } else{
            bcrypt.compare(password, user.password, (err, res) => {
                if(err){
                    callback('server error 2');
                }else if(res){
                    callback(null, 'login successfully');
                }else{
                    callback('login info incorrect');
                }
            })
        }
    })
};

module.exports = User;