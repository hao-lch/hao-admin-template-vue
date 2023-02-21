import Cookies from 'js-cookie'

const key = 'hao-admin-template'

export function getToken() {
  return Cookies.get(key)
}

export function setToken(token: string) {
  return Cookies.set(key, token)
}

export function removeToken() {
  return Cookies.remove(key)
}
