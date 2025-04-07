<<<<<<< HEAD
**答え: どちらも場合も `0` から `4` です**
=======
**The answer: from `0` to `4` in both cases.**
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

<<<<<<< HEAD
これは `for` のアルゴリズムから簡単に差し引くことができます:

1. すべての前(最初)に `i = 0` を一度実行します。
2. 条件 `i < 5` をチェックします。
3. もし `true` なら -- ループ本体 `alert(i)` を実行し、`i++` します。

インクリメント `i++` は条件チェック (2) とは分離されています。それは単に別の文です。

インクリメントによって返された値はここでは使われていません。なので、 `i++` と `++i` の間に違いはありません。
=======
That can be easily deducted from the algorithm of `for`:

1. Execute once `i = 0` before everything (begin).
2. Check the condition `i < 5`
3. If `true` -- execute the loop body `alert(i)`, and then `i++`

The increment `i++` is separated from the condition check (2). That's just another statement.

The value returned by the increment is not used here, so there's no difference between `i++` and `++i`.
>>>>>>> 035c5267ba80fa7b55878f7213cbde449b4092d9
