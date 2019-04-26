# 論理和指定子(Alternation) (OR) |

論理和指定子は、実際には単純な "OR" である正規表現の用語です。

正規表現では、縦線の文字 `pattern:|` で表現されます。

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
[cut]

例えば、プログラム言語を探す必要があるとします: HTML, PHP, Java, または JavaScript です。
=======
For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

対応する正規表現は次の通りです: `pattern:html|php|java(script)?`.

利用例:

```js run
let reg = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(reg) ); // 'HTML', 'CSS', 'JavaScript'
```

私たちは既に同様のことを知っています -- 角括弧です。`pattern:gr[ae]y` は `match:gray` または `match:grey` にマッチするように、複数の文字から選択することができます。

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
論理和指定子は文字レベルで動作するのではなく、式のレベルで動作します。正規表現 `pattern:A|B|C` は `A`, `B` または `C` の式のいずれか、を意味します。 
=======
Square brackets allow only characters or character sets. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

例:

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
- `pattern:gr(a|e)y` はまさに `pattern:gr[ae]y` と同じ意味です。
- `pattern:gra|ey` は "gra" または "ey" を意味します。
=======
- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

論理和指定子では、パターンの一部を区切るには通常次のようにカッコで囲みます。: `pattern:before(XXX|YYY)after`.

## 時間の正規表現

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
前のチャプターで、`12:00` のような形式 `hh:mm` の時間を探す正規表現を構築するタスクがありました。しかし、単純な `pattern:\d\d:\d\d` はあまりにも要領を得ません。これは `25:99` も時間として許容します。
=======
In previous chapters there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (99 seconds is valid, but shouldn't be).
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

どうすればより優れた正規表現を作れるでしょうか？

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
その方法として、私たちはより慎重なマッチングを適用することができます:

- 最初の数字は `0` か `1` で、その後に任意の数値が続く必要があります。
- もしくは `2` でその後に `pattern:[0-3]` が続きます。
=======
We can apply more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can by anything.
- Or, if the first digit is `2`, then the next must be `pattern:[0-3]`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

正規表現としてはこのようになります:  `pattern:[01]\d|2[0-3]`.

<<<<<<< HEAD:5-regular-expressions/11-regexp-alternation/article.md
その後、コロンと分の部分を追加します。

分 は `0` から `59` までである必要があり、正規表現では最初の数字 `pattern:[0-5]` でその後に他の数字 `\d` が続くことを意味します。

パターンにそれらを引っ付けましょう: `pattern:[01]\d|2[0-3]:[0-5]\d`.

ほとんど完了していますが、まだ問題があります。論理和指定子 `|` は `pattern:[01]\d` と `pattern:2[0-3]:[0-5]\d` の間です。これだと左右どちらかのパターンがマッチするすることになるので間違いです。

```js run
let reg = /[01]\d|2[0-3]:[0-5]\d/g;

alert("12".match(reg)); // 12 ([01]\d にマッチ)
```

それはかなり明らかではありますが、正規表現で作業を開始するときには依然としてよく起きるミスです。

時間の部分 `[01]\d` OR `2[0-3]` へ正確に論理和指定子を適用するために括弧が必要です。

=======
Next, the minutes must be from `0` to `59`. In the regexp language that means `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.

Let's glue them together into the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.

We're almost done, but there's a problem. The alternation `pattern:|` now happens to be between `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`.

That's wrong, as it should be applied only to hours `[01]\d` OR `2[0-3]`. That's a common mistake when starting to work with regular expressions.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:9-regular-expressions/11-regexp-alternation/article.md

正しいバリアントです:

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
```
