
# Custom elements

<<<<<<< HEAD
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
=======
We can create custom HTML elements, described by our class, with its own methods and properties, events and so on.

Once a custom element is defined, we can use it on par with built-in HTML elements.

That's great, as HTML dictionary is rich, but not infinite. There are no `<easy-tabs>`, `<sliding-carousel>`, `<beautiful-upload>`... Just think of any other tag we might need.

We can define them with a special class, and then use as if they were always a part of HTML.

There are two kinds of custom elements:

1. **Autonomous custom elements** -- "all-new" elements, extending the abstract `HTMLElement` class.
2. **Customized built-in elements** -- extending built-in elements, like a customized button, based on `HTMLButtonElement` etc.

First we'll cover autonomous elements, and then move to customized built-in ones.

To create a custom element, we need to tell the browser several details about it: how to show it, what to do when the element is added or removed to page, etc.

That's done by making a class with special methods. That's easy, as there are only few methods, and all of them are optional.

Here's a sketch with the full list:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
<<<<<<< HEAD
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
=======
    // element created
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
```

After that, we need to register the element:

```js
// let the browser know that <my-element> is served by our new class
customElements.define("my-element", MyElement);
```

Now for any HTML elements with tag `<my-element>`, an instance of `MyElement` is created, and the aforementioned methods are called. We also can `document.createElement('my-element')` in JavaScript.

```smart header="Custom element name must contain a hyphen `-`"
Custom element name must have a hyphen `-`, e.g. `my-element` and `super-button` are valid names, but `myelement` is not.

That's to ensure that there are no name conflicts between built-in and custom HTML elements.
```

## Example: "time-formatted"

For example, there already exists `<time>` element in HTML, for date/time. But it doesn't do any formatting by itself.

Let's create `<time-formatted>` element that displays the time in a nice, language-aware format:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
<<<<<<< HEAD

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
=======
```

1. The class has only one method `connectedCallback()` -- the browser calls it when `<time-formatted>` element is added to page (or when HTML parser detects it), and it uses the built-in [Intl.DateTimeFormat](mdn:/JavaScript/Reference/Global_Objects/DateTimeFormat) data formatter, well-supported across the browsers, to show a nicely formatted time.
2. We need to register our new element by `customElements.define(tag, class)`.
3. And then we can use it everywhere.


```smart header="Custom elements upgrade"
If the browser encounters any `<time-formatted>` elements before `customElements.define`, that's not an error. But the element is yet unknown, just like any non-standard tag.

Such "undefined" elements can be styled with CSS selector `:not(:defined)`.

When `customElement.define` is called, they are "upgraded": a new instance of `TimeFormatted`
is created for each, and `connectedCallback` is called. They become `:defined`.

To get the information about custom elements, there are methods:
- `customElements.get(name)` -- returns the class for a custom element with the given `name`,
- `customElements.whenDefined(name)` -- returns a promise that resolves (without value) when a custom element with the given `name` becomes defined.
```

```smart header="Rendering in `connectedCallback`, not in `constructor`"
In the example above, element content is rendered (created) in `connectedCallback`.

Why not in the `constructor`?

The reason is simple: when `constructor` is called, it's yet too early. The element is created, but the browser did not yet process/assign attributes at this stage: calls to `getAttribute` would return `null`. So we can't really render there.

Besides, if you think about it, that's better performance-wise -- to delay the work until it's really needed.

The `connectedCallback` triggers when the element is added to the document. Not just appended to another element as a child, but actually becomes a part of the page. So we can build detached DOM, create elements and prepare them for later use. They will only be actually rendered when they make it into the page.
```

## Observing attributes

In the current implementation of `<time-formatted>`, after the element is rendered, further attribute changes don't have any effect. That's strange for an HTML element. Usually, when we change an attribute, like `a.href`, we expect the change to be immediately visible. So let's fix this.

We can observe attributes by providing their list in `observedAttributes()` static getter. For such attributes, `attributeChangedCallback` is called when they are modified. It doesn't trigger for other, unlisted attributes (that's for performance reasons).

Here's a new `<time-formatted>`, that auto-updates when attributes change:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
1. レンダリングロジックは `render` ヘルパーメソッドに移動しました。
2. 要素がページに挿入されたときに1回だけ呼び出します。
3. `observedAttributes()` にリストされた属性の変更に対し、`attributeChangedCallback` がトリガーされます。
4. ...要素を再描画します。
5. 最後に、簡単にライブタイマーを作る事ができます。

## レンダリング順

HTML パーサーが DOM を構築するとき、要素は次々に処理されます(子の前に親)。E.g. `<outer><inner></inner></outer>` の場合、まず `<outer>` 要素が作成され、DOM に挿入され、次に `<inner>` になります。

これはカスタム要素に対して重要な結果をもたらします。

例えば、カスタム要素が `connectedCallback` の中で `innerHTML` にアクセスしようとしても、何も得られません。:
=======
1. The rendering logic is moved to `render()` helper method.
2. We call it once when the element is inserted into page.
3. For a change of an attribute, listed in `observedAttributes()`, `attributeChangedCallback` triggers.
4. ...and re-renders the element.
5. At the end, we can easily make a live timer.

## Rendering order

When HTML parser builds the DOM, elements are processed one after another, parents before children. E.g. if we have `<outer><inner></inner></outer>`, then `<outer>` element is created and connected to DOM first, and then `<inner>`.

That leads to important consequences for custom elements.

For example, if a custom element tries to access `innerHTML` in `connectedCallback`, it gets nothing:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=40
<script>
customElements.define('user-info', class extends HTMLElement {

  connectedCallback() {
*!*
<<<<<<< HEAD
    alert(this.innerHTML); // 空 (*)
=======
    alert(this.innerHTML); // empty (*)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  }

});
</script>

*!*
<user-info>John</user-info>
*/!*
```

<<<<<<< HEAD
これを実行しても `alert` は空です。

これはまさに、その段階では子がおらず、DOMが未完了だからです。HTML パーサーはカスタム要素 `<user-info>` を処理し、この後その子を処理していきますが、まだ行っていません。

カスタム要素に情報を渡したい場合は、属性を使用することができます。これらはすぐに利用可能です。

あるいは、本当に子が必要な場合、遅延ゼロの `setTimeout` を使ってアクセスを遅らせることができます。

これは動作します:
=======
If you run it, the `alert` is empty.

That's exactly because there are no children on that stage, the DOM is unfinished. HTML parser connected the custom element `<user-info>`, and is going to proceed to its children, but just didn't yet.

If we'd like to pass information to custom element, we can use attributes. They are available immediately.

Or, if we really need the children, we can defer access to them with zero-delay `setTimeout`.

This works:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
これで、HTMLの構文解析が完了した後、非同期に実行することになるので、行 `(*)` の `alert` では "John" が表示されます。必要に応じて子を処理して、初期化を完了することができます。

一方、この解決策も完璧ではありません。ネストされたカスタム要素も自身の初期化に `setTimeout` を使用していた場合、それらはキューに入れられます(列を作ります): 外側の `setTimeout` が最初にトリガーされ、その後内部のものがトリガーされます。

そのため、外部の要素は内部の要素の初期化の前に初期化が終了します。

例を挙げて説明しましょう:
=======
Now the `alert` in line `(*)` shows "John", as we run it asynchronously, after the HTML parsing is complete. We can process children if needed and finish the initialization.

On the other hand, this solution is also not perfect. If nested custom elements also use `setTimeout` to initialize themselves, then they queue up: the outer `setTimeout` triggers first, and then the inner one.

So the outer element finishes the initialization before the inner one.

Let's demonstrate that on example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======
Output order:

1. outer connected.
2. inner connected.
3. outer initialized.
4. inner initialized.

We can clearly see that the outer element finishes initialization `(3)` before the inner one `(4)`.

There's no built-in callback that triggers after nested elements are ready. If needed, we can implement such thing on our own. For instance, inner elements can dispatch events like `initialized`, and outer ones can listen and react on them.

## Customized built-in elements

New elements that we create, such as `<time-formatted>`, don't have any associated semantics. They are unknown to search engines, and accessibility devices can't handle them.

But such things can be important. E.g, a search engine would be interested to know that we actually show a time. And if we're making a special kind of button, why not reuse the existing `<button>` functionality?

We can extend and customize built-in HTML elements by inheriting from their classes.

For example, buttons are instances of `HTMLButtonElement`, let's build upon it.

1. Extend `HTMLButtonElement` with our class:

    ```js
    class HelloButton extends HTMLButtonElement { /* custom element methods */ }
    ```

2. Provide the third argument to `customElements.define`, that specifies the tag:
    ```js
    customElements.define('hello-button', HelloButton, *!*{extends: 'button'}*/!*);
    ```    

    There may be different tags that share the same DOM-class, that's why specifying `extends` is needed.

3. At the end, to use our custom element, insert a regular `<button>` tag, but add `is="hello-button"` to it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```html
    <button is="hello-button">...</button>
    ```

<<<<<<< HEAD
これは完全な例です:

```html run autorun="no-epub"
<script>
// クリックすると "hello" を表示するボタン
=======
Here's a full example:

```html run autorun="no-epub"
<script>
// The button that says "hello" on click
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
我々の新しいボタンは組み込みのボタンを拡張しています。なので、同じスタイルや `disabled` 属性のような標準の機能を持っています。

## リファレンス

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- 互換性: <https://caniuse.com/#feat=custom-elements>.

## サマリ

カスタム要素には2つのタイプがあります:

1. "自律型" -- 新しいタグで `HTMLElement` を拡張します

    定義のスキーム:
=======
Our new button extends the built-in one. So it keeps the same styles and standard features like `disabled` attribute.

## References

- HTML Living Standard: <https://html.spec.whatwg.org/#custom-elements>.
- Compatiblity: <https://caniuse.com/#feat=custom-elementsv1>.

## Summary

Custom elements can be of two types:

1. "Autonomous" -- new tags, extending `HTMLElement`.

    Definition scheme:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
2. "カスタマイズされた組み込み要素" -- 既存要素の拡張です

    もう１つの `.define` の引数と、HTML には `is="..."` が必要です:
=======
2. "Customized built-in elements" -- extensions of existing elements.

    Requires one more `.define` argument, and `is="..."` in HTML:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js
    class MyButton extends HTMLButtonElement { /*...*/ }
    customElements.define('my-button', MyElement, {extends: 'button'});
    /* <button is="my-button"> */
    ```

<<<<<<< HEAD
カスタム要素はブラウザ間では十分にサポートされています。Edge は少し遅れていますが、polyfill <https://github.com/webcomponents/webcomponentsjs> があります。
=======
Custom elements are well-supported among browsers. There's a polyfill <https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
