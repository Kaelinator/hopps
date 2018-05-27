
const get = require('./src/get')
const set = require('./src/set')
const put = require('./src/put')

module.exports = {
  get: get,
  put: put,
  set: set,
  thump: {
    get: get(true),
    put: put(true),
    set: set(true)
  }
}