# WebSocket

`WebSocket` プロトコルは仕様 [RFC 6455](http://tools.ietf.org/html/rfc6455) で説明されており、これは永続的な接続を介してブラウザとサーバ間でデータを交換する方法を提供します。接続の切断や追加のHTTPリクエストをすることなく、データを "パケット" として双方向に渡すことができます。

WebSocket は継続的にデータ交換を必要とするようなサービスに特に適しています。例えば、オンラインゲームやリアルタイムの取引システムなどです。

## 簡単な例

websocket の接続を開くには、url の特別なプロトコル `ws` を使用した `new WebSocket` を作る必要があります:

```js
let socket = new WebSocket("*!*ws*/!*://javascript.info");
```

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
    // e.g. サーバのプロセスが停止、あるいはネットワークダウン
    // この場合、event.code は通常 1006 になります
    alert('[close] Connection died');
  }
};

socket.onerror = function(error) {
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

```
GET /chat
Host: javascript.info
Origin: https://javascript.info
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

- `Origin` -- クライアントページのオリジンです。例. `https://javascript.info`。WebSocket オブジェクトはもともとクロスオリジンです。特別なヘッダやその他の制限はありません。古いサーバはどのみち WebSocket を処理することができないので、互換性の問題はありません。ですが、`Origin` ヘッダは重要です。これによりサーバが Webサイトと WebSocket をやり取りするかを決めるからです。
- `Connection: Upgrade` -- クライアントがプロトコルの変更を希望する合図です。
- `Upgrade: websocket` -- リクエストされたプロトコルは "websocket" です。
- `Sec-WebSocket-Key` -- セキュリティのための、ブラウザが生成したランダムなキーです。
- `Sec-WebSocket-Version` -- WebSock プロトコルのバージョンです。現在は 13 です。

```smart header="WebSocket ハンドシェイクはエミュレートできません"
JavaScript はこれらのヘッダを設定することを許可していません。そのため、この手の HTTP リクエストを行うために、`XMLHttpRequest` や `fetch` を使うことはできません。
```

サーバが WebSocket に切り替えることに同意すると、コード 101 の応答を返す必要があります:

```
101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

ここで、`Sec-WebSocket-Accept` は特別なアルゴリズムを使用して算出された `Sec-WebSocket-Key` です。ブラウザはこれを使って、リクエストに対応するレスポンスであることを確認します。

その後、データは WebSocket プロトコルを使用して転送されます。これからその構造を見てきましょう。なお、これは HTTP ではありません。

### 拡張とサブプロトコル

拡張やサブプロトコルを記述する、追加のヘッダ `Sec-WebSocket-Extensions` と `Sec-WebSocket-Protocol` があります。

例:

- `Sec-WebSocket-Extensions: deflate-frame` はブラウザがデータ圧縮をサポートすることを意味します。拡張はデータ転送に関するものあり、WebSocketプロトコルを拡張する機能です。ヘッダ `Sec-WebSocket-Extensions` は、サポートするすべての拡張のリストとともにブラウザによって自動的に送信されます。
- `Sec-WebSocket-Protocol: soap, wamp` は任意のデータだけでなく、[SOAP](http://en.wikipedia.org/wiki/SOAP) あるいは WAMP ("The WebSocket Application Messaging Protocol") プロトコルのデータも転送することを意味します。WebSocket サブプロトコルは [IANA catalogue](http://www.iana.org/assignments/websocket/websocket.xml) に登録されています。

    オプションのヘッダは、`new WebSocket` の第２引数(任意)で指定されたものであり、われわれのコードがどのサブプロトコルをサポートするかをサーバに伝えます。これはサブプロトコルの配列であり、例えば、SOAP あるいは WAMP を使いたい場合には次のようにします:

    ```js
    let socket = new WebSocket("wss://javascript.info/chat", ["soap", "wamp"]);
    ```

サーバは、使用に同意したプロトコルと拡張のリストを返す必要があります。

例えば、次のリクエストを見てください。:

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

応答例です:

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
setInterval(() => {
  if (socket.bufferedAmount == 0) {
    socket.send(moreData());
  }
}, 100);
```


## 接続を閉じる

通常、接続を閉じたいとき(ブラウザとサーバは同等の権限を持ちます)は、数値コードとテキストによる理由とを合わせて "connection close frame" を送信します。

そのためのメソッドは次の通りです:
```js
socket.close([code], [reason]);
```

- `code` は特別な WebSocket 終了コードです(オプション)
- `reason` は終了の理由を説明する文字列です(オプション)

次に、`close` イベントハンドラの相手はそのコードと理由を取得します, e.g.:

```js
// クローズする側:
socket.close(1000, "Work complete");

// 相手
socket.onclose = event => {
  // event.code === 1000
  // event.reason === "Work complete"
  // event.wasClean === true (clean close)
};
```

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
socket.onclose = event => {
  // event.code === 1006
  // event.reason === ""
  // event.wasClean === false (no closing frame)
};
```


## 接続状態(Connection state)

接続状態は次のような値をもつ `socket.readyState` プロパティで取得できます。:

- **`0`** -- "CONNECTING": 接続はまだ確立されていません,
- **`1`** -- "OPEN": 接続は確立し通信中,
- **`2`** -- "CLOSING": 接続はクローズ中です,
- **`3`** -- "CLOSED": 接続はクローズされています.


## チャットのサンプル

ブラウザの WebSocket API と Node.js WebSocket モジュール <https://github.com/websockets/ws> を使用してチャットのサンプルを見てみましょう。主にクライアントサイドに注目しますが、サーバも簡単です。

HTML: メッセージを送信するための `<form>` と受信メッセージ用の `<div>` が必要です:

```html
<!-- message form -->
<form name="publish">
  <input type="text" name="message">
  <input type="submit" value="Send">
</form>

<!-- div with messages -->
<div id="messages"></div>
```

JavaScript から次の3つのことをします:
1. 接続をオープンします
2. フォームの送信 -- メッセージに対して `socket.send(message)` をします
3. メッセージの受信 -- `div#messages` に追加していきます

これはそのコードです:

```js
let socket = new WebSocket("wss://javascript.info/article/websocket/chat/ws");

// フォームからメッセージの送信をします
document.forms.publish.onsubmit = function() {
  let outgoingMessage = this.message.value;

  socket.send(outgoingMessage);
  return false;
};

// メッセージを受信しました - div#message にメッセージに表示します
socket.onmessage = function(event) {
  let message = event.data;

  let messageElem = document.createElement('div');
  messageElem.textContent = message;
  document.getElementById('messages').prepend(messageElem);
}
```

サーバサイドのコードは、少し今回のスコープを超えています。ここでは Node.js を使っていますが、そうでなくてもOKです。他のプラットフォームにも WebSocket でやり取りする手段があります。

サーバサイドのアルゴリズムは次の通りです:

1. socket の集合 `clients = new Set()` を作成します。
2. 受け入れられた各 websocket を `clients.add(socket)` で clients に追加し、`message` イベントリスナーを設定し、メッセージを取得します。
3. メッセージを受信すると、clients をイテレートし全員に送信します。
4. 接続を閉じられると、`clients.delete(socket)` をします。

```js
const ws = new require('ws');
const wss = new ws.Server({noServer: true});

const clients = new Set();

http.createServer((req, res) => {
  // ここでは websocket 接続のみを処理します
  // 実際のプロジェクトでは、非-websocket リクエストを処理するコードがここにあります
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
});

function onSocketConnect(ws) {
  clients.add(ws);

  ws.on('message', function(message) {
    message = message.slice(0, 50); // メッセージの最大長は 50 になります

    for(let client of clients) {
      client.send(message);
    }
  });

  ws.on('close', function() {
    clients.delete(ws);
  });
}
```


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
- `open`,
- `message`,
- `error`,
- `close`.

WebSocket 自体には再接続や認証、その他の高レベルのメカニズムは含まれていません。そのため、それを実現するためのクライアント/サーバ ライブラリがあります。またこれらの機能を手動で実装することもできます。

WebSocket を既存のプロジェクトに統合するために、WebSocket サーバをメインの HTTP サーバを並行して実行し、単一のデータベースを共有する場合があります。WebSocket へのリクエストは WebSocket サーバにつながるサブドメイン `wss://ws.site.com` を使用し、`https://site.com` はメインの HTTP サーバはに行きます。

もちろん、他の統合方法も可能です。
