
# Fetch API

これまでの記事で、私たちは fetch について多くのことを知っています。

それでは、そのすべての機能をカバーするために、API の残りの部分を見ていきましょう。

以下は、指定可能なすべての fetch オプションとそのデフォルト値(コメントは他の選択肢です)のリストです。:

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    "Content-Type": "text/plain;charset=UTF-8" // 文字列の本文の場合, 本文に依存します
  },
  body: undefined // 文字列, FormData, Blob, BufferSource, あるいは URLSearchParams
  referrer: "about:client", // no-referrer の場合は "", あるいは現在のオリジンの URL
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, or only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // "sha256-abcdef1234567890" のようなハッシュ
  keepalive: false, // true
  signal: undefined, // リクスとを中止するための AbortController
  window: window // null
});
```

チャプター <info:fetch-basics> で `method`, `headers` そして `body` を詳しく説明しました。

`signal` オプションは <info:fetch-abort> で説明しています。

それでは、オプションの残りを調べてみましょう。

## referrer, referrerPolicy

これらのオプションは `fetch` がどのように HTTP `Referer` へヘッダを設定するかを管理します。

そのヘッダには、リクエストを行ったページの URL が含まれます。ほとんどの場合、これは非常に小さな情報の役割を果たしますが、セキュリティ目的で削除または変更するのが理にかなっていることがあります。

**`referrer` オプションにより、現在のオリジン内の任意の `Referer` を設定するか、それを無効にすることができます。**

referer を送らないようにするには、空文字をセットします:
```js
fetch('/page', {
*!*
  referrer: "" // Referer ヘッダなし
*/!*
});
```

現在のオリジン内の別の URL を設定するには次のようにします:

```js
fetch('/page', {
  // https://javascript.info にいる想定です
  // 任意の Referer ヘッダが設定できますが、現在のオリジン内のみです
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**`referrerPolicy` オプションは `Referer` に対する一般的なルールを設定します。**

指定可能な値は[Referrer Policy specification](https://w3c.github.io/webappsec-referrer-policy/)で説明されています:

- **`"no-referrer-when-downgrade"`** -- デフォルト値: HTTPS から HTTP (より安全性の低いプロトコル)にリクエストを送信する場合以外は、常に `Referer` は送信されます。
- **`"no-referrer"`** -- けして `Referer` を送信しません。
- **`"origin"`** -- `Referer` には完全なページURLではなく、オリジンのみを送信します。例えば、`http://site.com/path` の代わりに `http://site.com`。
- **`"origin-when-cross-origin"`** -- 同じオリジンには完全な referrer を送信しますが、クロスオリジンリクエストの場合はオリジン部分のみを送信します。
- **`"same-origin"`** -- 同じオリジンには完全な referrer を送信しますが、クロスオリジンリクエストの場合は referrer を送信しません。
- **`"strict-origin"`** -- オリジンのみを送信し、HTTPS→HTTP のリクエストの場合には referrer を送信しません。
- **`"strict-origin-when-cross-origin"`** -- 同じオリジンの場合は完全な referrer を送信し、クロスオリジンの場合はHTTPS→HTTP リクエストでなければオリジンのみを送信、 HTTPS→HTTP の場合は何も送信しません。

外部からは見えるべきでないURL構造をもつ管理者の区域があるとします。

もしクロスオリジンの `fetch` を送信した場合、デフォルトでは自身のページの完全なURLを持つ `Referer` ヘッダを送信します(HTTPS から HTTP へリクエストする場合を除く。この場合は `Referer` はありません)。

E.g. `Referer: https://javascript.info/admin/secret/paths`.

referrer を完全に隠したい場合:

```js
fetch('https://another.com/page', {
  referrerPolicy: "no-referrer" // Referer なし。 referrer: "" と同じです。
});
```

そうではなく、リモート側でリクエストがどこから来たのかを確認したい場合には、URLの "オリジン" 部分だけを送ることができます。:

```js
fetch('https://another.com/page', {
  referrerPolicy: "strict-origin" // Referer: https://javascript.info
});
```

## mode

`mode` オプションはクロスオリジンリクエストを防ぐ安全装置として機能します。:

- **`"cors"`** -- デフォルト。<info:fetch-crossorigin> で説明されているように、クロスオリジンリクエストは許可されます。,
- **`"same-origin"`** -- クロスオリジンリクエストは禁止されています,
- **`"no-cors"`** -- 単純なクロスオリジンリクエストのみ許可されています。

これは、fetch URL がサードパーティから来たもので、クロスオリジンの機能を制限するために "機能をオフ" にしたい場合に役立ちます。

## credentials

`credentials` オプションは、`fetch` がリクエストと一緒に cookie と HTTP-Authorization ヘッダを送るべきかを指定するものです。

- **`"same-origin"`** -- デフォルトです。クロスオリジンリクエストに対しては送信しません。
- **`"include"`** -- 常に送信し、クロスオリジンのサーバから  `Accept-Control-Allow-Credentials` を要求します,
- **`"omit"`** -- 同一オリジンのリクエストの場合でも送信しません。

## cache

デフォルトでは、`fetch` リクエストは標準の HTTP キャッシングを使用します。つまり、`Expires` や `Cache-Control` ヘッダに従ったり、`If-Modified-Since` を送信したりします。通常のHTTPリクエストがするのと同じようにします。

`cache` オプションを使うことで、HTTP キャッシュを無視あるいはその使い方を調整することができます。:

- **`"default"`** --  `fetch` は標準の HTTP キャッシュのルールとヘッダを使用します;
- **`"no-store"`** -- HTTP キャッシュを完全に無視します。 `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, または `If-Range` のヘッダを設定している場合は、このモードがデフォルトになります;
- **`"reload"`** -- (たとえキャッシュされていたとしても)HTTP キャッシュから結果を取りませんが、キャッシュにレスポンスを埋めます(レスポンスヘッダが許可している場合)。
- **`"no-cache"`** -- キャッシュされているレスポンスがある場合は条件付きリクエストを作成し、それ以外の場合は通常のリクエストを作成します。レスポンスで HTTP キャッシュを埋めます。
- **`"force-cache"`** -- たとえ古くてもHTTP キャッシュからのレスポンスを使用します。HTTPキャッシュにレスポンスがない場合は、通常の HTTP リクエストを行い通常通りの振る舞いをします;
- **`"only-if-cached"`** -- たとえ古くてもHTTP キャッシュからのレスポンスを使用します。HTTPキャッシュにレスポンスがない場合、エラーになります。 `mode` が `"same-origin"` の場合にのみ動作します。

## redirect

通常、 `fetch` は 301 や 302 などのように、HTTP リダイレクトに透過的に従います。

`redirect` オプションでそれを変更することができます:

- **`"follow"`** -- デフォルト。HTTP リダイレクトに従います,
- **`"error"`** -- HTTP リダイレクトの場合にはエラーになります。,
- **`"manual"`** -- HTTP リダイレクトには従いませんが、`response.url` が新しい URL になり、`response.redirected` が `true` になります。必要に応じて新しい URL へ手動でリダイレクトすることができます。

## integrity

`integrity` オプションは、レスポンスが既知のチェックサムに一致するかを確認することができます。

[仕様](https://w3c.github.io/webappsec-subresource-integrity/) で説明されている通り、サポートされているハッシュ関数は SHA-256, SHA-384, と SHA-512 であり、ブラウザによっては他のものがあるかもしれません。

例えば、ファイルをダウンロードし、その SHA-256 のチェックサムが "abc" とします（実際のチェックサムはもちろんもっと長いです）。

これを次のようにして、`integrity` オプションに指定することができます:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abd'
});
```

すると、`fetch` は自身で SHA-256 を計算し、文字列比較をします。一致しない場合はエラーが発生します。

## keepalive

`keepalive` オプションは、リクエストがページよりも長生きする可能性があること意味します。

例えば、ユーザ体験を向上させるために、現在の訪問者がどのように我々のページを使用しているか(マウスクリック、閲覧したページの断片 など)に関する統計を収集するとします。

訪問者がページを離れるとき -- それをサーバ上に保存したいです。

`window.onunload` を使用すると実現できます:

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

通常、ドキュメントがアンロードされると、関連するすべてのネットワークリクエストは中止されます。しかし `keepalive` オプションは、たとえページから離れた後だとしてもバックグランドでそれを実行するようブラウザに指示します。そのため、リクエストが成功するためにはこれは不可欠です。

- メガバイトを送信することはできません: keepalive リクエストの場合の本文の制限は 64kb です。
    - もしもより多くのデータを集める場合は、定期的にそれを送ります。そうすれば、"onunload" 時のリクエストは多くはならないでしょう。
    - この制限は、現在進行中のすべてのリクエストに対するものです。なので、それぞれ 64kb のリクエストを 100 個作成することで騙すことができます。
- リクエストが `onunload` で行われた場合、サーバの応答は得られません。なぜならドキュメントはその時点ですでにアンロードされているからです。
    - 通常、サーバはこのようなリクエストに対しては空のレスポンスを返すので問題はありません。
