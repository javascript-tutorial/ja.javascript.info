# Chrome でのデバッグ

より複雑なコードを書く前に、デバッグについて話しましょう。

<<<<<<< HEAD
すべてのモダンブラウザや、その他多くの環境は "デバッグ" をサポートしています。 -- 開発者ツールを使うことで、エラーの発見と修正がはるかに簡単になります。

ここでは、恐らくこの観点では最も機能が充実している Chrome を使います。

[cut]

## "sources" ペイン 
=======
[Debugging](https://en.wikipedia.org/wiki/Debugging) is the process of finding and fixing errors within a script. All modern browsers and most other environments support debugging tools -- a special UI in developer tools that makes debugging much easier. It also allows to trace the code step by step to see what exactly is going on.

We'll be using Chrome here, because it has enough features, most other browsers have a similar process`.

## The "Sources" panel
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

Chromeのバージョンによっては少し違って見えるかもしれませんが、そこが何かは明白でしょう。

<<<<<<< HEAD
- Chromeの [example page](debugging/index.html) を開きます。
- `key:F12` (Mac: `key:Cmd+Opt+I`) で開発者ツールをONにします。
- `source` ペインを選択します。
=======
- Open the [example page](debugging/index.html) in Chrome.
- Turn on developer tools with `key:F12` (Mac: `key:Cmd+Opt+I`).
- Select the `Sources` panel.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

もしもこの画面を見るのが初めてであれば、見ておくべきものがあります:

![](chrome-open-sources.svg)

トグルボタン <span class="devtools" style="background-position:-168px -76px"></span> はファイルを表示するタブを開きます。
それをクリックして、`index.html` 、次にツリービューの `hello.js` を選択しましょう。ここで表示される内容は次の通りです:

<<<<<<< HEAD
![](chrome-tabs.svg)

ここでは3つの領域が確認できます:
=======
Let's click it and select `hello.js` in the tree view. Here's what should show up:

![](chrome-tabs.svg)
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

1. **リソース領域** html, JavaScript, css や、ページに紐付いているイメージなどを含むファイルがリストされます。
2. **ソース領域** ソースコードを表示します。
3. **情報と制御領域** これはデバッグのためで、この後見ていきます。

<<<<<<< HEAD
同じトグル <span class="devtools" style="background-position:-200px -76px"></span> を再びクリックすること、リソースの一覧やコードを隠すことができます。
=======
1. The **Resources zone** lists HTML, JavaScript, CSS and other files, including images that are attached to the page. Chrome extensions may appear here too.
2. The **Source zone** shows the source code.
3. The **Information and control zone** is for debugging, we'll explore it soon.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

## コンソール 

`Esc` を押すとコンソールが下に表示されます。そこでコマンドを入力し、`key:Enter` をするとコマンドを実行することができます。

<<<<<<< HEAD
実行結果は下に表示されます。
=======
If we press `key:Esc`, then a console opens below. We can type commands there and press `key:Enter` to execute.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

例えば、ここでは `1+2 ` は `3` になり、`hello("debugger")` は何も返さないので、結果は `undefined` です:

![](chrome-sources-console.svg)

<<<<<<< HEAD
## ブレイクポイント 
=======
![](chrome-sources-console.svg)
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

[example page](debugging/index.html) のコードの中で何が起こっているのか見てみましょう。`hello.js` で、行番号 `4` をクリックします。コードではなく、右にある `"4"` の数字です。

<<<<<<< HEAD
これでブレイクポイントがセットできました。行 `8` の数字もクリックしましょう。
=======
Let's examine what's going on within the code of the [example page](debugging/index.html). In `hello.js`, click at line number `4`. Yes, right on the `4` digit, not on the code.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

このようになるはずです(青はあなたがクリックした場所です):

![](chrome-sources-breakpoint.svg)

<<<<<<< HEAD
*ブレイクポイント* はデバッガが自動でJavaScriptの実行を停止するコードのポイントです。
=======
![](chrome-sources-breakpoint.svg)
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

コードが停止している間、現在の変数を検査したり、コンソールでコマンドを実行することができます。つまり、そこでデバッグができます。

右のペインでは、常にブレイクポイントの一覧を見ることができます。色々なファイルで多くのブレイクポイントを持っているときに役に立ちます。それらは次のようなことができます:

<<<<<<< HEAD
- コード中のブレイクポイントに素早く移動する(右ペインで移動したいブレイクポイントをクリック)
- チェックを外すことで、一時的にブレイクポイントを無効にする
- 右クリックから削除を選択することで、ブレイクポイントを削除する
- ...など
=======
We can always find a list of breakpoints in the right panel. That's useful when we have many breakpoints in various files. It allows us to:
- Quickly jump to the breakpoint in the code (by clicking on it in the right panel).
- Temporarily disable the breakpoint by unchecking it.
- Remove the breakpoint by right-clicking and selecting Remove.
- ...And so on.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```smart header="条件付きのブレイクポイント"
行番号の *右クリック* で *条件付きの* ブレイクポイントを作ることができます。与えられた式が真の場合にのみトリガします。

これは特定の変数値、もしくは関数パラメータに対してのみ停止する必要がある場合に便利です。
```

## デバッガコマンド 

<<<<<<< HEAD
次のように、`debugger` コマンドを使うことでもコードを停止することができます:
=======
We can also pause the code by using the `debugger` command in it, like this:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- デバッガはここで止まります
*/!*

  say(phrase);
}
```

これは、コードエディタで作業中、ブラウザに切り替えて開発者ツールを起動し、該当のスクリプトを開いてブレイクポイントをセットするというが手間な場合に便利です。

## 一時停止して見回す 

今回の例では、`hello()` はページ読み込み中に呼び出されるので、デバッガを起動する最も簡単な方法はページを再読込することです。なので、 `key:F5` (Windows, Linux)または `key:Cmd+R` (Mac) を押しましょう。

<<<<<<< HEAD
ブレイクポイントがセットされているので、実行は4行目で一時停止します。:
=======
In our example, `hello()` is called during the page load, so the easiest way to activate the debugger (after we've set the breakpoints) is to reload the page. So let's press `key:F5` (Windows, Linux) or `key:Cmd+R` (Mac).
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

![](chrome-sources-debugger-pause.svg)

<<<<<<< HEAD
右側にある情報のドロップダウンを開いてください(矢印のラベルがついています)。現在のコードの状態を調べることができます:
=======
![](chrome-sources-debugger-pause.svg)
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

1. **`Watch` -- 任意の式の現在の値を表示します。**

    `+` をクリックし、式を入力することができます。デバッガは、常にその値を表示し、実行中に自動的に再計算を行います。

2. **`Call Stack` -- ネストされた呼び出しのチェーンを表示します。**

    現時点では、デバッガは `hello()` 呼び出しの内側におり、`index.html` のスクリプト(そこに関数はないので、 "anonymous" と呼ばれます)によって呼び出されました。

    スタックの項目をクリックすると、デバッガは該当のコードにジャンプし、すべての変数も同様に調べられます。

<<<<<<< HEAD
3. **`Scope` -- 現在の変数。**
=======
    If you click on a stack item (e.g. "anonymous"), the debugger jumps to the corresponding code, and all its variables can be examined as well.
3. **`Scope` -- current variables.**
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

    `Local` はローカル関数の変数を表示します。また、ソース上でもハイライト表示されたそれらの値を見ることができます。

    `Global` はグローバル変数を持っています

    そこには我々がまだ学んでいない `this` キーワードもあります、がもうすぐ学びます。

## 実行を追跡する 

スクリプトを *追跡* してみましょう。

<<<<<<< HEAD
右ペインの上部にそのボタンがあります。

<span class="devtools" style="background-position:-7px -76px"></span> -- 実行の継続, ホットキー `key:F8`.
: 実行を再開します。もしも他にブレイクポイントがなければ、そのまま実行が継続され、デバッガの制御から外れます。
=======
There are buttons for it at the top of the right panel. Let's engage them.

<span class="devtools" style="background-position:-7px -76px"></span> -- continue the execution, hotkey `key:F8`.
: Resumes the execution. If there are no additional breakpoints, then the execution just continues and the debugger loses control.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

    次の図は、それを行った後に見える画面です:

    ![](chrome-sources-debugger-trace-1.svg)

<<<<<<< HEAD
    実行は再開され、`say()` の中の別のブレイクポイントに到達し、そこで一時停止します。右の "Call stack" を見てください。もう一度呼び出すことで増えています。私たちは、今 `say()` の中にいます。
=======
    The execution has resumed, reached another breakpoint inside `say()` and paused there. Take a look at the "Call Stack" at the right. It has increased by one more call. We're inside `say()` now.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

<span class="devtools" style="background-position:-137px -76px"></span> -- 一歩を踏み出します (次のコマンドを実行します)が、*関数の中には入りません*, ホットキー `key:F10`。
: 今クリックすると、 `alert`が表示されます。 重要なのは、 `alert` だけでなくどの関数に対しても可能であり、実行は関数の内部に入らずに実行するということです。

<span class="devtools" style="background-position:-72px -76px"></span> -- 一歩を踏み出します, ホットキー `key:F11`.
: 上と同じですが、ネストされた関数に "ステップイン" します。これをクリックすると、全てのスクリプトが1つずつ実行されます。

<span class="devtools" style="background-position:-104px -76px"></span> -- 現在の関数の最後まで実行を継続します、ホットキー `key:Shift+F11`。
: 実行は現在の関数の最後の行で停止します。これは <span class="devtools" style="background-position:-72px -76px"></span>を使ってネストされた呼び出しに誤って入ってしまい、早く関数の終わりまで進めたい場合に便利です。

<span class="devtools" style="background-position:-7px -28px"></span> -- すべてのブレイクポイントの有効/無効
: このボタンは単にブレイクポイントの on/off を切り替えるもので、実行の状態は変わりません。

<span class="devtools" style="background-position:-264px -4px"></span> -- エラー発生時の自動一時停止の有効/無効
: 有効にして開発者ツールを開いている場合、スクリプトエラーが起きると実行が自動で一時停止します。そして、何が間違っていたかを知るために変数を分析することができます。なので、スクリプトがエラーで死んだ場合は、どこで死んでその時どんなコンテキストであるかを確認するため、デバッガを起動しこのオプションを有効にしてページを再読込しましょう。

```smart header="Continue to here"
コードの行で右クリックすると、"Continue to here" と呼ばれる素晴らしい選択肢を持つコンテキストメニューが開きます。

<<<<<<< HEAD
これは複数のステップを進めたいが、ブレイクポイントをセットするのが面倒なときに便利です。
=======
That's handy when we want to move multiple steps forward to the line, but we're too lazy to set a breakpoint.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
```

## ロギング 

<<<<<<< HEAD
コンソールに何かを出力するために `console.log` 関数があります。
=======
To output something to console from our code, there's `console.log` function.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

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
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

コードに十分なログを仕込んでいれば、デバッガなしで何が行われているか知ることができます。

## サマリ 

<<<<<<< HEAD
これまで見てきた通り、スクリプトを一時停止するには主に3つの方法があります。
1. ブレイクポイント
2. `debugger` 構文
3. エラー (開発者ツールを開き、ボタン <span class="devtools" style="background-position:-264px -4px"></span> を ON にしている場合)

これらにより変数を検査し実行が間違っている場所を確認することができます。

ここで説明した以上に、開発者ツールには多くのオプションがあります。完全なマニュアルは <https://developers.google.com/web/tools/chrome-devtools>です。
=======
As we can see, there are three main ways to pause a script:
1. A breakpoint.
2. The `debugger` statements.
3. An error (if dev tools are open and the button <span class="devtools" style="background-position:-264px -4px"></span> is "on").

When paused, we can debug - examine variables and trace the code to see where the execution goes wrong.

There are many more options in developer tools than covered here. The full manual is at <https://developers.google.com/web/tools/chrome-devtools>.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

このチャプターの情報はデバッグを始めるには十分ですが、今後、特にブラウザの作業が多い場合は、上記のサイトを見て開発者ツールのより高度な機能を調べてください。

<<<<<<< HEAD
また、開発者ツールの色んな場所をクリックすることで何が表示されるかを見ることが出来ます。恐らくそれは開発者ツールを学ぶのに最も近道です。同様に右クリックも忘れないように!
=======
Oh, and also you can click at various places of dev tools and just see what's showing up. That's probably the fastest route to learn dev tools. Don't forget about the right click and context menus!
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
