# 要素サイズとスクローリング

<<<<<<< HEAD
要素の幅、高さや他のジオメトリの特徴を関する情報を読み取ることのできる JavaScript のプロパティがたくさんあります。

JavaScript では、要素を移動したり配置するときに、座標を正しく計算するためにしばしばそれらを必要とします。

[cut]
=======
There are many JavaScript properties that allow us to read information about element width, height and other geometry features.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

We often need them when moving or positioning elements in JavaScript.

## サンプル要素 

プロパティを示すサンプルの要素として、以下のものを使用します:

```html no-beautify
<div id="example">
  ...Text...
</div>
<style>
  #example {
    width: 300px;
    height: 200px;
    border: 25px solid #E8C48F;
    padding: 20px;
    overflow: auto;
  }
</style>
```

それはボーダー、パディングとスクローリングを持っています。特徴のフルセットです。要素自体の一部ではないため、マージンはありません。また、特別なプロパティはありません。

要素はこのように見えます:

![](metric-css.svg)

[サンドボックスでドキュメントを開く](sandbox:metric) ことができます。

<<<<<<< HEAD
```smart header="スクロールバーを気にしてください"
上の図は、要素にスクロールバーがあるときの最も複雑なケースを示します。いくつかのブラウザ(すべてではありません)はコンテンツから取得することで、スクロールバーの領域を予約します。

したがって、スクロールバーがなければ、コンテンツの幅は `300px` になりますが、スクロールバーの幅が `16px` の場合(幅はデバイスやブラウザによって異なる場合があります)、 `300-16 = 284px` しか残っておらず、我々はそれを考慮する必要があります。そのため、このチャプターの例ではスクロールバーがあると仮定しています。もしスクロールバーがない場合には、物事は少しシンプルです。
```

```smart header="`padding-bottom` はテキストで埋められるかもしれません"
通常、パディングはイラストでは空白で表示されますが、要素に多くのテキストがあり、オーバーフローする場合、ブラウザは `padding-bottom` に "オーバーフローしている" テキストを表示します。例でそれを見ることができます。しかし特に明記されていない限り、パディングは依然としてそこにあります。
=======
```smart header="Mind the scrollbar"
The picture above demonstrates the most complex case when the element has a scrollbar. Some browsers (not all) reserve the space for it by taking it from the content (labeled as "content width" above).

So, without scrollbar the content width would be `300px`, but if the scrollbar is `16px` wide (the width may vary between devices and browsers) then only `300 - 16 = 284px` remains, and we should take it into account. That's why examples from this chapter assume that there's a scrollbar. Without it, some calculations are simpler.
```

```smart header="The `padding-bottom` area may be filled with text"
Usually paddings are shown empty on our illustrations, but if there's a lot of text in the element and it overflows, then browsers show the "overflowing" text at `padding-bottom`, that's normal.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## ジオメトリ 

<<<<<<< HEAD
幅、高さや他のジオメトリを提供する要素プロパティは常に数値です。それらはピクセルと仮定されます。

ここに全体像があります:

![](metric-all.svg)

それらは多くのプロパティがあり、1つの図でそれらすべてを表現するのは難しいです。が、それらの値は単純で理解しやすいものです。

要素の外側からそれらを調べてみましょう。
=======
Here's the overall picture with geometry properties:

![](metric-all.svg)

Values of these properties are technically numbers, but these numbers are "of pixels", so these are pixel measurements.

Let's start exploring the properties starting from the outside of the element.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## offsetParent, offsetLeft/Top

これらのプロパティは殆ど必要とされませんが、依然としてそれらは "最も外側の" ジオメトリプロパティなので、ここから始めましょう。

<<<<<<< HEAD
`offsetParent` は次のような、最も近い祖先です。:

1. CSS-positioned(CSS位置) (`position` は `absolute`, `relative` または `fixed`),
2. もしくは `<td>`, `<th>`, `<table>`,
2. もしくは `<body>`.

ほとんどの実践的なケースでは、`offsetParent` を使用して、最も近い CSS位置の祖先の取得出来ます。そして、`offsetLeft/offsetTop` はその左上隅への相対的な x/y 座標を提供します。

下の例では、内部の `<div>` は `offsetParent` として `<main>` を持っており、`offsetLeft/offsetTop` はその左上隅(`180`)からシフトしています。:
=======
The `offsetParent` is the nearest ancestor that the browser uses for calculating coordinates during rendering.

That's the nearest ancestor that is one of the following:

1. CSS-positioned (`position` is `absolute`, `relative`, `fixed` or `sticky`),  or
2. `<td>`, `<th>`, or `<table>`,  or
3. `<body>`.

Properties `offsetLeft/offsetTop` provide x/y coordinates relative to `offsetParent` upper-left corner.

In the example below the inner `<div>` has `<main>` as `offsetParent` and `offsetLeft/offsetTop` shifts from its upper-left corner (`180`):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=10
<main style="position: relative" id="main">
  <article>
    <div id="example" style="position: absolute; left: 180px; top: 180px">...</div>
  </article>
</main>
<script>
  alert(example.offsetParent.id); // main
  alert(example.offsetLeft); // 180 (note: a number, not a string "180px")
  alert(example.offsetTop); // 180
</script>
```

![](metric-offset-parent.svg)
<<<<<<< HEAD

`offsetParent` が `null` である場合がいくつかあります:

1. 表示されていない要素(`display:none` またはドキュメント上にない)の場合
2. `<body>` と `<html>` の場合
3. `position:fixed` を持つ要素の場合

## offsetWidth/Height

次に、要素自身へ移動しましょう。
=======

There are several occasions when `offsetParent` is `null`:

1. For not shown elements (`display:none` or not in the document).
2. For `<body>` and `<html>`.
3. For elements with `position:fixed`.

## offsetWidth/Height

Now let's move on to the element itself.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これら2つのプロパティは最もシンプルなものです。これらは要素の "外部の" 幅/高さを提供します。もしくは、言い換えると、ボーダーを含むその要素の完全なサイズです。

![](metric-offset-width-height.svg)

サンプル要素の場合:

<<<<<<< HEAD
- `offsetWidth = 390` -- 外部の幅で、内部のCSS幅(`300px`)とパディング(`2*20px`) とボーダー(`2*25px`) を足したものです。
- `offsetHeight = 290` -- 外部の高さです。

````smart header="表示されていない要素のジオメトリプロパティはゼロ/nullです"
ジオメトリプロパティは表示されている要素に対してのみ計算されます。

もし要素(またはその祖先)が `display:none` を持っている、もしくはドキュメント上にない場合、それに応じてすべてのジオメトリプロパティはゼロもしくは `null` になります。

例えば、`offsetParent` が `null` で `offsetWidth`, `offsetHeight` は `0` です。
=======
- `offsetWidth = 390` -- the outer width, can be calculated as inner CSS-width (`300px`) plus paddings (`2 * 20px`) and borders (`2 * 25px`).
- `offsetHeight = 290` -- the outer height.

````smart header="Geometry properties are zero/null for elements that are not displayed"
Geometry properties are calculated only for displayed elements.

If an element (or any of its ancestors) has `display:none` or is not in the document, then all geometry properties are zero (or `null` for `offsetParent`).

For example, `offsetParent` is `null`, and `offsetWidth`, `offsetHeight` are `0` when we created an element, but haven't inserted it into the document yet, or it (or its ancestor) has `display:none`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

私たちは次のように、これを要素が隠されているかをチェックするための使う事ができます:

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

<<<<<<< HEAD
このような `isHidden` は、(空の `<div>` のように)画面上にあるがサイズがゼロの要素の場合に `true` を返します。
=======
Please note that such `isHidden` returns `true` for elements that are on-screen, but have zero sizes.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## clientTop/Left

要素の内側にはボーダーがあります。

それらを測るため、`clientTop` と `clientLeft` があります。

私たちの例では:

- `clientLeft = 25` -- 左のボーダー幅
- `clientTop = 25` -- トップのボーダー幅

![](metric-client-left-top.svg)

<<<<<<< HEAD
...しかし正確には -- それらはボーダーではなく、外側から内側の相対座標です。
=======
...But to be precise -- these properties are not border width/height, but rather relative coordinates of the inner side from the outer side.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

違いは何でしょう?

<<<<<<< HEAD
ドキュメントが右から左のとき(OSがアラビア語またはヘブライ語のとき)、その違いが見えます。スクロールバーは右側にはなく左側にあります。`clientLeft` にはスクロールバーの幅も含まれます。

この場合、今回の例の `clientLeft` は `25` ではなく、スクロールバーの幅を含めたものになります `25+16=41`:
=======
It becomes visible when the document is right-to-left (the operating system is in Arabic or Hebrew languages). The scrollbar is then not on the right, but on the left, and then `clientLeft` also includes the scrollbar width.

In that case, `clientLeft` would be not `25`, but with the scrollbar width `25 + 16 = 41`.

Here's the example in hebrew:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

![](metric-client-left-top-rtl.svg)

## clientWidth/Height

これらのプロパティは要素のボーダーの内側の領域のサイズを提供します。

パディングと一緒にコンテンツの幅を含みますが、スクロールバーは含まれません。:

![](metric-client-width-height.svg)
<<<<<<< HEAD

上の図では、最初に `clientHeight` を考えましょう: これは評価するのが簡単です。水平スクロールバーがないので、ボーダーの内側の合計になります: CSS高さ `200px` に top と bottom のパディング(`2*20px`) を加えた合計 `240px` です。
=======

On the picture above let's first consider `clientHeight`.

There's no horizontal scrollbar, so it's exactly the sum of what's inside the borders: CSS-height `200px` plus top and bottom paddings (`2 * 20px`) total `240px`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

さて、`clientWidth` は -- コンテンツ幅は `300px` ではなく `284px` です。なぜなら `16px` はスクロールバーの幅だからです。したがって、合計は `284px` に左右のパディングを足した `324px` です。

**もしパディングがない場合、`clientWidth/Height` は丁度ボーダーとスクロールバー(存在する場合)の内側のコンテンツ領域なります。**

![](metric-client-width-nopadding.svg)

したがって、パディングがない場合には、コンテンツ領域のサイズを取得するために `clientWidth/clientHeight` を使うことができます。

## scrollWidth/Height

<<<<<<< HEAD
- プロパティ `clientWidth/clientHeight` は要素の可視部分のみを占めます。
- プロパティ `scrollWidth/scrollHeight` はスクロールアウトされた(隠れた)部分も含めます:
=======
These properties are like `clientWidth/clientHeight`, but they also include the scrolled out (hidden) parts:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

![](metric-scroll-width-height.svg)

上の図では:

<<<<<<< HEAD
- `scrollHeight = 723` -- はスクロールアウト部分を含めたコンテンツ領域一杯の内部の高さです。
- `scrollWidth = 324` -- は内部の全幅で、ここでは水平スクロールがないので、`clientWidth` と等しくなります。
=======
- `scrollHeight = 723` -- is the full inner height of the content area including the scrolled out parts.
- `scrollWidth = 324` -- is the full inner width, here we have no horizontal scroll, so it equals `clientWidth`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

要素の広さを、その一杯の幅/高さに広げるのにこれらのプロパティを使うことができます。

このように:

```js
<<<<<<< HEAD
// 要素をコンテンツの高さ一杯に広げます
element.style.height = element.scrollHeight + 'px';
=======
// expand the element to the full content height
element.style.height = `${element.scrollHeight}px`;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

```online
ボタンをクリックして要素を広げてください:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = `${element.scrollHeight}px`">element.style.height = `${element.scrollHeight}px`</button>
```

## scrollLeft/scrollTop

プロパティ `scrollLeft/scrollTop` は隠された部分の 幅/高さ で、要素のスクロールアウトされた部分です。

下の図では、縦スクロールのブロックに対する `scrollHeight` と `scrollTop` を見ることが出来ます。

![](metric-scroll-top.svg)

つまり、`scrollTop` は "どのくらいスクロールされているか" です。

<<<<<<< HEAD
````smart header="`scrollLeft/scrollTop` は変更可能です"
ほとんどのジオメトリプロパティは読み取り専用ですが、`scrollLeft/scrollTop` は変更可能で、ブラウザは要素をスクロールさせます。

```online
下の要素をクリックすると、コード `elem.scrollTop+=10` を実行します。それは要素のコンテンツを `10px` 下にスクロールします。
=======
````smart header="`scrollLeft/scrollTop` can be modified"
Most of the geometry properties here are read-only, but `scrollLeft/scrollTop` can be changed, and the browser will scroll the element.

```online
If you click the element below, the code `elem.scrollTop += 10` executes. That makes the element content scroll `10px` down.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

<<<<<<< HEAD
`scrollTop` を `0` または `Infinity` に設定すると、要素はそれぞれトップ/ボトムまでスクロールします。
=======
Setting `scrollTop` to `0` or a big value, such as `1e9` will make the element scroll to the very top/bottom respectively.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## CSS から幅/高さを取らないでください 

<<<<<<< HEAD
私たちは、DOM要素のジオメトリプロパティを説明してきました。それらは通常、幅や高さを取得したり、距離を計算するために使われます。
=======
We've just covered geometry properties of DOM elements, that can be used to get widths, heights and calculate distances.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、チャプター <info:styles-and-classes> でご存知の通り、CSSの幅/高さは`getComputedStyle` を使って読み取る事ができます。

<<<<<<< HEAD
なので、次のようにして要素の幅を読んだらどうでしょう？
=======
So why not to read the width of an element with `getComputedStyle`, like this?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // 要素の CSS幅を表示します
```

<<<<<<< HEAD
なぜ代わりにジオメトリプロパティを使う必要があるのでしょうか？2つ理由があります:

1. まず、CSS 幅/高さ は別のプロパティに依存しています: CSS の幅と高さが "何か" を定義する `box-sizing` です。CSS 目的のために `box-sizing` を変更すると、このような JavaScript が壊れる可能性があります。
2. 次に、CSS `width/height` は `auto` の場合があります。例えば、インライン要素の場合です:
=======
Why should we use geometry properties instead? There are two reasons:

1. First, CSS `width/height` depend on another property: `box-sizing` that defines "what is" CSS width and height. A change in `box-sizing` for CSS purposes may break such JavaScript.
2. Second, CSS `width/height` may be `auto`, for instance for an inline element:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

<<<<<<< HEAD
    CSSの立場からだと、`width:auto` は完全は正常ですが, JavaScript では計算で使える `px` での正確なサイズが必要です。そのため、ここでは CSS 幅は全く役に立ちません。

また、もう1つ理由があります: スクロールバーです。スクロールバーがない場合に上手く動作するコードは、スクロールバーがあると不具合を引き起こすことがあります。なぜなら、スクロールバーは、ブラウザによってはコンテンツからスペースを取るためです。従って、コンテンツのために本当に利用可能な幅は CSS 幅よりも *小さい* です。そして、`clientWidth/clientHeight` はそれを考慮します。

...しかし、`getComputedStyle(elem).width` を使った状況では異なります。一部のブラウザ(e.g. Chrome) ではスクロールバーを引いた実際の内部幅を返し、別のいくつか(e.g. Firefox)は -- CSS 幅を返します(スクロールバーを無視)。このようなクロスブラザの差異が、`getComputedStyle` の利用ではなく、むしろジオメトリプロパティに頼るべき理由です。
=======
    From the CSS standpoint, `width:auto` is perfectly normal, but in JavaScript we need an exact size in `px` that we can use in calculations. So here CSS width is useless.

And there's one more reason: a scrollbar. Sometimes the code that works fine without a scrollbar becomes buggy with it, because a scrollbar takes the space from the content in some browsers. So the real width available for the content is *less* than CSS width. And `clientWidth/clientHeight` take that into account.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```online
もしあなたのブラウザがスクロールバーのスペースを確保するなら(Windows用のほとんどのブラウザがそうです)、下のサンプルでそれをテストできます。

[iframe src="cssWidthScroll" link border=1]

テキストを持つ要素は CSS `width:300x` です。

デスクトップ Windows OS 上の Firefox, Chrome, Edge はすべてスクロールバーのためのスペースを確保します。しかし、ChromeとEdgeがより小さい値を表示する一方、Firefox は `300px` を表示します。これは、Firefox が CSS 幅を返し、他のブラウザは "実際の" 幅を返すためです。
```

<<<<<<< HEAD
説明した違いは JavaScript から `getComputedStyle(...).width` を読むことについてのみであり、視覚的にはすべて正しいことに注意してください。
=======
Please note that the described difference is only about reading `getComputedStyle(...).width` from JavaScript, visually everything is correct.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

要素は次のジオメトリプロパティを持っています:

<<<<<<< HEAD
- `offsetParent` -- は最も近い position 指定された祖先 もしくは `td`, `th`, `table`, `body` です。
- `offsetLeft/offsetTop` -- は `offsetParent` の左上端を基準とする座標です。
- `offsetWidth/offsetHeight` -- はボーダーを含む要素の "外部の" 幅/高さです。
- `clientLeft/clientTop` -- は左上の外側の角から左上の内側の角までの距離です。 左から右の OS では、常に左/上のボーダー幅です。 右から左へのOSの場合、縦スクロールバーは左にあります。したがって、 `clientLeft` もその幅を含みます。
- `clientWidth/clientHeight` -- はパディングを含むコンテンツの幅/高さですが、スクロールバーは含みません。
- `scrollWidth/scrollHeight` -- スクロールアウト部分を含むコンテンツの幅/高さです。パディングも含みますが、スクロールバーは含みません。
- `scrollLeft/scrollTop` -- 要素のスクロールアウトされた部分の幅/高さで、左上の角から距離です。

`scrollLeft/scrollTop` 以外のすべてのプロパティは読み取り専用です。`scrollLeft/scrollTop` を変更するとブラウザは要素をスクロールします。
=======
- `offsetParent` -- is the nearest positioned ancestor or `td`, `th`, `table`, `body`.
- `offsetLeft/offsetTop` -- coordinates relative to the upper-left edge of `offsetParent`.
- `offsetWidth/offsetHeight` -- "outer" width/height of an element including borders.
- `clientLeft/clientTop` -- the distances from the upper-left outer corner to the upper-left inner (content + padding) corner. For left-to-right OS they are always the widths of left/top borders. For right-to-left OS the vertical scrollbar is on the left so `clientLeft` includes its width too.
- `clientWidth/clientHeight` -- the width/height of the content including paddings, but without the scrollbar.
- `scrollWidth/scrollHeight` -- the width/height of the content, just like `clientWidth/clientHeight`, but also include scrolled-out, invisible part of the element.
- `scrollLeft/scrollTop` -- width/height of the scrolled out upper part of the element, starting from its upper-left corner.

All properties are read-only except `scrollLeft/scrollTop` that make the browser scroll the element if changed.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
