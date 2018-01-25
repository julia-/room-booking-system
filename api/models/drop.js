const Room = require('./Room')
const User = require('./User')

Room.deleteMany()
  .then(() => {
    console.log('Deleted rooms')
    process.exit()
  })

User.deleteMany()
  .then(() => {
    console.log('Deleted users')
    process.exit()
  })