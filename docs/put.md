# `.put(template, data, value)`
_Like `.set`, but values are not overwritten_

## Description
In order to not overwrite the value, but place a given value in the value's absence (and necessary values leading up), use `.put`.

## Signature
 - **template** - template used to target the address of `value`
 - **data** - existing object to insert `value` into
 - **value** - value of the final property in `template`

## Examples
```js
const data = { a: {} }

hopps.put('a.b', data, 'placehold') // => { a: { b: 'placehold' } }
```

```js
const data = { a: { b: 'occupied' } }

hopps.put('a.b', data, 'placehold') // => { a: { b: 'occupied' } }
```

## Edge cases

**If the structure of `data` conflicts with `tempate`**
```js
/* By default, `data` is returned unchanged */
hopps.put('a.b', { a: 'notAnObject' }, 'placeholder') // => { a: 'notAnObject' }

/* With `.thump`, a TypeError is thrown */
hopps.thump.put('a.b', { a: 'notAnObject' }, 'placeholder')
// => TypeError: Address a.b is not an object.
```

<details>
  <summary>Standard edge cases</summary>

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
  hopps.set('a.b.c', null, 'hi!') // => { a: { b: { c: 'hi!' } } }

  /* With `.thump`, a TypeError is thrown */
  hopps.thump.set('a.b.c', null, 'hi!') // => TypeError: data must be an object, recieved null.
  ```

  **If `value` is undefined:**
  ```js
  /* By default, `value` is set to undefined */
  hopps.set('a.b', {}, undefined) // => { a: { b: undefined } }

  /* With `.thump`, a TypeError is thrown */
  hopps.thump.set('a.b', {}, undefined) // => TypeError: value must be specified, recieved undefined.
  ```
</details>