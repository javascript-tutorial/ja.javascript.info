# 文字列

JavaScriptでは、テキストデータは文字列として格納されます。1文字用の別の型はありません。

文字列の内部のフォーマットは常に [UTF-16](https://en.wikipedia.org/wiki/UTF-16) であり、ページのエンコーディングとは関係ありません。

<<<<<<< HEAD
[cut]

## 引用符 
=======
## Quotes
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

引用符の種類を思い出してみましょう。

文字列はシングルクォート、ダブルクォート、またはバッククォートのいずれかで囲むことができます:

```js
let single = 'single-quoted';
let double = "double-quoted";

let backticks = `backticks`;
```

シングルとダブルクォートは本質的に同じです。しかしながら、バッククォートは文字列の中に関数呼び出しを含む任意の式を埋め込むことができます。

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

バッククォートを使う別の利点は、文字列を複数の行に跨げるということです:

```js run
let guestList = `Guests:
 * John
 * Pete
 * Mary
`;

alert(guestList); // 複数行でのゲストのリスト
```

同じ方法でシングル、またはダブルクォートを使おうとすると、エラーになります:
```js run
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
  * John";
```

シングルクォートとダブルクォートは、複数行の文字列の必要性が考慮されていないときの言語仕様策定によるものです。 バッククォートは後で登場したもので、より汎用性があります。

また、バッククォートは最初のバッククォートの前に "テンプレート関数" を指定することができます。構文は次のようになります:
 <code>func&#96;string&#96;</code>。 関数 `func` は自動的に呼ばれ、文字列と埋め込まれた式を受け取り、それらを処理することができます。[docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals) で、これに関してより知ることができます。これは "タグ付きテンプレートリテラル" と呼ばれます。この機能により、文字列をカスタムテンプレートやその他の機能に簡単にラップできますが、ほとんど使用されません。

## 特殊文字 

`\n` と書かれた、いわゆる "改行文字" を使うことで、シングルクォートで複数行の文字列を作ることが可能です。

```js run
let guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList); // 複数行のゲストのリスト
```

例えば、これら2つの行は同じように表現されます:

```js run
alert( "Hello\nWorld" ); // "改行記号" を使った 2行表示

// 通常の改行とバッククォートを使った 2行表示
alert( `Hello
World` );
```

あまり一般的でない他の "特殊文字" もあります。これはその一覧です:

| 文字 | 説明 |
|-----------|-------------|
|`\b`|バックスペース|
|`\f`|改ページ|
|`\n`|改行|
|`\r`|キャリッジリターン|
|`\t`|タブ|
|`\uNNNN`|`\u00A9` のような16進コード `NNNN` を持つユニコード記号 -- これは、著作権記号 `©` のユニコードです。 正確に4桁の16進数でなければなりません。|
|`\u{NNNNNNNN}`|いくつかの珍しい文字は、2つのユニコード記号でエンコードされ、4バイトまで使用されます。 この長いユニコードでは、周囲に括弧が必要です。|

ユニコードの例です:

```js run
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, 中国の象形文字 (long unicode)
alert( "\u{1F60D}" ); // 😍, スマイル記号 (another long unicode)
```

すべての特殊文字はバックスラッシュ `\` で始まります。それは "エスケープ文字" とも呼ばれます。

また、文字列の中に引用符を挿入したいときにも使います。

例:

```js run
alert( 'I*!*\'*/!*m the Walrus!' ); // *!*I'm*/!* the Walrus!
```

上で見るように、内側の引用符の前にバックスラッシュ `\'` を追加しないといけません。そうしないと、文字列の終わりだと認識されるためです。

もちろん、これは囲っているものと同じ引用符を使う場合についてです。なので、よりよい解決策は、ダブルクォートかバッククォートを代わりに使うことです:

```js run
alert( `I'm the Walrus!` ); // I'm the Walrus!
```

バックスラッシュ `\` は JavaScript による文字列の正しい読み込みに役立ち、その後消えます。メモリ内部では文字列は `\` を持っていません。それは、上の例のように `alert` ではっきりと見ることができます。

しかし、文字列内のバックスラッシュ `\` を実際に表示する必要がある場合はどうでしょう？

それも可能です。その場合は `\\` のように2つ書く必要があります:

```js run
alert( `The backslash: \\` ); // The backslash: \
```

## 文字列長 

`length` プロパティは文字列の長さを持ちます:

```js run
alert( `My\n`.length ); // 3
```

`\n` は1つの "特殊" 文字であることに注意してください。なので、長さは実際に `3` です。

```warn header="`length` はプロパティです"
いくつかの他の言語について知っている人は、単なる `str.length` の代わりに `str.length()` と呼び間違えることがありますが、それは動作しません。

<<<<<<< HEAD
`str.length` は数値プロパティであり、関数ではないことに注意してください。その後に括弧をつける必要はありません。
=======
Please note that `str.length` is a numeric property, not a function. There is no need to add parenthesis after it.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
```

## 文字へのアクセス 

`pos` の位置の文字を取得する場合、角括弧 `[pos]` を使うか、もしくは [str.charAt(pos)](mdn:js/String/charAt) メソッドを呼び出します。最初の文字は 0 番目から始まります:

```js run
let str = `Hello`;

// 最初の文字
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// 最後の文字
alert( str[str.length - 1] ); // o
```

主に歴史的な理由で `charAt` が存在する一方、角括弧は文字を取得する現代の方法です。

それらの唯一の違いは、文字が見つからなかった場合、`[]` は `undefined` を返し、`charAt` は空文字を返す点です。

```js run
let str = `Hello`;

alert( str[1000] ); // undefined
alert( str.charAt(1000) ); // '' (空文字)
```

また、 `for..of` を使って文字列をイテレートすることもできます:

```js run
for (let char of "Hello") {
  alert(char); // H,e,l,l,o (文字は "H", 次に "e", その後は "l" ... となります)
}
```

## 文字列は不変です 

JavaScriptでは文字列は変更できません。文字を変えることは不可能です。

変更できないことを確認してみましょう:

```js run
let str = 'Hi';

str[0] = 'h'; // エラー
alert( str[0] ); // 動きません
```

通常の回避策は、全体の新しい文字列を作り、古いものの代わりにそれを `str` に代入する方法です。

例:

```js run
let str = 'Hi';

str = 'h' + str[1];  // 文字列を置換

alert( str ); // hi
```

次のセクションでは、これについてより多くの例を見ていきます。

## ケース(大文字小文字)を変更する 

メソッド [toLowerCase()](mdn:js/String/toLowerCase) と [toUpperCase()](mdn:js/String/toUpperCase) はケースを変更します:

```js run
alert( 'Interface'.toUpperCase() ); // INTERFACE
alert( 'Interface'.toLowerCase() ); // interface
```

1文字だけ小文字にしたい場合は次のようにできます:

```js
alert( 'Interface'[0].toLowerCase() ); // 'i'
```

## 部分文字列の検索 

文字列の中で、部分文字列を探す方法はいくつかあります。

### str.indexOf

最初のメソッドは [str.indexOf(substr, pos)](mdn:js/String/indexOf) です。

これは `str` の中で `substr` を探し、与えられた `pos` の位置から開始して、見つかった位置、または見つからなかった場合は `-1` を返します。

例:

```js run
let str = 'Widget with id';

alert( str.indexOf('Widget') ); // 0, 'Widget' が先頭で見つかったので
alert( str.indexOf('widget') ); // -1, 見つかりませんでした。検索は文字大小を区別します

alert( str.indexOf("id") ); // 1, "id" は位置 1 で見つかりました(..idget の id)
```

任意の2つ目のパラメータは、与えられた位置から検索を始める場合のものです。

例えば、`"id"` の最初の出現は `1` の位置です。次の出現を探すために、`2` の位置から検索を始めてみましょう。:

```js run
let str = 'Widget with id';

alert( str.indexOf('id', 2) ) // 12
```

すべての出現箇所が知りたい場合は、ループの中で `indexOf` を使います。前回マッチした後の位置から新しい呼び出しを行います:


```js run
let str = 'As sly as a fox, as strong as an ox';

let target = 'as'; // 探しましょう

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert( `Found at ${foundPos}` );
  pos = foundPos + 1; // 次の位置から検索を続けます
}
```

同じアルゴリズムをより短くすることができます:

```js run
let str = "As sly as a fox, as strong as an ox";
let target = "as";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

<<<<<<< HEAD
```smart header="`str.lastIndexOf(pos)`"
文字列の最後から最初に向かって探す類似のメソッド [str.lastIndexOf(pos)](mdn:js/String/lastIndexOf) もあります。
=======
```smart header="`str.lastIndexOf(substr, position)`"
There is also a similar method [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) that searches from the end of a string to its beginning.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

それは逆の順序でマッチする対象を列挙します。
```

`if` テストの中では `indexOf` は少し不便です。このように `if` の中に置くことはできません:

```js run
let str = "Widget with id";

if (str.indexOf("Widget")) {
    alert("We found it"); // 動作しません
}
```

上の例の `alert` は表示しません。なぜなら、`str.indexOf("Widget")` は `0` を返すためです (それは、最初の位置でマッチするものが見つかったことを意味します)。正しいですが、`if` は `0` を `false` と判断します。

なので、実際にはこのように　`-1` のチェックをするべきです:

```js run
let str = "Widget with id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("We found it"); // これで動きます!
}
```

````smart header="ビットの NOT トリック"
ここで使われている古いトリックの1つは `~` 演算子の [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) です。それは、数値を 32bit 整数に変換し(もし存在すれば小数部分を除いて)、その2進数表現のすべてのビットを反転します。

32ビット整数の場合、 `〜n` は（IEEE-754形式のため） `-(n+1)` と全く同じ意味です。

例:

```js run
alert( ~2 ); // -3, -(2+1) と同じです
alert( ~1 ); // -2, -(1+1) と同じです
alert( ~0 ); // -1, -(0+1) と同じです
*!*
alert( ~-1 ); // 0, -(-1+1) と同じです
*/!*
```

上の通り、`~n` は、 `n == -1` のときだけゼロになります。

なので、`if ( ~str.indexOf("...") )` のテストは `indexOf` の結果が `-1` でない場合は true です。つまり、マッチするものがあるとき、です。

`indexOf` チェックの短縮形として使われます:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Found it!' ); // 動作します
}
```

通常、言語機能を明白でない方法で使用することは推奨されませんが、このトリックは昔のコードでは広く使われています。なので、これは理解しておきましょう。

覚えておきましょう: `if (~str.indexOf(...))` は "もし見つかったら" と読みます。
````

### includes, startsWith, endsWith

より現代のメソッド [str.includes(substr, pos)](mdn:js/String/includes) は `str` が `substr` 含むかどうかで `true/false` を返します。

マッチしているかの確認は必要だが、その位置までは不要と言った場合にこのメソッドを使います。

```js run
alert( "Widget with id".includes("Widget") ); // true

alert( "Hello".includes("Bye") ); // false
```

`str.includes` の任意の2つ目の引数は、検索開始の位置です:

```js run
alert( "Midget".includes("id") ); // true
alert( "Midget".includes("id", 3) ); // false, 位置 3 から見ると、"id" はありません
```

メソッド [str.startsWith](mdn:js/String/startsWith) と [str.endsWith](mdn:js/String/endsWith)  は、それらの名前が指すことを正確に行います:

```js run
alert( "Widget".startsWith("Wid") ); // true, "Widget" は "Wid" で始まります
alert( "Widget".endsWith("get") );   // true, "Widget" は "get" で終わります
```

## 部分文字列を取得する 

JavaScriptでは、部分文字列を取得する3つの方法があります: `substring`, `substr` と `slice` です。

`str.slice(start [, end])`
: `start` から `end` まで(ただし、含まない)の文字列の一部を返します。

    例:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', 0 から 5 までの部分文字列 (5は含まない)
    alert( str.slice(0, 1) ); // 's', 0 から 1, ただ 1 は含まないので 0 位置の文字だけです
    ```

    2つ目の引数がない場合、`slice` は文字列の最後まで行きます:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, 2つ目の位置から最後まで
    ```

    `start/end` は負の値も指定可能です。これは、位置が文字列の末尾からカウントされることを意味します:

    ```js run
    let str = "strin*!*gif*/!*y";

    // 右から4番目から始まり、右から1つ目まで
    alert( str.slice(-4, -1) ); // gif
    ```


`str.substring(start [, end])`
: `start` と `end` の *間* の文字列の一部を返します。

    これはほぼ `slice` と同じですが、`start` が `end` より大きくても良いです。

    例:


    ```js run
    let str = "st*!*ring*/!*ify";

    // これらは同じ文字列です
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...が、slice は違います:
    alert( str.slice(2, 6) ); // "ring" (同じ)
    alert( str.slice(6, 2) ); // "" (空文字)

    ```

    slice とは違い負の値はサポートされていません。それらは `0` として扱われます。


`str.substr(start [, length])`
: `start` から与えられた `length` 分の、文字列の一部を返します。

    これまでのメソッドとは対象的に、終わり位置の代わりに `length` を指定することができます。:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, 2の位置から 4文字取得します
    ```

    最初の引数は、末尾からカウントするために負の値にもできます:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, 4の位置から 2文字取得します
    ```

混乱しないよう、これらのメソッドについておさらいしましょう:

| メソッド | 選択対象... | 負の値 |
|--------|-----------|-----------|
<<<<<<< HEAD
| `slice(start, end)` | `start` から `end` まで | 負の値を許可します |
| `substring(start, end)` | `start` と `end` の間 | 負の値は `0` 扱いです |
| `substr(start, length)` | `start` から `length` 文字を取得 | 負の `start` を許可します |
=======
| `slice(start, end)` | from `start` to `end` (not including `end`) | allows negatives |
| `substring(start, end)` | between `start` and `end` | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters | allows negative `start` |
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847


```smart header="どれを選ぶ?"
これらすべて使えます。正確には、`substr` は小さな欠点があります: それは コアなJavaScriptの仕様ではなく、主に歴史的な理由から存在するブラウザ専用の機能を扱う Annex B で説明されています。なので、非ブラウザ環境ではサポートされていない可能性があります。ただ、実際にはほぼどこでも動作しています。

<<<<<<< HEAD
著者はほとんどのケースで `slice` を使っています。
=======
The author finds themself using `slice` almost all the time.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
```

## 文字列比較 

チャプター <info:comparison> で学んだように、文字列はアルファベット順に文字ごとに比較されます。

しかし、いくつかの奇妙なところがあります。

1. 小文字は常に大文字よりも大きくなります:

    ```js run
    alert( 'a' > 'Z' ); // true
    ```

2. 発音区別記号付きの文字は "規則に反しています":

    ```js run
    alert( 'Österreich' > 'Zealand' ); // true
    ```

    それらの国をソートした場合、奇妙な結果になるかもしれません。通常、人々はリストで `Österreich` の後に `Zealand` が来ることを期待するためです。

何が起きているのか理解するために、JavaScriptでの文字列の内部表現を見てみましょう。

すべての文字列は [UTF-16](https://en.wikipedia.org/wiki/UTF-16) を使ってエンコードされています。各文字は対応する数値コードを持っています。コードの文字を取得したり戻すことのできる特殊なメソッドがあります。

`str.codePointAt(pos)`
: 位置 `pos` の文字コードを返します:

    ```js run
    // 大小異なる文字は文字コードも別です
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: 数値 `code` で文字を生成します:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    また、`\` とそれに続く16進数のコードを使って、ユニコード文字を追加することもできます:

    ```js run
    // 90 は 16進数で 5a です
    alert( '\u005a' ); // Z
    ```

ここで、コード `65..220` (ラテン・アルファベットとその他が多少)の文字を作る処理を見てみましょう。:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert( str );
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

わかりますか？大文字が最初で、その後少し特殊文字があり、その後に小文字です。

これで、なぜ `a > Z` なのかが明らかになりました。

文字は、その数値コードで比較されます。より大きいコードは、その文字はより大きいことを意味します。`a` (97) のコードは、`Z` (90) よりも大きいです。

- 全ての小文字は大文字の後に来ます。なぜなら、それらのコードはより大きいためです。
- `Ö` のような、基本のアルファベットとは別扱いの文字がいくつかあります。ここでは、そのコードは `a` から `z` のどの文字よりも大きいです。

### 正しい比較

文字列比較をするための "正しい" アルゴリズムは見た目より複雑です。なぜなら、アルファベットは言語によって異なるためです。異なるアルファベットでは、同じようにみえる文字でも異なって位置することがあります。

なので、ブラウザは比較する言語を知る必要があります。

幸運なことに、全ての現代のブラウザ (IE10 は追加のライブラリ [Intl.JS](https://github.com/andyearnshaw/Intl.js/) を必要とします)は国際標準 [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf) をサポートします。

それは次のルールに従った、異なる言語で文字列を比較するための特殊なメソッドを提供します。

[str.localeCompare(str2)](mdn:js/String/localeCompare) 呼び出し:

- 言語規則に従って、`str` が `str2` より大きい場合、`1` を返します。
- `str` が `str2` より小さい場合は `-1` を返します。
- それらが等価な場合は `0` を返します。

例:

```js run
alert( 'Österreich'.localeCompare('Zealand') ); // -1
```

このメソッドは [the documentation](mdn:js/String/localeCompare) で指定されている2つの追加の引数を持ちます。これにより言語を指定することができ(デフォルトは環境から判断されます)、大文字と小文字や、`"a"` と `"á"` が同じように扱われるなどの追加のルールを設定することができます。

## 内部, Unicode 

<<<<<<< HEAD
```warn header="高度な知識"
このセクションでは、文字列の内部構造について詳しく説明します。 この知識は、絵文字、珍しい数学的な象形文字やその他の珍しい記号を扱う予定の場合に便利です。
=======
```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

それらをサポートする予定がない場合には、このセクションはスキップしてもOKです。
```

### サロゲートペア

ほとんどの記号は2バイトのコードを持っています。 ほとんどのヨーロッパ言語、数字、さらには象形文字の多くの文字は、2バイト表現です。

しかし、2バイトの組み合わせは 65536 通りしか許されず、すべての記号を表現するには十分ではありません。なので、非常に珍しい記号は "サロゲートペア" と呼ばれる2バイト文字のペアでエンコードされています。

このような記号の長さは `2` です:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph
```

JavaScriptが作られたとき、サロゲートペアは存在しなかったため、言語として正しく処理されていないことに注意してください!

私たちは、上の例の各文字列で1つの記号を指定していますが、`length` の結果は `2` です。

`String.fromCodePoint` と `str.codePointAt` はサロゲートペアを正しく扱う稀なメソッドです。それらは最近言語に登場しました。それまでは、 [String.fromCharCode](mdn:js/String/fromCharCode) と [str.charCodeAt](mdn:js/String/charCodeAt) だけでした。それらのメソッドは実際には `fromCodePoint/codePointAt` と同じですが、サロゲートペアでは上手く動きません。

しかし、サロゲートペアは2つの文字として扱われるため、記号を取得するのが難しい場合があります:

```js run
alert( '𝒳'[0] ); // 見知らぬ記号...
alert( '𝒳'[1] ); // ...サロゲートペアの片割れ
```

サロゲートペアの各文字は、お互いがいないと意味を持たないことに注意してください。そのため、上の例の alert は実際にはゴミが表示されます。

技術的には、サロゲートペアもそれらのコードで検出されます: もし文字が `0xd800..0xdbff` の中のコードである場合、それはサロゲートペアの最初のパートです。次の文字(2つ目のパート)は `0xdc00..0xdfff` の中のコードである必要があります。それらの範囲は、標準仕様でサロゲートペア専用として予約されています。

上のケース:

```js run
// charCodeAt はサロゲートペアを認識しません、そのため一部分のコードを返します

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, 0xd800 と 0xdbff の間
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 0xdc00 と 0xdfff の間
```

あなたは、後のチャプター <info:iterable> でサロゲートペアを扱うより多くの方法を見つけるでしょう。恐らくそれをするための特殊なライブラリもありますが、ここで触れるほど有名なものはありません。

### 分音記号と正規化

多くの言語では、上/下にマークを持つ基本文字で構成される記号があります。

例えば、文字 `a` は `àáâäãåā` のベースの文字です。最も一般的な "複合" 文字は、UTF-16テーブルに独自のコードを持っています。 しかし、可能な組み合わせが多すぎるため、これがすべてではありません。

任意の複合文字をサポートするため、UTF-16 ではいくつかのユニコード文字を使うことができます。ベース文字とそれを "装飾" する1つまたは複数の "マーク" 文字です。

たとえば、 `S` の後に特別な "上にドット" 文字（コード `\u0307`）が続く場合、それは Ṡ として表示されます。

```js run
alert( 'S\u0307' ); // Ṡ
```

もし文字の上(または下)に追加のマークが必要な場合、単に必要なマーク文字を追加するだけです。

たとえば、"下へのドット" 文字 (コード `\u0323`) を追加すると、"上と下のドットについた S": `Ṩ` になります。

例:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

これは素晴らしい柔軟性を提供しますが、興味深い問題もあります: 2つの文字が視覚的には同じように見えるかもしれませんが、異なるユニコード構成で表現される可能性があるということです。

例:

```js run
alert( 'S\u0307\u0323' ); // Ṩ, S + 上のドット + 下のドット
alert( 'S\u0323\u0307' ); // Ṩ, S + 下のドット + 上のドット

alert( 'S\u0307\u0323' == 'S\u0323\u0307' ); // false
```

これを解決するために、それぞれの文字を1つの "標準の" 形にする "ユニコード正規化" アルゴリズムがあります。

[str.normalize()](mdn:js/String/normalize) で実装されています。

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

我々の例の場合、`normalize()` は実際に3つの文字の並びを1つの文字 `\u1e68` (S と2つのドット)にまとめています。

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

実際には、これは必ずしもそうではありません。理由は、記号 `Ṩ` は "十分に一般的" なので、UTF-16 の作成者がそれをメインテーブルに含め、コードを与えたからです。

正規化ルールやバリアントについてもっと学びたい場合、それらはユニコード標準 [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/) の付録に記載されています。が、ほとんど実践的な目的においては、このセクションの内容で十分です。


## サマリ 

- 引用符には3つのタイプがあります。バッククォートは複数行にまたがり、式を埋め込むことができます。
- JavaScriptでの文字列は UTF-16 を使ってエンコードされています。
- 私たちは、`\n` のような特殊文字を使うことができ、`\u...` を使ったユニコードで文字を挿入することができます。
- 文字を取得するために、`[]` を使います。
- 部分文字列を取得するために、`slice` または `substring` を使います。
- 文字列を小文字/大文字にするために、`toLowerCase/toUpperCase` を使います。
- シンプルなチェックで、部分文字列を探すためには `indexOf` または `includes/startsWith/endsWith` を使います。
- 言語に従って文字列を比較するためには、`localeCompare` を使います。そうでない場合は、文字コードで比較されます。

文字列には、その他いくつかの役立つメソッドがあります:

- `str.trim()` -- 文字列の最初と最後のスペースを除去します。
- `str.repeat(n)` -- 文字列を `n` 回繰り返します。
- などなど。詳細は [manual](mdn:js/String) を見てください。

文字列もまた、正規表現で検索/置換をするメソッドを持っています。しかし、そのトピックは別のチャプターでするのがふさわしいので、後ほど戻ってきましょう。
