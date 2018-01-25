const Room = require('./Room')

Room.create([
  // Level 8
  {
    name: 'Room 1',
    floor: '8',
    capacity: 18,
    assets: {
      pcLab: true
    }
  },
  {
    name: 'Room 2',
    floor: '8',
    capacity: 18,
    assets: {
      projector: true
    }
  },
  {
    name: 'Room 3',
    floor: '8',
    capacity: 18,
    assets: {
      projector: true,
      opWalls: true
    }
  },
  {
    name: 'Room 4',
    floor: '8',
    capacity: 24
  },
  {
    name: 'Room 5',
    floor: '8',
    capacity: 18,
    assets: {
      opWalls: true
    }
  },
  {
    name: 'Room 6',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 7',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 8',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 9',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 10',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 11',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 12',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    }
  },
  {
    name: 'Room 13',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Room 14',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    }
  },
  {
    name: 'Room 15',
    floor: '8',
    capacity: 18,
    assets: {
      tv: true
    }
  },
  {
    name: 'Studio 11',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Studio 12',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Studio 13',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Studio 14',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Studio 15',
    floor: '8',
    capacity: 18
  },
  {
    name: 'Lab 01',
    floor: '8',
    capacity: 20,
    assets: {
      macLab: true
    }
  },
  // Level 13
  {
    name: 'Room 1',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    }
  },
  {
    name: 'Room 2',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    }
  },
  {
    name: 'Room 3',
    floor: '13',
    capacity: 20,
    assets: {
      opWalls: true
    }
  },
  {
    name: 'Room 4',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true,
      opWalls: true
    }
  },
  {
    name: 'Room 5',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    }
  },
  {
    name: 'Room 6',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    }
  },
  {
    name: 'Room 7',
    floor: '13',
    capacity: 20,
    assets: {
      projector: true
    }
  },
  {
    name: 'Room 8/9',
    floor: '13',
    capacity: 40,
    assets: {
      projector: true
    }
  },
  {
    name: 'Room 10',
    floor: '13',
    capacity: 16
  },
  {
    name: 'Room 11',
    floor: '13',
    capacity: 20
  },
  {
    name: 'Room 12',
    floor: '13',
    capacity: 20
  },
  {
    name: 'Room 13',
    floor: '13',
    capacity: 20,
    assets: {
      macLab: true
    }
  },
  {
    name: 'Room 14',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    }
  },
  {
    name: 'Room 15',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    }
  },
  {
    name: 'Room 16',
    floor: '13',
    capacity: 20,
    assets: {
      pcLab: true
    }
  },
  {
    name: 'Room 17',
    floor: '13',
    capacity: 20
  },
  {
    name: 'Room 18',
    floor: '13',
    capacity: 20
  },
  {
    name: 'Green Screen Room',
    floor: '13',
    capacity: null,
    assets: {
      tv: true
    }
  }
])
  .then((rooms) => {
    console.log(`Created ${rooms.length} rooms.`)
  })
  .catch((error) => {
    console.error(error)
  })