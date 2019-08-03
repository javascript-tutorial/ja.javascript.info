# フォールトトレラント Promise.all

並列に複数の URL を取得したいです。

これはそのためのコードです:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

Promise.all(urls.map(url => fetch(url)))
  // 各レスポンスに対し、そのステータスを表示
  .then(responses => { // (*)
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`);
    }
  ));
```

問題は、任意のリクエストが失敗した場合、`Promise.all` はエラーで reject し、他のすべてのリクエストの結果を失うことです。

これは良くありません。

行 `(*)` で配列 `responses` がフェッチに成功したレスポンスオブジェクトと、失敗したエラーオブジェクトを含むようにコードを修正してください。

例えば、URL の１つが悪い場合、次のようになるべきです:

```js
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'http://no-such-url'
];

Promise.all(...) // URL を取得するあなたのコード...
  // ...そして結果の配列のメンバとして取得エラーを渡します...
  .then(responses => {  
    // 3 つの url => 3 つの配列要素
    alert(responses[0].status); // 200
    alert(responses[1].status); // 200
    alert(responses[2]); // TypeError: failed to fetch (内容は異なるかもしれません)
  });
```

P.S. このタスクでは、`response.text()` や `response.json()` を使った完全なレスポンスをロードする必要はありません。適切な方法で取得エラーを処理してください。

