解答は短いですが、少しトリッキーに見えるかもしれないので、ここでは詳細なコメントをします。


```js
let sortedRows = Array.from(table.rows)
  .slice(1)
  .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);

table.tBodies[0].append(...sortedRows);
```

1. `table.querySelectorAll('tr')` のように、すべての `<tr>` を取得し、それらから配列を作ります。なぜなら配列メソッドが必要なためです。
2. 最初の TR (`table.rows[0]`) は実際にはテーブルのヘッダです、なので `.slice(1) で残りを取ります。
3. 最初の `<td>` (name フィールド) のコンテンツで比較してソートします。
4. `.append(...sortedRows)` で正しい順序でノードを挿入します。

    テーブルは常に暗黙の<tbody>要素を持っているので、それを取り、その中に挿入する必要があります。単純な `table.append(...)` は失敗します。

    私たちはそれらを削除する必要がないことに留意してください。単に "再挿入" です。それらは自動的に古い場所を去ります。
