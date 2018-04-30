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
  }
  d: 1
}*/
```

## API

 * [Invocable Methods](#invocable-methods)
   * [`.get(template, data)`](#gettemplate-data)
   * [`.set(template, data, value)`](#settemplate-data-value)
 * [Modifier Methods](#modifier-methods)
   * [`.thump`](#thump)

### Modifier Methods

#### `.thump`

By default, for every [invocable method](#invocable-methods), all error-inducing scenarios' outcomes are predictable by taking a look at each method's `Edge Cases`. Use `.thump` if you would like a descriptive error to be thrown whenever anything goes wrong, instead of having the default behavior curb the error.

### Invocable Methods

#### `.get(template, data)`

In order to retrieve deeply burrowed data, use `.get`.

 - **template** - template used to target data to be returned
 - **data** - object from which to retrieve the value

`hopps.get('a.b.c', { a: { b: { c: 'hi!' } } })` => `'hi!'`

<details>
  <summary>Edge Cases</summary>

  - <details>
    <summary>If `template` is not of type `string` or `array`</summary>

    **Default:**
    `data` is returned unchanged.
    `hopps.get(42, { a: 'carrot' })` => `{ a: 'carrot' }`

    **With `.thump`:**
    A `TypeError` is thrown.
    `hopps.thump.get(42, { a: 'carrot' })` => `TypeError: template must be of type string or array, recieved number.`
    </details>

  - <details>
    <summary>If the address specified by `template` does not exist (this includes non-object `data` values)</summary>

    **Default:**
    `undefined` is returned.
    `hopps.get('a.b', { a: { c: 1 } })` => `undefined`

    **With `.thump`:**
    A `TypeError` is thrown.
    `hopps.thump.get('a.b.c', { a: { e: 1 } })` => `TypeError: Address a.b is not an object`
    </details>
</details>

#### `.set(template, data, value)`

In order to set deeply burrowed data, use `.set`. By default, any data that is in the way will be overwritten with the new data.

 - **template** - template used to target the address of `value`
 - **data** - existing object to insert `value` into
 - **value** - value of the final property in `template`

`hopps.set('a.b.c', { d: 1 }, 'hi!')` => `{ a: { b: { c: 'hi!' } }, d: 1 }`

<details>
  <summary>Edge cases</summary>

  - <details>
    <summary>If `template` is not of type `string` or `array`</summary>

    **Default:**
    `data` is returned unchanged.
    `hopps.set(42, { a: 'carrot' }, 'hi!')` => `{ a: 'carrot' }`

    **With `.thump`:**
    A `TypeError` is thrown.
    `hopps.thump.set(42, { a: 'carrot' }, 'hi!')` => `TypeError: template must be of type string or array, recieved number.`
    </details>

  - <details>
    <summary>If `data` is not of type `object`</summary>

    **Default:**
    An empty object is used in place, so that the insertion may take place.
    `hopps.set('a.b.c', null, 'hi!')` => `{ a: { b: { c: 'hi!' } } }`

    **With `.thump`:**
    A `TypeError` is thrown.
    `hopps.thump.set('a.b.c', null, 'hi!')` => `TypeError: data must be an object, recieved null.`
    </details>

  - <details>
    <summary>If `value` is undefined</summary>

    **Default:**
    `value` is set to undefined.
    `hopps.set('a.b', {}, undefined)` => `{ a: { b: undefined } }`

    **With `.thump`:**
    A `TypeError` is thrown.
    `hopps.thump.set('a.b', {}, undefined)` => `TypeError: value must be specified, recieved undefined.`
    </details>
</details>