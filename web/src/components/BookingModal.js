import React from 'react'
import ReactModal from 'react-modal'
import momentTimezone from 'moment-timezone'
import Button from './Button'
import { findRoomInfo } from '../helpers/bookingForm.js'

const BookingModal = props => {
  
  const deleteBooking = () => {
    props.onDeleteBooking(props.selectedBooking.roomId, props.selectedBooking._id)
    props.onCloseBooking()
  }
  
  // const roomId = props.selectedBooking.roomId
  // const roomInfo = findRoomInfo(props.selectedBooking.roomId, props.roomData)

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
          <p> {findRoomInfo(props.selectedBooking.roomId, props.roomData).name}{' : Level '}
          {findRoomInfo(props.selectedBooking.roomId, props.roomData).floor}
            {`, ${momentTimezone
              .tz(props.selectedBooking['bookingStart'], 'Australia/Melbourne')
              .format('h.mma')} to ${momentTimezone
              .tz(props.selectedBooking['bookingEnd'], 'Australia/Melbourne')
              .format('h.mma')}`}
          </p>
          <p>{props.selectedBooking['businessUnit']}</p>
          <p>{props.selectedBooking['purpose']}</p>
          <p>Description</p>
        </div>
      )}
      <a href={`mailto:${props.user}`} className="button">Contact</a>
      <Button
        onClick={deleteBooking}
        text={`Delete`}
      />
      <Button
        className="button__close"
        onClick={props.onCloseBooking}
        text={`Close`}
      />
    </ReactModal>
  )
}
export default BookingModal
