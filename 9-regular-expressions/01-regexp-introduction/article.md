# パターンとフラグ

正規表現(Regular expressions)は文字列内を検索したり置換するための強力な方法です。

JavaScriptでは、正規表現は組み込みの `RegExp` クラスのオブジェクトを使用して実装され、文字列と統合されています。

正規表現はプログラミング言語によって異なることに留意してください。このチュートリアルでは、JavaScript に焦点を当てます。もちろん共通点は多いですが、Perl, Ruby, PHP などとは多少異なります。

<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
[cut]

## 正規表現
=======
## Regular expressions
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

正規表現(もしくは "regexp", または単に "reg") は *パターン* とオプションの *フラグ* で構成されています。

正規表現オブジェクトを生成するための2つの構文があります。

長い構文:

```js
regexp = new RegExp("pattern", "flags");
```

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

<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
しかし、それは今だけです。すぐにより強力な検索機能を備えた、より複雑な正規表現作成していきます。
=======
But that's only for now. Soon we'll create more complex regular expressions with much more searching power.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

```smart header="色"
ここからの配色は次の通りです:

- 正規表現 -- `pattern:red`
- 文字列 (検索する場所) -- `subject:blue`
- 結果 -- `match:green`
```


<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
````smart header="いつ `new RegExp` を使いますか?"
通常は短い構文である `/.../` を使います。しかし、これは変数の挿入を許可していないため、コードを書く時点で正確な正規表現を知っていなければなりません。

一方、`new RegExp` は文字列から動的にパターンを構築することができます。

したがって、検索するために必要なことを理解し、そこから `new RegExp` を作ることができます。:
=======
````smart header="When to use `new RegExp`?"
Normally we use the short syntax `/.../`. But it does not support variable insertions `${...}`.

On the other hand, `new RegExp` allows to construct a pattern dynamically from a string, so it's more flexible.

Here's an example of a dynamically generated regexp:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

```js run
let tag = prompt("Which tag you want to search?", "h2");
let regexp = new RegExp(`<${tag}>`);

<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
// ユーザが望むものを見つける
alert( "I love JavaScript".search(regexp));
=======
// finds <h2> by default
alert( "<h1> <h2> <h3>".search(regexp));
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md
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
<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
: 複数行モードです(チャプター <info:regexp-multiline> で説明します)。
=======
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`s`
: "Dotall" mode, allows `.` to match newlines (covered in the chapter <info:regexp-character-classes>).
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

`u`
: 完全なユニコードサポートを有効にします。このフラグはサロゲートペアの正しい処理を可能にします。より詳細についてはチャプター <info:regexp-unicode> を参照してください。

`y`
<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
: スティッキーモード([次のチャプター](info:regexp-methods#y-flag) で説明します)。

## "i" フラグ

最も簡単なフラグは `i` です。

その例です:
=======
: Sticky mode (covered in the chapter <info:regexp-sticky>)

We'll cover all these flags further in the tutorial.

For now, the simplest flag is `i`, here's an example:
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

```js run
let str = "I love JavaScript!";

<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
alert( str.search(/LOVE/) ); // -1 (見つからない)
alert( str.search(/LOVE/i) ); // 2
```

1. 最初の検索は `-1` (見つからない) を返します。なぜなら、デフォルトでは検索は大文字小文字を区別するためです。
2. フラグ `pattern:/LOVE/i` を指定すると、検索は位置 2　に `match:love` を見つけます。
=======
alert( str.search(/LOVE/i) ); // 2 (found lowercased)

alert( str.search(/LOVE/) ); // -1 (nothing found without 'i' flag)
```
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md

したがって、`i` フラグはすでに単純な部分文字列検索よりも強力な正規表現を作成します。しかし、まだまだはるかに多くのことがあります。次のチャプターでは、他のフラグと機能についても説明します。


## サマリ

<<<<<<< HEAD:5-regular-expressions/01-regexp-introduction/article.md
- 正規表現はパターンとオプションのフラグ `g`, `i`, `m`, `u`, `y` で構成されます。
- フラグと後で学ぶ特別な記号がなければ、正規表現による検索は部分文字列検索と同じです。
- メソッド `str.search(regexp)` は一致するものが見つかった場所はそのインデックスを返します。見つからなかった場合は `-1` を返します。
=======
- A regular expression consists of a pattern and optional flags: `g`, `i`, `m`, `u`, `s`, `y`.
- Without flags and special symbols that we'll study later, the search by a regexp is the same as a  substring search.
- The method `str.search(regexp)` returns the index where the match is found or `-1` if there's no match. In the next chapter we'll see other methods.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb:9-regular-expressions/01-regexp-introduction/article.md
