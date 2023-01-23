<<<<<<< HEAD
# ロングポーリング

ロングポーリング(Long polling)はサーバと永続的な接続を持つための最も簡単な方法で、WebSocket や Server Side Events などの特定のプロトコルを使いません。

実装はとても簡単であり、多くのケースもこれで十分です。

## 定期的なポーリング

サーバから新しい情報を取得するための最も簡単な方法は、ポーリングです。

つまり、サーバへの定期的なリクエストです: "こんにちは、私はここにいます。私に関してなにか新しい情報はありますか？"。例えば、10秒毎に。

応答では、サーバは最初にクライアントがオンラインであること自身に知らせて、次にその時までに受け取ったメッセージのパケットを送信します。

これは機能しますが、デメリットもあります。:
1. メッセージは最大10秒(リクエスト間隔)の遅延が発生します
2. たとえメッセージがない場合でも、サーバは10秒ごとにリクエストを受け取ります。パフォーマンス観点から見えると、これはバックエンドの処理にかなりの負荷がかかります。

そのため、非常に小さいサービスに関して話す場合にはこのアプローチは現実的ですが、一般的には改善が必要です。

## ロングポーリング

いわゆる "ロングポーリング" はサーバにポーリングするための、はるかに優れた方法です。

これも実装はとても簡単で、遅延なしでメッセージを配信します。

フローです:

1. リクエストがサーバに送信されます。
2. サーバはメッセージがあるまで接続を閉じません。
3. メッセージが現れたら、サーバはそのデータでリクエストに応答します。
4. ブラウザはすぐに新しいリクエストを作ります。

ブラウザがリクエストを送信し、サーバとの接続を保留にしている状況は、このメソッドの普通の状態です。メッセージが配信されたときだけ、接続が再確立されます。

![](long-polling.svg)

もしもネットワークエラーなどで接続が失われた場合は、ブラウザはすぐに新しいリクエストを送信します。

長いリクエストを行う、クライアント側の `subscribe` 関数の概要です。:
=======
# Long polling

Long polling is the simplest way of having persistent connection with server, that doesn't use any specific protocol like WebSocket or Server Sent Events.

Being very easy to implement, it's also good enough in a lot of cases.

## Regular Polling

The simplest way to get new information from the server is periodic polling. That is, regular requests to the server: "Hello, I'm here, do you have any information for me?". For example, once every 10 seconds.

In response, the server first takes a notice to itself that the client is online, and second - sends a packet of messages it got till that moment.

That works, but there are downsides:
1. Messages are passed with a delay up to 10 seconds (between requests).
2. Even if there are no messages, the server is bombed with requests every 10 seconds, even if the user switched somewhere else or is asleep. That's quite a load to handle, speaking performance-wise.

So, if we're talking about a very small service, the approach may be viable, but generally, it needs an improvement.

## Long polling

So-called "long polling" is a much better way to poll the server.

It's also very easy to implement, and delivers messages without delays.

The flow:

1. A request is sent to the server.
2. The server doesn't close the connection until it has a message to send.
3. When a message appears - the server responds to the request with it.
4. The browser makes a new request immediately.

The situation when the browser sent a request and has a pending connection with the server, is standard for this method. Only when a message is delivered, the connection is reestablished.

![](long-polling.svg)

If the connection is lost, because of, say, a network error, the browser immediately sends a new request.

A sketch of client-side `subscribe` function that makes long requests:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
async function subscribe() {
  let response = await fetch("/subscribe");

  if (response.status == 502) {
<<<<<<< HEAD
    // 接続タイムアウトエラー
    // 接続が長時間保留されていて、リモートサーバやプロキシがそれを閉じたときに発生する場合があります
    // 再接続しましょう
    await subscribe();
  } else if (response.status != 200) {
    // エラーを表示
    showMessage(response.statusText);
    // 1秒後に再接続します
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // メッセージを取得しました
    let message = await response.text();
    showMessage(message);
=======
    // Status 502 is a connection timeout error,
    // may happen when the connection was pending for too long,
    // and the remote server or a proxy closed it
    // let's reconnect
    await subscribe();
  } else if (response.status != 200) {
    // An error - let's show it
    showMessage(response.statusText);
    // Reconnect in one second
    await new Promise(resolve => setTimeout(resolve, 1000));
    await subscribe();
  } else {
    // Get and show the message
    let message = await response.text();
    showMessage(message);
    // Call subscribe() again to get the next message
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    await subscribe();
  }
}

subscribe();
```

<<<<<<< HEAD
ご覧の通り、`subscribe` 関数は fetch を生成し、応答を待ってから処理を行い、その後再び自身を呼び出します。

```warn header="サーバは多数の保留中の接続でもOKである必要があります"
サーバのアーキテクチャは、多数の保留中の接続があっても問題なく動作できるようにする必要があります。

特定のサーバアーキテクチャは、接続毎にプロセスを実行します。多数の接続がある場合、プロセスも多数になり、各プロセスが大量のメモリを消費します。

これは、しばしばバックエンドが PHP, Ruby で書かれたバックエンドの場合ですが、技術的には言語ではなく実装の問題です。

Node.js で書かれたバックエンドには、通常このような問題は起こりません。
```

## デモ: チャット

デモです:

[codetabs src="longpoll" height=500]

## Area of usage

ロングポーリングはメッセージがあまり来ないような状況で上手く機能します。

もしメッセージが非常に頻繁にくる場合、メッセージの送受信の図は上で描かれたような、のこぎりのようになります。

すべてのメッセージは個別のリクエストであり、それぞれがヘッダや認証のオーバヘッドなどを持ちます。

そのため、この場合は、[Websocket](info:websocket) や [Server Sent Events](info:server-sent-events) のような別の方法が推奨されています。
=======
As you can see, `subscribe` function makes a fetch, then waits for the response, handles it and calls itself again.

```warn header="Server should be ok with many pending connections"
The server architecture must be able to work with many pending connections.

Certain server architectures run one process per connection, resulting in there being as many processes as there are connections, while each process consumes quite a bit of memory. So, too many connections will just consume it all.

That's often the case for backends written in languages like PHP and Ruby.

Servers written using Node.js usually don't have such problems.

That said, it isn't a programming language issue. Most modern languages, including PHP and Ruby allow to implement a proper backend. Just please make sure that your server architecture works fine with many simultaneous connections.
```

## Demo: a chat

Here's a demo chat, you can also download it and run locally (if you're familiar with Node.js and can install modules):

[codetabs src="longpoll" height=500]

Browser code is in `browser.js`.

## Area of usage

Long polling works great in situations when messages are rare.

If messages come very often, then the chart of requesting-receiving messages, painted above, becomes saw-like.

Every message is a separate request, supplied with headers, authentication overhead, and so on.

So, in this case, another method is preferred, such as [Websocket](info:websocket) or [Server Sent Events](info:server-sent-events).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
