importance: 5

---

<<<<<<< HEAD
# なぜ Origin が必要なのでしょう?

恐らくご存知の通り、HTTP ヘッダには `Referer` があります。これは通常、ネットワークリクエストを開始したページの URL が含まれています。

例えば、`http://javascript.info/some/url` から `http://google.com` を取得しようとすると、そのヘッダは次のようになります。:
=======
# Why do we need Origin?

As you probably know, there's HTTP-header `Referer`, that usually contains an url of the page which initiated a network request.

For instance, when fetching `http://google.com` from `http://javascript.info/some/url`, the headers look like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
ご覧の通り、`Referer` と `Origin` 両方が存在します。

ここで質問です:

1. `Referer` がより多くの情報を持っているのに、なぜ ` Origin` が必要なのでしょうか。
2. `Referer` や `Origin` がない、あるいはそれが正しくない可能性はありますか？
=======
As you can see, both `Referer` and `Origin` are present.

The questions:

1. Why `Origin` is needed, if `Referer` has even more information?
2. Is it possible that there's no `Referer` or `Origin`, or is it incorrect?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
