import React from 'react'
import formatAssetName from '../helpers/rooms'
import { dailyBookings, bookingArray, rowMapper } from '../api/rooms'

const RoomRow = props => (
  <tr className="table__row">
    <th scope="row" className="table__cell--align-left">
      {props.room.name}
    </th>
    <td className="table__data--asset">
      {Object.keys(props.room.assets).map(
        asset =>
          props.room.assets[asset] && (
            <span key={asset}>{formatAssetName(asset)}</span>
          )
      )}
    </td>
    {rowMapper(bookingArray(dailyBookings(props.date, props.bookings)))}
  </tr>
)

export default RoomRow
