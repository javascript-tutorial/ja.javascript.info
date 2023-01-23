解答は短いですが、少しトリッキーに見えるかもしれないので、ここでは詳細なコメントをします。

```js
let sortedRows = Array.from(table.tBodies[0].rows) // 1
  .sort((rowA, rowB) => rowA.cells[0].innerHTML.localeCompare(rowB.cells[0].innerHTML));

table.tBodies[0].append(...sortedRows); // (3)
```

<<<<<<< HEAD
1. `table.querySelectorAll('tr')` のように、すべての `<tr>` を取得し、それらから配列を作ります。なぜなら配列メソッドが必要なためです。
2. 最初の TR (`table.rows[0]`) は実際にはテーブルのヘッダです、なので `.slice(1) で残りを取ります。
3. 最初の `<td>` (name フィールド) のコンテンツで比較してソートします。
4. `.append(...sortedRows)` で正しい順序でノードを挿入します。

    テーブルは常に暗黙の<tbody>要素を持っているので、それを取り、その中に挿入する必要があります。単純な `table.append(...)` は失敗します。

    私たちはそれらを削除する必要がないことに留意してください。単に "再挿入" です。それらは自動的に古い場所を去ります。
=======
The step-by-step algorthm:

1. Get all `<tr>`, from `<tbody>`.
2. Then sort them comparing by the content of the first `<td>` (the name field).
3. Now insert nodes in the right order by `.append(...sortedRows)`.

We don't have to remove row elements, just "re-insert", they leave the old place automatically.

P.S. In our case, there's an explicit `<tbody>` in the table, but even if HTML table doesn't have `<tbody>`, the DOM structure always has it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
