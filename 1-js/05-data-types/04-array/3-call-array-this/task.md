importance: 5

---

# 配列コンテキストでの呼び出し

結果は何でしょうか？それはなぜでしょう？

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
