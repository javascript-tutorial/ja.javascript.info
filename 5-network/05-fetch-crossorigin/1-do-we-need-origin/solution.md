<<<<<<< HEAD
`Origin` は必要です。なぜなら、`Referer` はない場合があるからです。例えば、HTTPS で HTTP のページを `fetch` するとき(よりセキュアな場所からセキュアでない場所へアクセスするとき)、`Referer` はありません。

[コンテンツセキュリティポリシー(Content Security Policy: CSP)](http://en.wikipedia.org/wiki/Content_Security_Policy) は `Referer` を送信するのを禁止する可能性があります。

後ほど分かりますが、`fetch` にも `Referer` の送信を防いだり、それを変更することを許可する(同じサイト内で)オプションがあります。

仕様によると、`Referer` はオプションの HTTP ヘッダです。

`Referer` は信頼できないため、`Origin` が発明されました。ブラウザはクロスオリジンリクエストのために、正しい `Origin` を保証します。
=======
We need `Origin`, because sometimes `Referer` is absent. For instance, when we `fetch` HTTP-page from HTTPS (access less secure from more secure), then there's no `Referer`.

The [Content Security Policy](http://en.wikipedia.org/wiki/Content_Security_Policy) may forbid sending a `Referer`.

As we'll see, `fetch` has options that prevent sending the `Referer` and even allow to change it (within the same site).

By specification, `Referer` is an optional HTTP-header.

Exactly because `Referer` is unreliable, `Origin` was invented. The browser guarantees correct `Origin` for cross-origin requests.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
