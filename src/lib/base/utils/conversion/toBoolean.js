import { isBoolean, isNumber, replace, trim } from 'lodash-es'
export function toBoolean(value) {
  if (!value) {
    return false
  }
  if (isNumber(value) || isBoolean(value)) {
    return !!value
  }
  return replace(trim(value.toLowerCase()), /[""'']/gi, '') === 'true'
}
