
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

const set = (throwErrors, overwrite) =>
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
      : validTemplate.reduceRight((obj, key, i, arr) => {
        
        const target = get(false)(arr.slice(0, i), data) || {}

        if (!overwrite && target.hasOwnProperty(key))
          if (throwErrors && typeof target[key] !== typeof obj)
            throw new TypeError('Address ' + arr.slice(0, i + 1).join('.') + ' is not an object.')
          else
            return target

        return Object.assign(target, { [key]: obj })
      }, value)
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
  put: set(false, false),
  set: set(false, true),
  _get: get(true),
  _put: set(true, false),
  _set: set(true, true)
}