
```js run demo
let num;

do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
```

ループ `do..while` は両方のチェックが真になるまで繰り返します。:

<<<<<<< HEAD:1-js/02-first-steps/12-while-for/6-repeat-until-correct/solution.md
1. `num <= 100` のチェック -- つまり、入力値がまだ `100` よりも大きくない。
2. `&& num` チェックは、`num` が `null` または空文字の場合に false です。そのとき、`while` ループも停止します。
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or a empty string. Then the `while` loop stops too.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/02-first-steps/13-while-for/6-repeat-until-correct/solution.md

P.S. `num`が `null` の場合、`num <= 100` は `true` なので、2回目のチェックがなければ、ユーザーがCANCELをクリックするとループは止まらなくなります。 両方のチェックが必要です。
