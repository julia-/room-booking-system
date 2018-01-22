import React from 'react'
import ReactModal from 'react-modal'
import momentTimezone from 'moment-timezone'
import Button from './Button'

const BookingModal = props => {
  
  const deleteBooking = () => {
    props.onDeleteBooking(props.selectedBooking.roomId, props.selectedBooking._id)
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
          <p>
            {`Room, Floor: ${momentTimezone
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
      <Button
        onClick={props.onCloseBooking}
        text={`Contact`}
      />
      <Button
        onClick={props.onCloseBooking}
        text={`Update`}
      />
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
