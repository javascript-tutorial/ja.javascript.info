<<<<<<< HEAD
# Shadow DOMとイベント
shadow ツリーの背後にあるアイデアは、コンポーネント内部の実装の詳細をカプセル化することにあります。

例えば、クリックイベントがshadow DOMの`<user-card>`コンポーネント内で発生したとします。しかしメインドキュメント内のスクリプトはshadow DOM内部については何も知りません。特にコンポーネントがサードパーティライブラリから来たものである場合はなおさらです。

なので、詳細をカプセル化したままにするために、ブラウザはイベントを*リターゲティングします。*

**shadow DOM内で発生するイベントがコンポーネントの外でキャッチされると、そのイベントはターゲットとしてShadowホスト要素を持ちます。**
=======
# Shadow DOM and events

The idea behind shadow tree is to encapsulate internal implementation details of a component.

Let's say, a click event happens inside a shadow DOM of `<user-card>` component. But scripts in the main document have no idea about the shadow DOM internals, especially if the component comes from a 3rd-party library.  

So, to keep the details encapsulated, the browser *retargets* the event.

**Events that happen in shadow DOM have the host element as the target, when caught outside of the component.**

Here's a simple example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun="no-epub" untrusted height=60
<user-card></user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<p>
      <button>Click me</button>
    </p>`;
    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

document.onclick =
  e => alert("Outer target: " + e.target.tagName);
</script>
```

<<<<<<< HEAD
ボタンをクリックした場合、そのメッセージは:
1. 内部ターゲット: `BUTTON` -- 内部イベントハンドラーは適切なターゲット、shadow DOM内の要素を取得します。

2. 外部ターゲット: `USER-CARD` -- ドキュメントイベントハンドラーはターゲットとしてShadow ホストを取得します。

イベントリターゲティングは、外部ドキュメントがコンポーネントの内部について知らなくてもいいので、素晴らしいものです。この観点から、イベントは`<user-card>`に起こります。

**リターゲティングは、物理的にlight DOM内に存在するスロット化された要素上でイベントが起こった場合には発生しません。**
例えば、ユーザーが以下の例の`<span slot="username">`をクリックした場合、shadowハンドラー とlightハンドラーの両方で、イベントターゲットはまさにこの`span`要素になります。
=======
If you click on the button, the messages are:

1. Inner target: `BUTTON` -- internal event handler gets the correct target, the element inside shadow DOM.
2. Outer target: `USER-CARD` -- document event handler gets shadow host as the target.

Event retargeting is a great thing to have, because the outer document doesn't have to know  about component internals. From its point of view, the event happened on `<user-card>`.

**Retargeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM.**

For example, if a user clicks on `<span slot="username">` in the example below, the event target is exactly this `span` element, for both shadow and light handlers:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```html run autorun="no-epub" untrusted height=60
<user-card id="userCard">
*!*
  <span slot="username">John Smith</span>
*/!*
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>
      <b>Name:</b> <slot name="username"></slot>
    </div>`;

    this.shadowRoot.firstElementChild.onclick =
      e => alert("Inner target: " + e.target.tagName);
  }
});

userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
</script>
```

<<<<<<< HEAD
クリックが`"John Smith"`で起こった場合は、内部と外部のハンドラーのターゲットは`<span slot="username">`になります。それはlight DOMからの要素なので、リターゲティングはありません。
その一方で、クリックが`<b>Name</b>`のような shadow DOMにある要素で発生した場合,
shadow DOMの外にバブルするので、その`event.target`は`<user-card>`にセットし直されます。

## バブリング、 event.composedPath()
イベントバブリングでは、フラット化されたDOMが使用されます。
したがって、スロット化された要素が存在し、その中のどこかでイベントが発生した場合、そのイベントは`<slot>`まで上方にバブリングします。
全てのshadow要素を含む、オリジナルのイベントターゲットへの絶対パスは、`event.composedPath()`を使用して取得できます。このメソッドの名前から分かる通り、そのパスは合成後に取得されます。

上記の例では、フラット化されたDOMは:
=======
If a click happens on `"John Smith"`, for both inner and outer handlers the target is `<span slot="username">`. That's an element from the light DOM, so no retargeting.

On the other hand, if the click occurs on an element originating from shadow DOM, e.g. on `<b>Name</b>`, then, as it bubbles out of the shadow DOM, its `event.target` is reset to `<user-card>`.

## Bubbling, event.composedPath()

For purposes of event bubbling, flattened DOM is used.

So, if we have a slotted element, and an event occurs somewhere inside it, then it bubbles up to the `<slot>` and upwards.

The full path to the original event target, with all the shadow elements, can be obtained using `event.composedPath()`. As we can see from the name of the method, that path is taken after the composition.

In the example above, the flattened DOM is:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```html
<user-card id="userCard">
  #shadow-root
    <div>
      <b>Name:</b>
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
</user-card>
```


<<<<<<< HEAD
なので、`<span slot="username">`のクリックで、`event.composedPath()`の呼び出しは配列[`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]を返します。これがまさに合成後のフラット化されたDOM内でのターゲット要素から親へのチェーンのことです。

```warn header="Shadow ツリーの詳細は `{mode:'open'}` ツリーにのみ提供されます"
Shadow ツリーが`{mode: 'closed'}`で作られた場合、その合成パスはホスト: `user-card`とその上部から始まります。
これはshadow DOMと作用する他のメソッドと同様の原理です。閉じたツリーの内部は完璧に隠されています。
=======
So, for a click on `<span slot="username">`, a call to `event.composedPath()` returns an array: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]. That's exactly the parent chain from the target element in the flattened DOM, after the composition.

```warn header="Shadow tree details are only provided for `{mode:'open'}` trees"
If the shadow tree was created with `{mode: 'closed'}`, then the composed path starts from the host: `user-card` and upwards.

That's the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```


## event.composed

<<<<<<< HEAD
ほとんどのイベントはshadow DOMの境界を通してバブルします。しかしイベントの中にはこのルールに従わないものもあります。

これは`composed`イベントオブジェクトプロパティによって管理されます。`true`の場合は、イベントは境界を超えます。そうでない場合は、shadow DOM内からのみ取得できます。
[UI Events 仕様](https://www.w3.org/TR/uievents)をご覧いただくと、ほとんどのイベントは`composed: true`です。：
=======
Most events successfully bubble through a shadow DOM boundary. There are few events that do not.

This is governed by the `composed` event object property. If it's `true`, then the event does cross the boundary. Otherwise, it only can be caught from inside the shadow DOM.

If you take a look at [UI Events specification](https://www.w3.org/TR/uievents), most events have `composed: true`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

<<<<<<< HEAD
全てのタッチイベントとポインターは、`composed: true`です。

イベントの中には`composed: false`のものもありますが：
- `mouseenter`, `mouseleave` (これらは全くバブルしません),
=======
All touch events and pointer events also have `composed: true`.

There are some events that have `composed: false` though:

- `mouseenter`, `mouseleave` (they do not bubble at all),
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

<<<<<<< HEAD
これらのイベントはイベントターゲットが属する同じDOM内の要素でのみキャッチされます。

## カスタムイベント

カスタムイベントをディスパッチすると、コンポーネントの外にバブルさせるために`bubbles`と`composed`の両方のプロパティを`true`に設定する必要があります。

例えば、ここでは`div#outer`のshadow DOMに`div#inner`を作成し、二つのイベントを発火します。`composed: true`をもつイベントのみがドキュメントの外にバブルします。:
=======
These events can be caught only on elements within the same DOM, where the event target resides.

## Custom events

When we dispatch custom events, we need to set both `bubbles` and `composed` properties to `true` for it to bubble up and out of the component.

For example, here we create `div#inner` in the shadow DOM of `div#outer` and trigger two events on it. Only the one with `composed: true` makes it outside to the document:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run untrusted height=0
<div id="outer"></div>

<script>
outer.attachShadow({mode: 'open'});

let inner = document.createElement('div');
outer.shadowRoot.append(inner);

/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/

document.addEventListener('test', event => alert(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: true,
*/!*
  detail: "composed"
}));

inner.dispatchEvent(new CustomEvent('test', {
  bubbles: true,
*!*
  composed: false,
*/!*
  detail: "not composed"
}));
</script>
```

<<<<<<< HEAD
## サマリ

`composed`フラグが`true`に設定されている場合にのみ、イベントはshadow DOM境界を超えます。
組み込みのイベントは、関連する仕様に記載されている通り、ほとんどの場合`composed: true`です:
- UIイベント <https://www.w3.org/TR/uievents>.
- タッチイベント <https://w3c.github.io/touch-events>.
- ポインターイベント <https://www.w3.org/TR/pointerevents>.
- ...など.

組み込みイベントの中には`composed: false`のものもあります:

- `mouseenter`, `mouseleave` (バブルしません),
=======
## Summary

Events only cross shadow DOM boundaries if their `composed` flag is set to `true`.

Built-in events mostly have `composed: true`, as described in the relevant specifications:

- UI Events <https://www.w3.org/TR/uievents>.
- Touch Events <https://w3c.github.io/touch-events>.
- Pointer Events <https://www.w3.org/TR/pointerevents>.
- ...And so on.

Some built-in events that have `composed: false`:

- `mouseenter`, `mouseleave` (also do not bubble),
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

<<<<<<< HEAD
これらのイベントは同じDOM内の要素でのみキャッチできます。

`CustomEvent`をディスパッチする場合は、明確に`composed: true`を設定するべきです。

ネストされたコンポーネント、ある shadow DOM が別の shadow DOM にネストされる場合があることに注意してください。この場合、合成されたイベントはすべての shadow DOM 境界をバブルします。したがって、もしイベントが直接囲んでいるコンポーネントだけを意図している場合は、そのイベントを shadow ホストにディスパッチして、`composed: false` にすることもできます。すると、イベントはコンポーネントのシャドウDOMの外にありますが、上位レベルのDOMにバブルすることはありません。
=======
These events can be caught only on elements within the same DOM.

If we dispatch a `CustomEvent`, then we should explicitly set `composed: true`.

Please note that in case of nested components, one shadow DOM may be nested into another. In that case composed events bubble through all shadow DOM boundaries. So, if an event is intended only for the immediate enclosing component, we can also dispatch it on the shadow host and set `composed: false`. Then it's out of the component shadow DOM, but won't bubble up to higher-level DOM.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
