importance: 4

---

<<<<<<< HEAD
# n 日前の日付はなんでしょう？

`date` から` days` 前の日付を返す関数 `getDateAgo(date, days)` を作成してください。

例えば、今日が 20日の場合、`getDateAgo(new Date(), 1)` は 19で、`getDateAgo(new Date(), 2)` は 18になります。

数ヶ月/年に対しても、信頼性をもって動作しなければなりません:
=======
# Which day of month was many days ago?

Create a function `getDateAgo(date, days)` to return the day of month `days` ago from the `date`.

For instance, if today is 20th, then `getDateAgo(new Date(), 1)` should be 19th and `getDateAgo(new Date(), 2)` should be 18th.

Should work reliably for `days=365` or more:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

<<<<<<< HEAD
P.S. 関数は与えられた `date` を変更すべきではありません。
=======
P.S. The function should not modify the given `date`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
