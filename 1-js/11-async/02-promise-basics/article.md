# Promise

<<<<<<< HEAD
あなたはトップシンガーで、ファンは今後のシングルについて絶えず尋ねていると想像してください。

それに関して解放されるため、あなたは公開時にその曲を送ることを約束します。 また、ファンに更新を購読できるリストを提供します。 彼らはメールアドレスを記入することができ、曲が利用可能になるとすべての購読者がすぐに受け取れるようになります。 
そして、万が一何か手違いがありその曲を発表する計画が取り消されたとしても、彼らはその通知を受けとることができるでしょう。

みんな幸せです: ファンはこれ以上あなたの元へ押し寄せることはしません。また、ファンはその歌を見逃すことはありません。

これはプログラミングにおいてしばしば抱くことに対する現実的なアナロジーです。:

1. 何かを行い時間を必要とする "生成コード"。例えば、コードはリモートスクリプトをロードします。それは "シンガー" です。
2. 準備が整ったらすぐ "生成コード" の結果が欲しい "消費コード"。多くの関数がその結果を必要とするかもしれません。それらは "ファン" です。
3. *promise* は "生成コード" と "消費コード" をリンクする特別な JavaScript オブジェクトです。今回のアナロジーではそれは "購読リスト" です。生成コードは約束された結果を生成するために必要な時間をとります。そして "promise" は準備ができたら、購読したすべてのコードが結果を利用できるようにします。

JavaScript の promise は追加の特徴や制限があり単純な 購読リスト よりも複雑であるため、このアナロジーはあまり正確ではありません。しかし、最初に理解には良いです。

promise オブジェクトのコンストラクタ構文は次の通りです:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (生成コード, "シンガー")
});
```

`new Promise` へ渡される関数は *executor(執行者)* と呼ばれます。primise が作成されると、自動的に呼ばれます。それは最終的に結果と一緒に終了する生成コードを含んでいます。上記のアナロジーの言葉では、executor は "シンガー" です。

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

![](promise-resolve-reject.png)

ここには、シンプルな executor があります。:

```js run
let promise = new Promise(function(resolve, reject) {
  // promise が作られたとき、関数は自動的に実行されます

  alert(resolve); // function () { [native code] }
  alert(reject);  // function () { [native code] }

  // 1秒後、ジョブが "done!" という結果と一緒に完了したことを合図します
  setTimeout(() => *!*resolve("done!")*/!*, 1000);
});
```

上のコードを実行すると2つの事が見えます:

1. executor は自動的かつ即座に呼ばれます(`new Promise` によって)。
2. executor は2つの引数を受け取ります: `resolve` と `reject` です -- これらの関数は JavaScript エンジンから来ており、これらを作る必要はありません。代わりに、executor は準備ができた際にそれらを呼ぶ必要があります。

1秒後、executor は結果を生成するために `resolve("done")` を呼び出します。:

![](promise-resolve-1.png)

これは、 "ジョブが正常に完了した" 例でした。

そして、次はエラーで executor が promise を拒否する例です。:

```js
let promise = new Promise(function(resolve, reject) {
  // 1秒後、ジョブがエラーで終わったことを合図します
=======
Imagine that you're a top singer, and fans ask day and night for your upcoming single.

To get some relief, you promise to send it to them when it's published. You give your fans a list to which they can subscribe for updates. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, if plans to publish the song are cancelled, they will still be notified.

Everyone is happy, because the people don't crowd you any more, and fans, because they won't miss the single.

This is a real-life analogy for things we often have in programming:

1. A "producing code" that does something and takes time. For instance, the code loads data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.

The analogy isn't terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it's fine to begin with.

The constructor syntax for a promise object is:

```js
let promise = new Promise(function(resolve, reject) {
  // executor (the producing code, "singer")
});
```

The function passed to `new Promise` is called the *executor*. When the promise is created, this executor function runs automatically. It contains the producing code, that should eventually produce a result. In terms of the analogy above: the executor is the "singer".

The resulting `promise` object has internal properties:

- `state` — initially "pending", then changes to either "fulfilled" or "rejected",
- `result` — an arbitrary value, initially `undefined`.

When the executor finishes the job, it should call one of the functions that it gets as arguments:

- `resolve(value)` — to indicate that the job finished successfully:
    - sets `state` to `"fulfilled"`,
    - sets `result` to `value`.
- `reject(error)` — to indicate that an error occurred:
    - sets `state` to `"rejected"`,
    - sets `result` to `error`.

![](promise-resolve-reject.png)

Later we'll see how these changes become known to "fans".

Here's an example of a Promise constructor and a simple executor function with its "producing code" (the `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => *!*resolve("done")*/!*, 1000);
});
```

We can see two things by running the code above:

1. The executor is called automatically and immediately (by the `new Promise`).
2. The executor receives two arguments: `resolve` and `reject` — these functions are pre-defined by the JavaScript engine. So we don't need to create them. We only should call one of them when ready.

After one second of "processing" the executor calls `resolve("done")` to produce the result:

![](promise-resolve-1.png)

That was an example of a successful job completion, a "fulfilled promise".

And now an example of the executor rejecting the promise with an error:

```js
let promise = new Promise(function(resolve, reject) {
  // after 1 second signal that the job is finished with an error
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
  setTimeout(() => *!*reject(new Error("Whoops!"))*/!*, 1000);
});
```

![](promise-reject-1.png)

<<<<<<< HEAD
要約すると、executor はジョブ(通常は時間のかかる何か)を行い、その後、対応する promise オブジェクトの状態を変更するために、`resolve` または `reject` を呼び出します。

解決または拒否されている promise は、 "pending" の promise とは対象的に "settled" と呼ばれます。

````smart header="1つの結果またはエラーのみです"
executor は1つの `resolve` または `reject` だけを呼びだす必要があります。promise の状態の変化は最後のものです。

さらなるすべての `resolve` や `reject` は無視されます:
=======
To summarize, the executor should do a job (something that takes time usually) and then call `resolve` or `reject` to change the state of the corresponding Promise object.

The Promise that is either resolved or rejected is called "settled", as opposed to a initially "pending" Promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or one `reject`. The promise's state change is final.

All further calls of `resolve` and `reject` are ignored:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js
let promise = new Promise(function(resolve, reject) {
  resolve("done");

<<<<<<< HEAD
  reject(new Error("…")); // 無視されます
  setTimeout(() => resolve("…")); // 無視されます
});
```

この考えは、executor により行われたジョブは1つの結果またはエラーのみを持つということです。プログラミングでは、ストリームやキューなど、多くの "フロー" の結果を許容する他のデータ構造が存在します。それらには promise と比較したときに長所と短所があります。それらは JavaScript のコアではサポートされておらず、promsise が提供する幾つかの言語機能が不足していますが、ここでは promise に集中するためにそれらは説明しません。

また、1つ以上の引数で `resolve/reject` を呼び出した場合、最初の引数が使われ、次の引数は無視されます。
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

## 消費者: ".then" and ".catch" 

promise オブジェクトは生成コード(executor)と消費関数(結果/エラーを受け取りたいもの)の間のリンクとして機能します。消費関数は `promise.then` と `promise.catch` メソッドを使用して登録することができます。

`.then` の構文は次の通りです:

```js
promise.then(
  function(result) { /* 成功した結果を扱う */ },
  function(error) { /* エラーを扱う */ }
);
```

最初の関数の引数は、promise が解決され結果を得たときに実行されます。そして2つ目は -- 拒否され、エラーを取得したときに実行されます。

例:
=======
  reject(new Error("…")); // ignored
  setTimeout(() => resolve("…")); // ignored
});
```

The idea is that a job done by the executor may have only one result or an error.

Also, `resolve`/`reject` expect only one argument (or none) and will ignore additional arguments.
````

```smart header="Reject with `Error` objects"
In case something goes wrong, we can call `reject` with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
```

````smart header="Immediately calling `resolve`/`reject`"
In practice, an executor usually does something asynchronously and calls `resolve`/`reject` after some time, but it doesn't have to. We also can call `resolve` or `reject` immediately, like this:

```js
let promise = new Promise(function(resolve, reject) {
  // not taking our time to do the job
  resolve(123); // immediately give the result: 123
});
```

For instance, this might happen when we start to do a job but then see that everything has already been completed and  cached.

That's fine. We immediately have a resolved promise.
````

```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them from our "consuming code". We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
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

The first argument of `.then` is a function that:

1. runs when the promise is resolved, and
2. receives the result.

The second argument of `.then` is a function that:

1. runs when the promise is rejected, and
2. receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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

拒否の場合:
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
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
*/!*
);
```

<<<<<<< HEAD
もし、正常完了の場合だけを扱いたい場合は、`.then` に1つの引数だけを指定することもできます。:
=======
If we're interested only in successful completions, then we can provide only one function argument to `.then`:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

*!*
<<<<<<< HEAD
promise.then(alert); // 1秒後に "done!" を表示
*/!*
```

エラーの場合だけ興味があれば、`.then(null, function)` またはその "エイリアス" である `.catch(function)` を使います。
=======
promise.then(alert); // shows "done!" after 1 second
*/!*
```

### catch

If we're interested only in errors, then we can use `null` as the first argument: `.then(null, errorHandlingFunction)`. Or we can use `.catch(errorHandlingFunction)`, which is exactly the same:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477


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

````smart header="完了済みの promises の `then` はすぐに実行されます"
promise が pending の場合、`.then/catch` ハンドラは結果を待ちます。そうではなく、promise がすでに settled である場合は直ちに実行されます。:

```js run
// 即座に promise が解決されます
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (すぐに表示されます)
```

これは時間がかかることもあればすぐに終わることもあるジョブにとっては便利です。ハンドラは両方の場合に実行されることが保証されています。
````

````smart header="`.then/catch` のハンドラは常に非同期です"
さらに正確に言うと、`.then/catch` ハンドラが実行されるとき、それは最初に内部キューに入ります。JavaScript エンジンはキューからハンドラを取り出し、`setTimeout(..., 0)` と同じように現在のコードが終了した際に実行します。

言い換えると、`.then(handler)` がトリガするとき、それは `setTimeout(handler, 0)` のようなことをします。

下の例では、promise は直ちに解決されます。なので、`.then(alert)` はすぐにトリガします: `alert` 呼び出しはキューに格納され、コードが終了した後即座に実行します。

```js run
// 即座に解決された promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (現在のコード終了直後)

alert("code finished"); // このアラートが最初に表示されます
```

したがって、`.then` の後にあるコードは常にハンドラの前に実行されます(たとえ事前に解決された promise だとしても)。通常それは重要ではありませんが、場面によっては重要な場合があります。
````

さて、非同期コードを書くにあたり、promise がどのように役立つか、より実践的な例を見てみましょう。

## 例: loadScript 

以前のチャプターで、スクリプトを読み込むための関数 `loadScript` がありました。

思い出すために、ここにコールバックベースのパターンを示します。:
=======
// .catch(f) is the same as promise.then(null, f)
promise.catch(alert); // shows "Error: Whoops!" after 1 second
*/!*
```

The call `.catch(f)` is a complete analog of `.then(null, f)`, it's just a shorthand.

### finally

Just like there's a `finally` clause in a regular `try {...} catch {...}`, there's `finally` in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that it always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed any more, no matter what the outcome is.

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
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("result"), 2000)
    })
      .finally(() => alert("Promise ready"))
      .then(result => alert(result)); // <-- .then handles the result
    ```

    And here there's an error in the promise, passed through `finally` to `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch handles the error object
    ```  

    That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.

    We'll talk more about promise chaining and result-passing between handlers in the next chapter.

3. Last, but not least, `.finally(f)` is a more convenient syntax than `.then(f, f)`: no need to duplicate the function `f`.

````smart header="On settled promises handlers runs immediately"
If a promise is pending, `.then/catch/finally` handlers wait for the result. Otherwise, if a promise has already settled, they execute immediately:

```js run
// an immediately resolved promise
let promise = new Promise(resolve => resolve("done!"));

promise.then(alert); // done! (shows up right now)
```

The good thing is: a `.then` handler is guaranteed to run whether the promise takes time or settles it immediately.
````

Next, let's see more practical examples of how promises can help us to write asynchronous code.

## Example: loadScript [#loadscript]

We've got the `loadScript` function for loading a script from the previous chapter.

Here's the callback-based variant, just to remind us of it:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
<<<<<<< HEAD
  script.onerror = () => callback(new Error(`Script load error ` + src));
=======
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

  document.head.append(script);
}
```

<<<<<<< HEAD
promise を使って再実装してみましょう。

新しい関数 `loadScript` はコールバックを必要としません。代わりに、読み込みが完了したときに解決する promise オブジェクトを生成し返します。外部コードは `.then` を使用してそれにハンドラを追加することができます。:
=======
Let's rewrite it using Promises.

The new function `loadScript` will not require a callback. Instead, it will create and return a Promise object that resolves when the loading is complete. The outer code can add handlers (subscribing functions) to it using `.then`:
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

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
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477

promise.then(
  script => alert(`${script.src} is loaded!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('One more handler to do something else!'));
```

<<<<<<< HEAD
コールバックベースのパターンと比べると利点がすぐにわかります。:

```compare minus="Callbacks" plus="Promises"
- `loadScript` を呼び出す際、`callback` 関数を準備する必要があります。つまり、`loadScript` が呼ばれる *前* に、その結果で何をするのか知っておかなければなりません。
- コールバックは1つだけです。
+ Promise を使うと自然な順番で物事をコード化することができます。最初に `loadScript` を走らせ、`.then` はその結果をどうするかを記述します。
+ いつでも、必要なだけ promise に対する `.then` を呼び出すことが可能です。
```

promise はより良いコードフローと柔軟性をもたらします。しかしもっと多くのことがあります。それらについては次のチャプターで見ていきましょう。
=======
We can immediately see a few benefits over the callback-based pattern:


| Promises | Callbacks |
|----------|-----------|
| Promises allow us to do things in the natural order. First, we run `loadScript(script)`, and `.then` we write what to do with the result. | We must have a `callback` function at our disposal when calling `loadScript(script, callback)`. In other words, we must know what to do with the result *before* `loadScript` is called. |
| We can call `.then` on a Promise as many times as we want. Each time, we're adding a new "fan", a new subscribing function, to the "subscription list". More about this in the next chapter: [](info:promise-chaining). | There can be only one callback. |

So Promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> 9cb33f4039e5751bfd0e2bca565a37aa463fb477
