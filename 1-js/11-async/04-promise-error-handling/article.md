
<<<<<<< HEAD
# Promise でのエラーハンドリング 

promise チェーンはエラーハンドリングに優れています。promise が reject されると、制御は最も近い reject ハンドラに移ります。この動きは実際に非常に便利です。

例えば、下のコードでは URL が誤っており(存在しないサイト)、`.catch` がエラーをハンドリングします:
=======
# Error handling with promises

Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice.

For instance, in the code below the URL to `fetch` is wrong (no such site) and `.catch` handles the error:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
<<<<<<< HEAD
  .catch(err => alert(err)) // TypeError: failed to fetch (エラーメッセージ内容は異なる場合があります)
```

ご覧の通り、`.catch` は直後である必要はありません。1つまたは複数の `.then` の後に現れるかもしれません。

また、サイトはすべて問題ありませんが、レスポンスが有効な JSON でない可能性もあります。すべてのエラーをキャッチする最も簡単な方法はチェーンの末尾に `.catch` を追加することです。
=======
  .catch(err => alert(err)) // TypeError: failed to fetch (the text may vary)
```

As you can see, the `.catch` doesn't have to be immediate. It may appear after one or maybe several `.then`.

Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append `.catch` to the end of chain:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

<<<<<<< HEAD
通常、この `.catch` は呼ばれません。ですが、上の promise のいずれかがreject した場合（ネットワーク問題 or 無効な json など）、それをキャッチします。

## 暗黙の try..catch 

executor と promise ハンドラのコードは "見えない `try..catch`" を持っています。エラーが起きた場合、キャッチして reject として扱います。

例えば、このコードを見てください:

```js run
new Promise(function(resolve, reject) {
=======
Normally, such `.catch` doesn't trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.

## Implicit try..catch

The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.

For instance, this code:

```js run
new Promise((resolve, reject) => {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
...これは次のと同じように動作します:

```js run
new Promise(function(resolve, reject) {
*!*
  reject(new Error("Whoops!"));
*/!*  
}).catch(alert); // Error: Whoops!
```

executor にある "見えない `try..catch`" はエラーを自動的にキャッチし reject された promise として扱っています。

これは executor だけでなくハンドラの中でも同様です。`.then` ハンドラの中で `throw` した場合、promise の reject を意味するので、コントロールは最も近いエラーハンドラにジャンプします。

ここにその例があります:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  throw new Error("Whoops!"); // promise を rejects
=======
...Works exactly the same as this:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

The "invisible `try..catch`" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.

Here's an example:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rejects the promise
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

<<<<<<< HEAD
最後の `.catch` は明示的な reject だけでなく、上記のハンドラのような偶発的なエラーもキャッチします。

## 再スロー 

すでにお気づきのように、チェーンの末尾の `.catch` は　`try..catch` のように振る舞います。私たちは必要な数の `.then` を持ち、最後に単一の `.catch` を使用してすべてのエラーを処理します。

通常の `try..catch` では、エラーを解析し、処理できない場合は再スローできます。promise でも同じことが可能です。

`.catch`　の中で `throw` する場合、制御は次の最も近いエラーハンドラに移ります。そして、エラーを処理して正常に終了すると、次に最も近い成功した `.then` ハンドラに続きます。

下の例では、`.catch` がエラーを正常に処理しています:

```js run
// 実行: catch -> then
new Promise(function(resolve, reject) {
=======
The final `.catch` not only catches explicit rejections, but also accidental errors in the handlers above.

## Rethrowing

As we already noticed, `.catch` at the end of the chain is similar to `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if it can't be handled. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.

In the example below the `.catch` successfully handles the error:

```js run
// the execution: catch -> then
new Promise((resolve, reject) => {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

<<<<<<< HEAD
ここでは、`.catch` ブロックが正常に終了しています。なので、次の成功 `.then` ハンドラが呼ばれます。

以下の例に、`.catch` の別のシチュエーションがあります。ハンドラ `(*)` はエラーをキャッチし、それが処理できない（例 `URIError` の処理の仕方しか知らない）ので、エラーを再びスローします:

```js run
// 実行: catch -> catch -> then
new Promise(function(resolve, reject) {
=======
Here the `.catch` block finishes normally. So the next successful `.then` handler is called.

In the example below we see the other situation with `.catch`. The handler `(*)` catches the error and just can't handle it (e.g. it only knows how to handle `URIError`), so it throws it again:

```js run
// the execution: catch -> catch
new Promise((resolve, reject) => {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
<<<<<<< HEAD
    // エラー処理
=======
    // handle it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  } else {
    alert("Can't handle such error");

*!*
<<<<<<< HEAD
    throw error; // ここで投げられたエラーは次の catch へジャンプします
=======
    throw error; // throwing this or another error jumps to the next catch
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

});
```

<<<<<<< HEAD
実行は最初の `.catch` `(*)` から、次の `.catch` `(**)` に移ります。

## 未処理の reject 

エラーが処理されない場合何がおきるでしょう？例えば、次のようにチェーンの終わりに`.catch` を追加し忘れている場合です:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // ここでエラー(このような関数はない)
})
  .then(() => {
    // 1つ以上の成功した promise ハンドラ
  }); // .catch が末尾にありません!
```

エラーの場合、promise は "rejected" になり、実行は最も近い reject ハンドラにジャンプします。ですが、上の例にそのようなハンドラはありません。そのため、エラーは "スタック" します(行き詰まります)。

実際、コード内の通常の未処理のエラーと同様、このような場合は何かが誤っていることを意味します。

通常のエラーが発生し、`try..catch` でキャッチされない場合何が起こるでしょうか？スクリプトはコンソールにメッセージを表示し終了します。同様のことが、未処理の promise の reject でも発生します。

JavaScript エンジンはこのような reject を追跡し、その場合にはグローバルエラーを生成します。上の例を実行すると、コンソールでエラーを見ることができます。

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

In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.

In the browser we can catch such errors using the event `unhandledrejection`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
<<<<<<< HEAD
}); // エラーを処理する catch がない
```

このイベントは [HTML 標準](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections) の一部です。

エラーが発生し `.catch` がない場合、`unhandledrejection` ハンドラが発火し、エラーに関する情報を持っている `event` オブジェクトが渡ります。なので、その情報を使い、何かをすることができます。

通常、このようなエラーはリカバリ不可なので、最善の方法はユーザにその問題を知らせ、サーバへそのインシデントについて報告することです。

Node.jsのようなブラウザ以外の環境では、未処理のエラーを追跡する他の同様の方法があります。

## サマリ

- `.catch` はすべての種類(`reject()` 呼び出し、あるいはハンドラの中でスローされたエラー)の Promise の拒否を扱います。
- エラーを処理したい場所に正確に `.catch` を置き、それらを処理をする方法を知っておくべきです。ハンドラはエラーを分析(カスタムエラークラスが役立ちます)し、未知のものを再スローします。
- もしエラーから回復する方法がないのであれば、`.catch` をまったく使わなくてもOKです。
- いずれにせよ、"ただ落ちた" ということがないように、未知のエラーを追跡し、それをユーザ(とおそらく我々のサーバ)に知らせるために `unhandledrejection` イベントハンドラ(ブラウザの場合、他の環境の場合はその類似のもの)を持つべきです。
=======
}); // no catch to handle the error
```

The event is the part of the [HTML standard](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

If an error occurs, and there's no `.catch`, the `unhandledrejection` handler triggers, and gets the `event` object with the information about the error, so we can do something.

Usually such errors are unrecoverable, so our best way out is to inform the user about the problem and probably report the incident to the server.

In non-browser environments like Node.js there are other ways to track unhandled errors.

## Summary

- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- `.then` also catches errors in the same manner, if given the second argument (which is the error handler).
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
