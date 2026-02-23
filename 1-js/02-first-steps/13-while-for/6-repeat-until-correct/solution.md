
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

<<<<<<< HEAD
ループ `do..while` は両方のチェックが真になるまで繰り返します。:

1. `num <= 100` のチェック -- つまり、入力値がまだ `100` よりも大きくない。
2. `&& num` チェックは、`num` が `null` または空文字の場合に false です。そのとき、`while` ループも停止します。

P.S. `num`が `null` の場合、`num <= 100` は `true` なので、2回目のチェックがなければ、ユーザーがCANCELをクリックするとループは止まらなくなります。 両方のチェックが必要です。
=======
The loop `do..while` repeats while both checks are truthy:

1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.

P.S. If `num` is `null` then `num <= 100` is `true`, so without the 2nd check the loop wouldn't stop if the user clicks CANCEL. Both checks are required.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
