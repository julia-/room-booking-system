import React from 'react'

function BookingForm({
  onMakeBooking,
  user,
  roomData
}) {
  
  return (
    <form
    onSubmit={ (event) => {
      event.preventDefault()
      // Data from input
      const formData = event.target.elements
      const roomId = roomData.id
      // Year, Month, Day data
      const year = parseInt(formData.year.value, 10)
      const month = parseInt(formData.month.value, 10)
      const day = parseInt(formData.day.value, 10)
      // startDate data
      const startHour = parseInt(formData.startHour.value, 10)
      const startMinute = parseInt(formData.startMinute.value, 10)
      const startDate = [year, month, day, startHour, startMinute]
      // endDate data
      const endHour = parseInt(formData.endHour.value, 10)
      const endMinute = parseInt(formData.endMinute.value, 10)
      const endDate = [year, month, day, endHour, endMinute]

      const businessUnit = formData.business.value
      const purpose = formData.purpose.value
      onMakeBooking({startDate, endDate, businessUnit, purpose, roomId})
    }}
    >
    <h2>{roomData.name}</h2>
    <div className="date-container">
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
    </div>
    <label>
      {'Year: '}
      <input type="number" name="year" />
    </label>
    <label>
      {'Month: '}
      <input type="number" name="month" />
    </label>
    <label>
      {'Day: '}
      <input type="number" name="day" />
    </label>
    <label>
      {'Business Unit: '}
      <input type="text" name="business" />
    </label>
    <label>
      {'Purpose: '}
      <input type="text" name="purpose" />
    </label>
    <button>Submit</button>
  </form>
  )
}

export default BookingForm