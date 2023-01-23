<<<<<<< HEAD
# 量指定子 +, *, ? と {n}

`+7(903)-123-45-67` という文字列があり、すべての文字を見つけたいとします。しかし、以前とは違い、数字だけでなく完全な数字が欲しいです: `7, 903, 123, 45, 67`。

数字は1つ以上の `pattern:\d` の連続です。どれだけ必要かを示す手段は *量指定子* と呼ばれます。

## 量指定子 {n}

最も明白な量指定子は、波括弧の数字です: `pattern:{n}`。量指定子は文字(または文字クラスなど)の後に置かれ、正確にどれだか必要かを指定します。

また、高度なフォームも持っています。ここでその例を挙げます:

正確なカウント: `pattern:{5}`
: `pattern:\d{5}` は正確に5桁であることを示し、 `pattern:\d\d\d\d\d` と同じです。

    下の例では 5桁の数値を探します:
=======
# Quantifiers +, *, ? and {n}

Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `pattern:\d`. To mark how many we need, we can append a *quantifier*.

## Quantity {n}

The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `pattern:{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.

    The example below looks for a 5-digit number:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

<<<<<<< HEAD
    `\b` を追加してより長い数字を除外することもできます: `pattern:\b\d{5}\b`.

from-to のでカウント: `pattern:{3,5}`
: 3桁 から 5桁の数値を探すには、波括弧の中に制限を入れることができます: `pattern:\d{3,5}`
=======
    We can add `\b` to exclude longer numbers: `pattern:\b\d{5}\b`.

The range: `pattern:{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

<<<<<<< HEAD
    上限を省略することができます。正規表現 `pattern:\d{3,}` は`3` 桁以上の数字を探します:
=======
    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

<<<<<<< HEAD
文字列　`+7(903)-123-45-67` のケースでは、私たちは数値が必要です: 連続した1桁以上の数字です。つまり `pattern:\d{1,}` です:
=======
Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

<<<<<<< HEAD
## 簡略表記

もっとも頻繁に必要とされる量指定子には簡略表記があります:

`pattern:+`
: "1つ以上" を意味し、`pattern:{1,}` と同じです。

    例えば、`pattern:\d+` は数字を探します:
=======
## Shorthands

There are shorthands for most used quantifiers:

`pattern:+`
: Means "one or more", the same as `pattern:{1,}`.

    For instance, `pattern:\d+` looks for numbers:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`pattern:?`
<<<<<<< HEAD
: "0 か 1" を意味し、`pattern:{0,1}` と同じです。つまりシンボルをオプションにします。

    例えば、パターン `pattern:ou?r` は `match:o` に続く 0 または 1つの `match:u`、そして続けて `match:r` です。

    なので、単語 `subject:color` では `match:or` を見つけ、`subject:colour` では `match:our` を見つけます。:
=======
: Means "zero or one", the same as `pattern:{0,1}`. In other words, it makes the symbol optional.

    For instance, the pattern `pattern:ou?r` looks for `match:o` followed by zero or one `match:u`, and then `match:r`.

    So, `pattern:colou?r` finds both `match:color` and `match:colour`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`pattern:*`
<<<<<<< HEAD
: "0 以上" を意味し、`pattern:{0,}` と同じです。つまり、文字は任意の数繰り返されるか、存在しない可能性があります。

    下の例は、ゼロが任意の数続く数字を探します:
=======
: Means "zero or more", the same as `pattern:{0,}`. That is, the character may repeat any times or be absent.

    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes (may be many or none):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

<<<<<<< HEAD
    `'+'` (1つ以上) と比較すると:

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    ```

## より多くの例

量指定子はとてもよく使われます。これらは複雑な正規表現を実現するためのメインの "ビルディングブロック" のなので、より多くの例を見ていきましょう。

**"少数" (浮動小数点を持つ数値)の正規表現: `pattern:\d+\.\d+`**
: 実演:
    ```js run
    alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
    ```

**"属性なしの HTML の開始タグ" の正規表現 (`<span>` や `<p>` など)**

1. 最もシンプルな方法: `pattern:/<[a-z]+>/i`
=======
    Compare it with `pattern:+` (one or more):

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## More examples

Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.

**Regexp for decimal fractions (a number with a floating point): `pattern:\d+\.\d+`**

In action:
```js run
alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
```

**Regexp for an "opening HTML-tag without attributes", such as `<span>` or `<p>`.**

1. The simplest one: `pattern:/<[a-z]+>/i`
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

<<<<<<< HEAD
    文字 `pattern:'<'` に続けて1つ以上の英語文字、その後 `pattern:'>'`。

2. 改良版: `pattern:/<[a-z][a-z0-9]*>/i`

    標準では、HTMLタグ名は1文字目以外の任意の場所で数字が使えます。例: `<h1>`
=======
    The regexp looks for character `pattern:'<'` followed by one or more Latin letters, and then  `pattern:'>'`.

2. Improved: `pattern:/<[a-z][a-z0-9]*>/i`

    According to the standard, HTML tag name may have a digit at any position except the first one, like `<h1>`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

<<<<<<< HEAD
**"属性なしの開始または終了 HTMLタグ" の正規表現: `pattern:/<\/?[a-z][a-z0-9]*>/i`**

パターンの先頭付近にオプションのスラッシュ `pattern:/?` を追加しました。バックスラッシュでエスケープが必要です。そうしない場合、JavaScript はパターンの終わりだと認識します。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
    ```

```smart header="より精密、はより複雑、を意味します"
これらの例から1つの共通するルールが見えてきます: 正規表現がより詳細/精密になるほど、パターンはより長く複雑になります。

例えば、HTMLタグはより簡単な正規表現が使えます: `pattern:<\w+>`.

なぜなら、`pattern:\w` は任意の英語文字または数字または `'_'` を意味するためです。また正規表現は例えば `match:<_>` のような非タグにもマッチします。しかし `pattern:<[a-z][a-z0-9]*>` よりもずっと簡単です。

私たちは `pattern:<\w+>` で良いですか？それとも `pattern:<[a-z][a-z0-9]*>` が必要ですか？

実際にはどちらもパターンも許容されます。"余分な" マッチや他の手段でフィルタするのが難しいかどうかという点に対してどれだけ寛容であるかによります。
=======
**Regexp "opening or closing HTML-tag without attributes": `pattern:/<\/?[a-z][a-z0-9]*>/i`**

We added an optional slash `pattern:/?` near the beginning of the pattern. Had to escape it with a backslash, otherwise JavaScript would think it is the pattern end.

```js run
alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
```

```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`. But as HTML has stricter restrictions for a tag name, `pattern:<[a-z][a-z0-9]*>` is more reliable.

Can we use `pattern:<\w+>` or we need `pattern:<[a-z][a-z0-9]*>`?

In real life both variants are acceptable. Depends on how tolerant we can be to "extra" matches and whether it's difficult or not to remove them from the result by other means.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
