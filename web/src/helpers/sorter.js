import React from 'react'

export const levelEightSorter = (roomList) => {
  
    let copiedList = roomList.slice(0)

    let filteredList = copiedList.filter(room => {
      return room.floor === '8'
    })
  
    let sortedList = filteredList.sort((first, second) => {
      const firstRoom = first.name.replace(/\d+/, '')
      const secondRoom = second.name.replace(/\d+/, '')
      if (firstRoom > secondRoom) {
        return 1
      } else {
        return 0
      }
    })
  
    sortedList.push(filteredList.shift())
 
    return filteredList
}

export const levelThirteenSorter = (roomList) => {

  let copiedList = roomList.slice(0)

  let sortedList = copiedList.sort((first, second) => {
    const firstRoom = first.name.match(/\d+/, '')
    const secondRoom = second.name.match(/\d+/, '')
    return firstRoom - secondRoom
  })

  let filteredList = sortedList.filter(room => {
    return room.floor === '13'
  })

  filteredList.push(sortedList.shift())
  filteredList.shift()

  return filteredList
}
