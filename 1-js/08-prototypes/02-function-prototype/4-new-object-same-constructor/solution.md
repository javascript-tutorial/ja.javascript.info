もし `"constructor"` プロパティが正しい値を持っていることが確かであるなら、私たちはこのようなアプローチを使うことができます。

例えば、デフォルトの `"prototype"` を触らないのであれば、このコードは確実に動作します:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (worked!)
```

`User.prototype.constructor == User` であるため、これは動作します。

..しかし、いわば誰かが `User.prototype` を上書きし、`"constructor"` を再作成するのを忘れている場合、それは失敗するでしょう。

例:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

なぜ `user2.name` が `undefined` なのでしょう?

ここで、`new user.constructor('Pete')` は次のように動作します:

1. 最初に、`user` の中で `constructor` を探します。ありません。
2. 次に、プロトタイプチェーンに沿います。`user` のプロトタイプは `User.prototype` で、これも `constructor` を持っていません。
3. `User.prototype` の値は普通のオブジェクト `{}` であり、そのプロトタイプは `Object.prototype` です。そして、`Object.prototype.constructor == Object` があります。なので、これが使われます。

最終的に、`let user2 = new Object('Pete')` となります。組み込みの `Object` コンストラクタは引数を無視し、常に空のオブジェクトを生成します -- これは、結局私たちが `user2` で持っているものです。 
