// For storing the logged in user's credentails across page refreshes
import decodeJWT from 'jwt-decode'
const key = 'userToken'

export function rememberToken(token) {
  if (token) {
    // store the token
    localStorage.setItem(key, token)
  }
  else {
    // Clear token from local storage
    localStorage.removeItem(key)
  }
}

export function getValidToken() {
  const token = localStorage.getItem(key) 
  try {
    const decodedToken = decodeJWT(token)
    // valid token
    const now = Date.now() / 1000
    // check if token has expired
    if (now > decodedToken.exp) {
      return null
    }
    return token
  }
  catch (error) {
    // invalid token
    return null
  }
}

export function getDecodedToken() {
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  }
  else {
    return null
  }
}