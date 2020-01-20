
私たちは2つのハンドラを使う必要があります: `document.onkeydown` と `document.onkeyup` です。

<<<<<<< HEAD
=======
Let's create a set `pressed = new Set()` to keep currently pressed keys.
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

Set `pressed` は現在押されているキーを保持する必要があります。

最初のハンドラでそこに追加し、一方で2つ目のハンドラではそこから削除します。すべての `keydown` で必要なキーを押しているかをチェックし、その場合に関数を実行します。
