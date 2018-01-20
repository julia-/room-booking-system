export const initialRoom = {
  _id: '5a5c0d782b191c21b1eebf4e',
  name: 'Room 1',
  floor: '8',
  capacity: 18,
  bookings: [],
  assets: {
    whiteBoard: false,
    opWalls: false,
    tv: false,
    projector: false,
    pcLab: true,
    macLab: false
  },
  __v: 0
}

const formatAssetName = asset => {
  if (asset === 'opWalls') {
    return 'Operable Walls'
  } else if (asset === 'pcLab') {
    return 'PC Lab'
  } else if (asset === 'macLab') {
    return 'Mac Lab'
  } else if (asset === 'tv') {
    return 'TV'
  } else if (asset === 'whiteBoard') {
    return 'Whiteboard'
  } else if (asset === 'projector') {
    return 'Projector'
  }
}

export default formatAssetName
