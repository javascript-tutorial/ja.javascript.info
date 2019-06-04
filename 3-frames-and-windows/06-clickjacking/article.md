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
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* 実際には opacity:0 です */
*/!*
  z-index: 1;
}
</style>

<div>Click to get rich now:</div>

<!-- 被害サイトの url -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>Click here!</button>
*/!*

<div>...And you're cool (I'm a cool hacker actually)!</div>
```

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

```js
if (top != window) {
  top.location = window.location;
}
```

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

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

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

```html
<iframe src="https://twitter.com"></iframe>
```

<iframe src="https://twitter.com"></iframe>

利用しているブラウザによって、上の `iframe` は空、またはブラウザがそのページをこの方法では移動することを許可しないことを警告するものになります。
````

## 機能性を無効にして表示する

`X-Frame-Options` ヘッダには副作用があります。他のサイトでは、たとえ正当な理由があったとしても、ページをフレーム内に表示することはできません。

そのため、他の解決策もあります。例えば、すべてのクリックを遮断するよう、`height: 100%; width: 100%;` を持つ `<div>` でページを "覆う" ことができます。`window == top` または、保護の必要がないと判断した場合には、 `<div>` は消えるようにします。

このようなものです:

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
  // トップのウィンドウが異なるオリジンからのものであればエラーになります
  // ここでは OK です
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

デモ:

[codetabs src="protector"]

## サマリ

クリックジャッキングは、ユーザが何が起きているか知らずに、"騙して" 悪意のあるサイト上でクリックをさせる方法です。重要なクリックによる操作がある場合、それは危険です。

ハッカーは自身の悪意のあるページへのリンクをメッセージで投稿したり、他の手段を使って訪問者を自分のページに誘導します。それには様々なバリエーションがあります。

ある観点から言えば、攻撃は "深く" はありません。ハッカーが行っているのはシングルクリックの傍受/横取りだけです。しかし、別の観点で言えば、ハッカーがクリックの後に別の制御/操作画面が表示されることを知っている場合、狡猾なメッセージを使用して、同様にユーザにそれらをクリックさせることもできます。

この攻撃は非常に危険です。なぜなら、我々がUIを設計するとき、通常はハッカーが訪問者の代わりにクリックすることは予期しないからです。そのため、まったく予想外の場所で脆弱性が見つかる可能性があります。

- フレームの内側に表示されることを意図していないページ(またはWebサイト全体)には`X-Frame-Options: SAMEORIGIN` を利用することを推奨します。
- ページを iframe で表示することを許可したいが、安全を維持したい場合には、覆う `<div>` を使用してください。
