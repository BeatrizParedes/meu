import React from 'react';
import styles from './Post.module.css';

function Post({ post, onDelete }) {
  const { type, content, _id } = post; 

  return (
    <div className={styles.postContainer}>
      <button className={styles.deleteButton} onClick={() => onDelete(_id)}>
        &times;
      </button>

      <div className={styles.post}>
        {type === 'image' ? (
          <div className={styles.imagePost}>
            <img src={content} alt="Post do usuário" />
          </div>
        ) : (
          <div className={styles.textPost}>
            <p>{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;