importance: 3

---

<<<<<<< HEAD
# 数値プロパティに2を掛ける

`obj` のすべての数値プロパティに `2` を掛ける関数 `multiplyNumeric(obj)` を作成しなさい。
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```js
// 呼び出し前
let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

multiplyNumeric(menu);

// 呼び出し後
menu = {
  width: 400,
  height: 600,
  title: "My menu"
};
```

`multiplyNumeric` は何も返却する必要がないことに注意してください。オブジェクトをその場で変更する必要があります。

P.S. ここでは数値のためのチェックに `typeof` を使います。
