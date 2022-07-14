# ドキュメントの変更

DOMの変更は "動的な" ページを作成するための鍵です。

ここでは、新しい要素を "その場" で作成し、既存のページのコンテンツを変更する方法を見ていきます。

## 例: メッセージを表示 

`alert` よりも見栄えの良いメッセージをページに追加する方法を見てみましょう。

次のように見えます:

```html autorun height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

*!*
<div class="alert">
  <strong>Hi there!</strong> You've read an important message.
</div>
*/!*
```

これは HTML の例です。では JavaScript で同じ `div` を作ってみましょう(スタイルは HTML の中、もしくは外部CSSにあるとします)。

## 要素の作成 

DOM ノードを作成するメソッドが2つあります。:

`document.createElement(tag)`
: 指定されたタグの新しい *要素ノード* を作成します:

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: 指定されたテキストの新しい *テキストノード* を作成します:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

多くの場合、メッセージのための `div` のように、要素ノードを作成する必要があります。

### メッセージの作成 

メッセージの div の作成は次の3つのステップになります:

```js
// 1. <div> 要素の作成
let div = document.createElement('div');

// 2. クラスに "alert" をセット
div.className = "alert";

// 3. コンテンツをセットします
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

これで要素は作成されましたが、今は `div` という変数にあるだけで、ページにはまだ挿入されていないため見えません。

## 挿入メソッド 

`div` を表示するためには、`document` のどこかに挿入する必要があります。例えば、`document.body` で参照できる `<body>` 要素の中です。

そのための特別なメソッドがあります: `document.body.appendChild(div)`.

ここに完全なコードを載せます:

```html run height="80"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

*!*
  document.body.appendChild(div);
*/!*
</script>
```

ここでは、`document.body` に対して `append` を呼び出しましたが、他の要素の場合でも `append` でその中に要素を置くことができます。例えば `div.append(anotherElement)` で、`<div>` になにかを挿入できます。

その他の挿入方法は次のとおりです。挿入する場所を指定します。

- `node.append(...nodes or strings)` -- `node` の末尾にノードまたは文字列を追加します。
- `node.prepend(...nodes or strings)` -- `node` の先頭にノードまたは文字列を挿入します。
- `node.before(...nodes or strings)` –- `node` の前にノードまたは文字列を追加します。
- `node.after(...nodes or strings)` –- `node` の後にノードまたは文字列を追加します。
- `node.replaceWith(...nodes or strings)` –- `node` を与えられたノードまたは文字列で置き換えます。

これらのメソッドの引数は挿入する任意の DOM ノードのリスト、あるいはテキスト文字列（自動的にテキストノードになります）です。

動きを見てみましょう。

これらのメソッドを使用して、リストに項目を追加し、項目の前後にテキストを追加する例を次に示します。:

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before'); // <ol> の前に文字列 "before" を挿入します
  ol.after('after'); // <ol> の後に文字列 "after" を挿入します

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // <ol> の先頭に liFirst を挿入します

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // <ol> の末に文字列 liLast を挿入します
</script>
```

これはメソッドがしていることを示す図です:

![](before-prepend-append-after.svg)

なので、最終的には次のようなリストになります:

```html
before
<ol id="ol">
  <li>prepend</li>
  <li>0</li>
  <li>1</li>
  <li>2</li>
  <li>append</li>
</ol>
after
```

これらのメソッドは1回の呼び出しで複数のノードやテキストのリストを挿入できます。

例えば、これは文字列と要素が挿入されます:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

すべてのテキストは *テキストとして* 挿入されます。

なので、最終的なHTMLは次のようになります:

```html run
*!*
&lt;p&gt;Hello&lt;/p&gt;
*/!*
<hr>
<div id="div"></div>
```

つまり、`elem.textContent` が行うように、文字列は安全な方法で挿入されます。

従って、これらのメソッドは DOM ノードまたはテキストを挿入するためにのみ使うことができます。

しかし、仮に `elem.innerHTML` のようにすべてのタグやものが動作するよう、 "HTML として" HTMLを挿入したい場合にはどうすればよいでしょう？

### insertAdjacentHTML/Text/Element

そのための、別の非常に用途の広いメソッドが使用できます: `elem.insertAdjacentHTML(where, html)`。

最初のパラメータは文字列で、`elem` を基準にした挿入場所を指定します。次のいずれかでなければなりません:

- `"beforebegin"` -- `elem` の直前に `html` を挿入します,
- `"afterbegin"` -- `elem` の中の先頭に `html` を挿入します,
- `"beforeend"` -- `elem` の中の末尾に `html` を挿入します,
- `"afterend"` -- `elem` の直後に `html` を挿入します.

2つ目のパラメータは "そのまま" 挿入されるHTML文字列です。

例:

```html run
<div id="div"></div>
<script>
  div.insertAdjacentHTML('beforebegin', '<p>Hello</p>');
  div.insertAdjacentHTML('afterend', '<p>Bye</p>');
</script>
```

...は次のようになります:

```html run
<p>Hello</p>
<div id="div"></div>
<p>Bye</p>
```

これは任意のHTMLをページに追加できる方法です。

これは挿入バリエーションの図です:

![](insert-adjacent.svg)

これと前の図との類似点は簡単に気づけます。 挿入箇所は実際には同じですが、このメソッドはHTMLを挿入します。

メソッドは2つの兄弟がいます:

- `elem.insertAdjacentText(where, text)` -- 同じ構文ですが、HTML の代わりに "テキストとして" 挿入される `text` の文字列です。
- `elem.insertAdjacentElement(where, elem)` -- 同じ構文ですが、要素を挿入します。

これらは主に構文を "統一的" にするために存在します。実際にはほぼ `insertAdjacentHTML` だけが使われます。なぜなら、要素やテキストに対しては、`append/prepend/before/after` というメソッドがあるためです -- これらはより短く書くことができ、ノード/テキストの部分を挿入することが可能です。

したがって、これはメッセージを表示する別の方法です:

```html run
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

## ノードの削除

ノードを削除するための、`node.remove()` メソッドがあります。

1秒後にメッセージを消してみましょう:

```html run untrusted
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<script>
  let div = document.createElement('div');
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
*/!*
</script>
```

注意: 要素を別の場所に *移動* させたい場合は、前の場所から削除する必要はありません。

**すべての挿入メソッドは自動的に前の場所からノードを削除します。**

例えば、要素を入れ替えてみましょう:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 削除呼び出しは不要です
  second.after(first); // #second を取り、その後に #first を挿入します
</script>
```

## ノードのクローン: cloneNode 

似たようなメッセージを複数挿入するにはどうすればよいでしょう？

関数を作成してコードを書くことができました。 しかし、別の方法は、既存の `div` を *クローン* し、その中のテキストを変更することです（必要であれば）。

大きな要素があるケースで、この方法がより速くシンプルになる場合があります。

- 呼び出し `elem.cloneNode(true)` は、すべての属性とサブ要素を含む要素の "ディープ" クローンを作成します。もし `elem.cloneNode(false)` を呼び出すと、子要素なしのクローンが作られます。

メッセージをコピーする例です:

```html run height="120"
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert" id="div">
  <strong>Hi there!</strong> You've read an important message.
</div>

<script>
*!*
  let div2 = div.cloneNode(true); // メッセージをクローンします
  div2.querySelector('strong').innerHTML = 'Bye there!'; // クローンを変更します

  div.after(div2); // 既存の div の後に div2 を表示
*/!*
</script>
```

## DocumentFragment [#document-fragment]

`DocumentFragment` はノードのリストを渡すためのラッパーとして機能する特別な DOM ノードです。

`DocumentFragment` へ他のノードを追加することができます。これを挿入する際は代わりにそのコンテンツが挿入されます。

例えば、以下の `getListContent` は `<li>` のアイテムのフラグメントを生成し、後で `<ul>` に挿入されます。 

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

*!*
ul.append(getListContent()); // (*)
*/!*
</script>
```

最後の行 `(*)` では、`DocumentFragmet` を追加していますが、そのコンテンツが挿入されるので、結果の構造は次のようになります:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` は明示的にはめったに使用されません。代わりにノードの配列を返すことができるからです。書き直した例です：

```html run
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

*!*
ul.append(...getListContent()); // append + "..." operator = friends!
*/!*
</script>
```

`DocumentFragment` について言及するのは、主に、[template](info:template-element)要素のように、その上にいくつかの概念があるためです。これについては、後で説明します。

## 古典的な挿入/削除メソッド

[old]

歴史的な理由から、"古典的な" DOM 操作メソッドもあります。

これらのメソッドは本当に過去からありました。最近では  `append`, `prepend`, `before`, `after`, `remove`, `replaceWith` のようなモダンなメソッドがあり、こちらのほうがより柔軟なので、古いメソッドを使う理由はありません。 

ここにこれらのメソッドをリストしているのは、古いスクリプトで目にする可能性があるためです:

`parentElem.appendChild(node)`
: `parentElem` の末尾の子供として `node` を追加します。

    次の例は、新しい `<li>` を `<ol>` の末尾に追加します。:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

      list.appendChild(newLi);
    </script>
    ```

`parentElem.insertBefore(node, nextSibling)`
: `parentElem` の中で `nextSibling` の前に `node` を挿入します。

    次のコードは、2つ目の `<li>` の前に新しいリスト項目を挿入します:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>
    <script>
      let newLi = document.createElement('li');
      newLi.innerHTML = 'Hello, world!';

    *!*
      list.insertBefore(newLi, list.children[1]);
    */!*
    </script>
    ```
    最初の要素として `newLi` を挿入するには、次のようにします:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: `parentElem` の子の中で `oldChild` を `node` に置き換えます。

`parentElem.removeChild(node)`
: `parentElem` から `node` を削除します（`node` がその子であると想定）。

    次の例は `<ol>` から最初の `<li>` を削除します。:

    ```html run height=100
    <ol id="list">
      <li>0</li>
      <li>1</li>
      <li>2</li>
    </ol>

    <script>
      let li = list.firstElementChild;
      list.removeChild(li);
    </script>
    ```

これらのすべてのメソッドは挿入/削除されたノードを返します。つまり、`parentElem.appendChild(node)`は `node` を返します。ですが、通常返却値は使用されず、メソッドを実行するのみです。

## "document.write" について 

もう1つ、webページに何かを追加する非常に古い方法があります: `document.write` です。

構文:

```html run
<p>Somewhere in the page...</p>
*!*
<script>
  document.write('<b>Hello from JS</b>');
</script>
*/!*
<p>The end</p>
```

`document.write(html)` の呼び出しは `html` を "すぐにその場で" ページに書き込みます。`html` 文字列を動的に生成することができるので柔軟性があります。JavaScriptで本格的なWebページを作成し、書き出すことができます。

このメソッドは DOMがなく、標準もないときに出来ました... 本当に昔です。まだ使用しているスクリプトがあるので生きています。

重要な制約があるため、最近のスクリプトで見かけることはほとんどありません。

**`document.write`の呼び出しはページがロードされている間だけ動作します。**

もしその後に呼び出されると、既存のドキュメントのコンテンツが削除されます。

例:

```html run
<p>After one second the contents of this page will be replaced...</p>
*!*
<script>
  // 1秒後に document.write をします
  // それはページがロードされた後です、なのでそれは既存のコンテンツを削除します
  setTimeout(() => document.write('<b>...By this.</b>'), 1000);
</script>
*/!*
```

したがって、上で取り上げたような他の DOMメソッドとは異なり、"ロード後" の段階では利用できません。

それは欠点です。

利点もあります。技術的には、ブラウザがまだ HTML を読んでいる（パースしている）間に `document.write` が呼び出され、何かを追加すると、ブラウザは HTML テキストに最初からそこにあったかのように処理します。

これは *DOMの修正がないため* 驚くほど速く動作します。DOMがまだビルドされていない間、それは直接ページテキストに書き込み、ブラウザは生成時にそれをDOMを挿入します。

なので、HTMLの動的に多くのテキストを追加する必要があり、またページをロードするフェーズであること、速度を考慮する必要がある場合には役立ちます。ですが、実際にはこれらの要件が一緒に来ることは殆どありません。通常、このメソッドを見るときは、単に古いスクリプトだからと言う理由です。

## サマリ 

- 新しいノードを生成するメソッド:
    - `document.createElement(tag)` -- 指定されたタグの要素を作成します
    - `document.createTextNode(value)` -- テキストノードを作成します(めったに使われません),
    - `elem.cloneNode(deep)` -- 要素をクローンします。 `deep==true` の場合、すべての子孫も含みます。  

- 挿入と削除:
  - `node.append(...nodes or strings)` -- `node` の末尾に追加します,
  - `node.prepend(...nodes or strings)` -- `node` の先頭に挿入します,
  - `node.before(...nodes or strings)` –- `node` の前に追加します,
  - `node.after(...nodes or strings)` –- `node` の後に追加します,
  - `node.replaceWith(...nodes or strings)` –- `node` を置き換えます。
  - `node.remove()` –- `node` を削除します.

  テキスト文字列は "テキストとして" 挿入されます。

- "古典的な" メソッドもあります:
  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  これらのメソッドはすべて `node` を返します。

- 指定された HTML の一部: `elem.insertAdjacentHTML(where, html)`, `where` に応じて挿入します:
  - `"beforebegin"` -- `elem` の前に `html` を挿入します,
  - `"afterbegin"` -- `elem` の中の先頭に `html` を挿入します,
  - `"beforeend"` -- `elem` の中の末尾に `html` を挿入します,
  - `"afterend"` -- `elem` の後に `html` を挿入します.

  また、類似メソッド `elem.insertAdjacentText` と `elem.insertAdjacentElement` があり、それらはテキスト文字列と要素を挿入しますが、めったに使われません。

- 読み込みが完了する前にページにHTMLを追加するには:
  - `document.write(html)`

  ページが読み込まれた後、この呼び出しはドキュメントを削除します。ほぼ古いスクリプトで見られます。
