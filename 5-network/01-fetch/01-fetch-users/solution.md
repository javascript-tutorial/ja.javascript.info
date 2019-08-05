
ユーザをフェッチするには次が必要です:

1. `fetch('https://api.github.com/users/USERNAME')`.
2. レスポンスのステータスが `200` であれば、JS オブジェクトを読むため `.json()` を呼び出します。

`fetch` が失敗、またはレスポンスステータスが200以外の数値の場合は、結果の配列で単に `null` を返します。

これはそのコードです:

```js demo
async function getUsers(names) {
  let jobs = [];

  for(let name of names) {
    let job = fetch(`https://api.github.com/users/${name}`).then(
      successResponse => {
        if (successResponse.status != 200) {
          return null;
        } else {
          return successResponse.json();
        }
      },
      failResponse => {
        return null;
      }
    );
    jobs.push(job);
  }

  let results = await Promise.all(jobs);

  return results;
}
```

注意: `.then` 呼び出しは、`fetch` に直接アタッチされています。そのため、レスポンスがある場合には他のフェッチは待たずにすぐに `.json()` を読み始めます。

`await Promise.all(names.map(name => fetch()...)))` を使用して、その結果に対して `.json()` を呼び出すと、すべてのフェッチが応答するのを待ちます。 `.json()` を各 `fetch` に直接追加することで、個々のフェッチがお互いを待たずにデータをJSONとして読み始めることを保証します。

これは、たとえ私たちが主に `async/await` を使っていても、低レベルの `Promise` APIがいかに有用であるかの例です。