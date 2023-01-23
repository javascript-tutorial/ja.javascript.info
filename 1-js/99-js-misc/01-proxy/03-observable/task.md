
# Observable

<<<<<<< HEAD
プロキシを返すことで、"オブジェクトを監視可能にする" 関数 `makeObservable(target)` を作成してください。

このように動作します:
=======
Create a function `makeObservable(target)` that "makes the object observable" by returning a proxy.

Here's how it should work:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
つまり、`makeObservable` により返却されるオブジェクトは元のオブジェクトのように見えますが、任意のプロパティ変更時に呼び出される `handler` 関数をセットするメソッド `observe(handler)` を持ちます。

プロパティを変更したときはいつでもプロパティの名前と値と一緒に `handler(key, value)` が呼ばれます。

P.S. このタスクでは、プロパティの書き込みにだけ注目してください。他の操作も同様の方法で実装することはできます。

=======
In other words, an object returned by `makeObservable` is just like the original one, but also has the method `observe(handler)` that sets `handler` function to be called on any property change.

Whenever a property changes, `handler(key, value)` is called with the name and value of the property.

P.S. In this task, please only take care about writing to a property. Other operations can be implemented in a similar way.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
