import api from './init'

export function listRooms() {
  return api.get('/rooms')
    .then((res) => res.data)
}