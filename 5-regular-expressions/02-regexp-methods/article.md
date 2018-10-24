# RegExp と文字列のメソッド

正規表現を扱う2つの方法があります。

1. まず正規表現は組み込みの [RegExp](mdn:js/RegExp) クラスのオブジェクトであり、多くのメソッドを提供します。
2. それに加えて、文字列の中に正規表現で動作するメソッドがあります。

構造は少しゴチャゴチャしているので、最初にメソッドを個別に考察し、その後で共通のタスクに対して実際のレシピを考えて行きます。

[cut]

## str.search(reg)

我々はすでにこのメソッドを見ました。これは最初にマッチした位置を、見つからない場合は `-1` を返します。:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( *!*/a/i*/!* ) ); // 0 (先頭の位置)
```

**重要な制限: `search` は常に最初のマッチを探します。**

`search` を使用して次の位置を見つけることはできません(そのための構文はありません)。しかしそれができる別のメソッドがあります。

## str.match(reg), "g" フラグなし

メソッド `str.match` は `g` フラグに応じて振る舞いが異なります。
まずは `g` がない場合を見てみましょう。

`str.match(reg)` は最初のマッチのみを探します

結果は、マッチしたものと追加プロパティを持つ配列です:

- `index` -- 文字列内でのマッチした位置
- `input` -- 対象文字列

例:

```js run
let str = "Fame is the thirst of youth";

let result = str.match( *!*/fame/i*/!* );

alert( result[0] );    // Fame (マッチしたもの)
alert( result.index ); // 0 (ゼロ位置)
alert( result.input ); // "Fame is the thirst of youth" (対象文字列)
```

配列は1つ以上の要素を持っている場合があります。

**パターンの一部が丸括弧 `(...)` で区切られている場合、それは配列の別の要素になります**

例:

```js run
let str = "JavaScript is a programming language";

let result = str.match( *!*/JAVA(SCRIPT)/i*/!* );

alert( result[0] ); // JavaScript (マッチ全体)
alert( result[1] ); // script (括弧に対応するマッチした部分)
alert( result.index ); // 0
alert( result.input ); // JavaScript is a programming language
```

`i` フラグにより、検索は大文字小文字区別なしです。そのため、`match:JavaScript` を見つけます。`pattern:SCRIPT` に対応するマッチの一部は別の配列アイテムになります。

後ほど、チャプター <info:regexp-groups> で括弧について戻ります。括弧は検索と置換に最適です。

## str.match(reg) "g" フラグ付き

`"g"` フラグがあると、`str.match` はすべてのマッチの配列を返します。その配列には追加のプロパティはなく、括弧は要素を作成しません。

例:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/ho/ig*/!* );

alert( result ); // HO, Ho, ho (すべてのマッチ, 大文字小文字の区別なし)
```

括弧がある場合も変わりません。やってみましょう:

```js run
let str = "HO-Ho-ho!";

let result = str.match( *!*/h(o)/ig*/!* );

alert( result ); // HO, Ho, ho
```

したがって、`g` フラグがあると、`result` はシンプルなマッチの配列になります。追加のプロパティはありません。

マッチした位置に関する情報を取得したり、括弧を使いたい場合は、下で説明する [RegExp#exec](mdn:js/RegExp/exec) メソッドを使用する必要があります。

````warn header="マッチするものがない場合、`match` の呼び出しは `null` を返します"
注意してください、重要です。マッチするものがなかった場合、結果は空の配列ではなく `null` です。

次のような落とし穴を避けるために心に留めておいてください:

```js run
let str = "Hey-hey-hey!";

alert( str.match(/ho/gi).length ); // error! there's no length of null
```
````

## str.split(regexp|substr, limit)

正規表現または部分文字列を区切り文字として使用して文字列を分割します。

私たちはすでに文字列で `split` を使いました。このようになります:

```js run
alert('12-34-56'.split('-')) // [12, 34, 56]
```

しかし、正規表現を渡すことも可能です。:

```js run
alert('12-34-56'.split(/-/)) // [12, 34, 56]
```

## str.replace(str|reg, str|func)

文字列の検索や置換のためのスイス・アーミーナイフ(万能なもの)です。

最も簡単な使い方は -- このように部分文字列の検索と置換です:

```js run
// replace a dash by a colon
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

`replace` の第一引数が文字列の場合、最初のマッチのみを探します。

すべてのダッシュ `"-"` を見つけるためには、文字列 `"-"` ではなく、`g` フラグを持つ正規表現 `pattern:/-/g` を使用する必要があります。:

```js run
// すべてのダッシュをコロンに置換
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

2つ目の引数は置換文字列です。

そこでは特別な文字が利用できます:

| 記号 | 挿入 |
|--------|--------|
|`$$`|`"$"` |
|`$&`|マッチ全体|
|<code>$&#096;</code>|マッチの前の文字列の一部|
|`$'`|a part of the string after the match|
|`$n`| `n` が1-2桁の数字ならば、左から右に数えてn番目のカッコの内容を意味します|

例えば、`$&` を使ってすべての `"John"` のエントリを `"Mr.John"` に置き換えましょう。:

```js run
let str = "John Doe, John Smith and John Bull.";

// 各 John に対して - Mr. と John に置換
alert(str.replace(/John/g, 'Mr.$&'));
// "Mr.John Doe, Mr.John Smith and Mr.John Bull.";
```

括弧は次のように `$1`, `$2` などと一緒によく使用されます。:

```js run
let str = "John Smith";

alert(str.replace(/(John) (Smith)/, '$2, $1')) // Smith, John
```

**"賢い"な置換が必要な状況では、2つ目の引数は関数にすることができます**

それぞれのマッチに対して呼び出され、その結果が置換として挿入されます。

例:

```js run
let i = 0;

// 各 "ho" を関数の結果に置換します
alert("HO-Ho-ho".replace(/ho/gi, function() {
  return ++i;
})); // 1-2-3
```

上の例では、関数は単に毎回次の数値を返していますが、通常は結果はマッチしたものに基づいたものになります。

関数は引数 `func(str, p1, p2, ..., pn, offset, s)` で呼ばれます:

1. `str` -- マッチしたもの,
2. `p1, p2, ..., pn` -- 括弧の内容(ある場合),
3. `offset` -- マッチした位置,
4. `s` -- 元の文字列.

正規表現に括弧がない場合、関数は常に3つの引数です: `func(str, offset, s)`。

これらを使って、マッチしたものについての完全な情報を表示してみましょう。:

```js run
// すべてのマッチを表示し置き換える
function replacer(str, offset, s) {
  alert(`Found ${str} at position ${offset} in string ${s}`);
  return str.toLowerCase();
}

let result = "HO-Ho-ho".replace(/ho/gi, replacer);
alert( 'Result: ' + result ); // Result: ho-ho-ho

// それぞれのマッチを表示:
// Found HO at position 0 in string HO-Ho-ho
// Found Ho at position 3 in string HO-Ho-ho
// Found ho at position 6 in string HO-Ho-ho
```

下の例では2つの括弧があります。なので、`replacer` は5つの引数で呼ばれます: `str` は完全なマッチ, 次に括弧, そして `offset` と `s` です:

```js run
function replacer(str, name, surname, offset, s) {
  // name は最初の括弧で、surname は2つ目です
  return surname + ", " + name;
}

let str = "John Smith";

alert(str.replace(/(John) (Smith)/, replacer)) // Smith, John
```

関数を使用すると、マッチしたものに関するすべての情報を取得し、外部変数にアクセスし、すべてを行うことができるため、究極的な置換機能が得られます。

## regexp.test(str)

regexp 自身が呼び出しできる `RegExp` クラスのメソッドを見てみましょう。

`test` メソッドはマッチするか探し、見つかったかどうかで `true/false` を返します。

なので、基本的には `str.search(reg) != -1` と同じです。例えば:

```js run
let str = "I love JavaScript";

// これらの2つのテストは同じことをします
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

見つからない場合の例です:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

## regexp.exec(str)

すでにこれらの検索メソッドは見ました:

- `search` -- マッチする位置を探す
- `match` -- `g` フラグがなければ括弧のものと一緒に最初にマッチしたものを返します
- `match` -- `g` フラグがあれば -- すべてのマッチしたものを返します。括弧のものは含まれません。

`regexp.exec` メソッドは少し使いにくいですが、括弧のものや位置と一緒にすべてのマッチを検索することができます。

これは正規表現に `g` フラグがあるかどうかで動作が異なります。

- `g` フラグがない場合、`regexp.exec(str)` は最初のマッチを返します。これはまさに `str.match(reg)` と同じです。
- `g` がある場合、`regexp.exec(str)` は最初のマッチを返し、その後 `regexp.lastIndex` プロパティにその後ろの位置を *記憶します* 。次の呼び出しは `regexp.lastIndex` から検索が始まり、次のマッチを返します。もしこれ以上マッチするものがない場合、`regexp.exec` は `null` を返し、`regexp.lastIndex` は `0` にセットされます。

見て分かるように、`g` フラグがない場合は `str.match` とまったく同じであるため、このメソッドは新しいことは何もありません。

しかし、`g` フラグはそれらの位置と括弧のグループを含めたすべてのマッチを得る事ができます。

これは、次の `regexp.exec` 呼び出しがどのように1つずつマッチを返すかの例です:

```js run
let str = "A lot about JavaScript at https://javascript.info";

let regexp = /JAVA(SCRIPT)/ig;

*!*
// 最初のマッチを探す
*/!*
let matchOne = regexp.exec(str);
alert( matchOne[0] ); // JavaScript
alert( matchOne[1] ); // script
alert( matchOne.index ); // 12 (マッチした位置)
alert( matchOne.input ); // str と同じ

alert( regexp.lastIndex ); // 22 (マッチ後の位置)

*!*
// 2つ目のマッチを探す
*/!*
let matchTwo = regexp.exec(str); // regexp.lastIndex から検索を続ける
alert( matchTwo[0] ); // javascript
alert( matchTwo[1] ); // script
alert( matchTwo.index ); // 34 (マッチした位置)
alert( matchTwo.input ); // str と同じ

alert( regexp.lastIndex ); // 44 (マッチ後の位置)

*!*
// 3つ目のマッチを探す
*/!*
let matchThree = regexp.exec(str); // regexp.lastIndex から検索を続ける
alert( matchThree ); // null (マッチしない)

alert( regexp.lastIndex ); // 0 (リセット)
```

ご覧の通り、各 `regexp.exec` 呼び出しは "完全なフォーマット(括弧の配列、`index` として `input` プロパティ )" でマッチを返します。

`regexp.exec` の主なユースケースはループ内ですべてのマッチを見つけることです。:

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at ${result.index}` );
}
```

ループは `regexp.exec` が "これ以上マッチするものはない" を意味する `null` を返すまで続きます。

````smart header="指定された位置から検索する"
`lastIndex` を手動で設定することで、`regexp.exec` が指定位置から検索を開始するよう強制することができます。 :

```js run
let str = 'A lot about JavaScript at https://javascript.info';

let regexp = /javascript/ig;
regexp.lastIndex = 30;

alert( regexp.exec(str).index ); // 34, 検索は 30 の位置から開始
```
````

## "y" フラグ

`y` フラグは、`regexp.lastIndex` プロパティで指定された位置で正確に一致するものが見つかるようにします。

つまり、通常は文字列全体で検索が行われます: `pattern:/javascript/` は文字列のすべての場所で "javascript" を探します。

しかし、正規表現が `y` フラグを持っていると、`regexp.lastIndex` で指定された位置(デフォルトでは `0` )でのみマッチするものを探します。

例:

```js run
let str = "I love JavaScript!";

let reg = /javascript/iy;

alert( reg.lastIndex ); // 0 (default)
alert( str.match(reg) ); // null, 位置 0 では見つかりません

reg.lastIndex = 7;
alert( str.match(reg) ); // JavaScript (正しいです, この文字は位置 7 です)

// それ以外の reg.lastIndex の場合は null です
```

正規表現 `pattern:/javascript/iy` は `reg.lastIndex=7` を設定した場合にのみ見つかります。なぜなら、`y` フラグにより、エンジンは `reg.lastIndex` の位置からの文字列内の単一の場所でのみ見つけようとするためです。

で、何の意味があるのでしょう？どこで適用すればよいでしょうか？

理由はパフォーマンスです。

`y` フラグはテキストを "読み込んで" メモリ内の構文構造を構築したり、そこからアクションを実行したりする必要のあるプログラムにおいて、パーサーとして最適です。そのために、テキストに沿って進み、正規表現を適用して次に何があるかを確認します。: 文字列なのか、数値なのかそれとも別のなにかか？

`y`フラグは与えられた位置に正確に正規表現（もしくはそれらのいくつかを1つずつ）を適用することを可能にし、そこに何があるかを理解すると、テキストを調べる段階に進むことができます。

フラグがないと、正規表現のエンジンは常にテキストの終わりまで検索を行います。それはテキストが巨大な場合は特に時間がかかります。結果、パーサーが非常に遅くなります。`y` フラグはこのようなときに良いものです。

## サマリ、レシピ

実際のタスクで使うことを考えて分けるとメソッドが理解しやすくなります。

最初のマッチのみを検索する:
: - 最初のマッチの位置を見つける -- `str.search(reg)`
- 完全なマッチ(マッチしたもの、位置、元の文字列)を見つける -- `str.match(reg)`
- マッチするものがあるかチェック -- `regexp.test(str)`
- 指定位置からマッチを見つける -- `regexp.exec(str)`, `regexp.lastIndex` に位置を設定します

すべてのマッチを検索する:
: - マッチした配列 -- `str.match(reg)`, `reg` は `g` フラグを持つ正規表現。
- それぞれについて完全な情報を持つすべてのマッチを取得 -- ループ中で `g` フラグを持つ `regexp.exec(str)`

検索して置換する:
: - 別の文字列または関数の結果で置き換える -- `str.replace(reg, str|func)`

文字列を分割する:
: - `str.split(str|reg)`

また、次の2つのフラグも説明しました:

- すべてのマッチを見つける `g` フラグ(グローバル検索),
- テキスト内で正確に指定された位置を検索をする `y` フラグ

これでメソッドを知り、正規表現を使えるようになりました。しかし私たちは正規表現の構文も学ぶ必要があります。次に進みましょう。
