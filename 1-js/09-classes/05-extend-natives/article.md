
<<<<<<< HEAD
# 組み込みのクラスを拡張する

Array、Mapなどの組み込みのクラスも拡張可能です。

例えば、ここでは `PowerArray` はネイティブの `Array` を継承しています:

```js run
// 1つメソッドを追加しています(その他のことももちろん可能です)
=======
# Extending built-in classes

Built-in classes like Array, Map and others are extendable also.

For instance, here `PowerArray` inherits from the native `Array`:

```js run
// add one more method to it (can do more)
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

<<<<<<< HEAD
とても興味深い点に注目してください。`filter` や `map` といった組み込みのメソッドは、継承された型と同じ型の新しいオブジェクトを返します。そのようにするために、それらは `constructor` を当てにしています。

上の例では、

=======
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses the object's `constructor` property for that.

In the example above,
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
```js
arr.constructor === PowerArray
```

<<<<<<< HEAD
なので、`arr.filter()` が呼ばれると、内部的には結果の新しい配列は正確に `new PowerArray` として作成します。
結果に対してさらに `PowerArray` が持つメソッドを使用し続けることができるため、これは非常に有用です。

さらに、その振る舞いをカスタマイズすることも可能です。

特別な静的な getter `Symbol.species` があります。存在する場合、このような場合に使用するコンストラクタを返します。

もし、`map` や `filter` のような組み込みのメソッドが通常の配列を返してほしい場合、次のように `Symbol.species` で `Array` を返すようにします:
=======
When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.

Even more, we can customize that behavior.

We can add a special static getter `Symbol.species` to the class. If exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we'd like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1

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
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
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
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

<<<<<<< HEAD
ご覧の通り、これで `.filter` は `Array` を返します。そのため、拡張機能はこれ以上渡されません。

## 組み込みでは、静的の継承はありません

組み込みのオブジェクトは独自の静的メソッドを持っています。例えば `Object.keys`, `Array.isArray` などです。

そして、既にそれら拡張するネイティブクラスについて話してきました。: `Array.[[Prototype]] = Object`.

しかし、静的は例外です。組み込みのクラスはお互いから静的なプロパティを継承しません。

つまり、組み込みのコンストラクタ `Array` のプロトタイプは `Object` を指していません。 `Array` や `Date` は `Array.key` あるいは `Date.keys` を持っていません。これは自然なことのように感じます。

これは、`Date` と `Object` の構造のイメージです:

![](object-date-inheritance.svg)

`Date` と `Object` の間に繋がりはないことに注目してください。`Object` と `Date` は両方とも独立して存在します。`Date.prototype` は `Object.prototype` を継承していますが、それだけです。
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
>>>>>>> 30e3fa723721909ee25115562e676db2452cf8d1
