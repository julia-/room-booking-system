import api from './init'

export function listRooms() {
  return api.get('/rooms')
    .then((res) => res.data)
}

// Function to convert retrieved booking data (as a UTC JS Date object) to a Moment.js object in AEST
const dateAEST = (date) => {
  return momentTimezone(date).tz('Australia/Sydney')
}
