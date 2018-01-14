import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export default api