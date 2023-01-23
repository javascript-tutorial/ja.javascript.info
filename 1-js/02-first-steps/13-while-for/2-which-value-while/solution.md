<<<<<<< HEAD
このタスクは、ポストフィックス/サフィックス形式を比較で使ったときに、どのように異なる結果に繋がるかを示します。

1. **1 から 4**
=======
The task demonstrates how postfix/prefix forms can lead to different results when used in comparisons.

1. **From 1 to 4**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

<<<<<<< HEAD
    最初の値は `i=1` です。なぜなら、`i++` は最初に `i` をインクリメントし、新しい値を返します。なので、最初の比較は `1 < 5` で、`alert` は `1` を表示します。

    次に、`2,3,4…` に続きます -- 値は次々に表示されます。比較は常にインクリメントされた値を使います。なぜなら `++` は変数の前にあるからです。

    最終的に、`i=4` では `5` にインクリメントされ、比較 `while(5 < 5)` が偽になりループが停止します。なので、`5` は表示されません。
2. **1 から 5**
=======
    The first value is `i = 1`, because `++i` first increments `i` and then returns the new value. So the first comparison is `1 < 5` and the `alert` shows `1`.

    Then follow `2, 3, 4…` -- the values show up one after another. The comparison always uses the incremented value, because `++` is before the variable.

    Finally, `i = 4` is incremented to `5`, the comparison `while(5 < 5)` fails, and the loop stops. So `5` is not shown.
2. **From 1 to 5**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

<<<<<<< HEAD
    最初の値は再び `i=1` です。`i++` のポストフィックス形式は `i` をインクリメントし、*古い* 値を返します。なので、比較 `i++ < 5` は `i=0` を使います (`++i < 5` とは逆です)。

    しかし、`alert` 呼び出しは別です。インクリメントと比較の後に実行される別の文なので、現在の `i=1` を使います。

    そして `2,3,4…` に続きます。

    `i=4` で止めてみましょう。プレフィックス形式 `++i` はインクリメントし、比較では `5` を使います。しかし、ここではポストフィックスです。なので、`i` を `5` にインクリメントしますが、古い値を返します。従って、比較は実際 `while(4 < 5)`  -- true です。そして制御は `alert` に行きます。

    値 `i=5` は最後です。なぜなら次のステップ `while(5 < 5)` は偽になるからです。
    
=======
    The first value is again `i = 1`. The postfix form of `i++` increments `i` and then returns the *old* value, so the comparison `i++ < 5` will use `i = 0` (contrary to `++i < 5`).

    But the `alert` call is separate. It's another statement which executes after the increment and the comparison. So it gets the current `i = 1`.

    Then follow `2, 3, 4…`

    Let's stop on `i = 4`. The prefix form `++i` would increment it and use `5` in the comparison. But here we have the postfix form `i++`. So it increments `i` to `5`, but returns the old value. Hence the comparison is actually `while(4 < 5)` -- true, and the control goes on to `alert`.

    The value `i = 5` is the last one, because on the next step `while(5 < 5)` is false.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
