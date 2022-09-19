最大長は `maxlength` になります。なので、省略記号のためのスペースも必要なので少し短くする必要があります。

<<<<<<< HEAD
省略記号に1つのユニコード文字を使っていることに注意してください。3つのドットではありません。
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
