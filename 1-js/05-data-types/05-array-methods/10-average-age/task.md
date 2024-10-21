importance: 4

---

# 平均年齢の取得

<<<<<<< HEAD
プロパティ `age` をもつオブジェクtの配列を取得し、その平均を取得する関数 `getAverageAge(users)` を書いてください。
=======
Write the function `getAverageAge(users)` that gets an array of objects with property `age` and returns the average age.
>>>>>>> b258d7d5b635c88228f7556e14fbe5e5ca7f736d

平均の公式は `(age1 + age2 + ... + ageN) / N` です。

例:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [ john, pete, mary ];

alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
```
