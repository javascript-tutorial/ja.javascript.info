libs:
  - d3
  - domtree

---


# DOM を歩く

<<<<<<< HEAD
DOM は要素やそれらのコンテンツに対して何でもすることができますが、最初に対応する DOM オブジェクトに到達して、変数に入れる必要があります。それから要素やコンテンツを変更することができます。

DOM 上のすべての操作は `document` オブジェクトから始まります。そこから任意のノードにアクセスできます。

[cut]

これは DOM ノード間を移動できるリンクの図です。:
=======
The DOM allows us to do anything with elements and their contents, but first we need to reach the corresponding DOM object.

All operations on the DOM start with the `document` object. From it we can access any node.

Here's a picture of links that allow for travel between DOM nodes:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

![](dom-links.png)

それらについてより深く議論しましょう。

## トップ: documentElement と body 

一番上のツリーノードは `documet` のプロパティとして直接利用可能です:

`<html>` = `document.documentElement`
: 一番上のドキュメントノードは `document.documentElement` です。 それは `<html>` タグの DOM ノードです。

`<body>` = `document.body`
: 別の広く使われている DOM ノードは `<body>` 要素です --  `document.body`.

`<head>` = `document.head`
: `<head>` タグは `document.head` で利用可能です。

````warn header="落とし穴があります: `document.body` は `null` になる場合があります"
スクリプトは実行中に存在しない要素へアクセスすることができません。

特に、もしスクリプトが `<head>` の内側にある場合、`document.body` は利用できません。なぜならブラウザはまだ body を呼んでいないからです。

従って、下の例では最初の `alert` は `null` を表示します:

```html run
<html>

<head>
  <script>
*!*
    alert( "From HEAD: " + document.body ); // null, まだ <body> はありません
*/!*
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement, 今は存在します
  </script>

</body>
</html>
```
````

```smart header="DOM の世界では、`null` は \"存在しない\" を意味します"
DOM では、`null` 値は "存在しない" もしくは "このようなノードはない" を意味します。
```

## 子: childNodes, firstChild, lastChild 

我々がこれから使う2つの用語があります。:

- **子ノード (または子)** -- 直接の子要素です。言い換えると、それらは与えられた要素の中にネストされています。例えば `<head>` と `<body>` は `<html>` 要素の子です。
- **子孫** -- 子要素、子要素など、指定された要素にネストされたすべての要素です。

例えば、ここで `<body>` は子 `<div>` と `<ul>` (といくつかの空のテキストノード)を持ちます。:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>
      <b>Information</b>
    </li>
  </ul>
</body>
</html>
```

<<<<<<< HEAD
...また、 `<body>` のすべての子孫について尋ねられた場合、直接の子 `<div>`, `<ul>` と `<li>` (`<ul>` の子) や `<b>` (`<li>` の子)のような、よりネストされた要素を取得 -- サブツリー全体です。
=======
...And all descendants of `<body>` are not only direct children `<div>`, `<ul>` but also more deeply nested elements, such as `<li>` (a child of `<ul>`) and `<b>` (a child of `<li>`) -- the entire subtree.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**`子ノード` のコレクションは、テキストノードを含むすべての子ノードへのアクセスを提供します。**

下の例は、`document.body` の子を表示します:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...他の要素...
</body>
</html>
```

ここでの興味深い詳細について注意してください。上の例を実行するとき、表示される最後の要素は `<script>` です。実際には、ドキュメントは下により多くのものを持っていますが、スクリプト実行時点でブラウザはまだそれを読んでいないため、スクリプトはそれを見ません。

**プロパティ `firstChild` と `lastChild` で最初と最後の子への高速なアクセスができます**

それらは単なる簡略表記です。子ノードが存在する場合は、常に次のようになります:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

子ノードがあるかどうかをチェックするための特別な関数 `elem.hasChildNodes()` もあります。

### DOM コレクション 

ご覧の通り、`childNodes` は配列のように見えます。しかし実際には配列ではなくむしろ *コレクション* -- 特別な配列ライクで反復可能なオブジェクトです。

2つの重要な結果があります:

1. それを反復するために `for..of` を使うことができます:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // コレクションのすべてのノードを表示する
  }
  ```
  これは反復可能(必須で `Symbol.iterator` プロパティを提供する)のためです。

2. 配列メソッドは動作しません、なぜなら配列ではないからです:
  ```js run
  alert(document.body.childNodes.filter); // undefined (フィルタメソッドを持っていません!)
  ```

最初の1つ目は良いです。2つ目は許容できます。なぜなら、配列メソッドが必要な場合、コレクションから "本当の" 配列を作るために `Array.from` を使うことができるからです。:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // これで使えます
  ```

```warn header="DOM コレクションは読み取り専用です"
DOM コレクションやさらに -- このチャプターにリストされている *すべての* ナビゲーションプロパティは読み取り専用です。

<<<<<<< HEAD
代入 `childNodes[i] = ...` などにより子ノードを置き換えることはできません。

DOM の変更は他のメソッドを必要とします。それらについては次のチャプターで見ていきましょう。
=======
We can't replace a child by something else by assigning `childNodes[i] = ...`.

Changing DOM needs other methods. We will see them in the next chapter.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
```

```warn header="DOM コレクションはライブです"
マイナーな例外を伴うほとんどすべての DOM コレクションは *ライブ* です 。つまり、それらは DOM の現在の状態を反映しています。

もし　`elem.childNodes` への参照を維持し、DOM にノードを追加/削除すると、コレクションの中に自動的に反映されます。
```

````warn header="コレクションをループするために、`for..in` を使わないでください"
Collections are iterable using `for..of`. Sometimes people try to use `for..in` for that.

使わないでください。`for..in` ループはすべての列挙可能なプロパティを反復します。そしてコレクションは,
通常取得したいと思わないいくつかの "余分な" ほとんど使われないプロパティを持っています。: 

```html run
<body>
<script>
<<<<<<< HEAD
  // 0, 1, length, item, values などが表示されます。
  for(let prop in document.body.childNodes) alert(prop);
=======
  // shows 0, 1, length, item, values and more.
  for (let prop in document.body.childNodes) alert(prop);
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f
</script>
</body>
````

## 兄弟と親 

*兄弟(Siblings)* は同じ親(parent)の子ノードです。例えば、`<head>` と `<body>` は兄弟です:

- `<body>` は `<head>` の "次の" または "右の" 兄弟と言われます。 
- `<head>` `<body>` の "前の" または "左の" 兄弟と言われます。

親は `parentNode` として利用可能です。

同じ親において、次のノード(次の兄弟) は `nextSibling` であり、前のノードは `previousSibling` です。

例えば:

```html run
<html><head></head><body><script>
  // HTML は余分な "ブランクの" テキストノードを避けるために密集しています。

  // <body> の親は <html> です。
  alert( document.body.parentNode === document.documentElement ); // true

  // <head> の後は <body> に行きます。
  alert( document.head.nextSibling ); // HTMLBodyElement

  // <body> の前は <head> です。
  alert( document.body.previousSibling ); // HTMLHeadElement
</script></body></html>
```

## Element-only navigation

上でリストされているナビゲーションプロパティは *すべての* ノードを参照しています。例えば、`childNodes` では、テキストノード、要素ノードの両方を、存在する場合にはコメントノードも見ることができます。

しかし、多くのタスクでは、テキストノードやコメントノードは必要ありません。 タグを表し、ページの構造を形成する要素ノードを操作したいです。

なので、*要素ノード* だけを考慮にいれたナビゲーションリンクをもっと見てみましょう:

![](dom-links-elements.png)

リンクは上で与えられたものと似ており、`Element` という言葉が内部にあります:

- `children` -- 要素ノードの子のみです。
- `firstElementChild`, `lastElementChild` -- 最初/最後の要素の子です。
- `previousElementSibling`, `nextElementSibling` -- 隣の要素です。
- `parentElement` -- 親の要素です。

````smart header="なぜ `parentElement`? 親は要素 ではない 場合はありますか？"
`parentElement` プロパティは "要素" の親を返しますが、`parentNode` は "任意のノード" の親を返します。それらのプロパティは通常同じです: 両方とも親を取得します。

`document.documentElement` の例外を除いて:

```js run
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null
```

言い換えると、`documentElement` (`<html>`) はルートノードです。公式にはその親として `document` を持っています。しかし、`document` は要素ノードではないので、`parentNode` はそれを返し、`parentElement` はそうではありません。

<<<<<<< HEAD
````

上の例の1つを修正してみましょう: `childNodes` を `children` に置き換えます。これで要素のみが表示されます。:
=======
This loop travels up from an arbitrary element `elem` to `<html>`, but not to the `document`:
```js
while(elem = elem.parentElement) {
  alert( elem ); // parent chain till <html>
}
```
````

Let's modify one of the examples above: replace `childNodes` with `children`. Now it shows only elements:
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## 他のリンク: tables 

今まで、基本的なナビゲーションプロパティを説明しました。

特定の種類の DOM 要素は、便宜上、その種類に固有の追加のプロパティを提供することがあります。

テーブルはその素晴らしい例であり重要なケースです。

<<<<<<< HEAD
**`<table>`** 要素は次のプロパティをサポートします(上で与えられたものに加えて):
- `table.rows` -- テーブルの `<tr>` 要素のコレクションです。
- `table.caption/tHead/tFoot` -- 要素 `<caption>`, `<thead>`, `<tfoot>` への参照です。
- `table.tBodies` -- `<tbody>` 要素のコレクション(標準によると多数になれます) です。
=======
**The `<table>`** element supports (in addition to the given above) these properties:
- `table.rows` -- the collection of `<tr>` elements of the table.
- `table.caption/tHead/tFoot` -- references to elements `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- the collection of `<tbody>` elements (can be many according to the standard).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**`<thead>`, `<tfoot>`, `<tbody>`** 要素は `rows` プロパティを提供します:
- `tbody.rows` -- 内側の `<tr>` のコレクション

**`<tr>`:**
<<<<<<< HEAD
- `tr.cells` -- 与えられた `<tr>` の中の `<td>` と `<th>` セルの集合です。
- `tr.sectionRowIndex` -- 囲んでいる `<thead>/<tbody>` の内部にある与えられた `<tr>` の番号です。
- `tr.rowIndex` -- テーブル内の `<tr>` の番号です。
=======
- `tr.cells` -- the collection of `<td>` and `<th>` cells inside the given `<tr>`.
- `tr.sectionRowIndex` -- the position (index) of the given `<tr>` inside the enclosing `<thead>/<tbody>/<tfoot>`.
- `tr.rowIndex` -- the number of the `<tr>` in the table as a whole (including all table rows).
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

**`<td>` と `<th>`:**
- `td.cellIndex` -- `<tr>` で囲まれている内側でのセルの番号です。

使用例:

```html run height=100
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // 最初の行の2つ目のセルのコンテンツを取得
  alert( table.*!*rows[0].cells[1]*/!*.innerHTML ) // "two"
</script>
```

仕様: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).

<<<<<<< HEAD
HTMLフォームのための追加のナビゲーションプロパティもあります。 フォームを使って作業を開始するときにそれらを見ていきます。
=======
There are also additional navigation properties for HTML forms. We'll look at them later when we start working with forms.
>>>>>>> 08734734021aa128c13da2382fe8fa062677bb9f

# サマリ 

与えられた DOM ノードで、ナビゲーションプロパティを使用することで直接隣接ノードに移動できます。

それらの2つの主要なセットがあります:

- すべてのノードを取得: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- 要素ノードのみの取得: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`

DOM 要素のいくつかの種類 -- e.g. tables -- はそれらのコンテンツにアクセスするための追加のプロパティやコレクションを提供します。
