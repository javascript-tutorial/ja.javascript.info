最大長は `maxlength` になります。なので、省略記号のためのスペースも必要なので少し短くする必要があります。

省略記号に1つのユニコード文字を使っていることに注意してください。3つのドットではありません。

```js run demo
function truncate(str, maxlength) {
  return (str.length > maxlength) ?
    str.slice(0, maxlength - 1) + '…' : str;
}
```
