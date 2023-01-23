importance: 4

---

<<<<<<< HEAD
# 配列からキー付けされたオブジェクトを作成する

`{id:..., name:..., age... }` といった形式でユーザの配列を受け取ったとしましょう。

これから、`id` をキーとし、配列項目を値としたオブジェクトを作成する関数 `groupById(arr)` を作成してください。

例:
=======
# Create keyed object from array

Let's say we received an array of users in the form `{id:..., name:..., age:... }`.

Create a function `groupById(arr)` that creates an object from it, with `id` as the key, and array items as values.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
<<<<<<< HEAD
// 呼び出し後はこのようになります:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20}
=======
// after the call we should have:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

<<<<<<< HEAD
このような関数はサーバデータを扱う際に非常に便利です。

このタスクでは `id` はユニークであるとします。同じ `id` を持つ配列項目はありません。

この解法では配列の `.reduce` メソッドを使用してください。
=======
Such function is really handy when working with server data.

In this task we assume that `id` is unique. There may be no two array items with the same `id`.

Please use array `.reduce` method in the solution.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
