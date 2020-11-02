<<<<<<< HEAD
# 非負の整数を探す

整数の文字列があります。

非負のものだけを探す正規表現を作成してください(ゼロも許可します)。

使用例:
=======
# Find non-negative integers

There's a string of integer numbers.

Create a regexp that looks for only non-negative ones (zero is allowed).

An example of use:
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
