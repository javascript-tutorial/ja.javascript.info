# ブラウザイベントの紹介

*イベント* は何かが起きたと言う信号です。すべての DOM ノードはこのような信号を生成します(ただし、イベントは DOM に限ったものではありません)。

<<<<<<< HEAD
[cut]

ここでは最も有用なDOMイベントのリストを見てみましょう。:
=======
Here's a list of the most useful DOM events, just to take a look at:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**マウスイベント:**
- `click` -- 要素上でマウスをクリックしたとき(タッチスクリーンデバイスでは、タップでこのイベントを生成します)。
- `contextmenu` -- 要素上でマウスを右クリックしたとき。
- `mouseover` / `mouseout` -- マウスカーソルが要素へ来た/出たとき。
- `mousedown` / `mouseup` -- 要素上でマウスボタンを押したり離されたとき。
- `mousemove` -- マウスが移動したとき。

<<<<<<< HEAD
**フォーム要素イベント:**
- `submit` -- 訪問者が `<form>` をサブミットしたとき。
- `focus` --  訪問者が要素にフォーカスしたとき。e.g. `<input>`。

**キーボードイベント:**
- `keydown` と `keyup` -- 訪問者がボタンを押したり離したとき。

**ドキュメントイベント**
- `DOMContentLoaded` -- HTMLがロードされ処理されたとき、DOM は完全に構築済みです。
=======
**Keyboard events:**
- `keydown` and `keyup` -- when a keyboard key is pressed and released.

**Form element events:**
- `submit` -- when the visitor submits a `<form>`.
- `focus` --  when the visitor focuses on an element, e.g. on an `<input>`.

**Document events:**
- `DOMContentLoaded` -- when the HTML is loaded and processed, DOM is fully built.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**CSS イベント:**
- `transitionend` -- CSS アニメーションが終了したとき。

<<<<<<< HEAD
他にも多くのイベントがあります。次のチャプターで特定のイベントについてより詳細を見ていきます。
=======
There are many other events. We'll get into more details of particular events in upcoming chapters.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## イベントハンドラ 

イベントに反応するために、*ハンドラ* -- イベント発生時に実行する関数 -- を割り当てることができます。

<<<<<<< HEAD
ハンドラは、ユーザのアクション時に JavaScript コードを実行する方法です。
=======
Handlers are a way to run JavaScript code in case of user actions.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ハンドラを割り当てる方法はいくつかあります。最も簡単なものから始め、それらを見ていきましょう。

### HTML 属性 

ハンドラは `on<event>` と言う名前の属性で、 HTML 上で設定できます。

例えば、`input` に対して `click` ハンドラを割り当てるためには、このように `onclick` を使います:

```html run
<input value="Click me" *!*onclick="alert('Click!')"*/!* type="button">
```

マウスをクリックすると、`onclick` 内のコードが実行されます。

`onclick` 内で、シングルクォーテーションを使用していることに注意してください。これは、属性自身がダブルクォーテーションの中にいるためです。もし属性の中にいることを忘れ、ダブルクォーテーションを使った場合、次のようになります: `onclick="alert("Click!")"` , これは正しく動作しません。

HTML 属性は多くのコードを書くのに便利な場所ではないので、JavaScript 関数を作り、そこでその関数を呼ぶのが良いです。

ここでは、クリックで関数 `countRabbits()` を実行します:

```html autorun height=50
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert("Rabbit number " + i);
    }
  }
</script>

<input type="button" *!*onclick="countRabbits()"*/!* value="Count rabbits!">
```

ご存知の通り、HTML 属性名は大文字小文字を区別しません。そのため、`ONCLICK` は `onClick` や `onCLICK` と同様に動作します。が、通常属性は小文字表記です: `onclick`。

### DOM プロパティ 

DOM プロパティ `on<event>` を使ってハンドラを割り当てることができます。

例えば, `elem.onclick`:

```html autorun
<input id="elem" type="button" value="Click me">
<script>
*!*
  elem.onclick = function() {
    alert('Thank you');
  };
*/!*
</script>
```

ハンドラが HTML属性を使用して割り当てられた場合、ブラウザはそれを読み、属性のコンテンツから新しい関数を作成し、DOM プロパティに書きこみます。

したがって、この方法は実際には前の方法と同じです。

<<<<<<< HEAD
**ハンドラは常に DOM プロパティにあります: HTML属性は単にその初期化の方法の1つにすぎません。**

これらの２つのコードは同じように動作します:
=======
These two code pieces work the same:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. HTMLのみ:

    ```html autorun height=50
    <input type="button" *!*onclick="alert('Click!')"*/!* value="Button">
    ```
2. HTML + JS:

    ```html autorun height=50
    <input type="button" id="button" value="Button">
    <script>
    *!*
      button.onclick = function() {
        alert('Click!');
      };
    */!*
    </script>
    ```

<<<<<<< HEAD
**`onclick`プロパティは１つしかないため、1つ以上のイベントハンドラを割り当てることはできません。**
=======
In the first example, the HTML attribute is used to initialize the `button.onclick`, while in the second example -- the script, that's all the difference.

**As there's only one `onclick` property, we can't assign more than one event handler.**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

下の例では、JavaScript でのハンドラの追加は、既存のハンドラを上書きします:

```html run height=50 autorun
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
*!*
  elem.onclick = function() { // 既存のハンドラを上書きします
    alert('After'); // これだけが表示されます
  };
*/!*
</script>
```

<<<<<<< HEAD
ちなみに、既存の関数を直接ハンドラとして割り当てることもできます:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

ハンドラを削除するには -- `elem.onclick = null` を代入します。
=======
To remove a handler -- assign `elem.onclick = null`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 要素 this にアクセスする 

ハンドラの中の `this` の値はその要素です。

下のコードでは、`button` は `this.innerHTML` で自身の中身を表示します:

```html height=50 autorun
<button onclick="alert(this.innerHTML)">Click me</button>
```

## ありそうなミス 

<<<<<<< HEAD
イベントを使う場合は、微妙な点に注意してください。

**関数は `sayThanks()` ではなく、`sayThanks` で割り当てる必要があります。**
=======
If you're starting to work with events -- please note some subtleties.

We can set an existing function as a handler:

```js
function sayThanks() {
  alert('Thanks!');
}

elem.onclick = sayThanks;
```

But be careful: the function should be assigned as `sayThanks`, not `sayThanks()`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// 正しい
button.onclick = sayThanks;

// 誤り
button.onclick = sayThanks();
```

<<<<<<< HEAD
もしカッコをつけると、`sayThanks()` 関数の実行 *結果* になるので、最後の行の `onclick` は `undefined` (関数が何も返さない)になります。それは動作しません。

...しかしマークアップでは、カッコは必要です:
=======
If we add parentheses, then `sayThanks()` becomes a function call. So the last line actually takes the *result* of the function execution, that is `undefined` (as the function returns nothing), and assigns it to `onclick`. That doesn't work.

...On the other hand, in the markup we do need the parentheses:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<input type="button" id="button" onclick="sayThanks()">
```

<<<<<<< HEAD
この違いは簡単に説明出来ます。ブラウザが属性を読みとると、その内容から本体を含むハンドラ関数が作成されます。

したがって、最後の例は次と同じです:
```js
button.onclick = function() {
*!*
  sayThanks(); // ここが属性の中身
=======
The difference is easy to explain. When the browser reads the attribute, it creates a handler function with body from the attribute content.

So the markup generates this property:
```js
button.onclick = function() {
*!*
  sayThanks(); // <-- the attribute content goes here
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
};
```

<<<<<<< HEAD
**文字列ではなく関数を使用します。**

割り当て `elem.onclick = "alert(1)"` も動作します。これは互換性のために動作しますが、強く推奨されません。

**ハンドラに対して、`setAttribute` は使わないでください。**
=======
**Don't use `setAttribute` for handlers.**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このような呼び出しは動作しません:

```js run no-beautify
// <body> のクリックはエラーになります,
// なぜなら、属性は常に文字列であり、関数は文字列になります
document.body.setAttribute('onclick', function() { alert(1) });
```

**DOMプロパティは大文字小文字の区別をします**

DOM プロパティは大文字小文字を区別するので、`elem.ONCLICK` ではなく `elem.onclick` にハンドラを割り当ててください。

## addEventListener

<<<<<<< HEAD
ハンドラを割り当てるための前述の根本的な問題は -- １つのイベントに複数のハンドラを割り当てられないことです。

例えば、コードのある一部がクリック時にボタンを強調表示し、別のコードがメッセージを表示したい場合です。
=======
The fundamental problem of the aforementioned ways to assign handlers is that we *can't assign multiple handlers to one event*.

Let's say, one part of our code wants to highlight a button on click, and another one wants to show a message on the same click.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

私たちは、そのために２つのイベントハンドラを割り当てたいです。が、新しい DOM プロパティは既存のものを上書きします:

```js no-beautify
input.onclick = function() { alert(1); }
// ...
input.onclick = function() { alert(2); } // 前のハンドラを上書きします
```

<<<<<<< HEAD
Web標準の開発者はずっと前に理解しており、特別なメソッド `addEventListener` と `removeEventListener` を使うことで、ハンドラを管理する別の方法を提案しました。これらはこのような問題から解放されています。
=======
Developers of web standards understood that long ago and suggested an alternative way of managing handlers using the special methods `addEventListener` and `removeEventListener` which aren't bound by such constraint.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ハンドラを追加する構文は次のようになります:

```js
element.addEventListener(event, handler, [options]);
```

`event`
: イベント名, e.g. `"click"`.

`handler`
: ハンドラ関数.

<<<<<<< HEAD
`phase`
: オプションの引数で、ハンドラが動作する "フェーズ" です。後ほど説明します。通常は使いません。

ハンドラを削除する場合は `removeEventListener` を使います:

```js
// addEventListener とまったく同じ引数です
element.removeEventListener(event, handler[, phase]);
=======
`options`
: An additional optional object with properties:
    - `once`: if `true`, then the listener is automatically removed after it triggers.
    - `capture`: the phase where to handle the event, to be covered later in the chapter <info:bubbling-and-capturing>. For historical reasons, `options` can also be `false/true`, that's the same as `{capture: false/true}`.
    - `passive`: if `true`, then the handler will not call `preventDefault()`, we'll explain that later in <info:default-browser-action>.

To remove the handler, use `removeEventListener`:

```js
element.removeEventListener(event, handler, [options]);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

````warn header="削除は同じ関数が必要です"
ハンドラを削除するには、割り当てたものとまったく同じ関数を渡す必要があります。

<<<<<<< HEAD
これは動作しません:
=======
This doesn't work:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js no-beautify
elem.addEventListener( "click" , () => alert('Thanks!'));
// ....
elem.removeEventListener( "click", () => alert('Thanks!'));
```

<<<<<<< HEAD
ハンドラは削除されません、なぜなら `removeEventListener` は別の関数を取得するためです -- 同じコードだとしても関係ありません。
=======
The handler won't be removed, because `removeEventListener` gets another function -- with the same code, but that doesn't matter, as it's a different function object.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

こちらが正しい方法です:

```js
function handler() {
  alert( 'Thanks!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

注意してください -- もし関数を変数に保持しない場合、それを削除することはできません。`addEventListener` で割り当てられたハンドラを "読み戻す" 方法はありません。
````

<<<<<<< HEAD
`addEventListener` の複数回の呼び出しで、複数のハンドラを追加することが可能です。例:
=======
Multiple calls to `addEventListener` allow it to add multiple handlers, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run no-beautify
<input id="elem" type="button" value="Click me"/>

<script>
  function handler1() {
    alert('Thanks!');
  };

  function handler2() {
    alert('Thanks again!');
  }

*!*
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
*/!*
</script>
```

上の例で分かる通り、DOMプロパティと `addEventListener` 両方を使ってハンドラを設定することができます。しかし、一般的にどちらかの方法を使います。

<<<<<<< HEAD
````warn header="いくつかのイベントでは、ハンドラは `addEventListener`でのみ動作します"
DOMプロパティ経由では割り当てることができないイベントが存在します。`addEventListener` を使用しなければなりません。

例えば、`transitionend` (CSS アニメーションの終了) イベントなどです。

下のコードを試してみてください。ほとんどのブラウザでは２つ目のハンドラのみ動作し、１つ目は動作しません:
=======
````warn header="For some events, handlers only work with `addEventListener`"
There exist events that can't be assigned via a DOM-property. Only with `addEventListener`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

For instance, the `DOMContentLoaded` event, that triggers when the document is loaded and the DOM has been built.

<<<<<<< HEAD
<script>
  elem.ontransitionend = function() {
    alert("DOM property"); // 動作しません
  };

*!*
  elem.addEventListener("transitionend", function() {
    alert("addEventListener"); // アニメーションが終わったときに表示されます
  });
*/!*
</script>
=======
```js
// will never run
document.onDOMContentLoaded = function() {
  alert("DOM built");
};
```

```js
// this way it works
document.addEventListener("DOMContentLoaded", function() {
  alert("DOM built");
});
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
So `addEventListener` is more universal. Although, such events are an exception rather than the rule.
````

## イベントオブジェクト 

<<<<<<< HEAD
イベントを適切に処理するためには、私たちは何が起こったのかをもっと知りたいです。単に "click" や "keypress" だけではなく、ポインタの座標はなにか？どのキーが押されたのか？などです。
=======
To properly handle an event we'd want to know more about what's happened. Not just a "click" or a "keydown", but what were the pointer coordinates? Which key was pressed? And so on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

イベントが起こったとき、ブラウザは *イベントオブジェクト* を作り、そこに詳細を入れ、ハンドラの引数として渡します。

<<<<<<< HEAD
イベントオブジェクトからマウス座標を取得例です:
=======
Here's an example of getting pointer coordinates from the event object:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<input type="button" value="Click me" id="elem">

<script>
  elem.onclick = function(*!*event*/!*) {
    // イベントタイプ、要素、クリック座標を表示
    alert(event.type + " at " + event.currentTarget);
    alert("Coordinates: " + event.clientX + ":" + event.clientY);
  };
</script>
```

`event` オブジェクトのいくつかのプロパティです:

`event.type`
: イベントタイプ、ここでは `"click"` です.

`event.currentTarget`
<<<<<<< HEAD
: イベントを処理した要素です。これは、あなたが `this` を他の何かにバインドしない限り、`this` とまったく同じであり、`event.currentTarget` は役立ちます。

`event.clientX / event.clientY`
: マウスイベントに対するカーソルのウィンドウ相対座標です。

他にもプロパティがあります。それらはイベントのタイプによって異なりますので、詳細については別のイベントを扱う時にそれらを学びます。

````smart header="イベントオブジェクトもまた HTML からアクセス可能です"
もし HTML でハンドラを割り当てる場合、このようにし `event` オブジェクトを使うことも可能です。:
=======
: Element that handled the event. That's exactly the same as `this`, unless the handler is an arrow function, or its `this` is bound to something else, then we can get the element from  `event.currentTarget`.

`event.clientX` / `event.clientY`
: Window-relative coordinates of the cursor, for pointer events.

There are more properties. Many of them depend on the event type: keyboard events have one set of properties, pointer events - another one, we'll study them later when as we move on to the details of different events.

````smart header="The event object is also available in HTML handlers"
If we assign a handler in HTML, we can also use the `event` object, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=60
<input type="button" onclick="*!*alert(event.type)*/!*" value="Event type">
```

ブラウザが属性を読み込むとき、次のようにしてハンドラを生成するため、これも可能です:  `function(event) { alert(event.type) }`. つまり、最初の引数は `"event"` と呼ばれ、本体は属性から取られたものです。
````


## オブジェクトハンドラ: handleEvent 

<<<<<<< HEAD
`addEventListener` を使用したイベントハンドラとしてオブジェクトを割り当てることも可能です。イベントが発生するとき、その `handleEvent` メソッドが呼ばれます。
=======
We can assign not just a function, but an object as an event handler using `addEventListener`. When an event occurs, its `handleEvent` method is called.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば:


```html run
<button id="elem">Click me</button>

<script>
  let obj = {
    handleEvent(event) {
      alert(event.type + " at " + event.currentTarget);
    }
  };

  elem.addEventListener('click', obj);
</script>
```

<<<<<<< HEAD
言い換えると、`addEventListener` がハンドラとしてオブジェクトを受け取ると、イベント時に `object.handleEvent(event)` を呼び出します。

そのためのクラスを使うこともできます:
=======
As we can see, when `addEventListener` receives an object as the handler, it calls `obj.handleEvent(event)` in case of an event.

We could also use objects of a custom class, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "Mouse button pressed";
          break;
        case 'mouseup':
          elem.innerHTML += "...and released.";
          break;
      }
    }
  }

*!*
  let menu = new Menu();

  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
*/!*
</script>
```

ここでは両方のイベントを同じオブジェクトで処理しています。`addEventListener` を使用してリッスンするイベントを明示的に設定する必要があることに注意してください。`menu` オブジェクトはここでは `mousedown` と `mouseup` のみ取得し、その他のイベントタイプには反応しません。

メソッド `handleEvent` はそれ自身ですべてのジョブを行う必要はありません。次のように、変わりに他のイベント固有のメソッドを呼び出すことができます。

```html run
<button id="elem">Click me</button>

<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "Mouse button pressed";
    }

    onMouseup() {
      elem.innerHTML += "...and released.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

これでイベントハンドラは明確に分離されたので、サポートしやすいです。

## サマリ 

イベントハンドラを割り当てる３つの方法があります。:

1. HTML 属性: `onclick="..."`.
2. DOM プロパティ: `elem.onclick = function`.
3. メソッド: 追加は `elem.addEventListener(event, handler[, phase])`, 削除は `removeEventListener`.

HTML 属性は控えめに使われます。なぜなら HTML タグ中の JavaScript は少し変わっており異質に見えるためです。また、そこでは多くのコードを書くことができません。

DOM プロパティは使うのは問題ありませんが、特定のイベントに対して１つ以上のハンドラを割り当てることができません。多くの場合、その制限は切実ではありません。

<<<<<<< HEAD
最後の方法は最も柔軟ですが、記述が最も長くなります。これでしか動作しないイベントがいくつかあります, 例えば `transtionend` や `DOMContentLoaded` です。`addEventListener` はイベントハンドラとしてオブジェクトもサポートします。この場合、イベント時にはメソッド `handleEvent` が呼ばれます。
=======
The last way is the most flexible, but it is also the longest to write. There are few events that only work with it, for instance `transitionend` and `DOMContentLoaded` (to be covered). Also `addEventListener` supports objects as event handlers. In that case the method `handleEvent` is called in case of the event.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

どのようにハンドラを割り当てても -- 最初の引数としてイベントオブジェクトを取得します。オブジェクトには何が起きたかの詳細が含まれています。

次のチャプターでは、一般的なイベントとさまざまなタイプのイベントについて詳しく学んでいきます。