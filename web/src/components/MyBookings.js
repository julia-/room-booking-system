import React from 'react'

function MyBookings({
  user
}) {
  return (
    <div className="my-bookings-container">
      <h2>Bookings for: {user}</h2>
    </div>
  )
}

export default MyBookings