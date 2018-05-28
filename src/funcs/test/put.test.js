'use strict'
const put = require('../put')(false)
const thumpPut = require('../put')(true)

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

describe('thumpPut', () => {

  it('performs like burrow.put', () => {

    expect(
      thumpPut('a.b.c', {}, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } } })

    expect(
      thumpPut('a.b.c', { d: 1 }, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } }, d: 1 })

    expect(
      thumpPut('a.b', { a: { b: 'occupied' } }, 'placeholder')
    ).toEqual({ a: { b: 'occupied' } })

    expect(
      thumpPut('a.b', { a: { b: 'occupied' } }, 52)
    ).toEqual({ a: { b: 'occupied' } })
  })

  it('throws TypeError when template is not a string nor an array', () => {

    const badParam = () => thumpPut(undefined, {}, 'hi!')

    expect(badParam).toThrow(TypeError)
    expect(badParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => thumpPut(42, {}, 'hi!')).toThrow(/number/)
    expect(() => thumpPut(null, {}, 'hi!')).toThrow(/null/)
    expect(() => thumpPut({}, {}, 'hi!')).toThrow(/object/)
    expect(() => thumpPut(true, {}, 'hi!')).toThrow(/boolean/)
  })

  it('throws TypeError when data is not an object', () => {
    
    const noParam = () => thumpPut('a', undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('data must be an object, recieved undefined.')

    expect(() => thumpPut('a', 42)).toThrow(/number/)
    expect(() => thumpPut('a', null)).toThrow(/null/)
    expect(() => thumpPut('a', 'hi')).toThrow(/string/)
    expect(() => thumpPut('a', true)).toThrow(/boolean/)
  })

  it('throws TypeError when value is unspecified', () => {
    
    const noParam = () => thumpPut('a', {}, undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('value must be specified, recieved undefined.')
  })

  it('throws TypeError when the structure of data conflicts with tempate', () => {

    const badTree = () => thumpPut('a.b', { a: 'notAnObject' }, 1)

    expect(badTree).toThrow(TypeError)
    expect(badTree).toThrow('Address a is not an object.')

    expect(
      () => thumpPut('a.b.c', { a: { b: 22 } }, 1)
    ).toThrow('Address a.b is not an object.')
  })

})