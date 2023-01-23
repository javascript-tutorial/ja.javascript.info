# Blob

<<<<<<< HEAD
`ArrayBuffer` とビューは ECMA 規格、JavaScript の一部です。

ブラウザには、さらに [File API](https://www.w3.org/TR/FileAPI/) に記載されている高水準のオブジェクトがあります。特に `Blob` です。

`Blob` はオプションの文字列 `type` (通常は MIMEタイプ) と `blobParts` -- 一連の他の `Blob` オブジェクト、文字列や `BufferSources` から構成されます。

![](blob.svg)

コンストラクタの構文は次の通りです:
=======
`ArrayBuffer` and views are a part of ECMA standard, a part of JavaScript.

In the browser, there are additional higher-level objects, described in [File API](https://www.w3.org/TR/FileAPI/), in particular `Blob`.

`Blob` consists of an optional string `type` (a MIME-type usually), plus `blobParts` -- a sequence of other `Blob` objects, strings and `BufferSource`.

![](blob.svg)

The constructor syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
new Blob(blobParts, options);
```

<<<<<<< HEAD
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
=======
- **`blobParts`** is an array of `Blob`/`BufferSource`/`String` values.
- **`options`** optional object:
  - **`type`** -- `Blob` type, usually MIME-type, e.g. `image/png`,
  - **`endings`** -- whether to transform end-of-line to make the `Blob` correspond to current OS newlines (`\r\n` or `\n`). By default `"transparent"` (do nothing), but also can be `"native"` (transform).

For example:

```js
// create Blob from a string
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// please note: the first argument must be an array [...]
```

```js
// create Blob from a typed array and strings
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in binary form
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


<<<<<<< HEAD
blob の一部を抽出することもできます:
=======
We can extract `Blob` slices with:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

<<<<<<< HEAD
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
<!-- download 属性は、ブラウザは移動する代わりにダウンロードを行います -->
=======
- **`byteStart`** -- the starting byte, by default 0.
- **`byteEnd`** -- the last byte (exclusive, by default till the end).
- **`contentType`** -- the `type` of the new blob, by default the same as the source.

The arguments are similar to `array.slice`, negative numbers are allowed too.

```smart header="`Blob` objects are immutable"
We can't change data directly in a `Blob`, but we can slice parts of a `Blob`, create new `Blob` objects from them, mix them into a new `Blob` and so on.

This behavior is similar to JavaScript strings: we can't change a character in a string, but we can make a new corrected string.
```

## Blob as URL

A Blob can be easily used as a URL for `<a>`, `<img>` or other tags, to show its contents.

Thanks to `type`, we can also download/upload `Blob` objects, and the `type` naturally becomes `Content-Type` in network requests.

Let's start with a simple example. By clicking on a link you download a dynamically-generated `Blob` with `hello world` contents as a file:

```html run
<!-- download attribute forces the browser to download instead of navigating -->
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
<a download="hello.txt" href='#' id="link">Download</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

<<<<<<< HEAD
また、JavaScript で動的にリンクを作成し、`link.click()` によりクリックをシミュレートすることもできます。すると、ダウンロードは自動的に始まります。

これは HTML なしで、動的に生成された Blob を利用者にダウンロードさせる類似のコードです:
=======
We can also create a link dynamically in JavaScript and simulate a click by `link.click()`, then download starts automatically.

Here's the similar code that causes user to download the dynamically created `Blob`, without any HTML:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

<<<<<<< HEAD
`URL.createObjectURL` は blob を取り、`blob:<origin>/<uuid>` という形式の一意なURLを生成します。

これは、`link.href` の値がどのように見えるかの例です:
=======
`URL.createObjectURL` takes a `Blob` and creates a unique URL for it, in the form `blob:<origin>/<uuid>`.

That's what the value of `link.href` looks like:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

<<<<<<< HEAD
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
=======
For each URL generated by `URL.createObjectURL` the browser stores a URL -> `Blob` mapping internally. So such URLs are short, but allow to access the `Blob`.

A generated URL (and hence the link with it) is only valid within the current document, while it's open. And it allows to reference the `Blob` in `<img>`, `<a>`, basically any other object that expects a URL.

There's a side effect though. While there's a mapping for a `Blob`, the `Blob` itself resides in the memory. The browser can't free it.

The mapping is automatically cleared on document unload, so `Blob` objects are freed then. But if an app is long-living, then that doesn't happen soon.

**So if we create a URL, that `Blob` will hang in memory, even if not needed any more.**

`URL.revokeObjectURL(url)` removes the reference from the internal mapping, thus allowing the `Blob` to be deleted (if there are no other references), and the memory to be freed.

In the last example, we intend the `Blob` to be used only once, for instant downloading, so we call `URL.revokeObjectURL(link.href)` immediately.

In the previous example with the clickable HTML-link, we don't call `URL.revokeObjectURL(link.href)`, because that would make the `Blob` url invalid. After the revocation, as the mapping is removed, the URL doesn't work any more.

## Blob to base64

An alternative to `URL.createObjectURL` is to convert a `Blob` into a base64-encoded string.

That encoding represents binary data as a string of ultra-safe "readable" characters with ASCII-codes from 0 to 64. And what's more important -- we can use this encoding in "data-urls".

A [data url](mdn:/http/Data_URIs) has the form `data:[<mediatype>][;base64],<data>`. We can use such urls everywhere, on par with "regular" urls.

For instance, here's a smiley:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

<<<<<<< HEAD
ブラウザは文字列をデコードし、イメージを表示します: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">

blob を base64 に変換するためには、組み込みの `FileReader` オブジェクトを使用します。それは複数のフォーマットで blob からデータを読むことができます。[次のチャプター](info:file)では、より詳しく説明します。

これは、blob をダウンロードするで、base64 経由です:
=======
The browser will decode the string and show the image: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


To transform a `Blob` into base64, we'll use the built-in `FileReader` object. It can read data from Blobs in multiple formats. In the [next chapter](info:file) we'll cover it more in-depth.

Here's the demo of downloading a blob, now via base-64:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
<<<<<<< HEAD
reader.readAsDataURL(blob); // blob を base64 へ変換し onload を呼び出します
=======
reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*

reader.onload = function() {
  link.href = reader.result; // data url
  link.click();
};
```

<<<<<<< HEAD
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
=======
Both ways of making a URL of a `Blob` are usable. But usually `URL.createObjectURL(blob)` is simpler and faster.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob to data url"
+ We need to revoke them if care about memory.
+ Direct access to blob, no "encoding/decoding"
- No need to revoke anything.
- Performance and memory losses on big `Blob` objects for encoding.
```

## Image to blob

We can create a `Blob` of an image, an image part, or even make a page screenshot. That's handy to upload it somewhere.

Image operations are done via `<canvas>` element:

1. Draw an image (or its part) on canvas using [canvas.drawImage](mdn:/api/CanvasRenderingContext2D/drawImage).
2. Call canvas method [.toBlob(callback, format, quality)](mdn:/api/HTMLCanvasElement/toBlob) that creates a `Blob` and runs `callback` with it when done.

In the example below, an image is just copied, but we could cut from it, or transform it on canvas prior to making a blob:

```js run
// take any image
let img = document.querySelector('img');

// make <canvas> of the same size
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

<<<<<<< HEAD
// 画像をコピーします (このメソッドで画像をカットすることができます)
context.drawImage(img, 0, 0);
// canvas 上では、context.rotate(), やその他様々なことができます

// toBlob は非同期操作で、callback は完了時に呼ばれます
canvas.toBlob(function(blob) {
  // blob の準備ができたのでダウンロードします
=======
// copy image to it (this method allows to cut image)
context.drawImage(img, 0, 0);
// we can context.rotate(), and do many other things on canvas

// toBlob is async operation, callback is called when done
canvas.toBlob(function(blob) {
  // blob ready, download it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

<<<<<<< HEAD
  // ブラウザがメモリをクリアできるよう、内部の blob への参照を削除します。
=======
  // delete the internal blob reference, to let the browser clear memory from it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

<<<<<<< HEAD
コールバックより `async/await` を好む場合は次のようになります:
=======
If we prefer `async/await` instead of callbacks:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

<<<<<<< HEAD
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
=======
For screenshotting a page, we can use a library such as <https://github.com/niklasvh/html2canvas>. What it does is just walks the page and draws it on `<canvas>`. Then we can get a `Blob` of it the same way as above.

## From Blob to ArrayBuffer

The `Blob` constructor allows to create a blob from almost anything, including any `BufferSource`.

But if we need to perform low-level processing, we can get the lowest-level `ArrayBuffer` from `blob.arrayBuffer()`:

```js
// get arrayBuffer from blob
const bufferPromise = await blob.arrayBuffer();

// or
blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
```

## From Blob to stream

When we read and write to a blob of more than `2 GB`, the use of `arrayBuffer` becomes more memory intensive for us. At this point, we can directly convert the blob to a stream.

A stream is a special object that allows to read from it (or write into it) portion by portion. It's outside of our scope here, but here's an example, and you can read more at <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API>. Streams are convenient for data that is suitable for processing piece-by-piece.

The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the `Blob`.

Then we can read from it, like this:

```js
// get readableStream from blob
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // for each iteration: value is the next blob fragment
  let { done, value } = await stream.read();
  if (done) {
    // no more data in the stream
    console.log('all blob processed.');
    break;
  }

   // do something with the data portion we've just read from the blob
  console.log(value);
}
```

## Summary

While `ArrayBuffer`, `Uint8Array` and other `BufferSource` are "binary data", a [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) represents "binary data with type".

That makes Blobs convenient for upload/download operations, that are so common in the browser.

Methods that perform web-requests, such as [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) and so on, can work with `Blob` natively, as well as with other binary types.

We can easily convert between `Blob` and low-level binary data types:

- We can make a `Blob` from a typed array using `new Blob(...)` constructor.
- We can get back `ArrayBuffer` from a Blob using `blob.arrayBuffer()`, and then create a view over it for low-level binary processing.

Conversion streams are very useful when we need to handle large blob. You can easily create a `ReadableStream` from a blob. The `Blob` interface's `stream()` method returns a `ReadableStream` which upon reading returns the data contained within the blob.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
