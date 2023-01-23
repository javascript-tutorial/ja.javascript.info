# ドキュメントの変更

<<<<<<< HEAD
DOMの変更は "動的な" ページを作成するための鍵です。
=======
DOM modification is the key to creating "live" pages.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ここでは、新しい要素を "その場" で作成し、既存のページのコンテンツを変更する方法を見ていきます。

<<<<<<< HEAD
## 例: メッセージを表示 

`alert` よりも見栄えの良いメッセージをページに追加する方法を見てみましょう。

次のように見えます:
=======
## Example: show a message

Let's demonstrate using an example. We'll add a message on the page that looks nicer than `alert`.

Here's how it will look:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
これは HTML の例です。では JavaScript で同じ `div` を作ってみましょう(スタイルは HTML の中、もしくは外部CSSにあるとします)。

## 要素の作成 

DOM ノードを作成するメソッドが2つあります。:

`document.createElement(tag)`
: 指定されたタグの新しい *要素ノード* を作成します:
=======
That was the HTML example. Now let's create the same `div` with JavaScript (assuming that the styles are in the HTML/CSS already).

## Creating an element

To create DOM nodes, there are two methods:

`document.createElement(tag)`
: Creates a new *element node* with the given tag:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    let div = document.createElement('div');
    ```

`document.createTextNode(text)`
: 指定されたテキストの新しい *テキストノード* を作成します:

    ```js
    let textNode = document.createTextNode('Here I am');
    ```

<<<<<<< HEAD
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
=======
Most of the time we need to create element nodes, such as the `div` for the message.

### Creating the message

Creating the message div takes 3 steps:

```js
// 1. Create <div> element
let div = document.createElement('div');

// 2. Set its class to "alert"
div.className = "alert";

// 3. Fill it with the content
div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
```

We've created the element. But as of now it's only in a variable named `div`, not in the page yet. So we can't see it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 挿入メソッド 

<<<<<<< HEAD
`div` を表示するためには、`document` のどこかに挿入する必要があります。例えば、`document.body` で参照できる `<body>` 要素の中です。

そのための特別なメソッドがあります: `document.body.appendChild(div)`.
=======
To make the `div` show up, we need to insert it somewhere into `document`. For instance, into `<body>` element, referenced by `document.body`.

There's a special method `append` for that: `document.body.append(div)`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

*!*
  document.body.append(div);
*/!*
</script>
```

<<<<<<< HEAD
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
=======
Here we called `append` on `document.body`, but we can call `append` method on any other element, to put another element into it. For instance, we can append something to `<div>` by calling `div.append(anotherElement)`.

Here are more insertion methods, they specify different places where to insert:

- `node.append(...nodes or strings)` -- append nodes or strings *at the end* of `node`,
- `node.prepend(...nodes or strings)` -- insert nodes or strings *at the beginning* of `node`,
- `node.before(...nodes or strings)` –- insert nodes or strings *before* `node`,
- `node.after(...nodes or strings)` –- insert nodes or strings *after* `node`,
- `node.replaceWith(...nodes or strings)` –- replaces `node` with the given nodes or strings.

Arguments of these methods are an arbitrary list of DOM nodes to insert, or text strings (that become text nodes automatically).

Let's see them in action.

Here's an example of using these methods to add items to a list and the text before/after it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun
<ol id="ol">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>

<script>
<<<<<<< HEAD
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
=======
  ol.before('before'); // insert string "before" before <ol>
  ol.after('after'); // insert string "after" after <ol>

  let liFirst = document.createElement('li');
  liFirst.innerHTML = 'prepend';
  ol.prepend(liFirst); // insert liFirst at the beginning of <ol>

  let liLast = document.createElement('li');
  liLast.innerHTML = 'append';
  ol.append(liLast); // insert liLast at the end of <ol>
</script>
```

Here's a visual picture of what the methods do:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
これらのメソッドは1回の呼び出しで複数のノードやテキストのリストを挿入できます。
=======
As said, these methods can insert multiple nodes and text pieces in a single call.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、これは文字列と要素が挿入されます:

```html run
<div id="div"></div>
<script>
  div.before('<p>Hello</p>', document.createElement('hr'));
</script>
```

<<<<<<< HEAD
すべてのテキストは *テキストとして* 挿入されます。
=======
Please note: the text is inserted "as text", not "as HTML", with proper escaping of characters such as `<`, `>`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
しかし、仮に `elem.innerHTML` のようにすべてのタグやものが動作するよう、 "HTML として" HTMLを挿入したい場合にはどうすればよいでしょう？
=======
But what if we'd like to insert an HTML string "as html", with all tags and stuff working, in the same manner as `elem.innerHTML` does it?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## insertAdjacentHTML/Text/Element

<<<<<<< HEAD
そのための、別の非常に用途の広いメソッドが使用できます: `elem.insertAdjacentHTML(where, html)`。

最初のパラメータは文字列で、`elem` を基準にした挿入場所を指定します。次のいずれかでなければなりません:

- `"beforebegin"` -- `elem` の直前に `html` を挿入します,
- `"afterbegin"` -- `elem` の中の先頭に `html` を挿入します,
- `"beforeend"` -- `elem` の中の末尾に `html` を挿入します,
- `"afterend"` -- `elem` の直後に `html` を挿入します.

2つ目のパラメータは "そのまま" 挿入されるHTML文字列です。
=======
For that we can use another, pretty versatile method: `elem.insertAdjacentHTML(where, html)`.

The first parameter is a code word, specifying where to insert relative to `elem`. Must be one of the following:

- `"beforebegin"` -- insert `html` immediately before `elem`,
- `"afterbegin"` -- insert `html` into `elem`, at the beginning,
- `"beforeend"` -- insert `html` into `elem`, at the end,
- `"afterend"` -- insert `html` immediately after `elem`.

The second parameter is an HTML string, that is inserted "as HTML".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
これは任意のHTMLをページに追加できる方法です。
=======
That's how we can append arbitrary HTML to the page.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは挿入バリエーションの図です:

![](insert-adjacent.svg)

これと前の図との類似点は簡単に気づけます。 挿入箇所は実際には同じですが、このメソッドはHTMLを挿入します。

メソッドは2つの兄弟がいます:

<<<<<<< HEAD
- `elem.insertAdjacentText(where, text)` -- 同じ構文ですが、HTML の代わりに "テキストとして" 挿入される `text` の文字列です。
- `elem.insertAdjacentElement(where, elem)` -- 同じ構文ですが、要素を挿入します。

これらは主に構文を "統一的" にするために存在します。実際にはほぼ `insertAdjacentHTML` だけが使われます。なぜなら、要素やテキストに対しては、`append/prepend/before/after` というメソッドがあるためです -- これらはより短く書くことができ、ノード/テキストの部分を挿入することが可能です。
=======
- `elem.insertAdjacentText(where, text)` -- the same syntax, but a string of `text` is inserted "as text" instead of HTML,
- `elem.insertAdjacentElement(where, elem)` -- the same syntax, but inserts an element.

They exist mainly to make the syntax "uniform". In practice, only `insertAdjacentHTML` is used most of the time. Because for elements and text, we have methods `append/prepend/before/after` -- they are shorter to write and can insert nodes/text pieces.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
  document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>Hi there!</strong> You've read an important message.
  </div>`);
</script>
```

<<<<<<< HEAD
## ノードの削除
=======
## Node removal

To remove a node, there's a method `node.remove()`.

Let's make our message disappear after a second:

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

Please note: if we want to *move* an element to another place -- there's no need to remove it from the old one.

**All insertion methods automatically remove the node from the old place.**

For instance, let's swap elements:

```html run height=50
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // no need to call remove
  second.after(first); // take #second and after it insert #first
</script>
```

## Cloning nodes: cloneNode
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ノードを削除するための、`node.remove()` メソッドがあります。

<<<<<<< HEAD
1秒後にメッセージを消してみましょう:
=======
We could make a function and put the code there. But the alternative way would be to *clone* the existing `div` and modify the text inside it (if needed).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
`DocumentFragment` はノードのリストを渡すためのラッパーとして機能する特別な DOM ノードです。

`DocumentFragment` へ他のノードを追加することができます。これを挿入する際は代わりにそのコンテンツが挿入されます。

例えば、以下の `getListContent` は `<li>` のアイテムのフラグメントを生成し、後で `<ul>` に挿入されます。 
=======
`DocumentFragment` is a special DOM node that serves as a wrapper to pass around lists of nodes.

We can append other nodes to it, but when we insert it somewhere, then its content is inserted instead.

For example, `getListContent` below generates a fragment with `<li>` items, that are later inserted into `<ul>`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
最後の行 `(*)` では、`DocumentFragmet` を追加していますが、そのコンテンツが挿入されるので、結果の構造は次のようになります:
=======
Please note, at the last line `(*)` we append `DocumentFragment`, but it "blends in", so the resulting structure will be:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

<<<<<<< HEAD
`DocumentFragment` は明示的にはめったに使用されません。代わりにノードの配列を返すことができるからです。書き直した例です：
=======
`DocumentFragment` is rarely used explicitly. Why append to a special kind of node, if we can return an array of nodes instead? Rewritten example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
`DocumentFragment` について言及するのは、主に、[template](info:template-element)要素のように、その上にいくつかの概念があるためです。これについては、後で説明します。

## 古典的な挿入/削除メソッド

[old]

歴史的な理由から、"古典的な" DOM 操作メソッドもあります。

これらのメソッドは本当に過去からありました。最近では  `append`, `prepend`, `before`, `after`, `remove`, `replaceWith` のようなモダンなメソッドがあり、こちらのほうがより柔軟なので、古いメソッドを使う理由はありません。 

ここにこれらのメソッドをリストしているのは、古いスクリプトで目にする可能性があるためです:

`parentElem.appendChild(node)`
: `parentElem` の末尾の子供として `node` を追加します。

    次の例は、新しい `<li>` を `<ol>` の末尾に追加します。:
=======
We mention `DocumentFragment` mainly because there are some concepts on top of it, like [template](info:template-element) element, that we'll cover much later.

## Old-school insert/remove methods

[old]

There are also "old school" DOM manipulation methods, existing for historical reasons.

These methods come from really ancient times. Nowadays, there's no reason to use them, as modern methods, such as `append`, `prepend`, `before`, `after`, `remove`, `replaceWith`, are more flexible.

The only reason we list these methods here is that you can find them in many old scripts:

`parentElem.appendChild(node)`
: Appends `node` as the last child of `parentElem`.

    The following example adds a new `<li>` to the end of `<ol>`:

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
: Inserts `node` before `nextSibling` into `parentElem`.

    The following code inserts a new list item before the second `<li>`:

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
    To insert `newLi` as the first element, we can do it like this:

    ```js
    list.insertBefore(newLi, list.firstChild);
    ```

`parentElem.replaceChild(node, oldChild)`
: Replaces `oldChild` with `node` among children of `parentElem`.

`parentElem.removeChild(node)`
: Removes `node` from `parentElem` (assuming `node` is its child).

    The following example removes first `<li>` from `<ol>`:

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

All these methods return the inserted/removed node. In other words, `parentElem.appendChild(node)` returns `node`. But usually the returned value is not used, we just run the method.

## A word about "document.write"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
このメソッドは DOMがなく、標準もないときに出来ました... 本当に昔です。まだ使用しているスクリプトがあるので生きています。

重要な制約があるため、最近のスクリプトで見かけることはほとんどありません。
=======
The method comes from times when there was no DOM, no standards... Really old times. It still lives, because there are scripts using it.

In modern scripts we can rarely see it, because of the following important limitation:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
それは欠点です。

利点もあります。技術的には、ブラウザがまだ HTML を読んでいる（パースしている）間に `document.write` が呼び出され、何かを追加すると、ブラウザは HTML テキストに最初からそこにあったかのように処理します。

これは *DOMの修正がないため* 驚くほど速く動作します。DOMがまだビルドされていない間、それは直接ページテキストに書き込み、ブラウザは生成時にそれをDOMを挿入します。
=======
That's the downside.

There's an upside also. Technically, when `document.write` is called while the browser is reading ("parsing") incoming HTML, and it writes something, the browser consumes it just as if it were initially there, in the HTML text.

So it works blazingly fast, because there's *no DOM modification* involved. It writes directly into the page text, while the DOM is not yet built.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

なので、HTMLの動的に多くのテキストを追加する必要があり、またページをロードするフェーズであること、速度を考慮する必要がある場合には役立ちます。ですが、実際にはこれらの要件が一緒に来ることは殆どありません。通常、このメソッドを見るときは、単に古いスクリプトだからと言う理由です。

## サマリ 

<<<<<<< HEAD
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
=======
- Methods to create new nodes:
    - `document.createElement(tag)` -- creates an element with the given tag,
    - `document.createTextNode(value)` -- creates a text node (rarely used),
    - `elem.cloneNode(deep)` -- clones the element, if `deep==true` then with all descendants.  

- Insertion and removal:
    - `node.append(...nodes or strings)` -- insert into `node`, at the end,
    - `node.prepend(...nodes or strings)` -- insert into `node`, at the beginning,
    - `node.before(...nodes or strings)` –- insert right before `node`,
    - `node.after(...nodes or strings)` –- insert right after `node`,
    - `node.replaceWith(...nodes or strings)` –- replace `node`.
    - `node.remove()` –- remove the `node`.

    Text strings are inserted "as text".

- There are also "old school" methods:
    - `parent.appendChild(node)`
    - `parent.insertBefore(node, nextSibling)`
    - `parent.removeChild(node)`
    - `parent.replaceChild(newElem, node)`

    All these methods return `node`.

- Given some HTML in `html`, `elem.insertAdjacentHTML(where, html)` inserts it depending on the value of `where`:
    - `"beforebegin"` -- insert `html` right before `elem`,
    - `"afterbegin"` -- insert `html` into `elem`, at the beginning,
    - `"beforeend"` -- insert `html` into `elem`, at the end,
    - `"afterend"` -- insert `html` right after `elem`.

    Also there are similar methods, `elem.insertAdjacentText` and `elem.insertAdjacentElement`, that insert text strings and elements, but they are rarely used.

- To append HTML to the page before it has finished loading:
    - `document.write(html)`

    After the page is loaded such a call erases the document. Mostly seen in old scripts.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
