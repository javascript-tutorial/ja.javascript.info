
# Object.keys, values, entries

ここでは、個々のデータ構造から離れて、それらの繰り返し処理について話しましょう。

前のチャプターで、`map.keys()`, `map.values()`, `map.entries()` と言うメソッドを見ました。

これらのメソッドは一般的なものであり、データ構造に対して利用することは共通認識です。そのため、もし独自のデータ構造を作成するときには、それらも実装しておく方がよいです。

これらは以下でサポートされています:

- `Map`
- `Set`
- `Array`

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

- `Object.keys(user) = [name, age]`
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

```js run
let prices = {
  banana: 1,
  orange: 2,
  meat: 4,
};

*!*
let doublePrices = Object.fromEntries(
  // 配列に変換して map を実行、その後 fromEntries でオブジェクトに戻します
  Object.entries(prices).map(([key, value]) => [key, value * 2])
);
*/!*

alert(doublePrices.meat); // 8
```   

一見難しく見えますが、1,2回使うと簡単に理解できます。このようにして協力な変換のチェーンを作ることができます。
