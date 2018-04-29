
const burrow = require('./src/burrow')

module.exports = {
  get: burrow.get,
  set: burrow.set,
  thump: {
    get: burrow._get,
    set: burrow._set
  }
}