import React from 'react'

function FilterElement({
  filterByFloor,
  onToggleCapacity,
  filterByFeature,
  filterByAvailability,
  onToggleFeature
}) {

  return (
    <form className="filter-element" >
      <h2>Filter By:</h2>
      <h3>Floor</h3>
      <div className="floor-select" onChange={(event) => filterByFloor(event.target.value)}>
        <div>
          <input type="radio" value="8" name="floor-select" />
          <label for="floor8">Floor 8</label>
        </div>
        <div>
          <input type="radio" value="13" name="floor-select" />
          <label for="floor13">Floor 13</label>
        </div>
        <div>
          <input type="radio" value="all" name="floor-select" />
          <label for="floor13">All Floors</label>
        </div>
      </div>
      <h3>Features</h3>
      <div onChange={(event) => onToggleFeature(event.target.name)} >
        <div>
          <input type="checkbox" id="macLab" name="macLab" />
          <label for="macLab">Mac Lab</label>
        </div>
        <div>
          <input type="checkbox" id="pcLab" name="pcLab" />
          <label for="pcLab">PC Lab</label>
        </div>
        <div>
          <input type="checkbox" id="tv" name="tv" />
          <label for="tv">TV</label>
        </div>
        <div>
          <input type="checkbox" id="opWalls" name="opWalls" />
          <label for="opWall">Operable Walls</label>
        </div>
        <div>
          <input type="checkbox" id="whiteboard" name="whiteboard" />
          <label for="whiteboard">Whiteboard</label>
        </div>
        <div>
          <input type="checkbox" id="projector" name="projector" />
          <label for="projector">Projector</label>
        </div>
      </div>
      <h3>Capacity</h3>
      <div onChange={ (event) => onToggleCapacity(event.target.id)}>
        <div>
          <input type="checkbox" id="16seats" name="16seats"/>
          <label for="16seats">16 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="18seats" name="18seats"/>
          <label for="18seats">18 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="20seats" name="20seats"/>
          <label for="20seats">20 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="24seats" name="24seats"/>
          <label for="24seats">24 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="40seats" name="40seats"/>
          <label for="40seats">40 Seats</label>
        </div>
      </div>
      <h3>Availability</h3>
        <div className="radio-container" onChange={(event) => filterByAvailability(event.target.value)} >
          <div className="radio"> 
            <input type="radio" id="fullyAvailable" value="fullyAvail" name="availability" />
            <label for="fullyAvailable">Fully Available</label>
          </div>
          <div className="checkbox">
            <input type="radio" id="partialAvailable" value="partAvail" name="availability" />
            <label for="partialAvailable">Partially Available</label>
          </div>
          <div className="checkbox">
            <input type="radio" id="fullyBooked" value="fullBooked" name="availability" />
            <label for="fullyBooked">Fully Booked</label>
          </div>
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