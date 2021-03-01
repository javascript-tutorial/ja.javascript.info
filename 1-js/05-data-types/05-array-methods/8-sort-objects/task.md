importance: 5

---

<<<<<<< HEAD
# ソートオブジェクト

プロパティ `name` を持つオブジェクトの配列を取得し、それをソートする関数 `sortByName(users)` を書いてください。
=======
# Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.
>>>>>>> f6ae0b5a5f3e48074312ca3e47c17c92a5a52328

例:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// now: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
