//model for Mongodb
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Create Schema
const IdeaSchema = new schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  }
});

mongoose.model('ideas', IdeaSchema);