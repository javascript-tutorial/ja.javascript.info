importance: 5

---

<<<<<<< HEAD
# 奇妙な instanceof

なぜ下の `instanceof` は `true` を返すのでしょう？ `a` が `B()` によって作られたものでないことは簡単に分かります。
=======
# Strange instanceof

In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
