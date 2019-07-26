import React from 'react'
import ReactModal from 'react-modal'
import momentTimezone from 'moment-timezone'
import moment from 'moment';
import Button from './Button'
import { findRoomInfo } from '../helpers/bookingForm.js'

const BookingModal = props => {
  const deleteBooking = () => {
    const roomID = props.selectedBooking.roomId
    const bookingID = props.selectedBooking._id
    props.onDeleteBooking(roomID, bookingID)
    props.onCloseBooking()
  }
  return (
    <ReactModal
      isOpen={!!props.selectedBooking}
      onRequestClose={props.onCloseBooking}
      ariaHideApp={true}
      shouldFocusAfterRender={true}
      shouldReturnFocusAfterClose={true}
      contentLabel="Booking"
      appElement={document.getElementById('app')}
      closeTimeoutMS={200}
      className="modal"
    >
      <h3 className="modal__title">Booking Details</h3>
      {!!props.selectedBooking && (
        <div className="modal__boday">
          <p className="modal__paragraph">
            {findRoomInfo(props.selectedBooking.roomId, props.roomData).name}{', Level '}
            {findRoomInfo(props.selectedBooking.roomId, props.roomData).floor}
          </p>
          <p className="modal__paragraph">
            {`${moment(props.selectedBooking['bookingStart']).format('h.mma')} to ${moment(props.selectedBooking['bookingEnd']).format('h.mma')}`}
            <br />
            <br />
            <span className="modal__paragraph">
              {`${moment(props.selectedBooking['bookingStart']).format('MMMM Do, YYYY')} to ${moment(props.selectedBooking['bookingEnd']).format('MMMM Do, YYYY')}`}
            </span>
          </p>
          <p className="modal__paragraph"><strong>Business Unit </strong>{props.selectedBooking['businessUnit']}</p>
          <p className="modal__paragraph"><strong>Purpose </strong>{props.selectedBooking['purpose']}</p>
          <p className="modal__paragraph"><strong>Description </strong>{props.selectedBooking['description']}</p>
        </div>
      )}
      <a href={`mailto:${props.user}`} className="button">Contact</a>
      <Button
        onClick={deleteBooking}
        text={`Delete`}
      />
      <Button
        className="button__close button--alternative"
        onClick={props.onCloseBooking}
        text={`Close`}
      />
    </ReactModal>
  )
}
export default BookingModal
