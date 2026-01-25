"use client";

import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Paper
} from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);

    // Validate inputs
    if (!email?.trim()) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later');
      } else {
        setError('Failed to sign in. Please try again');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            ← Back
          </Button>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              background: 'linear-gradient(90deg, orange, blue, red)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            GVTCards
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: 4
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={8}
            sx={{
              borderRadius: 3,
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(120deg, orange, blue, red)',
                py: 3,
                textAlign: 'center'
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}
              >
                Sign in to continue to GVTCards
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ mb: 2 }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ mb: 3 }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSignIn();
                  }
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                disabled={loading}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  mb: 2,
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                  }
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/sign-up"
                    style={{
                      color: '#667eea',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
