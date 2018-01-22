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

// Filtering Fucntions

export  const onFilterByFloor = (param, filteredData) => {
  if (param === 'all') {
    return filteredData
  } else {
    return filteredData.filter(room => room.floor === param)
  }
}

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

export const onFilterByCapacity = (params, filteredData) => {
  let roomsByCapacity = []
  params.forEach(capacity => {
    if (capacity.value === true) {
      roomsByCapacity.push(...filteredData.filter(room => room.capacity === capacity.capacity))
    }
  })
  console.log('fd', roomsByCapacity)
  return roomsByCapacity
}

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
  console.log('before return', filteredData)
  return filteredData
}