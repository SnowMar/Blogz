import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setImgUrl(post.imgUrl || '');
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again.');
      }
    };

    fetchPost();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/posts/${id}/`,
        {
          title,
          content,
          imgUrl: imgUrl || null
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Post
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          margin="normal"
          required
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          label="Image URL (optional)"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
          >
            Update Post
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditPost; 