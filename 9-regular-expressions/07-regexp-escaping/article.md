
<<<<<<< HEAD
# エスケープ, 特殊文字

これまで見てきたように、バックスラッシュ `pattern:\` は文字クラスを表すのに使われます。例: `pattern:\d`。なので、正規表現の中では特別な文字です。

同様に他にも特殊文字があり、正規表現の中で特別な意味を持ちます。それらはよりパワフルな検索をするために使われます。

これがその完全なリストです: `pattern:[ \ ^ $ . | ? * + ( )`.

覚えようとする必要はありません -- それぞれを個別に見ていく際に、自然と覚えていくでしょう。

## エスケープ

特殊文字を通常の文字として使用するには、バックスラッシュを付加します。

それは "文字をエスケープする" とも言われます。

例えば、ドット `pattern:'.'` を探したいとします。正規表現でドットは "改行以外の任意の文字" を意味します。そのため、本当に "ドット" を意味する場合、前にバックスラッシュ `pattern:\.` を置きましょう。

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (マッチ!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (ドット) \. を探します)

```

括弧も特殊文字なので、それらを探したい場合は `pattern:\(` を使う必要があります。下の例は文字列 `"g()"` を探します:
=======
# Escaping, special characters

As we've seen, a backslash `pattern:\` is used to denote character classes, e.g. `pattern:\d`. So it's a special character in regexps (just like in regular strings).

There are other special characters as well, that have special meaning in a regexp, such as `pattern:[ ] { } ( ) \ ^ $ . | ? * +`. They are used to do more powerful searches.

Don't try to remember the list -- soon we'll deal with each of them, and you'll know them by heart automatically.

## Escaping

Let's say we want to find literally a dot. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

<<<<<<< HEAD
バックスラッシュを探している場合は2つにします:
=======
If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

<<<<<<< HEAD
## スラッシュ

スラッシュ記号 `'/'` は特殊文字ではありませんが、JavaScript では正規表現の開始と終了で使われる(`pattern:/...pattern.../`)ので、これもエスケープが必要です。

スラッシュ `'/'` の検索は次のようになります:
=======
## A slash

A slash symbol `'/'` is not a special character, but in JavaScript it is used to open and close the regexp: `pattern:/...pattern.../`, so we should escape it too.

Here's what a search for a slash `'/'` looks like:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert( "/".match(/\//) ); // '/'
```

<<<<<<< HEAD
一方、`pattern:/.../` ではなく `new RegExp` 構文を利用する場合、エスケープする必要はありません:

```js run
alert( "/".match(new RegExp("/")) ); // '/' が見つかります
=======
On the other hand, if we're not using `pattern:/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // finds /
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## new RegExp

<<<<<<< HEAD
`new RegExp` で正規表現を作成している場合、`/` はエスケープする必要はありませんが、エスケープが必要なものもいくつかあります。

例えばこれを見てください:

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

1つ前の類似の例は `pattern:/\d\.\d/` が機能しましたが、`new RegExp("\d\.\d")` は機能しません。なぜでしょう？

理由は、バックスラッシュが文字列によって "消費される" ためです。覚えているかもしれませんが、通常の文字列文字列には `\n` などの独自の特殊文字があり、バックスラッシュはそのエスケープのために使用されます。

どのように "\d\.\d" が受け取られるか:
=======
If we are creating a regular expression with `new RegExp`, then we don't have to escape `/`, but need to do some other escaping.

For instance, consider this:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(regexp) ); // null
```

The similar search in one of previous examples worked with `pattern:/\d\.\d/`, but `new RegExp("\d\.\d")` doesn't work, why?

The reason is that backslashes are "consumed" by a string. As we may recall, regular strings have their own special characters, such as `\n`, and a backslash is used for escaping.

Here's how "\d\.\d" is perceived:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert("\d\.\d"); // d.d
```

<<<<<<< HEAD
引用符はバックスラッシュを "消費" して解釈します。例えば:

- `\n` -- は改行文字になります
- `\u1234` -- はそのようなコードをもつユニコード文字になります
- ...そして特殊な意味を持たないもの、`pattern:\d` や `pattern:\z` のようなものの場合には、バックスラッシュは単に除去されます。

したがって、`new RegExp` の呼び出しは、バックスラッシュのない文字列を取得します。

これを直すには、引用符で `\\` を `\` にするためにバックスラッシュを二重にする必要があります。:
=======
String quotes "consume" backslashes and interpret them on their own, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `pattern:\d` or `\z`, then the backslash is simply removed.

So `new RegExp` gets a string without backslashes. That's why the search doesn't work!

To fix it, we need to double backslashes, because string quotes turn `\\` into `\`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
<<<<<<< HEAD
alert(regStr); // \d\.\d (正しい)

let reg = new RegExp(regStr);

alert( "Chapter 5.1".match(reg) ); // 5.1
```
## サマリ

- 特別な文字 `pattern:[ \ ^ $ . | ? * + ( )` を文字通り検索するためには、バックスラッシュ `\` を先頭に追加する必要があります(エスケープします)。
- `pattern:/.../` を利用する場合、`\` もエスケープが必要です(`new RegExp`では不要です)。
- 文字列を `new RegExp` を渡すとき、文字列の引用符もバックスラッシュを消費するので、2つのバックスラッシュ `\\` が必要です。
=======
alert(regStr); // \d\.\d (correct now)

let regexp = new RegExp(regStr);

alert( "Chapter 5.1".match(regexp) ); // 5.1
```

## Summary

- To search for special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with a backslash `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string to `new RegExp`, we need to double backslashes `\\`, cause string quotes consume one of them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
