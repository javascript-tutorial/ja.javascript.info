<<<<<<< HEAD
# 単語境界(Word boundary): \b

単語境界 `pattern:\b` は `pattern:^` や `pattern:$` と同様、テストです。

正規表現のエンジン(正規表現の検索を実装するプログラムモジュール)が `pattern:\b` に出くわすと、文字列内の位置が単語境界であるかを確認します。

単語の境界としては、次の3つの異なる位置があります:

- 文字列の先頭。文字列の最初が、単語文字 `pattern:\w` の場合。
- 文字列内の2つの文字の間。一方が単語文字 `pattern:\w` でもう一方はそうでない場合。
- 文字列の最後。文字列の最後の文字が単語文字 `pattern:\w` の場合。

例えば、正規表現 `pattern:\bJava\b` は `subject:Hello, Java!` で見つかり、`subject:Java` は独立した単語です。が、`subject:Hello, JavaScript!` では見つかりません。
=======
# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<<<<<<< HEAD
文字列 `subject:Hello, Java!` で、次の位置は `pattern:\b` に対応します:

![](hello-java-boundaries.svg)

したがって、次の理由によりパターン `pattern:\bHello\b` にマッチします:

1. 文字列の先頭は最初の検査 `pattern:\b` にマッチします。
2. 次に、単語 `pattern:Hello` がマッチします。
3. 次に、`subject:o` と非文字の間になるので、検査 `pattern:\b` が再びマッチします。

パターン `pattern:\bJava\b` もマッチします。が、`pattern:\bHell\b` はマッチしません(`l` の後に単語境界がないため)。また、`Java!\b` もマッチしません(感嘆符は単語文字 `pattern:\w` ではないため、その後に単語境界はありません)。
=======
In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` matches again, as we're between `subject:o` and a comma.

So the pattern `pattern:\bHello\b` would match, but not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `pattern:\w`, so there's no word boundary after it).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
<<<<<<< HEAD
alert( "Hello, Java!".match(/\bHell\b/) );  // null (マッチせず)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (マッチせず)
```

なお、単語だけでなく数字に対しても同様に `pattern:\b` が利用できます。

例えば、パターン `pattern:\b\d\d\b` は単独の2桁の数値を探します。言い換えると、スペースや句読点(あるいはテキストの開始/終了)といった `pattern:\w` とは異なる文字で囲まれた2桁の数値を探します。
=======
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

We can use `pattern:\b` not only with words, but with digits as well.

For example, the pattern `pattern:\b\d\d\b` looks for standalone 2-digit numbers. In other words, it looks for 2-digit numbers that are surrounded by characters different from `pattern:\w`, such as spaces or punctuation (or text start/end).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

<<<<<<< HEAD
```warn header="単語境界 `pattern:\b` は非ラテンアルファベットに対しては機能しません"
単語境界の検査 `pattern:\b` は、その位置の一方が `pattern:\w` であり、反対側が `pattern:\w` でないかをチェックします。

しかし、`pattern:\w` はラテン文字 `a-z` (あるいは数字またはアンダーススコア)を意味するので、キリル文字や象形文字など、他の文字では機能しません。
=======
```warn header="Word boundary `pattern:\b` doesn't work for non-latin alphabets"
The word boundary test `pattern:\b` checks that there should be `pattern:\w` on the one side from the position and "not `pattern:\w`" - on the other side.

But `pattern:\w` means a latin letter `a-z` (or a digit or an underscore), so the test doesn't work for other characters, e.g. cyrillic letters or hieroglyphs.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
