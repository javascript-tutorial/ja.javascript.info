# ブラウザ環境, 仕様

<<<<<<< HEAD
当初、JavaScript言語は web ブラウザのために作られました。それ以降、言語は進化し、多くの用途やプラットフォームをもつ言語になりました。

ホスト環境は、言語のコアに加えてプラットフォーム固有のオブジェクトや機能を提供します。Web ブラウザは webページを制御する手段を提供します。Node.JSはサーバサイドの機能などを提供します。
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved and become a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, even a coffee machine. Each of them provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides own objects and functions additional to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

Here's a bird's-eye view of what we have when JavaScript runs in a web-browser:

<<<<<<< HEAD
これは、JavaScript がWebブラウザで実行されているときの鳥瞰図です:

=======
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
![](windowObjects.svg)

`window` と呼ばれる "ルート" オブジェクトがあります。それは2つの役割を持ちます。:

1. 1つ目は、それはJavaScriptコードのグローバルオブジェクトであり、チャプター <info:global-object> で説明したとおりです。
2. 2つ目は、それは "ブラウザウィンドウ" を表し、ウィンドウを制御するためのメソッドを提供します。

例えば、ここではグローバルオブジェクトとして使います:

```js run
function sayHi() {
  alert("Hello");
}

<<<<<<< HEAD
// グローバル関数は window のプロパティとしてアクセス可能
=======
// global functions are methods of the global object:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
window.sayHi();
```

また、ここではウィンドウの高さを見るためにブラウザウィンドウとして使います:

```js run
alert(window.innerHeight); // 内部の window の高さ
```

window固有のメソッドやプロパティがたくさんあります。我々は後ほどそれをカバーしましょう。

<<<<<<< HEAD
## ドキュメントオブジェクトモデル (DOM) 

`document` オブジェクトはページのコンテンツへのアクセスを提供します。私たちはそれを使ってページ上のものを変更したり作成することができます。
=======
## DOM (Document Object Model)

Document Object Model, or DOM for short, represents all page content as objects that can be modified.

The `document` object is the main "entry point" to the page. We can change or create anything on the page using it.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

例:
```js run
<<<<<<< HEAD
// 背景色を赤に変える
document.body.style.background = 'red';

// それを1秒後に戻す
setTimeout(() => document.body.style.background = '', 1000);
```

ここでは `document.body.style` を使いましたが、まだまだあります。プロパティとメソッドは仕様で説明されています。偶然にも、それを開発する2つのワーキンググループがあります:

1. [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) -- ドキュメントは <https://www.w3.org/TR/dom> です.
2. [WhatWG](https://en.wikipedia.org/wiki/WHATWG), <https://dom.spec.whatwg.org> で公開しています.

あいにく、2つのグループが必ずしも一致するわけではないので、2組の標準があります。しかし、彼らは密接な関係にあり、最終的には物事はマージされます。従って、あなたが見つけたドキュメントはとても似ており、99% 一致します。ごくわずかな違いがありますが、気づかないかもしれません。

個人的には、<https://dom.spec.whatwg.org> が使いやすいと思います。

ずいぶん昔、まったく標準がありませんでした -- 各ブラウザが必要なものを実装しました。従って、異なるブラウザは、同じものに対して異なるセットのメソッドとプロパティを持っていました。そして、開発者はそれぞれのために異なるコードを書かなければなりませんでした。暗く、散らかった時代です。

今でさえ、ブラウザ固有のプロパティを使い、非互換を回避している古いコードに出会うことがあります。しかし、このチュートリアルでは、現代の物を使います: あなたが本当に必要になるときまで、古いものを学ぶ必要はありません(本当に必要になるときはあまりないでしょう)。

その後、誰もが合意をするための試みとして、DOM標準が現れました。最初のバージョンは "DOM Level 1" で、それは DOM Level 2, 次に DOM Level 3 と拡張され、今は DOM Level 4 になりました。WhatWG グループの人々はバージョンに疲れて、単に "DOM" と番号なしで呼んでいます。私たちもそうしましょう。

```smart header="DOM はブラウザだけではありません"
DOM 仕様は ドキュメント の構造を説明し、それを操作するためのオブジェクトを提供します。それを使う非ブラウザのものもあります。

例えば、HTMLページをダウンロードしそれを処理するサーバサイドのツールです。DOM仕様の一部のみをサポートしているかもしれませんが。
```

```smart header="スタイルのための CSSOM"
CSS ルールやスタイルシートは HTML のように構造化されていません。そのため、それらがオブジェクトとしてどのように表現され、どのようにそれらを読み書きするかを説明する別の仕様[CSSOM](https://www.w3.org/TR/cssom-1/)があります。

CSSOM は document のスタイルルールを変更するとき、DOM と一緒に使われます。実際には、通常はCSSルールが静的であるため、CSSOMはめったに必要ありません。 JavaScriptのCSSルールを追加/削除することはめったにありませんので、今すぐはカバーしません。
```

## BOM (HTML仕様の一部) 
=======
// change the background color to red
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);
```

Here we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification:

- **DOM Living Standard** at <https://dom.spec.whatwg.org>

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use DOM too.

For instance, server-side scripts that download HTML pages and process them can also use DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
CSS rules and stylesheets are structured in a different way than HTML. There's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how they are represented as objects, and how to read and write them.

CSSOM is used together with DOM when we modify style rules for the document. In practice though, CSSOM is rarely required, because usually CSS rules are static. We rarely need to add/remove CSS rules from JavaScript, but that's also possible.
```

## BOM (Browser object model)
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

ブラウザオブジェクトモデル(BOM)は document 以外のすべてと連携するブラウザ(ホスト環境)により提供される追加オブジェクトです。

例えば:

<<<<<<< HEAD
- [navigator](mdn:api/Window/navigator) オブジェクトはブラウザとオペレーティングシステムのバックグラウンドの情報を提供します。多くのプロパティを持っていますが、最も広く知られている2つのプロパティはこれです: `navigator.userAgent` -- 現在のブラウザについて, `navigator.platform` -- プラットフォームについて(Windows/Linux/Macなどを分ける)
- [location](mdn:api/Window/location) オブジェクトは現在のURLを読み、ブラウザを新しいURLへリダイレクトできます。
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

これは、`location` オブジェクトを使う方法です:

```js run
<<<<<<< HEAD
alert(location.href); // 現在のURLを表示
if (confirm("Go to wikipedia?")) {
  location.href = 'https://wikipedia.org'; // 別のURLへリダイレクト
}
```

関数 `alert/confirm/prompt` もまた BOM の一部です: それらは直接は document と関係はしませんが、ユーザとコミュニケーションをとる純粋なブラウザメソッドを表します。

```smart header="HTML 仕様"
BOM は一般的な [HTML 仕様](https://html.spec.whatwg.org)の一部です。

<https://html.spec.whatwg.org> のHTML仕様は "HTML言語" (タグ、属性) についてだけでなく、多くのオブジェクトやメソッド、ブラウザ固有のDOM拡張をカバーします。それは "広義のHTML" です。
=======
alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

Functions `alert/confirm/prompt` are also a part of BOM: they are directly not related to the document, but represent pure browser methods of communicating with the user.

```smart header="Specifications"
BOM is the part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
```

## サマリ 

標準に関して:

DOM 仕様
: document 構造、操作、およびイベントについて説明します。<https://dom.spec.whatwg.org> を見てください。

CSSOM 仕様
: スタイルシートとスタイルルール、それらの操作や document へのバインディングについて説明します。<https://www.w3.org/TR/cssom-1/> を見てください。

<<<<<<< HEAD
HTML 仕様
: HTML言語(タグなど) や BOM(ブラウザオブジェクトモデル) を説明します -- 様々なブラウザ関数があります: `setTimeout`, `alert`, `location` など、<https://html.spec.whatwg.org> を見てください。それは DOM 仕様と多くの追加プロパティやメソッドを使ったその拡張です。

document はUIで中心的な役割を果たすため、今からDOMを学ぶことになるでしょう。それを使って作業するのが最も複雑な部分です。

学ぶことが非常に多くあるので、上のリンクには注意してください。すべてをカバーし、覚えるのは不可能です。

プロパティまたはメソッドについて読みたくなったとき -- <https://developer.mozilla.org/en-US/search> のMozilla マニュアルは良いです、が対応する仕様を読む方がよりよいかもしれません: より複雑で長いですが、基本の知識は健全で完全なものになります。
=======
HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Additionally, some classes are described separately at <https://spec.whatwg.org/>.

Please note these links, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now we'll get down to learning DOM, because the document plays the central role in the UI.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1
