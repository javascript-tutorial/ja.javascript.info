
私たちは2つのハンドラを使う必要があります: `document.onkeydown` と `document.onkeyup` です。

<<<<<<< HEAD:2-ui/3-event-details/5-keyboard-events/2-check-sync-keydown/solution.md
=======
Let's create a set `pressed = new Set()` to keep currently pressed keys.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e:2-ui/3-event-details/7-keyboard-events/2-check-sync-keydown/solution.md

Set `pressed` は現在押されているキーを保持する必要があります。

最初のハンドラでそこに追加し、一方で2つ目のハンドラではそこから削除します。すべての `keydown` で必要なキーを押しているかをチェックし、その場合に関数を実行します。
