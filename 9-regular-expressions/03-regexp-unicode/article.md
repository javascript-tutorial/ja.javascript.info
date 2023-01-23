<<<<<<< HEAD

# Unicode(ユニコード): フラグ "u" とクラス \p{...}

JavaScript は文字列に対し [Unicode エンコーディング](https://en.wikipedia.org/wiki/Unicode) を使用します。ほとんどの文字は2バイトでエンコーディングされています。これは最大で 65536 文字表現できます。

この範囲は可能なすべての文字をエンコードするのには十分な大きさではありません。そのため、`𝒳` (数学的な X)や `😄` (スマイル)のような一部のまれ文字は4バイトでエンコードされています

これは比較のためのUnicode値です:

| Character  | Unicode | Bytes  |
=======
# Unicode: flag "u" and class \p{...}

JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.

That range is not big enough to encode all possible characters, that's why some rare characters are encoded with 4 bytes, for instance like `𝒳` (mathematical X) or `😄` (a smile), some hieroglyphs and so on.

Here are the Unicode values of some characters:

| Character  | Unicode | Bytes count in Unicode  |
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

<<<<<<< HEAD
したがって、`a` や `≈` と言った文字が2バイトを占め、珍しいものは4バイトになります。

JavaScript が登場したころは、Unicodeエンコーディングはシンプルでした: 4バイト文字がありませんでした。そのため、依然として一部の言語機能はUnicodeを正しく処理しません。

=======
So characters like `a` and `≈` occupy 2 bytes, while codes for `𝒳`, `𝒴` and `😄` are longer, they have 4 bytes.

Long time ago, when JavaScript language was created, Unicode encoding was simpler: there were no 4-byte characters. So, some language features still handle them incorrectly.

For instance, `length` thinks that here are two characters:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

<<<<<<< HEAD
...ですが、1文字にしか見えませんよね? ポイントは `length` は4バイトを2つの2バイト文字として扱うということです。それらは2つをあわせてでしか意味をなさない(いわゆる "サロゲートペア")ため、正しくありません。これに関しては <info:string> で記述しています。

デフォルトでは、通常の正規表現も4バイトの "長い文字" を2バイトの文字のペアとして扱います。そして、文字列で起こったように、おかしな結果になる場合があります。これについては後ほど、 <info:regexp-character-sets-and-ranges> の記事で説明します。

文字列とは異なり、通常の正規表現はこのような問題を解決するフラグ `pattern:u` を持っています。このフラグがあれば、正規表現は4バイト文字を正しく扱うことができます。そしてUnicodeプロパティ検索も可能になります。次で説明していきます。


## Unicodeプロパティ \p{...}

```warn header="Firefox と Edge ではサポートされていません"
2018年から標準の一部ではありますが、Unicodeプロパティは Firefox([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1361876))とEdge ([bug](https://github.com/Microsoft/ChakraCore/issues/2969))ではサポートされていません。

クロスブラウザでUnicodeプロパティをサポートする "拡張" 正規表現を提供する [XRegExp](http://xregexp.com) というライブラリがあります。
```

Unicodeのすべての文字には多くのプロパティがあります。それらは文字が "どのカテゴリ" に属しているかを説明し、それに関する様々な情報を含みます。

例えば、文字が `Letter` プロパティを持っている場合、その文字は(任意の言語の)アルファベットに属することを意味します。また、`Number` プロパティは数値であることを意味します: アラビア語や中国語など。

`pattern:\p{…}` で、プロパティで文字を検索することができます。`pattern:\p{…}` を使うには、正規表現に `pattern:u` フラグが必要です。

例えば、`\p{Letter}` は任意の言語の文字を示します。`\p{L}` を使用することもでき、`L` は `Letter` のエイリアスです。ほぼすべてのプロパティに短縮されたエイリアスがあります。

以下の例では、3種類の文字が見つかります: 英語、グルジア語、韓国語。
=======
...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair", you can read about them in the article <info:string>).

By default, regular expressions also treat 4-byte "long characters" as a pair of 2-byte ones. And, as it happens with strings, that may lead to odd results. We'll see that a bit later, in the article <info:regexp-character-sets-and-ranges>.

Unlike strings, regular expressions have flag `pattern:u` that fixes such problems. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available, we'll get to it next.

## Unicode properties \p{...}

Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.

For instance, if a character has `Letter` property, it means that the character belongs to an alphabet (of any language). And `Number` property means that it's a digit: maybe Arabic or Chinese, and so on.

We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgian and Korean.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
<<<<<<< HEAD
alert( str.match(/\p{L}/g) ); // null ("u" フラグがないのでマッチしません)
```

これは主な文字カテゴリとそれらのサブカテゴリです:
=======
alert( str.match(/\p{L}/g) ); // null (no matches, \p doesn't work without the flag "u")
```

Here's the main character categories and their subcategories:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
<<<<<<< HEAD
  -- private use `Co`,
  - surrogate `Cs`.


なので、例えば小文字の文字が必要な場合は `pattern:\p{Ll}`、句読点(punctuation)が必要であれば `pattern:\p{P}` といったようにできます。

次のような派生カテゴリもあります:
- `Alphabetic` (`Alpha`)は文字 `L` に加え、文字番号 `Nl` (例: Ⅻ - ローマ数字の12)、一部の記号 `Other_Alphabetic` (`OAlpha`)を含みます。
- `Hex_Digit` は16進数です: `0-9`, `a-f`。
- などなど

Unicodeは多くの異なるプロパティをサポートしており、それらの完全なリストはここでは書ききれないため、ここではその参照を示します:

- 文字毎の全プロパティのリスト: <https://unicode.org/cldr/utility/character.jsp>.
- プロパティ毎の全文字のリスト: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- プロパティの短縮エイリアス: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- すべてのプロパティを含むテキスト形式でのUnicode文字の完全なベースはここです: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### 例: 16進数

例えば、`xFF` のようにして書かれた16進数を探しましょう。ここで `F` は16進数値です(0..1 or A..F)。

16進数は `pattern:\p{Hex_Digit}` で表すことができます。:
=======
  - private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..9 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("number: xAF".match(regexp)); // xAF
```

<<<<<<< HEAD
### 例: 中国の象形文字

象形文字を探しましょう。

`Cyrillic`, `Greek`, `Arabic`, `Han`(中国語)などの値をもつ、Unicodeプロパティ `Script` (書記体系)があります。[完全なリストはこちらです]("https://en.wikipedia.org/wiki/Script_(Unicode)").

指定された書記体系で文字を探すには、`pattern:Script=<value>` を使用します。例えば、キリル文字の場合は、`pattern:\p{sc=Cyrillic}`, 中国の象形文字の場合は: `pattern:\p{sc=Han}`, となります:

```js run
let regexp = /\p{sc=Han}/gu; // 象形文字をかえす
=======
### Example: Chinese hieroglyphs

Let's look for Chinese hieroglyphs.

There's a Unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list](https://en.wikipedia.org/wiki/Script_(Unicode)).

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:

```js run
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

<<<<<<< HEAD
### 例: カレンシー(通貨)

`$`, `€`, `¥` のような通貨を表す文字にはUnicodeプロパティ `pattern:\p{Currency_Symbol}` があり、短縮エイリアスは: `pattern:\p{Sc}` です。

"通貨に続いて数値" があるフォーマットに対して、価格を探していましょう。:
=======
### Example: currency

Characters that denote a currency, such as `$`, `€`, `¥`, have Unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let regexp = /\p{Sc}\d/gu;

<<<<<<< HEAD
let  str = `Prices: $2, €1, ¥9`;
=======
let str = `Prices: $2, €1, ¥9`;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( str.match(regexp) ); // $2,€1,¥9
```

<<<<<<< HEAD
後ほど、記事 <info:regexp-quantifiers> で多くの数字を含む数値の探し方を見ていきます。

## サマリ

フラグ `pattern:u` は正規表現でのUnicodeサポートを有効にします。

これは2つのことを意味します:

1. 4バイト文字が2つの2バイトの文字ではなく、1つの文字として正しく処理されます。
2. 検索 `\p{…}` で Unicode プロパティが利用できます。

Unicode プロパティを利用すると、指定された言語の単語や特殊文字(引用符、通貨)などを探すことができます。
=======
Later, in the article <info:regexp-quantifiers> we'll see how to look for numbers that contain many digits.

## Summary

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
