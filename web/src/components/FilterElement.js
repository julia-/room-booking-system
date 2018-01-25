import React from 'react'
import Button from './Button'
import moment from 'moment'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../helpers/bookingForm'

function FilterElement({
  onSetFloorParam,
  onToggleFeature,
  onToggleCapacity,
  onSetAvailabilityParam,
  floorParam,
  filterParams,
  capacityParams,
  availabilityParam,
  date
}) {

  return (
    <div className="sidebar__box--filter filter">
      <h3 className="header__heading header__heading--sidebar">Filter</h3>
      <form className="form form--filter">
        <h4 className="form__heading form__heading--filter">Level</h4>
        <div className="form__group" onChange={(event) => onSetFloorParam(event.target.value)}>
          <div className="form_group">
            <input type="radio" value="8" name="floor-select" className="form__input--radio" checked={floorParam === '8' ? true : false}/>
            <label for="floor8" className="form__label form__label--inline">Level 8</label>
          </div>
          <div className="form_group">
            <input type="radio" value="13" name="floor-select" className="form__input--radio" checked={floorParam === '13' ? true : false}/>
            <label for="floor13" className="form__label form__label--inline">Level 13</label>
          </div>
          <div className="form_group">
            <input type="radio" value="all" name="floor-select" className="form__input--radio" checked={floorParam === 'all' ? true : false}/>
            <label for="all" className="form__label form__label--inline">All Levels</label>
          </div>
        </div>

        <h4 className="form__heading form__heading--filter">Features</h4>
        <div onChange={(event) => onToggleFeature(event.target.name)} >
          <div className="form__group">
            <input type="checkbox" id="macLab" name="macLab" className="form__input--checkbox" checked={filterParams[0].value} />
            <label for="macLab" className="form__label form__label--inline">Mac Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="pcLab" name="pcLab" className="form__input--checkbox" checked={filterParams[1].value} />
            <label for="pcLab" className="form__label form__label--inline">PC Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="tv" name="tv" className="form__input--checkbox" checked={filterParams[2].value} />
            <label for="tv" className="form__label form__label--inline">TV</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="opWalls" name="opWalls" className="form__input--checkbox" checked={filterParams[3].value} />
            <label for="opWall" className="form__label form__label--inline">Operable Walls</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="projector" name="projector" className="form__input--checkbox" checked={filterParams[4].value} />
            <label for="projector" className="form__label form__label--inline">Projector</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Capacity</h4>
        <div onChange={ (event) => onToggleCapacity(event.target.id)}>
          <div className="form_group">
            <input type="checkbox" id="16seats" name="16seats" className="form__input--checkbox" checked={capacityParams[0].value} />
            <label for="16seats" className="form__label form__label--inline">16 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="18seats" name="18seats" className="form__input--checkbox" checked={capacityParams[1].value} />
            <label for="18seats" className="form__label form__label--inline">18 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="20seats" name="20seats" className="form__input--checkbox" checked={capacityParams[2].value} />
            <label for="20seats" className="form__label form__label--inline">20 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="24seats" name="24seats" className="form__input--checkbox" checked={capacityParams[3].value} />
            <label for="24seats" className="form__label form__label--inline">24 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="40seats" name="40seats" className="form__input--checkbox" checked={capacityParams[4].value} />
            <label for="40seats" className="form__label form__label--inline">40 Seats</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Availability</h4>
          <div onChange={(event) => onSetAvailabilityParam(event.target.value)} >
            <div className="form_group">
              <input type="radio" id="fullyAvailable" value="fullyAvail" name="availability" className="form__input--radio" checked={availabilityParam === 'fullyAvail' ? true : false} />
              <label for="fullyAvailable" className="form__label form__label--inline">Fully Available</label>
            </div>
            <div className="form_group">
              <input type="radio" id="partialAvailable" value="partAvail" name="availability" className="form__input--radio" checked={availabilityParam === 'partAvail' ? true : false} />
              <label for="partialAvailable" className="form__label form__label--inline">Partially Available</label>
            </div>
            <div className="form_group">
              <input type="radio" id="fullyBooked" value="fullBooked" name="availability" className="form__input--radio" checked={availabilityParam === 'fullBooked' ? true : false} />
              <label for="fullyBooked" className="form__label form__label--inline">Fully Booked</label>
            </div>
          </div>
      </form>
    </div>
  )
}

export default FilterElement