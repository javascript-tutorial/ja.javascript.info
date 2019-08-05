
# Fetch: Abort

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
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // abort() を処理
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

**`AbortController` はスケーラブルで, 複数の fetch を一度にキャンセルすることができます。**

例えばここでは、平行して複数の `urls` を fetch し、コントローラはそれらすべてを中止します。:

```js
let urls = [...]; // 平行して fetch する url のリスト

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// 他の場所から:
// controller.abort() ですべての fetch を停止します
```

もし `fetch` とは別の独自のジョブがある場合も、一つの `AbortController` を使用して fetch と一緒にそれらを停止することができます。


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

// 他の場所から:
// controller.abort() ですべての fetch と独自のジョブを停止します
```
