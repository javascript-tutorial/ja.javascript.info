# 複数行モード, フラグ "m"

フラグ `pattern:/.../m` とすることで、複数行モードを有効にできます。

<<<<<<< HEAD:5-regular-expressions/13-regexp-multiline-mode/article.md
[cut]

これは `pattern:^` と `pattern:$` の動作にのみ影響します。
=======
It only affects the behavior of `pattern:^` and `pattern:$`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/13-regexp-multiline-mode/article.md

複数行モードでは、文字列の始めと終わりだけでなく、行の始まりと終わりにもマッチします。

## 行の開始 ^

下の例では、テキストは複数行です。パターン `pattern:/^\d+/gm` はそれぞれの行の先頭から数字を取ります。:

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/gm) ); // 1, 2, 33
*/!*
```

`pattern:/.../m` フラグがない場合は、最初の数値だけがマッチします:


```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/g) ); // 1
*/!*
```

これは、デフォルトではキャレット `pattern:^` はテキストの先頭にのみマッチし、複数行モードでは -- 行の始まりがマッチするためです。

正規表現エンジンはテキストに沿って進み、`pattern:^` で始まる文字列を探し、見つけたとき -- パターン `pattern:\d+` の残りの部分のマッチを続けます。

## 行の終わり $

ドル記号 `pattern:$` も同様に振る舞います。

正規表現 `pattern:\w+$` は各行で最後の単語を見つけます。:

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+$/gim) ); // Winnie,Piglet,Eeyore
```

フラグ `pattern:/.../m` がなければ、ドル `pattern:$` は文字列全体の終わりにのみマッチします。なので、最後の単語だけが見つかるでしょう。

## アンカー ^$ vs \n

改行を見つけるには、`pattern:^` と `pattern:$` だけでなく、改行文字 `\n` を使うこともできます。

最初の違いは、アンカーとは異なり、文字 `\n` は改行文字を "消費" し、結果にそれを追加することです。

例えば、ここでは `pattern:$` の代わりに `\n` を使っています:

```js run
let str = `1st place: Winnie
2nd place: Piglet
33rd place: Eeyore`;

alert( str.match(/\w+\n/gim) ); // Winnie\n,Piglet\n
```

ここでは、すべてのマッチは単語に改行文字を加えたものです。

そして、もう1つの違いは -- 改行 `\n` は文字列の末尾にはマッチしないことです。そのため、`Eeyore` は上の例では見つかりませんでした。

したがって、通常はアンカーのほうが優れています。それらは我々が欲しいものにより近いです。
