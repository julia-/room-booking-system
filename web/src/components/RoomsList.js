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
      <tr>
        <th colSpan="15" className="table__header">
          Floor Eight
        </th>
      </tr>
      {props.rooms &&
        props.rooms
          .filter(room => {
            return room.floor === '8'
          })
          .sort(function(a, b) {
            const first = a.name.replace(/\d+/, '')
            const second = b.name.replace(/\d+/, '')

            if (first > second) {
              return 1
            } else {
              return 0
            }
          })
          .map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onSelectRoom={props.onSelectRoom}
            />
          ))}

      <tr>
        <th colSpan="15" className="table__header">
          Floor Thirteen
        </th>
      </tr>

      {props.rooms &&
        props.rooms
          .sort(function(a, b) {
            return a.name.match(/\d+/, '') - b.name.match(/\d+/, '')
          })
          .filter(room => {
            return room.floor === '13'
          })
          .map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onSelectRoom={props.onSelectRoom}
            />
          ))}
    </tbody>
  </table>
)

export default RoomsList
