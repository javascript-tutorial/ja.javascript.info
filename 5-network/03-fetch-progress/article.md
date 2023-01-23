
<<<<<<< HEAD
# Fetch: ダウンロードの進行状況

fetch はダウンロードの進行状況を追跡することができます。が、アップロードの進行状況の追跡はできません。

注意してください: 現在アップロードの進行状況を取得する方法はありません。それをするには、[XMLHttpRequest](info:xmlhttprequest) を使用してください。

ダウンロードの進行状況を追跡するには、`response.body` プロパティを使用します。これは "読み取り可能なストリーム" です。これはチャンクごとに本文を提供する特別なオブジェクトなので、その時点でどのくらい利用できるのかを確認することができます。

これは、レスポンスを読み込むのにそれを使ったコードの概略を説明したものです。:

```js
// response.json() などの他のメソッドの代わり
const reader = response.body.getReader();

// 本文のダウンロードは無限ループ
while(true) {
  // 最後のチャンクも場合、done は true。
  // value はチャンクバイトの Uint8Array
=======
# Fetch: Download progress

The `fetch` method allows to track *download* progress.

Please note: there's currently no way for `fetch` to track *upload* progress. For that purpose, please use [XMLHttpRequest](info:xmlhttprequest), we'll cover it later.

To track download progress, we can use `response.body` property. It's a `ReadableStream` -- a special object that provides body chunk-by-chunk, as it comes. Readable streams are described in the [Streams API](https://streams.spec.whatwg.org/#rs-class) specification.

Unlike `response.text()`, `response.json()` and other methods, `response.body` gives full control over the reading process, and we can count how much is consumed at any moment.

Here's the sketch of code that reads the response from `response.body`:

```js
// instead of response.json() and other methods
const reader = response.body.getReader();

// infinite loop while the body is downloading
while(true) {
  // done is true for the last chunk
  // value is Uint8Array of the chunk bytes
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

<<<<<<< HEAD
`await reader.read()` がレスポンスのチャンクを返す間、ループします。

チャンクは２つのプロパティを持っています。:
- **`done`** -- 読み込みが完了すると true になります。
- **`value`** -- 型付きのバイト配列: `Uint8Array`.

進行状況を記録するには、チャンクを数える必要があります。

これはレスポンスを取得し、進行状況を記録する完全なコードです。:

```js run async
// Step 1: fetch を開始し、reader を取得します
=======
The result of `await reader.read()` call is an object with two properties:
- **`done`** -- `true` when the reading is complete, otherwise `false`.
- **`value`** -- a typed array of bytes: `Uint8Array`.

```smart
Streams API also describes asynchronous iteration over `ReadableStream` with `for await..of` loop, but it's not yet widely supported (see [browser issues](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), so we use `while` loop.
```

We receive response chunks in the loop, until the loading finishes, that is: until `done` becomes `true`.

To log the progress, we just need for every received fragment `value` to add its length to the counter.

Here's the full working example that gets the response and logs the progress in console, more explanations to follow:

```js run async
// Step 1: start the fetch and obtain a reader
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

<<<<<<< HEAD
// Step 2: 合計の長さを取得します
const contentLength = +response.headers.get('Content-Length');

// Step 3: データを読み込みます
let receivedLength = 0; // その時点の長さ
let chunks = []; // 受信したバイナリチャンクの配列(本文を構成します)
=======
// Step 2: get total length
const contentLength = +response.headers.get('Content-Length');

// Step 3: read the data
let receivedLength = 0; // received that many bytes at the moment
let chunks = []; // array of received binary chunks (comprises the body)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

<<<<<<< HEAD
// Step 4: チャンクを1つの Uint8Array に連結します
=======
// Step 4: concatenate chunks into single Uint8Array
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

<<<<<<< HEAD
// Step 5: 文字列にデコードします
let result = new TextDecoder("utf-8").decode(chunksAll);

// 完了!
=======
// Step 5: decode into a string
let result = new TextDecoder("utf-8").decode(chunksAll);

// We're done!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

<<<<<<< HEAD
ステップ毎の説明です:

1. 通常通り `fetch` を実行しますが、 `response.json()`, の代わりに `response.body.getReader()` を取得します。

    注意してください。同一のレスポンスを読み込むのに、これら両方のメソッドを使用することはできません。結果を得るには、reader を使用するか、レスポンスメソッドを使用するかのいずれかです。
2. 読み込む前に、`Content-Length` ヘッダからレスポンス全体の長さを知ることができます。

    クロスドメインリクエスト(チャプター <info:fetch-crossorigin> を参照)の場合、ヘッダはない場合があります。同様に、技術的にはサーバは設定する必要はありませんが、通常はそこにあります。
3. 完了(done)するまで、 `await reader.read()` を呼び出します。

    ここでは配列にレスポンスの `chunks` を集めていますが、これは重要です。なぜなら、レスポンス消費後は、`response.json()` や別の方法を使って "再読み取り" することはできないからです(やるとエラーになります)。    
4. 最後に、`chunks` -- `Uint8Array` バイトチャンクの配列を１つの結果に結合する必要があります。残念ながら、それらを連結する単一のメソッドはないので、いくらかコードを書く必要があります。:
    1. `new Uint8Array(receivedLength)` -- 連結された長さをもつ、同じ型の配列を作成します。
    2. 次に `.set(chunk, position)` メソッドで結果となる配列に各 `chunk` を続々とコピーします。
5. `chunksAll` に結果がありますが、これは文字列ではなくバイト配列です。

    文字列を作るには、これらのバイトを解釈する必要があります。組み込みの [TextDecoder](info:text-decoder) はまさにそれを行います。その後、`JSON.parse` することができます。

仮に JSON の代わりにバイナリのコンテンツが必要な場合はどうなるでしょう？その場合はよりシンプルです。Step 4, 5 の代わりに、すべてのチャンクの blob を作ります。
```js
let blob = new Blob(chunks);
```

繰り返しますが、これはアップロードの進行状況ではなく（今のところ方法はありません）、ダウンロードの進行状況についてのみであることに留意してください。
=======
Let's explain that step-by-step:

1. We perform `fetch` as usual, but instead of calling `response.json()`, we obtain a stream reader `response.body.getReader()`.

    Please note, we can't use both these methods to read the same response: either use a reader or a response method to get the result.
2. Prior to reading, we can figure out the full response length from the `Content-Length` header.

    It may be absent for cross-origin requests (see chapter <info:fetch-crossorigin>) and, well, technically a server doesn't have to set it. But usually it's at place.
3. Call `await reader.read()` until it's done.

    We gather response chunks in the array `chunks`. That's important, because after the response is consumed, we won't be able to "re-read" it using `response.json()` or another way (you can try, there'll be an error).
4. At the end, we have `chunks` -- an array of `Uint8Array` byte chunks. We need to join them into a single result. Unfortunately, there's no single method that concatenates those, so there's some code to do that:
    1. We create `chunksAll = new Uint8Array(receivedLength)` -- a same-typed array with the combined length.
    2. Then use `.set(chunk, position)` method to copy each `chunk` one after another in it.
5. We have the result in `chunksAll`. It's a byte array though, not a string.

    To create a string, we need to interpret these bytes. The built-in [TextDecoder](info:text-decoder) does exactly that. Then we can `JSON.parse` it, if necessary.

    What if we need binary content instead of a string? That's even simpler. Replace steps 4 and 5 with a single line that creates a `Blob` from all chunks:
    ```js
    let blob = new Blob(chunks);
    ```

At the end we have the result (as a string or a blob, whatever is convenient), and progress-tracking in the process.

Once again, please note, that's not for *upload* progress (no way now with `fetch`), only for *download* progress.

Also, if the size is unknown, we should check `receivedLength` in the loop and break it once it reaches a certain limit. So that the `chunks` won't overflow the memory. 
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
