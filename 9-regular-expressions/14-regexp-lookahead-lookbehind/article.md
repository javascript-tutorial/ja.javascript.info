# 先読みと後読み(Lookahead/lookbehind)

別のパターンが続く、あるいは先行するパターンにマッチするものだけを探したいことがあります。

そのための特別な構文があり、それは "先読み", "後読み" と呼ばれ、まとめて "lookaround" と呼ばれます。

まず、`subject:1 turkey costs 30€` といった文字列から価格を探してみましょう。つまり: 数値の後に `subject:€` 記号が続きます。

## 先読み(Lookahead)

構文は: `pattern:X(?=Y)`で、"`pattern:X` を探すけど、`pattern:Y` が続く場合にだけマッチする" を意味します。`pattern:X` や `pattern:Y` は任意のパターンになります。

整数値の後に `subject:€` が続く場合、正規表現は `pattern:\d+(?=€)` となります:

```js run
let str = "1 turkey costs 30€";

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

```js run
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

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

```js run
let str = "1 turkey costs $30";

// ドル記号は \$ にエスケープされます
alert( str.match(/(?<=\$)\d+/) ); // 30 (数値単体はスキップされます)
```

また、数量 - `subject:$` から始まらない数値 - が必要な場合、否定後読み `pattern:(?<!\$)\d+` が利用できます。:

```js run
let str = "2 turkeys cost $60";

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

alert( str.match(regexp) ); // 30, €
```

後読みの場合も同じです:

```js run
let str = "1 turkey costs $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

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
