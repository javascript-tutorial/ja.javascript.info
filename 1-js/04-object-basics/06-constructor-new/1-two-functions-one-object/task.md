importance: 2

---

# 2つの関数 - 1つのオブジェクト

`new A()==new B()` のような関数 `A` と `B` を作ることはできるでしょうか？

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

もしできるなら、そのコード例を書いてみてください。
