
module.exports = template => (template instanceof RegExp)
    ? [ template.source.split('.'), template.flags.includes('i') ]
    : [ [], false ]