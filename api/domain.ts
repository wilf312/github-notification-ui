import {getToken} from '../token'
const domain = process.env.domain || 'https://api.github.com'

const getHeaders = () => {
  const defaultHeaders = new Headers()
  defaultHeaders.append('Authorization', `token ${getToken()}`)
  defaultHeaders.append('accept', `application/vnd.github.v3+json`)

  return defaultHeaders
}

/**
 * @param path /path/to
 * @doc rate limit https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
 */
type customHeadersOptionNotification = {
  'If-Modified-Since'?: string
}
type Options = {
  method?: string
  customHeaders?: customHeadersOptionNotification
  body?: Object
}
export const request = (path, {
  method = 'GET',
  customHeaders = {},
  body = {}
}: Partial<Options> = {}) => {

  const headers = getHeaders()
  for (const [key, value] of Object.entries(customHeaders)) {
    headers.append(key, value)
  }

  let requestInit: RequestInit = {
    method,
    headers
  }

  if (method !== 'GET' && Object.keys(body).length > 0) {
    requestInit = {
      ...requestInit,
      body: JSON.stringify(body)
    }
  }

  return fetch(`${domain}${path}`, requestInit)
}