import React from 'react'

const RoomRow = props => (
  <tr>
    <td>{props.room.name}</td>
    {Object.keys(props.room.assets).map(
      asset => props.room.assets[asset] && <td>{asset}</td>
    )}
  </tr>
)

export default RoomRow
