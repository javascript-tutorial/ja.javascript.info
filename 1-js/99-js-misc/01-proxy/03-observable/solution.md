解決策は2つのパートで構成されます:

1. `.observe(handler)` が呼ばれたときは、後で `handler` が呼び出せるように、ハンドラをどこかに覚えておく必要があります。シンボルをプロパティのキーとして使用することで、ハンドラをオブジェクトに格納できます。
2. 変更時にハンドラを呼ぶための `set` トラップを持つプロキシが必要です。

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. ハンドラの格納場所の初期化
  target[handlers] = [];

  // 後々の呼び出しのため、配列にハンドラ関数を格納
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. 変更を処理するプロキシを作成
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 操作をオブジェクトに転送
      if (success) { // プロパティの設定でエラーがなければ
        // すべてのハンドラを呼び出す
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
