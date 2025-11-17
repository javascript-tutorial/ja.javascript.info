<<<<<<< HEAD
はい、確かに奇妙に見えます。

しかし、`instanceof` は関数を気にするのではなく、プロトタイプチェーンに対してマッチする `prototype` について気にします。

そして、ここでは `a.__proto__ == B.prototype` なので、`instanceof` が `true` を返します。

従って、`instanceof` のロジックに基づいて、`prototype` は実際にはコンストラクタ関数ではなく型を定義します。
=======
Yeah, looks strange indeed.

But `instanceof` does not care about the function, but rather about its `prototype`, that it matches against the prototype chain.

And here `a.__proto__ == B.prototype`, so `instanceof` returns `true`.

So, by the logic of `instanceof`, the `prototype` actually defines the type, not the constructor function.
>>>>>>> 5e893cffce8e2346d4e50926d5148c70af172533
