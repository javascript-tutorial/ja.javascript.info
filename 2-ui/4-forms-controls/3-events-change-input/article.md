# イベント: change, input, cut, copy, paste

データ更新に伴うさまざまなイベントについて説明しましょう。

## イベント: change 

[change](http://www.w3.org/TR/html5/forms.html#event-input-change) イベントは要素の変更が終わったときにトリガされます。

<<<<<<< HEAD
テキストインプットの場合、それはフォーカスを失った時にイベントが発生することを意味します。
=======
For text inputs that means that the event occurs when it loses focus.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

例えば、以下のテキストフィールドでタイプしている間 -- イベントは起こりません。しかし、例えばボタンのクリックなど、他のなにかにフォーカスを移動させたとき、 -- `change` イベントが発生します:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

他の要素 `select`, `input type=checkbox/radio` の場合、選択が変わった直後にトリガされます。

## イベント: input 

`input` イベント値が変更されるたびにトリガされます。

<<<<<<< HEAD
例:
=======
Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.

For instance:
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

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
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

```smart header="`oninput` で何かを防ぐことはできません"
`input` イベントは値が変更された後に起こります。

そのため、ここでは `event.preventDefault()` は使えません。おそすぎるため、影響を与えません。
```

## イベント: cut, copy, paste 

これらのイベントは値の カット/コピー/ペースト 時に起こります。

これらは [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) クラスに属しており、コピー/ペーストされるデータへのアクセスを提供します。

`event.preventDefault（）`を使ってアクションを中止することもできます。

例えば、下のコードはこのようなすべてのイベントを防ぎ、我々が何をカット/コピー/ペーストしようとしているかを表示します。:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

<<<<<<< HEAD
技術的には、なんでもコピー/ペーストすることが出来ます。例えば、OSのファイルマネージャでコピーや保管ができ、それを貼り付けることができます。
=======
Technically, we can copy/paste everything. For instance, we can copy a file in the OS file manager, and paste it.
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd

[仕様](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer)に、さまざまなデータ型で動作し、クリップボードへの読み書きを行うためのメソッドの一覧があります。

しかし、クリップボードは OS レベルの "グローバル" なものです。ほとんどのブラウザでは、安全のために特定のユーザ操作の範囲でのみクリップボードへの読み書きをすることができます。また、Firefoxを除いてすべてのブラウザで "カスタム" のクリップボードイベントを作成することは禁じられています。

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
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives read/write access to the clipboard. |
>>>>>>> 6bbe0b4313a7845303be835d632ef8e5bc7715cd
