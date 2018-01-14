import axios from 'axios'
import { saveToken } from './token'

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  // saves token to local storage
  saveToken(token)
  if (token) {
    // Setting the Authorisation header for all future GET requests 
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api