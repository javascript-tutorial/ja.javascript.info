
# Fetch: Abort

<<<<<<< HEAD
`fetch` を中止するのは少し面倒です。思い出してください、`fetch` は promise を返します。そして、JavaScript には一般的に promise を "中止する" という概念はありません。では、どうやって fetch をキャンセルしましょう？

このような目的のための、特別な組み込みのオブジェクトがあります。:
`AbortController`.

使い方はとても簡単です:

- Step 1: コントローラを作成します:

    ```js
    let controller = new AbortController();
    ```

    コントローラは非常にシンプルなオブジェクトです。単一のメソッド `abort()` と、単一のプロパティ `signal` を持っています。`abort()` が呼ばれると、`abort` イベントが `controller.signal` で発生します。:

    このようになります:

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // controller.abort() が呼ばれるとトリガーします
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

    alert(signal.aborted); // true (abort 後)
    ```

- Step 2: `signal` プロパティを `fetch` オプションに渡します:

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    これで `fetch` は signal をリッスンします。

- Step 3: 中止するために `controller.abort()` を呼びます:

    ```js
    controller.abort();
    ```

    これで終わりです: `fetch` は `signal` からのイベントを得て、リクエストを中止します。

fetch が中止されたとき、その promise は `AbortError` という名前のエラーで reject されます。なので、次のように処理できます:

```js run async
// 1秒で中止
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object

Create a controller:

```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event listeners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.

Generally, we have two parties in the process:
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.

Here's the full example (without `fetch` yet):

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```

As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what's valuable is that `fetch` knows how to work with the `AbortController` object. It's integrated in it.

## Using with fetch

To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:

```js run async
// abort in 1 second
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
<<<<<<< HEAD
  if (err.name == 'AbortError') { // abort() を処理
=======
  if (err.name == 'AbortError') { // handle abort()
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

<<<<<<< HEAD
**`AbortController` はスケーラブルで, 複数の fetch を一度にキャンセルすることができます。**

例えばここでは、平行して複数の `urls` を fetch し、コントローラはそれらすべてを中止します。:

```js
let urls = [...]; // 平行して fetch する url のリスト

let controller = new AbortController();

=======
## AbortController is scalable

`AbortController` is scalable. It allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:

```js
let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

<<<<<<< HEAD
// 他の場所から:
// controller.abort() ですべての fetch を停止します
```

もし `fetch` とは別の独自のジョブがある場合も、一つの `AbortController` を使用して fetch と一緒にそれらを停止することができます。

=======
// if controller.abort() is called from anywhere,
// it aborts all fetches
```

If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let urls = [...];
let controller = new AbortController();

<<<<<<< HEAD
let ourJob = new Promise((resolve, reject) => {
=======
let ourJob = new Promise((resolve, reject) => { // our task
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  ...
  controller.signal.addEventListener('abort', reject);
});

<<<<<<< HEAD
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all([...fetchJobs, ourJob]);

// 他の場所から:
// controller.abort() ですべての fetch と独自のジョブを停止します
```
=======
let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
```

## Summary

- `AbortController` is a simple object that generates an `abort` event on its `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
