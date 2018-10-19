# フォールトトレラント JSON をフェッチする

前のタスク <info:task/promise-errors-as-results> の解答を改良しましょう。今 `fetch` を呼び出すだけでなく、指定されたURLからJSONオブジェクトを読み込む必要があります。

ここにそれを行うサンプルコードがあります:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// フェッチリクエストを作成
Promise.all(urls.map(url => fetch(url)))
  // 各レスポンスを response.json() にマップする
  .then(responses => Promise.all(
    responses.map(r => r.json())
  ))
  // 各ユーザ名を表示
  .then(users => {  // (*)
    for(let user of users) {
      alert(user.name);
    }
  });
```

問題は、任意のリクエストが失敗した場合、`Promise.all` はエラーで reject し、他のすべてのリクエストの結果を失うことです。したがって、前のタスクのように上のコードはフォールトトレラントではありません。

行 `(*)` で、配列には成功したリクエストに対してはパースされた JSONを、エラーとなったものに対してはエラーを含むようにコードを修正してください。

エラーは `fetch` (ネットワークリクエストが失敗する場合)と `response.json()` (レスポンスが有効なJSONでない場合)の両方で発生する可能性があることに注意してください。どちらの場合も、エラーは結果オブジェクトのメンバになります。

サンドボックスには、これらの両方のケースがあります。