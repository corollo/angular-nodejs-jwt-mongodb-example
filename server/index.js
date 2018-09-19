const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const mongoose = require("mongoose");

//controllers
const userController = require("./app/controllers/userController");
const todoController = require("./app/controllers/todoController");

const app = express()
mongoose.connect('mongodb://localhost/node-js-blog')

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth','/']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});
app.post('/api/auth', userController.auth);
app.get('/api/todos', todoController.listAll);
app.get('/api/todos/:id', todoController.detail);
app.get('/api/users', userController.listAll);

app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
