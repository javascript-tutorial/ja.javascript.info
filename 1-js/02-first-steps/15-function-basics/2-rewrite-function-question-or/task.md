importance: 4

---

<<<<<<< HEAD
# '?' または '||' を使って関数を書き直す


次の関数は、パラメータ `age` が `18` より大きい場合に `true` を返します。

それ以外の場合には確認を行い、その結果を返します。:
=======
# Rewrite the function using '?' or '||'

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result.
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
<<<<<<< HEAD
    return confirm('Do you have your parents permission to access this page?');
=======
    return confirm('Did parents allow you?');
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
  }
}
```

<<<<<<< HEAD
それを書き直し、1行で `if` なしで同じをことを実行してください。

`checkAge` の2つのバリアントを作ってください。:

1. 疑問符演算子 `'?'` を使うケース
2. OR `||` を使うケース
=======
Rewrite it, to perform the same, but without `if`, in a single line.

Make two variants of `checkAge`:

1. Using a question mark operator `?`
2. Using OR `||`
>>>>>>> 1dce5b72b16288dad31b7b3febed4f38b7a5cd8a
