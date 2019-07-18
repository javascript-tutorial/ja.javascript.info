
# Custom elements

独自のメソッドやプロパティ、イベントなどを持つ、独自のクラスで記述されたカスタムHTML要素を作成することができます。

一度カスタム要素が定義されると、組み込みのHTML要素と同じようにそれを使用できます。

HTMLの種類は豊富ですが、無限ではないので、これは素晴らしいことです。`<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>` などはありません。他に必要となるタグについて考えてください。

特別なクラスでそれらを定義し、それ以降はあたかもそれがHTMLの一部であるかのように使用することができます。

Custom element(カスタム要素)には2種類あります。:

1. **自律型カスタム要素(Autonomous custom elements)** -- 抽象的な `HTMLElement` クラスを拡張した "すべてが新規" の要素です。
2. **カスタマイズされた組み込み要素(Customized built-in elements)** -- カスタマイズされた `HTMLButtonElement` のような、組み込み要素を拡張した要素です。

最初に自律型要素を作成し、その次にカスタマイズされた組み込み要素を作成していきます。

カスタム要素を作るには、ブラウザにいくつかの詳細を教える必要があります: どのように表示するか、要素がページ上に追加されたり削除されたときの何をするか、などです。

これらは特別なメソッドを持つクラスを作ることで行います。メソッドはわずかで、すべてオプションなので簡単です。

これは完全な一覧のスケッチです。:

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // 要素が作成されました
  }

  connectedCallback() {
    // ブラウザは要素が document に追加された時にこれを呼びます
    // (要素が繰り返し追加/削除される場合、何度も呼ばれます)
  }

  disconnectedCallback() {
    // ブラウザは要素が document から削除された時にこれを呼びます
    // (要素が繰り返し追加/削除される場合、何度も呼ばれます)
  }

  static get observedAttributes() {
    return [/* 変更を監視する属性名の配列 */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 上で挙げたいずれかの属性が変更されたときに呼ばれます
  }

  adoptedCallback() {
    // 要素が新しい document に移動されたときに呼ばれます
    // (document.adoptNode で発生しますが、めったに使われません)
  }

  // その他の要素のメソッドやプロパティ
  // ...
}
```

この後、要素を登録する必要があります。:

```js
// <my-element> が我々が作った新たなクラスによって提供されることをブラウザに知らせます。
customElements.define("my-element", MyElement);
```

これで、タグ `<my-element>` の HTML 要素に対しては、`MyElement` のインスタンスが作成され、前述のメソッドが呼び出されます。JavaScript で `document.createElement('my-element')` をするのでもOKです。

```smart header="Custom element(カスタム要素) の名前はハイフン `-` を含まなければいけません"
カスタム要素の名前にはハイフン `-` を含む必要があります。e.g. `my-element` や `super-button` は有効ですが、`myelement` はだめです。

これは、組み込み要素とカスタムHTML要素間に名前の衝突がないことを保証するためです。
```

## 例: "time-formatted"

例えば、日付/時刻に関して、HTML にはすでに `<time>` が存在します。ですが、それ自体では何もフォーマットは行いません。

言語を意識したフォーマットで時刻を表示する `<time-formatted>` 要素を作成しましょう。:

```html run height=50 autorun="no-epub"
<script>
*!*
class TimeFormatted extends HTMLElement { // (1)
*/!*

  connectedCallback() {
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

}

*!*
customElements.define("time-formatted", TimeFormatted); // (2)
*/!*
</script>

<!-- (3) -->
*!*
<time-formatted datetime="2019-12-01"
*/!*
  year="numeric" month="long" day="numeric"
  hour="numeric" minute="numeric" second="numeric"
  time-zone-name="short"
></time-formatted>

```
1. このクラスはメソッドを1つだけ持っています(`connectedCallback()`)。ブラウザは、`<time-formatted>` 要素がページに追加されたとき(あるいは HTML パーサーがそれを検出したとき)にこれを呼び出します。その中では、ブラウザ間で十分にサポートされている組み込みの [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) データフォーマッターを使用しています。
2. `customElements.define(tag, class)` で新しい要素を登録します。
3. その後、どこでもそれを使うことができます。


```smart header="カスタム要素のアップグレード"
ブラウザが `customElements.define` の前に `<time-formatted>` を見つけた場合、エラーにはなりません。しかし、要素はまだ知られていないので、非標準のタグのようになります。

このような "未定義の" 要素は CSS セレクタで `:not(:defined)` としてスタイルすることができます。

`customElement.define` が呼び出されたとき、それらは "アップグレード" されます。: それぞれに`TimeFormatted` の新たなインスタンスが作成され、`connectedCallback` が呼び出されます。これらは `:defined` になります。

カスタム要素についての情報を取得するために、次のようなメソッドがあります:
- `customElements.get(name)` -- 指定された `name` のカスタム要素のクラスを返します。
- `customElements.whenDefined(name)` -- 指定された `name` のカスタム要素が定義されたときに解決する(値はなし) promise を返します。
```

```smart header="`constructor` ではなく、`connectedCallback` でレンダリングします"
上の例では、要素のコンテンツは `connectedCallback` でレンダリング(作成)されています。

`constructor` ではダメなのでしょうか？

理由は簡単です: `constructor` が呼ばれる時点ではまだ早すぎるからです。要素のインスタンスは作成されていますが、また追加されていません。ブラウザはこの段階ではまだ属性の処理や割当をしていません: `getAttribute` の呼び出しは `null` を返します。そのため、そこでレンダリングすることはできません。

それに加えて、パフォーマンスの点でも、本当に必要とされるまで処理を遅らせるのでより良いです。

`connectedCallback` は要素が document に追加されたときに発生します。子として別の要素に追加されるだけなく、実際にページの一部になったときです。そのため、分離した(detached)DOMを構築し、要素を作成し、あとで使うためにそれらを準備することができます。それらはページに追加されたときにのみ実際にレンダリングされます。
```

## 属性を監視する

`<time-formatted>` の現在の実装では、要素のレンダリング後、それ以上属性を変更しても影響しません。HTML 要素として少し変です。通常は、`a.href` のように属性を変更すると、変更はすぐに見えます。なので、こうのように修正しましょう。

`observedAttributes()` の静的な getter に属性のリストを指定することで、属性を監視することができます。ここで指定した属性については、値が変更されたときに `attributeChangedCallback` が呼び出されます。

これは、属性が変更されたときに自動で更新を行う新しい `<time-formatted>` です: 

```html run autorun="no-epub" height=50
<script>
class TimeFormatted extends HTMLElement {

*!*
  render() { // (1)
*/!*
    let date = new Date(this.getAttribute('datetime') || Date.now());

    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

*!*
  connectedCallback() { // (2)
*/!*
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

*!*
  static get observedAttributes() { // (3)
*/!*
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

*!*
  attributeChangedCallback(name, oldValue, newValue) { // (4)
*/!*
    this.render();
  }

}

customElements.define("time-formatted", TimeFormatted);
</script>

<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
*!*
setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
*/!*
</script>
```

1. レンダリングロジックは `render` ヘルパーメソッドに移動しました。
2. 要素がページに挿入されたときに1回だけ呼び出します。
3. `observedAttributes()` にリストされた属性の変更に対し、`attributeChangedCallback` がトリガーされます。
4. ...要素を再描画します。
5. 最後に、簡単にライブタイマーを作る事ができます。

## レンダリング順

HTML パーサーが DOM を構築するとき、要素は次々に処理されます(子の前に親)。E.g. `<outer><inner></inner></outer>` の場合、まず `<outer>` 要素が作成され、DOM に挿入され、次に `<inner>` になります。

これはカスタム要素に対して重要な結果をもたらします。

例えば、カスタム要素が `connectedCallback` の中で `innerHTML` にアクセスしようとしても、何も得られません。:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    alert(this.innerHTML); // 空 (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

これを実行しても `alert` は空です。

これはまさに、その段階では子がおらず、DOMが未完了だからです。HTML パーサーはカスタム要素 `<user-info>` を処理し、この後その子を処理していきますが、まだ行っていません。

カスタム要素に情報を渡したい場合は、属性を使用することができます。これらはすぐに利用可能です。

あるいは、本当に子が必要な場合、遅延ゼロの `setTimeout` を使ってアクセスを遅らせることができます。

これは動作します:

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
    setTimeout(() => alert(this.innerHTML)); // John (*)
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

これで、HTMLの構文解析が完了した後、非同期に実行することになるので、行 `(*)` の `alert` では "John" が表示されます。必要に応じて子を処理して、初期化を完了することができます。

一方、この解決策も完璧ではありません。ネストされたカスタム要素も自身の初期化に `setTimeout` を使用していた場合、それらはキューに入れられます(列を作ります): 外側の `setTimeout` が最初にトリガーされ、その後内部のものがトリガーされます。

そのため、外部の要素は内部の要素の初期化の前に初期化が終了します。

例を挙げて説明しましょう:

```html run height=0
<script>
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(`${this.id} connected.`);
    setTimeout(() => alert(`${this.id} initialized.`));
  }
});
</script>

*!*
<user-info id="outer">
  <user-info id="inner"></user-info>
</user-info>
*/!*
```

出力順:

1. outer connected.
2. inner connected.
2. outer initialized.
4. inner initialized.

外部の要素が内部の要素を待っていないことがはっきり分かります。

ネストした要素の準備ができた後にトリガーされる組み込みのコールバックはありません。しかし、独自に実装することはできます。例えば、内部の要素は `initialized` のようなイベントを創出し、外部の要素はそれをリッスンし反応するといった方法が考えられます。

## カスタマイズされた組み込みの要素

`<time-formatted>` のような新しく作成した要素には、関連するセマンティクスがありません。それらは検索エンジンにとっては未知であり、アクセシビリティデバイスはそれらを扱うことができません。

しかし、このようなことが重要になることもあります。E.g. 検索エンジンは私たちが実際に時刻を見せているということを知ることに興味を持つかもしれません。また特別な種類のボタンを作っている場合、既存の `<button>` の機能を再利用したらどうでしょう。

私たちは、組み込みのクラスから継承することで、組み込みの要素を拡張したりカスタマイズすることができます。

例えば、ボタンは `HTMLButtonElement` のインスタンスです。それを基に作りましょう。

1. `HTMLButtonElement` を拡張したクラスを作ります:

    ```js
    class HelloButton extends HTMLButtonElement { /* カスタム要素のメソッド */ }
    ```

2. タグを指定する3番目の引数を `customElements.define` に渡します:

    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    
    同じクラスを共有するさまざまなタグが存在するので、この指定が必要になります。

3. 最後に、カスタム要素を使うために、通常の `<button>` タグを挿入しますが、そこに `is="hello-button"` を追加します。:
    ```html
    <button is="hello-button">...</button>
    ```

これは完全な例です:

```html run autorun="no-epub"
<script>
// クリックすると "hello" を表示するボタン
class HelloButton extends HTMLButtonElement {
*!*
  constructor() {
*/!*
    super();
    this.addEventListener('click', () => alert("Hello!"));
  }
}

*!*
customElements.define('hello-button', HelloButton, {extends: 'button'});
*/!*
</script>

*!*
<button is="hello-button">Click me</button>
*/!*

*!*
<button is="hello-button" disabled>Disabled</button>
*/!*
```

我々の新しいボタンは組み込みのボタンを拡張しています。なので、同じスタイルや `disabled` 属性のような標準の機能を持っています。

## リファレンス

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- 互換性: <https://caniuse.com/#feat=custom-elements>.

## サマリ

カスタム要素には2つのタイプがあります:

1. "自律型" -- 新しいタグで `HTMLElement` を拡張します

    定義のスキーム:

    ```js
    class MyElement extends HTMLElement {
      constructor() { super(); /* ... */ }
      connectedCallback() { /* ... */ }
      disconnectedCallback() { /* ... */  }
      static get observedAttributes() { return [/* ... */]; }
      attributeChangedCallback(name, oldValue, newValue) { /* ... */ }
      adoptedCallback() { /* ... */ }
     }
    customElements.define('my-element', MyElement);
    /* <my-element> */
    ```

2. "カスタマイズされた組み込み要素" -- 既存要素の拡張です

    もう１つの `.define` の引数と、HTML には `is="..."` が必要です:
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

カスタム要素はブラウザ間では十分にサポートされています。Edge は少し遅れていますが、polyfill <https://github.com/webcomponents/webcomponentsjs> があります。
