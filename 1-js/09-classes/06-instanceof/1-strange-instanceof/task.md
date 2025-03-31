importance: 5

---

<<<<<<< HEAD
# 奇妙な instanceof

なぜ下の `instanceof` は `true` を返すのでしょう？ `a` が `B()` によって作られたものでないことは簡単に分かります。
=======
# Strange instanceof

In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // true
*/!*
```
