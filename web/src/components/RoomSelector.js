import React from 'react'

function RoomSelector({
  setRoom,
  roomData
}) {
  return (
    <div>
      <h2>Select Room</h2>
      <button onClick={ () => setRoom('Room 1')}>room 1</button>
      <button onClick={ () => setRoom('Room 2')}>room 2</button>
      <button onClick={ () => setRoom('Room 3')}>room 3</button>
      <button onClick={ () => setRoom('Room 5')}>room 5</button>
      <div>
        {
          !!roomData &&
          Object.keys(roomData.bookings).map(key => <p key={key}>{key}</p>)
        }
      </div>
    </div>
  )
}

export default RoomSelector