
<<<<<<< HEAD
私たちは2つのハンドラを使う必要があります: `document.onkeydown` と `document.onkeyup` です。


Set `pressed` は現在押されているキーを保持する必要があります。

最初のハンドラでそこに追加し、一方で2つ目のハンドラではそこから削除します。すべての `keydown` で必要なキーを押しているかをチェックし、その場合に関数を実行します。
=======
We should use two handlers: `document.onkeydown` and `document.onkeyup`.

Let's create a set `pressed = new Set()` to keep currently pressed keys.

The first handler adds to it, while the second one removes from it. Every time on `keydown` we check if we have enough keys pressed, and run the function if it is so.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
