const express = require('express')
const {
  signUp,
  signIn,
  signJWTForUser
} = require('../middleware/auth')

const router = new express.Router()

// Sign up
router.post('/auth/sign-up', signUp, signJWTForUser)

// Sign in
router.post('/auth', signIn, signJWTForUser)

module.exports = router
