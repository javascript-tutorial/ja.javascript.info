# Server Sent Events

[Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) の仕様では、サーバとの接続を維持し、サーバからイベントを受けとれるようにする組み込みのクラス `EventSource` について説明されています。

`WebSocket` と同様に接続は永続的ですが、重要な違いがいくつかあります:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| 双方向: クライアントとサーバ両方がメッセージのやり取りをすることができます | 単方向: サーバのみがデータを送信します |
| バリナリデータとテキストデータ | テキストのみ |
| WebSocket プロトコル | 通常の HTTP |

`EventSource` は `WebSocket` ほど強力ではない、サーバと通信する方法です。

なぜこれを使う必要があるのでしょう？

主たる理由はより簡単だからです。多くのアプリケーションでは、`WebSocket` は少し強力すぎます。

サーバからデータストリームを受信する必要のある、例えばチャットメッセージやマーケットプレイスなどが `EventSource` の得意なところです。また、`WebSocket` では手動で何らかの実装が必要な自動再接続もサポートしています。その上、新しいプロトコルではなく通常の HTTP です。

## メッセージの取得

メッセージの受信を開始するには、`new EventSource(url)` を作成するだけです。

ブラウザは `url` に接続し、接続を開いたままにしてイベントを待ちます。

サーバはステータス 200 とヘッダ `Content-Type: text/event-stream` で応答し、接続を維持しつつ次のような特別な形式でメッセージを書き込みます。:

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

- メッセージテキストは `data:` の後に続きます。コロンの後のスペースは任意です。
- メッセージは2つの改行 `\n\n` で区切られます。
- 改行 `\n` を送るには、すぐにもう一つ `data:` を指定します(上の3番目のメッセージ)。

実際には、複雑なメッセージは通常 JSON エンコードされて送信されます。改行は `\n` としてエンコードされるため、複数の `data:` メッセージは必要ありません。

例:

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

...そのため、1つの `data:` が1つのメッセージを持つと想定できます。

このようなメッセージごとに、`message` イベントが生成されます。:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
  // 上のデータストリームでは、3回ログが出力されます
};

// or eventSource.addEventListener('message', ...)
```

### クロスオリジンリクエスト

`EventSource` は `fetch` など他のネットワークメソッドのように、クロスオリジンリクエストをサポートします。任意のURLを使用することができます。

```js
let source = new EventSource("https://another-site.com/events");
```

リモートサーバは `Origin` ヘッダを取得し、処理を続けるには `Access-Control-Allow-Origin` を応答する必要があります。

クレデンシャルを渡す場合は、次のように `withCredentials` オプションで設定します。:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

クロスオリジンヘッダに関しての詳細は、チャプター <info:fetch-crossorigin> を参照してください。


## 再接続

作成時に `new EventSource` はサーバに接続し、接続が切れた場合は再接続します。

気にする必要がないのでとても便利です。

再接続の間にはわずかな遅延があり、デフォルトでは数秒程度です。

サーバは応答の中で `retry` を使用して推奨する遅延を設定することができます(ミリ秒単位)。

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

`retry:` は他のデータを一緒に来ることもあれば、単独のメッセージとしてくることもあります。

ブラウザは再接続する前に、指定されたミリ秒またはそれ以上待つ必要があります。e.g. ブラウザが現時点ではネットワーク接続がないことを知っている場合は、接続されるまで待ってからリトライします。

- サーバがブラウザが再接続するのを止めてほしい場合は、HTTP ステータス 204 で応答します。
- ブラウザが接続を閉じたい場合は、`eventSource.close()` を呼び出します。

```js
let eventSource = new EventSource(...);

eventSource.close();
```

また、応答の `Content-Type` が正しくない、あるいは 301, 307, 200, 204 以外の HTTP ステータスである場合、再接続は行われません。接続では `"error"` イベントが発生し、ブラウザは再接続を行いません。

```smart
接続が最終的に閉じられると、それを "再オープン" することはできません。再び接続したい場合は新たに `EventSource` を作成します。
```

## Message id

ネットワークの問題により接続が切れた場合、どちらの側もどのメッセージを受信しており、どのメッセージを受信していないのかが確認できません。

そのため接続を正しく再開するには各メッセージに次のような `id` フィールドが必要です。:

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

`id` を持つメッセージを受け取ると、ブラウザは次のことを行います:

- プロパティ `eventSource.lastEventId` にその値を設定します。
- 再接続でその `id` が設定されたヘッダ `Last-Event-ID` を送信し、サーバが次のメッセージを再送信できるようにします。


```smart header="`data:` の後に `id:` を置きます"
注意: `id` はサーバによりメッセージ `data` の下に追加されます。これは、メッセージを受信した後に `lastEventId` が更新されるようにするためです。
```

## 接続ステータス: readyState

`EventSource` オブジェクトには `readyState` プロパティがあり、次のいずれかの値を取ります:

```js no-beautify
EventSource.CONNECTING = 0; // 接続中 or 再接続中
EventSource.OPEN = 1;       // 接続済み
EventSource.CLOSED = 2;     // 接続終わり
```

オブジェクトが作成されるか、接続がダウンしたときは常に `EventSource.CONNECTING` (= `0`) になります。

このプロパティを確認することで、`EventSource` の状態を知ることができます。

## イベントタイプ

デフォルトでは `EventSource` オブジェクトは 3つのイベントを生成します:

- `message` -- メッセージを受信。 メッセージ自体は `event.data` で利用できます。
- `open` -- 接続が開いた.
- `error` -- 接続が確立できなかった e.g. サーバが HTTP ステータス 500 を返した。

サーバはイベント開始時に `event: ...` で別の種類のイベントを指定することもできます。

例:

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

カスタムイベントを扱うには、`onmessage` ではなく `addEventListener` を利用する必要があります:

```js
eventSource.addEventListener('join', event => {
  alert(`Joined ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Said: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Left ${event.data}`);
});
```

## 完全な例

これは、`1`, `2`, `3`, 次に `bye` を送信し、その後接続を切断するサーバです。 

その後、ブラウザは自動的に再接続します。

[codetabs src="eventsource"]

## サマリ

`EventSource` オブジェクトは自動的に永続的な接続を確立し、サーバがメッセージを送信できるようにします。

次のものを提供します:
- 自動再接続。`retry` で再試行タイムアウトの調整が可能です。
- イベントを再開するためのメッセージID。最後に受信した識別子は、再接続する際に `Last-Event-ID` ヘッダで送信されます。
- 現在のステータスは `readyState` で見ることができます。

これにより、`EventSource` は `WebSocket` ( WebSocket はより低レベルで、このような組み込み機能はありません(もちろん、実装するこはできます))の代替手段になります。

多くの実際のアプリケーションでは、`EventSource` の機能で十分です。

すべてのモダンブラウザー(IEは除く)でサポートされています。

構文は次の通りです:

```js
let source = new EventSource(url, [credentials]);
```

2番目の引数には、可能なオプションが1つだけあります:  `{ withCredentials: true }`, これはクロスオリジン資格情報を送信することを許可することを意味します。

全体的なクロスオリジンセキュリティは `fetch` や他のネットワーク手段と同じです。

### `EventSource` オブジェクトのプロパティ

`readyState`
: 現在の接続状態: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` あるいは `EventSource.CLOSED (=2)`.

`lastEventId`
: 最後の受信した `id`. 再接続すると、ブラウザはヘッダ `Last-Event-ID` でその値を送信します。

### メソッド

`close()`
: 接続を閉じます

### イベント

`message`
: メッセージの受信, データは `event.data` にあります。

`open`
: 接続が確立されました。

`error`
: 接続の切断(自動再接続されます)や致命的なエラーの両方を含むエラーの場合です。再接続が試行されているかは `readyState` をチェックすることが確認できます。

サーバは `event:` でカスタムイベント名を設定することができます。このようなイベントは `on<event>` ではなく、`addEventListener` で処理する必要があります。

### サーバレスポンスフォーマット

サーバは `\n\n` で区切られたメッセージを送信します。

メッセージには次のフィールドが含まれます:

- `data:` -- メッセージ本文。複数の一連の `data` は各パート間に `\n` を含む単一のメッセージとして解釈されます。
- `id:` -- 再接続時に `Last-Event-ID` で送信される `lastEventId` を更新します。
- `retry:` -- 再接続のリトライ遅延をミリ秒で指定します。JavaScript からこの値を設定することはできません。
- `event:` -- イベント名。`data:` の前になければなりません。

メッセージには任意の順序で1つ以上のフィールドを含めることができますが、`id:` は通常最後にあります。
