
const get = require('../funcs/get')
const put = require('../funcs/put')
const set = require('../funcs/set')
const prepare = require('./prepare')
const series = require('./series')

const getWrapper = template => {

  const shouldThrow = prepare.error(template)
  const addresses = prepare.template(template)

  const getIt = get(shouldThrow)

  return data => addresses
    .map(extrapolateSeriesObjects(data))
    .map(address => getIt(address, data))
}

const extrapolateSeriesObjects = ({ length }) =>
  address => address.reduce((arr, element) => arr.concat((typeof element === 'string')
    ? element
    : series(element, length)), [])

module.exports = {
  get: getWrapper
}