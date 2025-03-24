<<<<<<< HEAD
疑問符演算子 `'?'` を利用:
=======
Using a question mark operator `'?'`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
OR `||` を利用(最も短いバリアント):
=======
Using OR `||` (the shortest variant):
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

<<<<<<< HEAD
`age > 18` の周りの括弧はここでは必須ではないことに留意してください。より良い可読性のために存在しています。
=======
Note that the parentheses around `age > 18` are not required here. They exist for better readability.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
