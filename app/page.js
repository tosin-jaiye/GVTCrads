'use client'

import { useState } from 'react'
import { Box, Button, Grid, Typography, AppBar, Toolbar, Container } from '@mui/material'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '/firebase'

// Disable static generation for this page since it uses Firebase auth
export const dynamic = 'force-dynamic'

export default function Home() {
  const [showLearnMore, setShowLearnMore] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  const handleLearnMoreClick = () => {
    setShowLearnMore(!showLearnMore)
  }

  const handleContactUs = () => {
    window.location.href = 'mailto:badewolegoodluck55@gmail.com';
  }

  const handleSignOut = () => {
    signOut(getAuth())
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              background: 'linear-gradient(90deg, orange, blue, red)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            GVTCards
          </Typography>
          {!user ? (
            <>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleSignOut}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: 3,
            my: 4
          }}
        >
          {!user ? (
            <>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  background: 'linear-gradient(120deg, orange, blue, red)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Welcome to GVTCards
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                The easiest way to enhance your knowledge from just a simple text.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href="/generate"
                  sx={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  Try Demo
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLearnMoreClick}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  {showLearnMore ? 'Hide Details' : 'Learn More'}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  background: 'linear-gradient(120deg, orange, blue, red)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  mb: 2
                }}
              >
                Thank you for choosing GVTCards!
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                We are thrilled to have you back! Dive into your flashcards and continue your learning journey.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  href="/generate"
                  sx={{
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
                    }
                  }}
                >
                  Start Creating
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={handleLearnMoreClick}
                  sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
                >
                  {showLearnMore ? 'Hide Details' : 'Learn More'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>

      {/* Learn More Section */}
      {showLearnMore && (
        <Container maxWidth="md">
          <Box sx={{ my: 6, textAlign: 'center' }}>
            {!user ? (
              <>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  Learn More
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  GVTCards is designed to simplify the process of learning by allowing users to quickly
                  generate flashcards from their study materials. Whether you are a student preparing
                  for exams, a professional brushing up on skills, or just someone who loves learning,
                  GVTCards offers a seamless experience to create, organize, and review flashcards.
                  With our intuitive design, you can easily input your content, generate flashcards,
                  and access them anytime, anywhere.
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Enjoy free access to all features including cloud storage, AI-powered flashcard generation,
                  and the ability to share your flashcard sets with others. Start learning smarter today!
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                  Welcome Back!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  As a valued member, you are already enjoying all the benefits of GVTCards. Explore features,
                  and maximize your productivity with AI-powered flashcard generation!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                  Your features include enhanced customization options, cloud storage, and seamless organization.
                  Start creating flashcards and enhance your learning experience today!
                </Typography>
              </>
            )}
          </Box>
        </Container>
      )}

      {/* Features Section */}
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 5 }}>
            Features
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 4,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 3,
                textAlign: 'center',
                height: '100%',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                  borderColor: '#667eea',
                },
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Easy Flashcard Creation
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                  Quickly create flashcards by inputting your text, and GVTCards will handle the rest.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 4,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 3,
                textAlign: 'center',
                height: '100%',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                  borderColor: '#667eea',
                },
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Organized Sets
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                  Keep your flashcards organized with easy-to-manage sets and categories.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{
                padding: 4,
                border: '2px solid',
                borderColor: 'primary.main',
                borderRadius: 3,
                textAlign: 'center',
                height: '100%',
                transition: 'all 0.3s ease',
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(102, 126, 234, 0.3)',
                  borderColor: '#667eea',
                },
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Accessible Anywhere
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.7 }}>
                  Access your flashcards from any device, ensuring you are always prepared.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Meet Our Amazing Team Section */}
      {!user && (
        <Container maxWidth="lg">
          <Box sx={{ my: 8, textAlign: 'center', py: 6, background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1) 0%, rgba(245, 87, 108, 0.1) 100%)', borderRadius: 3 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 5 }}>
              Meet Our Amazing Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  height: '100%',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
                    Goodluck Badewole
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    An International Student hailing from Nigeria. Current sophomore studying at AAMU with a major in Computer Science.
                    Goodluck is aspiring to become a data analyst.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  height: '100%',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
                    Vincent
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Vincent is a key member of our development team, contributing extensively to our project&apos;s backend and design elements.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Box sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  background: 'white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s',
                  height: '100%',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  }
                }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#667eea' }}>
                    Tapiwa
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                    Tapiwa specializes in user experience and is responsible for ensuring our platform is both functional and user-friendly.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}

      {/* Contact Us Section */}
      <Container maxWidth="md">
        <Box sx={{ my: 8, textAlign: 'center', py: 6, background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', borderRadius: 3 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
            Have questions or need support? Reach out to us via email and we will get back to you as soon as possible.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleContactUs}
            sx={{
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)',
              }
            }}
          >
            Email Us
          </Button>
        </Box>
      </Container>

      <Box sx={{ pb: 4 }} />
    </>
  )
}
