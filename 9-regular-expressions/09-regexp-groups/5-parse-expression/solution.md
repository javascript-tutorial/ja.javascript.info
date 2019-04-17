数値の正規表現は: `pattern:-?\d+(\.\d+)?` です。前のタスクで作ったものです。

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/5-parse-expression/solution.md
演算子は、`pattern:[-+*/]` です。ダッシュ `pattern:-` を先頭に置きます。中央にある場合、ダッシュは文字の範囲を意味しますが、それは必要ないからです。
=======
An operator is `pattern:[-+*/]`. We put the dash `pattern:-` first, because in the middle it would mean a character range, we don't need that.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/5-parse-expression/solution.md

JavaScript の正規表現 `pattern:/.../` の中ではスラッシュをエスケープする必要があることに注意してください。

私たちは、数値、演算子、そして別の数値が必要です。そしてそれらの間にスペースがある場合があります。

完全な正規表現は次のようになります: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

配列として結果を取得するため、必要なデータの周りに括弧を置きましょう: 数値と演算子です: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

動作:

```js run
let reg = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(reg) );
```

結果は次の内容を含みます:

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/5-parse-expression/solution.md
- `result[0] == "1.2 + 12"` (完全なマッチ)
- `result[1] == "1"` (最初の括弧)
- `result[2] == "2"` (2番目の括弧 -- 小数部 `(\.\d+)?`)
- `result[3] == "+"` (...)
- `result[4] == "12"` (...)
- `result[5] == undefined` (最後は小数部がないので undefined です)

必要なのは数値と演算子だけです。小数部だけは不要です。

なので、`pattern:(?:\.\d+)?` のように、`pattern:?:` を追加することで、キャプチャグループから余分なグループを取り除きましょう。
=======
- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` -- the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` -- the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` -- the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` -- the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` -- the last decimal part is absent, so it's undefined)

We only want the numbers and the operator, without the full match or the decimal parts.

The full match (the arrays first item) can be removed by shifting the array `pattern:result.shift()`.

The decimal groups can be removed by making them into non-capturing groups, by adding `pattern:?:` to the beginning: `pattern:(?:\.\d+)?`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/5-parse-expression/solution.md

最終的な解法は次の通りです:

```js run
function parse(expr) {
  let reg = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(reg);

  if (!result) return [];
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
