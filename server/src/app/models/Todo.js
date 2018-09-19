const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide your name']
    },
    completed: Boolean,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
