const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Sign up
router.post(
  '/auth/sign-up',
  authMiddleware.signUp,
  authMiddleware.signJWTForUser
)

// Sign in
router.post(
  '/auth',
  authMiddleware.signIn,
  authMiddleware.signJWTForUser
)

module.exports = router
