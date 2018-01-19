import React from 'react'

function FilterElement({
  filterByFloor,
  filterByCapacity,
  filterByFeature
}) {
  return (
    <form className="filter-element" >
      <h2>Filter By:</h2>
      <h3>Floor</h3>
        <div>
          <input type="checkbox" id="floor8" name="floor8" onClick={() => filterByFloor('8')}/>
          <label for="floor8">Floor 8</label>
        </div>
        <div>
          <input type="checkbox" id="floor13" name="floor13" onClick={() => filterByFloor('13')}/>
          <label for="floor13">Floor 13</label>
        </div>
      <h3>Features</h3>
      <div>
          <input type="checkbox" id="macLab" name="macLab" onClick={() => filterByFeature('macLab')}/>
          <label for="macLab">Mac Lab</label>
        </div>
        <div>
          <input type="checkbox" id="pcLab" name="pcLab" onClick={() => filterByFeature('8')}/>
          <label for="pcLab">PC Lab</label>
        </div>
        <div>
          <input type="checkbox" id="tv" name="tv" onClick={() => filterByFeature('8')}/>
          <label for="tv">TV</label>
        </div>
        <div>
          <input type="checkbox" id="opWall" name="opWall" onClick={() => filterByFeature('8')}/>
          <label for="opWall">Operable Walls</label>
        </div>
        <div>
          <input type="checkbox" id="whiteboard" name="whiteboard" onClick={() => filterByFeature('8')}/>
          <label for="whiteboard">Whiteboard</label>
        </div>
      <h3>Capacity</h3>
      <div>
          <input type="checkbox" id="16seats" name="16seats" onClick={() => filterByCapacity(16)}/>
          <label for="16seats">16 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="18seats" name="18seats" onClick={() => filterByCapacity(18)}/>
          <label for="18seats">18 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="20seats" name="20seats" onClick={() => filterByCapacity(20)}/>
          <label for="20seats">20 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="24seats" name="24seats" onClick={() => filterByCapacity(24)}/>
          <label for="24seats">24 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="40seats" name="40seats" onClick={() => filterByCapacity(40)}/>
          <label for="40seats">40 Seats</label>
        </div>
      <h3>Availability</h3>
      <div>
          <input type="checkbox" id="fullyAvailable" name="fullyAvailable" onClick={() => filterByFloor('8')}/>
          <label for="fullyAvailable">Fully Available</label>
        </div>
        <div>
          <input type="checkbox" id="partialAvailable" name="PartialAvailable" />
          <label for="partialAvailable">Partially Available</label>
        </div>
        <div>
          <input type="checkbox" id="fullyBooked" name="fullyBooked" onClick={() => filterByFloor('8')}/>
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