importance: 4

---

# '?' または '||' を使って関数を書き直す


次の関数は、パラメータ `age` が `18` より大きい場合に `true` を返します。

それ以外の場合には確認を行い、その結果を返します。:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Did parents allow you?');
  }
}
```

それを書き直し、1行で `if` なしで同じをことを実行してください。

`checkAge` の2つのバリアントを作ってください。:

<<<<<<< HEAD
1. 疑問符演算子 `'?'` を使うケース
2. OR `||` を使うケース
=======
1. Using a question mark operator `?`
2. Using OR `||`
>>>>>>> 4d654318ccb6d37d6cefc9b859cf111ff3c96b27
