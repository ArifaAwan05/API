import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, { body: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment', error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/comments/${commentId}`,
         { body: editCommentText });
      setComments(comments.map(comment => comment.id === commentId ? { ...comment, body: editCommentText } : comment));
      setEditingCommentId(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Error editing comment', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/comments/${commentId}`);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment', error);
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <div className="comment-form">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div className="comments-list">
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          {editingCommentId === comment.id ? (
           <div className="comment-edit">
              <textarea
                value={editCommentText}
                onChange={(e) => setEditCommentText(e.target.value)}
              />
             
              <button onClick={() => handleEditComment(comment.id)}>Save</button>
              <button onClick={() => setEditingCommentId(null)}>Cancel</button>
          </div>

          ) : (
            <>
              <p>{comment.body}</p>
              <button onClick={() => { setEditingCommentId(comment.id); setEditCommentText(comment.body); }}>Edit</button>
              <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default Comment;
