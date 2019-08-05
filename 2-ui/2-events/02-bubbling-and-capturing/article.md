# バブリング と キャプチャリング

例で始めてみましょう。

このハンドラは `<div>` へ割り当てられますが、`<em>` や `<code>` のような任意のネストされたタグをクリックしたときにも実行されます:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```

<<<<<<< HEAD
少し奇妙に見えますよね？ なぜ実際のクリックが `<em>` だった場合に `<div>` 上のハンドラが実行されるでしょう？
=======
Isn't it a bit strange? Why does the handler on `<div>` run if the actual click was on `<em>`?
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

## バブリング(Bubbling) 

バブリングの原理はシンプルです。

**要素上でイベントが起きると、最初にその上のハンドラが実行され、次にその親のハンドラが実行され、他の祖先に到達するまでそれらが行われます。**

<<<<<<< HEAD
たとえば、3つのネストされた要素 `FORM > DIV > P` があり、それぞれにハンドラがあります:
=======
Let's say we have 3 nested elements `FORM > DIV > P` with a handler on each of them:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

`<p>` の内部のクリックでは、最初に `onclick` を実行します:
1. その `<p>`.
2. 次に外部の `<div>`.
3. 次に外部の `<form>`.
4. そして、`document` オブジェクトまで登ります.

![](event-order-bubbling.svg)

なので、`<p>` をクリックすると、3つのアラートが表示されます: `p` -> `div` -> `form`

このプロセスは "バブリング" と呼ばれます。なぜなら、水の中の泡のように、イベントが内部の要素から親に至るまで "バブル" しているためです。

```warn header="*ほぼ* すべてのイベントがバブルします"
このフレーズのキーワードは、"ほとんど" です。

例えば、`focus` イベントはバブルしません。他にも例があり、私たちはそれらを見ていくでしょう。しかし、それはルールというよりはむしろ例外であり、ほとんどのイベントはバブルします。
```

## event.target

親要素のハンドラは、常に実際に発生した場所についての詳細を取得できます。

**イベントを起こした最も深くネストされた要素は *ターゲット* 要素と呼ばれ、 `event.target` でアクセス可能です。**

`this` (=`event.currentTarget`) との違いは次です:

- `event.target` -- はイベントを始めた "ターゲット" 要素で、バブリングプロセスを通して変化しません。
- `this` -- は "現在" の要素で、現在実行中のハンドラを持ちます。

例えば、単一のハンドラ `form.onclick` を持っている場合、その form 中のすべてのクリックを "キャッチ" できます。どこでクリックされたかは関係なく、`<form>` までバブルし、そのハンドラを実行します。

`form.onclick` ハンドラの中は:

<<<<<<< HEAD
- `this` (`=event.currentTarget`) は `<form>` 要素です。なぜなら、ハンドラはそこで動いているからです。
- `event.target` は実際にクリックされた form の内側にある具体的な要素です。
=======
- `this` (`=event.currentTarget`) is the `<form>` element, because the handler runs on it.
- `event.target` is the actual element inside the form that was clicked.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

見てみましょう:

[codetabs height=220 src="bubble-target"]

It's possible that `event.target` could equal `this` -- it happens when the click is made directly on the `<form>` element.

## バブリングを止める 

バブリングイベントはターゲット要素からまっすぐ上がってきます。通常、それは `<html>` まで到達し、次に `document` オブジェクトに移動し、いくつかのイベントは `window` にも到達し、そのパス上のすべてのハンドラを呼び出します。

しかし、どのハンドラも、イベントが完全に処理されたと判断し、バブリングを止めることができます。

そのためのメソッドは `event.stopPropagation()` です.

例えば、ここで `<button>` をクリックしても `body.onclick` は動作しません。

```html run autorun height=60
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
ある要素が、1つのイベントに対し複数のイベントハンドラを持っている場合、それらの１つがバブリングを止めたとしても、残りのイベントハンドラは引き続き実行されます。

つまり、`event.stopPropagation()` は上に移動するのは止めますが、現在の要素上にある他のすべてのハンドラは実行します。

バブリングを止め、現在の要素のハンドラを実行しないようにするために、`event.stopImmediatePropagation()` メソッドがあります。この後は他のハンドラは実行されません。
```

```warn header="必要なければバブリングは止めないでください!"
バブリングは便利です。本当に必要な場合を除いて止めないでください。: 明白で構造的によく知られているような場合。

`event.stopPropagation()` は後に問題になるかもしれない隠れた落とし穴を作る場合があります。

例えば:

<<<<<<< HEAD
1. 私たちはネストされたメニューを作ります。各サブメニューはその要素上でクリックを処理し、外部のメニューがトリガされないよう、`stopPropagation` を呼び出します。
2. 後ほど、ユーザの行動(人々がクリックした場所)を追跡するためにウィンドウ全のクリックをキャッチすることに決めました。いくつかの分析システムはそのようなことをします。通常、すべてのクリックをキャッチするためのコードは `document.addEventListener('click'…)` を使います。
3. 我々の分析は、クリックが `stopPropagation` で止められた領域上では動作しません。それは "デッドゾーン" になります。
=======
1. We create a nested menu. Each submenu handles clicks on its elements and calls `stopPropagation` so that the outer menu won't trigger.
2. Later we decide to catch clicks on the whole window, to track users' behavior (where people click). Some analytic systems do that. Usually the code uses `document.addEventListener('click'…)` to catch all clicks.
3. Our analytic won't work over the area where clicks are stopped by `stopPropagation`. We've got a "dead zone".
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

通常、本当にバブリングを防がなければならないケースはほとんどありません。必要と思われるタスクは他の手段で解決できる可能性があります。そのうちの１つはカスタムイベントを利用することで、後でそれを説明します。また、データをあるハンドラの `event` オブジェクトに書き込み、別のハンドラでそれを読み込むこともできるので、親のハンドラに下位の処理に関する情報を渡すことができます。
```


## キャプチャリング(Capturing) 

"キャプチャリング" と呼ばれるイベント処理の別のフェーズがあります。実際のコードではほとんど使われませんが、役立つときがあります。

標準 [DOM Events](http://www.w3.org/TR/DOM-Level-3-Events/) はイベント伝搬の３つのフェーズを説明しています。:

1. キャプチャリングフェーズ -- イベントが要素へ下りていきます。
2. ターゲットフェーズ -- イベントがターゲット要素に到達しました。
3. バブリングフェーズ -- イベントが要素から上にバブルします。

これは、テーブル中の `<td>` をクリックしたときの図で、仕様から抜粋したものです:

![](eventflow.svg)

<<<<<<< HEAD
つまり: `<td>` をクリックした場合、イベントは最初に祖先のチェーンを通って要素へ下りていき(キャプチャリング)、ターゲットに到達した後、ハンドラを呼び出しながら上に行き(バブル)ます。
=======
That is: for a click on `<td>` the event first goes through the ancestors chain down to the element (capturing phase), then it reaches the target and triggers there (target phase), and then it goes up (bubbling phase), calling handlers on its way.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

**以前バブリングについてのみ話しましたが、それはキャプチャリングフェーズはほとんど使われないためです。通常それは私たちには見えません。**

`on<event>`プロパティまたは HTML属性、もしくは `addEventListener(event, handler)` を使って追加されたハンドラはキャプチャリングについて何も知りません。それらはフェーズ 2 と 3 でのみ実行されます。

<<<<<<< HEAD
キャプチャリングフェーズでイベントをキャッチするには、`addEventListener` の３つ目の引数を `true` にする必要があります。

最後の引数は２つのとり得る値があります:
=======
To catch an event on the capturing phase, we need to set the handler `capture` option to `true`:

```js
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

There are two possible values of the `capture` option:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

- `false` (デフォルト) の場合、ハンドラはバブリングフェーズで設定されます。
- `true` の場合、ハンドラはキャプチャリングフェーズで設定されます。

<<<<<<< HEAD
正式には３つのフェーズがありますが、２つ目のフェーズ("ターゲットフェーズ": イベントが要素に到達した)は個別に処理されないことに注意してください: キャプチャフェーズとバブリングフェーズの両方のハンドラがそのフェーズでトリガします。

キャプチャリングとバブリングハンドラをターゲット要素に置くと、キャプチャハンドラはキャプチャフェーズの最後にトリガし、バブルハンドラはバブリングフェーズで最初にトリガします。

動作を見てみましょう:
=======

Note that while formally there are 3 phases, the 2nd phase ("target phase": the event reached the element) is not handled separately: handlers on both capturing and bubbling phases trigger at that phase.

Let's see both capturing and bubbling in action:
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

```html run autorun height=140 edit
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
  }
</script>
```

どのハンドラが動作するかを見るために、ドキュメント上の *すべての* 要素にクリックハンドラを設定しています。

`<p>` をクリックすると、シーケンスは次の通りです:

<<<<<<< HEAD
1. `HTML` -> `BODY` -> `FORM` -> `DIV` -> `P` (キャプチャリングフェーズ, １つ目のリスナーです)そして、:
2. `P` -> `DIV` -> `FORM` -> `BODY` -> `HTML` (バブリングフェーズ, 2つ目のリスナーです).

`P` が2回表示されることに注意してください: キャプチャリングの終わりと、バブリングの開始です。
=======
1. `HTML` -> `BODY` -> `FORM` -> `DIV` (capturing phase, the first listener):
2. `P` (target phrase, triggers two times, as we've set two listeners: capturing and bubbling)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (bubbling phase, the second listener).
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

イベントが捕捉されたフェーズの番号を示すプロパティ `event.eventPhase` があります。 しかし、私たちは通常ハンドラでそれを知っているので、めったに使用されません。

<<<<<<< HEAD
## サマリ 

イベントハンドラプロセスです:

- イベントが発生したとき -- それが起きた最もネストされた要素は "ターゲット要素" (`event.target`) としてラベル付けされます。
- 次にイベントは `addEventListener(...., true)` で割り当てられたハンドラを呼び出しながらドキュメントルートから `event.target` へ下りていきます。
- その後、イベントは `on<event>` と3つ目の引数がないもしくは `false` の `addEventListener` を使って割り当てられたハンドラを実行しながら `event.target` からルートまで上がっていきます。
=======
```smart header="To remove the handler, `removeEventListener` needs the same phase"
If we `addEventListener(..., true)`, then we should mention the same phase in `removeEventListener(..., true)` to correctly remove the handler.
```

````smart header="Listeners on same element and same phase run in their set order"
If we have multiple event handlers on the same phase, assigned to the same element with `addEventListener`, they run in the same order as they are created:

```js
elem.addEventListener("click", e => alert(1)); // guaranteed to trigger first
elem.addEventListener("click", e => alert(2));
```
````


## Summary

When an event happens -- the most nested element where it happens gets labeled as the "target element" (`event.target`).

- Then the event moves down from the document root to `event.target`, calling handlers assigned with `addEventListener(...., true)` on the way (`true` is a shorthand for `{capture: true}`).
- Then handlers are called on the target element itself.
- Then the event bubbles up from `event.target` up to the root, calling handlers assigned using `on<event>` and `addEventListener` without the 3rd argument or with the 3rd argument `false/{capture:false}`.
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

それぞれのハンドラは `event` オブジェクトのプロパティにアクセスできます:

<<<<<<< HEAD
- `event.target` -- イベントを発生させた最も深い要素です。
- `event.currentTarget` (=`this`) -- イベントを処理する現在の要素（ハンドラを持つ要素）
- `event.eventPhase` -- 現在のフェーズ (キャプチャリング=1, バブリング=3).
=======
- `event.target` -- the deepest element that originated the event.
- `event.currentTarget` (=`this`) -- the current element that handles the event (the one that has the handler on it)
- `event.eventPhase` -- the current phase (capturing=1, target=2, bubbling=3).
>>>>>>> fb38a13978f6e8397005243bc13bc1a20a988e6a

どのハンドラも `event.stopPropagation()` を呼び出すことでイベントを止めることができますが、それは推奨しません。

キャプチャリングフェーズはめったに使われません、通常バブリングでイベントを処理します。その背後には論理があります。

実世界では、事故が起こると地方自治体がまず反応します。 彼らは起こった場所を最もよく知っています。 その後、必要に応じてより高いレベルの権限が反応します。

イベントハンドラでも同じです。特定の要素に対してハンドラを設定するコードは、その要素と起きることについて最もよく知っています。特定の `<td>` のハンドラは、まさにその `<td>` に適合することができ、それについてすべてを知っています。なので、最初に機会を得るべきです。次に、直近の親もまたそのコンテキストについて知っていますが、知っていることは少し少なくなります。そのようにして、一般的な概念を扱い、最後に実行する最上位の要素まで処理をします。

バブリングとキャプチャリングは次のチャプターで学ぶ非常に強力なイベント処理パターンである "イベント委任(event delegation)" の基盤となります。
