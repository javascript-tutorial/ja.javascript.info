<<<<<<< HEAD
# パターンとフラグ

正規表現(Regular expressions)は文字列内を検索したり置換するための強力な方法です。

JavaScriptでは、正規表現は組み込みの `RegExp` クラスのオブジェクトを使用して実装され、文字列と統合されています。

正規表現はプログラミング言語によって異なることに留意してください。このチュートリアルでは、JavaScript に焦点を当てます。もちろん共通点は多いですが、Perl, Ruby, PHP などとは多少異なります。

[cut]

## 正規表現

正規表現(もしくは "regexp", または単に "reg") は *パターン* とオプションの *フラグ* で構成されています。

正規表現オブジェクトを生成するための2つの構文があります。

長い構文:
=======
# Patterns and flags

Regular expressions is a powerful way to search and replace in text.

In JavaScript, they are available as [RegExp](mdn:js/RegExp) object, and also integrated in methods of strings.

## Regular Expressions

A regular expression (also "regexp", or just "reg") consists of a *pattern* and optional *flags*.

There are two syntaxes to create a regular expression object.

The "long" syntax:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js
regexp = new RegExp("pattern", "flags");
```

<<<<<<< HEAD
...そして短い構文です。スラッシュ `"/"` を使います:

```js
regexp = /pattern/; // フラグなし
regexp = /pattern/gmi; // g, m と i のフラグあり(詳細は後ほど説明します)
```

スラッシュ `"/"` は正規表現を作成していることを JavaScript に伝えます。文字列の引用符と同じ役割を果たします。

## 使用方法

文字列内を検索するためには、メソッド [search](mdn:js/String/search) を使うことができます。

例:

```js run
let str = "I love JavaScript!"; // ここを検索します

let regexp = /love/;
alert( str.search(regexp) ); // 2
```

`str.search` メソッドはパターン `pattern:/love/` を探し、文字列内での位置を返します。ご推測の通り、 `pattern:/love/` は最もシンプルなパターンです。それは簡単な部分文字列検索です。

上のコードは次と同じです:

```js run
let str = "I love JavaScript!"; // ここを検索します

let substr = 'love';
alert( str.search(substr) ); // 2
```

したがって、`pattern:/love/` の検索は `"love"` の検索と同じです。

しかし、それは今だけです。すぐにより強力な検索機能を備えた、より複雑な正規表現作成していきます。

```smart header="色"
ここからの配色は次の通りです:

- 正規表現 -- `pattern:red`
- 文字列 (検索する場所) -- `subject:blue`
- 結果 -- `match:green`
```


````smart header="いつ `new RegExp` を使いますか?"
通常は短い構文である `/.../` を使います。しかし、これは変数の挿入を許可していないため、コードを書く時点で正確な正規表現を知っていなければなりません。

一方、`new RegExp` は文字列から動的にパターンを構築することができます。

したがって、検索するために必要なことを理解し、そこから `new RegExp` を作ることができます。:

```js run
let search = prompt("What you want to search?", "love");
let regexp = new RegExp(search);

// ユーザが望むものを見つける
alert( "I love JavaScript".search(regexp));
```
````


## フラグ

正規表現には検索に影響を与えるフラグを含んでいる場合があります。

JavaScript には 5 つしかありません:

`i`
: このフラグを指定すると、検索は大文字小文字を区別しません: `A` と `a` に違いはありません(下の例をみてください)。

`g`
: このフラグを指定すると、検索はすべての一致を探します。指定がない場合は -- 最初の1つのみを探します(次のチャプターで使い方を見ていきます)。

`m`
: 複数行モードです(チャプター <info:regexp-multiline> で説明します)。

`u`
: 完全なユニコードサポートを有効にします。このフラグはサロゲートペアの正しい処理を可能にします。より詳細についてはチャプター <info:regexp-unicode> を参照してください。

`y`
: スティッキーモード([次のチャプター](info:regexp-methods#y-flag) で説明します)。

## "i" フラグ

最も簡単なフラグは `i` です。

その例です:

```js run
let str = "I love JavaScript!";

alert( str.search(/LOVE/) ); // -1 (見つからない)
alert( str.search(/LOVE/i) ); // 2
```

1. 最初の検索は `-1` (見つからない) を返します。なぜなら、デフォルトでは検索は大文字小文字を区別するためです。
2. フラグ `pattern:/LOVE/i` を指定すると、検索は位置 2　に `match:love` を見つけます。

したがって、`i` フラグはすでに単純な部分文字列検索よりも強力な正規表現を作成します。しかし、まだまだはるかに多くのことがあります。次のチャプターでは、他のフラグと機能についても説明します。


## サマリ

- 正規表現はパターンとオプションのフラグ `g`, `i`, `m`, `u`, `y` で構成されます。
- フラグと後で学ぶ特別な記号がなければ、正規表現による検索は部分文字列検索と同じです。
- メソッド `str.search(regexp)` は一致するものが見つかった場所はそのインデックスを返します。見つからなかった場合は `-1` を返します。
=======
...And the short one, using slashes `"/"`:

```js
regexp = /pattern/; // no flags
regexp = /pattern/gmi; // with flags g,m and i (to be covered soon)
```

Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an object of the built-in `RegExp` class.

The main difference between these two syntaxes is that slashes `pattern:/.../` do not allow to insert expressions (like strings with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp` is used when we need to create a regexp "on the fly", from a dynamically generated string, for instance:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first one.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)

```smart header="Colors"
From here on the color scheme is:

- regexp -- `pattern:red`
- string (where we search) -- `subject:blue`
- result -- `match:green`
```

## Searching: str.match

As it was said previously, regular expressions are integrated with string methods.

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

    That's a very important nuance. If there are no matches, we get not an empty array, but `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to be always an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches with `regexp` in string `str` with `replacement` (all matches, if there's flag `pattern:g`, otherwise only the first one).

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

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;

alert( regexp.test(str) ); // true
```

Further in this chapter we'll study more regular expressions, come across many other examples and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.

## Summary

- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols that we'll study later, the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `str.replace(regexp, replacement)` replaces matches with `regexp` by `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise `false`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
