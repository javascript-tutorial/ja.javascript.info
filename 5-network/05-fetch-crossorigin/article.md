# Fetch: クロスオリジン(Cross-Origin) リクエスト

もし任意の web サイトから `fetch` を行った場合、そのリクエストは恐らく失敗するでしょう。

ここで中心となる概念は *オリジン* -- ドメイン/ポート/プロトコルの３つ揃いです。 

クロスオリジンリクエスト(これらは別のドメイン(サブドメインも)、プロトコル、あるいはポートに送信されたもの)には、リモート側からの特別なヘッダが必要です。そのポリシーは "CORS" (Cross-Origin Resource Sharing) と呼ばれています。

例えば、`http://example.com` へのフェッチをしてみましょう。:

```js run async
try {
  await fetch('http://example.com');
} catch(err) {
  alert(err); // Failed to fetch
}
```

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
GET /request
Host: anywhere.com
*!*
Origin: https://javascript.info
*/!*
...
```

ご覧の通り、`Origin` はパスなしの正確なオリジン(ドメイン/プロトコル/ポート)を含みます。

サーバは `Origin` を検査することができ、このようなリクエストを受け入れることに同意すると、レスポンスに `Access-Control-Allow-Origin` という特別なヘッダを追加します。このヘッダは許可されたオリジン(このケースでは `https://javascript.info`)、あるいはアスタリスク `*` を含む必要があります。そして応答は成功します。そうでなければエラーになります。

ブラウザはここでは信頼された仲介者の役割を果たします。:
1. 正しい `Origin` がクロスドメインリクエストと一緒に送信されることを保証します。
2. レスポンスの中で正しい `Access-Control-Allow-Origin` を確認すると、次は JavaScript アクセス、そうでなければエラーと共に禁止します。

![](xhr-another-domain.svg)

これは "受け入れに同意した" 応答の例です:
```
200 OK
Content-Type:text/html; charset=UTF-8
*!*
Access-Control-Allow-Origin: https://javascript.info
*/!*
```

## レスポンスヘッダ

クロスオリジンリクエストの場合、デフォルトでは JavaScript は "単純レスポンスヘッダ" にしかアクセスできません。:

- `Cache-Control`
- `Content-Language`
- `Content-Type`
- `Expires`
- `Last-Modified`
- `Pragma`

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

```js
let response = await fetch('https://site.com/service.json', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'  
    'API-Key': 'secret'
  }
});
```

リクエストが単純でない理由が3つあります:
- メソッドが `PATCH`
- `Content-Type` は次のいずれでもない: `application/x-www-form-urlencoded`, `multipart/form-data`,  `text/plain`.
- カスタムの `API-Key` ヘッダ.

### Step 1 (preflight リクエスト)

ブラウザは自身で次のような preflight リクエストを投げます:

```
OPTIONS /service.json
Host: site.com
Origin: https://javascript.info
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: Content-Type,API-Key
```

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
Access-Control-Allow-Methods: PUT,PATCH,DELETE
Access-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control
Access-Control-Max-Age: 86400
```

これでブラウザは `PATCH` が許可されたメソッドのリストにあり、両方のヘッダもリストにあるこが確認できたので、メインのリクエストを送信します。

加えて、preflight レスポンスは `Access-Control-Max-Age` ヘッダで指定された時間(86400 秒, 1日)キャッシュされます。そのため後続のリクエストでは preflight は起きません。それらはキャッシュの内容から許容と想定して、直接送信されます。

### Step 3 (実際のリクエスト)

preflight が成功すると、ブラウザは本当のリクエストを行います。ここでのフローは単純リクエストの場合と同じです。

実際のリクエストは `Origin` ヘッダを持ちます(クロスオリジンのため)。:

```
PATCH /service.json
Host: site.com
Content-Type: application/json
API-Key: secret
Origin: https://javascript.info
```

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

```js
fetch('http://another.com', {
  credentials: "include"
});
```

これで `fetch` はリクエストと一緒に `another.com` からの cookie を送信します。

もしサーバがクレデンシャルを含むリクエストを受け入れたい場合は、`Access-Control-Allow-Origin` に加えて、レスポンスにヘッダ `Access-Control-Allow-Credentials: true` を追加する必要があります。

例:

```
200 OK
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Allow-Credentials: true
```

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
