
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
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: 情報を取得するオブジェクトです。

`propertyName`
: プロパティ名です。

返却値はいわゆる "プロパティディスクリプタ" オブジェクトと呼ばれます。: それは値とすべてのフラグを含んでいます。

例:

```js run
let user = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* プロパティディスクリプタ:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

[Object.defineProperty](mdn:js/Object/defineProperty) でフラグの変更ができます。

構文:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
: 処理するオブジェクトとプロパティです。

`descriptor`
: 適用するプロパティディスクリプタです。

プロパティが存在する場合、`defineProperty` はそのフラグを更新します。存在しない場合は指定された値とフラグでプロパティを作ります。その場合に、もしフラグが指定されていなければ `false` とみなされます。

例えば、ここではプロパティ `name` はすべて `false` のフラグで作られます。:

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

"通常の方法で" 作成された `user.name` と上記を比較してください。今すべてのフラグは `false` です。このようにしたくなければ、`descriptor` で `true` をセットするのがよいでしょう。

では、例を使ってフラグの影響を見てみましょう。

## 書き込み不可(Non-writable) 

`writable` フラグを変更して `user.name` を書き込み不可（再代入不可）にしてみましょう:

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
user.name = "Pete"; // Error: Cannot assign to read only property 'name'...
*/!*
```

これで、`defineProperty` で上書きをしない限りは、誰も user.name を変えることはできません。

```smart header="strict mode の場合のみエラーが表示されます"
非 strict mode の場合、書き込み不可プロパティへの書き込みをしてもエラーは発生しません。ですが、操作は依然として成功はしません。非 strict 下では、フラグ違反の操作は単に無視されます。
```

これは先程と同じ例ですが、スクラッチでプロパティを作成します:

```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
  value: "Pete",
  // 新しいプロパティに対して、true のものは明示的に列挙する必要があります
  enumerable: true,
  configurable: true
*/!*
});

alert(user.name); // Pete
user.name = "Alice"; // Error
```

## 列挙可能でない(Non-enumerable) 

カスタムの `toString` を `user` に追加しましょう。

通常、オブジェクトが持つ組み込みの `toString` は列挙可能ではありません。それは `for..in` では表示されません。しかし私たちが自身の `toString` を追加した場合、デフォルトではこのように `for..in` で表示されます。:

```js run
let user = {
  name: "John",
  toString() {
    return this.name;
  }
};

// デフォルトでは、両方のプロパティは列挙されます:
for (let key in user) alert(key); // name, toString
```

列挙されたくなければ、`enumerable:false` をセットします。すると、組み込みの関数同様、`for..in` ループで列挙されなくなります。:

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
// これで toString は消えました:
*/!*
for (let key in user) alert(key); // name
```

列挙可能でないプロパティは `Object.keys` からも除外されます。:

```js
alert(Object.keys(user)); // name
```

## 変更できない(Non-configurable)

組み込みオブジェクトやプロパティに対しては、変更不可フラグ（`configurable:false`）がプリセットされることがあります。

変更できないプロパティは削除したり変更することができません。

例えば、`Math.PI` は書き込み不可で、列挙不可であり、変更不可です:

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

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  configurable: false
});

user.name = "Pete"; // 動作します
delete user.name; // Error
```

また、以下は組み込みの`Math.PI` のように `user.name` を "永遠に封印された定数" にしています。

```js run
let user = {
  name: "John"
};

Object.defineProperty(user, "name", {
  writable: false,
  configurable: false
});

// user.name とフラグは変更できません
// これらはすべて動作しません:
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", { value: "Pete" });
```

```smart header="唯一可能な属性変更: writable true -> false"
フラグ変更に関する小さな例外があります。

変更不可プロパティに対して、`writable: true` を `false` に変更し、値の変更を防ぐことができます。しかし、その逆はできません。
```

## Object.defineProperties

一度に多くのプロパティが定義できるメソッド [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties)もあります。

構文は次の通りです:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

例えば:

```js
Object.defineProperties(user, {
  name: { value: "John", writable: false },
  surname: { value: "Smith", writable: false },
  // ...
});
```

なので、一度に多くのプロパティをセットできます。

## Object.getOwnPropertyDescriptors

一度にすべてのプロパティのディスクリプタを取得するには、[Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors) が使用できます。

`Object.defineProperties` と合わせて、"フラグを意識して" オブジェクトをクローンする方法として使うことができます。:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

通常、オブジェクトをクローンするとき、次のようにプロパティをコピーするために代入を使います。:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

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
