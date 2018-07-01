importance: 4

---

# 大文字の const?

次のコードを検査してください:

```js
const birthday = '18.04.1982';

const age = someCode(birthday);
```

ここで、私たちは定数 `birthday` の日付を持っており、`age` はいくつかのコードの助けを借りて `birthday` から計算されます（詳細はここでは重要ではないため、someCodeの中身はここでは書きません)。


`birthday` に対して大文字を使うのは正しいでしょうか？ `age` はどうでしょう？

```js
const BIRTHDAY = '18.04.1982'; // make uppercase?

const AGE = someCode(BIRTHDAY); // make uppercase?
```
