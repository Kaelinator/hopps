const prepare = require('../prepare')

describe('prepare.template', () => {

  it('returns [ addresses, throwErrors ], where the addresses is an array of templates', () => {

    [addrs, throwErrors] = prepare(/a.b/)

    expect(addrs).toEqual(['a', 'b'])
    expect(throwErrors).toEqual(false)
  })

  it('picks up on i flag', () => {

    expect(prepare(/a.b/muy)[1]).toBeFalsy()
    expect(prepare(/a.b/g)[1]).toBeFalsy()
    expect(prepare(/a.b/i)[1]).toBeTruthy()
  })

  it('handles brackets as lists', () => {

    expect(prepare(/[1,2,3]/)[0]).toEqual([ ['1'], ['2'], ['3'] ])
    expect(prepare(/a[1,2,3].b/)[0]).toEqual([ ['a', '1', 'b'], ['a', '2', 'b'], ['a', '3', 'b'] ])
    expect(prepare(/aef[1,2,3].bcd/)[0]).toEqual([ ['aef', '1', 'bcd'], ['aef', '2', 'bcd'], ['aef', '3', 'bcd'] ])

    expect(
      prepare(/judy.hopps[1,2].carrot[3,4]/)
    ).toEqual([[
      ['judy', 'hopps', '1', 'carrot', '3'],
      ['judy', 'hopps', '1', 'carrot', '4'],
      ['judy', 'hopps', '2', 'carrot', '3'],
      ['judy', 'hopps', '2', 'carrot', '4']
    ], false])
  })

})