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
      const formData = event.target.elements
      const roomId = roomData.id
      // startDate data
      const startYear = parseInt(formData.startYear.value, 10)
      const startMonth = parseInt(formData.startMonth.value, 10)
      const startDay = parseInt(formData.startDay.value, 10)
      const startHour = parseInt(formData.startHour.value, 10)
      const startMinute = parseInt(formData.startMinute.value, 10)
      const startDate = [startYear, startMonth, startDay, startHour, startMinute]
      // endDate data
      const endYear = parseInt(formData.endYear.value, 10)
      const endMonth = parseInt(formData.endMonth.value, 10)
      const endDay = parseInt(formData.endDay.value, 10)
      const endHour = parseInt(formData.endHour.value, 10)
      const endMinute = parseInt(formData.endMinute.value, 10)
      const endDate = [endYear, endMonth, endDay, endHour, endMinute]

      const businessUnit = formData.business.value
      const purpose = formData.purpose.value
      onMakeBooking({startDate, endDate, businessUnit, purpose, roomId})
    }}
    >
    <h2>{roomData.name}</h2>
    <div className="date-container">
      <div className="date-selector">
        <label>
          {'Year: '}
          <input type="number" name="startYear" />
        </label>
        <label>
          {'Month: '}
          <input type="number" name="startMonth" />
        </label>
        <label>
          {'Day: '}
          <input type="number" name="startDay" />
        </label>
        <label>
          {'Hour: '}
          <input type="number" name="startHour" />
        </label>
        <label>
          {'Minute: '}
          <input type="number" name="startMinute" />
        </label>
      </div>
      <div className="date-selector">
        <label>
          {'Year: '}
          <input type="number" name="endYear" />
        </label>
        <label>
          {'Month: '}
          <input type="number" name="endMonth" />
        </label>
        <label>
          {'Day: '}
          <input type="number" name="endDay" />
        </label>
        <label>
          {'Hour: '}
          <input type="number" name="endHour" />
        </label>
        <label>
          {'Minute: '}
          <input type="number" name="endMinute" />
        </label>
      </div>
    </div>

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