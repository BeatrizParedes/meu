import React from 'react';
import styles from './Post.module.css';

function Post({ type, content, size }) {
  const sizeClass = styles[size] || styles.medium;
  
  const postClasses = `${styles.post} ${sizeClass}`;

  if (type === 'image') {
    return (
      <div className={`${postClasses} ${styles.imagePost}`}>
        <img src={content} alt="Post do usuário" />
      </div>
    );
  }

  if (type === 'text') {
    return (
      <div className={`${postClasses} ${styles.textPost}`}>
        <p>{content}</p>
      </div>
    );
  }

  return null;
}

export default Post;