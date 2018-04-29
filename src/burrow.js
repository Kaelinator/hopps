
const get = (template, data) => (Array.isArray(template) 
    ? template 
    : template.split('.'))
  .reduce((obj, key) => obj && obj[key] || undefined, data)

const set = (templateArr, data, value) => templateArr
  .split('.')
  .reduceRight((obj, key, i, arr) => 
    Object.assign(get(arr.slice(0, i), data) || {}, { [key]: obj }), value
  )

module.exports = {
  get,
  set
}