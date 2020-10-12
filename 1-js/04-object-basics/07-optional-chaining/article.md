
<<<<<<< HEAD
# オプショナルチェイニング(Optional chaining) '?.'

[recent browser="new"]

オプショナルチェイニング `?.` は中間のプロパティが存在しない場合でも、安全にネストされたオブジェクトプロパティへアクセスするためための、エラー防止の方法です。

## 問題

このチュートリアルを読み、JavaScript を学び始めたばかりであれば、まだ問題には遭遇していなかもしれませんが、この問題は非常に一般的なことです。

例えば、一部のユーザは住所を持っていますが、住所を提供しなかったユーザもいるとします。すると、`user.address.street` は安全に読み取ることはできません:

```js run
let user = {}; // ユーザがたまたま住所(address)をもっていない
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

As an example, let's consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them. 

In such case, when we attempt to get `user.address.street`, we'll get an error:

```js run
let user = {}; // the user without "address" property
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

alert(user.address.street); // Error!
```

<<<<<<< HEAD
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
=======
That's the expected result, JavaScript works like this, but many practical cases we'd prefer to get `undefined` instead of an error (meaning "no street").

...And another example. In the web development, we may need to get an information about an element on the page, that sometimes doesn't exist:

```js run
// Error if the result of querySelector(...) is null
let html = document.querySelector('.my-element').innerHTML;
```

Before `?.` appeared in the language, the `&&` operator was used to work around that.

For example:

```js run
let user = {}; // user has no address

alert( user && user.address && user.address.street ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but is cumbersome to write.

## Optional chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `undefined` or `null`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

Here's the safe way to access `user.address.street`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

<<<<<<< HEAD
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
=======
Please note: the `?.` syntax makes optional the value before it, but not any further.

In the example above, `user?.` allows only `user` to be `null/undefined`.

On the other hand, if `user` does exist, then it must have `user.address` property, otherwise `user?.address.street` gives an error at the second dot.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must be there, but `address` is optional, then `user.address?.street` would be better.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
`let/const/var user` が必要です。オプショナルチェイニングは宣言済みの変数に対してのみ機能します。
=======
There must be a declaration (e.g. `let/const/var user`). The optional chaining works only for declared variables.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
````

## Short-circuiting

<<<<<<< HEAD
前に述べたように、`?.` は左部分が存在しない場合には、即座に評価を停止("short-circuits")します。

したがって、そこになんらかの関数呼び出しや副作用があっても発生しません。:
=======
As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // 何も起きません

alert(x); // 0, 値はインクリメントされていません。
```

## 他のケース: ?.(), ?.[]

オプショナルチェイニング `?.` は演算子ではなく、特別な構文構造であり、関数や括弧と一緒でも機能します。

例えば、`?.()` は存在しない可能性のある関数を呼び出すときに使用されます。

以下のコードでは、ユーザによって `admin` メソッドがある場合とない場合があります:
=======
user?.sayHi(x++); // no "sayHi", so the execution doesn't reach x++

alert(x); // 0, value not incremented
```

## Other variants: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

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

<<<<<<< HEAD
ここでは、両方の行で最初にドット `.` を使用して `admin` プロパティを取得しています。なぜなら、ユーザオブジェクトは必須であり、そこからは安全に読み取ることができるからです。

次に、`?.()` で左部分をチェックします: admin 関数が存在する場合は実行します(`user1` の場合)。そうでなければ(`user2` の場合)、評価はエラーなしで停止します。

ドット `.` の代わりに括弧 `[]` を使用してプロパティにアクセスしたい場合にも、`?.[]` 構文は機能します。前のケース同様、存在しない可能性のあるオブジェクトから安全にプロパティを読み取ることができます。
=======
Here, in both lines we first use the dot (`user1.admin`) to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `user1`). Otherwise (for `user2`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

```js run
let user1 = {
  firstName: "John"
};

<<<<<<< HEAD
let user2 = null; // ユーザを認証できないと想像してください
=======
let user2 = null; // Imagine, we couldn't authorize the user
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

<<<<<<< HEAD
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
=======
Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

````warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment.

For example:
```js run
let user = null;

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

It's just not that smart.
````

## Summary

The optional chaining `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj.method?.()` -- calls `obj.method()` if `obj.method` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't to exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 0599d07b3c13ee25f583fc091cead3c17a7e7779
