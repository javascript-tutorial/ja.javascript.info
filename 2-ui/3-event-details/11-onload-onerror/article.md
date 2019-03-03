# リソース読み込み: onload と onerror

ブラウザは外部リソース -- スクリプト, iframes, 画像 など -- の読み込みを追跡することができます。

そのためのイベントが２つあります:

- `onload` -- ロードが成功した,
- `onerror` -- エラーが発生した.

## スクリプトの読み込み 

外部スクリプトにある関数を呼び出す必要があるとしましょう。

次のようにして動的にロードすることができます。:

```js
let script = document.createElement('script');
script.src = "my.js";

document.head.append(script);
```

...しかし、どうやってそのスクリプトの中で宣言された関数を実行するのでしょう？私たちはそのスクリプトの読み込みまで待つ必要があり、その後に初めて呼び出すことができます。

### script.onload

主なヘルパーは `load` イベントです。スクリプトがロードされ、実行された後にトリガされます。

```js run untrusted
let script = document.createElement('script');

// 任意のドメインから任意のスクリプトがロードできます
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // スクリプトはヘルパー関数 "_" を作ります
  alert(_); // 関数は利用可能です
};
*/!*
```

そのため、`onload` では、スクリプト変数の利用や関数の実行などが可能です。

...そして、仮に読み込みが失敗したらどうなるでしょう？例えば、そのようなスクリプトがない(404 エラー)もしくはサーバがない、サーバがダウンしている場合です。

### script.onerror

スクリプトの読み込み(実行ではない)中に発生したエラーは `error` イベントで追跡することが可能です。

例えば、存在しないスクリプトを要求してみましょう:

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // こんなスクリプトはありません
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error loading " + this.src); // Error loading https://example.com/404.js
};
*/!*
```

ここではエラーの詳細を取得することはできないことに注意してください。エラーが 404, 500, または他の何かだったのかは分かりません。単に読み込みに失敗したということだけです。

## 他のリソース 

`load` と `error` イベントは他のリソースに対しても機能します。そこには微妙な違いがあります。

例えば:

`<img>`, `<link>` (外部のスタイルシート)
: `load` と `error` 両方のイベントは期待通りに機能します。

`<iframe>`
: iframe の読み込みが完了した時の `load` イベントのみです。ロードが成功した場合とエラーが発生した場合の両方をトリガーします。 これは歴史的な理由によるものです。

## サマリ 

画像 `<img>`, 外部スタイル, スクリプトや他のリソースは、それらの読み込みを追跡するために `load` と `error` イベントを提供しています。:

- `load` はロードが成功したときにトリガされます。
- `error` はロードに失敗したときにトリガされます。

唯一の例外は `<iframe>` です: 歴史的な理由により、どんな完了にもかかわらず(たとえページが見つからなくても)、常に `load` をトリガします。

`readystatechange` イベントもリソースに対して機能しますが、殆ど使われません。なぜなら `load/error` イベントの方がシンプルなためです。