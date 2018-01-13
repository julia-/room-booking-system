const Room = require('./Room')

Room.deleteMany()
  .then(() => {
    console.log('Deleted rooms')
    process.exit()
  })