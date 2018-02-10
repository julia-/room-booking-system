const express = require('express')
const {
  signUp,
  signIn,
  signInWithGoogle,
  redirectByGoogle,
  signJWTForUser
} = require('../middleware/auth')

const router = new express.Router()

// Sign up
router.post('/auth/sign-up', signUp, signJWTForUser)

// Sign in
router.post('/auth', signIn, signJWTForUser)

router.get('/auth/google', signInWithGoogle)

// Callback after google has authenticated the user
router.get('/auth/google/redirect', redirectByGoogle)

module.exports = router
