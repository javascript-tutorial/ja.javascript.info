<<<<<<< HEAD

空文字列だけがマッチします: 開始後すぐに終了するため。

このタスクはアンカーが文字ではなくテスト(評価)であることを改めて実証します。

文字列は空 `""` です。エンジンは最初に `pattern:^` (入力の開始) にマッチし、すぐに終わり `pattern:$` です。そのためマッチします。
=======
An empty string is the only match: it starts and immediately finishes.

The task once again demonstrates that anchors are not characters, but tests.

The string is empty `""`. The engine first matches the `pattern:^` (input start), yes it's there, and then immediately the end `pattern:$`, it's here too. So there's a match.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e
