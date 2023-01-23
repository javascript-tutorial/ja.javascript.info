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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
</script>
```
