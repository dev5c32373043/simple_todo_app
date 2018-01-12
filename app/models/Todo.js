const mongoose = require('mongoose');

const schema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: [true, 'title required!'],
    validate: [/^[A-za-z0-9].{2,}/, 'title must begin from letter and greater than or equal three symbols!']
  },
  description: {
    type: String,
    required: [true, 'description required!'],
    validate: [/^[A-za-z0-9].{2,}/, 'description must begin from letter and greater than or equal three symbols!']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Todo', schema);
