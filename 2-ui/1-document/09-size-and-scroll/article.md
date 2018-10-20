# 要素サイズとスクローリング

要素の幅、高さや他のジオメトリの特徴を関する情報を読み取ることのできる JavaScript のプロパティがたくさんあります。

JavaScript では、要素を移動したり配置するときに、座標を正しく計算するためにしばしばそれらを必要とします。

[cut]


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

![](metric-css.png)

[サンドボックスでドキュメントを開く](sandbox:metric) ことができます。

```smart header="スクロールバーを気にしてください"
上の図は、要素にスクロールバーがあるときの最も複雑なケースを示します。いくつかのブラウザ(すべてではありません)はコンテンツから取得することで、スクロールバーの領域を予約します。

したがって、スクロールバーがなければ、コンテンツの幅は `300px` になりますが、スクロールバーの幅が `16px` の場合(幅はデバイスやブラウザによって異なる場合があります)、 `300-16 = 284px` しか残っておらず、我々はそれを考慮する必要があります。そのため、このチャプターの例ではスクロールバーがあると仮定しています。もしスクロールバーがない場合には、物事は少しシンプルです。
```

```smart header="`padding-bottom` はテキストで埋められるかもしれません"
通常、パディングはイラストでは空白で表示されますが、要素に多くのテキストがあり、オーバーフローする場合、ブラウザは `padding-bottom` に "オーバーフローしている" テキストを表示します。例でそれを見ることができます。しかし特に明記されていない限り、パディングは依然としてそこにあります。
```

## ジオメトリ 

幅、高さや他のジオメトリを提供する要素プロパティは常に数値です。それらはピクセルと仮定されます。

ここに全体像があります:

![](metric-all.png)

それらは多くのプロパティがあり、1つの図でそれらすべてを表現するのは難しいです。が、それらの値は単純で理解しやすいものです。

要素の外側からそれらを調べてみましょう。

## offsetParent, offsetLeft/Top

これらのプロパティは殆ど必要とされませんが、依然としてそれらは "最も外側の" ジオメトリプロパティなので、ここから始めましょう。

`offsetParent` は次のような、最も近い祖先です。:

1. CSS-positioned(CSS位置) (`position` は `absolute`, `relative` または `fixed`),
2. もしくは `<td>`, `<th>`, `<table>`,
2. もしくは `<body>`.

ほとんどの実践的なケースでは、`offsetParent` を使用して、最も近い CSS位置の祖先の取得出来ます。そして、`offsetLeft/offsetTop` はその左上隅への相対的な x/y 座標を提供します。

下の例では、内部の `<div>` は `offsetParent` として `<main>` を持っており、`offsetLeft/offsetTop` はその左上隅(`180`)からシフトしています。:

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

![](metric-offset-parent.png)

`offsetParent` が `null` である場合がいくつかあります:

1. 表示されていない要素(`display:none` またはドキュメント上にない)の場合
2. `<body>` と `<html>` の場合
3. `position:fixed` を持つ要素の場合

## offsetWidth/Height

次に、要素自身へ移動しましょう。

これら2つのプロパティは最もシンプルなものです。これらは要素の "外部の" 幅/高さを提供します。もしくは、言い換えると、ボーダーを含むその要素の完全なサイズです。

![](metric-offset-width-height.png)

サンプル要素の場合:

- `offsetWidth = 390` -- 外部の幅で、内部のCSS幅(`300px`)とパディング(`2*20px`) とボーダー(`2*25px`) を足したものです。
- `offsetHeight = 290` -- 外部の高さです。

````smart header="表示されていない要素のジオメトリプロパティはゼロ/nullです"
ジオメトリプロパティは表示されている要素に対してのみ計算されます。

もし要素(またはその祖先)が `display:none` を持っている、もしくはドキュメント上にない場合、それに応じてすべてのジオメトリプロパティはゼロもしくは `null` になります。

例えば、`offsetParent` が `null` で `offsetWidt`, `offsetHeight` は `0` です。

私たちは次のように、これを要素が隠されているかをチェックするための使う事ができます:

```js
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
```

このような `isHidden` は、(空の `<div>` のように)画面上にあるがサイズがゼロの要素の場合に `true` を返します。
````

## clientTop/Left

要素の内側にはボーダーがあります。

それらを測るため、`clientTop` と `clientLeft` があります。

私たちの例では:

- `clientLeft = 25` -- 左のボーダー幅
- `clientTop = 25` -- トップのボーダー幅

![](metric-client-left-top.png)

...しかし正確には -- それらはボーダーではなく、外側から内側の相対座標です。

違いは何でしょう?

ドキュメントが右から左のとき(OSがアラビア語またはヘブライ語のとき)、その違いが見えます。スクロールバーは右側にはなく左側にあります。`clientLeft` にはスクロールバーの幅も含まれます。

この場合、今回の例の `clientLeft` は `25` ではなく、スクロールバーの幅を含めたものになります `25+16=41`:

![](metric-client-left-top-rtl.png)

## clientWidth/Height

これらのプロパティは要素のボーダーの内側の領域のサイズを提供します。

パディングと一緒にコンテンツの幅を含みますが、スクロールバーは含まれません。:

![](metric-client-width-height.png)

上の図では、最初に `clientHeight` を考えましょう: これは評価するのが簡単です。水平スクロールバーがないので、ボーダーの内側の合計になります: CSS高さ `200px` に top と bottom のパディング(`2*20px`) を加えた合計 `240px` です。

さて、`clientWidth` は -- コンテンツ幅は `300px` ではなく `284px` です。なぜなら `16px` はスクロールバーの幅だからです。したがって、合計は `284px` に左右のパディングを足した `324px` です。

**もしパディングがない場合、`clientWidth/Height` は丁度ボーダーとスクロールバー(存在する場合)の内側のコンテンツ領域なります。**

![](metric-client-width-nopadding.png)

したがって、パディングがない場合には、コンテンツ領域のサイズを取得するために `clientWidth/clientHeight` を使うことができます。

## scrollWidth/Height

- プロパティ `clientWidth/clientHeight` は要素の可視部分のみを占めます。
- プロパティ `scrollWidth/scrollHeight` はスクロールアウトされた(隠れた)部分も含めます:

![](metric-scroll-width-height.png)

上の図では:

- `scrollHeight = 723` -- はスクロールアウト部分を含めたコンテンツ領域一杯の内部の高さです。
- `scrollWidth = 324` -- は内部の全幅で、ここでは水平スクロールがないので、`clientWidth` と等しくなります。

要素の広さを、その一杯の幅/高さに広げるのにこれらのプロパティを使うことができます。

このように:

```js
// 要素をコンテンツの高さ一杯に広げます
element.style.height = element.scrollHeight + 'px';
```

```online
ボタンをクリックして要素を広げてください:

<div id="element" style="width:300px;height:200px; padding: 0;overflow: auto; border:1px solid black;">text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text text</div>

<button style="padding:0" onclick="element.style.height = element.scrollHeight + 'px'">element.style.height = element.scrollHeight + 'px'</button>
```

## scrollLeft/scrollTop

プロパティ `scrollLeft/scrollTop` は隠された部分の 幅/高さ で、要素のスクロールアウトされた部分です。

下の図では、縦スクロールのブロックに対する `scrollHeight` と `scrollTop` を見ることが出来ます。

![](metric-scroll-top.png)

つまり、`scrollTop` は "どのくらいスクロールされているか" です。

````smart header="`scrollLeft/scrollTop` は変更可能です"
ほとんどのジオメトリプロパティは読み取り専用ですが、`scrollLeft/scrollTop` は変更可能で、ブラウザは要素をスクロールさせます。

```online
下の要素をクリックすると、コード `elem.scrollTop+=10` を実行します。それは要素のコンテンツを `10px` 下にスクロールします。

<div onclick="this.scrollTop+=10" style="cursor:pointer;border:1px solid black;width:100px;height:80px;overflow:auto">Click<br>Me<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9</div>
```

`scrollTop` を `0` または `Infinity` に設定すると、要素はそれぞれトップ/ボトムまでスクロールします。
````

## CSS から幅/高さを取らないでください 

私たちは、DOM要素のジオメトリプロパティを説明してきました。それらは通常、幅や高さを取得したり、距離を計算するために使われます。

しかし、チャプター <info:styles-and-classes> でご存知の通り、CSSの幅/高さは`getComputedStyle` を使って読み取る事ができます。

なので、次のようにして要素の幅を読んだらどうでしょう？

```js run
let elem = document.body;

alert( getComputedStyle(elem).width ); // 要素の CSS幅を表示します
```

なぜ代わりにジオメトリプロパティを使う必要があるのでしょうか？2つ理由があります:

1. まず、CSS 幅/高さ は別のプロパティに依存しています: CSS の幅と高さが "何か" を定義する `box-sizing` です。CSS 目的のために `box-sizing` を変更すると、このような JavaScript が壊れる可能性があります。
2. 次に、CSS `width/height` は `auto` の場合があります。例えば、インライン要素の場合です:

    ```html run
    <span id="elem">Hello!</span>

    <script>
    *!*
      alert( getComputedStyle(elem).width ); // auto
    */!*
    </script>
    ```

    CSSの立場からだと、`width:auto` は完全は正常ですが, JavaScript では計算で使える `px` での正確なサイズが必要です。そのため、ここでは CSS 幅は全く役に立ちません。

また、もう1つ理由があります: スクロールバーです。スクロールバーがない場合に上手く動作するコードは、スクロールバーがあると不具合を引き起こすことがあります。なぜなら、スクロールバーは、ブラウザによってはコンテンツからスペースを取るためです。従って、コンテンツのために本当に利用可能な幅は CSS 幅よりも *小さい* です。そして、`clientWidth/clientHeight` はそれを考慮します。

...しかし、`getComputedStyle(elem).width` を使った状況では異なります。一部のブラウザ(e.g. Chrome) ではスクロールバーを引いた実際の内部幅を返し、別のいくつか(e.g. Firefox)は -- CSS 幅を返します(スクロールバーを無視)。このようなクロスブラザの差異が、`getComputedStyle` の利用ではなく、むしろジオメトリプロパティに頼るべき理由です。


```online
もしあなたのブラウザがスクロールバーのスペースを確保するなら(Windows用のほとんどのブラウザがそうです)、下のサンプルでそれをテストできます。

[iframe src="cssWidthScroll" link border=1]

テキストを持つ要素は CSS `width:300x` です。

デスクトップ Windows OS 上の Firefox, Chrome, Edge はすべてスクロールバーのためのスペースを確保します。しかし、ChromeとEdgeがより小さい値を表示する一方、Firefox は `300px` を表示します。これは、Firefox が CSS 幅を返し、他のブラウザは "実際の" 幅を返すためです。
```

説明した違いは JavaScript から `getComputedStyle(...).width` を読むことについてのみであり、視覚的にはすべて正しいことに注意してください。

## サマリ 

要素は次のジオメトリプロパティを持っています:

- `offsetParent` -- は最も近い position 指定された祖先 もしくは `td`, `th`, `table`, `body` です。
- `offsetLeft/offsetTop` -- は `offsetParent` の左上端を基準とする座標です。
- `offsetWidth/offsetHeight` -- はボーダーを含む要素の "外部の" 幅/高さです。
- `clientLeft/clientTop` -- は左上の外側の角から左上の内側の角までの距離です。 左から右の OS では、常に左/上のボーダー幅です。 右から左へのOSの場合、縦スクロールバーは左にあります。したがって、 `clientLeft` もその幅を含みます。
- `clientWidth/clientHeight` -- はパディングを含むコンテンツの幅/高さですが、スクロールバーは含みません。
- `scrollWidth/scrollHeight` -- スクロールアウト部分を含むコンテンツの幅/高さです。パディングも含みますが、スクロールバーは含みません。
- `scrollLeft/scrollTop` -- 要素のスクロールアウトされた部分の幅/高さで、左上の角から距離です。

`scrollLeft/scrollTop` 以外のすべてのプロパティは読み取り専用です。`scrollLeft/scrollTop` を変更するとブラウザは要素をスクロールします。
