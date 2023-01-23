importance: 5

---

# クリックして TD を編集する

クリックでテーブルセルを編集可能にしてください。

<<<<<<< HEAD
- クリック時 - セルが "編集可能" (テキストエリアが内部に現れます)になり、HTML を変更することができます。リサイズする必要はなく、すべてのジオメトリは同じままにしてください。
- ボタン OK と CANCEL がセルの下に現れ、編集を 終了/キャンセル することができます。
- 同時に編集可能なセルは1つだけです。`<td>` が "編集モード" のとき、他のセルでのクリックは無視されます。
- テーブルは多くのセルを持つ可能性があります。イベント移譲を使ってください。
=======
- On click -- the cell should become "editable" (textarea appears inside), we can change HTML. There should be no resize, all geometry should remain the same.
- Buttons OK and CANCEL appear below the cell to finish/cancel the editing.
- Only one cell may be editable at a moment. While a `<td>` is in "edit mode", clicks on other cells are ignored.
- The table may have many cells. Use event delegation.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

デモ:

[iframe src="solution" height=400]
