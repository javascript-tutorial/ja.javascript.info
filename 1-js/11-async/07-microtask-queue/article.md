
# Microtasks

<<<<<<< HEAD
Promise ハンドラ `.then`/`.catch`/`.finally` は常に非同期です。

たとえ Promise がすくに解決されたとしても、`.then`/`.catch`/`.finally` の *下* にあるコードはこれらのハンドラの前に実行されます。

デモです:
=======
Promise handlers `.then`/`.catch`/`.finally` are always asynchronous.

Even when a Promise is immediately resolved, the code on the lines *below* `.then`/`.catch`/`.finally` will still execute before these handlers.

Here's a demo:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let promise = Promise.resolve();

promise.then(() => alert("promise done!"));

<<<<<<< HEAD
alert("code finished"); // このアラートが最初に表示されます
```

実行すると、`code finished` が最初に現れ、その後 `promise done!` が表示されます。

Promise は最初から確実に終わっているので、これは奇妙です。

なぜ `.then` が後でトリガーされたのでしょう？何がおきているのでしょう？

## Microtasks キュー

非同期タスクには適切な管理が必要です。そのために、ECMA 標準では内部キュー `PromiseJobs` について述べています。これは "microtask キュー"(v8 用語)と呼ばれることが多いです。

[スペック](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues)では次のように述べられています:

- キューは先入れ先出し(first-in-first-out)です: 先にキューに入れられたタスクが最初に実行されます。
- タスクの実行は他になにも実行されていないときにだけ開始されます。

簡単に言うと、Promise が準備できると、その `.then/catch/finally` ハンドラはキューに入れられます。それらはまだ実行されていません。JavaScriptエンジンは、現在のコードがないときにキューからタスクを取り、実行します。

なので、上の例では先に "code finished" が表示されました。

![](promiseQueue.svg)

Promise ハンドラは常に内部キューを通ります。

複数の `.then/catch/finally` のチェーンがある場合、それらはすべて非同期に実行されます。つまり、最初にキューに入れられ、現在のコードが完了し、前にキューに入れられたハンドラが終了したときに実行されます。

**順序が重要な場合はどうなるでしょうか？ `promise done` の後に `code finished` を処理したい場合はどうすればよいでしょう？**

簡単です、単に `.then` でキューに入れるだけです:
=======
alert("code finished"); // this alert shows first
```

If you run it, you see `code finished` first, and then `promise done!`.

That's strange, because the promise is definitely done from the beginning.

Why did the `.then` trigger afterwards? What's going on?

## Microtasks queue

Asynchronous tasks need proper management. For that, the ECMA standard specifies an internal queue `PromiseJobs`, more often referred to as the "microtask queue" (V8 term).

As stated in the [specification](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- The queue is first-in-first-out: tasks enqueued first are run first.
- Execution of a task is initiated only when nothing else is running.

Or, to put it more simply, when a promise is ready, its `.then/catch/finally` handlers are put into the queue; they are not executed yet. When the JavaScript engine becomes free from the current code, it takes a task from the queue and executes it.

That's why "code finished" in the example above shows first.

![](promiseQueue.svg)

Promise handlers always go through this internal queue.

If there's a chain with multiple `.then/catch/finally`, then every one of them is executed asynchronously. That is, it first gets queued, then executed when the current code is complete and previously queued handlers are finished.

**What if the order matters for us? How can we make `code finished` appear after `promise done`?**

Easy, just put it into the queue with `.then`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
Promise.resolve()
  .then(() => alert("promise done!"))
  .then(() => alert("code finished"));
```

<<<<<<< HEAD
これで順番は期待通りです。

## 未処理の拒否(Unhandled rejection)

<info:promise-error-handling> の章の `unhandledrejection` イベントを覚えていますか？

今や、我々は JavaScript が未処理の拒否があったことをどのように見つけるのかを正確に知ることができます。

**"未処理の拒否" は、microtask キューの最後で Promise エラーが処理されない場合に発生します。**

通常、エラーが予想される場合には、それを処理するために Promise チェーンに `.catch` を追加します:
=======
Now the order is as intended.

## Unhandled rejection

Remember the `unhandledrejection` event from the article <info:promise-error-handling>?

Now we can see exactly how JavaScript finds out that there was an unhandled rejection.

**An "unhandled rejection" occurs when a promise error is not handled at the end of the microtask queue.**

Normally, if we expect an error, we add `.catch` to the promise chain to handle it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
promise.catch(err => alert('caught'));
*/!*

<<<<<<< HEAD
// 実行されません: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

...ですが、`.catch` を忘れていた場合、microtask キューが空になった後、エンジンはイベントをトリガーします:
=======
// doesn't run: error handled
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

But if we forget to add `.catch`, then, after the microtask queue is empty, the engine triggers the event:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let promise = Promise.reject(new Error("Promise Failed!"));

<<<<<<< HEAD
// 実行されます: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

仮に、次のように後でエラーを処理するとどうなるでしょう？:
=======
// Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

What if we handle the error later? Like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let promise = Promise.reject(new Error("Promise Failed!"));
*!*
setTimeout(() => promise.catch(err => alert('caught')), 1000);
*/!*

<<<<<<< HEAD
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
=======
// Error: Promise Failed!
window.addEventListener('unhandledrejection', event => alert(event.reason));
```

Now, if we run it, we'll see `Promise Failed!` first and then `caught`.

If we didn't know about the microtasks queue, we could wonder: "Why did `unhandledrejection` handler run? We did catch and handle the error!"

But now we understand that `unhandledrejection` is generated when the microtask queue is complete: the engine examines promises and, if any of them is in the "rejected" state, then the event triggers.

In the example above, `.catch` added by `setTimeout` also triggers. But it does so later, after `unhandledrejection` has already occurred, so it doesn't change anything.

## Summary

Promise handling is always asynchronous, as all promise actions pass through the internal "promise jobs" queue, also called "microtask queue" (V8 term).

So `.then/catch/finally` handlers are always called after the current code is finished.

If we need to guarantee that a piece of code is executed after `.then/catch/finally`, we can add it into a chained `.then` call.

In most Javascript engines, including browsers and Node.js, the concept of microtasks is closely tied with the "event loop" and "macrotasks". As these have no direct relation to promises, they are covered in another part of the tutorial, in the article <info:event-loop>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
