
const burrow = require('./src/burrow')

module.exports = {
  get: burrow.get,
  put: burrow.put,
  set: burrow.set,
  thump: {
    get: burrow._get,
    put: burrow._put,
    set: burrow._set
  }
}