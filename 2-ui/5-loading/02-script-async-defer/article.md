
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

```html run height=100
<p>...content before scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...content after scripts...</p>
```

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

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

スクリプトはドキュメントに追加されるとすぐに読み込みを開始します`(*)`。

**ダイナミックスクリプトはデフォルトで "非同期" として動作します。**

つまり:
- これらは何も待たず、逆に何もこれらを待ちません。
- 最初に読み込まれたスクリプトが最初に実行されます("ロードファースト" 順)。


`script.async=true` を明示的に設定することで変更できます。スクリプトは `defer` のようにドキュメント順に実行されます。

この例では、`loadScript(src)` 関数はスクリプトを追加し、`async` を `false` にしています。

そのため、`long.js` が常に最初に実行されます（最初に追加されているので）:

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// async=false なので long.js が最初に実行されます
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

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
```
