# キャプチャグループ

パターンの一部を丸括弧 `pattern:(...)`で囲むことができます。これは "キャプチャグループ" と呼ばれています。

これには2つの効果があります:

1. 結果の配列の中で、マッチした部分を別々の項目として取得することができます。
2. 丸括弧の後の量指定子がある場合、最後の文字ではなく全体に丸括弧が適用されます。

## 例

例でどのように丸括弧が動作するか見てみましょう:

### 例: gogogo

括弧なしだと、パターン `pattern:/go+/` は `subject:g` と、それに続けて1回以上の `subject:o` の繰り返しを意味します、例えば、`match:goooo` や `match:gooooooooo` です。

括弧は文字をグループ化するので、`pattern:(go)+` は `match:go`, `match:gogo`, `match:gogogo` etc を意味します:

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

### 例: domain

もっと複雑なもの -- web サイトのドメインを探す正規表現を作りましょう。

例:

```
mail.com
users.mail.com
smith.users.mail.com
```

ご覧の通り、ドメインは繰り返される単語で構成され、最後の単語以外の各単語のあとにドットがあります。

正規表現では、`pattern:(\w+\.)+\w+` となります:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

検索は機能しますが、このパターンは `my-site.com` といったハイフンを含むドメインにはマッチしません。なぜなら、ハイフンはクラス `pattern:\w` には含まれていないからです。

最後の単語以外の各単語部分を、`pattern:\w` から `pattern:[\w-]` に置き換えることで対処できます。

### 例: email

前の例が拡張できます。前の例をベースにして正規表現を作りましょう。

email のフォーマットは `name@domain` です。任意の文字が name になれ、ハイフンとドットが許可されます。正規表現では `pattern:[-.\w]+` となります。

パターン:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

この正規表現は完璧ではありませんが、ほとんどの場合機能し偶発的なミスを修正するのに役立ちます。なお、メールアドレスの唯一の信頼できるチェックは送信することによってのみ行うことができます。

## 括弧の中身

丸括弧は左から右へ番号付けされます。検索エンジンはそれぞれの中身を覚えており、パターンまたは置換文字列の中で内容を参照することができます。

メソッド `str.match(regexp)` では、`regexp` に `g` フラグがなければ最初の一致を探し、それを配列として返します:

1. インデックス `0`: 完全な一致
2. インデックス `1`: 最初の丸括弧の中身
3. インデックス `2`: 2つ目の丸括弧の中身
4. ...続く...

例えば、HTML タグ `pattern:<.*?>`  を探したいとします。別々の変数にタグの中身があると便利です。

内部のコンテンツを括弧でくくりましょう: `pattern:<(.*?)>`

これでタグ全体 `match:<h1>` と、その中身 `match:h1` を結果の配列から得ることができます。:

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

## ネストされたグループ

括弧はネストすることができます。この場合も数字は左から右です。

例えば、`subject:<span class="my">` でタグを探すとき、次の内容に興味を持つかもしれません:

1. タグ全体のコンテンツ: `match:span class="my"`.
2. タグの名前: `match:span`.
3. タグの属性: `match:class="my"`.

これらのための括弧を追加しましょう: `pattern:<(([a-z]+)\s*([^>]*))>`

番号の付け方は次の通りです(左から右に)

![](regexp-nested-groups-pattern.svg)

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

`result` のインデックス 0 は常のマッチ全体になります。

次に、開始括弧が左から右に番号付けられたグループになります。最初のグループは `result[1]` で返却されます。ここではタグの中身全体になります。

`result[2]` では2つ目の開始括弧 `pattern:([a-z]+)` にいき、タグ名を返します。`result[3]` は `pattern:([^>]*)` に対応するものです。

文字列中のすべてのグループの中身です:

![](regexp-nested-groups-matches.svg)

### オプションのグループ

たとえグループがオプションであり、マッチに存在しない場合(例. 量指定子 `pattern:(...)?` がある)でも、対応する `result` の配列項目は存在し `undefined` と等価です。

例えば、正規表現 `pattern:a(z)?(c)?` を考えてみましょう。これは `"a"` に任意の `"z"`が続き, それに任意の `"c"` が続くパターンを探します。

もし1文字 `subject:a` に対して実行すると、結果はこのようになります:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (マッチ全体)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

配列は長さ `3` ですが、すべてのグループは空です。

そして、文字列 `subject:ac` の場合はより複雑なマッチになります:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (マッチ全体)
alert( match[1] ); // undefined, (z)? がないので。
alert( match[2] ); // c
```

配列の長さは不変で `3` です。しかしグループ `pattern:(z)?` は無いので、結果は `["ac", undefined, "c"]` になります。

## グループを含むすべての一致を検索する: matchAll

```warn header="`matchAll` は新しいメソッドなので polyfill が必要な場合があります"
メソッド `matchAll` は古いブラウザではサポートされていません。

<https://github.com/ljharb/String.prototype.matchAll> のような polyfill が必要な場合があります。
```

すべての一致を検索する場合(フラグ `pattern:g`)、`match` メソッドはグループの中身を返却しません。

例えば、文字列中のすべてのタグを探してみましょう。:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

結果は一致したものの配列ですが、それぞれに関する詳細は含まれていません。しかし、実際には、通常は結果としてキャプチャグループの中身が必要です。

それらを取得するには、`str.matchAll(regexp)` メソッドを使用して検索する必要があります。

これは、"新しく改良されたバージョン" として、`match` のずっと後に JavaScript 言語に追加されました。

`match` のように一致を探しますが、3つの違いがあります:

1. 配列ではなく反復可能(iterable)オブジェクトを返します。
2. フラグ `pattern:g` がある場合、グループを含めた配列として、すべての一致を返します。
3. 一致がない場合は、`null` ではなく、空の反復可能オブジェクトが返却されます。

例:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - 配列ではなく反復可能オブジェクト
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // 配列に変換

alert(results[0]); // <h1>,h1 (1つ目のタグ)
alert(results[1]); // <h2>,h2 (2つ目のタグ)
```

ご覧の通り、行 `(*)` で示しているように1つ目の違いは非常に重要です。オブジェクトは疑似配列ではないため、`results[0]` で一致したものを取得することはできません。`Array.from` を使用して本当の `Array` にすることができます。疑似配列と反復可能についてのより詳細な内容に関しては、<info:iterable> を参照してください。

結果をループする場合は、`Array.from` は必要ありません。:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // первый вывод: <h1>,h1
  // второй: <h2>,h2
}
```

...あるいは分割代入を使用します:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

`matchAll` で返却されるすべての一致は、フラグ `pattern:g` なしの `match` により返却されるものと同じ形式です: 追加のプロパティ `index` (文字列中で一致したインデックス)と `input` (元の文字列)を持つ配列です。:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="なぜ `matchAll` の結果は配列ではなく反復可能オブジェクトなのでしょう？"
なぜこのようにメソッドが設計されたのでしょう? 理由はシンプルです - 最適化のためです。

`matchAll` の呼び出しは検索を実行しません。代わりに、最初に結果なしの反復可能オブジェクトを返します。検索はループなど、それをイテレートするたびに実行されます。

そのため、必要なだけ結果が見つかります。

例. テキストに100個の一致がある可能性がありますが、`for..of` ループではそのうち5つを見つけ、それで十分と判断し、`break` します。すると、エンジンは他の 95 個の一致を探すために時間を費やさずにすみます。
```

## 名前付きグループ(Named groups)

番号でグループを覚えておくのは難しいです。簡単なパターンであれば問題ありませんが、より複雑なパターンの場合、括弧を数えるのには不便です。そのためのより良いオプションがあります: 括弧に名前をつけます。

開始括弧の直後に`pattern:?<name>` を置くことでできます。

例えば、フォーマット "year-month-day" の日付を探しましょう。:

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

ご覧の通り、グループは一致した結果の `.groups` プロパティにあります。

すべての日付を探すには、フラグ `pattern:g` を追加します。

グループと一緒に完全な一致を得るには `matchAll` も必要です。:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // first alert: 30.10.2019
  // second: 01.01.2020
}
```

## 置換におけるキャプチャグループ

`str` 内の `regexp` によるすべての一致を置換するメソッド `str.replace(regexp, replacement)` では、`replacement` 文字列の中で括弧の中身を使用することができます。これは `pattern:$n` にで行うことができ、`pattern:n` はグループ番号です。

例えば,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

名前付き括弧の場合、その参照は `pattern:$<name>` となります。

例えば、日付の形式を "year-month-day" から "day.month.year" にしましょう。:

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## ? を使用した非キャプチャグループ:

量指定子を正しく適用するためには括弧が必要ですが、結果にそれらの内容は必要ないことがあります。

先頭に `pattern:?:` を追加するとグループを除外することができます。

例えば、`pattern:(go)+` を見つけたいですが、別の配列項目にその内容 (`go`) は必要ない場合、`pattern:(?:go)+` と書くことができます。

下の例では、マッチの別要素として名前 `match:John` だけを取得します。:

```js run
let str = "Gogogo John!";

*!*
// ?: キャプチャから 'go' を除外します
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (マッチ全体)
alert( result[1] ); // John
alert( result.length ); // 2 (配列には上以外の要素はなし)
```

## サマリ

丸括弧は正規表現の一部分をグループ化し、この場合量指定子は全体に適用されます。

丸括弧のグループは左から右に番号付けされ、オプションで `(?<name>...)` を利用して名前付けすることができます。

グループでマッチした中身は、結果から取得することができます。:

- メソッド `str.match` は `pattern:g` がない場合のみキャプチャグループを返します。
- メソッド `str.matchAll` は常にキャプチャグループを返します。

括弧に名前がない場合、それらの中身は番号によって一致した配列から取り出すことができます。名前付きの場合はプロパティ `groups` でも利用できます。

`str.replace` では、置換文字列中に括弧の中身を使用することもできます。: 番号 `$n` あるいは名前 `$<name>`。

グループは先頭に `pattern:?:` を追加することで番号付けから外すことができます。これはグループ全体に対して量指定子を適用するが、結果の配列に別の項目としては不要なときに使われます。このような括弧は置換文字列でも参照できません。
