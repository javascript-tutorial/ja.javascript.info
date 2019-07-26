# Shadow DOM

Shadow DOM はカプセル化に役立ちます。これにより、コンポーネントは独自の "shadow(隠れた存在の)" DOM ツリーを持つことができます。これは、メインの document から誤ってアクセスされることなく、ローカルのスタイルルールなどを持つことができます。

## 組み込みの shadow DOM

複雑なブラウザ制御がどのようにして作成され、スタイルされているか考えたことはあるでしょうか？

例えば `<input type="range">` です:

<p>
<input type="range">
</p>

ブラウザはそれらを描画するために内部的に DOM/CSS を使います。そのDOM構造は通常隠されていますが、開発者ツールで見ることができます。E.g. Chrome では開発者ツールで "Show user agent shadow DOM" オプションを有効にする必要があります。

`<input type="range">` は次のように見えます:

![](shadow-dom-range.png)

`#shadow-root` の下に見えるのが "shadow DOM" と呼ばれているものです。

通常の JavaScript 呼び出しやセレクタでは組み込みの shadow DOM 要素を取得することはできません。これらは通常の子ではなく、強力にカプセル化された技術です。

上の例では、便利な属性 `pseudo` が確認できます。これは標準ではありませんが、歴史的な理由で存在しています。これは、次のように CSS でスタイルのサブ要素として使うことができます。:

```html run autorun
<style>
/* スライダーを赤にします */
input::-webkit-slider-runnable-track {
  background: red;
}
</style>

<input type="range">
```

繰り返しますが、`pseudo` は非標準の属性です。時系列的には、ブラウザは最初、コントロールを実装するために内部的なDOM構造を試み始めました。その後、shadow DOMは標準化され、開発者も同様のことができるようになりました。

今後は、[DOM spec](https://dom.spec.whatwg.org/#shadow-trees)や他の関連仕様により記述されてる最新の shadow DOM 標準を使用します。

## Shadow tree

DOM 要素には2種類の DOM のサブツリーがあります。:

1. Light tree -- HTMLの子からなる、通常の DOM サブツリーです。これまでのチャプターで見てきたすべてのサブツリーは "light" でした。
2. Shadow tree - 隠された DOM サブツリーです。HTML には反映されず、詮索好きな目からは隠されています。

要素が両方を含んでいる場合、ブラウザは shadow tree のみをレンダリングします。しかし、shadow ツリーと light ツリーを組み合わせることもできます。詳細に関しては、チャプター <info:slots-composition> で説明します。

Shadow tree は、カスタム要素が中身をコンポーネントの内部に隠したり、コンポーネントローカルなスタイルを適用するために使うことができます。

例えば、この `<show-hello>` 要素は自身の内部 DOM を shadow tree に隠します。:

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

```html run untrusted height=40
<style>
*!*
  /* ドキュメントのスタイルは #elem 内の shadow tree には適用されません (1) */
*/!*
  p { color: red; }
</style>

<div id="elem"></div>

<script>
  elem.attachShadow({mode: 'open'});
*!*
    // shadow tree は独自のスタイルを持ちます (2)
*/!*
  elem.shadowRoot.innerHTML = `
    <style> p { font-weight: bold; } </style>
    <p>Hello, John!</p>
  `;

*!*
  // <p> は shadow tree 内のクエリーからのみ見えます (3)
*/!*
  alert(document.querySelectorAll('p').length); // 0
  alert(elem.shadowRoot.querySelectorAll('p').length); // 1
</script>  
```

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