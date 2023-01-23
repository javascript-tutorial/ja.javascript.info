
<<<<<<< HEAD
# マウスイベント
=======
# Mouse events
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

この章では、マウスイベントとそのプロパティの詳細を説明します。

<<<<<<< HEAD
注意: マウスイベント は "マウスデバイス" だけではなく、スマートフォンやタブレットなど互換性のためにエミュレートされた他のデバイスから来ることもあります。
=======
Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## マウスイベントの種類 

<<<<<<< HEAD
ここまでで、既にいくつかのイベントは見てきました:
=======
We've already seen some of these events:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`mousedown/mouseup`
: 要素上でマウスボタンがクリックされた/離されました。

`mouseover/mouseout`
: マウスポイントが要素に来る/出ていきました。

`mousemove`
<<<<<<< HEAD
: 要素上でのマウス移動毎にこのイベントが発生します。

`click`
: `mousedown` の後に発生し、マウスの左ボタンを使われた場合は同じ要素に `mouseup` が発生します。

`dblclick`
: 短時間の間に同じ要素で2回クリックされた後に発生します。最近はめったに使われません。

`contextmenu`
: マウスの右ボタンが使われた場合に発生します。が、コンテキストメニューを開く方法は他にもあります。例 特別なキーボードのキーを使用する場合です。この場合でもイベントが発生するので、正確にはマウスイベントではありません。

...他にもいくつかイベントがあります。後ほど説明します。

### イベント順 

上の一覧を見てわかるように、ユーザアクションは複数のイベントを発生させることがあります。

例えば、左ボタンのクリックは最初に `mousedown` を発生させ、ボタンが押された後、それが離されたときに `mouseup` と `click` が発生します。 

1つのアクションが複数イベントを発生させる場合、順序は決まっています。つまり、ハンドラは `mousedown` -> `mouseup` -> `click` の順番で呼び出されます。
=======
: Every mouse move over an element triggers that event.

`click`
: Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```online
下のボタンをクリックし、イベントを見てみてください。ダブルクリックも試してみてください。

<<<<<<< HEAD
下のテストスタンドでは、すべてのマウスイベントが記録され、イベント間で1秒以上の時間がある場合には水平ルーラーで区切っています。

また、マウスのボタンを検出するための `button` プロパティが見えますが、これについては後述します。
=======
On the teststand below, all mouse events are logged, and if there is more than a 1 second delay between them, they are separated by a horizontal rule.

Also, we can see the `button` property that allows us to detect the mouse button; it's explained below.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## マウスボタン

クリック関連のイベントには常に `button` プロパティがあり、正確なマウスボタンが取得できます。

通常、`click` や `contextmenu` では使いません。なぜなら前者は左クリックのときだけ、後者は -- 右クリックのときにだけ起こるからです。

一方、`mousedown` と `mouseup` ハンドラが `event.button` を必要とする場合があります。これらのイベントはどちらのボタンでも発生するためです。このとき、`button` で "右マウスダウン" と "左マウスダウン" が区別できます。

`event.button` がとり得る値は以下です:

| ボタン状態 | `event.button` |
|--------------|----------------|
| 左ボタン (主) | 0 |
| 中央ボタン (補助) | 1 |
| 右ボタン (副) | 2 |
| X1 ボタン (戻る) | 3 |
| X2 ボタン (進む) | 4 |

ほとんどのマウスデバイスは、左右の2つのボタンのみなので、取り得る値は `0` か `2` です。タッチデバイスもタップ時に同様のイベントを生成します。

また、`event.buttons` というプロパティもあり、これは現在押されているすべてのボタンを整数値として持っています。実際にはこのプロパティはほとんど使われませんが、[MDN](mdn:/api/MouseEvent/buttons) で詳細が確認できます。

```warn header="`event.which` は非推奨です"
古いコードでは `event.which` プロパティが使われていることがあります。これは、ボタンを取得する古い非標準の方法で、以下の値が取られます:

- `event.which == 1` – 左ボタン
- `event.which == 2` – 中央ボタン
- `event.which == 3` – 右ボタン
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

On the other hand, `mousedown` and `mouseup` handlers may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

現時点では、`event.which` は推奨されていないので使用しないでください。
```

## 修飾子: shift, alt, ctrl と meta 

すべてのマウスイベントは押された修飾子のキーに関する情報も含みます。

イベントプロパティ:

<<<<<<< HEAD
- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or Mac は `key:Opt`)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: Mac は `key:Cmd`

イベント時に対応するキーが押されていた場合 `true` になります。
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
```warn header="注意: Macでは通常は `Ctrl` ではなく `Cmd` です"
Windows と Linux には、`key:Alt`, `key:Shift` と `key:Ctrl` の修飾子があります。Mac ではもう一つあります: `key:Cmd`、これはプロパティ `metaKey` に相当します。

多くのアプリケーションでは、Windows/Linux が `key:Ctrl` を使う時、Mac では `key:Cmd` を使います。

つまり: Windows ユーザが `key:Ctrl+Enter` あるいは `key:Ctrl+A` を押すとき、Mac ユーザは `key:Cmd+Enter` あるいは `key:Cmd+A` となります。

したがって、`key:Ctrl` + クリック のような組み合わせをサポートしたいとき、Mac では `key:Cmd` + クリック とするのが理にかなっています。それがMacユーザにとってより快適です。

たとえ Mac ユーザに `key:Ctrl` + クリックを強制したいとしても、それは難しいです。問題は `key:Ctrl` で左クリックすると、Mac では *右クリック* と解釈され、Windows/Linux のように `click` ではなく　`contextmenu` イベントが生成されるからです。
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

なので、すべての OS の人々に快適に感じてもらうためには、`ctrlKey` と一緒に `metaKey` を使うべきです。

JS-codeの場合、`if (event.ctrlKey || event.metaKey)` というチェックを意味します。
```

<<<<<<< HEAD
```warn header="モバイルデバイスもあります"
キーボードの組み合わせは便利です。利用者がキーボードを使う場合は、それを使えるようにします。

ですが、モバイルデバイスのように、デバイスにキーボードがない場合は、修飾キーがなくても動作するようにする必要があります。
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## 座標: clientX/Y, pageX/Y 

すべてのマウスイベントは2種類の座標を持っています:

<<<<<<< HEAD
1. ウィンドウに相対: `clientX` と `clientY`.
2. ドキュメントに相対: `pageX` と `pageY`.
=======
All mouse events provide coordinates in two flavours:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<info:coordinates> の章で、これらの違いについては既に説明しました。

<<<<<<< HEAD
簡単に言うと、ドキュメント相対座標 `pageX/Y` はドキュメントの左上の端から数えた数値で、ページがスクールしても変わりません。一方、`clientX/Y` は現在のウィンドウの左上の端からになります。そのため、ページがスクロールされると値は変わります。

例えば、 500x500 サイズのウィンドウがあり、マウスが左上端にあるとき、`clientX` と `clientY` はページがスクロールされているかに関係なく `0` です。

そして、マウスが中央にある場合、ドキュメント内のどの場所にあっても、`clientX` と `clientY` は `250` です。それらは `position:fixed` に似ています。

````online
入力フィールドにマウスを移動し `clientX/clientY` を見てみてください (例は `iframe` の中にあるので、座標は `iframe` への相対です):
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

````online
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

<<<<<<< HEAD
## マウスダウンでの選択を防ぐ 

マウスのダブルクリックは、インターフェースによってはじゃまになる副作業があります。

例えば、下のテキストをダブルクリックすると、ハンドラに加えてそのテキストを選択します:
=======
## Preventing selection on mousedown

Double mouse click has a side effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
```

<<<<<<< HEAD
左のマウスボタンを押した後、離さずにマウスを動かすとそれも選択範囲になりますが、この動作はしばしば望まれないことがあります。

選択を防ぐ方法はいくつかあり、<info:selection-range> の章を読んでください。

この特定のケースで、最も理にかなった方法はブラウザの `mousedown` のアクションを無効にすることです。これで、これらの選択を防ぐことができます:
=======
If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

<<<<<<< HEAD
これで太字部分の要素はダブルクリックで選択されません。また左ボタンを押しても選択は開始されません。

補足: 内側のテキストは依然として選択可能です。ですが、選択はそのテキスト自身ではなく、その前後から始める必要があります。通常ユーザにとってこれは問題になりません。

````smart header="コピーを防止する"
ページのコンテンツをコピーペーストから守るために選択を無効にしたい場合は、別のイベントが利用できます: `oncopy`
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
`<div>` のテキストの一部をコピーしようとしても動作しません。なぜならデフォルトアクション `oncopy` が防止されているためです。

<<<<<<< HEAD
確かに、ユーザーがページのHTMLソースを開き、そこからコンテツを取ることを止めることはできません。が、誰もがHTMLソースを開く方法を知っているわけではありません。
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## サマリ 

<<<<<<< HEAD
マウスイベントには次のプロパティがあります:

- ボタン: `button`.
- 修飾子 (押された場合 `true`): `altKey`, `ctrlKey`, `shiftKey` と `metaKey` (Mac).
  - `key:Ctrl` を扱いたい場合に Mac ユーザを忘れてはいけません、Mac では `key:Cmd` を使うので、`if (e.metaKey || e.ctrlKey)` とチェックするのが良いです。

- ウィンドウ相対座標: `clientX/clientY`.
- ドキュメント相対座標: `pageX/clientX`.

`mousedown` のブラウザのデフォルトアクションはテキストの選択ですが、インターフェースにとってそれが良くない場合には選択を止めるべきです。

次の章では、ポインタの動きに関するイベントと、ポインタの下の要素の変化を追跡する方法についてより詳しく見ていきます。
=======
Mouse events have the following properties:

- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
