# ウィンドウサイズとスクローリング

<<<<<<< HEAD
ブラウザウィンドウの幅を知るためには？スクロールアウトされた部分を含め、ドキュメントの高さを取得するには？JavaScript を使用してページをスクロールするにはどうすればよいでしょうか？
=======
How to find out the width and height of the browser window? How to get the full width and height of the document, including the scrolled out part? How to scroll the page using JavaScript?
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

DOM の観点からは、ルートドキュメント要素は `document.documentElement` です。その要素は `<html>` に対応し、[前のチャプター](info:size-and-scroll) で説明したジオメトリプロパティを持っています。場合によってはそれを使うことができますが、考慮すべき重要な追加の方法や特性があります。

<<<<<<< HEAD
[cut]

## ウィンドウの幅/高さ 
=======
## Width/height of the window
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

`document.documentElement` のプロパティ `clientWidth/clientHeight` はまさに私たちがここで欲しいものです:

![](document-client-width-height.svg)

```online
例えば、このボタンはあなたのウィンドウの高さを表示します。:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

<<<<<<< HEAD
````warn header="`window.innerWidth/Height` ではありません"
ブラウザはプロパティ `window.innerWidth/innerHeight` もサポートしています。
それらは私たちがほしいものに見えます。何が違うのでしょう？

もし、スペースを占めるスクロールバーがある場合、`clientWidth/clientHeight` はその中の 幅/高さ を提供します。言い換えれば、ドキュメントの可視部分の幅/高さ、コンテンツで利用可能な値を返します。

そして、`window.innerWidth/innerHeight` はスクロールバーを無視します。
=======
````warn header="Not `window.innerWidth/Height`"
Browsers also support properties `window.innerWidth/innerHeight`. They look like what we want. So why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return width/height of the visible part of the document, available for the content.

...And `window.innerWidth/innerHeight` ignore the scrollbar.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

もしスクロールバーがあり、それがあるスペースを占める場合、これら２つの行は異なる値を表示します:
```js run
alert( window.innerWidth ); // ウィンドウ幅
alert( document.documentElement.clientWidth ); // ウィンドウ幅 - スクロールバー
```

ほとんどの場合、*利用可能な* ウィンドウ幅が必要です: 何かを描画または配置するために。つまり: スクロールバーがある場合にはその内側です。したがって、`documentElement.clientHeight/Width` を使うべきです。
````

```warn header="`DOCTYPE` は重要です"
注意: HTML の中に `<!DOCTYPE HTML>` がないとき、トップレベルのジオメトリプロパティは少し異なって動作する可能性があります。奇妙なことが起こり得ます。

現代の HTML では、常に `DOCTYPE` を書くべきです。一般的にそれは JavaScript の問題ではありませんが、ここでは JavaScript へも影響します。
```

## ドキュメントの幅/高さ 

理論上は、ルートドキュメント要素は　`documentElement.clientWidth/Height` であり、すべてのコンテンツを囲むので、フルサイズを `documentElement.scrollWidth/scrollHeight` で測定できます。

<<<<<<< HEAD
これらのプロパティは通常の要素に対しては上手く動作します。しかしページ全体の場合、これらのプロパティは意図したとおりには動作しません。Chrome/Safari/Opera では、スクロールが無い場合、`documentElement.scrollHeight` は `documentElement.clientHeight` よりも小さいかもしれません! 通常の要素の場合、それはナンセンスです。

信頼できるウィンドウサイズを取得するために、それらのプロパティの最大を取る必要があります。:
=======
These properties work well for regular elements. But for the whole page these properties do not work as intended. In Chrome/Safari/Opera if there's no scroll, then `documentElement.scrollHeight` may be even less than  `documentElement.clientHeight`! Sounds like a nonsense, weird, right?

To reliably obtain the full document height, we should take the maximum of these properties:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

なぜそうなのでしょう？が、聞かない方が良いです。これらの不一致は古くからのものであり、 "スマート" なロジックではありません。

## 現在のスクロールを取得する 

<<<<<<< HEAD
通常の要素は `elem.scrollLeft/scrollTop` に現在のスクロール状態を持っています。

ページではどうでしょう？ほとんどのブラウザはドキュメントのスクロールのための `documentElement.scrollLeft/Top` を提供していますが、Chrome/Safari/Opera はバグ ([157855](https://code.google.com/p/chromium/issues/detail?id=157855), [106133](https://bugs.webkit.org/show_bug.cgi?id=106133) のような) があり、`document.documentElement` の代わりに `document.body` を使用してください。

幸いにも、特別なプロパティ `window.pageXOffset/pageYOffset` により、これらの特殊性を覚える必要は全くありません。:
=======
DOM elements have their current scroll state in `elem.scrollLeft/scrollTop`.

For document scroll `document.documentElement.scrollLeft/Top` works in most browsers, except oldler WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use  `document.body` instead of `document.documentElement` there.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties `window.pageXOffset/pageYOffset`:
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

これらのプロパティは読み取り専用です。

## スクローリング: scrollTo, scrollBy, scrollIntoView 

```warn
JavaScript からページをスクロールするには、その DOM を完全に構築する必要があります。

例えば、`<head>` でスクリプトからページをスクロールしようとした場合、それは動作しません。
```

通常の要素は `scrollTop/scrollLeft` を変更することでスクロールすることが出来ます。

<<<<<<< HEAD
ページに対して同じことができます:
- Chrome/Safari/Opera を除くすべてのブラウザ: `document.documentElement.scrollTop/Left` を変更します。
- Chrome/Safari/Opera の場合: 代わりに `document.body.scrollTop/Left` を使います。

それは動作しますが、クロスブラウザの非互換の匂いがします。良いことではありません。幸運なことに、よりシンプルでユニバーサルな解決策があります: 特別なメソッド  [window.scrollBy(x,y)](mdn:api/Window/scrollBy) と [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo) です。
=======
We can do the same for the page, but as explained above:
- For most browsers (except older Webkit-based) `document.documentElement.scrollTop/Left` is the right property.
- Otherwise, `document.body.scrollTop/Left`.

These cross-browser incompatibilities are not good. Fortunately, there's a simpler,  universal solution: special methods  [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

- メソッド `scrollBy(x,y)` は現在の位置を基準としてページをスクロールします。例えば、`scrollBy(0, 10)` はページを下に `10px` スクロールします。 

    ```online
    下のボタンはこのデモをします:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
<<<<<<< HEAD
- メソッド `scrollTo(pageX,pageY)` はドキュメントの左上の角を基準としてページをスクロールします。これは `scrollLeft/scrollTop` の設定に似ています。 
=======
- The method `scrollTo(pageX,pageY)` scrolls the page to absolute coordinates, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document's top-left corner. It's like setting `scrollLeft/scrollTop`.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

    一番先頭にスクロールするには、`scrollTo(0,0)` を使います。

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

これらのメソッドは同じ方法ですべてのブラウザで動作します。

## scrollIntoView

完全性のために、もう１つメソッドを説明しましょう: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

`elem.scrollIntoView(top)` への呼び出しは `elem` が見えるようにページをスクロールします。１つの引数を持っています。:

- もし `top=true` (デフォルト) の場合、`elem` がウィンドウの上部に表示されるようページがスクロールされます。要素の上端はウィンドウの上部に揃います。
- もし `top=false` の場合、`elem` が下部に表示されるようページがスクロールされます。要素の下端はウィンドウの下部に揃います。

```online
下のボタンは自身をウィンドウの上部に表示するようページをスクロールします:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

そして、このボタンは下部に表示するようページをスクロールします。:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## スクロールを禁止する 

私たちはドキュメントを "スクロール不可" にする必要がある場合があります。例えば、すぐに注意を必要とするようなサイズの大きなメッセージを伝える必要があるとき、訪問者にはドキュメントではなく、そのメッセージとやりとりすることを望みます。

<<<<<<< HEAD
ドキュメントをスクロール不可にするためには、`document.body.style.overflow = "hidden"` を設定すれば十分です。ページは現在のスクロールで止まります。
=======
To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will freeze on its current scroll.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

```online
やってみましょう:

<button onclick="document.body.style.overflow = 'hidden'">`document.body.style.overflow = 'hidden'`</button>

<button onclick="document.body.style.overflow = ''">`document.body.style.overflow = ''`</button>

１つ目のボタンはスクロールをフリーズさ、２つ目は再開します。
```

私たちは、`document.body` だけでなく他の要素に対しても、スクロールを "フリーズ" させる同じテクニックが使えます。

このメソッドの欠点は、スクロールバーが消えることです。もしスクロールバーがスペースを占めていたら、そのスペースは今や解放されているので、コンテンツはそれを埋めるために "ジャンプ" します。

<<<<<<< HEAD
それは少し変に見えますが、フリーズする前後で `clientWidth` を比較し、スペースが増えた場合(スクロールバーが消えたら)、コンテンツ幅を同じに維持するためにスクロールバーの代わりに `document.body` に `padding` を追加することで回避できます。
=======
That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze, and if it increased (the scrollbar disappeared) then add `padding` to `document.body` in place of the scrollbar, to keep the content width the same.
>>>>>>> 34e9cdca3642882bd36c6733433a503a40c6da74

## サマリ 

ジオメトリ:

- ドキュメントの可視部分の幅/高さ(コンテンツ領域の幅/高さ): `document.documentElement.clientWidth/Height`
- スクロールアウト部分も含むドキュメント全体の幅/高さ:

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

スクローリング:

- 現在のスクロールを読む: `window.pageYOffset/pageXOffset`.
- 現在のスクロールを変更する:

    - `window.scrollTo(pageX,pageY)` -- 絶対座標,
    - `window.scrollBy(x,y)` -- 現在の場所を基準にスクロール,
    - `elem.scrollIntoView(top)` -- `elem` が見えるようにスクロール (ウィンドウの上部/下部に揃う).
