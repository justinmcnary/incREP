let  mongoose = require('mongoose');

//SCHEMA Setup
let reportSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  name: String,
  image: String,
  description: String,
  height: String,
  weight: String,
  age: String,
  sex: String,
  race: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Report', reportSchema);