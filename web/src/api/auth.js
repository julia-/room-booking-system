import api from './init'

export function signIn({ email, password }) {
  return api.post('/auth', { email, password })
    .then((res) => {
      return res.data
    })
}