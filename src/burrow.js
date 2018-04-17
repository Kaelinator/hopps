

const get = (template, data) => template
  .split('.')
  .reduce((obj, key) => obj[key], data)

const set = (templateArr, data, value) => templateArr
  .split('.')
  .reduceRight((obj, key, i, arr) => Object.assign({}, { [key]: obj }), value)

module.exports = {
  get,
  set
}