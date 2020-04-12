libs:
  - d3
  - domtree

---

# Selection と Range

このチャプターではドキュメントでの選択と、`<input>` などのフォームフィールドでの選択について説明します。

JavaScript を利用して選択状態を取得したり、全体あるいは一部分の選択/選択解除、ドキュメントから選択した部分を削除、タグへのラップなどを行うことができます。

末尾の "サマリ" セクションでレシピが使用できます。が、チャプター全体を読むことでより多くのことを知ることができます。基礎となる `Range` と `Selection` オブジェクトは簡単に把握できるので、必要なことをするためのレシピは必要ありません。


## 範囲(Range)

選択の基本的な概念は [範囲(Range)](https://dom.spec.whatwg.org/#ranges) です。: 基本的には "境界点"(範囲の開始と終了) のペアです。

各点は、始点からの相対オフセットをもつ親DOMノードを表します。親ノードが要素ノードの場合、オフセットは子の番号であり、テキストノードの場合はテキスト内での位置です。以下、例を示します。

何かを選択しましょう。

まず、range　を作成します(コンストラクタにパラメータはありません):

```js
let range = new Range();
```

次に、`range.setStart(node, offset)` と `range.setEnd(node, offset)` を使用して選択の境界を設定します。

例として、この HTML の一部を考えます:

```html
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

DOM構造は次の通りです。ここではテキストノードが重要です。:

<div class="select-p-domtree"></div>

<script>
let selectPDomtree = {
  "name": "P",
  "nodeType": 1,
  "children": [{
    "name": "#text",
    "nodeType": 3,
    "content": "Example: "
  }, {
    "name": "I",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "italic"
    }]
  }, {
    "name": "#text",
    "nodeType": 3,
    "content": " and "
  }, {
    "name": "B",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "bold"
    }]
  }]
}

drawHtmlTree(selectPDomtree, 'div.select-p-domtree', 690, 320);
</script>

`"Example: <i>italic</i>"` を選択しましょう。これは `<p>` の先頭から2つの子です(テキストノードのカウント):

![](range-example-p-0-1.svg)

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

  // range の toString はそのコンテンツをテキストとして(タグなし)返します
  alert(range); // Example: italic

  // この range をドキュメント選択に適用します（後で説明します）
  document.getSelection().addRange(range);
</script>
```

- `range.setStart(p, 0)` -- `<p>` の 0番目の子を始点に設定します(テキストノード `"Example: "` です)。
- `range.setEnd(p, 2)` -- `<p>` の 2番目の子まで(2番目自体は含まない)広げます(２番目はテキストノード `" and "` ですが、それ自体は含まれないので、最後の選択されたノードは `<i>` です。

これはより柔軟な例で多くのパターンを試せます。:

```html run autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
  *!*
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);
  */!*

    // apply the selection, explained later
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

例. `1` から `4` を選択した場合の範囲は `<i>italic</i> and <b>bold</b>` です。

![](range-example-p-1-3.svg)

`setStart` と `setEnd` では同じノードを使用する必要はありません。範囲は多くの無関係のノードを跨ぐ場合もあります。重要なことは、終点は始点よりも前であるということだけです。

### テキストノードの部分選択

次のようにテキストを部分的に選択してみましょう:

![](range-example-p-2-b-3.svg)

もちろん可能です。テキストノード内の相対オフセットとして始点と終点を設定するだけです。

次のような範囲を作成します:
- `<p>` の最初の子の位置 2 から開始("Ex<b>ample:</b> " の最初の2文字を除くすべて)
- `<b>` の最初の子の位置 3 で終了("<b>bol</b>d" の最初の3文字):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  alert(range); // ample: italic and bol

  // 選択にこの範囲を使用します(後ほど説明します)
  window.getSelection().addRange(range);
</script>
```

range オブジェクトは次のプロパティを持ちます:

![](range-example-p-2-b-3-range.svg)

- `startContainer`, `startOffset` -- 開始点のノードとオフセット
  - 上の例では、`p` 内の最初のテキストノートと `2` です。
- `endContainer`, `endOffset` -- 終了点のノードとオフセット
  - 上の例では、`<b>` 内の最初のテキストノードと `3` です。
- `collapsed` -- 真偽値, range の開始/終了点が同じ(つまり range 内にコンテンツがない)場合は `true` です。
  - 上の例では `false`　です。
- `commonAncestorContainer` -- range 内のすべてのノードの最も近い共通の祖先
  - 上の例では `<p>` です。

## 範囲(range) メソッド

範囲を操作するための便利なメソッドがたくさんあります。

範囲の開始を設定:

- `setStart(node, offset)` は `node` 内の `offset` の位置に開始点を設定します。
- `setStartBefore(node)` は `node` の直前を開始点に設定します。
- `setStartAfter(node)` は `node` の直後を開始点に設定します。

範囲の終了を設定(同様のメソッドです):

- `setEnd(node, offset)` は `node` 内の `offset` の位置に終了点を設定します。
- `setEndBefore(node)`  `node` の直前を終了点に設定します。
- `setEndAfter(node)` は `node` の直後を終了点に設定します。

**デモでお見せした通り、`node` はテキストまたは要素ノードの両方になれます。テキストノードの場合、`offset` は複数の文字を読み飛ばす一方、要素ノードは複数の子ノードを読み飛ばします。**

その他:
- `selectNode(node)` は `node` 全体を選択するような範囲を設定します。
- `selectNodeContents(node)` は `node` のコンテンツ全体を選択するような範囲を設定します
- `collapse(toStart)` は、`toStart=true` の場合 end=start 、そうでなければ start=end を設定します。範囲を折りたたみます。
- `cloneRange()` は同じ開始/終了点をもつ新しい範囲を作成します。

範囲内のコンテンツを操作する方法:

- `deleteContents()` - ドキュメントから範囲のコンテンツを削除します
- `extractContents()` - ドキュメントから範囲のコンテンツを削除し、[DocumentFragment](info:modifying-document#document-fragment) として返却します。
- `cloneContents()` - 範囲のコンテンツをクローンし、[DocumentFragment](info:modifying-document#document-fragment) として返却します。
- `insertNode(node)` -- ドキュメントの範囲の先頭に `node` を挿入します。
- `surroundContents(node)` -- `node` で範囲コンテンツをラップします。これが機能するには、範囲内にすべての要素の開始と終了タグが含まれている必要があります。`<i>abc` のような部分的な範囲では機能しません。

これらのメソッドを使用すると、選択したノードに対し基本的に何でもできます。

これは実際の動作が確認できる例です。:

```html run autorun height=260
ボタンクリックで選択範囲に対しメソッドを実行し、"resetExample" でリセットします。

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Each demonstrated method is represented here:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { alert(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();  
      window.getSelection().addRange(range);  
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>
```

範囲を比較するメソッドも存在しますが、めったに使われることはありません。必要になったら、[仕様](https://dom.spec.whatwg.org/#interface-range) や [MDN マニュアル](https://developer.mozilla.org/en-US/docs/Web/API/Range)を参照してください。


## 選択(Selection)

`Range` は選択範囲を管理するための汎用オブジェクトです。このようなオブジェクトを作成し利用しますが-- それらは自身では視覚的には何も選択しません。

ドキュメントの選択は `Selection` オブジェクトで表現され、`window.getSelection()` あるいは `document.getSelection()` で取得することができます。

選択は 0 個以上の範囲を含めることができます。すくなくとも [Selection API 仕様](https://www.w3.org/TR/selection-api/) ではそのように述べています。ですが、実際には Firefox のみが `key:Ctrl+click` (Mac の場合は `key:Cmd+click`)を使用してドキュメント内の複数の範囲を選択することができます。

これは Firefox で 3つの範囲を選択しているスクリーンショットです。:

![](selection-firefox.svg)

他のブラウザは最大1つの範囲だけサポートしています。後で見ていきますが、`Selection` メソッドによっては複数の範囲が存在する可能性があることを示唆しているものもあります。が、繰り返しになりますが Firefox 以外のブラウザは最大で 1 です。

## Selection プロパティ

range と同様、選択には始点と終点があり、それぞれ "anchor(アンカー))"、"focus(フォーカス))" と呼ばれます。

主な selection プロパティは次のものです:

- `anchorNode` -- selection の始点のある node です。
- `anchorOffset` -- selection の始点の `anchorNode` でのオフセットです。
- `focusNode` -- selection の終点のある node です。
- `focusOffset` -- selection の終点の `focusNode` でのオフセットです。
- `isCollapsed` -- selection が未選択(空の範囲) あるいは存在しない場合 `true` になります。
- `rangeCount` -- selection に含まれる range の数です。

````smart header="ドキュメント内で Selection の終点が始点の前にくることがあります"
ユーザエージェントによって、コンテンツを選択する多くの方法があります: マウス、ホットキー、モバイルでのタップなど。

マウスなど、そのうちのいくつかは同じ選択を "左から右" と "右から左" の2方向で作成できます。

もしドキュメント内の選択の始点（anchor）が終点(focus)の前にある場合、この選択は "正" 方向と呼ばれます。

E.g. ユーザがマウスで選択を開始し、"Example" から "italic" まで操作した場合:

![](selection-direction-forward.svg)

そうでない場合、もし "italic" の終わりから "Example" に進む場合、選択は "後方" に向けられ、その focus は anchor の前になります。:

![](selection-direction-backward.svg)

これは常に正方向を向く `Range` オブジェクトとは異なります。range の始点を終点の後に置くことはできません。
````

## Selection イベント

選択範囲を追跡するためのイベントがあります:

- `elem.onselectstart` -- `elem` で選択が開始されたとき。e.g. ユーザがボタンを押しながらマウスを動かし始めたとき。
    - デフォルトアクションを防いだ場合、選択は開始されません。
- `document.onselectionchange` -- 選択範囲が変更されたとき。
    - 注意: おのハンドラは `document` に対してのみ設定可能です。

### 選択範囲の追跡デモ

これは選択境界の変更に応じて動的に選択境界を表示する小さなデモです:

```html run height=80
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

From <input id="from" disabled> – To <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let {anchorNode, anchorOffset, focusNode, focusOffset} = document.getSelection();

    from.value = `${anchorNode && anchorNode.data}:${anchorOffset}`;
    to.value = `${focusNode && focusNode.data}:${focusOffset}`;
  };
</script>
```

### 選択範囲の取得デモ

選択範囲全体を取得するには:
- テキストとして: `document.getSelection().toString()` を呼ぶだけです。
- DOM ノードとして: 基底となる範囲を取得し、それらの `cloneContents()` を呼び出します(Firefox のマルチ選択をサポートしてない場合は最初の1つの range に対してのみ)。

そして、これはテキストとDOM ノード両方で選択範囲を取得するデモです:

```html run height=100
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

Cloned: <span id="cloned"></span>
<br>
As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // range から DOM ノードをクローンします(ここでは multiselect をサポートしています)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // テキストとして取得
    astext.innerHTML += selection;
  };
</script>
```

## Selection メソッド

range の追加/削除をするための Selection メソッド:

- `getRangeAt(i)` -- `0` から始まる i 番目の range を取得します。firefox 以外のブラウザは `0` だけが使用されます。
- `addRange(range)` -- 選択範囲に `range` を追加します。すでに range が関連付けられている場合、firefox 以外のブラウザは呼び出しを無視します。
- `removeRange(range)` -- selection から `range` を削除します。
- `removeAllRanges()` -- すべての range を削除します。
- `empty()` -- `removeAllRanges` のエイリアスです。

また、`Range` なしで選択範囲をを直接操作するための便利なメソッドがあります:

- `collapse(node, offset)` -- 選択された range を、指定された `node` の位置 `offset` で開始及び終了する新しい range に置き換えます。
- `setPosition(node, offset)` -- `collapse` のエイリアスです。
- `collapseToStart()` - 選択範囲の始点に折りたたみます(空の range に置き換えます)
- `collapseToEnd()` - 選択範囲の終点に折りたたみます
- `extend(node, offset)` - 選択範囲の focus を指定された `node` の位置 `offset` に移動します。 
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - 選択範囲の range を、指定された始点 `anchorNode/anchorOffset` と終点 `focusNode/focusOffset` に置き換えます。これらの間にあるすべてのコンテンツが選択されます。
- `selectAllChildren(node)` -- `node` のすべての子を選択します。
- `deleteFromDocument()` -- ドキュメントから選択されたコンテンツを削除します。
- `containsNode(node, allowPartialContainment = false)` -- 選択範囲が `node` を含むかチェックします(2番めの引数が `true` の場合は部分的に含む、を許可する)。

したがって、多くのタスクで `Selection` メソッドを呼び出すことができ、基礎となる `Range` オブジェクトにアクセスする必要はありません。 

例えば、段落 `<p>` のコンテンツ全体を選択するには次のようにします:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // <p> の 0 番目の子から最後の子までを選択
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```

The same thing using ranges:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // or selectNode(p) で <p> タグも選択します

  document.getSelection().removeAllRanges(); // 存在する選択範囲をクリアします
  document.getSelection().addRange(range);
</script>
```

```smart header="選択するには、最初に既存の選択範囲を削除してください"
選択範囲がすでに存在する場合、`removeAllRanges()` で最初に空にし、その後 range を追加してください。そうでない場合、Firefox 以外のブラウザは新しい range を無視します。

`setBaseAndExtent` などのいくつかの selection メソッドは例外で、既存の選択範囲を置き換えます。
```

## Selection in form controls

Form elements, such as `input` and `textarea` provide [special API for selection](https://html.spec.whatwg.org/#textFieldSelection), without `Selection` or `Range` objects. As an input value is a pure text, not HTML, there's no need for such objects, everything's much simpler.

Properties:
- `input.selectionStart` -- position of selection start (writeable),
- `input.selectionEnd` -- position of selection end (writeable),
- `input.selectionDirection` -- selection direction, one of: "forward", "backward" or "none" (if e.g. selected with a double mouse click),

Events:
- `input.onselect` -- triggers when something is selected.

Methods:

- `input.select()` -- selects everything in the text control (can be `textarea` instead of `input`),
- `input.setSelectionRange(start, end, [direction])` -- change the selection to span from position `start` till `end`, in the given direction (optional).
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- replace a range of text with the new text.

    Optional arguments `start` and `end`, if provided, set the range start and end, otherwise user selection is used.

    The last argument, `selectionMode`, determines how the selection will be set after the text has been replaced. The possible values are:

    - `"select"` -- the newly inserted text will be selected.
    - `"start"` -- the selection range collapses just before the inserted text (the cursor will be immediately before it).
    - `"end"` -- the selection range collapses just after the inserted text (the cursor will be right after it).
    - `"preserve"` -- attempts to preserve the selection. This is the default.

Now let's see these methods in action.

### Example: tracking selection

For example, this code uses `onselect` event to track selection:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Selecting in this text updates values below.
</textarea>
<br>
From <input id="from" disabled> – To <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Please note:
- `onselect` triggers when something is selected, but not when the selection is removed.
- `document.onselectionchange` event should not trigger for selections inside a form control, according to the [spec](https://w3c.github.io/selection-api/#dfn-selectionchange), as it's not related to `document` selection and ranges. Some browsers generate it, but we shouldn't rely on it.


### Example: moving cursor

We can change `selectionStart` and `selectionEnd`, that sets the selection.

An important edge case is when `selectionStart` and `selectionEnd` equal each other. Then it's exactly the cursor position. Or, to rephrase, when nothing is selected, the selection is collapsed at the cursor position.

So, by setting `selectionStart` and `selectionEnd` to the same value, we move the cursor.

For example:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Focus on me, the cursor will be at position 10.
</textarea>

<script>
  area.onfocus = () => {
    // zero delay setTimeout to run after browser "focus" action finishes
    setTimeout(() => {
      // we can set any selection
      // if start=end, the cursor it exactly at that place
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Example: modifying selection

To modify the content of the selection, we can use `input.setRangeText()` method. Of course, we can read `selectionStart/End` and, with the knowledge of the selection, change the corresponding substring of `value`, but `setRangeText` is more powerful and often more convenient.

That's a somewhat complex method. In its simplest one-argument form it replaces the user selected range and removes the selection.

For example, here the user selection will be wrapped by `*...*`:

```html run autorun
<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Wrap selection in stars *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // nothing is selected
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

With more arguments, we can set range `start` and `end`.

In this example we find `"THIS"` in the input text, replace it and keep the replacement selected:

```html run autorun
<input id="input" style="width:200px" value="Replace THIS in text">
<button id="button">Replace THIS</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("THIS");
  if (pos >= 0) {
    input.setRangeText("*THIS*", pos, pos + 4, "select");
    input.focus(); // focus to make selection visible
  }
};
</script>
```

### Example: insert at cursor

If nothing is selected, or we use equal `start` and `end` in `setRangeText`, then the new text is just inserted, nothing is removed.

We can also insert something "at the cursor" using `setRangeText`.

Here's a button that inserts `"HELLO"` at the cursor position and puts the cursor immediately after it. If the selection is not empty, then it gets replaced (we can detect it by comparing `selectionStart!=selectionEnd` and do something else instead):

```html run autorun
<input id="input" style="width:200px" value="Text Text Text Text Text">
<button id="button">Insert "HELLO" at cursor</button>

<script>
  button.onclick = () => {
    input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };    
</script>
```


## Making unselectable

To make something unselectable, there are three ways:

1. Use CSS property `user-select: none`.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>
    ```

    This doesn't allow the selection to start at `elem`. But the user may start the selection elsewhere and include `elem` into it.

    Then `elem` will become a part of `document.getSelection()`, so the selection actually happens, but its content is usually ignored in copy-paste.


2. Prevent default action in `onselectstart` or `mousedown` events.

    ```html run
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

    This prevents starting the selection on `elem`, but the visitor may start it at another element, then extend to `elem`.

    That's convenient when there's another event handler on the same action that triggers the select (e.g. `mousedown`). So we disable the selection to avoid conflict, still allowing `elem` contents to be copied.

3. We can also clear the selection post-factum after it happens with `document.getSelection().empty()`. That's rarely used, as this causes unwanted blinking as the selection appears-disappears.

## References

- [DOM spec: Range](https://dom.spec.whatwg.org/#ranges)
- [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [HTML spec: APIs for the text control selections](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)


## Summary

We covered two different APIs for selections:

1. For document: `Selection` and `Range` objects.
2. For `input`, `textarea`: additional methods and properties.

The second API is very simple, as it works with text.

The most used recipes are probably:

1. Getting the selection:
    ```js run
    let selection = document.getSelection();

    let cloned = /* element to clone the selected nodes to */;

    // then apply Range methods to selection.getRangeAt(0)
    // or, like here, to all ranges to support multi-select
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Setting the selection:
    ```js run
    let selection = document.getSelection();

    // directly:
    selection.setBaseAndExtent(...from...to...);

    // or we can create a range and:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

And finally, about the cursor. The cursor position in editable elements, like `<textarea>` is always at the start or the end of the selection. We can use it  to get cursor position or to move the cursor by setting `elem.selectionStart` and `elem.selectionEnd`.
