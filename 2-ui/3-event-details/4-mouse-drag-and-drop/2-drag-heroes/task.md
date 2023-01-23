importance: 5

---

# フィールドの周りでスーパーヒーローをドラッグする

このタスクは、ドラッグ&ドロップや DOM のいくつかの側面に対する理解度チェックに役立ちます。

`draggable` クラス(ドラッグ可能)を持つすべての要素を作成してください。このチャプターのボールのように。

要件:

<<<<<<< HEAD
- ドラッグ開始を追跡するのに、イベント移譲を使ってください: `document` で `mousedown` に対する単一のイベントハンドラを使います。
- 要素がウィンドウの上下の端にドラッグされた場合、-- つづけてドラッグができるようページをスクロールします。
- 水平スクロールはありません。
- ドラッグ可能な要素は、マウスをすばやく移動した後でもウィンドウからは離れません。
=======
- Use event delegation to track drag start: a single event handler on `document` for `mousedown`.
- If elements are dragged to top/bottom window edges -- the page scrolls up/down to allow further dragging.
- There is no horizontal scroll (this makes the task a bit simpler, adding it is easy).
- Draggable elements or their parts should never leave the window, even after swift mouse moves.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

デモは大きすぎてここには収まらないため、リンクにします。

[demo src="solution"]
