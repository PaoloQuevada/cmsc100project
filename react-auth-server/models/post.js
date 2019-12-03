const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema);