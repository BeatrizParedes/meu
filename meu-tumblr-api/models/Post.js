// Arquivo: models/Post.js

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

// ✅ Verifique se esta linha está exatamente assim no final do seu arquivo
module.exports = mongoose.model('Post', PostSchema);