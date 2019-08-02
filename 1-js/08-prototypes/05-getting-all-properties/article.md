
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

```js run
let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};

*!*
// 自身のキーのみ
alert(Object.keys(rabbit)); // jumps
*/!*

*!*
// 継承されたキーも
for(let prop in rabbit) alert(prop); // jumps, eats
*/!*
```

もし継承されたプロパティを区別したい場合、組み込みのメソッド [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty) があります。: それは `obj` 自身が `key` という名前のプロパティをもつ(継承でない) 場合に `true` を返します。

したがって、継承されたプロパティをフィルタリングすることができます。:

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
  alert(`${prop}: ${isOwn}`); // jumps:true, then eats:false
}
```
ここでは、私たちは次の継承のチェーンを持っています。: `rabbit`, 次に `animal` そして `Object.prototype` (`animal` はリテラルオブジェクト `{...}` なので、これはデフォルトです)、その上に `null` があります。:

![](rabbit-animal-object.svg)

面白いことが1つあります。メソッド `rabbit.hasOwnProperty` はどこからきたでしょう？チェーンを見ると、`Object.prototype.hasOwnProperty` によってメソッドが提供されていることがわかります。言い換えると、それは継承されています。

...しかしなぜ `hasOwnProperty` は `for..in` ループで現れないのでしょうか？答えはシンプルです。それは列挙可能ではありません。`Object.prototype`の他のすべてのプロパティと同様です。だからこそ、それらはリストに載っていません。


## サマリ

ほとんどのメソッドは継承されたプロパティを無視しますが、`for..in` は注目すべき例外です。

後者の場合、[obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty)を使用することができます: これは `obj` が独自の(継承されていない) `key` という名前のプロパティを持っている場合に `true` を返します。
