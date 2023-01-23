# Shadow DOM

<<<<<<< HEAD
Shadow DOM はカプセル化に役立ちます。これにより、コンポーネントは独自の "shadow(隠れた存在の)" DOM ツリーを持つことができます。これは、メインの document から誤ってアクセスされることなく、ローカルのスタイルルールなどを持つことができます。

## 組み込みの shadow DOM

複雑なブラウザ制御がどのようにして作成され、スタイルされているか考えたことはあるでしょうか？

例えば `<input type="range">` です:
=======
Shadow DOM serves for encapsulation. It allows a component to have its very own "shadow" DOM tree, that can't be accidentally accessed from the main document, may have local style rules, and more.

## Built-in shadow DOM

Did you ever think how complex browser controls are created and styled?

Such as `<input type="range">`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<p>
<input type="range">
</p>

<<<<<<< HEAD
ブラウザはそれらを描画するために内部的に DOM/CSS を使います。そのDOM構造は通常隠されていますが、開発者ツールで見ることができます。E.g. Chrome では開発者ツールで "Show user agent shadow DOM" オプションを有効にする必要があります。

`<input type="range">` は次のように見えます:

![](shadow-dom-range.png)

`#shadow-root` の下に見えるのが "shadow DOM" と呼ばれているものです。

通常の JavaScript 呼び出しやセレクタでは組み込みの shadow DOM 要素を取得することはできません。これらは通常の子ではなく、強力にカプセル化された技術です。

上の例では、便利な属性 `pseudo` が確認できます。これは標準ではありませんが、歴史的な理由で存在しています。これは、次のように CSS でスタイルのサブ要素として使うことができます。:

```html run autorun
<style>
/* スライダーを赤にします */
=======
The browser uses DOM/CSS internally to draw them. That DOM structure is normally hidden from us, but we can see it in developer tools. E.g. in Chrome, we need to enable in Dev Tools "Show user agent shadow DOM" option.

Then `<input type="range">` looks like this:

![](shadow-dom-range.png)

What you see under `#shadow-root` is called "shadow DOM".

We can't get built-in shadow DOM elements by regular JavaScript calls or selectors. These are not regular children, but a powerful encapsulation technique.

In the example above, we can see a useful attribute `pseudo`. It's non-standard, exists for historical reasons. We can use it style subelements with CSS, like this:

```html run autorun
<style>
/* make the slider track red */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

<<<<<<< HEAD
繰り返しますが、`pseudo` は非標準の属性です。時系列的には、ブラウザは最初、コントロールを実装するために内部的なDOM構造を試み始めました。その後、shadow DOMは標準化され、開発者も同様のことができるようになりました。

今後は、[DOM spec](https://dom.spec.whatwg.org/#shadow-trees)や他の関連仕様により記述されてる最新の shadow DOM 標準を使用します。

## Shadow tree

DOM 要素には2種類の DOM のサブツリーがあります。:

1. Light tree -- HTMLの子からなる、通常の DOM サブツリーです。これまでのチャプターで見てきたすべてのサブツリーは "light" でした。
2. Shadow tree - 隠された DOM サブツリーです。HTML には反映されず、詮索好きな目からは隠されています。

要素が両方を含んでいる場合、ブラウザは shadow tree のみをレンダリングします。しかし、shadow ツリーと light ツリーを組み合わせることもできます。詳細に関しては、チャプター <info:slots-composition> で説明します。

Shadow tree は、カスタム要素が中身をコンポーネントの内部に隠したり、コンポーネントローカルなスタイルを適用するために使うことができます。

例えば、この `<show-hello>` 要素は自身の内部 DOM を shadow tree に隠します。:
=======
Once again, `pseudo` is a non-standard attribute. Chronologically, browsers first started to experiment with internal DOM structures to implement controls, and then, after time, shadow DOM was standardized to allow us, developers, to do the similar thing.

Further on, we'll use the modern shadow DOM standard, covered by [DOM spec](https://dom.spec.whatwg.org/#shadow-trees) and other related specifications.

## Shadow tree

A DOM element can have two types of DOM subtrees:

1. Light tree -- a regular DOM subtree, made of HTML children. All subtrees that we've seen in previous chapters were "light".
2. Shadow tree -- a hidden DOM subtree, not reflected in HTML, hidden from prying eyes.

If an element has both, then the browser renders only the shadow tree. But we can setup a kind of composition between shadow and light trees as well. We'll see the details later in the chapter <info:slots-composition>.

Shadow tree can be used in Custom Elements to hide component internals and apply component-local styles.

For example, this `<show-hello>` element hides its internal DOM in shadow tree:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun height=60
<script>
customElements.define('show-hello', class extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({mode: 'open'});
    shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')}
    </p>`;
  }  
});
</script>

<show-hello name="John"></show-hello>
```

<<<<<<< HEAD
これは、結果として得られる DOM が Chrome 開発者ツールでどのように見えるか、です。すべてのコンテンツは "#shadow-root" の下にあります。:

![](shadow-dom-say-hello.png)

最初に、 `elem.attachShadow({mode: …})` を呼び出すことで shadow tree が作られます。

2つ制限があります。
1. 要素毎に作成できる shadow root は1つだけです。
2. `elem` はカスタム要素、あるいは次のいずれかでなければなりません。: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", or "span"。`<img>` のような他の要素は shadow tree を持つことはできません。

`mode` オプションはカプセル化のレベルを設定します。次のいずれかの値である必要があります。:

- `"open"` -- shadow root は `elem.shadowRoot` として利用可能です。

    任意のコードが `elem` の shadow tree にアクセスすることができます。
- `"closed"` -- `elem.shadowRoot` は常に `null` です。

    この場合は、`attachShadow` で返却される参照によってのみ shadowDOM にアクセスすることができます(そして、おそらくそれはクラス内に隠されています)。`<input type="range">` などのブラウザ固有の shadow tree は closed です。なので、それらにアクセスする方法はありません。

`attachShadow` で返却される [shadow root](https://dom.spec.whatwg.org/#shadowroot) は要素のようなもので、`innerHTML` や `append` といった DOM メソッドを使うことができます。

shadow root を持つ要素は "shadow tree host" と呼ばれ、shadow root の `host` プロパティとして利用できます:

```js
// {mode: "open"} の想定です, そうでなければ elem.shadowRoot は null です
alert(elem.shadowRoot.host === elem); // true
```

## カプセル化

Shadow DOM はメインのドキュメントとは強く区切られています:

1. Shadow DOM 要素は light DOM からの `querySelector` では見えません。特に、Shadow DOM 要素が light DOM にある id と衝突する id を持つ可能性がありますが、問題ありません。これらは shadow tree 内でのみ一意である必要があります。
2. Shadow DOM は独自のスタイルシートを持ちます。外部の DOM からのスタイルルールは適用されません。

例:
=======
That's how the resulting DOM looks in Chrome dev tools, all the content is under "#shadow-root":

![](shadow-dom-say-hello.png)

First, the call to `elem.attachShadow({mode: …})` creates a shadow tree.

There are two limitations:
1. We can create only one shadow root per element.
2. The `elem` must be either a custom element, or one of: "article", "aside", "blockquote", "body", "div", "footer", "h1..h6", "header", "main" "nav", "p", "section", or "span". Other elements, like `<img>`, can't host shadow tree.

The `mode` option sets the encapsulation level. It must have any of two values:
- `"open"` -- the shadow root is available as `elem.shadowRoot`.

    Any code is able to access the shadow tree of `elem`.   
- `"closed"` -- `elem.shadowRoot` is always `null`.

    We can only access the shadow DOM by the reference returned by `attachShadow` (and probably hidden inside a class). Browser-native shadow trees, such as  `<input type="range">`, are closed. There's no way to access them.

The [shadow root](https://dom.spec.whatwg.org/#shadowroot), returned by `attachShadow`, is like an element: we can use `innerHTML` or DOM methods, such as `append`, to populate it.

The element with a shadow root is called a "shadow tree host", and is available as the shadow root `host` property:

```js
// assuming {mode: "open"}, otherwise elem.shadowRoot is null
alert(elem.shadowRoot.host === elem); // true
```

## Encapsulation

Shadow DOM is strongly delimited from the main document:

1. Shadow DOM elements are not visible to `querySelector` from the light DOM. In particular,  Shadow DOM elements may have ids that conflict with those in the light DOM. They must be unique only within the shadow tree.
2. Shadow DOM has own stylesheets. Style rules from the outer DOM don't get applied.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run untrusted height=40
<style>
*!*
<<<<<<< HEAD
  /* ドキュメントのスタイルは #elem 内の shadow tree には適用されません (1) */
=======
  /* document style won't apply to the shadow tree inside #elem (1) */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
<<<<<<< HEAD
    // shadow tree は独自のスタイルを持ちます (2)
=======
    // shadow tree has its own style (2)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
<<<<<<< HEAD
  // <p> は shadow tree 内のクエリーからのみ見えます (3)
=======
  // <p> is only visible from queries inside the shadow tree (3)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

<<<<<<< HEAD
1. ドキュメントのスタイルは shadow tree には影響しません。
2. ...ですが、内部のスタイルは機能します。
3. shadow tree 内で要素を取得するには、ツリーの内側からクエリーを行う必要があります。

## リファレンス

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- 互換性: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM は多くの他の仕様で言及されています。例えば、[DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) には shadow root が　 `innerHTML` を持つと明記されています。

## サマリ

Shadow DOM はコンポーネントローカルな DOM を作成する方法です。

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- `elem` に対して shadow DOM を作成します。`mode="open"` であれば、`elem.shadowRoot`
 プロパティでアクセス可能です。
2. `innerHTML` や他の DOM メソッドを使って、`shadowRoot` に要素を追加することができます。

Shadow DOM 要素:
- 独自の id スコープがあります
- メインのドキュメントからの JavaScript セレクタ(e.g. `querySelector`)には見えません
- shadow tree 内のスタイルのみを使用し、メインドキュメントのスタイルは適用されません

Shadow DOM が存在する場合、いわゆる "light DOM" (通常の子)の代わりに、ブラウザによってレンダリングされます。チャプター <info:slots-composition> でこれらを構成する方法を見ていきます。
=======
1. The style from the document does not affect the shadow tree.
2. ...But the style from the inside works.
3. To get elements in shadow tree, we must query from inside the tree.

## References

- DOM: <https://dom.spec.whatwg.org/#shadow-trees>
- Compatibility: <https://caniuse.com/#feat=shadowdomv1>
- Shadow DOM is mentioned in many other specifications, e.g. [DOM Parsing](https://w3c.github.io/DOM-Parsing/#the-innerhtml-mixin) specifies that shadow root has `innerHTML`.


## Summary

Shadow DOM is a way to create a component-local DOM.

1. `shadowRoot = elem.attachShadow({mode: open|closed})` -- creates shadow DOM for `elem`. If `mode="open"`, then it's accessible as `elem.shadowRoot` property.
2. We can populate `shadowRoot` using `innerHTML` or other DOM methods.

Shadow DOM elements:
- Have their own ids space,
- Invisible to JavaScript selectors from the main document, such as `querySelector`,
- Use styles only from the shadow tree, not from the main document.

Shadow DOM, if exists, is rendered by the browser instead of so-called "light DOM" (regular children). In the chapter <info:slots-composition> we'll see how to compose them.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
