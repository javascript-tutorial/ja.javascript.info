
# Observable

プロキシを返すことで、"オブジェクトを監視可能にする" 関数 `makeObservable(target)` を作成してください。

このように動作します:

```js run
function makeObservable(target) {
  /* your code */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerts: SET name=John
```

つまり、`makeObservable` により返却されるオブジェクトは元のオブジェクトのように見えますが、任意のプロパティ変更時に呼び出される `handler` 関数をセットするメソッド `observe(handler)` を持ちます。

プロパティを変更したときはいつでもプロパティの名前と値と一緒に `handler(key, value)` が呼ばれます。

P.S. このタスクでは、プロパティの書き込みにだけ注目してください。他の操作も同様の方法で実装することはできます。

