```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    isThrottled = true;

    func.apply(this, arguments); // (1)

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

`throttle(func, ms)` の呼び出しは `wrapper` を返します。

<<<<<<< HEAD
1. 最初の呼び出しの間、`wrapper` は単に `func` を実行し、クールダウンの状態を設定します(`isThrottled = true`)。
2. この状態では、すべての呼び出しは `savedArgs/savedThis` に記憶されます。コンテキストと引数両方とも等しく重要で、覚えておく必要があることに注意してください。呼び出しを再現するために、それらが同時に必要になります。
3. ...次に `ms` ミリ秒が経過後、`setTimeout` がトリガーをかけます。クールダウン状態が削除されます(`isThrottled = false`)。そして無視された呼び出しがあった場合には、最後に記憶した引数とコンテキストで `wrapper` が実行されます。
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

3つ目のステップは `func` ではなく `wrapper` を実行します。なぜなら、私たちは `func` を実行するだけではなく、再びクールダウン状態に入り、それをリセットするためのタイムアウトを設定する必要があるためです。
