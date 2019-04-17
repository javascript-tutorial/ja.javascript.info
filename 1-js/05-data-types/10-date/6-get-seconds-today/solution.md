秒数を取得するために、現在の日で、時間が 00:00:00 の日付を生成し、"今" からそれを減算します。

差異はその日の開始からのミリ秒であり、秒を取得するために1000で割る必要があります。:

```js run
function getSecondsToday() {
  let now = new Date();

  // 現在の 日/月/年を使ってオブジェクトを作成
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // 秒を作る
}

alert( getSecondsToday() );
```

代わりの解答として、時間/分/秒 を取得してそれらを秒に変換する、という方法もあります。:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}
```
