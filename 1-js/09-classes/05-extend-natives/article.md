<<<<<<< HEAD
# 組み込みのクラスを拡張する

Array、Map などの組み込みのクラスも拡張可能です。

例えば、ここでは `PowerArray` はネイティブの `Array` を継承しています:

```js run
// 1つメソッドを追加しています(その他のことももちろん可能です)
=======

# Extending built-in classes

Built-in classes like Array, Map and others are extendable also.

For instance, here `PowerArray` inherits from the native `Array`:

```js run
// add one more method to it (can do more)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

<<<<<<< HEAD
let filteredArr = arr.filter((item) => item >= 10);
=======
let filteredArr = arr.filter(item => item >= 10);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

<<<<<<< HEAD
とても興味深い点に注目してください。`filter` や `map` といった組み込みのメソッドは、継承された型 `PowerArray` と同じ型の新しいオブジェクトを返します。そのために、内部の実装はオブジェクトの `constructor` プロパティを使用します。

上の例では、

```js
arr.constructor === PowerArray;
```

`arr.filter()` が呼ばれると、内部的には `Array` ではなく、`arr.constructor` を使用して新しい結果の配列を作成します。結果に対してさらに `PowerArray` が持つメソッドを使用し続けることができるため、これは非常に有用です。

さらに、その振る舞いをカスタマイズすることも可能です。

特別な静的な getter `Symbol.species` を追加することができます。これが存在する場合、`map` や `filter` などの場合に Javascript が内部的に使用するコンストラクタを返す必要があります。

もし、`map` や `filter` のような組み込みのメソッドが通常の配列を返してほしい場合、次のように `Symbol.species` で `Array` を返すようにします:
=======
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses the object's `constructor` property for that.

In the example above,
```js
arr.constructor === PowerArray
```

When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.

Even more, we can customize that behavior.

We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we'd like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
<<<<<<< HEAD
  // 組み込みのメソッドは、これをコンストラクタとして使います
=======
  // built-in methods will use this as the constructor
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

<<<<<<< HEAD
// filter はコンストラクタとして arr.constructor[Symbol.species] を使って新しい配列を作ります
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr は PowerArray ではなく Array です
=======
// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr is not PowerArray, but Array
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

<<<<<<< HEAD
ご覧の通り、これで `.filter` は `Array` を返します。そのため、拡張機能はこれ以上渡されません。

```smart header="他のコレクションも同様に動作します"
`Map` や `Set` などの他のコレクションも同様に動作します。これらも `Symbol.species` を使用しています。
```

## 組み込みでは、静的の継承はありません

組み込みのオブジェクトは独自の静的メソッドを持っています。例えば `Object.keys`, `Array.isArray` などです。

既にご存知のように、ネイティブクラスは互いに拡張しあいます。例えば、 `Array` は `Object` を拡張しています。

通常、あるクラスが別のクラスを拡張する場合、静的メソッド、非静的メソッドの両方が継承されます。これは記事 [](info:static-properties-methods#statics-and-inheritance) で説明しました。

しかし、組み込みのクラスは例外です。組み込みのクラスはお互いから静的なプロパティを継承しません。

例えば、`Array` と `Date` はともに `Object` を継承しているので、これらのインスタンスは `Object.prototype` のメソッドを持ちます。が、`Array.[[Prototype]]` は `Object` を参照しないため、例えば `Array.keys()` (or `Date.keys()`) と言った静的メソッドは存在しません。

これは、`Date` と `Object` の構造のイメージです:

![](object-date-inheritance.svg)

`Date` と `Object` の間に繋がりはないことに注目してください。`Object` と `Date` は両方とも独立し、`Date.prototype` は `Object.prototype` を継承しているだけです。

これは組み込みのオブジェクトの継承と `extends` をして得られるものとの比較における重要な違いです。
=======
As you can see, now `.filter` returns `Array`. So the extended functionality is not passed any further.

```smart header="Other collections work similarly"
Other collections, such as `Map` and `Set`, work alike. They also use `Symbol.species`.
```

## No static inheritance in built-ins

Built-in objects have their own static methods, for instance `Object.keys`, `Array.isArray` etc.

As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But `Array.[[Prototype]]` does not reference `Object`, so there's no, for instance, `Array.keys()` (or `Date.keys()`) static method.

Here's the picture structure for `Date` and `Object`:

![](object-date-inheritance.svg)

As you can see, there's no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That's an important difference of inheritance between built-in objects compared to what we get with `extends`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
