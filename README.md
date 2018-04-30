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
  }
  d: 1
}*/
```

## API
