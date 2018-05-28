# `.set(template, data, value)`
_set deeply burrowed data_

## Description
In order to set deeply burrowed data, use `.set`. By default, any data that is in the way will be overwritten with the new data.

## Signature
 - **template** - template used to target the address of `value`
 - **data** - existing object to insert `value` into
 - **value** - value of the final property in `template`

## Examples
```js
hopps.set(/a.b.c/, { d: 1 }, 'hi!') 
/* => {
  a: {
    b: {
      c: 'hi!'
    }
  },
  d: 1
}
*/
```

## Edge Cases
**If `template` is not a string nor an array:**
```js
/* By default, `data` is returned unchanged */
hopps.set(42, { a: 'carrot' }, 'hi!') // => { a: 'carrot' }

/* With `.thump`, a TypeError is thrown */
hopps.thump.set(42, { a: 'carrot' }, 'hi!')
// => TypeError: template must be of type string or array, recieved number.
```

**If `data` is not an object:**
```js
/* By default, an empty object is used in place, so that the insertion may take place */
hopps.set(/a.b.c/, null, 'hi!') // => { a: { b: { c: 'hi!' } } }

/* With `.thump`, a TypeError is thrown */
hopps.thump.set(/a.b.c/, null, 'hi!') // => TypeError: data must be an object, recieved null.
```

**If `value` is undefined:**
```js
/* By default, `value` is set to undefined */
hopps.set(/a.b/, {}, undefined) // => { a: { b: undefined } }

/* With `.thump`, a TypeError is thrown */
hopps.thump.set(/a.b/, {}, undefined) // => TypeError: value must be specified, recieved undefined.
```