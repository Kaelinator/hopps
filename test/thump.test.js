
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
    expect(noParam).toThrow('template must be of type string or array.')

    const numberParam = () => burrow.get(55)

    expect(numberParam).toThrow(TypeError)
    expect(numberParam).toThrow('template must be of type string or array.')

    const nullParam = () => burrow.get(null)

    expect(nullParam).toThrow(TypeError)
    expect(nullParam).toThrow('template must be of type string or array.')

  })

  it('throws TypeError when template has invalid address', () => {

    const invalidAddress = () => burrow.get('a.b', {})

    expect(invalidAddress).toThrow(TypeError)
    expect(invalidAddress).toThrow('Address a is not an object')
  })
})