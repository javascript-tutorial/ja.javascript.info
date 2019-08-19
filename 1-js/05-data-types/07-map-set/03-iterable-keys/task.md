importance: 5

---

# 反復可能(iterable)なキー

<<<<<<< HEAD:1-js/05-data-types/07-map-set-weakmap-weakset/03-iterable-keys/task.md
私たちは `map.keys()` の配列を取得し、その結果を使って処理を続けたいです(マップ自体とは別に)。

が、問題があります。:
=======
We'd like to get an array of `map.keys()` in a variable and then do apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923:1-js/05-data-types/07-map-set/03-iterable-keys/task.md

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

なぜでしょう？`key.push` が機能するためにはコードをどのように直せばよいでしょう？
