<<<<<<< HEAD
# キャプチャグループ

パターンの一部を丸括弧 `pattern:(...)`で囲むことができます。これは "キャプチャグループ" と呼ばれています。

これには2つの効果があります:

1. [String#match](mdn:js/String/match) または [RegExp#exec](mdn:/RegExp/exec) メソッドを利用したとき、マッチした部分を別々の配列アイテムに置くことができます。
2. 丸括弧の後の量指定子を置いた場合、最後の文字ではなく全体に丸括弧が適用されます。

[cut]

## 例

下の例では、パターン `pattern:(go)+` は1つ以上の `match:'go'` を見つけます:
=======
# Capturing groups

A part of a pattern can be enclosed in parentheses `pattern:(...)`. This is called a "capturing group".

That has two effects:

1. It allows to place a part of the match into a separate array.
2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole, not the last character.

## Example

In the example below the pattern `pattern:(go)+` finds one or more `match:'go'`:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
alert( 'Gogogo now!'.match(/(go)+/i) ); // "Gogogo"
```

<<<<<<< HEAD
括弧なしだと、パターン `pattern:/go+/` は `subject:g` と、それに続けて1回以上の `subject:o` の繰り返しを意味します、例えば、`match:goooo` や `match:gooooooooo` です。

括弧は単語 `pattern:(go)` をグループ化します。

もっと複雑なもの -- メールアドレスにマッチする正規表現を作りましょう。

メールアドレスの例です:
=======
Without parentheses, the pattern `pattern:/go+/` means `subject:g`, followed by `subject:o` repeated one or more times. For instance, `match:goooo` or `match:gooooooooo`.

Parentheses group the word `pattern:(go)` together.

Let's make something more complex -- a regexp to match an email.

Examples of emails:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```
my@mail.com
john.smith@site.com.uk
```

<<<<<<< HEAD
パターンは: `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}` です。

- `@` の前の最初のパートは、`match:john.smith` のように単語的な文字、ドットとダッシュを含みます `pattern:[-.\w]+`。
- 次は `pattern:@` です。
- そして、ドメインです。2階層のドメイン `site.com` かもしれないし、`host.site.com.uk` のようにサブドメインを持つ可能性があります。私たちは、`match:mail.` または `match:site.com.` のようなサブドメインに対して、"後ろにドットが続く単語" の1回以上の繰り返しをし、その後 `match:.com` や `match:.uk` のような最後の部分に対する "単語" としてマッチさせることができます。

    "ドットが続く単語" は `pattern:(\w+\.)+` (繰り返し) です。最後の言葉は末尾にドットは持たないので、単に `\w{2,20}` になります。量指定子 `pattern:{2,20}` は長さを制限します。`.uk`, `.com` や `.museum` のようなドメインのゾーンは 20文字を超えることはできないためです。

    なので、ドメインパターンは `pattern:(\w+\.)+\w{2,20}` になります。さらに、ドメインはダッシュも許容するので `\w` を `[\w-]` に置き換えます。これで最終的な結果を得ました。

この正規表現は完璧ではありませんが、たいていの場合動作します。これはパターンが短く、誤りや時折起きる間違いを修正するのには十分です。

例えば、ここでは文字列中のすべてのメールアドレスを見つけます:
=======
The pattern: `pattern:[-.\w]+@([\w-]+\.)+[\w-]{2,20}`.

1. The first part `pattern:[-.\w]+` (before `@`) may include any alphanumeric word characters, a dot and a dash, to match `match:john.smith`.
2. Then `pattern:@`, and the domain. It may be a subdomain like `host.site.com.uk`, so we match it as "a word followed by a dot `pattern:([\w-]+\.)` (repeated), and then the last part must be a word: `match:com` or `match:uk` (but not very long: 2-20 characters).

That regexp is not perfect, but good enough to fix errors or occasional mistypes.

For instance, we can find all emails in the string:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}/g;

<<<<<<< HEAD
alert("my@mail.com @ his@site.com.uk".match(reg)); // my@mail.com,his@site.com.uk
```


## 括弧の内容

丸括弧は左から右へ番号付けされます。検索エンジンはそれぞれの中身を覚えており、パターンまたは置換文字列の中で内容を参照することができます。

例えば、(簡略化された) パターン `pattern:<.*?>` を使って HTML タグを見つけます。通常、結果の後に何かをしたいでしょう。

`<...>` の中身を丸括弧で囲むと、次のようにしてアクセスすることができます:
=======
alert("my@mail.com @ his@site.com.uk".match(reg)); // my@mail.com, his@site.com.uk
```

In this example parentheses were used to make a group for repetitions `pattern:([\w-]+\.)+`. But there are other uses too, let's see them.

## Contents of parentheses  

Parentheses are numbered from left to right. The search engine remembers the content matched by each of them and allows to reference it in the pattern or in the replacement string.

For instance, we'd like to find HTML tags `pattern:<.*?>`, and process them.

Let's wrap the inner content into parentheses, like this: `pattern:<(.*?)>`.

Then we'll get both the tag as a whole and its content:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let str = '<h1>Hello, world!</h1>';
let reg = /<(.*?)>/;

alert( str.match(reg) ); // Array: ["<h1>", "h1"]
```

<<<<<<< HEAD
正規表現が `pattern:/.../g` フラグを持っていないときだけ、[String#match](mdn:js/String/match) の呼び出しはグループを返します。

グループとのすべてのマッチが必要な場合、<info:regexp-methods> で説明したように [RegExp#exec](mdn:js/RegExp/exec) メソッドを使います。:
=======
The call to [String#match](mdn:js/String/match) returns groups only if the regexp only looks for the first match, that is: has no `pattern:/.../g` flag.

If we need all matches with their groups then we can use `.matchAll` or `regexp.exec` as described in <info:regexp-methods>:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let str = '<h1>Hello, world!</h1>';

<<<<<<< HEAD
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
=======
// two matches: opening <h1> and closing </h1> tags
let reg = /<(.*?)>/g;

let matches = Array.from( str.matchAll(reg) );

alert(matches[0]); //  Array: ["<h1>", "h1"]
alert(matches[1]); //  Array: ["</h1>", "/h1"]
```

Here we have two matches for `pattern:<(.*?)>`, each of them is an array with the full match and groups.

## Nested groups

Parentheses can be nested. In this case the numbering also goes from left to right.

For instance, when searching a tag in `subject:<span class="my">` we may be interested in:

1. The tag content as a whole: `match:span class="my"`.
2. The tag name: `match:span`.
3. The tag attributes: `match:class="my"`.

Let's add parentheses for them:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let str = '<span class="my">';

let reg = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(reg);
alert(result); // <span class="my">, span class="my", span, class="my"
```

<<<<<<< HEAD
グループは次のようになります:

![](regexp-nested-groups.svg)

`result` の先頭のインデックスは常に完全なマッチです。

次にグループで、左から右に番号付けされています。ここでは `result[1]` はタグコンテンツ全体が囲まれています。

次の `result[2]` は, 2つ目の開始 `result[2]` から対応する `pattern:)` までのグループ -- タグ名で、その後スペースはグループ化していませんが、`result[3]` で属性をグループ化しています。

**もしグループが任意であり、マッチに存在しない場合、対応する `result` のインデックスは存在します(が、 `undefined` です)。**

例えば、正規表現 `pattern:a(z)?(c)?` を考えてみましょう。これは `"a"` に任意の `"z"`が続き, それに任意の `"c"` が続くパターンを探します。

もし1文字 `subject:a` に対して実行すると、結果はこのようになります:
=======
Here's how groups look:

![](regexp-nested-groups.svg)

At the zero index of the `result` is always the full match.

Then groups, numbered from left to right. Whichever opens first gives the first group `result[1]`. Here it encloses the whole tag content.

Then in `result[2]` goes the group from the second opening `pattern:(` till the corresponding `pattern:)` -- tag name, then we don't group spaces, but group attributes for `result[3]`.

**Even if a group is optional and doesn't exist in the match, the corresponding `result` array item is present (and equals `undefined`).**

For instance, let's consider the regexp `pattern:a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

If we run it on the string with a single letter `subject:a`, then the result is:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
<<<<<<< HEAD
alert( match[0] ); // a (マッチ全体)
=======
alert( match[0] ); // a (whole match)
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

<<<<<<< HEAD
配列は長さ `3` ですが、すべてのグループは空です。

そして、文字列 `subject:ack` の場合はより複雑なマッチになります:
=======
The array has the length of `3`, but all groups are empty.

And here's a more complex match for the string `subject:ack`:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let match = 'ack'.match(/a(z)?(c)?/)

alert( match.length ); // 3
<<<<<<< HEAD
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
=======
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c
```

The array length is permanent: `3`. But there's nothing for the group `pattern:(z)?`, so the result is `["ac", undefined, "c"]`.

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

We can also use them in the replacement string, as `pattern:$<name>` (like `$1..9`, but a name instead of a digit).

For instance, let's reformat the date into `day.month.year`:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;

let str = "2019-04-30";

let rearranged = str.replace(dateRegexp, '$<day>.$<month>.$<year>');

alert(rearranged); // 30.04.2019
```

If we use a function for the replacement, then named `groups` object is always the last argument:

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

Sometimes we need parentheses to correctly apply a quantifier, but we don't want their contents in results.

A group may be excluded by adding `pattern:?:` in the beginning.

For instance, if we want to find `pattern:(go)+`, but don't want to remember the contents (`go`) in a separate array item, we can write: `pattern:(?:go)+`.

In the example below we only get the name "John" as a separate member of the `results` array:
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927

```js run
let str = "Gogo John!";
*!*
<<<<<<< HEAD
// キャプチャから Gogo を除外します
=======
// exclude Gogo from capturing
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
let reg = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(reg);

alert( result.length ); // 2
alert( result[1] ); // John
```
<<<<<<< HEAD
=======

## Summary

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with  `(?<name>...)`.

The content, matched by a group, can be referenced both in the replacement string as `$1`, `$2` etc, or by the name `$name` if named.

So, parentheses groups are called "capturing groups", as they "capture" a part of the match. We get that part separately from the result as a member of the array or in `.groups` if it's named.

We can exclude the group from remembering (make in "non-capturing") by putting `?:` at the start: `(?:...)`, that's used if we'd like to apply a quantifier to the whole group, but don't need it in the result.
>>>>>>> c4d1987ebc470b30c234dbde6fac6e77b7509927
