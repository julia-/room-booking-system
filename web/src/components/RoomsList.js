import React from 'react'
import RoomRow from './RoomRow'
import { roomSorter } from '../helpers/sorter'

const RoomsList = ({
  date,
  rooms,
  onShowBooking,
  onSetRoom,
}) => (
  <table className="table">
    <tbody>
      <tr className="table__row table__row--header">
        <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--level table__cell--align-left">
          Level Eight
        </th>
      </tr>
      <tr className="table__row table__row--subheader">
        <th scope="col" className="table__cell--header table__cell--align-left">
          Room
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
    </tbody>
    <tbody className="table__body">
      {rooms &&
        roomSorter(rooms, '8').map(room => (
          <RoomRow
            key={room._id}
            room={room}
            bookings={room.bookings}
            date={date === null ? new Date() : date}
            onShowBooking={onShowBooking}
            onSetRoom={onSetRoom}
          />
        ))}
      </tbody>

    <tbody className="table__body">
    <tr className="table__row table__row--header">
      <th scope="colgroup" colSpan="15" className="table__cell--header table__cell--level table__cell--align-left">
        Level Thirteen
      </th>
    </tr>
    <tr className="table__row table__row--subheader">
      <th scope="col" className="table__cell--header table__cell--width table__cell--align-left">
        Room
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

      </tbody>
    <tbody className="table__body">
      {rooms &&
        roomSorter(rooms, '13').map(room => (
          <RoomRow
            key={room._id}
            room={room}
            bookings={room.bookings}
            date={date === null ? new Date() : date}
            onShowBooking={onShowBooking}
            onSetRoom={onSetRoom}
          />
        ))
      }
    </tbody>
  </table>
)

export default RoomsList
