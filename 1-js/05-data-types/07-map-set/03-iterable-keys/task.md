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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

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
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
