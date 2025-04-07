<<<<<<< HEAD
疑問符演算子 `'?'` を利用:
=======
Using a question mark operator `'?'`:
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
OR `||` を利用(最も短いバリアント):
=======
Using OR `||` (the shortest variant):
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
`age > 18` の周りの括弧はここでは必須ではないことに留意してください。より良い可読性のために存在しています。
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
