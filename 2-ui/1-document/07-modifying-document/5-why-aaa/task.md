importance: 1

---

<<<<<<< HEAD
# なぜ "aaa" が残るのでしょう?

例を実行してください。なぜ `table.remove()` はテキスト `"aaa"` を削除しないのでしょうか？
=======
# Why does "aaa" remain?

Run the example. Why does `table.remove()` not delete the text `"aaa"`?
>>>>>>> 0e4f5e425aff4a9767546f75b378ad4a2a2493ea

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
