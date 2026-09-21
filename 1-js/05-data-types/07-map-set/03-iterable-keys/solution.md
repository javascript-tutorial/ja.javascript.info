
<<<<<<< HEAD
これは、`map.keys()` は配列ではなく、反復可能(iterable) を返すためです。

`Array.from` を使うことで、それを配列に変換できます:
=======
That's because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
