最大長は `maxlength` になります。なので、省略記号のためのスペースも必要なので少し短くする必要があります。

<<<<<<< HEAD
省略記号に1つのユニコード文字を使っていることに注意してください。3つのドットではありません。
=======
Note that there is actually a single Unicode character for an ellipsis. That's not three dots.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
