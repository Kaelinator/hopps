# `.thump`
_throw errors instead of curbing them_

## Description
By default, for every [invocable method](../README.md#invocable-methods), all error-inducing scenarios' outcomes are predictable by taking a look at each method's `Edge Cases`. Use `.thump` if you would like a descriptive error to be thrown whenever anything goes wrong, instead of having the default behavior curb the error.

## Examples
```js
/* By default, undefined is returned. */
hopps.get('a.b', { a: { c: 1 } }) // => undefined

/* With `.thump`, a TypeError is thrown. */
hopps.thump.get('a.b.c', { a: { e: 1 } }) // => TypeError: Address a.b is not an object
```