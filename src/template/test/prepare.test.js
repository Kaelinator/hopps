const prepare = require('../prepare')

describe('prepare.error', () => {

  it('returns whether or not to use thump based on `i` flag', () => {

    expect(prepare.error(/a.b/muy)).toBeFalsy()
    expect(prepare.error(/a.b/g)).toBeFalsy()
    expect(prepare.error(/a.b/i)).toBeTruthy()
  })
})

describe('prepare.template', () => {

  it('returns all address permutations of a template', () => {

    const addrs = prepare.template(/a.b/)

    expect(addrs).toEqual(['a', 'b'])
  })

  it('handles brackets as lists', () => {

    expect(prepare.template(/[1,2,3]/)).toEqual([ ['1'], ['2'], ['3'] ])
    expect(prepare.template(/a[1,2,3].b/)).toEqual([ ['a', '1', 'b'], ['a', '2', 'b'], ['a', '3', 'b'] ])
    expect(prepare.template(/aef[1,2,3].bcd/)).toEqual([ ['aef', '1', 'bcd'], ['aef', '2', 'bcd'], ['aef', '3', 'bcd'] ])
  })

  it('handles multiple lists', () => {
    
    expect(
      prepare.template(/judy.hopps[1,2].carrot[3,4]/)
    ).toEqual([
      ['judy', 'hopps', '1', 'carrot', '3'],
      ['judy', 'hopps', '1', 'carrot', '4'],
      ['judy', 'hopps', '2', 'carrot', '3'],
      ['judy', 'hopps', '2', 'carrot', '4']
    ])
    
    expect(
      prepare.template(/[5,9].judy.hopps[1,2].carrot[3,4]/)
    ).toEqual([
      ['5', 'judy', 'hopps', '1', 'carrot', '3'],
      ['5', 'judy', 'hopps', '1', 'carrot', '4'],
      ['5', 'judy', 'hopps', '2', 'carrot', '3'],
      ['5', 'judy', 'hopps', '2', 'carrot', '4'],
      ['9', 'judy', 'hopps', '1', 'carrot', '3'],
      ['9', 'judy', 'hopps', '1', 'carrot', '4'],
      ['9', 'judy', 'hopps', '2', 'carrot', '3'],
      ['9', 'judy', 'hopps', '2', 'carrot', '4']
    ])
  })

  it('handles nested lists', () => {
    
    expect(
      prepare.template(/judy[1,2,3[5,6]].hopps/)
    ).toEqual([
      ['judy', '1', 'hopps'],
      ['judy', '2', 'hopps'],
      ['judy', '3', '5', 'hopps'],
      ['judy', '3', '6', 'hopps'],
    ])

    expect(
      prepare.template(/[a[c[g,h],d],b[e,f]]/)
    ).toEqual([
      ['a', 'c', 'g'],
      ['a', 'c', 'h'],
      ['a', 'd'],
      ['b', 'e'],
      ['b', 'f']
    ])
  })

  it('handles sequences by changing them to metadata', () => {

    expect(prepare.template(/[0..5]/)).toEqual([[{ begin: 0, end: 5 }]])
    expect(prepare.template(/[-3..3]/)).toEqual([[{ begin: -3, end: 3 }]])
    expect(prepare.template(/[5..-3]/)).toEqual([[{ begin: 5, end: -3 }]])
  })

  it('handles lists with sequences', () => {

    expect(prepare.template(/[1,3,5,6..10]/)).toEqual([['1'], ['3'], ['5'], [{ begin: 6, end: 10 }]])
    expect(prepare.template(/abc[1,2..4].def/)).toEqual([
      ['abc', '1', 'def'],
      ['abc', { begin: 2, end: 4 }, 'def']
    ])
  })

  it('handles me trying to break it', () => {

    expect(
      prepare.template(/[a[c[g,h],d],b[e,f]].x[1,2].y[8,2..3]/)
    ).toEqual([
      ['a', 'c', 'g', 'x', '1', 'y', '8'],
      ['a', 'c', 'g', 'x', '1', 'y', {begin: 2, end: 3}],
      ['a', 'c', 'g', 'x', '2', 'y', '8'],
      ['a', 'c', 'g', 'x', '2', 'y', {begin: 2, end: 3}],
      ['a', 'c', 'h', 'x', '1', 'y', '8'],
      ['a', 'c', 'h', 'x', '1', 'y', {begin: 2, end: 3}],
      ['a', 'c', 'h', 'x', '2', 'y', '8'],
      ['a', 'c', 'h', 'x', '2', 'y', {begin: 2, end: 3}],
      ['a', 'd', 'x', '1', 'y', '8'],
      ['a', 'd', 'x', '1', 'y', {begin: 2, end: 3}],
      ['a', 'd', 'x', '2', 'y', '8'],
      ['a', 'd', 'x', '2', 'y', {begin: 2, end: 3}],
      ['b', 'e', 'x', '1', 'y', '8'],
      ['b', 'e', 'x', '1', 'y', {begin: 2, end: 3}],
      ['b', 'e', 'x', '2', 'y', '8'],
      ['b', 'e', 'x', '2', 'y', {begin: 2, end: 3}],
      ['b', 'f', 'x', '1', 'y', '8'],
      ['b', 'f', 'x', '1', 'y', {begin: 2, end: 3}],
      ['b', 'f', 'x', '2', 'y', '8'],
      ['b', 'f', 'x', '2', 'y', {begin: 2, end: 3}]
    ])

    expect(
      prepare.template(/[[a,c],[b,d]]/)
    ).toEqual([
      ['a'],
      ['c'],
      ['b'],
      ['d']
    ])
  })
})