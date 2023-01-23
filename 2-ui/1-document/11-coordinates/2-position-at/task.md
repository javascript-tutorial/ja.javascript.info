importance: 5

---

# 要素の近くにノート(メモ)を表示する

<<<<<<< HEAD
要素 `anchor` の 上 (`"top"`), 右 (`"right"`) または下 (`"bottom"`) のいずれかにある `position` に応じて `elem` を配置する関数 `positionAt(anchor, position, elem)` を作成してください。

それを使って、クラス `"note"` を持つ要素と、`anchor` の近くの指定された位置にテキスト `html` を表示する関数 `showNote(anchor, position, html)` を作成します。

次のようなノートを表示します:
=======
Create a function `positionAt(anchor, position, elem)` that positions `elem`, depending on `position` near `anchor` element.

The `position` must be a string with any one of 3 values:
- `"top"` - position `elem` right above `anchor`
- `"right"` - position `elem` immediately at the right of `anchor`
- `"bottom"` - position `elem` right below `anchor`

It's used inside function `showNote(anchor, position, html)`, provided in the task source code, that creates a "note" element with given `html` and shows it at the given `position` near the `anchor`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

Here's the demo of notes:

<<<<<<< HEAD
P.S. ノートはこのタスクでは `position:fixed` を持たなければなりません。
=======
[iframe src="solution" height="350" border="1" link]
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
