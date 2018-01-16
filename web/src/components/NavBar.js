import React from 'react'

function NavBar({
  signOut
}) {
  return (
    <nav className="nav">
      <div className="nav-left">
        {/* <a className="brand" href="/">Room System</a> */}

          <li id="brand">Room Booking System</li>
        <ul>
          <li><a href="/" onClick={signOut}>Logout</a></li>
        </ul>

        <ul>
          <li>My Bookings</li>
          <li>View Availability</li>
        </ul>

      </div>
    </nav>
  )
}

export default NavBar