
私たちは2つのハンドラを使う必要があります: `document.onkeydown` と `document.onkeyup` です。

<<<<<<< HEAD
=======
Let's create a set `pressed = new Set()` to keep currently pressed keys.
>>>>>>> 47d186598add3a0ea759615596a12e277ce8fb5a

Set `pressed` は現在押されているキーを保持する必要があります。

最初のハンドラでそこに追加し、一方で2つ目のハンドラではそこから削除します。すべての `keydown` で必要なキーを押しているかをチェックし、その場合に関数を実行します。
