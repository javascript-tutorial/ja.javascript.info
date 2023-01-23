importance: 5

---

# 預金計算機 Deposit calculator

銀行預金の合計とパーセンテージが入力でき、指定期間後にどれだけの金額になるか計算するインタフェースを作成してください。

これがデモです:

[iframe src="solution" height="350" border="1"]

どの入力の変更も即座に処理される必要があります。

数式は次の通りです:
```js
<<<<<<< HEAD
// initial: 初期の合計金額
// interest: e.g. 0.05 は年間 5% を意味します
// years: 待つ年月
let result = Math.round(initial * (1 + interest * years));
=======
// initial: the initial money sum
// interest: e.g. 0.05 means 5% per year
// years: how many years to wait
let result = Math.round(initial * (1 + interest) ** years);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
