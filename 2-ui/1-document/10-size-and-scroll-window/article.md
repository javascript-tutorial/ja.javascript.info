# ウィンドウサイズとスクローリング

<<<<<<< HEAD
ブラウザウィンドウの幅を知るためには？スクロールアウトされた部分を含め、ドキュメントの高さを取得するには？JavaScript を使用してページをスクロールするにはどうすればよいでしょうか？

DOM の観点からは、ルートドキュメント要素は `document.documentElement` です。その要素は `<html>` に対応し、[前のチャプター](info:size-and-scroll) で説明したジオメトリプロパティを持っています。場合によってはそれを使うことができますが、考慮すべき重要な追加の方法や特性があります。

[cut]
=======
How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## ウィンドウの幅/高さ 

<<<<<<< HEAD
`document.documentElement` のプロパティ `clientWidth/clientHeight` はまさに私たちがここで欲しいものです:
=======
To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

もしスクロールバーがあり、それがあるスペースを占める場合、これら２つの行は異なる値を表示します:
```js run
alert( window.innerWidth ); // ウィンドウ幅
alert( document.documentElement.clientWidth ); // ウィンドウ幅 - スクロールバー
```

<<<<<<< HEAD
ほとんどの場合、*利用可能な* ウィンドウ幅が必要です: 何かを描画または配置するために。つまり: スクロールバーがある場合にはその内側です。したがって、`documentElement.clientHeight/Width` を使うべきです。
=======
In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

```warn header="`DOCTYPE` は重要です"
注意: HTML の中に `<!DOCTYPE HTML>` がないとき、トップレベルのジオメトリプロパティは少し異なって動作する可能性があります。奇妙なことが起こり得ます。

<<<<<<< HEAD
現代の HTML では、常に `DOCTYPE` を書くべきです。一般的にそれは JavaScript の問題ではありませんが、ここでは JavaScript へも影響します。
=======
In modern HTML we should always write `DOCTYPE`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## ドキュメントの幅/高さ 

<<<<<<< HEAD
理論上は、ルートドキュメント要素は　`documentElement.clientWidth/Height` であり、すべてのコンテンツを囲むので、フルサイズを `documentElement.scrollWidth/scrollHeight` で測定できます。

これらのプロパティは通常の要素に対しては上手く動作します。しかしページ全体の場合、これらのプロパティは意図したとおりには動作しません。Chrome/Safari/Opera では、スクロールが無い場合、`documentElement.scrollHeight` は `documentElement.clientHeight` よりも小さいかもしれません! 通常の要素の場合、それはナンセンスです。

信頼できるウィンドウサイズを取得するために、それらのプロパティの最大を取る必要があります。:
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?

To reliably obtain the full document height, we should take the maximum of these properties:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert('Current scroll from the top: ' + window.pageYOffset);
alert('Current scroll from the left: ' + window.pageXOffset);
```

これらのプロパティは読み取り専用です。

<<<<<<< HEAD
## スクローリング: scrollTo, scrollBy, scrollIntoView 

```warn
JavaScript からページをスクロールするには、その DOM を完全に構築する必要があります。

例えば、`<head>` でスクリプトからページをスクロールしようとした場合、それは動作しません。
=======
```smart header="Also available as `window` properties `scrollX` and `scrollY`"
For historical reasons, both properties exist, but they are the same:
- `window.pageXOffset` is an alias of `window.scrollX`.
- `window.pageYOffset` is an alias of `window.scrollY`.
```

## Scrolling: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

通常の要素は `scrollTop/scrollLeft` を変更することでスクロールすることが出来ます。

<<<<<<< HEAD
ページに対して同じことができます:
- Chrome/Safari/Opera を除くすべてのブラウザ: `document.documentElement.scrollTop/Left` を変更します。
- Chrome/Safari/Opera の場合: 代わりに `document.body.scrollTop/Left` を使います。

それは動作しますが、クロスブラウザの非互換の匂いがします。良いことではありません。幸運なことに、よりシンプルでユニバーサルな解決策があります: 特別なメソッド  [window.scrollBy(x,y)](mdn:api/Window/scrollBy) と [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo) です。

- メソッド `scrollBy(x,y)` は現在の位置を基準としてページをスクロールします。例えば、`scrollBy(0, 10)` はページを下に `10px` スクロールします。 
=======
We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- The method `scrollBy(x,y)` scrolls the page *relative to its current position*. For instance, `scrollBy(0,10)` scrolls the page `10px` down.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```online
    下のボタンはこのデモをします:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
<<<<<<< HEAD
- メソッド `scrollTo(pageX,pageY)` はドキュメントの左上の角を基準としてページをスクロールします。これは `scrollLeft/scrollTop` の設定に似ています。 
=======
- The method `scrollTo(pageX,pageY)` scrolls the page *to absolute coordinates*, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document's top-left corner. It's like setting `scrollLeft/scrollTop`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    一番先頭にスクロールするには、`scrollTo(0,0)` を使います。

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

これらのメソッドは同じ方法ですべてのブラウザで動作します。

## scrollIntoView

<<<<<<< HEAD
完全性のために、もう１つメソッドを説明しましょう: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
=======
For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`elem.scrollIntoView(top)` への呼び出しは `elem` が見えるようにページをスクロールします。１つの引数を持っています。:

<<<<<<< HEAD
- もし `top=true` (デフォルト) の場合、`elem` がウィンドウの上部に表示されるようページがスクロールされます。要素の上端はウィンドウの上部に揃います。
- もし `top=false` の場合、`elem` が下部に表示されるようページがスクロールされます。要素の下端はウィンドウの下部に揃います。

```online
下のボタンは自身をウィンドウの上部に表示するようページをスクロールします:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

そして、このボタンは下部に表示するようページをスクロールします。:
=======
- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## スクロールを禁止する 

<<<<<<< HEAD
私たちはドキュメントを "スクロール不可" にする必要がある場合があります。例えば、すぐに注意を必要とするようなサイズの大きなメッセージを伝える必要があるとき、訪問者にはドキュメントではなく、そのメッセージとやりとりすることを望みます。

ドキュメントをスクロール不可にするためには、`document.body.style.overflow = "hidden"` を設定すれば十分です。ページは現在のスクロールで止まります。
=======
Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```online
やってみましょう:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

<<<<<<< HEAD
１つ目のボタンはスクロールをフリーズさ、２つ目は再開します。
```

私たちは、`document.body` だけでなく他の要素に対しても、スクロールを "フリーズ" させる同じテクニックが使えます。

このメソッドの欠点は、スクロールバーが消えることです。もしスクロールバーがスペースを占めていたら、そのスペースは今や解放されているので、コンテンツはそれを埋めるために "ジャンプ" します。

それは少し変に見えますが、フリーズする前後で `clientWidth` を比較し、スペースが増えた場合(スクロールバーが消えたら)、コンテンツ幅を同じに維持するためにスクロールバーの代わりに `document.body` に `padding` を追加することで回避できます。
=======
The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

ジオメトリ:

<<<<<<< HEAD
- ドキュメントの可視部分の幅/高さ(コンテンツ領域の幅/高さ): `document.documentElement.clientWidth/Height`
- スクロールアウト部分も含むドキュメント全体の幅/高さ:
=======
- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
