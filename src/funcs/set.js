const sanitize = require('./sanitize')
const get = require('./get')(false)

const set = (throwErrors) =>
  (address, data, value) => {

    address = sanitize.template(address, throwErrors)
    data = sanitize.data(data, throwErrors)

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    if (address.length === 0)
      return data
    
    return address.reduceRight((obj, key, i, arr) =>
        Object.assign(get(arr.slice(0, i), data) || {}, { [key]: obj }), value)
  }

module.exports = set