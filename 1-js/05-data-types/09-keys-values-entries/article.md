
# Object.keys, values, entries

<<<<<<< HEAD
ここでは、個々のデータ構造から離れて、それらの繰り返し処理について話しましょう。

前のチャプターで、`map.keys()`, `map.values()`, `map.entries()` と言うメソッドを見ました。

これらのメソッドは一般的なものであり、データ構造に対して利用することは共通認識です。そのため、もし独自のデータ構造を作成するときには、それらも実装しておく方がよいです。

これらは以下でサポートされています:
=======
Let's step away from the individual data structures and talk about the iterations over them.

In the previous chapter we saw methods `map.keys()`, `map.values()`, `map.entries()`.

These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.

They are supported for:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

- `Map`
- `Set`
- `Array`

<<<<<<< HEAD
通常のオブジェクトも同様のメソッドをサポートしますが、構文は少し異なります。

## Object.keys, values, entries

通常のオブジェクトでは、次のメソッドが使えます。:

- [Object.keys(obj)](mdn:js/Object/keys) -- キーの配列を返します。
- [Object.values(obj)](mdn:js/Object/values) -- 値の配列を返します。
- [Object.entries(obj)](mdn:js/Object/entries) -- `[key, value]` ペアの配列を返します。

しかし、それらの違いに注意してください(例として map との比較です。):

|             | Map              | Object       |
|-------------|------------------|--------------|
| 構文 | `map.keys()`  | `Object.keys(obj)`.  `obj.keys()` ではありません。 |
| 戻り値     | iterable    | "本当の" Array                     |

最初の違いは、`obj.keys()` ではなく、`Object.keys(obj)` と呼ぶ必要がある点です。

なぜそうなっているのでしょう？主な理由は柔軟性です。JavaScript ではオブジェクトはすべての複雑な構造のベースであることを忘れないでください。そのため、独自の `order.values()` メソッドを実装する `order` という独自のオブジェクトがあるかもしれません。それでも `Object.values(order)` を呼ぶことができます。

2つ目の違いは、`Object.*` メソッドが単なる iterable ではなく "本当の" 配列オブジェクトを返すことです。これは主に歴史的な理由です。

例:
=======
Plain objects also support similar methods, but the syntax is a bit different.

## Object.keys, values, entries

For plain objects, the following methods are available:

- [Object.keys(obj)](mdn:js/Object/keys) -- returns an array of keys.
- [Object.values(obj)](mdn:js/Object/values) -- returns an array of values.
- [Object.entries(obj)](mdn:js/Object/entries) -- returns an array of `[key, value]` pairs.

Please note the distinctions (compared to map for example):

|             | Map              | Object       |
|-------------|------------------|--------------|
| Call syntax | `map.keys()`  | `Object.keys(obj)`, but not `obj.keys()` |
| Returns     | iterable    | "real" Array                     |

The first difference is that we have to call `Object.keys(obj)`, and not `obj.keys()`.

Why so? The main reason is flexibility. Remember, objects are a base of all complex structures in JavaScript. So we may have an object of our own like `data` that implements its own `data.values()` method. And we still can call `Object.values(data)` on it.

The second difference is that `Object.*` methods return "real" array objects, not just an iterable. That's mainly for historical reasons.

For instance:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js
let user = {
  name: "John",
  age: 30
};
```

<<<<<<< HEAD
- `Object.keys(user) = [name, age]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

ここの例では、`Object.values` を使って、プロパティの値をループします:
=======
- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

Here's an example of using `Object.values` to loop over property values:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let user = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
// 値のループ
for (let value of Object.values(user)) {
  alert(value); // John, そして 30
}
```

```warn header="Object.keys/values/entries は Symbol プロパティを無視します"
`for..in` ループのように、これらのメソッドはキーとして `Symbol(...)` を使っているプロパティを無視します。

通常それは便利です。しかし、もしもこのようなキーも同様に扱いたい場合は、別のメソッド [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  があります。これは Symbol を使っているキーのみの配列を返します。また、メソッド [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) は *すべての* キーを返します。
```


## オブジェクトの変換

オブジェクトには、配列に存在する多くのメソッドがありません。例えば `map`, `filter` など。

それらを適用したい場合は、`Object.fromEntries` に続いて、`Object.entries` が使用できます。:

1. `Object.entries(obj)` を使用して `obj` からキー/値ペアの配列を取得します。
2. その配列で、配列のメソッドを使用します。例えば `map`
3. 結果の配列で `Object.fromEntries(array)` を使用して、配列をオブジェクトに戻します。

例えば、価格をもつオブジェクトがあり、それらを2倍したいとします。:
=======
// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```


## Transforming objects

Objects lack many methods that exist for arrays, e.g. `map`, `filter` and others.

If we'd like to apply them, then we can use `Object.entries` followed by `Object.fromEntries`:

1. Use `Object.entries(obj)` to get an array of key/value pairs from `obj`.
2. Use array methods on that array, e.g. `map`, to transform these key/value pairs.
3. Use `Object.fromEntries(array)` on the resulting array to turn it back into an object.

For example, we have an object with prices, and would like to double them:
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
<<<<<<< HEAD
  // 配列に変換して map を実行、その後 fromEntries でオブジェクトに戻します
  Object.entries(prices).map(([key, value]) => [key, value * 2])
=======
  // convert prices to array, map each key/value pair into another pair
  // and then fromEntries gives back the object
  Object.entries(prices).map(entry => [entry[0], entry[1] * 2])
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
);
*/!*

alert(doublePrices.meat); // 8
<<<<<<< HEAD
```   

一見難しく見えますが、1,2回使うと簡単に理解できます。このようにして協力な変換のチェーンを作ることができます。
=======
```

It may look difficult at first sight, but becomes easy to understand after you use it once or twice. We can make powerful chains of transforms this way.
>>>>>>> 725653fd99b19d42195e837ac3bb23c1784f8f6e
