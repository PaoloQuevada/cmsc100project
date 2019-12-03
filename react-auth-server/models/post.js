const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true }
})

PostSchema.pre('save', function(next) {
  return next();
})

module.exports = mongoose.model('Post', PostSchema);
