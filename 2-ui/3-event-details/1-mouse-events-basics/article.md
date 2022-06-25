
# マウスイベント

この章では、マウスイベントとそのプロパティの詳細を説明します。

注意: マウスイベント は "マウスデバイス" だけではなく、スマートフォンやタブレットなど互換性のためにエミュレートされた他のデバイスから来ることもあります。

## マウスイベントの種類 

ここまでで、既にいくつかのイベントは見てきました:

`mousedown/mouseup`
: 要素上でマウスボタンがクリックされた/離されました。

`mouseover/mouseout`
: マウスポイントが要素に来る/出ていきました。

`mousemove`
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

```online
下のボタンをクリックし、イベントを見てみてください。ダブルクリックも試してみてください。

下のテストスタンドでは、すべてのマウスイベントが記録され、イベント間で1秒以上の時間がある場合には水平ルーラーで区切っています。

また、マウスのボタンを検出するための `button` プロパティが見えますが、これについては後述します。

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Click me with the right or the left mouse button" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

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

現時点では、`event.which` は推奨されていないので使用しないでください。
```

## 修飾子: shift, alt, ctrl と meta 

すべてのマウスイベントは押された修飾子のキーに関する情報も含みます。

イベントプロパティ:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or Mac は `key:Opt`)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: Mac は `key:Cmd`

イベント時に対応するキーが押されていた場合 `true` になります。

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

```warn header="注意: Macでは通常は `Ctrl` ではなく `Cmd` です"
Windows と Linux には、`key:Alt`, `key:Shift` と `key:Ctrl` の修飾子があります。Mac ではもう一つあります: `key:Cmd`、これはプロパティ `metaKey` に相当します。

多くのアプリケーションでは、Windows/Linux が `key:Ctrl` を使う時、Mac では `key:Cmd` を使います。

つまり: Windows ユーザが `key:Ctrl+Enter` あるいは `key:Ctrl+A` を押すとき、Mac ユーザは `key:Cmd+Enter` あるいは `key:Cmd+A` となります。

したがって、`key:Ctrl` + クリック のような組み合わせをサポートしたいとき、Mac では `key:Cmd` + クリック とするのが理にかなっています。それがMacユーザにとってより快適です。

たとえ Mac ユーザに `key:Ctrl` + クリックを強制したいとしても、それは難しいです。問題は `key:Ctrl` で左クリックすると、Mac では *右クリック* と解釈され、Windows/Linux のように `click` ではなく　`contextmenu` イベントが生成されるからです。

なので、すべての OS の人々に快適に感じてもらうためには、`ctrlKey` と一緒に `metaKey` を使うべきです。

JS-codeの場合、`if (event.ctrlKey || event.metaKey)` というチェックを意味します。
```

```warn header="モバイルデバイスもあります"
キーボードの組み合わせは便利です。利用者がキーボードを使う場合は、それを使えるようにします。

ですが、モバイルデバイスのように、デバイスにキーボードがない場合は、修飾キーがなくても動作するようにする必要があります。
```

## 座標: clientX/Y, pageX/Y 

すべてのマウスイベントは2種類の座標を持っています:

1. ウィンドウに相対: `clientX` と `clientY`.
2. ドキュメントに相対: `pageX` と `pageY`.

<info:coordinates> の章で、これらの違いについては既に説明しました。

簡単に言うと、ドキュメント相対座標 `pageX/Y` はドキュメントの左上の端から数えた数値で、ページがスクールしても変わりません。一方、`clientX/Y` は現在のウィンドウの左上の端からになります。そのため、ページがスクロールされると値は変わります。

例えば、 500x500 サイズのウィンドウがあり、マウスが左上端にあるとき、`clientX` と `clientY` はページがスクロールされているかに関係なく `0` です。

そして、マウスが中央にある場合、ドキュメント内のどの場所にあっても、`clientX` と `clientY` は `250` です。それらは `position:fixed` に似ています。

````online
入力フィールドにマウスを移動し `clientX/clientY` を見てみてください (例は `iframe` の中にあるので、座標は `iframe` への相対です):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
```
````

## マウスダウンでの選択を防ぐ 

マウスのダブルクリックは、インターフェースによってはじゃまになる副作業があります。

例えば、下のテキストをダブルクリックすると、ハンドラに加えてそのテキストを選択します:

```html autorun height=50
<b ondblclick="alert('dblclick')">Double-click me</b>
```

左のマウスボタンを押した後、離さずにマウスを動かすとそれも選択範囲になりますが、この動作はしばしば望まれないことがあります。

選択を防ぐ方法はいくつかあり、<info:selection-range> の章を読んでください。

この特定のケースで、最も理にかなった方法はブラウザの `mousedown` のアクションを無効にすることです。これで、これらの選択を防ぐことができます:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

これで太字部分の要素はダブルクリックで選択されません。また左ボタンを押しても選択は開始されません。

補足: 内側のテキストは依然として選択可能です。ですが、選択はそのテキスト自身ではなく、その前後から始める必要があります。通常ユーザにとってこれは問題になりません。

````smart header="コピーを防止する"
ページのコンテンツをコピーペーストから守るために選択を無効にしたい場合は、別のイベントが利用できます: `oncopy`

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
`<div>` のテキストの一部をコピーしようとしても動作しません。なぜならデフォルトアクション `oncopy` が防止されているためです。

確かに、ユーザーがページのHTMLソースを開き、そこからコンテツを取ることを止めることはできません。が、誰もがHTMLソースを開く方法を知っているわけではありません。
````

## サマリ 

マウスイベントには次のプロパティがあります:

- ボタン: `button`.
- 修飾子 (押された場合 `true`): `altKey`, `ctrlKey`, `shiftKey` と `metaKey` (Mac).
  - `key:Ctrl` を扱いたい場合に Mac ユーザを忘れてはいけません、Mac では `key:Cmd` を使うので、`if (e.metaKey || e.ctrlKey)` とチェックするのが良いです。

- ウィンドウ相対座標: `clientX/clientY`.
- ドキュメント相対座標: `pageX/clientX`.

`mousedown` のブラウザのデフォルトアクションはテキストの選択ですが、インターフェースにとってそれが良くない場合には選択を止めるべきです。

次の章では、ポインタの動きに関するイベントと、ポインタの下の要素の変化を追跡する方法についてより詳しく見ていきます。
