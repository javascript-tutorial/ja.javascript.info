libs:
  - d3
  - domtree

---

# DOM ツリー

HTML文書のバックボーンはタグです。

ドキュメントオブジェクトモデル(DOM)によると、すべてのHTMLタグはオブジェクトです。入れ子のタグはそれを囲タグの "子" と呼ばれます。

タグの内側のテキストも同様にオブジェクトです。

すべてのそれらのオブジェクトは JavaScript でアクセス可能です。

## DOM の例 [#a-example-of-dom]

例えば、このドキュメントに対する DOM を調べてみましょう:

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
  <title>About elks</title>
</head>
<body>
  The truth about elks.
</body>
</html>
```

DOM は HTMLをタグのツリー構造として表現します。それはこのように見えます:

<div class="domtree"></div>

<script>
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elks"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elks."}]}]}

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
上の図では、要素をクリックしその子を開いたり閉じることができます。
```

タグは "要素ノード" (もしくは単に要素) と呼ばれます。入れ子のタグは囲まれたタグの子になります。結果的に、我々は要素のツリーを持ちます: `<html>` はルートで、次に `<head>`, `<body>` はその子などとなります。

要素内のテキストは *テキストノード* を形成し、 `#text` とラベル付けされます。テキストノードは文字列のみを含みます。それは子を持たず、常にツリーの葉です。

例えば、`<title>` タグはテキスト `"About elks"` を持っています。

テキストノード中の特別な文字に注意してください:

- 改行: `↵` (JavaScript では `\n` として知られています)
- スペース: `␣`

スペースと改行 -- は完全に有効な文字で、それらはテキストノードを形成し、DOMの一部になります。従って、例えば、上の例では `<head>` タグは `<title>` の前にいくつかのスペースを含まれており、そのテキストは `#text` ノードになります(それは改行といくつかのスペースのみが含まれています)。

そこには2つだけ、トップレベルの除外があります:
1. `<head>` の前のスペースと改行は歴史的な理由から無視されます。
2. もし `</body>` の後に何かをおいた場合、HTML仕様はすべてのコンテンツが `<body>` の内側でなければならないため、最後にそれらは自動的に `body` の中に移動されます。従って、`</body>` の後にスペースはないことがあります。

別のケースでは、すべてが正直で -- ドキュメント内にスペース（単に任意の文字のように）があれば、それらはDOMのテキストノードになります。もしそれらを削除すれば、何も存在しません。

これはスペースがないテキストノードです:

```html no-beautify
<!DOCTYPE HTML>
<html><head><title>About elks</title></head><body>The truth about elks.</body></html>
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elks"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elks."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

```smart header="端のスペースとその間にある空のテキストは、通常はツール内に隠されています"
DOMを使って動作するブラウザツール（間もなくカバーされる）は、通常、テキストの最初/最後のスペースを表示せず、またタグ間に空のテキストノード（改行）も表示しません。

これは、主にHTMLを装飾するために使用され、どのように表示されるかに（ほとんどの場合）影響を与えないからです。

さらにDOMの図では、物事を短く保つために、それらが無関係な場所で省略することがあります。
```


## 自動補正 [#autocorrection]

もしブラウザが不正な形式のHTMLに遭遇したとき、ブラウザはDOMを作成時にそれを自動補正します。

例えば、トップタグは常に `<html>` です。たとえドキュメントの中に存在していなくても -- それはDOMの中におり、ブラウザはそれを生成します。`<body>` についても同じです。

例として、もしHTMLファイルが `"Hello"` という言葉のみだった場合、ブラウザはそれを `<html>` と `<body>` でラップし、必須の `<head>` を追加し、DOMは次のようになります:

<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

DOMを生成している間、ブラウザは自動的にドキュメント内のエラーを処理しタグを閉じます。

このような "無効な" ドキュメントの場合:

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

...も、ブラウザはタグを読みかけた部分を復元し、通常のDOMになります。:

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

````warn header="Tables は常に `<tbody>` を持ちます"
興味深い "特別なケース はテーブルです。DOM仕様によると、それらは `<tbody>` をもたなければなりませんが、HTMLテキストでは(公式に)それを省略することができます。そしてブラウザは DOM の中に自動的に `<tbody>` を生成します。

次のHTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

DOM構造は次のようになります:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

分かりますか？ `<tbody>` はどこにも出現していません。このような驚きを避けるためにテーブルを使って作業している間は心に留めておくべきです。
````

## 他のノードタイプ [#other-node-types]

より多くのタグを追加し、ページにコメント追加しましょう:

```html
<!DOCTYPE HTML>
<html>
<body>
  The truth about elks.
  <ol>
    <li>An elk is a smart</li>
*!*
    <!-- comment -->
*/!*
    <li>...and cunning animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elks.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

ここで、私達は新しいツリーのノードタイプが見えます -- `#comment` とラベル付された *comment node(コメントノード)* です。

私達はこう思うかもしれません -- なぜコメントが DOM に追加されるのでしょう？ それはどのような方法でも視覚的表現には影響しません。 しかし、ルールがあります。HTMLに何かがある場合は、DOMツリーにもなければなりません。

**HTML上のすべて、たとえコメントでも DOM の一部になります。**

HTMLの冒頭にある `<!DOCTYPE...>` ディレクティブでさえ DOM ノードです。`<html>`の直前のDOMツリーにあります。 私たちはそのノードに触れるつもりはないし、その理由で図に描画さえしませんが、そこにはあります。

ドキュメント全体を表現する `document` オブジェクトは、正式には DOM ノードでもあります。

[12のノードタイプ](https://dom.spec.whatwg.org/#node)があります。実際には、通常それらのうち4つを使います: 

1. `document` -- DOM に入る "エントリーポイント"
2. 要素ノード -- HTMLタグ, ツリーのビルディングブロック
3. テキストノード -- テキストを含む
4. コメント -- 時々そこに情報をおくことができ、それは表示されません。が JS はDOMからそれを読むことができます。

## あなた自身で見てください [#see-it-yourself]

実際にDOM構造を見るために、[Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/) にトライしてみましょう。ドキュメントに入力するだけで、すぐに DOM が表示されます。

## ブラウザのインスペクタで [#in-the-browser-inspector]

DOM を調べる別の方法はブラウザの開発者ツールを使うことです。実際、開発するときに使っているものです。

それをするために、web ページ [elks.html](elks.html) を開き、ブラウザ開発者ツールを開き、Elements タブに切り替えます。

このようになるはずです:

![](elks.png)

DOMを見ることができます、要素をクリックしその詳細をみたりすることができます。

開発者ツール上のDOM構造は簡略化されていることに注意してください。テキストノードは単にテキストとして表示されます。また、"空の" (スペースだけの) テキストノードはまったくありません。ほとんどの場合、要素のノードに興味があるのでそれは問題ありません。

左上隅の <span class="devtools" style="background-position:-328px -124px"></span> ボタンをクリックすると、マウス（または他のポインターデバイス）を使用してWebページからノードを選択できます。 それを "検査"します（Elements(要素) タブでスクロールします）。 巨大なHTMLページがあり、その中の特定の場所のDOMを見たいときにうまくいきます。

それをする別の方法は、web ページ上で単に右クリックをして、コンテキストメニュー上で "Inspect(検査)" を選択することです。

![](inspect.png)

ツールの右側には、次のようなサブのタブがあります:
- Styles - 組み込みルール（灰色）を含めて、ルール別に現在の要素ルールにCSSが適用されていることがわかります。 ほとんどすべては、下のボックスの大きさ/マージン/パディングを含めて編集できます。
- Computed - プロパティによって要素に適用されたCSSを表示する：各プロパティに対して、それを与える規則（CSSの継承などを含む）を見ることができます。
- Event Listeners - DOM要素に関連付けられたイベントリスナーを表示します（チュートリアルの次の部分で説明します）。
- ...など

それらを学ぶベストな方法は、クリックして回ることです。ほとんどの値はその場で変更可能です。

## コンソールとのインタラクション [#interaction-with-console]

DOM を調べるにつれて、それに JavaScript を適用したいことがあります。例えば: ノードを取得し、それを修正するコードを実行して、それがどのように見えるかを確認します。 Elementsタブとコンソールの間を移動するヒントをいくつか紹介します。

- Elements タブで最初の `<li>` を選択します。
- `key:Esc` を押す -- Elements タブのすぐ下にコンソールが開きます。

これで、最後に選択した要素は `$0` として利用可能で、以前に選択したものは `$1` です。

我々はそこでコマンドを実行することができます。例えば、`$0.style.background = 'red'` は選択されているリストアイテムを赤にします、このように:

![](domconsole0.png)

反対側から、コンソールにいて変数がDOMノードを参照している場合は、`inspect(node)` コマンドを使用してElementsペインに表示することができます。

もしくは単にそれをコンソールに出力し、"その場" で調べることができます。したの `document.body` のように:

![](domconsole1.png)

これはもちろんデバッグ目的のためです。次のチャプターからはJavaScriptを使ってDOMにアクセスしたり修正したりします。

ブラウザの開発者ツールは開発を非常に助けます: DOMを調べたり、何かを試みたり何が間違っているかを見たり。

## サマリ [#summary]

HTML/XML ドキュメントはブラウザ内では DOM ツリーとして表現されます。

- タグは要素ノードになり、構造を形成します。
- テキストはテキストノードになります。
- ...等、HTML上のすべては DOM にも存在します。たとえコメントでも。

私たちは、手動でDOMを検査したり修正するために開発者ツールを使うことができます。

ここでは、基本と、最もよく使われている重要なアクションについて説明しました。 Chrome開発者ツールに関する詳細なドキュメントは、<https://developers.google.com/web/tools/chrome-devtools> にあります。 ツールを学ぶ最も良い方法は、ここをクリックしてメニューを読むことです: ほとんどのオプションは明白です。 後ほど、あなたが一般的にそれらを知っているときは、ドキュメントを読んで残りを拾います。

DOMノードには、それらの間を移動したり、変更したり、ページの周りを移動したりできるようにするプロパティとメソッドがあります。 次のチャプターでそれらを見ていきましょう。
