importance: 1

---

<<<<<<< HEAD
# なぜ "aaa" が残るのでしょう?

例を実行してください。なぜ `table.remove()` はテキスト `"aaa"` を削除しないのでしょうか？
=======
# Why does "aaa" remain?

Run the example. Why does `table.remove()` not delete the text `"aaa"`?
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

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
