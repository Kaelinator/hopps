
const burrow = require('../src/burrow.js')

describe('get', () => {

  it('gets deeply burrowed data', () => {

    expect(
      burrow.get('a.b.c', { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')

    expect(
      burrow.get('a.b', { a: { b: 10 } })
    ).toEqual(10)
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

  it('returns data unchanged if no template is specified', () => {

    expect(
      burrow.get(undefined, { a: 1 })
    ).toEqual({ a: 1 })

    expect(
      burrow.get(undefined, { a: { b: 1 } })
    ).toEqual({ a: { b: 1 } })
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