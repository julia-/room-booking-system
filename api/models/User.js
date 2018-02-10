const mongoose = require('./init')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, index: true }
})

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameLowerCase: true,
  session: false
})

const User = (module.exports = mongoose.model('User', userSchema))
