<<<<<<< HEAD
# Shadow DOM スロット, コンポジション

タブ、メニュー、イメージギャラリーなど、多くのコンポーネントはレンダリングするのにコンテンツを必要とします。

組み込みのブラウザの `<select>` が `<option>` 項目を期待するように、独自に作った `<custom-tabs>` も実際のタブコンテンツが渡されることを期待することがあります。

`<custom-menu>` を使用するコードは次のようになります:
=======
# Shadow DOM slots, composition

Many types of components, such as tabs, menus, image galleries, and so on, need the content to render.

Just like built-in browser `<select>` expects `<option>` items, our `<custom-tabs>` may expect the actual tab content to be passed. And a `<custom-menu>` may expect menu items.

The code that makes use of `<custom-menu>` can look like this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<custom-menu>
  <title>Candy menu</title>
  <item>Lollipop</item>
  <item>Fruit Toast</item>
  <item>Cup Cake</item>
</custom-menu>
```

<<<<<<< HEAD
...そして、このコンポーネントはタイトルとアイテムを持つメニューとして、メニューイベントを処理するなど、適切にレンダリングできる必要ががあります。

どうやって実装するのでしょう？

要素の内容を分析し、DOM ノードを動的にコピー,再配置することもできます。ただ、可能ですが要素を shadow DOM に移動している場合、ドキュメントの CSS スタイルは適用されないため視覚的なスタイルが失われる可能性があります。また、ある程度コーディングが必要になります。

幸いなことに、これをする必要はありません。Shadow DOM は `<slot>` 要素をサポートしています。これは Light DOM のコンテンツを自動的に入れてくれます。

## 名前付きスロット

簡単な例で slot(スロット)がどのように動くか確認しましょう。

ここにある `<user-card>` Shadow DOM は Light DOM で埋められる2つのスロットを提供します。:
=======
...Then our component should render it properly, as a nice menu with given title and items, handle menu events, etc.

How to implement it?

We could try to analyze the element content and dynamically copy-rearrange DOM nodes. That's possible, but if we're moving elements to shadow DOM, then CSS styles from the document do not apply in there, so the visual styling may be lost. Also that requires some coding.

Luckily, we don't have to. Shadow DOM supports `<slot>` elements, that are automatically filled by the content from light DOM.

## Named slots

Let's see how slots work on a simple example.

Here, `<user-card>` shadow DOM provides two slots, filled from light DOM:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Name:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Birthday:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>John Smith</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>
```

<<<<<<< HEAD
Shadow DOM では、`<slot name="X">` で "挿入位置" (`slot="X"` を持つ要素がレンダリングされる場所)を定義します。

次に、ブラウザは "コンポジション(composition)" を実行します。: Light DOM から要素を取得し、Shadow DOM の対応するスローっとにレンダリングしていきます。最後に、まさに必要なもの -- データが挿入されたコンポーネントになります。

これはスクリプト後の DOM 構造です。コンポジションは考慮されていません。:
=======
In the shadow DOM, `<slot name="X">` defines an "insertion point", a place where elements with `slot="X"` are rendered.

Then the browser performs "composition": it takes elements from the light DOM and renders them in corresponding slots of the shadow DOM. At the end, we have exactly what we want -- a component that can be filled with data.

Here's the DOM structure after the script, not taking composition into account:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

<<<<<<< HEAD
Shadow DOM を作成したので、`#shadow-root` の下にそれがあります。今、要素は Light と Shadow DOM 両方を持ってます。

レンダリングするために、Shadow DOM 内の各 `<slot name="...">` に対して、ブラウザは Light DOM に同じ名前をもつ `slot="..."` を探します。これらの要素がスロット内でレンダリングされます。:

![](shadow-dom-user-card.svg)

結果は "flattened" DOM(フラット化された DOM ツリー)と呼ばれます:
=======
We created the shadow DOM, so here it is, under `#shadow-root`. Now the element has both light and shadow DOM.

For rendering purposes, for each `<slot name="...">` in shadow DOM, the browser looks for `slot="..."` with the same name in the light DOM. These elements are rendered inside the slots:

![](shadow-dom-user-card.svg)

The result is called "flattened" DOM:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
<<<<<<< HEAD
        <!-- スロット対象の要素はスロット内に挿入されます -->
=======
        <!-- slotted element is inserted into the slot -->
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

<<<<<<< HEAD
...ですが、フラット化された DOM はレンダリングとイベント処理の目的でのみ存在します。これは一種の "仮想" であり、どのように見えるかを示します。ですが、ドキュメント内のノードは実際には移動していません!

`querySelector` を実行することで簡単に確認ができます: ノードはまだその場所にあります。

```js
// `<user-card>` の下にある light DOM <span> ノードはまだ同じ場所にいます
alert( document.querySelector('user-card span').length ); // 2
```

したがって、フラット化された DOM はスロットを挿入することで Shadow DOM から派生しています。ブラウザはそれをレンダリングし、スタイルの継承やイベントの伝搬(詳細は後ほど)に使用します。ですが、JavaScript は依然としてフラット化する前のドキュメント "そのまま" を見ています。

````warn header="最上位の子だけが slot=\"...\" 属性を持てます"
`slot="..."` 属性はシャドウホスト(上の例で言うと `<user-card>` 要素)の直接の子に対してのみ有効です。ネストされた要素に対しては無視されます。

例えば、ここでは2つ目の `<span>` は無視されます(`<user-card>｀ の最上位の子ではないため):
=======
...But the flattened DOM exists only for rendering and event-handling purposes. It's kind of "virtual". That's how things are shown. But the nodes in the document are actually not moved around!

That can be easily checked if we run `querySelector`: nodes are still at their places.

```js
// light DOM <span> nodes are still at the same place, under `<user-card>`
alert( document.querySelector('user-card span').length ); // 2
```

So, the flattened DOM is derived from shadow DOM by inserting slots. The browser renders it and uses for style inheritance, event propagation (more about that later). But JavaScript still sees the document "as is", before flattening.

````warn header="Only top-level children may have slot=\"...\" attribute"
The `slot="..."` attribute is only valid for direct children of the shadow host (in our example, `<user-card>` element). For nested elements it's ignored.

For example, the second `<span>` here is ignored (as it's not a top-level child of `<user-card>`):
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
<<<<<<< HEAD
    <!-- 無効なスロット, user-card の直接の子である必要があります -->
=======
    <!-- invalid slot, must be direct child of user-card -->
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```
````

<<<<<<< HEAD
Light DOM に同じスロット名を持つ複数の要素がある場合、それらは順々にスロットに追加されます。

例えばこの場合:
=======
If there are multiple elements in light DOM with the same slot name, they are appended into the slot, one after another.

For example, this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

<<<<<<< HEAD
`<slot name="username">` に2つの要素を持つフラット化された DOM になります:
=======
Gives this flattened DOM with two elements in `<slot name="username">`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

<<<<<<< HEAD
## スロット フォールバックコンテンツ

`<slot>` の中に何かを置くと、それがフォールバックとなり、"デフォルト" のコンテンツになります。ブラウザは Light DOM に対応するものがない場合これを表示します。

例えば、この Shadow DOM では、Light DOM に `slot="username"` がなければ、`Anonymous` をレンダリングします。
=======
## Slot fallback content

If we put something inside a `<slot>`, it becomes the fallback, "default" content. The browser shows it if there's no corresponding filler in light DOM.

For example, in this piece of shadow DOM, `Anonymous` renders if there's no `slot="username"` in light DOM.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<div>Name:
  <slot name="username">Anonymous</slot>
</div>
```

## Default slot: first unnamed

<<<<<<< HEAD
Shadow DOM 内の、名前を持たない最初の `<slot>` が "デフォルト" スロットです。Light DOM でどこにもスロットされていなすべてのノードを取得します。

例えば、ユーザに関するすべてのスロットなし情報を表示するデフォルトスロットを `<user-card>` に追加しましょう:
=======
The first `<slot>` in shadow DOM that doesn't have a name is a "default" slot. It gets all nodes from the light DOM that aren't slotted elsewhere.

For example, let's add the default slot to our `<user-card>` that shows all unslotted information about the user:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Name:
      <slot name="username"></slot>
    </div>
    <div>Birthday:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Other information</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>I like to swim.</div>
*/!*
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...And play volleyball too!</div>
*/!*
</user-card>
```

<<<<<<< HEAD
すべてのスロットなしの Light DOM のコンテンツは "Other information" のフィールドセットに入ります。

要素はスロットに次々に追加されるので、スロットなしの情報は両方ともデフォルトスロットになります。

フラット化された DOM はこのようになります:
=======
All the unslotted light DOM content gets into the "Other information" fieldset.

Elements are appended to a slot one after another, so both unslotted pieces of information are in the default slot together.

The flattened DOM looks like this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<user-card>
  #shadow-root
    <div>Name:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Birthday:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>About me</legend>
*!*
      <slot>
        <div>Hello</div>
        <div>I am John!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

<<<<<<< HEAD
## メニュー例

ではこのチャプターの冒頭で言及した `<custom-menu>` に戻りましょう。

要素を配置するのはスロットが使えます。

これは `<custom-menu>` のマークアップです:
=======
## Menu example

Now let's back to `<custom-menu>`, mentioned at the beginning of the chapter.

We can use slots to distribute elements.

Here's the markup for `<custom-menu>`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<custom-menu>
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
  <li slot="item">Cup Cake</li>
</custom-menu>
```

<<<<<<< HEAD
これは適切なスロットを持つ Shadow DOM テンプレートです:
=======
The shadow DOM template with proper slots:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<template id="tmpl">
  <style> /* menu styles */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

<<<<<<< HEAD
1. `<span slot="title">` は `<slot name="title">` に入ります。
2. 複数の `<li slot="item">` がありますが、テンプレートには `<slot name="item">` が1つだけです。そのため、すべての `<li slot="item">` は `<slot name="item">` に順に追加され、リストを形成します。

フラット化された DOM は次のようになります:
=======
1. `<span slot="title">` goes into `<slot name="title">`.
2. There are many `<li slot="item">` in the template, but only one `<slot name="item">` in the template. So all such `<li slot="item">` are appended to `<slot name="item">` one after another, thus forming the list.

The flattened DOM becomes:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```html
<custom-menu>
  #shadow-root
    <style> /* menu styles */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Candy menu</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Lollipop</li>
          <li slot="item">Fruit Toast</li>
          <li slot="item">Cup Cake</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

One might notice that, in a valid DOM, `<li>` must be a direct child of `<ul>`. But that's flattened DOM, it describes how the component is rendered, such thing happens naturally here.

We just need to add a `click` handler to open/close the list, and the `<custom-menu>` is ready:

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl is the shadow DOM template (above)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // we can't select light DOM nodes, so let's handle clicks on the slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // open/close the menu
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

Here's the full demo:

[iframe src="menu" height=140 edit]

Of course, we can add more functionality to it: events, methods and so on.

## Updating slots

What if the outer code wants to add/remove menu items dynamically?

**The browser monitors slots and updates the rendering if slotted elements are added/removed.**

Also, as light DOM nodes are not copied, but just rendered in slots, the changes inside them immediately become visible.

So we don't have to do anything to update rendering. But if the component code wants to know about slot changes, then `slotchange` event is available.

For example, here the menu item is inserted dynamically after 1 second, and the title changes after 2 seconds:

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot can't have event handlers, so using the first child
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Lollipop</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "New menu";
}, 2000);
</script>
```

The menu rendering updates each time without our intervention.

There are two `slotchange` events here:

1. At initialization:

    `slotchange: title` triggers immediately, as the `slot="title"` from the light DOM gets into the corresponding slot.
2. After 1 second:

    `slotchange: item` triggers, when a new `<li slot="item">` is added.

Please note: there's no `slotchange` event after 2 seconds, when the content of `slot="title"` is modified. That's because there's no slot change. We modify the content inside the slotted element, that's another thing.

If we'd like to track internal modifications of light DOM from JavaScript, that's also possible using a more generic mechanism: [MutationObserver](info:mutation-observer).

## Slot API

Finally, let's mention the slot-related JavaScript methods.

As we've seen before, JavaScript looks at the "real" DOM, without flattening. But, if the shadow tree has `{mode: 'open'}`, then we can figure out which elements assigned to a slot and, vise-versa, the slot by the element inside it:

- `node.assignedSlot` -- returns the `<slot>` element that the `node` is assigned to.
- `slot.assignedNodes({flatten: true/false})` -- DOM nodes, assigned to the slot. The `flatten` option is `false` by default. If explicitly set to `true`, then it looks more deeply into the flattened DOM, returning nested slots in case of nested components and the fallback content if no node assigned.
- `slot.assignedElements({flatten: true/false})` -- DOM elements, assigned to the slot (same as above, but only element nodes).

These methods are useful when we need not just show the slotted content, but also track it in JavaScript.

For example, if `<custom-menu>` component wants to know, what it shows, then it could track `slotchange` and get the items from `slot.assignedElements`:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Candy menu</span>
  <li slot="item">Lollipop</li>
  <li slot="item">Fruit Toast</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // slottable is added/removed/replaced
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
*/!*
  }
});

// items update after 1 second
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Cup Cake</li>')
}, 1000);
</script>
```


## Summary

Usually, if an element has shadow DOM, then its light DOM is not displayed. Slots allow to show elements from light DOM in specified places of shadow DOM.

There are two kinds of slots:

- Named slots: `<slot name="X">...</slot>` -- gets light children with `slot="X"`.
- Default slot: the first `<slot>` without a name (subsequent unnamed slots are ignored) -- gets unslotted light children.
- If there are many elements for the same slot -- they are appended one after another.
- The content of `<slot>` element is used as a fallback. It's shown if there are no light children for the slot.

The process of rendering slotted elements inside their slots is called "composition". The result is called a "flattened DOM".

Composition does not really move nodes, from JavaScript point of view the DOM is still same.

JavaScript can access slots using methods:
- `slot.assignedNodes/Elements()` -- returns nodes/elements inside the `slot`.
- `node.assignedSlot` -- the reverse meethod, returns slot by a node.

If we'd like to know what we're showing, we can track slot contents using:
- `slotchange` event -- triggers the first time a slot is filled, and on any add/remove/replace operation of the slotted element, but not its children. The slot is `event.target`.
- [MutationObserver](info:mutation-observer) to go deeper into slot content, watch changes inside it.

Now, as we know how to show elements from light DOM in shadow DOM, let's see how to style them properly. The basic rule is that shadow elements are styled inside, and light elements -- outside, but there are notable exceptions.

We'll see the details in the next chapter.
