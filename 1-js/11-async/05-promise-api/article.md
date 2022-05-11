# Promise API

`Promise` クラスには 6 つの静的メソッドがあります。ここでそれらのユースケースについて簡単に説明します。

## Promise.all

並列に複数の promise を実行し、すべてが準備できるまで待ちたいとしましょう。

例えば、平行で複数の URL をダウンロードし、すべてが完了したらコンテンツを処理する場合です。

これが `Promise.all` の目的です。

構文は次の通りです:

```js
let promise = Promise.all(iterable);
```

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

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 各 url を promise の fetch(github url) へマップする
let requests = urls.map(url => fetch(url));

// Promise.all はすべてのジョブが解決されるまで待ちます
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

名前からGithubユーザのユーザ情報を取得するより大きな例です（id で商品の配列をフェッチできますが、ロジックは同じです）:

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // すべてのレスポンスが用意できたら HTTP ステータスコードが見られます
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // 各 url で 200 が表示されます
    }

    return responses;
  })
  // それぞれの中身を読むために、レスポンスの配列を response.json() の配列にマッピングします
  .then(responses => Promise.all(responses.map(r => r.json())))
  // すべての JSON応答が解析され、"user" はそれらの配列です。
  .then(users => users.forEach(user => alert(user.name)));
```

**いずれかの promise が reject された場合、`Promise.all` により返却された promise は即座にエラーと一緒に reject します。**

例:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

ここでは、2つ目の promise が2秒後に reject されます。それは即座に `Promise.all` の reject に繋がるため、`catch` が実行されます。: reject されたエラーは `Promise.all` 全体の結果になります。

```warn header="エラー時の場合, 他の promise は無視されます"
ある promise が reject がされると、`Promise.all` は即座に reject し、配列の他の promise を完全に忘れます。これらの結果は無視されます。

例えば、上の例のように複数の `fetch` 呼び出しがあり、1つが失敗した場合、他の promise は依然として実行中ですが、`Promise.all` はこれ以上ウォッチしません。おそらく正常に解決されますが、結果は無視されます。

`promise` には "キャンセル" の考え方はないので、`Promise.all` はキャンセルしません。[別の章](info:fetch-abort)では、これに役立つ `AbortController` について説明しています。がこれは Promise API の一部ではありません。
```

````smart header="`Promise.all(iterable)` は `iterable` の中で非 promise の項目を許可します"
通常、`Promise.all(iterable)` は promise の iterable (ほとんどの場合は配列)を受け付けます。しかし、もしそれらのオブジェクトが promise ではない場合、`Promise.resolve` でラップします。

例えば、ここでは結果は `[1, 2, 3]` になります:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2, // Promise.resolve(2) と扱われる
  3  // Promise.resolve(3) と扱われる
]).then(alert); // 1, 2, 3
```

したがって、必要に応じて準備済みの値を `Promise.all` に渡せます。
````

## Promise.allSettled

[recent browser="new"]

`Promise.all` はいずれかの promise が reject されると、全体として reject されます。これは "白か黒か" のケースにはよいです。続行するために *すべての* 成功した結果が必要な場合です:

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
]).then(render); // render メソッドはすべての fetch の結果が必要
```

`Promise.allSettled` は結果に関わらずすべての promise が解決するまで待ちます。結果の配列は以下を持ちます:

- 成功したレスポンスの場合: `{status:"fulfilled", value:result}`
- エラーの場合: `{status:"rejected", reason:error}`

例えば、複数のユーザに対する情報をフェッチしたいとします。たとえ1リクエストが失敗しても、他の結果はほしいです。

`Promise.allSettled` を使いましょう:

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

このコードで、`promises.map` は入力値を取り、`p => Promise.resolve(p)` でそれらを promise に変換（非 promise が渡された場合に備えて）し、`.then` ハンドラに追加します。

ハンドラは成功した結果 `value` を `{status:'fulfilled', value}` に、エラー `reason` は `{status:'rejected', reason}` に変換します。これは `Promise.allSettled` のフォーマットです。

これで、指定された *すべて* の promise の結果を得る（たとえいくつかが reject されても） `Promise.allSettled` が利用できます。

## Promise.race

これは `Promise.all` と同様ですが、すべてが完了するのを待つのではなく、最初の結果(またはエラー)のみを待ちます。

構文です:

```js
let promise = Promise.race(iterable);
```

例えば、ここでは結果は `1` になります:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

なので、最初の結果/エラーが `Promise.race` 全体の結果になります。最初の確定した promise が "レースに勝った" 後、それ以外の結果/エラーは無視されます。


## Promise.any

`Promise.race` と同様ですが、最初の履行した(fulfilled) promise のみを待ち、その結果を得ます。指定された promise がすべて reject された場合、返却された promise は [`AggregateError`](mdn:js/AggregateError) で reject されます（`errors` プロパティにすべての promise エラーを格納する特別なエラーオブジェクトです）。

構文は次の通りです:

```js
let promise = Promise.any(iterable);
```

例えば、ここでは結果は `1` になります:

```js run
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

最初の promise が一番はやいですが、reject されたため、2つ目の promise が結果になっています。最初の履行した(fulfilled)promise が "レースに勝ち"、他の結果はすべて無視されます。

これは promise がすべて失敗した例です:

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

ご覧の通り、失敗した promise のエラーオブジェクトは `AggregateError` オブジェクトの `errors` プロパティで利用可能です。

## Promise.resolve/reject

最近のコードでは、`Promise.resolve` と `Promise.reject` メソッドはめったに必要とされません。`async/await` 構文([少し後](info:async-await)で説明します) によって、これらがやや時代遅れになるためです。

ここでは完全性のためと、何らかの理由で `async/await` が使用できない場合のために説明します。

### Promise.resolve

`Promise.resolve(value)` は結果 `value` をもつ解決された promise を作成します。

以下と同様です:

```js
let promise = new Promise(resolve => resolve(value));
```

このメソッドは、関数が promise を返すことが期待される場合の互換性のために使用されます。

例えば、以下の `loadCached` 関数は、URL をフェッチし、コンテンツを記憶（キャッシュ）します。同じURLに対する将来の呼び出し時には、キャッシュから即座にコンテンツが返されますが、promise にするために `Promise.resolve` を使用します。これで戻り値は常に promise になります:

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

関数は promise を返すことが保証されているため、`loadCached(url).then(…)` と書くことができます。`loadCached` の後に常に `.then` が使用でき、これが行 `(*)` の `Promise.resolve` の目的です。

### Promise.reject

`Promise.reject(error)` は `error` を持つ reject された promise を作成します。

以下と同じです:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

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
