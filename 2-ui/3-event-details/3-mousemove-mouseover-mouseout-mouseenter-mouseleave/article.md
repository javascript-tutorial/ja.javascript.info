# 移動: mouseover/out, mouseenter/leave

マウスが要素間を移動するときに起こるイベントについての詳細を見ていきましょう。

[cut]

## Mouseover/mouseout, relatedTarget

`mouseoever` イベントはマウスポインタが要素の上に来るときに発生し、`mouseout` は -- そこを離れるときです。

![](mouseover-mouseout.png)

これらのイベントは `relatedTarget` を持っているという点で特別です。

`mouseover` の場合:

- `event.target` -- はマウスが来た要素です。
- `event.relatedTarget` -- は、マウスが来た元の要素です(どこから来たか)。

`mouseout` の場合はその逆です:

- `event.target` -- はマウスが離れた要素です。
- `event.relatedTarget` -- は新たなポインタの下の要素です(マウスが向かった要素)

```online
下の例では、それぞれの顔が要素です。マウスを移動させると、テキストエリアでイベントが見えます。

各イベントは要素が来た場所や、どこから来たかについての情報を持っています。

[codetabs src="mouseoverout" height=280]
```

```warn header="`relatedTarget` は `null` の可能性があります"
`relatedTarget` プロパティは `null` の場合があります。

それは正常なことで、単にマウスが別の要素から来たのではなく、ウィンドウの外から来たことを意味します。もしくはウィンドウから出たことを意味します。

我々のコードで `event.relatedTarget` を使うときは，その可能性を心に留めておく必要があります。もし `event.relatedTarget.tagName` へアクセスすると、エラーになるでしょう。
```

## イベントの頻度 

`mousemove` イベントはマウスの移動時にトリガされます。しかし、すべてのピクセル単位の移動でイベントが発生する訳ではありません。

ブラウザは時々マウスの位置をチェックします。そして、もし変更に気づいた場合、イベントをトリガします。

つまり、訪問者がマウスをとても速く動かしている場合、DOM 要素はスキップされる可能性があることを意味します。:

![](mouseover-mouseout-over-elems.png)

もしもマウスが上に書いているように、 `#FROM` から `#TO` 要素へ非常に速く移動する場合、間にある `<div>` (やそれら) はスキップされる可能性があります。`mouseout` イベントは `#FROM` でトリガし、その後 `#TO` ですぐに `mouseover` をトリガするかもしれません。

実際には、これは間に多くの要素がある場合に役立ちます。 私たちは本当にそれぞれのIn/Outを処理したくはありません。

その反面、マウスがあるイベントから別のイベントへゆっくり移動することは想定できないことに留意する必要があります。そうではなく、それは "ジャンプ" できます。

特に、ウィンドウの外からページ中央にカーソルが移動することもあり得ます。そして、それは "どこからも" 来ていないので、`relatedTarget=null` です。:

![](mouseover-mouseout-from-outside.png)

<div style="display:none">
In case of a fast move, intermediate elements may trigger no events. But if the mouse enters the element (`mouseover`), when we're guaranteed to have `mouseout` when it leaves it.
</div>

```online
下のテストスタンドで、実際に確認してみてください。

HTMLは2つのネストされた `<div>` 要素です。もしマウスをすばやく移動させると、イベントはまったく起きないかもしれません。もしくは赤の div だけ、緑の div だけがイベントをトリガするかもしれません。

また、赤の `div` にポインタを移動させ、すばやく緑の `div` を通って下に移動してみてください。移動が十分速い場合、親要素は無視されます。

[codetabs height=360 src="mouseoverout-fast"]
```

## 子へ向けて移動するときの "余分な" mouseout 

想像してください -- マウスポインタが要素に入りました。`mouseover` がトリガされました。その後、カーソルが子要素へ行きます。興味深いことは `mouseout` がその場合にトリガすることです。カーソルは依然として要素の中にありますが、`mouseout` が起きます!

![](mouseover-to-child.png)

奇妙に見えますが、簡単に説明する事ができます。

**ブラウザのロジックによれば、マウスカーソルは常に *単一の* 要素 -- 最もネストされた要素(及び z-index がトップ) -- の上にだけあります。**

したがって、別の要素(子孫だとしても)へ行く場合は前の要素を離れます。シンプルです。

下の例で見ることができる面白い結果があります。

赤の `<div>` は青の `<div>` にネストされています。青の `<div>` は以下のテキストにすべてのイベントを記録する `mouseover/out` ハンドラを持っています。

青要素に入って、次に赤要素にマウスを移動させてみてください -- そしてイベントを見てください。:

[codetabs height=360 src="mouseoverout-child"]

1. 青要素に入ると -- `mouseover [target: blue]` を得ます。
2. 次に、青から赤要素へ移動した後、 -- `mouseout [target: blue]` を得ます(親を離れます)。
3. ...そしてすぐに `mouseover [target: red]` です。

なので、`target` を考慮しないハンドラでは、`(2)` の `mouseout` で親を離れ、`(3)` の `mouseover` でそこへ戻ってきたように見えます。

要素の出入りの際にいくつかのアクションを実行する場合、多くの余分な "偽の" 実行が発生します。シンプルな物事に対して気づかない可能性があります。複雑な物事に対しては、望ましくない副作用を引き起こす可能性があります。

私たちは、代わりに `mouseenter/mouseleave` イベントを使用して修正できます。

## イベント mouseenter と mouseleave 

イベント `mouseenter/mouseleave` は `mouseover/mouseout` のようなものです。それらもマウスポインタが要素を出入りするときにトリガされます。

違いが2つあります。:

1. 要素内の遷移はカウントされません。
2. イベント `mouseenter/mouseleave` はバブルしません。

これらのイベントは直感的に非常に明確です。

ポインタが要素に入るとき -- `mouseenter` をトリガし、次に要素内でどこに行こうと関係はありません。`mouseleave` イベントはカーソルがそこを離れるときにだけトリガします。

同じ例を作りますが、青の `<div>` に `mouseenter/mouseleave` を置き、同じことをすると -- 青の `<div>` を入ったり出たりするときのみイベントをトリガするのが分かります。赤の `<div>` に行くときや戻るときに余分なイベントはありません。子は無視されます。

[codetabs height=340 src="mouseleave"]

## イベント移譲 [$Event delegation]

イベント `mouseenter/leave` は非常にシンプルで使いやすいです。しかし、それらはバブルしません。そのため、それらにイベント移譲を使えません。

テーブルセルに対してマウスの出入りを処理したいと想像してください。そして、何百ものセルがあります。

自然な解決策は -- `<table>` にハンドラを設定し、そこでイベントを処理することです。しかし `mouseenter/leave` はバブルしません。したがって、`<td>` でこのようなイベントが起きる場合、その `<td>` のハンドラだけがそのイベントをキャッチできます。

`<table>` 上の `mouseenter/leave` に対するハンドラは、テーブル全体の出入りでのみトリガします。その内側の遷移に関する情報を取得することはできません。

問題はありません -- `mouseover/mouseout` を使ってみましょう。

次のようなシンプルなハンドラがあります:

```js
// マウスの下にあるセルをハイライトしましょう
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

```online
[codetabs height=480 src="mouseenter-mouseleave-delegation"]
```

これらのハンドラは、任意の要素からテーブルの内側で行くときに動作します。

しかし、全体として `<td>` に出入りする遷移のみを処理したいと考えています。 そしてセル全体を強調表示します。 私たちは `<td>` の子の間で起こる遷移を処理したくありません。

解決策の1つは次のようになります:

- 変数で、現在強調されている `<td>` を覚えます。
- `mouseover` では -- まだ現在の `<td>` の中にいる場合はイベントを無視します。
- `mouseout` では -- 現在の `<td>` を離れなかった場合には無視します。

それは、`<td>` の子の間を移動するときの "余分な" イベントをフィルタします。

```offline
The details are in the [full example](sandbox:mouseenter-mouseleave-delegation-2).
```

```online
すべての詳細を含む完全な例を次に示します。:

[codetabs height=380 src="mouseenter-mouseleave-delegation-2"]

カーソルを、テーブルセルやその内側の内外に移動させてみてください。以前の例とは異なり、全体として `<td>` だけが強調表示されています。
```


## サマリ 

私たちはイベント `mouseover`, `mouseout`, `mousemove`, `mouseenter` と `mouseleave` を説明しました。

注目すべきことは:

- 速いマウス移動は `mouseover, mousemove, mouseout` に対し、中間要素をスキップすることができます。
- イベント `mouseover/out` と `mouserenter/leave` は `relatedTarget` という追加のターゲットを持っています。それは私たちが 来た/行く 要素であり、`target` と相補的な要素です。
- イベント `mouseover/out` は親要素から子要素に移動してもトリガされます。 マウスは、一度に1つの要素、つまり最も深い要素を想定します。
- イベント `mouserenter/leave` はバブルしないので、マウスが子要素に行くときにはトリガしません。それらは、マウスが要素全体の内側と外側のどちらに来るのかを追跡します。
