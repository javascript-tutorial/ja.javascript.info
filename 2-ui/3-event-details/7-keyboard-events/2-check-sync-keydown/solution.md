
私たちは2つのハンドラを使う必要があります: `document.onkeydown` と `document.onkeyup` です。

<<<<<<< HEAD:2-ui/3-event-details/5-keyboard-events/2-check-sync-keydown/solution.md
=======
Let's create a set `pressed = new Set()` to keep currently pressed keys.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:2-ui/3-event-details/7-keyboard-events/2-check-sync-keydown/solution.md

Set `pressed` は現在押されているキーを保持する必要があります。

最初のハンドラでそこに追加し、一方で2つ目のハンドラではそこから削除します。すべての `keydown` で必要なキーを押しているかをチェックし、その場合に関数を実行します。
