
<<<<<<< HEAD
# スクリプト: async, defer

最近の web サイトでは、スクリプトは HTML よりも "重い" ことがしばしばです: ダウンロードサイズはより大きく、処理時間も長くなります。

ブラウザが HTML をロードし、`<script>...</script>` タグに遭遇すると、DOM の構築を続けることはできません。すぐにスクリプトを実行する必要があります。外部スクリプト `<script src="..."></script>` についても同じです: ブラウザはスクリプトをダウンロードし、それを実行するまで待つ必要があり、その後にページの残り部分の処理をすることになります。

これは2つの重要な問題につながります:

1. スクリプトは、それ以降の DOM要素は認識することができないため、ハンドラーを追加したりすることはできません。
2. ページの先頭に重いスクリプトがあると、"ページをブロック" します。利用者はそれがダウンロードされ実行されるまでページコンテンツを見ることができません:
=======
# Scripts: async, defer

In modern websites, scripts are often "heavier" than HTML: their download size is larger, and processing time is also longer.

When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait for the script to download, execute the downloaded script, and only then can it process the rest of the page.

That leads to two important issues:

1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=100
<p>...content before script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<<<<<<< HEAD
<!-- スクリプトがロードされるまで表示されません -->
<p>...content after script...</p>
```

回避策はいくつかあります。例えば、ページの末尾にスクリプトを置きます。すると要素を表示でき、ページコンテンツの表示をブロックしません:

```html run
=======
<!-- This isn't visible until the script loads -->
<p>...content after script...</p>
```

There are some workarounds to that. For instance, we can put a script at the bottom of the page. Then it can see elements above it, and it doesn't block the page content from showing:

```html
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
<body>
  ...all content is above the script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

<<<<<<< HEAD
ですが、この方法は完璧には程遠いです。例えば、ブラウザが完全なHTMLドキュメントをダウンロードした後にのみスクリプトに気づき（、ダウロードが開始でき）ます。HTML ドキュメントが長いと、かなりの遅延になる可能性があります。

このようなことは、十分に早い接続を使用している人々には見えませんが、世界中の多くの人は依然として低速のインターネットを利用しており、完璧とはほど遠いモバイルインターネット接続を使用しています。

幸いなことに、この問題を解決する2つの `<script>` 属性があります: `defer` と `async` です。

## defer

`defer` 属性はブラウザにスクリプトを待たないよう指示します。代わりに、ブラウザは HTML の処理を継続し、DOM を構築します。スクリプトは "バックグラウンド" でロードされ、DOM が完全に構築されたときに実行されます。

これは上記と同じ例ですが、`defer` を指定しています:
=======
But this solution is far from perfect. For example, the browser notices the script (and can start downloading it) only after it downloaded the full HTML document. For long HTML documents, that may be a noticeable delay.

Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.

Luckily, there are two `<script>` attributes that solve the problem for us: `defer` and `async`.

## defer

The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built.

Here's the same example as above, but with `defer`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=100
<p>...content before script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<<<<<<< HEAD
<!-- すぐに表示されます -->
<p>...content after script...</p>
```

つまり:

- `defer` をもつスクリプトはページをブロックしません。
- `defer` をもつスクリプトは常に DOM は準備できた(ただし、`DOMContentLoaded` イベントの前です)ときに実行されます。

次の例は2つ目の部分の例です:
=======
<!-- visible immediately -->
<p>...content after script...</p>
```

In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...content after scripts...</p>
```

<<<<<<< HEAD
1. ページコンテンツはすぐに表示されます。
2. `DOMContentLoaded` イベントハンドラは遅延スクリプトを待ちます。スクリプトがダウンロードされ実行されたときに実行されます。

**遅延スクリプトは通常のスクリプトのように、相対的な順序を維持します。**

2つの遅延スクリプトがあるとしましょう: `long.js` と `small.js` です:
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let's say, we have two deferred scripts: the `long.js` and then `small.js`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
ブラウザはページをスキャンしてスクリプトを探し、それらを並列にダウンロードしてパフォーマンスを向上させます。そのため、上の例では両方のスクリプトが並列でダウンロードされます。おそらく `small.js` が最初に終了します。

...ですが、`defer` 属性は ブラウザに "ブロックしない" ように指示することに加え、相対的な順序を維持することを保証します。したがって、たとえ `small.js` が最初にロードされた場合でも、`long.js` が実行されるまで待ってから実行します。

これは、JavaScript ライブラリを読み込み、次にそれに依存したスクリプトを読み込む必要があるケースでは重要になることがあります。

```smart header="`defer` 属性は外部スクリプト専用です"
`src` がない `<script>` タグの場合、`defer` 属性は無視されます。
=======
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` attribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.

```smart header="The `defer` attribute is only for external scripts"
The `defer` attribute is ignored if the `<script>` tag has no `src`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## async

<<<<<<< HEAD
`async` 属性は `defer` に似ています。これもスクリプトをブロックしませんが、振る舞いに重要な違いがあります。

`async` 属性はスクリプトが完全に独立していることを意味します。:

- ブラウザは `async` スクリプトをブロックしません(`defer` と同じように)。
- 他のスクリプトは `async` スクリプトを待たず、`async` スクリプトもそれらを待ちません。
- `DOMContentLoaded` と `async` スクリプトは互いを待ちません:
    - `DOMContentLoaded` は `async` スクリプトの前で発生する可能性があります（ページが完了した後に `async` スクリプトの読み込みが終了した場合）
    - ...あるいは、`async` スクリプトの後です（非同期スクリプトが短いか HTTPキャッシュにあった場合）。

つまり、`async` スクリプトはバックグラウンドで読み込まれ、準備ができたら実行されます。DOM と他のスクリプトはそれらを待たず、それらも何も待ちません。読み込まれたときに実行される完全に独立したスクリプトです。

これは `defer` で見たものと同様の例です。:2つのスクリプト `long.js` と `small.js` がありますが、今回は `defer` の代わりに `async` です。

これらは互いを待ちません。最初に読み込まれたもの（おそらく `small.js`）が最初に実行されます:
=======
The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`).
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, as it can get, right?

Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

<<<<<<< HEAD
- ページのコンテンツはすぐに表示されます: `async` はブロックしません。
- `DOMContentLoaded` は `asyn` の前後の両方で発生する可能性があり、ここでは保証されません。
- より小さいスクリプト `small.js` が2番目にありますが、おそらく `long.js` の前に読み込まれるので、`small.js` が最初に実行されます。ですが、キャッシュされている場合は、`long.js` が最初に読み込まれ、最初に実行されることもあります。つまり、非同期スクリプトは "ロードファースト" 順で実行します。

非同期スクリプトは独立したサードパーティのスクリプトをページに組み込む際に便利です。:カウンター、広告など。それらは我々のスクリプトには依存しないので、我々のスクリプトを待つべきではありません。:

```html
<!-- Google Analytics は通常このように追加されます -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

## ダイナミックスクリプト

ページにスクリプトを追加する、もう1つの重要な方法があります。 

JavaScript を利用して動的にスクリプトを作成しドキュメントを追加することが可能です:
=======
- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.

Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don't depend on our scripts, and our scripts shouldn't wait for them:

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

```smart header="The `async` attribute is only for external scripts"
Just like `defer`, the `async` attribute is ignored if the `<script>` tag has no `src`.
```

## Dynamic scripts

There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

<<<<<<< HEAD
スクリプトはドキュメントに追加されるとすぐに読み込みを開始します`(*)`。

**ダイナミックスクリプトはデフォルトで "非同期" として動作します。**

つまり:
- これらは何も待たず、逆に何もこれらを待ちません。
- 最初に読み込まれたスクリプトが最初に実行されます("ロードファースト" 順)。


`script.async=true` を明示的に設定することで変更できます。スクリプトは `defer` のようにドキュメント順に実行されます。

この例では、`loadScript(src)` 関数はスクリプトを追加し、`async` を `false` にしています。

そのため、`long.js` が常に最初に実行されます（最初に追加されているので）:
=======
The script starts loading as soon as it's appended to the document `(*)`.

**Dynamic scripts behave as "async" by default.**

That is:
- They don't wait for anything, nothing waits for them.
- The script that loads first -- runs first ("load-first" order).

This can be changed if we explicitly set `script.async=false`. Then scripts will be executed in the document order, just like `defer`.

In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.

So `long.js` always runs first (as it's added first):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

<<<<<<< HEAD
// async=false なので long.js が最初に実行されます
=======
// long.js runs first because of async=false
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

<<<<<<< HEAD
`script.async=false` がなければ、スクリプトはデフォルトであるロードファースト順（おそらく `small.js` が最初）で実行されます。

繰り返しますが、`defer` と同じように、ライブラリを読み込み、それに依存する別のスクリプトを読み込むような場合は、順序が重要になります。


## サマリ

`async` と `defer` には共通点が1つあります: これらのスクリプトのダウンロードはページのレンダリングをブロックしません。なので、ユーザはページコンテンツを見ることができ、すぎにそのページのことを知ることができます。

ですが、それらの間にも本質的な違いがあります:

|         | 順序 | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *ロードファースト順*. どちらが最初に読み込まれるか、ドキュメントでの順序は関係ありません |  無関係。ドキュメントがまだ完全にダウンロードされていないときにロードして実行する場合があります。これはスクリプトが小さいまたはキャッシュされていて、ドキュメントが十分に長い場合に発生します。|
| `defer` | *ドキュメント順* (ドキュメントに書かれている順). |  ドキュメントがロードされ、パースされた後（必要に応じて待機します）、`DOMContentLoaded` の直前に実行されます。|

実際には、`defer` は DOM全体が必要、かつ（または）それらの相対的な実行順序が重要なスクリプトに対して使用されます。

`async` はカウンターや広告など独立したスクリプトに対し使用されます。それらの相対的な実行順序は重要ではありません。

```warn header="スクリプトのないページが使用可能である必要があります"
注意してください: `defer` や `async` を使用している場合、ユーザはスクリプトがロードされる *前* にページを見ます。

このようなケースでは、グラフィカルなコンポーネントのいくつかはおそらくまだ初期化されていません。

"ロード中" のインジケータを表示し、まだ機能していないボタンを無効にするのを忘れないでください。ユーザがページで何ができるのか、そして何がまだ準備中であるかを明確に分かるようにする必要があります。
=======
Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Summary

Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.

But there are also essential differences between them:

|         | Order | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. Their document order doesn't matter -- which loads first runs first |  Irrelevant. May load and execute while the document has not yet been fully downloaded. That happens if scripts are small or cached, and the document is long enough. |
| `defer` | *Document order* (as they go in the document). |  Execute after the document is loaded and parsed (they wait if needed), right before `DOMContentLoaded`. |

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important.

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
