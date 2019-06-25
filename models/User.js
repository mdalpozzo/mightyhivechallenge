const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
  ip: {
    type: String,
    required: true,
  },
  redCount: {
    type: Number,
    required: true,
  },
  blueCount: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
