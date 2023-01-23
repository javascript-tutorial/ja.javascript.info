
<<<<<<< HEAD
整数の正規表現は `pattern:\d+` です。

否定後読みを先頭に追加することで負を除外できます: `pattern:(?<!-)\d+`.

ですが、試してみると1つの "余分な" 結果に気づくかもしれませ。:
=======
The regexp for an integer number is `pattern:\d+`.

We can exclude negatives by prepending it with the negative lookbehind: `pattern:(?<!-)\d+`.

Although, if we try it now, we may notice one more "extra" result:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

<<<<<<< HEAD
alert( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

ご覧の通り、`subject:-18` から `match:8` がマッチしています。これを除外するには、正規表現が別の(マッチしていない)数の途中からではない数値から一致を開始していることを保証する必要があります。

別の否定後読みを指定することで実現できます: `pattern:(?<!-)(?<!\d)\d+`。ここで `pattern:(?<!-)(?<!\d)\d+` は、一致は別の数字の後からは始まらないことを保証し、我々が必要としていることです。

また、これらは1つの後読みに結合することもできます:
=======
console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

As you can see, it matches `match:8`, from `subject:-18`. To exclude it, we need to ensure that the regexp starts matching a number not from the middle of another (non-matching) number.

We can do it by specifying another negative lookbehind: `pattern:(?<!-)(?<!\d)\d+`. Now `pattern:(?<!\d)` ensures that a match does not start after another digit, just what we need.

We can also join them into a single lookbehind here:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
