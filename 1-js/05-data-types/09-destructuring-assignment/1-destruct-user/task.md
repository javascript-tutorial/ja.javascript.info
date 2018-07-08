importance: 5

---

# 分割代入

次のオブジェクトがあります:

```js
let user = {
  name: "John",
  years: 30
};
```

以下のような分割代入を書いてください:

- `name` プロパティを変数 `name` に、
- `years` プロパティを変数 `age` に、
- `isAdmin` プロパティを変数 `isAdmin` (存在しない場合は false )にしてください。

代入後の値は次のようになる必要があります:

```js
let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
