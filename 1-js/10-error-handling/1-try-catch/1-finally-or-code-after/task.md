importance: 5

---

# Finally or just the code?

<<<<<<< HEAD
2つのコードの断片を比較してみてください。

1. 1つ目は `try..catch` のあとにコードを実行するために `finally` を使います:
=======
Compare the two code fragments.

1. The first one uses `finally` to execute the code after `try...catch`:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

    ```js
    try {
      work work
<<<<<<< HEAD
    } catch (e) {
      handle errors
    } finally {
    *!*
      作業場所のクリーンアップ
    */!*
    }
    ```
2. 2つ目は `try..catch` の直後にクリーンアップする処理を置きます:
=======
    } catch (err) {
      handle errors
    } finally {
    *!*
      cleanup the working space
    */!*
    }
    ```
2. The second fragment puts the cleaning right after `try...catch`:
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3

    ```js
    try {
      work work
<<<<<<< HEAD
    } catch (e) {
=======
    } catch (err) {
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
      handle errors
    }

    *!*
<<<<<<< HEAD
    作業場所のクリーンアップ
    */!*
    ```

私たちは、処理が開始された後には、それがエラーかどうかは関係なく必ずクリーンアップが必要です。

`finally` を使うことの利点はあるでしょうか？それとも両方のコードは同じでしょうか？もし利点がある場合はそれが関係する例を挙げてください。
=======
    cleanup the working space
    */!*
    ```

We definitely need the cleanup after the work, doesn't matter if there was an error or not.

Is there an advantage here in using `finally` or both code fragments are equal? If there is such an advantage, then give an example when it matters.
>>>>>>> d78b01e9833009fab534462e05c03cffc51bf0e3
