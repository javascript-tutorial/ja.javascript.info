importance: 4

---

<<<<<<< HEAD
# while でどの値が表示される？

各ループで、どの値が表示されるか、あなたの意見を書きなさい。また、それと答えを見比べてみてください。

両方のループは同じ数だけ `alert` されますか？それとも違いますか？
=======
# Which values does the while loop show?

For every loop iteration, write down which value it outputs and then compare it with the solution.

Both loops `alert` the same values, or not?
>>>>>>> fcfef6a07842ed56144e04a80c3a24de049a952a

1. プレフィックス形式 `++i`:

    ```js
    let i = 0;
    while (++i < 5) alert( i );
    ```
2. ポストフィックス形式 `i++`

    ```js
    let i = 0;
    while (i++ < 5) alert( i );
    ```
