import React from 'react'

export const roomSorter = (roomList, floorNumber) => {
  
  let copiedList = roomList.slice(0)
  
  // filter list of rooms to those on the given floor
  let filteredList = copiedList.filter(room => {
    return room.floor === floorNumber
  })
  
  // function to sort rooms numerically by their floor number
  const numericalSort = roomList => { 
    return roomList.sort((first, second) => {
      const firstRoom = first.name.replace(/\D+/, '')
      const secondRoom = second.name.replace(/\D+/, '')
      if (parseInt(firstRoom) > parseInt(secondRoom)) {
        return 1
      } else {
        return 0
      }
    })
  }
  
  // numerically sort a new array with each room named 'Room'
  let nameRoom = numericalSort(
    filteredList.filter(room => room.name[0] === 'R')
  )
  
  // numerically sort a new array with each room named 'Studio'
  let nameStudio = numericalSort(
    filteredList.filter(room => room.name[0] === 'S')
  )
  
  // numerically sort a new array with all other named room types
  let nameOther = numericalSort(
    filteredList.filter(room => room.name[0] !== 'S' && room.name[0] !== 'R')
  )
  
  // re-combine the sorted rooms, studios and others into a single array
  return nameRoom.concat(nameStudio).concat(nameOther)
}
