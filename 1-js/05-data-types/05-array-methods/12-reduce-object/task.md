importance: 4

---

# 配列からキー付けされたオブジェクトを作成する

`{id:..., name:..., age... }` といった形式でユーザの配列を受け取ったとしましょう。

これから、`id` をキーとし、配列項目を値としたオブジェクトを作成する関数 `groupById(arr)` を作成してください。

例:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// 呼び出し後はこのようになります:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20}
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

このような関数はサーバデータを扱う際に非常に便利です。

このタスクでは `id` はユニークであるとします。同じ `id` を持つ配列項目はありません。

この解法では配列の `.reduce` メソッドを使用してください。
