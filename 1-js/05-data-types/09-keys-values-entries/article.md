
# Object.keys, values, entries

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
ここでは、個々のデータ構造から離れて、それらの繰り返し処理について話しましょう。
=======
Let's step away from the individual data structures and talk about the iterations over them.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/09-keys-values-entries/article.md

前のチャプターで、`map.keys()`, `map.values()`, `map.entries()` と言うメソッドを見ました。

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
これらのメソッドは一般的なものであり、データ構造に対して利用することは共通認識です。そのため、もし独自のデータ構造を作成するときには、それらも実装しておく方がよいです。
=======
These methods are generic, there is a common agreement to use them for data structures. If we ever create a data structure of our own, we should implement them too.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/09-keys-values-entries/article.md

これらは以下でサポートされています:

- `Map`
- `Set`
- `Array` (`arr.values()` を除く)

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

```js
let user = {
  name: "John",
  age: 30
};
```

- `Object.keys(user) = ["name", "age"]`
- `Object.values(user) = ["John", 30]`
- `Object.entries(user) = [ ["name","John"], ["age",30] ]`

ここの例では、`Object.values` を使って、プロパティの値をループします:

```js run
let user = {
  name: "John",
  age: 30
};

// 値のループ
for (let value of Object.values(user)) {
  alert(value); // John, そして 30
}
```

<<<<<<< HEAD:1-js/05-data-types/08-keys-values-entries/article.md
## Object.keys/values/entries は Symbol を使っているプロパティを無視します

`for..in` ループのように、これらのメソッドはキーとして `Symbol(...)` を使っているプロパティを無視します。

通常それは便利です。しかし、もしもこのようなキーも同様に扱いたい場合は、別のメソッド [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  があります。これは Symbol を使っているキーのみの配列を返します。また、メソッド [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) は *すべての* キーを返します。
=======
```warn header="Object.keys/values/entries ignore symbolic properties"
Just like a `for..in` loop, these methods ignore properties that use `Symbol(...)` as keys.

Usually that's convenient. But if we want symbolic keys too, then there's a separate method [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols) that returns an array of only symbolic keys. Also, there exist a method [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys.
```

## Object.fromEntries to transform objects

Sometimes we need to perform a transformation of an object to `Map` and back.

We already have `new Map(Object.entries(obj))` to make a `Map` from `obj`.

The syntax of `Object.fromEntries` does the reverse. Given an array of `[key, value]` pairs, it creates an object:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

Let's see practical applications.

For example, we'd like to create a new object with double prices from the existing one.

For arrays, we have `.map` method that allows to transform an array, but nothing like that for objects.

So we can use a loop:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

let doublePrices = {};
for(let [product, price] of Object.entries(prices)) {
  doublePrices[product] = price * 2;
}

alert(doublePrices.meat); // 8
```

...Or we can represent the object as an `Array` using `Object.entries`, then perform the operations with `map` (and potentially other array methods), and then go back using `Object.fromEntries`.

Let's do it for our object:

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // convert to array, map, and then fromEntries gives back the object
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

It may look difficult from the first sight, but becomes easy to understand after you use it once or twice.

We also can use `fromEntries` to get an object from `Map`.

E.g. we have a `Map` of prices, but we need to pass it to a 3rd-party code that expects an object.

Here we go:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map);

// now obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3:1-js/05-data-types/09-keys-values-entries/article.md
