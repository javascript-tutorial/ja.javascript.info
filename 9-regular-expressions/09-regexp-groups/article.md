# キャプチャグループ

パターンの一部を丸括弧 `pattern:(...)`で囲むことができます。これは "キャプチャグループ" と呼ばれています。

これには2つの効果があります:

1. [String#match](mdn:js/String/match) または [RegExp#exec](mdn:/RegExp/exec) メソッドを利用したとき、マッチした部分を別々の配列アイテムに置くことができます。
2. 丸括弧の後の量指定子を置いた場合、最後の文字ではなく全体に丸括弧が適用されます。

[cut]

## 例

下の例では、パターン `pattern:(go)+` は1つ以上の `match:'go'` を見つけます:

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

括弧なしだと、パターン `pattern:/go+/` は `subject:g` と、それに続けて1回以上の `subject:o` の繰り返しを意味します、例えば、`match:goooo` や `match:gooooooooo` です。

括弧は単語 `pattern:(go)` をグループ化します。

もっと複雑なもの -- メールアドレスにマッチする正規表現を作りましょう。

メールアドレスの例です:

```
my@mail.com
john.smith@site.com.uk
```

パターンは: `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}` です。

- `@` の前の最初のパートは、`match:john.smith` のように単語的な文字、ドットとダッシュを含みます `pattern:[-.\w]+`。
- 次は `pattern:@` です。
- そして、ドメインです。2階層のドメイン `site.com` かもしれないし、`host.site.com.uk` のようにサブドメインを持つ可能性があります。私たちは、`match:mail.` または `match:site.com.` のようなサブドメインに対して、"後ろにドットが続く単語" の1回以上の繰り返しをし、その後 `match:.com` や `match:.uk` のような最後の部分に対する "単語" としてマッチさせることができます。

    "ドットが続く単語" は `pattern:(\w+\.)+` (繰り返し) です。最後の言葉は末尾にドットは持たないので、単に `\w{2,20}` になります。量指定子 `pattern:{2,20}` は長さを制限します。`.uk`, `.com` や `.museum` のようなドメインのゾーンは 20文字を超えることはできないためです。

    なので、ドメインパターンは `pattern:(\w+\.)+\w{2,20}` になります。さらに、ドメインはダッシュも許容するので `\w` を `[\w-]` に置き換えます。これで最終的な結果を得ました。

この正規表現は完璧ではありませんが、たいていの場合動作します。これはパターンが短く、誤りや時折起きる間違いを修正するのには十分です。

例えば、ここでは文字列中のすべてのメールアドレスを見つけます:

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/g;

alert("my@mail.com @ his@site.com.uk".match(reg)); // my@mail.com,his@site.com.uk
```


## 括弧の内容

丸括弧は左から右へ番号付けされます。検索エンジンはそれぞれの中身を覚えており、パターンまたは置換文字列の中で内容を参照することができます。

例えば、(簡略化された) パターン `pattern:<.*?>` を使って HTML タグを見つけます。通常、結果の後に何かをしたいでしょう。

`<...>` の中身を丸括弧で囲むと、次のようにしてアクセスすることができます:

```js run
let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;

alert( str.match(reg) ); // Array: ["<h1>", "h1"]
```

正規表現が `pattern:/.../g` フラグを持っていないときだけ、[String#match](mdn:js/String/match) の呼び出しはグループを返します。

グループとのすべてのマッチが必要な場合、<info:regexp-methods> で説明したように [RegExp#exec](mdn:js/RegExp/exec) メソッドを使います。:

```js run
let str = '<h1>Hello, world!</h1>';

// 2つマッチします: 開始 <h1> と閉じ </h1> タグです
let reg = /<(.*?)>/g;

let match;

while (match = reg.exec(str)) {
  // 最初のマッチを表示: <h1>,h1
  // 次のマッチを表示: </h1>,/h1
  alert(match);
}
```

ここでは `pattern:<(.*?)>` で2つのマッチがあり、それぞれが完全なマッチとグループの配列です。

## ネストされたグループ

括弧はネストすることができます。この場合も数字は左から右です。

例えば、`subject:<span class="my">` でタグを探すとき、次の内容に興味を持つかもしれません:

1. タグ全体のコンテンツ: `match:span class="my"`.
2. タグの名前: `match:span`.
3. タグの属性: `match:class="my"`.

これらのための括弧を追加しましょう:

```js run
let str = '<span class="my">';

let reg = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(reg);
alert(result); // <span class="my">, span class="my", span, class="my"
```

グループは次のようになります:

![](regexp-nested-groups.svg)

`result` の先頭のインデックスは常に完全なマッチです。

次にグループで、左から右に番号付けされています。ここでは `result[1]` はタグコンテンツ全体が囲まれています。

次の `result[2]` は, 2つ目の開始 `result[2]` から対応する `pattern:)` までのグループ -- タグ名で、その後スペースはグループ化していませんが、`result[3]` で属性をグループ化しています。

**もしグループが任意であり、マッチに存在しない場合、対応する `result` のインデックスは存在します(が、 `undefined` です)。**

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

そして、文字列 `subject:ack` の場合はより複雑なマッチになります:

```js run
let match = 'ack'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (マッチ全体)
alert( match[1] ); // undefined, (z)? がないので。
alert( match[2] ); // c
```

配列の長さは不変で `3` です。しかしグループ `pattern:(z)?` は無いので、結果は `["ac", undefined, "c"]` になります。

## ? を使用した非キャプチャグループ:

量指定子を正しく適用するために括弧が必要ですが、配列にそれらの内容が必要でない場合があります。

先頭に `pattern:?:` を追加するとグループを除外することができます。

例えば、`pattern:(go)+` を見つけたいですが、別の配列アイテムにその内容 (`go`) を覚えたくない場合、`pattern:(?:go)+` と書くことができます。

下の例では、`results` の配列の別の要素として名前 "John" だけを取得します。:

```js run
let str = "Gogo John!";
*!*
// キャプチャから Gogo を除外します
let reg = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(reg);

alert( result.length ); // 2
alert( result[1] ); // John
```
