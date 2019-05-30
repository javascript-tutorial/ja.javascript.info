importance: 1

---

<<<<<<< HEAD
# なぜ "aaa" が残るのでしょう?

例を実行してください。なぜ `table.remove()` はテキスト `"aaa"` を削除しないのでしょうか？
=======
# Why does "aaa" remain?

Run the example. Why does `table.remove()` not delete the text `"aaa"`?
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // テーブルがあります

  table.remove();
  // なぜドキュメントの中にまだ aaa があるのでしょう？
</script>
```
