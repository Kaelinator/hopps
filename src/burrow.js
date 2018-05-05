
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

const put = (throwErrors) =>
  (template, data, value) => {

    template = prepTemplate(template, throwErrors)
    data = prepData(data, throwErrors)

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    if (template.length === 0)
      return data

    return template.reduceRight((obj, key, i, arr) => throwErrors
      ? strictlyPut(data, obj, key, i, arr)
      : Object.assign({ [key]: obj }, get(false)(arr.slice(0, i), data) || {}), value)
    }

const strictlyPut = (data, obj, key, i, arr) => {
        
  const target = get(false)(arr.slice(0, i), data) || {}

  if (target.hasOwnProperty(key) && typeof target[key] !== 'object' && i !== arr.length - 1)
    throw new TypeError('Address ' + arr.slice(0, i + 1).join('.') + ' is not an object.')

  return Object.assign({ [key]: obj }, target)
}

const set = (throwErrors) =>
  (template, data, value) => {

    template = prepTemplate(template, throwErrors)
    data = prepData(data, throwErrors)

    if (!value && throwErrors)
      throw new TypeError('value must be specified, recieved ' + value + '.')

    if (template.length === 0)
      return data
    
    return template.reduceRight((obj, key, i, arr) =>
        Object.assign(get(false)(arr.slice(0, i), data) || {}, { [key]: obj }), value)
  }

const prepData = (data, throwErrors) => {

  if (typeof data !== 'object' || data === null)
      if (throwErrors)
        throw new TypeError('data must be an object, recieved ' + 
          ((data === null) ? null : typeof data) + '.')
      else
        return {}

  return data
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
  put: put(false),
  set: set(false, true),
  _get: get(true),
  _put: put(true),
  _set: set(true, true)
}