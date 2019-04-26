
<<<<<<< HEAD
# すべてのプロパティを取得する 

オブジェクトから キー/値 を取得する多くの方法があります。

プロトタイプを除いて、それらのほとんどはオブジェクト自体に作用します、それらを思い出しましょう:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- 列挙可能な自身の文字列プロパティ名/値/キー値ペアの配列を返します。それらのメソッドは *列挙可能な* プロパティで、*キーとして文字列を持つ* ものだけをリストします。

もしもシンボリックプロパティがほしい場合は:

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- すべての自身のシンボリックプロパティ名の配列を返します。

非列挙型のプロパティが欲しい場合は:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- すべての自身の文字列プロパティ名を返します。

*すべて* のプロパティが欲しい場合は:

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- すべての自身のプロパティ名の配列を返します。


これらのメソッドは、どのプロパティが返されるかについて少し異なりますが、すべてがそのオブジェクト自身で動作します。プロトタイプからのプロパティはリストされません。

## for..in loop

`for..in` ループは異なります。: それは継承されたプロパティもループします。

例:
=======
# Getting all properties

There are many ways to get keys/values from an object.

Most of them operate on the object itself, excluding the prototype, let's recall them:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs. These methods only list *enumerable* properties, and those that have *strings as keys*.

If we want symbolic properties:

- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic property names.

If we want non-enumerable properties:

- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string property names.

If we want *all* properties:

- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own property names.

These methods are a bit different about which properties they return, but all of them operate on the object itself. Properties from the prototype are not listed.

## for..in loop

The `for..in` loop is different: it loops over inherited properties too.

For instance:
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
<<<<<<< HEAD
// 自身のキーのみ
=======
// only own keys
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
<<<<<<< HEAD
// 継承されたキーも
for(let prop in rabbit) alert(prop); // jumps, eats
*/!*
```

もし継承されたプロパティを区別したい場合、組み込みのメソッド [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) があります。: それは `obj` 自身が `key` という名前のプロパティをもつ(継承でない) 場合に `true` を返します。

したがって、継承されたプロパティをフィルタリングすることができます。:
=======
// inherited keys too
for(let prop in rabbit) alert(prop); // jumps, then eats
*/!*
```

If that's not what we want, and we'd like to exclude inherited properties, there's a built-in method [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.

So we can filter out inherited properties (or do something else with them):
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);
<<<<<<< HEAD
  alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
}
```
ここでは、私たちは次の継承のチェーンを持っています。: `rabbit`, 次に `animal` そして `Object.prototype` (`animal` はリテラルオブジェクト `{...}` なので、これはデフォルトです)、その上に `null` があります。:

![](rabbit-animal-object.png)

面白いことが1つあります。メソッド `rabbit.hasOwnProperty` はどこからきたでしょう？チェーンを見ると、`Object.prototype.hasOwnProperty` によってメソッドが提供されていることがわかります。言い換えると、それは継承されています。

...しかしなぜ `hasOwnProperty` は `for..in` ループで現れないのでしょうか？答えはシンプルです。それは列挙可能ではありません。`Object.prototype`の他のすべてのプロパティと同様です。だからこそ、それらはリストに載っていません。


## サマリ

ほとんどのメソッドは継承されたプロパティを無視しますが、`for..in` は注目すべき例外です。

後者の場合、[obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty)を使用することができます: これは `obj` が独自の(継承されていない) `key` という名前のプロパティを持っている場合に `true` を返します。
=======
  alert(`${prop}: ${isOwn}`); // jumps: true, then eats: false
}
```

Here we have the following inheritance chain: `rabbit`, then `animal`, then `Object.prototype` (because `animal` is a literal object `{...}`, so it's by default), and then `null` above it:

![](rabbit-animal-object.png)

Note, there's one funny thing. Where is the method `rabbit.hasOwnProperty` coming from? Looking at the chain we can see that the method is provided by `Object.prototype.hasOwnProperty`. In other words, it's inherited.

...But why `hasOwnProperty` does not appear in `for..in` loop, if it lists all inherited properties?  The answer is simple: it's not enumerable. Just like all other properties of `Object.prototype`. That's why they are not listed.

## Summary

Most methods ignore inherited properties, with a notable exception of `for..in`.

For the latter we can use [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): it returns `true` if `obj` has its own (not inherited) property named `key`.
>>>>>>> 19223ae762f03cdff4e83f6f963f4f427af93847
