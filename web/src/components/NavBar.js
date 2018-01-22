import React from 'react'
import { Link } from 'react-router-dom'

function NavBar({
  signOut,
  loadMyBookings,
  user
}) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <li id="brand">Room Booking System</li>
        <ul>
          <li><a onClick={signOut}>Logout</a></li>
          <li><Link to="/mybookings">My Bookings</Link></li>
          <li><Link to="/bookings">View Availability</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar