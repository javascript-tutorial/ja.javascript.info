# バブリング と キャプチャリング

例から始めましょう。

このハンドラは `<div>` へ割り当てられますが、`<em>` や `<code>` のような任意のネストされたタグをクリックしたときにも実行されます:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
</div>
```

不思議ですよね？実際にクリックしたのは `<em>` でしたが、 `<div>` のハンドラが実行されるのはなぜでしょう？

## バブリング(Bubbling) 

バブリングの原理はシンプルです。

**要素上でイベントが発生すると、最初にその要素上のハンドラが実行され、次にその親要素のハンドラが実行され、さらに他の祖先を実行します。**

たとえば、3つのネストされた要素 `FORM > DIV > P` があり、それぞれにハンドラがあるとします:

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

`<p>` をクリックすると、最初に `onclick` を実行します:
1. クリックした `<p>`.
2. 次に外側の `<div>`.
3. 次に外側の `<form>`.
4. そして、`document` オブジェクトまで登ります.

![](event-order-bubbling.svg)

なので、`<p>` をクリックすると、3つのアラートが表示されます: `p` -> `div` -> `form`

このプロセスは "バブリング" と呼ばれます。なぜなら、水の中の泡のようにイベントが内部の要素から親に至るまで "バブル" しているためです。

```warn header="*ほぼ* すべてのイベントがバブルします"
このフレーズのキーワードは、"ほとんど" です。

例えば、`focus` イベントはバブルしません。他にも例はあります。ですが、それはルールというよりはむしろ例外であり、ほとんどのイベントはバブルします。
```

## event.target

親要素のハンドラは、常に実際に発生した場所についての詳細を取得できます。

**イベントが発生した最も深くネストされた要素は *ターゲット* 要素と呼ばれ、 `event.target` でアクセスできます。**

`this` (=`event.currentTarget`) との違いは以下の通りです:

- `event.target` -- はイベントが開始された "ターゲット" 要素で、バブリングプロセスを通して変化しません。
- `this` -- は "現在" の要素で、現在実行中のハンドラを持ちます。

例えば、単一のハンドラ `form.onclick` がある場合、その form 中のすべてのクリックを "キャッチ" できます。どこでクリックされたかは関係なく、`<form>` までバブルし、そのハンドラを実行します。

`form.onclick` ハンドラの中:

- `this` (`=event.currentTarget`) は `<form>` 要素です。ハンドラはそこで動いているからです。
- `event.target` は実際にクリックされた form の内側にある具体的な要素です。

見てみましょう:

[codetabs height=220 src="bubble-target"]

`event.target` と `this` が等しい場合があります。クリックを `<form>` 要素で直接行った場合です。

## バブリングを止める 

バブリングイベントはターゲット要素からまっすぐ上がってきます。通常、それは `<html>` まで到達し、次に `document` オブジェクトに移動し、いくつかのイベントは `window` にも到達し、そのパス上のすべてのハンドラを呼び出します。

しかし、どのハンドラも、イベントが完全に処理されたと判断し、バブリングを止めることができます。

そのためのメソッドは `event.stopPropagation()` です。

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

1. 私たちはネストされたメニューを作ります。各サブメニューはその要素上でクリックを処理し、外部のメニューがトリガされないよう、`stopPropagation` を呼び出します。
2. 後ほど、ユーザの行動(人々がクリックした場所)を追跡するためにウィンドウ全のクリックをキャッチすることに決めました。いくつかの分析システムはそのようなことをします。通常、すべてのクリックをキャッチするためのコードは `document.addEventListener('click'…)` を使います。
3. 我々の分析は、クリックが `stopPropagation` で止められた領域上では動作しません。それは "デッドゾーン" になります。

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

つまり: `<td>` をクリックした場合、イベントは最初に祖先のチェーンを通って要素へ下りていき(キャプチャリング)、ターゲットに到達した後、ハンドラを呼び出しながら上に行き(バブル)ます。

**以前バブリングについてのみ話しましたが、それはキャプチャリングフェーズはほとんど使われないためです。通常それは私たちには見えません。**

`on<event>`プロパティまたは HTML属性、もしくは `addEventListener(event, handler)` を使って追加されたハンドラはキャプチャリングについて何も知りません。それらはフェーズ 2 と 3 でのみ実行されます。

キャプチャリングフェーズでイベントをキャッチするには、`addEventListener` の３つ目の引数を `true` にする必要があります。

```js
elem.addEventListener(..., {capture: true})
// または, 単に "true" は {capture: true} のエイリアスです
elem.addEventListener(..., true)
```

最後の引数は２つのとり得る値があります:

- `false` (デフォルト) の場合、ハンドラはバブリングフェーズで設定されます。
- `true` の場合、ハンドラはキャプチャリングフェーズで設定されます。


正式には３つのフェーズがありますが、２つ目のフェーズ("ターゲットフェーズ": イベントが要素に到達した)は個別に処理されないことに注意してください: キャプチャフェーズとバブリングフェーズの両方のハンドラがそのフェーズでトリガします。

キャプチャリングとバブリング両方の例を見てみましょう:

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

`<p>` をクリックするしたときの処理の流れは次の通りです:

1. `HTML` -> `BODY` -> `FORM` -> `DIV` (キャプチャリングフェーズ, １つ目のリスナーです):
2. `P` (ターゲットフェーズ, キャプチャリングとバブリング2つのリスナをセットしているので、2度実行されます)
3. `DIV` -> `FORM` -> `BODY` -> `HTML` (バブリングフェーズ, 2つ目のリスナーです).

イベントが捕捉されたフェーズの番号を示すプロパティ `event.eventPhase` があります。ですが、通常はハンドラでそれを知っているので、めったに使用されません。

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

## サマリ 

イベントハンドラプロセスです:

- イベントが発生したとき -- それが起きた最もネストされた要素は "ターゲット要素" (`event.target`) としてラベル付けされます。
- 次にイベントは `addEventListener(...., true)` で割り当てられたハンドラを呼び出しながらドキュメントルートから `event.target` へ下りていきます。
- その後、イベントは `on<event>` と3つ目の引数がないもしくは `false` の `addEventListener` を使って割り当てられたハンドラを実行しながら `event.target` からルートまで上がっていきます。

それぞれのハンドラは `event` オブジェクトのプロパティにアクセスできます:

- `event.target` -- イベントを発生させた最も深い要素です。
- `event.currentTarget` (=`this`) -- イベントを処理する現在の要素（ハンドラを持つ要素）
- `event.eventPhase` -- 現在のフェーズ (キャプチャリング=1, バブリング=3).

どのハンドラも `event.stopPropagation()` を呼び出すことでイベントを止めることができますが、それは推奨しません。

キャプチャリングフェーズはめったに使われません、通常バブリングでイベントを処理します。その背後には論理があります。

実世界では、事故が起こると地方自治体がまず反応します。 彼らは起こった場所を最もよく知っています。 その後、必要に応じてより高いレベルの権限が反応します。

イベントハンドラでも同じです。特定の要素に対してハンドラを設定するコードは、その要素と起きることについて最もよく知っています。特定の `<td>` のハンドラは、まさにその `<td>` に適合することができ、それについてすべてを知っています。なので、最初に機会を得るべきです。次に、直近の親もまたそのコンテキストについて知っていますが、知っていることは少し少なくなります。そのようにして、一般的な概念を扱い、最後に実行する最上位の要素まで処理をします。

バブリングとキャプチャリングは次のチャプターで学ぶ非常に強力なイベント処理パターンである "イベント委任(event delegation)" の基盤となります。
