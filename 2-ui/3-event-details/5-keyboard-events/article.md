# キーボード: keydown と keyup

キーボードを学ぶ前に、現代のデバイスでは "何かを入力する" ために他の方法があることに留意してください。例えば、人々は音声認識(特にモバイルデバイスで)や、マウスによるコピーペーストを使います。
 
したがって、`<input>` フィールドへの任意の入力を追跡したい場合、キーボードイベントだけでは十分ではありません。`<input>` フィールドのどのような方法での変更も処理するために `input` と言う名前の別のイベントがあります。そしてこのようなタスクに対する良い選択である場合があります。それらに関しては、チャプター <info:events-change-input> で後ほど説明します。

<<<<<<< HEAD
キーボードイベントは、キーボードアクション(仮想キーボードも含む)を処理したいときに使われるべきです。例えば、矢印キー `key:Up` や `key:Down`、またはホットキー (キーの組み合わせを含む)に反応するために使います。
=======
So if we want to track any input into an `<input>` field, then keyboard events are not enough. There's another event named `input` to track changes of an `<input>` field, by any means. And it may be a better choice for such task. We'll cover it later in the chapter <info:events-change-input>.

Keyboard events should be used when we want to handle keyboard actions (virtual keyboard also counts). For instance, to react on arrow keys `key:Up` and `key:Down` or hotkeys (including combinations of keys).
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38


## テストスタンド 

```offline
キーボードイベントをより良く理解するために、[テストスタンド](sandbox:keyboard-dump)が使えます。
```

```online
キーボードイベントをよりよく理解するために、下のテストスタンドがあります。

テキストフィールドの中で、様々なキーの組み合わせを試してみてください。

[codetabs src="keyboard-dump" height=480]
```


## Keydown と keyup 

`keydown` イベントはキーが押された時に、そして `keyup` は -- それが離されたときに発生します。

### event.code と event.key

イベントオブジェクトの `key` プロパティは、イベントオブジェクトの `code` プロパティが "物理的なキーコード" を取得できる一方、文字を取得することができます。

例えば、同じキー `key:Z` が `Shift` あり / なし で押される場合があります。それは２つの異なる文字を返します: 小文字の `z` と大文字の `Z` です。

<<<<<<< HEAD
`event.key` はまさに文字であり、それは異なるでしょう。しかし、`event.code`  は同じです:
=======
For instance, the same key `key:Z` can be pressed with or without `key:Shift`. That gives us two different characters: lowercase `z` and uppercase `Z`.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38


| キー          | `event.key` | `event.code` |
|--------------|-------------|--------------|
| `key:Z`      |`z` (小文字)         |`KeyZ`        |
| `key:Shift+Z`|`Z` (大文字)          |`KeyZ`        |


ユーザが異なる言語で作業する場合、別の言語に切り替えると、`"Z"` の代わりに全く違う文字になります。これは `event.key` の文字になりますが、その一方で `event.code` は常に同じ `"KeyZ"` です。

```smart header="\"KeyZ\" とその他のキーコード"
すべてのキーは、キーボード上の位置に応じたコードを持っています。キーコードは[UI イベントコード仕様](https://www.w3.org/TR/uievents-code/)で記載されています。

例えば:
- 文字キーはコード `"Key<letter>"` です: `"KeyA"`, `"KeyB"` など。
- 数字キーはコード `"Digit<number>"` です:` "Digit0"`, `"Digit1"` など。
- 特別なキーは名前でコード化されています: `"Enter"`, `"Backspace"`, `"Tab"` など。 

いくつかの広く知られているキーボードレイアウトがあり、仕様はそれぞれに対してキーコードを提供します。

<<<<<<< HEAD
より多くのコードについては [alphanumeric section of the spec](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) を見てください、もしくは上の  [テストスタンド](#keyboard-test-stand) を試してみてください。
=======
Read the [alphanumeric section of the spec](https://www.w3.org/TR/uievents-code/#key-alphanumeric-section) for more codes, or just press a key in the [teststand](#keyboard-test-stand) above.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
```

```warn header="大文字小文字の問題: `\"KeyZ\"` です, `\"keyZ\"` ではありません"
明らかですが、それでも間違えることがあります。

ミスタイプを避けてください: `keyZ` ではなく `KeyZ` です。`event.code=="keyZ"` のようなチェックは機能しません: `"Key"` の最初の文字は大文字でなければなりません。
```

<<<<<<< HEAD
もし仮に、キーが文字を持たないとどうなるでしょう？例えば、`key:Shift` or `key:F1` などです。これらのキーの場合、`event.key` は `event.code` とほぼ同じです。:


| キー          | `event.key` | `event.code` |
=======
What if a key does not give any character? For instance, `key:Shift` or `key:F1` or others. For those keys, `event.key` is approximately the same as `event.code`:

| Key          | `event.key` | `event.code` |
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38
|--------------|-------------|--------------|
| `key:F1`      |`F1`          |`F1`        |
| `key:Backspace`      |`Backspace`          |`Backspace`        |
| `key:Shift`|`Shift`          |`ShiftRight` or `ShiftLeft`        |

`event.code` は正確にどのキーが押されたかを指定することに注意してください。例えば、ほとんどのキーボードは2つの `key:Shift` キーを持っています: 左側と右側です。`event.code` は厳密にどちらが押されたのかを示し、`event.key` はキーの "意味" に対して責任を持っています: それは何か("Shift")です。

<<<<<<< HEAD
私たちはホットキーを処理したいとしましょう: `key:Ctrl+Z` (Mac だと`key:Cmd+Z`)。多くのテキストエディタは "元に戻す" アクションをフックします。`keydown` にリスナーを設定して、どのキーが押されたか確認することができます -- ホットキーを検出するために。

問題に答えてください -- このようなリスナーにおいて、`event.key` または `event.code` どちらの値をチェックするべきでしょうか？

立ち止まって答えてみてください。

もう決めましたか？

あなたが理解しているのであれば、答えはもちろん `event.code` です。ここでは `event.key` は欲しくありません。`event.key` は言語、もしくは `CapsLock` の有効化に依存して変わる可能性があります。`event.code` は厳密にキーに紐付いているので、ここでは次のように書けます:
=======
Let's say, we want to handle a hotkey: `key:Ctrl+Z` (or `key:Cmd+Z` for Mac). Most text editors hook the "Undo" action on it. We can set a listener on `keydown` and check which key is pressed.

There's a dilemma here: in such a listener, should we check the value of `event.key` or `event.code`?

On one hand, the value of `event.key` is a character, it changes depending on the language. If the visitor has several languages in OS and switches between them, the same key gives different characters. So it makes sense to check `event.code`, it's always the same.

Like this:
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

```js run
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

<<<<<<< HEAD
## 自動繰り返し 

もしキーが長時間押されていると、繰り返しを始めます: `keydown` は何度もトリガされ、その後キーが離されたとき、最終的に `keyup` を得ます。そのため、多くの `keydown` と単一の `keyup` をもつのは普通なことです。

すべての繰り返しキーに対して、イベントオブジェクトは `event.repeat` プロパティが `true` に設定されています。
=======
On the other hand, there's a problem with `event.code`. For different keyboard layouts, the same key may have different characters.

For example, here are US layout ("QWERTY") and German layout ("QWERTZ") under it (from Wikipedia):

![](us-layout.svg)

![](german-layout.svg)

For the same key, US layout has "Z", while German layout has "Y" (letters are swapped).

Literally, `event.code` will equal `KeyZ` for people with German layout when they press `key:Y`.

If we check `event.code == 'KeyZ'` in our code, then for people with German layout such test will pass when they press `key:Y`.

That sounds really odd, but so it is. The [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system) explicitly mentions such behavior.

So, `event.code` may match a wrong character for unexpected layout. Same letters in different layouts may map to different physical keys, leading to different codes. Luckily, that happens only with several codes, e.g. `keyA`, `keyQ`, `keyZ` (as we've seen), and doesn't happen with special keys such as `Shift`. You can find the list in the [specification](https://www.w3.org/TR/uievents-code/#table-key-code-alphanumeric-writing-system).

To reliably track layout-dependent characters, `event.key` may be a better way.

On the other hand, `event.code` has the benefit of staying always the same, bound to the physical key location, even if the visitor changes languages. So hotkeys that rely on it work well even in case of a language switch.

Do we want to handle layout-dependant keys? Then `event.key` is the way to go.

Or we want a hotkey to work even after a language switch? Then `event.code` may be better.

## Auto-repeat

If a key is being pressed for a long enough time, it starts to "auto-repeat": the `keydown` triggers again and again, and then when it's released we finally get `keyup`. So it's kind of normal to have many `keydown` and a single `keyup`.

For events triggered by auto-repeat, the event object has `event.repeat` property set to `true`.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38


## デフォルトアクション 

キーボードによって開始され得ることはたくさんあるので、デフォルトアクションさまざまです。

例えば:

- 画面に文字が現れる(もっとも明白な結果)
- 文字が削除される(`key:Delete` キー)
- ページがスクロールされる(`key:PageDown` キー)
- ブラウザが "保存" ダイアログを開く (`key:Ctrl+S`)
- などなど

`keydown` のデフォルトアクションを防ぐことは、OSベースの特別なキーを除き、それらのほとんどを取り消すことが可能です。例えば、Windows の `key:Alt+F4` は現在のブラウザウィンドウを閉じます。そして、JavaScript でデフォルトアクションを防ぐことでそれを止める方法はありません。

別の例で、下記の `<input>` は電話番号を期待しているので、数値, `+`, `()` または `-` 以外は許可しません。:

```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-';
}
</script>
<input *!*onkeydown="return checkPhoneKey(event.key)"*/!* placeholder="Phone, please" type="tel">
```

<<<<<<< HEAD
`key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V` のような特別なキーはインプットでは動作しないことに注意してください。これは厳密なフィルタ `checkPhoneKey` の副作用です。
=======
Please note that special keys, such as `key:Backspace`, `key:Left`, `key:Right`, `key:Ctrl+V`, do not work in the input. That's a side-effect of the strict filter `checkPhoneKey`.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

少しだけ緩めましょう。:


```html autorun height=60 run
<script>
function checkPhoneKey(key) {
  return (key >= '0' && key <= '9') || key == '+' || key == '(' || key == ')' || key == '-' ||
    key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
}
</script>
<input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
```

今は矢印や削除も動作します。

...しかし、まだマウスや右クリック+貼り付けを使用してどのような値も入力することができます。なので、フィルタは 100% 信頼はできません。ただ、殆どの場合では動作するのでこのようにすることはできます。もしくは、代わりのアプローチは `input` イベントを追跡することです -- これはすべての変更のあとにトリガされます。そこでは新しい値をチェックし、それが無効であるときには強調/変更することができます。

## レガシー 

<<<<<<< HEAD
過去、`keypress` イベントや、`keyCode`, `charCode`, `which` と言ったイベントオブジェクトのプロパティがありました。

そこにはブラウザの非互換性が非常に多く、仕様の開発者はそれらのすべてを非推奨にすることに決めました。ブラウザがそれらをサポートし続けるので、古いコードはまだ動作しますが、それらをもう使用する必要は全くありません。

このチャプターに、それらの詳しい説明があった時期もありました。しかし、今のところ、私たちはそれらを忘れても問題ありません。
=======
There were so many browser incompatibilities while working with them, that developers of the specification had no way, other than deprecating all of them and creating new, modern events (described above in this chapter). The old code still works, as browsers keep supporting them, but there's totally no need to use those any more.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

## サマリ 

キーを押すと、キーに応じたキーボードイベントが常に生成されます。唯一の例外は、ノートパソコンのキーボードに表示される `key:Fn` キーです。 それはOSよりも低いレベルで実装されることが多いため、キーボードイベントはありません。

キーボードイベント:

- `keydown` -- キーを押したとき（長押しの場合は自動的に繰り返されます）
- `keyup` -- キーを離したとき

主なキーボードイベントのプロパティ:

<<<<<<< HEAD
- `code` -- "キーコード" (`"KeyA"`, `"ArrowLeft"` など)。キーボード上のキーの物理的な位置に固有です。
- `key` -- 文字 (`"A"`, `"a"` など)。非文字のキーの場合は通常 `code` と同じ値を持っています。

過去、キーボードイベントはフォームフィールドで、ユーザ入力を追跡するために使われていました。しかし、入力は様々な方法で行われる可能性があるため、それは信頼できません。任意の入力を処理するために `input` と `change` イベントがあります (これらについてはチャプター <info:events-change-input> で後ほど説明します)。これらは任意の入力後にトリガされ、マウスや音声認識なども含みます。
=======
- `code` -- the "key code" (`"KeyA"`, `"ArrowLeft"` and so on), specific to the physical location of the key on keyboard.
- `key` -- the character (`"A"`, `"a"` and so on), for non-character keys, such as `key:Esc`, usually has the same value  as `code`.

In the past, keyboard events were sometimes used to track user input in form fields. That's not reliable, because the input can come from various sources. We have `input` and `change` events to handle any input (covered later in the chapter <info:events-change-input>). They trigger after any kind of input, including copy-pasting or speech recognition.
>>>>>>> ff042a03191dfad1268219ae78758193a5803b38

本当にキーボードが必要なときにキーボードイベントを使うべきです。例えば、ホットキーや特別なキーに反応するため、などです。
