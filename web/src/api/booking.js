import moment from 'moment'
import momentTimezone from 'moment-timezone'
import axios from 'axios'


// Functions to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const bookStartDate = (dataArray) => {
  // Save as Date object in UTC
  let startDate = moment(dataArray).toDate()
  return startDate
}






