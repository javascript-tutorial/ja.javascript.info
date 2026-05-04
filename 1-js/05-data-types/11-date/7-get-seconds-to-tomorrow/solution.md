<<<<<<< HEAD
"明日の 00:00:00" から現在の日付を減算することで、明日までのミリ秒を取得することができます。

最初に、"明日"  を生成してそれをします:
=======
To get the number of milliseconds till tomorrow, we can from "tomorrow 00:00:00" substract the current date.

First, we generate that "tomorrow", and then do it:
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf

```js run
function getSecondsToTomorrow() {
  let now = new Date();

<<<<<<< HEAD
  // 明日の日付
=======
  // tomorrow date
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```
<<<<<<< HEAD
=======

Alternative solution:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Please note that many countries have Daylight Savings Time (DST), so there may be days with 23 or 25 hours. We may want to treat such days separately.
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
