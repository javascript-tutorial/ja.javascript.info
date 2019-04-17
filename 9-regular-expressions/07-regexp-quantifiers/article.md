# 量指定子 +, *, ? と {n}

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
`+7(903)-123-45-67` という文字列があり、すべての文字を見つけたいとします。しかし、以前とは違い、数字だけでなく完全な数字が欲しいです: `7, 903, 123, 45, 67`。

数字は1つ以上の `\d` の連続です。どれだけ必要かを示す手段は *量指定子* と呼ばれます。
=======
Let's say we have a string like `+7(903)-123-45-67` and want to find all numbers in it. But unlike before, we are interested not in single digits, but full numbers: `7, 903, 123, 45, 67`.

A number is a sequence of 1 or more digits `\d`. To mark how many we need, we need to append a *quantifier*.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

## 量指定子 {n}

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
最も明白な量指定子は、波括弧の数字です: `pattern:{n}`。量指定子は文字(または文字クラスなど)の後に置かれ、正確にどれだか必要かを指定します。

また、高度なフォームも持っています。ここでその例を挙げます:

正確なカウント: `{5}`
: `pattern:\d{5}` は正確に5桁であることを示し、 `pattern:\d\d\d\d\d` と同じです。
=======
The simplest quantifier is a number in curly braces: `pattern:{n}`.

A quantifier is appended to a character (or a character class, or a `[...]` set etc) and specifies how many we need.

It has a few advanced forms, let's see examples:

The exact count: `{5}`
: `pattern:\d{5}` denotes exactly 5 digits, the same as `pattern:\d\d\d\d\d`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    下の例では 5桁の数値を探します:

    ```js run
    alert( "I'm 12345 years old".match(/\d{5}/) ); //  "12345"
    ```

    `\b` を追加してより長い数字を除外することもできます: `pattern:\b\d{5}\b`.

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
from-to のでカウント: `{3,5}`
: 3桁 から 5桁の数値を探すには、波括弧の中に制限を入れることができます: `pattern:\d{3,5}`
=======
The range: `{3,5}`, match 3-5 times
: To find numbers from 3 to 5 digits we can put the limits into curly braces: `pattern:\d{3,5}`
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "I'm not 12, but 1234 years old".match(/\d{3,5}/) ); // "1234"
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    上限を省略することができます。正規表現 `pattern:\d{3,}` は`3` 桁以上の数字を探します:
=======
    We can omit the upper limit.

    Then a regexp `pattern:\d{3,}` looks for sequences of digits of length `3` or more:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "I'm not 12, but 345678 years old".match(/\d{3,}/) ); // "345678"
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
文字列　`+7(903)-123-45-67` のケースでは、私たちは数値が必要です: 連続した1桁以上の数字です。つまり `pattern:\d{1,}` です:
=======
Let's return to the string `+7(903)-123-45-67`.

A number is a sequence of one or more digits in a row. So the regexp is `pattern:\d{1,}`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

```js run
let str = "+7(903)-123-45-67";

let numbers = str.match(/\d{1,}/g);

alert(numbers); // 7,903,123,45,67
```

## 簡略表記

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
もっとも頻繁に必要とされる量指定子には簡略表記があります:
=======
There are shorthands for most used quantifiers:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

`+`
: "1つ以上" を意味し、`{1,}` と同じです。

    例えば、`pattern:\d+` は数字を探します:

    ```js run
    let str = "+7(903)-123-45-67";

    alert( str.match(/\d+/g) ); // 7,903,123,45,67
    ```

`?`
: "0 か 1" を意味し、`{0,1}` と同じです。つまりシンボルをオプションにします。

    例えば、パターン `pattern:ou?r` は `match:o` に続く 0 または 1つの `match:u`、そして続けて `match:r` です。

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    なので、単語 `subject:color` では `match:or` を見つけ、`subject:colour` では `match:our` を見つけます。:
=======
    So, `pattern:colou?r` finds both `match:color` and `match:colour`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    let str = "Should I write color or colour?";

    alert( str.match(/colou?r/g) ); // color, colour
    ```

`*`
: "0 以上" を意味し、`{0,}` と同じです。つまり、文字は任意の数繰り返されるか、存在しない可能性があります。

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
    下の例は、ゼロが任意の数続く数字を探します:
=======
    For example, `pattern:\d0*` looks for a digit followed by any number of zeroes:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

    ```js run
    alert( "100 10 1".match(/\d0*/g) ); // 100, 10, 1
    ```

    `'+'` (1つ以上) と比較すると:

    ```js run
    alert( "100 10 1".match(/\d0+/g) ); // 100, 10
    // 1 not matched, as 0+ requires at least one zero
    ```

## より多くの例

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
量指定子はとてもよく使われます。これらは複雑な正規表現でのメインの "ビルディングブロック" の1つなので、より多くの例を見てみましょう。
=======
Quantifiers are used very often. They serve as the main "building block" of complex regular expressions, so let's see more examples.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

正規表現 "少数" (浮動小数点を持つ数値): `pattern:\d+\.\d+`
: 実演:
    ```js run
    alert( "0 1 12.345 7890".match(/\d+\.\d+/g) ); // 12.345
    ```

正規表現 `<span>` や `<p>` のような "属性なしの HTML の開始タグ": `pattern:/<[a-z]+>/i`
: 実演:

    ```js run
    alert( "<body> ... </body>".match(/<[a-z]+>/gi) ); // <body>
    ```

    文字 `pattern:'<'` に続けて1つ以上の英語文字、その後 `pattern:'>'` です

正規表現 "属性なしの HTML の開始タグ" (改良版): `pattern:/<[a-z][a-z0-9]*>/i`
: より良い正規表現: 標準によれば、HTML タグ名は `<h1>` のように先頭以外の任意の場所に数字を許可します。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi) ); // <h1>
    ```

正規表現 "属性なしの HTML の開始、終了タグ": `pattern:/<\/?[a-z][a-z0-9]*>/i`
: タグの前に任意のスラッシュ `pattern:/?` を追加しています。バックスラッシュでエスケープが必要です。そうしない場合、JavaScript はパターンの終わりだと認識するでしょう。

    ```js run
    alert( "<h1>Hi!</h1>".match(/<\/?[a-z][a-z0-9]*>/gi) ); // <h1>, </h1>
    ```

<<<<<<< HEAD:5-regular-expressions/07-regexp-quantifiers/article.md
```smart header="より精密、はより複雑、を意味します"
これらの例から1つの共通するルールが見えてきます: 正規表現がより詳細/精密になるほど、パターンはより長く複雑になります。

例えば、HTMLタグはより簡単な正規表現が使えます: `pattern:<\w+>`.

なぜなら、`pattern:\w` は任意の英語文字または数字または `'_'` を意味するためです。また正規表現は例えば `match:<_>` のような非タグにもマッチします。しかし `pattern:<[a-z][a-z0-9]*>` よりもずっと簡単です。
=======
```smart header="To make a regexp more precise, we often need make it more complex"
We can see one common rule in these examples: the more precise is the regular expression -- the longer and more complex it is.

For instance, for HTML tags we could use a simpler regexp: `pattern:<\w+>`.

...But because `pattern:\w` means any English letter or a digit or `'_'`, the regexp also matches non-tags, for instance `match:<_>`. So it's much simpler than `pattern:<[a-z][a-z0-9]*>`, but less reliable.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/07-regexp-quantifiers/article.md

私たちは `pattern:<\w+>` で良いですか？それとも `pattern:<[a-z][a-z0-9]*>` が必要ですか？

実際にはどちらもパターンも許容されます。"余分な" マッチや他の手段でフィルタするのが難しいかどうかという点に対してどれだけ寛容であるかによります。
```
