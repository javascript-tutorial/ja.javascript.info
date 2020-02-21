# Shadow DOM スタイリング

Shadow DOM のスタイリングには `<style>`と`<link rel="stylesheet" href="…">`の両方のタグを含める方法があります。後者の場合では、スタイルシートは HTTP にキャッシュされるので、同じテンプレートを使用する複数のコンポーネントをロードするたびにダウンロードされることはありません。

一般的なルールとして、ローカルスタイルは Shadow ツリーの中でのみ作用します。そしてドキュメントスタイルはその Shadow ツリーの外側で利用できます。しかしいくつか例外もあります。

## :host

`:host`セレクターはシャドウホスト（Shadow ツリーを含む要素）を選択できます。
例えば、中央に配置される`<custom-dialog>`要素を作っているとします。この場合、`<custom-dialog>`要素自身をスタイリングする必要があります。
これがまさに`:host`がすることです。

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* スタイルはcustom-dialog要素の中から適用されます。 */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Cascading

シャドウホスト(`<custom-dialog>`)はlight DOM の中にあり、CSS ルールに影響されます。
:host とドキュメントの両方にスタイルされたプロパティがある場合は、ドキュメントのスタイルが優先されます。

例えば、ドキュメント内に以下が宣言されている場合は

```html
<style>
  custom-dialog {
    padding: 0;
  }
</style>
```

...`<custom-dialog>`はパディングなしになるでしょう。

`:host`の中で"default"コンポーネントスタイルを設定することができ、さらに簡単にドキュメント内で上書きできるため、この機能はとても便利です。

例外はローカルプロパティが`!important`とラベル付けされた場合で、この場合はローカルスタイルが優先されます。

## :host(selector)

`:host`と同様に、シャドウホストが`selector`にマッチする場合にのみ適用されます。
例えば、`<custom-dialog>`を中央に配置したい場合は`centered`属性を持つ場合のみ有効になります。

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  中央揃えです!
</custom-dialog>

<custom-dialog>
  中央に揃っていません。
</custom-dialog>
```

追加で中央に配置するスタイルは、`<custom-dialog centered>`の最初のダイアログでのみ適用されます。

## :host-context(selector)

`:host`と同様ですが、シャドウホストあるいはドキュメントの外側の祖先にマッチする場合のみ`selector`は適用できます。
例えば、`:host-context(.dark-theme)`は`<custom-dialog>`上に`dark-theme`クラスがある場合のみマッチします。

```html
<body class="dark-theme">
  <!--
    :host-context(.dark-theme)はdark-themeクラスの中にあるcustom-dialogs要素に適用されます。
  -->
  <custom-dialog>...</custom-dialog>
</body>
```

要約すると、文脈によりますが、メイン要素のコンポーネントをスタイルするために`:host`系統のセレクターを使用することができます。これらのスタイルは（`!important`がない限り）ドキュメントによって上書きすることができます。

## スロットコンテンツのスタイリング

それではスロットがある場合のシチュエーションを考えてみましょう。
スロットされた要素は light DOM に由来するので、これらの要素はドキュメントスタイルを使用します。ローカルスタイルはスロットされたコンテンツに影響されません。
以下の例では、ドキュメントスタイルによりスロットされた`<span>`は bold で、ローカルスタイルから`background`をとりません。

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

結果は bold で赤色ではありません。
もしコンポーネント内でスロットされた要素をスタイリングしたい場合は、二通りの方法があります。
一つ目の方法は、`<slot>`自体をスタイリングし、CSS 継承を利用します。

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

ここでCSS継承は`<slot>`とコンテンツの間で作用しているので、`<p>John Smith</p>`は bold になります。ただ、CSS自体の中で全てのプロパティが継承されるということではありません。

もう一つの方法は、`::slotted(selector)`擬似クラスの使用です。これは二つの条件に基づいた要素に一致します。

1. 要素自体が、スロット要素であり、light DOM 由来であること。スロット名は重要ではありません。要素自身がスロットされた要素であり、要素の子でなければ構いません。
2. 要素が`selector`に一致すること。

この場合であれば、::slotted(div)は<div slot="username">を選択します。その子要素ではありません。

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

注意して頂きたい点は、`::slotted`セレクタはスロット内でそれ以上降りていくことができない点です。これらの要素は有効ではありません。

```css
::slotted(div span) {
  /* スロットになる<div>要素はこれに一致しません。 */
}

::slotted(div) p {
  /* light DOM内に適用されません。 */
}
```

また、`::slotted`はCSSでのみ使用可能なので、`querySelector`では使用できません。

## カスタムプロパティと CSS フック

メインドキュメントからコンポーネントの内部の要素はどのようにスタイルするのでしょうか？

`:host`のようなセレクターは`<custom-dialog>`要素あるいは`<user-card>`要素にルールを適用できますが、それらの中のshadow DOM にはどのようにスタイリングしましょう？

ドキュメントからshadow DOM stylesに直接影響するセレクタはありません。しかし、コンポーネントに作用するメソッドを露出するように、スタイリングのためにCSS 変数（カスタムCSSプロパティ）を公開できます。

**カスタム CSS プロパティは light とシャドウの両方の内の全てのレベルで存在します。**

例えば、shadow DOM 内でフィールドをスタイリングするために CSS 変数`--user-card-field-color`を使用でき、さらに外側のドキュメントで値を設定することができます。

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* --user-card-field-colorが定義されていない場合は、ブラックが適用されます。 */
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
</style>
```

さらに、`<user-card>`のために外側のドキュメント内でこのプロパティを定義できます。

```css
user-card {
  --user-card-field-color: green;
}
```

カスタム CSS プロパティは shadow DOM を通り、グローバルスコープになるので、インナー`.field`ルールを使用できます。

以下が例です。

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

## サマリ

Shadow DOM は`<style>`あるいは`<link rel="stylesheet">`のようなスタイルを含みます。

ローカルスタイルは、以下の条件に影響します。

- Shadow ツリー,
- `:host`系統の擬似クラスをもつシャドウホスト,
- スロット要素(light DOM に由来), `::slotted(selector)`はこれらの子でなければ、自身をスロット要素に選択できます。

ドキュメントスタイルは以下の条件に影響します。

- シャドウホスト(アウトードキュメント内に存在)
- スロットされた要素とそれらのコンテンツ(外側のドキュメント内に存在)

CSS プロパティが衝突した場合は、通常`!important`ラベル付けされていない限り、ドキュメントスタイルが優先されます。その次にローカルスタイルが優先されます。

CSS カスタムプロパティは、shadow DOM へも影響を与えます。これらはコンポーネントをスタイルするための "フック" として使用されます。

1. コンポーネントは`var(--component-name-title, <default value>)`のようなキーとなる要素をスタイルするためにカスタム CSS プロパティを使用します。
2. コンポーネント作成者はこれらのプロパティを開発者にパブリッシュし、これらのプロパティは他のパブリックコンポーネントメソッドと同じくらいに重要です。
3. 開発者がタイトルをスタイリングしたい場合、開発者はシャドウホストあるいは上記のために`--component-name-title`CSS プロパティを割り当てます。
4. やったね!
