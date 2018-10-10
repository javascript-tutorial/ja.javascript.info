
# Promises チェーン

チャプター <info:callbacks> で言及した問題に戻りましょう。

- 私たちは次々に実行される一連の非同期タスクを持っています。例えば、スクリプトの読み込みです。
- 上手くコード化するにはどうすればよいでしょう？

Promise はそれをするためのいくつかの方法を提供します。

[cut]

このチャプターでは promise チェーンを説明します。

次のようになります:

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

この考え方は、結果が `.then` ハンドラのチェーンを通じて渡されるということです。

ここでの流れは次の通りです:
1. 最初の promise は1秒で解決されます `(*)`,
2. その後、`.then` ハンドラが呼ばれます `(**)`,
3. 返却された値は次の `.then` ハンドラへ渡されます `(***)`,
4. ...同様に続きます。

結果がハンドラのチェーンに沿って渡されるので、一連の `alert` 呼び出しは `1` -> `2` -> `4` の順番で表示されます。

![](promise-then-chain.png)

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

チェーンとは異なり、技術的には次のように1つの promise へ多くの `.then` を追加することも可能です。:

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

...しかし、これは完全に別物です。ここに図があります(上記のチェーンと比較してください):

![](promise-then-many.png)

同一の promise 上のすべての `.then` は同じ結果を得ます -- その promise の結果です。従って、上のコードでは、すべての `alert` は同じ `1` を表示します。それらの間での結果渡しはありません。

実際には、単一の promise に対し複数のハンドラが必要なケースはほとんどありません。チェーンの方がはるかに多く利用されます。

## promise の返却　[#Returning promises]

通常、`.then` ハンドラにより返却された値は、直ちに次のハンドラに渡されます。しかし例外もあります。

もし返却された値が promise である場合、それ以降の実行はその promise が解決するまで中断されます。その後、promise の結果が次の `.then` ハンドラに渡されます。

例:

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

ここで最初の `.then` は `1` を表示し、行 `(*)` で `new Promise(…)` を返します。1秒後、それは解決され、結果(`resolve` の引数, ここでは `result*2`) は行 `(**)` にある2番目の `.then` のハンドラに渡されます。それは `2` を表示し、同じことをします。

したがって、出力は再び 1 -> 2 > 4 ですが、今は `alert` 呼び出しの間に 1秒の遅延があります。

promise を返却することで、非同期アクションのチェーンを組み立てることができます。

## 例: loadScript [#Example: loadScript]

`loadScript` でこの機能を使って、スクリプトを1つずつ順番にロードしてみましょう。:

```js run
loadScript("/article/promise-chaining/one.js")
  .then(function(script) {
    return loadScript("/article/promise-chaining/two.js");
  })
  .then(function(script) {
    return loadScript("/article/promise-chaining/three.js");
  })
  .then(function(script) {
    // それらがロードされていることを表示するために、スクリプトで宣言されている関数を使用
    one();
    two();
    three();
  });
```

ここで、各 `loadScript` 呼び出しは promise を返し、次の `.then` はそれが解決されたときに実行されます。その後、次のスクリプトのロードを開始します。そのため、スクリプトは次々にロードされます。

私たちは、このチェーンにより多くの非同期アクションを追加することができます。ここで、このコードは依然として "フラット" であることに注目してください。それは大きくなっていますが右にではありません。"破滅のピラミッド" の兆候はありません。

技術的にはそれぞれの promise の後に、次のように promise を返却することなく直接 `.then` を書くことも可能であることに留意してください。:

```js run
loadScript("/article/promise-chaining/one.js").then(function(script1) {
  loadScript("/article/promise-chaining/two.js").then(function(script2) {
    loadScript("/article/promise-chaining/three.js").then(function(script3) {
      // この関数は変数 script1, script2 と script3 へアクセスすることができます
      one();
      two();
      three();
    });
  });
});
```

このコードは同じことをします: 順番に3つのスクリプトをロードします。しかし、"右に大きくなります"。そのため、コールバックと同じ問題があります。それを避けるためにチェーン(`.then` から promise を返す)を使用してください。

ネストされた関数が外側のスコープ(ここでは最もネストしているコールバックはすべての変数 `scriptX` へアクセスできます)にアクセスできるため、 `.then` を直接書くこともできますが、それはルールではなく例外です。


````smart header="Thenables"
正確には、`.then` は任意の "thenable" オブジェクトを返す可能性があり、それは promise として同じように扱われます。

"thenable" オブジェクトとは、メソッド `.then` を持つオブジェクトです。

この思想は、サードパーティライブラリが彼ら自身の "promise 互換な" オブジェクトを実装できるというものです。それらは拡張されたメソッドのセットを持つことができますが、`.then` を実装しているため、ネイティブの promise とも互換があります。

これは thenable オブジェクトの例です:

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1秒後に this.num*2 で resolve する
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000ms 後に 2　を表示
```

JavaScript は行 `(*)` で `.then` ハンドラによって返却されたオブジェクトをチェックします: もし `then` という名前のメソッドが呼び出し可能であれば、ネイティブ関数 `resolve`, `reject` を引数として(executor 似ています)それを呼び出し、それらのいずれかが呼び出されるまで待ちます。上の例では、`resolve(2)` が1秒後に `(**)` で呼ばれます。その後、結果はチェーンのさらに下に渡されます。

この特徴により、カスタムオブジェクトを `Promise` から継承することなく、promise チェーンで統合することができます。
````


## より大きな例: fetch [#Bigger example: fetch]

フロントエンドのプログラミングでは、promise はネットワークリクエストの場合にしばしば使われます。なので、その拡張された例を見てみましょう。

私たちは、リモートサーバからユーザに関する情報をロードするために [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) メソッドを使います。メソッドは非常に複雑で、多くの任意パラメータがありますが、基本の使い方はとてもシンプルです:

```js
let promise = fetch(url);
```

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
    alert(text); // {"name": "iliakan", isAdmin: true}
  });
```

リモートデータを読んで、JSON としてパースするメソッド `response.json()` もあります。我々のケースでは、より一層便利なのでそれに置き換えてみます。

わかりやすくするために、アロー関数も使います:

```js run
// 上と同じですが、response.json() はリモートコンテンツを JSON としてパースします
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => alert(user.name)); // iliakan
```

Now let's do something with the loaded user.

For instance, we can make one more request to github, load the user profile and show the avatar:

```js run
// Make a request for user.json
fetch('/article/promise-chaining/user.json')
  // Load it as json
  .then(response => response.json())
  // Make a request to github
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  // Load the response as json
  .then(response => response.json())
  // Show the avatar image (githubUser.avatar_url) for 3 seconds (maybe animate it)
  .then(githubUser => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => img.remove(), 3000); // (*)
  });
```

The code works, see comments about the details, but it should be quite self-descriptive. Although, there's a potential problem in it, a typical error of those who begin to use promises.

Look at the line `(*)`: how can we do something *after* the avatar has finished showing and gets removed? For instance, we'd like to show a form for editing that user or something else. As of now, there's no way.

To make the chain extendable, we need to return a promise that resolves when the avatar finishes showing.

Like this:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
*!*
  .then(githubUser => new Promise(function(resolve, reject) {
*/!*
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
*!*
      resolve(githubUser);
*/!*
    }, 3000);
  }))
  // triggers after 3 seconds
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
```

Now right after `setTimeout` runs `img.remove()`, it calls `resolve(githubUser)`, thus passing the control to the next `.then` in the chain and passing forward the user data.

As a rule, an asynchronous action should always return a promise.

That makes possible to plan actions after it. Even if we don't plan to extend the chain now, we may need it later.

Finally, we can split the code into reusable functions:

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

// Use them:
loadJson('/article/promise-chaining/user.json')
  .then(user => loadGithubUser(user.name))
  .then(showAvatar)
  .then(githubUser => alert(`Finished showing ${githubUser.name}`));
  // ...
```

## Error handling

Asynchronous actions may sometimes fail: in case of an error the corresponding promise becomes rejected. For instance, `fetch` fails if the remote server is not available. We can use `.catch` to handle errors (rejections).

Promise chaining is great at that aspect. When a promise rejects, the control jumps to the closest rejection handler down the chain. That's very convenient in practice.

For instance, in the code below the URL is wrong (no such server) and `.catch` handles the error:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

Or, maybe, everything is all right with the server, but the response is not a valid JSON:

```js run
fetch('/') // fetch works fine now, the server responds successfully
*!*
  .then(response => response.json()) // rejects: the page is HTML, not a valid json
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```


In the example below we append `.catch` to handle all errors in the avatar-loading-and-showing chain:

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise(function(resolve, reject) {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
  .catch(error => alert(error.message));
```

Here `.catch` doesn't trigger at all, because there are no errors. But if any of the promises above rejects, then it would execute.

## Implicit try..catch

The code of the executor and promise handlers has an "invisible `try..catch`" around it. If an error happens, it gets caught and treated as a rejection.

For instance, this code:

```js run
new Promise(function(resolve, reject) {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Works the same way as this:

```js run
new Promise(function(resolve, reject) {
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(alert); // Error: Whoops!
```

The "invisible `try..catch`" around the executor automatically catches the error and treats it as a rejection.

That's so not only in the executor, but in handlers as well. If we `throw` inside `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  throw new Error("Whoops!"); // rejects the promise
*/!*
}).catch(alert); // Error: Whoops!
```

That's so not only for `throw`, but for any errors, including programming errors as well:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  blabla(); // no such function
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

As a side effect, the final `.catch` not only catches explicit rejections, but also occasional errors in the handlers above.

## Rethrowing

As we already noticed, `.catch` behaves like `try..catch`. We may have as many `.then` as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if can't handle. The same thing is possible for promises. If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:
```js run
// the execution: catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

Here the `.catch` block finishes normally. So the next successful handler is called. Or it could return something, that would be the same.

...And here the `.catch` block analyzes the error and throws it again:

```js run
// the execution: catch -> catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // handle it
  } else {
    alert("Can't handle such error");

*!*
    throw error; // throwing this or another error jumps to the next catch
*/!*
  }

}).then(function() {
  /* never runs here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way

});
```

The handler `(*)` catches the error and just can't handle it, because it's not `URIError`, so it throws it again. Then the execution jumps to the next `.catch` down the chain `(**)`.

In the section below we'll see a practical example of rethrowing.

## Fetch error handling example

Let's improve error handling for the user-loading example.

The promise returned by [fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) rejects when it's impossible to make a request. For instance, a remote server is not available, or the URL is malformed. But if the remote server responds with error 404, or even error 500, then it's considered a valid response.

What if the server returns a non-JSON page with error 500 in the line `(*)`? What if there's no such user, and github returns a page with error 404 at `(**)`?

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```


As of now, the code tries to load the response as JSON no matter what and dies with a syntax error. You can see that by running the example above, as the file `no-such-user.json` doesn't exist.

That's not good, because the error just falls through the chain, without details: what failed and where.

So let's add one more step: we should check the `response.status` property that has HTTP status, and if it's not 200, then throw an error.

```js run
class HttpError extends Error { // (1)
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
  }
}

function loadJson(url) { // (2)
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new HttpError(response);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // HttpError: 404 for .../no-such-user.json
```

1. We make a custom class for HTTP Errors to distinguish them from other types of errors. Besides, the new class has a constructor that accepts the `response` object and saves it in the error. So error-handling code will be able to access it.
2. Then we put together the requesting and error-handling code into a function that fetches the `url` *and* treats any non-200 status as an error. That's convenient, because we often need such logic.
3. Now `alert` shows better message.

The great thing about having our own class for errors is that we can easily check for it in error-handling code.

For instance, we can make a request, and then if we get 404 -- ask the user to modify the information.

The code below loads a user with the given name from github. If there's no such user, then it asks for the correct name:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

  return loadJson(`https://api.github.com/users/${name}`)
    .then(user => {
      alert(`Full name: ${user.name}.`); // (1)
      return user;
    })
    .catch(err => {
*!*
      if (err instanceof HttpError && err.response.status == 404) { // (2)
*/!*
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

Here:

1. If `loadJson` returns a valid user object, then the name is shown `(1)`, and the user is returned, so that we can add more user-related actions to the chain. In that case the `.catch` below is ignored, everything's very simple and fine.
2. Otherwise, in case of an error, we check it in the line `(2)`. Only if it's indeed the HTTP error, and the status is 404 (Not found), we ask the user to reenter. For other errors -- we don't know how to handle, so we just rethrow them.

## Unhandled rejections

What happens when an error is not handled? For instance, after the rethrow as in the example above. Or if we forget to append an error handler to the end of the chain, like here:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
}); // no .catch attached
```

Or here:

```js untrusted run refresh
// a chain of promises without .catch at the end
new Promise(function() {
  throw new Error("Whoops!");
}).then(function() {
  // ...something...
}).then(function() {
  // ...something else...
}).then(function() {
  // ...but no catch after it!
});
```

In case of an error, the promise state becomes "rejected", and the execution should jump to the closest rejection handler. But there is no such handler in the examples above. So the error gets "stuck".

In practice, that's usually because of the bad code. Indeed, how come that there's no error handling?

Most JavaScript engines track such situations and generate a global error in that case. We can see it in the console.

In the browser we can catch it using the event `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // no catch to handle the error
```

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections). Now if an error occurs, and there's no `.catch`, the `unhandledrejection` handler triggers: the `event` object has the information about the error, so we can do something with it.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report about the incident to the server.

In non-browser environments like Node.JS there are other similar ways to track unhandled errors.

## Summary

To summarize, `.then/catch(handler)` returns a new promise that changes depending on what handler does:

1. If it returns a value or finishes without a `return` (same as `return undefined`), then the new promise becomes resolved, and the closest resolve handler (the first argument of `.then`) is called with that value.
2. If it throws an error, then the new promise becomes rejected, and the closest rejection handler (second argument of `.then` or `.catch`) is called with it.
3. If it returns a promise, then JavaScript waits until it settles and then acts on its outcome the same way.

The picture of how the promise returned by `.then/catch` changes:

![](promise-handler-variants.png)

The smaller picture of how handlers are called:

![](promise-handler-variants-2.png)

In the examples of error handling above the `.catch` was always the last in the chain. In practice though, not every promise chain has a `.catch`. Just like regular code is not always wrapped in `try..catch`.

We should place `.catch` exactly in the places where we want to handle errors and know how to handle them. Using custom error classes can help to analyze errors and rethrow those that we can't handle.

For errors that fall outside of our scope we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments). Such unknown errors are usually unrecoverable, so all we should do is to inform the user and probably report to our server about the incident.
