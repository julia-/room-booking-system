const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')
const timestamps = require('mongoose-timestamp')

// developer used typescript so they export "default"
const { default: findOneOrCreate } = require('mongoose-findoneorcreate')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, index: true },
  googleId: { type: String, index: true },
  googleTokens: {
    refreshToken: String,
    accessToken: String
  }
})

userSchema.plugin(timestamps)
userSchema.plugin(findOneOrCreate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = (module.exports = mongoose.model('User', userSchema))
