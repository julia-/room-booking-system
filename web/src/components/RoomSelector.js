import React from 'react'

function RoomSelector({
  setRoom
}) {
  return (
    <div>
      <button onClick={ () => setRoom('Room 1')}>room 1</button>
      <button onClick={ () => setRoom('Room 2')}>room 2</button>
      <button onClick={ () => setRoom('Room 3')}>room 3</button>
    </div>
  )
}

export default RoomSelector