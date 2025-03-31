<<<<<<< HEAD
次の月を使って日付を作りますが、その日としてゼロを渡します:
```js run
=======
Let's create a date using the next month, but pass zero as the day:
```js run demo
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
function getLastDayOfMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}

alert( getLastDayOfMonth(2012, 0) ); // 31
alert( getLastDayOfMonth(2012, 1) ); // 29
alert( getLastDayOfMonth(2013, 1) ); // 28
```

<<<<<<< HEAD
通常、日は 1から始まりますが、技術的には任意の数値を渡すことが可能で、日付は自身を自動調整します。なので、 0 を渡したとき、それは "その月の1日より、1日前" を意味します。: つまり、"前の月の最終日" になります。
=======
Normally, dates start from 1, but technically we can pass any number, the date will autoadjust itself. So when we pass 0, then it means "one day before 1st day of the month", in other words: "the last day of the previous month".
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
