'use strict'

const prepareTemplate = (template, throwErrors) => {

  if (Array.isArray(template))
    return template
  
  if (typeof template === 'string')
    return template.split('.')

  if (!throwErrors)
    return []

  throw new TypeError('template must be of type string or array, recieved ' + 
    ((template === null) ? null : typeof template) + '.')
}

const prepareData = (data, throwErrors) => {

  if (typeof data !== 'object' || data === null)
    if (throwErrors)
      throw new TypeError('data must be an object, recieved ' + 
        ((data === null) ? null : typeof data) + '.')
    else
      return {}

  return data
}

module.exports = {
  template: prepareTemplate,
  data: prepareData
}