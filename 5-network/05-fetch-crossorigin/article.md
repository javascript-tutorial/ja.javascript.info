<<<<<<< HEAD
# Fetch: クロスオリジン(Cross-Origin) リクエスト

もし任意の web サイトから `fetch` を行った場合、そのリクエストは恐らく失敗するでしょう。

ここで中心となる概念は *オリジン* -- ドメイン/ポート/プロトコルの３つ揃いです。 

クロスオリジンリクエスト(これらは別のドメイン(サブドメインも)、プロトコル、あるいはポートに送信されたもの)には、リモート側からの特別なヘッダが必要です。そのポリシーは "CORS" (Cross-Origin Resource Sharing) と呼ばれています。

例えば、`http://example.com` へのフェッチをしてみましょう。:
=======
# Fetch: Cross-Origin Requests

If we send a `fetch` request to another web-site, it will probably fail.

For instance, let's try fetching `http://example.com`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

<<<<<<< HEAD
予想通り、fetch は失敗します。

## なぜ?

なぜなら、クロスオリジン制約が悪意のあるハッカーからインターネットを保護するからです。

脱線しますが、簡単に歴史的な背景を振り返りましょう。

長い間、JavaScript はネットワークリクエストを実行するための特別なメソッドを持っていませんでした。

**あるサイトのスクリプトが別のサイトのコンテンツへアクセスすることはできませんでした。**

このシンプルだけど強力なルールはインターネットセキュリティの基盤でした。例えば、ページ `hacker.com` のスクリプトは `gmail.com` にあるユーザのメールボックにはアクセスできませんでした。ユーザはそれを安全と思いました。

しかし、web 開発者はより強力な力を求めました。そしてそれを回避するための様々なトリックが考案されました。

別のサーバとやり取りする方法の１つは、そこに `<form>` を送信することでした。次のように、現在のページに留まるために `<iframe>` に送信しました。:

```html
<!-- form target -->
<iframe name="iframe"></iframe>

<!-- JavaScript により form は動的に生成され、サブミットされました -->
<form target="iframe" method="POST" action="http://another.com/…">
  ...
</form>

```

- これにより、ネットワーキングのメソッドがなくても、別のサイトへ GET/POST リクエストを送ることは可能でした。
- しかし、別のサイトから `<iframe>` のコンテンツにアクセスすることは禁止されているので、レスポンスを読むことはできませんでした。

したがって、`<form>` はどこにでもデータをサブミットすることを可能にしましたが、レスポンスのコンテンツにはアクセスできませんでした。

別の方法は `<script src="http://another.com/…">` タグを使用することでした。スクリプトは任意のドメインの `src` を持つことができます。しかし、改めて -- このようなスクリプトの生のコンテンツにアクセスすることは不可能でした。

もし `another.com` がこのような種類のアクセスに対してデータを公開するつもりだった場合、いわゆる "JSONP (JSPN with padding)" プロトコルが使われました。

これはそのフローです:

1. まず、事前に e.g. `gotWeather` のような、データを受け取るためのグローバル関数を宣言します。
2. 次に `<script>` を作り、その名前を `callback` クエリーパラメータとして渡します。e.g. `src="http://another.com/weather.json?callback=gotWeather"`.
3. リモートサーバは、データを `gotWeather(...)` 呼び出しにラップするようなレスポンスを動的に生成します。
4. スクリプトが実行されると、`gotWeather` が実行されデータが得られます。

これは JSONP でデータを受け取るコードの例です:

```js run
// 1. データを処理する関数を宣言します
function gotWeather({ temperature, humidity }) {
  alert(`temperature: ${temperature}, humidity: ${humidity}`);
}

// 2. スクリプトに対して、?callback パラメータとしてその名前を渡します
let script = document.createElement('script');
script.src = `https://cors.javascript.info/article/fetch-crossorigin/demo/script?callback=gotWeather`;
document.body.append(script);

// 3. サーバから期待する応答は次のようになります:
/*
gotWeather({
  temperature: 25,
  humidity: 78
});
*/
```

これは動作し、セキュリティにも違反しません。なぜなら、双方がこの方法でデータを渡すことに合意しているからです。双方が合意するときはハックではありません。これは非常に古いブラウザでも動作するため、このようなアクセスを提供するサービスはまだ存在します。

しばらくすると、現在のネットワークメソッドが登場しました。当初はクロスオリジンリクエストは禁止されていました。しかし、長い議論の結果、サーバによって明示的に許可されている場合に限り、クロスオリジンリクエストは許可されました。

## 単純リクエスト(Simple requests)

[Simple requests](http://www.w3.org/TR/cors/#terminology) は次の条件を満たす必要があります。:

1. [Simple method](http://www.w3.org/TR/cors/#simple-method): GET, POST または HEAD
2. [Simple headers](http://www.w3.org/TR/cors/#simple-header) -- 許可されているものだけ(以下):
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - 値が `application/x-www-form-urlencoded`, `multipart/form-data` あるいは `text/plain` の `Content-Type`.

その他のリクエストは "単純ではない(non-simple)" とみなされます。例えば、`PUT` メソッドや、 `API-Key` HTTP ヘッダを持つリクエストはこれに限りません。

**本質的な違いは、"単純リクエスト" は、特別な方法を使うことなく `<form>` または `<script>` を使って作成することができることです。**

そのため、たとえ非常に古いサーバでも、単純リクエストを受け入れる準備ができているはずです。

逆に、非標準のヘッダ、あるいは例えば `DELETE` メソッドのリクエストはこの方法では作ることはできません。長い間、JavaScript はこのようなリクエストを行うことができませんでした。なので、古いサーバは、そのようなリクエストは特権のある送信元から来たものであると想定する場合があります(web ページではそのようなリクエストは送信できないため)。

単純でないリクエストをしようとすろと、ブラウザは特別な "preflight" リクエストを送信します。これは、サーバにこのようなクロスオリジンリクエストを受け入れることに同意するか否かを尋ねるものです。

そして、サーバがヘッダで明示的にそれを確認しない限り、単純でないリクエストは送信されません。

それでは詳細に進みましょう。これらはすべて1つの目的のためにあります。それは、新しいクロスオリジンの機能がサーバからの明示的な許可がある場合にのみアクセス可能であることを保証するためです。

## 単純リクエストに対する CORS

リクエストがクロスオリジンである場合、ブラウザは常に `Origin` ヘッダを追加します。

例えば、`https://javascript.info/page` から `https://anywhere.com/request` にリクエストを行う場合、ヘッダは次のようになるでしょう:

```
=======
Fetch fails, as expected.

The core concept here is *origin* -- a domain/port/protocol triplet.

Cross-origin requests -- those sent to another domain (even a subdomain) or protocol or port -- require special headers from the remote side.

That policy is called "CORS": Cross-Origin Resource Sharing.

## Why is CORS needed? A brief history

CORS exists to protect the internet from evil hackers.

Seriously. Let's make a very brief historical digression.

**For many years a script from one site could not access the content of another site.**

That simple, yet powerful rule was a foundation of the internet security. E.g. an evil script from website `hacker.com` could not access the user's mailbox at website `gmail.com`. People felt safe.

JavaScript also did not have any special methods to perform network requests at that time. It was a toy language to decorate a web page.

But web developers demanded more power. A variety of tricks were invented to work around the limitation and make requests to other websites.

### Using forms

One way to communicate with another server was to submit a `<form>` there. People submitted it into `<iframe>`, just to stay on the current page, like this:

```html
<!-- form target -->
*!*
<iframe name="iframe"></iframe>
*/!*

<!-- a form could be dynamically generated and submitted by JavaScript -->
*!*
<form target="iframe" method="POST" action="http://another.com/…">
*/!*
  ...
</form>
```

So, it was possible to make a GET/POST request to another site, even without networking methods, as forms can send data anywhere. But as it's forbidden to access the content of an `<iframe>` from another site, it wasn't possible to read the response.

To be precise, there were actually tricks for that, they required special scripts at both the iframe and the page. So the communication with the iframe was technically possible. Right now there's no point to go into details, let these dinosaurs rest in peace.

### Using scripts

Another trick was to use a `script` tag. A script could have any `src`, with any domain, like `<script src="http://another.com/…">`. It's possible to execute a script from any website.

If a website, e.g. `another.com` intended to expose data for this kind of access, then a so-called "JSONP (JSON with padding)" protocol was used.

Here's how it worked.

Let's say we, at our site, need to get the data from `http://another.com`, such as the weather:

1. First, in advance, we declare a global function to accept the data, e.g. `gotWeather`.

    ```js
    // 1. Declare the function to process the weather data
    function gotWeather({ temperature, humidity }) {
      alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }
    ```
2. Then we make a `<script>` tag with `src="http://another.com/weather.json?callback=gotWeather"`, using the name of our function as the `callback` URL-parameter.

    ```js
    let script = document.createElement('script');
    script.src = `http://another.com/weather.json?callback=gotWeather`;
    document.body.append(script);
    ```
3. The remote server `another.com` dynamically generates a script that calls `gotWeather(...)` with the data it wants us to receive.
    ```js
    // The expected answer from the server looks like this:
    gotWeather({
      temperature: 25,
      humidity: 78
    });
    ```
4. When the remote script loads and executes, `gotWeather` runs, and, as it's our function, we have the data.

That works, and doesn't violate security, because both sides agreed to pass the data this way. And, when both sides agree, it's definitely not a hack. There are still services that provide such access, as it works even for very old browsers.

After a while, networking methods appeared in browser JavaScript.

At first, cross-origin requests were forbidden. But as a result of long discussions, cross-origin requests were allowed, but with any new capabilities requiring an explicit allowance by the server, expressed in special headers.

## Safe requests

There are two types of cross-origin requests:

1. Safe requests.
2. All the others.

Safe Requests are simpler to make, so let's start with them.

A request is safe if it satisfies two conditions:

1. [Safe method](https://fetch.spec.whatwg.org/#cors-safelisted-method): GET, POST or HEAD
2. [Safe headers](https://fetch.spec.whatwg.org/#cors-safelisted-request-header) -- the only allowed custom headers are:
    - `Accept`,
    - `Accept-Language`,
    - `Content-Language`,
    - `Content-Type` with the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

Any other request is considered "unsafe". For instance, a request with `PUT` method or with an `API-Key` HTTP-header does not fit the limitations.

**The essential difference is that a safe request can be made with a `<form>` or a `<script>`, without any special methods.**

So, even a very old server should be ready to accept a safe request.

Contrary to that, requests with non-standard headers or e.g. method `DELETE` can't be created this way. For a long time JavaScript was unable to do such requests. So an old server may assume that such requests come from a privileged source, "because a webpage is unable to send them".

When we try to make a unsafe request, the browser sends a special "preflight" request that asks the server -- does it agree to accept such cross-origin requests, or not?

And, unless the server explicitly confirms that with headers, an unsafe request is not sent.

Now we'll go into details.

## CORS for safe requests

If a request is cross-origin, the browser always adds the `Origin` header to it.

For instance, if we request `https://anywhere.com/request` from `https://javascript.info/page`, the headers will look like:

```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

<<<<<<< HEAD
ご覧の通り、`Origin` はパスなしの正確なオリジン(ドメイン/プロトコル/ポート)を含みます。

サーバは `Origin` を検査することができ、このようなリクエストを受け入れることに同意すると、レスポンスに `Access-Control-Allow-Origin` という特別なヘッダを追加します。このヘッダは許可されたオリジン(このケースでは `https://javascript.info`)、あるいはアスタリスク `*` を含む必要があります。そして応答は成功します。そうでなければエラーになります。

ブラウザはここでは信頼された仲介者の役割を果たします。:
1. 正しい `Origin` がクロスドメインリクエストと一緒に送信されることを保証します。
2. レスポンスの中で正しい `Access-Control-Allow-Origin` を確認すると、次は JavaScript アクセス、そうでなければエラーと共に禁止します。

![](xhr-another-domain.svg)

これは "受け入れに同意した" 応答の例です:
```
=======
As you can see, the `Origin` header contains exactly the origin (domain/protocol/port), without a path.

The server can inspect the `Origin` and, if it agrees to accept such a request, add a special header `Access-Control-Allow-Origin` to the response. That header should contain the allowed origin (in our case `https://javascript.info`), or a star `*`. Then the response is successful, otherwise it's an error.

The browser plays the role of a trusted mediator here:
1. It ensures that the correct `Origin` is sent with a cross-origin request.
2. It checks for permitting `Access-Control-Allow-Origin` in the response, if it exists, then JavaScript is allowed to access the response, otherwise it fails with an error.

![](xhr-another-domain.svg)

Here's an example of a permissive server response:
```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

<<<<<<< HEAD
## レスポンスヘッダ

クロスオリジンリクエストの場合、デフォルトでは JavaScript は "単純レスポンスヘッダ" にしかアクセスできません。:

- `Cache-Control`
- `Content-Language`
=======
## Response headers

For cross-origin request, by default JavaScript may only access so-called "safe" response headers:

- `Cache-Control`
- `Content-Language`
- `Content-Length`
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

<<<<<<< HEAD
他のレスポンスヘッダは禁止されています。

```smart header="注意してください: `Content-Length` はありません"
注意: 上のリストに `Content-Length` ヘッダはありません!

そのため、何かをダウンロードしていて進捗具合を追跡したい場合は、ヘッダにアクセスするために追加の許可が必要になります(下記参照)。
```

JavaScript が他のレスポンスヘッダへアクセスするのを許可するには、サーバは `Access-Control-Expose-Headers` ヘッダに、アクセスを許可するヘッダをリストする必要があります。

例:

```
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Length,API-Key
*/!*
```

このような `Access-Control-Expose-Headers` ヘッダを使うことで、スクリプトが `Content-Length` と `API-Key` ヘッダにアクセスすることを許可します。


## "単純ではない" リクエスト

私たちは単なる `GET/POST` だけでなく、`PATCH` や `DELETE` などの HTTP メソッドを使うことができます。

以前は web ページがこのようなリクエストを行うことができるとは、誰も想定していませんでした。そのため、標準ではないメソッドを "ブラウザではない" という合図として扱う web サービスが存在する可能性があります。They can take it into account when checking access rights.

そのため、解釈違いを避けるために、昔は扱えなかった "単純ではない" リクエストについては、ブラウザはすぐにはこのようなリクエストを行いません。その前に、許可を求めるための準備的な、いわゆる "preflight" リクエストを送信します。

preflight リクエストは `OPTIONS` メソッドを使い、本文はありません。
- `Access-Control-Request-Method` ヘッダは要求されたメソッドを持ちます。
- `Access-Control-Request-Headers` ヘッダは単純でない HTTP ヘッダのカンマ区切りのリストを提供します。

サーバがリクエストを処理するのに同意する場合、ステータス 200 で本文なしの応答を返します。

- レスポンスヘッダ `Access-Control-Allow-Methods` は許可されたメソッドを持たなければなりません。
- レスポンスヘッダ `Access-Control-Allow-Headers` は許可されたヘッダのリストを持たなければなりません。
- 加えて、ヘッダ `Access-Control-Max-Age` でパーミッションキャッシュする秒数を指定する場合があります。その場合、ブラウザは与えれたパーミッションを満たす後続のリクエストに対して preflight を送信する必要はありません。

![](xhr-preflight.svg)

クロスドメインの `PATCH` リクエストの例でステップ毎にどのように動作するのか見ていきましょう(このメソッドはデータを更新するのによく使われます)。:
=======
Accessing any other response header causes an error.

To grant JavaScript access to any other response header, the server must send the `Access-Control-Expose-Headers` header. It contains a comma-separated list of unsafe header names that should be made accessible.

For example:

```http
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
Content-Encoding: gzip
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
*!*
Access-Control-Expose-Headers: Content-Encoding,API-Key
*/!*
```

With such an `Access-Control-Expose-Headers` header, the script is allowed to read the `Content-Encoding` and `API-Key` headers of the response.

## "Unsafe" requests

We can use any HTTP-method: not just `GET/POST`, but also `PATCH`, `DELETE` and others.

Some time ago no one could even imagine that a webpage could make such requests. So there may still exist webservices that treat a non-standard method as a signal: "That's not a browser". They can take it into account when checking access rights.

So, to avoid misunderstandings, any "unsafe" request -- that couldn't be done in the old times, the browser does not make such requests right away. First, it sends a preliminary, so-called "preflight" request, to ask for permission.

A preflight request uses the method `OPTIONS`, no body and three headers:

- `Access-Control-Request-Method` header has the method of the unsafe request.
- `Access-Control-Request-Headers` header provides a comma-separated list of its unsafe HTTP-headers.
- `Origin` header tells from where the request came. (such as `https://javascript.info`)

If the server agrees to serve the requests, then it should respond with empty body, status 200 and headers:

- `Access-Control-Allow-Origin` must be either `*` or the requesting origin, such as `https://javascript.info`, to allow it.
- `Access-Control-Allow-Methods` must have the allowed method.
- `Access-Control-Allow-Headers` must have a list of allowed headers.
- Additionally, the header `Access-Control-Max-Age` may specify a number of seconds to cache the permissions. So the browser won't have to send a preflight for subsequent requests that satisfy given permissions.

![](xhr-preflight.svg)

Let's see how it works step-by-step on the example of a cross-origin `PATCH` request (this method is often used to update data):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
<<<<<<< HEAD
    'Content-Type': 'application/json'  
=======
    'Content-Type': 'application/json',
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    'API-Key': 'secret'
  }
});
```

<<<<<<< HEAD
リクエストが単純でない理由が3つあります:
- メソッドが `PATCH`
- `Content-Type` は次のいずれでもない: `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`.
- カスタムの `API-Key` ヘッダ.

### Step 1 (preflight リクエスト)

ブラウザは自身で次のような preflight リクエストを投げます:

```
=======
There are three reasons why the request is unsafe (one is enough):
- Method `PATCH`
- `Content-Type` is not one of: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`.
- "Unsafe" `API-Key` header.

### Step 1 (preflight request)

Prior to sending such a request, the browser, on its own, sends a preflight request that looks like this:

```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

<<<<<<< HEAD
- メソッド: `OPTIONS`.
- パス -- メインのリクエストと正確に同じ: `/service.json`.
- クロスオリジンの特別なヘッダ:
    - `Origin` -- 送信元のオリジン.
    - `Access-Control-Request-Method` -- リクエストされたメソッド
    - `Access-Control-Request-Headers` -- カンマ区切りの "単純ではない" ヘッダのリスト

### Step 2 (preflight レスポンス)

サーバはステータス 200 と 次のヘッダを応答する必要があります:
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

これは今後のやり取りを許可します。そうでなければ、エラーが起きるでしょう。

サーバが他のメソッドとヘッダも待ち受けている場合、一度にそれらすべてをリストするのは理にかなっています。例:

```
200 OK
=======
- Method: `OPTIONS`.
- The path -- exactly the same as the main request: `/service.json`.
- Cross-origin special headers:
    - `Origin` -- the source origin.
    - `Access-Control-Request-Method` -- requested method.
    - `Access-Control-Request-Headers` -- a comma-separated list of "unsafe" headers.

### Step 2 (preflight response)

The server should respond with status 200 and the headers:
- `Access-Control-Allow-Origin: https://javascript.info`
- `Access-Control-Allow-Methods: PATCH`
- `Access-Control-Allow-Headers: Content-Type,API-Key`.

That allows future communication, otherwise an error is triggered.

If the server expects other methods and headers in the future, it makes sense to allow them in advance by adding them to the list.

For example, this response also allows `PUT`, `DELETE` and additional headers:

```http
200 OK
Access-Control-Allow-Origin: https://javascript.info
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

<<<<<<< HEAD
これでブラウザは `PATCH` が許可されたメソッドのリストにあり、両方のヘッダもリストにあるこが確認できたので、メインのリクエストを送信します。

加えて、preflight レスポンスは `Access-Control-Max-Age` ヘッダで指定された時間(86400 秒, 1日)キャッシュされます。そのため後続のリクエストでは preflight は起きません。それらはキャッシュの内容から許容と想定して、直接送信されます。

### Step 3 (実際のリクエスト)

preflight が成功すると、ブラウザは本当のリクエストを行います。ここでのフローは単純リクエストの場合と同じです。

実際のリクエストは `Origin` ヘッダを持ちます(クロスオリジンのため)。:

```
=======
Now the browser can see that `PATCH` is in `Access-Control-Allow-Methods` and `Content-Type,API-Key` are in the list `Access-Control-Allow-Headers`, so it sends out the main request.

If there's the header `Access-Control-Max-Age` with a number of seconds, then the preflight permissions are cached for the given time. The response above will be cached for 86400 seconds (one day). Within this timeframe, subsequent requests will not cause a preflight. Assuming that they fit the cached allowances, they will be sent directly.

### Step 3 (actual request)

When the preflight is successful, the browser now makes the main request. The process here is the same as for safe requests.

The main request has the `Origin` header (because it's cross-origin):

```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

<<<<<<< HEAD
### Step 4 (実際のレスポンス)

サーバは `Access-Control-Allow-Origin` をレスポンスに追加するのを忘れないでください。それがないと、成功した preflight は解放しません。:

```
Access-Control-Allow-Origin: https://javascript.info
```

これですべてOKです。JavaScript は完全なレスポンスを読むことができます。


## Credentials

デフォルトでは、クロスオリジンリクエストはクレデンシャル(cookie or HTTP 認証)を持ちません。

これは HTTP リクエストでは一般的ではありません。通常 `http://site.com` へのリクエストはそのドメインのすべての cookie を伴います。しかし、JavaScript メソッドにより作られたクロスオリジンリクエストは例外です。

例えば、`fetch('http://another.com')` は cookie を送信しません。たとえ `another.com` ドメインに属するものであっても。

なぜでしょう?

なぜなら、クレデンシャルを持つリクエストは匿名のリクエストよりもはるかに強力だからです。もし許可されていると、それは JavaScript にユーザに代わって機密情報にアクセスする全権限を与えることになります。

サーバは本当に `Origin` のページをそれほど信頼しているのでしょうか？クレデンシャルを持つリクエストが通過するための追加のヘッダが必要です。

クレデンシャルを有効にするには、オプション `credentials: "include"` を追加します。:
=======
### Step 4 (actual response)

The server should not forget to add `Access-Control-Allow-Origin` to the main response. A successful preflight does not relieve from that:

```http
Access-Control-Allow-Origin: https://javascript.info
```

Then JavaScript is able to read the main server response.

```smart
Preflight request occurs "behind the scenes", it's invisible to JavaScript.

JavaScript only gets the response to the main request or an error if there's no server permission.
```

## Credentials

A cross-origin request initiated by JavaScript code by default does not bring any credentials (cookies or HTTP authentication).

That's uncommon for HTTP-requests. Usually, a request to `http://site.com` is accompanied by all cookies from that domain. Cross-origin requests made by JavaScript methods on the other hand are an exception.

For example, `fetch('http://another.com')` does not send any cookies, even those  (!) that belong to `another.com` domain.

Why?

That's because a request with credentials is much more powerful than without them. If allowed, it grants JavaScript the full power to act on behalf of the user and access sensitive information using their credentials.

Does the server really trust the script that much? Then it must explicitly allow requests with credentials with an additional header.

To send credentials in `fetch`, we need to add the option `credentials: "include"`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
fetch('http://another.com', {
  credentials: "include"
});
```

<<<<<<< HEAD
これで `fetch` はリクエストと一緒に `another.com` からの cookie を送信します。

もしサーバがクレデンシャルを含むリクエストを受け入れたい場合は、`Access-Control-Allow-Origin` に加えて、レスポンスにヘッダ `Access-Control-Allow-Credentials: true` を追加する必要があります。

例:

```
=======
Now `fetch` sends cookies originating from `another.com` with request to that site.

If the server agrees to accept the request *with credentials*, it should add a header `Access-Control-Allow-Credentials: true` to the response, in addition to `Access-Control-Allow-Origin`.

For example:

```http
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

<<<<<<< HEAD
注意してください: `Access-Control-Allow-Origin` はクレデンシャルを持つリクエストに対してアスタリスク `*` を使うことは禁止されています。上のように正確なオリジンでなければなりません。これはサーバが本当に信頼する相手を知っていることを保証するための追加の安全対策です。

## サマリ

ネットワークメソッドはクロスオリジンリクエストを2種類に分けます: "単純" とその他です。

[単純リクエスト](http://www.w3.org/TR/cors/#terminology) は次の条件を満たさなければなりません:
- メソッド: GET, POST or HEAD.
- ヘッダ -- 次のものだけセットできます:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type`: `application/x-www-form-urlencoded`, `multipart/form-data` または `text/plain` のいずれか.

本質的な違いは、単純リクエストは以前から `<form>` もしくは `<script>` タグを使用して行うことができました。その一方、単純でないものは、ブラウザでは長い間不可能だったことです。

実際の違いは、単純リクエストは `Origin` ヘッダとともにすぐに送信されますが、他のリクエストでは、ブラウザは許可を求めるために事前の "priflight" リクエストを行います。

**単純リクエストの場合:**

- → ブラウザは送信元をもつ `Origin` ヘッダを送信します。
- ← クレデンシャルを持たないリクエストの場合(デフォルト)、サーバは以下を設定する必要があります:
    - `Access-Control-Allow-Origin` に `*` または `Origin` と同じ値
- ← クレデンシャルを持つリクエストの場合、サーバは以下を設定する必要があります:
    - `Access-Control-Allow-Origin` に `Origin`
    - `Access-Control-Allow-Credentials` に `true`

さらに、JavaScript で単純でないレスポンスヘッダ(下記以外)にアクセスしたい場合:
- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

...サーバは許可されたものを `Access-Control-Expose-Headers` ヘッダにリストする必要があります。

**単純でないリクエストの場合、要求されたものの前に事前の "preflight" リクエストが発行されます。**

- → ブラウザは次のヘッダと共に同じ URL に `OPTIONS` リクエストを送信します。:
    - `Access-Control-Request-Method` は要求されたメソッドを持ちます
    - `Access-Control-Request-Headers` は要求された単純でないヘッダのリストです
- ← サーバはステータス 200 と次のヘッダを応答します:
    - `Access-Control-Allow-Methods` は許可されたメソッドのリストを含みます,
    - `Access-Control-Allow-Headers` は許可されたヘッダのリストを含みます,
    - `Access-Control-Max-Age` は許可(パーミッション)のキャッシュの秒数です。
- その後、実際のリクエストが送信され、前の "単純な" スキームが適用されます。
=======
Please note: `Access-Control-Allow-Origin` is prohibited from using a star `*` for requests with credentials. Like shown above, it must provide the exact origin there. That's an additional safety measure, to ensure that the server really knows who it trusts to make such requests.

## Summary

From the browser point of view, there are two kinds of cross-origin requests: "safe" and all the others.

"Safe" requests must satisfy the following conditions:
- Method: GET, POST or HEAD.
- Headers -- we can set only:
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` to the value `application/x-www-form-urlencoded`, `multipart/form-data` or `text/plain`.

The essential difference is that safe requests were doable since ancient times using `<form>` or `<script>` tags, while unsafe were impossible for browsers for a long time.

So, the practical difference is that safe requests are sent right away, with the `Origin` header, while for the other ones the browser makes a preliminary "preflight" request, asking for permission.

**For safe requests:**

- → The browser sends the `Origin` header with the origin.
- ← For requests without credentials (not sent by default), the server should set:
    - `Access-Control-Allow-Origin` to `*` or same value as `Origin`
- ← For requests with credentials, the server should set:
    - `Access-Control-Allow-Origin` to same value as `Origin`
    - `Access-Control-Allow-Credentials` to `true`

Additionally, to grant JavaScript access to any response headers except `Cache-Control`,  `Content-Language`, `Content-Type`, `Expires`, `Last-Modified` or `Pragma`, the server should list the allowed ones in `Access-Control-Expose-Headers` header.

**For unsafe requests, a preliminary "preflight" request is issued before the requested one:**

- → The browser sends an `OPTIONS` request to the same URL, with the headers:
    - `Access-Control-Request-Method` has requested method.
    - `Access-Control-Request-Headers` lists unsafe requested headers.
- ← The server should respond with status 200 and the headers:
    - `Access-Control-Allow-Methods` with a list of allowed methods,
    - `Access-Control-Allow-Headers` with a list of allowed headers,
    - `Access-Control-Max-Age` with a number of seconds to cache the permissions.
- Then the actual request is sent, and the previous "safe" scheme is applied.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
