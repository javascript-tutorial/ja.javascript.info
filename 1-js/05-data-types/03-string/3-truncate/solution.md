最大長は `maxlength` になります。なので、省略記号のためのスペースも必要なので少し短くする必要があります。

<<<<<<< HEAD
省略記号に1つのユニコード文字を使っていることに注意してください。3つのドットではありません。
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
