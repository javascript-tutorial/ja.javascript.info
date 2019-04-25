importance: 5

---

# 反復可能(iterable)なキー

私たちは `map.keys()` の配列を取得し、その結果を使って処理を続けたいです(マップ自体とは別に)。

が、問題があります。:

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
