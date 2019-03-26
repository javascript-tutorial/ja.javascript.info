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

## Example: a minimalistic window   

Let's open a window with minimal set of features just to see which of them browser allows to disable:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

Here most "window features" are disabled and window is positioned offscreen. Run it and see what really happens. Most browsers "fix" odd things like zero `width/height` and offscreen `left/top`. For instance, Chrome open such a window with full width/height, so that it occupies the full screen.

Let's add normal positioning options and reasonable `width`, `height`, `left`, `top` coordinates:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

Most browsers show the example above as required.

Rules for omitted settings:

- If there is no 3rd argument in the `open` call, or it is empty, then the default window parameters are used.
- If there is a string of params, but some yes/no features are omitted, then the omitted features are disabled, if the browser allows that. So if you specify params, make sure you explicitly set all required features to yes.
- If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.
- If there is no `width/height`, then the new window will be the same size as the last opened.

## Accessing a popup

The `open` call returns a reference to the new window. It can be used to manipulate it's properties, change location and even more.

In the example below, the contents of the new window is modified after loading.

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.focus();

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*
  newWindow.document.body.insertAdjacentHTML('afterbegin', html);
*/!*
};
```

Please note that external `document` content is only accessible for windows from the same origin (the same protocol://domain:port).

For windows with URLs from another sites, we are able to change the location by assigning `newWindow.location=...`, but we can't read the location or access the content. That's for user safety, so that an evil page can't open a popup with `http://gmail.com` and read the data. We'll talk more about it later.

## Accessing the opener window   

A popup may access the "opener" window as well. A JavaScript in it may use `window.opener` to access the window that opened it. It is `null` for all windows except popups.

So both the main window and the popup have a reference to each other. They may modify each other freely assuming that they come from the same origin. If that's not so, then there are still means to communicate, to be covered in the next chapter <info:cross-window-communication>.

## Closing a popup

If we don't need a popup any more, we can call `newWindow.close()` on it.

Technically, the `close()` method is available for any `window`, but `window.close()` is ignored by most browsers if `window` is not created with `window.open()`.

The `newWindow.closed` is `true` if the window is closed. That's useful to check if the popup (or the main window) is still open or not. A user could close it, and our code should take that possibility into account.

This code loads and then closes the window:

```js run
let newWindow = open('/', 'example', 'width=300,height=300')
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## Focus/blur on a popup

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window.  Also there are `focus/blur` events that allow to focus a window and catch the moment when the visitor switches elsewhere.

In the past evil pages abused those. For instance, look at this code:

```js run
window.onblur = () => window.focus();
```

When a user attempts to switch out of the window (`blur`), it brings it back to focus. The intention is to "lock" the user within the `window`.

So, there are limitations that forbid the code like that. There are many limitations to protect the user from ads and evils pages. They depend on the browser.

For instance, a mobile browser usually ignores that call completely. Also focusing doesn't work when a popup opens in a separate tab rather than a new window.

Still, there are some things that can be done.

For instance:

- When we open a popup, it's might be a good idea to run a `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.

## Summary   

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- By default, browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- The popup may access the opener window using the `window.opener` property, so the two are connected.
- If the main window and the popup come from the same origin, they can freely read and modify each other. Otherwise, they can change location of each other and communicate using messages (to be covered).
- To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.
- Methods `focus()` and `blur()` allow to focus/unfocus a window. Sometimes.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.

Also if we open a popup, a good practice is to notify the user about it. An icon with the opening window can help the visitor to survive the focus shift and keep both windows in mind.