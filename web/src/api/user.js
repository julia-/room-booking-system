import React from 'react'
import api from './init'

export function getUser(id) {
  return api.get(`/users/${id}`).then(res => res.data)
}