
const prepareTemplate = (template, throwErrors) => {

  if (Array.isArray(template))
    return template
  
  if (template instanceof RegExp)
    return template
      .toString()
      .slice(1, -1)
      .split('.')

  if (!throwErrors)
    return []

  throw new TypeError('template must be an instance of RegExp, recieved ' + 
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