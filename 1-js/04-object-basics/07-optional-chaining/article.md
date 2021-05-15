
# オプショナルチェイニング(Optional chaining) '?.'

[recent browser="new"]

オプショナルチェイニング `?.` は中間のプロパティが存在しない場合でも、安全にネストされたオブジェクトプロパティへアクセスするためための、エラー防止の方法です。

## "存在しないプロパティ" 問題

このチュートリアルを読み、JavaScript を学び始めたばかりであれば、まだ問題には遭遇していなかもしれませんが、この問題は非常に一般的なことです。

例えば、ユーザに関する情報をもっている `user` オブジェクトがあるとしましょう。

ほとんどのユーザは `user.address` プロパティに住所があり、`user.address.street` が通りになりますが、住所を提供しなかったユーザもいるとします。

このような場合はエラーが発生します:

```js run
let user = {}; // ユーザがたまたま住所(address)をもっていない

alert(user.address.street); // Error!
```

これは予期した結果です。JavaScript はこのような動作をします。`user.address` は `undefined` なので、`user.address.street` の取得はエラーで失敗します。

多くの実際のケースでは、この例ではエラーの代わりに `undeinfed` が取得されるほうがよいです（ street がないことを意味する）。

...また、もう１つの例です。Web 開発では `document.querySelector('.elem')` のような特別なメソッド呼び出しにより、Web ページの要素に対応するオブジェクトを取得することができます。

```js run
// querySelector(...)  の結果が null ならエラー
let html = document.querySelector('.my-element').innerHTML;
```

繰り返しになりますが、要素が存在しない場合、`null` の `.innerHTML` アクセスはエラーになります。また、要素がないことが正常である場合は、エラーを避け、 `html = null` という結果にしたいです。

どうすればよいでしょうか？

明白な解決策は、次のようにそのプロパティにアクセスする前に、`if` あるいは条件演算子 `?` を使用して値を確認することでしょう。

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

これはエラーなく機能します。が、まったくエレガントではありません。ご覧の通り、`"user.address"` がコードに2回登場します。より深いネストされたプロパティの場合、より多くの繰り替えしが必須となり、問題になります。

例. `user.address.street.name` を取得してみましょう。

`user.address` と `user.address.street` 両方のチェックが必要です。

```js
let user = {}; // user は address を持っていません。

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

これはひどいですね、このようなコードは理解するのに問題があるかもしれません。

`&&` 演算子を使用することで、よりよい書き方をすることができます。

```js run
let user = {}; // user は address を持っていません

alert( user && user.address && user.address.street ); // undefined (エラーは起きません)
```

プロパティへのパス全体を AND することで、すべてのコンポーネントが確実に存在することを保証します(ない場合は評価をやめます)が、記述するのが面倒です。

ご覧の通り、プロパティ名は依然としてコードの中で重複しています。例えば、上のコードであれば `user.address` が3回登場します。

そういうわけで、オプショナルチェイニング `?.` は言語へ追加されました。この問題を完全に解決するために。

## オプショナルチェイニング

オプショナルチェイニング `?.`  は、`?.` の前の部分が `undefined` あるいは `null` であれば検査をストップし、`undefined` を返します。

**この記事ではさらに、簡潔な表現として、`null` でも `undefined` でもない場合には、なにかが "存在" する、と述べています**

つまり、`value?.prop` は:
- `value.prop` として動作します（`value` が存在する場合）
- そうでない場合（`value` が `undefined/null`）は、`undefined` を返します。

`?.` を使用して `user.address.street` に安全にアクセスする方法は次の通りです:

```js run
let user = {}; // ユーザは address を持たない

alert( user?.address?.street ); // undefined (エラーは起きません)
```

コードは短く簡潔になり、重複もありません。

たとえ `user` オブジェクトが存在しなくても、`user?.address` の address の読み取りは動作します:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

`?.` 構文はその前の値を任意にしますが、それ以上のことはしないことに注意してください。

例えば、`user?.address.street.name` の `?.` により `user` を安全に `null/undefined` にすることができます（そして、このケースでは `undefined` を返します）。が、これは `user` の場合のみです。その他のプロパティは通常の方法でアクセスします。いくつかを任意にした場合、さらに `.` を `?.` に置き換える必要があります。

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

したがって、そこになんらかの関数呼び出しや副作用があっても発生しません。

例:

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
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // なにもしない (このようなメソッドはありません)
*/!*
```

ここでは、両方の行で最初にドット `.` を使用して `admin` プロパティを取得しています。ユーザオブジェクトは必須であり、そこからは安全に読み取ることができるからです。

次に、`?.()` で左部分をチェックします: admin 関数が存在する場合は実行します(`user1` の場合)。そうでなければ(`user2` の場合)、評価はエラーなしで停止します。

ドット `.` の代わりに括弧 `[]` を使用してプロパティにアクセスしたい場合にも、`?.[]` 構文は機能します。前のケース同様、存在しない可能性のあるオブジェクトから安全にプロパティを読み取ることができます。

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

`delete` と一緒に `?.` を使用することもできます:

```js run
delete user?.name; // user が存在する場合、 user.name を削除します
```

````warn header="`?.` を使用して、読み取りと削除を安全に行うことができますが、書き込みはできません"
オプショナルチェイニング `?.` は代入の左側では使用できません。

例:
```js run
// 以下のコードは、ユーザが存在する場合に user.name を書き込もうとするものです

user?.name = "John"; // エラー、動作しません
// undefined = "John" と評価されるためです
```


````

## サマリ

`?.` 構文には3つの形式があります:

1. `obj?.prop` -- `obj` が存在する場合、`obj.prop` を返します。そうでない場合は `undefined` です。
2. `obj?.[prop]` -- `obj` が存在する場合、`obj[prop]` を返します。そうでない場合は `undefined` です。
3. `obj?.method()` -- `obj` が存在する場合、`obj.method()` を呼び出します。そうでない場合は `undefined` を返します。

ご覧の通り、それらはすべて分かりやすく使いやすいです。`?.` は左側の部分で `null/undefined` をチェックし、そうでない場合は評価を続行できるようにします。

`?.` のチェインにより、ネストされたプロパティに安全にアクセスすることができます。

ですが、`?.` は慎重に適用する必要があります。左側の部分が存在しなくても問題ない場合に限ります。プログラムエラーが隠れてしまわないようにしましょう。
