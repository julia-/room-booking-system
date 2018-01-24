import React from 'react'
import Datetime from 'react-datetime'

const validDate = current => current.day() !== 0

const Calendar = props => (
  <Datetime
    dateFormat="YYYY-MM-DD"
    timeFormat={false}
    input={false}
    utc={false}
    onChange={event => props.setCalendarDate(event._d)}
    isValidDate={validDate}
  />
)

export default Calendar
