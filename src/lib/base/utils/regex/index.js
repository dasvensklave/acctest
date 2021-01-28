import { template } from 'lodash-es'
import { SINGLE_BRACE_REGEX } from './regex.const'
export function interpolateRegex(path, data) {
  const templateExecutor = template(path, {
    interpolate: SINGLE_BRACE_REGEX,
  })
  return templateExecutor(data)
}
