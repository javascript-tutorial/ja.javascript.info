
# Microtasks

Promise ハンドラ `.then`/`.catch`/`.finally` は常に非同期です。

たとえ Promise がすくに解決されたとしても、`.then`/`.catch`/`.finally` の *下* にあるコードはこれらのハンドラの前に実行されます。

デモです:

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

alert("code finished"); // このアラートが最初に表示されます
```

実行すると、`code finished` が最初に現れ、その後 `promise done!` が表示されます。

Promise は最初から確実に終わっているので、これは奇妙です。

なぜ `.then` が後でトリガーされたのでしょう？何がおきているのでしょう？

## Microtasks キュー

非同期タスクには適切な管理が必要です。そのために、"標準" では内部キュー `PromiseJobs` について述べています。これは "microtask キュー"(v8 用語)と呼ばれることが多いです。

[仕様](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues)で述べられているように:

- キューは先入れ先出し(first-in-first-out)です: 先にキューに入れられたタスクが最初に実行されます。
- タスクの実行は他になにも実行されていないときにだけ開始されます。

簡単に言うと、Promise が準備できると、その `.then/catch/finally` ハンドラはキューに入れられます。それらはまだ実行されていません。JavaScriptエンジンは、現在のコードがないときにキューからタスクを取り、実行します。

なので、上の例では先に "code finished" が表示されました。

![](promiseQueue.svg)

Promise ハンドラは常に内部キューを通ります。

複数の `.then/catch/finally` のチェーンがある場合、それらはすべて非同期に実行されます。つまり、最初にキューに入れられ、現在のコードが完了し、前にキューに入れられたハンドラが終了したときに実行されます。

**順序が重要な場合はどうなるでしょうか？ `promise done` の後に `code finished` を処理したい場合はどうすればよいでしょう？**

簡単です、単に `.then` でキューに入れるだけです:

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

これで順番は期待通りです。

## 未処理の拒否(Unhandled rejection)

チャプター  <info:promise-error-handling> の `unhandledrejection` イベントを覚えていますか？

今や、我々は JavaScript が未処理の拒否があったことをどのように見つけるのかを正確に知ることができます。

**"未処理の拒否" は、microtask キューの最後で Promise エラーが処理されない場合に発生します。**

通常、エラーが予想される場合には、それを処理するために Promise チェーンに `.catch` を追加します:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

// 実行されません: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

...ですが、`.catch` を忘れていた場合、microtask キューが空になった後、エンジンはイベントをトリガーします:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));

// 実行されます: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

仮に、次のように後でエラーを処理するとどうなるでしょう？:

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

// 実行されます: Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

実行すると、最初に `Promise Failed!` が表示され、その後 `caught` が表示されます。

microtask キューについて知らなければ、不思議に思うでしょう: "なぜ `unhandledrejection` ハンドラが実行されるのでしょう？ エラーをキャッチしているのに!"

しかし、今は `unhandledrejection` は microtask キューが完了したときに生成されることが分かりました。: エンジンは Promise を検査し、いずれかが "拒否(rejected)" 状態であれば、イベントをトリガーします。

上記の例では、`setTimeout` により追加された `.catch` もトリガーされますが、`unhandledrejection` はすでに発生した後なので、何も変わりません。

## サマリ

すべての Promise アクションは、"microtask キュー"(v8 用語)とも呼ばれる、内部の "promise jobs" キューを通るため、Promise の処理は常に非同期です。

そのため、`.then/catch/finally` ハンドラは常に現在のコードが終了した後に呼ばれます。

あるコードが `.then/catch/finally` の後に実行されることを保証する必要がある場合、Promise チェーンを使い `.then` で呼び出します

ブラウザも Node.js も含めほとんどの JavaScript エンジンでは、microtask の概念は "イベントループ" と "microtask" と密接に関連しています。これらは Promise とは直接は関係ないので、チュートリアルの別のパート、チャプター <info:event-loop> で説明しています。
