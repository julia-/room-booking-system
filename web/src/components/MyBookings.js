import React from 'react'
import BookingElement from './BookingElement'
import Avatar from '../assets/avatar.png' 

function MyBookings({
  user,
  userBookings,
  onDeleteBooking
}) {
  return (
    <div className="my-bookings-container">
      <div className="my-booking-user-info">
        <div className="avatar"></div>
        <h2>{user}</h2>
      </div>
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