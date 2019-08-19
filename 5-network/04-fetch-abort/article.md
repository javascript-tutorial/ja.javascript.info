
# Fetch: Abort

<<<<<<< HEAD
`fetch` を中止するのは少し面倒です。思い出してください、`fetch` は promise を返します。そして、JavaScript には一般的に promise を "中止する" という概念はありません。では、どうやって fetch をキャンセルしましょう？

このような目的のための、特別な組み込みのオブジェクトがあります。:
`AbortController`.

使い方はとても簡単です:

- Step 1: コントローラを作成します:
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we abort a `fetch`?

There's a special built-in object for such purposes: `AbortController`, that can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is pretty simple:

- Step 1: create a controller:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

    ```js
    let controller = new AbortController();
    ```

<<<<<<< HEAD
    コントローラは非常にシンプルなオブジェクトです。単一のメソッド `abort()` と、単一のプロパティ `signal` を持っています。`abort()` が呼ばれると、`abort` イベントが `controller.signal` で発生します。:

    このようになります:
=======
    A controller is an extremely simple object.

    - It has a single method `abort()`, and a single property `signal`.
    - When `abort()` is called:
        - `abort` event triggers on `controller.signal`
        - `controller.signal.aborted` property becomes `true`.

    All parties interested to learn about `abort()` call set listeners on `controller.signal` to track it.

    Like this (without `fetch` yet):
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

<<<<<<< HEAD
    // controller.abort() が呼ばれるとトリガーします
=======
    // triggers when controller.abort() is called
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

<<<<<<< HEAD
    alert(signal.aborted); // true (abort 後)
    ```

- Step 2: `signal` プロパティを `fetch` オプションに渡します:
=======
    alert(signal.aborted); // true
    ```

- Step 2: pass the `signal` property to `fetch` option:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

<<<<<<< HEAD
    これで `fetch` は signal をリッスンします。

- Step 3: 中止するために `controller.abort()` を呼びます:
=======
    The `fetch` method knows how to work with `AbortController`, it listens to `abort` on `signal`.

- Step 3: to abort, call `controller.abort()`:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

    ```js
    controller.abort();
    ```

<<<<<<< HEAD
    これで終わりです: `fetch` は `signal` からのイベントを得て、リクエストを中止します。

fetch が中止されたとき、その promise は `AbortError` という名前のエラーで reject されます。なので、次のように処理できます:

```js run async
// 1秒で中止
=======
    We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`:

```js run async
// abort in 1 second
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
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
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
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
=======
**`AbortController` is scalable, it allows to cancel multiple fetches at once.**

For instance, here we fetch many `urls` in parallel, and the controller aborts them all:

```js
let urls = [...]; // a list of urls to fetch in parallel
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

let controller = new AbortController();

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
// if controller.abort() is called from elsewhere,
// it aborts all fetches
```

If we have our own asynchronous jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event:
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923

```js
let urls = [...];
let controller = new AbortController();

<<<<<<< HEAD
let ourJob = new Promise((resolve, reject) => {
=======
let ourJob = new Promise((resolve, reject) => { // our task
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
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

// if controller.abort() is called from elsewhere,
// it aborts all fetches and ourJob
```

So `AbortController` is not only for `fetch`, it's a universal object to abort asynchronous tasks, and `fetch` has built-in integration with it.
>>>>>>> 852ee189170d9022f67ab6d387aeae76810b5923
