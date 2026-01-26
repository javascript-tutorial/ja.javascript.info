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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

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
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
