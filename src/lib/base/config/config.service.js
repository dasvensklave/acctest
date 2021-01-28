import {
  cloneDeep,
  forEach,
  get,
  has,
  isArray,
  isFunction,
  isNaN,
  isNil,
  isObject,
  isString,
  merge,
  set,
  toNumber,
  unset,
} from 'lodash-es'
import { toBoolean } from '../utils'
export class ConfigService {
  constructor() {
    this.config = {}
  }
  init(config) {
    if (!isObject(config)) {
      throw new Error('Config parameter is not an object')
    }
    this.config = cloneDeep(config)
  }
  setItem(key, configValue) {
    if (isNil(configValue)) {
      throw new Error('No ConfigValue specified')
    }
    if (isFunction(configValue)) {
      throw new Error('Config cannot be of type function')
    }
    const value = get(this.config, key)
    if (!isNil(value) && isObject(value) && !isArray(value)) {
      merge(value, configValue)
    } else {
      set(this.config, key, configValue)
    }
  }
  setItems(configs) {
    forEach(configs, (value, key) => {
      this.setItem(key, value)
    })
  }
  removeItem(key) {
    unset(this.config, key)
  }
  getOrDefault(key, defaultValue) {
    return this.hasConfig(key) ? this.get(key) : defaultValue
  }
  get(key) {
    if (!key) {
      return this.config
    }
    const value = get(this.config, key)
    if (!isNil(value)) {
      return value
    }
    throw new Error(`Could not retrieve config for '${key}'`)
  }
  getStringOrDefault(key, defaultValue) {
    return this.hasConfig(key) ? this.getString(key) : defaultValue
  }
  getString(key) {
    let value = this.get(key)
    value = isObject(value) ? JSON.stringify(value) : value.toString()
    if (!isString(value)) {
      throw new Error(
        `Config: '${key}' is not of type string. Value is: '${value}'`
      )
    }
    return value
  }
  getNumberOrDefault(key, defaultValue) {
    return this.hasConfig(key) ? this.getNumber(key) : defaultValue
  }
  getNumber(key) {
    let value = this.get(key)
    value = toNumber(value)
    if (isNaN(value)) {
      throw new TypeError(
        `Config: '${key}' is not of type number. Value is: '${value}'`
      )
    }
    return value
  }
  getBooleanOrDefault(key, defaultValue) {
    return this.hasConfig(key) ? this.getBoolean(key) : defaultValue
  }
  getBoolean(key) {
    let value = this.get(key)
    value = toBoolean(value)
    if (isNil(value)) {
      throw new Error(
        `Config '${key}' is not of type boolean. Value is: '${value}'`
      )
    }
    return value
  }
  hasConfig(key) {
    if (!this.config) {
      throw new Error("'ConfigService' has not been initialized yet.")
    }
    return has(this.config, key)
  }
}
export const configService = new ConfigService()
