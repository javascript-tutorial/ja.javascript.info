# Async/await

"async/await" と呼ばれる、より快適に promise を利用する特別な構文があります。驚くほど簡単に理解し、使用することができます。

## Async 関数

`async` キーワードから始めましょう。次のように関数の前に置くことができます:

```js
async function f() {
  return 1;
}
```

関数の前の用語 "async" は1つの単純なことを意味します: 関数は常に promise を返します。コード中に `return <非 promise>` がある場合、JavaScript は自動的にその値を持つ 解決された promise にラップします。

例えば、上のコードは 結果 `1` を持つ解決された promise を返します。テストしてみましょう: t it:

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

...明示的に promise を返すこともでき、それは同じです:

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

したがって、`async` は関数が promise を返すことを保証し、非promise をその中にラップします。シンプルですよね？しかし、それだけではありません。`async` 関数の中でのみ動作する別のキーワード `await` があります。これはとてもクールです。

## Await

構文:

```js
// async 関数の中でのみ動作します
let value = await promise;
```

キーワード `await` は promise が確定しその結果を返すまで、JavaScript を待機させます。 ult.

これは1秒で解決する promise の例です:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

*!*
  let result = await promise; // promise が解決するまで待ちます (*)
*/!*

  alert(result); // "done!"
}

f();
```

関数の実行は行 `(*)` で "一時停止" し、promise が確定したときに再開し、`result` がその結果になります。 そのため、上のコードは1秒後に "done!" を表示します。

`await` は文字通り promise が確定するまで JavaScript を待ってから、その結果で続くことに注目しましょう。その間、エンジンは他のジョブ(他のスクリプトを実行し、イベントを処理するなど)を実行することができるため、CPUリソースを必要としません。

これは、`promise.then` よりも promise の結果を得るためのより洗練された構文です。読みやすく、書くのが簡単です。

````warn header="通常の関数で `await` を使うことはできません"
非async関数で `await` を使おうとした場合、構文エラーになります。:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

関数の前に `async` を置き忘れた場合にこのエラーが発生します。先程言ったように、`await` は `async function` の中でのみ動作します。
````

チャプター <info:promise-chaining> から例 `showAvatar()` を取り、`async/await` を使って書き直してみましょう:

1. `.then` 呼び出しを `await` に置き換える必要があります。
2. また、機能させるために関数を `async` にする必要があります。

```js run
async function showAvatar() {

  // JSON を読み込む
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github ユーザを読み込む
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // アバターを表示する
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3秒待つ
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

非常にスッキリし、読みやすいですよね？前よりもはるかに良いです。

````smart header="`await` はトップレベルのコードでは動作しません"
`await` を使い始めたばかりの人は忘れる傾向がありますが、トップレベルのコードで `await` を書くことはできません。それはうまく行きません:

```js run
// トップレベルのコードでは構文エラー
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

なので、await をするコードに対しては async 関数をラップする必要があります。ちょうど上の例で示しているように。
````
````smart header="`await` は thenable を許容します"
`promise.then` のように、`await` は thenable オブジェクト(`then` メソッドを呼ぶことができるもの)を使うことができます。繰り返しになりますが、このアイデアは、サードパーティオブジェクトは promise ではなく、promise 互換である場合があるということです(`.then` をサポートしている場合、`await` で使えます)。

例えば、ここで `await` は `new Thenable(1)` を許容します:
```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1000ms 後に this.num*2 で解決する
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 1秒待って、結果は 2　になる
  let result = await new Thenable(1);
  alert(result);
}

f();
```

もし `await` が `.then` で非promise オブジェクトを得た場合、引数としてネイティブ関数 `resolve`, `reject` を提供しているメソッドを呼び出します。次に `await` はいずれかが呼ばれるまで待ち(上の例では、行 `(*)` です)、その結果で進みます。

````

````smart header="Async メソッド"
クラスメソッドもまた async になれます。ただ前に `async` を置くだけです。

Like here:

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
  .then(alert); // 1
```
意味は同じです: 返却される値が promise であることを保証し、`await` を有効にします。

````
## エラー処理

もし promise が正常に解決すると、`await promise` は結果を返します。しかし拒否(reject) の場合はエラーをスローします。それはちょうどその行に `throw` 文があるように振る舞います。

このコードは:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

...これと同じです:

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

実際には、promise を拒否するまでに時間がかかる場合があります。なので、`await` は待ち、その後エラーをスローします。

エラーは `try..catch` でキャッチすることができ、それは通常の `throw` と同じ方法です:

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

エラーの場合、コントロールは `catch` ブロックにジャンプします。複数行をラップすることも可能です:

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // fetch と response.json 両方のエラーをキャッチ
    alert(err);
  }
}

f();
```

もし `try..catch` がない場合、async 関数 `f()` の呼び出しによって生成された promise は拒否されます。それを処理にするには `.catch` を追加します。:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() は拒否された promise になる
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

そこに `.catch` を追加し忘れると、未処理の promise エラーを得ます(それはコンソールで見えます)。チャプター <info:promise-chaining> で説明した通り、グローバルイベントハンドラを使用することでこのようなエラーをキャッチすることができます。


```smart header="`async/await` と `promise.then/catch`"
`async/await` を使用するとき、`.then` はほとんど必要がありません。なぜなら `await` は私たちを待っているからです。そして `.catch` の代わりに通常の `try..catch` を使うことができます。それは通常（常にではないですが）より便利です。

しかし、コードの最上位のレベルでは、`async` 関数の外にいるときは構文的に `await` を使うことができないため、最終的な結果または落ちるようなエラーを処理するために `.then/catch` を追加するのが普通です。

上の例の行 `(*)` のように。
```

````smart header="`async/await` は `Promise.all` とうまく動作します"
複数の promise を待つ必要があるとき、`Promise.all` でラップしてから `await` できます。 

```js
// 結果の配列をまつ
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

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
