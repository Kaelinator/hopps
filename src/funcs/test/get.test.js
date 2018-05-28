const get = require('../get')(false)
const thumpGet = require('../get')(true)

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

describe('thumpGet', () => {

  it('performs like burrow.get', () => {

    expect(
      thumpGet('a.b', { a: { b: 'hi!' } })
    ).toEqual('hi!')

    expect(
      thumpGet(['a', 'b'], { a: { b: 10 } })
    ).toEqual(10)
  })

  it('throws TypeError when template is not a string nor an array', () => {

    const noParam = () => thumpGet(undefined)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => thumpGet(42)).toThrow(/number/)
    expect(() => thumpGet(null)).toThrow(/null/)
    expect(() => thumpGet({})).toThrow(/object/)
    expect(() => thumpGet(true)).toThrow(/boolean/)
  })

  it('throws TypeError when template has invalid address', () => {

    const invalidAddress = () => thumpGet('a.b', {})

    expect(invalidAddress).toThrow(TypeError)
    expect(invalidAddress).toThrow('Address a is not an object')

    expect(() => thumpGet('a', 4242)).toThrow(TypeError)
    expect(() => thumpGet('a', 'hi')).toThrow(TypeError)
    expect(() => thumpGet('a', true)).toThrow(TypeError)
    expect(() => thumpGet('a', null)).toThrow(TypeError)
  })
})