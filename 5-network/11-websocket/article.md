# WebSocket

<<<<<<< HEAD
`WebSocket` プロトコルは仕様 [RFC 6455](http://tools.ietf.org/html/rfc6455) で説明されており、これは永続的な接続を介してブラウザとサーバ間でデータを交換する方法を提供します。接続の切断や追加のHTTPリクエストをすることなく、データを "パケット" として双方向に渡すことができます。

WebSocket は継続的にデータ交換を必要とするようなサービスに特に適しています。例えば、オンラインゲームやリアルタイムの取引システムなどです。

## 簡単な例

websocket の接続を開くには、url の特別なプロトコル `ws` を使用した `new WebSocket` を作る必要があります:
=======
The `WebSocket` protocol, described in the specification [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455), provides a way to exchange data between browser and server via a persistent connection. The data can be passed in both directions as "packets", without breaking the connection and the need of additional HTTP-requests.

WebSocket is especially great for services that require continuous data exchange, e.g. online games, real-time trading systems and so on.

## A simple example

To open a websocket connection, we need to create `new WebSocket` using the special protocol `ws` in the url:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

<<<<<<< HEAD
暗号化された `wss://` プロトコルもあります。websocket の HTTPS 版のようなものです。

```smart header="常に `wss://` が好ましいです"
`wss://` プロトコルは暗号化されるだけでなく、より信頼性があります。

これは、`ws://` のデータは暗号化されておらず、あらゆる仲介者に見えるためです。古いプロキシサーバによっては WebSocket を認識しないため、おかしなヘッダに見え、接続を中止する可能性があります。

一方、`wss://` は WebSocket over TLS (HTTPS が HTTP over TLS であるのと同じ)であり、TLS は送信側でデータを暗号化し、受信側で復号化します。そのため、データパケットは暗号化されてプロキシを通過します。プロキシは中身を見ることはできず、それらを通過させます。
```

ソケットが作成されると、そこで発生するイベントをリッスンする必要があります。全部で4つのイベントがあります。:
- **`open`** -- 接続が確立されました,
- **`message`** -- データを受け取りました,
- **`error`** -- websocket エラー,
- **`close`** -- 接続がクローズされました.

...また、なにかを送信したいときは、`socket.send(data)` で送ることができます。

例:
=======
There's also encrypted `wss://` protocol. It's like HTTPS for websockets.

```smart header="Always prefer `wss://`"
The `wss://` protocol is not only encrypted, but also more reliable.

That's because `ws://` data is not encrypted, visible for any intermediary. Old proxy servers do not know about WebSocket, they may see "strange" headers and abort the connection.

On the other hand, `wss://` is WebSocket over TLS, (same as HTTPS is HTTP over TLS), the transport security layer encrypts the data at the sender and decrypts it at the receiver. So data packets are passed encrypted through proxies. They can't see what's inside and let them through.
```

Once the socket is created, we should listen to events on it. There are totally 4 events:
- **`open`** -- connection established,
- **`message`** -- data received,
- **`error`** -- websocket error,
- **`close`** -- connection closed.

...And if we'd like to send something, then `socket.send(data)` will do that.

Here's an example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function(e) {
  alert("[open] Connection established");
  alert("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  alert(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {  
    alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
<<<<<<< HEAD
    // e.g. サーバのプロセスが停止、あるいはネットワークダウン
    // この場合、event.code は通常 1006 になります
=======
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
<<<<<<< HEAD
  alert(`[error] ${error.message}`);
};
```

デモ用に、上記の例では Node.js で書かれた小さなサーバ [server.js](demo/server.js)が動作しています。これは "Hello from server, John" と応答し、5秒待ってから接続をクローズします。

なので、 `open` -> `message` -> `close` のイベントが表示されるはずです。

これだけです。とても簡単ですね。

では、ここからはより詳しく見ていきましょう。

## websocket のオープン

`new WebSocket(url)` が生成されると、すぐに接続が開始されます。

接続中、ブラウザは(ヘッダを利用して)サーバに問い合わせます: "Websocket をサポートしていますか？"。そしてサーバが "はい" と回答した場合、WebSocket プロトコルでやりとりが続きます。これは HTTP ではありません。

![](websocket-handshake.svg)

これは `new WebSocket("wss://javascript.info/chat")` のリクエストにより作成されたブラウザヘッダの例です:
=======
  alert(`[error]`);
};
```

For demo purposes, there's a small server [server.js](demo/server.js) written in Node.js, for the example above, running. It responds with "Hello from server, John", then waits 5 seconds and closes the connection.

So you'll see events `open` -> `message` -> `close`.

That's actually it, we can talk WebSocket already. Quite simple, isn't it?

Now let's talk more in-depth.

## Opening a websocket

When `new WebSocket(url)` is created, it starts connecting immediately.

During the connection, the browser (using headers) asks the server: "Do you support Websocket?" And if the server replies "yes", then the talk continues in WebSocket protocol, which is not HTTP at all.

![](websocket-handshake.svg)

Here's an example of browser headers for a request made by `new WebSocket("wss://javascript.info/chat")`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

<<<<<<< HEAD
- `Origin` -- クライアントページのオリジンです。例. `https://javascript.info`。WebSocket オブジェクトはもともとクロスオリジンです。特別なヘッダやその他の制限はありません。古いサーバはどのみち WebSocket を処理することができないので、互換性の問題はありません。ですが、`Origin` ヘッダは重要です。これによりサーバが Webサイトと WebSocket をやり取りするかを決めるからです。
- `Connection: Upgrade` -- クライアントがプロトコルの変更を希望する合図です。
- `Upgrade: websocket` -- リクエストされたプロトコルは "websocket" です。
- `Sec-WebSocket-Key` -- セキュリティのための、ブラウザが生成したランダムなキーです。
- `Sec-WebSocket-Version` -- WebSock プロトコルのバージョンです。現在は 13 です。

```smart header="WebSocket ハンドシェイクはエミュレートできません"
JavaScript はこれらのヘッダを設定することを許可していません。そのため、この手の HTTP リクエストを行うために、`XMLHttpRequest` や `fetch` を使うことはできません。
```

サーバが WebSocket に切り替えることに同意すると、コード 101 の応答を返す必要があります:
=======
- `Origin` -- the origin of the client page, e.g. `https://javascript.info`. WebSocket objects are cross-origin by nature. There are no special headers or other limitations. Old servers are unable to handle WebSocket anyway, so there are no compatibility issues. But the `Origin` header is important, as it allows the server to decide whether or not to talk WebSocket with this website.
- `Connection: Upgrade` -- signals that the client would like to change the protocol.
- `Upgrade: websocket` -- the requested protocol is "websocket".
- `Sec-WebSocket-Key` -- a random browser-generated key, used to ensure that the server supports WebSocket protocol. It's random to prevent proxies from caching any following communication.
- `Sec-WebSocket-Version` -- WebSocket protocol version, 13 is the current one.

```smart header="WebSocket handshake can't be emulated"
We can't use `XMLHttpRequest` or `fetch` to make this kind of HTTP-request, because JavaScript is not allowed to set these headers.
```

If the server agrees to switch to WebSocket, it should send code 101 response:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

<<<<<<< HEAD
ここで、`Sec-WebSocket-Accept` は特別なアルゴリズムを使用して算出された `Sec-WebSocket-Key` です。ブラウザはこれを使って、リクエストに対応するレスポンスであることを確認します。

その後、データは WebSocket プロトコルを使用して転送されます。これからその構造を見てきましょう。なお、これは HTTP ではありません。

### 拡張とサブプロトコル

拡張やサブプロトコルを記述する、追加のヘッダ `Sec-WebSocket-Extensions` と `Sec-WebSocket-Protocol` があります。

例:

- `Sec-WebSocket-Extensions: deflate-frame` はブラウザがデータ圧縮をサポートすることを意味します。拡張はデータ転送に関するものあり、WebSocketプロトコルを拡張する機能です。ヘッダ `Sec-WebSocket-Extensions` は、サポートするすべての拡張のリストとともにブラウザによって自動的に送信されます。
- `Sec-WebSocket-Protocol: soap, wamp` は任意のデータだけでなく、[SOAP](http://en.wikipedia.org/wiki/SOAP) あるいは WAMP ("The WebSocket Application Messaging Protocol") プロトコルのデータも転送することを意味します。WebSocket サブプロトコルは [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml) に登録されています。

    オプションのヘッダは、`new WebSocket` の第２引数(任意)で指定されたものであり、われわれのコードがどのサブプロトコルをサポートするかをサーバに伝えます。これはサブプロトコルの配列であり、例えば、SOAP あるいは WAMP を使いたい場合には次のようにします:
=======
Here `Sec-WebSocket-Accept` is `Sec-WebSocket-Key`, recoded using a special algorithm. Upon seeing it, the browser understands that the server really does support the WebSocket protocol.

Afterwards, the data is transferred using the WebSocket protocol, we'll see its structure ("frames") soon. And that's not HTTP at all.

### Extensions and subprotocols

There may be additional headers `Sec-WebSocket-Extensions` and `Sec-WebSocket-Protocol` that describe extensions and subprotocols.

For instance:

- `Sec-WebSocket-Extensions: deflate-frame` means that the browser supports data compression. An extension is something related to transferring the data, functionality that extends the WebSocket protocol. The header `Sec-WebSocket-Extensions` is sent automatically by the browser, with the list of all extensions it supports.

- `Sec-WebSocket-Protocol: soap, wamp` means that we'd like to transfer not just any data, but the data in [SOAP](https://en.wikipedia.org/wiki/SOAP) or WAMP ("The WebSocket Application Messaging Protocol") protocols. WebSocket subprotocols are registered in the [IANA catalogue](https://www.iana.org/assignments/websocket/websocket.xml). So, this header describes the data formats that we're going to use.

    This optional header is set using the second parameter of `new WebSocket`. That's the array of subprotocols, e.g. if we'd like to use SOAP or WAMP:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

<<<<<<< HEAD
サーバは、使用に同意したプロトコルと拡張のリストを返す必要があります。

例えば、次のリクエストを見てください。:
=======
The server should respond with a list of protocols and extensions that it agrees to use.

For example, the request:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
GET /chat
Host: javascript.info
Upgrade: websocket
Connection: Upgrade
Origin: https://javascript.info
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
*/!*
```

<<<<<<< HEAD
応答例です:
=======
Response:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
*!*
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
*/!*
```

<<<<<<< HEAD
ここでは、サーバは拡張 "deflate-frame" と、リクエストされたサブプロトコルのうち SOAP のみをサポートすると応答しています。

## データ転送

WebSocket 通信は "フレーム" (データフラグメント、どちら側からでも送信でき、いくつかの種類があります)で構成されます。 :

- "text frames" -- 関係者が互いに送信するテキストデータを含んでいます。
- "binary data frames" -- 関係者が互いに送信するバイナリデータを含んでいます。
- "ping/pong frames" は接続確認に使用されます。サーバから送信され、ブラウザは自動でそれらに応答します。
- "connection close frame" やその他いくつかのサービスフレームもあります。

ブラウザでは、テキストフレームまたはバイナリフレームのみを直接扱います。

**WebSocket `.send()` メソッドはテキストまたはバイナリデータを送信できます。**

`socket.send(body)` 呼び出しは、文字列または `Blob` や `ArrayBuffer` などを含むバイナリ形式の `body` が許可されます。設定は必要ありません。任意のフォーマットで送信するだけでOKです。

**データを受信したとき、テキストは常に文字列として来ます。また、バイナリデータの場合は `Blob`、 `ArrayBuffer` 形式のいずれかを選択することができます。**

これは `socket.bufferType` プロパティで設定されます。デフォルトは `"blob"` なので、バイナリデータは `Blob` オブジェクトで来ます。

[Blob](info:blob) は高レベルのバイナリオブジェクトで、`<a>`, `<img>` 等といったタグと直接統合されます。そのため、これは妥当なデフォルト値です。ただし、バリナリ処理の場合に個々のバイトデータにアクセスする必要があれば、`"arraybuffer"` に変更することができます。

```js
socket.bufferType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data は文字列(テキストの場合)か arraybuffer (バイナリの場合)) です
};
```

## レートリミット(Rate limiting)

私たちのアプリが送信すべき大量のデータを生成していると想像してください。ですが、ユーザは低速のネットワーク接続で、恐らく郊外のモバイルインターネットだとします。

何度も `socket.send(data)` を呼び出すことはできますが、データはメモリにバッファ(保持)され、ネットワーク速度が許可する範囲でできるだけ早く送信されます。

`socket.bufferedAmount` プロパティはその時点でバッファされている(ネットワーク経由で送信されるのを待っている)バイト数が格納されています。

これを調べることで、ソケットが実際に送信可能かを確認することができます。

```js
// 100 ms 毎にソケットを検査し既存のデータがすべて送信されていれば追加のデータを送信します。
=======
Here the server responds that it supports the extension "deflate-frame", and only SOAP of the requested subprotocols.

## Data transfer

WebSocket communication consists of "frames" -- data fragments, that can be sent from either side, and can be of several kinds:

- "text frames" -- contain text data that parties send to each other.
- "binary data frames" -- contain binary data that parties send to each other.
- "ping/pong frames" are used to check the connection, sent from the server, the browser responds to these automatically.
- there's also "connection close frame" and a few other service frames.

In the browser, we directly work only with text or binary frames.

**WebSocket `.send()` method can send either text or binary data.**

A call `socket.send(body)` allows `body` in string or a binary format, including `Blob`, `ArrayBuffer`, etc. No settings are required: just send it out in any format.

**When we receive the data, text always comes as string. And for binary data, we can choose between `Blob` and `ArrayBuffer` formats.**

That's set by `socket.binaryType` property, it's `"blob"` by default, so binary data comes as `Blob` objects.

[Blob](info:blob) is a high-level binary object, it directly integrates with `<a>`, `<img>` and other tags, so that's a sane default. But for binary processing, to access individual data bytes, we can change it to `"arraybuffer"`:

```js
socket.binaryType = "arraybuffer";
socket.onmessage = (event) => {
  // event.data is either a string (if text) or arraybuffer (if binary)
};
```

## Rate limiting

Imagine, our app is generating a lot of data to send. But the user has a slow network connection, maybe on a mobile internet, outside of a city.

We can call `socket.send(data)` again and again. But the data will be buffered (stored) in memory and sent out only as fast as network speed allows.

The `socket.bufferedAmount` property stores how many bytes remain buffered at this moment, waiting to be sent over the network.

We can examine it to see whether the socket is actually available for transmission.

```js
// every 100ms examine the socket and send more data  
// only if all the existing data was sent out
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


<<<<<<< HEAD
## 接続を閉じる

通常、接続を閉じたいとき(ブラウザとサーバは同等の権限を持ちます)は、数値コードとテキストによる理由とを合わせて "connection close frame" を送信します。

そのためのメソッドは次の通りです:
=======
## Connection close

Normally, when a party wants to close the connection (both browser and server have equal rights), they send a "connection close frame" with a numeric code and a textual reason.

The method for that is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
socket.close([code], [reason]);
```

<<<<<<< HEAD
- `code` は特別な WebSocket 終了コードです(オプション)
- `reason` は終了の理由を説明する文字列です(オプション)

次に、`close` イベントハンドラの相手はそのコードと理由を取得します, e.g.:

```js
// クローズする側:
socket.close(1000, "Work complete");

// 相手
=======
- `code` is a special WebSocket closing code (optional)
- `reason` is a string that describes the reason of closing (optional)

Then the other party in the `close` event handler gets the code and the reason, e.g.:

```js
// closing party:
socket.close(1000, "Work complete");

// the other party
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

<<<<<<< HEAD
最も一般的なコード値です:

- `1000` -- デフォルトで、通常のクローズです(`code` がない場合に使われます),
- `1006` -- 手動でこのコードにする方法はなく、接続が失われたことを示します(クローズフレームなし).

次のようなコードもあります:

- `1001` -- サーバがシャットダウンしたりブラウザがページを離れた場合など、当事者がどこかに去った,
- `1009` -- メッセージが大きすぎて処理できない,
- `1011` -- サーバでの予期しないエラー,
- ...など.

全リストは [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1) にあります。

WebSocket のコードは HTTP のコードにある程度似ていますが別物です。特に `1000` より小さい数字は予約されており、そのようなコードを設定しようとするとエラーになります。

```js
// 接続が壊れた場合
=======
Most common code values:

- `1000` -- the default, normal closure (used if no `code` supplied),
- `1006` -- no way to set such code manually, indicates that the connection was lost (no close frame).

There are other codes like:

- `1001` -- the party is going away, e.g. server is shutting down, or a browser leaves the page,
- `1009` -- the message is too big to process,
- `1011` -- unexpected error on server,
- ...and so on.

The full list can be found in [RFC6455, §7.4.1](https://tools.ietf.org/html/rfc6455#section-7.4.1).

WebSocket codes are somewhat like HTTP codes, but different. In particular, codes lower than `1000` are reserved, there'll be an error if we try to set such a code.

```js
// in case connection is broken
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


<<<<<<< HEAD
## 接続状態(Connection state)

接続状態は次のような値をもつ `socket.readyState` プロパティで取得できます。:

- **`0`** -- "CONNECTING": 接続はまだ確立されていません,
- **`1`** -- "OPEN": 接続は確立し通信中,
- **`2`** -- "CLOSING": 接続はクローズ中です,
- **`3`** -- "CLOSED": 接続はクローズされています.


## チャットのサンプル

ブラウザの WebSocket API と Node.js WebSocket モジュール <https://github.com/websockets/ws> を使用してチャットのサンプルを見てみましょう。主にクライアントサイドに注目しますが、サーバも簡単です。

HTML: メッセージを送信するための `<form>` と受信メッセージ用の `<div>` が必要です:
=======
## Connection state

To get connection state, additionally there's `socket.readyState` property with values:

- **`0`** -- "CONNECTING": the connection has not yet been established,
- **`1`** -- "OPEN": communicating,
- **`2`** -- "CLOSING": the connection is closing,
- **`3`** -- "CLOSED": the connection is closed.


## Chat example

Let's review a chat example using browser WebSocket API and Node.js WebSocket module <https://github.com/websockets/ws>. We'll pay the main attention to the client side, but the server is also simple.

HTML: we need a `<form>` to send messages and a `<div>` for incoming messages:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

<<<<<<< HEAD
JavaScript から次の3つのことをします:
1. 接続をオープンします
2. フォームの送信 -- メッセージに対して `socket.send(message)` をします
3. メッセージの受信 -- `div#messages` に追加していきます

これはそのコードです:
=======
From JavaScript we want three things:
1. Open the connection.
2. On form submission -- `socket.send(message)` for the message.
3. On incoming message -- append it to `div#messages`.

Here's the code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

<<<<<<< HEAD
// フォームからメッセージの送信をします
=======
// send message from the form
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

<<<<<<< HEAD
// メッセージを受信しました - div#message にメッセージに表示します
=======
// message received - show the message in div#messages
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

<<<<<<< HEAD
サーバサイドのコードは、少し今回のスコープを超えています。ここでは Node.js を使っていますが、そうでなくてもOKです。他のプラットフォームにも WebSocket でやり取りする手段があります。

サーバサイドのアルゴリズムは次の通りです:

1. socket の集合 `clients = new Set()` を作成します。
2. 受け入れられた各 websocket を `clients.add(socket)` で clients に追加し、`message` イベントリスナーを設定し、メッセージを取得します。
3. メッセージを受信すると、clients をイテレートし全員に送信します。
4. 接続を閉じられると、`clients.delete(socket)` をします。
=======
Server-side code is a little bit beyond our scope. Here we'll use Node.js, but you don't have to. Other platforms also have their means to work with WebSocket.

The server-side algorithm will be:

1. Create `clients = new Set()` -- a set of sockets.
2. For each accepted websocket, add it to the set `clients.add(socket)` and set `message` event listener to get its messages.
3. When a message is received: iterate over clients and send it to everyone.
4. When a connection is closed: `clients.delete(socket)`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
<<<<<<< HEAD
  // ここでは websocket 接続のみを処理します
  // 実際のプロジェクトでは、非-websocket リクエストを処理するコードがここにあります
=======
  // here we only handle websocket connections
  // in real project we'd have some other code here to handle non-websocket requests
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
<<<<<<< HEAD
    message = message.slice(0, 50); // メッセージの最大長は 50 になります
=======
    message = message.slice(0, 50); // max message length will be 50
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


<<<<<<< HEAD
動作するサンプルです:

[iframe src="chat" height="100" zip]

ダウンロード(iframeの右上のボタン)をして、ローカルで実行することもできます。実行前に [Node.js](https://nodejs.org/en/) のインストールと `npm install ws` をするのを忘れないでください。

## サマリ

WebSocket はブラウザ - サーバ間での永続的な接続を維持するだめのモダンな方法です。

- WebSocket にはクロスオリジン制約はありません
- ブラウザで十分サポートされています
- 文字列とバリナリデータを送受信するることができます

API はシンプルです。

メソッド:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

イベント:
=======
Here's the working example:

[iframe src="chat" height="100" zip]

You can also download it (upper-right button in the iframe) and run it locally. Just don't forget to install [Node.js](https://nodejs.org/en/) and `npm install ws` before running.

## Summary

WebSocket is a modern way to have persistent browser-server connections.

- WebSockets don't have cross-origin limitations.
- They are well-supported in browsers.
- Can send/receive strings and binary data.

The API is simple.

Methods:
- `socket.send(data)`,
- `socket.close([code], [reason])`.

Events:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- `open`,
- `message`,
- `error`,
- `close`.

<<<<<<< HEAD
WebSocket 自体には再接続や認証、その他の高レベルのメカニズムは含まれていません。そのため、それを実現するためのクライアント/サーバ ライブラリがあります。またこれらの機能を手動で実装することもできます。

WebSocket を既存のプロジェクトに統合するために、WebSocket サーバをメインの HTTP サーバを並行して実行し、単一のデータベースを共有する場合があります。WebSocket へのリクエストは WebSocket サーバにつながるサブドメイン `wss://ws.site.com` を使用し、`https://site.com` はメインの HTTP サーバはに行きます。

もちろん、他の統合方法も可能です。
=======
WebSocket by itself does not include reconnection, authentication and many other high-level mechanisms. So there are client/server libraries for that, and it's also possible to implement these capabilities manually.

Sometimes, to integrate WebSocket into existing projects, people run a WebSocket server in parallel with the main HTTP-server, and they share a single database. Requests to WebSocket use `wss://ws.site.com`, a subdomain that leads to the WebSocket server, while `https://site.com` goes to the main HTTP-server.

Surely, other ways of integration are also possible.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
