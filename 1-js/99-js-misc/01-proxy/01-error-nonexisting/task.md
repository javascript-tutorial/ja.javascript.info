<<<<<<< HEAD
# 存在しないプロパティの読み取りエラー

通常、存在しないプロパティへの参照をすると `undefined` が返ってきます。

代わりに、存在しないプロパティへの参照時にはエラーをスローするようなプロキシを作成してください。

これはプログラミングのミスを早期に検出するのに便利です。

オブジェクト `target` を取り、この機能を追加するプロキシを返す関数 `wrap(target)` を実装してください。

次のように動作するようにしてください:
=======
# Error on reading non-existant property

Usually, an attempt to read a non-existant property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existant property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:
>>>>>>> 70ca842bef2390bc26d13dea2b856838aa890fe0

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* your code */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // Error: Property doesn't exist
*/!*
```
