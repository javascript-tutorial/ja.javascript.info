<<<<<<< HEAD
# Promise でのエラーハンドリング 

非同期アクションは失敗する可能性があります: エラーの場合、対応する promise は reject されます。例えば、リモートサーバが利用不可で `fetch` が失敗する場合です。エラー(拒否/reject)を扱うには `.catch` を使います。

promise のチェーンはその点で優れています。promise が reject されると、コントロールはチェーンに沿って最も近い reject ハンドラにジャンプします。それは実際に非常に便利です。

例えば、下のコードでは URL が誤っており(存在しないサーバ)、`.catch` がエラーをハンドリングします:
=======

# Error handling with promises

Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice.

For instance, in the code below the URL to `fetch` is wrong (no such site) and `.catch` handles the error:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
<<<<<<< HEAD
  .catch(err => alert(err)) // TypeError: failed to fetch (エラーメッセージ内容は異なる場合があります)
```

または、おそらくサーバはすべて正しく動作したが、応答が有効な JSON でない場合:

```js run
fetch('/') // fetch はうまく動作し、サーバは成功を応答します
*!*
  .then(response => response.json()) // rejects: ページが HTML で有効な json ではなかった場合
*/!*
  .catch(err => alert(err)) // SyntaxError: Unexpected token < in JSON at position 0
```

下の例では、アバターの読み込みと表示のチェーンでのすべてのエラーを処理する `.catch` を追加しています:
=======
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

As you can see, the `.catch` doesn't have to be immediate. It may appear after one or maybe several `.then`.

Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append `.catch` to the end of chain:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
<<<<<<< HEAD
  .then(githubUser => new Promise(function(resolve, reject) {
=======
  .then(githubUser => new Promise((resolve, reject) => {
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
<<<<<<< HEAD
  .catch(error => alert(error.message));
```

ここでは、`.catch` はまったく呼ばれません。なぜならエラーが起きていないからです。しかし、上の promise のいずれかが reject となった場合、catch は実行されます。

## 暗黙の try..catch 

executor と promise ハンドラのコードは "見えない `try..catch`" を持っています。エラーが起きた場合、キャッチして reject として扱います。

例えば、このコードを見てください:

```js run
new Promise(function(resolve, reject) {
=======
*!*
  .catch(error => alert(error.message));
*/!*
```

Normally, such `.catch` doesn't trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

## Implicit try..catch

The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.

For instance, this code:

```js run
new Promise((resolve, reject) => {
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
...これは次のと同じように動作します:

```js run
new Promise(function(resolve, reject) {
=======
...Works exactly the same as this:

```js run
new Promise((resolve, reject) => {
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
executor にある "見えない `try..catch` はエラーを自動的にキャッチし reject として扱っています。

これは executor だけでなくハンドラの中でも同様です。`.then` ハンドラの中で `throw` した場合、promise の reject を意味するので、コントロールは最も近いエラーハンドラにジャンプします。

ここにその例があります:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  throw new Error("Whoops!"); // promise を rejects
=======
The "invisible `try..catch`" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejects the promise
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
また、これは `throw` だけでなく同様にプログラムエラーを含む任意のエラーに対してです:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  blabla(); // このような関数はありません
=======
This happens for all errors, not just those caused by the `throw` statement. For example, a programming error:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // no such function
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

<<<<<<< HEAD
副作用として、最後の `.catch` は明示的な reject だけでなく、上記のハンドラのような偶発的なエラーもキャッチします。

## 再スロー 

すでにお気づきのように、`.catch` は　`try..catch` のように振る舞います。私たちは必要な数の `.then` を持ち、最後に単一の `.catch` を使用してすべてのエラーを処理します。

通常の `try..catch` では、エラーを解析し、処理できない場合は再スローする場合があります。promise でも同じことが可能です。`.catch`　の中で `throw` する場合、コントロールは次の最も近いエラーハンドラにジャンプします。そして、エラーを処理して正常に終了すると、次に最も近い成功した `.then` ハンドラに続きます。

下の例では、`.catch` がエラーを正常に処理しています:

```js run
// 実行: catch -> then
new Promise(function(resolve, reject) {
=======
The final `.catch` not only catches explicit rejections, but also occasional errors in the handlers above.

## Rethrowing

As we already noticed, `.catch` at the end of the chain is similar to `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if can't handle. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

<<<<<<< HEAD
ここでは、`.catch` ブロックが正常に終了しています。なので、次の成功ハンドラが呼ばれます。また何かを返すこともでき、その場合も同じです(値が渡されます)。

...そしてここでは `.catch` ブロックはエラーを解析し、再度スローしています:

```js run
// 実行: catch -> catch -> then
new Promise(function(resolve, reject) {
=======
Here the `.catch` block finishes normally. So the next successful `.then` handler is called.

In the example below we see the other situation with `.catch`. The handler `(*)` catches the error and just can't handle it (e.g. it only knows how to handle `URIError`), so it throws it again:

```js run
// the execution: catch -> catch -> then
new Promise((resolve, reject) => {
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
<<<<<<< HEAD
    // エラー処理
=======
    // handle it
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
  } else {
    alert("Can't handle such error");

*!*
<<<<<<< HEAD
    throw error; // ここで投げられたエラーは次の catch へジャンプします
=======
    throw error; // throwing this or another error jumps to the next catch
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
*/!*
  }

}).then(function() {
<<<<<<< HEAD
  /* 実行されません */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // 何も返しません => 実行は通常通りに進みます
=======
  /* doesn't run here */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // don't return anything => execution goes the normal way
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

});
```

<<<<<<< HEAD
ハンドラ `(*)` はエラーをキャッチしましたが処理していません。なぜなら、`URIError` ではないからです。なので、再びスローします。その後、実行は次の `.catch` へ移ります。

下のセクションでは、再スローの実際的な例を見ていきます。

## Fetch エラー処理の例 

ユーザ読み込みの例のエラー処理を改善しましょう。

[fetch](mdn:api/WindowOrWorkerGlobalScope/fetch) により返却された promise は、要求を行うことができない場合に reject します。例えば、リモートサーバが利用不可の場合、または URL が不正な場合です。しかし、リモートサーバが 404 や 500 エラーといったの応答の場合、有効な応答とみなします。

仮にサーバが行 `(*)` で 500 エラーの非JSONページを返したらどうなるでしょう？そのようなユーザはおらず、github が `(**)` で 404 エラーを返すとどうなるでしょう？

```js run
fetch('no-such-user.json') // (*)
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`)) // (**)
  .then(response => response.json())
  .catch(alert); // SyntaxError: Unexpected token < in JSON at position 0
  // ...
```

現時点では、コードは何が起きても応答を JSON として読み込もうとし、構文エラーで死にます。`no-such-user.json` は存在しないので、上の例を実行することでそれを見ることができます。

このエラーはチェーンを通じて失敗したものであり、詳細(何が失敗したのか、どこで失敗したのか)を含まないため良くありません。

したがって、もう1ステップ追加しましょう: HTTP ステータスが持っている `response.status` をチェックします。それが 200 でなければエラーをスローします。

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

1. 他のエラータイプと区別するために HTTP エラーのためのカスタムクラスを作ります。さらに、新しいクラスは `response` オブジェクトを受け取り、エラーに保存するコンストラクタを持ちます。これにより、エラー処理のコードがアクセスできるようになります。
2. 次に、リクエストとエラー処理のコードを `url` へ fetch する関数に置き、 *加えて* 任意の非 200 ステータスをエラーとして扱います。
3. これで `alert` はより良いメッセージが表示されます。

エラーに対する独自のクラスを持つことの素晴らしい点は、エラー処理コードで簡単にチェックできることです。

例えば、リクエストを行い 404 となった場合 -- ユーザに情報を変更するよう依頼します。


下のコードは github から指定された名前のユーザを読み込みます。もし存在しないユーザであれば、正しい名前を訪ねます。:

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

ここでは:

1. `loadJson` が有効なユーザオブジェクトを返した場合、名前は `(1)` で表示されユーザが返されます。これによりユーザ関連のアクションをチェーンに追加できます。その場合、以下の `.catch`は無視され、すべてが非常にシンプルで問題ありません。
2. それ以外の場合は、エラーの場合は行 `(2)` でチェックします。確かに HTTP エラーでステータスが 404(見つからない) の場合、ユーザに再入力を依頼します。他のエラーの場合は、処理の仕方を知らないため再スローします。 

## 未処理の reject 

エラーが処理されない場合何がおきるでしょう？例えば、上の例のように再スローした後。もしくは次のようにチェーンの終わりにエラーハンドラを追加し忘れている場合です。:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // ここでエラー(このような関数はない)
}); // .catch は未アタッチ
```

もしくは:

```js untrusted run refresh
// 末尾に .catch のない promise のチェーン
new Promise(function() {
  throw new Error("Whoops!");
}).then(function() {
  // ...何か...
}).then(function() {
  // ...何か...
}).then(function() {
  // ...が、この後に catch はありません!
});
```

エラーの場合、promise のステータスは "rejected" になり、実行は最も近い reject ハンドラにジャンプするはずです。しかし上の例ではそのようなハンドラはありません。そのため、エラーは "スタック" します(行き詰まります)。

実際には、それは通常悪いコードによるものです。 確かになぜエラー処理がないのでしょうか？

多くの JavaScript エンジンはこのような状況を追跡し、その場合にはグローバルエラーを生成します。コンソールで見ることができます。

ブラウザでは、イベント `unhandledrejection` を使ってキャッチできます。:
=======
The execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.

## Unhandled rejections

What happens when an error is not handled? For instance, we forgot to append `.catch` to the end of the chain, like here:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Error here (no such function)
})
  .then(() => {
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets "stuck". There's no code to handle it.

In practice, just like with regular unhandled errors in code, it means that something has terribly gone wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in console. Similar thing happens with unhandled promise rejections.

JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.

In the browser we can catch such errors using the event `unhandledrejection`:
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
<<<<<<< HEAD
  // イベントオブジェクトは2つの特別なプロパティを持っています:
  alert(event.promise); // [object Promise] - エラーを生成した promise 
  alert(event.reason); // Error: Whoops! - 未処理のエラーオブジェクト
=======
  // the event object has two special properties:
  alert(event.promise); // [object Promise] - the promise that generated the error
  alert(event.reason); // Error: Whoops! - the unhandled error object
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
<<<<<<< HEAD
}); // エラーを処理する catch がない
```

そのイベントは [HTML 標準](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) の一部です。今、エラーが発生し `.catch` がない場合、`unhandledrejection` ハンドラがトリガします: `event` オブジェクトはエラーに関する情報を持っているので、何かをすることができます。

通常、このようなエラーはリカバリ不可なので、最善の方法はユーザにその問題を知らせ、サーバへそのインシデントについて報告することです。

Node.JSのようなブラウザ以外の環境では、未処理のエラーを追跡する他の同様の方法があります。

## サマリ

- `.catch` はすべての種類(`reject()` 呼び出し、あるいはハンドラの中でスローされたエラー)の Promise の拒否を扱います。
- エラーを処理したい場所に正確に `.catch` を置き、それらを処理をする方法を知っておくべきです。ハンドラはエラーを分析(カスタムエラークラスが役立ちます)し、未知のものを再スローします。
- もしエラーから回復する方法がないのであれば、`.catch` をまったく使わなくてもOKです。
- いずれにせよ、"ただ落ちた" ということがないように、未知のエラーを追跡し、それをユーザ(とおそらく我々のサーバ)に知らせるために `unhandledrejection` イベントハンドラ(ブラウザの場合、他の環境の場合はその類似のもの)を持つべきです。

そして最後に、読み込みのインジケータがある場合、`.finally` は fetch が完了したときにそれを止める便利なハンドラです:

```js run
function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");

*!*
  document.body.style.opacity = 0.3; // (1) 開始
*/!*

  return loadJson(`https://api.github.com/users/${name}`)
*!*
    .finally(() => { // (2) 停止
      document.body.style.opacity = '';
      return new Promise(resolve => setTimeout(resolve)); // (*)
    })
*/!*
    .then(user => {
      alert(`Full name: ${user.name}.`);
      return user;
    })
    .catch(err => {
      if (err instanceof HttpError && err.response.status == 404) {
        alert("No such user, please reenter.");
        return demoGithubUser();
      } else {
        throw err;
      }
    });
}

demoGithubUser();
```

ここでは、行 `(1)` はドキュメントを薄暗くすることで読み込み中であることを示しています。方法は重要ではなく、代わりに任意の種類のインジケータを使うことができます。

Promise が確定したとき、それが成功した fetch でもエラーでも、`finally` は行 `(2)` をトリガーし、インジケータを停止します。

`(*)` は `finally` からゼロ-タイムアウトの Promise を返すというブラウザのちょっとしたトリックがあります。これは、一部のブラウザ(Chromeなど)では、ドキュメントの変更内容を描画するために、Promise ハンドラ以外で "少し時間が必要" なためです。これは、チェーンに進む前にインジケータが視覚的に停止されていることを保証します。
=======
}); // no catch to handle the error
```

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

If an error occurs, and there's no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

In non-browser environments like Node.js there are other ways to track unhandled errors.

## Summary

- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments), to track unhandled errors and inform the user (and probably our server) about the them, so that our app never "just dies".
>>>>>>> a0bfa924a17cad8e7fee213904b27dbf57c2dbac
