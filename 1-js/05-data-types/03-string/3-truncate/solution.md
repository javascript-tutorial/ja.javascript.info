最大長は `maxlength` になります。なので、省略記号のためのスペースも必要なので少し短くする必要があります。

<<<<<<< HEAD
省略記号に1つのユニコード文字を使っていることに注意してください。3つのドットではありません。
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 1edb0a38330b54d2e1916f5193fc043e6fbbea78

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
