<<<<<<< HEAD
数値の正規表現は: `pattern:-?\d+(\.\d+)?` です。前のタスクで作ったものです。

演算子は、`pattern:[-+*/]` です。ダッシュ `pattern:-` を先頭に置きます。中央にある場合、ダッシュは文字の範囲を意味しますが、それは必要ないからです。

JavaScript の正規表現 `pattern:/.../` の中ではスラッシュをエスケープする必要があることに注意してください。

私たちは、数値、演算子、そして別の数値が必要です。そしてそれらの間にスペースがある場合があります。

完全な正規表現は次のようになります: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

配列として結果を取得するため、必要なデータの周りに括弧を置きましょう: 数値と演算子です: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

動作:
=======
A regexp for a number is: `pattern:-?\d+(\.\d+)?`. We created it in previous tasks.

An operator is `pattern:[-+*/]`.

Please note:
- Here the dash `pattern:-` goes first in the brackets, because in the middle it would mean a character range, while we just want a character `-`.
- A slash `/` should be escaped inside a JavaScript regexp `pattern:/.../`, we'll do that later.

We need a number, an operator, and then another number. And optional spaces between them.

The full regular expression: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

To get a result as an array let's put parentheses around the data that we need: numbers and the operator: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

In action:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
let reg = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(reg) );
```

<<<<<<< HEAD
結果は次の内容を含みます:

- `result[0] == "1.2 + 12"` (完全なマッチ)
- `result[1] == "1"` (最初の括弧)
- `result[2] == "2"` (2番目の括弧 -- 小数部 `(\.\d+)?`)
- `result[3] == "+"` (...)
- `result[4] == "12"` (...)
- `result[5] == undefined` (最後は小数部がないので undefined です)

必要なのは数値と演算子だけです。小数部だけは不要です。

なので、`pattern:(?:\.\d+)?` のように、`pattern:?:` を追加することで、キャプチャグループから余分なグループを取り除きましょう。

最終的な解法は次の通りです:
=======
The result includes:

- `result[0] == "1.2 + 12"` (full match)
- `result[1] == "1.2"` (first group `(-?\d+(\.\d+)?)` -- the first number, including the decimal part)
- `result[2] == ".2"` (second group`(\.\d+)?` -- the first decimal part)
- `result[3] == "+"` (third group `([-+*\/])` -- the operator)
- `result[4] == "12"` (forth group `(-?\d+(\.\d+)?)` -- the second number)
- `result[5] == undefined` (fifth group `(\.\d+)?` -- the last decimal part is absent, so it's undefined)

We only want the numbers and the operator, without the full match or the decimal parts.

The full match (the arrays first item) can be removed by shifting the array `pattern:result.shift()`.

The decimal groups can be removed by making them into non-capturing groups, by adding `pattern:?:` to the beginning: `pattern:(?:\.\d+)?`.

The final solution:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```js run
function parse(expr) {
  let reg = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(reg);

<<<<<<< HEAD
  if (!result) return;
=======
  if (!result) return [];
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```
