解法は実際には非常に単純です。

これを見てください:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/remy'),
  fetch('http://no-such-url')
)
```

ここには `Promise.all` に行く `fetch(...)` promise の配列があります。

`Promise.all` が動作する方法を変えることはできません: もしエラーを検出した場合、それを reject します。したがって、エラーが発生しないようにする必要があります。代わりに、 `fetch` エラーが発生した場合、それを "通常の" 結果として扱う必要があります。

これはその方法です:

```js
Promise.all(
  fetch('https://api.github.com/users/iliakan').catch(err => err),
  fetch('https://api.github.com/users/remy').catch(err => err),
  fetch('http://no-such-url').catch(err => err)
)
```

つまり、`.catch` はすべての promise のエラーを取り、それを正常に返します。promise の動作ルールにより、`.then/catch` ハンドラが値(エラーオブジェクトか他のなにかなのかは関係ありません)を返した場合、実行は "正常の" フローを続けます。

したがって、`.catch` は、エラーを "正常の" 結果として外側の `Promise.all` に返します。

このコード:
```js
Promise.all(
  urls.map(url => fetch(url))
)
```

は次のように書き直すことができます:

```js
Promise.all(
  urls.map(url => fetch(url).catch(err => err))
)
```
