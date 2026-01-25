'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  AppBar,
  Toolbar,
  Alert,
  Snackbar,
  CardContent
} from '@mui/material'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, collection, setDoc, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

// Disable static generation for this page since it uses Firebase
export const dynamic = 'force-dynamic'

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [savedFlashcards, setSavedFlashcards] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('Please enter some text to generate flashcards.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        body: text,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate flashcards')
      }

      setFlashcards(data)
      setSuccess('Flashcards generated successfully!')
    } catch (error) {
      console.error('Error generating flashcards:', error)
      setError(error.message || 'An error occurred while generating flashcards. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      setError('Please enter a name for your flashcard set.')
      return
    }

    if (!user) {
      setError('To save flashcards, you need to be signed in.')
      return
    }

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)

      await setDoc(setDocRef, { flashcards })

      setSuccess('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      setError('An error occurred while saving flashcards. Please try again.')
    }
  }

  const handleSearchFlashcards = async () => {
    if (!searchName.trim()) {
      setError('Please enter a name to search.')
      return
    }

    if (!user) {
      setError('To view saved flashcards, you need to be signed in.')
      return
    }

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const flashcardSetsRef = collection(userDocRef, 'flashcardSets')
      const q = query(flashcardSetsRef, where('__name__', '==', searchName))
      const querySnapshot = await getDocs(q)

      if (querySnapshot.empty) {
        setError('No flashcard set found with that name.')
        setSavedFlashcards([])
      } else {
        const setDoc = querySnapshot.docs[0]
        const setData = setDoc.data()
        setSavedFlashcards(setData.flashcards || [])
        setSuccess(`Found flashcard set: ${searchName}`)
      }
    } catch (error) {
      console.error('Error searching flashcards:', error)
      setError('An error occurred while searching flashcards.')
    }
  }

  const handleSignOut = () => {
    const auth = getAuth()
    auth.signOut()
    router.push('/')
  }

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => router.push('/')}
            sx={{ mr: 2 }}
          >
            ← Home
          </Button>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              background: 'linear-gradient(90deg, orange, blue, red)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GVTCards
          </Typography>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.email}
              </Typography>
              <Button color="inherit" onClick={handleSignOut} variant="outlined">
                Sign Out
              </Button>
            </Box>
          ) : (
            <Button color="inherit" onClick={() => router.push('/sign-in')} variant="outlined">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(120deg, orange, blue, red)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            Generate Flashcards
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Enhance your knowledge with AI-powered flashcards!
          </Typography>
        </Box>

        {/* Input Section */}
        <Card sx={{ mb: 4, p: 3 }}>
          <CardContent>
            <TextField
              value={text}
              onChange={(e) => setText(e.target.value)}
              label="Enter your study material"
              placeholder="Paste your notes, textbook content, or any text you want to turn into flashcards..."
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              disabled={loading}
              size="large"
              sx={{ py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Flashcards'}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Flashcards */}
        {flashcards.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h2">
                Your Flashcards ({flashcards.length})
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                  Save Set
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setSearchDialogOpen(true)}>
                  View Saved
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={`flashcard-${index}`}>
                  <Card
                    sx={{
                      height: '250px',
                      display: 'flex',
                      cursor: 'pointer',
                      position: 'relative',
                      perspective: '1000px',
                      '&:hover .card-inner': {
                        transform: 'rotateY(180deg)',
                      },
                    }}
                  >
                    <Box
                      className="card-inner"
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 0.6s',
                      }}
                    >
                      {/* Front of card */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff',
                          borderRadius: 1,
                          p: 3,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                          Question
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            overflow: 'auto',
                            maxHeight: '180px',
                            width: '100%'
                          }}
                        >
                          {flashcard.front}
                        </Typography>
                      </Box>

                      {/* Back of card */}
                      <Box
                        sx={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          backfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f5f5f5',
                          borderRadius: 1,
                          p: 3,
                        }}
                      >
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                          Answer
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            overflow: 'auto',
                            maxHeight: '180px',
                            width: '100%'
                          }}
                        >
                          {flashcard.back}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      {/* Save Flashcards Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Give your flashcard set a memorable name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Flashcard Set Name"
            type="text"
            fullWidth
            variant="outlined"
            value={setName}
            onChange={(e) => setSetName(e.target.value)}
            placeholder="e.g., Biology Chapter 3"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={saveFlashcards} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Search Flashcards Dialog */}
      <Dialog open={searchDialogOpen} onClose={() => setSearchDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>View Saved Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Enter the name of the flashcard set you want to view:
          </DialogContentText>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              autoFocus
              label="Flashcard Set Name"
              type="text"
              fullWidth
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button onClick={handleSearchFlashcards} variant="contained">
              Search
            </Button>
          </Box>

          {savedFlashcards.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Found {savedFlashcards.length} flashcards
              </Typography>
              <Grid container spacing={2}>
                {savedFlashcards.map((flashcard, index) => (
                  <Grid item xs={12} sm={6} key={`saved-${index}`}>
                    <Card
                      sx={{
                        height: '200px',
                        cursor: 'pointer',
                        position: 'relative',
                        perspective: '1000px',
                        '&:hover .card-inner': {
                          transform: 'rotateY(180deg)',
                        },
                      }}
                    >
                      <Box
                        className="card-inner"
                        sx={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.6s',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            p: 2,
                          }}
                        >
                          <Typography variant="body2" sx={{ textAlign: 'center', overflow: 'auto' }}>
                            {flashcard.front}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f5f5f5',
                            p: 2,
                          }}
                        >
                          <Typography variant="body2" sx={{ textAlign: 'center', overflow: 'auto' }}>
                            {flashcard.back}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setSearchDialogOpen(false)
            setSavedFlashcards([])
            setSearchName('')
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={4000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </>
  )
}
