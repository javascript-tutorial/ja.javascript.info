<<<<<<< HEAD
秒数を取得するために、現在の日で、時間が 00:00:00 の日付を生成し、"今" からそれを減算します。

差異はその日の開始からのミリ秒であり、秒を取得するために1000で割る必要があります。:
=======
To get the number of seconds, we can generate a date using the current day and time 00:00:00, then substract it from "now".

The difference is the number of milliseconds from the beginning of the day, that we should divide by 1000 to get seconds:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
function getSecondsToday() {
  let now = new Date();

<<<<<<< HEAD
  // 現在の 日/月/年を使ってオブジェクトを作成
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // 秒を作る
=======
  // create an object using the current day/month/year
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // ms difference
  return Math.round(diff / 1000); // make seconds
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
}

alert( getSecondsToday() );
```

<<<<<<< HEAD
代わりの解答として、時間/分/秒 を取得してそれらを秒に変換する、という方法もあります。:
=======
An alternative solution would be to get hours/minutes/seconds and convert them to seconds:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
<<<<<<< HEAD
};
=======
}

alert( getSecondsToday() );
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
```
