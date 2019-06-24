<<<<<<< HEAD
次の月を使って日付を作りますが、その日としてゼロを渡します:
```js run
=======
Let's create a date using the next month, but pass zero as the day:
```js run demo
>>>>>>> 9b5c1c95ec8a466150e519b0e94748717c747b09
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

通常、日は 1から始まりますが、技術的には任意の数値を渡すことが可能で、日付は自身を自動調整します。なので、 0 を渡したとき、それは "その月の1日より、1日前" を意味します。: つまり、"前の月の最終日" になります。
