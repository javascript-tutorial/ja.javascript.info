# クラスのチェック: "instanceof"

`instanceof` 演算子でオブジェクトが特定のクラスに属しているのかを確認することができます。また、継承も考慮に入れます。

このようなチェックが必要なケースは多々あるかもしれません。ここでは、その型に応じて引数を別々に扱う *多形(ポリモーフィック)* 関数を構築するために使用します。

[cut]

## instanceof 演算子 

構文は次の通りです:
```js
obj instanceof Class
```

それは `obj` が `Class` (または、それを継承しているクラス)に属している場合に `true` を返します。

例:

```js run
class Rabbit {}
let rabbit = new Rabbit();

// Rabbit クラスのオブジェクト？
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

それはコンストラクタ関数でも動作します。:

```js run
*!*
// class の代わり
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

...また `Array` のような組み込みクラスでも動作します。:

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

`arr` は `Object` クラスにも属していることに留意してください。`Array` はプロトタイプ的に `Object` を継承しているためです。

`instanceof` 演算子は確認のためにプロトタイプチェーンを検査し、それは静的メソッド `Symbo.hasInstance` を使って微調整することが可能です。

`obj instanceof Class` のアルゴリズムはおおまかに次のように動作します。:

1. もし静的メソッド `Symbol.hasInstance` があれば、それを使います。このようになります。:

    ```js run
    // canEat は animal と仮定
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };
    alert(obj instanceof Animal); // true: Animal[Symbol.hasInstance](obj)が呼ばれます
    ```

2. ほとんどのクラスは `Symbol.hasInstance` を持っていません。このケースでは、`Class.prototype` が `obj` のプロトタイプチェーンうちの1つと等しいかをチェックします。

    言い換えると、以下のような比較を行います:
    ```js
    obj.__proto__ == Class.prototype
    obj.__proto__.__proto__ == Class.prototype
    obj.__proto__.__proto__.__proto__ == Class.prototype
    ...
    ```

    上の例では、`Rabbit.prototype == rabbit.__proto__` なので、すぐに回答が得られます。

    継承のケースでは、`rabbit` も同様に親クラスのインスタンスです。:

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*
    // rabbit.__proto__ == Rabbit.prototype
    // rabbit.__proto__.__proto__ == Animal.prototype (match!)
    ```

これは、`rabbit instanceof Animal` と `Animal.prototype` を比較したものです。:

![](instanceof.png)

ところで、[objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf) というメソッドもあります。それは `objA` が `objB` のプロトタイプチェーンのどこかにあれば `true` を返します。なので、`obj instanceof Class` のテストは `Class.prototype.isPrototypeOf(obj)` と言い換えることができます。

面白いことに、`Class` コンストラクタ自身はチェックには参加しません! プロトタイプと `Class.prototype`のチェーンだけです。

これは `prototype` が変更されたときに興味深い結果につながります。

このように:

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// prototype を変更します
Rabbit.prototype = {};

// ...もう rabbit ではありません
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

これが `prototype` の変更を避ける理由の1つです。安全を保つためです。

## おまけ: 型のための Object toString

私たちは通常の文字列は `[object Object]` という文字列に変換されることをすでに知っています。:

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // 同じ
```

これが `toString` の実装です。しかし、実際にはそれよりもはるかに強力な `toString` を作る隠れた機能があります。それを拡張させて `typeof` または `instanceof` の代替として利用することができます。

奇妙に聞こえますか？たしかに。分かりやすく説明しましょう。

[仕様(specification)](https://tc39.github.io/ecma262/#sec-object.prototype.tostring)によって、組み込みの `toString` はオブジェクトから抽出し、任意の値のコンテキストで実行することができます。そして、その結果はその値に依存します。

- 数値の場合、それは `[object Number]` になります。
- 真偽値の場合、`[object Boolean]` になります。
- `null` の場合: `[object Null]`
- `undefined` の場合: `[object Undefined]`
- 配列の場合: `[object Array]`
- ...など (カスタマイズ可能).

デモを見てみましょう:

```js run
// 使いやすくするために toString メソッドを変数にコピー
let objectToString = Object.prototype.toString;

// これの型はなに?
let arr = [];

alert( objectToString.call(arr) ); // [object Array]
```

ここでは、コンテキスト `this=arr` で関数 `objectToString` を実行するため、チャプター [デコレータと転送, call/apply](info:call-apply-decorators) で説明した [call](mdn:js/function/call) を使いました。

内部的には、`toString` アルゴリズムは `this` を検査し、対応する結果を返します。ほかの例です。:

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

Object `toString` の振る舞いは特別なオブジェクトプロパテ `Symbol.toStringTag` を使ってカスタマイズすることができます。

例:

```js run
let user = {
  [Symbol.toStringTag]: 'User'
};

alert( {}.toString.call(user) ); // [object User]
```

ほとんどの環境固有のオブジェクトには、そのようなプロパティがあります。 ブラウザ固有の例はほとんどありません。:

```js run
// 環境固有のオブジェクトとクラスのtoStringTag:
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

ご覧の通り、結果は正確に `Symbol.toStringTag` (存在する場合)で、`[object ...]` の中にラップされています。

最終的には、プリミティブなデータ型だけでなく、組み込みオブジェクトのためにも機能し、カスタマイズすることもできる "強化された typeof" があります。

これは、型を文字列として取得するだけでなく、チェックするために、組み込みオブジェクトに対して `instanceof` の代わりに使用できます。

## サマリ 

私たちが知っている型チェックメソッドについて再確認しましょう:

|               | 対象   |  戻り値      |
|---------------|-------------|---------------|
| `typeof`      | プリミティブ  |  文字列       |
| `{}.toString` | プリミティブ, 組み込みオブジェクト, `Symbol.toStringTag` をもつオブジェクト  |       文字列 |
| `instanceof`  | オブジェクト     |  true/false   |

ご覧のように、`{}.toString` は技術的には "より高度な" `typeof` です。

そして、`instanceof` 演算子は、クラス階層を扱っていて継承を考慮したクラスのチェックをしたい場合に本当に輝きます。
