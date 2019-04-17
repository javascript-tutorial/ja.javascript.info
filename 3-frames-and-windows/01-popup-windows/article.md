# ポップアップとウィンドウメソッド

ポップアップウィンドウは、利用者に追加のコンテンツを見せるための最も古い方法の1つです。

基本的には次のように実行するだけです:
```js
window.open('https://javascript.info/')
```

... すると、指定された URL で新しいウィンドウが開きます。ほとんどのモダンブラウザは、別ウィンドウではなく新しいタブとして開くよう設定されています。

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
## ポップアップブロック

ポップアップはとても古くから存在します。当初の考えは、メインのウィンドウを閉じることなく別のコンテンツを表示することでした。現時点では、それをするための他の方法があります: JavaScript はサーバへリクエストを送ることができるので、ポップアップはめったに使われません。しかし、それでも依然として便利なときはあります。
=======
## Popup blocking
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

過去、悪意のあるサイトはポップアップを大いに乱用しました。悪意のあるページは広告を含むウィンドウを何度も開く事ができました。そのため、現在多くのブラウザはポップアップをブロックし、ユーザを守ろうとしています。

**ほとんどのブラウザは、`onclick` などユーザがトリガーしたイベントハンドラ外から呼ばれた場合には、ポップアップをブロックします。**

これについて考える場合、少し注意が必要です。もしコードが直接 `onclick` 内にあればそれは簡単です。しかし、ポップアップは `setTimeout` で開くでしょうか？

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
このコードを試してみましょう:
=======
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

What if the popup opens from `onclick`, but after `setTimeout`? That's a bit tricky.

Try this code:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

```js run
// 3秒後に開く
setTimeout(() => window.open('http://google.com'), 3000);
```

Chrome ではポップアップは開きますが、Firefox ではブロックされます。

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
...そして、これは Firefox でも機能します。:
=======
...If we decrease the delay, the popup works in Firefox too:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

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

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open('/', 'test', params);
```

ここでは、ほとんどの "ウィンドウの機能 は無効にされ、ウィンドウは画面外に配置されています。実行して実際に何が起きるのかを見てください。ほとんどのブラウザはゼロ値の `width/height` や画面外の `left/top` といったおかしなものを "直します"。例えば、Chrome はフルスクリーンになるよう、画面幅/高さでウィンドウを開きます。

通常の配置オプションで `width`, `height`, `left`, `top` 座標を追加追加しましょう。:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open('/', 'test', params);
```

ほとんどのブラウザは要求に従って上記の例を表示します。

設定が省略された際のルール:

- `open` 呼び出しで ３つ目の引数がない場合、もしくはそれが空の場合、デフォルトのウィンドウパラメータが使われます。
- params の文字列はあるが、一部の機能の yes/no が省略されている場合、省略された機能はブラウザで許可されていれば無効になります。そのため、params を指定した場合には、明示的に必要なすべての機能に yes を設定してください。
- params に `left/top` がない場合、ブラウザは最後に開いたウィンドウの近くに新しいウィンドウを開こうとします。
- `width/height` がない場合、新しいウィンドウは最後に開いたウィンドウと同じサイズになります。

## ポップアップにアクセスする

`open` 呼び出しは、新しいウィンドウへの参照を返します。それはプロパティを操作したり、位置を替えたりと言ったことをするのに利用できます。

下の例では、新しいウィンドウのコンテンツはロード後に変更されます。

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
newWindow.onload = function() {
  newWindow.close();
  alert(newWindow.closed); // true
};
```

## ポップアップへの focus/blur

理論的には、ウィンドウにフォーカスを当てる/外す `window.focus()` と `window.blur()` メソッドがあります。また、ウィンドウにフォーカスしたり、訪問者が別の場所へ切り替えた瞬間を捉える `focus/blur` イベントもあります。

過去、悪意のあるページはそれらを乱用しました。例えば、次のコードを見てください。:

```js run
window.onblur = () => window.focus();
```

利用者がウィンドウから出ようとすると(`blur`)、このコードはフォーカスを戻します。この意図は、利用者を `window` 内に "ロック" することです。

そのため、そのようなコードを禁止する制限があります。広告や悪意のあるページから利用者を守るための多くの制限があり、これらはブラウザによります。

例えば、モバイルブラウザは通常、そのような呼び出しを完全に無視します。また、ポップアップが新しいウィンドウではなく別のタブで開いた場合、フォーカスは動作しません。

それでも、できることがいくつかあります。

例:

<<<<<<< HEAD:4-frames-and-windows/01-popup-windows/article.md
- ポップアップを開く際、`newWindow.focus()` を行うのは良いアイデアかもしれません。OS/ブラウザの組み合わせによっては、ユーザが新しいウィンドウにいることを保証します。
- 訪問者が実際にいつ我々の web アプリを利用したかを追跡したい場合、`window.onfocus/onblur` が使えます。これにより、ページ内でのアクティビティやアニメーションなどを一時停止/再開することができます。しかし、`blur` イベントは訪問者がウィンドウを切り替えたことを意味しますが、それでも関しできる可能性があることに留意してください。ウィンドウはバックグラウンドにありますが、まだ表示されている可能性があります。
=======
- When we open a popup, it's might be a good idea to run a `newWindow.focus()` on it. Just in case, for some OS/browser combinations it ensures that the user is in the new window now.
- If we want to track when a visitor actually uses our web-app, we can track `window.onfocus/onblur`. That allows us to suspend/resume in-page activities, animations etc. But please note that the `blur` event means that the visitor switched out from the window, but they still may observe it. The window is in the background, but still may be visible.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613:3-frames-and-windows/01-popup-windows/article.md

## サマリ

- ポップアップは　`open(url, name, params)` 呼び出しで開くことができます。これは新しく開かれたウィンドウへの参照を返します。
- デフォルトでは、ブラウザはユーザアクション外からの `open` 呼び出しをブロックします。通常、通知が表示されるので、利用者はそれを許可することができます。
- ポップアップは `window.opener` プロパティを利用して、開いた元のウィンドウにアクセスできます。
- メインウィンドウとポップアップが同じオリジンから来たものである場合、お互いを自由に読み書きすることができます。そうでない場合、お互いの location を変更し、メッセージを使用してやり取りすることができます(この後説明があります)。
- ポップアップを閉じるには、`close()` 呼び出しを使用します。また、ユーザも閉じることができ、その後は `window.closed` は `true` です。
- メソッド `focus()` と `blur()` でウィンドウへフォーカスしたり外したりできます。
- イベント `focus` と `blur` によりウィンドウの内外への切り替えを追跡することができます。しかし、ウィンドウは `blur` の後、バックグラウンド状態でも見えるかもしれないことに留意してください。

また、ポップアップを開く場合は、利用者にそのことを伝えることをおすすめします。ウィンドウを開くことを意味するアイコンは、訪問者が両方のウィンドウを開いておくのに役立つことを心に留めておいてください。
