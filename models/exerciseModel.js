const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const Exercise = mongoose.model('exercise', exerciseSchema);

module.exports = Exercise;
