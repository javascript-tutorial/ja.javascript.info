# ウィンドウを跨いだやり取り

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
"同一オリジン" (同一サイト) ポリシーは、ウィンドウとフレームのアクセスを互いに制限します。

2つのウィンドウが開いているとします: 1つは `john-smith.com`、もう1つは `gmail.com` です。この場合、`john-smith.com` がメールを読むようなスクリプトは望まないでしょう。

[cut]
=======
The "Same Origin" (same site) policy limits access of windows and frames to each other.

The idea is that if a user has two pages open: one from `john-smith.com`, and another one is `gmail.com`, then they wouldn't want a script from `john-smith.com` to read our mail from `gmail.com`. So, the purpose of the "Same Origin" policy is to protect users from information theft.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

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

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
"同一オリジン" ポリシーは次のようになります:

- 別のウィンドウへの参照があり(e.g. `window.open` によって作られたポップアップ、あるいは `<iframe>` 内のウィンドウ)、そのウィンドウが同一オリジンから来ている場合は、そのウィンドウへのへのフルアクセスを持ちます。
- そうではなく、別のオリジンから来たものである場合、そのウィンドウの内容にアクセスすることはできません。: 変数、ドキュメント、その他すべて。唯一の例外は `location` です: それは変えることができます(結果、ユーザをリダイレクトします)。しかし、location を *読む* ことはできません(したがって、ユーザが今どこにいるのかを知ることはできず、情報が漏れることはありません)。

それでは、いくつか例を見てみましょう。まず、同じオリジンから来て、"同一オリジン" ポリシーに衝突しないページを見ます。その後、"同一オリジン" ポリシーを回避することができる、ウィンドウ間のメッセージングについて説明します。

````warn header="サブドメインは同一オリジンの場合があります"
"同一オリジン" ポリシーには、小さな例外があります。

ウィンドウが同じ第2レベルのドメインを共有している場合、例えば `john.site.com`, `peter.site.com` と `site.com` (これらの共通の第２レベルのドメインは `site.com` です)、これらは "同一オリジン" から来ているものとして扱う事ができます。

それを機能させるためには、このようなすべてのページ(`site.com` からのものも含む)は、次のコードを実行する必要があります:
=======
The "Same Origin" policy states that:

- if we have a reference to another window, e.g. a popup created by `window.open` or a window inside `<iframe>`, and that window comes from the same origin, then we have full access to that window.
- otherwise, if it comes from another origin, then we can't access the content of that window: variables, document, anything. The only exception is `location`: we can change it (thus redirecting the user). But we cannot *read* location (so we can't see where the user is now, no information leak).

Now let's see some examples. First, we'll look at pages that come from the same origin and do not conflict with the "Same Origin" policy, and afterwards we'll cover cross-window messaging that allows to work around the "Same Origin" policy.


````warn header="Subdomains may be same-origin"
There's a small exclusion in the "Same Origin" policy.

If windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), they can be treated as coming from the "same origin".

To make it work, all such pages (including the one from `site.com`) should run the code:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

```js
document.domain = 'site.com';
```

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
これだけです。これで制限なしにやり取りすることができます。繰り返しますが、これは同じ第2レベルのどマインをもつページでのみ可能です。
=======
That's all. Now they can interact without limitations. Again, that's only possible for pages with the same second-level domain.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md
````

## iframe のコンテンツにアクセスする

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
最初の例では iframe を説明します。`<iframe>` は二面のある獣です。それは `<script>` あるいは `<img>` と同じような単なるタグである一方、ウィンドウ内のウィンドウです。
=======
Our first example covers iframes. An `<iframe>` is a two-faced beast. From one side it's a tag, just like `<script>` or `<img>`. From the other side it's a window-in-window.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

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

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
これは実際に、開発者の間でよく知られた落とし穴です。それは *間違ったドキュメント* なので、すぐにドキュメントを使った処理をするべきではありません。もしそこに任意のイベントハンドラを設定しても無視されます。
=======
That's actually a well-known pitfall for developers. We shouldn't work with the document immediately, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

...しかし、`onload` イベントはすべてのリソースを含む iframe 全体がロードされたときにトリガーされます。仮により早く、埋め込みドキュメントの `DOMContentLoaded` でなにかしたい場合どうすればよいでしょうか？

iframe が別のオリジンから来ている場合は不可能です。しかし、同一オリジンの場合は、次のように新しいドキュメントが現れる瞬間を捉えて、必要なハンドラの設定を試みることができます。:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // ドキュメントが新しいものか 100ms 毎にチェック
  let timer = setInterval(() => {
    if (iframe.contentDocument == oldDoc) return;

    // 新しいドキュメントなので、ハンドラをセットします
    iframe.contentDocument.addEventListener('DOMContentLoaded', () => {
      iframe.contentDocument.body.prepend('Hello, world!');
    });

    clearInterval(timer); // もう必要ないので setInterval をクリアします
  }, 100);
</script>
```

より良い方法を知っていたらコメントで教えてください。

## window.frames

`<iframe>` のウィンドウオブジェクトを取得する別の方法は、名前付けされたコレクション `window.frames` から取得することです。

- 数値で: `window.frames[0]` -- ドキュメントの1つ目のフレームのウィンドウオブジェクトです。
- 名前で: `window.frames.iframeName` -- `name="iframeName"` を持つフレームのウィンドウオブジェクトです。

例:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

iframe は内側に別の iframe を持つ場合があります。対応する `window` オブジェクトを階層を形成します。

ナビゲーションリンクは次のようになります:

- `window.frames` -- "子" のウィンドウのコレクション(ネストされたフレーム用)
- `window.parent` -- "親" (外部の)ウィンドウへの参照
- `window.top` -- 一番上ののウィンドウへの参照

例:

```js run
window.frames[0].parent === window; // true
```

現在のドキュメントがフレームの中で開かれているかどうかを確認するのに、`top` プロパティが使えます。:

```js run
if (window == top) { // current window == window.top?
  alert('The script is in the topmost window, not in a frame');
} else {
  alert('The script runs in a frame!');
}
```

## The sandbox attribute

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
`sandbox` 属性は、信頼できないコードが実行されるのを防ぐため、`<iframe>` 内の特定のアクションを除外することができます。それらを別のオリジンからくるものとして扱うことによって、または他の制限を適用することによって、iframeを "サンドボックス化" します。
=======
The `sandbox` attribute allows for the exclusion of certain actions inside an `<iframe>` in order to prevent it executing untrusted code. It "sandboxes" the iframe by treating it as coming from another origin and/or applying other limitations.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

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

[codetabs src="sandbox" height=140]


```smart
`"sandbox"` 属性の目的は、制限を *追加* することだけです。それらを削除することはできません。特に、iframe が別オリジンから来たときに、同一オリジン制限を緩めることはできません。
```

## ウィンドウを跨いだメッセージング

`postMessage` インタフェースはどのオリジンから来ていたとしても、ウィンドウ同士がやり取りするのを可能にします。

したがって、これは "同一オリジン" ポリシーの回避策です。これは `john-smith.com` からのウィンドウが `gmail.com` とやり取りし、情報を交換することを可能にしますが、両者が合意し、対応する JavaScript 関数を呼び出したときだけです。これは利用者にとっては安全です。

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
インタフェースは２つのパートがあります:
=======
So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.

The interface has two parts.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

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

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

チェックしたくない場合は、`targetOrigin` に `*` を設定します。

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

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // 未知のドメインからの場合は無視しましょう
    return;
  }

  alert( "received: " + event.data );
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

<<<<<<< HEAD:4-frames-and-windows/03-cross-window-communication/article.md
除外については、次の通りです:
- 同じ第2階層のドメインを共有しているウィンドウ: `a.site.com` と `b.site.com`。そして、両方に `document.domain='site.com` を設定することで、それらを "同一オリジン" の状態にします。
- iframe が `sandbox` 属性を持っている場合、属性値に `allow-same-origin` が指定されていない限り、強制的に "異なるオリジン" の状態に置かれます。これは同一サイトからの iframe 内で信頼されていないコードを実行するのに使われます。
=======

Exclusions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847:3-frames-and-windows/03-cross-window-communication/article.md

`postMessage` インタフェースで、2つのウィンドウ間でセキュリティチェックを含むやり取りが可能です。

1. 送信側は `targetWin.postMessage(data, targetOrigin)` を呼び出します。
2. `targetOrigin` が `'*'` でない場合、ブラウザはウィンドウ `targetWin` が `targetWin` サイトからの URL かどうかをチェックします。
3. その場合、`targetWin` は特別なプロパティを持つ `message` イベントをトリガーします:
    - `origin` -- 送信側のウィンドウのオリジン(`http://my.site.com` など)
    - `source` -- 送信側のウィンドウへの参照
    - `data` -- データ。任意のオブジェクト。IEだけは文字列のみをサポートします。

    ターゲットウィンドウ内でこのイベントのハンドラを設定するには、`addEventListener` を使用する必要があります。
