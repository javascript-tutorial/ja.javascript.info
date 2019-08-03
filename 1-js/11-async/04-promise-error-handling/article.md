# Promise でのエラーハンドリング 

非同期アクションは失敗する可能性があります: エラーの場合、対応する promise は reject されます。例えば、リモートサーバが利用不可で `fetch` が失敗する場合です。エラー(拒否/reject)を扱うには `.catch` を使います。

promise のチェーンはその点で優れています。promise が reject されると、コントロールはチェーンに沿って最も近い reject ハンドラにジャンプします。それは実際に非常に便利です。

例えば、下のコードでは URL が誤っており(存在しないサーバ)、`.catch` がエラーをハンドリングします:

```js run
*!*
fetch('https://no-such-server.blabla') // rejects
*/!*
  .then(response => response.json())
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

ここでは、`.catch` はまったく呼ばれません。なぜならエラーが起きていないからです。しかし、上の promise のいずれかが reject となった場合、catch は実行されます。

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

executor にある "見えない `try..catch` はエラーを自動的にキャッチし reject として扱っています。

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

副作用として、最後の `.catch` は明示的な reject だけでなく、上記のハンドラのような偶発的なエラーもキャッチします。

## 再スロー 

すでにお気づきのように、`.catch` は　`try..catch` のように振る舞います。私たちは必要な数の `.then` を持ち、最後に単一の `.catch` を使用してすべてのエラーを処理します。

通常の `try..catch` では、エラーを解析し、処理できない場合は再スローする場合があります。promise でも同じことが可能です。`.catch`　の中で `throw` する場合、コントロールは次の最も近いエラーハンドラにジャンプします。そして、エラーを処理して正常に終了すると、次に最も近い成功した `.then` ハンドラに続きます。

下の例では、`.catch` がエラーを正常に処理しています:

```js run
// 実行: catch -> then
new Promise(function(resolve, reject) {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("The error is handled, continue normally");

}).then(() => alert("Next successful handler runs"));
```

ここでは、`.catch` ブロックが正常に終了しています。なので、次の成功ハンドラが呼ばれます。また何かを返すこともでき、その場合も同じです(値が渡されます)。

...そしてここでは `.catch` ブロックはエラーを解析し、再度スローしています:

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
