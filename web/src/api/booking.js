import moment from 'moment'
import momentTimezone from 'moment-timezone'
import axios from 'axios'
import api from './init'


// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const dateUTC = (dataArray) => {
  // Save as Date object in UTC
  return moment(dataArray).toDate()
}

// Function to convert retrieved booking data (as a UTC JS Date object) to a Moment.js object in AEST
const dateAEST = (date) => {
  return momentTimezone(date).tz('Australia/Sydney')
}

// Make a room booking
export function makeBooking(data) {
  return api.put(`/rooms/${data.id}`, {
    bookingStart: dateUTC(data.startDate),
    bookingEnd: dateUTC(data.endDate),
    businessUnit: data.businessUnit,
    purpose: data.purpose
  })
    .then((res) => res.data)
}
