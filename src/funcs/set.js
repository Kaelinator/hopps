const prepare = require('../template/prepare')
const get = require('./get')(false)

const set = (throwErrors) =>
  (template, data, value) => {

    template = prepare.template(template, throwErrors)
    data = prepare.data(data, throwErrors)

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    if (template.length === 0)
      return data
    
    return template.reduceRight((obj, key, i, arr) =>
        Object.assign(get(arr.slice(0, i), data) || {}, { [key]: obj }), value)
  }

module.exports = set