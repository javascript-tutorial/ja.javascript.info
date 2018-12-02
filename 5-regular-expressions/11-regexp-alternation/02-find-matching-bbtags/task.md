# bbタグのペアを見つける

"bbタグ" は `[tag]...[/tag]` のように見えるもので、ここでは `tag` は `b`, `url` または `quote` のいずれかです。

例:
```
[b]text[/b]
[url]http://google.com[/url]
```

BBタグはネストできます。しかし次の例のように、自身の中でネストすることはできません。:

```
通常:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

不可:
[b][b]text[/b][/b]
```

タグは改行を含むことができ、それは普通のことです:

```
[quote]
  [b]text[/b]
[/quote]
```

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
```
