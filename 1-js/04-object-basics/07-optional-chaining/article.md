
<<<<<<< HEAD
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
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is a safe way to access nested object properties, even if an intermediate property doesn't exist.

## The "non-existing property" problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

As an example, let's say we have `user` objects that hold the information about our users.

Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.

In such case, when we attempt to get `user.address.street`, and the user happens to be without an address, we get an error:

```js run
let user = {}; // a user without "address" property
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

alert(user.address.street); // Error!
```

<<<<<<< HEAD
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
=======
That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.

In many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").

...And another example. In the web development, we can get an object that corresponds to a web page element using a special method call, such as `document.querySelector('.elem')`, and it returns `null` when there's no such element.

```js run
// document.querySelector('.elem') is null if there's no element
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

Once again, if the element doesn't exist, we'll get an error accessing `.innerHTML` of `null`. And in some cases, when the absence of the element is normal, we'd like to avoid the error and just accept `html = null` as the result.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing its property, like this:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

<<<<<<< HEAD
これはエラーなく機能します。が、まったくエレガントではありません。ご覧の通り、`"user.address"` がコードに2回登場します。より深いネストされたプロパティの場合、より多くの繰り替えしが必須となり、問題になります。

例. `user.address.street.name` を取得してみましょう。

`user.address` と `user.address.street` 両方のチェックが必要です。

```js
let user = {}; // user は address を持っていません。
=======
It works, there's no error... But it's quite inelegant. As you can see, the `"user.address"` appears twice in the code. For more deeply nested properties, that becomes a problem as more repetitions are required.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

<<<<<<< HEAD
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
=======
That's just awful, one may even have problems understanding such code.

Don't even care to, as there's a better way to write it, using the `&&` operator:

```js run
let user = {}; // user has no address

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

That's why the optional chaining `?.` was added to the language. To solve this problem once and for all!

## Optional chaining

The optional chaining `?.` stops the evaluation if the value before `?.` is `undefined` or `null` and returns `undefined`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

In other words, `value?.prop`:
- works as `value.prop`, if `value` exists,
- otherwise (when `value` is `undefined/null`) it returns `undefined`.

Here's the safe way to access `user.address.street` using `?.`:

```js run
let user = {}; // user has no address

alert( user?.address?.street ); // undefined (no error)
```

The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

<<<<<<< HEAD
`?.` 構文はその前の値を任意にしますが、それ以上のことはしないことに注意してください。

例えば、`user?.address.street.name` の `?.` により `user` を安全に `null/undefined` にすることができます（そして、このケースでは `undefined` を返します）。が、これは `user` の場合のみです。その他のプロパティは通常の方法でアクセスします。いくつかを任意にした場合、さらに `.` を `?.` に置き換える必要があります。

```warn header="オプショナルチェイニングを使いすぎないでください"
存在しなくてもOKな場合にのみ、`?.` を使用してください。

例えば、コードのロジックとして `user` オブジェクトは必須だが、`address` はオプションである場合、`user.address?.street` は親切です。

したがって、プログラムミスにより `user` が未定義である場合は修正が必要です。そうせずに不用意に `?.` を利用すると、コーディングエラーが適切でないときに沈黙し、デバッグが困難になる可能性があります。
```

````warn header="`?.` の前の変数は定義されていなければなりません"
`user` 変数が未定義の場合、`user?.anything` はエラーになります:
=======
Please note: the `?.` syntax makes optional the value before it, but not any further.

E.g. in `user?.address.street.name` the `?.` allows `user` to safely be `null/undefined` (and returns `undefined` in that case), but that's only for `user`. Further properties are accessed in a regular way. If we want some of them to be optional, then we'll need to replace more `.` with `?.`.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.

So, if `user` happens to be undefined due to a mistake, we'll see a programming error about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
// ReferenceError: user is not defined
user?.address;
```
<<<<<<< HEAD
`let/const/var user` が必要です。オプショナルチェイニングは宣言済みの変数に対してのみ機能します。
=======
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
````

## Short-circuiting

<<<<<<< HEAD
前に述べたように、`?.` は左部分が存在しない場合には、即座に評価を停止("short-circuits")します。

したがって、そこになんらかの関数呼び出しや副作用があっても発生しません。

例:
=======
As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur.

For instance:
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

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
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

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
<<<<<<< HEAD
userGuest.admin?.(); // なにもしない (このようなメソッドはありません)
*/!*
```

ここでは、両方の行で最初にドット `.` を使用して `admin` プロパティを取得しています。ユーザオブジェクトは必須であり、そこからは安全に読み取ることができるからです。

次に、`?.()` で左部分をチェックします: admin 関数が存在する場合は実行します(`user1` の場合)。そうでなければ(`user2` の場合)、評価はエラーなしで停止します。

ドット `.` の代わりに括弧 `[]` を使用してプロパティにアクセスしたい場合にも、`?.[]` 構文は機能します。前のケース同様、存在しない可能性のあるオブジェクトから安全にプロパティを読み取ることができます。
=======
userGuest.admin?.(); // nothing (no such method)
*/!*
```

Here, in both lines we first use the dot (`userAdmin.admin`) to get `admin` property, because we assume that the user object exists, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (that's so for `userAdmin`). Otherwise (for `userGuest`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602

```js run
let key = "firstName";

let user1 = {
  firstName: "John"
};

let user2 = null; 

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
```

<<<<<<< HEAD
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

Still, we should apply `?.` carefully, only where it's acceptable that the left part doesn't exist. So that it won't hide programming errors from us, if they occur.
>>>>>>> 4d01fc20d4d82358e61518a31efe80dec9bb2602
