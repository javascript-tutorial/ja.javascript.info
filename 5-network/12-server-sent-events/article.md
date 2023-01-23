# Server Sent Events

<<<<<<< HEAD
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
=======
The [Server-Sent Events](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) specification describes a built-in class `EventSource`, that keeps connection with the server and allows to receive events from it.

Similar to `WebSocket`, the connection is persistent.

But there are several important differences:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bi-directional: both client and server can exchange messages | One-directional: only server sends data |
| Binary and text data | Only text |
| WebSocket protocol | Regular HTTP |

`EventSource` is a less-powerful way of communicating with the server than `WebSocket`.

Why should one ever use it?

The main reason: it's simpler. In many applications, the power of `WebSocket` is a little bit too much.

We need to receive a stream of data from server: maybe chat messages or market prices, or whatever. That's what `EventSource` is good at. Also it supports auto-reconnect, something  we need to implement manually with `WebSocket`. Besides, it's a plain old HTTP, not a new protocol.

## Getting messages

To start receiving messages, we just need to create `new EventSource(url)`.

The browser will connect to `url` and keep the connection open, waiting for events.

The server should respond with status 200 and the header `Content-Type: text/event-stream`, then keep the connection and write messages into it in the special format, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
data: Message 1

data: Message 2

data: Message 3
data: of two lines
```

<<<<<<< HEAD
- メッセージテキストは `data:` の後に続きます。コロンの後のスペースは任意です。
- メッセージは2つの改行 `\n\n` で区切られます。
- 改行 `\n` を送るには、すぐにもう一つ `data:` を指定します(上の3番目のメッセージ)。

実際には、複雑なメッセージは通常 JSON エンコードされて送信されます。改行は `\n` としてエンコードされるため、複数の `data:` メッセージは必要ありません。

例:
=======
- A message text goes after `data:`, the space after the colon is optional.
- Messages are delimited with double line breaks `\n\n`.
- To send a line break `\n`, we can immediately send one more `data:` (3rd message above).

In practice, complex messages are usually sent JSON-encoded. Line-breaks are encoded as `\n` within them, so multiline `data:` messages are not necessary.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
data: {"user":"John","message":"First line*!*\n*/!* Second line"}
```

<<<<<<< HEAD
...そのため、1つの `data:` が1つのメッセージを持つと想定できます。

このようなメッセージごとに、`message` イベントが生成されます。:
=======
...So we can assume that one `data:` holds exactly one message.

For each such message, the `message` event is generated:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("New message", event.data);
<<<<<<< HEAD
  // 上のデータストリームでは、3回ログが出力されます
=======
  // will log 3 times for the data stream above
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
};

// or eventSource.addEventListener('message', ...)
```

<<<<<<< HEAD
### クロスオリジンリクエスト

`EventSource` は `fetch` など他のネットワークメソッドのように、クロスオリジンリクエストをサポートします。任意のURLを使用することができます。
=======
### Cross-origin requests

`EventSource` supports cross-origin requests, like `fetch` and any other networking methods. We can use any URL:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let source = new EventSource("https://another-site.com/events");
```

<<<<<<< HEAD
リモートサーバは `Origin` ヘッダを取得し、処理を続けるには `Access-Control-Allow-Origin` を応答する必要があります。

クレデンシャルを渡す場合は、次のように `withCredentials` オプションで設定します。:
=======
The remote server will get the `Origin` header and must respond with `Access-Control-Allow-Origin` to proceed.

To pass credentials, we should set the additional option `withCredentials`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

<<<<<<< HEAD
クロスオリジンヘッダに関しての詳細は、チャプター <info:fetch-crossorigin> を参照してください。


## 再接続

作成時に `new EventSource` はサーバに接続し、接続が切れた場合は再接続します。

気にする必要がないのでとても便利です。

再接続の間にはわずかな遅延があり、デフォルトでは数秒程度です。

サーバは応答の中で `retry` を使用して推奨する遅延を設定することができます(ミリ秒単位)。
=======
Please see the chapter <info:fetch-crossorigin> for more details about cross-origin headers.


## Reconnection

Upon creation, `new EventSource` connects to the server, and if the connection is broken -- reconnects.

That's very convenient, as we don't have to care about it.

There's a small delay between reconnections, a few seconds by default.

The server can set the recommended delay using `retry:` in response (in milliseconds):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
retry: 15000
data: Hello, I set the reconnection delay to 15 seconds
```

<<<<<<< HEAD
`retry:` は他のデータを一緒に来ることもあれば、単独のメッセージとしてくることもあります。

ブラウザは再接続する前に、指定されたミリ秒またはそれ以上待つ必要があります。e.g. ブラウザが現時点ではネットワーク接続がないことを知っている場合は、接続されるまで待ってからリトライします。

- サーバがブラウザが再接続するのを止めてほしい場合は、HTTP ステータス 204 で応答します。
- ブラウザが接続を閉じたい場合は、`eventSource.close()` を呼び出します。
=======
The `retry:` may come both together with some data, or as a standalone message.

The browser should wait that many milliseconds before reconnecting. Or longer, e.g. if the browser knows (from OS) that there's no network connection at the moment, it may wait until the connection appears, and then retry.

- If the server wants the browser to stop reconnecting, it should respond with HTTP status 204.
- If the browser wants to close the connection, it should call `eventSource.close()`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let eventSource = new EventSource(...);

eventSource.close();
```

<<<<<<< HEAD
また、応答の `Content-Type` が正しくない、あるいは 301, 307, 200, 204 以外の HTTP ステータスである場合、再接続は行われません。接続では `"error"` イベントが発生し、ブラウザは再接続を行いません。

```smart
接続が最終的に閉じられると、それを "再オープン" することはできません。再び接続したい場合は新たに `EventSource` を作成します。
=======
Also, there will be no reconnection if the response has an incorrect `Content-Type` or its HTTP status differs from 301, 307, 200 and 204. In such cases the `"error"` event will be emitted, and the browser won't reconnect.

```smart
When a connection is finally closed, there's no way to "reopen" it. If we'd like to connect again, just create a new `EventSource`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## Message id

<<<<<<< HEAD
ネットワークの問題により接続が切れた場合、どちらの側もどのメッセージを受信しており、どのメッセージを受信していないのかが確認できません。

そのため接続を正しく再開するには各メッセージに次のような `id` フィールドが必要です。:
=======
When a connection breaks due to network problems, either side can't be sure which messages were received, and which weren't.

To correctly resume the connection, each message should have an `id` field, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
data: Message 1
id: 1

data: Message 2
id: 2

data: Message 3
data: of two lines
id: 3
```

<<<<<<< HEAD
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
=======
When a message with `id:` is received, the browser:

- Sets the property `eventSource.lastEventId` to its value.
- Upon reconnection sends the header `Last-Event-ID` with that `id`, so that the server may re-send following messages.

```smart header="Put `id:` after `data:`"
Please note: the `id` is appended below message `data` by the server, to ensure that `lastEventId` is updated after the message is received.
```

## Connection status: readyState

The `EventSource` object has `readyState` property, that has one of three values:

```js no-beautify
EventSource.CONNECTING = 0; // connecting or reconnecting
EventSource.OPEN = 1;       // connected
EventSource.CLOSED = 2;     // connection closed
```

When an object is created, or the connection is down, it's always `EventSource.CONNECTING` (equals `0`).

We can query this property to know the state of `EventSource`.

## Event types

By default `EventSource` object generates three events:

- `message` -- a message received, available as `event.data`.
- `open` -- the connection is open.
- `error` -- the connection could not be established, e.g. the server returned HTTP 500 status.

The server may specify another type of event with `event: ...` at the event start.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
event: join
data: Bob

data: Hello

event: leave
data: Bob
```

<<<<<<< HEAD
カスタムイベントを扱うには、`onmessage` ではなく `addEventListener` を利用する必要があります:
=======
To handle custom events, we must use `addEventListener`, not `onmessage`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
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
=======
## Full example

Here's the server that sends messages with `1`, `2`, `3`, then `bye` and breaks the connection.

Then the browser automatically reconnects.

[codetabs src="eventsource"]

## Summary

`EventSource` object automatically establishes a persistent connection and allows the server to send messages over it.

It offers:
- Automatic reconnect, with tunable `retry` timeout.
- Message ids to resume events, the last received identifier is sent in `Last-Event-ID` header upon reconnection.
- The current state is in the `readyState` property.

That makes `EventSource` a viable alternative to `WebSocket`, as the latter is more low-level and lacks such built-in features (though they can be implemented).

In many real-life applications, the power of `EventSource` is just enough.

Supported in all modern browsers (not IE).

The syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let source = new EventSource(url, [credentials]);
```

<<<<<<< HEAD
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
=======
The second argument has only one possible option: `{ withCredentials: true }`, it allows sending cross-origin credentials.

Overall cross-origin security is same as for `fetch` and other network methods.

### Properties of an `EventSource` object

`readyState`
: The current connection state: either `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` or `EventSource.CLOSED (=2)`.

`lastEventId`
: The last received `id`. Upon reconnection the browser sends it in the header `Last-Event-ID`.

### Methods

`close()`
: Closes the connection.

### Events

`message`
: Message received, the data is in `event.data`.

`open`
: The connection is established.

`error`
: In case of an error, including both lost connection (will auto-reconnect) and fatal errors. We can check `readyState` to see if the reconnection is being attempted.

The server may set a custom event name in `event:`. Such events should be handled using `addEventListener`, not `on<event>`.

### Server response format

The server sends messages, delimited by `\n\n`.

A message may have following fields:

- `data:` -- message body, a sequence of multiple `data` is interpreted as a single message, with `\n` between the parts.
- `id:` -- renews `lastEventId`, sent in `Last-Event-ID` on reconnect.
- `retry:` -- recommends a retry delay for reconnections in ms. There's no way to set it from JavaScript.
- `event:` -- event name, must precede `data:`.

A message may include one or more fields in any order, but `id:` usually goes the last.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
