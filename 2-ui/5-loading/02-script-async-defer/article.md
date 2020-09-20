
# スクリプト: async, defer

最近の web サイトでは、スクリプトは HTML よりも "重い" ことがしばしばです: ダウンロードサイズはより大きく、処理時間も長くなります。

ブラウザが HTML をロードし、`<script>...</script>` タグに遭遇すると、DOM の構築を続けることはできません。すぐにスクリプトを実行する必要があります。外部スクリプト `<script src="..."></script>` についても同じです: ブラウザはスクリプトをダウンロードし、それを実行するまで待つ必要があり、その後にページの残り部分の処理をすることになります。

これは2つの重要な問題につながります:

1. スクリプトは、それ以降の DOM要素は認識することができないため、ハンドラーを追加したりすることはできません。
2. ページの先頭に重いスクリプトがあると、"ページをブロック" します。利用者はそれがダウンロードされ実行されるまでページコンテンツを見ることができません:

```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- スクリプトがロードされるまで表示されません -->
<p>...content after script...</p>
```

回避策はいくつかあります。例えば、ページの末尾にスクリプトを置きます。すると要素を表示でき、ページコンテンツの表示をブロックしません:

```html run
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

ですが、この方法は完璧には程遠いです。例えば、ブラウザが完全なHTMLドキュメントをダウンロードした後にのみスクリプトに気づき（、ダウロードが開始でき）ます。HTML ドキュメントが長いと、かなりの遅延になる可能性があります。

このようなことは、十分に早い接続を使用している人々には見えませんが、世界中の多くの人は依然として低速のインターネットを利用しており、完璧とはほど遠いモバイルインターネット接続を使用しています。

幸いなことに、この問題を解決する2つの `<script>` 属性があります: `defer` と `async` です。

## defer

`defer` 属性はブラウザにスクリプトを待たないよう指示します。代わりに、ブラウザは HTML の処理を継続し、DOM を構築します。スクリプトは "バックグラウンド" でロードされ、DOM が完全に構築されたときに実行されます。

これは上記と同じ例ですが、`defer` を指定しています:

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- すぐに表示されます -->
<p>...content after script...</p>
```

つまり:

- `defer` をもつスクリプトはページをブロックしません。
- `defer` をもつスクリプトは常に DOM は準備できた(ただし、`DOMContentLoaded` イベントの前です)ときに実行されます。

次の例は2つ目の部分の例です:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

1. ページコンテンツはすぐに表示されます。
2. `DOMContentLoaded` イベントハンドラは遅延スクリプトを待ちます。スクリプトがダウンロードされ実行されたときに実行されます。

**遅延スクリプトは通常のスクリプトのように、相対的な順序を維持します。**

2つの遅延スクリプトがあるとしましょう: `long.js` と `small.js` です:

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

ブラウザはページをスキャンしてスクリプトを探し、それらを並列にダウンロードしてパフォーマンスを向上させます。そのため、上の例では両方のスクリプトが並列でダウンロードされます。おそらく `small.js` が最初に終了します。

...ですが、`defer` 属性は ブラウザに "ブロックしない" ように指示することに加え、相対的な順序を維持することを保証します。したがって、たとえ `small.js` が最初にロードされた場合でも、`long.js` が実行されるまで待ってから実行します。

これは、JavaScript ライブラリを読み込み、次にそれに依存したスクリプトを読み込む必要があるケースでは重要になることがあります。

```smart header="`defer` 属性は外部スクリプト専用です"
`src` がない `<script>` タグの場合、`defer` 属性は無視されます。
```

## async

The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`). 
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them. 
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, at it can get, right? 

Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don't depend on our scripts, and our scripts shouldn't wait for them:

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## Dynamic scripts
 
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

The script starts loading as soon as it's appended to the document `(*)`.

**Dynamic scripts behave as "async" by default.**

That is:
- They don't wait for anything, nothing waits for them.
- The script that loads first -- runs first ("load-first" order).

This can be changed if we explicitly set `script.async=true`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.

So `long.js` always runs first (as it's added first):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js runs first because of async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Summary

Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.

But there are also essential differences between them:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. 

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
