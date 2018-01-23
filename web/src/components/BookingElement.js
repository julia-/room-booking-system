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
      <div className="booking-top">
        <h3><span style={spanStyle}>{bookingData.businessUnit}</span></h3> | 
        <h3>{' '}{bookingData.purpose}</h3>
      </div>
      <p style={whiteStyle} >{moment(startTime).format('DD-MM-YYYY')}</p>
      <p>Duration: {bookingData.duration}hrs</p>
      {/* <div className="delete">Delete</div> */}
      {console.log(bookingData)}
      <button className="custom-button filter-button" onClick={ () => onDeleteBooking(bookingData.roomId, bookingData._id)}>Delete</button>
    </div>
  )
}

export default BookingElement