import React from 'react'
import BookingFormTable from './BookingFormTable'
import Datetime  from 'react-datetime'
import moment from 'moment'
import momentTimezone from 'moment-timezone'

function BookingForm({
  onMakeBooking,
  user,
  roomData
}) {
  
  const valid = function( current ){
    return current.day() !== 0
  }

  let dateArray = []

  const handleDate = (event) =>{
    const date = moment(event).format('Y M D')
    dateArray = date.split(' ').map((item) => parseInt(item))
    return dateArray
 }

  return (
    
    <form
    onSubmit={ (event) => {
      event.preventDefault()
      // Data from input
      const formData = event.target.elements
      const roomId = roomData.id
      // startDate data
      const startHour = parseInt(formData.startHour.value, 10)
      const startMinute = parseInt(formData.startMinute.value, 10)
      const startDate = [...dateArray, startHour, startMinute]
      // endDate data
      const endHour = parseInt(formData.endHour.value, 10)
      const endMinute = parseInt(formData.endMinute.value, 10)
      const endDate = [...dateArray, endHour, endMinute]

      const businessUnit = formData.business.value
      const purpose = formData.purpose.value
      onMakeBooking({startDate, endDate, businessUnit, purpose, roomId})
    }}
    >
    <h2>{roomData.name}</h2>
    <div className="date-container">
      <div className="left-container">
        <Datetime 
          dateFormat="YYYY-MM-DD" 
          timeFormat={false} 
          input={false}
          utc={true} 
          isValidDate={valid}
          onChange={ (event) => handleDate(event._d)}        
        />
      </div>

      <div className="middle-container">
        <BookingFormTable />
      </div>

      <div className="right-container">
        <div className="date-selector">
          <label>
            {'Start Hour: '}
            <input type="number" name="startHour" />
          </label>
          <label>
            {'Start Minute: '}
            <input type="number" name="startMinute" />
          </label>
        </div>
        <div className="date-selector">
          <label>
            {'End Hour: '}
            <input type="number" name="endHour" />
          </label>
          <label>
            {'End Minute: '}
            <input type="number" name="endMinute" />
          </label>
        </div>
        <label>
          {'Business Unit: '}
          <input type="text" name="business" />
        </label>
        <label>
          {'Purpose: '}
          <input type="text" name="purpose" />
        </label>
      </div>
      </div>
    <button>Submit</button>

  </form>
  )
}

export default BookingForm