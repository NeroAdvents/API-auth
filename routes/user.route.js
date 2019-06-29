const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

router.post('/users', (req, res)=>{

    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(user, (err, result)=>{
        if (err){
            return res.json({success:false, message: err});
        }
        return res.json({success:true, message: result});
    });
});

router.get('/users', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(401);
        } else {
            User.find({}, function(err, users){
                if(err){
                    res.send("Server errors");
                    next();
                }
                console.log(users);
                let sortedUsers = users.sort((a, b)=>{
                    return a.username > b.username;
                });
                res.json(sortedUsers);
            })
        }
    });
});

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['auth'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(401);
    }
}

router.post('/users/connect', (req, res)=>{
    User.checkUser(req.body.username, req.body.password, (err, result)=>{
        if (err){
            console.log(err);
            return res.json({success:false, message:err});
        }
        jwt.sign({username:req.body.username}, 'secretkey', (err, token)=>{
            expiresIn: 42,
            res.json({
                token
            });
        });
    });
});

router.delete('/users/:username', (req, res)=>{
    User.remove({username:req.params.username}, function(err){
        if (err){
            res.send(err);
        }else{
            res.json({message: "User deleted!"});
        }
    });
});
module.exports = router;