import React from 'react';
import Post from './Post.jsx';
import styles from './PostGrid.module.css';

function PostGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <p style={{ textAlign: 'center' }}>Nenhum post para exibir. Adicione um!</p>;
  }

  return (
    <div className={styles.postGrid}>
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default PostGrid;