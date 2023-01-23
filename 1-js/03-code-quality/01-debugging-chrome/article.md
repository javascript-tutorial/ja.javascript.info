<<<<<<< HEAD
# Chrome でのデバッグ
=======
# Debugging in the browser
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

より複雑なコードを書く前に、デバッグについて話しましょう。

<<<<<<< HEAD
[デバッギング](https://en.wikipedia.org/wiki/Debugging)はスクリプト内のエラーを見つけ、修正するプロセスです。すべてのモダンブラウザと他の環境のほとんどはデバッギングツール（デバッグを簡単に行えるようにする開発者ツールのUI）をサポートしています。また、コードをステップ毎に追跡して正確に起きていることを確認することもできます。

ここでは、恐らくこの観点では最も機能が充実している Chrome を使います。

## "sources" パネル 

Chromeのバージョンによっては少し違って見えるかもしれませんが、何があるかは明白でしょう。
=======
[Debugging](https://en.wikipedia.org/wiki/Debugging) is the process of finding and fixing errors within a script. All modern browsers and most other environments support debugging tools -- a special UI in developer tools that makes debugging much easier. It also allows to trace the code step by step to see what exactly is going on.

We'll be using Chrome here, because it has enough features, most other browsers have a similar process.

## The "Sources" panel
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- Chromeの [example page](debugging/index.html) を開きます。
- `key:F12` (Mac: `key:Cmd+Opt+I`) で開発者ツールをONにします。
- `source` パネルを選択します。

<<<<<<< HEAD
この画面を見るのが初めてであれば、見ておくべきものがあります:
=======
- Open the [example page](debugging/index.html) in Chrome.
- Turn on developer tools with `key:F12` (Mac: `key:Cmd+Opt+I`).
- Select the `Sources` panel.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

![](chrome-open-sources.svg)

<<<<<<< HEAD
トグルボタン <span class="devtools" style="background-position:-168px -76px"></span> はファイルを表示するタブを開きます。

それをクリックして、`index.html` 、次にツリービューの `hello.js` を選択しましょう。ここで表示される内容は次の通りです:

![](chrome-tabs.svg)

ここでは3つの領域が確認できます:

1. **ファイルナビゲータ** ペインには、HTML、JavaScript、CSSや、ページに紐付いているイメージなどを含むファイルがリストされます。Chromeの拡張機能もここに表示されることがあります。
2. **コードエディタ** ペインは、ソースコードを表示します。
3. **JavaScript デバッギング** ペインはデバッグのためのもので、この後見ていきます。

同じトグル <span class="devtools" style="background-position:-200px -76px"></span> を再びクリックすること、リソースの一覧やコードを隠すことができます。

## コンソール 
=======
![](chrome-open-sources.svg)

The toggler button <span class="devtools" style="background-position:-172px -98px"></span> opens the tab with files.

Let's click it and select `hello.js` in the tree view. Here's what should show up:

![](chrome-tabs.svg)

The Sources panel has 3 parts:

1. The **File Navigator** pane lists HTML, JavaScript, CSS and other files, including images that are attached to the page. Chrome extensions may appear here too.
2. The **Code Editor** pane shows the source code.
3. The **JavaScript Debugging** pane is for debugging, we'll explore it soon.

Now you could click the same toggler <span class="devtools" style="background-position:-172px -122px"></span> again to hide the resources list and give the code some space.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`Esc` を押すとコンソールが下に表示されます。そこでコマンドを入力し、`key:Enter` を押すとコマンドを実行することができます。

<<<<<<< HEAD
実行結果は下に表示されます。
=======
If we press `key:Esc`, then a console opens below. We can type commands there and press `key:Enter` to execute.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、ここでは `1+2 ` は `3` になり、`hello("debugger")` は何も返さないので、結果は `undefined` です:

<<<<<<< HEAD
![](chrome-sources-console.svg)

## ブレイクポイント 
=======
For example, here `1+2` results in `3`, while the function call `hello("debugger")` returns nothing, so the result is `undefined`:

![](chrome-sources-console.svg)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

[example page](debugging/index.html) のコードの中で何が起こっているのか見てみましょう。`hello.js` で、行番号 `4` をクリックします。コードではなく、左側にある数字の `"4"` です。

<<<<<<< HEAD
これでブレイクポイントがセットできました。行 `8` の数字もクリックしましょう。
=======
Let's examine what's going on within the code of the [example page](debugging/index.html). In `hello.js`, click at line number `4`. Yes, right on the `4` digit, not on the code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このようになるはずです(青はあなたがクリックした場所です):

![](chrome-sources-breakpoint.svg)

<<<<<<< HEAD
*ブレイクポイント* はデバッガが自動でJavaScriptの実行を停止するコードのポイントです。
=======
![](chrome-sources-breakpoint.svg)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

コードが停止している間、現在の変数を検査したり、コンソールでコマンドを実行することができます。つまり、そこでデバッグができます。

右のペインでは、常にブレイクポイントの一覧を見ることができます。色々なファイルで多くのブレイクポイントを設定しているときに役に立ちます。それらは次のようなことができます:
- コード中のブレイクポイントに素早く移動する(右ペインで移動したいブレイクポイントをクリック)
- チェックを外すことで、一時的にブレイクポイントを無効にする
- 右クリックから削除を選択することで、ブレイクポイントを削除する
- ...など

<<<<<<< HEAD
```smart header="条件付きのブレイクポイント"
行番号の *右クリック* で *条件付きの* ブレイクポイントを作ることができます。与えられた式が真の場合にのみトリガします。

これは変数の特定の値や、特定の関数パラメータに対してのみ停止する必要がある場合に便利です。
```

## デバッガコマンド 

次のように、`debugger` コマンドを使うことでもコードを停止することができます:
=======
We can always find a list of breakpoints in the right panel. That's useful when we have many breakpoints in various files. It allows us to:
- Quickly jump to the breakpoint in the code (by clicking on it in the right panel).
- Temporarily disable the breakpoint by unchecking it.
- Remove the breakpoint by right-clicking and selecting Remove.
- ...And so on.

```smart header="Conditional breakpoints"
*Right click* on the line number allows to create a *conditional* breakpoint. It only triggers when the given expression, that you should provide when you create it, is truthy.

That's handy when we need to stop only for a certain variable value or for certain function parameters.
```

## The command "debugger"

We can also pause the code by using the `debugger` command in it, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- デバッガはここで止まります
*/!*

  say(phrase);
}
```

<<<<<<< HEAD
これは、コードエディタで作業中、ブラウザに切り替えて開発者ツールを起動し、ブレイクポイントをセットするために開発者ツールでスクリプトを探すなどという手間をかけたくない場合にとても便利です。


## 一時停止して見回す 

今回の例では、`hello()` はページ読み込み中に呼び出されるので、デバッガを起動する最も簡単な方法はページを再読み込みすることです。なので、 `key:F5` (Windows, Linux)または `key:Cmd+R` (Mac) を押しましょう。

ブレイクポイントがセットされているので、実行は4行目で一時停止します。:

![](chrome-sources-debugger-pause.svg)

右側にある情報のドロップダウンを開いてください(矢印のラベルがついています)。現在のコードの状態を調べることができます:
=======
Such command works only when the development tools are open, otherwise the browser ignores it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. **`Watch` -- 任意の式の現在の値を表示します。**

<<<<<<< HEAD
    `+` をクリックし、式を入力することができます。デバッガは、常にその値を表示し、実行中に自動的に再計算を行います。
=======
In our example, `hello()` is called during the page load, so the easiest way to activate the debugger (after we've set the breakpoints) is to reload the page. So let's press `key:F5` (Windows, Linux) or `key:Cmd+R` (Mac).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

2. **`Call Stack` -- ネストされた呼び出しのチェーンを表示します。**

<<<<<<< HEAD
    現時点では、デバッガは `hello()` 呼び出しの内側におり、`index.html` のスクリプト(そこに関数はないので、 "anonymous" と呼ばれます)によって呼び出されました。
=======
![](chrome-sources-debugger-pause.svg)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    スタックの項目をクリックすると、デバッガは該当のコードにジャンプし、すべての変数も同様に調べられます。
3. **`Scope` -- 現在の変数。**

    `Local` はローカル関数の変数を表示します。また、ソース上でもハイライト表示されたそれらの値を見ることができます。

<<<<<<< HEAD
    `Global` はグローバル変数を持っています
=======
    You can click the plus `+` and input an expression. The debugger will show its value, automatically recalculating it in the process of execution.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    そこには我々がまだ学んでいない `this` キーワードもありますが、もうすぐ学びます。

## 実行を追跡する 

<<<<<<< HEAD
スクリプトを *追跡* してみましょう。
=======
    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

右ペインの上部にそのボタンがあります。
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "再開": 実行の継続, ホットキー `key:F8`.
: 実行を再開します。もしも他にブレイクポイントがなければ、そのまま実行が継続され、デバッガの制御から外れます。

    次の図は、それを行った後に見える画面です:

    ![](chrome-sources-debugger-trace-1.svg)

    実行は再開され、`say()` の中の別のブレイクポイントに到達し、そこで一時停止します。右の "Call stack" を見てください。もう一度呼び出すことで増えています。私たちは、今 `say()` の中にいます。

<span class="devtools" style="background-position:-200px -190px"></span> -- "ステップ": 次のコマンドを実行します, ホットキー `key:F9`.
: 次の文を実行します。クリックすると、`alert` が表示されます。

<<<<<<< HEAD
    これを何度もクリックすることで、1つずつスクリプト文が実行されます。

<span class="devtools" style="background-position:-62px -192px"></span> -- "ステップオーバー": 次のコマンドを実行しますが、*関数の中には入りません*, ホットキー `key:F10`。
: 上の "ステップ" コマンドと同じですが、次の文が関数呼び出しの場合に振る舞いが異なります。つまり、`alert` のような組み込みではなく、我々自身が作成した関数です。
=======
There are buttons for it at the top of the right panel. Let's engage them.
<!-- https://github.com/ChromeDevTools/devtools-frontend/blob/master/front_end/Images/src/largeIcons.svg -->
<span class="devtools" style="background-position:-146px -168px"></span> -- "Resume": continue the execution, hotkey `key:F8`.
: Resumes the execution. If there are no additional breakpoints, then the execution just continues and the debugger loses control.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    "ステップ" コマンドはその中に入り、その最初の行で実行を一時停止します。一方 "ステップオーバー" はネストされた関数呼び出しを目に見えない状態で実行し、関数の内部をスキップします。

<<<<<<< HEAD
    その後、その関数の直後で実行が一時停止されます。

    これは、関数呼び出しの内部で起きていることに興味がない場合に便利です。

<span class="devtools" style="background-position:-4px -194px"></span> -- "ステップイン", ホットキー `key:F11`.
: "ステップ" と同じですが、非同期関数呼び出しで振る舞いが異なります。もし JavaScript を学び始めたばかりであれば、まだ非同期呼び出しは取り扱ってないのでこの違いは無視してください。 

    将来的には、"ステップ" コマンドは、後で実行される `setTimeout` (スケジューリングされた関数呼び出し) のような非同期アクションを無視することに注意してください。"ステップイン" はそれらのコードに入り、必要に応じてそれらを待ちます。詳細については[開発者マニュアル](https://developers.google.com/web/updates/2018/01/devtools#async) を参照してください。

<span class="devtools" style="background-position:-32px -194px"></span> -- "ステップアウト": 現在の関数の最後まで実行を継続します、ホットキー `key:Shift+F11`。
: 実行は現在の関数の最後の行で停止します。これは <span class="devtools" style="background-position:-200px -190px"></span>を使ってネストされた呼び出しに誤って入ってしまい、早く関数の終わりまで進めたい場合に便利です。

<span class="devtools" style="background-position:-61px -74px"></span> -- すべてのブレイクポイントの有効/無効
: このボタンは単にブレイクポイントの on/off を切り替えるもので、実行の状態は変わりません。

<span class="devtools" style="background-position:-90px -146px"></span> -- エラー発生時の自動一時停止の有効/無効
: 有効にして開発者ツールを開いている場合、スクリプトエラーが起きると実行が自動で一時停止します。そして、何が間違っていたかを知るために変数を分析することができます。なので、スクリプトがエラーで死んだ場合は、どこで死んでその時どんなコンテキストであるかを確認するため、デバッガを起動しこのオプションを有効にしてページを再読込しましょう。
=======
    ![](chrome-sources-debugger-trace-1.svg)

    The execution has resumed, reached another breakpoint inside `say()` and paused there. Take a look at the "Call Stack" at the right. It has increased by one more call. We're inside `say()` now.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Step": run the next command, hotkey `key:F9`.
: Run the next statement. If we click it now, `alert` will be shown.

    Clicking this again and again will step through all script statements one by one.

<span class="devtools" style="background-position:-62px -192px"></span> -- "Step over": run the next command, but *don't go into a function*, hotkey `key:F10`.
: Similar to the previous "Step" command, but behaves differently if the next statement is a function call (not a built-in, like `alert`, but a function of our own).

    If we compare them, the "Step" command goes into a nested function call and pauses the execution at its first line, while "Step over" executes the nested function call invisibly to us, skipping the function internals.

    The execution is then paused immediately after that function call.

    That's good if we're not interested to see what happens inside the function call.

<span class="devtools" style="background-position:-4px -194px"></span> -- "Step into", hotkey `key:F11`.
: That's similar to "Step", but behaves differently in case of asynchronous function calls. If you're only starting to learn JavaScript, then you can ignore the difference, as we don't have asynchronous calls yet.

    For the future, just note that "Step" command ignores async actions, such as `setTimeout` (scheduled function call), that execute later. The "Step into" goes into their code, waiting for them if necessary. See [DevTools manual](https://developers.google.com/web/updates/2018/01/devtools#async) for more details.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Step out": continue the execution till the end of the current function, hotkey `key:Shift+F11`.
: Continue the execution and stop it at the very last line of the current function. That's handy when we accidentally entered a nested call using <span class="devtools" style="background-position:-200px -190px"></span>, but it does not interest us, and we want to continue to its end as soon as possible.

<span class="devtools" style="background-position:-61px -74px"></span> -- enable/disable all breakpoints.
: That button does not move the execution. Just a mass on/off for breakpoints.

<span class="devtools" style="background-position:-90px -146px"></span> -- enable/disable automatic pause in case of an error.
: When enabled, if the developer tools is open, an error during the script execution automatically pauses it. Then we can analyze variables in the debugger to see what went wrong. So if our script dies with an error, we can open debugger, enable this option and reload the page to see where it dies and what's the context at that moment.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```smart header="Continue to here"
コードの行で右クリックすると、"Continue to here" と呼ばれる素晴らしい選択肢を持つコンテキストメニューが開きます。

<<<<<<< HEAD
これは複数のステップを進めたいが、ブレイクポイントをセットするのが面倒なときに便利です。
=======
That's handy when we want to move multiple steps forward to the line, but we're too lazy to set a breakpoint.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## ロギング 

<<<<<<< HEAD
コンソールに何かを出力するために `console.log` 関数があります。
=======
To output something to console from our code, there's `console.log` function.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、これはコンソールに `0` から `4` までの値を出力します:

```js run
// 見るにはコンソールを開いてください
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

<<<<<<< HEAD
コンソールの中なので、通常のユーザはその出力を見ることはありません。見るためには、開発者ツールのコンソールタブを開くか、開発者ツールの別のタブで `key:Esc` を押します。 :下にコンソールが表示されます。
=======
Regular users don't see that output, it is in the console. To see it, either open the Console panel of developer tools or press `key:Esc` while in another panel: that opens the console at the bottom.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

コードに十分なログを仕込んでいれば、デバッガなしで何が行われているか知ることができます。

## サマリ 

<<<<<<< HEAD
これまで見てきた通り、スクリプトを一時停止するには主に3つの方法があります。
1. ブレイクポイント
2. `debugger` 文
3. エラー (開発者ツールを開き、ボタン <span class="devtools" style="background-position:-90px -146px"></span> を ON にしている場合)

これらにより変数を検査し実行が間違っている場所を確認することができます。

ここで説明した以上に、開発者ツールには多くのオプションがあります。完全なマニュアルは <https://developers.google.com/web/tools/chrome-devtools>です。
=======
As we can see, there are three main ways to pause a script:
1. A breakpoint.
2. The `debugger` statements.
3. An error (if dev tools are open and the button <span class="devtools" style="background-position:-90px -146px"></span> is "on").

When paused, we can debug: examine variables and trace the code to see where the execution goes wrong.

There are many more options in developer tools than covered here. The full manual is at <https://developers.google.com/web/tools/chrome-devtools>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このチャプターの情報はデバッグを始めるには十分ですが、今後、特にブラウザの作業が多い場合は、上記のサイトを見て開発者ツールのより高度な機能を調べてください。

<<<<<<< HEAD
また、開発者ツールの色んな場所をクリックすることで何が表示されるかを見ることが出来ます。恐らくそれは開発者ツールを学ぶのに最も近道です。同様に右クリックも忘れないように!
=======
Oh, and also you can click at various places of dev tools and just see what's showing up. That's probably the fastest route to learn dev tools. Don't forget about the right click and context menus!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
