# ページのライフサイクル: DOMContentLoaded, load, beforeunload, unload

HTML ページのライフサイクルは、3つの重要なイベントを持っています:

- `DOMContentLoaded` -- ブラウザが HTML を完全に読み込み、DOM ツリーは構築されましたが、写真 `<img>` のような外部リソースやスタイルシートはまだ読み込まれていない可能性があります。
- `load` -- ブラウザがすべてのリソース（画像, スタイルなど）を読み込みました。
- `beforeunload/unload` -- ユーザがページを離れようとしているとき。

それぞれのイベントが役に立つ場合があります:

- `DOMContentLoaded` イベント -- DOMは準備できたので、ハンドラは DOM ノードを調べ、インタフェースを初期化することができます。
- `load` イベント -- 追加のリソースがロードされ、画像のサイズなどが取得できます(HTML/CSSで指定されていない場合)。
- `beforeunload/unload` イベント -- ユーザが離れようとしており、ユーザが行ったページ上での変更を保存するかを確認したり、本当に離れたいかを尋ねることができます。

これらのイベントの詳細について見ていきましょう。

[cut]

## DOMContentLoaded

`DOMContentLoaded` イベントは `document` オブジェクトで発生します。

キャッチするためには `addEventListener` を使わなければなりません:

```js
document.addEventListener("DOMContentLoaded", ready);
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

例では、`DOMContentLoaded` ハンドラはドキュメントがロードされたときに実行され、ページ読み込みは待ちません。したがって、`alert` で表示されるサイズはゼロです。

一見すると、`DOMContentLoaded` イベントはとてもシンプルです。DOM ツリーが準備できた -- ここのイベントです。しかし、特徴はほとんどありません。

### DOMContentLoaded と scripts

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

```

### DOMContentLoaded と styles

外部のスタイルシートは DOM には影響しないので、`DOMContentLoaded` はそれらを待ちません。

しかし、落とし穴があります: スタイルの後にスクリプトがある場合、そのスクリプトはスタイルシートが実行されるのを待たなければなりません。:

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

外部スクリプトに対して `async` や `defer` を使う小さなメリットの１つは -- `DOMContentLoaded` をブロックせず、ブラウザの自動入力に遅延がないことです。

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

訪問者がページを離れるとき、`unload` イベントが `window` でトリガされます。そこでは、関連するポップアップウィンドウを閉じるなど、遅延なく何かをすることができます。しかし、別のページへの遷移をキャンセルすることはできません。

そのためには、別のイベント `onbeforeunload` を使う必要があります。

## window.onbeforeunload 

訪問者がページを離れ始めたり、ウィンドウを閉じようとした場合、`beforeunload` ハンドラで追加の確認を尋ねることができます。

質問の文字列を返す必要があります。ブラウザはそれを表示します。

例えば:

```js
window.onbeforeunload = function() {
  return "There are unsaved changes. Leave now?";
};
```

```online
下の `<iframe>` でハンドラを設定するためにボタンをクリックしてください。その後、そのハンドラの実行を見るためにリンクをクリックしてみてください。:

[iframe src="window-onbeforeunload" border="1" height="80" link edit]
```

```warn header="テキストを無視し、代わりに独自のメッセージを表示するブラウザもあります"
Chrome や Firefox のような一部のブラウザは文字列を無視し、代わりに独自のメッセージを表示します。これは安全のためであり、潜在的な誤解を招くメッセージやハックしたメッセージからユーザを保護するためにそのようになっています。
```

## readyState

ドキュメントがロードされた後に `DOMContentLoaded` ハンドラを設定すると何が起こるでしょうか？

当然、実行されません。

ドキュメントが準備できたかどうかが定かでない場合があります。例えば `async` 属性を持つ外部スクリプトを読み込み、それが非同期に実行するような場合です。ネットワークに依存して、ドキュメントが完成する前に実行されるかもしれないし、その後かもしれず、定かではありません。従って、我々はドキュメントの現在の状態を知ることができるべきです。

`document.readyState` プロパティは我々にその情報を提供します。3つの値を取り得ます。:

- `"loading"` -- ドキュメントがロード中です。
- `"interactive"` -- ドキュメントは完全に読み込まれました。
- `"complete"` -- ドキュメントは完全に読み込まれ、すべてのリソース(画像のような)も読み込まれました。

なので、 `document.readyState` をチェックし、ハンドラを設定、もしくはすでに準備出来ている場合はすぐにコードを実行することができます。

このように:

```js
function work() { /*...*/ }

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work();
}
```

状態が変わったときにトリガされる `readystatechange` イベントがあります。なので、次のようにしてこれらの状態を出力することができます。:

```js run
// 現在の状態
console.log(document.readyState);

// 状態の変化を出力
document.addEventListener('readystatechange', () => console.log(document.readyState));
```

`readystatechange` イベントはドキュメントの読み込み状態を追跡する代替のメカニズムで、それは昔に登場しました。最近ではほとんど使われていませんが、完全性のために説明しておきます。

他のイベントの中で `readystatechange` の場所はどこでしょう？

タイミングを見るために、ここではイベントを記録する `<iframe>`, `<img>` とハンドラを持つドキュメントがあります。:

```html
<script>
  function log(text) { /* output the time and message */ }
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
5. [4] readyState:complete
6. [4] img onload
7. [4] window onload

角括弧内の数値はそれが発生したおおよその時間を示します。実際の時間はもう少し大きいですが、同じ数字でラベル付けされたイベントは、ほぼ同時に発生します(+- 数ミリ秒)。

- `document.readyState` は `DOMContentLoaded` の直前に `interactive` になります。これら２つのイベントは実際には同じことを意味します。
- `document.readyState` は、すべてのリソース(`iframe` や `img`)がロードされたときに `complete` になります。ここでは、`img.onload` (`img` は最後のリソース) と `window.onload` がほぼ同じ時間に発生していることが分かります。`complete` 状態にスイッチすることは、`window.onload` と同じことを意味します。違いは、`window.onload` は常に他のすべての `load` ハンドラの後で動作するということです。

## サマリ 

ページのライフサイクルイベント:

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
