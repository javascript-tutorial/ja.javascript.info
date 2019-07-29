
# Mutation observer

<<<<<<< HEAD
`MutationObserver` は DOM 要素を監視し、変更があった場合にコールバックを起動する組み込みのオブジェクトです。
最初に構文を確認してから、実際のユースケースを見ていきましょう。

## 構文

`MutationObserver` は使いやすいです。

まず、コールバック関数を引数にオブザーバ(observer)を作成します。:
=======
`MutationObserver` is a built-in object that observes a DOM element and fires a callback in case of changes.

We'll first see syntax, and then explore a real-world use case.

## Syntax

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js
let observer = new MutationObserver(callback);
```

<<<<<<< HEAD
次に、DOM ノードにアタッチします。:
=======
And then attach it to a DOM node:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js
observer.observe(node, config);
```

<<<<<<< HEAD
`config` はブール値のオプションを持つオブジェクトで、"どの種類の変更に反応するか" を指定します。:
- `childList` -- `node` の直接の子の変更,
- `subtree` -- `node` のすべての子孫に対する変更,
- `attributes` -- `node` の属性の変更,
- `attributeOldValue` -- 属性の古い値を記録する (`attributes` が ture の場合),
- `characterData` -- `node.data` (テキストコンテンツ) を監視するかどうか,
- `characterDataOldValue` -- `node.data` の古い値を記録する (`characterData` が true の場合),
- `attributeFilter` -- 指定したものだけを監視するための、属性の配列

その後、任意の変更の後で `callback` が実行されます。その際、最初の引数には [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) オブジェクトのリスト、2番目の引数には、オブザーバ自体が与えられます。

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) オブジェクトは次のプロパティを持っています:

- `type` -- mutation(変化)の種類, 次のいずれかです。
    - `"attributes"` (属性が変更された)
    - `"characterData"` (データが変更された)
    - `"childList"` (要素が追加/削除された),
- `target` -- 変更が起こった場所: "attributes" の場合は要素, "characterData" の場合はテキストノード, あるいは "childList" の変化の場合は要素です,
- `addedNodes/removedNodes`  -- 追加/削除されたノード,
- `previousSibling/nextSibling` -- 追加/削除されたノードの前後の兄弟,
- `attributeName/attributeNamespace` -- 変更された属性の名前/ネームスペース (XMLの場合),
- `oldValue` -- 以前の値。属性あるいはテキストの変更の場合のみ。

例えば、ここには `contentEditable` 属性をもつ `<div>` があります。この属性はそこにフォーカスし、編集することを可能とします。

```html run
<div contentEditable id="elem">Edit <b>me</b>, please</div>
=======
`config` is an object with boolean options "what kind of changes to react on":
- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeOldValue` -- record the old value of attribute (infers `attributes`),
- `characterData` -- whether to observe `node.data` (text content),
- `characterDataOldValue` -- record the old value of `node.data` (infers `characterData`),
- `attributeFilter` -- an array of attribute names, to observe only selected ones.

Then after any changes, the `callback` is executed, with a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects as the first argument, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, one of
    - `"attributes"`: attribute modified
    - `"characterData"`: data modified, used for text nodes,
    - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for "attributes", or text node for "characterData", or an element for a "childList" mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes.


For example, here's a `<div>` with `contentEditable` attribute. That attribute allows us to focus on it and edit.

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});
observer.observe(elem, {
<<<<<<< HEAD
  // 属性以外のすべてを監視する
=======
  // observe everything except attributes
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
  childList: true,
  subtree: true,
  characterDataOldValue: true
});
</script>
```

<<<<<<< HEAD
`<b>me</b>` のテキストを変更すると、一つの mutation(変化)が得られます: 
=======
If we change the text inside `<b>edit</b>`, we'll get a single mutation:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js
mutationRecords = [{
  type: "characterData",
<<<<<<< HEAD
  oldValue: "me",
  target: <text node>,
  // 他のプロパティは空です
}];
```

`<b>me</b>` をすべて選択し削除すると、複数の mutation が発生します:
=======
  oldValue: "edit",
  target: <text node>,
  // other properties empty
}];
```

If we select and remove the `<b>edit</b>` altogether, we'll get multiple mutations:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
<<<<<<< HEAD
  // 他のプロパティは空です
}, {
  type: "characterData"
  target: <text node>
  // ...詳細は、ブラウザがどのように変更を処理するかによって異なります。
  // 2つの隣接するノード "Edit " と ", please" を1つのノードに合体するかもしれません。
  // あるいは、単に "Edit" の後の余分なスペースを削除する可能性もあります。
}];
```

## Observer ユースケース

いつ `MutationObserver` が必要でしょうか？ これが役立つシナリオはあるでしょうか？

もちろんあります。例えば、`contentEditable` のようなものを追跡して、"undo/redo" のスタックを作成することもできますが、ここでは、`MutationObserver` がアーキテクチャの観点から良い例を示します。

このサイトのように、プログラミングに関するWebサイトを作成しているとしましょう。当然、記事やその他の資料にはソースコードのスニペットが含まれることがあります。

HTML コードのスニペットは次のようになります:
```html
...
<pre class="language-javascript"><code>
  // ここにコード
=======
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...details depend on how the browser handles the change
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it can just delete the extra space after "edit".
  // may be one mutation or a few
}];
```

## Observer use case

When `MutationObserver` is needed? Is there a scenario when such thing can be useful?

We can track something like `contentEditable` and implement "undo/redo" functionality (record mutations and rollback/redo them on demand). There are also cases when `MutationObserver` is good from architectural standpoint.

Let's say we're making a website about programming. Naturally, articles and other materials may contain source code snippets.

An HTML markup of a code snippet looks like this:
```html
...
<pre class="language-javascript"><code>
  // here's the code
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
[Prism.js](https://prismjs.com/) のような、JavaScript のハイライトライブラリがあります。`Prism.highlightElem(pre)` を呼び出すと、このような `pre` 要素の内容が検査され、ここのページの例と同じように、色付きの構文ハイライトが追加されます。

一般には、ページが読み込まれると、例えばページの一番下で要素 `pre[class*="language"]` を探し、それらに対して `Prism.highlightElem` を呼び出します。:

```js
// ページ上のすべてのコードスニペットをハイライト表示する
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

これで、 `<pre>` スニペットは次のように見えます(デフォルトでは行番号はなし)。

```js
// ここにコード
let hello = "world";
```

今のところ、すべて簡単ですね。HTML 中に `<pre>` のコードスニペットがあり、それらをハイライト表示しています。

では続けましょう。サーバから資料や素材を動的に取得するとします。私たちは、[チュートリアルの後半](info:fetch-basics)でそのためのメソッドを学びます。ここでは、WebサーバからHTMLの記事を取得し、オンデマンドでそれを表示する、という点がポイントです。:

```js
let article = /* サーバから新しいコンテンツを取得する */
articleElem.innerHTML = article;
```

新しい `article` HTMLはコードスニペットを含むかもしれません。それらに対して `Prism.highlightElem` を呼び出す必要があります。そうしないと、ハイライト表示されません。

**動的にロードされた記事に対して `Prism.highlightElem` を呼び出すのは誰の責任でしょう？**

次のように、記事をロードするコードへその呼び出しを追加することはできます。:

```js
let article = /* サーバから新しいコンテンツを取得する */
=======
Also we'll use a JavaScript highlighting library on our site, e.g. [Prism.js](https://prismjs.com/). A call to `Prism.highlightElem(pre)` examines the contents of such `pre` elements and adds into them special tags and styles for colored syntax highlighting, similar to what you see in examples here, at this page.

When to run that method? We can do it on `DOMContentLoaded` event, or at the bottom of the page. At that moment we have DOM ready, can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Now the `<pre>` snippet looks like this (without line numbers by default):

```js
// here's the code
let hello = "world";
```

Everything's simple so far, right? There are `<pre>` code snippets in HTML, we highlight them.

Now let's go on. Let's say we're going to dynamically fetch materials from a server. We'll study methods for that [later in the tutorial](info:fetch). For now it only matters that we fetch an HTML article from a webserver and display it on demand:

```js
let article = /* fetch new content from server */
articleElem.innerHTML = article;
```

The new `article` HTML may contain code snippets. We need to call `Prism.highlightElem` on them, otherwise they won't get highlighted.

**Where and when to call `Prism.highlightElem` for a dynamically loaded article?**

We could append that call to the code that loads an article, like this:

```js
let article = /* fetch new content from server */
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

<<<<<<< HEAD
...しかし想像してみてください。コードでコンテンツをロードする場所はたくさんあります。: 記事、質問、フォーラムへの投稿など。到るところにハイライト表示をする呼び出しを書かなければならないのでしょうか？また、その呼び出しを忘れないように注意する必要もあります。

また、仮にコンテンツをサードパーティのエンジンにロードする場合はどうなるでしょう？E.g. 誰かによって書かれたフォーラムがあり、それは動的にコンテンツをロードします。そして、そこに構文のハイライト表示を追加したいような場合です。誰もサードパーティのスクリプトにパッチを当てるようなことはしたくありません。

幸いなことに、別の選択肢があります。

ページに挿入されたコードスニペットを自動で検出し、それらをハイライト表示するために、`MutationObserver` が使えます。

それにより、私たちはハイライト機能を一ヶ所で処理することができ、統合の必要性から解放されます。

## 動的なハイライト表示のデモ

ここに動作サンプルがあります。

コードを実行すると、下の要素を監視し始め、そこに表れた任意のコードスニペットをハイライト表示します。:
=======
...But imagine, we have many places in the code where we load contents: articles, quizzes, forum posts. Do we need to put the highlighting call everywhere? That's not very convenient, and also easy to forget.

And what if the content is loaded by a third-party module? E.g. we have a forum written by someone else, that loads contents dynamically, and we'd like to add syntax highlighting to it. No one likes to patch third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect code snippets inserted in the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

## Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
<<<<<<< HEAD
    // 新しい node を検査する

    for(let node of mutation.addedNodes) {
      // 新しく追加された text nodes をスキップする
      if (!(node instanceof HTMLElement)) continue;

      // 挿入された要素がコードスニペットであるかをチェック
=======
    // examine new nodes

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

<<<<<<< HEAD
      // その subtree でコードスニペットを探してハイライト表示
=======
      // maybe there's a code snippet somewhere in its subtree?
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

<<<<<<< HEAD
<p id="highlight-demo" style="border: 1px solid #ddd"><code>id="highlight-demo"</code>を持つデモ要素です。上のサンプルで監視されています。</p>

以下のコードは `innerHTML` でデータを設定します。もし上のコードを実行していれば、スニペットがハイライト表示されます。:
=======
<p id="highlight-demo" style="border: 1px solid #ddd">Demo element with <code>id="highlight-demo"</code>, obverved by the example above.</p>

The code below populates `innerHTML`. Please run the code above first, it will watch and highlight the new content:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
let demoElem = document.getElementById('highlight-demo');

<<<<<<< HEAD
// コードスニペットを持つコンテンツを動的に挿入する
=======
// dynamically insert content with code snippets
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

<<<<<<< HEAD
これで、監視された要素または `document` 全体のすべてのハイライト表示を追跡できる `MutationObserver` ができました。それについて考えることなく、コードスニペットの追加/削除ができます。

## ガベージコレクション

オブザーバは、内部的にはノードへの弱い参照を使用します。つまり、ノードが DOM から削除され、到達不可能になると、ガベージコレクションの対象になります。オブザーバはそれを妨げません。

それでも、オブザーバはいつでも解放することができます。:

- `observer.disconnect()` -- 監視をやめます

加えて:

- `mutationRecords = observer.takeRecords()` -- 未処理の mutation(変化)のレコード一覧を取得します。これらは、変化は発生したが、コールバックはそれらを処理しなかったものです。

```js
// オブザーバを disconnect します
// まだ処理していない mutation がある可能性があります
let mutationRecords = observer.takeRecords();
// mutationRecords を処理します

// これですべて処理されたので、dicsonnect します
observer.disconnect();
```

## サマリ  

`MutationObserver` は DOM の変更に反応することができます: 属性、要素の追加/削除、テキストコンテンツ。

これを使って、私たち自身の他の部分のコード、あるいはサードパーティのコードによってもたらされた変更を追跡することができます。

例えば、上のハイライト表示のデモの `innerHTML` のように、動的に挿入されたコンテンツの後処理をします。
=======
Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.

## Additional methods

There's a method to stop observing the node:

- `observer.disconnect()` -- stops the observation.

Additionally:

- `mutationRecords = observer.takeRecords()` -- gets a list of unprocessed mutation records, those that happened, but the callback did not handle them.

```js
// we're going to disconnect the observer
// it might have not yet handled some mutations
let mutationRecords = observer.takeRecords();
// process mutationRecords

// now all handled, disconnect
observer.disconnect();
```

## Garbage collection

Observers use weak references to nodes internally. That is: if a node is removed from DOM, and becomes unreachable, then it becomes garbage collected, an observer doesn't prevent that.

## Summary  

`MutationObserver` can react on changes in DOM: attributes, added/removed elements, text content.

We can use it to track changes introduced by other parts of our own or 3rd-party code.

For example, to post-process dynamically inserted content, as demo `innerHTML`, like highlighting in the example above.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74
