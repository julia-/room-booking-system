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
