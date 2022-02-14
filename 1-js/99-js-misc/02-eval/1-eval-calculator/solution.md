<<<<<<< HEAD
`eval` を使用して数学式を計算してみましょう。
=======
Let's use `eval` to calculate the maths expression:
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');

alert( eval(expr) );
```

<<<<<<< HEAD
ユーザは任意のテキストあるいはコードが入力できます。

これを安全にし算術のみに制限するために、[regular expression](info:regular-expressions) を使用して `expr` をチェックし、数字と演算子のみを含むようにすることができます。
=======
The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](info:regular-expressions), so that it only may contain digits and operators.
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834
