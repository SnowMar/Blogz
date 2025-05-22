import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    imgUrl: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8000/api/posts/', post);
      navigate('/');
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    }
  };

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />
          <TextField
            fullWidth
            label="Image URL"
            name="imgUrl"
            value={post.imgUrl}
            onChange={handleChange}
            margin="normal"
            placeholder="Enter image URL (optional)"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 3 }}
          >
            Create Post
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePost; 