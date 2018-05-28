const sanitize = require('./sanitize')

const get = (throwErrors) =>
  (template, data) => sanitize.template(template, throwErrors)
    .reduce((obj, key, i, arr) => throwErrors
      ? strictlyGet(obj, key, i, arr)
      : obj && obj[key] || undefined, data)


const strictlyGet = (obj, key, i, arr) => {

  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('Address ' + arr.slice(0, i).join('.') + ' is not an object.')

  return obj[key]
}

module.exports = get