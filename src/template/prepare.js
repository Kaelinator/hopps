
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

    if (counter && template[end] === ',')
      commas.push(end)

    counter += count(template[end++])
  }

  const bracketContents = template.slice(start + 1, end - 1)
  return commas.map((j, i, a) => expandTemplate(bracketContents.slice(j, (a[i + 1] - 1) || undefined)))
}

module.exports = template => (template instanceof RegExp)
  ? [ expandTemplate(template.source), template.flags.includes('i') ]
  : [ [], false ]