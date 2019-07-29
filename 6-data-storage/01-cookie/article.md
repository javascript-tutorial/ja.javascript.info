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
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
```

ここでは、この正規表現は `; name=<value>` にマッチするよう動的に生成されます。

Cookie の値は任意の文字列にすることができることに留意してください。もしフォーマットを破る文字が含まれている場合(例えばスペースや `;` です)、このような文字はエンコードされます。

デコードするには、組み込みの `decodeURIComponent` 関数を使う必要があります。

### setCookie(name, value, options)

デフォルトでは、Cookie `name` を `path=/` を持つ指定された `value` に設定します(他のデフォルトを追加するよう変更することができます)。

```js run
function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    // 必要でれば他のデフォルトを追加する
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

// 使用例:
setCookie('user', 'John', {secure: true, 'max-age': 3600});
```

### deleteCookie(name)

Cookie を削除するためには、負の有効期限でそれを呼びます。:

```js
function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}
```

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

4. さらに重要なことは、ユーザ `site.com` から同じくバナーをもつ別のサイト `other.coom` に移動するとき、`ads.coom` に属しているので、`ads.com` は Cookie を受け取ります。このように、訪問者を認識し、彼らがサイト間を移動するのを追跡します。:

    ![](cookie-third-party-3.svg)


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
