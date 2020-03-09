export const isDev = false
export const urlProtocol = isDev? 'http':'https'
export const subdomain = isDev? 'stage.' : ''

export const nginx = 'http://nginx/api'
export const apiBaseUrl = nginx
export const clientBaseUrl = nginx

export function consoleLog() {
  // if (process.env.NODE_ENV != 'production' || isDev) {
    const args = [...arguments]
    console.log(...args)
  // }
}
