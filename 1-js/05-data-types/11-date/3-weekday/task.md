importance: 5

---

<<<<<<< HEAD
# ヨーロッパの平日

ヨーロッパ諸国では、月曜日(1) から始まり、次に火曜日(2)、日曜日(7)までの曜日があります。 `date` について "ヨーロッパ " の曜日を返す関数` getLocalDay(date)` を書いてください。
=======
# European weekday

European countries have days of week starting with Monday (number 1), then Tuesday (number 2) and till Sunday (number 7). Write a function `getLocalDay(date)` that returns the "European" day of week for `date`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js no-beautify
let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getLocalDay(date) );       // tuesday, should show 2
```
