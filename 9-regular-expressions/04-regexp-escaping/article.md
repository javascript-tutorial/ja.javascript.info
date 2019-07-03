
<<<<<<< HEAD
# エスケープ, 特殊文字

これまで見てきたように、バックスラッシュ `"\"` は文字クラスを表すのに使われます。なので、それは特別な文字です。

同様に他にも特殊文字があり、正規表現の中で特別な意味を持ちます。それらはよりパワフルな検索をするために使われます。

これがその完全なリストです: `pattern:[ \ ^ $ . | ? * + ( )`.

覚えようとはしないでください -- それぞれを個別に見ていく際に、自然と覚えていくでしょう。

## エスケープ

特殊文字を通常の文字として使用するには、バックスラッシュを付加します。

それは "文字をエスケープする" とも言われます。

例えば、ドット `pattern:'.'` を探す必要があるとします。正規表現でドットは "改行以外の任意の文字" を意味します。そのため、本当に "ドット" を意味する場合、前にバックスラッシュ `pattern:\.` を置きましょう。

```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1
```

括弧も特殊文字なので、それらを探したい場合は `pattern:\(` を使う必要があります。下の例は文字列 `"g()"` を探します:
=======
# Escaping, special characters

As we've seen, a backslash `"\"` is used to denote character classes. So it's a special character in regexps (just like in a regular string).

There are other special characters as well, that have special meaning in a regexp. They are used to do more powerful searches. Here's a full list of them: `pattern:[ \ ^ $ . | ? * + ( )`.

Don't try to remember the list -- soon we'll deal with each of them separately and you'll know them by heart automatically.

## Escaping

Let's say we want to find a dot literally. Not "any character", but just a dot.

To use a special character as a regular one, prepend it with a backslash: `pattern:\.`.

That's also called "escaping a character".

For example:
```js run
alert( "Chapter 5.1".match(/\d\.\d/) ); // 5.1 (match!)
alert( "Chapter 511".match(/\d\.\d/) ); // null (looking for a real dot \.)
```

Parentheses are also special characters, so if we want them, we should use `pattern:\(`. The example below looks for a string `"g()"`:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
alert( "function g()".match(/g\(\)/) ); // "g()"
```

<<<<<<< HEAD
バックスラッシュを探している場合は2つにします:
=======
If we're looking for a backslash `\`, it's a special character in both regular strings and regexps, so we should double it.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

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
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
alert( "/".match(/\//) ); // '/'
```

<<<<<<< HEAD
一方、別の `new RegExp` 構文ではエスケープする必要はありません:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```

## new RegExp

`new RegExp` で正規表現を作成している場合は、他にもエスケープが必要なものがいくつかあります。

例えばこれを見てください:
=======
On the other hand, if we're not using `/.../`, but create a regexp using `new RegExp`, then we don't need to escape it:

```js run
alert( "/".match(new RegExp("/")) ); // '/'
```                                                                                                                                                                                   

## new RegExp

If we are creating a regular expression with `new RegExp`, then we don't have to escape `/`, but need to do some other escaping.

For instance, consider this:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
let reg = new RegExp("\d\.\d");

alert( "Chapter 5.1".match(reg) ); // null
```

<<<<<<< HEAD
これは機能しません。なぜでしょう？

理由は、文字列のエスケープルールによるものです。これを見てください:
=======
The search worked with `pattern:/\d\.\d/`, but with `new RegExp("\d\.\d")` it doesn't work, why?

The reason is that backslashes are "consumed" by a string. Remember, regular strings have their own special characters like `\n`, and a backslash is used for escaping.

Please, take a look, what "\d\.\d" really is:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
alert("\d\.\d"); // d.d
```

<<<<<<< HEAD
バックスラッシュは、文字列の中でエスケープしたり、`\n` のような文字列固有の特殊文字のために使われます。引用符はそれらを "消費" して解釈します。例えば:

- `\n` -- は改行文字になります
- `\u1234` -- はそのようなコードをもつユニコード文字になります
- ...そして特殊な意味を持たないもの、`\d` や `\z` のようなものの場合には、バックスラッシュは単に除去されます。

したがって、`new RegExp` の呼び出しは、バックスラッシュのない文字列を取得します。

これを直すには、引用符で `\\` を `\` にするためにバックスラッシュを二重にする必要があります。:
=======
The quotes "consume" backslashes and interpret them, for instance:

- `\n` -- becomes a newline character,
- `\u1234` -- becomes the Unicode character with such code,
- ...And when there's no special meaning: like `\d` or `\z`, then the backslash is simply removed.

So the call to `new RegExp` gets a string without backslashes. That's why the search doesn't work!

To fix it, we need to double backslashes, because quotes turn `\\` into `\`:
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
<<<<<<< HEAD
alert(regStr); // \d\.\d (正しい)
=======
alert(regStr); // \d\.\d (correct now)
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af

let reg = new RegExp(regStr);

alert( "Chapter 5.1".match(reg) ); // 5.1
```
<<<<<<< HEAD
=======

## Summary

- To search special characters `pattern:[ \ ^ $ . | ? * + ( )` literally, we need to prepend them with `\` ("escape them").
- We also need to escape `/` if we're inside `pattern:/.../` (but not inside `new RegExp`).
- When passing a string `new RegExp`, we need to double backslashes `\\`, cause strings consume one of them.
>>>>>>> b300836f00536a5eb9a716ad2cbb6b8fe97c25af
