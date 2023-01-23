<<<<<<< HEAD
# 破壊的なバックトラック(Catastrophic backtracking)

一部の正規表現は、一見すると単純に見えますが、実行時間が非常に長く JavaScript エンジンを "ハング" させることがあります。

遅かれ早かれ、多くの開発者はこのような振る舞いに直面することがあります。典型的な症状は、正規表現は概ねうまく機能しますが、特定の文字の場合 "ハング" し、CPUを 100% 消費します。

このような場合、Webブラウザはスクリプトを停止し、ページをリロードするよう提案します。これは確かに良いことではありません。

サーバサイド JavaScript では、このような正規表現はサーバプロセスをハングさせる可能性があり、より深刻です。そのため、絶対に見ておくべきことです。

## 例

文字列があり、それぞれの文字の後に任意のスペース `pattern:\s?` を持つ文字 `pattern:\w+` から構成されるかを確認したいとしましょう。

正規表現を組み立てる明白な方法は、文字の後に任意のスペース `pattern:\w+\s?` を取り、それを `*` で繰り返すことです。

これで、正規表現 `pattern:^(\w+\s?)*$` ができ、先頭 `pattern:^` から始まり、行末で終わる `pattern:$`、ゼロ個以上の単語を指します。

動作:
=======
# Catastrophic backtracking

Some regular expressions are looking simple, but can execute a veeeeeery long time, and even "hang" the JavaScript engine.

Sooner or later most developers occasionally face such behavior. The typical symptom -- a regular expression works fine sometimes, but for certain strings it "hangs", consuming 100% of CPU.

In such case a web-browser suggests to kill the script and reload the page. Not a good thing for sure.

For server-side JavaScript such a regexp may hang the server process, that's even worse. So we definitely should take a look at it.

## Example

Let's say we have a string, and we'd like to check if it consists of words `pattern:\w+` with an optional space `pattern:\s?` after each.

An obvious way to construct a regexp would be to take a word followed by an optional space `pattern:\w+\s?` and then repeat it with `*`.

That leads us to the regexp `pattern:^(\w+\s?)*$`, it specifies zero or more such words, that start at the beginning `pattern:^` and finish at the end `pattern:$` of the line.

In action:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

<<<<<<< HEAD
正規表現は動作しているように見え、結果も正しいです。ですが、特定の文字列の場合には非常に時間がかかります。それはJavaScript エンジンが CPU 100% 消費で "ハング" するほどの長さです。

以下の例を実行した場合、JavaScript が "ハング" し恐らくなにも表示されないでしょう。Webブラウザがイベントへ反応するのをやめ、UI は機能しなくなります（ほとんどのブラウザはスクロールだけ許可します）。しばらくすると、ページのリロードを提案するでしょう。そのため、この実行には気をつけてください。

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp to hang!";

// 非常に時間がかかります
alert( regexp.test(str) );
```

公平を期するために、正規表現のエンジンによってはこのような検索も効果的に扱えることに留意してください。ですが、それらの多くはできません。通常、ブラウザエンジンはハングします。

## 分かりやすい例

何がおきているのでしょう。なぜ正規表現がハングするのでしょう？

これを理解するために、分かりやすい例にしましょう: スペース `pattern:\s?` を除きます。すると、`pattern:^(\w+)*$` になります。

そして、より物事を明確にするために、`pattern:\w` を `pattern:\d` に置き換えます。結果の正規表現は依然としてハングします。たとえば:
=======
The regexp seems to work. The result is correct. Although, on certain strings it takes a lot of time. So long that JavaScript engine "hangs" with 100% CPU consumption.

If you run the example below, you probably won't see anything, as JavaScript will just "hang". A web-browser will stop reacting on events, the UI will stop working (most browsers allow only scrolling). After some time it will suggest to reload the page. So be careful with this:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// will take a very long time
alert( regexp.test(str) );
```

To be fair, let's note that some regular expression engines can handle such a search effectively, for example V8 engine version starting from 8.8 can do that (so Google Chrome 88 doesn't hang here), while Firefox browser does hang. 

## Simplified example

What's the matter? Why does the regular expression hang?

To understand that, let's simplify the example: remove spaces `pattern:\s?`. Then it becomes `pattern:^(\w+)*$`.

And, to make things more obvious, let's replace `pattern:\w` with `pattern:\d`. The resulting regular expression still hangs, for instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

<<<<<<< HEAD
// 非常に時間がかかります (注意してください!)
alert( regexp.test(str) );
```

では、この正規表現の何が問題になっているでしょうか。

まず、正規表現 `pattern:(\d+)*` は少しおかしいことに気づくかもしれません。量指定子 `pattern:*` は無関係に見えます。数字が必要な場合は、`pattern:\d+` が使えます。

前の例を単純化することで得たものなので、確かに正規表現は不自然です。ですが、遅い理由は同じなので、これで理解していきましょう。そうすれば、前の例も明らかになります。

行 `subject:123456789z` （分かりやすくするために少し短くしました。末尾に数字以外の文字 `subject:z` があることに注意してください。重要です。）での `pattern:^(\d+)*$` の検索中には何が起きているのでしょうか、なぜそれほど時間がかかるのでしょう？

これは、正規表現エンジンが行っていることです:

1. 最初に、正規表現エンジンは括弧の内容を見つけようとします: 数値 `pattern:\d+` です。プラス `pattern:+` はデフォルトでは貪欲なので、これはすべての数値を消費します:
=======
// will take a very long time (careful!)
alert( regexp.test(str) );
```

So what's wrong with the regexp?

First, one may notice that the regexp `pattern:(\d+)*` is a little bit strange. The quantifier `pattern:*` looks extraneous. If we want a number, we can use `pattern:\d+`.

Indeed, the regexp is artificial; we got it by simplifying the previous example. But the reason why it is slow is the same. So let's understand it, and then the previous example will become obvious.

What happens during the search of `pattern:^(\d+)*$` in the line `subject:123456789z` (shortened a bit for clarity, please note a non-digit character `subject:z` at the end, it's important), why does it take so long?

Here's what the regexp engine does:

1. First, the regexp engine tries to find the content of the parentheses: the number `pattern:\d+`. The plus `pattern:+` is greedy by default, so it consumes all digits:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
    \d+.......
    (123456789)z
    ```

<<<<<<< HEAD
    すべての数値が消費された後、`pattern:\d+` は見つけられたと判断されます（`match:123456789`）。
    
    次に、アスタリスク量指定子 `pattern:(\d+)*`  が適用されます。が、テキストにはもう数値はないので、アスタリスクは何もとりません。

    パターンの次の文字は文字列の終わり `pattern:$` です。しかし、テキストには代わりに `subject:z` があるのでマッチしません。
=======
    After all digits are consumed, `pattern:\d+` is considered found (as `match:123456789`).

    Then the star quantifier `pattern:(\d+)*` applies. But there are no more digits in the text, so the star doesn't give anything.

    The next character in the pattern is the string end `pattern:$`. But in the text we have `subject:z` instead, so there's no match:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
               X
    \d+........$
    (123456789)z
    ```

<<<<<<< HEAD
2. 一致しなかったので、貪欲量指定子 `pattern:+` は繰り返しの数を減らし、1文字戻ります。

    いま、 `pattern:\d+` は最後の1つを除いた全ての数値を取ります (`match:12345678`):
=======
2. As there's no match, the greedy quantifier `pattern:+` decreases the count of repetitions, backtracks one character back.

    Now `pattern:\d+` takes all digits except the last one (`match:12345678`):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```
    \d+.......
    (12345678)9z
    ```
<<<<<<< HEAD
3. 次に、エンジンは次の位置(`match:12345678`の直後)から検索を続けようとします。

    アスタリスク `pattern:(\d+)*` が適用されます -- `pattern:\d+` のもう1つの一致、数値 `match:9` が与えられます。:
=======
3. Then the engine tries to continue the search from the next position (right after `match:12345678`).

    The star `pattern:(\d+)*` can be applied -- it gives one more match of `pattern:\d+`, the number `match:9`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

<<<<<<< HEAD
    エンジンは 再び `pattern:$` への一致を試みますが、代わりに `subject:z` があるので失敗します。:
=======
    The engine tries to match `pattern:$` again, but fails, because it meets `subject:z` instead:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```


<<<<<<< HEAD
4. 一致しないので、エンジンはバックトラッキングを続け、繰り返しの回数を減らしていきます。バックトラッキングは一般的にはこのように機能します: 最後の貪欲量指定子が、可能な限り繰り返し回数を減らします。次に、前の貪欲な量指定子が減少していきます。


    可能なすべての組み合わせが試行されます。これがその例です。

    最初の数値 `pattern:\d+` は7桁で、次は2桁の数値です:
=======
4. There's no match, so the engine will continue backtracking, decreasing the number of repetitions. Backtracking generally works like this: the last greedy quantifier decreases the number of repetitions until it reaches the minimum. Then the previous greedy quantifier decreases, and so on.

    All possible combinations are attempted. Here are their examples.

    The first number `pattern:\d+` has 7 digits, and then a number of 2 digits:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

<<<<<<< HEAD
    最初の数値は7桁で、次にそれぞれ1桁の数値が2つです:
=======
    The first number has 7 digits, and then two numbers of 1 digit each:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

<<<<<<< HEAD
    最初の数値は6桁で、次の数値は3桁です:
=======
    The first number has 6 digits, and then a number of 3 digits:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

<<<<<<< HEAD
    最初の数値は6桁で、次は2つの数値です:
=======
    The first number has 6 digits, and then 2 numbers:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

<<<<<<< HEAD
    ...etc


数値の並び `123456789` を数値に分割する方法は多くあります。正確には、<code>2<sup>n</sup>-1</code> で、`n` は数字列の長さです。

- `123456789` の場合、`n=9` であり、 511 の組み合わせになります。
- `n=20` のより長い並びの場合、約 100万（1048575）の組み合わせになります。
- `n=30` なら、1000倍以上(1073741823 の組み合わせ)になります。


それらを1つずつを試みることが、検索に時間がかかる理由です。

## 単語と文字に戻ります

最初の例、文字列 `subject:An input that hangs!` に対してパターン `pattern:^(\w+\s?)*$` で文字を探すときにも同様のことが起こっています。

理由は単語は１つ以上の `pattern:\w+` で表現されるためです。:
=======
    ...And so on.


There are many ways to split a sequence of digits `123456789` into numbers. To be precise, there are <code>2<sup>n</sup>-1</code>, where `n` is the length of the sequence.

- For `123456789` we have `n=9`, that gives 511 combinations.
- For a longer sequence with `n=20` there are about one million (1048575) combinations.
- For `n=30` - a thousand times more (1073741823 combinations).

Trying each of them is exactly the reason why the search takes so long.

## Back to words and strings

The similar thing happens in our first example, when we look for words by pattern `pattern:^(\w+\s?)*$` in the string `subject:An input that hangs!`.

The reason is that a word can be represented as one `pattern:\w+` or many:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

<<<<<<< HEAD
人間の場合、文字列は感嘆符 `!` で終わっているので一致しないことは明らかですが、正規表現では末尾に単語の文字 `pattern:\w` あるいはスペース `pattern:\s` を期待し、エンジンはその有無を知りません。

正規表現 `pattern:(\w+\s?)*` が文字列を "消費" しうるすべての組み合わせを試みます。それには、スペース `pattern:(\w+\s?)*` があるパターン、スペースがない `pattern:(\w+)*` パターン（スペース `pattern:\s?` は任意なので）が含まれます。（数字でみてきたように）多くの組み合わせがあるので、検索には時間がかかります。

何をすべきでしょう？

怠惰モード(lazy mode)を有効にすべきですか？

残念ながら、それは役に立ちません: もし `pattern:\w+` を `pattern:\w+?` に置き換えても、正規表現は依然としてハングするでしょう。組み合わせ順は変わりますが、トータルの数は変わらないからです。

正規表現エンジンによっては、巧妙なテストや有限の仕組みがあり、すべての組み合わせの実施を回避したり、はるかに高速にすることができますが、ほとんどのエンジンはそうではなく、また常にその仕組みが有効に働くとは限りません。

## 修正方法は?

問題を解決するために、大きく２つのアプローチがあります。

１つ目は、可能な組み合わせ数を減らすことです。

正規表現を `pattern:^(\w+\s)*\w*$` と書き換えて、スペースを任意ではなくしましょう。これは任意の数の単語文字のあとにスペースが続き `pattern:(\w+\s)*`、任意で最後の単語文字 `pattern:\w*` が続きます。

この正規表現は前のものと同等（同じものと一致します）であり、うまく動作します:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex to hang!";
=======
For a human, it's obvious that there may be no match, because the string ends with an exclamation sign `!`, but the regular expression expects a wordly character `pattern:\w` or a space `pattern:\s` at the end. But the engine doesn't know that.

It tries all combinations of how the regexp `pattern:(\w+\s?)*` can "consume" the string, including variants with spaces `pattern:(\w+\s)*` and without them `pattern:(\w+)*` (because spaces `pattern:\s?` are optional). As there are many such combinations (we've seen it with digits), the search takes a lot of time.

What to do?

Should we turn on the lazy mode?

Unfortunately, that won't help: if we replace `pattern:\w+` with `pattern:\w+?`, the regexp will still hang. The order of combinations will change, but not their total count.

Some regular expression engines have tricky tests and finite automations that allow to avoid going through all combinations or make it much faster, but most engines don't, and it doesn't always help.

## How to fix?

There are two main approaches to fixing the problem.

The first is to lower the number of possible combinations.

Let's make the space non-optional by rewriting the regular expression as `pattern:^(\w+\s)*\w*$` - we'll look for any number of words followed by a space `pattern:(\w+\s)*`, and then (optionally) a final word `pattern:\w*`.

This regexp is equivalent to the previous one (matches the same) and works well:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( regexp.test(str) ); // false
```

<<<<<<< HEAD
なぜ問題が解消されたのでしょう？

それは、スペースが必須になっているためです。

前の正規表現は、スペースを省略すると `pattern:(\w+)*` となり、1つの単語内で `\w+` の多くの組み合わせになります。

したがって、`subject:input` は次のように `pattern:\w+` の2つの繰り返しとして一致することになります。:
=======
Why did the problem disappear?

That's because now the space is mandatory.

The previous regexp, if we omit the space, becomes `pattern:(\w+)*`, leading to many combinations of `\w+` within a single word

So `subject:input` could be matched as two repetitions of `pattern:\w+`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
\w+  \w+
(inp)(ut)
```

<<<<<<< HEAD
新しいパターンは違います: `pattern:(\w+\s)*` は単語文字の繰返にスペースが続きます! スペースは必須なので、`subject:input` 文字列は `pattern:\w+\s` の2つの繰り返しとしては一致しません。

多くの（実際にはほとんどの）組み合わせを試みるために必要な時間はこれで節約されました。

## バックトラッキングの防止

ですが、正規表現の書き直しが常にやりやすいとは限りません。上の例では簡単でしたが、その方法が常に明らかなわけではありません。

その上、書き直した正規表現はたいていより複雑になりがちです。正規表現はただでさえ十分に複雑です。

幸いなことに、別のアプローチがあります。量指定子のバックトラッキングを禁止することができます。

問題の本質は、正規表現エンジンが人間にとっては明らかに間違っている多くの組み合わせを試行することです。

例. 正規表現 `pattern:(\d+)*$` では、 `pattern:+` がバックトラックすべきでないことは人間にとっては明らかです。単一の `pattern:\d+` を2つの `pattern:\d+\d+` に置き換えても何も変わりません。: 
=======
The new pattern is different: `pattern:(\w+\s)*` specifies repetitions of words followed by a space! The `subject:input` string can't be matched as two repetitions of `pattern:\w+\s`, because the space is mandatory.

The time needed to try a lot of (actually most of) combinations is now saved.

## Preventing backtracking

It's not always convenient to rewrite a regexp though. In the example above it was easy, but it's not always obvious how to do it.

Besides, a rewritten regexp is usually more complex, and that's not good. Regexps are complex enough without extra efforts.

Luckily, there's an alternative approach. We can forbid backtracking for the quantifier.

The root of the problem is that the regexp engine tries many combinations that are obviously wrong for a human.

E.g. in the regexp `pattern:(\d+)*$` it's obvious for a human, that `pattern:+` shouldn't backtrack. If we replace one `pattern:\d+` with two separate `pattern:\d+\d+`, nothing changes:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

<<<<<<< HEAD
また、元の例 `pattern:^(\w+\s?)*$` では、`pattern:\w+` ではバックトラックを禁止したい場合があります。つまり: `pattern:\w+` は可能な最大長で単語全体にマッチする必要があります。`pattern:\w+` では繰り返し数を減らしたり、それを2つの単語 `pattern:\w+\w+` に分割したりする必要はありません。

モダンな正規表現エンジンはそのための所有量指定子（強欲な量指定子、または絶対最大量指定子、possessive quantifiers ）をサポートしています。通常の量指定子のあとに `pattern:+` を追加すると、強欲になります。つまり、`pattern:\d+` の代わりに `pattern:\d++` を使い、`pattern:+` のバックトラックを停止します。

所有量指定子は実際には "通常の" 量指定子よりもシンプルです。それらはバックトラックなしでできるだけ多く一致するだけです。バックトラックなしの検索処理はよりシンプルです。

また、いわゆる "アトミックグループ (atomic capturing groups)"、括弧内でのバックトラックを無効にする方法もあります。

...ですが、残念ながら JavaScript ではサポートされていません。

"先読み変換" を使用してそれらをエミュレートすることができます。

### 救うための先読み!

高度なトピックに到達しました。バックトラックは意味をなさないことがあるため、`pattern:+` のような量指定子をバックトラックしないようにします。

バックトラックなしで、できるだけ多くの `pattern:\w` の繰り返しをとるパターンは `pattern:(?=(\w+))\1` です。もちろん、`pattern:\w` の代わりに別のパターンを取ることも可能です。

一見すると奇妙に見えるかもしれませんが、実際には非常に単純な変換です。

それでは読み解いていきましょう:

- 先読み `pattern:?=` は現在の位置から開始して、最も長い単語 `pattern:\w+` を期待します。
- `pattern:?=...` の括弧の内容はエンジンには記憶されません。そのため、`pattern:\w+` を括弧で囲みます。すると、エンジンはその内容を記憶します。
- ...そして、パターン内で `pattern:\1` として参照できるようにします。

つまり: 先をみすえて、単語  `pattern:\w+` があれば、 `pattern:\1` として一致させます。

なぜでしょうか？これは、先読みで単語 `pattern:\w+` を全体として検出し、それを `pattern:\1` でパターンにキャプチャするためです。したがって、本質的には所有の `pattern:+` 量指定子を実装しました。これは単語 `pattern:\w+` 全体のみをキャプチャし、部分はキャプチャしません。

例えば、単語 `subject:JavaScript` では、`match:Java` に一致するだけでなく、パターンの残りに一致するための `match:Script` も除外します。

2つのパターンの比較です:
=======
And in the original example `pattern:^(\w+\s?)*$` we may want to forbid backtracking in `pattern:\w+`. That is: `pattern:\w+` should match a whole word, with the maximal possible length. There's no need to lower the repetitions count in `pattern:\w+` or to split it into two words `pattern:\w+\w+` and so on.

Modern regular expression engines support possessive quantifiers for that. Regular quantifiers become possessive if we add `pattern:+` after them. That is, we use `pattern:\d++` instead of `pattern:\d+` to stop `pattern:+` from backtracking.

Possessive quantifiers are in fact simpler than "regular" ones. They just match as many as they can, without any backtracking. The search process without backtracking is simpler.

There are also so-called "atomic capturing groups" - a way to disable backtracking inside parentheses.

...But the bad news is that, unfortunately, in JavaScript they are not supported.

We can emulate them though using a "lookahead transform".

### Lookahead to the rescue!

So we've come to real advanced topics. We'd like a quantifier, such as `pattern:+` not to backtrack, because sometimes backtracking makes no sense.

The pattern to take as many repetitions of `pattern:\w` as possible without backtracking is: `pattern:(?=(\w+))\1`. Of course, we could take another pattern instead of `pattern:\w`.

That may seem odd, but it's actually a very simple transform.

Let's decipher it:

- Lookahead `pattern:?=` looks forward for the longest word `pattern:\w+` starting at the current position.
- The contents of parentheses with `pattern:?=...` isn't memorized by the engine, so wrap `pattern:\w+` into parentheses. Then the engine will memorize their contents
- ...And allow us to reference it in the pattern as `pattern:\1`.

That is: we look ahead - and if there's a word `pattern:\w+`, then match it as `pattern:\1`.

Why? That's because the lookahead finds a word `pattern:\w+` as a whole and we capture it into the pattern with `pattern:\1`. So we essentially implemented a possessive plus `pattern:+` quantifier. It captures only the whole word `pattern:\w+`, not a part of it.

For instance, in the word `subject:JavaScript` it may not only match `match:Java`, but leave out `match:Script` to match the rest of the pattern.

Here's the comparison of two patterns:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

<<<<<<< HEAD
1. 1つ目のパターンでは、`pattern:\w+` が最初に単語全体 `subject:JavaScript` をキャプチャしますが、`pattern:+` は1文字ずつバックトラックし、最終的に成功するまで（`pattern:\w+` が `match:Java` に一致するまで）パターンの残りの部分との一致を試みます。
2. 2つ目のパターンでは、`pattern:(?=(\w+))` は先読みし、単語 `subject:JavaScript` を見つけます。これは `pattern:\1` によってパターン全体が含まれます。そのため、その後に `subject:Script` を探す方法はありません。
 
`pattern:+` の後にバックトラックを禁止する必要がある場合、`pattern:\w` の代わりに、より複雑な正規表現を `pattern:(?=(\w+))\1` に置くことも可能です。


```smart
所有量指定子と先読みとの関係については記事 [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) と [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups) で詳しく説明しています。
```

最初の例をバックトラックを防止するために、先読みを利用して書き直してみましょう:
=======
1. In the first variant `pattern:\w+` first captures the whole word `subject:JavaScript` but then `pattern:+` backtracks character by character, to try to match the rest of the pattern, until it finally succeeds (when `pattern:\w+` matches `match:Java`).
2. In the second variant `pattern:(?=(\w+))` looks ahead and finds the word  `subject:JavaScript`, that is included into the pattern as a whole by `pattern:\1`, so there remains no way to find `subject:Script` after it.

We can put a more complex regular expression into `pattern:(?=(\w+))\1` instead of `pattern:\w`, when we need to forbid backtracking for `pattern:+` after it.

```smart
There's more about the relation between possessive quantifiers and lookahead in articles [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) and [Mimicking Atomic Groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Let's rewrite the first example using lookahead to prevent backtracking:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

<<<<<<< HEAD
let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false, うまく動作し、かつ早いです!
```

ここで `pattern:\2` は `pattern:\1` の代わりに使用しています。理由は、追加の外部の括弧があるためです。数字を間違えるのを避けるために、括弧に名前をつけることができます。例: `pattern:(?<word>\w+)`

```js run
//括弧は ?<word> で名前付けされ、\k<word> で参照できます。
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex to hang!";
=======
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false, works and fast!
```

Here `pattern:\2` is used instead of `pattern:\1`, because there are additional outer parentheses. To avoid messing up with the numbers, we can give the parentheses a name, e.g. `pattern:(?<word>\w+)`.

```js run
// parentheses are named ?<word>, referenced as \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

<<<<<<< HEAD
この記事で説明している問題は、"catastrophic backtracking (破壊的なバックトラック)" と呼ばれるものです。

その問題を解決する2つの方法を取り上げました:
- できるだけ組み合わせ数を減らすよう正規表現を書き直す
- バックトラックを防止する
=======
The problem described in this article is called "catastrophic backtracking".

We covered two ways how to solve it:
- Rewrite the regexp to lower the possible combinations count.
- Prevent backtracking.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
