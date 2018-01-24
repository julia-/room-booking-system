import React, {Fragment} from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime from 'react-datetime'
import moment from 'moment'
import {Link} from 'react-router-dom'
import Button from './Button'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../helpers/bookingForm'

function BookingForm({ onMakeBooking, user, roomData, date, updateCalendar, onShowBooking, calendarDate }) {
  // Disable sunday (day 0) on the calendar as an booking option
  const valid = function(current) {
    return current.day() !== 0
  }

  // Format the recurring data into an array
  const handleRecurringData = (type, date) => {
    let recurringData = []
    if (type !== "none") {
      recurringData = [ date, type] 
      recurringData[0][1] = recurringData[0][1] - 1
    } else {
        recurringData = []
    }
    return recurringData
  }

  // Array used for handleData function
  let dateArray = []

  // Update the current date in the application state
  const handleDate = event => {
    updateCalendar(moment(event)._i)
  }

  return (
    <Fragment>
      <div className="header__page">
        <h2 className="header__heading header__heading--sub">Level {roomData.floor} | {roomData.name}</h2>
      </div>
      <form className="form__grid form" onSubmit={event => {
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
            // Booking specifics
            const businessUnit = formData.business.value
            const recurringEnd = [parseInt(formData.year.value), parseInt(formData.month.value), parseInt(formData.day.value)]
            const recurringType = formData.recurring.value 
            let recurringData = handleRecurringData(recurringType, recurringEnd)
            const purpose = formData.purpose.value
            const description = formData.description.value
          onMakeBooking({ startDate, endDate, businessUnit, purpose, roomId, recurringData })
        }}>
        <div className="content__calendar">
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            input={false}
            utc={true}
            isValidDate={valid}
            onChange={event => handleDate(event._d)}
        />
        </div>
        <div className="content__table">
          <BookingFormTable roomData={roomData} date={date} onShowBooking={onShowBooking} />
        </div>
        <div className="content__form">
          <h3 className="header__heading header__heading--column">Make a Booking</h3>
          <div className="form__group">
            <label className="form__label">
              {'Start Time'}
              <select name="startTime" className="form__input--select">
                {startTimeSelectOptions.map(option => {
                  return option
                })}
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label">
              {'End Time'}
              <select name="endTime" className="form__input--select">
                {endTimeSelectOptions.map(option => {
                  return option
                })}
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label">
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
            <label className="form__label">
              {'Recurring'}
              <select name="recurring" defaultValue="none">
                <option value="none">Non recurring</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label">
              {'Recurring End Year'}
              <input name="year" type="number"/>
            </label>
          </div>
          <div className="form__group">
            <label className="form__label">
            {'Recurring End Month'}
            <input name="month" type="number"/>
          </label>
          </div>
          <div className="form__group">
            <label className="form__label">
              {'Recurring End Day'}
              <input name="day" type="number"/>
            </label>
          </div>
          </div>
          <div className="form__group">
            <label className="form__label">
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
          <div className="form__group--button">
            <Button className="button button--inline" text={'Submit'} />
            <Link to="/bookings" className="button button--inline button--alternative" >Go back</Link>
          </div>
      </form>
    </Fragment>
  )
}

export default BookingForm
