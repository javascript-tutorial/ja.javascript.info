importance: 2

---

# 2つの関数 - 1つのオブジェクト

<<<<<<< HEAD
`new A()==new B()` のような関数 `A` と `B` を作ることはできるでしょうか？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

もしできるなら、そのコード例を書いてみてください。
