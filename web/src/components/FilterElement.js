import React from 'react'
import Button from './Button'

function FilterElement({
  onSetFloorParam,
  onToggleFeature,
  onToggleCapacity,
  onSetAvailabilityParam,
  onFilterAll
}) {

  return (
    <div className="sidebar__box--filter filter">
      <h3 className="header__heading header__heading--sidebar">Filter</h3>
      <form className="form form--filter" >
        <h4 className="form__heading form__heading--filter">Level</h4>
        <div className="form__group" onChange={(event) => onSetFloorParam(event.target.value)}>
          <div className="form_group">
            <input type="radio" value="8" name="floor-select" className="form__input--radio"/>
            <label for="floor8" className="form__label form__label--inline">Level 8</label>
          </div>
          <div className="form_group">
            <input type="radio" value="13" name="floor-select" className="form__input--radio"/>
            <label for="floor13" className="form__label form__label--inline">Level 13</label>
          </div>
          <div className="form_group">
            <input type="radio" value="all" name="floor-select" className="form__input--radio" />
            <label for="floor13" className="form__label form__label--inline">All Levels</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Features</h4>
        <div onChange={(event) => onToggleFeature(event.target.name)} >
          <div className="form__group">
            <input type="checkbox" id="macLab" name="macLab" className="form__input--checkbox"/>
            <label for="macLab" className="form__label form__label--inline">Mac Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="pcLab" name="pcLab" />
            <label for="pcLab" className="form__label form__label--inline">PC Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="tv" name="tv" />
            <label for="tv" className="form__label form__label--inline">TV</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="opWalls" name="opWalls" />
            <label for="opWall" className="form__label form__label--inline">Operable Walls</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="whiteboard" name="whiteboard" />
            <label for="whiteboard" className="form__label form__label--inline">Whiteboard</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="projector" name="projector" />
            <label for="projector" className="form__label form__label--inline">Projector</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Capacity</h4>
        <div onChange={ (event) => onToggleCapacity(event.target.id)}>
          <div className="form_group">
            <input type="checkbox" id="16seats" name="16seats"/>
            <label for="16seats" className="form__label form__label--inline">16 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="18seats" name="18seats"/>
            <label for="18seats" className="form__label form__label--inline">18 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="20seats" name="20seats"/>
            <label for="20seats" className="form__label form__label--inline">20 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="24seats" name="24seats"/>
            <label for="24seats" className="form__label form__label--inline">24 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="40seats" name="40seats"/>
            <label for="40seats" className="form__label form__label--inline">40 Seats</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Availability</h4>
          <div onChange={(event) => onSetAvailabilityParam(event.target.value)} >
            <div className="form_group">
              <input type="radio" id="fullyAvailable" value="fullyAvail" name="availability" />
              <label for="fullyAvailable" className="form__label form__label--inline">Fully Available</label>
            </div>
            <div className="form_group">
              <input type="radio" id="partialAvailable" value="partAvail" name="availability" />
              <label for="partialAvailable" className="form__label form__label--inline">Partially Available</label>
            </div>
            <div className="form_group">
              <input type="radio" id="fullyBooked" value="fullBooked" name="availability" />
              <label for="fullyBooked" className="form__label form__label--inline">Fully Booked</label>
            </div>
          </div>
          <h4 className="form__heading form__heading--filter">Time</h4>
          <div className="form__container--time">
            <div className="form_group">
              <label className="form__label form__label--inline">
                  {'From'}
              <input type="time" name="startTime" min="00:00" max="23:00" className="form__input form__input--time"/>
              </label>
            </div>
            <div className="form_group">
              <label className="form__label form__label--inline">
                  {'To'}
                <input type="time" name="endTime" min="00:00" max="23:00" className="form__input form__input--time"/>
              </label>
            </div>
          </div>
          <div className="form__group--button">
            <Button onClick={() => onFilterAll()} className="button button--inline" text={'Filter'} />
            <Button onClick={() => onFilterAll()} className="button button--inline button--alternative" text={'Reset'} />
          </div>
      </form>
    </div>
  )
}

export default FilterElement