const prepare = require('../prepare')

describe('prepare.template', () => {

  it('throws TypeError when template is not a RegExp nor an array', () => {

    const badParam = () => prepare.template(undefined, true)

    expect(badParam).toThrow(TypeError)
    expect(badParam).toThrow('template must be an instance of RegExp, recieved undefined.')

    expect(() => prepare.template(42, true)).toThrow(/number/)
    expect(() => prepare.template(null, true)).toThrow(/null/)
    expect(() => prepare.template({}, true)).toThrow(/object/)
    expect(() => prepare.template(true, true)).toThrow(/boolean/)
  })
})

describe('prepare.data', () => {

  it('throws TypeError when data is not an object', () => {
    
    const noParam = () => prepare.data(undefined, true)

    expect(noParam).toThrow(TypeError)
    expect(noParam).toThrow('data must be an object, recieved undefined.')

    expect(() => prepare.data(42, true)).toThrow(/number/)
    expect(() => prepare.data(null, true)).toThrow(/null/)
    expect(() => prepare.data('hi', true)).toThrow(/string/)
    expect(() => prepare.data(true, true)).toThrow(/boolean/)
  })
})