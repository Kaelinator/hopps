
const burrow = require('../index').thump

describe('thump.get', () => {

  it('performs like get', () => {

    expect(
      burrow.get('a.b', { a: { b: 'hi!' } })
    ).toEqual('hi!')

    expect(
      burrow.get('a.b', { a: { b: 10 } })
    ).toEqual(10)
  })

  it('throws TypeError when template is not a string nor an array', () => {

    const noParam = () => burrow.get()

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => burrow.get(42)).toThrow(/number/)
    expect(() => burrow.get(null)).toThrow(/null/)
    expect(() => burrow.get({})).toThrow(/object/)
    expect(() => burrow.get(true)).toThrow(/boolean/)
  })

  it('throws TypeError when template has invalid address', () => {

    const invalidAddress = () => burrow.get('a.b', {})

    expect(invalidAddress).toThrow(TypeError)
    expect(invalidAddress).toThrow('Address a is not an object')
  })
})