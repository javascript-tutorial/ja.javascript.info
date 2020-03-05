# Shadow DOM and events
# Shadow DOMとイベント
The idea behind shadow tree is to encapsulate internal implementation details of a component.
shadow ツリーの背後にあるアイデアは、内部のコンポーネントの実装の詳細をカプセル化させることにあります。

Let's say, a click event happens inside a shadow DOM of `<user-card>` component. But scripts in the main document have no idea about the shadow DOM internals, especially if the component comes from a 3rd-party library.  
例えば、クリックイベントがshadow DOMの`<user-card>`コンポーネント内で発生したとします。しかしメインドキュメント内のスクリプトはshadow DOM内部については何も知りません。特にもしコンポーネントがサードパーティライブラリから来たものであればなおさらです。

So, to keep the details encapsulated, the browser *retargets* the event.
詳細をカプセル化したままにするために、ブラウザはイベントを*リターゲティングします。*
**Events that happen in shadow DOM have the host element as the target, when caught outside of the component.**
**shadow DOM内で起こるイベントはコンポーネントの外で取得される時、ターゲットとしてそのホスト要素を持ちます。**

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

If you click on the button, the messages are:
ボタンをクリックした場合、メッセージは
1. Inner target: `BUTTON` -- internal event handler gets the correct target, the element inside shadow DOM.
1. 内部ターゲット: `BUTTON` -- 内部イベントハンドラーはshadow DOM内の要素を適切なターゲットを取得します。
2. Outer target: `USER-CARD` -- document event handler gets shadow host as the target.
2. 外部ターゲット: `USER-CARD` -- ドキュメントイベントハンドラーはターゲットとしてShadow ホストを取得します。
Event retargeting is a great thing to have, because the outer document doesn't have to know  about component internals. From its point of view, the event happened on `<user-card>`.
イベントリターゲティングは、外部ドキュメントがコンポーネントの内部について知らなくてもいいので、素晴らしいものです。この観点から、イベントは`<user-card>`に起こります。
**Retargeting does not occur if the event occurs on a slotted element, that physically lives in the light DOM.**
**リターゲティングは、イベントが物理的にlightDOM内に存在するスロットされた要素上で起こった場合には発生しません。**
For example, if a user clicks on `<span slot="username">` in the example below, the event target is exactly this `span` element, for both shadow and light handlers:
例えば、ユーザーが以下の例の`<span slot="username">`をクリックした場合、シャドウハンドラーとライトハンドラーの両方で、イベントターゲットはまさにこの`span`要素になります。
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

If a click happens on `"John Smith"`, for both inner and outer handlers the target is `<span slot="username">`. That's an element from the light DOM, so no retargeting.
クリックが`"John Smith"`で起こった場合は、内部と外部のハンドラーのターゲットは`<span slot="username">`になります。それはlight DOMからの要素なので、リターゲティングはありません。
On the other hand, if the click occurs on an element originating from shadow DOM, e.g. on `<b>Name</b>`, then, as it bubbles out of the shadow DOM, its `event.target` is reset to `<user-card>`.
一方で、クリックがshadow DOMに由来する要素で発生した場合、例えば`<b>Name</b>`上の場合、それから、shadow DOMの外にバブルするように、その`event.target`は`<user-card>`にリセットします。
## Bubbling, event.composedPath()
## バブリング、 event.composedPath()
For purposes of event bubbling, flattened DOM is used.
イベントバブリングの目的に、フラット化したDOMが使用されます。
So, if we have a slotted element, and an event occurs somewhere inside it, then it bubbles up to the `<slot>` and upwards.
なので、スロット化された要素があり、イベントがその内部のどこかで起こった場合は、`<slot>`よりも上部に浮上します。
The full path to the original event target, with all the shadow elements, can be obtained using `event.composedPath()`. As we can see from the name of the method, that path is taken after the composition.
全てのシャドウ要素と共に、オリジナルのイベントターゲットへのフルパスは、`event.composedPath()`を使用して取得されます。このメソッドの名前から分かる通り、そのパスは合成後に取得されます。

In the example above, the flattened DOM is:
上記の例では、フラット化されたDOMは:
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


So, for a click on `<span slot="username">`, a call to `event.composedPath()` returns an array: [`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]. That's exactly the parent chain from the target element in the flattened DOM, after the composition.
なので、`<span slot="username">`のクリックで、`event.composedPath()`のコールは配列[`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]を返します。これがまさに合成後のフラット化DOM内でのターゲット要素から親チェーンのことです。

```warn header="Shadow tree details are only provided for `{mode:'open'}` trees"
If the shadow tree was created with `{mode: 'closed'}`, then the composed path starts from the host: `user-card` and upwards.
Shadow ツリーが`{mode: 'closed'}`と作られた場合、その合成パスはホスト: `user-card`とその上部から始まります。
That's the similar principle as for other methods that work with shadow DOM. Internals of closed trees are completely hidden.
これはshadow DOMと作用する他のメソッドと同様の原理です。閉じた木の内部は完全に隠されています。
```


## event.composed

Most events successfully bubble through a shadow DOM boundary. There are few events that do not.
ほとんどのイベントはshadow DOMの境界を通して浮上します。しかしいくつかのイベントはこのルールに従わないものもあります。

This is governed by the `composed` event object property. If it's `true`, then the event does cross the boundary. Otherwise, it only can be caught from inside the shadow DOM.
これは`composed`イベントオブジェクトプロパティによって管理されます。`true`の場合は、イベントは境界を超えます。そうでない場合は、shadow DOM内からのみ取得します。
If you take a look at [UI Events specification](https://www.w3.org/TR/uievents), most events have `composed: true`:
[UI Events specification](https://www.w3.org/TR/uievents)をご覧いただくと、ほとんどのイベントは`composed: true`：

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

All touch events and pointer events also have `composed: true`.
全てのタッチイベントとポインターは、`composed: true`です。

There are some events that have `composed: false` though:
いくつかのイベントは`composed: false`ですが：
- `mouseenter`, `mouseleave` (they do not bubble at all),
- `mouseenter`, `mouseleave` (これらは全く浮上しません),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

These events can be caught only on elements within the same DOM, where the event target resides.
これらのイベントはイベントターゲットが属する同じDOM内の要素でのみキャッチされます。

## Custom events
## カスタムイベント

When we dispatch custom events, we need to set both `bubbles` and `composed` properties to `true` for it to bubble up and out of the component.
カスタムイベントをディスパッチすると、コンポーネントの外に浮上させるために`bubbles`と`composed`の両方のプロパティを`true`に設定する必要があります。

For example, here we create `div#inner` in the shadow DOM of `div#outer` and trigger two events on it. Only the one with `composed: true` makes it outside to the document:
例えば、`div#inner`をshadow DOMの`div#outer`に作成し、二つのイベントを発火します。`composed: true`をもつイベントのみがドキュメントの外に浮上します。

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

## Summary

Events only cross shadow DOM boundaries if their `composed` flag is set to `true`.
`composed`フラグが`true`に設定されている場合、イベントはshadow DOM境界のみをクロスします。
Built-in events mostly have `composed: true`, as described in the relevant specifications:
ビルトインイベントは、関連する仕様に記載されている通り、ほとんどの場合`composed: true`を持ちます:
- UI Events <https://www.w3.org/TR/uievents>.
- UIイベント <https://www.w3.org/TR/uievents>.
- Touch Events <https://w3c.github.io/touch-events>.
- タッチイベント <https://w3c.github.io/touch-events>.
- ポインターイベント <https://www.w3.org/TR/pointerevents>.
- ...など.

Some built-in events that have `composed: false`:
いくつかのビルトインイベントは`composed: false`を持ちます:

- `mouseenter`, `mouseleave` (also do not bubble),
- `mouseenter`, `mouseleave` (バブルしません),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

These events can be caught only on elements within the same DOM.
これらのイベントは同じDOM内の要素でのみキャッチされます。

If we dispatch a `CustomEvent`, then we should explicitly set `composed: true`.
`CustomEvent`をディスパッチする場合は、明確に`composed: true`を設定するべきです。

Please note that in case of nested components, one shadow DOM may be nested into another. In that case composed events bubble through all shadow DOM boundaries. So, if an event is intended only for the immediate enclosing component, we can also dispatch it on the shadow host and set `composed: false`. Then it's out of the component shadow DOM, but won't bubble up to higher-level DOM.
ネストされているコンポーネントの場合は、一つのshadow DOMは互いにネストされてないことに気をつけてください。その場合は、合成されたイベントは全てのshadow DOM境界を通して浮上します。なので、イベントが直近の囲まれているコンポーネントのみを目的として作成されている場合は、`composed: false`を設定してshadow hostをディスパッチすることができます。そしてshadow DOMのコンポーネントに外れますが、高次元DOMへは浮上しないでしょう。