# ドキュメントの変更

DOMの変更は "ライブ" ページを作成するための鍵です。

ここでは、新しい要素を "その場" で作成し、既存のページコンテンツを変更する方法を見ていきます。

まず、簡単な例を見てメソッドを説明します。

<<<<<<< HEAD
[cut]

## 例: メッセージを表示 

はじめに、`alert` よりも見栄えの良いメッセージをページに追加する方法を見てみましょう。
=======
## Example: show a message

For a start, let's see how to add a message on the page that looks nicer than `alert`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

次のように見えるとしましょう:

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

<<<<<<< HEAD
これは HTML の例でした。では JavaScript で同じ `div` を作ってみましょう(スタイルは依然として HTML の中、もしくは外部CSSにあると想定します)。
=======
That was an HTML example. Now let's create the same `div` with JavaScript (assuming that the styles are still in the HTML or an external CSS file).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## 要素の作成 

DOM ノードを作成するためのメソッドが2つあります。:

`document.createElement(tag)`
<<<<<<< HEAD
: 与えられたタグの新しい要素を作成します:
=======
: Creates a new *element node* with the given tag:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: 与えられたテキストの新しい *テキストノード* を作成します:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

### メッセージの作成 

我々のケースでは、与えられたクラスとメッセージをその中にもつ `div` を作りたいです。:

```js
let div = document.createElement('div');
div.className = "alert alert-success";
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

<<<<<<< HEAD
これで、準備ができたDOM要素があります。 今は変数に入っていますが、まだページには挿入されていないため見えません。
=======
After that, we have our DOM element ready. Right now it is just in a variable and we cannot see it. That is because it's not yet inserted into the page.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## 挿入メソッド 

`div` を表示するためには、`document` のどこかに挿入する必要があります。例えば、`document.body` です。

<<<<<<< HEAD
そのための特別なメソッドがあります: `document.body.appendChild(div)`.
=======
There's a special method `appendChild` for that: `document.body.appendChild(div)`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

ここに、親要素(略して `parentElem` )へノードを挿入するメソッドの簡単なリストを示します:

`parentElem.appendChild(node)`
: `parentElem` の最後の子として `node` を追加します。

    次の例は新しい `<li>` を `<ol>` の末尾に追加します:

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
: `parentElem` の中の `nextSibling` の前に `node` を挿入します。

    次のコードは2つ目の `<li>` の前に新しいリストアイテムを挿入します:

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
<<<<<<< HEAD

    最初の要素として挿入するには、このようにします:
=======
    To insert `newLi` as the first element, we can do it like this:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: `parentElem` の子供の間の `oldChild` を `node` に置き換えます。

これらすべてのメソッドは挿入したノードを返します。言い換えると、`parentElem.appendChild(node)` は `node` を返します。しかし通常は返却値は使わず、単にメソッドを実行するだけです。

<<<<<<< HEAD
これらのメソッドは "古い学校" です: これらは古代から存在し、多くの古いスクリプトで見ることができます。残念なことに、それらでは解決するのが難しい作業がいくつかあります。

例えば、文字列として持っている *html* を挿入する方法は？もしくは指定されたノードに対し、その *前* に別のノードを挿入する方法は？ もちろん、すべて実行可能ですが、エレガントな方法ではありません。

したがって、簡単にすべてのケースを処理する2つの挿入メソッドセットが存在します。
=======
These methods are "old school": they exist from the ancient times and we can meet them in many old scripts. Unfortunately, they are not flexible enough.

For instance, how to insert *html* if we have it as a string? Or, given a node, without reference to its parent, how to remove it? Of course, that's doable, but not in an elegant way.

So there exist two other sets of insertion methods to handle all cases easily.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

### prepend/append/before/after

このメソッドのセットはより柔軟な挿入を提供します:

- `node.append(...nodes or strings)` -- `node` の末尾にノードまたは文字列を追加します,
- `node.prepend(...nodes or strings)` -- `node` の先頭にノードまたは文字列を挿入します,
- `node.before(...nodes or strings)` –- `node` の前にノードまたは文字列を追加します,
- `node.after(...nodes or strings)` –- `node` の後にノードまたは文字列を追加します,
- `node.replaceWith(...nodes or strings)` –- `node` を与えられたノードまたは文字列で置き換えます。

<<<<<<< HEAD
これらのメソッドを使用して、リストに項目を追加し、項目の前後にテキストを追加する例を次に示します。:
=======
All of them accept a list of DOM nodes and/or text strings. If a string is given it's inserted as a text node.

Here's an example of using these methods to add more items to a list and the text before/after it:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
  ol.before('before');
  ol.after('after');

  let prepend = document.createElement('li');
  prepend.innerHTML = 'prepend';
  ol.prepend(prepend);  

  let append = document.createElement('li');
  append.innerHTML = 'append';
  ol.append(append);
</script>
```

これはメソッドがしていることを示す図です:

![](before-prepend-append-after.png)

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

<<<<<<< HEAD
これらのメソッドは1回の呼び出しで複数のノードやテキストのリストを挿入できます。
=======
These methods can insert multiple lists of nodes and text pieces in a single call.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

言い換えると、`elem.textContent` がするように、文字列は安全な方法で挿入されています。

従って、これらのメソッドは DOM ノードまたはテキストを挿入するためにのみ使うことができます。

しかし、仮に `elem.innerHTML` のようにすべてのタグやものが動作するよう、 "HTML として" HTMLを挿入したい場合にはどうすればよいでしょう？

### insertAdjacentHTML/Text/Element

もう1つ、非常に多彩なメソッドがあります: `elem.insertAdjacentHTML（where、html）`。

<<<<<<< HEAD
最初のパラメータは文字列で、挿入場所を指定し、次のどれかでなければなりません:

- `"beforebegin"` -- `elem` の前に `html` を挿入します,
- `"afterbegin"` -- `elem` の中の先頭に `html` を挿入します,
- `"beforeend"` -- `elem` の中の末尾に `html` を挿入します,
- `"afterend"` -- `elem` の後に `html` を挿入します.

2つ目のパラメータは "そのまま" 挿入されるHTML文字列です。
=======
The first parameter is a code word, specifying where to insert relative to `elem`. Must be one of the following:

- `"beforebegin"` -- insert `html` immediately before `elem`,
- `"afterbegin"` -- insert `html` into `elem`, at the beginning,
- `"beforeend"` -- insert `html` into `elem`, at the end,
- `"afterend"` -- insert `html` immediately after `elem`.

The second parameter is an HTML string, that is inserted "as HTML".
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

![](insert-adjacent.png)

これと前の図との類似点は簡単に気づけます。 挿入ポイントは実際には同じですが、このメソッドはHTMLを挿入します。

メソッドは2つの兄弟がいます:

<<<<<<< HEAD
- `elem.insertAdjacentText(where, text)` -- 同じ構文ですが、HTML の代わりに "テキストとして" 挿入される `text` の文字列です。
- `elem.insertAdjacentElement(where, elem)` -- 同じ構文ですが、要素を挿入します。

これらは主に構文を "統一的" にするために存在します。実際にはほぼ `insertAdjacentHTML` だけが使われます。なぜなら、要素やテキストに対しては、`append/prepend/before/after` というメソッドがあるためです -- これらはより短く書くことができ、ノード/テキストの部分を挿入することが可能です。
=======
- `elem.insertAdjacentText(where, text)` -- the same syntax, but a string of `text` is inserted "as text" instead of HTML,
- `elem.insertAdjacentElement(where, elem)` -- the same syntax, but inserts an element.

They exist mainly to make the syntax "uniform". In practice, only `insertAdjacentHTML` is used most of the time. Because for elements and text, we have methods `append/prepend/before/after` -- they are shorter to write and can insert nodes/text pieces.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

## ノードのクローン:cloneNode 

似たようなメッセージを複数挿入するにはどうすればよいでしょう？

<<<<<<< HEAD
我々は関数を実行してコードをそこに置くことができました。 しかし、別の方法は、既存の `div` を *クローン* し、その中のテキストを変更することです（必要な場合）。
=======
We could make a function and put the code there. But the alternative way would be to *clone* the existing `div` and modify the text inside it (if needed).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

大きな要素を持っているケースで、この方法がより速くシンプルになる場合があります。

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

<<<<<<< HEAD
## 削除メソッド 

ノードを削除するために、次のメソッドがあります:


`parentElem.removeChild(node)`
: `parentElem` から `node` を削除します(`parentElem` の子と想定)
=======

## DocumentFragment [#document-fragment]

`DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes.

We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

For example, `getListContent` below generates a fragment with `<li>` items, that are later inserted into `<ul>`:

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

Please note, at the last line `(*)` we append `DocumentFragment`, but it "blends in", so the resulting structure will be:

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

`DocumentFragment` is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:

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

We mention `DocumentFragment` mainly because there are some concepts on top of it, like [template](info:template-element) element, that we'll cover much later.


## Removal methods

To remove nodes, there are the following methods:


`parentElem.removeChild(node)`
: Removes `node` from  `parentElem` (assuming it's a child).
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

`node.remove()`
: その場所から `node` を削除します。

2つ目のメソッドの方がはるかに短いのが分かると思います。1つ目のメソッドは歴史的な理由で存在しています。

````smart
もしある要素を別の場所に *移動* したいとき -- 古い場所からそれを除去する必要はありません。

**すべての挿入メソッドは自動的に古い場所からノードを削除します**

例えば、要素を入れ替えてみましょう:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // 削除呼び出しする必要はありません
  second.after(first); // #second の後に #first を挿入します
</script>
```
````

1秒後に消えるメッセージを作りましょう:

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
  div.className = "alert alert-success";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

  document.body.append(div);
*!*
  setTimeout(() => div.remove(), 1000);
  // もしくは setTimeout(() => document.body.removeChild(div), 1000);
*/!*
</script>
```

## "document.write" について 

もう1つ、webページに何かを追加する非常に古代の方法があります: `document.write` です。

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

`document.write(html)` の呼び出しは `html` を "すぐにその場で" ページに書き込みます。`html` 文字列は動的に生成することができるので、柔軟性があります。JavaScriptを使用して本格的なWebページを作成し、それを書き出すことができます。

<<<<<<< HEAD
このメソッドは DOMがなく、標準もないときに出来ました... 本当に昔です。それは、それを使っているスクリプトがあるので、まだ生きています。

現代のスクリプトでは、重要な制限があるためほとんど見かけません。
=======
The method comes from times when there was no DOM, no standards... Really old times. It still lives, because there are scripts using it.

In modern scripts we can rarely see it, because of the following important limitation:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

**`document.write`の呼び出しはページがロードされている間だけ動作します**

もしその後に呼び出した場合、既存のドキュメントのコンテンツが削除されます。

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

それは欠点でした。

<<<<<<< HEAD
技術的には、ブラウザがまだ HTML を読んでいる間に `document.write` が呼び出されると、それは何かを追加し、ブラウザは最初と同じようにそれを消費します。
=======
Technically, when `document.write` is called while the browser is reading ("parsing") incoming HTML, and it writes something, the browser consumes it just as it were initially there, in the   HTML text.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

それは我々に良い面をもたらします -- それは *DOMの修正がないため* 驚くほど速く動作します。DOMがまだビルドされていない間、それは直接ページテキストに書き込み、ブラウザは生成時にそれをDOMを挿入します。

なので、HTMLの動的に多くのテキストを追加する必要があり、またページをロードするフェーズであること、速度を考慮する必要がある場合にはそれは役立ちます。しかし実際にはこれらの要件が一緒に来ることは殆どありません。通常、このメソッドを見るときは、単に古いスクリプトだからと言う理由です。

## サマリ 

新しいノードを生成するメソッド:

- `document.createElement(tag)` -- 与えられたタグを要素を作成します
- `document.createTextNode(value)` -- テキストノードを作成します (めったに使われません)),
- `elem.cloneNode(deep)` -- 要素をクローンします。 `deep==true` の場合、すべての子孫も含みます。  

ノードの挿入と削除:

- 親から:
  - `parent.appendChild(node)`
  - `parent.insertBefore(node, nextSibling)`
  - `parent.removeChild(node)`
  - `parent.replaceChild(newElem, node)`

  これらのメソッドはすべて `node` を返します。

- 与えられたノードと文字列のリスト:
  - `node.append(...nodes or strings)` -- `node` の末尾に追加します,
  - `node.prepend(...nodes or strings)` -- `node` の先頭に挿入します,
  - `node.before(...nodes or strings)` –- `node` の前に追加します,
  - `node.after(...nodes or strings)` –- `node` の後に追加します,
  - `node.replaceWith(...nodes or strings)` –- `node` を置き換えます。
  - `node.remove()` –- `node` を削除します.

  テキスト文字列は "テキストとして" 挿入されます。

- 与えられた HTML の一部: `elem.insertAdjacentHTML(where, html)`, `where` に応じて挿入します:
  - `"beforebegin"` -- `elem` の前に `html` を挿入します,
  - `"afterbegin"` -- `elem` の中の先頭に `html` を挿入します,
  - `"beforeend"` -- `elem` の中の末尾に `html` を挿入します,
  - `"afterend"` -- `elem` の後に `html` を挿入します.

  また、類似メソッド `elem.insertAdjacentText` と `elem.insertAdjacentElement` があり、それらはテキスト文字列と要素を挿入しますが、めったに使われません。

- ロードが完了する前に、ページにHTMLをつかするには:
  - `document.write(html)`

<<<<<<< HEAD
  ページがロードされた後、この呼び出しはドキュメントを削除します。ほぼ古いスクリプトで見られます。
=======
  After the page is loaded such a call erases the document. Mostly seen in old scripts.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
