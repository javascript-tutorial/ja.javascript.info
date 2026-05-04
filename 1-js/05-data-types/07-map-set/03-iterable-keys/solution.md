
<<<<<<< HEAD
これは、`map.keys()` は配列ではなく、反復可能(iterable) を返すためです。

`Array.from` を使うことで、それを配列に変換できます:
=======
That's because `map.keys()` returns an iterable, but not an array.

We can convert it into an array using `Array.from`:

>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
