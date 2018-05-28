const sanitize = require('../sanitize')

describe('sanitize.template', () => {

  it('throws TypeError when template is not a string nor an array', () => {

    const badParam = () => sanitize.template(undefined, true)

    expect(badParam).toThrow(TypeError)
    expect(badParam).toThrow('template must be of type string or array, recieved undefined.')

    expect(() => sanitize.template(42, true)).toThrow(/number/)
    expect(() => sanitize.template(null, true)).toThrow(/null/)
    expect(() => sanitize.template({}, true)).toThrow(/object/)
    expect(() => sanitize.template(true, true)).toThrow(/boolean/)
  })
})

describe('sanitize.data', () => {

  it('throws TypeError when data is not an object', () => {
    
    const noParam = () => sanitize.data(undefined, true)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('data must be an object, recieved undefined.')

    expect(() => sanitize.data(42, true)).toThrow(/number/)
    expect(() => sanitize.data(null, true)).toThrow(/null/)
    expect(() => sanitize.data('hi', true)).toThrow(/string/)
    expect(() => sanitize.data(true, true)).toThrow(/boolean/)
  })
})