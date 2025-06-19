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
        console.log("Buscando posts na API...");
        const response = await axios.get(API_URL);
        console.log("Posts recebidos:", response.data);
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meus recortes</h1>
      </header>
      <main>
        <PostGrid posts={posts} />
        <PostForm onAddPost={addPost} />
      </main>
    </div>
  );
}

export default App;