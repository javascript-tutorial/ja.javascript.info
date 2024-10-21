importance: 2

---

# 2つの関数 - 1つのオブジェクト

<<<<<<< HEAD
`new A()==new B()` のような関数 `A` と `B` を作ることはできるでしょうか？
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A();
let b = new B();

alert( a == b ); // true
```

もしできるなら、そのコード例を書いてみてください。
