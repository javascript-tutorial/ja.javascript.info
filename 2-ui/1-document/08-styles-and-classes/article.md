# スタイルとクラス

<<<<<<< HEAD
JavaScriptでスタイルとクラスを扱う方法を習得する前に、 -- ここには重要なルールがあります。うまくいけばそれは十分明らかですが、それでも言及する必要があります。
=======
Before we get into JavaScript's ways of dealing with styles and classes -- here's an important rule. Hopefully it's obvious enough, but we still have to mention it.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

一般的には要素をスタイルする2つの方法があります:

1. CSS でクラスを生成し、それを追加します: `<div class="...">`
2. `style` に直接プロパティを書きます: `<div style="...">`.

<<<<<<< HEAD
[cut]

CSS は常に好まれる方法です -- HTML に対してだけではなく JavaScript でも同様です。
=======
CSS is always the preferred way -- not only for HTML, but in JavaScript as well.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

クラスが "処理することが出来ない" 場合にのみ、`style` プロパティを操作するべきです。

例えば、要素の座標を動的に計算し、JavaScriptからそれを設定する場合には `style` は受け入れられます。:

```js
let top = /* 複雑な計算 */;
let left = /* 複雑な計算 */;
elem.style.left = left; // e.g '123px'
elem.style.top = top; // e.g '456px'
```

テキストを赤にしたり、背景アイコンを追加するような他のケースの場合 -- CSS でそれを記述した後にそのクラスを適用します。それはより柔軟でサポートしやすくなります。

## className と classList

<<<<<<< HEAD
クラスを変更することは、スクリプトで最も頻繁に行われる操作の1つです。
=======
Changing a class is one of the most often used actions in scripts.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

ずっと昔、JavaScript には制限がありました: `"class"` のような予約語はオブジェクトプロパティにはできませんでした。その制限は今は存在しませんが、その当時は `elem.class` にように `"class"` プロパティを持つことは不可能でした。

したがって、クラスに対しては類似したプロパティ名 `"className"` が導入されました:
 `elem.className` は `"class"` 属性に対応します。

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

`elem.classList` はクラスを `追加/削除/切り替える` ためのメソッドを持つ特別なオブジェクトです。 

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

したがって、`className` を使って完全なクラス文字列操作したり、`classList` を使って個々のクラスを操作することができます。私たちが選ぶものは、私たちのニーズに応じたものになります。

`classList` のメソッド:

<<<<<<< HEAD
- `elem.classList.add/remove("class")` -- クラスの追加/削除をします。
- `elem.classList.toggle("class")` -- もしクラスが存在する場合は削除します。そうでなければ追加します。
- `elem.classList.contains("class")` -- 指定されたクラスをチェックし、 `true/false` を返します。

それに加え、`classList` は反復可能です。なので、このようにすべてのクラスを列挙する事ができます:
=======
- `elem.classList.add/remove("class")` -- adds/removes the class.
- `elem.classList.toggle("class")` -- adds the class if it doesn't exist, otherwise removes it.
- `elem.classList.contains("class")` -- returns `true/false`, checks for the given class.

Besides, `classList` is iterable, so we can list all classes with `for..of`, like this:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```html run
<body class="main page">
  <script>
    for (let name of document.body.classList) {
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
`-moz-border-radius` や `-webkit-border-radius` のようなブラウザプレフィックスが付いたプロパティもまた同じルールに従います。例えば:

```js
button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';
```

つまり: ダッシュ `"-"` は大文字になります。
````

## スタイルプロパティのリセット 

時々、スタイルプロパティを割り当て、後ほどそれを削除したい場合があります。

例えば、要素を隠すために `elem.style.display = "none"` と設定できます。

<<<<<<< HEAD
そして、後でそれがセットされていなかったかのように、 `style.display` を削除したいかもしれません。`delete elem.style.display` の代わりに空行を割り当てるべきです: `elem.style.display = ""`.
=======
Then later we may want to remove the `style.display` as if it were not set. Instead of `delete elem.style.display` we should assign an empty string to it: `elem.style.display = ""`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```js run
// このコードを実行すると、<body> が "点滅" します
document.body.style.display = "none"; // 隠します

setTimeout(() => document.body.style.display = "", 1000); // 通常に戻ります
```

<<<<<<< HEAD
`display` を空文字列に設定した場合、ブラウザは通常 CSS クラスと組み込みのスタイルを適用します。まるで `style` プロパティが全くないかのように振る舞います。
=======
If we set `display` to an empty string, then the browser applies CSS classes and its built-in styles normally, as if there were no such `display` property at all.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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

<<<<<<< HEAD
このような代入は既存のすべてのスタイルを削除するので、めったに使われません。: それは追加ではなく置換です。場合によっては必要なものを削除する可能性があります。しかし、私たちが重要なものを削除しないことを知っているとき、新しい要素に対しては行う事ができます。
=======
This property is rarely used, because such assignment removes all existing styles: it does not add, but replaces them. May occasionally delete something needed. But we can safely use it for new elements, when we know we won't delete an existing style.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

属性を設定することで同じことを達成することが出来ます。: `div.setAttribute('style', 'color: red...')`.
````

## 単位を気にする 

CSS の単位はスタイルの値の中で指定する必要があります。

例えば、`elem.style.top` は `10` ではなくむしろ `10px` とする必要があります。そうれなければ動作しません:

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

ブラウザが最後の行で `style.margin` を "アンパック" し、`style.marginLeft`と `style.marginTop`（および他の部分的なマージン）をどのように推測するか注意してください。

## 算出スタイル: getComputedStyle 

スタイルを変更するのは簡単です。しかしどうやってそれを *読み* ますか？

例えば、要素のサイズ、マージン、色が知りたいです。どうやりますか？

**`style` プロパティは CSS カスケードなしで、その `"style"` 属性の値だけを操作します。**

なので、`elem.style` を使って CSS クラスから来たものを読むことは出来ません。

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

<<<<<<< HEAD
...しかし仮にマージンを 20px に増加する必要がある場合はどうすればよいでしょう？そのために現在の値がほしいです。 
=======
...But what if we need, say, to increase the margin by 20px? We would want the current value of it.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

そのための別のメソッドがあります: `getComputedStyle`.

構文は次の通りです:

```js
getComputedStyle(element[, pseudo])
```

element
: 値を読み取る要素

pseudo
<<<<<<< HEAD
: 疑似要素(必要な場合)。例えば `::before`。空文字列または引数なしは要素自身を意味します。
=======
: A pseudo-element if required, for instance `::before`. An empty string or no argument means the element itself.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

結果は、`elem.style` のようにスタイルプロパティを持つオブジェクトですが、今はすべての CSS クラスに関してのものです。

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

```smart header="算出(comupted)と解析(resolved)値"
[CSS](https://drafts.csswg.org/cssom/#resolved-values) には2つのコンセプトがあります:

<<<<<<< HEAD
1. *算出* スタイル値(*computed* style value)は、CSS カスケードの結果として、すべての CSS ルールと CSS 継承が適用された後の値です。`height:1em` または `font-size:125%` のように見えます。

2. *解析* スタイル値(*resolved* style value)は要素に最終的に適用される値です。`1em` or `125%` のような値は相対的なものです。ブラウザは計算された値を取り、`height: 20px` や` font-size: 16px` のようにすべての単位を固定し絶対的にします。 幾何学プロパティの場合、解析された値は `width：50.5px`のような浮動小数点を持ちます。
=======
1. A *computed* style value is the value after all CSS rules and CSS inheritance is applied, as the  result of the CSS cascade. It can look like `height:1em` or `font-size:125%`.
2. A *resolved* style value is the one finally applied to the element. Values like `1em` or `125%` are relative. The browser takes the computed value and makes all units fixed and absolute, for instance: `height:20px` or `font-size:16px`. For geometry properties resolved values may have a floating point, like `width:50.5px`.

A long time ago `getComputedStyle` was created to get computed values, but it turned out that resolved values are much more convenient, and the standard changed.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

ずっと以前に、`getComputedStyle` は計算された値を取得するために作られましたが、解析された値がはるかに便利であることが分かり、標準が変更されました。

したがって、最近では `getComputedStyle` は実際にはプロパティの解析された値を返します。
```

````warn header="`getComputedStyle` には完全なプロパティ名が必要です"
`paddingLeft` や `marginTop` や `borderTopWidth` のように、常に正確なプロパティを求めてください。 そうしないと、正しい結果が保証されません。

例えば、`paddingLeft/paddingTop` プロパティがある場合、`getComputedStyle(elem).padding` のためにどうすればよいでしょうか？何もない、または知られているパディングから"生成された" 値があるでしょうか？そこに標準的なルールはありません。

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

```smart header="\"訪問された\" リンクのスタイルは表示されません!"
訪問されたリンクは `:visited` CSS 疑似クラスを使って色付けされるかもしれません。

しかし、`getComputedStyle` はその色へのアクセスを提供しません。なぜなら、そうでなければ、任意のページが、ページ上でそれを作りスタイルをチェックすることによって、ユーザがリンクを訪れたかどうかを知ることができるためです。

<<<<<<< HEAD
JavaScriptでは、 `:visited` によって適用されたスタイルは見えません。また、`:visited` にジオメトリの変更スタイルを適用することを禁止するという制限が CSS にはあります。それは、リンクが訪問された場合に悪意のあるページがテストしてプライバシを破る方法がないことを保証するためです。
=======
JavaScript may not see the styles applied by `:visited`. And also, there's a limitation in CSS that forbids to apply geometry-changing styles in `:visited`. That's to guarantee that there's no sideway for an evil page to test if a link was visited and hence to break the privacy.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
```

## サマリ 

クラスを管理するために、2つのDOMプロパティがあります:

- `className` -- 文字列値で、クラスのセット全体を管理するのに良いです。
- `classList` -- メソッド `add/remove/toggle/contains` を持つオブジェクトで, 個々のクラスを管理するのに良いです。

スタイルを変更するために:

- `style` プロパティはキャメルケース化されたスタイルを持つオブジェクトです。それへの読み書きは、 `"style"` 属性の個々のプロパティを変更するのと同じ意味を持ちます。`important` や他の珍しいものを適用する方法を知るには -- [MDN](mdn:api/CSSStyleDeclaration) にメソッドのリストがあります。

- `style.cssText` プロパティは `"style"` 属性全体に対応し、スタイルの完全な文字列です。

解析されたスタイル(すべてのクラスに関して、すべてのCSSが適用され、最終的な値が計算された後)を読むために:

- `getComputedStyle(elem[, pseudo])` はそれらのスタイルライクなオブジェクトを返します。読み取り専用です。
