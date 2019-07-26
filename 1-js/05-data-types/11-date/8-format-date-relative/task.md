importance: 4

---

# 相対日付をフォーマットする

次のように `date` をフォーマットする関数 `formatDate(date)` を書いてください。:

- もし `date` が1秒未満で渡された場合、`"right now"` です。
- そうではなく、`date` が1分未満で渡された場合、`"n sec. ago"` です。
- そうではなく、1時間未満の場合は `"m min. ago"` です。
- そ例外の場合はフォーマット `"DD.MM.YY HH:mm"` の完全な日付です。つまり: `"day.month.year hours:minutes"`, すべて2桁の形式です。e.g. `31.12.16 10:00`

例:

```js
alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
