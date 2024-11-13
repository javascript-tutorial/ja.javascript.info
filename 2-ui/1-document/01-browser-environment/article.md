# ブラウザ環境, スペック

当初、JavaScript言語は web ブラウザのために作られました。それ以降、言語は進化し、多くの用途やプラットフォームをもつ言語になりました。

プラットフォームは、ブラウザ、Webサーバ、あるいは別の *ホスト*、JavaScript が実行可能であれば "スマートな" コーヒーマシンかもしれません。これらはプラットフォーム固有の機能を提供します。JavaScript スペックではこれを *ホスト環境* と呼んでいます。

ホスト環境は言語のコアに加えて、独自のオブジェクトや機能を提供します。Webブラウザであれば Webページを制御する手段を、Node.js であればサーバサイドの機能などです。

これは、JavaScript がWebブラウザで実行されているときの鳥瞰図です:

![](windowObjects.svg)

`window` と呼ばれる "ルート" オブジェクトがあります。これは2つの役割を持ちます。:

1. 1つ目は、これはJavaScriptコードのグローバルオブジェクトであり、<info:global-object> の章で説明するとおりです。
2. 2つ目は、これは "ブラウザウィンドウ" を表し、ウィンドウを制御するためのメソッドを提供します。

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

window固有のメソッドやプロパティはたくさんあります。後ほどそれらを見ていきます。

## DOM（ドキュメントオブジェクトモデル）

ドキュメントオブジェクトモデル、略して DOM は、ページ全体のコンテンツを変更可能なオブジェクトとして表現します。

`document` オブジェクトはページのメインの "エントリーポイント" です。これを使って、ページ上のものを変更したり作成することができます。

例:
```js run
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

例えば:

- [navigator](mdn:api/Window/navigator) オブジェクトはブラウザとオペレーティングシステムのバックグラウンドの情報を提供します。多くのプロパティを持っていますが、最も広く知られている2つのプロパティはこれです: `navigator.userAgent` -- 現在のブラウザについて, `navigator.platform` -- プラットフォームについて(Windows/Linux/Macなどを分ける)
- [location](mdn:api/Window/location) オブジェクトは現在のURLを読み、ブラウザを新しいURLへリダイレクトできます。

これは、`location` オブジェクトを使う方法です:

```js run
alert(location.href); // 現在のURLを表示
if (confirm("Go to wikipedia?")) {
  location.href = 'https://wikipedia.org'; // 別のURLへリダイレクト
}
```

関数 `alert/confirm/prompt` もまた BOM の一部です: それらは直接は document と関係はしませんが、ユーザとコミュニケーションをとる純粋なブラウザメソッドを表します。

```smart header="HTML スペック"
BOM は一般的な [HTML スペック](https://html.spec.whatwg.org)の一部です。

<https://html.spec.whatwg.org> のHTMLスペックは "HTML言語" (タグ、属性) についてだけでなく、多くのオブジェクトやメソッド、ブラウザ固有のDOM拡張をカバーします。それは "広義のHTML" です。また、いくつかのパートは <https://spec.whatwg.org> にリストされている追加のスペックがあります。
```

## サマリ 

標準に関して説明しました:

DOM スペック
: document 構造、操作、およびイベントについて説明します。<https://dom.spec.whatwg.org> を見てください。

CSSOM スペック
: スタイルシートとスタイルルール、それらの操作や document へのバインディングについて説明します。<https://www.w3.org/TR/cssom-1/> を見てください。

HTML スペック
: HTML言語(タグなど) や BOM(ブラウザオブジェクトモデル) を説明します -- 様々なブラウザ関数があります: `setTimeout`, `alert`, `location` など、<https://html.spec.whatwg.org> を見てください。それは DOM 仕様と多くの追加プロパティやメソッドを使ったその拡張です。

加えて、いくつかのクラスは <https://spec.whatwg.org/> で個別に説明があります。

これらのリンクをメモしておいてください。学ぶことがたくさんあるので、すべてをカバーして覚えるのは不可能です。

プロパティまたはメソッドについて読みたくなったとき、<https://developer.mozilla.org/en-US/search> にある Mozilla のマニュアルも優れたリソースですが、対応するスペックを読む方がよいかもしれません: 複雑で長いかもしれませんが、基本の知識は健全で完全なものになります。

何かを見つけるには、インターネット検索で "WHATWG [term]" あるいは "MDN [term]" を使用すると便利なことがよくあります。例: <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>。

次に、ドキュメントが UI の中心的な役割を果たすので、DOM の学習を勧めていきます。
