'use strict'
const get = require('../src/get')(false)

describe('get', () => {

  it('gets deeply burrowed data', () => {

    expect(
      get('a.b.c', { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')

    expect(
      get('a.b', { a: { b: 10 } })
    ).toEqual(10)
  })

  it('can take an array', () => {

    expect(
      get(['a', 'b', 'c'], { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')
  })

  it('returns undefined if no value is found', () => {

    expect(
      get('a.b', {})
    ).toBeUndefined()
  })

  it('returns data unchanged if template is not of type string or array', () => {

    expect(
      get(undefined, { a: 1 })
    ).toEqual({ a: 1 })

    expect(
      get(undefined, { a: { b: 1 } })
    ).toEqual({ a: { b: 1 } })

    expect(get(1, {})).toEqual({})
    expect(get(null, {})).toEqual({})
    expect(get(true, {})).toEqual({})
  })
})