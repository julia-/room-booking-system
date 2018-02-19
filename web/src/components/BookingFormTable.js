import React from 'react'
import moment from 'moment'
import ColumnCell from './ColumnCell'

const BookingFormTable = props => (
  <div className="table--booking">
    <div className="table__row table__row--form table__row--header table__row--level">
      <div className="table__cell--header table__cell--level">
        {moment(props.date).format('MMMM Do YYYY')}
      </div>
    </div>
    <div className="table table--nested">
      <div className="table__row table__row--subheader">
        <div className="table__cell--header table__column--form">
          Time
        </div>
        <div className="table__cell--header">
          Availbility
        </div>
      </div>
      <div className="table__body">
        <div className="table__row--full table__row--form">
          <div className="table__cell--form table__cell--header">
            8am
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={8}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            9am
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={9}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            10am
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={10}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            11am
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={11}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            12pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={12}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            1pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={13}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            2pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={14}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            3pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={15}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            4pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={16}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            5pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={17}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            6pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={18}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            7pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={19}
            onShowBooking={props.onShowBooking}
          />
        </div>
        <div className="table__row--form">
          <div className="table__cell--form table__cell--header">
            8pm
          </div>
          <ColumnCell
            date={props.date}
            bookings={props.roomData.bookings}
            hour={20}
            onShowBooking={props.onShowBooking}
          />
        </div>
      </div>
    </div>
  </div>
)

export default BookingFormTable
