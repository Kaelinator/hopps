
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
    .reduce(extrapolateSeriesObjects(data), [])
    .map(address => getIt(address, data))
}

const extrapolateSeriesObjects = ({ length }) =>
  (arr, address) => {
    const i = address.findIndex(e => typeof e === 'object')

    return arr.concat((i === -1)
      ? [ address ]
      : series(address[i], length).map(insertPermutation(address, i)))
  }

const insertPermutation = (address, index) =>
  replacement => address
    .slice(0, index)
    .concat(replacement)
    .concat(address.slice(index + 1))

module.exports = {
  get: getWrapper
}