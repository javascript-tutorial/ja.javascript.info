
# オプショナルチェイニング(Optional chaining) '?.'

[recent browser="new"]

オプショナルチェイニング `?.` は中間のプロパティが存在しない場合でも、安全にネストされたオブジェクトプロパティへアクセスするためための、エラー防止の方法です。

## 問題

このチュートリアルを読み、JavaScript を学び始めたばかりであれば、まだ問題には遭遇していなかもしれませんが、この問題は非常に一般的なことです。

例えば、一部のユーザは住所を持っていますが、住所を提供しなかったユーザもいるとします。すると、`user.address.street` は安全に読み取ることはできません:

```js run
let user = {}; // ユーザがたまたま住所(address)をもっていない

alert(user.address.street); // Error!
```

あるいは、Web 開発ではページ上の要素に関する情報が取得したいが、存在しない可能性があります:

```js run
// querySelector(...)  の結果が null ならエラー
let html = document.querySelector('.my-element').innerHTML;
```

言語に `?.` が登場する以前は、これを回避するために `&&` 演算子が使わていました。

例:

```js run
let user = {}; // ユーザは address を持たない

alert( user && user.address && user.address.street ); // undefined (エラーは起きません)
```

プロパティへのパス全体を AND することで、すべてのコンポーネントが確実に存在することを保証しますが、記述するのが面倒です。

## オプショナルチェイニング

オプショナルチェイニング `?.`  は、`?.` の前の部分が `undefined` あるいは `null` であれば検査をストップし、`undefined` を返します。

**この記事ではさらに、簡潔な表現として、`null` でも `undefined` でもない場合には、なにかが "存在" する、と述べています**

`user.address.street` に安全にアクセスする方法は次の通りです:

```js run
let user = {}; // ユーザは address を持たない

alert( user?.address?.street ); // undefined (エラーは起きません)
```

例え `user` オブジェクトが存在しなくても、`user?.address` の address の読み取りは動作します:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

注意してください: `?.` 構文はその前の値を任意にしますが、それ以上のことはしません。

上の例では、`user?.` は `user` が `null/undefined` であることのみを許容します。

一方、`user` が存在する場合は `user.address` プロパティが必須です。そうでない場合 `user?.address.street` は2つ目のドットでエラーになります。

```warn header="オプショナルチェイニングを使いすぎないでください"
存在しなくてもOKな場合にのみ、`?.` を使用してください。

例えば、コードのロジックとして `user` オブジェクトは必須だが、`address` はオプションである場合、`user.address?.street` は親切です。

したがって、プログラムミスにより `user` が未定義である場合は修正が必要です。そうせずに不用意に `?.` を利用すると、コーディングエラーが適切でないときに沈黙し、デバッグが困難になる可能性があります。
```

````warn header="`?.` の前の変数は定義されていなければなりません"
`user` 変数が未定義の場合、`user?.anything` はエラーになります:

```js run
// ReferenceError: user is not defined
user?.address;
```
`let/const/var user` が必要です。オプショナルチェイニングは宣言済みの変数に対してのみ機能します。
````

## Short-circuiting

前に述べたように、`?.` は左部分が存在しない場合には、即座に評価を停止("short-circuits")します。

したがって、そこになんらかの関数呼び出しや副作用があっても発生しません。:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // 何も起きません

alert(x); // 0, 値はインクリメントされていません。
```

## 他のケース: ?.(), ?.[]

オプショナルチェイニング `?.` は演算子ではなく、特別な構文構造であり、関数や括弧と一緒でも機能します。

例えば、`?.()` は存在しない可能性のある関数を呼び出すときに使用されます。

以下のコードでは、ユーザによって `admin` メソッドがある場合とない場合があります:

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

ここでは、両方の行で最初にドット `.` を使用して `admin` プロパティを取得しています。なぜなら、ユーザオブジェクトは必須であり、そこからは安全に読み取ることができるからです。

次に、`?.()` で左部分をチェックします: admin 関数が存在する場合は実行します(`user1` の場合)。そうでなければ(`user2` の場合)、評価はエラーなしで停止します。

ドット `.` の代わりに括弧 `[]` を使用してプロパティにアクセスしたい場合にも、`?.[]` 構文は機能します。前のケース同様、存在しない可能性のあるオブジェクトから安全にプロパティを読み取ることができます。

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // ユーザを認証できないと想像してください

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

`delete` を一緒に `?.` を使用することもできます:

```js run
delete user?.name; // ユーザが存在する場合、 user.name を削除します
```

```warn header="`?.` を使用して、読み取りと削除を安全に行うことができますが、書き込みはできません"
オプショナルチェイニング `?.` は代入の左側では使用できません:

```js run
// 以下のコードは、ユーザが存在する場合に user.name を書き込もうとするものです

user?.name = "John"; // エラー、動作しません
// undefined = "John" と評価されるためです
```

## サマリ

`?.` 構文には3つの形式があります:

1. `obj?.prop` -- `obj` が存在する場合、`obj.prop` を返します。そうでない場合は `undefined` です。
2. `obj?.[prop]` -- `obj` が存在する場合、`obj[prop]` を返します。そうでない場合は `undefined` です。
3. `obj?.method()` -- `obj` が存在する場合、`obj.method()` を呼び出します。そうでない場合は `undefined` を返します。

ご覧の通り、それらはすべて分かりやすく使いやすいです。`?.` は左側の部分で `null/undefined` をチェックし、そうでない場合は評価を続行できるようにします。

`?.` のチェインにより、ネストされたプロパティに安全にアクセスすることができます。

ですが、`?.` は慎重に適用する必要があります。左側の部分が存在しなくても問題ない場合に限ります。

プログラムエラーが隠れてしまわないようにしましょう。
