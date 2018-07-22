解答は2つパートがあります。

最初に、簡単な方は、継承しているクラスはコンストラクタで `super()` を呼ぶ必要があるということです。そうでなければ `"this"` が "定義済み" になりません。

なので、次のように直します:

```js run
class Rabbit extends Object {
  constructor(name) {
*!*
    super(); // 継承しているとき、親コンストラクタを呼ぶ必要があります
*/!*
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // true
```

しかし、これですべてではありません。

修正した後でさえ、`"class Rabbit extends Object"` 対 `class Rabbit` では依然として重要な違いがあります。

知っている通り、 "extends" 構文は2つのプロトタイプを設定します。:

1. コンストラクタ関数の `"prototype"` 間(メソッド用)
2. コンストラクタ関数自身の間(静的メソッド用)

我々のケースでは、`class Rabbit extends Object` では次を意味します:

```js run
class Rabbit extends Object {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) true
```

従って、このように `Rabbit` 経由で `Object` の静的メソッドにアクセスすることができます。:

```js run
class Rabbit extends Object {}

*!*
// 通常は Object.getOwnPropertyNames と呼びます
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // a,b
*/!*
```

また、`extends` を使わない場合 `class Rabbit` は2つ目の参照を持ちません。

比較してみてください:

```js run
class Rabbit {}

alert( Rabbit.prototype.__proto__ === Object.prototype ); // (1) true
alert( Rabbit.__proto__ === Object ); // (2) false (!)

*!*
// エラー、Rabbit にこのような関数はありません
alert ( Rabbit.getOwnPropertyNames({a: 1, b: 2})); // Error
*/!*
```

シンプルな `class Rabbit` では `Rabbit` 関数は同じプロトタイプを持っています。

```js run
class Rabbit {}

// (2) の代わりに、これは正しいです:
alert( Rabbit.__proto__ === Function.prototype );
```

ところで、`Function.prototype` は "一般的な" 関数メソッドを持っています。例えば `call`, `bind` などです。それらは究極的には両方のケースで利用可能です。なぜなら、組み込みの `Object` コンストラクタに対して、`Object.__proto__ === Function.prototype` だからです。

これはその図です:

![](rabbit-extends-object.png)

従って、まとめると2つの違いがあります。:

| class Rabbit | class Rabbit extends Object  |
|--------------|------------------------------|
| --             | コンストラクタで `super()` を呼ぶ必要がある |
| `Rabbit.__proto__ === Function.prototype` | `Rabbit.__proto__ === Object` |
