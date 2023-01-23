
# Fetch

<<<<<<< HEAD
JavaScript は、必要に応じていつでもサーバへリクエストを送信し、新しい情報を読み込むことができます。

例えば、次のようなことができます:

- 注文を送信する
- ユーザ情報を読み込む
- サーバから最新の更新情報を受け取る
- ...など

...そしてこれらはすべてページをリロードすることなく行うことができます。

それを表す包括的な用語 "AJAX" (<b>A</b>synchronous <b>J</b>avascript <b>A</b>nd <b>X</b>ml)があります。XML を使う必要はありません: この用語は昔から来ています。

ネットワークリクエストを送信し、サーバから情報を取得するための様々な方法があります。

`fetch()` メソッドはモダンで多目的に利用できるため、これから始めましょう。`fetch` は数年間進化と改善を続けています。今のところサポートはブラウザの間でとてもしっかりしています。

基本構文は次の通りです:
=======
JavaScript can send network requests to the server and load new information whenever it's needed.

For example, we can use a network request to:

- Submit an order,
- Load user information,
- Receive latest updates from the server,
- ...etc.

...And all of that without reloading the page!

There's an umbrella term "AJAX" (abbreviated <b>A</b>synchronous <b>J</b>avaScript <b>A</b>nd <b>X</b>ML) for network requests from JavaScript. We don't have to use XML though: the term comes from old times, that's why that word is there. You may have heard that term already.

There are multiple ways to send a network request and get information from the server.

The `fetch()` method is modern and versatile, so we'll start with it. It's not supported by old browsers (can be polyfilled), but very well supported among the modern ones.

The basic syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = fetch(url, [options])
```

<<<<<<< HEAD
- **`url`** -- アクセスする URL
- **`options`** -- オプションのパラメータ: メソッドやヘッダなど

ブラウザはすぐにリクエストを開始し、`promise` を返します。

レスポンスの取得は通常2段階のプロセスになります。

**`promise` は、サーバがヘッダを応答するとすぐに組み込みの [Response](https://fetch.spec.whatwg.org/#response-class) クラスのオブジェクトで resolve します。**

そのため、HTTP ステータスをチェックすることで、リクエストが成功したのか失敗したのかを確認したり、ヘッダをチェックすることができます。が、まだ本文は持っていません。

promise は `fetch` が HTTP リクエストを作るすることができなかった場合、例えば ネットワークの問題やそのようなサイトがない場合に reject します。404 や 500 のような HTTP エラーも通常のフローとみなされます。

レスポンスのプロパティでそれらを確認することができます。:

- **`ok`** -- boolean, HTTP ステータスコードが 200-299 の場合 `true` です。
- **`status`** -- HTTP ステータスコード.

例:
=======
- **`url`** -- the URL to access.
- **`options`** -- optional parameters: method, headers etc.

Without `options`, this is a simple GET request, downloading the contents of the `url`.

The browser starts the request right away and returns a promise that the calling code should use to get the result.

Getting a response is usually a two-stage process.

**First, the `promise`, returned by `fetch`, resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**

At this stage we can check HTTP status, to see whether it is successful or not, check headers, but don't have the body yet.

The promise rejects if the `fetch` was unable to make HTTP-request, e.g. network problems, or there's no such site. Abnormal HTTP-statuses, such as 404 or 500 do not cause an error.

We can see HTTP-status in response properties:

- **`status`** -- HTTP status code, e.g. 200.
- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let response = await fetch(url);

<<<<<<< HEAD
if (response.ok) { // HTTP ステータスが 200-299 の場合
  // レスポンスの本文を取得(後述)
=======
if (response.ok) { // if HTTP-status is 200-299
  // get the response body (the method explained below)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

<<<<<<< HEAD
レスポンスの本文を取得するには、追加のメソッド呼び出しが必要です。

`Response` は様々な形式で本文にアクセスするための、複数の promise ベースのメソッドを提供しています。:

- **`response.json()`** -- レスポンスを JSON オブジェクトとしてパースします
- **`response.text()`** -- レスポンスをテキストとして返します
- **`response.formData()`** -- FormData オブジェクト(form/multipart encoding) として返します,
- **`response.blob()`** -- [Blob](info:blob) (型付きのバイナリデータ) としてレスポンスを返します,
- **`response.arrayBuffer()`** -- [ArrayBuffer](info:arraybuffer-binary-arrays) (純粋なバイナリデータ) としてレスポンスを返します,
- 加えて, `response.body` は [ReadableStream](https://streams.spec.whatwg.org/#rs-class) オブジェクトで、本文をチャンク毎に読むことができます。後ほど例を見ていきましょう。

例えば、ここでは Github から最新のコミットの JSON オブジェクトを取得します。:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
let commits = await response.json(); // レスポンスの本文を読み JSON としてパースする
=======
**Second, to get the response body, we need to use an additional method call.**

`Response` provides multiple promise-based methods to access the body in various formats:

- **`response.text()`** -- read the response and return as text,
- **`response.json()`** -- parse the response as JSON,
- **`response.formData()`** -- return the response as `FormData` object (explained in the [next chapter](info:formdata)),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level representation of binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows you to read the body chunk-by-chunk, we'll see an example later.

For instance, let's get a JSON-object with latest commits from GitHub:

```js run async
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

*!*
let commits = await response.json(); // read response body and parse as JSON
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*

alert(commits[0].author.login);
```

<<<<<<< HEAD
もしくは、純粋な promise 構文を使用した場合は次のようになります:
=======
Or, the same without `await`, using pure promises syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

<<<<<<< HEAD
テキストを取得するには:
```js
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // レスポンスボディをテキストとして読む
=======
To get the response text, `await response.text()` instead of `.json()`:

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

let text = await response.text(); // read response body as text
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert(text.slice(0, 80) + '...');
```

<<<<<<< HEAD
また、バイナリの例では、画像を取得して表示してみましょう(blob に対する操作の詳細については、チャプター [Blob](info:blob) を参照してください)。:
=======
As a show-case for reading in binary format, let's fetch and show a logo image of ["fetch" specification](https://fetch.spec.whatwg.org) (see chapter [Blob](info:blob) for details about operations on `Blob`):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
<<<<<<< HEAD
let blob = await response.blob(); // Blob オブジェクトとしてダウンロード
*/!*

// <img> を作成
=======
let blob = await response.blob(); // download as Blob object
*/!*

// create <img> for it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

<<<<<<< HEAD
// 表示
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 3秒後に隠す
=======
// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after three seconds
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  img.remove();
  URL.revokeObjectURL(img.src);
}, 3000);
```

````warn
<<<<<<< HEAD
本文のパース方法は1つだけ選ぶことができます。

もし `response.text()` でレスポンスを取得した後、`response.json()` は動作しません。本文のコンテンツは既に処理されているためです。

```js
let text = await response.text(); // 本文を返す
let parsed = await response.json(); // 失敗 (既に本文は処理済み)
````

## Headers

`response.headers` には、Mapライクなヘッダオブジェクトがあります。

個々のヘッダを取得したり、それらをイテレートすることができます。
=======
We can choose only one body-reading method.

If we've already got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.

```js
let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
```
````

## Response headers

The response headers are available in a Map-like headers object in `response.headers`.

It's not exactly a Map, but it has similar methods to get individual headers by name or iterate over them:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

<<<<<<< HEAD
// ヘッダを1つ取得
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// すべてのヘッダをイテレート
=======
// get one header
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// iterate over all headers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

<<<<<<< HEAD
ヘッダを設定するには、次のように `headers` オプションを使用します:
=======
## Request headers

To set a request header in `fetch`, we can use the `headers` option. It has an object with outgoing headers, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let response = fetch(protectedUrl, {
  headers: {
<<<<<<< HEAD
    Authentication: 'abcdef'
=======
    Authentication: 'secret'
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
});
```

<<<<<<< HEAD
...しかし、設定できない [禁止された HTTP ヘッダ](https://fetch.spec.whatwg.org/#forbidden-header-name) のリストがあります。:
=======
...But there's a list of [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name) that we can't set:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `Accept-Charset`, `Accept-Encoding`
- `Access-Control-Request-Headers`
- `Access-Control-Request-Method`
- `Connection`
- `Content-Length`
- `Cookie`, `Cookie2`
- `Date`
- `DNT`
- `Expect`
- `Host`
- `Keep-Alive`
- `Origin`
- `Referer`
- `TE`
- `Trailer`
- `Transfer-Encoding`
- `Upgrade`
- `Via`
- `Proxy-*`
- `Sec-*`

<<<<<<< HEAD
これらのヘッダは適切で安全な HTTP を保証するため、ブラウザによってのみ制御されます。

## POST リクエスト

`POST`、もしくは他のメソッドを使ったリクエストを行うには、`fetch` のオプションを利用します:

- **`method`** -- HTTP メソッド, e.g. `POST`,
- **`body`** -- 次のいずれか:
  - 文字列 (e.g. JSON),
  - `FormData` オブジェクト, `form/multipart` としてデータを送信する場合,
  - `Blob`/`BufferSource` バイナリデータを送信する場合,
  - [URLSearchParams](info:url), `x-www-form-urlencoded` としてデータを送信する場合。ほとんど使われません。

例を見てみましょう。このコードは、`user` オブジェクトを JSON として送信します。:
=======
These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

## POST requests

To make a `POST` request, or a request with another method, we need to use `fetch` options:

- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- the request body, one of:
  - a string (e.g. JSON-encoded),
  - `FormData` object, to submit the data as `multipart/form-data`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data in `x-www-form-urlencoded` encoding, rarely used.

The JSON format is used most of the time.

For example, this code submits `user` object as JSON:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
<<<<<<< HEAD
let response = await fetch('/article/fetch-basics/post/user', {
=======
let response = await fetch('/article/fetch/post/user', {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});
*/!*

let result = await response.json();
alert(result.message);
```

<<<<<<< HEAD
本文(body)が文字列の場合、`Content-Type` にはデフォルトでは `text/plain` が設定されることに留意してください。そのため、`application/json` を代わりに送信するために `headers` オプションを使用しています。

## 画像を送信する

`Blob` や `BufferSource` を使用して、バイナリデータを直接送信することもできます。

例えば、ここにマウスを動かすことで描画ができる `<canvas>` があります。"submit" ボタンをクリックすると、画像をサーバに送信します。:
=======
Please note, if the request `body` is a string, then `Content-Type` header is set to `text/plain;charset=UTF-8` by default.

But, as we're going to send JSON, we use `headers` option to send `application/json` instead, the correct `Content-Type` for JSON-encoded data.

## Sending an image

We can also submit binary data with `fetch` using `Blob` or `BufferSource` objects.

In this example, there's a `<canvas>` where we can draw by moving a mouse over it. A click on the "submit" button sends the image to the server:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
<<<<<<< HEAD
      let response = await fetch('/article/fetch-basics/post/image', {
        method: 'POST',
        body: blob
      });
=======
      let response = await fetch('/article/fetch/post/image', {
        method: 'POST',
        body: blob
      });

      // the server responds with confirmation and the image size
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

<<<<<<< HEAD
ここでも `Content-Type` を手動で設定する必要がありませんでした。なぜなら、`Blob` オブジェクトは組み込みのタイプ(`toBlob` により生成される `image/png`)を持っているからです。

`submit()` 関数はこのように `async/await` なしで書くこともできます。:
=======
Please note, here we don't set `Content-Type` header manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`). For `Blob` objects that type becomes the value of `Content-Type`.

The `submit()` function can be rewritten without `async/await` like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
<<<<<<< HEAD
    fetch('/article/fetch-basics/post/image', {
=======
    fetch('/article/fetch/post/image', {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

<<<<<<< HEAD

## サマリ

典型的な fetch リクエストは２つの `await` から成ります:

```js
let response = await fetch(url, options); // レスポンスヘッダで resolve する
let result = await response.json(); // 本文を json として読む
```

もしくは、promise を使った書き方:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* result を処理する */)
```

レスポンスのプロパティ:
- `response.status` -- レスポンスの HTTP コード,
- `response.ok` -- ステータスが 200-299 の場合 `true`
- `response.headers` -- HTTP ヘッダを持つ Mapライクなオブジェクト

レスポンス本文を取得するメソッド:
- **`response.json()`** -- レスポンスを JSON オブジェクトとしてパースする,
- **`response.text()`** -- レスポンスをテキストとして返す,
- **`response.formData()`** -- FormData オブジェクト(form/multipart encoding) として返す,
- **`response.blob()`** -- [Blob](info:blob) (型付きのバイナリデータ) としてレスポンスを返す,
- **`response.arrayBuffer()`** -- [ArrayBuffer](info:arraybuffer-binary-arrays) (純粋なバイナリデータ) としてレスポンスを返す,

これまでのところ、fetch オプションは次の通りです:
- `method` -- HTTP メソッド,
- `headers` -- リクエストヘッダを持つオブジェクト(どんなヘッダも許可されるわけではありません),
- `body` -- サブミットする string/FormData/BufferSource/Blob/UrlSearchParams データ。

次のチャプターでは、より多くのオプションとユースケースを見ていきます。
=======
## Summary

A typical fetch request consists of two `await` calls:

```js
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```

Or, without `await`:

```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` if the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.text()`** -- return the response as text,
- **`response.json()`** -- parse the response as JSON object,
- **`response.formData()`** -- return the response as `FormData` object (`multipart/form-data` encoding, see the next chapter),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (low-level binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- the data to send (request body) as `string`, `FormData`, `BufferSource`, `Blob` or `UrlSearchParams` object.

In the next chapters we'll see more options and use cases of `fetch`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
