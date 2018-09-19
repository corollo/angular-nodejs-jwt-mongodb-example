const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const mongoose = require("mongoose");

// controllers
const userController = require("./src/app/controllers/userController");
const todoController = require("./src/app/controllers/todoController");

const app = express()
mongoose.connect('mongodb://localhost/node-js-blog')

app.use(bodyParser.json());
app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/api/auth','/']}));

app.get('/', function (req, res) {
    res.send('Angular JWT Todo API Server')
});


/**
 * @api {post} /api/auth User authentication
 * @apiVersion 1.0.0
 * @apiName AuthUser
 * @apiGroup User
 * @apiPermission none
 *
 * @apiDescription Perform the user autentication on mongodb.
 *
 * @apiParam {String} username The username of the user.
 * @apiParam {String} password The password of the user.
 *
 * @apiExample Example usage:
 * {
 *   "username": "admin",
 *   "password": "todo",
 * }
 * @apiError NoAccessRight Only authenticated Users can access the data.
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 */
app.post('/api/auth', userController.auth);

/**
 * @api {get} /api/users User list
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup User
 * @apiPermission private
 *
 * @apiDescription Get the user list from mongodb.
 *
 * @apiError NoAccessRight Only authenticated Users can access the data.
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 */
app.get('/api/users', userController.listAll);

/**
 * @api {get} /api/todos Todo list
 * @apiVersion 1.0.0
 * @apiName GetTodos
 * @apiGroup Todo
 * @apiPermission private
 *
 * @apiDescription Get the todo list of the specific user from mongodb.
 *
 * @apiError NoAccessRight Only authenticated Users can access the data.
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 */
app.get('/api/todos', todoController.listAll);

/**
 * @api {get} /api/todos/:id Todo item detail
 * @apiVersion 1.0.0
 * @apiName GetTodoDetail
 * @apiGroup Todo
 * @apiPermission private
 *
 * @apiDescription Get the todo item detail from mongodb.
 *
 * @apiError NoAccessRight Only authenticated Users can access the data.
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 */
app.get('/api/todos/:id', todoController.detail);


// start the server
app.listen(4000, function () {
    console.log('Angular JWT Todo API Server listening on port 4000!')
});
