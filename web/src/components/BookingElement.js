import React from 'react'
import moment from 'moment'

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

  const startTime = bookingData.bookingStart

  return (
    <div className="booking">
      <p><span style={spanStyle}>{bookingData.businessUnit}</span></p>
      <p>{bookingData.roomId}</p>
      <p style={whiteStyle} >{moment(startTime).format('DD-MM-YYYY')}</p>
      {/* <div className="delete">Delete</div> */}
      <button onClick={ () => onDeleteBooking(bookingData.roomId, bookingData._id)}>Delete</button>
    </div>
  )
}

export default BookingElement