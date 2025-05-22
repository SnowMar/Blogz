import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Card, CardContent, CardMedia, Typography,
  Button, Box, Alert, Fab, Avatar, Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const fetchPosts = useCallback(async (pageToFetch, isInitial = false) => {
    if (loading) return; // Prevent multiple simultaneous requests

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/posts/?page=${pageToFetch}`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });

      const newPosts = response.data.results;

      if (isInitial) {
        setPosts(newPosts);
        setPage(2);
      } else {
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
      }

      setHasMore(response.data.next !== null);
      setError('');
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response?.status === 401) {
        setError('Please log in to view posts');
      } else {
        setError('Failed to fetch posts. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [token, loading]);

  // Initial load
  useEffect(() => {
    fetchPosts(1, true);
  }, [token]);

  // Function for infinite scroll
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchPosts(page);
    }
  }, [page, loading, hasMore, fetchPosts]);

  const handleDelete = async (postId) => {
    if (!token) {
      setError('Please log in to delete posts');
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.id !== postId));
      setError('');
    } catch (error) {
      console.error('Error deleting post:', error);
      if (error.response?.status === 401) {
        setError('Please log in to delete posts');
      } else if (error.response?.status === 403) {
        setError('You are not authorized to delete this post');
      } else {
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = (postId) => {
    if (!token) {
      setError('Please log in to edit posts');
      return;
    }
    navigate(`/edit-post/${postId}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', pt: 4, pb: 12 }}>
      <Container maxWidth="md">
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        )}

        <InfiniteScroll
          dataLength={posts.length}
          next={loadMore}
          hasMore={hasMore && !loading}
          loader={
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="textSecondary">
                Loading more posts...
              </Typography>
            </Box>
          }
          endMessage={
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {posts.length === 0 ? 'No posts available' : 'No more posts to load'}
              </Typography>
            </Box>
          }
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              sx={{
                mb: 4,
                borderRadius: 4,
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12)'
                }
              }}
            >
              {post.imgUrl && (
                <CardMedia
                  component="img"
                  height="300"
                  image={post.imgUrl}
                  alt={post.title}
                  sx={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    objectFit: 'cover'
                  }}
                />
              )}
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: 'primary.main',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    {post.author.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {post.author.username}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <TimeIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.created_at)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  component="h2"
                  fontWeight={700}
                  sx={{
                    mb: 2,
                    lineHeight: 1.3,
                    color: 'text.primary'
                  }}
                >
                  {post.title}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    mb: 3,
                    lineHeight: 1.6
                  }}
                >
                  {post.content.length > 200
                    ? `${post.content.substring(0, 200)}...`
                    : post.content
                  }
                </Typography>

                {user && post.author.username === user.username && (
                  <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(post.id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(post.id)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          ))}
        </InfiniteScroll>
        {user && (
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 64,
              height: 64,
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/create-post')}
          >
            <AddIcon sx={{ fontSize: 28 }} />
          </Fab>
        )}
      </Container>
    </Box>
  );
};
export default Home;