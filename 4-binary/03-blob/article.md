# Blob

`ArrayBuffer` とビューは ECMA 規格、JavaScript の一部です。

ブラウザには、さらに [File API](https://www.w3.org/TR/FileAPI/) に記載されている高水準のオブジェクトがあります。特に `Blob` です。

`Blob` はオプションの文字列 `type` (通常は MIMEタイプ) と `blobParts` -- 一連の他の `Blob` オブジェクト、文字列や `BufferSources` から構成されます。

![](blob.svg)

コンストラクタの構文は次の通りです:

```js
new Blob(blobParts, options);
```

- **`blobParts`** は `Blob`/`BufferSource`/`String` の値の配列です
- **`options`** オプションのオブジェクト:
  - **`type`** -- blob タイプ, 通常は例えば `image/png` のような MIME タイプです,
  - **`endings`** -- blob が現在の OS の改行(`\r\n` or `\n`)に対応するように行末を変換するかどうかを意味します。デフォルトでは `"transparent"` (何もしません)ですが、 `"native"` (変換する)にすることもできます。

例:

```js
// 文字列から Blob を作成します
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// 注意してください: 最初の引数は配列である必要があります
```

```js
// 型付き配列と文字列から Blob を作成します
let hello = new Uint8Array([72, 101, 108, 108, 111]); // 二進での "hello"

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


blob の一部を抽出することもできます:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- 開始バイト、デフォルトは 0。 
- **`byteEnd`** -- 最後のバイト(このバイトは含みません。デフォルトは最後までです).
- **`contentType`** -- 新しい blob の `type` です。デフォルトは元と同じになります。

引数は `array.slice` に似ており、負の値も許可されます。

```smart header="Blobs は immutable(イミュータブル(不変))です"
blob のデータを直接変更することはできませんが、blob の一部を切り出したり、それらから新しい blob を作成したり、それらを新しい blob にミックスしたりすることはできます。

この振る舞いは JavaScript の文字列に似ています: 文字列内の文字を変えることはできませんが、訂正した新しい文字列を作成することはできます。
```

## URL としての Blob

Blob はその内容を表示するのに、`<a>`, `<img>` や他のタグの URL として簡単に使うことができます。

`type` のおかげで blob をダウンロード/アップロードすることも可能で、それはネットワークリクエストではもちろん `Content-Type` になります。

簡単例から始めてみましょう。リンクをクリックすると、`hello world` の内容をもつ、動的に生成された blob をファイルとしてダウンロードします。:

```html run
<!-- download 属性は、ブラウザは移動する代わりにダウンローを行います -->
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

また、JavaScript で動的にリンクを作成し、`link.click()` によりクリックをシミュレートすることもできます。すると、ダウンロードは自動的に始まります。

これは HTML なしで、動的に生成された Blob を利用者にダウンロードさせる類似のコードです:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL` は blob を取り、`blob:<origin>/<uuid>` という形式の一意なURLを生成します。

これは、`link.href` の値がどのように見えるかの例です:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

`URL.createObjectURL` により生成された各 URL に対して、ブラウザは url -> blob のマッピングを内部に格納します。そのため、url は短いですが、blob にアクセスすることができます。

生成された url (とそれへのリンク)は現在のドキュメント内で、かつ開いている間のみ有効です。それにより、`<img>`, `<a>` 、基本的に url を想定するあらゆるオブジェクトで blob を参照することができます。

しかし、副作用もあります。blob のマッピングがある間、blob 自身はメモリ内に存在し続けます。ブラウザはそれを解放することはできません。

マッピングは、ドキュメントがアンロードされると自動的にクリアされ、blob もそのとき解放されます。しかしアプリケーションの寿命が長ければ、すぐにはそれは起きません。

**したがって、URL を作成すると、それ以上必要なくなっても、blob はメモリに溜まります。**

`URL.revokeObjectURL(url)` は内部のマッピングから参照を削除します。これにより blob が削除され(他に参照がない場合)、メモリを解放することができます。

最後の例では、blob は即時ダウンロードのために、一度だけ使われることを意図しているので、すぐに `URL.revokeObjectURL(link.href)` を呼び出します。

しかし、クリック可能な HTML リンクのある前の例では、`URL.revokeObjectURL(link.href)` を呼び出しません。なぜなら、これは blob url を無効にするからです。失効後は、マッピングが削除されているので、url は機能しなくなります。

## Blob を base64 にする

`URL.createObjectURL` の代替は blob を base64 エンコードされた文字列に変換する方法です。

このエンコーディングは、0 から 64 までの ASCII コードを用いて、バイナリデータを安全で "読み出し可能な" 文字列として表現します。そしてより重要なことは、"data-url" でこのエンコーディングが使用できることです。

[data url](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) は `data:[<mediatype>][;base64],<data>` の形式です。このような url は "通常の" url と同等に、あらゆる場所で使用することができます。

例えば、これはスマイリーです:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

ブラウザは文字列をデコードし、イメージを表示します: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">

blob を base64 に変換するためには、組み込みの `FileReader` オブジェクトを使用します。それは複数のフォーマットで blob からデータを読むことができます。[次のチャプター](info:file)では、より詳しく説明します。

これは、blob をダウンロードするで、base64 経由です:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // blob を base64 へ変換し onload を呼び出します
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

blob の URL を作成する方法は両方とも使用可能です。しかし、通常は `URL.createObjectURL(blob)` がよりシンプルで速いです。

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ メモリを気にする場合は、無効にする必要があります。
+ blob への直接アクセス、"encoding/decoding" はありません。
- 何も無効にする必要はありません。
- 巨大な blob のエンコーディングでは、パフォーマンスとメモリを失います。
```

## Image を blob にする

画像、画像の一部、あるいはページのスクリーンショットの blob を作成することもできます。どこかにアップロードするときに便利です。

画像操作は `<canvas>` 要素を通して行われます:

1. [canvas.drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) を使って、canvas 上で画像(または一部)を書きます。
2. blob を作成し、完了時に `callback` を実行する canvas メソッド [.toBlob(callback, format, quality)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) を呼び出します。

下記の例では、画像を単にコピーしていますが、blob を作成する間に canvas 上で切り取ったり変形させることができます。:

```js run
// 画像を取ります
let img = document.querySelector('img');

// 同じサイズの <canvas> を作ります
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// 画像をコピーします (このメソッドで画像をカットすることができます)
context.drawImage(img, 0, 0);
// canvas 上では、context.rotate(), やその他様々なことができます

// toBlob は非同期操作で、callback は完了時に呼ばれます
canvas.toBlob(function(blob) {
  // blob の準備ができたのでダウンロードします
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // ブラウザがメモリをクリアできるよう、内部の blob への参照を削除します。
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

コールバックより `async/await` を好む場合は次のようになります:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

ページをスクリーンショットするには、<https://github.com/niklasvh/html2canvas> のようなライブラリが使えます。これがしていることは、単にページを見て `<canvas>` 上にそれを描いているだけです。そして、上と同じ方法でその blob を取得することができます。

## Blob から ArrayBuffer へ

`Blob` コンストラクタは、`BufferSource` を含め、ほぼ何からでも blob を作成することができます。

しかし、低レベルの処理を実行する必要がある場合、`FileReader` を使って、最も低レベルである `ArrayBuffer` を取得することもできます。:

```js
// blob から arrayBuffer を取得
let fileReader = new FileReader();

*!*
fileReader.readAsArrayBuffer(blob);
*/!*

fileReader.onload = function(event) {
  let arrayBuffer = fileReader.result;
};
```


## サマリ

`ArrayBuffer`, `Uint8Array` やその他の `BufferSource` が "バイナリデータ" である一方、[Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) は "タイプを持つバイナリデータ" を表します。

これは Blob のアップロード/ダウンロード操作を便利にし、ブラウザでは一般的です。

[XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch-basics) などの webリクエストを行うメソッドは、他のバイナリタイプと同様に、`Blob` をネイティブに使用することができます。

`Blob` と低レベルのバイナリデータ型の間の変換は容易に行うことができます。:

- `new Blob(...)` コンストラクタを使用して、型付き配列から Blob を作成することができます。
- `FileReader` を使用して、Blob から `ArrayBuffer` に戻すことができ、低レベルのバイナリ処理のためにビューを作成することもできます。
