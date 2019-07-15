importance: 4

---

# n 日前の日付はなんでしょう？

`date` から` days` 前の日付を返す関数 `getDateAgo(date, days)` を作成してください。

例えば、今日が 20日の場合、`getDateAgo(new Date(), 1)` は 19で、`getDateAgo(new Date(), 2)` は 18になります。

<<<<<<< HEAD
数ヶ月/年に対しても、信頼性をもって動作しなければなりません:
=======
Should work reliably for `days=365` or more:
>>>>>>> be342e50e3a3140014b508437afd940cd0439ab7

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. 関数は与えられた `date` を変更すべきではありません。
