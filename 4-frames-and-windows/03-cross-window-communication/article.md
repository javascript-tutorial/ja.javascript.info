# ウィンドウ間のやり取り

"同一オリジン" (同一サイト) ポリシーは、ウィンドウとフレームのアクセスを互いに制限します。

2つのウィンドウが開いているとします: 1つは `john-smith.com`、もう1つは `gmail.com` です。この場合、`john-smith.com` がメールを読むようなスクリプトは望まないでしょう。

[cut]

## 同一オリジン(Same Origin)

同じプロトコル、ドメインとポートを持つ場合、2つの URL は "同一オリジン" 言われます。

これらの URL はすべて同じオリジンです:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

これらは違います:

- <code>http://<b>www.</b>site.com</code> (別のドメイン: `www.` のため)
- <code>http://<b>site.org</b></code> (別のドメイン: `.org` のため)
- <code><b>https://</b>site.com</code> (別のプロトコル: `https`)
- <code>http://site.com:<b>8080</b></code> (別のポート: `8080`)

"同一オリジン" ポリシーは次のようになります:

- 別のウィンドウへの参照があり(e.g. `window.open` によって作られたポップアップ、あるいは `<iframe>` 内のウィンドウ)、そのウィンドウが同一オリジンから来ている場合は、そのウィンドウへのへのフルアクセスを持ちます。
- そうではなく、別のオリジンから来たものである場合、そのウィンドウの内容にアクセスすることはできません。: 変数、ドキュメント、その他すべて。唯一の例外は `location` です: それは変えることができます(結果、ユーザをリダイレクトします)。しかし、location を *読む* ことはできません(したがって、ユーザが今どこにいるのかを知ることはできず、情報が漏れることはありません)。

それでは、いくつか例を見てみましょう。まず、同じオリジンから来て、"同一オリジン" ポリシーに衝突しないページを見ます。その後、"同一オリジン" ポリシーを回避することができる、ウィンドウ間のメッセージングについて説明します。

````warn header="サブドメインは同一オリジンの場合があります"
"同一オリジン" ポリシーには、小さな例外があります。

ウィンドウが同じ第2レベルのドメインを共有している場合、例えば `john.site.com`, `peter.site.com` と `site.com` (これらの共通の第２レベルのドメインは `site.com` です)、これらは "同一オリジン" から来ているものとして扱う事ができます。

それを機能させるためには、このようなすべてのページ(`site.com` からのものも含む)は、次のコードを実行する必要があります:

```js
document.domain = 'site.com';
```

これだけです。これで制限なしにやり取りすることができます。繰り返しますが、これは同じ第2レベルのどマインをもつページでのみ可能です。
````

## iframe のコンテンツにアクセスする

最初の例では iframe を説明します。`<iframe>` は二面のある獣です。それは `<script>` あるいは `<img>` と同じような単なるタグである一方、ウィンドウ内のウィンドウです。

埋め込みのウィンドウは別の `document` と `window` オブジェクトを持ちます。

プロパティを使って、それらにアクセスできます。:

- `iframe.contentWindow` は `<iframe>` 内のウィンドウへの参照です。
- `iframe.contentDocument` は `<iframe>` 内のドキュメントへの参照です。

埋め込みのウィンドウへアクセスする際、ブラウザは iframe が同一オリジンかをチェックします。もし同一でない場合、アクセスは拒否されます(上で述べた例外を除く)。

例えば、これは別のオリジンの `<iframe>` です。:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 内部のウィンドウへの参照を取得できます
    let iframeWindow = iframe.contentWindow;

    try {
      // ...が、その中のドキュメントは取得できません
      let doc = iframe.contentDocument;
    } catch(e) {
      alert(e); // セキュリティエラー(別オリジン)
    }

    // その中のページの URL を見ることもできません
    try {
      alert(iframe.contentWindow.location);
    } catch(e) {
      alert(e); // セキュリティエラー
    }

    // ...しかし、変更(し、iframe 内になにかをロード)することはできます!
    iframe.contentWindow.location = '/'; // 動作します

    iframe.onload = null; // 一度だけ実行させるためにハンドラをクリア
  };
</script>
```

上のコードは、以下を除く操作に対してエラーを表示します。:

- 内部のウィンドウ `iframe.contentWindow` への参照を取得する
- その `location` を変更する

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
`iframe.onload` イベントは実際には `iframe.contentWindow.onload` と同じです。これは埋め込みウィンドウがすべてのリソース含め完全に読み込まれた時にトリガーされます。

...しかし、`iframe.onload` は常に利用可能な一方、`iframe.contentWindow.onload` は同一オリジンである必要があります。
```

そして、これは同一オリジンの例です。埋め込みウィンドウでなんでもできます。:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // なんでもできます
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

### iframe がロードされるまで待ってください

iframe が作成されると、すぐにドキュメントを持ちます。しかし、そのドキュメントは最終的にそこにロードされるものとは異なります!

ここで見てください:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // ロードされたドキュメントは初期のものとは同じではありません!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

これは実際に、開発者の間でよく知られた落とし穴です。それは *間違ったドキュメント* なので、すぐにドキュメントを使った処理をするべきではありません。もしそこに任意のイベントハンドラを設定しても無視されます。

...しかし、`onload` イベントはすべてのリソースを含む iframe 全体がロードされたときにトリガーされます。仮により早く、埋め込みドキュメントの `DOMContentLoaded` でなにかしたい場合どうすればよいでしょうか？

iframe が別のオリジンから来ている場合は不可能です。しかし、同一オリジンの場合は、次のように新しいドキュメントが現れる瞬間を捉えて、必要なハンドラの設定を試みることができます。:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // every 100 ms check if the document is the new one
  let timer = setInterval(() => {
    if (iframe.contentDocument == oldDoc) return;

    // new document, let's set handlers
    iframe.contentDocument.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument.body.prepend('Hello, world!');
    });

    clearInterval(timer); // cancel setInterval, don't need it any more
  }, 100);
</script>
```

Let me know in comments if you know a better solution here.

## window.frames

An alternative way to get a window object for `<iframe>` -- is to get it from the named collection  `window.frames`:

- By number: `window.frames[0]` -- the window object for the first frame in the document.
- By name: `window.frames.iframeName` -- the window object for the frame with  `name="iframeName"`.

For instance:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

An iframe may have other iframes inside. The corresponding `window` objects form a hierarchy.

Navigation links are:

- `window.frames` -- the collection of "children" windows (for nested frames).
- `window.parent` -- the reference to the "parent" (outer) window.
- `window.top` -- the reference to the topmost parent window.

For instance:

```js run
window.frames[0].parent === window; // true
```

We can use the `top` property to check if the current document is open inside a frame or not:

```js run
if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## The sandbox attribute

The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.

By default, for `<iframe sandbox src="...">` the "default set" of restrictions is applied to the iframe. But we can provide a space-separated list of "excluded" limitations as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`. The listed limitations are not applied.

In other words, an empty `"sandbox"` attribute puts the strictest limitations possible, but we can put a space-delimited list of those that we want to lift.

Here's a list of limitations:

`allow-same-origin`
: By default `"sandbox"` forces the "different origin" policy for the iframe. In other words, it makes the browser to treat the `iframe` as coming from another origin, even if its `src` points to the same site. With all implied restrictions for scripts. This option removes that feature.

`allow-top-navigation`
: Allows the `iframe` to change `parent.location`.

`allow-forms`
: Allows to submit forms from `iframe`.

`allow-scripts`
: Allows to run scripts from the `iframe`.

`allow-popups`
: Allows to `window.open` popups from the `iframe`

See [the manual](mdn:/HTML/Element/iframe) for more.

The example below demonstrates a sandboxed iframe with the default set of restrictions: `<iframe sandbox src="...">`. It has some JavaScript and a form.

Please note that nothing works. So the default set is really harsh:

[codetabs src="sandbox" height=140]


```smart
The purpose of the `"sandbox"` attribute is only to *add more* restrictions. It cannot remove them. In particular, it can't relax same-origin restrictions if the iframe comes from another origin.
```

## Cross-window messaging

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding Javascript functions. That makes it safe for users.

The interface has two parts.

### postMessage

The window that wants to send a message calls [postMessage](mdn:api/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call  `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: The data to send. Can be any object, the data is cloned using the "structured cloning algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`
: Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read it's `location`. So we can't be sure which site is open in the intended window right now: the user could navigate away.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at that site. Good when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

If we don't want that check, we can set `targetOrigin` to `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`
: The data from `postMessage`.

`origin`
: The origin of the sender, for instance `http://javascript.info`.

`source`
: The reference to the sender window. We can immediately `postMessage` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here's an example:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // something from an unknown domain, let's ignore it
    return;
  }

  alert( "received: " + event.data );
});
```

The full example:

[codetabs src="postmessage" height=120]

```smart header="There's no delay"
There's totally no delay between `postMessage` and the `message` event. That happens synchronously, even faster than `setTimeout(...,0)`.
```

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have two properties:
- `window.open` -- opens a new window and returns a reference to it,
- `window.opener` -- a reference to the opener window from a popup

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the location of another window (write-only access).
- Post a message to it.


Exclusions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows to talk with security checks:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the URL from  `targetWin` site.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.