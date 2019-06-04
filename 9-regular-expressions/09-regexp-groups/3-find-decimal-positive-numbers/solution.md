
<<<<<<< HEAD
整数値は `pattern:\d+`.

小数点は: `pattern:\.\d+`.

小数点は任意なので、量指定子 `pattern:'?'` をもつ括弧の中に置きましょう。

これで完成です: `pattern:\d+(\.\d+)?`:

```js run
let reg = /\d+(\.\d+)?/g;

let str = "1.5 0 12. 123.4.";

alert( str.match(re) );   // 1.5, 0, 12, 123.4
=======
An non-negative integer number is `pattern:\d+`. We should exclude `0` as the first digit, as we don't need zero, but we can allow it in further digits.

So that gives us `pattern:[1-9]\d*`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:'?'`.

Finally we have the regexp: `pattern:[1-9]\d*(\.\d+)?`:

```js run
let reg = /[1-9]\d*(\.\d+)?/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```
