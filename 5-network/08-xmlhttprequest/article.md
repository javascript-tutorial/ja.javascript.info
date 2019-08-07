# XMLHttpRequest

`XMLHttpRequest` は JavaScript で HTTP リクエストを行うための組み込みのブラウザオブジェクトです。

名前に "XML" という用語を含んでいますが、XML 形式だけでなくあらゆるデータ扱うことができます。ファイルをアップロード/ダウンロードしたり、進捗を追跡など様々なことができます。

現在は `XMLHttpRequest` を若干非推奨とする、よりモダンなメソッド `fetch` があります。

モダンweb開発では、`XMLHttpRequest` は次の3つの理由で使われることがあります。:

1. 歴史的な理由: `XMLHttpRequest` をもつ既存のスクリプトをサポートする必要がある場合
2. 古いブラウザをサポートする必要があるが、 polyfill は使いたくない(e.g. スクリプトのサイズを小さくしたい)場合
3. `fetch` がまだできないことをしたい場合. e.g アップロードの進捗を追跡するなど

これらを聞いたことがありますか？もしそうなら `XMLHttpRequest` に進んでください。そうでなければ、<info:fetch> に進むのがよいでしょう。

## 基本

XMLHttpRequest には2つの操作モードがあります: 同期と非同期です。

先に、ほとんどのケースで使われる非同期を見ていきましょう。

リクエストをするためには、次の3ステップが必要です:

1. `XMLHttpRequest` を作成します:
    ```js
    let xhr = new XMLHttpRequest(); // コンストラクタは引数なし
    ```

2. 初期化をします:
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    このメソッドは通常 `new XMLHttpRequest` のすぐ後で呼ばれ、リクエストのメインのパラメータをを指定します。:

    - `method` -- HTTPメソッド. たいてい `"GET"` か `"POST"` です.
    - `URL` -- リクエストURL。文字列で、[URL](info:url) オブジェクトもOKです。
    - `async` -- 明示的に `false` が指定されている場合、リクエストは同期になります。これについては後ほど説明します。
    - `user`, `password` -- ベーシック HTTP 認証のユーザとパスワードです(必要に応じて).

    `open` 呼び出しに注意してください。その名前とは対象的に、接続をオープンするわけではありません。リクエストを設定するだけで、ネットワーク処理は `send` 呼び出しでのみ始まります。

3. それを送ります

    ```js
    xhr.send([body])
    ```

    このメソッドは接続をオープンし、リクエストをサーバに送信します。オプションの `body` パラメータにはリクエストボディが含まれます。

    `GET` のようないくつかのリクエストメソッドは body を持ちません。また `POST` などはデータをサーバに送信するのに `body` を使います。後ほど例を見ていきます。

4. 応答に対するイベントをリッスンします

    これら3つはもっとも広く使われています:
    - `load` -- 結果が準備できたとき。404 のような HTTP エラーを含みます。
    - `error` -- リクエストが送信送信できなかったとき e.g. ネットワークダウン or URL不正
    - `progress` -- ダウンロード中に定期的にトリガーされ、ダウンロードされた量をレポートします。

    ```js
    xhr.onload = function() {
      alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // リクエストがまったく送信できなかったときにだけトリガーされます。
      alert(`Network Error`);
    };

    xhr.onprogress = function(event) { // 定期的にトリガーされます
      // event.loaded - ダウンロードされたバイト
      // event.lengthComputable = サーバが Content-Length ヘッダを送信した場合は true
      // event.total - トータルのバイト数(lengthComputable が true の場合)
      alert(`Received ${event.loaded} of ${event.total}`);
    };
    ```

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

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'test me!');

// パラメータ `q` はエンコードされます
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## レスポンスタイプ

レスポンスの形式を設定するのに `xhr.responseType` を使うことができます。:

- `""` (deデフォルトfault) -- 文字列として取得,
- `"text"` -- 文字列として取得,
- `"arraybuffer"` -- `ArrayBuffer` として取得(バリナリデータに対して, チャプター  <info:arraybuffer-binary-arrays> を参照),
- `"blob"` -- `Blob`　として取得 (バイナリデータに対して, チャプター <info:blob> を参照),
- `"document"` -- XML ドキュメントとして取得 (XPath と他の XML メソッドを使うことができます),
- `"json"` -- JSON として取得 (自動的にパースされます).

例えば、JSON としてレスポンスを取得してみましょう:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// レスポンスは {"message": "Hello, world!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hello, world!
};
```

```smart
昔のスクリプトには、`xhr.responseText` や `xhr.responseXML` プロパティがあるかもしれません。

これらは、文字列や XML ドキュメントを取得するために歴史的な理由から存在しています。最近では、`xhr.responseType` で形式を設定して、上のように `xhr.response` を取得するべきです。
```

## Ready states

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
} catch(err) { // onerror の代わり
  alert("Request failed");
}
```

よく見えるかもしれませんが、同期呼び出しはめったに使われません。なぜなら読み込みが完了するまでページ内の JavaScript をブロックするからです。ブラウザによっては、スクロールができなくなります。また、同期呼び出しに時間がかかりすぎると、ブラウザは "ハングしている" web ページを閉じるよう提案することがあります。

別ドメインからのリクエストやタイムアウトの指定など、`XMLHttpRequest` の多くの高度な機能は同期リクエストでは使えません。また、ご覧の通り進行状況もありません。

そのため、同期リクエストはあまり使われません。同期リクエストについてはこれ以上取り上げないでしょう。

## HTTP ヘッダ

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peculiarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // the header will be:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});
    ```

## POST, FormData

To make a POST request, we can use the built-in [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

The syntax:

```js
let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
```

We create it, optionally from a form, `append` more fields if needed, and then:

1. `xhr.open('POST', ...)` – use `POST` method.
2. `xhr.send(formData)` to submit the form to the server.

For instance:

```html run
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

</script>
```

The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:

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

The `.send(body)` method is pretty omnivore. It can send almost everything, including `Blob` and `BufferSource` objects.

## Upload progress

The `progress` event only works on the downloading stage.

That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.

There's another object `xhr.upload`, without methods, exclusively for upload events.

The event list is similar to `xhr` events, but `xhr.upload` triggers them on uploading:

- `loadstart` -- upload started.
- `progress` -- triggers periodically during the upload.
- `abort` -- upload aborted.
- `error` -- non-HTTP error.
- `load` -- upload finished successfully.
- `timeout` -- upload timed out (if `timeout` property is set).
- `loadend` -- upload finished with either success or error.

Example of handlers:

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

Here's a real-life example: file upload with progress indication:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // track upload progress
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // track completion: both successful or not
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

## Cross-origin requests

`XMLHttpRequest` can make cross-domain requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](http://www.w3.org/TR/XMLHttpRequest/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `responseText`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the response to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
