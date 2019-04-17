# ブラウザ環境, 仕様

<<<<<<< HEAD
当初、JavaScript言語は web ブラウザのために作られました。それ以降、言語は進化し、多くの用途やプラットフォームをもつ言語になりました。

ホスト環境は、言語のコアに加えてプラットフォーム固有のオブジェクトや機能を提供します。Web ブラウザは webページを制御する手段を提供します。Node.JSはサーバサイドの機能などを提供します。

[cut]

これは、JavaScript がWebブラウザで実行されているときの鳥瞰図です:
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved and become a language with many uses and platforms.

A platform may be a browser, or a web-server, or a washing machine, or another *host*. Each of them provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides platform-specific objects and functions additional to the language core. Web browsers give a means to control web pages. Node.JS provides server-side features, and so on.

Here's a bird's-eye view of what we have when JavaScript runs in a web-browser:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

![](windowObjects.png)

`window` と呼ばれる "ルート" オブジェクトがあります。それは2つの役割を持ちます。:

1. 1つ目は、それはJavaScriptコードのグローバルオブジェクトであり、チャプター <info:global-object> で説明したとおりです。
2. 2つ目は、それは "ブラウザウィンドウ" を表し、ウィンドウを制御するためのメソッドを提供します。

例えば、ここではグローバルオブジェクトとして使います:

```js run
function sayHi() {
  alert("Hello");
}

// グローバル関数は window のプロパティとしてアクセス可能
window.sayHi();
```

また、ここではウィンドウの高さを見るためにブラウザウィンドウとして使います:

```js run
alert(window.innerHeight); // 内部の window の高さ
```

window固有のメソッドやプロパティがたくさんあります。我々は後ほどそれをカバーしましょう。

## ドキュメントオブジェクトモデル (DOM) 

`document` オブジェクトはページのコンテンツへのアクセスを提供します。私たちはそれを使ってページ上のものを変更したり作成することができます。

例:
```js run
<<<<<<< HEAD
// 背景色を赤に変える
document.body.style.background = 'red';

// それを1秒後に戻す
setTimeout(() => document.body.style.background = '', 1000);
```

ここでは `document.body.style` を使いましたが、まだまだあります。プロパティとメソッドは仕様で説明されています。偶然にも、それを開発する2つのワーキンググループがあります:
=======
// change the background color to red
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);
```

Here we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification. There happen to be two working groups who develop it:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

1. [W3C](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) -- ドキュメントは <https://www.w3.org/TR/dom> です.
2. [WhatWG](https://en.wikipedia.org/wiki/WHATWG), <https://dom.spec.whatwg.org> で公開しています.

<<<<<<< HEAD
あいにく、2つのグループが必ずしも一致するわけではないので、2組の標準があります。しかし、彼らは密接な関係にあり、最終的には物事はマージされます。従って、あなたが見つけたドキュメントはとても似ており、99% 一致します。ごくわずかな違いがありますが、気づかないかもしれません。
=======
As it happens, the two groups don't always agree, so it's like we have two sets of standards. But they are very similar and eventually things merge. The documentation that you can find on the given resources is very similar, with about a 99% match. There are very minor differences that you probably won't notice.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

個人的には、<https://dom.spec.whatwg.org> が使いやすいと思います。

<<<<<<< HEAD
ずいぶん昔、まったく標準がありませんでした -- 各ブラウザが必要なものを実装しました。従って、異なるブラウザは、同じものに対して異なるセットのメソッドとプロパティを持っていました。そして、開発者はそれぞれのために異なるコードを書かなければなりませんでした。暗く、散らかった時代です。

今でさえ、ブラウザ固有のプロパティを使い、非互換を回避している古いコードに出会うことがあります。しかし、このチュートリアルでは、現代の物を使います: あなたが本当に必要になるときまで、古いものを学ぶ必要はありません(本当に必要になるときはあまりないでしょう)。

その後、誰もが合意をするための試みとして、DOM標準が現れました。最初のバージョンは "DOM Level 1" で、それは DOM Level 2, 次に DOM Level 3 と拡張され、今は DOM Level 4 になりました。WhatWG グループの人々はバージョンに疲れて、単に "DOM" と番号なしで呼んでいます。私たちもそうしましょう。
=======
In the ancient past, there was no standard at all -- each browser implemented however it wanted. Different browsers had different sets, methods, and properties for the same thing, and developers had to write different code for each of them. Dark, messy times.

Even now we can sometimes meet old code that uses browser-specific properties and works around incompatibilities. But, in this tutorial we'll use modern stuff: there's no need to learn old things until you really need to (chances are high that you won't).

Then the DOM standard appeared, in an attempt to bring everyone to an agreement. The first version was "DOM Level 1", then it was extended by DOM Level 2, then DOM Level 3, and now it's reached DOM Level 4. People from WhatWG group got tired of version numbers and are calling it just "DOM", without a number. So we'll do the same.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```smart header="DOM はブラウザだけではありません"
DOM 仕様は ドキュメント の構造を説明し、それを操作するためのオブジェクトを提供します。それを使う非ブラウザのものもあります。

<<<<<<< HEAD
例えば、HTMLページをダウンロードしそれを処理するサーバサイドのツールです。DOM仕様の一部のみをサポートしているかもしれませんが。
```

```smart header="スタイルのための CSSOM"
CSS ルールやスタイルシートは HTML のように構造化されていません。そのため、それらがオブジェクトとしてどのように表現され、どのようにそれらを読み書きするかを説明する別の仕様[CSSOM](https://www.w3.org/TR/cssom-1/)があります。
=======
For instance, server-side tools that download HTML pages and process them use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
CSS rules and stylesheets are not structured like HTML. There's a separate specification [CSSOM](https://www.w3.org/TR/cssom-1/) that explains how they are represented as objects, and how to read and write them.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

CSSMON は document のスタイルルールを変更するとき、DOM と一緒に使われます。実際には、通常はCSSルールが静的であるため、CSSOMはめったに必要ありません。 JavaScriptのCSSルールを追加/削除することはめったにありませんので、今すぐはカバーしません。
```

## BOM (HTML仕様の一部) 

ブラウザオブジェクトモデル(BOM)は document 以外のすべてと連携するブラウザ(ホスト環境)により提供される追加オブジェクトです。

例えば:

<<<<<<< HEAD
- [navigator](mdn:api/Window/navigator) オブジェクトはブラウザとオペレーティングシステムのバックグラウンドの情報を提供します。多くのプロパティを持っていますが、最も広く知られている2つのプロパティはこれです: `navigator.userAgent` -- 現在のブラウザについて, `navigator.platform` -- プラットフォームについて(Windows/Linux/Macなどを分ける)
- [location](mdn:api/Window/location) オブジェクトは現在のURLを読み、ブラウザを新しいURLへリダイレクトできます。
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differ between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

これは、`location` オブジェクトを使う方法です:

```js run
alert(location.href); // 現在のURLを表示
if (confirm("Go to wikipedia?")) {
<<<<<<< HEAD
  location.href = 'https://wikipedia.org'; // 別のURLへリダイレクト
=======
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
}
```

関数 `alert/confirm/prompt` もまた BOM の一部です: それらは直接は document と関係はしませんが、ユーザとコミュニケーションをとる純粋なブラウザメソッドを表します。

```smart header="HTML 仕様"
BOM は一般的な [HTML 仕様](https://html.spec.whatwg.org)の一部です。

<https://html.spec.whatwg.org> のHTML仕様は "HTML言語" (タグ、属性) についてだけでなく、多くのオブジェクトやメソッド、ブラウザ固有のDOM拡張をカバーします。それは "広義のHTML" です。
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

プロパティまたはメソッドについて読みたくなったとき -- <https://developer.mozilla.org/en-US/search> のMozilla マニュアルは良いです、が対応する仕様を読む方がよりよりかもしれません: より複雑で長いですが、基本の知識は健全で完全なものになります。
=======
HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Now we'll get down to learning DOM, because the document plays the central role in the UI.

Please note the links above, as there's so much stuff to learn it's impossible to cover and remember everything.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/search> is a nice resource, but reading the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
