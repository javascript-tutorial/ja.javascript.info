importance: 5

---

# メソッドとしてのバインドされた関数

何が出力されるでしょう?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

