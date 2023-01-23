# Promise API

<<<<<<< HEAD
`Promise` クラスには 6 つの静的メソッドがあります。ここでそれらのユースケースについて簡単に説明します。

## Promise.all

並列に複数の promise を実行し、すべてが準備できるまで待ちたいとしましょう。

例えば、平行で複数の URL をダウンロードし、すべてが完了したらコンテンツを処理する場合です。

これが `Promise.all` の目的です。

構文は次の通りです:
=======
There are 6 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.

That's what `Promise.all` is for.

The syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = Promise.all(iterable);
```

<<<<<<< HEAD
`Promise.all` は iterable(反復可能, 通常は promise の配列)を取り、新しい promise を返します。

新しい promise は、配列の各 promise がすべて解決され、それらの結果を配列に持つと解決(resolve)されます。

例えば、下の `Promise.all` は 3 秒後に解決され、その後結果は配列 `[1, 2, 3]` です。:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 promise が準備できた時: 各 promise は配列の中身に寄与します
```

結果の配列要素の順番は元の promise の順番と同じであることに注意してください。たとえ1つ目の promise が解決まで最も時間がかかったとしても、結果の配列の中では先頭にあります。

一般的なやり方は、処理データの配列を promise の配列にマップし、それを `Promise.all` にラップすることです。

例えば、URL の配列がある場合、次のようにしてすべてをフェッチできます:
=======
`Promise.all` takes an iterable (usually, an array of promises) and returns a new promise.

The new promise resolves when all listed promises are resolved, and the array of their results becomes its result.

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// 各 url を promise の fetch(github url) へマップする
let requests = urls.map(url => fetch(url));

// Promise.all はすべてのジョブが解決されるまで待ちます
=======
// map every url to the promise of the fetch
let requests = urls.map(url => fetch(url));

// Promise.all waits until all jobs are resolved
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
名前からGithubユーザのユーザ情報を取得するより大きな例です（id で商品の配列をフェッチできますが、ロジックは同じです）:
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // すべてのレスポンスが用意できたら HTTP ステータスコードが見られます
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 各 url で 200 が表示されます
=======
    // all responses are resolved successfully
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // shows 200 for every url
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    }

    return responses;
  })
<<<<<<< HEAD
  // それぞれの中身を読むために、レスポンスの配列を response.json() の配列にマッピングします
  .then(responses => Promise.all(responses.map(r => r.json())))
  // すべての JSON応答が解析され、"user" はそれらの配列です。
  .then(users => users.forEach(user => alert(user.name)));
```

**いずれかの promise が reject された場合、`Promise.all` により返却された promise は即座にエラーと一緒に reject します。**

例:
=======
  // map array of responses into an array of response.json() to read their content
  .then(responses => Promise.all(responses.map(r => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then(users => users.forEach(user => alert(user.name)));
```

**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

```warn header="エラー時の場合, 他の promise は無視されます"
ある promise が reject がされると、`Promise.all` は即座に reject し、配列の他の promise を完全に忘れます。これらの結果は無視されます。

例えば、上の例のように複数の `fetch` 呼び出しがあり、1つが失敗した場合、他の promise は依然として実行中ですが、`Promise.all` はこれ以上ウォッチしません。おそらく正常に解決されますが、結果は無視されます。

`promise` には "キャンセル" の考え方はないので、`Promise.all` はキャンセルしません。[別の章](info:fetch-abort)では、これに役立つ `AbortController` について説明しています。がこれは Promise API の一部ではありません。
```

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

したがって、必要に応じて準備済みの値を `Promise.all` に渡せます。
=======
  2,
  3
]).then(alert); // 1, 2, 3
```

So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
`Promise.all` はいずれかの promise が reject されると、全体として reject されます。これは "白か黒か" のケースにはよいです。続行するために *すべての* 成功した結果が必要な場合です:
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // render メソッドはすべての fetch の結果が必要
```

`Promise.allSettled` は結果に関わらずすべての promise が解決するまで待ちます。結果の配列は以下を持ちます:

- 成功したレスポンスの場合: `{status:"fulfilled", value:result}`
- エラーの場合: `{status:"rejected", reason:error}`

例えば、複数のユーザに対する情報をフェッチしたいとします。たとえ1リクエストが失敗しても、他の結果はほしいです。

`Promise.allSettled` を使いましょう:
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
上の行 `(*)` の `results` は以下になります:
```js
[
  {status: 'fulfilled', value: ...レスポンス...},
  {status: 'fulfilled', value: ...レスポンス...},
  {status: 'rejected', reason: ...エラーオブジェクト...}
]
```

そのため、各 promise に対してステータスと `値 or エラー` を取得します。

### Polyfill

ブラウザでは、`Promise.allSettled` をサポートしていません。が polyfill するのは簡単です:
=======
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
if (!Promise.allSettled) {
  const rejectHandler = reason => ({ status: 'rejected', reason });

  const resolveHandler = value => ({ status: 'fulfilled', value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
    return Promise.all(convertedPromises);
  };
}
```

<<<<<<< HEAD
このコードで、`promises.map` は入力値を取り、`p => Promise.resolve(p)` でそれらを promise に変換（非 promise が渡された場合に備えて）し、`.then` ハンドラに追加します。

ハンドラは成功した結果 `value` を `{status:'fulfilled', value}` に、エラー `reason` は `{status:'rejected', reason}` に変換します。これは `Promise.allSettled` のフォーマットです。

これで、指定された *すべて* の promise の結果を得る（たとえいくつかが reject されても） `Promise.allSettled` が利用できます。

## Promise.race

これは `Promise.all` と同様ですが、すべてが完了するのを待つのではなく、最初の結果(またはエラー)のみを待ちます。

構文です:
=======
In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).

The syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = Promise.race(iterable);
```

<<<<<<< HEAD
例えば、ここでは結果は `1` になります:
=======
For instance, here the result will be `1`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
なので、最初の結果/エラーが `Promise.race` 全体の結果になります。最初の確定した promise が "レースに勝った" 後、それ以外の結果/エラーは無視されます。
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


## Promise.any

<<<<<<< HEAD
`Promise.race` と同様ですが、最初の履行した(fulfilled) promise のみを待ち、その結果を得ます。指定された promise がすべて reject された場合、返却された promise は [`AggregateError`](mdn:js/AggregateError) で reject されます（`errors` プロパティにすべての promise エラーを格納する特別なエラーオブジェクトです）。

構文は次の通りです:
=======
Similar to `Promise.race`, but waits only for the first fulfilled promise and gets its result. If all of the given promises are rejected, then the returned promise is rejected with [`AggregateError`](mdn:js/AggregateError) - a special error object that stores all promise errors in its `errors` property.

The syntax is:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = Promise.any(iterable);
```

<<<<<<< HEAD
例えば、ここでは結果は `1` になります:
=======
For instance, here the result will be `1`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
最初の promise が一番はやいですが、reject されたため、2つ目の promise が結果になっています。最初の履行した(fulfilled)promise が "レースに勝ち"、他の結果はすべて無視されます。

これは promise がすべて失敗した例です:
=======
The first promise here was fastest, but it was rejected, so the second promise became the result. After the first fulfilled promise "wins the race", all further results are ignored.

Here's an example when all promises fail:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
]).catch(error => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

<<<<<<< HEAD
ご覧の通り、失敗した promise のエラーオブジェクトは `AggregateError` オブジェクトの `errors` プロパティで利用可能です。

## Promise.resolve/reject

最近のコードでは、`Promise.resolve` と `Promise.reject` メソッドはめったに必要とされません。`async/await` 構文([少し後](info:async-await)で説明します) によって、これらがやや時代遅れになるためです。

ここでは完全性のためと、何らかの理由で `async/await` が使用できない場合のために説明します。

### Promise.resolve

`Promise.resolve(value)` は結果 `value` をもつ解決された promise を作成します。

以下と同様です:
=======
As you can see, error objects for failed promises are available in the `errors` property of the `AggregateError` object.

## Promise.resolve/reject

Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = new Promise(resolve => resolve(value));
```

<<<<<<< HEAD
このメソッドは、関数が promise を返すことが期待される場合の互換性のために使用されます。

例えば、以下の `loadCached` 関数は、URL をフェッチし、コンテンツを記憶（キャッシュ）します。同じURLに対する将来の呼び出し時には、キャッシュから即座にコンテンツが返されますが、promise にするために `Promise.resolve` を使用します。これで戻り値は常に promise になります:
=======
The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
関数は promise を返すことが保証されているため、`loadCached(url).then(…)` と書くことができます。`loadCached` の後に常に `.then` が使用でき、これが行 `(*)` の `Promise.resolve` の目的です。

### Promise.reject

`Promise.reject(error)` は `error` を持つ reject された promise を作成します。

以下と同じです:
=======
We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<<<<<<< HEAD
実際、このメソッドはほとんど使われません。

## サマリ 

`Promise` クラスには 6 つの静的なメソッドがあります。:

1. `Promise.all(promises)` -- すべての promise が解決するのを待って、結果の配列を返します。与えられた promise のいずれかが拒否されると、 `Promise.all` のエラーとなり、他のすべての結果は無視されます。
2. `Promise.allSettled(promises)` (最近追加されたメソッド) -- すべての promise が完了するのを待って、以下のオブジェクト配列として結果を返します:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (fulfilled の場合) or `reason` (rejected の場合).
3. `Promise.race(promises)` -- 最初の promise の解決を待ち、その結果/エラーを返します。
4. `Promise.any(promises)` (最近追加されたメソッド) -- 最初に履行された(fulfilled) promise を待ち、その結果を返します。指定したすべての promise が reject された場合、[`AggregateError`](mdn:js/AggregateError) が `Promise.any` のエラーになります。
5. `Promise.resolve(value)` -- 与えられた値で promise を解決(resolve)します
6. `Promise.reject(error)` -- 与えられたエラーで promise を拒否(reject)します

これらのうち、`Promise.all` が実践では最も一般的です。
=======
In practice, this method is almost never used.

## Summary

There are 6 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.any(promises)` (recently added method) -- waits for the first promise to fulfill, and its result becomes the outcome. If all of the given promises are rejected, [`AggregateError`](mdn:js/AggregateError) becomes the error of `Promise.any`.
5. `Promise.resolve(value)` -- makes a resolved promise with the given value.
6. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of all these, `Promise.all` is probably the most common in practice.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
