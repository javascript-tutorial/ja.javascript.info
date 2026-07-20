
<<<<<<< HEAD
# プロパティフラグとディスクリプタ

ご存知の通り、オブジェクトはプロパティを格納できます。

これまで、プロパティは単純な "key-value" ペアでしたが、実際にはオブジェクトプロパティはより柔軟で強力なものです。

この章では、追加の設定オプションについて説明し、次の章では、それらを見えない形、getter/setter 関数にする方法について見ていきます。

## プロパティフラグ 

オブジェクトプロパティには、 **`value`** の他に、3つの特別な属性があります("フラグ" と呼ばれています)。

- **`writable`** -- `true` の場合、変更可能です。それ以外の場合は読み取り専用です。
- **`enumerable`** -- `true` の場合、ループで列挙されます。それ以外の場合は列挙されません。
- **`configurable`** -- `true` の場合、プロパティを削除したり属性の変更ができます。

一般的にこれらは姿を見せることがないため、まだ見ていませんでした。"通常の方法" でプロパティを作成するとき、これらはすべて `true` です。が、いつでもそれを変更することができます。

まず、フラグを取得する方法を見てみましょう。

メソッド [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) で、プロパティの *完全な* 情報を参照することができます。

構文は次の通りです:
=======
# Property flags and descriptors

As we know, objects can store properties.

Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.

In this chapter we'll study additional configuration options, and in the next we'll see how to invisibly turn them into getter/setter functions.

## Property flags

Object properties, besides a **`value`**, have three special attributes (so-called "flags"):

- **`writable`** -- if `true`, the value can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.

We didn't see them yet, because generally they do not show up. When we create a property "the usual way", all of them are `true`. But we also can change them anytime.

First, let's see how to get those flags.

The method [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) allows to query the *full* information about a property.

The syntax is:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
<<<<<<< HEAD
: 情報を取得するオブジェクトです。

`propertyName`
: プロパティ名です。

返却値はいわゆる "プロパティディスクリプタ" オブジェクトと呼ばれます。: それは値とすべてのフラグを含んでいます。

例:
=======
: The object to get information from.

`propertyName`
: The name of the property.

The returned value is a so-called "property descriptor" object: it contains the value and all the flags.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
<<<<<<< HEAD
/* プロパティディスクリプタ:
=======
/* property descriptor:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

<<<<<<< HEAD
[Object.defineProperty](mdn:js/Object/defineProperty) でフラグの変更ができます。

構文:
=======
To change the flags, we can use [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

The syntax is:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
<<<<<<< HEAD
: 処理するオブジェクトとプロパティです。

`descriptor`
: 適用するプロパティディスクリプタです。

プロパティが存在する場合、`defineProperty` はそのフラグを更新します。存在しない場合は指定された値とフラグでプロパティを作ります。その場合に、もしフラグが指定されていなければ `false` とみなされます。

例えば、ここではプロパティ `name` はすべて `false` のフラグで作られます。:
=======
: The object and its property to apply the descriptor.

`descriptor`
: Property descriptor object to apply.

If the property exists, `defineProperty` updates its flags. Otherwise, it creates the property with the given value and flags; in that case, if a flag is not supplied, it is assumed `false`.

For instance, here a property `name` is created with all falsy flags:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "John"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "John",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

<<<<<<< HEAD
"通常の方法で" 作成された `user.name` と上記を比較してください。今すべてのフラグは `false` です。このようにしたくなければ、`descriptor` で `true` をセットするのがよいでしょう。

では、例を使ってフラグの影響を見てみましょう。

## 書き込み不可(Non-writable) 

`writable` フラグを変更して `user.name` を書き込み不可（再代入不可）にしてみましょう:
=======
Compare it with "normally created" `user.name` above: now all flags are falsy. If that's not what we want then we'd better set them to `true` in `descriptor`.

Now let's see effects of the flags by example.

## Non-writable

Let's make `user.name` non-writable (can't be reassigned) by changing `writable` flag:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
<<<<<<< HEAD
user.name = "Pete"; // Error: Cannot assign to read only property 'name'...
*/!*
```

これで、`defineProperty` で上書きをしない限りは、誰も user.name を変えることはできません。

```smart header="strict mode の場合のみエラーが表示されます"
非 strict mode の場合、書き込み不可プロパティへの書き込みをしてもエラーは発生しません。ですが、操作は依然として成功はしません。非 strict 下では、フラグ違反の操作は単に無視されます。
```

これは先程と同じ例ですが、スクラッチでプロパティを作成します:
=======
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
*/!*
```

Now no one can change the name of our user, unless they apply their own `defineProperty` to override ours.

```smart header="Errors appear only in strict mode"
In non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
```

Here's the same example, but the property is created from scratch:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
<<<<<<< HEAD
  value: "Pete",
  // 新しいプロパティに対して、true のものは明示的に列挙する必要があります
=======
  value: "John",
  // for new properties we need to explicitly list what's true
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
  enumerable: true,
  configurable: true
*/!*
});

<<<<<<< HEAD
alert(user.name); // Pete
user.name = "Alice"; // Error
```

## 列挙可能でない(Non-enumerable) 

カスタムの `toString` を `user` に追加しましょう。

通常、オブジェクトが持つ組み込みの `toString` は列挙可能ではありません。それは `for..in` では表示されません。しかし私たちが自身の `toString` を追加した場合、デフォルトではこのように `for..in` で表示されます。:
=======
alert(user.name); // John
user.name = "Pete"; // Error
```

## Non-enumerable

Now let's add a custom `toString` to `user`.

Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

<<<<<<< HEAD
// デフォルトでは、両方のプロパティは列挙されます:
for (let key in user) alert(key); // name, toString
```

列挙されたくなければ、`enumerable:false` をセットします。すると、組み込みの関数同様、`for..in` ループで列挙されなくなります。:
=======
// By default, both our properties are listed:
for (let key in user) alert(key); // name, toString
```

If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
<<<<<<< HEAD
// これで toString は消えました:
=======
// Now our toString disappears:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
*/!*
for (let key in user) alert(key); // name
```

<<<<<<< HEAD
列挙可能でないプロパティは `Object.keys` からも除外されます。:
=======
Non-enumerable properties are also excluded from `Object.keys`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
alert(Object.keys(user)); // name
```

<<<<<<< HEAD
## 変更できない(Non-configurable)

組み込みオブジェクトやプロパティに対しては、変更不可フラグ（`configurable:false`）がプリセットされることがあります。

変更できないプロパティは削除したり変更することができません。

例えば、`Math.PI` は書き込み不可で、列挙不可であり、変更不可です:
=======
## Non-configurable

The non-configurable flag (`configurable:false`) is sometimes preset for built-in objects and properties.

A non-configurable property can't be deleted, its attributes can't be modified.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
<<<<<<< HEAD
したがって、プログラマは `Math.PI` の値を変えることも上書きすることもできません。

```js run
Math.PI = 3; // Error

// delete Math.PI もまた動作しません
```

`Math.PI` を再度 `writable` にすることもできません。:

```js run
// Error, configurable: false なので
Object.defineProperty(Math, "PI", { writable: true });
```

`Math.PI` についてはは何もできません。

変更不可なプロパティの作成は一方通行であり、それを `defineProperty` 戻すことはできません。

**注意: `configurable: false` はプロパティフラグの変更や削除を禁止しますが、値を変更することは可能です**

ここでは、 `user.name` は変更不可ですが、依然として変更はできます（書き込み可なので）:
=======
So, a programmer is unable to change the value of `Math.PI` or overwrite it.

```js run
Math.PI = 3; // Error, because it has writable: false

// delete Math.PI won't work either
```

We also can't change `Math.PI` to be `writable` again:

```js run
// Error, because of configurable: false
Object.defineProperty(Math, "PI", { writable: true });
```

There's absolutely nothing we can do with `Math.PI`.

Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

**Please note: `configurable: false` prevents changes of property flags and its deletion, while allowing to change its value.**

Here `user.name` is non-configurable, but we can still change it (as it's writable):
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

<<<<<<< HEAD
user.name = "Pete"; // 動作します
delete user.name; // Error
```

また、以下は組み込みの`Math.PI` のように `user.name` を "永遠に封印された定数" にしています。
=======
user.name = "Pete"; // works fine
delete user.name; // Error
```

And here we make `user.name` a "forever sealed" constant, just like the built-in `Math.PI`:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

<<<<<<< HEAD
// user.name とフラグは変更できません
// これらはすべて動作しません:
=======
// won't be able to change user.name or its flags
// all this won't work:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

<<<<<<< HEAD
```smart header="唯一可能な属性変更: writable true -> false"
フラグ変更に関する小さな例外があります。

変更不可プロパティに対して、`writable: true` を `false` に変更し、値の変更を防ぐことができます。しかし、その逆はできません。
=======
```smart header="The only attribute change possible: writable true -> false"
There's a minor exception about changing flags.

We can change `writable: true` to `false` for a non-configurable property, thus preventing its value modification (to add another layer of protection). Not the other way around though.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
```

## Object.defineProperties

<<<<<<< HEAD
一度に多くのプロパティが定義できるメソッド [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties)もあります。

構文は次の通りです:
=======
There's a method [Object.defineProperties(obj, descriptors)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that allows to define many properties at once.

The syntax is:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

<<<<<<< HEAD
例えば:
=======
For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

<<<<<<< HEAD
なので、一度に多くのプロパティをセットできます。

## Object.getOwnPropertyDescriptors

一度にすべてのプロパティのディスクリプタを取得するには、[Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) が使用できます。

`Object.defineProperties` と合わせて、"フラグを意識して" オブジェクトをクローンする方法として使うことができます。:
=======
So, we can set many properties at once.

## Object.getOwnPropertyDescriptors

To get all property descriptors at once, we can use the method [Object.getOwnPropertyDescriptors(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors).

Together with `Object.defineProperties` it can be used as a "flags-aware" way of cloning an object:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

<<<<<<< HEAD
通常、オブジェクトをクローンするとき、次のようにプロパティをコピーするために代入を使います。:
=======
Normally when we clone an object, we use an assignment to copy properties, like this:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
for (let key in user) {
  clone[key] = user[key]
}
```

<<<<<<< HEAD
...ですが、これはフラグはコピーしません。そのため、"より良い" クローンを望むなら、 `Object.defineProperties` が好まれます。

もう１つの違いは、`for..in` はシンボルプロパティを無視しますが、`Object.getOwnPropertyDescriptors` はシンボリックなものを含む *すべての* プロパティディスクリプタを返します。

## グローバルにオブジェクトを隠す

プロパティディスクリプタは個々のプロパティのレベルで動作します。

そこには、オブジェクト *全体* へのアクセスを制限するメソッドもあります。:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: オブジェクトにプロパティを追加するのを禁止します。

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: プロパティの追加、削除を禁止し、既存のすべてのプロパティに `configurable: false` をセットします。

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: プロパティの追加、削除、変更を禁止し、既存のすべてのプロパティに `configurable: false, writable: false` をセットします。

また、それらを確認する方法もあります:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: プロパティの追加が禁止されている場合に `false` を返します。それ以外は `true` です。

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: プロパティの追加、削除が禁止されており、すべての既存のプロパティが `configurable: false` を持っている場合に `true` を返します。

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: プロパティの追加、削除、変更が禁止されており、すべての現在のプロパティが `configurable: false, writable: false` の場合に `true` を返します。

これらのメソッドは実際にはめったに使われません。
=======
...But that does not copy flags. So if we want a "better" clone then `Object.defineProperties` is preferred.

Another difference is that `for..in` ignores symbolic and non-enumerable properties, but `Object.getOwnPropertyDescriptors` returns *all* property descriptors including symbolic and non-enumerable ones.

## Sealing an object globally

Property descriptors work at the level of individual properties.

There are also methods that limit access to the *whole* object:

[Object.preventExtensions(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)
: Forbids the addition of new properties to the object.

[Object.seal(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.

And also there are tests for them:

[Object.isExtensible(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)
: Returns `false` if adding properties is forbidden, otherwise `true`.

[Object.isSealed(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed)
: Returns `true` if adding/removing properties is forbidden, and all existing properties have `configurable: false`.

[Object.isFrozen(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
: Returns `true` if adding/removing/changing properties is forbidden, and all current properties are `configurable: false, writable: false`.

These methods are rarely used in practice.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
