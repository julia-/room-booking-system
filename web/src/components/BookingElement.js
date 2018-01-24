import React from 'react'
import moment from 'moment'
import momentTimezone from 'moment-timezone'
import Button from './Button'
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
        <h2>{moment(bookingData.bookingStart).format('dddd, MMMM Do YYYY')}</h2>
        <h3>{bookingData.businessUnit}</h3>
        <h3>{bookingData.purpose}</h3>
      </div>
      <div className="booking-middle">
        <p>From: {startTime} to {endTime}</p>
        <p>Duration: {bookingData.duration}hrs</p>
        <p>Floor {roomInfo.floor} : {roomInfo.name}</p>
      </div>
      <div className="booking-right">
        <Button 
          onClick={() => onDeleteBooking(bookingData.roomId, bookingData._id)}
          text={`Delete`}
        />
        
      </div>
    </div>
  )
}

export default BookingElement