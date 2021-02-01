importance: 5

---

<<<<<<< HEAD
# ソートオブジェクト

プロパティ `name` を持つオブジェクトの配列を取得し、それをソートする関数 `sortByName(users)` を書いてください。
=======
# Sort users by age

Write the function `sortByAge(users)` that gets an array of objects with the `age` property and sorts them by `age`.
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a

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
