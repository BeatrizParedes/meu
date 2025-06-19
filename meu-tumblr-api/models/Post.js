const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cloudinary_id: {
    type: String, 
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);