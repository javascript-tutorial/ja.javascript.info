
# Promise でのエラーハンドリング 

promise チェーンはエラーハンドリングに優れています。promise が reject されると、制御は最も近い reject ハンドラに移ります。この動きは実際に非常に便利です。

例えば、下のコードでは URL が誤っており(存在しないサイト)、`.catch` がエラーをハンドリングします:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (エラーメッセージ内容は異なる場合があります)
```

ご覧の通り、`.catch` は直後である必要はありません。1つまたは複数の `.then` の後に現れるかもしれません。

また、サイトはすべて問題ありませんが、レスポンスが有効な JSON でない可能性もあります。すべてのエラーをキャッチする最も簡単な方法はチェーンの末尾に `.catch` を追加することです。

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

通常、この `.catch` は呼ばれません。ですが、上の promise のいずれかがreject した場合（ネットワーク問題 or 無効な json など）、それをキャッチします。

## 暗黙の try..catch 

executor と promise ハンドラのコードは "見えない `try..catch`" を持っています。エラーが起きた場合、キャッチして reject として扱います。

例えば、このコードを見てください:

```js run
new Promise(function(resolve, reject) {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

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
*/!*
}).catch(alert); // Error: Whoops!
```

また、これは `throw` だけでなく同様にプログラムエラーを含む任意のエラーに対してです:

```js run
new Promise(function(resolve, reject) {
  resolve("ok");
}).then(function(result) {
*!*
  blabla(); // このような関数はありません
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

最後の `.catch` は明示的な reject だけでなく、上記のハンドラのような偶発的なエラーもキャッチします。

## 再スロー 

すでにお気づきのように、チェーンの末尾の `.catch` は　`try..catch` のように振る舞います。私たちは必要な数の `.then` を持ち、最後に単一の `.catch` を使用してすべてのエラーを処理します。

通常の `try..catch` では、エラーを解析し、処理できない場合は再スローできます。promise でも同じことが可能です。

`.catch`　の中で `throw` する場合、制御は次の最も近いエラーハンドラに移ります。そして、エラーを処理して正常に終了すると、次に最も近い成功した `.then` ハンドラに続きます。

下の例では、`.catch` がエラーを正常に処理しています:

```js run
// 実行: catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

ここでは、`.catch` ブロックが正常に終了しています。なので、次の成功 `.then` ハンドラが呼ばれます。

以下の例に、`.catch` の別のシチュエーションがあります。ハンドラ `(*)` はエラーをキャッチし、それが処理できない（例 `URIError` の処理の仕方しか知らない）ので、エラーを再びスローします:

```js run
// 実行: catch -> catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // エラー処理
  } else {
    alert("Can't handle such error");

*!*
    throw error; // ここで投げられたエラーは次の catch へジャンプします
*/!*
  }

}).then(function() {
  /* 実行されません */
}).catch(error => { // (**)

  alert(`The unknown error has occurred: ${error}`);
  // 何も返しません => 実行は通常通りに進みます

});
```

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

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // イベントオブジェクトは2つの特別なプロパティを持っています:
  alert(event.promise); // [object Promise] - エラーを生成した promise 
  alert(event.reason); // Error: Whoops! - 未処理のエラーオブジェクト
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
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
