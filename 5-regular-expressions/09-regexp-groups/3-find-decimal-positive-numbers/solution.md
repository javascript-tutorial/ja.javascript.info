
整数値は `pattern:\d+`.

小数点は: `pattern:\.\d+`.

小数点は任意なので、量指定子 `pattern:'?'` をもつ括弧の中に置きましょう。

これで完成です: `pattern:\d+(\.\d+)?`:

```js run
let reg = /\d+(\.\d+)?/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(re) );   // 1.5, 0, 12, 123.4
```
