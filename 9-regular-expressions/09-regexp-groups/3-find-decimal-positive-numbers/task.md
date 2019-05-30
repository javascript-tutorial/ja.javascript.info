# 正数を見つける

小数点のないものも含め正数を探す正規表現を作成してください。

使用した例:
```js
let reg = /your regexp/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) ); // 1.5, 12, 123.4 (ignores 0 and -5)
```
