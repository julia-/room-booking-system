import React from 'react'
import RoomRow from './RoomRow'

const RoomsList = props => (
  <table className="table">
    <tr className="table__row table__row--header">
      <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--align-left">Floor Eight</th>
    </tr>
    <tr className="table__row table__row--subheader">
      <th scope="col" className="table__cell--header">
        Room
      </th>
      <th scope="col" className="table__cell--header">
        Assets
      </th>
      <th scope="col" className="table__cell--header">
        8am
      </th>
      <th scope="col" className="table__cell--header">
        9am
      </th>
      <th scope="col" className="table__cell--header">
        10am
      </th>
      <th scope="col" className="table__cell--header">
        11am
      </th>
      <th scope="col" className="table__cell--header">
        12pm
      </th>
      <th scope="col" className="table__cell--header">
        1pm
      </th>
      <th scope="col" className="table__cell--header">
        2pm
      </th>
      <th scope="col" className="table__cell--header">
        3pm
      </th>
      <th scope="col" className="table__cell--header">
        4pm
      </th>
      <th scope="col" className="table__cell--header">
        5pm
      </th>
      <th scope="col" className="table__cell--header">
        6pm
      </th>
      <th scope="col" className="table__cell--header">
        7pm
      </th>
      <th scope="col" className="table__cell--header">
        8pm
      </th>
    </tr>
    <tbody className="table__body">
      {props.rooms &&
        props.rooms
          .filter(room => {
            return room.floor === '8'
          })
          .sort((first, second) => {
            const firstRoom = first.name.replace(/\d+/, '')
            const secondRoom = second.name.replace(/\d+/, '')
            if (firstRoom > secondRoom) {
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
              onShowBooking={props.onShowBooking}
            />
          ))}
    </tbody>
    <tbody>
      <tr className="table__row table__row--header">
        <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--align-left">Floor Thirteen</th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header table__cell--width">
          Room
        </th>
        <th scope="col" className="table__cell--header table__cell--width">
          Assets
        </th>
        <th scope="col" className="table__cell--header">
          8am
        </th>
        <th scope="col" className="table__cell--header">
          9am
        </th>
        <th scope="col" className="table__cell--header">
          10am
        </th>
        <th scope="col" className="table__cell--header">
          11am
        </th>
        <th scope="col" className="table__cell--header">
          12pm
        </th>
        <th scope="col" className="table__cell--header">
          1pm
        </th>
        <th scope="col" className="table__cell--header">
          2pm
        </th>
        <th scope="col" className="table__cell--header">
          3pm
        </th>
        <th scope="col" className="table__cell--header">
          4pm
        </th>
        <th scope="col" className="table__cell--header">
          5pm
        </th>
        <th scope="col" className="table__cell--header">
          6pm
        </th>
        <th scope="col" className="table__cell--header">
          7pm
        </th>
        <th scope="col" className="table__cell--header">
          8pm
        </th>
      </tr>
      {props.rooms &&
        props.rooms
          .sort((first, second) => {
            const firstRoom = first.name.match(/\d+/, '')
            const secondRoom = second.name.match(/\d+/, '')
            return firstRoom - secondRoom
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
