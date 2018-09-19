var User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.listAll = function (req, res) {
    User.find({}, (error, users) => {
        res.type("json");
        res.send(users);
    })
}

exports.auth = function(req, res) {
    const body = req.body;
    User.find({}, (error, users) => {
        const user = users.find(user => user.username == body.username);
        if(!user || body.password != 'todo') {
            return res.sendStatus(401);
        }
        var token = jwt.sign({userID: user.id}, 'todo-app-super-shared-secret', {expiresIn: '2h'});
        res.send({token});
    })
}