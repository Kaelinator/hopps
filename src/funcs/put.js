const sanitize = require('./sanitize')
const get = require('./get')(false)

const put = (throwErrors) =>
  (address, data, value) => {

    address = sanitize.template(address, throwErrors)
    data = sanitize.data(data, throwErrors)

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    if (address.length === 0)
      return data

    return address.reduceRight((obj, key, i, arr) => throwErrors
      ? strictlyPut(data, obj, key, i, arr)
      : Object.assign({ [key]: obj }, get(arr.slice(0, i), data) || {}), value)
    }

const strictlyPut = (data, obj, key, i, arr) => {
        
  const target = get(arr.slice(0, i), data) || {}

  if (target.hasOwnProperty(key) && typeof target[key] !== 'object' && i !== arr.length - 1)
    throw new TypeError('Address ' + arr.slice(0, i + 1).join('.') + ' is not an object.')

  return Object.assign({ [key]: obj }, target)
}

module.exports = put