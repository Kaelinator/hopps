
const burrow = require('../src/burrow.js')

describe('get', () => {

  it('gets deeply burrowed data', () => {

    expect(
      burrow.get('a.b.c', { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')
  })
})

describe('set', () => {

  it('sets deeply burrowed data', () => {

    expect(
      burrow.set('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })
  })
})