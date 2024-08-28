import React, { useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import './Post.css'


const Post = ({ post }) => {
  const [editing, setEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(post);

  const handleUpdatePost = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost);
      setEditing(false);
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
      // Optionally handle the removal from the state
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <div className='post'>
       
      {editing ? (
        <div className='post-edit'>
          <input
            type="text"
            value={updatedPost.title}
            onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
          />
          <textarea
            value={updatedPost.body}
            onChange={(e) => setUpdatedPost({ ...updatedPost, body: e.target.value })}
          />
          <button onClick={handleUpdatePost}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <div className="post-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDeletePost}>Delete</button>
          </div>
        </>
      )}
      <Comment postId={post.id} />
    </div>
   
  );
};

export default Post;
