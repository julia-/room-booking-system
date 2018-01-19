import React from 'react'
import Datetime from 'react-datetime'
import moment from 'moment'

const Calendar = props => (
  <Datetime
    dateFormat="YYYY-MM-DD"
    timeFormat={false}
    input={false}
    utc={false}
    onChange={event => props.getCalendarDate(event._d)}
  />
)

export default Calendar
