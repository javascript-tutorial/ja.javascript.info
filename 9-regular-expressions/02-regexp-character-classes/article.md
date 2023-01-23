<<<<<<< HEAD
# 文字クラス

実践的なタスクを考えてみましょう -- `"+7(903)-123-45-67"` という電話番号があり、その文字列のすべての数字を見つける必要があります: `79035419441`。

そのためには、数値以外を見つけて除去します。文字クラス(Character class)はこのとき役立ちます。

*文字クラス* は集合から任意の表現にマッチする特別な表記法です。

最初に "数字" クラスから見ていきましょう。`pattern:\d` と書きます。それを正規表現のパターンに入れ検索すると、任意の数字にマッチします。

例えば、正規表現 `pattern:/\d/`  は1つの数字を探します:
=======
# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, let's find the first digit in the phone number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "+7(903)-123-45-67";

<<<<<<< HEAD
let reg = /\d/;

alert( str.match(reg) ); // 7
```

上の例では `pattern:g` フラグがないので、正規表現は最初のマッチだけを探します。

すべての数字を探すために `pattern:g` フラグを追加しましょう:
=======
let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "+7(903)-123-45-67";

<<<<<<< HEAD
let reg = /\d/g;

alert( str.match(reg) ); // マッチした配列: 7,9,0,3,1,2,3,4,5,6,7

// 結果から数字だけの電話番号を作りましょう:
alert( str.match(regexp).join('') ); // 79035419441
```

先程は数字のための文字クラスでした。同様に他の文字クラスがあります。

最も使われるのは以下のものです:

`pattern:\d` ("d" は "digit" より)
: 数字: `0` から `9` の文字です。

`pattern:\s` ("s" は "space" より)
: スペース記号: スペース、タブ `\t`、改行 `\n` といくつかのあまり使われない文字が含まれます: `\v`, `\f` や `\r` です。

`pattern:\w` ("w" は "word" より)
: "言葉" の文字: 英語アルファベットの文字または数字またはアンダースコア `_`。 非英語の文字（キリル文字やヒンディー語など）は `pattern:\w` に属しません。

例えば、`pattern:\d\s\w` は `"1 Z"` のように、数字のあとに空白文字、単語文字が続く文字列を意味します。

**正規表現は通常の記号と文字クラス両方を含む場合があります。**

例として、`pattern:CSS\d` は `match:CSS` のあとに数字が続く文字列にマッチします。:

```js run
let str = "CSS4 is cool";
let reg = /CSS\d/

alert( str.match(reg) ); // CSS4
```

また、多くの文字クラスを使うこともできます:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // 'HTML5'
```

マッチ(各文字クラスは結果文字に対応します):

![](love-html5-classes.svg)

## 逆のクラス

すべての文字クラスには "逆のクラス" があります。それは同じ文字ですが大文字で表されます。

"逆" は、他のすべての文字にマッチすることを意味します。例えば:

`pattern:\D`
: 非数字: `pattern:\d` 以外の任意の字です。例えば文字です。

`pattern:\S`
: 非スペース: `pattern:\s` 以外のすべての文字です。例えば文字です。

`pattern:\W`
: 非単語文字: `pattern:\w` 以外の文字。


チャプターの先頭では、電話番号 `subject:+7(903)-123-45-67` からすべての数字を取得する方法を見ました。文字列から "純粋な" 電話番号を取得してみましょう。:
=======
let regexp = /\d/g;

alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:

```js run
let str = "Is there CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
代わりの方法は、文字列から非数字を見つけ削除することです:

=======
An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## ドットは任意の文字です

ドット `pattern:.` は *改行を除く任意の文字* にマッチする特別な文字クラスです。

例:
=======
## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
また正規表現の中にある場合:

```js run
let reg = /CS.4/;

alert( "CSS4".match(reg) ); // CSS4
alert( "CS-4".match(reg) ); // CS-4
alert( "CS 4".match(reg) ); // CS 4 (空白も文字です)
```

ドットは "任意の文字" を意味しますが、 "文字の欠如" ではないことに注意してください。それにマッチする文字が必要です::

```js run
alert( "CS4".match(/CS.4/) ); // null, ドットに対する文字がないのでマッチしません
=======
Or in the middle of a regexp:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

Please note that a dot means "any character", but not the "absence of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

### Dot as literally any character with "s" flag

<<<<<<< HEAD
デフォルトでは、ドットは改行文字 `\n` にはマッチしません。

例えば、正規表現 `pattern:A.B` は `match:A` 、次に改行文字 `\n` を除く任意の文字、`match:B` にマッチします:


```js run
alert( "A\nB".match(/A.B/) ); // null (マッチしません)
```

改行を含めて、ドットを文字通り "任意の文字" としたいケースは多くあります。

これが フラグ`pattern:s` がすることです。正規表現がにこのフラグがあると、ドット `pattern:.` は文字通り任意の文字にマッチします。:
=======
By default, a dot doesn't match the newline character `\n`.

For instance, the regexp `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)
```

There are many situations when we'd like a dot to mean literally "any character", newline included.

That's what flag `pattern:s` does. If a regexp has it, then a dot `pattern:.` matches literally any character:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

<<<<<<< HEAD
````warn header="Firefox, IE, Edge ではサポートされていません"
最新のサポート状況については <https://caniuse.com/#search=dotall> を確認してください。執筆時点では Firefox, IE, Edge は含まれていません。

幸いなことに、どこでも機能する代替手段があります。 "任意の文字" にマッチさせたい場合、`pattern:[\s\S]` という正規表現を使用します。
=======
````warn header="Not supported in IE"
The `pattern:s` flag is not supported in IE.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character" (this pattern will be covered in the article <info:regexp-character-sets-and-ranges>).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

<<<<<<< HEAD
パターン `pattern:[\s\S]` は文字通りです: "スペース文字 or スペースではない文字"。つまり、"なんでも" です。`pattern:[\d\D]` のような別のクラスのペアを使うこともできます。

このトリックはどこでも機能します。また、パターンに通常の "改行なし" のドットも必要な場合に、 `pattern:s` フラグを設定したくない場合にも使用できます。
````

````warn header="スペースに注意してください"
通常、スペースにはほどんど注意を払いません。私達にとって、文字列 `subject:1-5` と `subject:1 - 5` はほとんど同じです。

ですが、スペースを考慮していない正規表現の場合、うまく動作しないことがあります。

ハイフンで区切られた数字を見つけましょう:
=======
The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

<<<<<<< HEAD
正規表現 `pattern:\d - \d` にスペースを追加して修正しましょう。:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, これで動作します
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, これもOKです
```

**スペースは文字です。他の文字と同様に重要です。**

正規表現にスペースを追加したり削除して同じ動作を期待することはできません。

つまり、正規表現ではすべての文字が重要であり、スペースもそうです。
````


## サマリ

文字クラスを説明しました:

- `pattern:\d` -- 数字
- `pattern:\D` -- 非数字
- `pattern:\s` -- スペース記号、タブ、改行
- `pattern:\S` -- `pattern:\s` 以外
- `pattern:\w` -- 英語文字、数字、アンダースコア `'_'`
- `pattern:\W` -- `pattern:\w` 以外
- `pattern:.` -- 改行以外の任意の文字。`'s'` フラグがあれば任意文字です。  

ですが、これで全部ではありません。

JavaScript が文字列に使用する Unicode エンコーディングは、文字の多くのプロパティを提供します。

これらのプロパティで検索することもできます。それには、次の記事で説明するフラグ `pattern：u` が必要です。
=======
Let's fix it adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect it to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter), is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the next article.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
