<<<<<<< HEAD
# Cookies(クッキー), document.cookie

Cookie はブラウザに直接格納される小さな文字列データです。これらは JavaScript の一部ではなく、[RFC 6265](https://tools.ietf.org/html/rfc6265)  仕様で定義されている HTML プロトコル の一部です。

多くの場合、Cookieは Web サーバによって設定されます。

Cookie の最も広く使われている用途の1つは認証です:

1. サインインすると、サーバは Cookie に "セッションID" をセットするために、応答に `Set-Cookie` HTTP ヘッダを使用します。 
2. ブラウザは Cookie を格納します。
3. 次回、同じドメインへのリクエストが行われるとき、ブラウザは `Cookie` HTTPヘッダを使用してネット上に送信します。
4. そのため、サーバは誰がリクエストを行ったのかを知ることができます。

ブラウザは Cookie のための特別なアクセサ `document.cookie` を提供します。

Cookie とそのオプションについては、多くの注意点があります。このチャプターでは、それらの詳細を説明してきます。

## document.cookie からの読み込み

```online
このサイトに Cookie はあるでしょうか？見てみましょう:
```

```offline
今Webサイトにいると仮定すると、次のようにすることで Cookie を見ることができます:
```

```js run
// javascript.info では統計のために Google Analytics を使用しています,
// そのため、いくつかの Cookie があるはずです
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```

文字列は `name=value` のペアからなり、 `;` により区切られます。それぞれが別の Cookie です。

特定の Cookie を見つけるには、`;` で `document.cookie` を分割し、正しい名前を見つけます。それをするのに、正規表現あるいは配列関数が使えます。

## document.cookie への書き込み

`document.cookie` へ書き込む事ができます。しかし、データプロパティではなくアクセサを利用します。

**`document.cookie` への書き込み操作はブラウザを通して行われ、そこに記載されている Cookie を更新しますが、他の Cookie には触れません。**

例えば、この呼び出しは名前が `user` で値が `John` の Cookie をセットします。:

```js run
document.cookie = "user=John"; // 名前が `user` の Cookie だけを更新します
alert(document.cookie); // すべての Cookie を表示します
```

実行すると、おそらく複数の Cookie が見えるでしょう。なぜなら、`document.cookie=` 操作はすべてのクッキーを上書きするのではなく、`user` だけを上書きするからです。

技術的には、名前と値は任意の文字が可能ですが、フォーマットを有効に保つためには、組み込みの `encodeURIComponent` 関数を使ってエスケープする必要があります。:

```js run
// 特別な値, エンコードが必要です
let name = "<>";
let value = "="

// Cookie を %3C%3E=%3D とエンコード
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; %3C%3E=%3D
```


```warn header="制限"
いくつかの制限があります:
- `encodeURIComponent` 後の `name=value` ペアは 4KB を超えてはいけません。なので、 Cookie に大きなデータを格納することはできません。
- ドメイン毎の Cookie の総数は 20+ で制限されています(正確な数字はブラウザに依存します)。
```

Cookie はいくつかのオプションを持っており、その多くは重要で設定するべきものです。

オプションは `key=value` の後にリストされ、`;` で区切られます。次のようになります。:
=======
# Cookies, document.cookie

Cookies are small strings of data that are stored directly in the browser. They are a part of the HTTP protocol, defined by the [RFC 6265](https://tools.ietf.org/html/rfc6265) specification.

Cookies are usually set by a web-server using the response `Set-Cookie` HTTP-header. Then, the browser automatically adds them to (almost) every request to the same domain using the `Cookie` HTTP-header.

One of the most widespread use cases is authentication:

1. Upon sign in, the server uses the `Set-Cookie` HTTP-header in the response to set a cookie with a unique "session identifier".
2. Next time when the request is sent to the same domain, the browser sends the cookie over the net using the `Cookie` HTTP-header.
3. So the server knows who made the request.

We can also access cookies from the browser, using `document.cookie` property.

There are many tricky things about cookies and their options. In this chapter we'll cover them in detail.

## Reading from document.cookie

```online
Does your browser store any cookies from this site? Let's see:
```

```offline
Assuming you're on a website, it's possible to see the cookies from it, like this:
```

```js run
// At javascript.info, we use Google Analytics for statistics,
// so there should be some cookies
alert( document.cookie ); // cookie1=value1; cookie2=value2;...
```


The value of `document.cookie` consists of `name=value` pairs, delimited by `; `. Each one is a separate cookie.

To find a particular cookie, we can split `document.cookie` by `; `, and then find the right name. We can use either a regular expression or array functions to do that.

We leave it as an exercise for the reader. Also, at the end of the chapter you'll find helper functions to manipulate cookies.

## Writing to document.cookie

We can write to `document.cookie`. But it's not a data property, it's an [accessor (getter/setter)](info:property-accessors). An assignment to it is treated specially.

**A write operation to `document.cookie` updates only cookies mentioned in it, but doesn't touch other cookies.**

For instance, this call sets a cookie with the name `user` and value `John`:

```js run
document.cookie = "user=John"; // update only cookie named 'user'
alert(document.cookie); // show all cookies
```

If you run it, then probably you'll see multiple cookies. That's because the `document.cookie=` operation does not overwrite all cookies. It only sets the mentioned cookie `user`.

Technically, name and value can have any characters. To keep the valid formatting, they should be escaped using a built-in `encodeURIComponent` function:

```js run
// special characters (spaces), need encoding
let name = "my name";
let value = "John Smith"

// encodes the cookie as my%20name=John%20Smith
document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

alert(document.cookie); // ...; my%20name=John%20Smith
```


```warn header="Limitations"
There are few limitations:
- The `name=value` pair, after `encodeURIComponent`, should not exceed 4KB. So we can't store anything huge in a cookie.
- The total number of cookies per domain is limited to around 20+, the exact limit depends on the browser.
```

Cookies have several options, many of them are important and should be set.

The options are listed after `key=value`, delimited by `;`, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

<<<<<<< HEAD
Cookie へアクセス可能な URL パスプレフィックスです。絶対値でなければなりません。デフォルトでは現在のパスになります。

Cookie が `path=/mypath` で設定された場合、それは `/mypath` と `/mypath/*` で見えますが、`/page` や `/mypathpage` では見えません。

通常は、すべての Webサイトのページから Cookie へアクセスできるよう、`path=/` を設定します。
=======
The url path prefix must be absolute. It makes the cookie accessible for pages under that path. By default, it's the current path.

If a cookie is set with `path=/admin`, it's visible at pages `/admin` and `/admin/something`, but not at `/home` or `/adminpage`.

Usually, we should set `path` to the root: `path=/` to make the cookie accessible from all website pages.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## domain

- **`domain=site.com`**

<<<<<<< HEAD
Cookie へアクセス可能なドメインです。

デフォルトでは、Cookie はそれを設定したドメインでのみアクセス可能です。そのため、Cookie が `site.com` で設定されている場合、 `other.com` では取得できません。

...しかし、より注意が必要なことに、サブドメイン `forum.site.com` でも Cookie は取得できません:

```js
// at site.com
document.cookie = "user=John"

// at forum.site.com
alert(document.cookie); // no user
```

**別の第2レベルのドメインから Cookie にアクセスさせる方法はありません。そのため、`other.com` が `site.com` で設定された Cookie を受け取ることはありません。**

これは機密データを Cookie に保持することができるようにするための、安全上の制限です。

...ですが、`forum.site.com` などのサブドメインへのアクセスを許可したい場合、それは可能です。その場合には、明示的に `domain` オプションをルートドメインに設定します: `domain=site.com`:

```js
// site.com で任意のサブドメインで Cookie にアクセスできるようにします
document.cookie = "user=John; domain=site.com"

// forum.site.com
alert(document.cookie); // with user
```

歴史的な理由から、`domain=.site.com` (ドット開始)もこのように機能します。非常に古いブラウザをサポートするにはドットを追加しておくのがよいでしょう。

## expires, max-age

デフォルトでは、Cookie がこれらのどのオプションを持っていない場合、ブラウザが閉じられたときに消えます。このような Cookie は "セッションクッキー" と呼ばれます。

ブラウザを閉じても Cookie を生存させるには、`expires` あるいは `max-age` オプションを設定します。

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

ブラウザが自動的に Cookie を削除する、Cookie の有効期限です。

日付は GMT タイムゾーンの正確な形式でなければなりません。それは `date.toUTCString` で取得できます。例えば、Cookie の有効期限を1日に設定する場合は次のようになります。:

```js
// いまから +1 日
=======
A domain defines where the cookie is accessible. In practice though, there are limitations. We can't set any domain.

**There's no way to let a cookie be accessible from another 2nd-level domain, so `other.com` will never receive a cookie set at `site.com`.**

It's a safety restriction, to allow us to store sensitive data in cookies that should be available only on one site.

By default, a cookie is accessible only at the domain that set it.

Please note, by default a cookie is also not shared to a subdomain as well, such as `forum.site.com`.

```js
// if we set a cookie at site.com website...
document.cookie = "user=John"

// ...we won't see it at forum.site.com
alert(document.cookie); // no user
```

...But this can be changed. If we'd like to allow subdomains like `forum.site.com` to get a cookie set at `site.com`, that's possible.

For that to happen, when setting a cookie at `site.com`, we should explicitly set the `domain` option to the root domain: `domain=site.com`. Then all subdomains will see such cookie.

For example:

```js
// at site.com
// make the cookie accessible on any subdomain *.site.com:
document.cookie = "user=John; *!*domain=site.com*/!*"

// later

// at forum.site.com
alert(document.cookie); // has cookie user=John
```

For historical reasons, `domain=.site.com` (with a dot before `site.com`) also works the same way, allowing access to the cookie from subdomains. That's an old notation and should be used if we need to support very old browsers.

To summarize, the `domain` option allows to make a cookie accessible at subdomains.

## expires, max-age

By default, if a cookie doesn't have one of these options, it disappears when the browser is closed. Such cookies are called "session cookies"

To let cookies survive a browser close, we can set either the `expires` or `max-age` option.

- **`expires=Tue, 19 Jan 2038 03:14:07 GMT`**

The cookie expiration date defines the time, when the browser will automatically delete it.

The date must be exactly in this format, in the GMT timezone. We can use `date.toUTCString` to get it. For instance, we can set the cookie to expire in 1 day:

```js
// +1 day from now
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

<<<<<<< HEAD
もし `expires` を過去に設定すると、Cookie は削除されます。

-  **`max-age=3600`**

`expires` の代替として、Cookie の有効期限を秒で指定します。

現時点からの秒数、または即時有効期限切れの場合(Cookie を削除するために)はゼロ/負の値を指定できます。:

```js
// cookie は今から1時間後に消えます
document.cookie = "user=John; max-age=3600";

// cookie 削除(すぐに有効期限切れにする)
document.cookie = "user=John; max-age=0";
```  
=======
If we set `expires` to a date in the past, the cookie is deleted.

-  **`max-age=3600`**

It's an alternative to `expires` and specifies the cookie's expiration in seconds from the current moment.

If set to zero or a negative value, the cookie is deleted:

```js
// cookie will die in +1 hour from now
document.cookie = "user=John; max-age=3600";

// delete cookie (let it expire right now)
document.cookie = "user=John; max-age=0";
```
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## secure

- **`secure`**

<<<<<<< HEAD
Cookie は HTTPS 経由でのみ転送するべきです。

**デフォルトでは、Cookie を `http://site.com` にセットした場合、それは `https://site.com` にも現れます。そしてその逆もしかりです。**

つまり、Cookie はドメインのみをチェックしており、プロトコルを区別しません。

このオプションでは、Cookie が `https://site.com` でセットされた場合、その後 `http://site.com` のように HTTP で同じサイトにアクセスしても Cookie は現れません。そのため、Cookie に暗号化されていない HTTP 経由で送信されるべきではない機密コンテンツが含まれている場合、このフラグで防ぐ事ができます。

```js
// Cookie をセキュアに設定 (HTTPS 経由でのみアクセス可能)
document.cookie = "user=John; secure";
```  

## samesite

これは、いわゆる XSRF (クロスサイトリクエストフォージェリ)攻撃から保護するための、もう1つのセキュリティオプションです。

いつ役立つのかを理解するために、次の攻撃シナリオを紹介しましょう。

### XSRF 攻撃

想像してください、あなたはサイト `bank.com` にログインしました。つまり:あなたはそのサイトからの認証 Cookie を持っています。ブラウザは、あなたを認識して、すべての慎重に扱うべき金融操作を実行するために、リクエスト毎に Cookie を `bank.com` に送信します。 

いま、別のウィンドウで Web をブラウジングしていると、別のサイト `evil.com` にやってきました。そして、それはハッカーのアカウントを持つ `<form action="https://bank.com/pay">` と、自動的にサブミットする JavaScript コードを持っています。

そのフォームは `evil.com` から直接銀行のサイトに送信され、あなたの Cookie も送信されます。なぜなら、あなたが `bank.com` に訪れるたびに送信されるからです。そのため、銀行はあなたを認識し、実際に支払いを実行します。

![](cookie-xsrf.svg)

これはクロスサイトリクエストフォージェリ(または XSRF)攻撃と呼ばれます。

もちろん、実際の銀行はそれから保護されています。`bank.com` によって生成されたすべてのフォームは、"xsrf 保護トークン" と呼ばれる特別なフィールドを持っており、悪意のあるページはそれを生成することも、リモートページから何らかの形で抽出することもできません(そこにフォームを送信することはできますが、データを戻すことはできません)。

### Cookie samesite オプションを入力する

いま、Cookie `samesite` オプションはこのような攻撃から保護するためのもう1つの方法を提供します。それは(理論的には)、"xsrf 保護トークン" を必要としません。

2つのとり得る値があります:

- **`samesite=strict`, 値なしの `samesite` と同じです**

ユーザがサイトの外からきた場合、`samesite=strict` を持つ Cookie は決して送信されません。

言い換えると、ユーザがメールにあるリンクを辿った場合や、`evil.com` からのフォームを送信した場合、あるいは他のドメインから生じたサイトに関する任意の操作をした場合、Cookie は送信されません。
そして、XSRF 攻撃は失敗します。なぜなら、`bank.com` は Cookie がないのでユーザを認識せず、支払いには進めないでしょう。

この保護はとても信頼できます。`bank.com` からの操作のみ samesite の Cookie を送信します。

しかしながら、多少の不便があります。

ユーザが、自身のメモなどから `bank.com` への正当なリンクを辿った際、`bank.com` がそれらを認識しないことに驚くでしょう。確かに、`samesite=strict` Cookie はこのケースでは送信されません。

2つのCookieを使って回避することができます: 1つは "一般的な認識" 用で、"Hello, John" というためだけのものです。もう1つは `samesite=strict` を持つデータ変更用のものです。

すると、サイトの外から来た人は歓迎("Hello, John")を受けますが、支払いは銀行のWebサイトから始められなければなりません。

- **`samesite=lax`**

ユーザ体験を維持するためのもう1つのアプローチは、より寛容な値である `samesite=lax` を使うことです。

Lax モードでは、`strict` のように、サイトの外から来たときにブラウザが Cookie を送信するのを禁止しますが、例外があります。

`samesite=lax` の Cookie は、これらの条件が両方とも true の場合に送信されます。:
1. HTTP メソッドが "安全" である(e.g. POST ではなく GET)。

    安全なHTTP メソッドの完全なリストは [RFC7231 specification](https://tools.ietf.org/html/rfc7231) にあります。基本的に、これらはデータの読み取りのために使用され、データ書き込みには使用するべきでないメソッドです。データ変更操作を実行してはいけません。リンクをたどることは、常にGET(安全なメソッド)です。

2. 操作は最上位のナビゲーションで実行される(ブラウザのアドレスバーの URL を変更する)

    これは通常 true ですが、ナビゲーションが `<iframe>` で実行された場合、これは最上位ではありません。また、AJAX リクエストはどのナビゲーションも行わないため、この条件にはマッチしません。

したがって、`samesite=lax` が行うことは、基本的に最も一般的な "URL を開く" という操作で Cookie を利用できるようにすることです。他のサイトからのAJAXリクエストやフォーム送信など、より複雑なことをするときには Cookie を失います。

それで問題ないのであれば、`samesite=lax` を追加してもおそらくユーザー体験を損なうことはなく、保護を追加できるでしょう。

全体的に見て、`samesite` は素晴らしいですが、重要な欠点があります。:
- 古いブラウザ(2017年あたり) では `samesite` はサポートされておらず、無視されます。

**そのため、保護を提供するために `samesite` だけに頼った場合、古いブラウザは完全に脆弱になるでしょう。**

しかし、xsrf トークンなど他の保護手段と合わせて `samesite` を使用し、追加の防御層を追加することができます。

## httpOnly

このオプションは JavaScript とは関係ありませんが、ここでは完全性のために言及する必要があります。

サーバが Cookie を設定するために `Set-Cookie` を使うとき、`httpOnly` オプションを設定することができます。

このオプションは、任意のJavaScript が Cookie へアクセスすることを禁止します。我々は、`document.cookie` を使ってこのような Cookie を見たり操作することはできません。

これは、ハッカーが自分の JavaScript コードをページに挿入し、ユーザがそのページに訪問するのを待つといった特定の攻撃から保護するための予防策として使われます。ハッカーが我々のサイトにコードを挿入することができるべきではありませんが、ハッカーにそれをさせてしまうバグがあるかもしれません。

通常、そのようなことが起き、ユーザがハッカーのコードが含まれた Web ページを訪れると、そのコードは実行され、認証情報を含むユーザの Cookie を持つ `document.cookie` へのアクセスを得ます。それは良くありません。

しかし、Cookie が `httpOnly` であれば、`document.cookie` にそれは見えないため、守られます。

## 付録: Cookie 関数

ここにあるのは、Cookie を扱うための関数の小さなセットです。手動で `docment.cookie` を変更するよりもはるかに便利です。

そのための Cookie ライブラリは数多くありますので、これらは完全に動作しますが、デモ用です。:


### getCookie(name)

Cookie にアクセスする最も早い方法は [正規表現](info:regular-expressions) を使うことです。

関数 `getCookie(name)` は指定された `name` の Cookie を返します。:

```js
// 指定された name を持つ Cookie を返します
// なければ undefined を返します
=======
The cookie should be transferred only over HTTPS.

**By default, if we set a cookie at `http://site.com`, then it also appears at `https://site.com` and vice versa.**

That is, cookies are domain-based, they do not distinguish between the protocols.

With this option, if a cookie is set by `https://site.com`, then it doesn't appear when the same site is accessed by HTTP, as `http://site.com`. So if a cookie has sensitive content that should never be sent over unencrypted HTTP, the `secure` flag is the right thing.

```js
// assuming we're on https:// now
// set the cookie to be secure (only accessible over HTTPS)
document.cookie = "user=John; secure";
```

## samesite

That's another security attribute `samesite`. It's designed to protect from so-called XSRF (cross-site request forgery) attacks.

To understand how it works and when it's useful, let's take a look at XSRF attacks.

### XSRF attack

Imagine, you are logged into the site `bank.com`. That is: you have an authentication cookie from that site. Your browser sends it to `bank.com` with every request, so that it recognizes you and performs all sensitive financial operations.

Now, while browsing the web in another window, you accidentally come to another site `evil.com`. That site has JavaScript code that submits a form `<form action="https://bank.com/pay">` to `bank.com` with fields that initiate a transaction to the hacker's account.

The browser sends cookies every time you visit the site `bank.com`, even if the form was submitted from `evil.com`. So the bank recognizes you and actually performs the payment.

![](cookie-xsrf.svg)

That's a so-called "Cross-Site Request Forgery" (in short, XSRF) attack.

Real banks are protected from it of course. All forms generated by `bank.com` have a special field, a so-called "XSRF protection token", that an evil page can't generate or extract from a remote page. It can submit a form there, but can't get the data back. The site `bank.com` checks for such token in every form it receives.

Such a protection takes time to implement though. We need to ensure that every form has the required token field, and we must also check all requests.

### Enter cookie samesite option

The cookie `samesite` option provides another way to protect from such attacks, that (in theory) should not require "xsrf protection tokens".

It has two possible values:

- **`samesite=strict` (same as `samesite` without value)**

A cookie with `samesite=strict` is never sent if the user comes from outside the same site.

In other words, whether a user follows a link from their mail or submits a form from `evil.com`, or does any operation that originates from another domain, the cookie is not sent.

If authentication cookies have the `samesite` option, then a XSRF attack has no chances to succeed, because a submission from `evil.com` comes without cookies. So `bank.com` will not recognize the user and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the `samesite` cookie, e.g. a form submission from another page at `bank.com`.

Although, there's a small inconvenience.

When a user follows a legitimate link to `bank.com`, like from their own notes, they'll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for "general recognition", only for the purposes of saying: "Hello, John", and the other one for data-changing operations with `samesite=strict`. Then, a person coming from outside of the site will see a welcome, but payments must be initiated from the bank's website, for the second cookie to be sent.

- **`samesite=lax`**

A more relaxed approach that also protects from XSRF and doesn't break the user experience.

Lax mode, just like `strict`, forbids the browser to send cookies when coming from outside the site, but adds an exception.

A `samesite=lax` cookie is sent if both of these conditions are true:
1. The HTTP method is "safe" (e.g. GET, but not POST).

    The full list of safe HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Basically, these are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

2. The operation performs a top-level navigation (changes URL in the browser address bar).

    That's usually true, but if the navigation is performed in an `<iframe>`, then it's not top-level. Also, JavaScript methods for network requests do not perform any navigation, hence they don't fit.

So, what `samesite=lax` does, is to basically allow the most common "go to URL" operation to have cookies. E.g. opening a website link from notes that satisfy these conditions.

But anything more complicated, like a network request from another site or a form submission, loses cookies.

If that's fine for you, then adding `samesite=lax` will probably not break the user experience and add protection.

Overall, `samesite` is a great option.

There's a drawback:

- `samesite` is ignored (not supported) by very old browsers, year 2017 or so.

**So if we solely rely on `samesite` to provide protection, then old browsers will be vulnerable.**

But we surely can use `samesite` together with other protection measures, like xsrf tokens, to add an additional layer of defence and then, in the future, when old browsers die out, we'll probably be able to drop xsrf tokens.

## httpOnly

This option has nothing to do with JavaScript, but we have to mention it for completeness.

The web-server uses the `Set-Cookie` header to set a cookie. Also, it may set the `httpOnly` option.

This option forbids any JavaScript access to the cookie. We can't see such a cookie or manipulate it using `document.cookie`.

That's used as a precaution measure, to protect from certain attacks when a hacker injects his own JavaScript code into a page and waits for a user to visit that page. That shouldn't be possible at all, hackers should not be able to inject their code into our site, but there may be bugs that let them do it.


Normally, if such a thing happens, and a user visits a web-page with hacker's JavaScript code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.

But if a cookie is `httpOnly`, then `document.cookie` doesn't see it, so it is protected.

## Appendix: Cookie functions

Here's a small set of functions to work with cookies, more convenient than a manual modification of `document.cookie`.

There exist many cookie libraries for that, so these are for demo purposes. Fully working though.

### getCookie(name)

The shortest way to access a cookie is to use a [regular expression](info:regular-expressions).

The function `getCookie(name)` returns the cookie with the given `name`:

```js
// returns the cookie with the given name,
// or undefined if not found
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

<<<<<<< HEAD
ここでは、この正規表現は `; name=<value>` にマッチするよう動的に生成されます。

Cookie の値は任意の文字列にすることができることに留意してください。もしフォーマットを破る文字が含まれている場合(例えばスペースや `;` です)、このような文字はエンコードされます。

デコードするには、組み込みの `decodeURIComponent` 関数を使う必要があります。

### setCookie(name, value, options)

デフォルトでは、Cookie `name` を `path=/` を持つ指定された `value` に設定します(他のデフォルトを追加するよう変更することができます)。
=======
Here `new RegExp` is generated dynamically, to match `; name=<value>`.

Please note that a cookie value is encoded, so `getCookie` uses a built-in `decodeURIComponent` function to decode it.

### setCookie(name, value, options)

Sets the cookie's `name` to the given `value` with `path=/` by default (can be modified to add other defaults):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
<<<<<<< HEAD
    // 必要でれば他のデフォルトを追加する
    ...options
  };

  if (options.expires.toUTCString) {
=======
    // add other defaults here if necessary
    ...options
  };

  if (options.expires instanceof Date) {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

<<<<<<< HEAD
// 使用例:
=======
// Example of use:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

<<<<<<< HEAD
Cookie を削除するためには、負の有効期限でそれを呼びます。:
=======
To delete a cookie, we can call it with a negative expiration date:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

<<<<<<< HEAD
```warn header="更新または削除は同じパスとドメインを使用する必要があります"
注意: Cookie の更新/削除をするとき、セットしたときと正確に同じパスとドメインオプションを使用する必要があります。
```

一つにまとめたものです: [cookie.js](cookie.js).


## 付録: サードパーティ Cookie 

ユーザが訪れているドメイン以外のドメインに置かれた Cookie は "サードパーティ" と呼ばれます。

例:
1. `site.com` のページは別のサイトからバナーをロードします。: `<img src="https://ads.com/banner.png">`
2. バナーと一緒に、`ads.com` のリモートサーバは `id=1234` のような Cookie を持つ `Set-Cookie` ヘッダをセットするかもしれません。このような Cookie は `ads.com` ドメインから発生し、`ads.com` でのみ見えます。:

    ![](cookie-third-party.svg)

3. 次回 `ads.com` にアクセスがあったとき、リモートサーバは `id` Cookie を取得し、ユーザを認識します。:

    ![](cookie-third-party-2.svg)

4. さらに重要なことは、ユーザ `site.com` から同じくバナーをもつ別のサイト `other.com` に移動するとき、`ads.com` に属しているので、`ads.com` は Cookie を受け取ります。このように、訪問者を認識し、彼らがサイト間を移動するのを追跡します。:
=======
```warn header="Updating or deleting must use same path and domain"
Please note: when we update or delete a cookie, we should use exactly the same path and domain options as when we set it.
```

Together: [cookie.js](cookie.js).


## Appendix: Third-party cookies

A cookie is called "third-party" if it's placed by a domain other than the page the user is visiting.

For instance:
1. A page at `site.com` loads a banner from another site: `<img src="https://ads.com/banner.png">`.
2. Along with the banner, the remote server at `ads.com` may set the `Set-Cookie` header with a cookie like `id=1234`. Such a cookie originates from the `ads.com` domain, and will only be visible at `ads.com`:

    ![](cookie-third-party.svg)

3. Next time when `ads.com` is accessed, the remote server gets the `id` cookie and recognizes the user:

    ![](cookie-third-party-2.svg)

4. What's even more important is, when the user moves from `site.com` to another site `other.com`, which also has a banner, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ![](cookie-third-party-3.svg)


<<<<<<< HEAD
サードパーティ Cookie はその性質上、昔からトラッキングや広告サービスに使われています。それらはオリジナルのドメインにバインドされているので、`ads.com` は異なるサイト間で同一ユーザを追跡することができます。

当然、追跡されることを好まない人もいるので、ブラウザはこのような Cookie を無効にすることが可能です。

また、いくつかのモダンブラウザはこのような Cookie 用に特別なポリシーを採用しています。:
- Safari はサードパーティ Cookie を一切許可しません。
- Firefox はサードパーティ Cookie をブロックするサードパーティドメインの "ブラックリスト" を付属しています。


```smart
もし、`<script src="https://google-analytics.com/analytics.js">` のようなサードパーティドメインからスクリプトを読み込み、そのスクリプトが Cookie をセットするために `document.cookie` を使った場合、そのような Cookie はサードパーティ Cookie ではありません。

スクリプトが Cookie を設定した場合、そのスクリプトがどこから来たかは関係ありません。それは現在の Web ページのドメインに属します。
```

## 付録: GDPR

このトピックは JavaScript とはまったく関係ありません。単に Cookie を設定するときに心に留めておくことです。

ヨーロッパには GDPR と呼ばれる法律があり、それは、ユーザのプライバシーを尊重するために Web サイトに対してあるルールを強制しています。そして、このような規則の1つに、追跡をする Cookie に対してはユーザから明示的な許可を要求する、という内容があります。

注意してください。これは、追跡/識別 Cookie についてのみです。

なので、単に情報を保持するだけで、ユーザの追跡も識別もしない Cookie の設定は自由に行う事ができます。 

しかし、認証セッションや追跡id といった情報を Cookie に設定する場合には、ユーザはそれを許可する必要があります。

Web サイトは一般的に GDPR に沿った2つのバリアントを持っています。あなたは web 上でそれら両方を見たことがあるに違いません。:

1. もし web サイトが認証されたユーザに対してのみ追跡 Cookie を設定したい場合。

    そうするためには、登録フォームに "プライバシーポリシーに同意する" のようなチェックボックスをもたせ、ユーザはそれをチェックする必要があります。それ以降、web サイトは認証 Cookie を自由にセットできます。

2. もし web サイトが全員に対して追跡 Cookie を設定したい場合

    合法的にそうするためには、web サイトは新しく来た訪問者のためのモーダル "スプラッシュスクリーン" を表示し、彼らに Cookie に関して同意することを要求します。その後、web サイトは Cookie をセットすることができ、訪問者にコンテンツを見せます。これは新規の訪問者にとっては面倒なことです。コンテンツの代わりに "必ずクリック" モーダルを見たい人はいません。ですが、GDPR は明確な同意を要求します。

GDPR は Cookie だけでなく、他のプライバシーに関連する問題についても同様です。が、それは我々のスコープ外です。


## サマリ

`document.cookie` は Cookie へのアクセスを提供します
- 書き込み操作は、言及された Cookie のみを変更します。
- name/value はエンコードが必要です。
- 1つのCookie は 4KB までで、サイト毎に Cookie は 20+ です(ブラウザによって異なります)

Cookie オプション:
- `path=/`, デフォルトでは、現在のパスです。パス配下でのみ Cookie が見えるようにします。
- `domain=site.com`, デフォルトでは Cookie は現在のドメインでのみ見えます。ドメインが明示的に設定されている場合、サブドメイン上でも Cookie が見えます。
- `expires/max-age`, Cookie の有効期限を設定します。ない場合、Cookie はブラウザが閉じられたときに消えます。
- `secure`, Cookie を HTTPS のみにします。
- `samesite`, ブラウザがサイトの外から来たリクエストで Cookie を送るのを禁止します。XSRF 攻撃を防ぐのに役立ちます。

加えて:
- サードパーティ Cookie はブラウザによっては禁止されている場合があります。e.g. Safari はデフォルトではそうです。
- EU 市民に対して追跡 Cookie を設定する際、GDPR は許可を求めることを要求します。
=======
Third-party cookies are traditionally used for tracking and ads services, due to their nature. They are bound to the originating domain, so `ads.com` can track the same user between different sites, if they all access it.

Naturally, some people don't like being tracked, so browsers allow to disable such cookies.

Also, some modern browsers employ special policies for such cookies:
- Safari does not allow third-party cookies at all.
- Firefox comes with a "black list" of third-party domains where it blocks third-party cookies.


```smart
If we load a script from a third-party domain, like `<script src="https://google-analytics.com/analytics.js">`, and that script uses `document.cookie` to set a cookie, then such cookie is not third-party.

If a script sets a cookie, then no matter where the script came from -- the cookie belongs to the domain of the current webpage.
```

## Appendix: GDPR

This topic is not related to JavaScript at all, just something to keep in mind when setting cookies.

There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect the users' privacy. One of these rules is to require an explicit permission for tracking cookies from the user.

Please note, that's only about tracking/identifying/authorizing cookies.

So, if we set a cookie that just saves some information, but neither tracks nor identifies the user, then we are free to do it.

But if we are going to set a cookie with an authentication session or a tracking id, then a user must allow that.

Websites generally have two variants of following GDPR. You must have seen them both already in the web:

1. If a website wants to set tracking cookies only for authenticated users.

    To do so, the registration form should have a checkbox like "accept the privacy policy" (that describes how cookies are used), the user must check it, and then the website is free to set auth cookies.

2. If a website wants to set tracking cookies for everyone.

    To do so legally, a website shows a modal "splash screen" for newcomers, and requires them to agree to the cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see such "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.


GDPR is not only about cookies, it's about other privacy-related issues too, but that's too much beyond our scope.


## Summary

`document.cookie` provides access to cookies.
- Write operations modify only cookies mentioned in it.
- Name/value must be encoded.
- One cookie may not exceed 4KB in size. The number of cookies allowed on a domain is around 20+ (varies by browser).

Cookie options:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on the current domain only. If the domain is set explicitly, the cookie becomes visible on subdomains.
- `expires` or `max-age` sets the cookie expiration time. Without them the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids the browser to send the cookie with requests coming from outside the site. This helps to prevent XSRF attacks.

Additionally:
- Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
