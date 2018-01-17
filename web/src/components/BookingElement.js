import React from 'react'

function BookingElement({
  bookingData
}) {
  var spanStyle = {
    color: "red"
  }

  return (
    <div>
      <p><span style={spanStyle}>{bookingData.businessUnit} :</span> {bookingData.purpose}</p>
    </div>
  )
}

export default BookingElement