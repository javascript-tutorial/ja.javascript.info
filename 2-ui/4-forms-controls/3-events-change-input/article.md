# イベント: change, input, cut, copy, paste

<<<<<<< HEAD
データ更新に伴うさまざまなイベントについて説明しましょう。
=======
Let's cover various events that accompany data updates.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## イベント: change 

<<<<<<< HEAD
[change](http://www.w3.org/TR/html5/forms.html#event-input-change) イベントは要素の変更が終わったときにトリガされます。

テキストインプットの場合、それはフォーカスを失った時にイベントが発生することを意味します。
=======
The `change` event triggers when the element has finished changing.

For text inputs that means that the event occurs when it loses focus.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、以下のテキストフィールドでタイプしている間 -- イベントは起こりません。しかし、例えばボタンのクリックなど、他のなにかにフォーカスを移動させたとき、 -- `change` イベントが発生します:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

<<<<<<< HEAD
他の要素 `select`, `input type=checkbox/radio` の場合、選択が変わった直後にトリガされます。
=======
For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## イベント: input 

<<<<<<< HEAD
`input` イベント値が変更されるたびにトリガされます。
=======
The `input` event triggers every time after a value is modified by the user.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

`<input>` 上でのすべての変更を処理したい場合、このイベントがベストな選択になります。

<<<<<<< HEAD
キーボードイベントとは違い、キーボード操作を伴わないものであっても(マウスを使用してペーストするか、テキストを指示するために音声認識を使用する)、あらゆる値の変更にも対応します。
=======
On the other hand, `input` event doesn't trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys `key:⇦` `key:⇨` while in the input.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```smart header="`oninput` で何かを防ぐことはできません"
`input` イベントは値が変更された後に起こります。

そのため、ここでは `event.preventDefault()` は使えません。おそすぎるため、影響を与えません。
```

## イベント: cut, copy, paste 

これらのイベントは値の カット/コピー/ペースト 時に起こります。

<<<<<<< HEAD
これらは [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) クラスに属しており、コピー/ペーストされるデータへのアクセスを提供します。

`event.preventDefault（）`を使ってアクションを中止することもできます。

例えば、下のコードはこのようなすべてのイベントを防ぎ、我々が何をカット/コピー/ペーストしようとしているかを表示します。:
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.

We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.

For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

<<<<<<< HEAD
技術的には、なんでもコピー/ペーストすることが出来ます。例えば、OSのファイルマネージャでコピーや保管ができ、それを貼り付けることができます。

[仕様](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer)に、さまざまなデータ型で動作し、クリップボードへの読み書きを行うためのメソッドの一覧があります。

しかし、クリップボードは OS レベルの "グローバル" なものです。ほとんどのブラウザでは、安全のために特定のユーザ操作の範囲でのみクリップボードへの読み書きをすることができます。また、Firefoxを除いてすべてのブラウザで "カスタム" のクリップボードイベントを作成することは禁じられています。
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's a bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "syntetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

データ変更のイベント:

| イベント | 説明 | 補足 |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| 値が変更されたとき. | テキストインプットの場合はフォーカスが外れたときに発生します. |
| `input` | テキスト入力のすべての変更. | `change` とは違い即座に発生します. |
| `cut/copy/paste` | カット/コピー/ペースト操作. | 操作は防ぐ事が可能です。`event.clipbordData` プロパティでクリップボードへの読み書きのアクセスが可能です. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
