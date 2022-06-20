importance: 2

---

# 2つの関数 - 1つのオブジェクト

<<<<<<< HEAD
`new A()==new B()` のような関数 `A` と `B` を作ることはできるでしょうか？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

もしできるなら、そのコード例を書いてみてください。
