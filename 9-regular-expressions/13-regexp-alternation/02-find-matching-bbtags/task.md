<<<<<<< HEAD
# bbタグのペアを見つける

"bbタグ" は `[tag]...[/tag]` のように見えるもので、ここでは `tag` は `b`, `url` または `quote` のいずれかです。

例:
=======
# Find bbtag pairs

A "bb-tag" looks like `[tag]...[/tag]`, where `tag` is one of: `b`, `url` or `quote`.

For instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```
[b]text[/b]
[url]http://google.com[/url]
```

<<<<<<< HEAD
BBタグはネストできます。しかし次の例のように、自身の中でネストすることはできません。:

```
通常:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

不可:
[b][b]text[/b][/b]
```

タグは改行を含むことができ、それは普通のことです:
=======
BB-tags can be nested. But a tag can't be nested into itself, for instance:

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

Can't happen:
[b][b]text[/b][/b]
```

Tags can contain line breaks, that's normal:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```
[quote]
  [b]text[/b]
[/quote]
```

<<<<<<< HEAD
それらの内容をもつすべての BBタグを見つける正規表現を作成してください。

例:

```js
let reg = /your regexp/g;

let str = "..[url]http://google.com[/url]..";
alert( str.match(reg) ); // [url]http://google.com[/url]
```

タグがネストしている場合は外側のタグを必要とします(コンテンツ内で検索を続けたい場合):

```js
let reg = /your regexp/g;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(reg) ); // [url][b]http://google.com[/b][/url]
=======
Create a regexp to find all BB-tags with their contents.

For instance:

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

If tags are nested, then we need the outer tag (if we want we can continue the search in its content):

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
```
