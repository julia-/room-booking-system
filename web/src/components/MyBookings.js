import React from 'react'
import BookingElement from './BookingElement'

function MyBookings({
  user,
  userBookings,
  onDeleteBooking
}) {
  return (
    <div className="my-bookings-container">
      <h2>Bookings for: {user}</h2>
      <div className="user-booking-container">
        { !!userBookings ?
          (
            Object.keys(userBookings).map(key => 
              <BookingElement 
              key={key} 
              bookingData={userBookings[key]}
              onDeleteBooking={onDeleteBooking}
              />)
           ) : (<p>no bookings</p>)
            
        }
      </div>
    </div>
  )
}

export default MyBookings