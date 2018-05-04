
const burrow = require('../src/burrow.js')

describe('get', () => {

  it('gets deeply burrowed data', () => {

    expect(
      burrow.get('a.b.c', { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')

    expect(
      burrow.get('a.b', { a: { b: 10 } })
    ).toEqual(10)
  })

  it('can take an array', () => {

    expect(
      burrow.get(['a', 'b', 'c'], { a: { b: { c: 'hi!' } } })
    ).toEqual('hi!')
  })

  it('returns undefined if no value is found', () => {

    expect(
      burrow.get('a.b', {})
    ).toBeUndefined()
  })

  it('returns data unchanged if template is not of type string or array', () => {

    expect(
      burrow.get(undefined, { a: 1 })
    ).toEqual({ a: 1 })

    expect(
      burrow.get(undefined, { a: { b: 1 } })
    ).toEqual({ a: { b: 1 } })

    expect(burrow.get(1, {})).toEqual({})
    expect(burrow.get(null, {})).toEqual({})
    expect(burrow.get(true, {})).toEqual({})
  })
})

describe('set', () => {

  it('sets deeply burrowed data', () => {

    expect(
      burrow.set('a.b.c', {}, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } } })
  })

  it('maintains original data', () => {

    expect(
      burrow.set('a.b.c', { d: 1 }, 'hi!')
    ).toEqual({ a: { b: { c: 'hi!' } }, d: 1 })
  })

  it('returns data unchanged if template is not of type string or array', () => {

    expect(
      burrow.set(undefined, { a: 1 }, 1)
    ).toEqual({ a: 1 })

    expect(
      burrow.set(undefined, { a: { b: 1 } }, 1)
    ).toEqual({ a: { b: 1 } })

    expect(burrow.set(1, {}, 1)).toEqual({})
    expect(burrow.set(null, {}, 1)).toEqual({})
    expect(burrow.set(true, {}, 1)).toEqual({})
  })

  it('treats data as an object if data is not of type object', () => {

    expect(
      burrow.set('a', undefined, 1)
    ).toEqual({ a: 1 })

    expect(burrow.set('a', 42, 1)).toEqual({ a: 1 })
    expect(burrow.set('a', true, 1)).toEqual({ a: 1 })
    expect(burrow.set('a', null, 1)).toEqual({ a: 1 })
    expect(burrow.set('a', 'hi', 1)).toEqual({ a: 1 })
  })
})

describe('put', () => {
  
  it('sets deeply burrowed data', () => {

    expect(
      burrow.put('a.b.c', {}, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } } })
  })

  it('maintains original data', () => {

    expect(
      burrow.put('a.b.c', { d: 1 }, 'placeholder')
    ).toEqual({ a: { b: { c: 'placeholder' } }, d: 1 })
  })

  it('does not overwrite targeted data', () => {

    expect(
      burrow.put('a.b', { a: { b: 'occupied' } }, 'placeholder')
    ).toEqual({ a: { b: 'occupied' } })

    expect(
      burrow.put('a.b', { a: { b: {} } }, 'placeholder')
    ).toEqual({ a: { b: {} } })

    expect(
      burrow.put('a.b', { a: 'hi' }, 'placeholder')
    ).toEqual({ a: 'hi' })
  })
})