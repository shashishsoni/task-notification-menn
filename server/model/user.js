const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
  versionKey: false
});

// Drop existing indexes before creating new ones
const User = mongoose.model('User', userSchema);
User.collection.dropIndexes().catch(err => console.log('No indexes to drop'));

module.exports = User;