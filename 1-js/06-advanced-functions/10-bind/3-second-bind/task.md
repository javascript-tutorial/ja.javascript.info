importance: 5

---

# 2つの bind

追加のバインディングで `this` を変更することができるでしょうか？

何が出力されるでしょう？

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

