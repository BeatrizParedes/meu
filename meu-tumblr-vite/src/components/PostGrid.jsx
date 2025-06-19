import React from 'react';
import Post from './Post.jsx';
import styles from './PostGrid.module.css';

function PostGrid({ posts, onDeletePost }) {
  if (!posts || posts.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Nenhum post para exibir. Adicione um!</p>;
  }

  return (
    <div className={styles.postGrid}>
      {posts.map(post => (
        <Post key={post._id} post={post} onDelete={onDeletePost} />
      ))}
    </div>
  );
}

export default PostGrid;