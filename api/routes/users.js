const express = require('express')
const User = require('../models/User')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/users/:id', requireJWT, (req, res) => {
  const { id } = req.params
  User.findById(id)
    .then(user => {
      res.json(user)
    })
    .catch(error => {
      res.json({ error })
    })
})

module.exports = router
