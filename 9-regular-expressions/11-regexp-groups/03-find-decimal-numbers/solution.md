<<<<<<< HEAD
任意で少数部分をもつ正の数は(前のタスクより): `pattern:\d+(\.\d+)?`.

先頭に任意の `-` を追加しましょう。:

```js run
let reg = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(reg) );   // -1.5, 0, 2, -123.4
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.

Let's add the optional `pattern:-` in the beginning:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
```
