importance: 5

---

# スパムのチェック

<<<<<<< HEAD
もし `str` に 'viagra' または 'XXX' を含む場合には `true` を、それ以外の場合には `false` を返す関数 `checkSpam(str)` を書きなさい。
=======
Write a function `checkSpam(str)` that returns `true` if `str` contains 'viagra' or 'XXX', otherwise `false`.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

この関数は大文字と小文字を区別する必要はありません。:

```js
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false
```
