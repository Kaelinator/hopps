const prepare = require('../prepare')

describe('prepare.template', () => {

  it('splits by periods and picks up on i flag', () => {

    expect(prepare(/a.b/)).toEqual([ ['a', 'b'], false ])
    expect(prepare(/a.b/g)).toEqual([ ['a', 'b'], false ])
    expect(prepare(/a.b/i)).toEqual([ ['a', 'b'], true ])
  })
})