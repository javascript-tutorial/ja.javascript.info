
<<<<<<< HEAD
補足はコードの下にあります:
=======
The notes are below the code:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)

  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }

  throw new Error(response.status);
}

<<<<<<< HEAD
loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

補足:

1. 関数 `loadJson` は `async` になります。
2. すべての内側の `.then` は `await` に置き換えられます。
3. 次のように、await するのではなく、`response.json()` を返すこともできます。:
=======
loadJson('https://javascript.info/no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

Notes:

1. The function `loadJson` becomes `async`.
2. All `.then` inside are replaced with `await`.
3. We can `return response.json()` instead of awaiting for it, like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

    ```js
    if (response.status == 200) {
      return response.json(); // (3)
    }
    ```

<<<<<<< HEAD
    そうすると、外側のコードはその promise を解決するために `await` する必要があります。
4. `loadJson` からスローされたエラーは `.catch` で処理されます。そこでは `await loadJson(…)` を使うことができません。なぜなら `async` 関数の中ではないからです。
=======
    Then the outer code would have to `await` for that promise to resolve. In our case it doesn't matter.
4. The error thrown from `loadJson` is handled by `.catch`. We can't use `await loadJson(…)` there, because we're not in an `async` function.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
