export const isDev = false
export const urlProtocol = isDev? 'http':'https'
export const subdomain = isDev? 'stage.' : ''

export const server = 'https://halloffame-server.herokuapp.com'

export function consoleLog() {
  if (process.env.NODE_ENV != 'production' || isDev) {
    const args = [...arguments]
    console.log(...args)
  }
}
