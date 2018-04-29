
const get = (throwErrors) =>
  (template, data) => prepTemplate(template)
  .reduce((obj, key, i, arr) => throwErrors
    ? strictlyGet(obj, key, i, arr)
    : obj && obj[key] || undefined, data)

const prepTemplate = (template) => {

  if (Array.isArray(template))
    return template
  
  if (typeof template === 'string')
    return template.split('.')

  throw new TypeError('template must be of type string or array.')
}

const strictlyGet = (obj, key, i, arr) => {

  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('Address ' + arr.slice(0, i).join('.') + ' is not an object.')

  return obj[key]
}

const set = (throwErrors) => (templateArr, data, value) => templateArr
  .split('.')
  .reduceRight((obj, key, i, arr) => 
    Object.assign(get(false)(arr.slice(0, i), data) || {}, { [key]: obj }), value
  )

module.exports = {
  get: get(false),
  set: set(false),
  _get: get(true),
  _set: set(true)
}