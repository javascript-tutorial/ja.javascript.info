<<<<<<< HEAD
# ポップアップとウィンドウメソッド

ポップアップウィンドウは、利用者に追加のコンテンツを見せるための最も古い方法の1つです。

基本的には次のように実行するだけです:
```js
window.open('http://javascript.info/')
```

... すると、指定された URL で新しいウィンドウが開きます。ほとんどのモダンブラウザは、別ウィンドウではなく新しいタブとして開くよう設定されています。

## ポップアップブロック

ポップアップはとても古くから存在します。当初の考えは、メインのウィンドウを閉じることなく別のコンテンツを表示することでした。現時点では、それをするための他の方法があります: JavaScript はサーバへリクエストを送ることができるので、ポップアップはめったに使われません。しかし、それでも依然として便利なときはあります。

過去、悪意のあるサイトはポップアップを大いに乱用しました。悪意のあるページは広告を含むウィンドウを何度も開く事ができました。そのため、現在多くのブラウザはポップアップをブロックし、ユーザを守ろうとしています。

**ほとんどのブラウザは、`onclick` などユーザがトリガーしたイベントハンドラ外から呼ばれた場合には、ポップアップをブロックします。**

これについて考える場合、少し注意が必要です。もしコードが直接 `onclick` 内にあればそれは簡単です。しかし、ポップアップは `setTimeout` で開くでしょうか？

このコードを試してみましょう:

```js run
// 3秒後に開く
setTimeout(() => window.open('http://google.com'), 3000);
```

Chrome ではポップアップは開きますが、Firefox ではブロックされます。

...そして、これは Firefox でも機能します。:

```js run
// 1秒後に開く
setTimeout(() => window.open('http://google.com'), 1000);
```

違いは、Firefox は 2000ms 以下のタイムアウトは許容することです。しかし、その後は "信頼" がなくなり、"ユーザ操作の範囲外" であると想定します。そのため、最初のはブロックされ、2つ目は開きました。

## モダンな使用方法

現在、JavaScriptを使用してデータをロードし、ページ上に表示する方法は数多くあります。しかし、ポップアップがベストな選択肢である状況はまだあります。

例えば、多くのお店は相談にのる方法としてオンラインチャットを使います。訪問者がボタンを押すと、`window.open` が実行され、チャットをするポップアップが開きます。

なぜ、ここではページ内ではなくポップアップが良いのでしょう？

1. ポップアップは独立した JavaScript 環境を持つ別ウィンドウです。なので、チャットサービスはメインの店舗サイトのスクリプトと統合する必要がありません。
2. ポップアップはサイトに追加するのが非常に簡単で、オーバーヘッドがほとんどありません。スクリプトの追加は不要で小さいボタンだけです。
3. ポップアップは利用者がページを離れても持続させることができます。例えば、相談で利用者に新しい "スーパークーラー" のページを訪れるようにアドバイスします。利用者はメインウィンドウでそのページへ行きますが、チャットは無くなりません。

## window.open

ポップアップを開く構文は次の通りです: `window.open(url, name, params)`:

url
: 新しいウィンドウでロードする URL

name
: 新しいウィンドウの名前。各ウィンドウは `window.name` を持っており、ここでポップアップに使うウィンドウを指定することができます。すでに同じ名前のウィンドウがあった場合、そこで指定された URL が開きます。なければ新しいウィンドウが開きます。

params
: 新しいウィンドウの設定文字列。カンマで区切られた設定を含みます。params の中にスペースを入れてはいけません。例: `width:200,height=100`.

`params` の設定:

- ポジション:
  - `left/top` (数値) -- 画面上のウィンドウの左上隅の座標。新しいウィンドウを画面外に配置することはできない、という制限があります。
  - `width/height` (数値) -- 新しいウィンドウの width と height 。 最小の width/height の制限があるので、, 見えないウィンドウを作成することはできません。
- ウィンドウの機能:
  - `menubar` (yes/no) -- 新しいウィンドウで、ブラウザのメニューを表示します/非表示にします。
  - `toolbar` (yes/no) -- 新しいウィンドウで、ブラウザナビゲーション(戻る/進む/更新など)を表示します/非表示にします。
  - `location` (yes/no) -- 新しいウィンドウで、URL フィールドを表示します/非表示にします。FF と IE はデフォルトでは隠すことは許可されていません。
  - `status` (yes/no) -- ステータスバーを表示します/非表示にします。ほとんどのブラウザは強制的に表示させます。
  - `resizable` (yes/no) -- 新しいウィンドウのリサイズを無効にします。非推奨です。
  - `scrollbars` (yes/no) -- 新しいウィンドウのスクロールバーを無効にします。非推奨です。


あまりサポートされていないブラウザ固有の機能も数多くありますが、通常は使用されていません。例については、<a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> を確認してみてください。

## 例: a minimalistic window   

ブラウザがどの機能の無効化を許容するか、最小セットの機能でウィンドウを開いてみましょう。:
=======
# Popups and window methods

A popup window is one of the oldest methods to show additional document to user.

Basically, you just run:
```js
window.open('https://javascript.info/')
```

...And it will open a new window with given URL. Most modern browsers are configured to open url in new tabs instead of separate windows.

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: we can load content dynamically with [fetch](info:fetch) and show it in a dynamically generated `<div>`. So, popups is not something we use everyday.

Also, popups are tricky on mobile devices, that don't show multiple windows simultaneously.

Still, there are tasks where popups are still used, e.g. for OAuth authorization (login with Google/Facebook/...), because:

1. A popup is a separate window which has its own independent JavaScript environment. So opening a popup from a third-party, non-trusted site is safe.
2. It's very easy to open a popup.
3. A popup can navigate (change URL) and send messages to the opener window.

## Popup blocking

In the past, evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.

**Most browsers block popups if they are called outside of user-triggered event handlers like `onclick`.**

For example:
```js
// popup blocked
window.open('https://javascript.info');

// popup allowed
button.onclick = () => {
  window.open('https://javascript.info');
};
```

This way users are somewhat protected from unwanted popups, but the functionality is not disabled totally.

## window.open

The syntax to open a popup is: `window.open(url, name, params)`:

url
: An URL to load into the new window.

name
: A name of the new window. Each window has a `window.name`, and here we can specify which window to use for the popup. If there's already a window with such name -- the given URL opens in it, otherwise a new window is opened.

params
: The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: `width=200,height=100`.

Settings for `params`:

- Position:
  - `left/top` (numeric) -- coordinates of the window top-left corner on the screen. There is a limitation: a new window cannot be positioned offscreen.
  - `width/height` (numeric) -- width and height of a new window. There is a limit on minimal width/height, so it's impossible to create an invisible window.
- Window features:
  - `menubar` (yes/no) -- shows or hides the browser menu on the new window.
  - `toolbar` (yes/no) -- shows or hides the browser navigation bar (back, forward, reload etc) on the new window.
  - `location` (yes/no) -- shows or hides the URL field in the new window. FF and IE don't allow to hide it by default.
  - `status` (yes/no) -- shows or hides the status bar. Again, most browsers force it to show.
  - `resizable` (yes/no) -- allows to disable the resize for the new window. Not recommended.
  - `scrollbars` (yes/no) -- allows to disable the scrollbars for the new window. Not recommended.


There is also a number of less supported browser-specific features, which are usually not used. Check <a href="https://developer.mozilla.org/en/DOM/window.open">window.open in MDN</a> for examples.

## Example: a minimalistic window

Let's open a window with minimal set of features, just to see which of them browser allows to disable:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

<<<<<<< HEAD
ここでは、ほとんどの "ウィンドウの機能 は無効にされ、ウィンドウは画面外に配置されています。実行して実際に何が起きるのかを見てください。ほとんどのブラウザはゼロ値の `width/height` や画面外の `left/top` といったおかしなものを "直します"。例えば、Chrome はフルスクリーンになるよう、画面幅/高さでウィンドウを開きます。

通常の配置オプションで `width`, `height`, `left`, `top` 座標を追加追加しましょう。:
=======
Here most "window features" are disabled and window is positioned offscreen. Run it and see what really happens. Most browsers "fix" odd things like zero `width/height` and offscreen `left/top`. For instance, Chrome open such a window with full width/height, so that it occupies the full screen.

Let's add normal positioning options and reasonable `width`, `height`, `left`, `top` coordinates:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

<<<<<<< HEAD
ほとんどのブラウザは要求に従って上記の例を表示します。

設定が省略された際のルール:

- `open` 呼び出しで ３つ目の引数がない場合、もしくはそれが空の場合、デフォルトのウィンドウパラメータが使われます。
- params の文字列はあるが、一部の機能の yes/no が省略されている場合、省略された機能はブラウザで許可されていれば無効になります。そのため、params を指定した場合には、明示的に必要なすべての機能に yes を設定してください。
- params に `left/top` がない場合、ブラウザは最後に開いたウィンドウの近くに新しいウィンドウを開こうとします。
- `width/height` がない場合、新しいウィンドウは最後に開いたウィンドウと同じサイズになります。

## ポップアップにアクセスする

`open` 呼び出しは、新しいウィンドウへの参照を返します。それはプロパティを操作したり、位置を替えたりと言ったことをするのに利用できます。

下の例では、新しいウィンドウのコンテンツはロード後に変更されます。
=======
Most browsers show the example above as required.

Rules for omitted settings:

- If there is no 3rd argument in the `open` call, or it is empty, then the default window parameters are used.
- If there is a string of params, but some `yes/no` features are omitted, then the omitted features assumed to have `no` value. So if you specify params, make sure you explicitly set all required features to yes.
- If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.
- If there is no `width/height`, then the new window will be the same size as the last opened.

## Accessing popup from window

The `open` call returns a reference to the new window. It can be used to manipulate its properties, change location and even more.

In this example, we generate popup content from JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

And here we modify the contents after loading:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

<<<<<<< HEAD
=======
alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

<<<<<<< HEAD
外部の `document` コンテンツは、同じオリジン(同じ protocol://domain:port) からのウィンドウに対してのみアクセス可能であることに注意してください。

別のサイトの URL を持つウィンドウの場合、`newWindow.location=...` による割り当てでロケーションを変更することができますが、そのロケーションやコンテンツにアクセスすることはできます。これはユーザの安全のためであり、悪意のあるページが `http://gmail.com` のポップアップを開いてもデータを読む事ができないようにするためです。後ほど詳しく話します。

## 開いた元(opener)のウィンドウにアクセスする

ポップアップは "opener" ウィンドウにもアクセスすることができます。その中で、それを開いたウィンドウにアクセスするには `window.opener` を使います。ポップアップ以外のすべてのウィンドウの場合、それは `null` です。

したがって、メインウィンドウとポップアップ両方とも、互いの参照を持っています。 それらは同じオリジンから来ていると想定して自由に互いを変更することができます。そうでない場合は、次のチャプター <info:cross-window-communication> で説明するように、ほかのコミュニケーションする手段があります。

## ポップアップを閉じる

ポップアップがもう必要なくなった場合は `newWindow.close()` を呼びます。

技術的には、`close()` メソッドはどの `window` でも利用可能ですが、`window` が `window.open()` で生成されたものでない場合、`window.close()` はほとんどのブラウザで無視されます。

このコードはウィンドウを開いた後、閉じます。:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
=======
Please note: immediately after `window.open`, the new window isn't loaded yet. That's demonstrated by `alert` in line `(*)`. So we wait for `onload` to modify it. We could also use `DOMContentLoaded` handler for `newWin.document`.

```warn header="Same origin policy"
Windows may freely access content of each other only if they come from the same origin (the same protocol://domain:port).

Otherwise, e.g. if the main window is from `site.com`, and the popup from `gmail.com`, that's impossible for user safety reasons. For the details, see chapter <info:cross-window-communication>.
```

## Accessing window from popup

A popup may access the "opener" window as well using `window.opener` reference. It is `null` for all windows except popups.

If you run the code below, it replaces the opener (current) window content with "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

So the connection between the windows is bidirectional: the main window and the popup have a reference to each other.

## Closing a popup

To close a window: `win.close()`.

To check if a window is closed: `win.closed`.

Technically, the `close()` method is available for any `window`, but `window.close()` is ignored by most browsers if `window` is not created with `window.open()`. So it'll only work on a popup.

The `closed` property is `true` if the window is closed. That's useful to check if the popup (or the main window) is still open or not. A user can close it anytime, and our code should take that possibility into account.

This code loads and then closes the window:

```js run
let newWindow = open('/', 'example', 'width=300,height=300');

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

<<<<<<< HEAD
## ポップアップへの focus/blur

理論的には、ウィンドウにフォーカスを当てる/外す `window.focus()` と `window.blur()` メソッドがあります。また、ウィンドウにフォーカスしたり、訪問者が別の場所へ切り替えた瞬間を捉える `focus/blur` イベントもあります。

過去、悪意のあるページはそれらを乱用しました。例えば、次のコードを見てください。:
=======

## Moving and resizing

There are methods to move/resize a window:

`win.moveBy(x,y)`
: Move the window relative to current position `x` pixels to the right and `y` pixels down. Negative values are allowed (to move left/up).

`win.moveTo(x,y)`
: Move the window to coordinates `(x,y)` on the screen.

`win.resizeBy(width,height)`
: Resize the window by given `width/height` relative to the current size. Negative values are allowed.

`win.resizeTo(width,height)`
: Resize the window to the given size.

There's also `window.onresize` event.

```warn header="Only popups"
To prevent abuse, the browser usually blocks these methods. They only work reliably on popups that we opened, that have no additional tabs.
```

```warn header="No minification/maximization"
JavaScript has no way to minify or maximize a window. These OS-level functions are hidden from Frontend-developers.

Move/resize methods do not work for maximized/minimized windows.
```

## Scrolling a window

We already talked about scrolling a window in the chapter <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Scroll the window `x` pixels right and `y` down relative the current scroll. Negative values are allowed.

`win.scrollTo(x,y)`
: Scroll the window to the given coordinates `(x,y)`.

`elem.scrollIntoView(top = true)`
: Scroll the window to make `elem` show up at the top (the default) or at the bottom for `elem.scrollIntoView(false)`.

There's also `window.onscroll` event.

## Focus/blur on a window

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window. And there are also `focus/blur` events that allow to catch the moment when the visitor focuses on a window and switches elsewhere.

Although, in practice they are severely limited, because in the past evil pages abused them.

For instance, look at this code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
window.onblur = () => window.focus();
```

<<<<<<< HEAD
利用者がウィンドウから出ようとすると(`blur`)、このコードはフォーカスを戻します。この意図は、利用者を `window` 内に "ロック" することです。

そのため、そのようなコードを禁止する制限があります。広告や悪意のあるページから利用者を守るための多くの制限があり、これらはブラウザによります。

例えば、モバイルブラウザは通常、そのような呼び出しを完全に無視します。また、ポップアップが新しいウィンドウではなく別のタブで開いた場合、フォーカスは動作しません。

それでも、できることがいくつかあります。

例:

- ポップアップを開く際、`newWindow.focus()` を行うのは良いアイデアかもしれません。OS/ブラウザの組み合わせによっては、ユーザが新しいウィンドウにいることを保証します。
- 訪問者が実際にいつ我々の web アプリを利用したかを追跡したい場合、`window.onfocus/onblur` が使えます。これにより、ページ内でのアクティビティやアニメーションなどを一時停止/再開することができます。しかし、`blur` イベントは訪問者がウィンドウを切り替えたことを意味しますが、それでも関しできる可能性があることに留意してください。ウィンドウはバックグラウンドにありますが、まだ表示されている可能性があります。

## サマリ

- ポップアップは　`open(url, name, params)` 呼び出しで開くことができます。これは新しく開かれたウィンドウへの参照を返します。
- デフォルトでは、ブラウザはユーザアクション外からの `open` 呼び出しをブロックします。通常、通知が表示されるので、利用者はそれを許可することができます。
- ポップアップは `window.opener` プロパティを利用して、開いた元のウィンドウにアクセスできます。
- メインウィンドウとポップアップが同じオリジンから来たものである場合、お互いを自由に読み書きすることができます。そうでない場合、お互いの location を変更し、メッセージを使用してやり取りすることができます(この後説明があります)。
- ポップアップを閉じるには、`close()` 呼び出しを使用します。また、ユーザも閉じることができ、その後は `window.closed` は `true` です。
- メソッド `focus()` と `blur()` でウィンドウへフォーカスしたり外したりできます。
- イベント `focus` と `blur` によりウィンドウの内外への切り替えを追跡することができます。しかし、ウィンドウは `blur` の後、バックグラウンド状態でも見えるかもしれないことに留意してください。

また、ポップアップを開く場合は、利用者にそのことを伝えることをおすすめします。ウィンドウを開くことを意味するアイコンは、訪問者が両方のウィンドウを開いておくのに役立つことを心に留めておいてください。
=======
When a user attempts to switch out of the window (`window.onblur`), it brings the window back into focus. The intention is to "lock" the user within the `window`.

So browsers had to introduce many limitations to forbid the code like that and protect the user from ads and evils pages. They depend on the browser.

For instance, a mobile browser usually ignores `window.focus()` completely. Also focusing doesn't work when a popup opens in a separate tab rather than a new window.

Still, there are some use cases when such calls do work and can be useful.

For instance:

- When we open a popup, it might be a good idea to run `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary

Popup windows are used rarely, as there are alternatives: loading and displaying information in-page, or in iframe.

If we're going to open a popup, a good practice is to inform the user about it. An "opening window" icon near a link or button would allow the visitor to survive the focus shift and keep both windows in mind.

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- Browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- Browsers open a new tab by default, but if sizes are provided, then it'll be a popup window.
- The popup may access the opener window using the `window.opener` property.
- The main window and the popup can freely read and modify each other if they have the same origin. Otherwise, they can change location of each other and [exchange messages](info:cross-window-communication).

To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.

- Methods `focus()` and `blur()` allow to focus/unfocus a window. But they don't work all the time.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
