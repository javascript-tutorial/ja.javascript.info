<<<<<<< HEAD
答えは: **Pete** です。

以下のコードの `work()` 関数は、外部のレキシカル環境参照を介して、元の場所から `name` を取得します。:

![](lexenv-nested-work.svg)

したがって、結果は `"Pete"` になります。

しかし、`makeWorker()` に `let name` が無かった場合は、検索は外部に向かい、上のチェーンの通りグローバル変数を取ります。この場合、結果は `"John"` になります。
=======
The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
