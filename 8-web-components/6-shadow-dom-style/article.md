<<<<<<< HEAD
# Shadow DOM スタイリング

Shadow DOM のスタイリングには `<style>`と`<link rel="stylesheet" href="…">`の両方のタグを含める方法があります。後者の場合では、スタイルシートは HTTP にキャッシュされるので、同じテンプレートを使用する複数のコンポーネントをロードするたびにダウンロードされることはありません。

一般的なルールとして、ローカルスタイルは Shadow ツリーの中でのみ作用します。そしてドキュメントスタイルはその Shadow ツリーの外側で利用できます。しかしいくつか例外もあります。

## :host

`:host`セレクターはシャドウホスト（Shadow ツリーを含む要素）を選択できます。
例えば、中央に配置される`<custom-dialog>`要素を作っているとします。この場合、`<custom-dialog>`要素自身をスタイリングする必要があります。
これがまさに`:host`がすることです。
=======
# Shadow DOM styling

Shadow DOM may include both `<style>` and `<link rel="stylesheet" href="…">` tags. In the latter case, stylesheets are HTTP-cached, so they are not redownloaded for multiple components that use same template.

As a general rule, local styles work only inside the shadow tree, and document styles work outside of it. But there are few exceptions.

## :host

The `:host` selector allows to select the shadow host (the element containing the shadow tree).

For instance, we're making `<custom-dialog>` element that should be centered. For that we need to style the `<custom-dialog>` element itself.

That's exactly what `:host` does:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
<<<<<<< HEAD
    /* スタイルはcustom-dialog要素の中から適用されます。 */
=======
    /* the style will be applied from inside to the custom-dialog element */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
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
=======
The shadow host (`<custom-dialog>` itself) resides in the light DOM, so it's affected by document CSS rules.

If there's a property styled both in `:host` locally, and in the document, then the document style takes precedence.

For instance, if in the document we had:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Then the `<custom-dialog>` would be without padding.

It's very convenient, as we can setup "default" component styles in its `:host` rule, and then easily override them in the document.

The exception is when a local property is labelled `!important`, for such properties, local styles take precedence.


## :host(selector)

Same as `:host`, but applied only if the shadow host matches the `selector`.

For example, we'd like to center the `<custom-dialog>` only if it has `centered` attribute:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
<<<<<<< HEAD
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

=======
  Centered!
</custom-dialog>

<custom-dialog>
  Not centered.
</custom-dialog>
```

Now the additional centering styles are only applied to the first dialog: `<custom-dialog centered>`.

To summarize, we can use `:host`-family of selectors to style the main element of the component. These styles (unless `!important`) can be overridden by the document.

## Styling slotted content

Now let's consider the situation with slots.

Slotted elements come from light DOM, so they use document styles. Local styles do not affect slotted content.

In the example below, slotted `<span>` is bold, as per document style, but does not take `background` from the local style:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
結果は bold で赤色ではありません。
もしコンポーネント内でスロットされた要素をスタイリングしたい場合は、二通りの方法があります。
一つ目の方法は、`<slot>`自体をスタイリングし、CSS 継承を利用します。
=======
The result is bold, but not red.

If we'd like to style slotted elements in our component, there are two choices.

First, we can style the `<slot>` itself and rely on CSS inheritance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
ここでCSS継承は`<slot>`とコンテンツの間で作用しているので、`<p>John Smith</p>`は bold になります。ただ、CSS自体の中で全てのプロパティが継承されるということではありません。

もう一つの方法は、`::slotted(selector)`擬似クラスの使用です。これは二つの条件に基づいた要素に一致します。

1. 要素自体が、スロット要素であり、light DOM 由来であること。スロット名は重要ではありません。要素自身がスロットされた要素であり、要素の子でなければ構いません。
2. 要素が`selector`に一致すること。

この場合であれば、::slotted(div)は<div slot="username">を選択します。その子要素ではありません。
=======
Here `<p>John Smith</p>` becomes bold, because CSS inheritance is in effect between the `<slot>` and its contents. But in CSS itself not all properties are inherited.

Another option is to use `::slotted(selector)` pseudo-class. It matches elements based on two conditions:

1. That's a slotted element, that comes from the light DOM. Slot name doesn't matter. Just any slotted element, but only the element itself, not its children.
2. The element matches the `selector`.

In our example, `::slotted(div)` selects exactly `<div slot="username">`, but not its children:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======
Please note, `::slotted` selector can't descend any further into the slot. These selectors are invalid:

```css
::slotted(div span) {
  /* our slotted <div> does not match this */
}

::slotted(div) p {
  /* can't go inside light DOM */
}
```

Also, `::slotted` can only be used in CSS. We can't use it in `querySelector`.

## CSS hooks with custom properties

How do we style internal elements of a component from the main document?

Selectors like `:host` apply rules to `<custom-dialog>` element or `<user-card>`, but how to style shadow DOM elements inside them?

There's no selector that can directly affect shadow DOM styles from the document. But just as we expose methods to interact with our component, we can expose CSS variables (custom CSS properties) to style it.

**Custom CSS properties exist on all levels, both in light and shadow.**

For example, in shadow DOM we can use `--user-card-field-color` CSS variable to  style fields, and the outer document can set its value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
<<<<<<< HEAD
    /* --user-card-field-colorが定義されていない場合は、ブラックが適用されます。 */
=======
    /* if --user-card-field-color is not defined, use black color */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
<<<<<<< HEAD
</style>
```

さらに、`<user-card>`のために外側のドキュメント内でこのプロパティを定義できます。
=======
```

Then, we can declare this property in the outer document for `<user-card>`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```css
user-card {
  --user-card-field-color: green;
}
```

<<<<<<< HEAD
カスタム CSS プロパティは shadow DOM を通り、グローバルスコープになるので、インナー`.field`ルールを使用できます。

以下が例です。
=======
Custom CSS properties pierce through shadow DOM, they are visible everywhere, so the inner `.field` rule will make use of it.

Here's the full example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======


## Summary

Shadow DOM can include styles, such as `<style>` or `<link rel="stylesheet">`.

Local styles can affect:
- shadow tree,
- shadow host with `:host` and `:host()` pseudoclasses,
- slotted elements (coming from light DOM), `::slotted(selector)` allows to select  slotted elements themselves, but not their children.

Document styles can affect:
- shadow host (as it lives in the outer document)
- slotted elements and their contents (as that's also in the outer document)

When CSS properties conflict, normally document styles have precedence, unless the property is labelled as `!important`. Then local styles have precedence.

CSS custom properties pierce through shadow DOM. They are used as "hooks" to style the component:

1. The component uses a custom CSS property to style key elements, such as `var(--component-name-title, <default value>)`.
2. Component author publishes these properties for developers, they are same important as other public component methods.
3. When a developer wants to style a title, they assign `--component-name-title` CSS property for the shadow host or above.
4. Profit!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
