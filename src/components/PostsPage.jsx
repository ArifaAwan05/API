import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import './PostsPage.css'

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div className="post-form">
      <h1>Posts</h1>
      <div className='items'>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      /><br/>
      <textarea
        placeholder="Content"
        value={newPost.body}
        onChange={(e) => setNewPost( { ...newPost, body: e.target.value  }
        )}
      /><br/>
      </div>
      <button onClick={handleCreatePost}>Create Post</button>
      {posts.map(post => (
        <Post key={post.id} post={post} />
        
      ))}
      
      </div>

  );
};

export default PostsPage;
