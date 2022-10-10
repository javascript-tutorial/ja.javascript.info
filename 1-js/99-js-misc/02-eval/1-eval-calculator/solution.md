<<<<<<< HEAD
`eval` を使用して数学式を計算してみましょう。
=======
Let's use `eval` to calculate the maths expression:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

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
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
