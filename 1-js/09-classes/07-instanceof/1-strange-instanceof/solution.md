はい、確かに奇妙に見えます。

しかし、`instanceof` は関数を気にするのではなく、プロトタイプチェーンに対してマッチする `prototype` について気にします。

そして、ここでは `a.__proto__ == B.prototype` なので、`instanceof` が `true` を返します。

従って、`instanceof` のロジックに基づいて、`prototype` は実際にはコンストラクタ関数ではなく型を定義します。
