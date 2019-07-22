importance: 4

---

# n 日前の日付はなんでしょう？

`date` から` days` 前の日付を返す関数 `getDateAgo(date, days)` を作成してください。

例えば、今日が 20日の場合、`getDateAgo(new Date(), 1)` は 19で、`getDateAgo(new Date(), 2)` は 18になります。

<<<<<<< HEAD:1-js/05-data-types/10-date/4-get-date-ago/task.md
数ヶ月/年に対しても、信頼性をもって動作しなければなりません:
=======
Should work reliably for `days=365` or more:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/11-date/4-get-date-ago/task.md

```js
let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```

P.S. 関数は与えられた `date` を変更すべきではありません。
