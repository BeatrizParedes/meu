import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PostGrid from './components/PostGrid.jsx';
import PostForm from './components/PostForm.jsx';

const API_URL = 'http://localhost:5000/api/posts';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(API_URL);
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar os posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const addPost = (newPostFromApi) => {
    setPosts(prevPosts => [newPostFromApi, ...prevPosts]);
  };

  const handleDeletePost = async (id) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir este post?')) {
        await axios.delete(`${API_URL}/${id}`);
        setPosts(posts.filter(post => post._id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar o post:', error);
      alert('Não foi possível excluir o post.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meus recortes</h1>
      </header>
      <main>
        <PostGrid posts={posts} onDeletePost={handleDeletePost} />
        <PostForm onAddPost={addPost} />
      </main>
    </div>
  );
}

export default App;