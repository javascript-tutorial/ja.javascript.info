importance: 5

---

# フィールドでソートする

ソートするオブジェクトの配列を持っているとします。:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

それをするための通常の方法はこのようになります:

```js
// by name (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// by age (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

私たちはこのように冗長さを無くすことはできますか？

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

つまり、関数を角換わりに `byField(fieldName)` を置きます。

このために使う `byField` 関数を書いてください。
