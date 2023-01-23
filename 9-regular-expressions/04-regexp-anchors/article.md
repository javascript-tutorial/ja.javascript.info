<<<<<<< HEAD
# 文字列の先頭 ^ と末尾 $

キャレット `pattern:'^'` とドル `pattern:'$'` 文字は正規表現で特別な意味を持っており、"アンカー" と呼ばれます。

[cut]

キャレット `pattern:^` はテキストの先頭にマッチし、ドル `pattern:$` は -- 末尾にマッチします。

例えば、テキストが `Mary` から始まっているかをテストしてみましょう:

```js run
let str1 = "Mary had a little lamb, it's fleece was white as snow";
let str2 = 'Everywhere Mary went, the lamp was sure to go';

alert( /^Mary/.test(str1) ); // true
alert( /^Mary/.test(str2) ); // false
```

パターン `pattern:^Mary` は、"文字列が Mary で開始する" を意味します。

次は、テキストがメールアドレスで終わっているかをテストしましょう。

メールアドレスにマッチするには、正規表現 `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}` を使います。これは完全ではありませんが、多くの場合は問題ありません。

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
=======
# Anchors: string start ^ and end $

The caret `pattern:^` and dollar `pattern:$` characters have special meaning in a regexp. They are called "anchors".

The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- at the end.

For instance, let's test if the text starts with `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

The pattern `pattern:^Mary` means: "string start and then Mary".

Similar to this, we can test if the string ends with `snow` using `pattern:snow$`:

```js run
let str1 = "its fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Testing for a full match

Both anchors together `pattern:^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that's `pattern:\d\d:\d\d`:

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

Here the match for `pattern:\d\d:\d\d` must start exactly after the beginning of the text `pattern:^`, and the end `pattern:$` must immediately follow.

The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Anchors have \"zero width\""
Anchors `pattern:^` and `pattern:$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
```
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
