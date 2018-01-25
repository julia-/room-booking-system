import moment from 'moment'
import { formatTime, timeSelectOptions} from '../helpers/bookingForm'

// Initial room filter parameters
export const floorParams = [ {name: '8', value: false}, {name: '13', value: false}, {name: 'all', value: false}]

// initial feature filter parameters
export const filterParams = [ 
  {name: 'macLab', value: false},
  {name: 'pcLab', value: false},
  {name: 'tv', value: false},
  {name: 'opWalls', value: false},
  {name: 'projector', value: false} ]

// Initial Capacity parameters
export const capacityParams = [
  {capacity: 16, id: '16seats', value: false},
  {capacity: 18, id: '18seats', value: false},
  {capacity: 20, id: '20seats', value: false},
  {capacity: 24, id: '24seats', value: false},
  {capacity: 40, id: '40seats', value: false},
]

// Filtering Functions

// Filter roomData by floor
export  const onFilterByFloor = (param, filteredData) => {
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

// Filter data by capacity
export const onFilterByCapacity = (params, filteredData) => {
  let roomsByCapacity = []
  params.forEach(capacity => {
    if (capacity.value === true) {
      roomsByCapacity.push(...filteredData.filter(room => room.capacity === capacity.capacity))
    }
  })
  if (roomsByCapacity.length > 0) {
    return roomsByCapacity
  } else {
    return filteredData
  }
}

// Filter data by availability
export const onFilterByAvailablity = (params, filteredData) => {
  if (params === 'fullyAvail') {
    filteredData = filteredData.filter(room => room.bookings.length === 0)
  } else if (params === 'partAvail') {
    filteredData = filteredData.filter(room => room.bookings.length > 0)
  } else if (params === 'fullBooked') {
    filteredData =
      !filteredData.filter(room => room.bookings.length > 0) &&
      !filteredData.filter(room => room.bookings.length === 0)
  }
  return filteredData
}
