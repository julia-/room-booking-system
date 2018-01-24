import React from 'react'
import moment from 'moment'
import momentTimezone from 'moment-timezone'
import { findRoomInfo } from '../helpers/bookingForm.js'

function BookingElement({
  bookingData,
  onDeleteBooking,
  roomData
}) {

  const roomInfo = findRoomInfo(bookingData.roomId, roomData)
  const startTime = momentTimezone.tz(bookingData.bookingStart, 'Australia/Melbourne').format('h.mma')
  const endTime = momentTimezone.tz(bookingData.bookingEnd, 'Australia/Melbourne').format('h.mma')
  
  return (
    <div className="booking">
      <div className="booking-left">
        <h2>{bookingData.businessUnit}</h2>
        <h3>{bookingData.purpose}</h3>
      </div>
      <div className="booking-middle">
        <p>{moment(bookingData.bookingStart).format('dddd, MMMM Do YYYY')}</p>
        <p>From: {startTime} to {endTime}</p>
        <p>Duration: {bookingData.duration}hrs</p>
        <p>Floor {roomInfo.floor} : {roomInfo.name}</p>
      </div>
      <div className="booking-right">
        <button className="custom-button filter-button" onClick={ () => onDeleteBooking(bookingData.roomId, bookingData._id)}>Delete</button>
      </div>
    </div>
  )
}

export default BookingElement