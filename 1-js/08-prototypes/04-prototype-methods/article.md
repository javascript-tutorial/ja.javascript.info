
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

Setting or reading the prototype with `obj.__proto__` is considered outdated and somewhat deprecated (moved to the so-called "Annex B" of the JavaScript standard, meant for browsers only).

The modern methods to get/set a prototype are:

- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto`.

The only usage of `__proto__`, that's not frowned upon, is as a property when creating a new object: `{ __proto__: ... }`.

Although, there's a special method for this too:

- [Object.create(proto, [descriptors])](mdn:js/Object/create) -- creates an empty object with given `proto` as `[[Prototype]]` and optional property descriptors.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  eats: true
};

<<<<<<< HEAD
// animal をプロトタイプとして新しいオブジェクトを作成する
*!*
let rabbit = Object.create(animal);
=======
// create a new object with animal as a prototype
*!*
let rabbit = Object.create(animal); // same as {__proto__: animal}
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

The `Object.create` method is a bit more powerful, as it has an optional second argument: property descriptors.

We can provide additional properties to the new object there, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

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
The descriptors are in the same format as described in the chapter <info:property-descriptors>.

We can use `Object.create` to perform an object cloning more powerful than copying properties in `for..in`:

```js
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

This call makes a truly exact copy of `obj`, including all properties: enumerable and non-enumerable, data properties and setters/getters -- everything, and with the right `[[Prototype]]`.


## Brief history

There're so many ways to manage `[[Prototype]]`. How did that happen? Why?

That's for historical reasons.

The prototypal inheritance was in the language since its dawn, but the ways to manage it evolved over time.

- The `prototype` property of a constructor function has worked since very ancient times. It's the oldest way to create objects with a given prototype.
- Later, in the year 2012, `Object.create` appeared in the standard. It gave the ability to create objects with a given prototype, but did not provide the ability to get/set it. Some browsers implemented the non-standard `__proto__` accessor that allowed the user to get/set a prototype at any time, to give more flexibility to developers.
- Later, in the year 2015, `Object.setPrototypeOf` and `Object.getPrototypeOf` were added to the standard, to perform the same functionality as `__proto__`. As `__proto__` was de-facto implemented everywhere, it was kind-of deprecated and made its way to the Annex B of the standard, that is: optional for non-browser environments.
- Later, in the year 2022, it was officially allowed to use `__proto__` in object literals `{...}` (moved out of Annex B), but not as a getter/setter `obj.__proto__` (still in Annex B).

Why was `__proto__` replaced by the functions `getPrototypeOf/setPrototypeOf`?

Why was `__proto__` partially rehabilitated and its usage allowed in `{...}`, but not as a getter/setter?

That's an interesting question, requiring us to understand why `__proto__` is bad.

And soon we'll get the answer.

```warn header="Don't change `[[Prototype]]` on existing objects if speed matters"
Technically, we can get/set `[[Prototype]]` at any time. But usually we only set it once at the object creation time and don't modify it anymore: `rabbit` inherits from `animal`, and that is not going to change.

And JavaScript engines are highly optimized for this. Changing a prototype "on-the-fly" with `Object.setPrototypeOf` or `obj.__proto__=` is a very slow operation as it breaks internal optimizations for object property access operations. So avoid it unless you know what you're doing, or JavaScript speed totally doesn't matter for you.
```

## "Very plain" objects [#very-plain]

As we know, objects can be used as associative arrays to store key/value pairs.

...But if we try to store *user-provided* keys in it (for instance, a user-entered dictionary), we can see an interesting glitch: all keys work fine except `"__proto__"`.

Check out the example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

Here, if the user types in `__proto__`, the assignment in line 4 is ignored!

That could surely be surprising for a non-developer, but pretty understandable for us. The `__proto__` property is special: it must be either an object or `null`. A string can not become a prototype. That's why an assignment a string to `__proto__` is ignored.

But we didn't *intend* to implement such behavior, right? We want to store key/value pairs, and the key named `"__proto__"` was not properly saved. So that's a bug!

Here the consequences are not terrible. But in other cases we may be storing objects instead of strings in `obj`, and then the prototype will indeed be changed. As a result, the execution will go wrong in totally unexpected ways.

What's worse -- usually developers do not think about such possibility at all. That makes such bugs hard to notice and even turn them into vulnerabilities, especially when JavaScript is used on server-side.

Unexpected things also may happen when assigning to `obj.toString`, as it's a built-in object method.

How can we avoid this problem?

First, we can just switch to using `Map` for storage instead of plain objects, then everything's fine:

```js run
let map = new Map();

let key = prompt("What's the key?", "__proto__");
map.set(key, "some value");

alert(map.get(key)); // "some value" (as intended)
```

...But `Object` syntax is often more appealing, as it's more concise.

Fortunately, we *can* use objects, because language creators gave thought to that problem long ago.

As we know, `__proto__` is not a property of an object, but an accessor property of `Object.prototype`:

![](object-prototype-2.svg)

So, if `obj.__proto__` is read or set, the corresponding getter/setter is called from its prototype, and it gets/sets `[[Prototype]]`.

As it was said in the beginning of this tutorial section: `__proto__` is a way to access `[[Prototype]]`, it is not `[[Prototype]]` itself.

Now, if we intend to use an object as an associative array and be free of such problems, we can do it with a little trick:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
*!*
let obj = Object.create(null);
<<<<<<< HEAD
=======
// or: obj = { __proto__: null }
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


```js run
let chineseDictionary = Object.create(null);
<<<<<<< HEAD
chineseDictionary.hello = "ni hao";
chineseDictionary.bye = "zai jian";
=======
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

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
## Summary

- To create an object with the given prototype, use:

    - literal syntax: `{ __proto__: ... }`, allows to specify multiple properties
    - or [Object.create(proto, [descriptors])](mdn:js/Object/create), allows to specify property descriptors.

    The `Object.create` provides an easy way to shallow-copy an object with all descriptors:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- Modern methods to get/set the prototype are:

    - [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) -- returns the `[[Prototype]]` of `obj` (same as `__proto__` getter).
    - [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) -- sets the `[[Prototype]]` of `obj` to `proto` (same as `__proto__` setter).

- Getting/setting the prototype using the built-in `__proto__` getter/setter isn't recommended, it's now in the Annex B of the specification.

- We also covered prototype-less objects, created with `Object.create(null)` or `{__proto__: null}`.

    These objects are used as dictionaries, to store any (possibly user-generated) keys.

    Normally, objects inherit built-in methods and `__proto__` getter/setter from `Object.prototype`, making corresponding keys "occupied" and potentially causing side effects. With `null` prototype, objects are truly empty.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
