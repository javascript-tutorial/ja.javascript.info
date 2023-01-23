<<<<<<< HEAD
# 先読みと後読み(Lookahead/lookbehind)

別のパターンが続く、あるいは先行するパターンにマッチするものだけを探したいことがあります。

そのための特別な構文があり、それは "先読み", "後読み" と呼ばれ、まとめて "lookaround" と呼ばれます。

まず、`subject:1 turkey costs 30€` といった文字列から価格を探してみましょう。つまり: 数値の後に `subject:€` 記号が続きます。

## 先読み(Lookahead)

構文は: `pattern:X(?=Y)`で、"`pattern:X` を探すけど、`pattern:Y` が続く場合にだけマッチする" を意味します。`pattern:X` や `pattern:Y` は任意のパターンになります。

整数値の後に `subject:€` が続く場合、正規表現は `pattern:\d+(?=€)` となります:
=======
# Lookahead and lookbehind

Sometimes we need to find only those matches for a pattern that are followed or preceded by another pattern.

There's a special syntax for that, called "lookahead" and "lookbehind", together referred to as "lookaround".

For the start, let's find the price from the string like `subject:1 turkey costs 30€`. That is: a number, followed by `subject:€` sign.

## Lookahead

The syntax is: `pattern:X(?=Y)`, it means "look for `pattern:X`, but match only if followed by `pattern:Y`". There may be any pattern instead of `pattern:X` and `pattern:Y`.

For an integer number followed by `subject:€`, the regexp will be `pattern:\d+(?=€)`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "1 turkey costs 30€";

<<<<<<< HEAD
alert( str.match(/\d+(?=€)/) ); // 30, 数値 1 は € が続いてないので無視されます
```

注意: 先読みは単なるテストであり、括弧の中身 `pattern:(?=...)` は結果 `match:30` には含まれません。

`pattern:X(?=Y)` を探すとき、正規表現エンジンは `pattern:X` を見つけ、次にその直後に `pattern:Y` があるかをチェックします。もしなければ、マッチはスキップされ検索が続きます。

もっと複雑なテストも可能です。例えば、`pattern:X(?=Y)(?=Z)` は次の意味になります:

1. `pattern:X` を見つけます。
2. `pattern:Y` が `pattern:X` の直後であるかチェックします(そうでなければスキップします)。
3. `pattern:Z` が `pattern:X` の直後であるかチェックします(そうでなければスキップします)。
4. 両方のテストが通れば、マッチになります。

言い換えると、このようなパターンは `pattern:X` の後に `pattern:Y`, `pattern:Z` が同時に続くことを意味します。

これは、パターン `pattern:Y` と `pattern:Z` が相互に排他的でない場合にのみ可能です。

例えば、`pattern:\d+(?=\s)(?=.*30)` は直後にスペースがあり、その以降のどこかで `30` がある `pattern:\d+` を探します。:
=======
alert( str.match(/\d+(?=€)/) ); // 30, the number 1 is ignored, as it's not followed by €
```

Please note: the lookahead is merely a test, the contents of the parentheses `pattern:(?=...)` is not included in the result `match:30`.

When we look for `pattern:X(?=Y)`, the regular expression engine finds `pattern:X` and then checks if there's `pattern:Y` immediately after it. If it's not so, then the potential match is skipped, and the search continues.

More complex tests are possible, e.g. `pattern:X(?=Y)(?=Z)` means:

1. Find `pattern:X`.
2. Check if `pattern:Y` is immediately after `pattern:X` (skip if isn't).
3. Check if `pattern:Z` is also immediately after `pattern:X` (skip if isn't).
4. If both tests passed, then the `pattern:X` is a match, otherwise continue searching.

In other words, such pattern means that we're looking for `pattern:X` followed by `pattern:Y` and `pattern:Z` at the same time.

That's only possible if patterns `pattern:Y` and `pattern:Z` aren't mutually exclusive.

For example, `pattern:\d+(?=\s)(?=.*30)` looks for `pattern:\d+` that is followed by a space `pattern:(?=\s)`, and there's `30` somewhere after it `pattern:(?=.*30)`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

<<<<<<< HEAD
上の文字列では、数値 `1` に正確にマッチします。

## 否定先読み(Negative lookahead)

同じ文字列から、価格ではなく数量がほしいとしましょう。それは数値 `pattern:\d+` で、`subject:€` が続かないものとします。

このために、否定先読みが適用できます。

構文は `pattern:X(?!Y)` で、意味は "`pattern:X` を探すが、`pattern:Y` が続かない場合のみ" です。
```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+(?!€)/) ); // 2 (価格部分はスキップされました)
```

## 後読み(Lookbehind)

先読みでは "先(何が続くか)" を条件に付け加えることができます。

後読みも似ていますが、これは後ろを見ます。つまり、パターンの前に何かがある場合にのみマッチさせるといったことを可能にします。

構文は次の通りです:
- 肯定後読み(Positive lookbehind): `pattern:(?<=Y)X` は `pattern:X` の前に `pattern:Y` がある場合にのみマッチすることを意味します。
- 否定後読み(Negative lookbehind): `pattern:(?<!Y)X` は `pattern:X` の前に `pattern:Y` がない場合にのみマッチすることを意味します。

例えば、価格をUSドルに変えてみましょう。ドル記号は通常数値の前なので、`$30` を探すには `pattern:(?<=\$)\d+` - `subject:$` で始まる数量 - を使います。:
=======
In our string that exactly matches the number `1`.

## Negative lookahead

Let's say that we want a quantity instead, not a price from the same string. That's a number `pattern:\d+`, NOT followed by `subject:€`.

For that, a negative lookahead can be applied.

The syntax is: `pattern:X(?!Y)`, it means "search `pattern:X`, but only if not followed by `pattern:Y`".

```js run
let str = "2 turkeys cost 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (the price is not matched)
```

## Lookbehind

```warn header="Lookbehind browser compatibility"
Please Note: Lookbehind is not supported in non-V8 browsers, such as Safari, Internet Explorer.
```

Lookahead allows to add a condition for "what follows".

Lookbehind is similar, but it looks behind. That is, it allows to match a pattern only if there's something before it.

The syntax is:
- Positive lookbehind: `pattern:(?<=Y)X`, matches `pattern:X`, but only if there's  `pattern:Y` before it.
- Negative lookbehind: `pattern:(?<!Y)X`, matches `pattern:X`, but only if there's no `pattern:Y` before it.

For example, let's change the price to US dollars. The dollar sign is usually before the number, so to look for `$30` we'll use `pattern:(?<=\$)\d+` -- an amount preceded by `subject:$`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "1 turkey costs $30";

<<<<<<< HEAD
// ドル記号は \$ にエスケープされます
alert( str.match(/(?<=\$)\d+/) ); // 30 (数値単体はスキップされます)
```

また、数量 - `subject:$` から始まらない数値 - が必要な場合、否定後読み `pattern:(?<!\$)\d+` が利用できます。:
=======
// the dollar sign is escaped \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (skipped the sole number)
```

And, if we need the quantity -- a number, not preceded by `subject:$`, then we can use a negative lookbehind `pattern:(?<!\$)\d+`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "2 turkeys cost $60";

<<<<<<< HEAD
alert( str.match(/(?<!\$)\d+/) ); // 2 (価格はスキップされます)
```

## キャプチャグループ

一般的に、lookaround の括弧内の内容は結果の一部にはなりません。

E.g. パターン `pattern:\d+(?=€)` では、`pattern:€` 記号はマッチの一部としてキャプチャはされません。これは自然なことです: 私たちは `pattern:\d+` を探している一方で、`pattern:(?=€)` は単に `subject:€` が続くかどうかのテストです。

しかし、状況によっては同様に lookaround 式、またはその一部をキャプチャしたいかもしれません。これは可能です。単に追加で括弧で囲めばよいです。

以下の例では、金額と一緒に通貨記号 `pattern:(€|kr)` がキャプチャされます。:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // €|kr の周りに追加の括弧
=======
alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (the price is not matched)
```

## Capturing groups

Generally, the contents inside lookaround parentheses does not become a part of the result.

E.g. in the pattern `pattern:\d+(?=€)`, the `pattern:€` sign doesn't get captured as a part of the match. That's natural: we look for a number `pattern:\d+`, while `pattern:(?=€)` is just a test that it should be followed by `subject:€`.

But in some situations we might want to capture the lookaround expression as well, or a part of it. That's possible. Just wrap that part into additional parentheses.

In the example below the currency sign `pattern:(€|kr)` is captured, along with the amount:

```js run
let str = "1 turkey costs 30€";
let regexp = /\d+(?=(€|kr))/; // extra parentheses around €|kr
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert( str.match(regexp) ); // 30, €
```

<<<<<<< HEAD
後読みの場合も同じです:
=======
And here's the same for lookbehind:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

<<<<<<< HEAD
## サマリ

先読み(Lookahead)と後読み(lookbehind)(あわせて "lookaround" と呼ばれます)は、その前後のコンテキストに応じて何かをマッチさせたい場合に役立ちます。

単純な正規表現の場合は手動で同様のことができます。つまり: 任意のコンテキストですべてにマッチさせた後、ループでフィルタします。

`str.match` (フラグ `pattern:g` なし)と `str.matchAll` (常に)は `index` プロパティをもつ配列として一致を返すため、テキストの中での正確な位置が分かりコンテキストを確認できることを覚えておいてください。

ですが、一般的には lookaround のほうが便利です。

Lookaround のタイプ:

| パターン            | タイプ             | マッチ |
|--------------------|------------------|---------|
| `X(?=Y)`   | 肯定先読み(Positive lookahead) | `pattern:X`(`pattern:Y` が後に続く場合) |
| `X(?!Y)`   | 否定先読み(Negative lookahead) | `pattern:X`(`pattern:Y` が後に続かない場合) |
| `(?<=Y)X` |  肯定後読み(Positive lookbehind) | `pattern:X`(`pattern:Y` の後の場合)|
| `(?<!Y)X` | 否定後読み(Negative lookbehind) | `pattern:X`(`pattern:Y` の後でない場合)|
=======
## Summary

Lookahead and lookbehind (commonly referred to as "lookaround") are useful when we'd like to match something depending on the context before/after it.

For simple regexps we can do the similar thing manually. That is: match everything, in any context, and then filter by context in the loop.

Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.

But generally lookaround is more convenient.

Lookaround types:

| Pattern            | type             | matches |
|--------------------|------------------|---------|
| `X(?=Y)`   | Positive lookahead | `pattern:X` if followed by `pattern:Y` |
| `X(?!Y)`   | Negative lookahead | `pattern:X` if not followed by `pattern:Y` |
| `(?<=Y)X` |  Positive lookbehind | `pattern:X` if after `pattern:Y` |
| `(?<!Y)X` | Negative lookbehind | `pattern:X` if not after `pattern:Y` |
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
