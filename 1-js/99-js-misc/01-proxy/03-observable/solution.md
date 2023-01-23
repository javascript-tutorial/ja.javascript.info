<<<<<<< HEAD
解決策は2つのパートで構成されます:

1. `.observe(handler)` が呼ばれたときは、後で `handler` が呼び出せるように、ハンドラをどこかに覚えておく必要があります。シンボルをプロパティのキーとして使用することで、ハンドラをオブジェクトに格納できます。
2. 変更時にハンドラを呼ぶための `set` トラップを持つプロキシが必要です。
=======
The solution consists of two parts:

1. Whenever `.observe(handler)` is called, we need to remember the handler somewhere, to be able to call it later. We can store handlers right in the object, using our symbol as the property key.
2. We need a proxy with `set` trap to call handlers in case of any change.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
<<<<<<< HEAD
  // 1. ハンドラの格納場所の初期化
  target[handlers] = [];

  // 後々の呼び出しのため、配列にハンドラ関数を格納
=======
  // 1. Initialize handlers store
  target[handlers] = [];

  // Store the handler function in array for future calls
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

<<<<<<< HEAD
  // 2. 変更を処理するプロキシを作成
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // 操作をオブジェクトに転送
      if (success) { // プロパティの設定でエラーがなければ
        // すべてのハンドラを呼び出す
=======
  // 2. Create a proxy to handle changes
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // forward the operation to object
      if (success) { // if there were no error while setting the property
        // call all handlers
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
