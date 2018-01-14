import api, { setToken } from './init'
import decodeJWT from 'jwt-decode'

// Sends a POST request to /auth on the server, with the email & password returning the JWT
// Belonging to the user with supplied credentials
export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then((res) => {
      const token = res.data.token
      setToken(token)
      const decodedToken = decodeJWT(token)
      return decodedToken
    })
}