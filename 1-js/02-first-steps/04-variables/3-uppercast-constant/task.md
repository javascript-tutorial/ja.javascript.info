importance: 4

---

# 大文字の const?

次のコードを検査してください:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

<<<<<<< HEAD
ここで、私たちは定数 `birthday` の日付を持っており、`age` はいくつかのコードの助けを借りて `birthday` から計算されます（詳細はここでは重要ではないため、someCodeの中身はここでは書きません)。
=======
Here we have a constant `birthday` for the date, and also the `age` constant.

The `age` is calculated from `birthday` using `someCode()`, which means a function call that we didn't explain yet (we will soon!), but the details don't matter here, the point is that `age` is calculated somehow based on the `birthday`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c


`birthday` に対して大文字を使うのは正しいでしょうか？ `age` はどうでしょう？

```js
const BIRTHDAY = '18.04.1982'; // make birthday uppercase?

const AGE = someCode(BIRTHDAY); // make age uppercase?
```
