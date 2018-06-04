
const series = require('../series')

describe('series', () => {

  it('extrapolates begin & (exclusive) end to an array of indecies', () => {

    expect(
      series({ begin: 0, end: 9 }, 9)
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])

    expect(
      series({ begin: 6, end: 9 }, 9)
    ).toEqual([6, 7, 8])
  })

  it('handles negative values', () => {
    
    expect(
      series({ begin: -1, end: 9 }, 9)
    ).toEqual([8])
    
    expect(
      series({ begin: -4, end: 0 }, 9)
    ).toEqual([5, 6, 7, 8])

    expect(
      series({ begin: 0, end: -3 }, 9)
    ).toEqual([0, 1, 2, 3, 4, 5])

    expect(
      series({ begin: -5, end: -3 }, 9)
    ).toEqual([4, 5])
  })

  it('handles negative & out of bound values', () => {
    
    expect(
      series({ begin: -10, end: 9 }, 9)
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])

    expect(
      series({ begin: 0, end: -9 }, 9)
    ).toEqual([])

    expect(
      series({ begin: 2, end: -9 }, 9)
    ).toEqual([])

    expect(
      series({ begin: -8, end: -9 }, 9)
    ).toEqual([])

    expect(
      series({ begin: 10, end: -1 }, 9)
    ).toEqual([])
  })
})