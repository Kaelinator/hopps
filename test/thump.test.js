
const { thump } = require('../index')

describe('thump.get', () => {

  it('performs like burrow.get', () => {

    expect(
      thump.get('a.b', { a: { b: 'hi!' } })
    ).toEqual('hi!')

    expect(
      thump.get(['a', 'b'], { a: { b: 10 } })
    ).toEqual(10)
  })

  it('throws TypeError when template is not a string nor an array', () => {

    const noParam = () => thump.get(undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => thump.get(42)).toThrow(/number/)
    expect(() => thump.get(null)).toThrow(/null/)
    expect(() => thump.get({})).toThrow(/object/)
    expect(() => thump.get(true)).toThrow(/boolean/)
  })

  it('throws TypeError when template has invalid address', () => {

    const invalidAddress = () => thump.get('a.b', {})

    expect(invalidAddress).toThrow(TypeError)
    expect(invalidAddress).toThrow('Address a is not an object')

    expect(() => thump.get('a', 4242)).toThrow(TypeError)
    expect(() => thump.get('a', 'hi')).toThrow(TypeError)
    expect(() => thump.get('a', true)).toThrow(TypeError)
    expect(() => thump.get('a', null)).toThrow(TypeError)
  })
})

describe('thump.set', () => {

  it('performs like burrow.set', () => {

    expect(
      thump.set('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })

    expect(
      thump.set('a.b.c', { d: 1 }, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } }, d: 1 })
  })

  it('throws TypeError when template is not a string nor an array', () => {

    const badParam = () => thump.set(undefined, {}, 'hi!')

    expect(badParam).toThrow(TypeError)
    expect(badParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => thump.set(42, {}, 'hi!')).toThrow(/number/)
    expect(() => thump.set(null, {}, 'hi!')).toThrow(/null/)
    expect(() => thump.set({}, {}, 'hi!')).toThrow(/object/)
    expect(() => thump.set(true, {}, 'hi!')).toThrow(/boolean/)
  })

  it('throws TypeError when data is unspecified', () => {
    
    const noParam = () => thump.set('a', undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('data must be an object, recieved undefined.')

    expect(() => thump.set('a', 42)).toThrow(/number/)
    expect(() => thump.set('a', null)).toThrow(/null/)
    expect(() => thump.set('a', 'hi')).toThrow(/string/)
    expect(() => thump.set('a', true)).toThrow(/boolean/)
  })

  it('throws TypeError when value is unspecified', () => {
    
    const noParam = () => thump.set('a', {}, undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('value must be specified, recieved undefined.')
  })
})