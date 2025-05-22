import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Article as ArticleIcon, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <ArticleIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: '0.5px'
            }}
            onClick={() => navigate('/')}
          >
            BlogPost
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <AccountCircle sx={{ mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.username}
                </Typography>
              </Box>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  mr: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate('/register')}
                sx={{
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;