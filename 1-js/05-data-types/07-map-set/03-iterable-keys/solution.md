
<<<<<<< HEAD
これは、`map.keys()` は配列ではなく、反復可能(iterable) を返すためです。

`Array.from` を使うことで、それを配列に変換できます:
=======
That's because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
