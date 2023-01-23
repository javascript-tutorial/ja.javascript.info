<<<<<<< HEAD
# アンカー ^ $ の複数行モード, フラグ "m"

フラグ `pattern:m` で、複数行モードを有効にできます。

これは `pattern:^` と `pattern:$` の動作にのみ影響します。

複数行モードでは、文字列の始めと終わりだけでなく、行の始まりと終わりにもマッチします。

## 行の開始 ^ の検索

下の例では、テキストは複数行です。パターン `pattern:/^\d+/gm` はそれぞれの行の先頭から数字を取ります。:
=======
# Multiline mode of anchors ^ $, flag "m"

The multiline mode is enabled by the flag `pattern:m`.

It only affects the behavior of `pattern:^` and `pattern:$`.

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

## Searching at line start ^

In the example below the text has multiple lines. The pattern `pattern:/^\d/gm` takes a digit from the beginning of each line:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = `1st place: Winnie
2nd place: Piglet
<<<<<<< HEAD
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/gm) ); // 1, 2, 33
*/!*
```

`pattern:m` フラグがない場合は、最初の数値だけがマッチします:

=======
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Without the flag `pattern:m` only the first digit is matched:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = `1st place: Winnie
2nd place: Piglet
<<<<<<< HEAD
33rd place: Eeyore`;

*!*
alert( str.match(/^\d+/g) ); // 1
*/!*
```

これは、デフォルトではキャレット `pattern:^` はテキストの先頭にのみマッチし、複数行モードでは -- 行の始まりがマッチするためです。

```smart
"行の開始" は正式には "改行の直後" を意味します: 複数行モードでの `pattern:^` は改行文字 `\n` が前にあるすべての位置にマッチします。
```

## 行の終わり $ の検索

ドル記号 `pattern:$` も同様に振る舞います。

正規表現 `pattern:\d$` は各行で最後の数字を見つけます。:
=======
3rd place: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of any line.

```smart
"Start of a line" formally means "immediately after a line break": the test  `pattern:^` in multiline mode matches at all positions preceded by a newline character `\n`.

And at the text start.
```

## Searching at line end $

The dollar sign `pattern:$` behaves similarly.

The regular expression `pattern:\d$` finds the last digit in every line
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

<<<<<<< HEAD
alert( str.match(/\d$/gm) ); // 1,2,3
```

フラグ `pattern:m` がなければ、ドル `pattern:$` は文字列全体の終わりにのみマッチします。なので、最後の数字だけが見つかるでしょう。

```smart
"行の終わり" は正式には "改行の直前" を意味します: 複数行モードでの `pattern:$` は改行文字 `\n` が続くすべての位置にマッチします。
```

## ^ $ の代わりに \n を検索する

改行を見つけるには、アンカー `pattern:^` と `pattern:$` だけでなく、改行文字 `\n` を使うこともできます。

違いは何でしょう？例を見てみましょう。

ここでは `pattern:\d$` の代わりに `pattern:\d\n` を使って検索します:
=======
console.log( str.match(/\d$/gm) ); // 1,2,3
```

Without the flag `pattern:m`, the dollar `pattern:$` would only match the end of the whole text, so only the very last digit would be found.

```smart
"End of a line" formally means "immediately before a line break": the test  `pattern:$` in multiline mode matches at all positions succeeded by a newline character `\n`.

And at the text end.
```

## Searching for \n instead of ^ $

To find a newline, we can use not only anchors `pattern:^` and `pattern:$`, but also the newline character `\n`.

What's the difference? Let's see an example.

Here we search for `pattern:\d\n` instead of `pattern:\d$`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

<<<<<<< HEAD
alert( str.match(/\d\n/gm) ); // 1\n,2\n
```

ご覧の通り、3つではなく2つマッチします。

これは `subject:3` の後に改行がないためです(ですがテキストの終わりはあるので、`pattern:$` にはマッチします)。

もう1つの違い: すべてのマッチ結果には、改行文字 `match:\n` を含みます。アンカー `pattern:^` `pattern:$` (条件(行の開始/終了)のみのテスト)とは異なり、`\n` は文字なので、結果に含まれます。

したがって、パターンの `\n` は、結果に改行を含めたいときに利用され、アンカーは行の先頭/末尾を探したいときに使われます。
=======
console.log( str.match(/\d\n/g) ); // 1\n,2\n
```

As we can see, there are 2 matches instead of 3.

That's because there's no newline after `subject:3` (there's text end though, so it matches `pattern:$`).

Another difference: now every match includes a newline character `match:\n`. Unlike the anchors `pattern:^` `pattern:$`, that only test the condition (start/end of a line), `\n` is a character, so it becomes a part of the result.

So, a `\n` in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
