import React from 'react'

function TimeDropdown({
  setTime,
  name
}) {
  return (
    <select onChange={(event) => console.log(event.target.value)} >
      <option value="8:00">8:00am</option>
      <option value="8:30">8:30am</option>
      <option value="9:00">9:00am</option>
      <option value="9:30">9:30am</option>
      <option value="10:00">10:00am</option>
      <option value="10:30">10:30am</option>
      <option value="11:00">11:00am</option>
      <option value="11:30">11:30am</option>
      <option value="12:00">12:00pm</option>
      <option value="12:30">12:30pm</option>
      <option value="13:00">1:00pm</option>
      <option value="13:30">1:30pm</option>
      <option value="14:00">2:00pm</option>
      <option value="14:30">2:30pm</option>
      <option value="15:00">3:00pm</option>
      <option value="15:30">3:30pm</option>
      <option value="16:00">4:00pm</option>
      <option value="16:30">4:30pm</option>
      <option value="17:00">5:00pm</option>
      <option value="17:30">5:30pm</option>
      <option value="18:00">6:00pm</option>
      <option value="18:30">6:30pm</option>
      <option value="19:00">7:00pm</option>
      <option value="19:30">7:30pm</option>
      <option value="20:00">8:00pm</option>
      <option value="20:30">8:30pm</option>
    </select>
  )
}

export default TimeDropdown