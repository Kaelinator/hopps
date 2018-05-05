# hopps
[![Build Status](https://travis-ci.org/Kaelinator/hopps.svg?branch=master)](https://travis-ci.org/Kaelinator/hopps)

## Installation

```sh
npm install https://github.com/Kaelinator/hopps
```

Since 1.0.0 has yet to be released to npm, this package must be downloaded directly from the repository.

## Summary

### Interact with data easily

 - Robust
 - Highly versatile
 - As strict as you'd like
 - Built Functionally
 - Zero dependencies

## Examples

**Basics**

```javascript
const hopps = require('hopps')

hopps.set('a.b.c', { d: 1 }, 'hi!') 
/* => {
  a: {
    b: {
      c: 'hi!'
    }
  },
  d: 1
}*/
```

## API

 * [Invocable Methods](#invocable-methods)
   * [`.get(template, data)`](docs/get.md) - _get deeply burrowed data_
   * [`.set(template, data, value)`](docs/set.md) - _set deeply burrowed data_
   * [`.put(template, data, value)`](docs/put.md) - _like [`.set`](docs/set.md), but values are not overwritten_
 * [Chainable Methods](#chainable-methods)
   * [`.thump`](docs/thump.md) - _throw errors instead of curbing them_

### Chainable Methods

Chainable methods make your code easy to read, while maintaining brevity.

### Invocable Methods

Invocable methods, while limited, provide a condence syntax for quick, intuitive data manipulation. It is recommended to use [chainable methods](#chainable-methods) for more complex manipulation.