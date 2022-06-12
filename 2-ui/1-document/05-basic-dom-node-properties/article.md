# ノードのプロパティ: タイプ、タグとコンテンツ

DOM ノードをより深く見ていきましょう。

この章ではそれらが何者であるか、そしてよく使われるプロパティについて見ていきます。

## DOM ノードクラス 

異なる DOM ノードは異なるプロパティを持ちます。例えば、タグ `<a>` に対応する要素ノードはリンク関連のプロパティを持っており、`<input>` に対応する要素ノードは入力関連のプロパティを持っています。テキストノードは要素ノードとは違いますが、すべての DOM ノードのクラスは1つのの階層を形成するため、すべてのノードで共通のプロパティやメソッドがあります。

各 DOM ノードは対応する組み込みクラスに属しています。

階層のルートは [EventTarget](https://dom.spec.whatwg.org/#eventtarget) で、これは [Node](http://dom.spec.whatwg.org/#interface-node) により継承されています。また他の DOM ノードはそれを継承しています。

ここに、図と説明があります:

![](dom-class-hierarchy.svg)

クラスは次の通りです:

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) -- はルートの "抽象" クラスです。このクラスのオブジェクトは生成されません。これはベースとして機能し、すべての DOM ノードはいわゆる "イベント" をサポートします。イベントについては後ほど学びます。
- [Node](http://dom.spec.whatwg.org/#interface-node) -- もまた "抽象" クラスで、DOM ノードの基底として機能します。これはコアなツリー機能を提供します。: `parentNode`, `nextSibling`, `childNodes` など(これらは getter です)。`Node` クラスのオブジェクトは決して生成されません。しかし、それを継承した具体的なノードクラス、即ち: テキストノードの `Text`, 要素ノードの `Element` や、コメントノードのための `Comment` などもあります。
- [Element](http://dom.spec.whatwg.org/#interface-element) -- は DOM 要素のベースクラスです。`nextElementSibling`, `children` や `getElementsByTagName`, `querySelector` 等の検索メソッドといった、要素レベルのナビゲーションを提供します。ブラウザでは、HTML だけでなく、XML や SVG のドキュメントがある場合もあります。`Element` クラスは ` SVGElement`、`XMLElement`、`HTMLElement` といったより具体的なクラスのベースとして機能します。
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement) -- は最終的にすべてのHTML要素のベースクラスです。色々な HTML要素 がこれを継承しています。:
    - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) -- `<input>` 要素のためのクラス,
    - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) -- `<body>` 要素のためのクラス,
    - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) -- `<a>`　要素のためのクラス
    - ...など、各タグは固有のプロパティやメソッドを提供する独自のクラスを持っています。

`<span>`, `<section>`, `<article>` のようなプロパティは固有のプロパティを持たない一方で、固有のプロパティやメソッドをもつ独自のクラスを持つ他の多くのタグがあります。

そのため、指定されたノードのプロパティとメソッドのフルセットは継承の結果として得られます。

例えば、`<input>` 要素の DOM オブジェクトを考えてみましょう。これは [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) クラスに属しています。

それは、次の重ね合わせとしてプロパティとメソッドを取得します(継承順でリストしています):

- `HTMLInputElement` -- このクラスは入力固有のプロパティを提供し、次を継承しています。
- `HTMLElement` -- 共通のHTML要素メソッド (とgetter/setter)を提供し、次を継承しています。
- `Element` -- 一般的な要素のメソッドを提供し、次を継承しています。
- `Node` -- 共通の DOM ノードのプロパティを提供し、次を継承しています。
- `EventTarget` -- (対象となる)イベントをサポートし、
- ...そして最後に、それは `Object` を継承しています。なので、`hasOwnProperty` のような "純粋なオブジェクト" メソッドも利用可能です。

DOM ノードのクラス名を見るに、オブジェクトは通常 `constructor` プロパティを持っていることを思い出してください。 これはクラスコンストラクタを参照し、 `constructor.name` はその名前です:

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
ほとんどのブラウザは、開発者ツールで2つのコマンドをサポートしています。`console.log` と `console.dir` です。それらは引数をコンソールに出力します。JavaScript オブジェクトに対しては通常同じ動作をします。

しかし、DOM 要素に対しては異なります。:

- `console.log(elem)` は要素の DOM ツリーを表示します
- `console.dir(elem)` は DOM オブジェクトとして要素を表示します。プロパティを調べるのには良いです。

`document.body` でそれを使ってみてください。
```

````smart header="仕様での IDL"
スペックでは、クラスは JavaScript ではなく、特別な [Interface description language](https://en.wikipedia.org/wiki/Interface_description_language) (IDL) を使って説明されています。これは理解しやすいです。

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
  // "DOMString" はプロパティが文字列であることを意味します。
*/!*
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

*!*
  // boolean プロパティ (true/false)
  attribute boolean autofocus;
*/!*
  ...
*!*
  // ここはメソッドです: "void" は返却値なしを意味します。
*/!*
  void select();
  ...
}
```
````

## "nodeType" プロパティ

`nodeType` プロパティは DOM ノードの "タイプ" を取得する昔ながらの方法です。

次の数値を持っています:
- `elem.nodeType == 1` は要素ノード,
- `elem.nodeType == 3` はテキストノード,
- `elem.nodeType == 9` はドキュメントオブジェクト,
- [スペック](https://dom.spec.whatwg.org/#node) ではもういくつかの値があります。

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

現在のスクリプトでは、`instanceof` と他のクラスベースのテストを使ってノードタイプを見ることができますが、`nodeType` の方がシンプルなときもあります。`nodeType` は参照のみで変更はできません。

## タグ: nodeName と tagName 

与えられた DOM ノードに対して、`nodeName` または `tagName` プロパティでそのタグの名前を見ることができます。:

例:

```js run
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```

tagName と nodeName の違いはなにでしょうか？

もちろん、その違いはそれらの名前に反映されていますが、実際は少し微妙です。

- `tagName` プロパティは `Element` ノードに対してのみ存在します。
- `nodeName` は任意の `Node` で定義されています:
    - 要素の場合は、`tagName` と同じ意味です。
    - 他のノードタイプ(テキスト、コメントなど)の場合、ノードタイプの文字列を持ちます。

つまり、`tagName` は要素ノード(`Element` クラスから始まる)によってのみサポートされています。一方、`nodeName` は他のノードタイプについてな何か言うことができます。

例えば、`document` ノードとコメントノードに対して、`tagName` と `nodeName` を比較してみましょう。:

```html run
<body><!-- comment -->

  <script>
    // for comment
    alert( document.body.firstChild.tagName ); // undefined (not element)
    alert( document.body.firstChild.nodeName ); // #comment

    // for document
    alert( document.tagName ); // undefined (not element)
    alert( document.nodeName ); // #document
  </script>
</body>
```

要素だけを扱う場合、`tagName` と `nodeName` どちらも利用でき、そこに差はありません。


```smart header="タグ名は XML モードを除いて常に大文字です"
ブラウザはドキュメントを処理する2つのモードを持っています。: HTML と XML です。通常webページではHTMLモードが使われます。XMLモードは、ブラウザがヘッダでXMLドキュメントを受け取ったときに有効になります。: `Content-Type: application/xml+xhtml`。

HTMLモードでは、`tagName/nodeName` は常に大文字です: `<body>` または `<BoDy>` は `BODY` です。

XMLモードでは、文字の大小は "そのまま" 維持されます。最近 XML モードはほとんど使われません。
```


## innerHTML: コンテンツ 

[innerHTML](https://w3c.github.io/DOM-Parsing/#widl-Element-innerHTML)プロパティは要素内の HTML を文字列として取得することができます。

それを変更することもできます。なので、ページを変更する最も強力な方法の1つです。

この例は `document.body` のコンテンツを表示し、その後、コンテンツを完全に置き換えます:

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

無効な HTML を挿入しようとすると、ブラウザはエラーを修正します。:

```html run
<body>

  <script>
    document.body.innerHTML = '<b>test'; // タグのクローズ忘れ
    alert( document.body.innerHTML ); // <b>test</b> (修正された)
  </script>

</body>
```

```smart header="スクリプトは実行しません"
もし `innerHTML` が `<script>` タグをドキュメントに挿入した場合、-- HMLT の一部にはなりますが、実行されません。
```

### 注意: "innerHTML+=" は完全な置き換えをします

`elem.innerHTML+="何か"` を使って "より多くのHTML" を追加することができます。

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

**注意: `innerHTML` とは違い、`outerHTML` への書き込みは要素を変更しません。代わりに、DOM で置き換えられます。**

ええ、奇妙に聞こえ、それは確かに奇妙です。それについて補足します。見てみましょう:

例を考えてみましょう:

```html run
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

*!*
  // div.outerHTML を <p>...</p> に置き換え
*/!*
  div.outerHTML = '<p>A new element!</p>'; // (*)

*!*
  // なんと! div はまだ同じです!
*/!*
  alert(div.outerHTML); // <div>Hello, world!</div>
</script>
```

奇妙に見えませんか？

行 `(*)` では、`<div>` を `<p>A new element</p>` に置き換えます。外側のドキュメント(DOM)では、`<div>` の代わりに新しいコンテンツが見るます。しかし、行 `(**)` では、古い `div` 変数は変更されていません。
 
`outerHTML` の代入は DOM 要素（参照されているオブジェクト、今回のケースでは変数 'div'）を変更するのではなく、DOM からそれを削除し、新しいHTMLをその場所へ挿入します。

なので、`div.outerHTML=...` で起きていることは以下の通りです:
- `div` がドキュメントから削除されます。
- 別の HTML のピース `<p>A new element</p>` がその場に挿入されます。
- `div` は古い値を持ったままです。新しいHTMLはどこにも保存されていません。

`div.outerHTML` を変更し、`div` が新しいコンテンツかのように扱い処理を続けると、すぐにエラーになるでしょう。このようなことは `innerHTML` なら問題ありませんが、`outerHTML` ではうまくいきません。

`elem.outerHTML` で書き込みはできますが、'elem' に書き込んでいるものは変わらないことについて留意しておく必要があります。代わりにその場所に新しいコンテンツを作成します。DOM に問い合わせることで新しい要素を参照することができます。

## nodeValue/data: テキストノードのコンテンツ

`innerHTML` プロパティは要素ノードに対してのみ有効です。

他のノードタイプにはそれに対応するものがあります: `nodeValue` と `data` プロパティです。これら2つは実際の利用においてはほとんど同じで、仕様上少し違いがあるだけです。なので、より短い `data` を使います。

テキストノードのコンテンツとコメントを読む例です:

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

テキストノードに対しては、それらが読み込んだり修正できる理由が想像できます。しかしなぜコメントも？

次のように開発者が HTML の中に情報やテンプレートの説明を埋め込むことがあります。:

```html
<!-- if isAdmin -->
  <div>Welcome, Admin!</div>
<!-- /if -->
```

...そして、JavaScriptはそれを読み、埋め込まれた命令を処理することができます。

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

ご覧の通り、すべての `<tags>` が取り除かれ、テキストだけが残る形でテキストのみが返却されます。

実際、このようなテキストを読み込むことはめったにありません。

**`textContent` への書き込みはとても役立ちます。なぜならテキストを "安全な方法" で書くことができるからです。**

例えばユーザによって入力された任意の文字列を表示したいとしましょう。

- `innerHTML` を使うと、すべての HTML タグと一緒に、"HTML として" 挿入されます。
- `textContent` では、すべてのシンボルは文字通り扱われ、"テキスト として" 挿入されます。

2つを比べてみます:

```html run
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("What's your name?", "<b>Winnie-the-pooh!</b>");

  elem1.innerHTML = name;
  elem2.textContent = name;
</script>
```

1. 最初の `<div>` は "HTML として" 名前を取得します: すべてのタグはタグになるので、太字の名前になります。
2. 2つ目の `<div>` は "テキストとして" 名前を取得するので、文字通り `<b>Winnie-the-pooh!</b>` と見えます。

ユーザーからのテキストはテキストとして扱われたいと考えています。 私たちは予期せぬHTMLを私たちのサイトでは望みません。 `textContent`への代入はそれを正確に行います。

## "hidden" プロパティ 

"hidden" 属性と DOM プロパティは要素が見えるかどうかを指定します。

次のように HTML の中、もしくは JavaScript を使った代入で使用できます。:

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

## その他のプロパティ

DOM 要素には追加のプロパティ、特にクラスに依存するプロパティもあります:

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

ほとんどの標準の HTML 属性は対応する DOM プロパティを持っており、このようにしてアクセスすることができます。

指定したクラスがサポートされているすべてのプロパティのリストはスペックにあります。例えば、HTMLInputElemen は <https://html.spec.whatwg.org/#htmlinputelement> でドキュメント化されています。

あるいは、速くそれを知りたい場合や、具体的なブラウザでのスペックが知りたい場合には、-- いつでも `console.dir(elem)` で要素を出力しプロパティを確認することができます。もしくはブラウザ開発者ツールの Elements タブで "DOM プロパティ" を参照してください。

## サマリ 

各 DOM ノードは特定のクラスに属します。クラスは階層を形成します。プロパティとメソッドの完全なセットは継承の結果として得られます。

主な DOM ノードプロパティは次の通りです:

`nodeType`
: ノードがテキストノードか要素ノードかが確認できます。要素の場合 `1` と、テキストノードの場合 `3` 、その他いくつか種類があります。読み取り専用です。

`nodeName/tagName`
: 要素の場合、タグ名です(XMLモードを除き大文字)。非要素ノードの場合、`nodeName` はそれが何かを説明します。読み取り専用です。

`innerHTML`
: 要素のHTMLコンテンツ。変更可能です。

`outerHTML`
: 要素の完全なHTMLです。`elem.outerHTML` への書き込み操作は `elem` 自体には触れません。代わりに、外部のコンテキストで新しいHTMLで置き換えます。

`nodeValue/data`
: 非要素ノード(テキスト、コメント)のコンテンツです。これら2つはほとんど同じで通常は `data` を使います。変更可能です。

`textContent`
: 要素中のテキストで、基本的には HTML からすべての `<タグ>` を除いたものです。それに書き込むと、要素内にテキストが配置され、すべての特殊文字とタグがテキストとして正確に扱われます。 ユーザーが作成したテキストを安全に挿入し、不要なHTMLの挿入を防ぐことができます。

`hidden`
: `true` をセットした場合、CSSの　`display:none` と同じです。

DOM ノードはクラスに応じて他のプロパティも持っています。例えば `<input>` 要素(`HTMLInputElement`) は `value`, `type` をサポートし、 `<a>` 要素 (`HTMLAnchorElement`) は `href` などです。ほとんどの標準HTML属性は対応する DOM プロパティを持っています。

しかし、HTML属性とDOMプロパティは必ずしも同じではありません。これについては次の章で説明します。
