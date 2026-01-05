<<<<<<< HEAD
# 式をパースする

算術式は2つの数字とそれらの間の演算子で構成されます。:
=======
# Parse an expression

An arithmetical expression consists of 2 numbers and an operator between them, for instance:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

<<<<<<< HEAD
演算子は `"+"`, `"-"`, `"*"` または `"/"` のいずれかです。

先頭や末尾、間に余分なスペースがあるかもしれません。

式を取り、3つのアイテムを持つ配列を返す `parse(expr)` を作成してください。

1. 最初の数値
2. 演算子
3. 2番目の数値

例:
=======
The operator is one of: `"+"`, `"-"`, `"*"` or `"/"`.

There may be extra spaces at the beginning, at the end or between the parts.

Create a function `parse(expr)` that takes an expression and returns an array of 3 items:

1. The first number.
2. The operator.
3. The second number.

For example:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
