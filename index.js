const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const port = 8000;
const app = express();

const config = require('./config');
const userRoute = require('./routes/user.route');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.dbUrl);
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongodb");
});
mongoose.connection.on('error', err => {
    console.log("Error at mongodb: "+ err);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', userRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const server = http.createServer(app);
server.listen(port, ()=>{
    console.log('Server is starting on port '+port);
});