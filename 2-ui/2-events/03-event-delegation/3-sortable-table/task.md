importance: 4

---

# ソート可能なテーブル

ソート可能なテーブルを作成してください: `<th>` 要素のクリックで、対応するカラムをソートします。

次のように、各 `<th>` は属性の中にタイプを持っています。:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

上の例では、最初のカラムは数値で、2つ目は文字列です。ソート関数はタイプに応じてソートを処理します。

`"string"` と `"number"` タイプのみをサポートします。

動作例:

[iframe border=1 src="solution" height=190]

P.S. テーブルは任意の行や列で大きくできます。
