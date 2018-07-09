import React from 'react'
import Button from './Button'
import moment from 'moment'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../helpers/bookingForm'

const FilterElement = ({
  onSetFloorParam,
  onToggleFeature,
  onToggleCapacity,
  floorParam,
  filterParams,
  capacityParams,
  date
}) => 
    <div className="sidebar__box--filter filter">
      <h3 className="header__heading header__heading--sidebar">Filter</h3>
      <form className="form form--filter">
        <h4 className="form__heading form__heading--filter">Level</h4>
        <div className="form__group" onChange={(event) => onSetFloorParam(event.target.value)}>
          <div className="form_group">
            <input type="radio" value="8" name="floor-select" className="form__input--radio" defaultChecked={floorParam === '8' ? true : false}/>
            <label htmlFor="floor8" className="form__label form__label--inline">Level 8</label>
          </div>
          <div className="form_group">
            <input type="radio" value="13" name="floor-select" className="form__input--radio" defaultChecked={floorParam === '13' ? true : false}/>
            <label htmlFor="floor13" className="form__label form__label--inline">Level 13</label>
          </div>
          <div className="form_group">
            <input type="radio" value="all" name="floor-select" className="form__input--radio" defaultChecked={floorParam === 'all' ? true : false}/>
            <label htmlFor="all" className="form__label form__label--inline">All Levels</label>
          </div>
        </div>

        <h4 className="form__heading form__heading--filter">Features</h4>
        <div onChange={(event) => onToggleFeature(event.target.name)} >
          <div className="form__group">
            <input type="checkbox" id="macLab" name="macLab" className="form__input--checkbox" defaultChecked={filterParams[0].value} />
            <label htmlFor="macLab" className="form__label form__label--inline">Mac Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="pcLab" name="pcLab" className="form__input--checkbox" defaultChecked={filterParams[1].value} />
            <label htmlFor="pcLab" className="form__label form__label--inline">PC Lab</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="tv" name="tv" className="form__input--checkbox" defaultChecked={filterParams[2].value} />
            <label htmlFor="tv" className="form__label form__label--inline">TV</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="opWalls" name="opWalls" className="form__input--checkbox" defaultChecked={filterParams[3].value} />
            <label htmlFor="opWall" className="form__label form__label--inline">Operable Walls</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="projector" name="projector" className="form__input--checkbox" defaultChecked={filterParams[4].value} />
            <label htmlFor="projector" className="form__label form__label--inline">Projector</label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Capacity</h4>
        <div onChange={ (event) => onToggleCapacity(event.target.id)}>
          <div className="form_group">
            <input type="checkbox" id="16seats" name="16seats" className="form__input--checkbox" defaultChecked={capacityParams[0].value} />
            <label htmlFor="16seats" className="form__label form__label--inline">16 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="18seats" name="18seats" className="form__input--checkbox" defaultChecked={capacityParams[1].value} />
            <label htmlFor="18seats" className="form__label form__label--inline">18 Seats</label>
          </div>
          <div className="form_group">
            <input type="checkbox" id="20seats" name="20seats" className="form__input--checkbox" defaultChecked={capacityParams[2].value} />
            <label htmlFor="20seats" className="form__label form__label--inline">20 Seats</label>
          </div>
          <div className="form_group">
            <input 
              type="checkbox" 
              id="24seats" 
              name="24seats" 
              className="form__input--checkbox" 
              defaultChecked={capacityParams[3].value} 
            />
            <label htmlFor="24seats" className="form__label form__label--inline">
              24 Seats
            </label>
          </div>
          <div className="form_group">
            <input 
              type="checkbox" 
              id="40seats" 
              name="40seats" 
              className="form__input--checkbox" 
              defaultChecked={capacityParams[4].value} 
            />
            <label htmlFor="40seats" className="form__label form__label--inline">
              40 Seats
            </label>
          </div>
        </div>
        <h4 className="form__heading form__heading--filter">Availability</h4>
        <div 
          //  onChange={event => onSetAvailabilityParam(event.target.value)}
        >
            <div className="form_group">
              <input 
                type="radio" 
                id="fullyAvailable" 
                value="fullyAvail" 
                name="availability" 
                className="form__input--radio" 
                defaultChecked={false} 
             />
             <label htmlFor="fullyAvailable" className="form__label form__label--inline">
               Fully Available
             </label>
            </div>
            <div className="form_group">
              <input 
                type="radio" 
                id="partialAvailable" 
                value="partAvail" 
                name="availability" 
                className="form__input--radio" 
                defaultChecked={false} 
              />
              <label htmlFor="partialAvailable" className="form__label form__label--inline">
                Partially Available
              </label>
            </div>
            <div className="form_group">
              <input 
                type="radio" 
                id="fullyBooked" 
                value="fullBooked" 
                name="availability" 
                className="form__input--radio" 
                defaultChecked={false} 
              />
              <label htmlFor="fullyBooked" className="form__label form__label--inline">
                Fully Booked
              </label>
            </div>
          </div>
      </form>
    </div>;

export default FilterElement;