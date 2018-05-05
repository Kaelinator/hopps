# `.put(template, data, value)`
_Exactly like `.set`, but values are not overwritten._

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

### Edge cases