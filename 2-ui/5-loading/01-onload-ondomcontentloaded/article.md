<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
# ページのライフサイクル: DOMContentLoaded, load, beforeunload, unload
=======
# Page: DOMContentLoaded, load, beforeunload, unload
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

HTML ページのライフサイクルは、3つの重要なイベントを持っています:

- `DOMContentLoaded` -- ブラウザが HTML を完全に読み込み、DOM ツリーは構築されましたが、写真 `<img>` のような外部リソースやスタイルシートはまだ読み込まれていない可能性があります。
- `load` -- ブラウザがすべてのリソース（画像, スタイルなど）を読み込みました。
- `beforeunload/unload` -- ユーザがページを離れようとしているとき。

それぞれのイベントが役に立つ場合があります:

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
- `DOMContentLoaded` イベント -- DOMは準備できたので、ハンドラは DOM ノードを調べ、インタフェースを初期化することができます。
- `load` イベント -- 追加のリソースがロードされ、画像のサイズなどが取得できます(HTML/CSSで指定されていない場合)。
- `beforeunload/unload` イベント -- ユーザが離れようとしており、ユーザが行ったページ上での変更を保存するかを確認したり、本当に離れたいかを尋ねることができます。
=======
- `DOMContentLoaded` event -- DOM is ready, so the handler can lookup DOM nodes, initialize the interface.
- `load` event -- additional resources are loaded, we can get image sizes (if not specified in HTML/CSS) etc.
- `beforeunload` event -- the user is leaving: we can check if the user saved the changes and ask them whether they really want to leave.
- `unload` -- the user almost left, but we still can initiate some operations, such as sending out statistics.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

これらのイベントの詳細について見ていきましょう。

## DOMContentLoaded

`DOMContentLoaded` イベントは `document` オブジェクトで発生します。

キャッチするためには `addEventListener` を使わなければなりません:

```js
document.addEventListener("DOMContentLoaded", ready);
// not "document.onDOMContentLoaded = ..."
```

例:

```html run height=200 refresh
<script>
  function ready() {
    alert('DOM is ready');

    // イメージはまだロードされていません(キャッシュされてない限り), なのでサイズは 0x0 です
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  }

*!*
  document.addEventListener("DOMContentLoaded", ready);
*/!*
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
例では、`DOMContentLoaded` ハンドラはドキュメントがロードされたときに実行され、ページ読み込みは待ちません。したがって、`alert` で表示されるサイズはゼロです。

一見すると、`DOMContentLoaded` イベントはとてもシンプルです。DOM ツリーが準備できた -- ここのイベントです。しかし、特徴はほとんどありません。
=======
In the example the `DOMContentLoaded` handler runs when the document is loaded, so it can see all the elements, including `<img>` below.

But it doesn't wait for the image to load. So `alert` shows zero sizes.

At the first sight `DOMContentLoaded` event is very simple. The DOM tree is ready -- here's the event. There are few peculiarities though.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

### DOMContentLoaded と scripts

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
ブラウザが最初にHTMLをロードし、テキスト中の `<script>...</script>` に出くわすと、DOM の構築を続けることができません。すぐにスクリプトを実行する必要があります。そのため、このようなスクリプトがすべて実行された後にのみ `DOMContentLoaded` は発生する可能性があります。

外部スクリプト (`src` を持つもの) も、スクリプトがロードされ実行されている間はDOM の構築は一時停止します。したがって、`DOMContentLoaded` は外部スクリプトも待ちます。

唯一の例外は、`async` や `defer` 属性をもつ外部スクリプトです。これらは、ブラウザにそのスクリプトは待たずに処理を続けるよう言います。なので、ユーザはスクリプトのロードが終わる前にページを見ることができ、パフォーマンスに良いです。

```smart header="`async` と `defer` に関する言葉"
属性 `async` と `defer` は外部スクリプトに対してのみ動作します。`src` がない場合には無視されます。

どちらも、ブラウザにページでの処理をつづけるよう言い、"バックグラウンド" でスクリプトをロードします。その後、ロードできたらスクリプトを実行します。したがって、スクリプトは DOM の構築とページレンダリングをブロックしません。

そららの間に2つの違いがあります。

|         | `async` | `defer` |
|---------|---------|---------|
| 順番 | `async` を持つスクリプトは *読み込んだもの順* で実行します。ドキュメント順は関係ありません -- 最初にロードされたものが最初に実行されます。 | `defer` を持つスクリプトは常に *ドキュメント順* で実行されます。 |
| `DOMContentLoaded` | `async` を持つスクリプトは、ドキュメントがまだ完全にダウンロードされていなくても実行されることがあります。これはスクリプトが小さい or キャッシュされており、ドキュメントが十分長い場合に発生します。 | `defer` を持つスクリプトは、ドキュメントがロードされ、パースされた後（必要に応じて待機する）に実行されます。`DOMContentLoaded` の直前です。|

そのため、`async` は完全に独立したスクリプトに対して使われます。
=======
When the browser processes an HTML-document and comes across a `<script>` tag, it needs to execute before continuing building the DOM. That's a precaution, as scripts may want to modify DOM, and even `document.write` into it, so `DOMContentLoaded` has to wait.

So DOMContentLoaded definitely happens after such scripts:

```html run
<script>
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM ready!");
  });
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"></script>

<script>
  alert("Library loaded, inline script executed");
</script>
```

In the example above, we first see "Library loaded...", and then "DOM ready!" (all scripts are executed).

```warn header="Scripts with `async`, `defer` or `type=\"module\"` don't block DOMContentLoaded"

Script attributes `async` and `defer`, that we'll cover [a bit later](info:script-async-defer), don't block DOMContentLoaded. [Javascript modules](info:modules) behave like `defer`,  they don't block it too.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

So here we're talking about "regular" scripts, like `<script>...</script>`, or `<script src="..."></script>`.
```

### DOMContentLoaded と styles

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
外部のスタイルシートは DOM には影響しないので、`DOMContentLoaded` はそれらを待ちません。

しかし、落とし穴があります: スタイルの後にスクリプトがある場合、そのスクリプトはスタイルシートが実行されるのを待たなければなりません。:
=======
External style sheets don't affect DOM, so `DOMContentLoaded` does not wait for them.

But there's a pitfall. If we have a script after the style, then that script must wait until the stylesheet loads:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

```html
<link type="text/css" rel="stylesheet" href="style.css">
<script>
  // スクリプトはスタイルシートが読み込まれるまで実行されません
  alert(getComputedStyle(document.body).marginTop);
</script>
```

この理由は、上の例のように、スクリプトが座標や他のスタイルに依存した要素のプロパティを取得したい場合があるためです。当然、それはスタイルがロードされるのを待たなければいけません。

`DOMContentLoaded` がスクリプトを待つので、その前のスタイルも同様に待つことになります。

### 組み込みのブラウザの自動入力 

Firefox, Chrome や Opera の自動入力は `DOMContentLoaded` で起こります。

例えば、ページがログインとパスワードのフォームを持っていて、ブラウザがその値を覚えていた場合、 `DOMContentLoaded` でそれらを自動入力しようとする場合があります(ユーザが許可している場合)。

なので、読み込みに時間のかかるスクリプトによって `DOMContentLoaded` が延びると、自動入力もまた待ちます。恐らくあなたもサイトによっては見たことがあるでしょう(ブラウザの自動入力を利用している場合) -- ログイン/パスワードフィールドの自動入力がすぐにはされず、ページが完全にロードされるまで遅延があります。実際、それは `DOMContentLoaded` イベントまでの遅延です。

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
外部スクリプトに対して `async` や `defer` を使う小さなメリットの１つは -- `DOMContentLoaded` をブロックせず、ブラウザの自動入力に遅延がないことです。
=======
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

## window.onload 

`window` オブジェクトの `load` イベントはスタイルや画像、その他リソースを含めページ全体が読み込まれたときにトリガされます。

下の例では、`window.onload` がすべての画像を待つため、画像サイズを正しく表示します。:

```html run height=200 refresh
<script>
  window.onload = function() {
    alert('Page loaded');

    // この時、画像はロードされています
    alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
  };
</script>

<img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
```

## window.onunload

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
訪問者がページを離れるとき、`unload` イベントが `window` でトリガされます。そこでは、関連するポップアップウィンドウを閉じるなど、遅延なく何かをすることができます。しかし、別のページへの遷移をキャンセルすることはできません。

そのためには、別のイベント `onbeforeunload` を使う必要があります。

## window.onbeforeunload 

訪問者がページを離れ始めたり、ウィンドウを閉じようとした場合、`beforeunload` ハンドラで追加の確認を尋ねることができます。

質問の文字列を返す必要があります。ブラウザはそれを表示します。

例えば:
=======
When a visitor leaves the page, the `unload` event triggers on `window`. We can do something there that doesn't involve a delay, like closing related popup windows.

The notable exception is sending analytics.

Let's say we gather data about how the page is used: mouse clicks, scrolls, viewed page areas, and so on.

Naturally, `unload` event is when the user leaves us, and we'd like to save the data on our server.

There exists a special `navigator.sendBeacon(url, data)` method for such needs, described in the specification <https://w3c.github.io/beacon/>.

It sends the data in background. The transition to another page is not delayed: the browser leaves the page, but still performs `sendBeacon`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

Here's how to use it:
```js
let analyticsData = { /* object with gathered data */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
};
```

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
```online
下の `<iframe>` でハンドラを設定するためにボタンをクリックしてください。その後、そのハンドラの実行を見るためにリンクをクリックしてみてください。:
=======
- The request is sent as POST.
- We can send not only a string, but also forms and other formats, as described in the chapter <info:fetch-basics>, but usually it's a stringified object.
- The data is limited by 64kb.

When the `sendBeacon` request is finished, the browser probably has already left the document, so there's no way to get server response (which is usually empty for analytics).

There's also a `keepalive` flag for doing such "after-page-left" requests in  [fetch](info:fetch-basics) method for generic network requests. You can find more information in the chapter <info:fetch-api>.


If we want to cancel the transition to another page, we can't do it here. But we can use  another event -- `onbeforeunload`.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

## window.onbeforeunload [#window.onbeforeunload]

If a visitor initiated navigation away from the page or tries to close the window, the `beforeunload` handler asks for additional confirmation.

If we cancel the event, the browser may ask the visitor if they are sure.

You can try it by running this code and then reloading the page:

```js run
window.onbeforeunload = function() {
  return false;
};
```

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
```warn header="テキストを無視し、代わりに独自のメッセージを表示するブラウザもあります"
Chrome や Firefox のような一部のブラウザは文字列を無視し、代わりに独自のメッセージを表示します。これは安全のためであり、潜在的な誤解を招くメッセージやハックしたメッセージからユーザを保護するためにそのようになっています。
=======
For historical reasons, returning a non-empty string also counts as canceling the event. Some time ago browsers used show it as a message, but as the [modern specification](https://html.spec.whatwg.org/#unloading-documents) says, they shouldn't.

Here's an example:

```js run
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md
```

The behavior was changed, because some webmasters abused this event handler by showing misleading and annoying messages. So right now old browsers still may show it as a message, but aside of that -- there's no way to customize the message shown to the user.

## readyState

ドキュメントがロードされた後に `DOMContentLoaded` ハンドラを設定すると何が起こるでしょうか？

当然、実行されません。

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
ドキュメントが準備できたかどうかが定かでない場合があります。例えば `async` 属性を持つ外部スクリプトを読み込み、それが非同期に実行するような場合です。ネットワークに依存して、ドキュメントが完成する前に実行されるかもしれないし、その後かもしれず、定かではありません。従って、我々はドキュメントの現在の状態を知ることができるべきです。

`document.readyState` プロパティは我々にその情報を提供します。3つの値を取り得ます。:
=======
There are cases when we are not sure whether the document is ready or not. We'd like our function to execute when the DOM is loaded, be it now or later.

The `document.readyState` property tells us about the current loading state.

There are 3 possible values:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

- `"loading"` -- ドキュメントがロード中です。
- `"interactive"` -- ドキュメントは完全に読み込まれました。
- `"complete"` -- ドキュメントは完全に読み込まれ、すべてのリソース(画像のような)も読み込まれました。

なので、 `document.readyState` をチェックし、ハンドラを設定、もしくはすでに準備出来ている場合はすぐにコードを実行することができます。

このように:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  // loading yet, wait for the event
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM is ready!
  work();
}
```

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
状態が変わったときにトリガされる `readystatechange` イベントがあります。なので、次のようにしてこれらの状態を出力することができます。:
=======
There's also `readystatechange` event that triggers when the state changes, so we can print all these states like this:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

```js run
// 現在の状態
console.log(document.readyState);

// 状態の変化を出力
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
`readystatechange` イベントはドキュメントの読み込み状態を追跡する代替のメカニズムで、それは昔に登場しました。最近ではほとんど使われていませんが、完全性のために説明しておきます。

他のイベントの中で `readystatechange` の場所はどこでしょう？

タイミングを見るために、ここではイベントを記録する `<iframe>`, `<img>` とハンドラを持つドキュメントがあります。:
=======
The `readystatechange` event is an alternative mechanics of tracking the document loading state, it appeared long ago. Nowadays, it is rarely used.

Let's see the full events flow for the completeness.

Here's a document with `<iframe>`, `<img>` and handlers that log events:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

```html
<script>
  log('initial readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="http://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

動作例は [サンドボックスの中](sandbox:readystate) です。

典型的な出力:
1. [1] initial readyState:loading
2. [2] readyState:interactive
3. [2] DOMContentLoaded
4. [3] iframe onload
5. [4] img onload
6. [4] readyState:complete
7. [4] window onload

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
角括弧内の数値はそれが発生したおおよその時間を示します。実際の時間はもう少し大きいですが、同じ数字でラベル付けされたイベントは、ほぼ同時に発生します(+- 数ミリ秒)。

- `document.readyState` は `DOMContentLoaded` の直前に `interactive` になります。これら２つのイベントは実際には同じことを意味します。
- `document.readyState` は、すべてのリソース(`iframe` や `img`)がロードされたときに `complete` になります。ここでは、`img.onload` (`img` は最後のリソース) と `window.onload` がほぼ同じ時間に発生していることが分かります。`complete` 状態にスイッチすることは、`window.onload` と同じことを意味します。違いは、`window.onload` は常に他のすべての `load` ハンドラの後で動作するということです。
=======
The numbers in square brackets denote the approximate time of when it happens. Events labeled with the same digit happen approximately at the same time (+- a few ms).

- `document.readyState` becomes `interactive` right before `DOMContentLoaded`. These two things actually mean the same.
- `document.readyState` becomes `complete` when all resources (`iframe` and `img`) are loaded. Here we can see that it happens in about the same time as `img.onload` (`img` is the last resource) and `window.onload`. Switching to `complete` state means the same as `window.onload`. The difference is that `window.onload` always works after all other `load` handlers.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md

## サマリ 

ページのライフサイクルイベント:

<<<<<<< HEAD:2-ui/3-event-details/10-onload-ondomcontentloaded/article.md
- `DOMContentLoaded` イベントは DOM が準備できたときに `document` 上でトリガされます。この段階では要素に対して JavaScript を適用することができます。
  - `async` または `defer` もつ外部のものを除いたすべてのスクリプトが実行されます。
  - 画像や他のリソースはまだ読み込み中かもしれません。
- `window` での `load` イベントはページとすべてのリソースがロードされたときにトリガされます。通常はこんなに長く待つ必要はないため、めったに使われません。
- `window` での `beforeunload` イベントは、ユーザがページから離れたいときにトリガされます。もし文字列を返すと、ブラウザはユーザが本当に離れたいかどうかの質問を表示します。
- `window` での `unload` イベントはユーザが最終的に離れるときにトリガされます。ハンドラの中では遅延やユーザへの質問を含まないシンプルなことのみが可能です。その制限があるので、ほとんど使われません。
- `document.readyState` はドキュメントの現在の状態で、変更は `readystatechange` イベントで追跡することが可能です。:
  - `loading` -- ドキュメントは読み込み中です。
  - `interactive` -- ドキュメントはパースされ、`DOMContentLoaded` とほぼ同じ時間に発生しますが、その前に発生します。
  - `complete` -- ドキュメントとリソースが読み込まれました。`window.onload` とほぼ同じ時間に発生しますが、その前に起きます。
=======
Page load events:

- `DOMContentLoaded` event triggers on `document` when DOM is ready. We can apply JavaScript to elements at this stage.
  - Script such as `<script>...</script>` or `<script src="..."></script>` block DOMContentLoaded, the browser waits for them to execute.
  - Images and other resources may also still continue loading.
- `load` event on `window` triggers when the page and all resources are loaded. We rarely use it, because there's usually no need to wait for so long.
- `beforeunload` event on `window` triggers when the user wants to leave the page. If we cancel the event, browser asks whether the user really wants to leave (e.g we have unsaved changes).
- `unload` event on `window` triggers when the user is finally leaving, in the handler we can only do simple things that do not involve delays or asking a user. Because of that limitation, it's rarely used. We can send out a network request with `navigator.sendBeacon`.
- `document.readyState` is the current state of the document, changes can be tracked in the `readystatechange` event:
  - `loading` -- the document is loading.
  - `interactive` -- the document is parsed, happens at about the same time as `DOMContentLoaded`, but before it.
  - `complete` -- the document and resources are loaded, happens at about the same time as `window.onload`, but before it.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:2-ui/5-loading/01-onload-ondomcontentloaded/article.md
