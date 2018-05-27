'use strict'
const put = require('../src/put')(false)

describe('put', () => {
  
  it('sets deeply burrowed data', () => {

    expect(
      put('a.b.c', {}, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } } })
  })

  it('maintains original data', () => {

    expect(
      put('a.b.c', { d: 1 }, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } }, d: 1 })
  })

  it('does not overwrite targeted data', () => {

    expect(
      put('a.b', { a: { b: 'occupied' } }, 'placeholder')
    ).toEqual({ a: { b: 'occupied' } })

    expect(
      put('a.b', { a: { b: {} } }, 'placeholder')
    ).toEqual({ a: { b: {} } })

    expect(
      put('a.b', { a: 'hi' }, 'placeholder')
    ).toEqual({ a: 'hi' })
  })
})