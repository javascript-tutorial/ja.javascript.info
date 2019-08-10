# XMLHttpRequest

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
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    このメソッドは通常 `new XMLHttpRequest` のすぐ後で呼ばれ、リクエストのメインのパラメータを指定します。:

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

    これら3つがもっとも広く使われています:
    - `load` -- 結果が準備できたとき。404 のような HTTP エラーを含みます。
    - `error` -- リクエストが送信できなかったとき e.g. ネットワークダウン or URL不正
    - `progress` -- ダウンロード中に定期的にトリガーされ、ダウンロードされた量が確認できます。

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

レスポンスの形式を設定するには `xhr.responseType` を使います。:

- `""` (デフォルト) -- 文字列として取得,
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

問題なく見えるかもしれませんが、同期呼び出しはめったに使われません。なぜなら読み込みが完了するまでページ内の JavaScript をブロックするからです。ブラウザによっては、スクロールができなくなります。また、同期呼び出しに時間がかかりすぎると、ブラウザは "ハングしている" web ページを閉じるよう提案することがあります。

別ドメインからのリクエストやタイムアウトの指定など、`XMLHttpRequest` の多くの高度な機能は同期リクエストでは使えません。また、ご覧の通り進行状況もありません。

したがって、同期リクエストはあまり使われないので、これ以上取り上げないでおきます。

## HTTP ヘッダ

`XMLHttpRequest` はカスタムヘッダの送信とレスポンスからのヘッダ読み取り、両方が可能です。

HTTP ヘッダに関しては3つのメソッドがあります。:

`setRequestHeader(name, value)`
: 指定された `name` と `value` のリクエストヘッダを設定します。

    例:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="ヘッダの制限"
    いくつかのヘッダはブラウザだけが管理しています。例えば、`Referer` や `Host` です。
    完全なリストは [仕様](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method) にあります。

    ユーザの安全性やリクエストの正当性の観点から、`XMLHttpRequest` ではそれらを変更することは許可されていません。  ```

    ````warn header="ヘッダを削除することはできません"
    `XMLHttpRequest` のもう一つの特徴は `setRequestHeader` を取り消すことはできないということです。

    一度ヘッダを設定すると、それが設定されます。さらなる呼び出しはヘッダへの情報の追加であり、上書きでは有りません。

    例:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // ヘッダはこうなります:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: 指定された `name` (`Set-Cookie` と `Set-Cookie2` は除く) のレスポンスヘッダを取得します。

    例:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: `Set-Cookie` と `Set-Cookie2` を除く、すべてのレスポンスヘッダを返します。

    ヘッダは次のように1行で返却されます。:

    ```
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    ヘッダ間の改行は常に `"\r\n"` です(OSに依存しません)。なので、簡単に個々のヘッダに分割することができます。名前と値のセパレータは常にコロンとそれに続くスペースです `": "`。これは仕様で決められています。

    なので、name/value のペアをもつオブジェクトを取得したい場合は少し JS が必要になります。

    例えばこのようになります(2つのヘッダの名前が同じ場合、前者のヘッダが後者のヘッダで上書きされる想定です):

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

フォームは `multipart/form-data` エンコーディングで送信されます。

あるいは、JSON を好むなら `JSON.stringify` をして、文字列として送信します。

ヘッダ `Content-Type: application/json` を設定するのを忘れないでください。多くのサーバサイド側のフレームワークはそれで自動的に JSON をデコードしいます。:

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

これは実際の例です: 進行状況を示すファイルのアップロードです:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // アップロードの進行状況を追跡します
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // 追跡完了: 成功したか失敗した
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

## クロスオリジンリクエスト

`XMLHttpRequest` は、[fetch](info:fetch-crossorigin) と同じ CORS ポシしーを使用して、クロスドメインリクエストを作ることができます。 

`fetch` のように、デフォルトでは Cookie と HTTP 認証を別のオリジンへは送信しません。有効にするには、`xhr.withCredentials` を `true` にします:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

クロスオリジンヘッダに関しての詳細はチャプター <info:fetch-crossorigin> を参照してください。

## サマリ

`XMLHttpRequest` を使用した GET リクエストの典型的なコード:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // エラー処理
    alert( 'Error: ' + xhr.status);
    return;
  }

  // xhr.response でレスポンス取得
};

xhr.onprogress = function(event) {
  // 進行状況の報告
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
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
