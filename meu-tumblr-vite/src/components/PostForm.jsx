import React, { useState } from 'react';
import axios from 'axios'; 
import styles from './PostForm.module.css';

const API_URL = 'http://localhost:5000/api/posts';

function PostForm({ onAddPost }) {
  const [type, setType] = useState('image');
  const [textContent, setTextContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formData = new FormData();

    if (type === 'image') {
      if (!imageFile) {
        alert('Por favor, selecione uma imagem.');
        setLoading(false);
        return;
      }
      formData.append('type', 'image');
      formData.append('image', imageFile); 
    } else {
      if (!textContent.trim()) {
        alert('Por favor, escreva um texto.');
        setLoading(false);
        return;
      }
      formData.append('type', 'text');
      formData.append('textContent', textContent);
    }
    
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newPostFromApi = response.data;

      onAddPost(newPostFromApi);

    } catch (error) {
      console.error('Erro ao criar o post:', error);
      alert('Houve um erro ao salvar o post.');
    }

    setLoading(false);
    setTextContent('');
    setImageFile(null);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
       <h2 className={styles.title}>Adicionar Novo Post</h2>
       <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="type">Tipo</label>
          <select id="type" value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
            <option value="image">Imagem</option>
            <option value="text">Texto</option>
          </select>
        </div>

        <div className={styles.control}>
          {type === 'image' ? (
            <>
              <label htmlFor="imageUpload">Upload da Imagem</label>
              <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} className={styles.fileInput} disabled={loading} />
            </>
          ) : (
            <>
              <label htmlFor="textContent">Texto</label>
              <input type="text" id="textContent" value={textContent} onChange={(e) => setTextContent(e.target.value)} placeholder="Escreva algo..." disabled={loading} />
            </>
          )}
        </div>
      </div>
      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Salvando...' : 'Adicionar ao Mosaico'}
      </button>
    </form>
  );
}

export default PostForm;