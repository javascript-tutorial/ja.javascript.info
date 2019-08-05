importance: 5

---

# なぜ Origin が必要なのでしょう?

恐らくご存知の通り、HTTP ヘッダには `Referer` があります。これは通常、ネットワークリクエストを開始したページの URL が含まれています。

例えば、`http://javascript.info/some/url` から `http://google.com` を取得しようとすると、そのヘッダは次のようになります。:

```
Accept: */*
Accept-Charset: utf-8
Accept-Encoding: gzip,deflate,sdch
Connection: keep-alive
Host: google.com
*!*
Origin: http://javascript.info
Referer: http://javascript.info/some/url
*/!*
```

ご覧の通り、`Referer` と `Origin` 両方が存在します。

ここで質問です:

1. `Referer` がより多くの情報を持っているのに、なぜ ` Origin` が必要なのでしょうか。
2. `Referer` や `Origin` がない、あるいはそれが正しくない可能性はありますか？
