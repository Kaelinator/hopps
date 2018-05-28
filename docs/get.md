# `.get(template, data)`
_get deeply burrowed data_

## Description
In order to retrieve deeply burrowed data, use `.get`.

## Signature
 - **template** - template used to target data to be returned
 - **data** - object from which to retrieve the value

## Examples
```js
const data = { a: { b: { c: 'hi!' } } }

hopps.get(/a.b.c/, data) // => 'hi!'
```

## Edge Cases
**If `template` is not a string nor an array:**
```js
/* By default, `data` is returned unchanged */
hopps.get(42, { a: 'carrot' }) // => { a: 'carrot' }

/* With `.thump`, a TypeError is thrown */
hopps.thump.get(42, { a: 'carrot' })
// => TypeError: template must be of type string or array, recieved number.
```

**If the address specified by `template` does not exist (this includes non-object `data` values):**
```js
/* By default, undefined is returned. */
hopps.get(/a.b/, { a: { c: 1 } }) // => undefined

/* With `.thump`, a TypeError is thrown. */
hopps.thump.get(/a.b.c/, { a: { e: 1 } }) // => TypeError: Address a.b is not an object
```