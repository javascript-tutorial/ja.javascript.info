importance: 4

---

<<<<<<< HEAD
# "else" は必須ですか？

次の関数は、パラメータ `age` が `18` より大きい場合に `true` を返します。

それ以外の場合には確認を行い、その結果を返します。:
=======
# Is "else" required?

The following function returns `true` if the parameter `age` is greater than `18`.

Otherwise it asks for a confirmation and returns its result:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
もし `else` が削除された場合、この関数は違う動きになるでしょうか？
=======
Will the function work differently if `else` is removed?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

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

<<<<<<< HEAD
これら2つのバリアントの振る舞いで何か違いはあるでしょうか？
=======
Is there any difference in the behavior of these two variants?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
