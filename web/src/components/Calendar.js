import React from 'react'
import Datetime from 'react-datetime'

const Calendar = props => (
  <Datetime
    dateFormat="YYYY-MM-DD"
    timeFormat={false}
    input={false}
    defaultValue={true}
    // isValidDate={valid}
  />
)

export default Calendar
