# ブラウザのデフォルト動作

多くのイベントは自動的にブラウザの動作に繋がります。

例えば:

- リンクのクリック -- そのURLに行くのを開始します。
- フォーム内のサブミットボタンのクリック -- サーバへの送信を開始します。
- テキスト上でマウスボタンを押し、移動させる -- テキストを選択します。

JavaScript でイベントを処理している場合、ブラウザの動作は必要ないことがよくあります。幸いにも、それは防ぐことができます。

<<<<<<< HEAD
[cut]

## ブラウザの動作を防ぐ 
=======
## Preventing browser actions
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

ブラウザに動作してほしくないと伝える方法が2つあります:

- 主な方法は、`event` オブジェクトを使うことです。メソッド `event.preventDefault()` があります。
- ハンドラが `on<event>` (`addEventListener` ではない)を使って割り当てられている場合、そこから `false` を返すだけで実現できます。

<<<<<<< HEAD
下の例では、リンクをクリックしてもURLが変更されません:
=======
In the example below a click to links doesn't lead to URL change:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Click here</a>
or
<a href="/" onclick="event.preventDefault()">here</a>
```

```warn header="`true` を返す必要はありません"
イベントハンドラによって返される値は通常無視されます。

唯一の例外は -- `on<event>` を使用して割り当てられたハンドラからの `return false` です。

その他すべての場合、返却は必要とされず何もされません。
```

### 例: メニュー 

サイトのメニューを考えましょう:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

ここでは、CSS を使用して次のように見えます:

[iframe height=70 src="menu" link edit]

メニュー項目はリンク `<a>` でボタンではありません。それは例えば次のようないくつかの利点があります:

- 多くの人は "右クリック" を使うのが好きです -- "新しいウィンドウで開く"。`<button>` または `<span>` を使うと、それは動作しません。
- 検索エンジンは、インデックスを作成するとき、`<a href="...">` のリンクを辿ります。

なので、私たちはマークアップでは `<a>` を使います。しかし、通常は JavaScript でクリックを処理することを意図します。だから、デフォルトのブラウザ動作を防ぐ必要があります。

このようになります:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...サーバからのロード、UIの生成など

*!*
  return false; // ブラウザ動作を防ぐ (URLへ行きません)
*/!*
};
```

もし `return false` を省略すると、我々のコードを実行した後、ブラウザは "デフォルト動作" を行うでしょう -- `href` の URL を辿ります。

ところで、ここではイベント移譲を使うと、メニューを柔軟にできます。ネストされたリストを追加したり、CSSを使って "スライドダウン" することができます。


## さらなるイベントの防止 

あるイベントは別のものへと流れます。もし最初のイベントを防ぐ場合、２つ目はありません。

例えば、`<input>` フィールド上の `mousedown` は、それにフォーカスし、`focus` イベントに繋がります。もし `mousedown` イベントを防ぐ場合、フォーカスは起こりません。

下の最初の `<input>` をクリックしてみてください -- `focus` イベントが起きます。これは正常です。

しかし、2つ目をクリックした場合、フォーカスはありません。

```html run autorun
<input value="Focus works" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Click me">
```

なぜなら、ブラウザのアクションは `mousedown` でキャンセルされたためです。input を入力する別の方法を使うと、フォーカスはまだ可能です。例えば、最初の入力から次の入力に切り替えるための `key:Tab` キーです。しかしマウスクリックはこれ以上動作しません。

## The "passive" handler option

The optional `passive: true` option of `addEventListener` signals the browser that the handler is not going to call `preventDefault()`.

Why that may be needed?

There are some events like `touchmove` on mobile devices (when the user moves their finger across the screen), that cause scrolling by default, but that scrolling can be prevented using `preventDefault()` in the handler.

So when the browser detects such event, it has first to process all handlers, and then if `preventDefault` is not called anywhere, it can proceed with scrolling. That may cause unnecessary delays and "jitters" in the UI.

The `passive: true` options tells the browser that the handler is not going to cancel scrolling. Then browser scrolls immediately providing a maximally fluent experience, and the event is handled by the way.

For some browsers (Firefox, Chrome), `passive` is `true` by default for `touchstart` and `touchmove` events.


## event.defaultPrevented

デフォルトアクションが防がれた場合、プロパティ `event.defaultPrevented` は `true` で、それ以外は `false` です。

興味深いユースケースがあります。

チャプター <info:bubbling-and-capturing> で `event.stopPropagation()` について話しましたが、バブリングの停止が悪い理由を覚えていますか？

代わりに、`event.defaultPrevented` を使用することがあります。

バブリングの停止が必要に見える実践的な例を見てみましょう。しかし、実際にはバブリングを止めることなく上手く行うことができます。

デフォルトでは、`contextmenu` イベント時(マウスの右クリック)のブラウザは、標準オプション付きのコンテキストメニューを表示します。私たちはそれを防いで、独自のメニューを表示することができます:

```html autorun height=50 no-beautify run
<button>Right-click for browser context menu</button>

<button *!*oncontextmenu="alert('Draw our menu'); return false"*/!*>
  Right-click for our context menu
</button>
```

今、我々のオプションを使用した、独自のドキュメント全体のコンテキストメニューを実装したいとしましょう。そしてドキュメント内には、独自のコンテキストメニューを持つ他の要素がある可能性があります。:

```html autorun height=80 no-beautify run
<p>Right-click here for the document context menu</p>
<button id="elem">Right-click here for the button context menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

問題は、 `elem` のクリック時2つのメニューを取得します: ボタンレベルと(イベントがバブルし)ドキュメントレベルのメニューです。 

どうやって修正しますか？1つの方法はこのように考えることです: "ボタンハンドラの中でイベントを完全を処理し、それを止める" で、`event.stopPropagation()` を使います:

```html autorun height=80 no-beautify run
<p>Right-click for the document menu</p>
<button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

これで、ボタンレベルのメニューは期待通り動作します。しかしコストは高いです。統計を収集するカウンターなど、外部コードの右クリックに関する情報へのアクセスは永久に拒否されます。 それはまったく賢明ではありません。

代替の解決策は、デフォルトのアクションが防がれたかどうかを `document` ハンドラの中で、チェックすることです。もしそうであれば、イベントは処理されており、反応する必要はありません。


```html autorun height=80 no-beautify run
<p>Right-click for the document menu (fixed with event.defaultPrevented)</p>
<button id="elem">Right-click for the button menu</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Button context menu");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Document context menu");
  };
</script>
```

これで、すべて正しく動作します。ネストされた要素を持っており、それらが独自のコンテキストメニューを持っている場合も動作します。ただ、各 `contextmenu` ハンドラの中で `event.defaultPrevented` を確認してください。

```smart header="event.stopPropagation() と event.preventDefault()"
明らかに分かるように、`event.stopPropagation()` と `event.preventDefault()` (`return false` としても知られている)は2つの異なるものです。それらはお互い関係ありません。
```

```smart header="ネストされたコンテキストメニューのアーキテクチャ"
ネストされたコンテキストメニューを実装する別の方法もあります。その1つは、`document.oncontextmenu` を処理するメソッドを持つ特別なグローバルオブジェクトと、様々な "低レベル" のハンドラをそこに格納できるメソッドを持つことです。

オブジェクトは任意の右クリックをキャッチし、格納されているハンドラを見て適切なものを実行するでしょう。

しかし、コンテキストメニューを必要とする各コードは、そのオブジェクトについて知っていて、自身の `contextmenu`ハンドラの代わりにそのヘルプを使うべきです
```

## サマリ 

多くのデフォルトのブラウザアクションがあります:

- `mousedown` -- 選択を始めます(選択するにはマウスを移動します)。
- `<input type="checkbox">` の `click` -- `input` のチェックON/OFF。
- `submit` -- `<input type="submit">` のクリックまたはフォームフィールド内で `key:Enter` を押すとこのイベントが発生し、ブラウザはその後にフォームを送信します。
- `wheel` -- マウスホイールイベントはデフォルト動作としてスクロールをします。
- `keydown` -- キーの押下はフィールドへの文字の追加、または別のアクションになります。
- `contextmenu` -- このイベントは右クリックで発生し、アクションはブラウザのコンテキストメニューを表示することです。
- ...他にもあります...

JavaScriptでイベントを排他的に処理したい場合、デフォルトのアクションをすべて防ぐことができます。

デフォルトのアクションを防ぐには -- `event.preventDefault()` または `return false` を使います。2つ目の方法は `on<event>` で割り当てられたハンドラに対してのみ機能します。

<<<<<<< HEAD
デフォルトアクションが防がれた場合、`event.defaultPrevented` の値は `true` になり、それ以外は `false` になります。
=======
The `passive: true` option of `addEventListener` tells the browser that the action is not going to be prevented. That's useful for some mobile events, like `touchstart` and `touchmove`, to tell the browser that it should not wait for all handlers to finish before scrolling.

If the default action was prevented, the value of `event.defaultPrevented` becomes `true`, otherwise it's `false`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```warn header="セマンティックのままで、乱用しないでください"
技術的には、デフォルトアクションを防ぎ、JavaScript を追加することによって、任意の要素の振る舞いをカスタマイズすることが可能です。例えば、`<a>` を作り、それをボタンのように動作させたり、`<button>` をリンク(別のURLにリダイレクトするなど)として振る舞わせることができます。

しかし、一般的には HTML要素のセマンティックな意味を維持するべきです。例えば、`<a>` はボタンではなくナビゲーションを実行するべきです。

"単なる良いもの" に加えて、アクセシビリティの点でHTMLをより良くします。

また、`<a>` の例を考える場合、次のことに注意してください: ブラウザはこのようなリンクを新しいウィンドウ(右クリックしたり他の手段で)で開くことができます。そして人々はそれが好きです。しかし、JavaScript を使ってリンクとして振る舞うボタンを作り、CSSを使ってリンクのような見た目にしても、`<a>` 固有のブラウザ機能は依然として動作しません。
```
