
<<<<<<< HEAD
# イベントループ(event loop): microtask と macrotask

ブラウザの JavaScript 実行フローは、Node.js 同様 *event loop* に基づいています。

event loop の動作を理解することは最適化ためには重要であり、適切なアーキテクチャにとっても重要である場合があります。

このチャプターでは、最初にそれがどのように動作するかについて理論的な詳細を説明し、次にその知識の実践的な使用例を見ていきます。

## Event Loop

*event loop* のコンセプトは非常にシンプルです。無限ループで JavaScript エンジンはタスクを待機し、それらを実行し、また次のタスクを待機します。

エンジンの一般的なアルゴリズムは次の通りです:

1. タスクがある間:
    - 最も古いタスクから開始し、それらを実行します。
2. タスクが現れるまでスリープし、現れると 1. に進みます。

これは、ページを閲覧するときに見られることの形式化です。JavaScript エンジンはスクリプト/ハンドラ/イベントがアクティブになった場合にのみ実行され、ほとんどの時間何もしません。

タスクの例:

- 外部スクリプト `<script src="...">` が読み込まれるとき、"タスク" はそれを実行することです。
- ユーザがマウスを動かすとき、"タスク" は `mousemove` イベントをディスパッチし、ハンドラを実行することです。
- `setTimeout` でスケジュールされた期限がくるとき、"タスク" はそのコールバックを実行することです。
- ...等

タスクが設定され、エンジンがそれらを処理したあと、他のタスクを待機します(スリープ状態で CPU の消費はほぼゼロです)。

タスクはエンジンがビジーなときに来ることもあり、その時はキューに入れられます。

タスクはキュー、いわゆる "macrotask queue(マクロタスクキュー) (v8用語)" を形成します。 

![](eventLoop.svg)

例えば、エンジンが `script` の実行でビジーである間にユーザがマウスを移動させて `mousemove` を引き起こしたり、`setTimeout` の実行予定が来たりすると、これらのタスクは上の図に示すようにキューを形成します。

キューのタスクは "先着順" で処理されます。エンジンが `script` を完了させると、`mousemove` イベントを処理し、次に `setTimeout` ハンドラを実行していきます。

ここまではとても簡単ですね。

あと2つ詳細です:
1. エンジンがタスクを実行している間、レンダリングは発生しません。タスクが時間がかかるかどうかは関係ありません。DOM への変更はタスクが完了した後にのみ描画されます。
2. タスクに時間がかかりすぎる場合、ブラウザは他のタスクの実行やユーザイベントの処理ができないため、しばらくすると "ページが応答していません" といった警告を表示し、ページ全体のタスクを強制終了するかどうかを訪ねます。これは複雑な計算が多数ある場合や、無限ループに陥るようなプログラムミスにより引き起こされます。

ここまでは理論でした。次からこの知識をどうのように適用できるか見ていきましょう。

## ユースケース1: CPUを大量に消費するタスクの分割

大量にCPUを食うタスクがあるとしましょう。

例えば、シンタックスハイライト(このページのコード例を色付けするために使用しています)は、かなりCPU負荷がかかります。コードをハイライトするために分析を行い、多くの色付けされた要素を生成し、ドキュメントに追加します。テキスト量が多い場合には多くの時間が必要です。

エンジンがシンタックスハイライトをするのに忙しい間は、他のDOM関連の処理やユーザイベントの処理などを行うことはできません。また、ブラウザが少しの間 "一時停止" したり "ハング" する可能性もありますが、これは受け入れられません。

この問題に関しては、大きなタスクを細かく分割することで回避が可能です。最初に 100 行をハイライト処理し、次に `setTimeout` (遅延ゼロで)で次の100行を処理するようスケジュールしていきます。

このアプローチのデモについては、簡単にするためにシンタックスハイライトではなく、`1` から `1000000000` までをカウントする関数を取り上げます。

以下のコードを実行すると、エンジンはしばらく "ハング" します。サーバサイドの JS の場合は顕著です。ブラウザで実行している場合には、ページ上の他のボタンをクリックしようとしてみてください。カウントが終了するまで、他のイベントが処理されないことが確認できます。
=======
# Event loop: microtasks and macrotasks

Browser JavaScript execution flow, as well as in Node.js, is based on an *event loop*.

Understanding how event loop works is important for optimizations, and sometimes for the right architecture.

In this chapter we first cover theoretical details about how things work, and then see practical applications of that knowledge.

## Event Loop

The *event loop* concept is very simple. There's an endless loop, where the JavaScript engine waits for tasks, executes them and then sleeps, waiting for more tasks.

The general algorithm of the engine:

1. While there are tasks:
    - execute them, starting with the oldest task.
2. Sleep until a task appears, then go to 1.

That's a formalization for what we see when browsing a page. The JavaScript engine does nothing most of the time, it only runs if a script/handler/event activates.

Examples of tasks:

- When an external script `<script src="...">` loads, the task is to execute it.
- When a user moves their mouse, the task is to dispatch `mousemove` event and execute handlers.
- When the time is due for a scheduled `setTimeout`, the task is to run its callback.
- ...and so on.

Tasks are set -- the engine handles them -- then waits for more tasks (while sleeping and consuming close to zero CPU).

It may happen that a task comes while the engine is busy, then it's enqueued.

The tasks form a queue, so-called "macrotask queue" (v8 term):

![](eventLoop.svg)

For instance, while the engine is busy executing a `script`, a user may move their mouse causing `mousemove`, and `setTimeout` may be due and so on, these tasks form a queue, as illustrated on the picture above.

Tasks from the queue are processed on "first come – first served" basis. When the engine browser is done with the `script`, it handles `mousemove` event, then `setTimeout` handler, and so on.

So far, quite simple, right?

Two more details:
1. Rendering never happens while the engine executes a task. It doesn't matter if the task takes a long time. Changes to the DOM are painted only after the task is complete.
2. If a task takes too long, the browser can't do other tasks, such as processing user events. So after a time, it raises an alert like "Page Unresponsive", suggesting killing the task with the whole page. That happens when there are a lot of complex calculations or a programming error leading to an infinite loop.

That was the theory. Now let's see how we can apply that knowledge.

## Use-case 1: splitting CPU-hungry tasks

Let's say we have a CPU-hungry task.

For example, syntax-highlighting (used to colorize code examples on this page) is quite CPU-heavy. To highlight the code, it performs the analysis, creates many colored elements, adds them to the document -- for a large amount of text that takes a lot of time.

While the engine is busy with syntax highlighting, it can't do other DOM-related stuff, process user events, etc. It may even cause the browser to "hiccup" or even "hang" for a bit, which is unacceptable.

We can avoid problems by splitting the big task into pieces. Highlight first 100 lines, then schedule `setTimeout` (with zero-delay) for the next 100 lines, and so on.

To demonstrate this approach, for the sake of simplicity, instead of text-highlighting, let's take a function that counts from `1` to `1000000000`.

If you run the code below, the engine will "hang" for some time. For server-side JS that's clearly noticeable, and if you are running it in-browser, then try to click other buttons on the page -- you'll see that no other events get handled until the counting finishes.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 重い処理を実行
=======
  // do a heavy job
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  for (let j = 0; j < 1e9; j++) {
    i++;
  }

  alert("Done in " + (Date.now() - start) + 'ms');
}

count();
```

<<<<<<< HEAD
ブラウザは "スクリプトの実行に時間がかかっています" という警告を表示するかもしれません。

ネストされた `setTimeout` を使ってこのジョブを分割しましょう:
=======
The browser may even show a "the script takes too long" warning.

Let's split the job using nested `setTimeout` calls:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 重い処理の一部を実行 (*)
=======
  // do a piece of the heavy job (*)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  } else {
<<<<<<< HEAD
    setTimeout(count); // 新たな呼び出しをスケジュール (**)
=======
    setTimeout(count); // schedule the new call (**)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }

}

count();
```

<<<<<<< HEAD
これで "カウント" 処理の間もブラウザの操作は完全に機能します。

`count` を1回実行するとジョブ `(*)`の一部が実行され、必要に応じて `(**)` で再スケジュールが行われます。:

1. 最初の実行カウント: `i=1...1000000`.
2. 2回目の実行カウント: `i=1000001..2000000`.
3. ...などなど.

今、エンジンがパート1の実行でビジーな最中に新たな別のタスク(e.g. `onclick` イベント)が発生した場合、キューに入れられた後、パート1が終わったとき(次のパートが始まる前)に実行されます。`count` 実行間での event loop への定期的な戻りにより、JavaScript エンジンは他のユーザ操作に反応するための十分な "タイミング" を手にします。

注目すべき点は、両方のパターン(`setTimeout` でジョブを分割する場合とそうでない場合)の速度が同等であることです。全体をカウントする時間に大きな差はありません。

より差を近づけるために改善しましょう。

`count()` の先頭にスケジューリングの処理を移動させます:
=======
Now the browser interface is fully functional during the "counting" process.

A single run of `count` does a part of the job `(*)`, and then re-schedules itself `(**)` if needed:

1. First run counts: `i=1...1000000`.
2. Second run counts: `i=1000001..2000000`.
3. ...and so on.

Now, if a new side task (e.g. `onclick` event) appears while the engine is busy executing part 1, it gets queued and then executes when part 1 finished, before the next part. Periodic returns to the event loop between `count` executions provide just enough "air" for the JavaScript engine to do something else, to react to other user actions.

The notable thing is that both variants -- with and without splitting the job by `setTimeout` -- are comparable in speed. There's not much difference in the overall counting time.

To make them closer, let's make an improvement.

We'll move the scheduling to the beginning of the `count()`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let i = 0;

let start = Date.now();

function count() {

<<<<<<< HEAD
  // 先頭にスケジューリングを移動させる
  if (i < 1e9 - 1e6) {
    setTimeout(count); // 新たな呼び出しのスケジュール
=======
  // move the scheduling to the beginning
  if (i < 1e9 - 1e6) {
    setTimeout(count); // schedule the new call
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }

  do {
    i++;
  } while (i % 1e6 != 0);

  if (i == 1e9) {
    alert("Done in " + (Date.now() - start) + 'ms');
  }

}

count();
```

<<<<<<< HEAD
これで、`count()` を開始しさらに `count()` が必要であることが分かると、ジョブを実行する前にすぐにスケジューリングします。

実行すると、時間が大幅に短縮されることが分かります。

なぜでしょう?

簡単なことです: ご存知のように、多くのネストされた `setTimeout` 呼び出しの場合、ブラウザ内で 最小でも4msという遅延があります。たとえ `0` に設定しても `4ms` (またはそれ以上)になります。したがって、早くスケジュールするほど実行は早くなります。

これでCPUを大量に消費するタスクを分割できました。これでユーザインタフェースはブロックされません。そして全体の実行時間もそれほど長くありません。

## ユースケース2: 進行状況の表示

ブラウザスクリプトの重いタスクを分割するもう一つのメリットは進行状況を表示することができることです。

通常、ブラウザは現在のコードが完了した後にレンダリングします。タスクに時間がかかったかどうかは関係ありません。DOM への変更はタスクが終了した後にだけ行われます。

一方、これは素晴らしいことでもあります。なぜなら我々が作成した関数は多くの要素を生成したり、1つ1つドキュメントに追加したり、またそれらのスタイルを変更する可能性がありますが、訪問者がその "中間" -- 未完了状態を見ることはありません。これは重要なことです。

これはそのデモです。`i` への変更は関数が終了するまで見えません。なので、最後の値だけが見えます:
=======
Now when we start to `count()` and see that we'll need to `count()` more, we schedule that immediately, before doing the job.

If you run it, it's easy to notice that it takes significantly less time.

Why?  

That's simple: as you remember, there's the in-browser minimal delay of 4ms for many nested `setTimeout` calls. Even if we set `0`, it's `4ms` (or a bit more). So the earlier we schedule it - the faster it runs.

Finally, we've split a CPU-hungry task into parts - now it doesn't block the user interface. And its overall execution time isn't much longer.

## Use case 2: progress indication

Another benefit of splitting heavy tasks for browser scripts is that we can show progress indication.

As mentioned earlier, changes to DOM are painted only after the currently running task is completed, irrespective of how long it takes.

On one hand, that's great, because our function may create many elements, add them one-by-one to the document and change their styles -- the visitor won't see any "intermediate", unfinished state. An important thing, right?

Here's the demo, the changes to `i` won't show up until the function finishes, so we'll see only the last value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```html run
<div id="progress"></div>

<script>

  function count() {
    for (let i = 0; i < 1e6; i++) {
      i++;
      progress.innerHTML = i;
    }
  }

  count();
</script>
```

<<<<<<< HEAD
...ですが、タスクの最中にプログレスバーなど何か表示したい場合もあります。

`setTimeout` を使って重いタスクを小さな単位に分割すると、それらの間で変更が描画されます:

これはきれいに見えます:
=======
...But we also may want to show something during the task, e.g. a progress bar.

If we split the heavy task into pieces using `setTimeout`, then changes are painted out in-between them.

This looks prettier:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 重い処理の一部を実行 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e7) {
      setTimeout(count);
    }

  }

  count();
</script>
```

<<<<<<< HEAD
これで `<div>` にはプログレスバーのような、`i` の値の増加が表示されます。


## ユースケース3: イベントの後になにかをする

イベントハンドラの中では、イベントがバブルアップしてすべての階層で処理されるまでいくつかの処理を延期させることができます。遅延ゼロの `setTimeout` でラップすることで実現できます。

チャプター <info:dispatch-events> で見た例: カスタムイベント `menu-open` は `setTimeout` でディスパッチされるため、このイベントは "click" イベントが完全に処理された後に発生します。
=======
Now the `<div>` shows increasing values of `i`, a kind of a progress bar.


## Use case 3: doing something after the event

In an event handler we may decide to postpone some actions until the event bubbled up and was handled on all levels. We can do that by wrapping the code in zero delay `setTimeout`.

In the chapter <info:dispatch-events> we saw an example: custom event `menu-open` is dispatched in `setTimeout`, so that it happens after the "click" event is fully handled.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
menu.onclick = function() {
  // ...

<<<<<<< HEAD
  // クリックされたメニュー項目のカスタムイベントを作成
=======
  // create a custom event with the clicked menu item data
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let customEvent = new CustomEvent("menu-open", {
    bubbles: true
  });

<<<<<<< HEAD
  // 非同期でカスタムイベントをディスパッチ
=======
  // dispatch the custom event asynchronously
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  setTimeout(() => menu.dispatchEvent(customEvent));
};
```

<<<<<<< HEAD
## Macrotasks と Microtasks

このチャプターで説明した *macrotasks* と併せて、チャプター <info:microtask-queue> で言及した *microtasks* が存在します。

Microtasks は通常は promise によって作成され、`.then/catch/finally` ハンドラの実行は microtask になります。Microtask は同様に promise ハンドリングの別の形の `await` の中でも使用されています。

Microtask キューで実行するために `func` をキューする `queueMicrotask(func)` という特別な関数もあります。

**すべての *macrotask* の直後に、エンジンは他の macrotask やレンダリングなどを実行する前に *microtask* キューにあるすべてのタスクを実行します。**

例えばこれを見てください:
=======
## Macrotasks and Microtasks

Along with *macrotasks*, described in this chapter, there are *microtasks*, mentioned in the chapter <info:microtask-queue>.

Microtasks come solely from our code. They are usually created by promises: an execution of `.then/catch/finally` handler becomes a microtask. Microtasks are used "under the cover" of `await` as well, as it's another form of promise handling.

There's also a special function `queueMicrotask(func)` that queues `func` for execution in the microtask queue.

**Immediately after every *macrotask*, the engine executes all tasks from *microtask* queue, prior to running any other macrotasks or rendering or anything else.**

For instance, take a look:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
setTimeout(() => alert("timeout"));

Promise.resolve()
  .then(() => alert("promise"));

alert("code");
```

<<<<<<< HEAD
ここでの順番はどうなるでしょう？

1. 通常の同期呼び出しである `code` が最初に表示ます。
2. `promise` が次に表示されます。なぜなら、`.then` は microtask キューを通じて、現在のコードの後に実行されるからです。
3. macrotask である `timeout` が最後に表示されます。

より詳しいイベントループは次のようになります:

![](eventLoop-full.svg)

**すべての microtask は他のイベントハンドリングやレンダリング、または他の macrotask が行われる前に完了します。**

これは microtask 間でアプリケーション環境が基本的には同じ(マウス座標の変更、新しいネットワークデータなどがないこと)であることを保証するため重要なことです。

(現在のコードの後に)関数を非同期に実行したいが、変更がレンダリングされたり新しいイベントが処理される前がよい場合は、`queueMicrotask` でスケジューリングすることができます。

ここに以前に示したものと類似の "カウントするプログレスバー" の例がありますが、`setTimeout` の代わりに `queueMicrotask` が使用されています。ここでは同期コードのように、レンダリングが最後に行われていることがわかります:
=======
What's going to be the order here?

1. `code` shows first, because it's a regular synchronous call.
2. `promise` shows second, because `.then` passes through the microtask queue, and runs after the current code.
3. `timeout` shows last, because it's a macrotask.

The richer event loop picture looks like this (order is from top to bottom, that is: the script first, then microtasks, rendering and so on):

![](eventLoop-full.svg)

All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That's important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

If we'd like to execute a function asynchronously (after the current code), but before changes are rendered or new events handled, we can schedule it with `queueMicrotask`.

Here's an example with "counting progress bar", similar to the one shown previously, but `queueMicrotask` is used instead of `setTimeout`. You can see that it renders at the very end. Just like the synchronous code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```html run
<div id="progress"></div>

<script>
  let i = 0;

  function count() {

<<<<<<< HEAD
    // 重い処理の一部を実行 (*)
=======
    // do a piece of the heavy job (*)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    do {
      i++;
      progress.innerHTML = i;
    } while (i % 1e3 != 0);

    if (i < 1e6) {
  *!*
      queueMicrotask(count);
  */!*
    }

  }

  count();
</script>
```

<<<<<<< HEAD
## サマリ

イベントループのより詳細なアルゴリズム([仕様](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)と比べると簡素化されていますが):

1. *macrotask* キューにある最も古いタスク(e.g "スクリプト")を取り出して実行します。
2. すべての *microtask* を実行します。
    - microtask キューが空でない間
        - 最も古い microtask を取り出して実行します。
3. 変更がある場合はレンダリングします。
4. macrotask キューが空であれば、macrotask が現れるまで待ちます。
5. ステップ1 に戻ります。

新しい *macrotask* をスケジュールするには:
- 遅延ゼロの `setTimeout(f)` を使用します。

これは、ブラウザがユーザーイベントに反応したり、タスクの進捗状況を表示することができるよう、計算量の多いタスクを小さく分割するために使用されます。

また、イベントが完全に処理された(バブリングが完了した)後にアクションを行うようスケジュールするために、イベントハンドラ内でも使われることがあります。

新しい *microtask* をスケジュールするには:
- `queueMicrotask(f)` を使用します。
- また、promise ハンドラは microtask キューで処理されます。

microtask 間では UI やネットワークイベントの処理はありません: これらはすぐに次々と実行されます。

```smart header="Web Workers"
イベントループをブロックしてはならない長く重い計算に対しては、[Web Workers](https://html.spec.whatwg.org/multipage/workers.html) を利用することができます。

これは並列スレッドでコードを実行する方法です。

Web Worker はメインプロセスとメッセージを交換することができますが、独自の変数とイベントループを持ちます。

Web Worker は DOM にはアクセスできないので、主に計算のために複数のCPUコアを同時に使用するのに役立ちます。
=======
## Summary

A more detailed event loop algorithm (though still simplified compared to the [specification](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)):

1. Dequeue and run the oldest task from the *macrotask* queue (e.g. "script").
2. Execute all *microtasks*:
    - While the microtask queue is not empty:
        - Dequeue and run the oldest microtask.
3. Render changes if any.
4. If the macrotask queue is empty, wait till a macrotask appears.
5. Go to step 1.

To schedule a new *macrotask*:
- Use zero delayed `setTimeout(f)`.

That may be used to split a big calculation-heavy task into pieces, for the browser to be able to react to user events and show progress between them.

Also, used in event handlers to schedule an action after the event is fully handled (bubbling done).

To schedule a new *microtask*
- Use `queueMicrotask(f)`.
- Also promise handlers go through the microtask queue.

There's no UI or network event handling between microtasks: they run immediately one after another.

So one may want to `queueMicrotask` to execute a function asynchronously, but within the environment state.

```smart header="Web Workers"
For long heavy calculations that shouldn't block the event loop, we can use [Web Workers](https://html.spec.whatwg.org/multipage/workers.html).

That's a way to run code in another, parallel thread.

Web Workers can exchange messages with the main process, but they have their own variables, and their own event loop.

Web Workers do not have access to DOM, so they are useful, mainly, for calculations, to use multiple CPU cores simultaneously.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
