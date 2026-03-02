<<<<<<< HEAD
# 存在しないプロパティの読み取りエラー

通常、存在しないプロパティへの参照をすると `undefined` が返ってきます。

代わりに、存在しないプロパティへの参照時にはエラーをスローするようなプロキシを作成してください。

これはプログラミングのミスを早期に検出するのに便利です。

オブジェクト `target` を取り、この機能を追加するプロキシを返す関数 `wrap(target)` を実装してください。

次のように動作するようにしてください:
=======
# Error on reading non-existent property

Usually, an attempt to read a non-existent property returns `undefined`.

Create a proxy that throws an error for an attempt to read of a non-existent property instead.

That can help to detect programming mistakes early.

Write a function `wrap(target)` that takes an object `target` and return a proxy that adds this functionality aspect.

That's how it should work:
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11

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
<<<<<<< HEAD
alert(user.age); // Error: Property doesn't exist
=======
alert(user.age); // ReferenceError: Property doesn't exist: "age"
>>>>>>> ff804bc19351b72bc5df7766f4b9eb8249a3cb11
*/!*
```
