
const { get, put, set } = require('../wrapper')

describe('get', () => {

  it('handles multiple permutations', () => {

    expect(
      get(/[1,2,3]/)(['a', 'b', 'c', 'd'])
    ).toEqual(['b', 'c', 'd'])

    const data = [
      { x: 16, y: [4, 5, 6] },
      { x: 25, y: [7, 8, 9] },
      { x: 36, y: [10, 11, 12] },
      { x: 49, y: [13, 14, 15] }
    ]

    expect(
      get(/[1,2,3].x/)(data)
    ).toEqual([25, 36, 49])

    expect(
      get(/[1,2,3].y[2]/)(data)
    ).toEqual([9, 12, 15])
  })

  it('handles lists', () => {

    const data = [ 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 ]

    expect(
      get(/[0..2]/)(data)
    ).toEqual([ 1, 1 ])

  })

  it('handles multiples lists in an address')
})