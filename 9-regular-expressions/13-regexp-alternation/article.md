<<<<<<< HEAD
# 論理和指定子(Alternation) (OR) |

論理和指定子は、実際には単純な "OR" である正規表現の用語です。

正規表現では、縦線の文字 `pattern:|` で表現されます。

例えば、プログラム言語を探す必要があるとします: HTML, PHP, Java, または JavaScript です。

対応する正規表現は次の通りです: `pattern:html|php|java(script)?`.

利用例:

```js run
let reg = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(reg) ); // 'HTML', 'CSS', 'JavaScript'
```

私たちは既に同様のことを知っています -- 角括弧です。`pattern:gr[ae]y` は `match:gray` または `match:grey` にマッチするように、複数の文字から選択することができます。

論理和指定子は文字レベルで動作するのではなく、式のレベルで動作します。正規表現 `pattern:A|B|C` は `A`, `B` または `C` の式のいずれか、を意味します。 

例:

- `pattern:gr(a|e)y` はまさに `pattern:gr[ae]y` と同じ意味です。
- `pattern:gra|ey` は `match:gra` または `match:ey` を意味します。

パターンの一部分に対して論理和指定子を適用する場合は、括弧でそれらを囲みます:
- `pattern:I love HTML|CSS` は `match:I love HTML` または `match:CSS` にマッチします。
- `pattern:I love (HTML|CSS)` は `match:I love HTML` または `match:I love CSS` にマッチします。

## 時間の正規表現

前のチャプターで、`12:00` のような形式 `hh:mm` の時間を探す正規表現を構築するタスクがありました。しかし、単純な `pattern:\d\d:\d\d` はあまりにも要領を得ません。これは `25:99` も時間として許容します。

どうすればより良い正規表現を作れるでしょうか？

その方法として、私たちはより慎重なマッチングを適用することができます。まず、時(hour):

- 最初の数字が `0` か `1` の場合、その後は任意の数値になります: `pattern:[01]\d`。
- そうではなく、最初の数字が `2` の場合、次は `pattern:[0-3]` でなければなりません。
- (最初の数字がそれ以外のものは許可されません)

論理和指定子を使用した、両方を含む正規表現は次の通りです:  `pattern:[01]\d|2[0-3]`.

次に、分 は `0` から `59` までである必要があります。正規表現では `pattern:[0-5]` と記述することができます。: 最初の数値 `0-5`, その後に任意の数字を続きます。

時と分をあわせると次のパターンになります: `pattern:[01]\d|2[0-3]:[0-5]\d`.

ほぼほぼできていますがまだ問題があります。論理和指定子 `|` は `pattern:[01]\d` と `pattern:2[0-3]:[0-5]\d` の間です。

つまり、このようになります
=======
# Alternation (OR) |

Alternation is the term in regular expression that is actually a simple "OR".

In a regular expression it is denoted with a vertical line character `pattern:|`.

For instance, we need to find programming languages: HTML, PHP, Java or JavaScript.

The corresponding regexp: `pattern:html|php|java(script)?`.

A usage example:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

We already saw a similar thing -- square brackets. They allow to choose between multiple characters, for instance `pattern:gr[ae]y` matches `match:gray` or `match:grey`.

Square brackets allow only characters or character classes. Alternation allows any expressions. A regexp `pattern:A|B|C` means one of expressions `A`, `B` or `C`.

For instance:

- `pattern:gr(a|e)y` means exactly the same as `pattern:gr[ae]y`.
- `pattern:gra|ey` means `match:gra` or `match:ey`.

To apply alternation to a chosen part of the pattern, we can enclose it in parentheses:
- `pattern:I love HTML|CSS` matches `match:I love HTML` or `match:CSS`.
- `pattern:I love (HTML|CSS)` matches `match:I love HTML` or `match:I love CSS`.

## Example: regexp for time

In previous articles there was a task to build a regexp for searching time in the form `hh:mm`, for instance `12:00`. But a simple `pattern:\d\d:\d\d` is too vague. It accepts `25:99` as the time (as 99 minutes match the pattern, but that time is invalid).

How can we make a better pattern?

We can use more careful matching. First, the hours:

- If the first digit is `0` or `1`, then the next digit can be any: `pattern:[01]\d`.
- Otherwise, if the first digit is `2`, then the next must be `pattern:[0-3]`.
- (no other first digit is allowed)

We can write both variants in a regexp using alternation: `pattern:[01]\d|2[0-3]`.

Next, minutes must be from `00` to `59`. In the regular expression language that can be written as `pattern:[0-5]\d`: the first digit `0-5`, and then any digit.

If we glue hours and minutes together, we get the pattern: `pattern:[01]\d|2[0-3]:[0-5]\d`.

We're almost done, but there's a problem. The alternation `pattern:|` now happens to be between `pattern:[01]\d` and `pattern:2[0-3]:[0-5]\d`.

That is: minutes are added to the second alternation variant, here's a clear picture:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
[01]\d  |  2[0-3]:[0-5]\d
```

<<<<<<< HEAD
このパターンは `pattern:[01]\d` あるいは `pattern:2[0-3]:[0-5]\d` を探します。

しかし、これは間違いです。OR は正規表現の "時" の部分にのみ使用される必要があります。`pattern:[01]\d` OR `pattern:2[0-3]` とするために。"時" を括弧で囲むことで正しくしましょう: `pattern:([01]\d|2[0-3]):[0-5]\d`。

最終的な解決策です:

```js run
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
=======
That pattern looks for `pattern:[01]\d` or `pattern:2[0-3]:[0-5]\d`.

But that's wrong, the alternation should only be used in the "hours" part of the regular expression, to allow `pattern:[01]\d` OR `pattern:2[0-3]`. Let's correct that by enclosing "hours" into parentheses: `pattern:([01]\d|2[0-3]):[0-5]\d`.

The final solution:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
