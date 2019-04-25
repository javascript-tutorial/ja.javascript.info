# 文字列の先頭 ^ と末尾 $

キャレット `pattern:'^'` とドル `pattern:'$'` 文字は正規表現で特別な意味を持っており、"アンカー" と呼ばれます。

<<<<<<< HEAD:5-regular-expressions/12-regexp-anchors/article.md
[cut]

キャレット `pattern:^` はテキストの先頭にマッチし、ドル `pattern:$` は -- 末尾にマッチします。
=======
The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- in the end.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/12-regexp-anchors/article.md

例えば、テキストが `Mary` から始まっているかをテストしてみましょう:

```js run
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( /^Mary/.test(str1) ); // true
alert( /^Mary/.test(str2) ); // false
```

パターン `pattern:^Mary` は、"文字列が Mary で開始する" を意味します。

次は、テキストがメールアドレスで終わっているかをテストしましょう。

<<<<<<< HEAD:5-regular-expressions/12-regexp-anchors/article.md
メールアドレスにマッチするには、正規表現 `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}` を使います。これは完全ではありませんが、多くの場合は問題ありません。
=======
To match an email, we can use a regexp `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/12-regexp-anchors/article.md

文字列がメールアドレスで終わっているかどうかをテストするために、`pattern:$` をパターンに追加しましょう。:

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

let str1 = 'My email is mail@site.com';
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( reg.test(str1) ); // true
alert( reg.test(str2) ); // false
```

文字列が正確にパターンに従っているかをチェックするのに、両方のアンカーを一緒に使うことも可能です。それはバリデーションでよく使われます。

例えば、`str` が正確に色(`#` と 6桁の16進数の形式)であることを確認したいとします。その色のパターンは `pattern:#[0-9a-f]{6}` です。

*文字列全体* が正確にマッチするかをチェックするには、`pattern:^...$` を追加します。:

```js run
let str = "#abcdef";

alert( /^#[0-9a-f]{6}$/i.test(str) ); // true
```

正規表現のエンジンはテキストの開始を探し、次に色、その後すぐにテキストが終わるかを見ます。まさに私たちが必要なものです。

```smart header="アンカーの長さはゼロです"
`\b` のようなアンカーはテストです。それらの幅はゼロです。

つまり、それらは文字にマッチするのではなく、正規表現エンジンに条件チェック(テキストの開始/終了)を強制させるものです。
```

アンカーの振る舞いはフラグ `pattern:m` (複数行モード) の有無で変わります。それらについては次のチャプターで見ていきましょう。
