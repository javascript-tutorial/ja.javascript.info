
# Fetch: 基本

メソッド `fetch()` は HTTP 経由でリクエストを送信するモダンな方法です。

ここ数年間で進化し、現在も改善が続けられています。今のところ、サポートはブラウザの間で非常にしっかりしています。

基本構文は次の通りです:

```js
let promise = fetch(url, [options])
```

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

```js
let response = await fetch(url);

if (response.ok) { // HTTP ステータスが 200-299 の場合
  // レスポンスの本文を取得(後述)
  let json = await response.json();
} else {
  alert("HTTP-Error: " + response.status);
}
```

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
*/!*

alert(commits[0].author.login);
```

もしくは、純粋な promise 構文を使用した場合は次のようになります:

```js run
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
  .then(response => response.json())
  .then(commits => alert(commits[0].author.login));
```

テキストを取得するには:
```js
let text = await response.text();
```

また、バイナリの例では、画像を取得して表示してみましょう(blob に対する操作の詳細については、チャプター [Blob](info:blob) を参照してください)。:

```js async run
let response = await fetch('/article/fetch/logo-fetch.svg');

*!*
let blob = await response.blob(); // Blob オブジェクトとしてダウンロード
*/!*

// <img> を作成
let img = document.createElement('img');
img.style = 'position:fixed;top:10px;left:10px;width:100px';
document.body.append(img);

// 表示
img.src = URL.createObjectURL(blob);

setTimeout(() => { // 2秒後に隠す
  img.remove();
  URL.revokeObjectURL(img.src);
}, 2000);
```

````warn
本文のパース方法は1つだけ選ぶことができます。

もし `response.text()` でレスポンスを取得した後、`response.json()` は動作しません。本文のコンテンツは既に処理されているためです。

```js
let text = await response.text(); // 本文を返す
let parsed = await response.json(); // 失敗 (既に本文は処理済み)
````

## Headers

`response.headers` には、Mapライクなヘッダオブジェクトがあります。

個々のヘッダを取得したり、それらをイテレートすることができます。

```js run async
let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

// ヘッダを1つ取得
alert(response.headers.get('Content-Type')); // application/json; charset=utf-8

// すべてのヘッダをイテレート
for (let [key, value] of response.headers) {
  alert(`${key} = ${value}`);
}
```

ヘッダを設定するには、次のように `headers` オプションを使用します:

```js
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'abcdef'
  }
});
```

...しかし、設定できない [禁止された HTTP ヘッダ](https://fetch.spec.whatwg.org/#forbidden-header-name) のリストがあります。:

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

本文(body)が文字列の場合、`Content-Type` にはデフォルトでは `text/plain` が設定されることに留意してください。そのため、`application/json` を代わりに送信するために `headers` オプションを使用しています。

## form を送信する

HTML の `<form>` で同じことをしてみましょう。


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

ここで、[FormData](https://xhr.spec.whatwg.org/#formdata) は自動的に form をエンコードし、`<input type="file">` フィールドも処理され、`Content-Type: form/multipart` を使用して送信します。

## 画像を送信する

`Blob` や `BufferSource` を使用して、バイナリデータを直接送信することもできます。

例えば、ここにマウスを動かすことで描画ができる `<canvas>` があります。"submit" ボタンをクリックすると、画像をサーバに送信します。:

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

ここでも `Content-Type` を手動で設定する必要がありませんでした。なぜなら、`Blob` オブジェクトは組み込みのタイプ(`toBlob` により生成される `image/png`)を持っているからです。

`submit()` 関数はこのように `async/await` なしで書くこともできます。:

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

## 画像付きのカスタム FormData 

けれども、実際には "name" や他のメタデータといった追加のフィールドと一緒に、 form の一部として画像を送信するほうがより便利なことが多いです。

また、大抵サーバは生のバイナリデータよりもマルチパートエンコード形式を受け入れるのにより適しています。

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
