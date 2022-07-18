# スタイルとクラス

JavaScriptでスタイルとクラスを扱う方法を習得する前に、ここには重要なルールがあります。十分理解していることだと思いますが、それでも言っておかなければならないことがあります。

一般的には要素をスタイルする方法が2つあります:

1. CSS でクラスを生成し、それを追加します: `<div class="...">`
2. `style` に直接プロパティを書きます: `<div style="...">`.

JavaScript はクラスと `style` プロパティの変更両方が可能です。

常に `style` よりも CSS クラスを優先すべきです。後者は、クラスでは "処理しきれない" 場合にのみ使用すべきです。

例えば、要素の座標を動的に計算し、JavaScript からそれを設定する場合には `style` は受け入れられます。:

```js
let top = /* 複雑な計算 */;
let left = /* 複雑な計算 */;

elem.style.left = left; // e.g '123px'
elem.style.top = top; // e.g '456px'
```

テキストを赤にしたり、背景アイコンを追加するような他のケースの場合は、CSS でスタイルを記述した後に、そのクラスを適用します。このほうが柔軟でサポートしやすくなります。

## className と classList

クラスの変更は、スクリプトで最も頻繁に行われる操作の1つです。

ずっと昔、JavaScript には制限がありました: `"class"` のような予約語はオブジェクトプロパティにはできませんでした。その制限は今は存在しませんが、その当時は `elem.class` にように `"class"` プロパティは持てませんでした。

したがって、クラスに対しては類似したプロパティ名 `"className"` が導入されました: `elem.className` は `"class"` 属性に対応します。

例:

```html run
<body class="main page">
  <script>
    alert(document.body.className); // main page
  </script>
</body>
```

もし何かを `elem.className` に割り当てた場合、クラスの文字列全体を置き換えます。それが必要なときもありますが、多くの場合は1つのクラスの追加/削除がしたいです。

そのための別のプロパティもあります: `elem.classList` です。

`elem.classList` はクラスを `追加/削除/トグル` するためのメソッドを持つ特別なオブジェクトです。 

例:

```html run
<body class="main page">
  <script>
*!*
    // クラスを追加します
    document.body.classList.add('article');
*/!*

    alert(document.body.className); // main page article
  </script>
</body>
```

したがって、`className` で完全なクラス文字列全体を操作したり、`classList` で個々のクラスを操作することができます。ケースに応じて必要な物を使います。

`classList` のメソッド:

- `elem.classList.add/remove("class")` -- クラスの追加/削除をします。
- `elem.classList.toggle("class")` -- クラスが存在する場合は削除します。なければ追加します。
- `elem.classList.contains("class")` -- クラスをの有無をチェックし、 `true/false` を返します。

それに加え、`classList` は反復可能です。なので、以下のように `for..of` ですべてのクラスの列挙もできます:

```html run
<body class="main page">
  <script>
    for(let name of document.body.classList) {
      alert(name); // main, and then page
    }
  </script>
</body>
```

## 要素のスタイル 

プロパティ `elem.style` は `"style"` 属性に書かれたものに対応するオブジェクトです。`elem.style.width="100px"` の設定は、属性 `style="width:100px"` を持っているかのように機能します。

複数語のプロパティは、キャメルケースが使われます:

```js no-beautify
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

例:

```js run
document.body.style.backgroundColor = prompt('background color?', 'green');
```

````smart header="プレフィックス付きのプロパティ"
`-moz-border-radius` や `-webkit-border-radius` のようなブラウザプレフィックスが付いたプロパティもまた同じルールに従います。

例えば:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```
````

## スタイルプロパティのリセット 

スタイルプロパティを割り当てた後、削除したい場合があります。

例えば、要素を隠すには `elem.style.display = "none"` とします。

そして、後でそれがセットされていなかったかのように、`style.display` を削除したいかもしれません。この場合、`delete elem.style.display` を行う代わりに空行を割り当てるべきです: `elem.style.display = ""`.

```js run
// このコードを実行すると、<body> が "点滅" します
document.body.style.display = "none"; // 隠します

setTimeout(() => document.body.style.display = "", 1000); // 通常に戻ります
```

`display` を空文字列に設定した場合、ブラウザは通常 CSS クラスと組み込みのスタイルを適用します。まるで `style` プロパティが全くないかのように振る舞います。

また、このための特別なメソッドもあります, `elem.style.removeProperty('style property')`. 次のようにしてプロパティの削除ができます。:

```js run
document.body.style.background = 'red'; //background を red にします

setTimeout(() => document.body.style.removeProperty('background'), 1000); // 1秒後に background を削除します
```

````smart header="`style.cssText` で完全に書き直す"
通常、個々のスタイルプロパティを割り当てるために `style.*` を使います。`div.style` はオブジェクトであり、読み取り専用であるため、`div.style="color: red; width: 100px"` のような完全なスタイルを設定することはできません。

文字列で完全なスタイルを設定するための特別なプロパティ`style.cssText` があります:

```html run
<div id="div">Button</div>

<script>
  // ここで "important" のような特別なスタイルのフラグを設定することも出来ます
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>
```

このような代入は既存のすべてのスタイルを削除するので、めったに使われません。: これは追加ではなく置換です。場合によっては必要なものを削除する可能性があります。しかし、重要なものを削除しないと分かっているとき、例えば新しい要素に対しては安全に使用できます。

属性を設定することで同じことができます。: `div.setAttribute('style', 'color: red...')`.
````

## 単位に留意しましょう

値に CSS の単位を追加するのを忘れないようにましょう。

例えば、`elem.style.top` は `10` ではなく `10px` とする必要があります。そうでない場合動作しません:

```html run height=100
<body>
  <script>
  *!*
    // 動作しません!
    document.body.style.margin = 20;
    alert(document.body.style.margin); // '' (空文字列、この代入は無視されます)
  */!*

    // 今 CSS の単位(px) を追加 -- これは動作します
    document.body.style.margin = '20px';
    alert(document.body.style.margin); // 20px

    alert(document.body.style.marginTop); // 20px
    alert(document.body.style.marginLeft); // 20px
  </script>
</body>
```

ブラウザが最後の行で `style.margin` を "アンパック" し、`style.marginLeft`と `style.marginTop` をどのように推測するか注意してください。

## 算出スタイル: getComputedStyle 

スタイルを変更するのは簡単です。しかしどうやってそれを *参照* ますか？

例えば、要素のサイズ、マージン、色が知りたいです。どうやりますか？

**`style` プロパティは CSS カスケードなしで、その `"style"` 属性の値だけを操作します。**

そのため、`elem.style` では CSS クラスから来たスタイルを参照することはできません。

例えば、ここでは `style` はマージンを見ません:

```html run height=60 no-beautify
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  The red text
  <script>
*!*
    alert(document.body.style.color); // 空
    alert(document.body.style.marginTop); // 空
*/!*
  </script>
</body>
```

...ですが、仮にマージンを `20px` 増やす必要がある場合はどうすればよいでしょう？ そのために現在の値が必要です。 

そのためのもう１つのメソッドがあります: `getComputedStyle`.

構文は次の通りです:

```js
getComputedStyle(element[, pseudo])
```

element
: 値を読み取る要素

pseudo
: 疑似要素(必要な場合に指定)。例えば `::before`。空文字列または引数なしは要素自身を意味します。

結果は、`elem.style` のようにスタイルプロパティを持つオブジェクトですが、ここではすべての CSS クラスに関してのものです。

例:

```html run height=100
<head>
  <style> body { color: red; margin: 5px } </style>
</head>
<body>

  <script>
    let computedStyle = getComputedStyle(document.body);

    // 今やそこからマージンや色を読み取る事ができます

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>

</body>
```

```smart header="算出(comupted)と解決(resolved)値"
[CSS](https://drafts.csswg.org/cssom/#resolved-values) には2つのコンセプトがあります:

1. *算出* スタイル値(*computed* style value)は、CSS カスケードの結果として、すべての CSS ルールと CSS 継承が適用された後の値です。`height:1em` または `font-size:125%` のように見えます。
2. *解決* スタイル値(*resolved* style value)は要素に最終的に適用される値です。`1em` or `125%` のような値は相対的なものです。ブラウザは計算された値を取り、`height: 20px` や` font-size: 16px` のようにすべての単位を固定し絶対的にします。ジオメトリ プロパティの場合、解析された値は `width：50.5px`のような浮動小数点を持ちます。

ずっと以前に、`getComputedStyle` は算出値を取得するために作られましたが、解決値がはるかに便利であることが分かり、標準が変更されました。

したがって、最近では `getComputedStyle` は実際にはプロパティの解決された値を返します。通常、ジオメトリ に対しては `px` です。
```

````warn header="`getComputedStyle` には完全なプロパティ名が必要です"
`paddingLeft` や `marginTop` や `borderTopWidth` のように、常に正確なプロパティの指定が必要です。 そうしないと、正しい結果が保証されません。

例えば、`paddingLeft/paddingTop` プロパティがある場合、`getComputedStyle(elem).padding` では何が取得されるでしょうか？何もない、または知られているパディングから"生成された" 値があるでしょうか？そこに標準的なルールはありません。

他にも矛盾があります。 たとえば、一部のブラウザ（Chrome）では下記のドキュメントに"10px" と表示されていますが、他の一部のブラウザ（Firefox）では -- そうではありません:

```html run
<style>
  body {
    margin: 10px;
  }
</style>
<script>
  let style = getComputedStyle(document.body);
  alert(style.margin); // Firefox では空文字です
</script>
```
````

```smart header="`:visited` リンクが適用されたスタイルは表示されません!"
訪問されたリンクは `:visited` CSS 疑似クラスを使って色付けされるかもしれません。

しかし、`getComputedStyle` はその色へのアクセスを提供しません。なぜなら、アクセスできると、任意のページ上でそれを作りスタイルをチェックすることによって、ユーザがリンクを訪れたかどうかを知ることができるためです。

JavaScriptでは、 `:visited` によって適用されたスタイルは見えません。また、`:visited` にジオメトリの変更スタイルを適用することを禁止するという制限が CSS にはあります。それは、リンクが訪問された場合に悪意のあるページがテストしてプライバシーを破る方法がないことを保証するためです。
```

## サマリ 

クラスを管理するために、2つのDOMプロパティがあります:

- `className` -- 文字列値で、クラスのセット全体を管理するのに良いです。
- `classList` -- メソッド `add/remove/toggle/contains` を持つオブジェクトで, 個々のクラスを管理するのに良いです。

スタイルを変更するために以下の方法があります:

- `style` プロパティはキャメルケース化されたスタイルを持つオブジェクトです。それへの読み書きは、 `"style"` 属性の個々のプロパティを変更するのと同じ意味を持ちます。`important` や他の珍しいものを適用する方法を知るには -- [MDN](mdn:api/CSSStyleDeclaration) にメソッドのリストがあります。

- `style.cssText` プロパティは `"style"` 属性全体に対応し、スタイルの完全な文字列です。

解析されたスタイル(すべてのクラスに関して、すべてのCSSが適用され、最終的な値が計算された後)を読むために:

- `getComputedStyle(elem[, pseudo])` はそれらのスタイルライクなオブジェクトを返します。読み取り専用です。
