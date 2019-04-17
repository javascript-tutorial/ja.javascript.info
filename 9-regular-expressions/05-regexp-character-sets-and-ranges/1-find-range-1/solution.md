解答: **いいえ, はい**.

- `subject:Java` では何もマッチしません。なぜなら `pattern:[^script]` は "指定されたもの以外の任意の文字" を意味するからです。そのため、正規表現は `"Java"` に続くそのような文字を探しますが、文字列は終わりなので該当するものはありません。

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
- マッチします。正規表現は大文字小文字を区別するため、`pattern:[^script]` は文字  `"S"` にマッチします。

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
