<<<<<<< HEAD
もし `"constructor"` プロパティが正しい値を持っていることが確かであるなら、私たちはこのようなアプローチを使うことができます。

例えば、デフォルトの `"prototype"` を触らないのであれば、このコードは確実に動作します:
=======
We can use such approach if we are sure that `"constructor"` property has the correct value.

For instance, if we don't touch the default `"prototype"`, then this code works for sure:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (worked!)
```

<<<<<<< HEAD
`User.prototype.constructor == User` であるため、これは動作します。

..しかし、いわば誰かが `User.prototype` を上書きし、`"constructor"` を再作成するのを忘れている場合、それは失敗するでしょう。

例:
=======
It worked, because `User.prototype.constructor == User`.

..But if someone, so to speak, overwrites `User.prototype` and forgets to recreate `constructor` to reference `User`, then it would fail.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
なぜ `user2.name` が `undefined` なのでしょう?

ここで、`new user.constructor('Pete')` は次のように動作します:

1. 最初に、`user` の中で `constructor` を探します。ありません。
2. 次に、プロトタイプチェーンに沿います。`user` のプロトタイプは `User.prototype` で、これも `constructor` を持っていません。
3. `User.prototype` の値は普通のオブジェクト `{}` であり、そのプロトタイプは `Object.prototype` です。そして、`Object.prototype.constructor == Object` があります。なので、これが使われます。

最終的に、`let user2 = new Object('Pete')` となります。組み込みの `Object` コンストラクタは引数を無視し、常に空のオブジェクトを生成します -- これは、結局私たちが `user2` で持っているものです。 
=======
Why `user2.name` is `undefined`?

Here's how `new user.constructor('Pete')` works:

1. First, it looks for `constructor` in `user`. Nothing.
2. Then it follows the prototype chain. The prototype of `user` is `User.prototype`, and it also has no `constructor` (because we "forgot" to set it right!).
3. Going further up the chain, `User.prototype` is a plain object, its prototype is the built-in `Object.prototype`. 
4. Finally, for the built-in `Object.prototype`, there's a built-in `Object.prototype.constructor == Object`. So it is used.

Finally, at the end, we have `let user2 = new Object('Pete')`. 

Probably, that's not what we want. We'd like to create `new User`, not `new Object`. That's the outcome of the missing `constructor`.

(Just in case you're curious, the `new Object(...)` call converts its argument to an object. That's a theoretical thing, in practice no one calls `new Object` with a value, and generally we don't use `new Object` to make objects at all).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
