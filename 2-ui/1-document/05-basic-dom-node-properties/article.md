# ノードのプロパティ: タイプ、タグとコンテンツ

DOM ノードをより深く見ていきましょう。

<<<<<<< HEAD
このチャプターでは、それらが何者であるか、最もよく使われるプロパティについて詳しく見ていきます。

[cut]
=======
In this chapter we'll see more into what they are and learn their most used properties.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## DOM ノードクラス 

<<<<<<< HEAD
DOM ノードはそれらのクラスに応じて異なるプロパティを持っています。例えば、タグ `<a>` に対応する要素ノードはリンク関連のプロパティを持っており、`<input>` に対応する要素ノードは入力関連のプロパティを持っています。テキストノードは要素ノードとは違います。しかし、すべての DOM ノードのクラスは単一の階層を形成するため、すべてのノードの間で共通のプロパティやメソッドを持っています。
=======
Different DOM nodes may have different properties. For instance, an element node corresponding to tag `<a>` has link-related properties, and the one corresponding to `<input>` has input-related properties and so on. Text nodes are not the same as element nodes. But there are also common properties and methods between all of them, because all classes of DOM nodes form a single hierarchy.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

各 DOM ノードは対応する組み込みクラスに属しています。

階層のルートは [EventTarget](https://dom.spec.whatwg.org/#eventtarget) で、これは [Node](http://dom.spec.whatwg.org/#interface-node) により継承されています。また他の DOM ノードはそれを継承しています。

ここに、図と説明があります:

![](dom-class-hierarchy.svg)

The classes are:

<<<<<<< HEAD
- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- はルートの "抽象" クラスです。そのクラスのオブジェクトは決して生成されません。これはベースとして機能し、すべての DOM ノードはいわゆる "イベント" をサポートします。イベントについては後ほど学びます。
- [Node](http://dom.spec.whatwg.org/#interface-node) -- もまた "抽象" クラスで、DOM ノードの基底として機能します。これはコアなツリー機能を提供します。: `parentNode`, `nextSibling`, `childNodes` など(これらは getter です)。`Node` クラスのオブジェクトは決して生成されません。しかし、それを継承した具体的なノードクラス、即ち: テキストノードの `Text`, 要素ノードの `Element` やコメントノードの `Comment` のようによりエキゾチックなものもあります。
- [Element](http://dom.spec.whatwg.org/#interface-element) -- は DOM 要素のベースクラスです。それは、`nextElementSibling`, `children` や `getElementsByTagName`, `querySelector` のような検索メソッドといった要素レベルのナビゲーションを提供します。ブラウザでは、HTML だけでなく、XML や SVG のドキュメントがある場合もあります。`Element` クラスは ` SVGElement`、`XMLElement`、`HTMLElement` といったより具体的なクラスのベースとして機能します。
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- は最終的にすべてのHTML要素のベースクラスです。色々な HTML要素 がこれを継承しています。:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- `<input>` 要素のためのクラス,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- `<body>` 要素のためのクラス,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- `<a>`　要素のためのクラス
    - ...など、各タグは固有のプロパティやメソッドを提供する独自のクラスを持っています。
=======
- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- is the root "abstract" class. Objects of that class are never created. It serves as a base, so that all DOM nodes support so-called "events", we'll study them later.
- [Node](http://dom.spec.whatwg.org/#interface-node) -- is also an "abstract" class, serving as a base  for DOM nodes. It provides the core tree functionality: `parentNode`, `nextSibling`, `childNodes` and so on (they are getters). Objects of `Node` class are never created. But there are concrete node classes that inherit from it, namely: `Text` for text nodes, `Element` for element nodes and more exotic ones like `Comment` for comment nodes.
- [Element](http://dom.spec.whatwg.org/#interface-element) -- is a base class for DOM elements. It provides element-level navigation like `nextElementSibling`, `children` and searching methods like `getElementsByTagName`, `querySelector`. A browser supports not only HTML, but also XML and SVG. The `Element` class serves as a base for more specific classes: `SVGElement`, `XMLElement` and `HTMLElement`.
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- is finally the basic class for all HTML elements. It is inherited by concrete HTML elements:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- the class for `<input>` elements,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- the class for `<body>` elements,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- the class for `<a>` elements,
    - ...and so on.

There are many other tags with their own classes that may have specific properties and methods, while some elements, such as `<span>`, `<section>`, `<article>` do not have any specific properties, so they are instances of `HTMLElement` class.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

従って、指定されたノードのプロパティとメソッドのフルセットは継承の結果として得られます。

<<<<<<< HEAD
例えば、`<input>` 要素の DOM オブジェクトを考えてみましょう。これは [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) クラスに属しています。それは、次の重ね合わせとしてプロパティとメソッドを取得します。:

- `HTMLInputElement` -- このクラスは入力固有のプロパティを提供し、次を継承しています。
- `HTMLElement` -- 共通のHTML要素メソッド (とgetter/setter)を提供し、次を継承しています。
- `Element` -- 一般的な要素のメソッドを提供し、次を継承しています。
- `Node` -- 共通の DOM ノードのプロパティを提供し、次を継承しています。
- `EventTarget` -- (対象となる)イベントをサポートし、
- ...そして最後に、それは `Object` を継承しています。なので、`hasOwnProperty` のような "純粋なオブジェクト" メソッドも利用可能です。

DOM ノードのクラス名を見るに、オブジェクトは通常 `constructor` プロパティを持っていることを思い出してください。 これはクラスコンストラクタを参照し、 `constructor.name` はその名前です:
=======
For example, let's consider the DOM object for an `<input>` element. It belongs to [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) class.

It gets properties and methods as a superposition of (listed in inheritance order):

- `HTMLInputElement` -- this class provides input-specific properties,
- `HTMLElement` -- it provides common HTML element methods (and getters/setters),
- `Element` -- provides generic element methods,
- `Node` -- provides common DOM node properties,
- `EventTarget` -- gives the support for events (to be covered),
- ...and finally it inherits from `Object`, so "plain object" methods like `hasOwnProperty` are also available.

To see the DOM node class name, we can recall that an object usually has the `constructor` property. It references the class constructor, and `constructor.name` is its name:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```js run
alert( document.body.constructor.name ); // HTMLBodyElement
```

...もしくはその `toString`:

```js run
alert( document.body ); // [object HTMLBodyElement]
```

また、継承チェックに `instanceof` を使うこともできます:

```js run
alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

ご覧の通り、DOM ノードは通常の JavaScript オブジェクトです。それらは継承のためにプロトタイプベースのクラスを使います。

ブラウザ、`console.dir(elem)` を使った要素の出力でも簡単に見ることができます。コンソールでは、`HTMLElement.prototype`, `Element.prototype` などを見ることができます。

```smart header="`console.dir(elem)` VS `console.log(elem)`"
ほとんどのブラウザは、その開発者ツールで2つのコマンドをサポートしています。`console.log` と `console.dir` です。それらは引数をコンソールに出力します。JavaScript オブジェクトに対して、それらは通常同じ動作をします。

しかし、DOM 要素に対しては異なります。:

- `console.log(elem)` は要素の DOM ツリーを表示します
- `console.dir(elem)` は DOM オブジェクトとして要素を表示します。プロパティを調べるのには良いです。

`document.body` でそれを使ってみてください。
```

<<<<<<< HEAD
````smart header="仕様での IDL"
仕様では、クラスは JavaScript ではなく、特別な [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL) を使って説明されています。これは通常理解しやすいです。
=======
````smart header="IDL in the spec"
In the specification, DOM classes aren't described by using JavaScript, but a special [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL), that is usually easy to understand.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

IDL では、すべてのプロパティの型が前についています。例えば `DOMString`, `boolean` などです。

これはそこからの抜粋とコメントです:

```js
// HTMLInputElement の定義
*!*
// コロン ":" は HTMLInputElement は HTMLElement を継承していることを意味します。
*/!*
interface HTMLInputElement: HTMLElement {
  // ここに <input> 要素のプロパティとメソッドがあります

*!*
<<<<<<< HEAD
  // "DOMString" はプロパティが文字列であることを意味します。
=======
  // "DOMString" means that the value of a property is a string
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
<<<<<<< HEAD
  // boolean プロパティ (true/false)
=======
  // boolean value property (true/false)
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
  attribute boolean autofocus;
*/!*
  ...
*!*
<<<<<<< HEAD
  // ここはメソッドです: "void" は返却値なしを意味します。
=======
  // now the method: "void" means that the method returns no value
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
*/!*
  void select();
  ...
}
```
<<<<<<< HEAD

他のクラスもいくらか似ています。
=======
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
````

## "nodeType" プロパティ

<<<<<<< HEAD
`nodeType` プロパティは DOM ノードの "タイプ" を取得する昔ながらの方法を提供します。
=======
The `nodeType` property provides one more, "old-fashioned" way to get the "type" of a DOM node.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

それは次の数値を持っています:
- `elem.nodeType == 1` は要素ノード,
- `elem.nodeType == 3` はテキストノード,
- `elem.nodeType == 9` はドキュメントオブジェクト,
- [仕様](https://dom.spec.whatwg.org/#node) ではもういくつかの値があります。

例えば:

```html run
<body>
  <script>
  let elem = document.body;

  // それが何かを調べてみましょう
  alert(elem.nodeType); // 1 => element

  // 最初の子は...
  alert(elem.firstChild.nodeType); // 3 => text

  // ドキュメントオブジェクトは、タイプは 9 です
  alert( document.nodeType ); // 9
  </script>
</body>
```

現代のスクリプトでは、`instanceof` と他のクラスベースのテストを使ってノードタイプを見ることができますが、`nodeType` の方がシンプルなときもあります。`nodeType` は参照のみで変更はできません。

## タグ: nodeName と tagName 

与えられた DOM ノードに対して、`nodeName` または `tagName` プロパティでそのタグの名前を見ることができます。:

例:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

<<<<<<< HEAD
tagName と nodeName に違いはあるでしょうか？
=======
Is there any difference between `tagName` and `nodeName`?
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

もちろん、その違いはそれらの名前に反映されていますが、実際は少し微妙です。

<<<<<<< HEAD
- `tagName` プロパティは `Element` ノードに対してのみ存在します。
- `nodeName` は任意の `Node` で定義されています:
    - 要素の場合は、`tagName` と同じ意味です。
    - 他のノードタイプ(テキスト、コメントなど)の場合、ノードタイプの文字列を持ちます。

つまり、`tagName` は要素ノード(`Element` クラスから始まる)によってのみサポートされています。一方、`nodeName` は他のノードタイプについてな何か言うことができます。
=======
- The `tagName` property exists only for `Element` nodes.
- The `nodeName` is defined for any `Node`:
    - for elements it means the same as `tagName`.
    - for other node types (text, comment, etc.) it has a string with the node type.

In other words, `tagName` is only supported by element nodes (as it originates from `Element` class), while `nodeName` can say something about other node types.

For instance, let's compare `tagName` and `nodeName` for the `document` and a comment node:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

例えば、`document` ノードとコメントノードに対して、`tagName` と `nodeName` を比較してみましょう。:

```html run
<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined (not an element)
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined (not an element)
    alert( document.nodeName ); // #document
  </script>
</body>
```

<<<<<<< HEAD
もし要素だけを扱う場合、`tagName` だけを使うべきです。


```smart header="タグ名は XHTML を除いて常に大文字です"
ブラウザはドキュメントを処理する2つのモードを持っています。: HTML と XML です。通常webページではHTMLモードが使われます。XMLモードは、ブラウザがヘッダでXMLドキュメントを受け取ったときに有効になります。: `Content-Type: application/xml+xhtml`。
=======
If we only deal with elements, then we can use both `tagName` and `nodeName` - there's no difference.

```smart header="The tag name is always uppercase except in XML mode"
The browser has two modes of processing documents: HTML and XML. Usually the HTML-mode is used for webpages. XML-mode is enabled when the browser receives an XML-document with the header: `Content-Type: application/xml+xhtml`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

HTMLモードでは、`tagName/nodeName` は常に大文字です: `<body>` または `<BoDy>` は `BODY` です。

XMLモードでは、文字の大小は "そのまま" 維持されます。最近 XML モードはほとんど使われません。
```


## innerHTML: そのコンテンツ 

<<<<<<< HEAD
[innerHTML](https://w3c.github.io/DOM-Parsing/#widl-Element-innerHTML)プロパティは要素内の HTML を文字列として取得することができます。

我々はそれを変更することもできます。なので、ページを変更する最も強力な方法の1つです。
=======
The [innerHTML](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) property allows to get the HTML inside the element as a string.

We can also modify it. So it's one of the most powerful ways to change the page.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

この例は `document.body` のコンテンツを表示し、その後それを完全に置き換えます:

```html run
<body>
  <p>A paragraph</p>
  <div>A div</div>

  <script>
    alert( document.body.innerHTML ); // 現在の内容を読む
    document.body.innerHTML = 'The new BODY!'; // 置き換える
  </script>

</body>
```

<<<<<<< HEAD
無効な HTML を挿入しようとすると、ブラウザはエラーを修正します。:
=======
We can try to insert invalid HTML, the browser will fix our errors:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // タグのクローズ忘れ
    alert( document.body.innerHTML ); // <b>test</b> (修正された)
  </script>

</body>
```

<<<<<<< HEAD
```smart header="スクリプトは実行しません"
もし `innerHTML` が `<script>` タグをドキュメントに挿入した場合、-- それは実行しません。

それはすでに実行したスクリプトとして HTML の一部になります。
=======
```smart header="Scripts don't execute"
If `innerHTML` inserts a `<script>` tag into the document -- it becomes a part of HTML, but doesn't execute.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
```

### 注意: "innerHTML+=" は完全な置き換えをします

<<<<<<< HEAD
`elem.innerHTML+="何か"` を使って "より多くのHTML" を追加することができます。
=======
We can append HTML to an element by using `elem.innerHTML+="more html"`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

このように:

```js
chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
chatDiv.innerHTML += "How goes?";
```

しかし、これをする場合にはとても注意が必要です。なぜなら行われていることは追加 *ではなく* 完全な置き換えだからです。

技術的には、これらの2つの行は同じです:

```js
elem.innerHTML += "...";
// は、次のコードのより短い書き方です:
*!*
elem.innerHTML = elem.innerHTML + "..."
*/!*
```

つまり、`innerHTML+=` は次のことをします:

1. 古いコンテンツは削除されます。
2. 代わりに新しい `innerHTML` が書かれます(古いものと新しいものの連結)。


**コンテンツが "完全に取り除かれ" 、最初から書き直されると、すべての画像やその他のリソースはリロードされます**。

上の `chatDiv` の例では、行 `chatDiv.innerHTML+="How goes?"` は HTML コンテンツを再作成し、 `smile.gif` をリロードします(キャッシュされていることを望みます)。もし `chatDiv` が多くのテキストや画像を持っている場合、リロードがはっきり見えます。

同様に他の副作用もあります。例えば、既存のテキストがマウスで選択されていた場合、ほとんどのブラウザは再書き込みした `innerHTML` 上の選択を除去します。そして、訪問者によって入力されたテキストを持つ `<input>` が会った場合、そのテキストは除去されます、等。

幸い、`innerHTML` に加えてHTMLを追加する他の方法があります。すぐにそれらを見ていきます。

## outerHTML: 要素の完全な HTML

`outerHTML` プロパティは要素の完全な HTML を含みます。それは `innerHTML` に要素自身を加えたようなものです。

例:

```html run
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

<<<<<<< HEAD
**注意: `innerHTML` とは違い、`outerHTML` への書き込みは要素を変更しません。代わりに、それは外部のコンテキストでそれを全体として置き換えます。**
=======
**Beware: unlike `innerHTML`, writing to `outerHTML` does not change the element. Instead, it replaces it in the DOM.**
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

ええ、奇妙に聞こえ、それは確かに奇妙です。なのでそれについて別々のメモをします。見てみましょう:

例を考えてみましょう:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // div.outerHTML を <p>...</p> に置き換え
*/!*
  div.outerHTML = '<p>A new element</p>'; // (*)

*!*
<<<<<<< HEAD
  // なんと! div はまだ同じです!
=======
  // Wow! 'div' is still the same!
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```

<<<<<<< HEAD
行 `(*)` では、`<div>...</div>` の完全な HTML を取り、`<p>...</p>` によって置き換えます。外側のドキュメントでは、`<div>` の代わりに新しいコンテンツを見ることができます。しかし、古い `div` 変数は以前として同じです。
 
`outerHTML` の代入は DOM 要素を変更するのではなく、外側のコンテキストからそれを抽出し、代わりに新しい HTML の一部を挿入します。

初心者の開発者は時々ここで間違いをします: 彼らは `div.outerHTML` を修正し、`div` がまるで新しいコンテンツを持っているかのように処理を続けます。

それは `innerHTML` では可能ですが、`outerHTML` ではできません。

私達は `outerHTML` へ書き込みはできますが、書き込んでいる要素は変更されないことについて留意しておくべきです。代わりにその場所に新しいコンテンツを作成します。DOM に問い合わせることで新しい要素を参照することができます。
=======
Looks really odd, right?

In the line `(*)` we replaced `div` with `<p>A new element</p>`. In the outer document (the DOM) we can see the new content instead of the `<div>`. But, as we can see in line `(**)`, the value of the old `div` variable hasn't changed!

The `outerHTML` assignment does not modify the DOM element (the object referenced by, in this case, the variable 'div'), but removes it from the DOM and inserts the new HTML in its place.

So what happened in `div.outerHTML=...` is:
- `div` was removed from the document.
- Another piece of HTML `<p>A new element</p>` was inserted in its place.
- `div` still has its old value. The new HTML wasn't saved to any variable.

It's so easy to make an error here: modify `div.outerHTML` and then continue to work with `div` as if it had the new content in it. But it doesn't. Such thing is correct for `innerHTML`, but not for `outerHTML`.

We can write to `elem.outerHTML`, but should keep in mind that it doesn't change the element we're writing to ('elem'). It puts the new HTML in its place instead. We can get references to the new elements by querying the DOM.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## nodeValue/data: テキストノードのコンテンツ

`innerHTML` プロパティは要素ノードに対してのみ有効です。

<<<<<<< HEAD
他のノードタイプはそれらに対応するものを持っています: `nodeValue` と `data` プロパティです。これら2つは実際の利用ではほとんど同じで、仕様上少し違いがあるだけです。なので、より短い `data` を使います。

次のようにして `data` を読むことができます:
=======
Other node types, such as text nodes, have their counterpart: `nodeValue` and `data` properties. These two are almost the same for practical use, there are only minor specification differences. So we'll use `data`, because it's shorter.

An example of reading the content of a text node and a comment:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html run height="50"
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
*!*
    alert(text.data); // Hello
*/!*

    let comment = text.nextSibling;
*!*
    alert(comment.data); // Comment
*/!*
  </script>
</body>
```

<<<<<<< HEAD
テキストノードに対しては、それらが読めたり修正できる理由が想像できます。しかしなぜコメントも？通常それらは全く興味ありませんが、次のように開発者が HTML の中に情報を埋め込むことがあります。:
=======
For text nodes we can imagine a reason to read or modify them, but why comments?

Sometimes developers embed information or template instructions into HTML in them, like this:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

<<<<<<< HEAD
...そして、JavaScriptはそれを読み、埋め込まれた命令を処理することができます。
=======
...Then JavaScript can read it from `data` property and process embedded instructions.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## textContent: 純粋なテキスト

`textContent` は要素内の *テキスト* へのアクセスを提供します: テキストだけで、すべての `<tags>` を除きます。

例:

```html run
<div id="news">
  <h1>Headline!</h1>
  <p>Martians attack people!</p>
</div>

<script>
  // Headline! Martians attack people!
  alert(news.textContent);
</script>
```

ご覧の通り、すべての `<tags>` が切り取られたがその中のテキストは残っているような形でテキストのみが返却されます。

実際、このようなテキストを読み込むことはめったにありません。

**`textContent` への書き込みはとても役立ちます。なぜならテキストを "安全な方法" で書くことができるからです。**

例えばユーザによって入力された任意の文字列を持っていて、それを表示したいとしましょう。

- `innerHTML` を使うと、すべての HTML タグを共に、"HTML として" 挿入されます。
- `textContent` では、すべてのシンボルは文字通り扱われ、"テキスト として" 挿入されます。

2つを比べてみます:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-Pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

<<<<<<< HEAD
1. 最初の `<div>` は "HTML として" 名前を取得します: すべてのタグはタグになるので、太字の名前になります。
2. 2つ目の `<div>` は "テキストとして" 名前を取得するので、文字通り `<b>Winnie-the-pooh!</b>` と見えます。
=======
1. The first `<div>` gets the name "as HTML": all tags become tags, so we see the bold name.
2. The second `<div>` gets the name "as text", so we literally see `<b>Winnie-the-Pooh!</b>`.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

ユーザーからのテキストはテキストとして扱われたいと考えています。 私たちは予期せぬHTMLを私たちのサイトでは望みません。 `textContent`への代入はそれを正確に行います。

## "hidden" プロパティ 

"hidden" 属性と DOM プロパティは要素が見えるかどうかを指定します。

<<<<<<< HEAD
私たちは次のように HTML の中、もしくは JavaScript を使った代入で使うことができます。:
=======
We can use it in HTML or assign it using JavaScript, like this:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

```html run height="80"
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

技術的には、`hidden` は `style="display:none"` と同じ動きです。しかしより短く書けます。

ここでは要素がブリンクしています:


```html run height=50
<div id="elem">A blinking element</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

## More properties

<<<<<<< HEAD
DOM 要素は追加のプロパティも持っており、それらの多くはクラスによって提供されています。:
=======
DOM elements also have additional properties, in particular those that depend on the class:
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

- `value` -- `<input>`, `<select>` や `<textarea>` (`HTMLInputElement`, `HTMLSelectElement`...) のための値。
- `href` -- `<a href="...">` (`HTMLAnchorElement`) の `href`.
- `id` -- すべての要素(`HTMLElement`)に対する "id" 属性の値
- ...などもっと...

例:

```html run height="80"
<input type="text" id="elem" value="value">

<script>
  alert(elem.type); // "text"
  alert(elem.id); // "elem"
  alert(elem.value); // value
</script>
```

ほとんどの一般的な HTML 属性は対応する DOM プロパティを持っており、このようにしてアクセスすることができます。

<<<<<<< HEAD
もし指定したクラスに対して、サポートされているすべてのプロパティのリストが知りたい場合、仕様でそれを見つけることができます。例えば、HTMLInputElemen は <https://html.spec.whatwg.org/#htmlinputelement> でドキュメント化されています。

あるいは、速くそれを知りたい場合や具体的なブラウザで関心がある場合には、-- いつでも `console.dir(elem)` を使って要素を出力しプロパティを読むことができます。もしくはブラウザ開発者ツールの Elements タブで "DOM プロパティ" を参照してください。
=======
If we want to know the full list of supported properties for a given class, we can find them in the specification. For instance, `HTMLInputElement` is documented at <https://html.spec.whatwg.org/#htmlinputelement>.

Or if we'd like to get them fast or are interested in a concrete browser specification -- we can always output the element using `console.dir(elem)` and read the properties. Or explore "DOM properties" in the Elements tab of the browser developer tools.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

## サマリ 

<<<<<<< HEAD
各 DOM ノードは特定のクラスに属します。クラスは階層を形成します。プロパティとメソッドの完全なセットは継承の結果として得られます。
=======
Each DOM node belongs to a certain class. The classes form a hierarchy. The full set of properties and methods come as the result of inheritance.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

メインの DOM ノードプロパティは次の通りです:

`nodeType`
<<<<<<< HEAD
: ノードタイプ。DOM オブジェクトクラスから取得することができますが、それがテキストノードか要素ノードかを単に知りたいだけであることがしばしばです。 `nodeType` プロパティはそれに適しています。これは数値で最も重要なのは: 要素の場合 `1` と、テキストノードの場合 `3` です。読み取り専用です。

`nodeName/tagName`
: 要素の場合、タグ名です(XMLモードを除いて大文字)。非要素ノードの場合、`nodeName` それが何であるかを説明します。読み取り専用。

`innerHTML`
: 要素のHTMLコンテンツ。変更可能。
=======
: We can use it to see if a node is a text or an element node. It has a numeric value: `1` for elements,`3` for text nodes, and a few others for other node types. Read-only.

`nodeName/tagName`
: For elements, tag name (uppercased unless XML-mode). For non-element nodes `nodeName` describes what it is. Read-only.

`innerHTML`
: The HTML content of the element. Can be modified.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

`outerHTML`
: 要素の完全なHTMLです。`elem.outerHTML` への書き込み操作は `elem` 自体に触れません。代わりに、外部のコンテキストにおいて、新しいHTMLで置き換えます。

`nodeValue/data`
<<<<<<< HEAD
: 非要素ノード(テキスト、コメント)のコンテンツです。これら2つはほとんど同じで通常は `data` を使います。変更可能。

`textContent`
: 要素中のテキストで、基本的には HTML からすべての `<タグ>` を除いたものです。それに書き込むと、要素内にテキストが配置され、すべての特殊文字とタグがテキストとして正確に扱われます。 ユーザーが作成したテキストを安全に挿入し、不要なHTMLの挿入を防ぐことができます。
=======
: The content of a non-element node (text, comment). These two are almost the same, usually we use `data`. Can be modified.

`textContent`
: The text inside the element: HTML minus all `<tags>`. Writing into it puts the text inside the element, with all special characters and tags treated exactly as text. Can safely insert user-generated text and protect from unwanted HTML insertions.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c

`hidden`
: `true` をセットした場合、CSSの　`display:none` と同じです。

<<<<<<< HEAD
DOM ノードはクラスに応じて他のプロパティも持っています。例えば `<input>` 要素(`HTMLInputElement`) は `value`, `type` をサポートし、 `<a>` 要素 (`HTMLAnchorElement`) は `href` などです。ほとんどの標準HTML属性は対応する DOM プロパティを持っています。

しかし、HTML属性とDOMプロパティは必ずしも同じではありません。これについては次のチャプターで説明します。
=======
DOM nodes also have other properties depending on their class. For instance, `<input>` elements (`HTMLInputElement`) support `value`, `type`, while `<a>` elements (`HTMLAnchorElement`) support `href` etc. Most standard HTML attributes have a corresponding DOM property.

However, HTML attributes and DOM properties are not always the same, as we'll see in the next chapter.
>>>>>>> 3c934b5a46a76861255e3a4f29da6fd54ab05c8c
