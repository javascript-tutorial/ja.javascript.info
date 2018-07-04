importance: 5

---

# オブジェクトリテラルで "this" を使う

ここにオブジェクトを返す `makeUser` 関数があります。

その `ref` へのアクセス結果なんでしょう？それはなぜでしょう？

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
};

let user = makeUser();

alert( user.ref.name ); // 結果はなに？
```
