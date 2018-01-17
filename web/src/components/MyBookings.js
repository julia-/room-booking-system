import React from 'react'

function MyBookings({
  user,
  userBookings
}) {
  return (
    <div className="my-bookings-container">
      <h2>Bookings for: {user}</h2>
      <div className="user-booking-container">
        { !!userBookings ?
          (
            Object.keys(userBookings).map(key => <p key={key} className="booking">{userBookings[key].businessUnit}</p>)
           ) : (<p>no bookings</p>)
            
        }
      </div>
    </div>
  )
}

export default MyBookings