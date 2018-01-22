import React from 'react'

function FilterElement({
  onSetFloorParam,
  onToggleFeature,
  onToggleCapacity,
  onSetAvailabilityParam,
  onFilterAll,
  onResetFeatureParams,
  onResetCapacityParams,
  filterParams,
  capacityParams,
  floorParam,
  availabilityParam
}) {
  const features = ['macLab', 'pcLab', 'tv']

  return (
    <form className="filter-element" >
      <h2>Filter By:</h2>
      <h3>Floor</h3>
      <div className="floor-select" onChange={(event) => onSetFloorParam(event.target.value)}>
        <div>
          <input type="radio" value="8" name="floor-select" checked={floorParam === '8' ? true : false}/>
          <label for="floor8">Floor 8</label>
        </div>
        <div>
          <input type="radio" value="13" name="floor-select" checked={floorParam === '13' ? true : false}/>
          <label for="floor13">Floor 13</label>
        </div>
        <div>
          <input type="radio" value="all" name="floor-select" checked={floorParam === 'all' ? true : false}/>
          <label for="all">All Floors</label>
        </div>
      </div>
      <h3>Features</h3>
      <div onChange={(event) => onToggleFeature(event.target.name)} >
        <div>
          <input type="checkbox" id="macLab" name="macLab" checked={filterParams[0].value} />
          <label for="macLab">Mac Lab</label>
        </div>
        <div>
          <input type="checkbox" id="pcLab" name="pcLab" checked={filterParams[1].value} />
          <label for="pcLab">PC Lab</label>
        </div>
        <div>
          <input type="checkbox" id="tv" name="tv" checked={filterParams[2].value} />
          <label for="tv">TV</label>
        </div>
        <div>
          <input type="checkbox" id="opWalls" name="opWalls" checked={filterParams[3].value} />
          <label for="opWall">Operable Walls</label>
        </div>
        <div>
          <input type="checkbox" id="projector" name="projector" checked={filterParams[4].value} />
          <label for="projector">Projector</label>
        </div>
      </div>
      <h3>Capacity</h3>
      <div onChange={ (event) => onToggleCapacity(event.target.id)}>
        <div>
          <input type="checkbox" id="16seats" name="16seats" checked={capacityParams[0].value}/>
          <label for="16seats">16 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="18seats" name="18seats" checked={capacityParams[1].value}/>
          <label for="18seats">18 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="20seats" name="20seats" checked={capacityParams[2].value}/>
          <label for="20seats">20 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="24seats" name="24seats" checked={capacityParams[3].value}/>
          <label for="24seats">24 Seats</label>
        </div>
        <div>
          <input type="checkbox" id="40seats" name="40seats"checked={capacityParams[4].value}/>
          <label for="40seats">40+ Seats</label>
        </div>
      </div>
      <h3>Availability</h3>
        <div className="radio-container" onChange={(event) => onSetAvailabilityParam(event.target.value)} >
          <div className="radio"> 
            <input type="radio" id="fullyAvailable" value="fullyAvail" name="availability" checked={availabilityParam === 'fullyAvail' ? true : false} />
            <label for="fullyAvailable">Fully Available</label>
          </div>
          <div className="checkbox">
            <input type="radio" id="partialAvailable" value="partAvail" name="availability" checked={availabilityParam === 'partialAvailable' ? true : false}/>
            <label for="partialAvailable">Partially Available</label>
          </div>
          <div className="checkbox">
            <input type="radio" id="fullyBooked" value="fullBooked" name="availability" checked={availabilityParam === 'fullBooked' ? true : false}/>
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
            <div onClick={ () => onFilterAll()} className='custom-button filter-button'>Filter</div>
            <div onClick={ () => {
              onResetFeatureParams()
              onResetCapacityParams()
            }} 
                 className='custom-button reset-button'>Reset</div>
          </div>
    </form>
  )
}

export default FilterElement