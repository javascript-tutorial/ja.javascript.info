
補足はコードの下にあります:

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

補足:

1. 関数 `loadUrl` は `async` になります。
2. すべての内側の `.then` は `await` に置き換えられます。
3. 次のように、await するのではなく、`response.json()` を返すこともできます。:

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

    そうすると、外側のコードはその promise を解決するために `await` する必要があります。 
4. `loadJson` からスローされたエラーは `.catch` で処理されます。そこでは `await loadJson(…)` を使うことができません。なぜなら `async` 関数の中ではないからです。
