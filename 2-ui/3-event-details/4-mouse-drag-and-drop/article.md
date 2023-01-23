# マウスイベントでのドラッグ&ドロップ

<<<<<<< HEAD
ドラッグ&ドロップは素晴らしいインタフェースソリューションです。何かを掴み、ドラッグとドロップをすることは、コピーや移動(ファイルマネージャを参照)から注文(カートにドロップする)まで、多くのことをするための明白かつ簡単な方法です。

現在の HTML 標準では [ドラッグイベントに関するセクション](https://html.spec.whatwg.org/multipage/interaction.html#dnd) があります。

それらはシンプルなタスクを簡単に解決したり、"外部" ファイルのドラッグ＆ドロップをブラウザで扱うことができたりと、興味深いです。したがって、OSのファイルマネージャでファイルを取り、ブラウザウィンドウへドロップすることができます。その後、JavaScript はそのコンテンツへアクセスできます。

しかし、ネイティブのドラッグイベントにも制限があります。例えば、特定の領域でドラッグを制限することができます。また、ドラッグを "水平" または "垂直" のみにすることはできません。そのAPIでは実装できない他のドラッグ&ドロップのタスクがあります。

そのため、ここではマウスイベントを使用したドラッグ&ドロップの実装方法を見ていきます。それほど難しくはありません。
=======
Drag'n'Drop is a great interface solution. Taking something and dragging and dropping it is a clear and simple way to do many things, from copying and moving documents (as in file managers) to ordering (dropping items into a cart).

In the modern HTML standard there's a [section about Drag and Drop](https://html.spec.whatwg.org/multipage/interaction.html#dnd) with special events such as `dragstart`, `dragend`, and so on.

These events allow us to support special kinds of drag'n'drop, such as handling dragging a file from OS file-manager and dropping it into the browser window. Then JavaScript can access the contents of such files.

But native Drag Events also have limitations. For instance, we can't prevent dragging from a certain area. Also we can't make the dragging "horizontal" or "vertical" only. And there are many other drag'n'drop tasks that can't be done using them. Also, mobile device support for such events is very weak.

So here we'll see how to implement Drag'n'Drop using mouse events.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## ドラッグ&ドロップ アルゴリズム 

基本のドラッグ&ドロップのアルゴリズムはこのようになります:

<<<<<<< HEAD
1. ドラッグ可能な要素で `mousedown` をキャッチします。
2. 移動する要素を準備します (そのコピーを作成したりなど)
3. その後、`mousemove` で `left/top` と `position:absolute` を変更することで、それを移動させます。
4. `mouseup` (ボタンを離す) で、 -- 終了したドラッグ&ドロップに関連するすべてのアクションを実行します。

これらは基本です。私たちはそれを拡張することができます。例えば、ドロップ可能な要素上にマウスを持ってきたときに、それを強調表示するなどです。

ここでは、ボールのドラッグ&ドロップの場合のアルゴリズムです:

```js
ball.onmousedown = function(event) { // (1) 処理を開始

  // (2) 移動のための準備: absolute にし、z-index でトップにする
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // 現在の親から body へ直接移動させ、body に対して相対配置をする
  document.body.append(ball);  
  // ...そしてその絶対配置されたボールをカーソルの下に置く

  moveAt(event.pageX, event.pageY);
=======
1. On `mousedown` - prepare the element for moving, if needed (maybe create a clone of it, add a class to it or whatever).
2. Then on `mousemove` move it by changing `left/top` with `position:absolute`.
3. On `mouseup` - perform all actions related to finishing the drag'n'drop.

These are the basics. Later we'll see how to add other features, such as highlighting current underlying elements while we drag over them.

Here's the implementation of dragging a ball:

```js
ball.onmousedown = function(event) {
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  // ボールを（pageX、pageY）座標の中心に置く
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // (3) mousemove でボールを移動する
  document.addEventListener('mousemove', onMouseMove);

  // (4) ボールをドロップする。不要なハンドラを削除する
=======
  // (2) move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) drop the ball, remove unneeded handlers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};
```

<<<<<<< HEAD
コードを実行すると、何かおかしいことに気づきます。ドラッグ&ドロップの開始時に、ボールは "分岐" します: 我々はその "クローン" をドラッグし始めます。

=======
If we run the code, we can notice something strange. On the beginning of the drag'n'drop, the ball "forks": we start dragging its "clone".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```online
これは、アクションの例です:

[iframe src="ball" height=230]

<<<<<<< HEAD
マウスをドラッグ&ドロップし、奇妙な振る舞いをみてみてください。
```

ブラウザは、画像や自動的に実行する他の要素のための独自のドラッグ&ドロップを持っており、それが私たちのコードと競合するためです。
=======
Try to drag'n'drop with the mouse and you'll see such behavior.
```

That's because the browser has its own drag'n'drop support for images and some other elements. It runs automatically and conflicts with ours.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

それを無効にするためには:

```js
ball.ondragstart = function() {
  return false;
};
```

これで、すべて大丈夫です。

```online
アクション:

[iframe src="ball2" height=230]
```

もう１つの重要な側面 -- 私たちは `ball` ではなく、`document` の `mousemove` を追跡しています。一見すると、マウスは常にボールの上にあり、その上に `mousemove` を置くことができるように見えるかもしれません。

<<<<<<< HEAD
しかし、覚えているように、`mousemove` は頻繁にトリガしますがピクセル毎ではありません。そのため、すばやく移動した後、カーソルはボールからドキュメント(またはウィンドウの外側)上のどこかにジャンプする可能性があります。
=======
But as we remember, `mousemove` triggers often, but not for every pixel. So after swift move the pointer can jump from the ball somewhere in the middle of document (or even outside of the window).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

したがって、それをキャッチするために `document` でリッスンする必要があります。

## 正しいポジショニング 

<<<<<<< HEAD
上の例では、ボールは常にポインタの下で中央配置されています。:
=======
In the examples above the ball is always moved so that its center is under the pointer:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
```

<<<<<<< HEAD
悪くはありませんが副作用があります。ドラッグ&ドロップを開始するために、私たちはボール上どこでも `mousedown` できます。もしボールの端でそれをした場合、ボールは突然中央になるために "ジャンプ" します。
=======
Not bad, but there's a side effect. To initiate the drag'n'drop, we can `mousedown` anywhere on the ball. But if "take" it from its edge, then the ball suddenly "jumps" to become centered under the mouse pointer.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ポインタに対する要素の初期のずれを維持するようが良いでしょう。

<<<<<<< HEAD
例えば、ボールの端でドラッグを開始する場合、ドラッグ中のカーソルは端のままであるべきです。

![](ball_shift.svg)

1. 訪問者がボタン (`mousedown`) を押したとき -- 変数 `shiftX/shiftY` に、カーソルからボールの左上端の距離を覚えることができます。私たちはドラッグの間その距離を維持する必要があります。
=======
For instance, if we start dragging by the edge of the ball, then the pointer should remain over the edge while dragging.

![](ball_shift.svg)

Let's update our algorithm:

1. When a visitor presses the button (`mousedown`) - remember the distance from the pointer to the left-upper corner of the ball in variables `shiftX/shiftY`. We'll keep that distance while dragging.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    それらのシフト(ずれ)を取得するには、座標の減算をします:

    ```js
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
    ```

<<<<<<< HEAD
    JavaScript では、document に相対的な座標を取得するメソッドがないことに注意してください。そのため、ここではウィンドウに相対的な座標を使っています。

2. 次に、ドラッグの間はこのようにして、ポインタに相対的な同じシフトにボールを置きます。:
=======
2. Then while dragging we position the ball on the same shift relative to the pointer, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js
    // onmousemove
    // ball has position:absolute
    ball.style.left = event.pageX - *!*shiftX*/!* + 'px';
    ball.style.top = event.pageY - *!*shiftY*/!* + 'px';
    ```

より良いポジショニングとなる最終的なコードです:

```js
ball.onmousedown = function(event) {

*!*
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
*/!*

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

<<<<<<< HEAD
  // ボールを（pageX、pageY）座標の中心に置く
=======
  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - *!*shiftX*/!* + 'px';
    ball.style.top = pageY - *!*shiftY*/!* + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

<<<<<<< HEAD
  // (3) mousemove でボールを移動する
  document.addEventListener('mousemove', onMouseMove);

  // (4) ボールをドロップする。不要なハンドラを削除する
=======
  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };

};

ball.ondragstart = function() {
  return false;
};
```

```online
アクション (`<iframe>` の中):

[iframe src="ball3" height=230]
```

<<<<<<< HEAD
ボールの右下端でドラッグをする場合に、違いは特に顕著になります。以前の例ではボールはポイントの下に "ジャンプ" します。今は現在の位置からのなめらかにカーソルを追うことができます。

## ドロップ可能を検出する 

前の例では、ボールは "どこにでも" ドロップすることができました。実際には、通常1つの要素を取り、別の要素へそれをドロップします。例えば、ファイルをフォルダに、またはユーザをゴミ箱に、などです。

抽象的には、私たちは "ドラッグ可能な" 要素を取り、"ドロップ可能な" 要素上にドロップします。

ドラッグ&ドロップの最後には、ドロップ可能なターゲットを知る必要があります -- 対応するアクションを行ったり、できれば、ドラッグ処理中にそれを強調表示したりします。
=======
The difference is especially noticeable if we drag the ball by its right-bottom corner. In the previous example the ball "jumps" under the pointer. Now it fluently follows the pointer from the current position.

## Potential drop targets (droppables)

In previous examples the ball could be dropped just "anywhere" to stay. In real-life we usually take one element and drop it onto another. For instance, a "file" into a "folder" or something else.

Speaking abstract, we take a "draggable" element and drop it onto "droppable" element.

We need to know:
- where the element was dropped at the end of Drag'n'Drop -- to do the corresponding action,
- and, preferably, know the droppable we're dragging over, to highlight it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

そのソリューションは興味深くもあり難解でもあるため、ここで説明しましょう。

<<<<<<< HEAD
最初のアイデアは何でしょう？恐らく潜在的なドロップ可能要素に `onmouseover/mouseup` ハンドラを設定し、マウスポインタがその上に現れたときに検出するやり方です。そうすると、その要素上でドラッグ/ドロップしていることが分かります。
=======
What may be the first idea? Probably to set `mouseover/mouseup` handlers on potential droppables?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、これは動作しません。

問題は、私たちがドラッグしている間、ドラッグ可能な要素は常に他の要素の上にあることです。また、マウスイベントは最上位の要素でのみ発生し、下位の要素では発生しません。

<<<<<<< HEAD
例えば、以下は2つの `<div>` 要素があり、青の上に赤があります。この場合、赤は最上位であるため、青要素のイベントをキャッチする手段はありません。:
=======
For instance, below are two `<div>` elements, red one on top of the blue one (fully covers). There's no way to catch an event on the blue one, because the red is on top:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run autorun height=60
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('never works')"></div>
<div style="background:red" onmouseover="alert('over red!')"></div>
```

<<<<<<< HEAD
ドラッグ可能な要素も同じです。ボールは常に他の要素の上にあるため、そこでイベントが発生します。下位の要素でどんなハンドラを設定しても、それらは動作しません。
=======
The same with a draggable element. The ball is always on top over other elements, so events happen on it. Whatever handlers we set on lower elements, they won't work.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

そういう訳で、ドロップ可能要素にハンドラを置くと言う最初のアイデアは実践では上手くいきません。それらは実行されないでしょう。

では、何をすればよいでしょう？

<<<<<<< HEAD
`document.elementFromPoint(clientX, clientY)` と言うメソッドがあります。これは指定された ウィンドウ相対座標上の最もネストされた要素を返します(座標がウィンドウの外の場合は `null` です)。

なので、任意のマウスイベントハンドラで、ポインタの下のドロップ可能要素を検出することができます。次のようになります:

```js
// マウスイベントハンドラの中
ball.hidden = true; // (*)
=======
There's a method called `document.elementFromPoint(clientX, clientY)`. It returns the most nested element on given window-relative coordinates (or `null` if given coordinates are out of the window). If there are multiple overlapping elements on the same coordinates, then the topmost one is returned.

We can use it in any of our mouse event handlers to detect the potential droppable under the pointer, like this:

```js
// in a mouse event handler
ball.hidden = true; // (*) hide the element that we drag

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow is the element below the ball, may be droppable

ball.hidden = false;
<<<<<<< HEAD
// elemBelow はボールの下の要素です. もしそれがドロップ可能であれば処理します
```

注意:`(*)` 呼び出しの前に、ボールを隠す必要があります。そうしなければ、ポインタ下の最上位の要素として、通常その座標にはボールがあるためです: `elemBelow=ball`

私たちはこのコードを使って、いつでも "飛んでいる場所" を確認することができます。そして、それが起きるとドロップを処理します。
=======
```

Please note: we need to hide the ball before the call `(*)`. Otherwise we'll usually have a ball on these coordinates, as it's the top element under the pointer: `elemBelow=ball`. So we hide it and immediately show again.

We can use that code to check what element we're "flying over" at any time. And handle the drop when it happens.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

"ドロップ可能な" 要素を探すよう拡張された `onMouseMove` のコードです:

```js
<<<<<<< HEAD
let currentDroppable = null; // 今飛んでいるドロップ可能要素
=======
// potential droppable that we're flying over right now
let currentDroppable = null;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

<<<<<<< HEAD
  // mousemove イベントはウィンドウ外をトリガする可能性があります(ボールが画面外にドラッグされたとき)
  // clientX/clientY がウィンドウ外の場合、elementfromPoint は null を返します
=======
  // mousemove events may trigger out of the window (when the ball is dragged off-screen)
  // if clientX/clientY are out of the window, then elementFromPoint returns null
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  if (!elemBelow) return;

  // 潜在的なドロップ可能領域は "droppable" クラスでラベル付されています (他のロジックの場合もあります)
  let droppableBelow = elemBelow.closest('.droppable');

<<<<<<< HEAD
  if (currentDroppable != droppableBelow) { // 変更がある場合
    // 私たちは飛んでいます(入ったか出たか)...
    // 注意: 両方の値は null になりえます。
    //   currentDroppable=null ドロップ可能領域にいなかった場合 (e.g 空白スペース)
    //   droppableBelow=null このイベント中、今ドロップ可能領域にいない場合
=======
  if (currentDroppable != droppableBelow) {
    // we're flying in or out...
    // note: both values can be null
    //   currentDroppable=null if we were not over a droppable before this event (e.g over an empty space)
    //   droppableBelow=null if we're not over a droppable now, during this event
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    if (currentDroppable) {
      // ドロップ可能領域を "飛び出る" 処理のためのロジック (強調表示の除去)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // ドロップ可能領域に "入る" 処理のためのロジック
      enterDroppable(currentDroppable);
    }
  }
}
```

<<<<<<< HEAD
下の例では、ボールがサッカーゴールにドラッグされたとき、ゴールが強調表示されます。

[codetabs height=250 src="ball4"]

今、プロセス全体で、変数 `currentDroppable` の中に現在の "ドロップターゲット" があり、強調表示やその他のことをするのに使うことができます。
=======
In the example below when the ball is dragged over the soccer goal, the goal is highlighted.

[codetabs height=250 src="ball4"]

Now we have the current "drop target", that we're flying over, in the variable `currentDroppable` during the whole process and can use it to highlight or any other stuff.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## Summary

We considered a basic Drag'n'Drop algorithm.

The key components:

1. Events flow: `ball.mousedown` -> `document.mousemove` -> `ball.mouseup` (don't forget to cancel native `ondragstart`).
2. At the drag start -- remember the initial shift of the pointer relative to the element: `shiftX/shiftY` and keep it during the dragging.
3. Detect droppable elements under the pointer using `document.elementFromPoint`.

We can lay a lot on this foundation.

- On `mouseup` we can intellectually finalize the drop: change data, move elements around.
- We can highlight the elements we're flying over.
- We can limit dragging by a certain area or direction.
- We can use event delegation for `mousedown/up`. A large-area event handler that checks  `event.target` can manage Drag'n'Drop for hundreds of elements.
- And so on.

There are frameworks that build architecture over it: `DragZone`, `Droppable`, `Draggable` and other classes. Most of them do the similar stuff to what's described above, so it should be easy to understand them now. Or roll your own, as you can see that that's easy enough to do, sometimes easier than adapting a third-party solution.
