
const expandTemplate = template => !/\[.*\]/.test(template)
  ? template.split('.')
  : nextBrackets(template)

const count = c => (c === '[')
  ? 1
  : (c === ']')
  ? -1
  : 0

const nextBrackets = template => {

  const start = template.indexOf('[')
  const commas = [ 0 ]
  let end = start + 1
  let counter = 1

  while (counter) {

    if (counter === 1 && template[end] === ',')
      commas.push(end - start)

    counter += count(template[end++])
  }

  const bracketContents = template.slice(start + 1, end - 1)
  const pre = template.slice(0, start)
  const suf = template.slice(end)

  return commas
    .map((j, i, a) => (pre && (pre + '.') || '') + bracketContents.slice(j, (a[i + 1] - 1) || undefined) + suf)
    .reduce((arr, address) => arr.concat(!/\[.*\]/.test(address)
        ? [ address.split('.') ]
        : expandTemplate(address)), [])
}

module.exports = {
  template: template => (template instanceof RegExp) && expandTemplate(template.source) || [],
  error: template => (template instanceof RegExp) && template.flags.includes('i') || false
}