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

```js run
document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
```

## path

- **`path=/mypath`**

Cookie へアクセス可能な URL パスプレフィックスです。絶対値でなければなりません。デフォルトでは現在のパスになります。

Cookie が `path=/mypath` で設定された場合、それは `/mypath` と `/mypath/*` で見えますが、`/page` や `/mypathpage` では見えません。

通常は、すべての Webサイトのページから Cookie へアクセスできるよう、`path=/` を設定します。

## domain

- **`domain=site.com`**

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
let date = new Date(Date.now() + 86400e3);
date = date.toUTCString();
document.cookie = "user=John; expires=" + date;
```

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

## secure

- **`secure`**

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

いつ役立つのかを理解するために、次の攻撃シナリをを紹介しましょう。

### XSRF 攻撃

想像してください、あなたはサイト `bank.com` にログインしました。つまり:あなたはそのサイトからの認証 Cookie を持っています。ブラウザは、あなたを認識して、すべての慎重に扱うべき金融操作を実行するために、リクエスト毎に Cookie を `bank.com` に送信します。 

いま、別のウィンドウで Web をブラウジングしていると、別のサイト `evil.com` にやってきました。そして、それはハッカーのアカウントを持つ `<form action="https://bank.com/pay">` と、自動的にサブミットする JavaScript コードを持っています。

そのフォームは `evil.com` から直接銀行のサイトに送信され、あなたの Cookie も送信されます。なぜなら、あなたが `bank.com` に訪れるたびに送信されるからです。そのため、銀行はあなたを認識し、実際に支払いを実行します。

![](cookie-xsrf.png)

これはクロスサイトリクエストフォージェリ(または XSRF)攻撃と呼ばれます。

もちろん、実際の銀行はそれから保護されています。`bank.com` によって生成されたすべてのフォームは、"xsrf 保護トークン" と呼ばれる特別なフィールドを持っており、悪意のあるページはそれを生成することも、リモートページから何らかの形で抽出することもできません(そこにフォームを送信することはできますが、データを戻すことはできません)。

### Cookie samesite オプションを入力する

いま、Cookie `samesite` オプションはこのような攻撃から保護するためのもう1つの方法を提供します。それは(理論的には)、"xsrf 保護トークン" を必要としません。

2つのとり得る値があります:

- **`samesite=strict`, 値なしの `samesite` と同じです**

A cookie with `samesite=strict` is never sent if the user comes from outside the site.

In other words, whether a user follows a link from the mail or submits a form from `evil.com`, or does any operation with the site that originates from another domain, the cookie is not sent. Then the XSRF attack will fail, as `bank.com` will not recognize the user without the cookie, and will not proceed with the payment.

The protection is quite reliable. Only operations that come from `bank.com` will send the samesite cookie.

Although, there's a small inconvenience.

When a user follows a legitimate link to `bank.com`, like from their own notes, they'll be surprised that `bank.com` does not recognize them. Indeed, `samesite=strict` cookies are not sent in that case.

We could work around that by using two cookies: one for "general recognition", only for the purposes of saying: "Hello, John", and the other one for data-changing operations with `samesite=strict`.

Then a person coming from outside of the site will see a welcome, but payments must be initiated from the bank website.

- **`samesite=lax`**

Another approach to keep user experience is to use `samesite=lax`, a more relaxed value.

Lax mode, just like `strict`, forbids the browser to send cookies when coming from outside the site, but adds an exception.

A `samesite=lax` cookie is sent if both of these conditions are true:
1. The HTTP method is "safe" (e.g. GET, but not POST).

    The full list safe of HTTP methods is in the [RFC7231 specification](https://tools.ietf.org/html/rfc7231). Basically, these are the methods that should be used for reading, but not writing the data. They must not perform any data-changing operations. Following a link is always GET, the safe method.

2. The operation performs top-level navigation (changes URL in the browser address bar).

    That's usually true, but if the navigation is performed in an `<iframe>`, then it's not top-level. Also, AJAX requests do not perform any navigation, hence they don't fit.

So, what `samesite=lax` does is basically allows a most common "open URL" operation to bring cookies. Something more complicated, like AJAX request from another site or a form submittion loses cookies.

If that's fine for you, then adding `samesite=lax` will probably not break the user experience and add protection.

Overall, `samesite` is great, but it has an important drawback:
- `samesite` is not supported, ignored by old browsers (like year 2017).

**So if we solely rely on `samesite` to provide protection, then old browsers will be totally vulnerable.**

But we surely can use `samesite` together with other protection measures, like xsrf tokens, to add an additional layer of defence.

## httpOnly

This option has nothing to do with Javascript, but we have to mention it for completeness.

Only the server, when it uses `Set-Cookie` to set a cookie, may set the `httpOnly` option.

This option forbids any JavaScript access to the cookie. We can't see such cookie or manipulate it using `document.cookie`.

That's used as a precaution measure, to protect from certain attacks when a hacker injects his own Javascript code into a page and waits for a user to visit that page. That shouldn't be possible at all, a hacker should not be able to inject their code into our site, but there may be bugs that let hackers do it.


Normally, if such thing happens, and a user visits a web-page with hacker's code, then that code executes and gains access to `document.cookie` with user cookies containing authentication information. That's bad.

But if a cookie is `httpOnly`, then `document.cookie` doesn't see it, so it is protected.

## Appendix: Cookie functions

Here's a small set of functions to work with cookies, more conveinent than a manual modification of `document.cookie`.

There exist many cookie libraries for that, so these are for demo purposes. Fully working though:


### getCookie(name)

The shortest way to access cookie is to use a [regular expression](info:regular-expressions).

The function `getCookie(name)` returns the cookie with the given `name`:

```js
// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

Here the regexp is generated dynamically, to match `; name=<value>`.

Please note that a cookie value can be an arbitrary string. If it contains characters that break the formatting, for instance spaces or `;`, such characters are encoded.

To decode them, we need to use a built-in `decodeURIComponent` function, the function does it also.

### setCookie(name, value, options)

Sets the cookie `name` to the given `value` with `path=/` by default (can be modified to add other defaults):

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // add other defaults here if necessary
    ...options
  };

  if (options.expires.toUTCString) {
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

// Example of use:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

To delete a cookie, we can call it with a negative expiration date:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

```warn header="Updating or deleting must use same path and domain"
Please note: when we update or delete a cookie, we should use exactly the same path and domain options as when we set it.
```

Together: [cookie.js](cookie.js).


## Appendix: Third-party cookies

A cookie is called "third-party" if it's placed by domain other than the user is visiting.

For instance:
1. A page at `site.com` loads an banner from another site: `<img src="https://ads.com/banner.png">`.
2. Along with the banner, the remote server at `ads.com` may set `Set-Cookie` header with cookie like `id=1234`. Such cookie originates from `ads.com` domain, and will only be visible at `ads.com`:

    ![](cookie-third-party.png)

3. Next time when `ads.com` is accessed, the remote server gets the `id` cookie and recognizes the user:

    ![](cookie-third-party-2.png)

4. What's even more important, when the users moves from `site.com` to another site `other.com` that also has a banners, then `ads.com` gets the cookie, as it belongs to `ads.com`, thus recognizing the visitor and tracking him as he moves between sites:

    ![](cookie-third-party-3.png)


Third-party cookies are traditionally used for tracking and ads services, due to their nature. They are bound to the originating domain, so `ads.com` can track the same user between different sites, if they all access it.

Naturally, some people don't like being tracked, so browsers allow to disable such cookies.

Also, some modern browsers employ special policies for such cookies:
- Safari does not allow third-party cookies at all.
- Firefox comes with a "black list" of third-party domains where it blocks third-party cookies.


```smart
If we load a script from a third-party domain, like `<script src="https://google-analytics.com/analytics.js">`, and that script uses `document.cookie` to set a cookie, then such cookie is not third-party.

If a script sets a cookie, then no matter where the script came from -- ito belongs to the domain of the current webpage.
```

## Appendix: GDPR

This topic is not related to JavaScript at all, just something to keep in mind when setting cookies.

There's a legislation in Europe called GDPR, that enforces a set of rules for websites to respect users' privacy. And one of such rules is to require an explicit permission for tracking cookies from a user.

Please note, that's only about tracking/identifying cookies.

So, if we set a cookie that just saves some information, but neither tracks nor identifies the user, then we are free to do it.

But if we are going to set a cookie with an authentication session or a tracking id, then a user must allow that.

Websites generally have two variants of following GDPR. You must have seen them both already in the web:

1. If a website wants to set tracking cookies only for authenticated users.

    To do so, the registration form should have a checkbox like "accept the privacy policy", the user must check it, and then the website is free to set auth cookies.

2. If a website wants to set tracking cookies for everyone.

    To do so legally, a website shows a modal "splash screen" for newcomers, and require them to agree for cookies. Then the website can set them and let people see the content. That can be disturbing for new visitors though. No one likes to see "must-click" modal splash screens instead of the content. But GDPR requires an explicit agreement.


GDPR is not only about cookies, it's about other privacy-related issues too, but that's too much beyond our scope.


## Summary

`document.cookie` provides access to cookies
- write operations modify only cookies mentioned in it.
- name/value must be encoded.
- one cookie up to 4kb, 20+ cookies per site (depends on a browser).

Cookie options:
- `path=/`, by default current path, makes the cookie visible only under that path.
- `domain=site.com`, by default a cookie is visible on current domain only, if set explicitly to the domain, makes the cookie visible on subdomains.
- `expires/max-age` set cookie expiration time, without them the cookie dies when the browser is closed.
- `secure` makes the cookie HTTPS-only.
- `samesite` forbids browser to send the cookie with requests coming from outside the site, helps to prevent XSRF attacks.

Additionally:
- Third-party cookies may be forbidden by the browser, e.g. Safari does that by default.
- When setting a tracking cookie for EU citizens, GDPR requires to ask for permission.
