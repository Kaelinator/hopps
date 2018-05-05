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
 * [Modifier Methods](#modifier-methods)
   * [`.thump`](docs/thump.md) - _throw errors instead of curbing them_

### Modifier Methods

### Invocable Methods

#### `.get(template, data)`


<details>
  <summary>Edge Cases</summary>

  - <details>
    <summary>If `template` is not of type `string` or `array`</summary>

    ```js
    /* By default, `data` is returned unchanged. */
    hopps.get(42, { a: 'carrot' }) // => { a: 'carrot' }

    /* With `.thump`, a TypeError is thrown. */
    hopps.thump.get(42, { a: 'carrot' })
    // => TypeError: template must be of type string or array, recieved number.
    ```
    </details>

  - <details>
    <summary>If the address specified by `template` does not exist (this includes non-object `data` values)</summary>

    ```js
    /* By default, undefined is returned. */
    hopps.get('a.b', { a: { c: 1 } }) // => undefined

    /* With `.thump`, a TypeError is thrown. */
    hopps.thump.get('a.b.c', { a: { e: 1 } }) // => TypeError: Address a.b is not an object
    ```
    </details>
</details>

<details>
  <summary>Edge cases</summary>

  - <details>
    <summary>If `template` is not of type `string` or `array`</summary>

    ```js
    /* By default, `data` is returned unchanged. */
    hopps.set(42, { a: 'carrot' }, 'hi!') // => { a: 'carrot' }

    /* With `.thump`, a TypeError is thrown. */
    hopps.thump.set(42, { a: 'carrot' }, 'hi!')
    // => TypeError: template must be of type string or array, recieved number.
    ```
    </details>

  - <details>
    <summary>If `data` is not of type `object`</summary>

    ```js
    /* By default, an empty object is used in place, so that the insertion may take place. */
    hopps.set('a.b.c', null, 'hi!') // => { a: { b: { c: 'hi!' } } }

    /* With `.thump`, a TypeError is thrown. */
    hopps.thump.set('a.b.c', null, 'hi!') // => TypeError: data must be an object, recieved null.
    ```
    </details>

  - <details>
    <summary>If `value` is undefined</summary>

    ```js
    /* By default, `value` is set to undefined. */
    hopps.set('a.b', {}, undefined) // => { a: { b: undefined } }

    /* With `.thump`, a TypeError is thrown. */
    hopps.thump.set('a.b', {}, undefined) // => TypeError: value must be specified, recieved undefined.
    ```
    </details>
</details>