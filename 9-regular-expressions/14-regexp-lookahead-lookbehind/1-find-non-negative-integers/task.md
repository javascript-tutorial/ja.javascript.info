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
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
