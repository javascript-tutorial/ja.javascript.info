# Promise

<<<<<<< HEAD
あなたはトップシンガーで、ファンは今後のシングルについて絶えず尋ねていると想像してください。

それに関して解放されるため、あなたは公開時にその曲を送ることを約束します。 また、ファンに更新を購読できるリストを提供します。彼らはメールアドレスを記入することができ、曲が利用可能になるとすべての購読者がすぐに受け取れるようになります。 
そして、万が一何か手違いがありその曲を発表する計画が取り消されたとしても、彼らはその通知を受けとることができるでしょう。

みんな幸せです: ファンはこれ以上あなたの元へ押し寄せることはしません。また、ファンはその歌を見逃すことはありません。

これはプログラミングにおいてしばしば抱くことに対する現実的なアナロジーです。:

1. 何かを行い時間を必要とする "生成コード"。例えば、コードはリモートスクリプトをロードします。それは "シンガー" です。
2. 準備が整ったらすぐ "生成コード" の結果が欲しい "消費コード"。多くの関数がその結果を必要とするかもしれません。それらは "ファン" です。
3. *promise* は "生成コード" と "消費コード" をリンクする特別な JavaScript オブジェクトです。今回のアナロジーではそれは "購読リスト" です。生成コードは約束された結果を生成するために必要な時間をとります。そして "promise" は準備ができたら、購読したすべてのコードが結果を利用できるようにします。

JavaScript の promise には追加の特徴や制限があり、単純な購読リストよりも複雑であるため、このアナロジーはあまり正確ではないかもしれません。しかし、最初に理解には良いです。

promise オブジェクトのコンストラクタ構文は次の通りです:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (生成コード, "シンガー")
});
```

`new Promise` へ渡される関数は *executor(執行者)* と呼ばれます。promise が作成されると、自動的に呼ばれます。それは最終的に結果と一緒に終了する生成コードを含んでいます。上記のアナロジーの言葉では、executor は "シンガー" です。

生成された `promise` オブジェクトは内部プロパティを持っています:

- `state` -- 最初は "pending(保留中)" であり、その後 "fulfilled(完了)" もしくは "rejected(拒否)" に変更されます。
- `result` -- 任意の値です。初期値は `undefined` です。

executor がジョブを終了した時、次の中のいずれか1つを呼びます:

- `resolve(value)` -- ジョブが正常に終了したことを示します。:
    - `state` を `"fulfilled"` に設定します,
    - `result` を `value` に設定します.
- `reject(error)` -- エラーが発生したことを示します:
    - `state` を `"rejected"` に設定します,
    - `result` を `error` に設定します.

![](promise-resolve-reject.svg)

これは、Promise コンストラクタとその "生成コード" (`setTimeout`) を持つ単純なexecutor関数の例です。

```js run
let promise = new Promise(function(resolve, reject) {
  // promise が作られたとき、関数は自動的に実行されます

  // 1秒後、ジョブが "done!" という結果と一緒に完了したことを合図します
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

上のコードを実行すると2つの事が見えます:

1. executor は自動的かつ即座に呼ばれます(`new Promise` によって)。
2. executor は2つの引数を受け取ります: `resolve` と `reject` です -- これらの関数は JavaScript エンジンから来ており、これらを作る必要はありません。代わりに、executor は準備ができた際にそれらを呼ぶ必要があります。

1秒後、executor は結果を生成するために `resolve("done")` を呼び出します。:

![](promise-resolve-1.svg)

これは、 "ジョブが正常に完了した" 例でした。

そして、次はエラーで executor が promise を拒否する例です。:

```js
let promise = new Promise(function(resolve, reject) {
  // 1秒後、ジョブがエラーで終わったことを合図します
=======
Imagine that you're a top singer, and fans ask day and night for your upcoming single.

To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can't publish the song, they will still be notified.

Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the single.

This is a real-life analogy for things we often have in programming:

1. A "producing code" that does something and takes time. For instance, a code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.

The analogy isn't terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it's fine to begin with.

The constructor syntax for a promise object is:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
```

The function passed to `new Promise` is called the *executor*. When `new Promise` is created, it runs automatically. It contains the producing code, that should eventually produce a result. In terms of the analogy above: the executor is the "singer".

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late - doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job finished successfully, with result `value`.
- `reject(error)` — if an error occurred, `error` is the error object.

So to summarize: the executor runs automatically, it should do a job and then call either `resolve` or `reject`.

The `promise` object returned by `new Promise` constructor has internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called.

So the executor eventually moves `promise` to one of these states:

![](promise-resolve-reject.svg)

Later we'll see how "fans" can subscribe to these changes.

Here's an example of a promise constructor and a simple executor function with  "producing code" that takes time (via `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

We can see two things by running the code above:

1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: `resolve` and `reject` — these functions are pre-defined by the JavaScript engine. So we don't need to create them. We only should call one of them when ready.

    After one second of "processing" the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:

    ![](promise-resolve-1.svg)

That was an example of a successful job completion, a "fulfilled promise".

And now an example of the executor rejecting the promise with an error:

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

<<<<<<< HEAD
![](promise-reject-1.svg)

要約すると、executor はジョブ(通常は時間のかかる何か)を行い、その後、対応する promise オブジェクトの状態を変更するために、`resolve` または `reject` を呼び出します。

解決または拒否されている promise は、 "pending" の promise とは対照的に "settled" と呼ばれます。

````smart header="1つの結果またはエラーのみです"
executor は1つの `resolve` または `reject` だけを呼びだす必要があります。promise の状態の変化は最後のものです。

さらなるすべての `resolve` や `reject` は無視されます:

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

  reject(new Error("…")); // 無視されます
  setTimeout(() => resolve("…")); // 無視されます
});
```

この考えは、executor により行われたジョブは1つの結果またはエラーのみを持つということです。

また、1つ以上の引数で `resolve/reject` を呼び出した場合、最初の引数が使われ、以降の引数は無視されます。
````

```smart header="`Error` オブジェクトで reject する"
技術的には、任意の型の引数で `reject` を呼び出すことが可能です(`resolve` のように)。しかし、`reject` (またはそれを継承したもの)では、`Error` オブジェクトを利用することを推奨します。その理由は後ほど明らかになります。
```

````smart header="Resolve/rejectは即時実行可能です"
実際には、通常 executor は非同期で何かを行い、暫く時間が経過した後に `resolve/reject` を呼び出しますが、それは必須ではありません。次のように、すぐに `resolve` や `reject` を呼び出すことが可能です。:

```js
let promise = new Promise(function(resolve, reject) {
  resolve(123); // 即座に結果を返します: 123
});
```

例えば、ジョブの開始後、すでに完了していることが分かったとき等です。技術的には即座に promise を解決することは問題ありません。
````

```smart header="`state` と `result` は内部のプロパティです"
promise オブジェクトのプロパティ `state` と `result` は内部的なものです。我々のコードから直接アクセスすることはできません。代わりに `.then/catch` メソッドを利用します。それらについては下で説明します。
```

## 消費者: .then, .catch, finally

Promise オブジェクトは executor("生成コード" あるいは "シンガー")と消費関数("ファン") の間のリンクとして機能し、結果またはエラーを受け取ります。消費関数はメソッド `.then`, `.catch`,  `.finally` を使って登録(購読)することができます。

### then

最も重要で基本的なものは `.then` です。

構文は次の通りです:

```js
promise.then(
  function(result) { /* 成功した結果を扱う */ },
  function(error) { /* エラーを扱う */ }
);
```

`.then` の最初の引数は以下の関数です:

1. promise が解決(resolve)されたときに実行され、
2. その結果を受け取ります

`.then` の2つ目の引数は以下の関数です:

1. promise が拒否(reject)されたときに実行され、
2. エラーを受け取ります

例:
=======
The call to `reject(...)` moves the promise object to `"rejected"` state:

![](promise-reject-1.svg)

To summarize, the executor should do a job (something that takes time usually) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to a initially "pending" promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or one `reject`. Any state change is final.

All further calls of `resolve` and `reject` are ignored:

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("done");
*/!*

  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

The idea is that a job done by the executor may have only one result or an error.

Also, `resolve`/`reject` expect only one argument (or none) and will ignore additional arguments.
````

```smart header="Reject with `Error` objects"
In case something goes wrong, the executor should call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
```

````smart header="Immediately calling `resolve`/`reject`"
In practice, an executor usually does something asynchronously and calls `resolve`/`reject` after some time, but it doesn't have to. We also can call `resolve` or `reject` immediately, like this:

```js
let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
```

For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.

That's fine. We immediately have a resolved promise.
````

```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
```

## Consumers: then, catch, finally

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using methods `.then`, `.catch` and `.finally`.

### then

The most important, fundamental one is `.then`.

The syntax is:

```js
promise.then(
  function(result) { *!*/* handle a successful result */*/!* },
  function(error) { *!*/* handle an error */*/!* }
);
```

The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected, and receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

<<<<<<< HEAD
// resolve は .then の最初の関数を実行する
promise.then(
*!*
  result => alert(result), // 1秒後に "done!" を表示
*/!*
  error => alert(error) // 実行されない
);
```

最初の関数は実行されました。

そして拒否の場合は2つ目の関数です:
=======
// resolve runs the first function in .then
promise.then(
*!*
  result => alert(result), // shows "done!" after 1 second
*/!*
  error => alert(error) // doesn't run
);
```

The first function was executed.

And in the case of a rejection -- the second one:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

<<<<<<< HEAD
// reject は .then の2つ目の関数を実行する
promise.then(
  result => alert(result), // 実行されない
*!*
  error => alert(error) // 1秒後に "Error: Whoops!" を表示
=======
// reject runs the second function in .then
promise.then(
  result => alert(result), // doesn't run
*!*
  error => alert(error) // shows "Error: Whoops!" after 1 second
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
*/!*
);
```

<<<<<<< HEAD
もし、正常完了の場合だけを扱いたい場合は、`.then` に1つの引数だけを指定することもできます。:
=======
If we're interested only in successful completions, then we can provide only one function argument to `.then`:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
<<<<<<< HEAD
promise.then(alert); // 1秒後に "done!" を表示
=======
promise.then(alert); // shows "done!" after 1 second
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
*/!*
```

### catch

<<<<<<< HEAD
エラーの場合だけに興味がある場合は、第一引数に `null`: `.then(null, function)` が使えます。 または、`.catch(function)` が使えます。これはまったく同じです。
=======
If we're interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

*!*
<<<<<<< HEAD
// .catch(f) は promise.then(null, f) と同じです
promise.catch(alert); // 1秒後に "Error: Whoops!" を表示
*/!*
```

`.catch(f)` の呼び出しは、`.then(null, f)` の完全な類似物であり、単に簡略化したものです。

### finally

通常の `try {...} catch {...}` に `finally` 節があるように、Promise にも ` finally` があります。

`.finally(f)` 呼び出しは、Promise が決着したとき(解決または拒否になったとき)に必ず実行されるという意味で `.then(f, f)` に似ています。

`finally` はクリーンアップを実行するのに便利なハンドラです。例えば、結果がどちらであっても、もう不要となったので読み込み中のインジケータを停止するなどです。

このようになります:

```js
new Promise((resolve, reject) => {
  /* 時間のかかる処理を行い、その後 resolve/reject を呼び出す */
})
*!*
  // 成功か失敗かは関係なく、promise が確定したときに実行されます
  .finally(() => 読込中のインジケータを停止する )
*/!*
  .then(result => 結果を表示する, err => エラーを表示する)
```

これは正確な `then(f,f)` のエイリアスではありません。いくつかの重要な違いがあります:

1. `finally` ハンドラは引数を取りません。`finally` では promise が成功したかどうかは分かりません。ただし、ここで行うタスクは、通常 "一般的な" ファイナライズ処理を行うことになるので問題ありません。
2. `finally` ハンドラは次のハンドラに結果あるいはエラーを渡します。

    例えば、ここでは結果が `finally` から `then` へと渡されています:
=======
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```

The call `.catch(f)` is a complete analog of `.then(null, f)`, it's just a shorthand.

### finally

Just like there's a `finally` clause in a regular `try {...} catch {...}`, there's `finally` in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.

Like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve/reject */
})
*!*
  // runs when the promise is settled, doesn't matter successfully or not
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

It's not exactly an alias of `then(f,f)` though. There are several important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.

    For instance, here the result is passed through `finally` to `then`:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
<<<<<<< HEAD
      .then(result => alert(result)); // <-- .then は結果(result)を扱います
    ```

    そして、ここでは promise でエラーで発生し、`finally` から `catch` へエラーが渡されています:
=======
      .then(result => alert(result)); // <-- .then handles the result
    ```

    And here there's an error in the promise, passed through `finally` to `catch`:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
<<<<<<< HEAD
      .catch(err => alert(err));  // <-- .catch はエラーオブジェクトを扱います
    ```  

    `finally` は promise の結果を処理する手段ではないので、これは非常に便利です。

    次のチャプターでは、promise の連鎖とハンドラ間での結果の受け渡しについてより深く説明します。

3. 大事なことを言い忘れていましたが、`finally(f)` は `.then(f, f)` よりも便利な構文です。: 関数 `f` を複製する必要はありません。

````smart header="完了済みの promises の `then` はすぐに実行されます"
promise が pending の場合、`.then/catch` ハンドラは結果を待ちます。そうではなく、promise がすでに settled である場合は直ちに実行されます。:

```js run
// 即座に promise が解決されます
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (すぐに表示されます)
```

これは時間がかかることもあればすぐに終わることもあるジョブにとっては便利です。ハンドラは両方の場合に実行されることが保証されています。
````

次に、非同期コードを書くにあたり、promise がどのように役立つか、より実践的な例を見てみましょう。

## 例: loadScript 

以前のチャプターで、スクリプトを読み込むための関数 `loadScript` がありました。

思い出すために、ここにコールバックベースのパターンを示します。:
=======
      .catch(err => alert(err));  // <-- .catch handles the error object
    ```  

    That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.

    We'll talk more about promise chaining and result-passing between handlers in the next chapter.

3. Last, but not least, `.finally(f)` is a more convenient syntax than `.then(f, f)`: no need to duplicate the function `f`.

````smart header="On settled promises handlers runs immediately"
If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they execute immediately:

```js run
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (shows up right now)
```
````

Next, let's see more practical examples of how promises can help us to write asynchronous code.

## Example: loadScript [#loadscript]

We've got the `loadScript` function for loading a script from the previous chapter.

Here's the callback-based variant, just to remind us of it:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
<<<<<<< HEAD
  script.onerror = () => callback(new Error(`Script load error ` + src));
=======
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

  document.head.append(script);
}
```

<<<<<<< HEAD
promise を使って再実装してみましょう。

新しい関数 `loadScript` はコールバックを必要としません。代わりに、読み込みが完了したときに解決する promise オブジェクトを生成し返します。外部コードは `.then` を使用してそれにハンドラを追加することができます。:
=======
Let's rewrite it using Promises.

The new function `loadScript` will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using `.then`:
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

```js run
function loadScript(src) {  
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
<<<<<<< HEAD
    script.onerror = () => reject(new Error("Script load error: " + src));
=======
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

    document.head.append(script);
  });
}
```

<<<<<<< HEAD
使用方法:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js");
=======
Usage:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

<<<<<<< HEAD
promise.then(script => alert('One more handler to do something else!'));
```

コールバックベースのパターンと比べると利点がすぐにわかります。:

| Promises | コールバック |
|----------|-----------|
| Promise を使うことで、自然な順序で処理を記述することができます。まず、`loadScript(script)` を実行し、`.then` を使ってその結果をどうするかを書きます。| `loadScript(script, callback)` を呼び出すときには、`callback` 関数が必要です。つまり、`locadScript` が呼ばれる *前に* 結果をどう処理するのかを知っておく必要があります。|
| Promise では `.then` を何度でも呼び出すことができます。毎回、新しい "ファン" を "購読リスト" に追加しています。 これについては次のチャプターで詳しく説明します: [](info：promise-chaining)。| コールバックは1つだけです |

promise はより良いコードフローと柔軟性をもたらします。しかしもっと多くのことがあります。それらについては次のチャプターで見ていきましょう。
=======
promise.then(script => alert('Another handler...'));
```

We can immediately see a few benefits over the callback-based pattern:


| Promises | Callbacks |
|----------|-----------|
| Promises allow us to do things in the natural order. First, we run `loadScript(script)`, and `.then` we write what to do with the result. | We must have a `callback` function at our disposal when calling `loadScript(script, callback)`. In other words, we must know what to do with the result *before* `loadScript` is called. |
| We can call `.then` on a Promise as many times as we want. Each time, we're adding a new "fan", a new subscribing function, to the "subscription list". More about this in the next chapter: [](info:promise-chaining). | There can be only one callback. |

So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
