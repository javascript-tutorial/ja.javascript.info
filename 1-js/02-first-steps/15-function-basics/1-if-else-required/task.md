importance: 4

---

# "else" は必須ですか？

次の関数は、パラメータ `age` が `18` より大きい場合に `true` を返します。

それ以外の場合には確認を行い、その結果を返します。:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('Did parents allow you?');
  }
*/!*
}
```

もし `else` が削除された場合、この関数は違う動きになるでしょうか？

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('Did parents allow you?');
*/!*
}
```

これら2つのバリアントの振る舞いで何か違いはあるでしょうか？
