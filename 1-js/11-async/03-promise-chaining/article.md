
<<<<<<< HEAD
# Promises チェーン

チャプター <info:callbacks> で言及した問題に戻りましょう。

- 私たちは次々に実行される一連の非同期タスクを持っています。例えば、スクリプトの読み込みです。
- 上手くコード化するにはどうすればよいでしょう？

Promise はそれをするためのいくつかの方法を提供します。

このチャプターでは promise チェーンを説明します。

次のようになります:
=======
# Promises chaining

Let's return to the problem mentioned in the chapter <info:callbacks>: we have a sequence of asynchronous tasks to be done one after another. For instance, loading scripts. How can we code it well?

Promises provide a couple of recipes to do that.

In this chapter we cover promise chaining.

It looks like this:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000); // (*)

}).then(function(result) { // (**)

  alert(result); // 1
  return result * 2;

}).then(function(result) { // (***)

  alert(result); // 2
  return result * 2;

}).then(function(result) {

  alert(result); // 4
  return result * 2;

});
```

<<<<<<< HEAD
この考え方は、結果が `.then` ハンドラの連鎖(チェーン)を通じて渡されるということです。

ここでの流れは次の通りです:
1. 最初の promise は1秒で解決されます `(*)`,
2. その後、`.then` ハンドラが呼ばれます `(**)`,
3. 返却された値は次の `.then` ハンドラへ渡されます `(***)`,
4. ...同様に続きます。

結果がハンドラのチェーンに沿って渡されるので、一連の `alert` 呼び出しは `1` -> `2` -> `4` の順番で表示されます。

![](promise-then-chain.svg)

`promise.then` の呼び出しは promise を返すので、続けて次の `.then` を呼び出すことができます。そのためすべてのコードが機能します。

ハンドラが値を返すとき、それは promise の結果になります。なので、次の `.then` はそれと一緒に呼ばれます。

これらの言葉をより明確にするために、ここではチェーンの始まりがあります:

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result);
  return result * 2; // <-- (1)

}) // <-- (2)
// .then…
```

`.then` により返却される値は promise であるため、`(2)` で別の `.then` を追加することができます。`(1)` で値が返却されるとき、その promise は解決されるため、次のハンドラはその値で実行されます。

**よくある初心者向けの誤り: 技術的には単一の Promise に複数の `.then` を追加することもできます。これはチェーンではありません**

例:
=======
The idea is that the result is passed through the chain of `.then` handlers.

Here the flow is:
1. The initial promise resolves in 1 second `(*)`,
2. Then the `.then` handler is called `(**)`.
3. The value that it returns is passed to the next `.then` handler `(***)`
4. ...and so on.

As the result is passed along the chain of handlers, we can see a sequence of `alert` calls: `1` -> `2` -> `4`.

![](promise-then-chain.svg)

The whole thing works, because a call to `promise.then` returns a promise, so that we can call the next `.then` on it.

When a handler returns a value, it becomes the result of that promise, so the next `.then` is called with it.

**A classic newbie error: technically we can also add many `.then` to a single promise. This is not chaining.**

For example:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});

promise.then(function(result) {
  alert(result); // 1
  return result * 2;
});
```

<<<<<<< HEAD
...しかし、これは完全に別物です。ここに図があります(上記のチェーンと比較してください):

![](promise-then-many.svg)

同一の promise 上のすべての `.then` は同じ結果を得ます -- その promise の結果です。従って、上のコードでは、すべての `alert` は同じ `1` を表示します。それらの間での結果渡しはありません。

実際には、単一の promise に対し複数のハンドラが必要なケースはほとんどありません。チェーンの方がはるかに多く利用されます。

## promise の返却　

通常、`.then` ハンドラにより返却された値は、直ちに次のハンドラに渡されます。しかし例外もあります。

もし返却された値が promise である場合、それ以降の実行はその promise が解決するまで中断されます。その後、promise の結果が次の `.then` ハンドラに渡されます。

例:
=======
What we did here is just several handlers to one promise. They don't pass the result to each other, instead they process it independently.

Here's the picture (compare it with the chaining above):

![](promise-then-many.svg)

All `.then` on the same promise get the same result -- the result of that promise. So in the code above all `alert` show the same: `1`.

In practice we rarely need multiple handlers for one promise. Chaining is used much more often.

## Returning promises

A handler, used in `.then(handler)` may create and return a promise.

In that case further handlers wait until it settles, and then get its result.

For instance:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 1000);

}).then(function(result) {

  alert(result); // 1

*!*
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
*/!*

}).then(function(result) { // (**)

  alert(result); // 2

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });

}).then(function(result) {

  alert(result); // 4

});
```

<<<<<<< HEAD
ここで最初の `.then` は `1` を表示し、行 `(*)` で `new Promise(…)` を返します。1秒後、それは解決され、結果(`resolve` の引数, ここでは `result*2`) は行 `(**)` にある2番目の `.then` のハンドラに渡されます。それは `2` を表示し、同じことをします。

したがって、出力は再び 1 -> 2 > 4 ですが、今は `alert` 呼び出しの間に 1秒の遅延があります。

promise を返却することで、非同期アクションのチェーンを組み立てることができます。

## 例: loadScript 

`loadScript` でこの機能を使って、スクリプトを1つずつ順番にロードしてみましょう。:
=======
Here the first `.then` shows `1` and returns `new Promise(…)` in the line `(*)`. After one second it resolves, and the result (the argument of `resolve`, here it's `result * 2`) is passed on to handler of the second `.then`. That handler is in the line `(**)`, it shows `2` and does the same thing.

So the output is the same as in the previous example: 1 -> 2 -> 4, but now with 1 second delay between `alert` calls.

Returning promises allows us to build chains of asynchronous actions.

## Example: loadScript

Let's use this feature with the promisified `loadScript`, defined in the [previous chapter](info:promise-basics#loadscript), to load scripts one by one, in sequence:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
<<<<<<< HEAD
    // それらがロードされていることを表示するために、スクリプトで宣言されている関数を使用
=======
    // use functions declared in scripts
    // to show that they indeed loaded
    one();
    two();
    three();
  });
```

This code can be made bit shorter with arrow functions:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // scripts are loaded, we can use functions declared there
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    one();
    two();
    three();
  });
```

<<<<<<< HEAD
ここで、各 `loadScript` 呼び出しは promise を返し、次の `.then` はそれが解決されたときに実行されます。その後、次のスクリプトのロードを開始します。そのため、スクリプトは次々にロードされます。

私たちは、このチェーンにより多くの非同期アクションを追加することができます。ここで、このコードは依然として "フラット" であることに注目してください。それは大きくなっていますが右にではありません。"破滅のピラミッド" の兆候はありません。

技術的にはそれぞれの promise の後に、次のように promise を返却することなく直接 `.then` を書くことも可能であることに留意してください。:

```js run
loadScript("/article/promise-chaining/one.js").then(function(script1) {
  loadScript("/article/promise-chaining/two.js").then(function(script2) {
    loadScript("/article/promise-chaining/three.js").then(function(script3) {
      // この関数は変数 script1, script2 と script3 へアクセスすることができます
=======

Here each `loadScript` call returns a promise, and the next `.then` runs when it resolves. Then it initiates the loading of the next script. So scripts are loaded one after another.

We can add more asynchronous actions to the chain. Please note that the code is still "flat", it grows down, not to the right. There are no signs of "pyramid of doom".

Technically, we could add `.then` directly to each `loadScript`, like this:

```js run
loadScript("/article/promise-chaining/one.js").then(script1 => {
  loadScript("/article/promise-chaining/two.js").then(script2 => {
    loadScript("/article/promise-chaining/three.js").then(script3 => {
      // this function has access to variables script1, script2 and script3
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
      one();
      two();
      three();
    });
  });
});
```

<<<<<<< HEAD
このコードは同じことをします: 順番に3つのスクリプトをロードします。しかし、"右に大きくなります"。そのため、コールバックと同じ問題があります。それを避けるためにチェーン(`.then` から promise を返す)を使用してください。

ネストされた関数が外側のスコープ(ここでは最もネストしているコールバックはすべての変数 `scriptX` へアクセスできます)にアクセスできるため、 `.then` を直接書くこともできますが、それはルールではなく例外です。


````smart header="Thenables"
正確には、`.then` は任意の "thenable" オブジェクトを返す可能性があり、それは promise として同じように扱われます。

"thenable" オブジェクトとは、メソッド `.then` を持つオブジェクトです。

この思想は、サードパーティライブラリが彼ら自身の "promise 互換な" オブジェクトを実装できるというものです。それらは拡張されたメソッドのセットを持つことができますが、`.then` を実装しているため、ネイティブの promise とも互換があります。

これは thenable オブジェクトの例です:
=======
This code does the same: loads 3 scripts in sequence. But it "grows to the right". So we have the same problem as with callbacks.

People who start to use promises sometimes don't know about chaining, so they write it this way. Generally, chaining is preferred.

Sometimes it's ok to write `.then` directly, because the nested function has access to the outer scope. In the example above the most nested callback has access to all variables `script1`, `script2`, `script3`. But that's an exception rather than a rule.


````smart header="Thenables"
To be precise, a handler may return not exactly a promise, but a so-called "thenable" object - an arbitrary object that has a method `.then`. It will be treated the same way as a promise.

The idea is that 3rd-party libraries may implement "promise-compatible" objects of their own. They can have an extended set of methods, but also be compatible with native promises, because they implement `.then`.

Here's an example of a thenable object:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
<<<<<<< HEAD
    // 1秒後に this.num*2 で resolve する
=======
    // resolve with this.num*2 after the 1 second
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
<<<<<<< HEAD
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000ms 後に 2　を表示
```

JavaScript は行 `(*)` で `.then` ハンドラによって返却されたオブジェクトをチェックします: もし `then` という名前のメソッドが呼び出し可能であれば、ネイティブ関数 `resolve`, `reject` を引数として(executor 似ています)それを呼び出し、それらのいずれかが呼び出されるまで待ちます。上の例では、`resolve(2)` が1秒後に `(**)` で呼ばれます。その後、結果はチェーンのさらに下に渡されます。

この特徴により、カスタムオブジェクトを `Promise` から継承することなく、promise チェーンで統合することができます。
````


## より大きな例: fetch 

フロントエンドのプログラミングでは、promise はネットワークリクエストの場合にしばしば使われます。なので、その拡張された例を見てみましょう。

私たちは、リモートサーバからユーザに関する情報をロードするために [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) メソッドを使います。メソッドは非常に複雑で、多くの任意パラメータがありますが、基本の使い方はとてもシンプルです:
=======
*!*
    return new Thenable(result); // (*)
*/!*
  })
  .then(alert); // shows 2 after 1000ms
```

JavaScript checks the object returned by the `.then` handler in line `(*)`: if it has a callable method named `then`, then it calls that method providing native functions `resolve`, `reject` as arguments (similar to an executor) and waits until one of them is called. In the example above `resolve(2)` is called after 1 second `(**)`. Then the result is passed further down the chain.

This feature allows us to integrate custom objects with promise chains without having to inherit from `Promise`.
````


## Bigger example: fetch

In frontend programming promises are often used for network requests. So let's see an extended example of that.

We'll use the [fetch](info:fetch) method to load the information about the user from the remote server. It has a lot of optional parameters covered in [separate chapters](info:fetch), but the basic syntax is quite simple:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js
let promise = fetch(url);
```

<<<<<<< HEAD
これは、`url` へネットワークリクエストを行い、promise を返します。promise はリモートサーバがヘッダーで応答するとき、*完全なレスポンスがダウンロードされる前に* `response` オブジェクトで解決されます。

完全なレスポンスを見るためには、`response.text()` メソッドを呼ぶ必要があります: これは完全なテキストがリモートサーバからダウンロードされたときに解決され、そのテキストを結果とする promise を返します。

以下のコードは `user.json` へリクエストを行い、サーバからそのテキストをロードします:

```js run
fetch('/article/promise-chaining/user.json')
  // この .then はリモートサーバが応答したときに実行されます
  .then(function(response) {
    // response.text() は、レスポンスのダウンロードが完了した際に
    // 完全なレスポンステキストで解決される新たな promise を返します
    return response.text();
  })
  .then(function(text) {
    // ...そして、ここではリモートファイルの中身が参照できます
=======
This makes a network request to the `url` and returns a promise. The promise resolves with a `response` object when the remote server responds with headers, but *before the full response is downloaded*.

To read the full response, we should call the method `response.text()`: it returns a promise that resolves when the full text is downloaded from the remote server, with that text as a result.

The code below makes a request to `user.json` and loads its text from the server:

```js run
fetch('/article/promise-chaining/user.json')
  // .then below runs when the remote server responds
  .then(function(response) {
    // response.text() returns a new promise that resolves with the full response text
    // when it loads
    return response.text();
  })
  .then(function(text) {
    // ...and here's the content of the remote file
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

<<<<<<< HEAD
リモートデータを読んで、JSON としてパースするメソッド `response.json()` もあります。我々のケースでは、より一層便利なのでそれに置き換えてみます。

わかりやすくするために、アロー関数も使います:

```js run
// 上と同じですが、response.json() はリモートコンテンツを JSON としてパースします
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan
```

次に、ロードしたユーザで何かしてみましょう。

例えば、github へもう1つリクエストを行い、ユーザプロフィールを読み込みアバターを表示させてみます。:

```js run
// user.json へのリクエスト
fetch('/article/promise-chaining/user.json')
  // json としてロード
  .then(response => response.json())
  // github へのリクエスト
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // json としてロード
  .then(response => response.json())
  // ３秒間アバター画像を表示 (githubUser.avatar_url) 
=======
There is also a method `response.json()` that reads the remote data and parses it as JSON. In our case that's even more convenient, so let's switch to it.

We'll also use arrow functions for brevity:

```js run
// same as above, but response.json() parses the remote content as JSON
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan, got user name
```

Now let's do something with the loaded user.

For instance, we can make one more requests to GitHub, load the user profile and show the avatar:

```js run
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to GitHub
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

<<<<<<< HEAD
このコードは動作します(コードの詳細についてはコメントをみてください)が、完全に自己記述的であるべきです。ここには promise を使い始める人が行う典型的な問題があります。

行 `(*)` を見てください: アバターの表示が終了して削除された *後* に何かをするにはどうすればいいでしょうか？例えば、ユーザ情報を編集するためのフォームを表示したいとします。今のところ、方法はありません。

チェーンを拡張可能にするには、アバターの表示が終了したときに resolve を行う promise を返す必要があります。

次のようになります:
=======
The code works, see comments about the details. However, there's a potential problem in it, a typical error of those who begin to use promises.

Look at the line `(*)`: how can we do something *after* the avatar has finished showing and gets removed? For instance, we'd like to show a form for editing that user or something else. As of now, there's no way.

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

Like this:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
<<<<<<< HEAD
  .then(githubUser => new Promise(function(resolve, reject) {
=======
  .then(githubUser => new Promise(function(resolve, reject) { // (*)
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
<<<<<<< HEAD
      resolve(githubUser);
*/!*
    }, 3000);
  }))
  // 3秒後にトリガされます
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

今、`setTimeout` は `img.resolve()` を実行した直後に `resolve(githubUser)` を呼び出します。なので、チェーン内の次の `.then` に制御を渡し、ユーザデータを転送します。

ルールとして、非同期アクションは常に promise を返すべきです。

これは、あるアクションの後に別のアクションを実行させることができます。たとえ現時点ではチェーンの拡張予定はなくても、後で必要になるかもしれません。

最後に、先程のコードは再利用可能な関数に分割できます:
=======
      resolve(githubUser); // (**)
*/!*
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

That is, `.then` handler in line `(*)` now returns `new Promise`, that becomes settled only after the call of `resolve(githubUser)` in `setTimeout` `(**)`.

The next `.then` in chain will wait for that.

As a good practice, an asynchronous action should always return a promise.

That makes it possible to plan actions after it. Even if we don't plan to extend the chain now, we may need it later.

Finally, we can split the code into reusable functions:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

```js run
function loadJson(url) {
  return fetch(url)
    .then(response => response.json());
}

function loadGithubUser(name) {
  return fetch(`https://api.github.com/users/${name}`)
    .then(response => response.json());
}

function showAvatar(githubUser) {
  return new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

<<<<<<< HEAD
// 上記を使う:
=======
// Use them:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

<<<<<<< HEAD
## サマリ

もし `.then` (あるいは `catch/finally`)ハンドラが Promise を返した場合、チェーンの残りの部分はそれが確定するまで待ちます。その後、その結果(あるいはエラー)はさらに渡されていきます。

これは完全な図です:
=======
## Summary

If a `.then` (or `catch/finally`, doesn't matter) handler returns a promise, the rest of the chain waits until it settles. When it does, its result (or error) is passed further.

Here's a full picture:
>>>>>>> e515f80a9f076115a6e3fef8a30cd73e6db20054

![](promise-handler-variants.svg)
