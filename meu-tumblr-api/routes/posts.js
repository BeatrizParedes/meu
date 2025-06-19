const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const Post = require('../models/Post');
const upload = require('../middleware/upload');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const { type, textContent } = req.body;

  try {
    if (type === 'text') {
      const newPost = new Post({
        type: 'text',
        content: textContent,
      });
      const post = await newPost.save();
      return res.json(post);
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'Nenhum arquivo de imagem enviado' });
    }

    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const cld_upload_stream = cloudinary.uploader.upload_stream(
          { folder: "mosaico_app" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
      });
    };

    const result = await uploadFromBuffer(req.file.buffer);

    const newPost = new Post({
      type: 'image',
      content: result.secure_url,
      cloudinary_id: result.public_id,
    });

    const post = await newPost.save();
    res.json(post);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no Servidor');
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado para deletar' });
    }
    if (post.type === 'image' && post.cloudinary_id) {
      await cloudinary.uploader.destroy(post.cloudinary_id);
    }

    res.json({ msg: 'Post removido com sucesso' });

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'ID do Post inválido' });
    }
    res.status(500).send('Erro no Servidor');
  }
});


module.exports = router;