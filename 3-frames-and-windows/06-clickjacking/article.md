<<<<<<< HEAD
# クリックジャッキング

"クリックジャッキング" 攻撃は、*訪問者の代わりに*、 悪意のあるページが "被害を受けたサイト" 上でクリックすることを可能とするものです。

Twitter, Facebook, Paypal やその他を含む多くのサイトはこの方法でハッキングされました。もちろん、今は対処済みです。

## 考え方

この考え方はとても単純です。

これは、Facebookで行われたクリックジャッキングです:

1. 訪問者が悪意のあるページに誘い出されます。方法はここでは関係ありません。
2. そのページは無害に見えるリンクを持っています("今すぐお金持ちになる" や "ここをクリックしてください、とても面白いよ" など)。
3. そのリンクの上に、例えば "いいね" ボタンがそのリンクの真上にくるように、悪意のあるページが facebook.com の `src` を利用した透明な `<iframe>` を配置します。通常これは　`z-index` で行われます。
4. リンクをクリックしようとしたとき、実際には訪問者はそのボタンをクリックすることになります。

## デモ

悪意のあるページがどのように見えるかのデモです。より明白にするために、 `<iframe>` は半透明にしています(実際には、悪意のあるページは完全に透明です)。:

```html run height=120 no-beautify
<style>
iframe { /* 被害サイト からの iframe */
=======
# The clickjacking attack

The "clickjacking" attack allows an evil page to click on a "victim site" *on behalf of the visitor*.

Many sites were hacked this way, including Twitter, Facebook, Paypal and other sites. They have all been fixed, of course.

## The idea

The idea is very simple.

Here's how clickjacking was done with Facebook:

1. A visitor is lured to the evil page. It doesn't matter how.
2. The page has a harmless-looking link on it (like "get rich now" or "click here, very funny").
3. Over that link the evil page positions a transparent `<iframe>` with `src` from facebook.com, in such a way that the "Like" button is right above that link. Usually that's done with `z-index`.
4. In attempting to click the link, the visitor in fact clicks the button.

## The demo

Here's how the evil page looks. To make things clear, the `<iframe>` is half-transparent (in real evil pages it's fully transparent):

```html run height=120 no-beautify
<style>
iframe { /* iframe from the victim site */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
<<<<<<< HEAD
  opacity: 0.5; /* 実際には opacity:0 です */
=======
  opacity: 0.5; /* in real opacity:0 */
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<<<<<<< HEAD
<!-- 被害サイトの url -->
=======
<!-- The url from the victim site -->
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>
*/!*

<div>...And you're cool (I'm a cool hacker actually)!</div>
```

<<<<<<< HEAD
攻撃の完全がデモがこちらです:

[codetabs src="clickjacking-visible" height=160]

ここでは 半透明な `<iframe src="facebook.html">` があり、この例では、"Click here!" と言うボタンの上にあるのが分かります。ボタンをクリックすると、実際には iframe をクリックしますが、iframe は透明なため、ユーザには見えません。

結果、訪問者が Facebook で認証済みの場合 (通常は "ログイン情報を覚えておく" が有効)、"いいね" がされます。Twitter では "フォロー" ボタンかもしれません。

次は、同じ例ですが、現実により近く、 `<iframe>` が `opacity:0` の場合です:

[codetabs src="clickjacking" height=160]

攻撃するために必要なことは、ボタンがリンクの真上にくるよう、`<iframe>` を悪意のあるページに配置することだけです。それは通常 CSS で可能です。

```smart header="クリックジャッキングはクリックに対するものであり、キーボードは含まれません"
この攻撃はマウス操作にのみ影響します。

技術的には、もしハッキングするテキストフィールドがある場合、テキストフィールドが重なるように iframe を配置することはできます。なので、訪問者がページに表示されている入力フィールドにフォーカスを当てようとしたとき、実際には iframe 内の入力フィールドにフォーカスします。

しかし、その後問題があります。iframe は見えないため、訪問者の入力したものは画面上に見えません。

画面上に入力した文字が表示されない場合、通常は入力をやめます。
```

## 伝統的な防御策(弱い)

最も古い防御策は、フレーム内でページを開くことを禁止する JavaScript です(いわゆる "フレームバスティング(framebusting)")。

このようになります:
=======
The full demo of the attack:

[codetabs src="clickjacking-visible" height=160]

Here we have a half-transparent `<iframe src="facebook.html">`, and in the example we can see it hovering over the button. A click on the button actually clicks on the iframe, but that's not visible to the user, because the iframe is transparent.

As a result, if the visitor is authorized on Facebook ("remember me" is usually turned on), then it adds a "Like". On Twitter that would be a "Follow" button.

Here's the same example, but closer to reality, with `opacity:0` for `<iframe>`:

[codetabs src="clickjacking" height=160]

All we need to attack -- is to position the `<iframe>` on the evil page in such a way that the button is right over the link. So that when a user clicks the link, they actually click the button. That's usually doable with CSS.

```smart header="Clickjacking is for clicks, not for keyboard"
The attack only affects mouse actions (or similar, like taps on mobile).

Keyboard input is much difficult to redirect. Technically, if we have a text field to hack, then we can position an iframe in such a way that text fields overlap each other. So when a visitor tries to focus on the input they see on the page, they actually focus on the input inside the iframe.

But then there's a problem. Everything that the visitor types will be hidden, because the iframe is not visible.

People will usually stop typing when they can't see their new characters printing on the screen.
```

## Old-school defences (weak)

The oldest defence is a bit of JavaScript which forbids opening the page in a frame (so-called "framebusting").

That looks like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (top != window) {
  top.location = window.location;
}
```

<<<<<<< HEAD
つまり: window がトップにないことがわかった場合、自身を自動的にトップにします。

ただ、これをハックする方法はたくさんあるため、信頼できる防御策ではありません。いくつか取り上げましょう。

### トップナビゲーションをブロックする

[beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) イベントで、`top.location` を変更することにより引き起こされる遷移をブロックすることができます。

トップページ(ハッカーに属する)はそれにハンドラをセットし、`iframe` が `top.location` を変更しようとすると、訪問者はここを去りたいかを尋ねるメッセージを受け取ります。

このように:
```js
window.onbeforeunload = function() {
  window.onbeforeunload = null;
  return "Want to leave without learning all the secrets (he-he)?";
};
```

ほとんどの場合、訪問者は否定的な回答(ページを去らない)でしょう。なぜなら、彼らはiframe の存在は知らず、見えるのはトップページだけであるため、去る理由がないと思うからです。そのため、`top.location` が変わりません!

動作:

[codetabs src="top-location"]

### Sandbox 属性

`sandbox` 属性によって制限されることの1つに、ナビゲーションがあります。サンドボックス化された iframe は、`top.location` を変更しない場合があります。

つまり、`sandbox="allow-scripts allow-forms"` を持つ iframe を追加します。これは制限を緩和し、スクリプト実行とフォーム送信を許可します。しかし、`top.location` の変更が禁止されるよう、`allow-top-navigation` は省略します。

これがそのコードです:
=======
That is: if the window finds out that it's not on top, then it automatically makes itself the top.

This not a reliable defence, because there are many ways to hack around it. Let's cover a few.

### Blocking top-navigation

We can block the transition caused by changing `top.location` in  [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload) event handler.

The top page (enclosing one, belonging to the hacker) sets a preventing handler to it, like this:

```js
window.onbeforeunload = function() {
  return false;
};
```

When the `iframe` tries to change `top.location`, the visitor gets a message asking them whether they want to leave.

In most cases the visitor would answer negatively because they don't know about the iframe - all they can see is the top page, there's no reason to leave. So `top.location` won't change!

In action:

[codetabs src="top-location"]

### Sandbox attribute

One of the things restricted by the `sandbox` attribute is navigation. A sandboxed iframe may not change `top.location`.

So we can add the iframe with `sandbox="allow-scripts allow-forms"`. That would relax the restrictions, permitting scripts and forms. But we omit `allow-top-navigation` so that changing `top.location` is forbidden.

Here's the code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

<<<<<<< HEAD
この単純な防御を回避する方法は他にもあります。

## X-Frame-Options

サーバサイドのヘッダ `X-Frame-Options` は、フレーム内にページを表示することを許可または禁止することができます。

これは *サーバから* 送られなければなりません。`<meta>` タグの中でそれを見つけても、ブラウザは無視します。したがって、`<meta http-equiv="X-Frame-Options"...>` は何もしません。

このヘッダには3つの値があります:


`DENY`
: 決してフレーム内にページを表示しません。

`SAMEORIGIN`
: 親のドキュメントが同じオリジンから来ている場合、フレームの内側を許可します。

`ALLOW-FROM domain`
: 親のドキュメントが指定されたドメインからのものである場合、フレームの内側を許可します。

例えば、Twitter は `X-Frame-Options: SAMEORIGIN` を使っています。

````online
動作確認:
=======
There are other ways to work around that simple protection too.

## X-Frame-Options

The server-side header `X-Frame-Options` can permit or forbid displaying the page inside a frame.

It must be sent exactly as HTTP-header: the browser will ignore it if found in HTML `<meta>` tag. So, `<meta http-equiv="X-Frame-Options"...>` won't do anything.

The header may have 3 values:


`DENY`
: Never ever show the page inside a frame.

`SAMEORIGIN`
: Allow inside a frame if the parent document comes from the same origin.

`ALLOW-FROM domain`
: Allow inside a frame if the parent document is from the given domain.

For instance, Twitter uses `X-Frame-Options: SAMEORIGIN`.

````online
Here's the result:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<iframe src="https://twitter.com"></iframe>
```

<<<<<<< HEAD
<iframe src="https://twitter.com"></iframe>

利用しているブラウザによって、上の `iframe` は空、またはブラウザがそのページをこの方法では移動することを許可しないことを警告するものになります。
````

## 機能性を無効にして表示する

`X-Frame-Options` ヘッダには副作用があります。他のサイトでは、たとえ正当な理由があったとしても、ページをフレーム内に表示することはできません。

そのため、他の解決策もあります。例えば、すべてのクリックを遮断するよう、`height: 100%; width: 100%;` を持つ `<div>` でページを "覆う" ことができます。`window == top` または、保護の必要がないと判断した場合には、 `<div>` は消えるようにします。

このようなものです:
=======
<!-- ebook: prerender/ chrome headless dies and timeouts on this iframe -->
<iframe src="https://twitter.com"></iframe>

Depending on your browser, the `iframe` above is either empty or alerting you that the browser won't permit that page to be navigating in this way.
````

## Showing with disabled functionality

The `X-Frame-Options` header has a side effect. Other sites won't be able to show our page in a frame, even if they have good reasons to do so.

So there are other solutions... For instance, we can "cover" the page with a `<div>` with styles `height: 100%; width: 100%;`, so that it will intercept all clicks. That `<div>` is to be removed if `window == top` or if we figure out that we don't need the protection.

Something like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Go to the site</a>
</div>

<script>
<<<<<<< HEAD
  // トップのウィンドウが異なるオリジンからのものであればエラーになります
  // ここでは OK です
=======
  // there will be an error if top window is from the different origin
  // but that's ok here
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

<<<<<<< HEAD
デモ:

[codetabs src="protector"]

## サマリ

クリックジャッキングは、ユーザが何が起きているか知らずに、"騙して" 悪意のあるサイト上でクリックをさせる方法です。重要なクリックによる操作がある場合、それは危険です。

ハッカーは自身の悪意のあるページへのリンクをメッセージで投稿したり、他の手段を使って訪問者を自分のページに誘導します。それには様々なバリエーションがあります。

ある観点から言えば、攻撃は "深く" はありません。ハッカーが行っているのはシングルクリックの傍受/横取りだけです。しかし、別の観点で言えば、ハッカーがクリックの後に別の制御/操作画面が表示されることを知っている場合、狡猾なメッセージを使用して、同様にユーザにそれらをクリックさせることもできます。

この攻撃は非常に危険です。なぜなら、我々がUIを設計するとき、通常はハッカーが訪問者の代わりにクリックすることは予期しないからです。そのため、まったく予想外の場所で脆弱性が見つかる可能性があります。

- フレームの内側に表示されることを意図していないページ(またはWebサイト全体)には`X-Frame-Options: SAMEORIGIN` を利用することを推奨します。
- ページを iframe で表示することを許可したいが、安全を維持したい場合には、覆う `<div>` を使用してください。
=======
The demo:

[codetabs src="protector"]

## Samesite cookie attribute

The `samesite` cookie attribute can also prevent clickjacking attacks.

A cookie with such attribute is only sent to a website if it's opened directly, not via a frame, or otherwise. More information in the chapter <info:cookie#samesite>.

If the site, such as Facebook, had `samesite` attribute on its authentication cookie, like this:

```
Set-Cookie: authorization=secret; samesite
```

...Then such cookie wouldn't be sent when Facebook is open in iframe from another site. So the attack would fail.

The `samesite` cookie attribute will not have an effect when cookies are not used. This may allow other websites to easily show our public, unauthenticated pages in iframes.

However, this may also allow clickjacking attacks to work in a few limited cases. An anonymous polling website that prevents duplicate voting by checking IP addresses, for example, would still be vulnerable to clickjacking because it does not authenticate users using cookies.

## Summary

Clickjacking is a way to "trick" users into clicking on a victim site without even knowing what's happening. That's dangerous if there are important click-activated actions.

A hacker can post a link to their evil page in a message, or lure visitors to their page by some other means. There are many variations.

From one perspective -- the attack is "not deep": all a hacker is doing is intercepting a single click. But from another perspective, if the hacker knows that after the click another control will appear, then they may use cunning messages to coerce the user into clicking on them as well.

The attack is quite dangerous, because when we engineer the UI we usually don't anticipate that a hacker may click on behalf of the visitor. So vulnerabilities can be found in totally unexpected places.

- It is recommended to use `X-Frame-Options: SAMEORIGIN` on pages (or whole websites) which are not intended to be viewed inside frames.
- Use a covering `<div>` if we want to allow our pages to be shown in iframes, but still stay safe.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
