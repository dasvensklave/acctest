export function requestHeaders(headers = {}) {
  const authorization = 'token'
  return {
    authorization,
    ...headers,
  }
}
