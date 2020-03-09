import Cookies from 'js-cookie'

export const setCookie = (payload) => {
  if (payload && payload.status_code == 200  && payload.access && payload.refresh) {
    Cookies.set('access', payload.access, { expires: 1 })
    Cookies.set('refresh', payload.refresh, { expires: 30 })
  } else {
    Cookies.remove('access')
    Cookies.remove('refresh')
  }
}
