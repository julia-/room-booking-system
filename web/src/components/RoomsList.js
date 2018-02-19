import React from 'react'
import RoomRow from './RoomRow'
import { levelEightSorter, levelThirteenSorter } from '../helpers/sorter'

const RoomsList = props => (
  <div className="table">
    <div className="table__row table__row--header table__row--level">
      <div className="table__cell--header table__cell--level">
        Level Eight
      </div>
    </div>
    <div className="table table--nested">
      <div className="table__row table__row--subheader">
        <div className="table__cell--header table__column">
          Room
        </div>
        <div className="table__cell--header">
          8am
        </div>
        <div className="table__cell--header">
          9am
        </div>
        <div className="table__cell--header">
          10am
        </div>
        <div className="table__cell--header">
          11am
        </div>
        <div className="table__cell--header">
          12pm
        </div>
        <div className="table__cell--header">
          1pm
        </div>
        <div className="table__cell--header">
          2pm
        </div>
        <div className="table__cell--header">
          3pm
        </div>
        <div className="table__cell--header">
          4pm
        </div>
        <div className="table__cell--header">
          5pm
        </div>
        <div className="table__cell--header">
          6pm
        </div>
        <div className="table__cell--header">
          7pm
        </div>
        <div className="table__cell--header">
          8pm
        </div>
      </div>
      <div className="table__body">
        {props.rooms &&
          levelEightSorter(props.rooms).map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onShowBooking={props.onShowBooking}
              onSetRoom={props.onSetRoom}
            />
          ))}
      </div>
    </div>
    <div className="table__row table__row--header table__row--level">
      <div className="table__cell--header table__cell--level">
        Level Thirteen
      </div>
    </div>
    <div className="table table--nested">
      <div className="table__row table__row--subheader">
        <div className="table__cell--header table__column">
          Room
        </div>
        <div className="table__cell--header">
          8am
        </div>
        <div className="table__cell--header">
          9am
        </div>
        <div className="table__cell--header">
          10am
        </div>
        <div className="table__cell--header">
          11am
        </div>
        <div className="table__cell--header">
          12pm
        </div>
        <div className="table__cell--header">
          1pm
        </div>
        <div className="table__cell--header">
          2pm
        </div>
        <div className="table__cell--header">
          3pm
        </div>
        <div className="table__cell--header">
          4pm
        </div>
        <div className="table__cell--header">
          5pm
        </div>
        <div className="table__cell--header">
          6pm
        </div>
        <div className="table__cell--header">
          7pm
        </div>
        <div className="table__cell--header">
          8pm
        </div>
      </div>
      <div className="table__body">
        {props.rooms &&
          levelThirteenSorter(props.rooms).map(room => (
            <RoomRow
              key={room._id}
              room={room}
              bookings={room.bookings}
              date={props.date === null ? new Date() : props.date}
              onShowBooking={props.onShowBooking}
              onSetRoom={props.onSetRoom}
            />
          ))
        }
      </div>
    </div>
  </div>
)

export default RoomsList
