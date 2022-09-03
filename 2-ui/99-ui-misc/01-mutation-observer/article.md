
# Mutation observer

`MutationObserver` は DOM 要素を監視し、変更があった場合にコールバックを起動する組み込みのオブジェクトです。

最初に構文を確認してから、実際のユースケースを見ていきましょう。

## 構文

`MutationObserver` は簡単に使用できます。

まず、コールバック関数を引数にもつオブザーバ(observer)を作成します。:

```js
let observer = new MutationObserver(callback);
```

次に、DOM ノードにアタッチします。:

```js
observer.observe(node, config);
```

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

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});

// 属性以外のすべてを監視する
observer.observe(elem, {
  childList: true, // 直接の子を監視する
  subtree: true, // 子孫たちも
  characterDataOldValue: true // コールバックに古い値も渡す
});
</script>
```

ブラウザで実行し、`<div>` にフォーカスし `<b>edit</b>` 内のテキストを変更すると、`console.log` に mutation(変化)が表示されます:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // 他のプロパティは空です
}];
```

より複雑な編集操作を行った場合、例えば `<b>edit</b>` を削除すると、mutation イベントは複数の mutation records を含みます:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
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

```html
...
<pre class="language-javascript"><code>
  // ここにコード
  let hello = "world";
</code></pre>
...
```

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
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

...しかし想像してみてください。コードでコンテンツをロードする場所はたくさんあります。: 記事、質問、フォーラムへの投稿など。到るところにハイライト表示をする呼び出しを書かなければならないのでしょうか？また、その呼び出しを忘れないように注意する必要もあります。

また、仮にコンテンツをサードパーティのエンジンにロードする場合はどうなるでしょう？E.g. 誰かによって書かれたフォーラムがあり、それは動的にコンテンツをロードします。そして、そこに構文のハイライト表示を追加したいような場合です。誰もサードパーティのスクリプトにパッチを当てるようなことはしたくありません。

幸いなことに、別の選択肢があります。

ページに挿入されたコードスニペットを自動で検出し、それらをハイライト表示するために、`MutationObserver` が使えます。

それにより、私たちはハイライト機能を一ヶ所で処理することができ、統合の必要性から解放されます。

## 動的なハイライト表示のデモ

ここに動作サンプルがあります。

コードを実行すると、下の要素を監視し始め、そこに表れた任意のコードスニペットをハイライト表示します。:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // 新しいノードを検査し、ハイライトするものはあるか？

    for(let node of mutation.addedNodes) {
      // 要素のみを追跡し、他のノード（例 テキストノード）はスキップします
      if (!(node instanceof HTMLElement)) continue;

      // 挿入された要素がコードスニペットであるかをチェックします
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // あるいは、サブツリーのどこかにコードスニペットがあるか？
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

ここで、以下には HTML要素と、`innterHTML` を使用して動的にそれを埋めるJavaScript があります。

前のコード（上記、要素を監視します）、その後下のコードを実行してみてください。`MutationObserver` がどのようにスニペットを検出し、ハイライトするのかが確認できます。

<p id="highlight-demo" style="border: 1px solid #ddd"><code>id="highlight-demo"</code>を持つデモ要素です。上のサンプルで監視されています。</p>

以下のコードは `innerHTML` でデータを設定します。もし上のコードを実行していれば、スニペットがハイライト表示されます。:

```js run
let demoElem = document.getElementById('highlight-demo');

// コードスニペットを持つコンテンツを動的に挿入する
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

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
observer.disconnect();
...
```


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
