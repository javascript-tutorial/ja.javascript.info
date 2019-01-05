# Promise API

<!-- test223344 -->

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

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// 各 url を promise の fetch(github url) へマップする
let requests = urls.map(url => fetch(url));

// Promise.all はすべてのジョブが解決されるまで待ちます
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

github ユーザ名の配列に対して(または id の配列でも可能です。ロジックは同じです)、ユーザ情報を取得するより実践的な例です。:

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
    // すべてのレスポンスが用意できたら HTTP ステータスコードが見れます
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

いずれかの promise が reject された場合、`Promise.all` は即座にエラーと一緒に reject します。

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

重要な点は、promise は実行を "キャンセル" したり "廃止" する方法は提供していないということです。したがって、他の promise は実行を続け、最終的に解決されますが、それらの結果は無視されます。

これを回避する方法があります: エラーが発生した場合、 promise を `clearTimeout` (またはキャンセル)するために追加のコード書く、またはエラーを結果の配列の中のメンバとして表示させる、です(これについてはこのチャプターの下にタスクを見てください)。

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

したがって、私たちは便宜的な場合に、非 promise の値を `Promise.all` に渡すことができます。

````

## Promise.race

これは `Promise.all` と同様に promise の iterable を取りますが、すべてが完了するのを待つ代わりに -- 最初の結果(またはエラー)を待ち、続けます。

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

なので、最初の結果/エラーが `Promise.race` 全体の結果になります。最初の確定した promise が "競争に勝った" 後、それ以外の結果/エラーは無視されます。

## サマリ 

`Promise` クラスには 4 つの静的なメソッドがあります。:

1. `Promise.resolve(value)` -- 与えられた値で promise を解決(resolve)します
2. `Promise.reject(error)` -- 与えられたエラーで promise を拒否(reject)します
3. `Promise.all(promises)` -- すべての promise が解決するのを待って、結果の配列を返します。 与えられた promise が拒否されると、それは `Promise.all` のエラーになり、他のすべての結果は無視されます。
4. `Promise.race(promises)` -- 最初の promise の解決を待ち、その結果/エラーが結果になります。

これら4つのうち、`Promise.all` が実際には最も一般的です。

