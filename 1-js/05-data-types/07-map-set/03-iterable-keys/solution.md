
<<<<<<< HEAD
これは、`map.keys()` は配列ではなく、反復可能(iterable) を返すためです。

`Array.from` を使うことで、それを配列に変換できます:
=======
That's because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
