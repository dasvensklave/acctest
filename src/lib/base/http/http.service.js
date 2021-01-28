import axios from 'axios'
import { Observable, throwError } from 'rxjs'
import { interpolateRegex } from '../utils/regex'
import { getBaseUri } from './http.config'
import { REQUEST_METHOD } from './http.model'

export class HttpClient {
  init() {
    this.httpInstance = axios.create({
      baseURL: `${getBaseUri()}/`,
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    })
  }
  get(payload = {}) {
    return this.overrideRequest(payload, REQUEST_METHOD.GET)
  }
  post(payload) {
    return this.overrideRequest(payload, REQUEST_METHOD.POST)
  }
  put(payload) {
    return this.request(payload, REQUEST_METHOD.PUT)
  }
  delete(payload) {
    return this.request(payload, REQUEST_METHOD.DELETE)
  }
  patch(payload) {
    return this.request(payload, REQUEST_METHOD.PATCH)
  }
  overrideRequest(payload, requestMethod) {
    return this.request(payload, requestMethod)
  }
  request(payload = {}, requestMethod) {
    let compiledPath = payload.path
    if (payload.urlParameters) {
      compiledPath = interpolateRegex(payload.path, payload.urlParameters)
    }
    return this.invokeHttp(requestMethod, compiledPath, payload)
  }
  invokeHttp(requestMethod, compiledPath, payload) {
    const config = {
      url: compiledPath,
      method: requestMethod,
      data: payload.data || {},
      headers: payload.headers || {},
      timeout: 30000,
      responseType: 'json',
      baseURL: payload.baseUri || getBaseUri(),
      params: payload.queryParameters,
      paramsSerializer: payload.paramsSerializer,
    }
    return new Observable((observer) => {
      this.httpInstance
        .request(config)
        .then((response) => {
          const typedResponse = response
          if (typedResponse.status >= 200 && typedResponse.status < 300) {
            return observer.next(typedResponse.data)
          }
          throw new Error(
            typedResponse.data ||
              `Error with status code: ${typedResponse.status}`
          )
        })
        .catch((error) => {
          observer.error(error)
          return throwError(error)
        })
    })
  }
}
export const httpService = new HttpClient()
