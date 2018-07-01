疑問符演算子 `'?'` を利用:

```js
function checkAge(age) {
  return (age > 18) ? true : confirm('Did parents allow you?');
}
```

OR `||` を利用(最も短いバリアント):

```js
function checkAge(age) {
  return (age > 18) || confirm('Did parents allow you?');
}
```

`age > 18` の周りの括弧はここでは必須ではないことに留意してください。より良い可読性のために存在しています。
