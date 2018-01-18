const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJWT = require('passport-jwt')
const PassportGoogle = require('passport-google-oauth20')
const User = require('../models/User')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtExpiresIn = process.env.JWT_EXPIRES_IN

const googleClientId = process.env.GOOGLE_CLIENT_ID
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL

passport.use(User.createStrategy())

const signUp = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error)
      return
    }
  })

  req.user = user
  next()
}

passport.use(
  new PassportGoogle.Strategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackURL
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value
      // check if user already exists in the database
      // create user record if not
      User.findOneAndUpdate(
        { email },
        {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName
        },
        {
          new: true,
          upsert: true,
          runValidators: true
        }
      )
        .then(currentUser => {
          done(null, currentUser)
        })
        .catch(error => {
          console.error('Error', error)
          done(error, false)
        })
    }
  )
)

const signJWTForUser = (req, res) => {
  const user = req.user
  const token = JWT.sign(
    {
      email: user.email
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  res.json({ token })
}

const googleSignJWTRedirectToApp = (req, res) => {
  const user = req.user
  const token = JWT.sign(
    {
      email: user.email
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )
  // Redirects to app with token from google auth process
  res.redirect(`${process.env.APP_URL}/?token=${token}`)
}

passport.use(
  new PassportJWT.Strategy(
    {
      jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
      algorithms: [jwtAlgorithm]
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then(user => {
          if (user) {
            done(null, user)
          } else {
            done(null, false)
          }
        })
        .catch(error => {
          done(error, false)
        })
    }
  )
)

module.exports = {
  initialize: passport.initialize(),
  signUp,
  signIn: passport.authenticate('local', { session: false }),
  signInWithGoogle: passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  }),
  redirectByGoogle: passport.authenticate('google', {
    session: false
  }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser,
  googleSignJWTRedirectToApp
}
