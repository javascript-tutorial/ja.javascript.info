考え方はシンプルです: `date` から与えられた日数を減算します:

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...しかし、関数は `date` を変えてはいけません。私たちに日付を与えた外部コードはそれが変更することは期待していないからです。

それを実装するために、次のように日付をクローンしましょう:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
