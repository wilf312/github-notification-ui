import {token} from '../token'
const domain = process.env.domain || 'https://api.github.com'
const defaultHeaders = new Headers()
defaultHeaders.append('Authorization', `token ${token}`)
defaultHeaders.append('accept', `application/vnd.github.v3+json`)

/**
 * @param path /path/to
 * @doc rate limit https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
 */
export const request = (path, method = 'GET', body = {}) => {

  let requestInit: RequestInit = {
    method,
    headers: defaultHeaders
  }

  if (method !== 'GET' && Object.keys(body).length > 0) {
    requestInit = {
      ...requestInit,
      body: JSON.stringify(body)
    }
  }


  return fetch(`${domain}${path}`, requestInit)
}