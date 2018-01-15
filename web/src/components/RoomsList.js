import React from 'react'
import RoomRow from './RoomRow'

const RoomsList = props => (
  <table>
    <thead>
      <tr>
        <th>Room</th>
        <th>Assets</th>
      </tr>
    </thead>
    <tbody>
      {props.rooms &&
        props.rooms.map(room => <RoomRow key={room._id} room={room} />)}
    </tbody>
  </table>
)

export default RoomsList
