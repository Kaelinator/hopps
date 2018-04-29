
const burrow = require('../src/burrow.js')

describe('get', () => {

  it('gets deeply burrowed data', () => {

    expect(
      burrow.get('a.b.c', { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')
  })

  it('can take an array', () => {

    expect(
      burrow.get(['a', 'b', 'c'], { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')
  })

  it('returns undefined if no value is found', () => {

    expect(
      burrow.get('a.b', {})
    ).toBeUndefined()
  })
})

describe('set', () => {

  it('sets deeply burrowed data', () => {

    expect(
      burrow.set('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })
  })

  it('maintains original data', () => {

    expect(
      burrow.set('a.b.c', { d: 1 }, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } }, d: 1 })
  })
})