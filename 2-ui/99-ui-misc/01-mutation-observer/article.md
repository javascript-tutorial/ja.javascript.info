
# Mutation observer

`MutationObserver` は DOM 要素を監視し、変更があった場合にコールバックを起動する組み込みのオブジェクトです。
最初に構文を確認してから、実際のユースケースを見ていきましょう。

## 構文

`MutationObserver` は使いやすいです。

まず、コールバック関数を引数にオブザーバ(observer)を作成します。:

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

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(the changes)
});
observer.observe(elem, {
  // 属性以外のすべてを監視する
  childList: true,
  subtree: true,
  characterDataOldValue: true
});
</script>
```

`<b>me</b>` のテキストを変更すると、一つの mutation(変化)が得られます: 

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "me",
  target: <text node>,
  // 他のプロパティは空です
}];
```

`<b>me</b>` をすべて選択し削除すると、複数の mutation が発生します:

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

## Observer ユースケース

いつ `MutationObserver` が必要でしょうか？ これが役立つシナリオはあるでしょうか？

もちろんあります。例えば、`contentEditable` のようなものを追跡して、"undo/redo" のスタックを作成することもできますが、ここでは、`MutationObserver` がアーキテクチャの観点から良い例を示します。

このサイトのように、プログラミングに関するWebサイトを作成しているとしましょう。当然、記事やその他の資料にはソースコードのスニペットが含まれることがあります。

HTML コードのスニペットは次のようになります:
```html
...
<pre class="language-javascript"><code>
  // ここにコード
  let hello = "world";
</code></pre>
...
```

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
    // 新しい node を検査する

    for(let node of mutation.addedNodes) {
      // 新しく追加された text nodes をスキップする
      if (!(node instanceof HTMLElement)) continue;

      // 挿入された要素がコードスニペットであるかをチェック
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // その subtree でコードスニペットを探してハイライト表示
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

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
