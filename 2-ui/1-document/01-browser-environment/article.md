# ブラウザ環境, スペック

<<<<<<< HEAD
当初、JavaScript言語は web ブラウザのために作られました。それ以降、言語は進化し、多くの用途やプラットフォームをもつ言語になりました。

プラットフォームは、ブラウザ、Webサーバ、あるいは別の *ホスト*、JavaScirpt が実行可能であれば "スマートな" コーヒーマシンかもしれません。これらはプラットフォーム固有の機能を提供します。JavaScript スペックではこれを *ホスト環境* と呼んでいます。

ホスト環境は言語のコアに加えて、独自のオブジェクトや機能を提供します。Webブラウザであれば Webページを制御する手段を、Node.js であればサーバサイドの機能などです。

これは、JavaScript がWebブラウザで実行されているときの鳥瞰図です:

![](windowObjects.svg)

`window` と呼ばれる "ルート" オブジェクトがあります。これは2つの役割を持ちます。:
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.

Here's a bird's-eye view of what we have when JavaScript runs in a web browser:

![](windowObjects.svg)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. 1つ目は、これはJavaScriptコードのグローバルオブジェクトであり、<info:global-object> の章で説明するとおりです。
2. 2つ目は、これは "ブラウザウィンドウ" を表し、ウィンドウを制御するためのメソッドを提供します。

<<<<<<< HEAD
例えば、ここではグローバルオブジェクトとして使います:
=======
1. First, it is a global object for JavaScript code, as described in the chapter <info:global-object>.
2. Second, it represents the "browser window" and provides methods to control it.

For instance, we can use it as a global object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run global
function sayHi() {
  alert("Hello");
}

<<<<<<< HEAD
// グローバル関数は window のプロパティとしてアクセス可能
window.sayHi();
```

また、ここではウィンドウの高さを見るためにブラウザウィンドウとして使います:
=======
// global functions are methods of the global object:
window.sayHi();
```

And we can use it as a browser window, to show the window height:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert(window.innerHeight); // 内部の window の高さ
```

<<<<<<< HEAD
window固有のメソッドやプロパティはたくさんあります。後ほどそれらを見ていきます。

## DOM（ドキュメントオブジェクトモデル）

ドキュメントオブジェクトモデル、略して DOM は、ページ全体のコンテンツを変更可能なオブジェクトとして表現します。

`document` オブジェクトはページのメインの "エントリーポイント" です。これを使って、ページ上のものを変更したり作成することができます。
=======
There are more window-specific methods and properties, which we'll cover later.

## DOM (Document Object Model)

The Document Object Model, or DOM for short, represents all page content as objects that can be modified.

The `document` object is the main "entry point" to the page. We can change or create anything on the page using it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:
```js run
<<<<<<< HEAD
// 背景色を赤に変える
document.body.style.background = 'red';

// 1秒後に戻す
setTimeout(() => document.body.style.background = '', 1000);
```

ここでは `document.body.style` を使いましたが、まだまだあります。プロパティとメソッドはスペック : [DOM Living Standard](https://dom.spec.whatwg.org) で説明されています。

```smart header="DOM はブラウザだけではありません"
DOM スペックはドキュメントの構造を説明し、操作するためのオブジェクトを提供します。DOM を使う非ブラウザのものもあります。

例えば、HTMLページをダウンロードしそれを処理するサーバサイドのスクリプトです。DOM スペックの一部のみをサポートしているかもしれません。
```

```smart header="スタイルのための CSSOM"
CSS ルールやスタイルシートのための別のスペック[CSS オブジェクトモデル（CSSOM）](https://www.w3.org/TR/cssom-1/)があります。 これはオブジェクトとしてどのように表現され、どのようにそれらを読み書きするかが記述されています。

CSSOM は document のスタイルルールを変更するとき、DOM と一緒に使われます。ですが実際には、JavaScript からCSSルールを変更することはめったにないため、CSSOM はほとんど使われません（通常は CSSルールの変更ではなく、CSSクラスの追加削除をします）が、それも可能です。
```

## BOM (HTML仕様の一部) 

ブラウザオブジェクトモデル(BOM)は document 以外のすべてと連携するブラウザ(ホスト環境)により提供される追加オブジェクトです。
=======
// change the background color to red
document.body.style.background = "red";

// change it back after 1 second
setTimeout(() => document.body.style.background = "", 1000);
```

Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM is not only for browsers"
The DOM specification explains the structure of a document and provides objects to manipulate it. There are non-browser instruments that use DOM too.

For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
```

```smart header="CSSOM for styling"
There's also a separate specification, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) for CSS rules and stylesheets, that explains how they are represented as objects, and how to read and write them.

The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
```

## BOM (Browser Object Model)

The Browser Object Model (BOM) represents additional objects provided by the browser (host environment) for working with everything except the document.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば:

<<<<<<< HEAD
- [navigator](mdn:api/Window/navigator) オブジェクトはブラウザとオペレーティングシステムのバックグラウンドの情報を提供します。多くのプロパティを持っていますが、最も広く知られている2つのプロパティはこれです: `navigator.userAgent` -- 現在のブラウザについて, `navigator.platform` -- プラットフォームについて(Windows/Linux/Macなどを分ける)
- [location](mdn:api/Window/location) オブジェクトは現在のURLを読み、ブラウザを新しいURLへリダイレクトできます。
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは、`location` オブジェクトを使う方法です:

```js run
<<<<<<< HEAD
alert(location.href); // 現在のURLを表示
if (confirm("Go to wikipedia?")) {
  location.href = 'https://wikipedia.org'; // 別のURLへリダイレクト
}
```

関数 `alert/confirm/prompt` もまた BOM の一部です: それらは直接は document と関係はしませんが、ユーザとコミュニケーションをとる純粋なブラウザメソッドを表します。

```smart header="HTML スペック"
BOM は一般的な [HTML スペック](https://html.spec.whatwg.org)の一部です。

<https://html.spec.whatwg.org> のHTMLスペックは "HTML言語" (タグ、属性) についてだけでなく、多くのオブジェクトやメソッド、ブラウザ固有のDOM拡張をカバーします。それは "広義のHTML" です。また、いくつかのパートは <https://spec.whatwg.org> にリストされている追加のスペックがあります。
=======
alert(location.href); // shows current URL
if (confirm("Go to Wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirect the browser to another URL
}
```

The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## サマリ 

標準に関して説明しました:

DOM スペック
: document 構造、操作、およびイベントについて説明します。<https://dom.spec.whatwg.org> を見てください。

CSSOM スペック
: スタイルシートとスタイルルール、それらの操作や document へのバインディングについて説明します。<https://www.w3.org/TR/cssom-1/> を見てください。

<<<<<<< HEAD
HTML スペック
: HTML言語(タグなど) や BOM(ブラウザオブジェクトモデル) を説明します -- 様々なブラウザ関数があります: `setTimeout`, `alert`, `location` など、<https://html.spec.whatwg.org> を見てください。それは DOM 仕様と多くの追加プロパティやメソッドを使ったその拡張です。

加えて、いくつかのクラスは <https://spec.whatwg.org/> で個別に説明があります。

これらのリンクをメモしておいてください。学ぶことがたくさんあるので、すべてをカバーして覚えるのは不可能です。

プロパティまたはメソッドについて読みたくなったとき、<https://developer.mozilla.org/en-US/search> にある Mozilla のマニュアルも優れたリソースですが、対応するスペックを読む方がよいかもしれません: 複雑で長いかもしれませんが、基本の知識は健全で完全なものになります。

何かを見つけるには、インターネット検索で "WHATWG [term]" あるいは "MDN [term]" を使用すると便利なことがよくあります。例: <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>。

次に、ドキュメントが UI の中心的な役割を果たすので、DOM の学習を勧めていきます。
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.

HTML specification
: Describes the HTML language (e.g. tags) and also the BOM (browser object model) -- various browser functions: `setTimeout`, `alert`, `location` and so on, see <https://html.spec.whatwg.org>. It takes the DOM specification and extends it with many additional properties and methods.

Additionally, some classes are described separately at <https://spec.whatwg.org/>.

Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.

To find something, it's often convenient to use an internet search "WHATWG [term]" or "MDN [term]", e.g <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
