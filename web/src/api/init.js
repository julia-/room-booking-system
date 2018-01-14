import axios from 'axios'

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:7000'
})

// Setting the Authorisation header for all future GET requests 
export function setToken(token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api