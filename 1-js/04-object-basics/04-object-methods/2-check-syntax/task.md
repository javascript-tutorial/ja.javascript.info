importance: 2

---

# 構文チェック

このコードの結果はなんでしょう？


```js no-beautify
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)()
```

P.S. 落とし穴があります :)
