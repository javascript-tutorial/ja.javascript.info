# フォーカス: focus/blur

<<<<<<< HEAD
ユーザがクリックするか、キーボードで `key:Tab` キーを使うとき、要素はフォーカスを受け取ります。また、ページが読み込まれたとき、デフォルトで要素にフォーカスを与える `autofocus` HTML属性もあり、フォーカスを取得するための別の手段です。

フォーカスは、たいてい "ここでデータを受け入れる準備をする" ことを意味します。つまり、コードを実行して初期化したり何かをロードすることができる瞬間です。
=======
An element receives the focus when the user either clicks on it or uses the `key:Tab` key on the keyboard. There's also an `autofocus` HTML attribute that puts the focus onto an element by default when a page loads and other means of getting the focus.

Focusing on an element generally means: "prepare to accept the data here", so that's the moment when we can run the code to initialize the required functionality.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

フォーカスを失う瞬間("blur")はより重要になります。それは、ユーザが他の場所をクリックしたり、`key:Tab` を押して次のフォームフィールドに移動したり、同様に他の手段もあります。

フォーカスを失うということは、通常 "データが入力された" ことを意味します。そのため、それをチェックしたり、サーバに保存したりするコードを実行することができます。

<<<<<<< HEAD
フォーカスイベントを扱う際には重要な特性があります。ここではそれを説明するためにベストを尽くします。

[cut]
=======
There are important peculiarities when working with focus events. We'll do the best to cover them further on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## イベント focus/blur 

`focus` イベントはフォーカス時に呼ばれ、`blur` は要素がフォーカスを失ったときに呼ばれます。

インプットフィールドのバリデーションでそれらを使ってみましょう。

以下の例では:

<<<<<<< HEAD
- `blur` ハンドラは email が入力されたかどうかをチェックし、もしそうでなければエラーを表示します。
- `focus` ハンドラはエラーメッセージを隠します(`blur` 時にサイドチェックされます)。:
=======
- The `blur` handler checks if the field has an email entered, and if not -- shows an error.
- The `focus` handler hides the error message (on `blur` it will be checked again):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun height=60
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Your email please: <input type="email" id="input">

<div id="error"></div>

<script>
*!*input.onblur*/!* = function() {
  if (!input.value.includes('@')) { // not email
    input.classList.add('invalid');
    error.innerHTML = 'Please enter a correct email.'
  }
};

*!*input.onfocus*/!* = function() {
  if (this.classList.contains('invalid')) {
    // ユーザは何かを再入力したいので "エラー" 表示を削除します
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

<<<<<<< HEAD
現代の HTML では input の属性を使って多くのバリデーションを行うことができます: `required`, `pattern` などです。そして、時にはそれらが丁度私たちが必要なことである場合もあります。JavaScriptは、より柔軟性が必要な場合に使用できます。 その値が正しい場合、変更された値をサーバ上に自動的に送信することもできます。
=======
Modern HTML allows us to do many validations using input attributes: `required`, `pattern` and so on. And sometimes they are just what we need. JavaScript can be used when we want more flexibility. Also we could automatically send the changed value to the server if it's correct.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## メソッド focus/blur 

メソッド `elem.focus()` と `elem.blur()` は要素のフォーカスを設定/解除します。

例えば、値が有効でない場合には訪問者が input から離れられないようにしてみましょう。:

```html run autorun height=80
<style>
  .error {
    background: red;
  }
</style>

Your email please: <input type="email" id="input">
<input type="text" style="width:220px" placeholder="make email invalid and try to focus here">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // not email
      // エラーを表示
      this.classList.add("error");
*!*
      // ...その後、フォーカスを戻します
      input.focus();
*/!*
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

これは、Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)) を除いたすべてのブラウザで動作します。

入力域に何かを入力した後、`key:Tab` や クリックで `<input>` から離れようとすると、`onblur` はフォーカスを戻します。

`onblur` の中で `event.preventDefault()` を呼び出すことで "フォーカスを失うことを防ぐ" ことはできない点に注意してください。なえなら、`onblur` は要素がフォーカスを失った *後* に動作するためです。

<<<<<<< HEAD
```warn header="JavaScriptにより行われるフォーカス解除"
フォーカス解除は多くの理由により起こります。
=======
In practice though, one should think well, before implementing something like this, because we generally *should show errors* to the user, but *should not prevent their progress* in filling our form. They may want to fill other fields first.

```warn header="JavaScript-initiated focus loss"
A focus loss can occur for many reasons.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

その１つは、訪問者がどこか他の場所をクリックした時です。しかし JavaScript 自体もそれを引き起こす可能性があります。例えば:

- `alert` はフォーカスを自身へ移動させるため、フォーカス解除(`blur`)が要素で起きます。また `alert` が消えたとき、フォーカスが戻ります(`focus` イベント)。
- もしも要素が DOM から削除された場合も、フォーカス解除が起こります。後で再挿入したとしても、フォーカスは戻りません。

これらの特徴により、`focus/blur` ハンドラが必要ないときにトリガすることがあります。

<<<<<<< HEAD
最善の策は、それらのイベントを使うとき注意を払うことです。ユーザが開始したフォーカス解除を追跡したい場合は、自分自身でフォーカス解除を回避する必要があります。
=======
The best recipe is to be careful when using these events. If we want to track user-initiated focus-loss, then we should avoid causing it ourselves.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
## 任意の要素にフォーカスを当てる: tabindex 

<<<<<<< HEAD
デフォルトでは、多くの要素はフォーカスをサポートしていません。

この一覧はブラウザによって異なりますが、正しいことが1つあります: `focus/blur` のサポートは、`<button>`, `<input>`, `<select>`, `<a>` など、訪問者が対話できる要素に対して保証されています。

一方、`<div>`, `<span>`, `<table>` のような体裁のために存在する要素は、デフォルトではフォーカス不可です。メソッド `elem.focus()` はそれらに対しては機能せず、`focus/blur` イベントがトリガされることはありません。
=======
By default, many elements do not support focusing.

The list varies a bit between browsers, but one thing is always correct: `focus/blur` support is guaranteed for elements that a visitor can interact with: `<button>`, `<input>`, `<select>`, `<a>` and so on.

On the other hand, elements that exist to format something, such as `<div>`, `<span>`, `<table>` -- are unfocusable by default. The method `elem.focus()` doesn't work on them, and `focus/blur` events are never triggered.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

HTML 属性 `tabindex` を使用することでこれを変更することが可能です。

<<<<<<< HEAD
この属性の目的は、`key:Tab` を使って要素間を切り替える際に、要素の順番を指定することです。

つまり: 2つの要素があり、1つ目は `tabindex="1"` 、2つ目は `tabindex="2"` を持っている場合、最初の要素で `key:Tab` を押すと2つ目に移動します。
=======
Any element becomes focusable if it has `tabindex`. The value of the attribute is the order number of the element when `key:Tab` (or something like that) is used to switch between them.

That is: if we have two elements, the first has `tabindex="1"`, and the second has `tabindex="2"`, then pressing `key:Tab` while in the first element -- moves the focus into the second one.

The switch order is: elements with `tabindex` from `1` and above go first (in the `tabindex` order), and then elements without `tabindex` (e.g. a regular `<input>`).

Elements without matching `tabindex` are switched in the document source order (the default order).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

2つの特別な値があります:

<<<<<<< HEAD
- `tabindex="0"` は要素を最後にします。
- `tabindex="-1"` は `key:Tab` がその要素を無視することを意味します。

**どの要素も `tabindex` を持っていればフォーカスをサポートします。**
=======
- `tabindex="0"` puts an element among those without `tabindex`. That is, when we switch elements, elements with `tabindex=0` go after elements with `tabindex ≥ 1`.

    Usually it's used to make an element focusable, but keep the default switching order. To make an element a part of the form on par with `<input>`.

- `tabindex="-1"` allows only programmatic focusing on an element. The `key:Tab` key ignores such elements, but method `elem.focus()` works.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えばここにリストがあります。最初の項目をクリックして `key:Tab` を押してください:

```html autorun no-beautify
<<<<<<< HEAD
最初の項目をクリックしてタブを押してください。指定順に移動します。多くの後続のタブはフォーカスを例の iframe から移動できることに留意してください。

=======
Click the first item and press Tab. Keep track of the order. Please note that many subsequent Tabs can move the focus out of the iframe in the example.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
<ul>
  <li tabindex="1">One</li>
  <li tabindex="0">Zero</li>
  <li tabindex="2">Two</li>
  <li tabindex="-1">Minus one</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

<<<<<<< HEAD
順序は `1 - 2 - 0` (ゼロは常に最後) です。通常、`<li>` はフォーカスをサポートしませんが、`tabindex` はイベントや `:focus` のスタイリングと合わせてフォーカスを有効にします。

```smart header="`elem.tabIndex` も機能します"
`elem.tabIndex` プロパティを使用することで、JavaScript から `tabindex` を追加することができます。これは同じ効果があります。
=======
The order is like this: `1 - 2 - 0`. Normally, `<li>` does not support focusing, but `tabindex` full enables it, along with events and styling with `:focus`.

```smart header="The property `elem.tabIndex` works too"
We can add `tabindex` from JavaScript by using the `elem.tabIndex` property. That has the same effect.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## 移譲: focuin/focusout 

イベント `focus` と `blur` はバブルしません。

例えば、次のように `onfocus` を `<form>` に置いて強調表示させる、ということはできません:

```html autorun height=80
<!-- on focusing in the form -- add the class -->
<form *!*onfocus="this.className='focused'"*/!*>
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

上の例は機能しません。なぜなら、ユーザが `<input>` にフォーカスしたとき、`focus` イベントはその input でのみトリガされるためです。バブルしないので、`form.onfocus` がトリガされることはありません。

ここには2つの解決策があります。

1つ目は、面白い歴史的な機能です: `focus/blur` はバブルしませんが、キャプチャリングフェーズで伝搬します。

これは機能します:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  // キャプチャリングフェーズにハンドラを設定します(最後の引数を true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
*/!*
</script>
```

2つ目は、`focusin` と `focusout` イベントです -- `focus/blur` とまったく同じですが、バブルします。

それらは `on<event>` ではなく、`elem.addEventListener` で割り当てなければならないことに注意してください。

従って、ここに別の動作するバリエーションがあります。:

```html autorun height=80
<form id="form">
  <input type="text" name="name" value="Name">
  <input type="text" name="surname" value="Surname">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
*!*
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
*/!*
</script>
```

## サマリ 

<<<<<<< HEAD
イベント `focus` と `blur` は要素にフォーカスが当たる/外れるときにトリガされます。
=======
Events `focus` and `blur` trigger on an element focusing/losing focus.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

それらの特別なこと:
- それらはバブルしません。代わりにキャプチャリングフェーズや `focusin/focusout` を使うことができます。
- ほとんどの要素はデフォルトではフォーカスをサポートしません。何かをフォーカス可能にするには `tabindex` を使います。

現在フォーカスされている要素は `document.activeElement` として利用できます。
