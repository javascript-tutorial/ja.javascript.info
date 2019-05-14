
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
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Received ${value.length} bytes`)
}
```

`await reader.read()` がレスポンスのチャンクを返す間、ループします。

チャンクは２つのプロパティを持っています。:
- **`done`** -- 読み込みが完了すると true になります。
- **`value`** -- 型付きのバイト配列: `Uint8Array`.

進行状況を記録するには、チャンクを数える必要があります。

これはレスポンスを取得し、進行状況を記録する完全なコードです。:

```js run async
// Step 1: fetch を開始し、reader を取得します
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Step 2: 合計の長さを取得します
const contentLength = +response.headers.get('Content-Length');

// Step 3: データを読み込みます
let receivedLength = 0; // その時点の長さ
let chunks = []; // 受信したバイナリチャンクの配列(本文を構成します)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Received ${receivedLength} of ${contentLength}`)
}

// Step 4: チャンクを1つの Uint8Array に連結します
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Step 5: 文字列にデコードします
let result = new TextDecoder("utf-8").decode(chunksAll);

// 完了!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

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
