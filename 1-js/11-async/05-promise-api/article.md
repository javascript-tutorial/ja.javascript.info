# Promise API

<<<<<<< HEAD
`Promise` クラスには 4 つの静的メソッドがあります。ここではそのユースケースについて簡単に説明します。

## Promise.resolve

構文:

```js
let promise = Promise.resolve(value);
```

指定された `value` で解決(resolve)された promise を返します。

次と同じです:

```js
let promise = new Promise(resolve => resolve(value));
```

このメソッドはすでに値を持っているが、promise で "ラップ" したい場合に使われます。

例えば、下の `loadCached` 関数は `url` をフェッチし、将来の同じ URL 呼び出しですぐに結果を返すために、それを覚えます。:

```js
function loadCached(url) {
  let cache = loadCached.cache || (loadCached.cache = new Map());

  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache[url] = text;
      return text;
    });
}
```

`loadCached(url).then(…)` を使うことができます。なぜなら、この関数は promise を返すことを保証しているからです。それが、行 `(*)` の `Promise.resolve` の目的です: インタフェースを統一します。これにより、`loadCached` の後で常に `.then` が使えます。

## Promise.reject

構文:

```js
let promise = Promise.reject(error);
```

`error` で拒否(reject)された promise を生成します。 

次と同じです:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

ここでは完全性のために説明しますが、実際のコードではほとんど使われません。

## Promise.all

並列に複数の promise を実行し、すべてが準備できるまで待つためのメソッドです。

構文は次の通りです:

```js
let promise = Promise.all(iterable);
```

これは promise を持つ `iterable(反復可能な)` なオブジェクトを取ります。技術的には任意の iterable が可能ですが、通常は配列であり、新しい promise を返します。新しい promise はそれらのすべてが解決され、結果を配列に持ったときに解決されます。

例えば、下の `Promise.all` は 3 秒後に解決され、その後結果は配列 `[1, 2, 3]` です。:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 promise が準備できた時: 各 promise は配列の中身に寄与します
```

相対的な順序は同じであることに注意してください。たとえ1つ目の promise が解決まで最も時間がかかったとしても、結果の配列の中では依然として先頭です。

一般的なやり方は、ジョブデータの配列を promise の配列にマップし、それを `Promise.all` にラップすることです。

例えば、URL の配列を持っている場合、次のようにしてフェッチできます:
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.

That's what `Promise.all` is for.

The syntax is:

```js
let promise = Promise.all([...promises...]);
```

`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled, and the array of their results becomes its result.

For instance, the `Promise.all` below settles after 3 seconds, and then its result is an array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 when promises are ready: each promise contributes an array member
```

Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.

A common trick is to map an array of job data into an array of promises, and then wrap that into `Promise.all`.

For instance, if we have an array of URLs, we can fetch them all like this:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// 各 url を promise の fetch(github url) へマップする
let requests = urls.map(url => fetch(url));

// Promise.all はすべてのジョブが解決されるまで待ちます
=======
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
github ユーザ名の配列に対して(または id の配列でも可能です。ロジックは同じです)、ユーザ情報を取得するより実践的な例です。:
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // すべてのレスポンスが用意できたら HTTP ステータスコードが見れます
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 各 url で 200 が表示されます
=======
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
    }

    return responses;
  })
<<<<<<< HEAD
  // それぞれの中身を読むために、レスポンスの配列を response.json() の配列にマッピングします
  .then(responses => Promise.all(responses.map(r => r.json())))
  // すべての JSON応答が解析され、"user" はそれらの配列です。
  .then(users => users.forEach(user => alert(user.name)));
```

いずれかの promise が reject された場合、`Promise.all` は即座にエラーと一緒に reject します。

例:

=======
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**

For instance:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
ここでは、2つ目の promise が2秒後に reject されます。それは即座に `Promise.all` の reject に繋がるため、`catch` が実行されます。: reject されたエラーは `Promise.all` 全体の結果になります。

重要な点は、promise は実行を "キャンセル" したり "廃止" する方法は提供していないということです。したがって、他の promise は実行を続け、最終的に解決されますが、それらの結果は無視されます。

これを回避する方法があります: エラーが発生した場合、 promise を `clearTimeout` (またはキャンセル)するために追加のコード書く、またはエラーを結果の配列の中のメンバとして表示させる、です(これについてはこのチャプターの下にタスクを見てください)。

````smart header="`Promise.all(iterable)` は `iterable` の中で非 promise の項目を許可します"
通常、`Promise.all(iterable)` は promise の iterable (ほとんどの場合は配列)を受け付けます。しかし、もしそれらのオブジェクトが promise ではない場合、`Promise.resolve` でラップします。

例えば、ここでは結果は `[1, 2, 3]` になります:
=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".

For instance, here the results are `[1, 2, 3]`:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
<<<<<<< HEAD
  2, // Promise.resolve(2) と扱われる
  3  // Promise.resolve(3) と扱われる
]).then(alert); // 1, 2, 3
```

したがって、私たちは便宜的な場合に、非 promise の値を `Promise.all` に渡すことができます。

````

## Promise.race

これは `Promise.all` と同様に promise の iterable を取りますが、すべてが完了するのを待つ代わりに -- 最初の結果(またはエラー)を待ち、続けます。

構文です:
=======
  2,
  3
]).then(alert); // 1, 2, 3
```

So we are able to pass ready values to `Promise.all` where convenient.
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

The `results` in the line `(*)` above will be:
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

So for each promise we get its status and `value/error`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}
```

In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `v` into `{state:'fulfilled', value:v}`, and an error `r` into `{state:'rejected', reason:r}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).

The syntax is:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js
let promise = Promise.race(iterable);
```

<<<<<<< HEAD
例えば、ここでは結果は `1` になります:
=======
For instance, here the result will be `1`:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
なので、最初の結果/エラーが `Promise.race` 全体の結果になります。最初の確定した promise が "競争に勝った" 後、それ以外の結果/エラーは無視されます。

## サマリ 

`Promise` クラスには 4 つの静的なメソッドがあります。:

1. `Promise.resolve(value)` -- 与えられた値で promise を解決(resolve)します
2. `Promise.reject(error)` -- 与えられたエラーで promise を拒否(reject)します
3. `Promise.all(promises)` -- すべての promise が解決するのを待って、結果の配列を返します。 与えられた promise が拒否されると、それは `Promise.all` のエラーになり、他のすべての結果は無視されます。
4. `Promise.race(promises)` -- 最初の promise の解決を待ち、その結果/エラーが結果になります。

これら4つのうち、`Promise.all` が実際には最も一般的です。

=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.


## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:

```js
let promise = new Promise(resolve => resolve(value));
```

The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

In practice, this method is almost never used.

## Summary

There are 5 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `state`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of these five, `Promise.all` is probably the most common in practice.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
