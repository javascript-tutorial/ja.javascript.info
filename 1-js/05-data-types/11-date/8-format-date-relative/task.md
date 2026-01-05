importance: 4

---

<<<<<<< HEAD
# 相対日付をフォーマットする

次のように `date` をフォーマットする関数 `formatDate(date)` を書いてください。:

- もし `date` が1秒未満で渡された場合、`"right now"` です。
- そうではなく、`date` が1分未満で渡された場合、`"n sec. ago"` です。
- そうではなく、1時間未満の場合は `"m min. ago"` です。
- そ例外の場合はフォーマット `"DD.MM.YY HH:mm"` の完全な日付です。つまり: `"day.month.year hours:minutes"`, すべて2桁の形式です。e.g. `31.12.16 10:00`

例:
=======
# Format the relative date

Write a function `formatDate(date)` that should format `date` as follows:

- If since `date` passed less than 1 second, then `"right now"`.
- Otherwise, if since `date` passed less than 1 minute, then `"n sec. ago"`.
- Otherwise, if less than an hour, then `"m min. ago"`.
- Otherwise, the full date in the format `"DD.MM.YY HH:mm"`. That is: `"day.month.year hours:minutes"`, all in 2-digit format, e.g. `31.12.16 10:00`.

For instance:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

<<<<<<< HEAD
// yesterday's date like 31.12.2016, 20:00
=======
// yesterday's date like 31.12.16 20:00
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
