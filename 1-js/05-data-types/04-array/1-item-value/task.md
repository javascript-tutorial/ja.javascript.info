importance: 3

---

# 配列はコピーされる？

このコードはどのように表示されますか？

```js
let fruits = ["Apples", "Pear", "Orange"];

// 新しい値を "コピー" へプッシュ
let shoppingCart = fruits;
shoppingCart.push("Banana");

// fruits の中身は何?
alert( fruits.length ); // ?
```
