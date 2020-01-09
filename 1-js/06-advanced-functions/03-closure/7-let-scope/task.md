importance: 4

---

# 変数は参照できますか？

このコードの結果はどうなるでしょう？

```js
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();
```

P.S. このタスクには落とし穴があります。
