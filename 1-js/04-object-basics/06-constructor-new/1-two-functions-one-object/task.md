importance: 2

---

# 2つの関数 - 1つのオブジェクト

<<<<<<< HEAD
`new A()==new B()` のような関数 `A` と `B` を作ることはできるでしょうか？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

もしできるなら、そのコード例を書いてみてください。
