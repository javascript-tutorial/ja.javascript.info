# マウスイベントの基本

マウスイベントは "マウス操作" だけでなく、互換性のためにタッチデバイスでもエミュレートされます。

このチャプターでは、マウスイベントとそれらのプロパティの詳細について説明していきます。

<<<<<<< HEAD
[cut]

## マウスイベントタイプ 
=======
## Mouse event types
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

マウスイベントは2つのカテゴリに分けることができます: "シンプル" と "複雑" です。

### シンプルなイベント 

最も使用されるシンプルなイベントは:

`mousedown/mouseup`
: 要素上でマウスボタンがクリックされた/離された。

`mouseover/mouseout`
: マウスポイントが要素に来る/でていく。

`mousemove`
: 要素上のすべてのマウス移動で、このイベントが発生します。

...他のイベントタイプもあります、それらは後ほど説明します。

### 複雑なイベント [$Complex events]

`click`
: `mousedown` の後に発生し、マウスの左ボタンを使われた場合は同じ要素に `mouseup` を送ります。

`contextmenu`
: マウスの右ボタンが使われた場合、`mousedown` の後に発生します。

`dblclick`
: 要素をダブルクリックした後に発生します。

複雑なイベントはシンプルなイベントから作られます。なので、論理的にはそれ無しでもやっていけます。しかしそれらはとても便利なので存在しています。

### イベント順 

アクションは複数のイベントをトリガする場合があります。

例えば、ボタンが押されたとき、クリックは最初に `mousedown` をトリガし、次に  クリックが離されたときに `mouseup` と `click` をトリガします。 

1つのアクションが複数イベントを開始する場合、それらの順序は固定です。つまり、ハンドラは `mousedown` -> `mouseup` -> `click` の順番で呼び出されます。イベントは同じシーケンスで処理されます: `onmouseup` は `onclick` の実行の前に完了します。

```online
下のボタンをクリックし、イベントを見てみてください。ダブルクリックも試してみてください。

下のテストスタンドでは、すべてのマウスイベントが記録され、それらの間で1秒以上の遅延がある場合、水平ルーラーで区切っています。

マウスボタンを検出する `which` プロパティも見ることができます。

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## ボタンを取得する: which 

<<<<<<< HEAD
クリック関連のイベントは常にボタンが取得できる `which` プロパティを持っています。
=======
Click-related events always have the `which` property, which allows to get the exact mouse button.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

これは `click` や `contextmenu` では使われません。なぜなら前者は左クリックのときだけ、後者は -- 右クリックのときにだけ起こるからです。

しかし、もし `mousedown` と `mouseup` を追跡している場合、それが必要です。なぜならそれらのイベントは左右どちらのボタンでもトリガするためです。したがって、`which` は "右マウスダウン" と "左マウスダウン" を区別することができます。

3つのとり得る値があります:

- `event.which == 1` -- 左ボタン
- `event.which == 2` - 中央ボタン
- `event.which == 3` - 右ボタン

中央のボタンは今のところいくらかエキゾチックで、ほとんど使われていません。

## 修飾子: shift, alt, ctrl と meta 

すべてのマウスイベントは押された修飾子のキーに関する情報も含みます。

プロパティは:

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (Mac では `key:Cmd`)

例えば、下のボタンは `key:Alt+Shift` + クリック でのみ動作します:

```html autorun height=60
<button id="button">Alt+Shift+Click on me!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('Hooray!');
    }
  };
</script>
```

```warn header="注意: Macでは通常は `Ctrl` キーではなく `Cmd` キーです"
Windows と Linux では、`key:Alt`, `key:Shift` と `key:Ctrl` の修飾子があります。Mac ではもう一つあります: `key:Cmd`、これはプロパティ `metaKey` に相当します。

殆どの場合、Windows/Linux が `key:Ctrl` を使う時、Mac の人々は `key:Cmd` を使います。そのため、Windows ユーザが `key:Ctrl+Enter` or `key:Ctrl+A` を押すとき、Mac ユーザは `key:Cmd+Enter` or `key:Cmd+A` などを押し、ほとんどのアプリは `key:Ctrl` の代わりに `key:Cmd` を使います。

したがって、`key:Ctrl` + クリック のような組み合わせをサポートしたいとき、Mac では `key:Cmd` + クリック を使うのが理にかなっています。それがMacユーザにとってより快適なのです。

たとえ Mac ユーザに `key:Ctrl` + クリックを強制したいとしても、 -- それは難しいです。問題は -- `key:Ctrl` で左クリックすると、Mac では *右クリック* と解釈され、Windows/Linux のように `click` ではなく　`contextmenu` イベントが生成されるからです。

なので、すべての OS の人々に快適に感じてもらうためには、`ctrlKey` と一緒に `metaKey` を使うべきです。

JS-codeの場合、`if (event.ctrlKey || event.metaKey)` というチェックを意味します。

```

```warn header="モバイルデバイスもあります"
キーボードの組み合わせは便利です。訪問者がキーボードを持っていれば、それは機能します。 あなたのデバイスがそれを持っていない場合でも、同じことをする別の方法があります。
```

## 座標: clientX/Y, pageX/Y 

すべてのマウスイベントは2種類の座標を持っています:

1. ウィンドウに相対: `clientX` と `clientY`.
2. ドキュメントに相対: `pageX` と `pageY`.

例えば、 500x500 サイズのウィンドウを持っていて、マウスが左上端にあるとき、`clientX` と `clientY` は `0` です。そして、マウスが中央にある場合、ドキュメント内のどの場所にあっても、`clientX` と `clientY` は `250` です。それらは `position:fixed` に似ています。

````online
入力フィールドにマウスを移動し `clientX/clientY` を見てみてください (それは `iframe` の中にあるので、座標は `iframe` への相対です)。:

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

ドキュメント相対座標は、ドキュメントの左上端から数えられます。ウィンドウではありません。
座標 `pageX`, `pageY` はドキュメントレベルでの `position:absolute` に似ています。

チャプター <info:coordinates> で座標についてより知ることができます。

## マウスダウンで選択をしない 

マウスクリックは邪魔になる副作用があります。ダブルクリックするとテキストを選択します。

もし独自のクリックイベントを処理したい場合、"余分な" 選択はいまいちに見えます。

例えば、下のテキストのダブルクリックは、我々のハンドラに加えてそのテキストを選択します。:

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

選択を止めるために、CSS を使う方法があります: [CSS UI Draft](https://www.w3.org/TR/css-ui-4/) にある `user-select` プロパティです。

ほとんどのブラウザはプレフィックス付きでサポートしています:

```html autorun height=50
<style>
  b {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>

Before...
<b ondblclick="alert('Test')">
  Unselectable
</b>
...After
```

これで、"Unselectable" のダブルクリックをしても、選択されていません。動作しているように見えます。

...しかし、潜在的な問題があります! テキストは本当に選択不能になります。たとえユーザが "Before" から選択を開始し、"After" まで選択したとしても、その選択は "Unselectable" の部分はスキップされます。私たちは本当にそのテキストを選択不可にしたいですか？

<<<<<<< HEAD
殆どの場合、そうではありません。ユーザは、コピーまたはその他の必要性のために、テキストを選択する正当な理由がある可能性があります。 もしユーザにそれをさせることを許さなければ、それは邪魔になるかもしれません。 そのためこの解決策はそれほど良いものではありません。
=======
Most of time, we don't. A user may have valid reasons to select the text, for copying or other needs. That may be inconvenient if we don't allow them to do it. So this solution is not that good.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

私たちが欲しいものは、ダブルクリックで選択を防ぐ、それだけです。

テキスト選択は  `mousedown` イベントにおけるデフォルトブラウザアクションです。したがって、代わりの解決策は `mousedown` を処理し、それを防ぐことです。次のようになります:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

今や、太字の要素はダブルクリックでは選択されません。

一方、その中のテキストは依然として選択可能です。選択はテキスト自身ではなく、その前後から始める必要があります。通常それは問題ありません。

<<<<<<< HEAD
=======
The text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine though.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

````smart header="選択のキャンセル"
選択を *防ぐ* 代わりに、イベントハンドラの中で、"事後に" キャンセルすることができます。

このようにします:

```html autorun height=50
Before...
<b ondblclick="*!*getSelection().removeAllRanges()*/!*">
  Double-click me
</b>
...After
```

太字の要素をダブルクリックすると、選択を表示され、その後すぐに消えます。良くは見えませんが。
````

````smart header="コピーを防止する"
コピー・ペーストからコンテンツを保護するために選択を無効にしたい場合、別のイベントを使用することができます: `oncopy`

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
`<div>` でテキストの一部をコピーしようとすると動作しません。なぜならデフォルトアクション `oncopy` が防止されているためです。

確かに、ユーザーがHTMLソースを開くことを止めることはできませんが、誰もがHTMLソースを開く方法を知っているわけではありません。
````

## サマリ 

<<<<<<< HEAD
マウスイベントは次のプロパティを持っています:
=======
Mouse events have the following properties:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

- ボタン: `which`.
- 修飾子 (押された場合 `true`): `altKey`, `ctrlKey`, `shiftKey` と `metaKey` (Mac).
  - `key:Ctrl` を処理したい場合、Mac ユーザを忘れてはいけません、彼らは `key:Cmd` を使うので、`if (e.metaKey || e.ctrlKey)` とチェックするのが良いです。

<<<<<<< HEAD
- ウィンドウ相対座標: `clientX/clientY`.
- ドキュメント相対座標: `pageX/clientX`.

下記のタスクでは、選択をクリックの不要な副作用として扱うことも重要です。

それにはいくつかの方法があります、例えば:
1. CSS プロパティ `user-select:none` (ブラウザプレフィックス付きで)はそれを完全に無効にします。
2. `getSelection().removeAllRanges()` を使って選択を事後にキャンセルします。
3. `mousedown` を処理し、デフォルトアクションを防ぎます(通常はこれがベストです)。
=======
- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

It's also important to deal with text selection as an unwanted side-effect of clicks.

There are several ways to do this, for instance:
1. The CSS-property `user-select:none` (with browser prefixes) completely disables text-selection.
2. Cancel the selection post-factum using `getSelection().removeAllRanges()`.
3. Handle `mousedown` and prevent the default action (usually the best).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
