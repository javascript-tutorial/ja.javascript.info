
<<<<<<< HEAD
# Template 要素

組み込みの `<template>` 要素は HTML マークアップテンプレートの格納場所として機能します。ブラウザはこれらのコンテンツは無視します(構文のチェックのみ行います)が、JavaScript ではアクセスし、他の要素を作るのに使うことができます。

`template` は HTML マークアップを格納する目的で、HTML 上に見えない要素を作成することができます。`template` は何が特別なのでしょうか？

第一に、`template` 内のコンテンツは、通常適切な囲みタグを必要とする場合でも有効なHTMLになります。

例えば、テーブルの行 `<tr>` を置くことができます:
=======
# Template element

A built-in `<template>` element serves as a storage for HTML markup templates. The browser ignores its contents, only checks for syntax validity, but we can access and use it in JavaScript, to create other elements.

In theory, we could create any invisible element somewhere in HTML for HTML markup storage purposes. What's special about `<template>`?

First, its content can be any valid HTML, even if it normally requires a proper enclosing tag.

For example, we can put there a table row `<tr>`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

<<<<<<< HEAD
通常、例えば `<div>` の中に `<tr>` を置こうとすると、ブラウザは無効な DOM 構造であることを検知し、それを "修正" しようとして前後に `<table>` タグを追加します。場合によっては、これはしてほしいことではありません。一方、`<template>` はそこに置いたものを正確に維持します。

同様に、スタイルやスクリプトを `<template>` に入れることもできます:
=======
Usually, if we try to put `<tr>` inside, say, a `<div>`, the browser detects the invalid DOM structure and "fixes" it, adds `<table>` around. That's not what we want. On the other hand, `<template>` keeps exactly what we place there.

We can put styles and scripts into `<template>` as well:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hello");
  </script>
</template>
```

<<<<<<< HEAD
ブラウザは `<template>` のコンテンツは "ドキュメント外" とみなします。: コンテンツにあるスタイルは適用されず、スクリプトも実行されません。`<video autoplay>` も実行されません, etc。

コンテンツは、ドキュメントに挿入されたときにライブになります(スタイルが適用され、スクリプトが実行される、などです)。

## template の挿入

テンプレートのコンテンツは、`content` プロパティで [DocumentFragment](info:modifying-document#document-fragment) -- 特別な種類の DOM ノード -- として利用できます。

ある特別な性質(どこかに挿入するとき、その "子" が挿入される)を除くと、他の DOM ノードたちと同じように扱うことができます。

例:
=======
The browser considers `<template>` content "out of the document": styles are not applied, scripts are not executed, `<video autoplay>` is not run, etc.

The content becomes live (styles apply, scripts run etc) when we insert it into the document.

## Inserting template

The template content is available in its `content` property as a [DocumentFragment](info:modifying-document#document-fragment) -- a special type of DOM node.

We can treat it as any other DOM node, except one special property: when we insert it somewhere, its children are inserted instead.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<template id="tmpl">
  <script>
    alert("Hello");
  </script>
  <div class="message">Hello, world!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
<<<<<<< HEAD
  // 何度も再利用するため、テンプレートのコンテンツをクローンします
=======
  // Clone the template content to reuse it multiple times
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
<<<<<<< HEAD
  // いま、<template> のスクリプトが実行されます
</script>
```

前のチャプターの Shadow DOM の例を `<template>` を使って書き直してみましょう:
=======
  // Now the script from <template> runs
</script>
```

Let's rewrite a Shadow DOM example from the previous chapter using `<template>`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Click me</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "Hello from the shadows!";
  };
</script>
```

<<<<<<< HEAD
行 `(*)` では、`DocumentFragment` として `temp.content` をクローンして挿入しています。結果、その子(`<style>`, `<p>`)が代わりに挿入されています。


これらは Shadow DOM を形成します:
=======
In the line `(*)` when we clone and insert `tmpl.content`, as its `DocumentFragment`, its children (`<style>`, `<p>`) are inserted instead.

They form the shadow DOM:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

<<<<<<< HEAD
## サマリ

要約すると:

- `<template>` コンテンツは文法的に正しい任意の HTML になります。
- `<template>` コンテンツは "ドキュメントの外" とみなされます。そのため、何も影響しません。
- JavaScript で `template.content` にアクセスでき、クローンすることで新しいコンポーネントで再利用できます。

`<template>` タグはとてもユニークです。なぜなら:

- ブラウザはその内部の HTML 構文をチェックします(スクリプト内でテンプレート文字列を使用するのとは対照的に)。
- それでも、適切なラッパー(e.g. `<tr>`)がないと意味がないようなものでも最上位の HTML タグとして使用することができます。
- コンテンツはインタラクティブです: ドキュメントに挿入されたときに、スクリプトを実行したり `<video autoplay>` を再生します。

`<template>` 要素自身は繰り返しの仕組みやデータバインディング、変数への代入などの機能はありませんが、この上にそれらを実装していくことができます。
=======
## Summary

To summarize:

- `<template>` content can be any syntactically correct HTML.
- `<template>` content is considered "out of the document", so it doesn't affect anything.
- We can access `template.content` from JavaScript, clone it to reuse in a new component.

The `<template>` tag is quite unique, because:

- The browser checks HTML syntax inside it (as opposed to using a template string inside a script).
- ...But still allows use of any top-level HTML tags, even those that don't make sense without proper wrappers (e.g. `<tr>`).
- The content becomes interactive: scripts run, `<video autoplay>` plays etc, when inserted into the document.

The `<template>` element does not feature any iteration mechanisms, data binding or variable substitutions, but we can implement those on top of it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
