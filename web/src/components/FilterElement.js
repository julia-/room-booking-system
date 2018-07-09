import React from 'react'
import Button from './Button'
import moment from 'moment'
import { formatTime, startTimeSelectOptions, endTimeSelectOptions } from '../helpers/bookingForm'

const FilterElement = ({
  onSetFloorParam,
  onToggleFeature,
  floorParam,
  filterParams,
  //  date
}) =>
  <div className="sidebar__box--filter filter">
    <h3 className="header__heading header__heading--sidebar">Filter</h3>
    <form className="form form--filter">
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
    </form>
  </div>;

export default FilterElement;