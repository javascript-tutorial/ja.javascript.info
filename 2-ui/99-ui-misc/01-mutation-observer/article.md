
# Mutation observer

<<<<<<< HEAD
`MutationObserver` は DOM 要素を監視し、変更があった場合にコールバックを起動する組み込みのオブジェクトです。

最初に構文を確認してから、実際のユースケースを見ていきましょう。

## 構文

`MutationObserver` は簡単に使用できます。

まず、コールバック関数を引数にもつオブザーバ(observer)を作成します。:
=======
`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.

We'll first take a look at the syntax, and then explore a real-world use case, to see where such thing may be useful.

## Syntax

`MutationObserver` is easy to use.

First, we create an observer with a callback-function:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let observer = new MutationObserver(callback);
```

<<<<<<< HEAD
次に、DOM ノードにアタッチします。:
=======
And then attach it to a DOM node:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
observer.observe(node, config);
```

<<<<<<< HEAD
`config` はブール値のオプションを持つオブジェクトで、"どの種類の変更に反応するか" を指定します。:
- `childList` -- `node` の直接の子の変更,
- `subtree` -- `node` のすべての子孫に対する変更,
- `attributes` -- `node` の属性の変更,
- `attributeFilter` -- 指定したものだけを監視するための、属性の配列
- `characterData` -- `node.data` (テキストコンテンツ) を監視するかどうか,

ほかにもいくつかのオプションがあります:
- `attributeOldValue` -- `true` の場合、コールバックに属性の新旧両方の値を渡します。そうでなければ、新しいもののみを渡します（`attributes` オプションが必要です）,
- `characterDataOldValue` -- `true` の場合、コールバックに `node.data` の新旧両方の値を渡します。そうでなければ、新しいもののみを渡します（`characterData` オプションが必要です）,

その後、任意の変更後に `callback` が実行されます。その際、最初の引数には [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) オブジェクトのリスト、2 番目の引数には、オブザーバ自体が与えられます。

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) オブジェクトは次のプロパティを持っています:

- `type` -- mutation(変化)の種類, 次のいずれかです。
  - `"attributes"` (属性が変更された)
  - `"characterData"` (データが変更された)
  - `"childList"` (要素が追加/削除された),
- `target` -- 変更が起こった場所: "attributes" の場合は要素, "characterData" の場合はテキストノード, あるいは "childList" の変化の場合は要素です,
- `addedNodes/removedNodes` -- 追加/削除されたノード,
- `previousSibling/nextSibling` -- 追加/削除されたノードの前後の兄弟,
- `attributeName/attributeNamespace` -- 変更された属性の名前/ネームスペース (XML の場合),
- `oldValue` -- 以前の値。属性あるいはテキストの変更の場合のみ（対応するオプション `attributeOldValue`/`characterDataOldValue` が設定されている場合）

例えば、ここには `contentEditable` 属性をもつ `<div>` があります。この属性を指定すると、フォーカスすると編集することができます。
=======
`config` is an object with boolean options "what kind of changes to react on":
- `childList` -- changes in the direct children of `node`,
- `subtree` -- in all descendants of `node`,
- `attributes` -- attributes of `node`,
- `attributeFilter` -- an array of attribute names, to observe only selected ones.
- `characterData` -- whether to observe `node.data` (text content),

Few other options:
- `attributeOldValue` -- if `true`, pass both the old and the new value of attribute to callback (see below), otherwise only the new one (needs `attributes` option),
- `characterDataOldValue` -- if `true`, pass both the old and the new value of `node.data` to callback (see below), otherwise only the new one (needs `characterData` option).

Then after any changes, the `callback` is executed: changes are passed in the first argument as a list of [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects, and the observer itself as the second argument.

[MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) objects have properties:

- `type` -- mutation type, one of
    - `"attributes"`: attribute modified
    - `"characterData"`: data modified, used for text nodes,
    - `"childList"`: child elements added/removed,
- `target` -- where the change occurred: an element for `"attributes"`, or text node for `"characterData"`, or an element for a `"childList"` mutation,
- `addedNodes/removedNodes`  -- nodes that were added/removed,
- `previousSibling/nextSibling` -- the previous and next sibling to added/removed nodes,
- `attributeName/attributeNamespace` -- the name/namespace (for XML) of the changed attribute,
- `oldValue` -- the previous value, only for attribute or text changes, if the corresponding option is set `attributeOldValue`/`characterDataOldValue`.

For example, here's a `<div>` with a `contentEditable` attribute. That attribute allows us to focus on it and edit.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

<<<<<<< HEAD
// 属性以外のすべてを監視する
observer.observe(elem, {
  childList: true, // 直接の子を監視する
  subtree: true, // 子孫たちも
  characterDataOldValue: true // コールバックに古い値も渡す
=======
// observe everything except attributes
observer.observe(elem, {
  childList: true, // observe direct children
  subtree: true, // and lower descendants too
  characterDataOldValue: true // pass old data to callback
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
});
</script>
```

<<<<<<< HEAD
ブラウザで実行し、`<div>` にフォーカスし `<b>edit</b>` 内のテキストを変更すると、`console.log` に mutation(変化)が表示されます:
=======
If we run this code in the browser, then focus on the given `<div>` and change the text inside `<b>edit</b>`, `console.log` will show one mutation:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
<<<<<<< HEAD
  // 他のプロパティは空です
}];
```

より複雑な編集操作を行った場合、例えば `<b>edit</b>` を削除すると、mutation イベントは複数の mutation records を含みます:
=======
  // other properties empty
}];
```

If we make more complex editing operations, e.g. remove the `<b>edit</b>`, the mutation event may contain multiple mutation records:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

したがって、`MutationObserver` で DOMサブツリー内の任意の変更に反応することができます。

## 統合するための使用法

いつ `MutationObserver` が必要でしょうか？

便利な機能を含んでいるが、例えば広告 `<div class="ads">Unwanted ads</div>` を表示するといった好ましくないことも行う、3rdパーティのスクリプトを追加する必要があるケースを想像してください。

もちろん、3rd パーティのスクリプトには、広告を削除する仕組みは提供されていません。

`MutationObserver` を使用することで、好ましくない要素が DOM に表示された場合にそれを検知し、削除することができます。

別の状況としては、3rd パーティのスクリプトが我々のドキュメントに何かを追加した際に、それを検出し、動的にリサイズするなどページに適合させたい場合が考えられます。

`MutationObserver` を使用すると、これを実装することができます。

## アーキテクチャのための使用法

また、`MutationObserver` がアーキテクチャの観点から見て良い状況もあります。

例えば、プログラミングに関する Web サイトを作成しているとしましょう。当然ながら、記事やその他の資料にはソースコードのスニペットが含まれることがあります。

HTML マークアップでそのようなスニペットは次のようになります:
=======
  // other properties empty
}, {
  type: "characterData"
  target: <text node>
  // ...mutation details depend on how the browser handles such removal
  // it may coalesce two adjacent text nodes "edit " and ", please" into one node
  // or it may leave them separate text nodes
}];
```

So, `MutationObserver` allows to react on any changes within DOM subtree.

## Usage for integration

When such thing may be useful?

Imagine the situation when you need to add a third-party script that contains useful functionality, but also does something unwanted, e.g. shows ads `<div class="ads">Unwanted ads</div>`.

Naturally, the third-party script provides no mechanisms to remove it.

Using `MutationObserver`, we can detect when the unwanted element appears in our DOM and remove it.

There are other situations when a third-party script adds something into our document, and we'd like to detect, when it happens, to adapt our page, dynamically resize something etc.

`MutationObserver` allows to implement this.

## Usage for architecture

There are also situations when `MutationObserver` is good from architectural standpoint.

Let's say we're making a website about programming. Naturally, articles and other materials may contain source code snippets.

Such snippet in an HTML markup looks like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
...
<pre class="language-javascript"><code>
<<<<<<< HEAD
  // ここにコード
=======
  // here's the code
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
より読みやすくすると同時に、より美しくするために、[Prism.js](https://prismjs.com/) のような、JavaScript のシンタックスハイライトライブラリを使用します。Prism で上記のようなスニペットをシンタックスハイライトするには、`Prism.highlightElem(pre)` が呼ばれ、`pre` 要素の内容が検査され、ここのページの例と同じように、色付きの構文ハイライトが追加されます。

具体的にはいつハイライトを行うメソッドを実行すべきでしょうか？`DOMContentLoaded` イベント、あるいは、ページの末尾にスクリプトを配置することでハイライトができます。DOM が準備できた時点で、`pre[class*="language"]` を探し、それに対して `Prism.highlightElem` を呼び出すことが可能です:

```js
// ページ上のすべてのコードスニペットをハイライト表示する
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

今のところ、すべて簡単ですね。HTML 中に `<pre>` のコードスニペットがあり、それらをハイライト表示しています。

では続けましょう。サーバから資料や素材を動的に取得するとします。私たちは、[チュートリアルの後半](info:fetch-basics)でそのためのメソッドを学びます。ここでは、Web サーバから HTML の記事を取得し、オンデマンドでそれを表示する、という点がポイントです。:

```js
let article = /* サーバから新しいコンテンツを取得する */
articleElem.innerHTML = article;
```

新しい `article` HTML はコードスニペットを含むかもしれません。それらに対して `Prism.highlightElem` を呼び出す必要があります。そうしないと、ハイライト表示されません。

**動的にロードされた記事に対していつ、どこで `Prism.highlightElem` を呼び出すでしょうか？**

次のように、記事をロードするコードへその呼び出しを追加することはできます。:

```js
let article = /* サーバから新しいコンテンツを取得する */
=======
For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:

```js
// highlight all code snippets on the page
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

Everything's simple so far, right? We find code snippets in HTML and highlight them.

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.

Luckily, there's another option.

We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.

So we'll handle the highlighting functionality in one place, relieving us from the need to integrate it.

### Dynamic highlight demo

Here's the working example.

If you run this code, it starts observing the element below and highlighting any code snippets that appear there:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
<<<<<<< HEAD
    // 新しいノードを検査し、ハイライトするものはあるか？

    for(let node of mutation.addedNodes) {
      // 要素のみを追跡し、他のノード（例 テキストノード）はスキップします
      if (!(node instanceof HTMLElement)) continue;

      // 挿入された要素がコードスニペットであるかをチェックします
=======
    // examine new nodes, is there anything to highlight?

    for(let node of mutation.addedNodes) {
      // we track only elements, skip other nodes (e.g. text nodes)
      if (!(node instanceof HTMLElement)) continue;

      // check the inserted element for being a code snippet
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

<<<<<<< HEAD
      // あるいは、サブツリーのどこかにコードスニペットがあるか？
=======
      // or maybe there's a code snippet somewhere in its subtree?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
ここで、以下には HTML要素と、`innterHTML` を使用して動的にそれを埋めるJavaScript があります。

前のコード（上記、要素を監視します）、その後下のコードを実行してみてください。`MutationObserver` がどのようにスニペットを検出し、ハイライトするのかが確認できます。

<p id="highlight-demo" style="border: 1px solid #ddd"><code>id="highlight-demo"</code>を持つデモ要素です。上のサンプルで監視されています。</p>

以下のコードは `innerHTML` でデータを設定します。もし上のコードを実行していれば、スニペットがハイライト表示されます。:
=======
Here, below, there's an HTML-element and JavaScript that dynamically fills it using `innerHTML`.

Please run the previous code (above, observes that element), and then the code below. You'll see how `MutationObserver` detects and highlights the snippet.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

The following code populates its `innerHTML`, that causes the `MutationObserver` to react and highlight its contents:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let demoElem = document.getElementById('highlight-demo');

<<<<<<< HEAD
// コードスニペットを持つコンテンツを動的に挿入する
=======
// dynamically insert content with code snippets
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

## 追加のメソッド

ノードの監視を停止するためのメソッドがあります:

- `observer.disconnect()` -- 監視をやめます

監視を停止するとき、オブザーバによりまだ処理されていない変更がある可能性があります。このような場合は以下を使用します

- `observer.takeRecords()` -- 未処理の mutation(変化)のレコード一覧を取得します。これらは、変化は発生したが、コールバックはそれらを処理しなかったものです。

これらのメソッドは次のように一緒に使用されます:

```js
// 未処理の mutation の一覧を取得します
// 処理されない可能性のある最近の変更を考慮する場合
// disconnect の前に呼ぶ必要があります
let mutationRecords = observer.takeRecords();

// 変更の追跡をストップします
=======
Now we have `MutationObserver` that can track all highlighting in observed elements or the whole `document`. We can add/remove code snippets in HTML without thinking about it.

## Additional methods

There's a method to stop observing the node:

- `observer.disconnect()` -- stops the observation.

When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.

These methods can be used together, like this:

```js
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
let mutationRecords = observer.takeRecords();

// stop tracking changes
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
observer.disconnect();
...
```


<<<<<<< HEAD
```smart header="`observer.takeRecords()` で返却されたレコードは、処理キューから削除されます"
`observer.takeRecords()` で返却されたレコードに対するコールバックは呼ばれません。
```

```smart header="ガベージコレクションの相互作用"
内部的に、オブザーバはノードに対して弱い参照を使用します。つまり、ノードがDOMから削除され、到達不可能になると、ガベージコレクションの対象となりえます。

DOM ノードが観測されたという事実だけでは、ガベージコレクションを防ぐことはできません。
```

## サマリ

`MutationObserver` は DOM の変更に反応することができます: 属性、要素の追加/削除、テキストコンテンツ。

これを使って、私たち自身の他の部分のコード、あるいは 3rd パーティのコードによってもたらされた変更を追跡することができます。

`MutationObserver` は任意の変更を追跡可能です。"何を監視するか" オプションの設定は最適化のために使用され、不要なコールバックの呼び出しにリソースを費やすことはありません。
=======
```smart header="Records returned by `observer.takeRecords()` are removed from the processing queue"
The callback won't be called for records, returned by `observer.takeRecords()`.
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.

The mere fact that a DOM node is observed doesn't prevent the garbage collection.
```

## Summary  

`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.

We can use it to track changes introduced by other parts of our code, as well as to integrate with third-party scripts.

`MutationObserver` can track any changes. The config "what to observe" options are used for optimizations, not to spend resources on unneeded callback invocations.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
