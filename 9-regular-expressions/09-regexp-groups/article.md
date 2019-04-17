# キャプチャグループ

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
パターンの一部を丸括弧 `pattern:(...)`で囲むことができます。これは "キャプチャグループ" と呼ばれています。
=======
A part of a pattern can be enclosed in parentheses `pattern:(...)`. This is called a "capturing group".
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

これには2つの効果があります:

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
1. [String#match](mdn:js/String/match) または [RegExp#exec](mdn:/RegExp/exec) メソッドを利用したとき、マッチした部分を別々の配列アイテムに置くことができます。
2. 丸括弧の後の量指定子を置いた場合、最後の文字ではなく全体に丸括弧が適用されます。

[cut]

## 例
=======
1. It allows to place a part of the match into a separate array.
2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole, not the last character.

## Example
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

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

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
- `@` の前の最初のパートは、`match:john.smith` のように単語的な文字、ドットとダッシュを含みます `pattern:[-.\w]+`。
- 次は `pattern:@` です。
- そして、ドメインです。2階層のドメイン `site.com` かもしれないし、`host.site.com.uk` のようにサブドメインを持つ可能性があります。私たちは、`match:mail.` または `match:site.com.` のようなサブドメインに対して、"後ろにドットが続く単語" の1回以上の繰り返しをし、その後 `match:.com` や `match:.uk` のような最後の部分に対する "単語" としてマッチさせることができます。

    "ドットが続く単語" は `pattern:(\w+\.)+` (繰り返し) です。最後の言葉は末尾にドットは持たないので、単に `\w{2,20}` になります。量指定子 `pattern:{2,20}` は長さを制限します。`.uk`, `.com` や `.museum` のようなドメインのゾーンは 20文字を超えることはできないためです。

    なので、ドメインパターンは `pattern:(\w+\.)+\w{2,20}` になります。さらに、ドメインはダッシュも許容するので `\w` を `[\w-]` に置き換えます。これで最終的な結果を得ました。

この正規表現は完璧ではありませんが、たいていの場合動作します。これはパターンが短く、誤りや時折起きる間違いを修正するのには十分です。

例えば、ここでは文字列中のすべてのメールアドレスを見つけます:
=======
1. The first part `pattern:[-.\w]+` (before `@`) may include any alphanumeric word characters, a dot and a dash, to match `match:john.smith`.
2. Then `pattern:@`, and the domain. It may be a subdomain like `host.site.com.uk`, so we match it as "a word followed by a dot `pattern:([\w-]+\.)` (repeated), and then the last part must be a word: `match:com` or `match:uk` (but not very long: 2-20 characters).

That regexp is not perfect, but good enough to fix errors or occasional mistypes.

For instance,  we can find all emails in the string:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/g;

alert("my@mail.com @ his@site.com.uk".match(reg)); // my@mail.com, his@site.com.uk
```

In this example parentheses were used to make a group for repeating `pattern:(...)+`. But there are other uses too, let's see them.

## 括弧の内容

丸括弧は左から右へ番号付けされます。検索エンジンはそれぞれの中身を覚えており、パターンまたは置換文字列の中で内容を参照することができます。

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
例えば、(簡略化された) パターン `pattern:<.*?>` を使って HTML タグを見つけます。通常、結果の後に何かをしたいでしょう。

`<...>` の中身を丸括弧で囲むと、次のようにしてアクセスすることができます:
=======
For instance, we'd like to find HTML tags `pattern:<.*?>`, and process them.

Let's wrap the inner content into parentheses, like this: `pattern:<(.*?)>`.

We'll get them into an array:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

```js run
let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;

alert( str.match(reg) ); // Array: ["<h1>", "h1"]
```

正規表現が `pattern:/.../g` フラグを持っていないときだけ、[String#match](mdn:js/String/match) の呼び出しはグループを返します。

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
グループとのすべてのマッチが必要な場合、<info:regexp-methods> で説明したように [RegExp#exec](mdn:js/RegExp/exec) メソッドを使います。:
=======
If we need all matches with their groups then we can use `.matchAll` or `regexp.exec` as described in <info:regexp-methods>:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

```js run
let str = '<h1>Hello, world!</h1>';

// 2つマッチします: 開始 <h1> と閉じ </h1> タグです
let reg = /<(.*?)>/g;

let matches = Array.from( str.matchAll(reg) );

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
while (match = reg.exec(str)) {
  // 最初のマッチを表示: <h1>,h1
  // 次のマッチを表示: </h1>,/h1
  alert(match);
}
=======
alert(matches[0]); //  Array: ["<h1>", "h1"]
alert(matches[1]); //  Array: ["</h1>", "/h1"]
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md
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

![](regexp-nested-groups.png)

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

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
## ? を使用した非キャプチャグループ:

量指定子を正しく適用するために括弧が必要ですが、配列にそれらの内容が必要でない場合があります。
=======
## Named groups

Remembering groups by their numbers is hard. For simple patterns it's doable, but for more complex ones we can give names to parentheses.

That's done by putting `pattern:?<name>` immediately after the opening paren, like this:

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

As you can see, the groups reside in the `.groups` property of the match.

We can also use them in replacements, as `pattern:$<name>` (like `$1..9`, but name instead of a digit).

For instance, let's rearrange the date into `day.month.year`:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let str = "2019-04-30";

let rearranged = str.replace(dateRegexp, '$<day>.$<month>.$<year>');

alert(rearranged); // 30.04.2019
```

If we use a function, then named `groups` object is always the last argument:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let str = "2019-04-30";

let rearranged = str.replace(dateRegexp,
  (str, year, month, day, offset, input, groups) =>
   `${groups.day}.${groups.month}.${groups.year}`
);

alert(rearranged); // 30.04.2019
```

Usually, when we intend to use named groups, we don't need positional arguments of the function. For the majority of real-life cases we only need `str` and `groups`.

So we can write it a little bit shorter:

```js
let rearranged = str.replace(dateRegexp, (str, ...args) => {
  let {year, month, day} = args.pop();
  alert(str); // 2019-04-30
  alert(year); // 2019
  alert(month); // 04
  alert(day); // 30
});
```


## Non-capturing groups with ?:

Sometimes we need parentheses to correctly apply a quantifier, but we don't want the contents in results.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

先頭に `pattern:?:` を追加するとグループを除外することができます。

<<<<<<< HEAD:5-regular-expressions/09-regexp-groups/article.md
例えば、`pattern:(go)+` を見つけたいですが、別の配列アイテムにその内容 (`go`) を覚えたくない場合、`pattern:(?:go)+` と書くことができます。
=======
For instance, if we want to find `pattern:(go)+`, but don't want to remember the contents (`go`) in a separate array item, we can write: `pattern:(?:go)+`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:9-regular-expressions/09-regexp-groups/article.md

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

## Summary

- Parentheses can be:
  - capturing `(...)`, ordered left-to-right, accessible by number.
  - named capturing `(?<name>...)`, accessible by name.
  - non-capturing `(?:...)`, used only to apply quantifier to the whole groups.
