<<<<<<< HEAD
# 検索: getElement* と querySelector*
=======
# Searching: getElement*, querySelector*
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

要素が互いに近いとき、DOM ナビゲーションプロパティは優れています。仮にそうではなければどうしますか？ページの任意のページはどうすれば取得できるでしょうか？

そのための追加の検索メソッドがあります。

<<<<<<< HEAD
[cut]
=======
There are additional searching methods for that.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

## document.getElementById もしくは 単に id

もし要素が `id` 属性を持っている場合、その `id` の名前のグローバル変数があります。

<<<<<<< HEAD
次にように、その要素にアクセスするためにそれを使うことができます。:
=======
We can use it to immediately access the element no matter where it is:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
  alert(elem); // DOM-element with id="elem"
  alert(window.elem); // このようなグローバル変数へのアクセスもできます

  // elem-content の場合は少し複雑です
  // ダッシュを含んでいるため、変数名になれません
  alert(window['elem-content']); // ...しかし、角括弧 [...] を使うことでアクセス可能です
</script>
```

<<<<<<< HEAD
同じ名前の変数を私達自身で宣言しない限り、アクセスできます:
=======
The behavior is described [in the specification](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), but it is supported mainly for compatibility. The browser tries to help us by mixing namespaces of JS and DOM. Good for very simple scripts, but there may be name conflicts. Also, when we look in JS and don't have HTML in view, it's not obvious where the variable comes from.

If we declare a variable with the same name, it takes precedence:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5;

<<<<<<< HEAD
  alert(elem); // 変数は要素を上書きします
</script>
```

この振る舞いは [仕様書](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem) で説明されていますが、主に互換性のためにサポートされています。ブラウザは JS と DOM の名前空間を混在させることで私達を助けようとします。非常にシンプルなスクリプトに対しては適していますが、名前の衝突が起きる可能性があります。また、JS を見て、ビューの中のHTMLを見なかった場合、変数がどこから来たのかが明白ではありません。

より良い代替の方法は特別なメソッド `document.getElementById(id)` を使うことです。
=======
  alert(elem); // 5
</script>
```

The better alternative is to use a special method `document.getElementById(id)`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

例:

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
*!*
  let elem = document.getElementById('elem');
*/!*

  elem.style.background = 'red';
</script>
```

このチュートリアルでは、要素を直接参照するために `id` を頻繁に使います。が、それは物事を短く保つためだけです。実際には、`document.getElementById` が好ましい方法です。

```smart header="1つだけ存在することができます"
`id` は一意でなければなりません。与えられた `id` の要素はドキュメント上で1つだけ存在することができます。 


もし同じ `id` を持つ複数の要素がある場合、対応するメソッドの振る舞いは予測できないものになります。ブラウザはランダムにそれらのうちの1つを返すかもしれません。なので、ルールを心にとめ、`id` を一意に保ってください。 
```

```warn header="`document.getElementById` だけです。 `anyNode.getElementById` はありません"
`document` オブジェクトに対してのみ呼び出すことができるメソッド `getElementById` です。これはドキュメント全体から指定された `id` を探します。
```

<<<<<<< HEAD
## getElementsBy*

ノードを探す他のメソッドもあります:

- `elem.getElementsByTagName(tag)` は指定されたタグの要素を探し、そのコレクションを返します。`tag` パラメータは "任意のタグ" としてアスタリスク `"*"` にできます。

例:

```js
// ドキュメント上のすべての div を取得
let divs = document.getElementsByTagName('div');
```

このメソッドは任意の DOM 要素のコンテキストで呼び出し可能です。

テーブルの中のすべての `input` を見つけましょう:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="`\"s\"` の文字を忘れないでください!"
初心者の開発者は文字 `"s"` を忘れることがあります。つまり、<code>getElement<b>s</b>ByTagName</code> の代わりに `getElementByTagName` を呼び出そうとします。

`"s"` 文字は `getElementById` にはありません。これは、単一の要素を返すためです。 しかし、`getElementsByTagName` は要素の集合を返します。したがって `"s"` がつきます。
```

````warn header="要素ではなくコレクションを返します!"
別に広く知られている初心者の間違いはこのように書くことです:

```js
// 動作しません
document.getElementsByTagName('input').value = 5;
```

これは動作しません。なぜならそれは入力のコレクションを取り、その中の要素ではなくコレクションに値を代入するためです。

コレクションを反復するか、数値で要素を取得するかを行い、それから代入する必要があります。:

```js
// 動作します(input がある場合)
document.getElementsByTagName('input')[0].value = 5;
```
````

この種類のほとんど使われないメソッドもあります:

- `elem.getElementsByClassName(className)` は指定された CSS クラスを持つ要素を返します。要素は他のクラスも持っている可能性があります。
- `document.getElementsByName(name)` は指定された `name` 属性を持つ要素をドキュメント全体で返します。歴史的な理由から存在しますが、極稀にしか使われません。ここでは、完全性のためだけに言及します。

例:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // name 属性で見つける
  let form = document.getElementsByName('my-form')[0];

  // form の内側で　class で見つける
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, class "article" を持つ要素が2つ見つかります。
</script>
```

## querySelectorAll 

今度は重い大砲に進みます。

`elem.querySelectorAll(css)` の呼び出しは、指定された CSS セレクタにマッチする `elem` 内のすべての要素を返します。これは最もよく使われ、強力なメソッドです。
=======
## querySelectorAll [#querySelectorAll]

By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

ここでは最後の子要素であるすべての `<li>` 要素を探します:

```html run
<ul>
  <li>The</li>
  <li>test</li>
</ul>
<ul>
  <li>has</li>
  <li>passed</li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "test", "passed"
  }
</script>
```

任意の CSS セレクタを使うことができるので、このメソッドは確かに強力です。

```smart header="疑似クラスも同様に使えます"
`:hover` や `:active` のような CSS セレクタの擬似クラスもサポートされています。例えば、`document.querySelectorAll(':hover')` はポインタが現在の要素を含むコレクションを返します（入れ子の順序で: 最も外側の `<html>`から最もネストされたものまで）。
```

<<<<<<< HEAD

## querySelector 
=======
## querySelector [#querySelector]
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

`elem.querySelector(css)` への呼び出しは指定された CSS セレクタの最初の要素を返します。

つまり、`elem.querySelectorAll(css)[0]` と同じ結果になりますが、後者は *すべての* 要素を探し1つをピックアップする一方、`elem.querySelector` は単に1つだけを探します。なので、書くのがより速く短いです。

## matches

以前のメソッドは DOM を検索していました。

[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) は何も探しません。それは単に `elem` が与えられた CSS セレクタに一致するかをチェックします。それは `true` または `false` を返します。

このメソッドは、要素(配列か何か)を反復処理し、私たちが興味のあるものをフィルタリングしようとするときに便利です。

例えば:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // document.body.children の代わりに任意のコレクションが可能です
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("The archive reference: " + elem.href );
    }
  }
</script>
```

## closest

<<<<<<< HEAD
与えられた要素の直接上にあるすべての要素は、*祖先* と呼ばれます。

言い換えると、祖先は: 親、親の親、その親などです。祖先は共に要素から頂点までの親の連鎖を形成します。
=======
*Ancestors* of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

メソッド `elem.closest(css)` は CSS セレクタにマッチする最も近い祖先を見ます。`elem` 自身も検索に含まれています。

つまり、メソッド `closest` は要素から上に進み、各親をチェックします。もしセレクタにマッチしたら、検索を止め、その祖先が返却されます。

例:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (h1 は祖先ではないので)
</script>
```

## getElementsBy*

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. very rarely used.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Let's find all `input` tags inside the table:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there's `"s"` inside.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because it takes a *collection* of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Looking for `.article` elements:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections

すべての `"getElementsBy*"` メソッドは *ライブの* コレクションを返します。このようなコレクションは常にドキュメントの現在の状態を反映し、変更があったとき "自動更新" されます。

下の例では、2つのスクリプトがあります。

<<<<<<< HEAD
1. 最初のスクリプトは `<div>` のコレクションへの参照を生成します。今のところ、その長さは `1` です。
2. 2つ目のスクリプトはブラウザが1つ以上の `<div>` に会った後に実行するので、その長さは `2` です。
=======
1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

対象的に、`querySelectorAll` は *静的な* コレクションです。これは固定要素配列です。

我々が代わりにこれを使った場合、両方のスクリプトは `1` を出力します:

```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

今その違いを簡単に見ることができます。静的なコレクションは、ドキュメント上に新たな `div` の登場の後も増加しませんでした。

<<<<<<< HEAD
ここでは要素の追加がコレクションにどう影響するかを示すために別々のスクリプトを使いましたが、任意の DOM 操作がそれらに影響します。すぐ後にそれらについてより見ていきます。

## サマリ 
=======
## Summary
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

DOM でノードを検索するための6つの主なメソッドがあります:

<table>
<thead>
<tr>
<td>メソッド</td>
<td>何で検索するか</td>
<td>要素上で呼ぶことが可能?</td>
<td>ライブ?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>タグ または <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
<<<<<<< HEAD
<tr>
<td><code>querySelector</code></td>
<td>CSSセレクタ</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSSセレクタ</td>
<td>✔</td>
<td>-</td>
</tr>
</tbody>
</table>

メソッド `getElementById` と `getElementsByName` はドキュメントのコンテキストの場合にだけ呼び出すことができることに注意してください: `document.getElementById(...)`。要素上ではできません: `elem.getElementById(...)` はエラーになります。

他のメソッドは、要素上でも呼び出し可能です。例えば、 `elem.querySelectorAll(...)` `elem` の内側を検索します(DOM サブツリーの中)。
=======
</tbody>
</table>

By far the most used are `querySelector` and `querySelectorAll`, but `getElementBy*` can be sporadically helpful or found in the old scripts.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

それ以外に:

<<<<<<< HEAD
- `elem` が指定された CSS セレクタに一致するかをチェックする `elem.matches(css)` があります。
- 指定された CSS セレクタに一致する最も近い祖先を探すための `elem.closest(css)` があります。`elem` 自身もまたチェックされます。

また、親子の関係を調べるもう一つの方法をここで言及しましょう:
-  `elemA.contains(elemB)` は `elemB` が `elemA` の中にある(`elemA` の子孫)または `elemA==elemB` の場合 true を返します。
=======
- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
