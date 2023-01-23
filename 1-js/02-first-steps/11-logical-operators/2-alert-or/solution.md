答え: 最初は `1`, 次に `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

`alert` の呼び出しは値を返しません。また、言い換えると、 `undefined` を返します。

<<<<<<< HEAD
1. 最初の OR `||` はその左のオペランド `alert(1)` を検査します。それは `1` の最初のメッセージを表示します。
2. `alert` は `undefined` を返すので、OR は真値を探すのに2つ目のオペランドに行きます。
3. 2つ目のペランド `2` は真値なので、実行が中止され `2` が返却されます。次に外部の alert でそれが表示されます。
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

検査は `alert(3)` に到達しないので、 `3` は現れません。
