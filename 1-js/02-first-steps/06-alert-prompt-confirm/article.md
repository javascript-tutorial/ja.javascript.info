<<<<<<< HEAD
# インタラクション: alert, prompt, confirm

デモ環境としてブラウザを使っているので、ユーザと対話するためのいくつかの関数を見ておきましょう: `alert`, `prompt` そして `confirm` です

## alert

既にご覧になったと思いますが、メッセージを表示し、ユーザが "OK" をクリックするのを待ちます。

例:
=======
# Interaction: alert, prompt, confirm

As we'll be using the browser as our demo environment, let's see a couple of functions to interact with the user: `alert`, `prompt` and `confirm`.

## alert

This one we've seen already. It shows a message and waits for the user to press "OK".

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
alert("Hello");
```

<<<<<<< HEAD
メッセージのある小さいウィンドウは *モーダルウィンドウ* と呼ばれます。"モーダル" という言葉は、そのウィンドウを処理するまで（今の場合であれば、OKボタンを押すまで）、訪問者はページの他の部分と対話したり、他のボタンを押すことができないことを意味します。

## prompt

`prompt` 機能は2つの引数を受け入れます:

```js no-beautify
result = prompt(title[, default]);
```

テキストメッセージ、訪問者のための入力フィールド、OK/CANCEL ボタンをもつ小窓を表示します。

`title`
: 訪問者へ表示するテキストです。

`default`
: 任意の2つ目のパラメータで、入力フィールドの初期値です。

```smart header="構文 `[...]` の角括弧"
構文中にある `default` を囲む角括弧は、パラメータがオプションであり必須ではないことを指します。
```

訪問者はプロンプトの入力フィールドに何か入力し、OKを押すかもしれません。または CANCEL ボタンの押下、もしくは `key:Esc` キーにより入力をキャンセルすることができます。

`prompt` の呼び出しはフィールドのテキスト、もしくは入力がキャンセルされた場合には `null` が返却されます。

例:
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc, until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:

```js no-beautify
result = prompt(title, [default]);
```

It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.

`default`
: An optional second parameter, the initial value for the input field.

```smart header="The square brackets in syntax `[...]`"
The square brackets around `default` in the syntax above denote that the parameter is optional, not required.
```

The visitor can type something in the prompt input field and press OK. Then we get that text in the `result`. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key, then we get `null` as the `result`.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

<<<<<<< HEAD
````warn header="IE: 常に `デフォルト` を設定してください"
2つ目のパラメータは任意です。しかし、それを指定しない場合、Internet Explorer はプロンプトにテキスト `"undefined"` を挿入します。

確認する場合、Internet Explorer でこのコードを実行しましょう:
=======
````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
なので IEで良く見えるようにするには、常に2つ目の引数を指定することが推奨されます。:
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

<<<<<<< HEAD
構文:
=======
The syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
result = confirm(question);
```

<<<<<<< HEAD
`confirm` 関数は `question` と 2つのボタンをもつモーダルウィンドウを表示します。: OK と キャンセル

OK が押された場合の結果は `true` で、それ以外は `false` です。

例:
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.

The result is `true` if OK is pressed and `false` otherwise.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let isBoss = confirm("Are you the boss?");

<<<<<<< HEAD
alert( isBoss ); // true OKが押された場合
```

## サマリ 

訪問者とやり取りをするための3つのブラウザ固有の関数を説明しました。

`alert`
: メッセージを表示します

`prompt`
: ユーザにテキスト入力を求めるメッセージを表示します。テキスト、もしくはCANCEL/ `key:Esc` がクリックされた場合はすべてのブラウザは `null` を返します。

`confirm`
: メッセージを表示し、ユーザが "OK" または "CANCEL" を押すのを待ちます。OKの場合は `true` を、CANCEL/`key:Esc` の場合は `false` を返します。

これらすべての関数はモーダルです: スクリプトの実行を中断し、メッセージが消えるまで訪問者がページの他の部分とやり取りするのを禁止します。

上のすべての関数で共有される2つの制限があります。:

1. モーダルウィンドウの正確な位置はブラウザによって決定されます。通常それは中央です。
2. ウィンドウの正確な見た目もまたブラウザに依存し、それを修正することはできません。

それは単純化に対する代償です。より良いウィンドウを表示し、訪問者とのよりリッチなインタラクションを実現する方法もありますが、"必要以上の装飾" が重要でない場合、これらの方法が使えます。
=======
alert( isBoss ); // true if OK is pressed
```

## Summary

We covered 3 browser-specific functions to interact with visitors:

`alert`
: shows a message.

`prompt`
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.

There are two limitations shared by all the methods above:

1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.

That is the price for simplicity. There are other ways to show nicer windows and richer interaction with the visitor, but if "bells and whistles" do not matter much, these methods work just fine.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
