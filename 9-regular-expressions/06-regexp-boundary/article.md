# 単語境界(Word boundary): \b

単語境界 `pattern:\b` は `pattern:^` や `pattern:$` と同様、テストです。

正規表現のエンジン(正規表現の検索を実装するプログラムモジュール)が `pattern:\b` に出くわすと、文字列内の位置が単語境界であるかを確認します。

単語の境界としては、次の3つの異なる位置があります:

- 文字列の先頭。文字列の最初が、単語文字 `pattern:\w` の場合。
- 文字列内の2つの文字の間。一方が単語文字 `pattern:\w` でもう一方はそうでない場合。
- 文字列の最後。文字列の最後の文字が単語文字 `pattern:\w` の場合。

例えば、正規表現 `pattern:\bJava\b` は `subject:Hello, Java!` で見つかり、`subject:Java` は独立した単語です。が、`subject:Hello, JavaScript!` では見つかりません。

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

文字列 `subject:Hello, Java!` で、次の位置は `pattern:\b` に対応します:

![](hello-java-boundaries.svg)

したがって、次の理由によりパターン `pattern:\bHello\b` にマッチします:

1. 文字列の先頭は最初の検査 `pattern:\b` にマッチします。
2. 次に、単語 `pattern:Hello` がマッチします。
3. 次に、`subject:o` と非文字の間になるので、検査 `pattern:\b` が再びマッチします。

パターン `pattern:\bJava\b` もマッチします。が、`pattern:\bHell\b` はマッチしません(`l` の後に単語境界がないため)。また、`Java!\b` もマッチしません(感嘆符は単語文字 `pattern:\w` ではないため、その後に単語境界はありません)。

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (マッチせず)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (マッチせず)
```

なお、単語だけでなく数字に対しても同様に `pattern:\b` が利用できます。

例えば、パターン `pattern:\b\d\d\b` は単独の2桁の数値を探します。言い換えると、スペースや句読点(あるいはテキストの開始/終了)といった `pattern:\w` とは異なる文字で囲まれた2桁の数値を探します。

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

```warn header="単語境界 `pattern:\b` は非ラテンアルファベットに対しては機能しません"
単語境界の検査 `pattern:\b` は、その位置の一方が `pattern:\w` であり、反対側が `pattern:\w` でないかをチェックします。

しかし、`pattern:\w` はラテン文字 `a-z` (あるいは数字またはアンダーススコア)を意味するので、キリル文字や象形文字など、他の文字では機能しません。
```
