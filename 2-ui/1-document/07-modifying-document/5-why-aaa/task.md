importance: 1

---

<<<<<<< HEAD
# なぜ "aaa" が残るのでしょう?

例を実行してください。なぜ `table.remove()` はテキスト `"aaa"` を削除しないのでしょうか？
=======
# Why does "aaa" remain?

In the example below, the call `table.remove()` removes the table from the document.

But if you run it, you can see that the text `"aaa"` is still visible.

Why does that happen?
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede

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
<<<<<<< HEAD
  // なぜドキュメントの中にまだ aaa があるのでしょう？
=======
  // why there's still "aaa" in the document?
>>>>>>> 30a5d5e2a7c3504c9afd5028f83f4a696e60aede
</script>
```
