import React from 'react'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

function BookingElement({
  bookingData,
  onDeleteBooking
}) {
  const spanStyle = {
    color: "red"
  }

  const whiteStyle = {
    color: "white"
  }

  const startTime = momentTimezone.tz(bookingData.bookingStart, 'Australia/Melbourne').format('h.mma')
  const endTime = momentTimezone.tz(bookingData.bookingEnd, 'Australia/Melbourne').format('h.mma')

  return (
    <div className="booking">
      <div className="booking-top">
        <h3><span style={spanStyle}>{bookingData.businessUnit}</span></h3> | 
        <h3>{' '}{bookingData.purpose}</h3>
      </div>
      <p style={whiteStyle} >{moment(bookingData.bookingStart).format('DD-MM-YYYY')}</p>
      <p>Duration: {bookingData.duration}hrs</p>
      <p>From: {startTime} to {endTime}</p>
      {console.log(bookingData)}
      <button className="custom-button filter-button" onClick={ () => onDeleteBooking(bookingData.roomId, bookingData._id)}>Delete</button>
    </div>
  )
}

export default BookingElement