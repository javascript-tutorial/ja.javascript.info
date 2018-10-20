# フォーカス: focus/blur

ユーザがクリックするか、キーボードで `key:Tab` キーを使うとき、要素はフォーカスを受け取ります。また、ページが読み込まれたとき、デフォルトで要素にフォーカスを与える `autofocus` HTML属性もあり、フォーカスを取得するための別の手段です。

フォーカスは、たいてい "ここでデータを受け入れる準備をする" ことを意味します。つまり、コードを実行して初期化したり何かをロードすることができる瞬間です。

フォーカスを失う瞬間("blur")はより重要になります。それは、ユーザが他の場所をクリックしたり、`key:Tab` を押して次のフォームフィールドに移動したり、同様に他の手段もあります。

フォーカスを失うということは、通常 "データが入力された" ことを意味します。そのため、それをチェックしたり、サーバに保存したりするコードを実行することができます。

フォーカスイベントを扱う際には重要な特性があります。ここではそれを説明するためにベストを尽くします。

[cut]

## イベント focus/blur 

`focus` イベントはフォーカス時に呼ばれ、`blue` は要素がフォーカスを失ったときに呼ばれます。

インプットフィールドのバリデーションでそれらを使ってみましょう。

以下の例では:

- `blue` ハンドラは email が入力されたかどうかをチェックし、もしそうでなければエラーを表示します。
- `focus` ハンドラはエラーメッセージを隠します(`blue` 時にサイドチェックされます)。:

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

現代の HTML では input の属性を使って多くのバリデーションを行うことができます: `required`, `pattern` などです。そして、時にはそれらが丁度私たちが必要なことである場合もあります。JavaScriptは、より柔軟性が必要な場合に使用できます。 その値が正しい場合、変更された値をサーバ上に自動的に送信することもできます。

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

入力域に何かを入力した後、`key:Tab` や クリックで `<input>` から離れようとすると、`onblue` はフォーカスを戻します。

`onblur` の中で `event.preventDefault()` を呼び出すことで "フォーカスを失うことを防ぐ" ことはできない点に注意してください。なえなら、`onblur` は要素がフォーカスを失った *後* に動作するためです。

```warn header="JavaScriptにより行われるフォーカス解除"
フォーカス解除は多くの理由により起こります。

その１つは、訪問者がどこか他の場所をクリックした時です。しかし JavaScript 自体もそれを引き起こす可能性があります。例えば:

- `alert` はフォーカスを自身へ移動させるため、フォーカス解除(`blue`)が要素で起きます。また `alert` が消えたとき、フォーカスが戻ります(`focus` イベント)。
- もしも要素が DOM から削除された場合も、フォーカス解除が起こります。後で再挿入したとしても、フォーカスは戻りません。

これらの特徴により、`focus/blur` ハンドラが必要ないときにトリガすることがあります。

最善の策は、それらのイベントを使うとき注意を払うことです。ユーザが開始したフォーカス解除を追跡したい場合は、自分自身でフォーカス解除を回避する必要があります。
```
## 任意の要素にフォーカスを当てる: tabindex 

デフォルトでは、多くの要素はフォーカスをサポートしていません。

この一覧はブラウザによって異なりますが、正しいことが1つあります: `focus/blur` のサポートは、`<button>`, `<input>`, `<select>`, `<a>` など、訪問者が対話できる要素に対して保証されています。

一方、`<div>`, `<span>`, `<table>` のような体裁のために存在する要素は、デフォルトではフォーカス不可です。メソッド `elem.focus()` はそれらに対しては機能せず、`focus/blur` イベントがトリガされることはありません。

HTML 属性 `tabindex` を使用することでこれを変更することが可能です。

この属性の目的は、`key:Tab` を使って要素間を切り替える際に、要素の順番を指定することです。

つまり: 2つの要素があり、1つ目は `tabindex="1"` 、2つ目は `tabindex="2"` を持っている場合、最初の要素で `key:Tab` を押すと2つ目に移動します。

2つの特別な値があります:

- `tabindex="0"` は要素を最後にします。
- `tabindex="-1"` は `key:Tab` がその要素を無視することを意味します。

**どの要素も `tabindex` を持っていればフォーカスをサポートします。**

例えばここにリストがあります。最初の項目をクリックして `key:Tab` を押してください:

```html autorun no-beautify
最初の項目をクリックしてタブを押してください。指定順に移動します。多くの後続のタブはフォーカスを例の iframe から移動できることに留意してください。

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

順序は `1 - 2 - 0` (ゼロは常に最後) です。通常、`<li>` はフォーカスをサポートしませんが、`tabindex` はイベントや `:focus` のスタイリングと合わせてフォーカスを有効にします。

```smart header="`elem.tabIndex` も機能します"
`elem.tabIndex` プロパティを使用することで、JavaScript から `tabindex` を追加することができます。これは同じ効果があります。
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

イベント `focus` と `blur` は要素にフォーカスが当たる/外れるときにトリガされます。

それらの特別なこと:
- それらはバブルしません。代わりにキャプチャリングフェーズや `focusin/focusout` を使うことができます。
- ほとんどの要素はデフォルトではフォーカスをサポートしません。何かをフォーカス可能にするには `tabindex` を使います。

現在フォーカスされている要素は `document.activeElement` として利用できます。
