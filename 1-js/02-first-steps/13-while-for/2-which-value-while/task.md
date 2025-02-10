importance: 4

---

<<<<<<< HEAD
# while でどの値が表示される？

各ループで、どの値が表示されるか、あなたの意見を書きなさい。また、それと答えを見比べてみてください。

両方のループは同じ数だけ `alert` されますか？それとも違いますか？

1. プレフィックス形式 `++i`:
=======
# Which values does the while loop show?

For every loop iteration, write down which value it outputs and then compare it with the solution.

Both loops `alert` the same values, or not?

1. The prefix form `++i`:
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    let i = 0;
    while (++i < 5) alert( i );
    ```
<<<<<<< HEAD
2. ポストフィックス形式 `i++`
=======
2. The postfix form `i++`
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js
    let i = 0;
    while (i++ < 5) alert( i );
    ```
