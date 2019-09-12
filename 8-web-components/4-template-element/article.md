
# Template 要素

組み込みの `<template>` 要素は HTML マークアップテンプレートの格納場所として機能します。ブラウザはこれらのコンテンツは無視します(構文のチェックのみ行います)が、JavaScript ではアクセスし、他の要素を作るのに使うことができます。

`template` は HTML マークアップを格納する目的で、HTML 上に見えない要素を作成することができます。`template` は何が特別なのでしょうか？

第一に、`template` 内のコンテンツは、通常適切な囲みタグを必要とする場合でも有効なHTMLになります。

例えば、テーブルの行 `<tr>` を置くことができます:
```html
<template>
  <tr>
    <td>Contents</td>
  </tr>
</template>
```

通常、例えば `<div>` の中に `<tr>` を置こうとすると、ブラウザは無効な DOM 構造であることを検知し、それを "修正" しようとして前後に `<table>` タグを追加します。場合によっては、これはしてほしいことではありません。一方、`<template>` はそこに置いたものを正確に維持します。

同様に、スタイルやスクリプトを `<template>` に入れることもできます:

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

ブラウザは `<template>` のコンテンツは "ドキュメント外" とみなします。: コンテンツにあるスタイルは適用されず、スクリプトも実行されません。`<video autoplay>` も実行されません, etc。

コンテンツは、ドキュメントに挿入されたときにライブになります(スタイルが適用され、スクリプトが実行される、などです)。

## template の挿入

テンプレートのコンテンツは、`content` プロパティで [DocumentFragment](info:modifying-document#document-fragment) -- 特別な種類の DOM ノード -- として利用できます。

ある特別な性質(どこかに挿入するとき、その "子" が挿入される)を除くと、他の DOM ノードたちと同じように扱うことができます。

例:

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
  // 何度も再利用するため、テンプレートのコンテンツをクローンします
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // いま、<template> のスクリプトが実行されます
</script>
```

前のチャプターの Shadow DOM の例を `<template>` を使って書き直してみましょう:

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

行 `(*)` では、`DocumentFragment` として `temp.content` をクローンして挿入しています。結果、その子(`<style>`, `<p>`)が代わりに挿入されています。


これらは Shadow DOM を形成します:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

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
