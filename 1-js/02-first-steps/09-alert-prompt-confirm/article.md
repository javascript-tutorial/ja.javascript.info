# 対話: alert, prompt, confirm

<<<<<<< HEAD
チュートリアルのこのパートは、環境依存なしでJavaScript "そのまま" を説明することを目的としています。

しかし、私たちはデモ環境としてブラウザを使っているので、最低限いくつかのユーザインタフェース機能について知っておく必要があります。このチャプターでは、ブラウザ機能である `alert`, `prompt` そして `confirm` について説明します。

[cut]
=======
In this part of the tutorial we cover JavaScript language "as is", without environment-specific tweaks.

But we'll still be using the browser as our demo environment, so we should know at least a few of its user-interface functions. In this chapter, we'll get familiar with the browser functions `alert`, `prompt` and `confirm`.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

## alert

構文:

```js
alert(message);
```

<<<<<<< HEAD
これはメッセージを表示し、ユーザが "OK" を押すまでスクリプトの実行を停止します。
=======
This shows a message and pauses script execution until the user presses "OK".
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例:

```js run
alert("Hello");
```

<<<<<<< HEAD
メッセージのある小さいウィンドウは *モーダルウィンドウ* と呼ばれます。"モーダル" という言葉は、そのウィンドウを処理するまで（今の場合であれば、OKボタンを押すまで）、訪問者はページの他の部分と対話したり、他のボタンを押すことができないことを意味します。

## prompt

`prompt` 機能は2つの引数を受け入れます:
=======
The mini-window with the message is called a *modal window*. The word "modal" means that the visitor can't interact with the rest of the page, press other buttons, etc. until they have dealt with the window. In this case -- until they press "OK".

## prompt

The function `prompt` accepts two arguments:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js no-beautify
result = prompt(title, [default]);
```

<<<<<<< HEAD
テキストメッセージ、訪問者のための入力フィールド、OK/CANCEL ボタンをもつ小窓を表示します。

`title`
: 訪問者へ表示するテキストです。
=======
It shows a modal window with a text message, an input field for the visitor, and the buttons OK/Cancel.

`title`
: The text to show the visitor.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

`default`
: 任意の2つ目のパラメータで、入力フィールドの初期値です。

<<<<<<< HEAD
訪問者はプロンプトの入力フィールドに何か入力し、OKを押すかもしれません。または CANCEL ボタンの押下、もしくは `key:Esc` キーにより入力をキャンセルすることができます。

`prompt` の呼び出しはフィールドのテキスト、もしくは入力がキャンセルされた場合には `null` が返却されます。
=======
The visitor may type something in the prompt input field and press OK. Or they can cancel the input by pressing Cancel or hitting the `key:Esc` key.

The call to `prompt` returns the text from the input field or `null` if the input was canceled.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

例:

```js run
let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!
```

<<<<<<< HEAD
````warn header="IE: 常に `デフォルト` を提供してください"
2つ目のパラメータは任意です。しかし、それを指定しない場合、Internet Explorer はプロンプトにテキスト `"undefined"` を挿入します。

確認する場合、Internet Explorer でこのコードを実行しましょう:
=======
````warn header="In IE: always supply a `default`"
The second parameter is optional, but if we don't supply it, Internet Explorer will insert the text `"undefined"` into the prompt.

Run this code in Internet Explorer to see:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let test = prompt("Test");
```

<<<<<<< HEAD
なので IEで良く見えるようにするには、常に2つ目の引数を指定することが推奨されます。:
=======
So, for prompts to look good in IE, we recommend always providing the second argument:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

```js run
let test = prompt("Test", ''); // <-- for IE
```
````

## confirm

構文:

```js
result = confirm(question);
```

<<<<<<< HEAD
`confirm` 関数は `question` と 2つのボタンをもつモーダルウィンドウを表示します。: OK と キャンセル
=======
The function `confirm` shows a modal window with a `question` and two buttons: OK and Cancel.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

OK が押された場合の結果は `true` で、それ以外は `false` です。

例:

```js run
let isBoss = confirm("Are you the boss?");

alert( isBoss ); // true OKが押された場合
```

## サマリ 

<<<<<<< HEAD
訪問者とやり取りをするための3つのブラウザ固有の関数を説明しました。
=======
We covered 3 browser-specific functions to interact with visitors:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

`alert`
: メッセージを表示します

`prompt`
<<<<<<< HEAD
: ユーザにテキスト入力を求めるメッセージを表示します。テキスト、もしくはCANCEL/ `key:Esc` がクリックされた場合はすべてのブラウザは `null` を返します。

`confirm`
: メッセージを表示し、ユーザが "OK" または "CANCEL" を押すのを待ちます。OKの場合は `true` を、CANCEL/`key:Esc` の場合は `false` を返します。

これらすべての関数はモーダルです: スクリプトの実行を中断し、メッセージが消えるまで訪問者がページの他の部分とやり取りするのを禁止します。
=======
: shows a message asking the user to input text. It returns the text or, if Cancel button or `key:Esc` is clicked, `null`.

`confirm`
: shows a message and waits for the user to press "OK" or "Cancel". It returns `true` for OK and `false` for Cancel/`key:Esc`.

All these methods are modal: they pause script execution and don't allow the visitor to interact with the rest of the page until the window has been dismissed.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

上のすべての関数で共有される2つの制限があります。:

<<<<<<< HEAD
1. モーダルウィンドウの正確な位置はブラウザによって決定されます。通常それは中央です。
2. ウィンドウの正確な見た目もまたブラウザに依存し、それを修正することはできません。
=======
1. The exact location of the modal window is determined by the browser. Usually, it's in the center.
2. The exact look of the window also depends on the browser. We can't modify it.
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

それは単純化に対する代償です。より良いウィンドウを表示し、訪問者とのよりリッチなインタラクションを実現する方法もありますが、"必要以上の装飾" が重要でない場合、これらの方法が使えます。
