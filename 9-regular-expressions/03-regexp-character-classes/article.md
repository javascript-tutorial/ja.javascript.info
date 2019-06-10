<<<<<<< HEAD
# 文字クラス

実践的なタスクを考えてみましょう -- `"+7(903)-123-45-67"` という電話番号があり、その文字列のすべての数字を見つける必要があります。他の文字に興味はありません。

文字クラスは集合から任意の記号にマッチする特別な表記法です。

[cut]

例えば、"数字" クラスがあります。それは `\d` と書きます。それを正規表現のパターンに入れ検索すると、任意の数字がそれにマッチします。

例えば、正規表現 `pattern:/\d/`  は1つの数字を探します:
=======
# Character classes

Consider a practical task -- we have a phone number `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79035419441`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A character class is a special notation that matches any symbol from a certain set.

For the start, let's explore a "digit" class. It's written as `\d`. We put it in the pattern, that means "any single digit".

For instance, the let's find the first digit in the phone number:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/;

alert( str.match(reg) ); // 7
```

<<<<<<< HEAD
上の例では、正規表現はグローバルではありません。なので、最初のマッチだけを探します。

すべての数字を探すために `g` フラグを追加しましょう:
=======
Without the flag `g`, the regular expression only looks for the first match, that is the first digit `\d`.

Let's add the `g` flag to find all digits:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let str = "+7(903)-123-45-67";

let reg = /\d/g;

<<<<<<< HEAD
alert( str.match(reg) ); // マッチした配列: 7,9,0,3,1,2,3,4,5,6,7
```

## 最もよく使われるクラス: \d \s \w

先程は数字のための文字クラスでした。同様に他の文字クラスがあります。

最も使われるのは:

`\d` ("d" は "digit" より)
: 数字: `0` から `9` の文字です。

`\s` ("s" は "space" より)
: スペース記号: スペース、タブ、改行が含まれます。

`\w` ("w" は "word" より)
: "言葉" の文字: 英語アルファベットの文字または数字またはアンダースコア。 非英語の文字（キリル文字やヒンディー語など）は `\w` に属しません。

例えば、`pattern:\d\s\w` は `"1 Z"` のように、数字のあとに空白文字、単語文字が続く文字列を意味します。

正規表現は通常の記号と文字クラス両方を含む場合があります。

例として、`pattern:CSS\d` は `match:CSS` のあとに数字が続く文字列にマッチします。:
=======
alert( str.match(reg) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

alert( str.match(reg).join('') ); // 79035419441
```

That was a character class for digits. There are other character classes as well.

Most used are:

`\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`\s` ("s" is from "space")
: A space symbol: that includes spaces, tabs, newlines.

`\w` ("w" is from "word")
: A "wordly" character: either a letter of English alphabet or a digit or an underscore. Non-Latin letters (like cyrillic or hindi) do not belong to `\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", like `"1 a"`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let str = "CSS4 is cool";
let reg = /CSS\d/

alert( str.match(reg) ); // CSS4
```

<<<<<<< HEAD
また、多くの文字クラスを使うこともできます:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // 'HTML5'
```

マッチ(各文字クラスは結果文字に対応します):

![](love-html5-classes.png)

## 単語境界: \b

単語境界 `pattern:\b` -- は特別な文字クラスです。

これは文字を表すのではなく、文字の境界を表します。

例えば、 `pattern:\bJava\b` は `subject:Hello, Java!` という文字列の `match:Java` とマッチしますが、`subject:Hello, JavaScript!` という文字列にはマッチしません。:
=======
Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

The match (each character class corresponds to one result character):

![](love-html5-classes.png)

## Word boundary: \b

A word boundary `pattern:\b` -- is a special character class.

It does not denote a character, but rather a boundary between characters.

For instance, `pattern:\bJava\b` matches `match:Java` in the string `subject:Hello, Java!`, but not in the script `subject:Hello, JavaScript!`.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<<<<<<< HEAD
通常、文字クラスは結果の文字(単語や数字のような)を意味するので、ある意味では、境界は "ゼロ幅" を持ちますが、この場合はそうではありません。

境界はテストです。

正規表現エンジンが検索を行っているとき、マッチを見つけるために文字列に沿って移動しています。各文字列の位置で、パターンを検索しようとします。

パターンに `pattern:\b` が含まれている場合、文字列の位置が次の条件のいずれかを満たしているか検査します:

- 文字列が開始し、最初の文字が `\w` である。
- 文字列が終わり、最後の文字が `\w` である。
- 文字列の内側: 片方が `\w` で、もう一方が `\w` でない。

例えば、`subject:Hello, Java!` の文字列で `\b` にマッチする位置は次の通りです:

![](hello-java-boundaries.png)

したがって、`pattern:\bHello\b` と `pattern:\bJava\b` はマッチしますが、`pattern:\bHell\b` (`l` のあとに単語境界がないため) と `Java!\b` (感嘆符は `\w` でマッチする文字ではないので、単語境界がありません)はマッチしません。
=======
The boundary has "zero width" in a sense that usually a character class means a character in the result (like a wordly character or a digit), but not in this case.

The boundary is a test.

When regular expression engine is doing the search, it's moving along the string in an attempt to find the match. At each string position it tries to find the pattern.

When the pattern contains `pattern:\b`, it tests that the position in string is a word boundary, that is one of three variants:

- Immediately before is `\w`, and immediately after -- not `\w`, or vise versa.
- At string start, and the first string character is `\w`.
- At string end, and the last string character is `\w`.

For instance, in the string `subject:Hello, Java!` the following positions match `\b`:

![](hello-java-boundaries.png)

So it matches `pattern:\bHello\b`, because:

1. At the beginning of the string the first `\b` test matches.
2. Then the word `Hello` matches.
3. Then `\b` matches, as we're between `o` and a space.

Pattern `pattern:\bJava\b` also matches. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character, so there's no word boundary after it).

>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
<<<<<<< HEAD
alert( "Hello, Java!".match(/\bHell\b/) );  // null
alert( "Hello, Java!".match(/\bJava!\b/) ); // null
```

`pattern:\b` は検索エンジンに境界をテストさせます。それにより、`pattern:Java\b` は単語境界が続く場合にのみ `match:Java` を検出しますが、結果には文字を追加しないことに改めて留意しましょう。

通常、スタンドアロンの英単語を見つけるのに `\b` を使います。そのため、`"Java"` が必要な場合、`pattern:\bJava\b` は正確にスタンドアロンの単語を見つけ、`"JavaScript"` の一部であるときは無視します。

別の例: 正規表現 `pattern:\b\d\d\b` はスタンドアロンの 2桁の数字を探します。つまり、前後の `pattern:\d\d` は `\w` (もしくは文字列の始め/終わり)とは異なる記号でなければなりません。
=======
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

Once again let's note that `pattern:\b` makes the searching engine to test for the boundary, so that `pattern:Java\b` finds `match:Java` only when followed by a word boundary, but it does not add a letter to the result.

Usually we use `\b` to find standalone English words. So that if we want `"Java"` language then `pattern:\bJava\b` finds exactly a standalone word and ignores it when it's a part of another word, e.g. it won't match `match:Java` in `subject:JavaScript`.

Another example: a regexp `pattern:\b\d\d\b` looks for standalone two-digit numbers. In other words, it requires that before and after `pattern:\d\d` must be a symbol different from `\w` (or beginning/end of the string).
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
```

<<<<<<< HEAD
```warn header="単語境界は英語以外のアルファベットでは機能しません"
単語境界チェック `\b` は `\w` と他のものとの間の境界をテストします。しかし、 `\w` は英語文字(もしくは数字かアンダースコア)を意味するので、他の文字(キリル文字や象形文字など)の場合は機能しません。
```


## 逆のクラス

すべての文字クラスには "逆のクラス" があります。それは同じ文字ですが大文字で表されます。

"逆" は、他のすべての文字にマッチすることを意味します。例えば:

`\D`
: 非数字: `\d` 以外の任意の字です。例えば文字です。

`\S`
: 非スペース: `\s` 以外のすべての文字です。例えば文字です。

`\W`
: 非単語文字: `\w` 以外の文字。

`\B`
: 非境界: `\b` と逆のテストです。

チャプターの先頭では、電話番号 `subject:+7(903)-123-45-67` からすべての数字を取得する方法を見ました。文字列から "純粋な" 電話番号を取得してみましょう。:
=======
```warn header="Word boundary doesn't work for non-Latin alphabets"
The word boundary check `\b` tests for a boundary between `\w` and something else. But `\w` means an English letter (or a digit or an underscore), so the test won't work for other characters (like cyrillic or hieroglyphs).

Later we'll come by Unicode character classes that allow to solve the similar task for different languages.
```


## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "reverse" means that it matches all other characters, for instance:

`\D`
: Non-digit: any character except `\d`, for instance a letter.

`\S`
: Non-space: any character except `\s`, for instance a letter.

`\W`
: Non-wordly character: anything but `\w`.

`\B`
: Non-boundary: a test reverse to `\b`.

In the beginning of the chapter we saw how to get all digits from the phone `subject:+7(903)-123-45-67`.

One way was to match all digits and join them:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
代わりの方法は、文字列から非数字を見つけ削除することです:
=======
An alternative, shorter way is to find non-digits `\D` and remove them from the string:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477


```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## 空白は通常の文字です

正規表現は空白を含む場合があることに注意してください。空白は普通の文字のように扱われます。

通常、私たちは空白にはあまり注意を払っていません。我々にとって文字列 `subject:1-5` と `subject:1 - 5` はほぼ同じです。

しかし、正規表現は空白を考慮しなければ期待通りに動作しません。

ダッシュで分離されている数字を見つけましょう。:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, マッチしません!
```

これは正規表現の中に空白を追加して修正したものです:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, これは動作します
```

もちろん、空白はそれらを探す場合にだけ必要です。余分な空白は(単に別の他のとゆうな文字と同じように)マッチするのを妨げます。:

```js run
alert( "1-5".match(/\d - \d/) ); // null, 文字列 1-5 には空白がないからです
```

つまり、正規表現ではすべての文字が重要です。空白もです。

## ドットは任意の文字です

ドット `"."` は *改行を除く任意の文字* にマッチする特別な文字クラスです。

例:
=======
## Spaces are regular characters

Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a dash:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Here we fix it by adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
```

**A space is a character. Equal in importance with any other character.**

Of course, spaces in a regexp are needed only if we look for them. Extra spaces (just like any other extra characters) may prevent a match:

```js run
alert( "1-5".match(/\d - \d/) ); // null, because the string 1-5 has no spaces
```

In other words, in a regular expression all characters matter, spaces too.

## A dot is any character

The dot `"."` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
また正規表現の中にある場合:
=======
Or in the middle of a regexp:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4
alert( "CS-4".match(reg) ); // CS-4
<<<<<<< HEAD
alert( "CS 4".match(reg) ); // CS 4 (空白も文字です)
```

ドットは "任意の文字" を意味しますが、 "文字の欠如" ではないことに注意してください。それにマッチする文字が必要です::

```js run
alert( "CS4".match(/CS.4/) ); // null, ドットに対する文字がないのでマッチしません
```


## サマリ

文字クラスを説明しました:

- `\d` -- 数字
- `\D` -- 非数字
- `\s` -- スペース記号、タブ、改行
- `\S` -- `\s` 以外
- `\w` -- 英語文字、数字、アンダースコア `'_'`
- `\W` -- `\w` 以外
- `'.'` -- 改行以外の任意の文字

バックスラッシュやドットのような特別な意味を持つ文字を検索したい場合、バックスラッシュ `pattern:\.` でエスケープする必要があります。

正規表現は改行 `\n` と言った特別な文字も含むことに注意してください。 他の文字が使用されているので、文字クラスとの競合はありません。
=======
alert( "CS 4".match(reg) ); // CS 4 (space is also a character)
```

Please note that the dot means "any character", but not the "absense of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### The dotall "s" flag

Usually a dot doesn't match a newline character.

For instance, `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline.

This doesn't match:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)

// a space character would match, or a letter, but not \n
```

Sometimes it's inconvenient, we really want "any character", newline included.

That's what `s` flag does. If a regexp has it, then the dot `"."` match literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- English letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline.

...But that's not all!

The Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if a letter) it is it a punctuation sign, etc.

Modern JavaScript allows to use these properties in regexps to look for characters, for instance:

- A cyrillic letter is: `pattern:\p{Script=Cyrillic}` or `pattern:\p{sc=Cyrillic}`.
- A dash (be it a small hyphen `-` or a long dash `—`): `pattern:\p{Dash_Punctuation}` or `pattern:\p{pd}`.
- A currency symbol, such as `$`, `€` or another: `pattern:\p{Currency_Symbol}` or `pattern:\p{sc}`.
- ...And much more. Unicode has a lot of character categories that we can select from.

These patterns require `'u'` regexp flag to work. More about that in the chapter [](info:regexp-unicode).
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
