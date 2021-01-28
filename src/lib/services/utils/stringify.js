export function buildParam(prefix, obj, add) {
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; ++i) {
      add(`${prefix}[]`, obj[i])
    }
  } else if (obj && typeof obj === 'object') {
    for (const name in obj) {
      if ({}.hasOwnProperty.call(obj, name)) {
        buildParam(`${prefix}[${name}]`, obj[name], add)
      }
    }
  } else {
    add(prefix, obj)
  }
}
export function stringify(object) {
  const pairs = []
  const add = (key, value) => {
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
  }
  for (const name in object) {
    if ({}.hasOwnProperty.call(object, name)) {
      buildParam(name, object[name], add)
    }
  }
  return pairs.join('&').replace(/%20/g, '+')
}
export function arrayToUrlQueryString(params, key) {
  return params && params.join ? `${key}=${params.join(`&${key}=`)}` : ''
}
