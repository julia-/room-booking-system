import React from 'react'

function BookingElement({
  bookingData,
  onDeleteBooking
}) {
  var spanStyle = {
    color: "red"
  }

  return (
    <div className="booking">
      <p><span style={spanStyle}>{bookingData.businessUnit}</span></p>
      <p>{bookingData.purpose}</p>
      <p>{bookingData.bookingStart}</p>
      {/* <div className="delete">Delete</div> */}
      <button onClick={ () => onDeleteBooking(bookingData.roomId, bookingData._id)}>Delete</button>
    </div>
  )
}

export default BookingElement