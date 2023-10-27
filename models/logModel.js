const mongoose = require('mongoose');

const logEntrySchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const logSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  log: [logEntrySchema],
});

const Log = mongoose.model('log', logSchema);

module.exports = Log;
