
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
An non-negative integer number is `pattern:\d+`. A zero `0` can't be the first digit,  but we should allow it in further digits.

So that gives us `pattern:[1-9]\d*`.

A decimal part is: `pattern:\.\d+`.

Because the decimal part is optional, let's put it in parentheses with the quantifier `pattern:?`.

Finally we have the regexp: `pattern:[1-9]\d*(\.\d+)?`:

```js run
let reg = /[1-9]\d*(\.\d+)?/g;

let str = "1.5 0 -5 12. 123.4.";

alert( str.match(reg) );   // 1.5, 0, 12, 123.4
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```
