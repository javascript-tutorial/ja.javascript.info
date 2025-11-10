importance: 5

---

<<<<<<< HEAD
# 反復可能(iterable)なキー

私たちは `map.keys()` の配列を取得し、その結果を使って処理を続けたいです(マップ自体とは別に)。

が、問題があります。:
=======
# Iterable keys

We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.

But that doesn't work:
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19

```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*
// Error: keys.push is not a function
keys.push("more");
*/!*
```

<<<<<<< HEAD
なぜでしょう？`key.push` が機能するためにはコードをどのように直せばよいでしょう？
=======
Why? How can we fix the code to make `keys.push` work?
>>>>>>> 51bc6d3cdc16b6eb79cb88820a58c4f037f3bf19
