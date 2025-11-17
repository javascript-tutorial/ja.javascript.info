<<<<<<< HEAD
# ウィンドウを跨いだやり取り

"同一オリジン" (同一サイト) ポリシーは、ウィンドウとフレームのアクセスを互いに制限します。

2つのウィンドウが開いているとします: 1つは `john-smith.com`、もう1つは `gmail.com` です。この場合、`john-smith.com` がメールを読むようなスクリプトは望まないでしょう。

[cut]

## 同一オリジン(Same Origin)

同じプロトコル、ドメインとポートを持つ場合、2つの URL は "同一オリジン" 言われます。

これらの URL はすべて同じオリジンです:
=======
# Cross-window communication

The "Same Origin" (same site) policy limits access of windows and frames to each other.

The idea is that if a user has two pages open: one from `john-smith.com`, and another one is `gmail.com`, then they wouldn't want a script from `john-smith.com` to read our mail from `gmail.com`. So, the purpose of the "Same Origin" policy is to protect users from information theft.

## Same Origin [#same-origin]

Two URLs are said to have the "same origin" if they have the same protocol, domain and port.

These URLs all share the same origin:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

<<<<<<< HEAD
これらは違います:

- <code>http://<b>www.</b>site.com</code> (別のドメイン: `www.` のため)
- <code>http://<b>site.org</b></code> (別のドメイン: `.org` のため)
- <code><b>https://</b>site.com</code> (別のプロトコル: `https`)
- <code>http://site.com:<b>8080</b></code> (別のポート: `8080`)

"同一オリジン" ポリシーは次のようになります:

- 別のウィンドウへの参照があり(e.g. `window.open` によって作られたポップアップ、あるいは `<iframe>` 内のウィンドウ)、そのウィンドウが同一オリジンから来ている場合は、そのウィンドウへのフルアクセスを持ちます。
- そうではなく、別のオリジンから来たものである場合、そのウィンドウの内容にアクセスすることはできません。: 変数、ドキュメント、その他すべて。唯一の例外は `location` です: それは変えることができます(結果、ユーザをリダイレクトします)。しかし、location を *読む* ことはできません(したがって、ユーザが今どこにいるのかを知ることはできず、情報が漏れることはありません)。

それでは、いくつか例を見てみましょう。まず、同じオリジンから来て、"同一オリジン" ポリシーに衝突しないページを見ます。その後、"同一オリジン" ポリシーを回避することができる、ウィンドウ間のメッセージングについて説明します。

````warn header="サブドメインは同一オリジンの場合があります"
"同一オリジン" ポリシーには、小さな例外があります。

ウィンドウが同じ第2レベルのドメインを共有している場合、例えば `john.site.com`, `peter.site.com` と `site.com` (これらの共通の第２レベルのドメインは `site.com` です)、これらは "同一オリジン" から来ているものとして扱う事ができます。

それを機能させるためには、このようなすべてのページ(`site.com` からのものも含む)は、次のコードを実行する必要があります:

```js
document.domain = 'site.com';
```

これだけです。これで制限なしにやり取りすることができます。繰り返しますが、これは同じ第2レベルのドメインをもつページでのみ可能です。
````

## iframe のコンテンツにアクセスする

最初の例では iframe を説明します。`<iframe>` は二面のある獣です。それは `<script>` あるいは `<img>` と同じような単なるタグである一方、ウィンドウ内のウィンドウです。

埋め込みのウィンドウは別の `document` と `window` オブジェクトを持ちます。

プロパティを使って、それらにアクセスできます。:

- `iframe.contentWindow` は `<iframe>` 内のウィンドウへの参照です。
- `iframe.contentDocument` は `<iframe>` 内のドキュメントへの参照です。

埋め込みのウィンドウへアクセスする際、ブラウザは iframe が同一オリジンかをチェックします。もし同一でない場合、アクセスは拒否されます(上で述べた例外を除く)。

例えば、これは別のオリジンの `<iframe>` です。:
=======
These ones do not:

- <code>http://<b>www.</b>site.com</code> (another domain: `www.` matters)
- <code>http://<b>site.org</b></code> (another domain: `.org` matters)
- <code><b>https://</b>site.com</code> (another protocol: `https`)
- <code>http://site.com:<b>8080</b></code> (another port: `8080`)

The "Same Origin" policy states that:

- if we have a reference to another window, e.g. a popup created by `window.open` or a window inside `<iframe>`, and that window comes from the same origin, then we have full access to that window.
- otherwise, if it comes from another origin, then we can't access the content of that window: variables, document, anything. The only exception is `location`: we can change it (thus redirecting the user). But we cannot *read* location (so we can't see where the user is now, no information leak).

### In action: iframe

An `<iframe>` tag hosts a separate embedded window, with its own separate `document` and `window` objects.

We can access them using properties:

- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that's not so then the access is denied (writing to `location` is an exception, it's still permitted).

For instance, let's try reading and writing to `<iframe>` from another origin:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
<<<<<<< HEAD
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
=======
    // we can get the reference to the inner window
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...but not to the document inside it
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error (another origin)
    }

    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Security Error
    }

    // ...we can WRITE into location (and thus load something else into the iframe)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // clear the handler, not to run it after the location change
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  };
</script>
```

<<<<<<< HEAD
上のコードは、以下を除く操作に対してエラーを表示します。:

- 内部のウィンドウ `iframe.contentWindow` への参照を取得する
- その `location` を変更する

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
`iframe.onload` イベントは実際には `iframe.contentWindow.onload` と同じです。これは埋め込みウィンドウがすべてのリソース含め完全に読み込まれた時にトリガーされます。

...しかし、`iframe.onload` は常に利用可能な一方、`iframe.contentWindow.onload` は同一オリジンである必要があります。
```

そして、これは同一オリジンの例です。埋め込みウィンドウでなんでもできます。:

```html run
=======
The code above shows errors for any operations except:

- Getting the reference to the inner window `iframe.contentWindow` - that's allowed.
- Writing to `location`.

Contrary to that, if the `<iframe>` has the same origin, we can do anything with it:

```html run
<!-- iframe from the same site -->
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
<<<<<<< HEAD
    // なんでもできます
=======
    // just do anything
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

<<<<<<< HEAD
### iframe がロードされるまで待ってください

iframe が作成されると、すぐにドキュメントを持ちます。しかし、そのドキュメントは最終的にそこにロードされるものとは異なります!

ここで見てください:
=======
```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
The `iframe.onload` event (on the `<iframe>` tag) is essentially the same as `iframe.contentWindow.onload` (on the embedded window object). It triggers when the embedded window fully loads with all resources.

...But we can't access `iframe.contentWindow.onload` for an iframe from another origin, so using `iframe.onload`.
```

## Windows on subdomains: document.domain

By definition, two URLs with different domains have different origins.

But if windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), we can make the browser ignore that difference, so that they can be treated as coming from the "same origin" for the purposes of cross-window communication.

To make it work, each such window should run the code:

```js
document.domain = 'site.com';
```

That's all. Now they can interact without limitations. Again, that's only possible for pages with the same second-level domain.

```warn header="Deprecated, but still working"
The `document.domain` property is in the process of being removed from the [specification](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction). The cross-window messaging (explained soon below) is the suggested replacement.

That said, as of now all browsers support it. And the support will be kept for the future, not to break old code that relies on `document.domain`.
```


## Iframe: wrong document pitfall

When an iframe comes from the same origin, and we may access its  `document`, there's a pitfall. It's not related to cross-origin things, but important to know.

Upon its creation an iframe immediately has a document. But that document is different from the one that loads into it!

So if we do something with the document immediately, that will probably be lost.

Here, look:

>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
<<<<<<< HEAD
    // ロードされたドキュメントは初期のものとは同じではありません!
=======
    // the loaded document is not the same as initial!
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

<<<<<<< HEAD
これは実際に、開発者の間でよく知られた落とし穴です。それは *間違ったドキュメント* なので、すぐにドキュメントを使った処理をするべきではありません。もしそこに任意のイベントハンドラを設定しても無視されます。

...しかし、`onload` イベントはすべてのリソースを含む iframe 全体がロードされたときにトリガーされます。仮により早く、埋め込みドキュメントの `DOMContentLoaded` でなにかしたい場合どうすればよいでしょうか？

iframe が別のオリジンから来ている場合は不可能です。しかし、同一オリジンの場合は、次のように新しいドキュメントが現れる瞬間を捉えて、必要なハンドラの設定を試みることができます。:
=======
We shouldn't work with the document of a not-yet-loaded iframe, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.

How to detect the moment when the document is there?

The right document is definitely at place when `iframe.onload`  triggers. But it only triggers when the whole iframe with all resources is loaded.

We can try to catch the moment earlier using checks in `setInterval`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

<<<<<<< HEAD
  // ドキュメントが新しいものか 100ms 毎にチェック
  let timer = setInterval(() => {
    if (iframe.contentDocument == oldDoc) return;

    // 新しいドキュメントなので、ハンドラをセットします
    iframe.contentDocument.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument.body.prepend('Hello, world!');
    });

    clearInterval(timer); // もう必要ないので setInterval をクリアします
=======
  // every 100 ms check if the document is the new one
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("New document is here!");

    clearInterval(timer); // cancel setInterval, don't need it any more
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
  }, 100);
</script>
```

<<<<<<< HEAD
より良い方法を知っていたらコメントで教えてください。

## window.frames

`<iframe>` のウィンドウオブジェクトを取得する別の方法は、名前付けされたコレクション `window.frames` から取得することです。

- 数値で: `window.frames[0]` -- ドキュメントの1つ目のフレームのウィンドウオブジェクトです。
- 名前で: `window.frames.iframeName` -- `name="iframeName"` を持つフレームのウィンドウオブジェクトです。

例:
=======
## Collection: window.frames

An alternative way to get a window object for `<iframe>` -- is to get it from the named collection  `window.frames`:

- By number: `window.frames[0]` -- the window object for the first frame in the document.
- By name: `window.frames.iframeName` -- the window object for the frame with  `name="iframeName"`.

For instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

<<<<<<< HEAD
iframe は内側に別の iframe を持つ場合があります。対応する `window` オブジェクトを階層を形成します。

ナビゲーションリンクは次のようになります:

- `window.frames` -- "子" のウィンドウのコレクション(ネストされたフレーム用)
- `window.parent` -- "親" (外部の)ウィンドウへの参照
- `window.top` -- 一番上のウィンドウへの参照

例:
=======
An iframe may have other iframes inside. The corresponding `window` objects form a hierarchy.

Navigation links are:

- `window.frames` -- the collection of "children" windows (for nested frames).
- `window.parent` -- the reference to the "parent" (outer) window.
- `window.top` -- the reference to the topmost parent window.

For instance:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
window.frames[0].parent === window; // true
```

<<<<<<< HEAD
現在のドキュメントがフレームの中で開かれているかどうかを確認するのに、`top` プロパティが使えます。:
=======
We can use the `top` property to check if the current document is open inside a frame or not:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js run
if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

<<<<<<< HEAD
## The sandbox attribute

`sandbox` 属性は、信頼できないコードが実行されるのを防ぐため、`<iframe>` 内の特定のアクションを除外することができます。それらを別のオリジンからくるものとして扱うことによって、または他の制限を適用することによって、iframeを "サンドボックス化" します。

デフォルトでは、`<iframe sandbox src="...">` に対しては、"デフォルトセット" の制限が iframe に適用されます。しかし、`<iframe sandbox="allow-forms allow-popups">` のように、属性の値に "除外された" 制限のリストをスペース区切りで指定することもできます。この場合、列挙されている制限は適用されません。

つまり、空の `"sandbox"` 属性は最も厳しい制限にすることを意味し、そこから除外したいもののリストをスペース区切りで指定することができます。

ここは制限の一覧です:

`allow-same-origin`
: デフォルトでは、`"sandbox"` は iframe に対し、"異なるオリジン" ポリシーを矯正します。つまり、ブラウザはたとえ iframe の `src` が同じサイトを指していたとしても、`iframe` を別のオリジンから来たものとして扱います。スクリプトに対するすべての暗黙の制限を持ちます。このオプションはこの機能を削除します。

`allow-top-navigation`
: `iframe` が `parent.location` を変更するのを許可します。

`allow-forms`
: `iframe` からフォームを送信するのを許可します。

`allow-scripts`
: `iframe` からスクリプトを実行するのを許可します。

`allow-popups`
: `iframe` から `window.open` するのを許可します。

その他については、[マニュアル](mdn:/HTML/Element/iframe) を参照してください。

下の例は、制限のデフォルトセットが適用された、サンドボックス化された iframe のデモです: `<iframe sandbox src="...">`。そこんはいくつかの JavaScript とフォームがあります。

何も動作しないことに注目してください。デフォルトセットは本当に厳しいです。:
=======
## The "sandbox" iframe attribute

The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.

There's a "default set" of restrictions applied for `<iframe sandbox src="...">`. But it can be relaxed if we provide a space-separated list of restrictions that should not be applied as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`.

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
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

[codetabs src="sandbox" height=140]


```smart
<<<<<<< HEAD
`"sandbox"` 属性の目的は、制限を *追加* することだけです。それらを削除することはできません。特に、iframe が別オリジンから来たときに、同一オリジン制限を緩めることはできません。
```

## ウィンドウを跨いだメッセージング

`postMessage` インタフェースはどのオリジンから来ていたとしても、ウィンドウ同士がやり取りするのを可能にします。

したがって、これは "同一オリジン" ポリシーの回避策です。これは `john-smith.com` からのウィンドウが `gmail.com` とやり取りし、情報を交換することを可能にしますが、両者が合意し、対応する JavaScript 関数を呼び出したときだけです。これは利用者にとっては安全です。

インタフェースは２つのパートがあります:

### postMessage

メッセージを送りたいウィンドウは、受け取るウィンドウの [postMessage](mdn:api/Window.postMessage)] メソッドを呼び出します。つまり、`win` にメッセージを送りたい場合、`win.postMessage(data, targetOrigin)` を呼び出す必要があります。

引数:

`data`
: 送るデータ。任意のオブジェクトが指定可能で、データは "structured cloning algorithm" を利用して複製されます。IE は文字列のみをサポートしているので、IEをサポートする場合は、複雑なオブジェクトには `JSON.stringify` が必要です。

`targetOrigin`
: 指定されたオリジンのウィンドウだけがメッセージを受け取るように、ターゲットウィンドウのオリジンを指定します。

`targetOrigin` は安全対策です。思い出してください、ターゲットウィンドウが別のオリジンから来た場合、その `location` を読むことはできません。そのため、今どのサイトが意図したウィンドウで開かれているかを判断することはできません。

`targetOrigin` を指定すると、ウィンドウがまだそのサイトを表示している場合にのみウィンドウがデータを受け取るようになります。機密性が高いデータの場合に適しています。

例えば、ここでは `win` は、オリジン `http://example.com` からのドキュメントを持っている場合にのみ、メッセージを受け取ります。
=======
The purpose of the `"sandbox"` attribute is only to *add more* restrictions. It cannot remove them. In particular, it can't relax same-origin restrictions if the iframe comes from another origin.
```

## Cross-window messaging

The `postMessage` interface allows windows to talk to each other no matter which origin they are from.

So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.

The interface has two parts.

### postMessage

The window that wants to send a message calls [postMessage](mdn:api/Window.postMessage) method of the receiving window. In other words, if we want to send the message to `win`, we should call  `win.postMessage(data, targetOrigin)`.

Arguments:

`data`
: The data to send. Can be any object, the data is cloned using the "structured serialization algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.

`targetOrigin`
: Specifies the origin for the target window, so that only a window from the given origin will get the message.

The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read its `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at the right site. Important when the data is sensitive.

For instance, here `win` will only receive the message if it has a document from the origin `http://example.com`:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

<<<<<<< HEAD
チェックしたくない場合は、`targetOrigin` に `*` を設定します。
=======
If we don't want that check, we can set `targetOrigin` to `*`.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

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

<<<<<<< HEAD
メッセージを受け取るためには、ターゲットウィンドウは `message` イベントのハンドラが必要です。これは `postMessage` が呼び出され(そして `targetOrigin` チェックが成功した)ときに実行されます。

イベントオブジェクトは特別なプロパティを持っています:

`data`
: `postMessage` からのデータ。

`origin`
: 送信側のオリジン。例えば `http://javascript.info`。

`source`
: 送信側のウィンドウへの参照。必要ならすぐに `postMessage` を返すことができます。

ハンドラを割り当てるには、`addEventListener` を使う必要があります。短縮構文 `window.onmessage` は動作しません。

例です:
=======
To receive a message, the target window should have a handler on the `message` event. It triggers when `postMessage` is called (and `targetOrigin` check is successful).

The event object has special properties:

`data`
: The data from `postMessage`.

`origin`
: The origin of the sender, for instance `http://javascript.info`.

`source`
: The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.

To assign that handler, we should use `addEventListener`, a short syntax `window.onmessage` does not work.

Here's an example:
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
<<<<<<< HEAD
    // 未知のドメインからの場合は無視しましょう
=======
    // something from an unknown domain, let's ignore it
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
    return;
  }

  alert( "received: " + event.data );
<<<<<<< HEAD
});
```

完全な例です:

[codetabs src="postmessage" height=120]

```smart header="遅延はありません"
`postMessage` と `message` イベントの間には遅延はまったくありません。それらは同期的に発生し、`setTimeout(...,0)` よりも高速です。
```

## サマリ

メソッドを呼びだし、別ウィンドウのコンテンツにアクセスするには、最初にその参照が必要です。

ポップアップの場合、2つのプロパティがあります:
- `window.open` -- 新しいウィンドウを開き、そこへの参照を返します。
- `window.opener` -- ポップアップから見た、ポップアップを開いたウィンドウへの参照です。

iframe の場合、次のようにして親/子のウィンドウにアクセスできます:
- `window.frames` -- ネストされたウィンドウオブジェクトの集合です。
- `window.parent`, `window.top` や親や最上位のウィンドウへの参照です。
- `iframe.contentWindow` は `<iframe>` タグ内のウィンドウです。

もしウィンドウが同一オリジンを共有している場合(ホスト、ポート、プロトコル)、ウィンドウは互いになんでもできます。

そうでない場合、できることは次のものだけです:
- 別ウィンドウの location の変更(書き込みのみのアクセス)。
- そこへのメッセージの送信。

除外については、次の通りです:
- 同じ第2階層のドメインを共有しているウィンドウ: `a.site.com` と `b.site.com`。そして、両方に `document.domain='site.com` を設定することで、それらを "同一オリジン" の状態にします。
- iframe が `sandbox` 属性を持っている場合、属性値に `allow-same-origin` が指定されていない限り、強制的に "異なるオリジン" の状態に置かれます。これは同一サイトからの iframe 内で信頼されていないコードを実行するのに使われます。

`postMessage` インタフェースで、2つのウィンドウ間でセキュリティチェックを含むやり取りが可能です。

1. 送信側は `targetWin.postMessage(data, targetOrigin)` を呼び出します。
2. `targetOrigin` が `'*'` でない場合、ブラウザはウィンドウ `targetWin` が `targetWin` サイトからの URL かどうかをチェックします。
3. その場合、`targetWin` は特別なプロパティを持つ `message` イベントをトリガーします:
    - `origin` -- 送信側のウィンドウのオリジン(`http://my.site.com` など)
    - `source` -- 送信側のウィンドウへの参照
    - `data` -- データ。任意のオブジェクト。IEだけは文字列のみをサポートします。

    ターゲットウィンドウ内でこのイベントのハンドラを設定するには、`addEventListener` を使用する必要があります。
=======

  // can message back using event.source.postMessage(...)
});
```

The full example:

[codetabs src="postmessage" height=120]

## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.

For iframes, we can access parent/children windows using:
- `window.frames` -- a collection of nested window objects,
- `window.parent`, `window.top` are the references to parent and top windows,
- `iframe.contentWindow` is the window inside an `<iframe>` tag.

If windows share the same origin (host, port, protocol), then windows can do whatever they want with each other.

Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.

    We should use `addEventListener` to set the handler for this event inside the target window.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
