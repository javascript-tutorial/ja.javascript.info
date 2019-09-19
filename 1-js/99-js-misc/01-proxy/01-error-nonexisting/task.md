# 存在しないプロパティの読み取りエラー

通常、存在しないプロパティへの参照をすると `undefined` が返ってきます。

代わりに、存在しないプロパティへの参照時にはエラーをスローするようなプロキシを作成してください。

これはプログラミングのミスを早期に検出するのに便利です。

オブジェクト `target` を取り、この機能を追加するプロキシを返す関数 `wrap(target)` を実装してください。

次のように動作するようにしてください:

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
