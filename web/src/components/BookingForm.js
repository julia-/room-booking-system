import React from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime from 'react-datetime'
import moment from 'moment'
import Button from './Button'
import { formatTime, timeSelectOptions} from '../helpers/bookingForm'

function BookingForm({ onMakeBooking, user, roomData, date, updateCalendar, onShowBooking, calendarDate }) {
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
    <div className="wrapper__content--booking">
      <div className="header__page">
        <h2 className="header__heading header__heading--sub">Level {roomData.floor} | {roomData.name}</h2>
      </div>
      <form className="content__nested form" onSubmit={event => {
          event.preventDefault()
          // Extract date array from current date in state
          const dateArray = moment(date)
            .format('Y M D')
            .split(' ')
            .map(item => parseInt(item, 10))
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
          const purpose = formData.purpose.value
          const description = formData.description.value
          onMakeBooking({ startDate, endDate, businessUnit, purpose, roomId })
        }}>
        <div className="content__calendar">
          <Datetime dateFormat="YYYY-MM-DD" timeFormat={false} input={false} utc={true} isValidDate={valid} onChange={event => handleDate(event._d)} />
        </div>

        <div className="content__table">
          <BookingFormTable roomData={roomData} date={date} onShowBooking={onShowBooking} />
        </div>

        <div className="content__form">
          <h3>Make a Booking</h3>
          <div className="form__group">
            <label className="form__label">
              {'Start Time'}
              <select name="startTime" className="form__input--select">
                {timeSelectOptions.map(option => {
                  return option
                })}
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label form__label--inline">
              {'End Time: '}
              <select name="endTime" className="form__input--select">
                {timeSelectOptions.map(option => {
                  return option
                })}
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label form__label--inline">
              {'Business Unit'}
              <select name="business" defaultValue="Business Unit 1" className="form__input--select">
                <option value="Business Unit 1">Business Unit 1</option>
                <option value="Business Unit 2">Business Unit 2</option>
                <option value="Business Unit 3">Business Unit 3</option>
                <option value="Business Unit 4">Business Unit 4</option>
                <option value="Business Unit 5">Business Unit 5</option>
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label form__label--inline">
              {'Purpose'}
              <select name="purpose" defaultValue="Scheduled Class" className="form__input--select">
                <option value="Scheduled Class">Scheduled Class</option>
                <option value="Special Event">Special Event</option>
                <option value="Ad-hoc Event">Ad-hoc Event</option>
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label">
              {'Description'}
              <input type="textarea" name="description" className="form__input--textarea" />
            </label>
          </div>
          <Button className="button" text={'Submit'} />
        </div>
      </form>
    </div>
  )
}

export default BookingForm
