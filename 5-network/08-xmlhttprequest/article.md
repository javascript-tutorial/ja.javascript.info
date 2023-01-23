# XMLHttpRequest

<<<<<<< HEAD
`XMLHttpRequest` は JavaScript で HTTP リクエストを行うための組み込みのブラウザオブジェクトです。

名前に "XML" という用語を含んでいますが、XML 形式だけでなくあらゆるデータ扱うことができます。ファイルをアップロード/ダウンロードしたり、進捗の追跡など様々なことができます。

現在は `XMLHttpRequest` を若干非推奨とする、よりモダンなメソッド `fetch` があります。

モダンweb開発では、`XMLHttpRequest` は次の3つの理由で使われることがあります。:

1. 歴史的な理由: `XMLHttpRequest` をもつ既存のスクリプトをサポートする必要がある場合
2. 古いブラウザをサポートする必要があるが、 polyfill は使いたくない(e.g. スクリプトのサイズを小さくしたい)場合
3. `fetch` がまだできないことをしたい場合. e.g アップロードの進捗を追跡するなど

このような要件を聞いたことがありますか？もしそうなら `XMLHttpRequest` に進んでください。そうでなければ、<info:fetch> に進むのがよいでしょう。

## 基本

XMLHttpRequest には2つの操作モードがあります: 同期と非同期です。

先に、ほとんどのケースで使われる非同期を見ていきましょう。

リクエストをするためには、次の3ステップが必要です:

1. `XMLHttpRequest` を作成します:
    ```js
    let xhr = new XMLHttpRequest(); // コンストラクタは引数なし
    ```

2. 初期化をします:
=======
`XMLHttpRequest` is a built-in browser object that allows to make HTTP requests in JavaScript.

Despite having the word "XML" in its name, it can operate on any data, not only in XML format. We can upload/download files, track progress and much more.

Right now, there's another, more modern method `fetch`, that somewhat deprecates `XMLHttpRequest`.

In modern web-development `XMLHttpRequest` is used for three reasons:

1. Historical reasons: we need to support existing scripts with `XMLHttpRequest`.
2. We need to support old browsers, and don't want polyfills (e.g. to keep scripts tiny).
3. We need something that `fetch` can't do yet, e.g. to track upload progress.

Does that sound familiar? If yes, then all right, go on with `XMLHttpRequest`. Otherwise, please head on to <info:fetch>.

## The basics

XMLHttpRequest has two modes of operation: synchronous and asynchronous.

Let's see the asynchronous first, as it's used in the majority of cases.

To do the request, we need 3 steps:

1. Create `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    The constructor has no arguments.

2. Initialize it, usually right after `new XMLHttpRequest`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

<<<<<<< HEAD
    このメソッドは通常 `new XMLHttpRequest` のすぐ後で呼ばれ、リクエストのメインのパラメータを指定します。:

    - `method` -- HTTPメソッド. たいてい `"GET"` か `"POST"` です.
    - `URL` -- リクエストURL。文字列で、[URL](info:url) オブジェクトもOKです。
    - `async` -- 明示的に `false` が指定されている場合、リクエストは同期になります。これについては後ほど説明します。
    - `user`, `password` -- ベーシック HTTP 認証のユーザとパスワードです(必要に応じて).

    `open` 呼び出しに注意してください。その名前とは対照的に、接続をオープンするわけではありません。リクエストを設定するだけで、ネットワーク処理は `send` 呼び出しでのみ始まります。

3. それを送ります
=======
    This method specifies the main parameters of the request:

    - `method` -- HTTP-method. Usually `"GET"` or `"POST"`.
    - `URL` -- the URL to request, a string, can be [URL](info:url) object.
    - `async` -- if explicitly set to `false`, then the request is synchronous, we'll cover that a bit later.
    - `user`, `password` -- login and password for basic HTTP auth (if required).

    Please note that `open` call, contrary to its name, does not open the connection. It only configures the request, but the network activity only starts with the call of `send`.

3. Send it out.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    xhr.send([body])
    ```

<<<<<<< HEAD
    このメソッドは接続をオープンし、リクエストをサーバに送信します。オプションの `body` パラメータにはリクエストボディが含まれます。

    `GET` のようないくつかのリクエストメソッドは body を持ちません。また `POST` などはデータをサーバに送信するのに `body` を使います。後ほど例を見ていきます。

4. 応答に対するイベントをリッスンします

    これら3つがもっとも広く使われています:
    - `load` -- 結果が準備できたとき。404 のような HTTP エラーを含みます。
    - `error` -- リクエストが送信できなかったとき e.g. ネットワークダウン or URL不正
    - `progress` -- ダウンロード中に定期的にトリガーされ、ダウンロードされた量が確認できます。
=======
    This method opens the connection and sends the request to server. The optional `body` parameter contains the request body.

    Some request methods like `GET` do not have a body. And some of them like `POST` use `body` to send the data to the server. We'll see examples of that later.

4. Listen to `xhr` events for response.

    These three events are the most widely used:
    - `load` -- when the request is complete (even if HTTP status is like 400 or 500), and the response is fully downloaded.
    - `error` -- when the request couldn't be made, e.g. network down or invalid URL.
    - `progress` -- triggers periodically while the response is being downloaded, reports how much has been downloaded.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

<<<<<<< HEAD
    xhr.onerror = function() { // リクエストがまったく送信できなかったときにだけトリガーされます。
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // 定期的にトリガーされます
      // event.loaded - ダウンロードされたバイト
      // event.lengthComputable = サーバが Content-Length ヘッダを送信した場合は true
      // event.total - トータルのバイト数(lengthComputable が true の場合)
=======
    xhr.onerror = function() { // only triggers if the request couldn't be made at all
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // triggers periodically
      // event.loaded - how many bytes downloaded
      // event.lengthComputable = true if the server sent Content-Length header
      // event.total - total number of bytes (if lengthComputable)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

<<<<<<< HEAD
これは完全な例です。下のコードはサーバから `/article/xmlhttprequest/example/load` のURLをロードし、進行状況を表示します。:

```js run
// 1. new XMLHttpRequest オブジェクトを作成
let xhr = new XMLHttpRequest();

// 2. 設定: URL /article/.../load に対する GET-リクエスト
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. ネットワーク経由でリクエスト送信
xhr.send();

// 4. レスポンスを受け取った後に呼び出されます
xhr.onload = function() {
  if (xhr.status != 200) { // レスポンスの HTTP ステータスを解析
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    alert(`Done, got ${xhr.response.length} bytes`); // responseText is the server
=======
Here's a full example. The code below loads the URL at `/article/xmlhttprequest/example/load` from the server and prints the progress:

```js run
// 1. Create a new XMLHttpRequest object
let xhr = new XMLHttpRequest();

// 2. Configure it: GET-request for the URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Send the request over the network
xhr.send();

// 4. This will be called after the response is received
xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
  } else { // show the result
    alert(`Done, got ${xhr.response.length} bytes`); // response is the server response
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Received ${event.loaded} of ${event.total} bytes`);
  } else {
    alert(`Received ${event.loaded} bytes`); // no Content-Length
  }

};

xhr.onerror = function() {
  alert("Request failed");
};
```

<<<<<<< HEAD
サーバーが応答すると、リクエストオブジェクトの次のプロパティで結果を受け取ることができます。:

`status`
: HTTPステータスコード(数値): `200`, `404`, `403` など。HTTP 以外の失敗の場合は `0` になります。

`statusText`
：HTTPステータスメッセージ(文字列): 通常, `200` の場合は `OK`、`404` の場合は `Not Fount`、`403` の場合は `Forbidden` など。

`response`(古いスクリプトは` responseText`を使用する場合があります)
：サーバーのレスポンス。

対応するプロパティを使用してタイムアウトを指定することもできます。:

```js
xhr.timeout = 10000; // ms でのタイムアウト, これは 10 秒
```

リクエストが指定時間内で成功しない場合はキャンセルされ、`timeout` イベントが発生します。

````smart header="URL 検索パラメータ"
`?name=value` のような URL パラメータを渡しつつ、適切なエンコーディングを保証するには、[URL](info:url) オブジェクトが使えます。:
=======
Once the server has responded, we can receive the result in the following `xhr` properties:

`status`
: HTTP status code (a number): `200`, `404`, `403` and so on, can be `0` in case of a non-HTTP failure.

`statusText`
: HTTP status message (a string): usually `OK` for `200`, `Not Found` for `404`, `Forbidden` for `403` and so on.

`response` (old scripts may use `responseText`)
: The server response body.

We can also specify a timeout using the corresponding property:

```js
xhr.timeout = 10000; // timeout in ms, 10 seconds
```

If the request does not succeed within the given time, it gets canceled and `timeout` event triggers.

````smart header="URL search parameters"
To add parameters to URL, like `?name=value`, and ensure the proper encoding, we can use [URL](info:url) object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

<<<<<<< HEAD
// パラメータ `q` はエンコードされます
=======
// the parameter 'q' is encoded
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

<<<<<<< HEAD
## レスポンスタイプ

レスポンスの形式を設定するには `xhr.responseType` を使います。:

- `""` (デフォルト) -- 文字列として取得,
- `"text"` -- 文字列として取得,
- `"arraybuffer"` -- `ArrayBuffer` として取得(バリナリデータに対して, チャプター  <info:arraybuffer-binary-arrays> を参照),
- `"blob"` -- `Blob`　として取得 (バイナリデータに対して, チャプター <info:blob> を参照),
- `"document"` -- XML ドキュメントとして取得 (XPath と他の XML メソッドを使うことができます),
- `"json"` -- JSON として取得 (自動的にパースされます).

例えば、JSON としてレスポンスを取得してみましょう:
=======
## Response Type

We can use `xhr.responseType` property to set the response format:

- `""` (default) -- get as string,
- `"text"` -- get as string,
- `"arraybuffer"` -- get as `ArrayBuffer` (for binary data, see chapter <info:arraybuffer-binary-arrays>),
- `"blob"` -- get as `Blob` (for binary data, see chapter <info:blob>),
- `"document"` -- get as XML document (can use XPath and other XML methods) or HTML document (based on the MIME type of the received data),
- `"json"` -- get as JSON (parsed automatically).

For example, let's get the response as JSON:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

<<<<<<< HEAD
// レスポンスは {"message": "Hello, world!"}
=======
// the response is {"message": "Hello, world!"}
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
<<<<<<< HEAD
昔のスクリプトには、`xhr.responseText` や `xhr.responseXML` プロパティがあるかもしれません。

これらは、文字列や XML ドキュメントを取得するために歴史的な理由から存在しています。最近では、`xhr.responseType` で形式を設定して、上のように `xhr.response` を取得するべきです。
=======
In the old scripts you may also find `xhr.responseText` and even `xhr.responseXML` properties.

They exist for historical reasons, to get either a string or XML document. Nowadays, we should set the format in `xhr.responseType` and get `xhr.response` as demonstrated above.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## Ready states

<<<<<<< HEAD
`XMLHttpRequest` は状況が進むにつれ、状態が変化します。現在の状態は `xhr.readyState` でアクセスできます。


すべての状態は [仕様](https://xhr.spec.whatwg.org/#states) にあります:

```js
UNSENT = 0; // 初期状態
OPENED = 1; // open が呼ばれた
HEADERS_RECEIVED = 2; // レスポンスヘッダを受け取った
LOADING = 3; // レスポンスはロード中
DONE = 4; // リクエスト完了
```

`XMLHttpRequest` オブジェクトは `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4` の順番で遷移します。状態 `3` はネットワーク越しにデータパケットを受け取るたびに繰り返されます。

`readystatechange` イベントを使って追跡することができます:
=======
`XMLHttpRequest` changes between states as it progresses. The current state is accessible as  `xhr.readyState`.

All states, as in [the specification](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // initial state
OPENED = 1; // open called
HEADERS_RECEIVED = 2; // response headers received
LOADING = 3; // response is loading (a data packet is received)
DONE = 4; // request complete
```

An `XMLHttpRequest` object travels them in the order `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. State `3` repeats every time a data packet is received over the network.

We can track them using `readystatechange` event:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // loading
  }
  if (xhr.readyState == 4) {
    // request finished
  }
};
```

<<<<<<< HEAD
`readystatechange` リスナーは本当に古いコードで見つけることができます。当時は `load` やその他のイベントがなかったという歴史的な理由です。

最近では `load/error/progress` ハンドラを使います。

## リクエストを中止する

リクエストはいつでも終了できます。`xhr.abort()` 呼び出しはそれを行います:

```js
xhr.abort(); // リクエストを終了する
```

これは `abort` イベントを発生させます。そして `xhr.status` は `0` になります。

## 同期リクエスト

`open` メソッドの3番目のパラメータ `async` が `false` が設定されていた場合、リクエストは同期になります。

つまり、JavaScript の実行は `send()` で止まり、レスポンスが返ってきたときに再開されます。`alert` や `prompt` コマンドにやや似ています。

これは `open` の3番目のパラメータを `false` に書き換えた例です:
=======
You can find `readystatechange` listeners in really old code, it's there for historical reasons, as there was a time when there were no `load` and other events. Nowadays, `load/error/progress` handlers deprecate it.

## Aborting request

We can terminate the request at any time. The call to `xhr.abort()` does that:

```js
xhr.abort(); // terminate the request
```

That triggers `abort` event, and `xhr.status` becomes `0`.

## Synchronous requests

If in the `open` method the third parameter `async` is set to `false`, the request is made synchronously.

In other words, JavaScript execution pauses at `send()` and resumes when the response is received. Somewhat like `alert` or `prompt` commands.

Here's the rewritten example, the 3rd parameter of `open` is `false`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
<<<<<<< HEAD
} catch(err) { // onerror の代わり
=======
} catch(err) { // instead of onerror
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert("Request failed");
}
```

<<<<<<< HEAD
問題なく見えるかもしれませんが、同期呼び出しはめったに使われません。なぜなら読み込みが完了するまでページ内の JavaScript をブロックするからです。ブラウザによっては、スクロールができなくなります。また、同期呼び出しに時間がかかりすぎると、ブラウザは "ハングしている" web ページを閉じるよう提案することがあります。

別ドメインからのリクエストやタイムアウトの指定など、`XMLHttpRequest` の多くの高度な機能は同期リクエストでは使えません。また、ご覧の通り進行状況もありません。

したがって、同期リクエストはあまり使われないので、これ以上取り上げないでおきます。

## HTTP ヘッダ

`XMLHttpRequest` はカスタムヘッダの送信とレスポンスからのヘッダ読み取り、両方が可能です。

HTTP ヘッダに関しては3つのメソッドがあります。:

`setRequestHeader(name, value)`
: 指定された `name` と `value` のリクエストヘッダを設定します。

    例:
=======
It might look good, but synchronous calls are used rarely, because they block in-page JavaScript till the loading is complete. In some browsers it becomes impossible to scroll. If a synchronous call takes too much time, the browser may suggest to close the "hanging" webpage.

Many advanced capabilities of `XMLHttpRequest`, like requesting from another domain or specifying a timeout, are unavailable for synchronous requests. Also, as you can see, no progress indication.

Because of all that, synchronous requests are used very sparingly, almost never. We won't talk about them any more.

## HTTP-headers

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

<<<<<<< HEAD
    ```warn header="ヘッダの制限"
    いくつかのヘッダはブラウザだけが管理しています。例えば、`Referer` や `Host` です。
    完全なリストは [仕様](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method) にあります。

    ユーザの安全性やリクエストの正当性の観点から、`XMLHttpRequest` ではそれらを変更することは許可されていません。  ```

    ````warn header="ヘッダを削除することはできません"
    `XMLHttpRequest` のもう一つの特徴は `setRequestHeader` を取り消すことはできないということです。

    一度ヘッダを設定すると、それが設定されます。さらなる呼び出しはヘッダへの情報の追加であり、上書きでは有りません。

    例:
=======
    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](https://xhr.spec.whatwg.org/#the-setrequestheader()-method).

    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peculiarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

<<<<<<< HEAD
    // ヘッダはこうなります:
=======
    // the header will be:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
<<<<<<< HEAD
: 指定された `name` (`Set-Cookie` と `Set-Cookie2` は除く) のレスポンスヘッダを取得します。

    例:
=======
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
<<<<<<< HEAD
: `Set-Cookie` と `Set-Cookie2` を除く、すべてのレスポンスヘッダを返します。

    ヘッダは次のように1行で返却されます。:

    ```
=======
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

<<<<<<< HEAD
    ヘッダ間の改行は常に `"\r\n"` です(OSに依存しません)。なので、簡単に個々のヘッダに分割することができます。名前と値のセパレータは常にコロンとそれに続くスペースです `": "`。これは仕様で決められています。

    なので、name/value のペアをもつオブジェクトを取得したい場合は少し JS が必要になります。

    例えばこのようになります(2つのヘッダの名前が同じ場合、前者のヘッダが後者のヘッダで上書きされる想定です):
=======
    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
<<<<<<< HEAD
=======

    // headers['Content-Type'] = 'image/png'
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```

## POST, FormData

<<<<<<< HEAD
POST リクエストをするには、組み込みの [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) オブジェクトを使います。

構文:

```js
let formData = new FormData([form]); // オブジェクトを作成します。オプションで <form> を指定します
formData.append(name, value); // フィールドを追加します
```

オプションでフォームから作成し、必要に応じて "追加" フィールドを追加します。その後:

1. `xhr.open('POST', ...)` – `POST` メソッドを使います
2. `xhr.send(formData)` で、フォームをサーバに送信します

例:

```html run
=======
To make a POST request, we can use the built-in [FormData](mdn:api/FormData) object.

The syntax:

```js
let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
```

We create it, optionally fill from a form, `append` more fields if needed, and then:

1. `xhr.open('POST', ...)` – use `POST` method.
2. `xhr.send(formData)` to submit the form to the server.

For instance:

```html run refresh
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

<<<<<<< HEAD
</script>
```

フォームは `multipart/form-data` エンコーディングで送信されます。

あるいは、JSON を好むなら `JSON.stringify` をして、文字列として送信します。

ヘッダ `Content-Type: application/json` を設定するのを忘れないでください。多くのサーバサイド側のフレームワークはそれで自動的に JSON をデコードしいます。:
=======
  xhr.onload = () => alert(xhr.response);
</script>
```

The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

<<<<<<< HEAD
`.send(body)` メソッドは非常に雑食です。`Blob` や `BufferSource` オブジェクトを含め、ほぼなんでも送信できます。


## アップロードの進行状況

`progress` イベントはダウンロードの段階でのみ機能します。

つまり: なにかを `POST` したとき、`XMLHttpRequest` は最初にデータ(リクエストボディ)をアップロードし、次にレスポンスをダウンロードします。

なにか大きなものをアップロードする場合、アップロードの進行状況を追跡することはやりたいことの一つです。ですが、`xhr.onprogress` はここでは役に立ちません。

別のオブジェクト `xhr.upload` があります。これはアップロードイベント専用でメソッドを持ちません。

イベントの一覧は `xhr` イベントに似ていますが、`xhr.upload` アップロード時にそれらを発生させます。:

- `loadstart` -- アップロード開始
- `progress` -- アップロード中、定期的に発生します
- `abort` -- アップロード中止
- `error` -- 非 HTTP エラー
- `load` -- アップロードが正常に終了
- `timeout` -- アップロードのタイムアウト(`timeout` プロパティが設定されている場合
- `loadend` -- アップロードが成功/失敗関係なく終了

ハンドラの例です:
=======
The `.send(body)` method is pretty omnivore. It can send almost any `body`, including `Blob` and `BufferSource` objects.

## Upload progress

The `progress` event triggers only on the downloading stage.

That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.

There's another object, without methods, exclusively to track upload events: `xhr.upload`.

It generates events, similar to `xhr`, but `xhr.upload` triggers them solely on uploading:

- `loadstart` -- upload started.
- `progress` -- triggers periodically during the upload.
- `abort` -- upload aborted.
- `error` -- non-HTTP error.
- `load` -- upload finished successfully.
- `timeout` -- upload timed out (if `timeout` property is set).
- `loadend` -- upload finished with either success or error.

Example of handlers:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

<<<<<<< HEAD
これは実際の例です: 進行状況を示すファイルのアップロードです:
=======
Here's a real-life example: file upload with progress indication:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

<<<<<<< HEAD
  // アップロードの進行状況を追跡します
=======
  // track upload progress
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

<<<<<<< HEAD
  // 追跡完了: 成功したか失敗した
=======
  // track completion: both successful or not
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

<<<<<<< HEAD
## クロスオリジンリクエスト

`XMLHttpRequest` は、[fetch](info:fetch-crossorigin) と同じ CORS ポシしーを使用して、クロスドメインリクエストを作ることができます。 

`fetch` のように、デフォルトでは Cookie と HTTP 認証を別のオリジンへは送信しません。有効にするには、`xhr.withCredentials` を `true` にします:
=======
## Cross-origin requests

`XMLHttpRequest` can make cross-origin requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

<<<<<<< HEAD
クロスオリジンヘッダに関しての詳細はチャプター <info:fetch-crossorigin> を参照してください。

## サマリ

`XMLHttpRequest` を使用した GET リクエストの典型的なコード:
=======
See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
<<<<<<< HEAD
    // エラー処理
=======
    // handle error
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert( 'Error: ' + xhr.status);
    return;
  }

<<<<<<< HEAD
  // xhr.response でレスポンス取得
};

xhr.onprogress = function(event) {
  // 進行状況の報告
=======
  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
<<<<<<< HEAD
  // 非 HTTP エラーの処理(e.g. ネットワークダウン)
};
```

実施にはより多くのイベントがあり、[現在の仕様](http://www.w3.org/TR/XMLHttpRequest/#events) でリストされています(ライフサイクル順):

- `loadstart` -- リクエストが開始された
- `progress` -- レスポンスのデータパケットが到着し、その時点のレスポンス本文全体は `responseText` にあります
- `abort` -- リクエストが `xhr.abort()` 呼び出しによりキャンセルされた
- `error` -- 接続エラーが発生。e.g. 間違ったドメイン名など. 404 などのHTTPエラーでは発生しません。
- `load` -- リクエストが正常に終了した
- `timeout` -- タイムアウトでリクエストがキャンセルされた(タイムアウトが設定された場合のみ)).
- `loadend` -- `load`, `error`, `timeout` or `abort` の後に発生します。.

`error`, `abort`, `timeout`, と `load` イベントは相互に排他的です。それらの1つだけが発生します。

最も使われているイベントはロード完了 (`load`), ロード失敗(`error`)です。あるいは、単一の `loadend` ハンドラを使用して何が起こったのかを確認するためにレスポンスをチェックします。

すでに別のイベント `readystatechange` を見てきました。歴史的には、仕様が定まるずっと前からありました。最近では、これを使う必要はありません。新しいイベントに置き換えることができますが、多くの場合、古いスクリプトにあります。

特にアップロードを追跡する必要がある場合は、`xhr.upload` オブジェクトで同じイベントをリッスンする必要があります。
=======
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](https://xhr.spec.whatwg.org/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `response`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the properties of the request object `xhr` to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
