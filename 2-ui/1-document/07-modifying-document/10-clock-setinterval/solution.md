まず、HTML/CSS を作りましょう。

時間の各要素は独自の `<span>` ではっきり見えます:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

またそれらを色付けするために CSS が必要です。

`udpate` 関数は時計をリフレッシュし、毎秒 `setInterval` によって呼び出されます:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

行 `(*)` で、毎回現在の日付をチェックします。`setInterval` の呼び出しは信頼できません: 遅延が発生する可能性があります。

時計管理の関数です:

```js
let timerId;

function clockStart() { // run the clock  
  if (!timerId) { // only set a new interval if the clock is not running
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

<<<<<<< HEAD
`update()` の呼び出しは `clockStart()` でスケジュールされるだけでなく、行 `(*)` でも即時実行さることに注意してください。それ以外の場合は、訪問者は`setInterval`の最初の実行まで待つ必要があります。また、時計はそれまで空です。
=======
Please note that the call to `update()` is not only scheduled in `clockStart()`, but immediately run in the line `(*)`. Otherwise the visitor would have to wait till the first execution of `setInterval`. And the clock would be empty till then.

Also it is important to set a new interval in `clockStart()` only when the clock is not running. Otherways clicking the start button several times would set multiple concurrent intervals. Even worse - we would only keep the `timerID` of the last interval, losing references to all others. Then we wouldn't be able to stop the clock ever again! Note that we need to clear the `timerID` when the clock is stopped in the line `(**)`, so that it can be started again by running `clockStart()`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
