メソッド `date.getDay()` は日曜開始で平日の数値を返します。

その数値から適切な日の名前が取得できるよう、平日の配列を作りましょう。

```js run demo
function getWeekDay(date) {
  let days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  return days[date.getDay()];
}

let date = new Date(2014, 0, 3); // 3 Jan 2014
alert( getWeekDay(date) ); // FR
```
