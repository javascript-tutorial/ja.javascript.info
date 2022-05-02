
<<<<<<< HEAD
# __proto__ なしでの プロトタイプ メソッド, オブジェクト

このセクションの最初の最初の章では、プロトタイプ をセットアップする現代のメソッドを説明します。

`__proto__` は古く、やや非推奨とされています（JavaScript標準のブラウザのみの部分で）。

現代のメソッドは次のものです:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- 与えられた `proto` を `[[Prototype]]` として、また任意のプロパティディスクリプタで空のオブジェクトを作ります。
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` の `[[Prototype]]` を返します。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` の `[[Prototype]]` に `proto` をセットします。

これらは `__proto__` の代わりに使用します。

例:
=======
# Prototype methods, objects without __proto__

In the first chapter of this section, we mentioned that there are modern methods to setup a prototype.

The `__proto__` is considered outdated and somewhat deprecated (in browser-only part of the JavaScript standard).

The modern methods are:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

These should be used instead of `__proto__`.

For instance:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let animal = {
  eats: true
};

<<<<<<< HEAD
// animal をプロトタイプとして新しいオブジェクトを作成する
=======
// create a new object with animal as a prototype
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true

*!*
<<<<<<< HEAD
alert(Object.getPrototypeOf(rabbit) === animal); // rabbit のプロトタイプを取得
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // rabbit のプロトタイプを {} に変更
*/!*
```

`Object.create` は任意で2つ目の引数を持ち、これはプロパティディスクリプタです。次のように、新しいオブジェクトに追加のプロパティが指定できます :
=======
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // change the prototype of rabbit to {}
*/!*
```

`Object.create` has an optional second argument: property descriptors. We can provide additional properties to the new object there, like this:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

<<<<<<< HEAD
ディスクリプタはチャプター <info:property-descriptors> で説明したのと同じフォーマットです。

`for..in` でプロパティをコピーするよりも、より強力にオブジェクトをクローンするのに `Object.create` が使用できます。:
=======
The descriptors are in the same format as described in the chapter <info:property-descriptors>.

We can use `Object.create` to perform an object cloning more powerful than copying properties in `for..in`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

<<<<<<< HEAD
この呼び出しはすべてのプロパティを含む `obj` の本当の正確なコピーを作ります。: 列挙型、非列挙型、データプロパティ、setter/getter -- すべてと、正確な `[[Prototype]]` です。

## 略史 

`[[Prototype]]` を管理する方法はたくさんあります! 同じことをするたくさんの方法があります!

なぜでしょう？

それは歴史的な理由によるものです。

- コンストラクタ関数の `"prototype"` プロパティはとても古くから機能しています。
- 2012年後半: `Object.create` が標準に登場しました。これは与えられたプロトタイプでオブジェクトを作りますが、それを取得/設定することはできませんでした。そのため、ブラウザはいつでもプロトタイプの取得/設定ができる非標準の `__proto__` アクセサを実装しました。
- 2015年後半: `Object.setPrototypeOf` と `Object.getPrototypeOf` が標準に追加されました。`__proto__` はどこでも実行されているデファクトであったため、標準の付録Bに追加されています。これはブラウザ以外の環境ではオプションです。

今現在、私たちはこれらのすべての方法を自由に使うことができます。

なぜ `__proto__` は関数 `getPrototypeOf/setPrototypeOf` に置き換えられたのでしょうか？これは興味深い質問であり、なぜ `__proto__` ではダメなのかを理解する必要があります。答えを知るには続きを読んでください。

```warn header="速度が重要な場合は、既存のオブジェクトの `[[Prototype]]` を変更しないでください"
技術的には、いつでも `[[Prototype]]` の取得/設定が可能です。しかし、通常はオブジェクト作成時に一度だけ設定を行い、変更はしません。`rabbit` は `animal` から継承しており、それは変更しません。

また、JavaScriptエンジンは高度に最適化されています。`Object.setPrototypeOf` または `obj.__proto__=` で "その場で" プロトタイプを変更することは、可能ですがとても遅い操作になります。そのため、何をしようとしているかわかっている場合、または JavaScript の速度が全く問題にならない場合以外は避けてください。
```

## "非常にシンプルな" オブジェクト 

ご存知の通り、オブジェクトはキー/値ペアを格納するための連想配列として使うことができます。

...しかし、もしその中で *ユーザから提供された* キーを格納しようとした場合(例えばユーザが入力した辞書)、興味深い問題が起こります。: すべてのキーは `"__proto__"` を除いてうまく動作します。

例を確認してみましょう:
=======
This call makes a truly exact copy of `obj`, including all properties: enumerable and non-enumerable, data properties and setters/getters -- everything, and with the right `[[Prototype]]`.

## Brief history

If we count all the ways to manage `[[Prototype]]`, there are a lot! Many ways to do the same thing!

Why?

That's for historical reasons.

- The `"prototype"` property of a constructor function has worked since very ancient times.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. So browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.

As of now we have all these ways at our disposal.

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`? That's an interesting question, requiring us to understand why `__proto__` is bad. Read on to get the answer.

```warn header="Don't change `[[Prototype]]` on existing objects if speed matters"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don't modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you're doing, or JavaScript speed totally doesn't matter for you.
```

## "Very plain" objects [#very-plain]

As we know, objects can be used as associative arrays to store key/value pairs.

...But if we try to store *user-provided* keys in it (for instance, a user-entered dictionary), we can see an interesting glitch: all keys work fine except `"__proto__"`.

Check out the example:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
let obj = {};

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

<<<<<<< HEAD
alert(obj[key]); // [object Object], "some value" ではありません!
```

ここでは、ユーザが `__proto__` を入力した場合、その代入は無視されます!

それは驚くことではありません。`__proto__` プロパティは特別です: それはオブジェクトまたは `null` であり、文字列はプロトタイプにはなれません。

しかし、このような振る舞いを実装するつもりはありませんでした。私たちはキー/値ペアを格納したいですが、キー名が `"__proto__"` の場合は正しく保存されませんでした。なので、これはバグです。

ここでの結果はひどくはありませんが、他のケースでは、プロトタイプは実際に変更される可能性があるため、処理が予期しない方向で間違ってしまう可能性があります。

最悪なのは、通常開発者はこのような可能性について全く考えません。そのため、このようなバグに気付きにくくなり、特にJavaScriptがサーバー側で使用されている場合には、それらを脆弱性に変えることさえあります。

また、デフォルトの関数である、`toString` や他の組み込みメソッドに代入する場合も予期しないことが起こる可能性があります。

どうやってこの問題を回避しましょう？

まず、通常のオブジェクトの代わりに、格納域として `Map` を使用するよう切り替える方法があります。それですべて問題ありません。

ですが、`Object` もまたここでは上手く機能します

`__proto__` はオブジェクトのプロパティではなく、`Object.prototype` のアクセサプロパティです。:

![](object-prototype-2.svg)

なので、もし `obj.__proto__` が読み込まれたり代入された場合、該当の getter/setter がそのプロトタイプから呼ばれ、それは `[[Prototype]]` の取得/設定をします。

最初に言ったとおり、`__proto__` は `[[Prototype]]` にアクセスする方法であり、`[[Prototype]]` 自身ではありません。

今、連想配列としてオブジェクトを使いたい場合、リテラルのトリックを使ってそれを行う事ができます。:
=======
alert(obj[key]); // [object Object], not "some value"!
```

Here, if the user types in `__proto__`, the assignment is ignored!

That shouldn't surprise us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype.

But we didn't *intend* to implement such behavior, right? We want to store key/value pairs, and the key named `"__proto__"` was not properly saved. So that's a bug!

Here the consequences are not terrible. But in other cases we may be assigning object values, and then the prototype may indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What's worse -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `toString`, which is a function by default, and to other built-in methods.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine.

But `Object` can also serve us well here, because language creators gave thought to that problem long ago.

`__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

![](object-prototype-2.svg)

So, if `obj.__proto__` is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("What's the key?", "__proto__");
obj[key] = "some value";

alert(obj[key]); // "some value"
```

<<<<<<< HEAD
`Object.create(null)` はプロトタイプなし(`[[Prototype]]` が `null`)の空オブジェクトを作ります。:

![](object-prototype-null.svg)

したがって、`__proto__` に対する継承された getter/setter はありません。今や通常のデータプロパティとして処理されますので、上の例は正しく動作します。

このようなオブジェクトを "非常にシンプルな" または "純粋な辞書オブジェクト" と呼びます。なぜなら、それらは通常のオブジェクト `{...}` よりもシンプルなためです。

欠点は、そのようなオブジェクトには組み込みのオブジェクトメソッドがないことです。 `toString` など:
=======
`Object.create(null)` creates an empty object without a prototype (`[[Prototype]]` is `null`):

![](object-prototype-null.svg)

So, there is no inherited getter/setter for `__proto__`. Now it is processed as a regular data property, so the example above works right.

We can call such objects "very plain" or "pure dictionary" objects, because they are even simpler than the regular plain object `{...}`.

A downside is that such objects lack any built-in object methods, e.g. `toString`:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no toString)
```

<<<<<<< HEAD
...しかし、連想配列ではそれは通常問題ありません。

ほとんどのオブジェクトに関連したメソッドは `Object.keys(obj)` のように `Object.something(...)` であることに注目してください。それらはプロトタイプにはないので、このようなオブジェクトで機能し続けます。:
=======
...But that's usually fine for associative arrays.

Note that most object-related methods are `Object.something(...)`, like `Object.keys(obj)` -- they are not in the prototype, so they will keep working on such objects:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0


```js run
let chineseDictionary = Object.create(null);
<<<<<<< HEAD
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";
=======
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

alert(Object.keys(chineseDictionary)); // hello,bye
```

<<<<<<< HEAD
## サマリ 

プロトタイプをセットアップしたり直接アクセスするための現代のメソッドは次の通りです:

- [Object.create(proto[, descriptors])](mdn:js/Object/create) -- 与えられた `proto` を `[[Prototype]]` (`null` もOK)として、また任意のプロパティディスクリプタで空のオブジェクトを作ります。
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) -- `obj` の `[[Prototype]]` を返します( `__proto__` の getter と同じです)。
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) -- `obj` の `[[Prototype]]` に `proto` をセットします( `__proto__` の setter と同じです)。

組み込みの `__proto__` の getter/setter はユーザが作成したキーをオブジェクトに入れる場合に安全ではありません。ユーザがキーとして `"__proto__"` を入力する可能性があり、その場合エラーが発生し、通常は予期せぬ結果になるでしょう。

なので、`Object.create(null)` を使用して `__proto__` をもたない "非常にシンプルな" オブジェクトを作成するか、`Map` オブジェクトを使用します。

また、`Object.create` はオブジェクトのすべてのディスクリプタの浅いコピー（shallow-copy）を作成する簡単な方法です。
=======
## Summary

Modern methods to set up and directly access the prototype are:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with a given `proto` as `[[Prototype]]` (can be `null`) and optional property descriptors.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

The built-in `__proto__` getter/setter is unsafe if we'd want to put user-generated keys into an object. Just because a user may enter `"__proto__"` as the key, and there'll be an error, with hopefully light, but generally unpredictable consequences.

So we can either use `Object.create(null)` to create a "very plain" object without `__proto__`, or stick to `Map` objects for that.

Also, `Object.create` provides an easy way to shallow-copy an object with all descriptors:
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

<<<<<<< HEAD
さらに、`__proto__` は `[[Prototype]]` の getter/setterであり、他のメソッドと同様に `Object.prototype` に存在することも明らかにしました。

私たちは、`Object.create(null)` によってプロトタイプなしのオブジェクトを作ることができます。このようなオブジェクトは "純粋な辞書" として使われ、キーとして `"__proto__"` の問題はありません。

他のメソッドです:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- 列挙可能な自身の文字列プロパティ名/値/キー値ペアの配列を返します。
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- すべての自身のシンボリックプロパティ名の配列を返します。
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- すべての自身の文字列プロパティ名を返します。
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- すべての自身のプロパティ名の配列を返します。
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): それは `obj` 自身が `key` という名前のプロパティをもつ(継承でない) 場合に `true` を返します。

オブジェクトプロパティ(`Object.keys` など)を返すすべてのメソッドは "自身の" プロパティを返します。もし継承されたものが欲しい場合は、`for..in` を使います。
=======
We also made it clear that `__proto__` is a getter/setter for `[[Prototype]]` and resides in `Object.prototype`, just like other methods.

We can create an object without a prototype by `Object.create(null)`. Such objects are used as "pure dictionaries", they have no issues with `"__proto__"` as the key.

Other methods:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of enumerable own string property names/values/key-value pairs.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) -- returns an array of all own symbolic keys.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames) -- returns an array of all own string keys.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) -- returns an array of all own keys.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): returns `true` if `obj` has its own (not inherited) key named `key`.

All methods that return object properties (like `Object.keys` and others) -- return "own" properties. If we want inherited ones, we can use `for..in`.
>>>>>>> 291b5c05b99452cf8a0d32bd32426926dbcc0ce0
