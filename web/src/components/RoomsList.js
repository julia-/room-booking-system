import React from 'react'
import RoomRow from './RoomRow'

const RoomsList = props => (
  <table>
    <thead>
      <tr>
        <th>Room</th>
        <th>Assets</th>
        <th>8am</th>
        <th>9</th>
        <th>10</th>
        <th>11</th>
        <th>12pm</th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
      </tr>
    </thead>
    <tbody>
      {props.rooms &&
        props.rooms.map(room => <RoomRow key={room._id} room={room} />)}
    </tbody>
  </table>
)

export default RoomsList
