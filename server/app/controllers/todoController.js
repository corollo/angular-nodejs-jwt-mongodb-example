var Todo = require('../models/Todo');
const _ = require('lodash');


// Display list of all Post
exports.listAll = function(req, res) {
    var userID = req.user.userID;
    Todo.find({"user_id": userID }, (error, todos) => {
        res.type("json");
        console.log(todos);
        res.send(todos);
    });
};

exports.detail = function (req, res) {
    var todoID = req.params.id;
    Todo.findById(todoID, (error, todo) => {
        res.type("json");
        res.send(todo);
    });
}


