import moment from 'moment'
import { formatTime, timeSelectOptions } from '../helpers/bookingForm'


export const floorParams = [{ name: '8', value: false }, { name: '13', value: false }, { name: 'all', value: false }]
// initial feature filter parameters
export const filterParams = [
  { name: 'macLab', value: false },
  { name: 'pcLab', value: false },
  { name: 'tv', value: false },
  { name: 'opWalls', value: false },
  { name: 'projector', value: false }]


// Filter roomData by floor
export const onFilterByFloor = (param, filteredData) => {
  if (param === 'all') {
    return filteredData
  } else {
    return filteredData.filter(room => room.floor === param)
  }
}
// Filter data by feature
export const onFilterByFeature = (params, filteredData) => {
  params.forEach(feature => {
    if (feature.name === 'macLab' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.macLab === true)
    } else if (feature.name === 'pcLab' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.pcLab === true)
    } else if (feature.name === 'tv' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.tv === true)
    } else if (feature.name === 'opWall' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.opWalls === true)
    } else if (feature.name === 'projector' && feature.value === true) {
      filteredData = filteredData.filter(room => room.assets.projector === true)
    }
  })
  return filteredData
}
