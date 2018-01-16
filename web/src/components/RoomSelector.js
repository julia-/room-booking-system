import React from 'react'
import BookingElement from './BookingElement'

function RoomSelector({
  setRoom,
  roomData
}) {
  return (
    <div className="room-selector" >
      <h2>Select Room</h2>
      <button onClick={ () => setRoom('Room 1')}>room 1</button>
      <button onClick={ () => setRoom('Room 2')}>room 2</button>
      <button onClick={ () => setRoom('Room 3')}>room 3</button>
      <button onClick={ () => setRoom('Room 5')}>room 5</button>
      <div>
        {
          Object.keys(roomData.bookings).map(key => <BookingElement key={key} bookingData={roomData.bookings[key]}/>)
        }
      </div>
    </div>
  )
}

export default RoomSelector