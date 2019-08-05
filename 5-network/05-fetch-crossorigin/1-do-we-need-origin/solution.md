`Origin` は必要です。なぜなら、`Referer` はない場合があるからです。例えば、HTTPS で HTTP のページを `fetch` するとき(よりセキュアな場所からセキュアでない場所へアクセスするとき)、`Referer` はありません。

[コンテンツセキュリティポリシー(Content Security Policy: CSP)](http://en.wikipedia.org/wiki/Content_Security_Policy) は `Referer` を送信するのを禁止する可能性があります。

後ほど分かりますが、`fetch` にも `Referer` の送信を防いだり、それを変更することを許可する(同じサイト内で)オプションがあります。

仕様によると、`Referer` はオプションの HTTP ヘッダです。

`Referer` は信頼できないため、`Origin` が発明されました。ブラウザはクロスオリジンリクエストのために、正しい `Origin` を保証します。
