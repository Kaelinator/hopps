
const containsBraces = e => typeof e === 'string' && /\[.*\]/.test(e)
const isSeries = e => typeof e === 'string' && /^-?\d+\.\.-?\d+$/.test(e)
const isDotAddress = e => typeof e === 'string' && /[^\.]*\.[^.]*/.test(e) && !/\.\./.test(e)

const expandTemplate = address => {

  for (let i = 0; i < address.length; i++) {

    const element = address[i]

    if (containsBraces(element))
      return handleBraces(address, i)
    else if (isSeries(element))
      return handleSeries(address, i)
    else if (isDotAddress(element))
      return handleDots(address, i)
  }

  return address
}

const notEmpty = v => typeof v !== 'string' || v.length

const insertPermutation = (address, index) =>
  replacement => address
    .slice(0, index)
    .concat(replacement)
    .concat(address.slice(index + 1))
    .filter(notEmpty)

const handleBraces = (address, i) => {
  return nextBrackets(address[i])
    .map(insertPermutation(address, i))
    .map(expandTemplate)
}

const count = c => (c === '[')
  ? 1
  : (c === ']') ? -1 : 0

const toPermutations = contents => (j, i, a) => contents.slice(j, (a[i + 1] - 1) || undefined)
const trim = (str, char) => str.slice(
  [...str].findIndex(c => c !== char),
  str.length - [...str].reverse().findIndex(c => c !== char)
)

const nextBrackets = template => {

  const start = template.indexOf('[')
  const commas = [0]
  let end = start + 1
  let counter = 1

  while (counter) {

    if (counter === 1 && template[end] === ',')
      commas.push(end - start)

    counter += count(template[end++])
  }

  const pre = trim(template.slice(0, start), '.')
  const suf = trim(template.slice(end), '.')

  return commas
    .map(toPermutations(template.slice(start + 1, end - 1)))
    .map(insertPermutation([pre, null, suf], 1))
}

const expandSeries = address => {

  [begin, end] = address
    .split('..')
    .map(Number)

  return { begin, end }
}

const handleFunc = f =>
  (address, i) => {

    const value = f(address[i])

    return expandTemplate(
      address.slice(0, i)
        .concat(value)
        .concat(address.slice(i + 1))
    )
  }

const handleSeries = handleFunc(expandSeries)

const handleDots = handleFunc(v => v.split('.'))

const flatten = (arr, v) => arr.concat(Array.isArray(v[0]) ? v.reduce(flatten, []) : [v])

module.exports = {
  template: template => (template instanceof RegExp) && expandTemplate([template.source]) .reduce(flatten, []) || [],
  error: template => (template instanceof RegExp) && template.flags.includes('i') || false
}