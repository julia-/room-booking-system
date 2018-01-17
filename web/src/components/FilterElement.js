import React from 'react'

function FilterElement({

}) {
  return (
    <form className="filter-element" onSubmit={console.log('filter me daddy!')} >
      <h2>Filter By:</h2>
      <h3>Floor</h3>
        <div>
          <input type="checkbox" id="floor8" name="floor8" value="newsletter" />
          <label for="floor8">Floor 8</label>
        </div>
        <div>
          <input type="checkbox" id="floor13" name="floor13" value="newsletter" />
          <label for="floor13">Floor 13</label>
        </div>
      <h3>Features</h3>
      <div>
          <input type="checkbox" id="macLab" name="macLab" value="newsletter" />
          <label for="macLab">Mac Lab</label>
        </div>
        <div>
          <input type="checkbox" id="pcLab" name="pcLab" value="newsletter" />
          <label for="pcLab">PC Lab</label>
        </div>
        <div>
          <input type="checkbox" id="tv" name="tv" value="newsletter" />
          <label for="tv">TV</label>
        </div>
        <div>
          <input type="checkbox" id="opWall" name="opWall" value="newsletter" />
          <label for="opWall">Operable Walls</label>
        </div>
        <div>
          <input type="checkbox" id="whiteboard" name="whiteboard" value="newsletter" />
          <label for="whiteboard">Whiteboard</label>
        </div>
      <h3>Capacity</h3>
      <div>
          <input type="checkbox" id="16seats" name="16seats" value="newsletter" />
          <label for="16seats">16 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="18seats" name="18seats" value="newsletter" />
          <label for="18seats">18 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="20seats" name="20seats" value="newsletter" />
          <label for="20seats">20 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="24seats" name="24seats" value="newsletter" />
          <label for="24seats">24 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="40seats" name="40seats" value="newsletter" />
          <label for="40seats">40 Seats</label>
        </div>
      <h3>Availability</h3>
      <div>
          <input type="checkbox" id="fullyAvailable" name="fullyAvailable" value="newsletter" />
          <label for="fullyAvailable">Fully Available</label>
        </div>
        <div>
          <input type="checkbox" id="partialAvailable" name="PartialAvailable" />
          <label for="partialAvailable">Partially Available</label>
        </div>
        <div>
          <input type="checkbox" id="fullyBooked" name="fullyBooked" value="newsletter" />
          <label for="fullyBooked">Fully Booked</label>
        </div>
        <div className="time-selector">
          <label>
              {'From: '}
              <input type="time" name="startTime" min="00:00" max="23:00" />
            </label>
          
            <label>
              {'To: '}
              <input type="time" name="endTime" min="00:00" max="23:00" />
            </label>
          </div>
          <div className="filter-button-container">
            <button className='custom-button filter-button'>Filter</button>
            <div className='custom-button reset-button'>Reset</div>
          </div>
    </form>
  )
}

export default FilterElement