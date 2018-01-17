import axios from 'axios'
import { rememberToken, getValidToken } from './token'

// TODO: add env.production variable
const baseURL = process.env.REACT_APP_BASE_URL

// Create an axios instance
const api = axios.create({
  baseURL
})

// Create the google authentication URL
export function makeGoogleAuthURL(path) {
  return baseURL + path
}

export function setToken(token) {
  // saves token to local storage
  rememberToken(token)
  if (token) {
    // Setting the Authorisation header for all future GET requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Validates token, and removes it if it's invalid
setToken(getValidToken())

export default api
