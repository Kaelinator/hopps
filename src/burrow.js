
const get = (throwErrors) =>
  (template, data) => prepTemplate(template, throwErrors)
  .reduce((obj, key, i, arr) => throwErrors
    ? strictlyGet(obj, key, i, arr)
    : obj && obj[key] || undefined, data)


const strictlyGet = (obj, key, i, arr) => {

  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('Address ' + arr.slice(0, i).join('.') + ' is not an object.')

  return obj[key]
}

const set = (throwErrors) =>
  (template, data, value) => {

    const validTemplate = prepTemplate(template, throwErrors)
  
    if (typeof data !== 'object' || data === null)
      if (throwErrors)
        throw new TypeError('data must be an object, recieved ' + 
          ((data === null) ? null : typeof data) + '.')
      else
        data = {}

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    return (validTemplate.length === 0)
      ? data
      : validTemplate.reduceRight((obj, key, i, arr) => 
        Object.assign(get(false)(arr.slice(0, i), data) || {}, { [key]: obj }), value
      )
  }

const prepTemplate = (template, throwErrors) => {

  if (Array.isArray(template))
    return template
  
  if (typeof template === 'string')
    return template.split('.')

  if (!throwErrors)
    return []

  throw new TypeError('template must be of type string or array, recieved ' + 
    ((template === null) ? null : typeof template) + '.')
}

module.exports = {
  get: get(false),
  set: set(false),
  _get: get(true),
  _set: set(true)
}