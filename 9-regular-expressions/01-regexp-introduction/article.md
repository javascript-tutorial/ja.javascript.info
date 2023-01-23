<<<<<<< HEAD
# パターンとフラグ

正規表現(Regular expressions)は文字列内を検索したり置換するための強力な方法です。

JavaScriptでは、正規表現は組み込みの `RegExp` クラスのオブジェクトを使用して実装され、文字列と統合されています。

## 正規表現

正規表現(もしくは "regexp", または単に "reg") は *パターン* とオプションの *フラグ* で構成されています。

正規表現オブジェクトを生成するための2つの構文があります。

長い構文:
=======
# Patterns and flags

Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.

## Regular Expressions

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes that can be used to create a regular expression object.

The "long" syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
regexp = new RegExp("pattern", "flags");
```

<<<<<<< HEAD
...そして短い構文です。スラッシュ `"/"` を使います:

```js
regexp = /pattern/; // フラグなし
regexp = /pattern/gmi; // g, m と i のフラグあり(詳細は後ほど説明します)
```

スラッシュ `pattern:/.../` は正規表現を作成していることを JavaScript に伝えます。文字列の引用符と同じ役割を果たします。

どちらの場合も、`regexp` は組み込みの `RegExp` クラスのインスタンスになります。

これらの構文の主な違いは、スラッシュ `/.../` を使用するパターンは式が挿入できないことです(テンプレートリテラル `${...}` のような)。これは完全に静的です。

スラッシュは、コードを書くときに正規表現を知っているときに使われます。そして、これが最も一般的なケースです。 `new RegExp` は動的に生成された文字列から "その場" で正規表現を作成する必要がある場合にしばしば使われます。例えば:
=======
And the "short" one, using slashes `"/"`:

```js
regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
```

Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let tag = prompt("What tag do you want to find?", "h2");

<<<<<<< HEAD
let regexp = new RegExp(`<${tag}>`); // 上のプロンプトで "h2" と入力された場合は、/<h2>/ になります
```

## フラグ

正規表現には検索に影響を与えるフラグを含む場合があります。

JavaScript には 6 つしかありません:

`pattern:i`
: このフラグを指定すると、検索は大文字小文字を区別しません: `A` と `a` に違いはありません(下の例をみてください)。

`pattern:g`
: このフラグを指定すると、検索はすべての一致を探します。指定がない場合は -- 最初の1つのみを探します(次のチャプターで使い方を見ていきます)。

`pattern:m`
: 複数行モードです(チャプター <info:regexp-multiline> で説明します)。

`pattern:s`
: "dotall" モードを有効にします。これにより、ドット `pattern:.` が改行文字 `\n` に一致できるようになります(チャプター <info:regexp-character-classes> で説明しています)。

`pattern:u`
: 完全なユニコードサポートを有効にします。このフラグはサロゲートペアの正しい処理を可能にします。より詳細についてはチャプター <info:regexp-unicode> を参照してください。

`pattern:y`
: スティッキーモード: テキストの正確な位置で検索します(チャプター <info:regexp-sticky> で説明します)。

```smart header="色"
ここからの配色は次の通りです:

- 正規表現 -- `pattern:red`
- 文字列 (検索する場所) -- `subject:blue`
- 結果 -- `match:green`
```

## 検索: str.match

前述のように、正規表現は文字列のメソッドと統合されています。

メソッド `str.match(regexp)` は文字列 `str` 中のすべての `regexp` の一致を見つけます。

3つの動作モードがあります:

1. 正規表現にフラグ `pattern:g` がある場合、すべての一致の配列を返します:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (マッチする2つの部分文字列の配列)
    ```
    `match:We` と `match:we` の両方が見つかることに注目してください。フラグ `pattern:i` は正規表現が大文字小文字を区別しないようにします。

2. そのようなフラグがない場合は、配列の形式で最初に一致したものだけを返します。インデック `0` でマッチした内容があり、あといくつか詳細情報のためのプロパティを持っています:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // g フラグなし

    alert( result[0] );     // We (最初の一致)
    alert( result.length ); // 1

    // 詳細:
    alert( result.index );  // 0 (一致した位置)
    alert( result.input );  // We will, we will rock you (元の文字列)
    ```
    正規表現の一部が括弧で囲まれている場合は、配列は `0` 以外のインデックスを持っている場合があります。これについてはチャプター  <info:regexp-groups> で説明します。

3. そして、最後に、一致するものがなかった場合は `null` が返却されます(フラグ `pattern:g` の有無は関係ありません)。

    ここに重要な違いがあります。一致するものがない場合、殻の配列を受け取るのではなく `null` を受け取ります。これを忘れるとエラーにつながる可能性があるので注意してください。例えば:
=======
let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full Unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)

```smart header="Colors"
From here on the color scheme is:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```

## Searching: str.match

As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

<<<<<<< HEAD
    結果を常に配列にしたい場合は次のようにします。:
=======
    If we'd like the result to always be an array, we can write it this way:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
<<<<<<< HEAD
      alert("No matches"); // 問題なく動きます
    }
    ```

## 置換: str.replace

メソッド `str.replace(regexp, replacement)` は文字列 `str` で `regexp` を使用して見つけた一致を `replacement` に置き換えます(フラグ`pattern:g` があればすべての一致を、そうでなければ最初の1つだけが対象になります)。

例:

```js run
// g フラグなし
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// g フラグあり
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

2番目の引数は `replacement` 文字列です。特別な文字の組み合わせを使用して、一致した内容の部分を挿入することもできます。:

| 記号 | 置換文字列での動作 |
|--------|--------|
|`$&`|一致したもの全体を挿入します|
|<code>$&#096;</code>|一致の前の部分文字列を挿入します|
|`$'`|一致した後の部分文字列を挿入します|
|`$n`|`n` が1-2桁の数値の場合、n番目の括弧の内容を挿入します。詳細についてはチャプター <info:regexp-groups> で説明します|
|`$<name>`|指定された `name` の括弧の中身を挿入します。詳細についてはチャプター <info:regexp-groups> で説明します|
|`$$`|文字 `$` を挿入します|

`pattern:$&` の例です:
=======
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

<<<<<<< HEAD
## テスト: regexp.test

メソッド `regexp.test(str)` は、少なくとも1つの一致を検索し、見つかれば `true` を、なければ `false` を返します。
=======
## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

<<<<<<< HEAD
このパートの後半では、より多くの正規表現を学び、より多くの例を見ていき、他のメソッドにも触れます。

メソッドに関する完全な情報は <info:regexp-methods> にあります。

## サマリ

- 正規表現はパターンとオプションのフラグで構成されます: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- フラグと特殊記号(後で学びます)がない場合、正規表現による検索は部分文字列検索と同じです。
- メソッド `str.match(regexp)` は一致を探します:`pattern:g` フラグがあればすべてを、なければ最初の1つだけが対象です。
- メソッド `str.replace(regexp, replacement)` は `regexp` を使用して見つけた一致を `replacement` に置換します: `pattern:g` フラグがあればすべてを、なければ最初の1つだけが対象です。
- メソッド `regexp.test(str)` が少なくとも1つ一致があれば `true` を、なければ `false` を返します。
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.

## Summary

- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
