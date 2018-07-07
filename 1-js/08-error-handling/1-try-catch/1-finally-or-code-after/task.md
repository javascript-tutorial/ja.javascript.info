importance: 5

---

# Finally or just the code?

2つのコードの断片を比較してみてください。

1. 1つ目は `try..catch` のあとにコードを実行するために `finally` を使います:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    } finally {
    *!*
      作業場所のクリーンアップ
    */!*
    }
    ```
2. 2つ目は `try..catch` の直後にクリーンアップする処理を置きます:

    ```js
    try {
      work work
    } catch (e) {
      handle errors
    }

    *!*
    作業場所のクリーンアップ
    */!*
    ```

私たちは、処理が開始された後には、それがエラーかどうかは関係なく必ずクリーンアップが必要です。

`finally` を使うことの利点はあるでしょうか？それとも両方のコードは同じでしょうか？もし利点がある場合はそれが関係する例を挙げてください。
