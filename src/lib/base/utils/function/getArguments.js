import { forEach, isFunction, isObject } from 'lodash-es'
export function argumentToString(args) {
  let returnString = ''
  forEach(Array.prototype.slice.call(args), (data) => {
    if (isFunction(data)) {
    } else if (isObject(data)) {
      returnString += `${JSON.stringify(data)}.`
    } else {
      returnString += `${data}.`
    }
  })
  return returnString
}
