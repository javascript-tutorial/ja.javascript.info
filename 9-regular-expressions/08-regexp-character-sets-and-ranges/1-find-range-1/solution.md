<<<<<<< HEAD
解答: **いいえ, はい**.

- `subject:Java` では何もマッチしません。なぜなら `pattern:[^script]` は "指定されたもの以外の任意の文字" を意味するからです。そのため、正規表現は `"Java"` に続くそのような文字を探しますが、文字列は終わりなので該当するものはありません。
=======
Answers: **no, yes**.

- In the script `subject:Java` it doesn't match anything, because `pattern:[^script]` means "any character except given ones". So the regexp looks for `"Java"` followed by one such symbol, but there's a string end, no symbols after it.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    alert( "Java".match(/Java[^script]/) ); // null
    ```
<<<<<<< HEAD
- マッチします。正規表現は大文字小文字を区別するため、`pattern:[^script]` は文字  `"S"` にマッチします。
=======
- Yes, because the `pattern:[^script]` part matches the character `"S"`. It's not one of `pattern:script`. As the regexp is case-sensitive (no `pattern:i` flag), it treats `"S"` as a different character from `"s"`.
>>>>>>> 6236eb8c3cdde729dab761a1d0967a88a1a6197e

    ```js run
    alert( "JavaScript".match(/Java[^script]/) ); // "JavaS"
    ```
