# カスタムイベントのディスパッチ

私たちは、ハンドラを割り当てるだけでなく、JavaScript からイベントを生成することもできます。

<<<<<<< HEAD
カスタムイベントを使用して「グラフィックコンポーネント」を作成できます。例えば、メニューのルート要素は、メニューで起きたことを伝えるイベントをトリガすることができます: `open` (メニューを開く), `select` (項目が選択された) など。

`click`, `mousedown` などのような、組み込みのイベントを生成することもでき、テストをするときに便利です。

[cut]
=======
Custom events can be used to create "graphical components". For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: `open` (menu open), `select` (an item is selected) and so on. Another code may listen for the events and observe what's happening with the menu.

We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, such as `click`, `mousedown` etc. That may be helpful for automated testing.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

## イベントコンストラクタ 

<<<<<<< HEAD
イベントはDOM 要素クラスと同様、階層を形成します。ルートは組み込みの [Event](http://www.w3.org/TR/dom/#event) クラスです。
=======
Build-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

このようにして `Event` オブジェクトを生成できます:

```js
let event = new Event(type[, options]);
```

引数:

<<<<<<< HEAD
- *event type* -- `"click"` や独自の `"hey-ho!"` のような任意の文字列です。
- *options* -- 2つのオプションのプロパティを持つオブジェクトです:
  - `bubbles: true/false` -- `true` の場合、イベントがバブルします。
  - `cancelable: true/false` -- `true` の場合、"デフォルトアクション" が防がれます。後ほど、 カスタムイベントに対して意味していることを見てきます。
=======
- *type* -- event type, a string like `"click"` or our own like `"my-event"`.
- *options* -- the object with two optional properties:
  - `bubbles: true/false` -- if `true`, then the event bubbles.
  - `cancelable: true/false` -- if `true`, then the "default action"  may be prevented. Later we'll see what it means for custom events.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

  デフォルトでは、両方とも false です: `{bubbles: false, cancelable: false}`.

## dispatchEvent

<<<<<<< HEAD
イベントオブジェクトを作成した後、`elem.dispatchEvent(event)` を使って、要素上で "実行" する必要があります。

その後、ハンドラは、それが正規の組み込みイベントであるかのようにそれに反応します。もし `bubbles` フラグでイベントが作成されていた場合、バブルします。
=======
After an event object is created, we should "run" it on an element using the call `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular browser event. If the event was created with the `bubbles` flag, then it bubbles.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

下の例では、`click` イベントが JavaScript の中で開始されます。ハンドラはボタンがクリックされたかのように動作します。:

```html run no-beautify
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
"本当の" ユーザイベントであることを伝える方法があります。

本当のユーザアクションから来たイベントの場合、プロパティ `event.isTrusted` は `true` になります。スクリプトで生成されたイベントは `false` です。
```

## バブリング例 

`"hello"` という名前のバブリングイベントを作成し、`document` でキャッチすることができます。

必要なことは、`bubbles` を `true` にセットすることです。:

```html run no-beautify
<h1 id="elem">Hello from the script!</h1>

<script>
  // document でキャッチ...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // ...elem でディスパッチ!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

  // the handler on document will activate and display the message.

</script>
```

<<<<<<< HEAD
補足:
=======

Notes:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

1. カスタムイベントに対しては、`addEventListener` を使うべきです。なぜなら、`on<event>` は組み込みイベントに対してのみ存在するからです。`document.onhello` は動作しません。
2. `bubbles:true` を設定しなければなりません。さもないと、イベントはバブルしません。

バブリングの仕組みは、組み込み (`click`) と カスタム (`hello`) イベントで同じです。キャプチャリングとバブリングのフェーズもあります。

## MouseEvent, KeyboardEvent 等

以下は [UI Event specification](https://www.w3.org/TR/uievents) のUIイベントのクラスのリストの一部です。:

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

これらのイベントを生成したいときは、`new Event` の代わりに、これらを使うべきです。例えば、`new MouseEvent("click")`。

コンストラクタでは、そのイベントのタイプの標準プロパティを指定できます。

マウスイベントの `clientX/clientY` だとこのようにできます:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

注意: `Event` コンストラクタはそれを許可しません。

試してみましょう:

```js run
let event = new Event("click", {
  bubbles: true, // bubbles と cancelable のみ
  cancelable: true, // Event constructor で動作します
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, 未知のプロパティは無視されます!
*/!*
```

技術的には、生成後に直接 `event.clientX=100` を割り当てることで回避できます。それは利便性の問題であり、ルールに従うためです。ブラウザで生成されたイベントは常に正しいタイプを持っています。

<<<<<<< HEAD
異なるUIイベントの、プロパティの完全なリストは仕様にあります。例えば、[MouseEvent](https://www.w3.org/TR/uievents/#mouseevent) など。
=======
The full list of properties for different UI events is in the specification, for instance, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

## カスタムイベント 

<<<<<<< HEAD
`"hello"` のような独自のカスタムイベントに対しては、`new CustomEvent` を使うべきです。技術的には [CustomEvent](https://dom.spec.whatwg.org/#customevent) は1つの例を除いて `Event` と同じです。
=======
For our own, completely new events types like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

2つ目の引数(オブジェクト)では、イベントと一緒に渡したい任意の情報のために、追加のプロパティ `detail` を追加することが出来ます。

例:

```html run refresh
<h1 id="elem">Hello for John!</h1>

<script>
  // イベントと一緒にハンドラに来る追加の詳細情報です
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

`detail` プロパティは任意のデータを持てます。技術的には、通常の `new Event` オブジェクトを作った後、そこに任意のプロパティを割り当てる事ができるため、それなしでも生きていくことはできます。しかし、`CustomEvent` は他のイベントプロパティとの衝突を避けるための特別な `detail` フィールドを提供します。

<<<<<<< HEAD
イベントクラスは "どのような種類のイベント" かを示し、もしイベントがカスタムであれば、それが何であるかを明確にするために `CustomEvent` を使うべきです。 

## event.preventDefault()

もし `cancelable:true` フラグが指定されている場合、スクリプトで生成されたイベントで `event.preventDefault()` を呼び出すことができます。

もちろん、イベントが非標準の名前である場合、ブラウザはそれを知らないので、そのための "デフォルトブラウザアクション" はありません。

しかし、イベントを生成するコードは `dispatchEvent` の後にいくつかのアクションを計画するかもしれません。

`event.preventDefault()` の呼び出しは、ハンドラがそれらのアクションを実行すべきではないという信号を送信する方法です。

その場合、`elem.dispatchEvent(event)` への呼び出しは `false` を返します。そして、イベント生成コードは処理は継続すべきでないと知ります。

例えば、下の例では `hide()` 関数があります。それは要素 `#rabbit` で `"hide"` イベントを生成し、すべての関係者に うさぎ(rabbit)が隠れることを通知します。

`rabbit.addEventListener('hide',...)` で設定されたハンドラは、それについて学び、必要な場合には `event.preventDefault()` を呼び出すことでそのアクションを防ぐことができます。すると、うさぎは隠れません。:
=======
Besides, the event class describes "what kind of event" it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## event.preventDefault()

Many browser events have a "default action", such as nagivating to a link, starting a selection, and so on.

For new, custom events, there are definitely no default browser actions, but a code that dispatches such event may have its own plans what to do after triggering the event.

By calling `event.preventDefault()`, an event handler may send a signal that those actions should be canceled.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the code that dispatched it knows that it shouldn't continue.

Let's see a practical example - a hiding rabbit (could be a closing menu or something else).

Below you can see a `#rabbit` and `hide()` function that dispatches `"hide"` event on it, to let all interested parties know that the rabbit is going to hide.

Any handler can listen for that event with `rabbit.addEventListener('hide',...)` and, if needed, cancel the action using `event.preventDefault()`. Then the rabbit won't disappear:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">Hide()</button>

<script>
  // hide() は2秒後に自動で呼び出されます
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // このフラグがないと preventDefault が動作しません
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('The action was prevented by a handler');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Call preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

Обратите внимание: событие должно иметь флаг `cancelable: true`, иначе вызов `event.preventDefault()` будет проигнорирован.

## イベント中のイベントは同期的です 

通常、イベントは非同期に処理されます。つまり: ブラウザが `onclick` を処理しており、そのプロセスの中で新しいイベントが起きた場合、`onclick` が終わるまでそれは待ちます。

例外は、あるイベントが別のイベントから開始された場合です。

次に、制御はネストされたイベントハンドラに飛び、その後戻ってきます。

例えば、ここではネストされた `menu-open` イベントは `onclick` の間、同期的に処理されます。:

```html run autorun
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    // alert("nested")
    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

<<<<<<< HEAD
ネストされたイベント `menu-open` はバブルアップし `document` で処理されることに注意してください。ネストされたイベントの伝搬は、外部のコード(`onclick`) に戻る前に完全に終了します。
=======
The output order is: 1 -> nested -> 2.

Please note that the nested event `menu-open` fully bubbles up and is handled on the `document`. The propagation and handling of the nested event must be fully finished before the processing gets back to the outer code (`onclick`).
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

それは `dispatchEvent` についてだけでなく、他のケースも同様です。イベントハンドラ中の JavaScript は別のイベントにつながるメソッドを呼び出すことができます -- それらも同期的に処理されます。

<<<<<<< HEAD
もしそれが気に入らなければ、`onclick` の末尾に `dispatchEvent` (または他のイベントトリガ呼び出し) を置くか、不便であれば `setTimeout(..., 0)` で囲みます。:
=======
If we don't like it, we can either put the `dispatchEvent` (or other event-triggering call) at the end of `onclick` or, maybe better, wrap it in zero-delay `setTimeout`:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```html run
<button id="menu">Menu (click me)</button>

<script>
  menu.onclick = function() {
    alert(1);

    // alert(2)
    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

  document.addEventListener('menu-open', () => alert('nested'));
</script>
```    

<<<<<<< HEAD
## サマリ 

イベントを生成するためには、最初にイベントオブジェクトを作成する必要があります。

汎用的な `Event(name, options)` コンストラクタは、任意のイベント名と2つのプロパティを持つ `options` オブジェクトを受け取ります。:
  - イベントがバブルするべきであれば、`bubbles: true`。
  - `cancelable: true` は `event.preventDefault()` が動作します。
=======
Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

The output order becomes: 1 -> 2 -> nested.

## Summary

To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
- `bubbles: true` if the event should bubble.
- `cancelable: true` if the `event.preventDefault()` should work.
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

他の `MouseEvent`, `KeyboardEvent` などのようなネイティブイベントのコンストラクタはそのイベントタイプに固有のプロパティを受け入れます。例えば、マウスイベントであれば `clientX` です。

カスタムイベントの場合、`CustomEvent` コンストラクタを使うべきです。それは `detail` と言う名の追加のオプションを持っており、そこへイベント固有のデータを割り当てるべきです。そして、以降すべてのハンドラは `event.detail` でそこにアクセスすることができます。

`click` や `keydown` のようなブラウザイベントを生成することは技術的には可能性ですが、大きな注意を払って使うべきです。

ハンドラを実行するために、ブラウザイベントをハックな方法で生成するべきではありません。 これは、ほとんどの場合、悪いアーキテクチャです。

ネイティブイベントは次のような場合に生成される場合があります:

- サードパーティライブラリが他のインタラクションの手段を提供していない場合に、動作させるための汚いハックとして。
- 自動テストの場合で、スクリプトの中で "ボタンをクリック" し、インタフェースが正しく反応するかを見るために。

独自の名前を持つカスタムイベントは、アーキテクチャ上の目的で、メニュー、スライダ、カルーセルなどの内部で何が起こるかを伝えるために生成されることがよくあります。
