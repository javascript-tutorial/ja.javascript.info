importance: 5

---

<<<<<<< HEAD
# 分割代入

次のオブジェクトがあります:
=======
# Destructuring assignment

We have an object:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
let user = {
  name: "John",
  years: 30
};
```

<<<<<<< HEAD
以下のような分割代入を書いてください:

- `name` プロパティを変数 `name` に、
- `years` プロパティを変数 `age` に、
- `isAdmin` プロパティを変数 `isAdmin` (存在しない場合は false )にしてください。

代入後の値は次のようになる必要があります:
=======
Write the destructuring assignment that reads:

- `name` property into the variable `name`.
- `years` property into the variable `age`.
- `isAdmin` property into the variable `isAdmin` (false, if no such property)

Here's an example of the values after your assignment:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

```js
let user = { name: "John", years: 30 };

// your code to the left side:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
