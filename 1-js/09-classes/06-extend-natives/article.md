
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
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
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
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type. They rely on the `constructor` property to do so.

In the example above,
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
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
So when `arr.filter()` is called, it internally creates the new array of results exactly as `new PowerArray`.
That's actually very cool, because we can keep using `PowerArray` methods further on the result.

Even more, we can customize that behavior.

There's a special static getter `Symbol.species`, if exists, it returns the constructor to use in such cases.

If we'd like built-in methods like `map`, `filter` will return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

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
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
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
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
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

![](object-date-inheritance.png)

`Date` と `Object` の間に繋がりはないことに注目してください。`Object` と `Date` は両方とも独立して存在します。`Date.prototype` は `Object.prototype` を継承していますが、それだけです。
=======
As you can see, now `.filter` returns `Array`. So the extended functionality is not passed any further.

## No static inheritance in built-ins

Built-in objects have their own static methods, for instance `Object.keys`, `Array.isArray` etc.

And we've already been talking about native classes extending each other: `Array.[[Prototype]] = Object`.

But statics are an exception. Built-in classes don't inherit static properties from each other.

In other words, the prototype of built-in constructor `Array` does not point to `Object`. This way `Array` and `Date` do not have `Array.keys` or `Date.keys`. And that feels natural.

Here's the picture structure for `Date` and `Object`:

![](object-date-inheritance.png)

Note, there's no link between `Date` and `Object`. Both `Object` and `Date` exist independently. `Date.prototype` inherits from `Object.prototype`, but that's all.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
