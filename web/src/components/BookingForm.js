import React from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime from 'react-datetime'
import moment from 'moment'
import { formatTime, timeSelectOptions} from '../helpers/bookingForm'


function BookingForm({ onMakeBooking, user, roomData, date, updateCalendar, onShowBooking }) {
  const valid = function(current) {
    return current.day() !== 0
  }

  // Array used for handleData function
  let dateArray = []

  // Update the current date in the application state
  const handleDate = event => {
    updateCalendar(moment(event)._i)
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        // Extract date array from current date in state
        const dateArray = moment(date).format('Y M D').split(' ').map(item => parseInt(item, 10))
        dateArray[1] = dateArray[1] - 1
        // Data from input
        const formData = event.target.elements
        const roomId = roomData._id
        // startDate data
        const startTime = formatTime(formData.startTime.value)
        const startDate = [...dateArray, ...startTime]
        // endDate data
        const endTime = formatTime(formData.endTime.value)
        const endDate = [...dateArray, ...endTime]

        const businessUnit = formData.business.value
        const recurringEnd = [parseInt(formData.year.value), parseInt(formData.month.value), parseInt(formData.day.value)]
        const recurringType = formData.recurring.value 
        let recurringData = []
        // check to see if there is recurring booking data
        if (recurringType !== "none") {
          recurringData = [ recurringEnd, recurringType] } else {
            recurringData = []
          }
        const purpose = formData.purpose.value
        const description = formData.description.value
        onMakeBooking({ startDate, endDate, businessUnit, purpose, roomId, recurringData })
      }}
    >
      <h2>{roomData.name}</h2>
      <div className="date-container">
        <div className="left-container">
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            input={false}
            utc={true}
            isValidDate={valid}
            onChange={event => handleDate(event._d)}
          />
        </div>

        <div className="middle-container">
          <BookingFormTable roomData={roomData} date={date} onShowBooking={onShowBooking} />
        </div>

        <div className="right-container">
          <h3>Make a Booking</h3>
          <div className="time-selector">
            <label>
              {'Start Time: '}
              <select name="startTime">
                {timeSelectOptions.map(option => {return option})}
              </select>
            </label>

            <label>
              {'End Time: '}
              <select name="endTime">
                {timeSelectOptions.map(option => {return option})}
              </select>
            </label>
          </div>
          <label>
            {'Business Unit:'}
            <select name="business" defaultValue="Business Unit 1">
              <option value="Business Unit 1">Business Unit 1</option>
              <option value="Business Unit 2">Business Unit 2</option>
              <option value="Business Unit 3">Business Unit 3</option>
              <option value="Business Unit 4">Business Unit 4</option>
              <option value="Business Unit 5">Business Unit 5</option>
            </select>
          </label>
          <label>
            {'Recurring:'}
            <select name="recurring" defaultValue="none">
              <option value="none">non recurring</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>
          <div className="time-selector">
          <label>
            {'Recurring End Year:'}
            <input name="year"/>
          </label>
          <label>
            {'Recurring End Month:'}
            <input name="month"/>
          </label>
          <label>
            {'Recurring End Day:'}
            <input name="day"/>
          </label>
          </div>
          <label>
            {'Purpose:'}
            <select name="purpose" defaultValue="Scheduled Class">
              <option value="Scheduled Class">Scheduled Class</option>
              <option value="Special Event">Special Event</option>
              <option value="Ad-hoc Event">Ad-hoc Event</option>
            </select>
          </label>
          <div className="time-selector">
            <label>
              {'Description'}
              <input type="textarea" name="description" />
            </label>
          </div>
          <button className="custom-button filter-button">Submit</button>
        </div>
      </div>
    </form>
  )
}

export default BookingForm
