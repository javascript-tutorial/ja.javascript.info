"明日の 00:00:00" から現在の日付を減算することで、明日までのミリ秒を取得することができます。

最初に、"明日"  を生成してそれをします:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // 明日の日付
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // difference in ms
  return Math.round(diff / 1000); // convert to seconds
}
```
