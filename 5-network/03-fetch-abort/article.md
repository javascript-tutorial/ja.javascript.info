
# Fetch: Abort

<<<<<<< HEAD
`fetch` を中止するのは少し面倒です。思い出してください、`fetch` は promise を返します。そして、JavaScript には一般的に promise を "中止する" という概念はありません。では、どうやって fetch をキャンセルしましょう？

このような目的のための、特別な組み込みのオブジェクトがあります。:
`AbortController`.

使い方はとても簡単です:

- Step 1: コントローラを作成します:
=======
Aborting a `fetch` is a little bit tricky. Remember, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel a fetch?

There's a special built-in object for such purposes: `AbortController`.

The usage is pretty simple:

- Step 1: create a controller:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    ```js
    let controller = new AbortController();
    ```

<<<<<<< HEAD
    コントローラは非常にシンプルなオブジェクトです。単一のメソッド `abort()` と、単一のプロパティ `signal` を持っています。`abort()` が呼ばれると、`abort` イベントが `controller.signal` で発生します。:

    このようになります:
=======
    A controller is an extremely simple object. It has a single method `abort()`, and a single property `signal`. When `abort()` is called, the `abort` event triggers on `controller.signal`:

    Like this:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

<<<<<<< HEAD
    // controller.abort() が呼ばれるとトリガーします
=======
    // triggers when controller.abort() is called
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

<<<<<<< HEAD
    alert(signal.aborted); // true (abort 後)
    ```

- Step 2: `signal` プロパティを `fetch` オプションに渡します:
=======
    alert(signal.aborted); // true (after abort)
    ```

- Step 2: pass the `signal` property to `fetch` option:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
    Now `fetch` listens to the signal.

- Step 3: to abort, call `controller.abort()`:
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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

When a fetch is aborted, its promise rejects with an error named `AbortError`, so we should handle it:

```js run async
// abort in 1 second
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
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
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
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
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb

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
// from elsewhere:
// controller.abort() stops all fetches
```

If we have our own jobs, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb


```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => {
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all([...fetchJobs, ourJob]);

<<<<<<< HEAD
// 他の場所から:
// controller.abort() ですべての fetch と独自のジョブを停止します
=======
// from elsewhere:
// controller.abort() stops all fetches and ourJob
>>>>>>> a0266c574c0ab8a0834dd38ed65e7e4ee27f9cdb
```
