
<<<<<<< HEAD
# Fetch: 基本

メソッド `fetch()` は HTTP 経由でリクエストを送信するモダンな方法です。

ここ数年間で進化し、現在も改善が続けられています。今のところ、サポートはブラウザの間で非常にしっかりしています。

基本構文は次の通りです:
=======
# Fetch: Basics

Method `fetch()` is the modern way of sending requests over HTTP.

It evolved for several years and continues to improve, right now the support is pretty solid among browsers.

The basic syntax is:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

The browser starts the request right away and returns a `promise`.

Getting a response is usually a two-stage process.

**The `promise` resolves with an object of the built-in [Response](https://fetch.spec.whatwg.org/#response-class) class as soon as the server responds with headers.**


So we can check HTTP status, to see whether it is successful or not, check headers, but don't have the body yet.

The promise rejects if the `fetch` was unable to make HTTP-request, e.g. network problems, or there's no such site. HTTP-errors, even such as 404 or 500, are considered a normal flow.

We can see them in response properties:

- **`ok`** -- boolean, `true` if the HTTP status code is 200-299.
- **`status`** -- HTTP status code.

For example:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js
let response = await fetch(url);

<<<<<<< HEAD
if (response.ok) { // HTTP ステータスが 200-299 の場合
  // レスポンスの本文を取得(後述)
=======
if (response.ok) { // if HTTP-status is 200-299
  // get the response body (see below)
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
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
=======
To get the response body, we need to use an additional method call.

`Response` provides multiple promise-based methods to access the body in various formats:

- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as FormData object (form/multipart encoding),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),
- additionally, `response.body` is a [ReadableStream](https://streams.spec.whatwg.org/#rs-class) object, it allows to read the body chunk-by-chunk, we'll see an example later.

For instance, here we get a JSON-object with latest commits from GitHub:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

*!*
<<<<<<< HEAD
let commits = await response.json(); // レスポンスの本文を読み JSON としてパースする
=======
let commits = await response.json(); // read response body and parse as JSON
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
*/!*

alert(commits[0].author.login);
```

<<<<<<< HEAD
もしくは、純粋な promise 構文を使用した場合は次のようになります:
=======
Or, the same using pure promises syntax:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

<<<<<<< HEAD
テキストを取得するには:
=======
To get the text:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```js
let text = await response.text();
```

<<<<<<< HEAD
また、バイナリの例では、画像を取得して表示してみましょう(blob に対する操作の詳細については、チャプター [Blob](info:blob) を参照してください)。:
=======
And for the binary example, let's fetch and show an image (see chapter [Blob](info:blob) for details about operations on blobs):
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

<<<<<<< HEAD
// 表示
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 2秒後に隠す
=======
// show it
img.src = URL.createObjectURL(blob);

setTimeout(() => { // hide after two seconds
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
```

````warn
<<<<<<< HEAD
本文のパース方法は1つだけ選ぶことができます。

もし `response.text()` でレスポンスを取得した後、`response.json()` は動作しません。本文のコンテンツは既に処理されているためです。

```js
let text = await response.text(); // 本文を返す
let parsed = await response.json(); // 失敗 (既に本文は処理済み)
=======
We can choose only one body-parsing method.

If we got the response with `response.text()`, then `response.json()` won't work, as the body content has already been processed.

```js
let text = await response.text(); // response body consumed
let parsed = await response.json(); // fails (already consumed)
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
````

## Headers

<<<<<<< HEAD
`response.headers` には、Mapライクなヘッダオブジェクトがあります。

個々のヘッダを取得したり、それらをイテレートすることができます。
=======
There's a Map-like headers object in `response.headers`.

We can get individual headers or iterate over them:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

<<<<<<< HEAD
ヘッダを設定するには、次のように `headers` オプションを使用します:
=======
To set a header, we can use the `headers` option, like this:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

<<<<<<< HEAD
...しかし、設定できない [禁止された HTTP ヘッダ](https://fetch.spec.whatwg.org/#forbidden-header-name) のリストがあります。:
=======
...But there's a list of [forbidden HTTP headers](https://fetch.spec.whatwg.org/#forbidden-header-name) that we can't set:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

例を見てみましょう。

## JSON を送信する

このコードは、`user` オブジェクトを JSON としてサブミットします。:
=======
These headers ensure proper and safe HTTP, so they are controlled exclusively by the browser.

## POST requests

To make a `POST` request, or a request with another method, we need to use `fetch` options:

- **`method`** -- HTTP-method, e.g. `POST`,
- **`body`** -- one of:
  - a string (e.g. JSON),
  - `FormData` object, to submit the data as `form/multipart`,
  - `Blob`/`BufferSource` to send binary data,
  - [URLSearchParams](info:url), to submit the data as `x-www-form-urlencoded`, rarely used.

Let's see examples.

## Submit JSON

This code submits a `user` object as JSON:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js run async
let user = {
  name: 'John',
  surname: 'Smith'
};

*!*
let response = await fetch('/article/fetch-basics/post/user', {
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

## form を送信する

HTML の `<form>` で同じことをしてみましょう。
=======
Please note, if the body is a string, then `Content-Type` is set to `text/plain;charset=UTF-8` by default. So we use `headers` option to send `application/json` instead.

## Submit a form

Let's do the same with an HTML `<form>`.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb


```html run
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
</form>

<script>
(async () => {
  let response = await fetch('/article/fetch-basics/post/user', {
    method: 'POST',
*!*
    body: new FormData(formElem)
*/!*
  });

  let result = await response.json();

  alert(result.message);
})();
</script>
```

<<<<<<< HEAD
ここで、[FormData](https://xhr.spec.whatwg.org/#formdata) は自動的に form をエンコードし、`<input type="file">` フィールドも処理され、`Content-Type: form/multipart` を使用して送信します。

## 画像を送信する

`Blob` や `BufferSource` を使用して、バイナリデータを直接送信することもできます。

例えば、ここにマウスを動かすことで描画ができる `<canvas>` があります。"submit" ボタンをクリックすると、画像をサーバに送信します。:
=======
Here [FormData](https://xhr.spec.whatwg.org/#formdata) automatically encodes the form, `<input type="file">` fields are handled also, and sends it using `Content-Type: form/multipart`.

## Submit an image

We can also submit binary data directly using `Blob` or `BufferSource`.

For example, here's a `<canvas>` where we can draw by moving a mouse. A click on the "submit" button sends the image to server:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
      let response = await fetch('/article/fetch-basics/post/image', {
        method: 'POST',
        body: blob
      });
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
Here we also didn't need to set `Content-Type` manually, because a `Blob` object has a built-in type (here `image/png`, as generated by `toBlob`).

The `submit()` function can be rewritten without `async/await` like this:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

```js
function submit() {
  canvasElem.toBlob(function(blob) {        
    fetch('/article/fetch-basics/post/image', {
      method: 'POST',
      body: blob
    })
      .then(response => response.json())
      .then(result => alert(JSON.stringify(result, null, 2)))
  }, 'image/png');
}
```

<<<<<<< HEAD
## 画像付きのカスタム FormData 

けれども、実際には "name" や他のメタデータといった追加のフィールドと一緒に、 form の一部として画像を送信するほうがより便利なことが多いです。

また、大抵サーバは生のバイナリデータよりもマルチパートエンコード形式を受け入れるのにより適しています。
=======
## Custom FormData with image

In practice though, it's often more convenient to send an image as a part of the form, with additional fields, such as "name" and other metadata.

Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

*!*
      let formData = new FormData();
      formData.append("name", "myImage");
      formData.append("image", blob);
*/!*    

      let response = await fetch('/article/fetch-basics/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

<<<<<<< HEAD
これで、サーバの観点からは、画像は form 中の "ファイル" です。

## サマリ

典型的な fetch リクエストは２つの `await` から成ります:

```js
let response = await fetch(url, options); // レスポンスヘッダで resolve する
let result = await response.json(); // 本文を json として読む
```

もしくは、primise を使った書き方:
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
Now, from the server standpoint, the image is a "file" in the form.

## Summary

A typical fetch request consists of two `awaits`:

```js
let response = await fetch(url, options); // resolves with response headers
let result = await response.json(); // read body as json
```

Or, promise-style:
```js
fetch(url, options)
  .then(response => response.json())
  .then(result => /* process result */)
```

Response properties:
- `response.status` -- HTTP code of the response,
- `response.ok` -- `true` is the status is 200-299.
- `response.headers` -- Map-like object with HTTP headers.

Methods to get response body:
- **`response.json()`** -- parse the response as JSON object,
- **`response.text()`** -- return the response as text,
- **`response.formData()`** -- return the response as FormData object (form/multipart encoding),
- **`response.blob()`** -- return the response as [Blob](info:blob) (binary data with type),
- **`response.arrayBuffer()`** -- return the response as [ArrayBuffer](info:arraybuffer-binary-arrays) (pure binary data),

Fetch options so far:
- `method` -- HTTP-method,
- `headers` -- an object with request headers (not any header is allowed),
- `body` -- string/FormData/BufferSource/Blob/UrlSearchParams data to submit.

In the next chapters we'll see more options and use cases.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
