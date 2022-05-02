<<<<<<< HEAD
# マウスイベントの基本

マウスイベントは "マウス操作" だけでなく、互換性のためにタッチデバイスでもエミュレートされます。
=======
# Mouse events
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

このチャプターでは、マウスイベントとそれらのプロパティの詳細について説明していきます。

Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## マウスイベントタイプ 

<<<<<<< HEAD
マウスイベントは2つのカテゴリに分けることができます: "シンプル" と "複雑" です。

### シンプルなイベント 

最も使用されるシンプルなイベントは:
=======
We've already seen some of these events:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

`mousedown/mouseup`
: 要素上でマウスボタンがクリックされた/離された。

`mouseover/mouseout`
: マウスポイントが要素に来る/でていく。

`mousemove`
: 要素上のすべてのマウス移動で、このイベントが発生します。

<<<<<<< HEAD
...他のイベントタイプもあります、それらは後ほど説明します。

### 複雑なイベント [$Complex events]

=======
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
`click`
: `mousedown` の後に発生し、マウスの左ボタンを使われた場合は同じ要素に `mouseup` を送ります。

<<<<<<< HEAD
`contextmenu`
: マウスの右ボタンが使われた場合、`mousedown` の後に発生します。

`dblclick`
: 要素をダブルクリックした後に発生します。

複雑なイベントはシンプルなイベントから作られます。なので、論理的にはそれ無しでもやっていけます。しかしそれらはとても便利なので存在しています。

### イベント順 

アクションは複数のイベントをトリガする場合があります。

例えば、ボタンが押されたとき、クリックは最初に `mousedown` をトリガし、次に  クリックが離されたときに `mouseup` と `click` をトリガします。 

1つのアクションが複数イベントを開始する場合、それらの順序は固定です。つまり、ハンドラは `mousedown` -> `mouseup` -> `click` の順番で呼び出されます。イベントは同じシーケンスで処理されます: `onmouseup` は `onclick` の実行の前に完了します。
=======
`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```online
下のボタンをクリックし、イベントを見てみてください。ダブルクリックも試してみてください。

<<<<<<< HEAD
下のテストスタンドでは、すべてのマウスイベントが記録され、それらの間で1秒以上の遅延がある場合、水平ルーラーで区切っています。

マウスボタンを検出する `which` プロパティも見ることができます。
=======
On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.

Also, we can see the `button` property that allows us to detect the mouse button; it's explained below.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## ボタンを取得する: which 

クリック関連のイベントは常にボタンが取得できる `which` プロパティを持っています。

これは `click` や `contextmenu` では使われません。なぜなら前者は左クリックのときだけ、後者は -- 右クリックのときにだけ起こるからです。

しかし、もし `mousedown` と `mouseup` を追跡している場合、それが必要です。なぜならそれらのイベントは左右どちらのボタンでもトリガするためです。したがって、`which` は "右マウスダウン" と "左マウスダウン" を区別することができます。

3つのとり得る値があります:

- `event.which == 1` -- 左ボタン
- `event.which == 2` - 中央ボタン
- `event.which == 3` - 右ボタン

中央のボタンは今のところいくらかエキゾチックで、ほとんど使われていません。
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

From the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxiliary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](mdn:/api/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

## 修飾子: shift, alt, ctrl と meta 

すべてのマウスイベントは押された修飾子のキーに関する情報も含みます。

<<<<<<< HEAD
プロパティは:

- `shiftKey`
- `altKey`
- `ctrlKey`
- `metaKey` (Mac では `key:Cmd`)
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

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

<<<<<<< HEAD
```warn header="注意: Macでは通常は `Ctrl` キーではなく `Cmd` キーです"
Windows と Linux では、`key:Alt`, `key:Shift` と `key:Ctrl` の修飾子があります。Mac ではもう一つあります: `key:Cmd`、これはプロパティ `metaKey` に相当します。

殆どの場合、Windows/Linux が `key:Ctrl` を使う時、Mac の人々は `key:Cmd` を使います。そのため、Windows ユーザが `key:Ctrl+Enter` or `key:Ctrl+A` を押すとき、Mac ユーザは `key:Cmd+Enter` or `key:Cmd+A` などを押し、ほとんどのアプリは `key:Ctrl` の代わりに `key:Cmd` を使います。

したがって、`key:Ctrl` + クリック のような組み合わせをサポートしたいとき、Mac では `key:Cmd` + クリック を使うのが理にかなっています。それがMacユーザにとってより快適なのです。

たとえ Mac ユーザに `key:Ctrl` + クリックを強制したいとしても、 -- それは難しいです。問題は -- `key:Ctrl` で左クリックすると、Mac では *右クリック* と解釈され、Windows/Linux のように `click` ではなく　`contextmenu` イベントが生成されるからです。

なので、すべての OS の人々に快適に感じてもらうためには、`ctrlKey` と一緒に `metaKey` を使うべきです。

JS-codeの場合、`if (event.ctrlKey || event.metaKey)` というチェックを意味します。
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```

<<<<<<< HEAD
```warn header="モバイルデバイスもあります"
キーボードの組み合わせは便利です。訪問者がキーボードを持っていれば、それは機能します。 あなたのデバイスがそれを持っていない場合でも、同じことをする別の方法があります。
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
```

## 座標: clientX/Y, pageX/Y 

<<<<<<< HEAD
すべてのマウスイベントは2種類の座標を持っています:
=======
All mouse events provide coordinates in two flavours:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

1. ウィンドウに相対: `clientX` と `clientY`.
2. ドキュメントに相対: `pageX` と `pageY`.

<<<<<<< HEAD
例えば、 500x500 サイズのウィンドウを持っていて、マウスが左上端にあるとき、`clientX` と `clientY` は `0` です。そして、マウスが中央にある場合、ドキュメント内のどの場所にあっても、`clientX` と `clientY` は `250` です。それらは `position:fixed` に似ています。

````online
入力フィールドにマウスを移動し `clientX/clientY` を見てみてください (それは `iframe` の中にあるので、座標は `iframe` への相対です)。:
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

````online
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

<<<<<<< HEAD
ドキュメント相対座標は、ドキュメントの左上端から数えられます。ウィンドウではありません。
座標 `pageX`, `pageY` はドキュメントレベルでの `position:absolute` に似ています。

チャプター <info:coordinates> で座標についてより知ることができます。

## マウスダウンで選択をしない 

マウスクリックは邪魔になる副作用があります。ダブルクリックするとテキストを選択します。

もし独自のクリックイベントを処理したい場合、"余分な" 選択はいまいちに見えます。

例えば、下のテキストのダブルクリックは、我々のハンドラに加えてそのテキストを選択します。:
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

<<<<<<< HEAD
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

殆どの場合、そうではありません。ユーザは、コピーまたはその他の必要性のために、テキストを選択する正当な理由がある可能性があります。 もしユーザにそれをさせることを許さなければ、それは邪魔になるかもしれません。 そのためこの解決策はそれほど良いものではありません。

私たちが欲しいものは、ダブルクリックで選択を防ぐ、それだけです。

テキスト選択は  `mousedown` イベントにおけるデフォルトブラウザアクションです。したがって、代わりの解決策は `mousedown` を処理し、それを防ぐことです。次のようになります:
=======
If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

<<<<<<< HEAD
今や、太字の要素はダブルクリックでは選択されません。

一方、その中のテキストは依然として選択可能です。選択はテキスト自身ではなく、その前後から始める必要があります。通常それは問題ありません。


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
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
`<div>` でテキストの一部をコピーしようとすると動作しません。なぜならデフォルトアクション `oncopy` が防止されているためです。

<<<<<<< HEAD
確かに、ユーザーがHTMLソースを開くことを止めることはできませんが、誰もがHTMLソースを開く方法を知っているわけではありません。
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
````

## サマリ 

<<<<<<< HEAD
マウスイベントは次のプロパティを持っています:

- ボタン: `which`.
- 修飾子 (押された場合 `true`): `altKey`, `ctrlKey`, `shiftKey` と `metaKey` (Mac).
  - `key:Ctrl` を処理したい場合、Mac ユーザを忘れてはいけません、彼らは `key:Cmd` を使うので、`if (e.metaKey || e.ctrlKey)` とチェックするのが良いです。

- ウィンドウ相対座標: `clientX/clientY`.
- ドキュメント相対座標: `pageX/clientX`.

下記のタスクでは、選択をクリックの不要な副作用として扱うことも重要です。

それにはいくつかの方法があります、例えば:
1. CSS プロパティ `user-select:none` (ブラウザプレフィックス付きで)はそれを完全に無効にします。
2. `getSelection().removeAllRanges()` を使って選択を事後にキャンセルします。
3. `mousedown` を処理し、デフォルトアクションを防ぎます(通常はこれがベストです)。
=======
Mouse events have the following properties:

- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
