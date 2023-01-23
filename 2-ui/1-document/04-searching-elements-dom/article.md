<<<<<<< HEAD
# 検索: getElement* と querySelector*
=======
# Searching: getElement*, querySelector*
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

要素が互いに近い場合には DOM ナビゲーションプロパティは役立ちます。そうではない場合、ページの任意の要素はどのように取得できるでしょうか？

<<<<<<< HEAD
そのための追加の検索メソッドがあります。
=======
There are additional searching methods for that.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## document.getElementById もしくは 単に id

<<<<<<< HEAD
要素に `id` 属性があると、`document.getElementById(id)` メソッドを使用することで要素が取得できます。

例:
=======
If an element has the `id` attribute, we can get the element using the method `document.getElementById(id)`, no matter where it is.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<div id="elem">
  <div id="elem-content">Element</div>
</div>

<script>
<<<<<<< HEAD
  // 要素を取得
=======
  // get the element
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  let elem = document.getElementById('elem');
*/!*

<<<<<<< HEAD
  // 背景を赤にします
=======
  // make its background red
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  elem.style.background = 'red';
</script>
```

<<<<<<< HEAD
また、要素を参照する `id` で名前付けされたグローバル変数もあります:
=======
Also, there's a global variable named by `id` that references the element:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Element</div>
</div>

<script>
<<<<<<< HEAD
  // elem は id="elem" の DOM 要素を参照します
  elem.style.background = 'red';

  // id="elem-content" はハイフンがあるので変数名にはできません。
  // が、角括弧を使用してアクセスできます: window['elem-content']
</script>
```

同じ名前の JavaScript 変数を宣言しない限り、この値が優先されます:
=======
  // elem is a reference to DOM-element with id="elem"
  elem.style.background = 'red';

  // id="elem-content" has a hyphen inside, so it can't be a variable name
  // ...but we can access it using square brackets: window['elem-content']
</script>
```

...That's unless we declare a JavaScript variable with the same name, then it takes precedence:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run untrusted height=0
<div id="elem"></div>

<script>
<<<<<<< HEAD
  let elem = 5;

  alert(elem); // 変数は要素を上書きします
</script>
```

```warn header="要素にアクセスするのに、id名のグローバル変数は使わないでください"
この振る舞いは [スペック](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem) で説明されているので、標準の1つです。が、主に互換性のためにサポートされています。

ブラウザは JS と DOM の名前空間を混在させることで助けようとします。シンプルなスクリプトであればよいですが、一般的には良いことではありません。名前が衝突する可能性があります。また、JS を見て、HTMLを見なかった場合、変数がどこから来たのかが明白ではありません。

このチュートリアルでは、要素を直接参照するために `id` を頻繁に使います。が、それは物事を短く保つためだけです。

実際には、`document.getElementById` が好ましい方法です。
```

```smart header="`id` はユニークでなければなりません"
`id` は一意でなければなりません。与えられた `id` の要素はドキュメント上で1つだけです。 

同じ `id` を持つ要素が複数ある場合、対応するメソッドの振る舞いは予測できません。例えば、`document.getElementById` はランダムで該当する要素のうち1つを返すかもしれません。そのため、`id` は一意となるよう注意してください。 
```

```warn header="`document.getElementById` はありますが、`anyNode.getElementById` はありません"
メソッド `getElementById` は `document` オブジェクトに対してのみ呼び出し可能です。これはドキュメント全体から指定された `id` を探します。
=======
  let elem = 5; // now elem is 5, not a reference to <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Please don't use id-named global variables to access elements"
This behavior is described [in the specification](https://html.spec.whatwg.org/multipage/window-object.html#named-access-on-the-window-object), but it is supported mainly for compatibility.

The browser tries to help us by mixing namespaces of JS and DOM. That's fine for simple scripts, inlined into HTML, but generally isn't a good thing. There may be naming conflicts. Also, when one reads JS code and doesn't have HTML in view, it's not obvious where the variable comes from.

Here in the tutorial we use `id` to directly reference an element for brevity, when it's obvious where the element comes from.

In real life `document.getElementById` is the preferred method.
```

```smart header="The `id` must be unique"
The `id` must be unique. There can be only one element in the document with the given `id`.

If there are multiple elements with the same `id`, then the behavior of methods that use it is unpredictable, e.g. `document.getElementById` may return any of such elements at random. So please stick to the rule and keep `id` unique.
```

```warn header="Only `document.getElementById`, not `anyElem.getElementById`"
The method `getElementById` can be called only on `document` object. It looks for the given `id` in the whole document.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## querySelectorAll [#querySelectorAll]

<<<<<<< HEAD
最も用途の広いメソッド `elem.querySelectorAll(css)` は、指定された CSS セレクターに一致する `elem` 内のすべての要素を返します。

以下では、最後の子要素となるすべての `<li>` 要素を探します:
=======
By far, the most versatile method, `elem.querySelectorAll(css)` returns all elements inside `elem` matching the given CSS selector.

Here we look for all `<li>` elements that are last children:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

任意の CSS セレクタが書けるのでこのメソッドは強力です。

<<<<<<< HEAD
```smart header="疑似クラスも使えます"
`:hover` や `:active` のような CSS セレクタの擬似クラスもサポートされています。例えば、`document.querySelectorAll(':hover')` はポインタがある要素のコレクションを返します（ネスト順は、最も外側の `<html>` から最もネストされたものの順です）。
=======
```smart header="Can use pseudo-classes as well"
Pseudo-classes in the CSS selector like `:hover` and `:active` are also supported. For instance, `document.querySelectorAll(':hover')` will return the collection with elements that the pointer is over now (in nesting order: from the outermost `<html>` to the most nested one).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## querySelector [#querySelector]

`elem.querySelector(css)` は、指定された CSS セレクタの最初の要素を返します。

<<<<<<< HEAD
つまり、`elem.querySelectorAll(css)[0]` と同じ結果になりますが、後者は *すべての* 要素を探し1つを返す、一方、`elem.querySelector` は1つだけを探します。なので、処理も速く、記述もより短くなります。
=======
In other words, the result is the same as `elem.querySelectorAll(css)[0]`, but the latter is looking for *all* elements and picking one, while `elem.querySelector` just looks for one. So it's faster and also shorter to write.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## matches

これまでのメソッドは DOM を検索していました。

<<<<<<< HEAD
[elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) は何も探しません。これは単に `elem` が与えられた CSS セレクタに一致するかをチェックし、`true` または `false` を返します。

このメソッドは、要素(配列か何か)を反復処理し、興味のあるものをフィルタしようとするときに便利です。
=======
The [elem.matches(css)](https://dom.spec.whatwg.org/#dom-element-matches) does not look for anything, it merely checks if `elem` matches the given CSS-selector. It returns `true` or `false`.

The method comes in handy when we are iterating over elements (like in an array or something) and trying to filter out those that interest us.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
要素の *祖先* は、要素の親、親の親、さらにその親などです。祖先は、該当要素から最上部までの親のチェーンを形成します。

メソッド `elem.closest(css)` は CSS セレクタにマッチする最も近い祖先を見ます。`elem` 自身も検索対象に含まれています。
=======
*Ancestors* of an element are: parent, the parent of parent, its parent and so on. The ancestors together form the chain of parents from the element to the top.

The method `elem.closest(css)` looks for the nearest ancestor that matches the CSS-selector. The `elem` itself is also included in the search.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

つまり、メソッド `closest` は要素(`elem`)から上に進み、親をチェックしていきます。セレクタにマッチしたら、検索を止めその祖先を返却します。

例:

```html run
<h1>Contents</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Chapter 1</li>
    <li class="chapter">Chapter 2</li>
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

<<<<<<< HEAD
他にもタグやクラスなどでノードを探すメソッドがあります。
=======
There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`querySelector` のほうがより強力で、短く書くこともできるため、今日、それらはほとんど歴史的な背景により存在するメソッドとなっています。

そのため、ここでは主に完全を期すためにそれらを説明します。古いスクリプトではそらを目にすることがあるかもしれません。

<<<<<<< HEAD
- `elem.getElementsByTagName(tag)` は指定されたタグの要素を探し、そのコレクションを返します。`tag` パラメータは "任意のタグ" としてアスタリスク `"*"` が指定可能です。
- `elem.getElementsByClassName(className)` は指定された CSS クラスを持つ要素を返します。
- `document.getElementsByName(name)` は指定された `name` 属性を持つ要素をドキュメント全体で返します。めったに使われません。

例:
```js
// ドキュメント上のすべての div を取得
let divs = document.getElementsByTagName('div');
```

テーブル内のすべての `input` タグを見つけましょう:

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
もう1つ、広く知られている初心者の間違いはこのように書くことです:

```js
// 動作しません
document.getElementsByTagName('input').value = 5;
```

これは動作しません。なぜならそれは input のコレクションを取得し、その中の要素ではなくコレクション自体に値を代入するためです。

コレクションを反復するか、数値で要素を取得するかを行った後に代入します。:

```js
// 動作します(input がある場合)
document.getElementsByTagName('input')[0].value = 5;
```
````

`.article` 要素を探します:

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

## ライブ(動的)なコレクション

すべての `"getElementsBy*"` メソッドは *ライブ(動的)な* コレクションを返します。このようなコレクションは常にドキュメントの現在の状態を反映し、変更があったとき "自動更新" されます。

下の例では、2つのスクリプトがあります。

1. 最初のスクリプトは `<div>` のコレクションへの参照を生成します。今のところ、その長さは `1` です。
2. 2つ目のスクリプトはブラウザが1つ以上の `<div>` に会った後に実行するので、その長さは `2` です。
=======
1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

対照的に、`querySelectorAll` は *静的な* コレクションです。これは固定要素配列です。

代わりにこれを使った場合、両方のスクリプトは `1` を出力します:


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
## サマリ 

DOM でノードを検索するための6つの主なメソッドがあります:
=======
## Summary

There are 6 main methods to search for nodes in DOM:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

<table>
<thead>
<tr>
<td>メソッド</td>
<td>何で検索するか</td>
<td>要素上で呼ぶことが可能?</td>
<td>ライブ(動的)?</td>
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

最も使われるのは `querySelector` と `querySelectorAll` ですが、`getElement(s)By*` はたまに役立つか、古いスクリプトに含まれています。
=======
</tbody>
</table>

By far the most used are `querySelector` and `querySelectorAll`, but `getElement(s)By*` can be sporadically helpful or found in the old scripts.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

その他:

<<<<<<< HEAD
- `elem` が指定された CSS セレクタに一致するかをチェックする `elem.matches(css)` があります。
- 指定された CSS セレクタに一致する最も近い祖先を探すための `elem.closest(css)` があります。`elem` 自身もチェックされます。

また、親子の関係を調べるもう一つの方法をここで言及しましょう:
-  `elemA.contains(elemB)` は `elemB` が `elemA` の中にある(`elemA` の子孫)または `elemA==elemB` の場合 true を返します。
=======
- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
