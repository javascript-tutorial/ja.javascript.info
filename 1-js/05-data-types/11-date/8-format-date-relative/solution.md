`date` から "今" までの 時間を取得するために -- 日付を減算しましょう。

```js run
function formatDate(date) {
  let diff = new Date() - date; // ミリ秒での差

  if (diff < 1000) { // 1秒未満
    return 'right now';
  }

  let sec = Math.floor(diff / 1000); // 差分を秒に変換

  if (sec < 60) {
    return sec + ' sec. ago';
  }

  let min = Math.floor(diff / 60000); // 差分を分に変換
  if (min < 60) {
    return min + ' min. ago';
  }

  // 日付のフォーマット
  // 1桁の 日/月/時/分 に先頭のゼロを追加
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // すべてのコンポーネントの最後の2桁を取る

  // コンポーネントを日付に連結
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "right now"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 sec. ago"

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 min. ago"

// yesterday's date like 31.12.2016, 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```
