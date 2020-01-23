
# スティッキーフラグ(sticky flag) "y", 指定位置での検索

フラグ `pattern:y` を使用すると、元の文字列の指定位置で検索を行うことができます。

`pattern:y` フラグのユースケースを把握し、その便利さを知るために実際のユースケースを探っていきましょう。

正規表現の一般的なタスクの1つは "字句解析" です: テキスト、例えばプログラミング言語があり、その構造要素を分析します。

HTML はタグと属性を、JavaScript コードは関数、変数などを持っています。

字句解析プログラムには独自のツールやアルゴリズムがある特別な領域なため、ここでは深くは見ていきませんが共通のタスクがあります: 特定の位置で何かを読み込むことです。

例. `subject:let varName = "value"` という文字列があり、ここから変数名(`4` の位置から始まる)が必要な場合

ここでは正規表現 `pattern:\w+` を利用して変数名を検索します。実際、JavaScript の変数名に対して正確にマッチするためにはより複雑な正規表現が必要ですが、ここでは問題ではありません。

`str.match(/\w+/)` の呼び出しは行の最初の単語のみを見つけます。あるいはフラグ `pattern:g` がある場合はすべての単語文字です。ですが、今必要なのは `4`(インデックス) の位置の単語だけです。

指定位置から検索するには、メソッド `regexp.exec(str)` を利用します。

`regexp` がフラグ `pattern:g` あるいは `pattern:y` を持っていない場合、このメソッドはまさに `str.match(regexp)` のように文字列 `str` の最初の一致を検索します。ここではこのような単純なフラグなしのケースには興味はありません。

フラグ `pattern:g` がある場合、`regexp.lastIndex` プロパティで保持されている位置から文字列 `str` の検索を開始します。そして一致するものが見つかると、`regexp.lastIndex` にその一致の直後のインデックスをセットします。

正規表現が作られたときの `lastIndex` は `0` です。

そのため、連続した `regexp.exec(str)` の呼び出しは次から次へと一致したものを返します。

例 (フラグ `pattern:g` あり):

```js run
let str = 'let varName';

let regexp = /\w+/g;
alert(regexp.lastIndex); // 0 (初期 lastIndex=0)

let word1 = regexp.exec(str);
alert(word1[0]); // let (1つ目の単語)
alert(regexp.lastIndex); // 3 (一致した後の位置)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2つ目の単語)
alert(regexp.lastIndex); // 11 (一致した後の位置)

let word3 = regexp.exec(str);
alert(word3); // null (これ以上一致はなし)
alert(regexp.lastIndex); // 0 (検索終了でリセット)
```

すべての一致がグループや追加のプロパティと一緒に配列として返却されます。

ループですべての一致を取得することもできます:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // let を位置 0 で見つけ, 次に
  // varName を位置 4 で見つける
}
```

このような `regexp.exec` の利用はメソッド `str.matchAll` の代替手段です。

また、他のメソッドとは違い、指定位置から検索を開始するための独自の `lastIndex` が設定可能です。

例えば、`4` の位置から始まる単語を検索しましょう:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // フラグ "g" がなければ lastIndex は無視されます

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

この例では位置 `regexp.lastIndex = 4` から開始して `pattern:\w+` の検索を行いました。

注意: 検索は `lastIndex` の位置から始まります。`lastIndex` の位置には単語がないが、その後にあるような場合はそれが検索されます。:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
```

...したがって、フラグ `pattern:g` がある場合、`lastIndex` プロパティは検索の開始位置となります。

**一方、フラグ `pattern:y` は、 `regexp.exec` にその前でもなく後ろでもなく、正確に `lastIndex` の位置を見るようにします。**

これはフラグ `pattern:y` による同じ検索です:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (3 の位置は単語ではなくスペース)

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (4 の位置は単語)
```

ご覧の通り、正規表現 `pattern:/\w+/y` は(`pattern:g` とは異なり) `3` の位置ではマッチしませんが、`4` の位置ならマッチします。

長いテキストがあり、そこには一致するものが全くないと想像してください。フラグ `pattern:g` の検索はテキストの終わりまで進みます。これはフラグ `pattern:y` による検索よりも遥かに長い時間がかかります。

字句解析などのタスクでは、通常正確な位置での検索が多く行われます。フラグ `pattern:y` の使用は、よいパフォーマンスのための鍵です。
