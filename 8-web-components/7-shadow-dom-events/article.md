# Shadow DOMとイベント
shadow ツリーの背後にあるアイデアは、コンポーネント内部の実装の詳細をカプセル化することにあります。

例えば、クリックイベントがshadow DOMの`<user-card>`コンポーネント内で発生したとします。しかしメインドキュメント内のスクリプトはshadow DOM内部については何も知りません。特にコンポーネントがサードパーティライブラリから来たものである場合はなおさらです。

なので、詳細をカプセル化したままにするために、ブラウザはイベントを*リターゲティングします。*
**shadow DOM内で起こるイベントがコンポーネントの外で取得される時、そのイベントはターゲットとしてホスト要素を持ちます。**

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

ボタンをクリックした場合、そのメッセージは:
1. 内部ターゲット: `BUTTON` -- 内部イベントハンドラーは適切なターゲット、shadow DOM内の要素を取得します。
2. 外部ターゲット: `USER-CARD` -- ドキュメントイベントハンドラーはターゲットとしてShadow ホストを取得します。
イベントリターゲティングは、外部ドキュメントがコンポーネントの内部について知らなくてもいいので、素晴らしいものです。この観点から、イベントは`<user-card>`に起こります。
**リターゲティングは、イベントが物理的にlight DOM内に存在するスロットされた要素上で起こった場合には、発生しません。**
例えば、ユーザーが以下の例の`<span slot="username">`をクリックした場合、shadowハンドラー とlightハンドラーの両方で、イベントターゲットはまさにこの`span`要素になります。
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

クリックが`"John Smith"`で起こった場合は、内部と外部のハンドラーのターゲットは`<span slot="username">`になります。それはlight DOMからの要素なので、リターゲティングはありません。
その一方で、クリックが`<b>Name</b>`のようなshadow DOMに由来する要素で発生した場合、shadow DOMの外にバブルするように、その`event.target`は`<user-card>`にリセットされます。

## バブリング、 event.composedPath()
イベントバブリングの目的に、フラット化したDOMが使用されます。
なので、スロット化された要素があり、イベントがその内部のどこかで起こった場合は、そのイベントは`<slot>`よりも上部に浮上します。
全てのshadow要素と共に、オリジナルのイベントターゲットへの絶対パスは、`event.composedPath()`を使用して取得されます。このメソッドの名前から分かる通り、そのパスは合成後に取得されます。

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


なので、`<span slot="username">`のクリックで、`event.composedPath()`のコールは配列[`span`, `slot`, `div`, `shadow-root`, `user-card`, `body`, `html`, `document`, `window`]を返します。これがまさに合成後のフラット化DOM内でのターゲット要素から親チェーンのことです。

```warn header="Shadow tree details are only provided for `{mode:'open'}` trees"
Shadow ツリーが`{mode: 'closed'}`と作られた場合、その合成パスはホスト: `user-card`とその上部から始まります。
これはshadow DOMと作用する他のメソッドと同様の原理です。閉じた木の内部は完璧に隠されています。
```


## event.composed

ほとんどのイベントはshadow DOMの境界を通してバブルします。しかしイベントの中にはこのルールに従わないものもあります。

これは`composed`イベントオブジェクトプロパティによって管理されます。`true`の場合は、イベントは境界を超えます。そうでない場合は、shadow DOM内からのみ取得します。
[UI Events specification](https://www.w3.org/TR/uievents)をご覧いただくと、ほとんどのイベントは`composed: true`です。：

- `blur`, `focus`, `focusin`, `focusout`,
- `click`, `dblclick`,
- `mousedown`, `mouseup` `mousemove`, `mouseout`, `mouseover`,
- `wheel`,
- `beforeinput`, `input`, `keydown`, `keyup`.

全てのタッチイベントとポインターは、`composed: true`です。

イベントの中には`composed: false`のものもありますが：
- `mouseenter`, `mouseleave` (これらは全くバブルしません),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

これらのイベントはイベントターゲットが属する同じDOM内の要素でのみキャッチされます。

## カスタムイベント

カスタムイベントをディスパッチすると、コンポーネントの外に浮上させるために`bubbles`と`composed`の両方のプロパティを`true`に設定する必要があります。

例えば、`div#inner`をshadow DOMの`div#outer`に作成し、二つのイベントを発火します。`composed: true`をもつイベントのみがドキュメントの外に浮上します。:

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

## サマリ

`composed`フラグが`true`に設定されている場合、イベントはshadow DOM境界のみをクロスします。
組み込みのイベントは、関連する仕様に記載されている通り、ほとんどの場合`composed: true`を持ちます:
- UIイベント <https://www.w3.org/TR/uievents>.
- タッチイベント <https://w3c.github.io/touch-events>.
- ポインターイベント <https://www.w3.org/TR/pointerevents>.
- ...など.

組み込みイベントの中には`composed: false`を持ちます:

- `mouseenter`, `mouseleave` (バブルしません),
- `load`, `unload`, `abort`, `error`,
- `select`,
- `slotchange`.

これらのイベントは同じDOM内の要素でのみキャッチされます。

`CustomEvent`をディスパッチする場合は、明確に`composed: true`を設定するべきです。

ネストされているコンポーネントの場合は、一つのshadow DOMは互いにネストされてないことに気をつけてください。その場合は、合成されたイベントは全てのshadow DOM境界を通して浮上します。なので、イベントが直近の囲まれているコンポーネントのみを目的として作成されている場合は、`composed: false`を設定してShadow ホストをディスパッチすることができます。そしてshadow DOMのコンポーネントに外れますが、高次元DOMへは浮上しないでしょう。