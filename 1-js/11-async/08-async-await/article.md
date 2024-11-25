# Async/await

<<<<<<< HEAD
"async/await" と呼ばれる、より快適に promise を利用する特別な構文があります。驚くほど簡単に理解し、使用することができます。

## Async 関数

`async` キーワードから始めましょう。次のように関数の前に置くことができます:
=======
There's a special syntax to work with promises in a more comfortable fashion, called "async/await". It's surprisingly easy to understand and use.

## Async functions

Let's start with the `async` keyword. It can be placed before a function, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
async function f() {
  return 1;
}
```

<<<<<<< HEAD
関数の前の用語 "async" は1つの単純なことを意味します: 関数は常に promise を返します。コード中に `return <非 promise>` がある場合、JavaScript は自動的にその値を持つ 解決された promise にラップします。

例えば、上のコードは 結果 `1` を持つ解決された promise を返します。テストしてみましょう: t it:
=======
The word "async" before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.

For instance, this function returns a resolved promise with the result of `1`; let's test it:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

<<<<<<< HEAD
...明示的に promise を返すこともでき、それは同じです:
=======
...We could explicitly return a promise, which would be the same:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

<<<<<<< HEAD
したがって、`async` は関数が promise を返すことを保証し、非promise をその中にラップします。シンプルですよね？しかし、それだけではありません。`async` 関数の中でのみ動作する別のキーワード `await` があります。これはとてもクールです。

## Await

構文:

```js
// async 関数の中でのみ動作します
let value = await promise;
```

キーワード `await` は promise が確定しその結果を返すまで、JavaScript を待機させます。 ult.

これは1秒で解決する promise の例です:
=======
So, `async` ensures that the function returns a promise, and wraps non-promises in it. Simple enough, right? But not only that. There's another keyword, `await`, that works only inside `async` functions, and it's pretty cool.

## Await

The syntax:

```js
// works only inside async functions
let value = await promise;
```

The keyword `await` makes JavaScript wait until that promise settles and returns its result.

Here's an example with a promise that resolves in 1 second:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
<<<<<<< HEAD
  let result = await promise; // promise が解決するまで待ちます (*)
=======
  let result = await promise; // wait until the promise resolves (*)
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*/!*

  alert(result); // "done!"
}

f();
```

<<<<<<< HEAD
関数の実行は行 `(*)` で "一時停止" し、promise が確定したときに再開し、`result` がその結果になります。 そのため、上のコードは1秒後に "done!" を表示します。

`await` は文字通り promise が確定するまで JavaScript を待ってから、その結果で続くことに注目しましょう。その間、エンジンは他のジョブ(他のスクリプトを実行し、イベントを処理するなど)を実行することができるため、CPUリソースを必要としません。

これは、`promise.then` よりも promise の結果を得るためのより洗練された構文です。読みやすく、書くのが簡単です。

````warn header="通常の関数で `await` を使うことはできません"
非async関数で `await` を使おうとした場合、構文エラーになります。:
=======
The function execution "pauses" at the line `(*)` and resumes when the promise settles, with `result` becoming its result. So the code above shows "done!" in one second.

Let's emphasize: `await` literally suspends the function execution until the promise settles, and then resumes it with the promise result. That doesn't cost any CPU resources, because the JavaScript engine can do other jobs in the meantime: execute other scripts, handle events, etc.

It's just a more elegant syntax of getting the promise result than `promise.then`. And, it's easier to read and write.

````warn header="Can't use `await` in regular functions"
If we try to use `await` in a non-async function, there would be a syntax error:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

<<<<<<< HEAD
関数の前に `async` を置き忘れた場合にこのエラーが発生します。先程言ったように、`await` は `async function` の中でのみ動作します。
````

チャプター <info:promise-chaining> から例 `showAvatar()` を取り、`async/await` を使って書き直してみましょう:

1. `.then` 呼び出しを `await` に置き換える必要があります。
2. また、機能させるために関数を `async` にする必要があります。
=======
We may get this error if we forget to put `async` before a function. As stated earlier, `await` only works inside an `async` function.
````

Let's take the `showAvatar()` example from the chapter <info:promise-chaining> and rewrite it using `async/await`:

1. We'll need to replace `.then` calls with `await`.
2. Also we should make the function `async` for them to work.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function showAvatar() {

<<<<<<< HEAD
  // JSON を読み込む
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github ユーザを読み込む
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // アバターを表示する
=======
  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

<<<<<<< HEAD
  // 3秒待つ
=======
  // wait 3 seconds
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

<<<<<<< HEAD
非常にスッキリし、読みやすいですよね？前よりもはるかに良いです。

````smart header="`await` はトップレベルのコードでは動作しません"
最近のブラウザは、モジュールの内側ではトップレベルの `await` は問題なく動作します。モジュールに関しては <info:modules-intro> の記事で説明します。

例:

```js run module
// モジュールのトップレベルでコードが実行される想定です
=======
Pretty clean and easy to read, right? Much better than before.

````smart header="Modern browsers allow top-level `await` in modules"
In modern browsers, `await` on top level works just fine, when we're inside a module. We'll cover modules in article <info:modules-intro>.

For instance:

```js run module
// we assume this code runs at top level, inside a module
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

console.log(user);
```

<<<<<<< HEAD
モジュール未使用、あるいは[古いブラウザ](https://caniuse.com/mdn-javascript_operators_await_top_level)でサポートが必要な場合、無名の async 関数でラップする方法があります。

次のようになります:
=======
If we're not using modules, or [older browsers](https://caniuse.com/mdn-javascript_operators_await_top_level) must be supported, there's a universal recipe: wrapping into an anonymous async function.

Like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

````

<<<<<<< HEAD
````smart header="`await` は thenable を許容します"
`promise.then` のように、`await` は thenable オブジェクト(`then` メソッドを呼ぶことができるもの)を使うことができます。繰り返しになりますが、このアイデアは、サードパーティオブジェクトは promise ではなく、promise 互換である場合があるということです(`.then` をサポートしている場合、`await` で使えます)。

例えば、ここで `await` は `new Thenable(1)` を許容します:
=======
````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
<<<<<<< HEAD
    alert(resolve); // function() { native code }
    // 1000ms 後に this.num*2 で解決する
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 1秒待って、結果は 2　になる
=======
    alert(resolve);
    // resolve with this.num*2 after 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // waits for 1 second, then result becomes 2
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
  let result = await new Thenable(1);
  alert(result);
}

f();
```

<<<<<<< HEAD
もし `await` が `.then` で非promise オブジェクトを得た場合、引数としてネイティブ関数 `resolve`, `reject` を提供しているメソッドを呼び出します。次に `await` はいずれかが呼ばれるまで待ち(上の例では、行 `(*)` です)、その結果で進みます。
````

````smart header="Async メソッド"
クラスメソッドもまた async になれます。ただ前に `async` を置くだけです。
=======
If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
<<<<<<< HEAD
  .then(alert); // 1
```
意味は同じです: 返却される値が promise であることを保証し、`await` を有効にします。

````
## エラー処理

もし promise が正常に解決すると、`await promise` は結果を返します。しかし拒否(reject) の場合はエラーをスローします。それはちょうどその行に `throw` 文があるように振る舞います。

このコードは:
=======
  .then(alert); // 1 (this is the same as (result => alert(result)))
```
The meaning is the same: it ensures that the returned value is a promise and enables `await`.

````
## Error handling

If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.

This code:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

<<<<<<< HEAD
...これと同じです:
=======
...is the same as this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

<<<<<<< HEAD
実際には、promise を拒否するまでに時間がかかる場合があります。なので、`await` は待ち、その後エラーをスローします。

エラーは `try..catch` でキャッチすることができ、それは通常の `throw` と同じ方法です:
=======
In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.

We can catch that error using `try..catch`, the same way as a regular `throw`:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

<<<<<<< HEAD
エラーの場合、コントロールは `catch` ブロックにジャンプします。複数行をラップすることも可能です:
=======
In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
<<<<<<< HEAD
    // fetch と response.json 両方のエラーをキャッチ
=======
    // catches errors both in fetch and response.json
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
    alert(err);
  }
}

f();
```

<<<<<<< HEAD
もし `try..catch` がない場合、async 関数 `f()` の呼び出しによって生成された promise は拒否されます。それを処理にするには `.catch` を追加します。:
=======
If we don't have `try..catch`, then the promise generated by the call of the async function `f()` becomes rejected. We can append `.catch` to handle it:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

<<<<<<< HEAD
// f() は拒否された promise になる
=======
// f() becomes a rejected promise
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

<<<<<<< HEAD
そこに `.catch` を追加し忘れると、未処理の promise エラーを得ます(それはコンソールで見えます)。チャプター <info:promise-chaining> で説明した通り、グローバルイベントハンドラを使用することでこのようなエラーをキャッチすることができます。


```smart header="`async/await` と `promise.then/catch`"
`async/await` を使用するとき、`.then` はほとんど必要がありません。なぜなら `await` は私たちを待っているからです。そして `.catch` の代わりに通常の `try..catch` を使うことができます。それは通常（常にではないですが）より便利です。

しかし、コードの最上位のレベルでは、`async` 関数の外にいるときは構文的に `await` を使うことができないため、最終的な結果または落ちるようなエラーを処理するために `.then/catch` を追加するのが普通です。上の例の行 `(*)` のように。
```

````smart header="`async/await` は `Promise.all` とうまく動作します"
複数の promise を待つ必要があるとき、`Promise.all` でラップしてから `await` できます。 

```js
// 結果の配列をまつ
=======
If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
```

````smart header="`async/await` works well with `Promise.all`"
When we need to wait for multiple promises, we can wrap them in `Promise.all` and then `await`:

```js
// wait for the array of results
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

<<<<<<< HEAD
エラーが発生した場合、それは通常通り伝搬します: 失敗した promise から `Promise.all` に伝播し、呼び出しのまわりで `try..catch` を使ってキャッチができる例外になります。

````

## サマリ

関数の前の `async` キーワードは2つの効果があります:

1. 常に promise を返します
2. その中で `await` を使えるようにします

promise の前の `await` キーワードは、 promise が確定するまで JavaScript を待たせ、次のことをします: 

1. それがエラーであれば、まさにその場所で `throw error` が呼び出されたのと同じ例外が生成されます。
2. それ以外の場合は、結果を返すので、値に割り当てることができます。

共に、読み書きするのが簡単な非同期コードを書くことができる素晴らしいフレームワークを提供します。

`async/await` と一緒に `promise.then/catch` を書く必要はほとんどありませんが、時には（例えば最も外側のスコープで）これらのメソッドを使わなければならないことがあるので、これらが promise に基づいていることを忘れてはいけません。 また、`Promise.all` は同時に多くのタスクを待つ良い方法です。
=======
In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary

The `async` keyword before a function has two effects:

1. Makes it always return a promise.
2. Allows `await` to be used in it.

The `await` keyword before a promise makes JavaScript wait until that promise settles, and then:

1. If it's an error, an exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
