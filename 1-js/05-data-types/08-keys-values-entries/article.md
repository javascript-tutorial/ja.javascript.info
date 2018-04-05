
# Object.keys, values, entries

個々のデータ構造から離れて、それらの繰り返し処理について話しましょう。

前のチャプターで、`map.keys()`, `map.values()`, `map.entries()` と言うメソッドを見ました。

これらのメソッドは一般的なものであり、データ構造に対してそれを使うことは共通の合意です。もしこれまでに我々自身のデータ構造を作った
These methods are generic, there is a common agreement to use them for data structures. 私たちが独自のデータ構造を作成した場合、それらも実装するべきです。

それらは以下でサポートされています:

- `Map`
- `Set`
- `Array` (`arr.values()` を除く)

普通のオブジェクトもまた同様のメソッドをサポートします。しかし、その構文は少し異なります。

## Object.keys, values, entries

通常のオブジェクトでは、次のメソッドが使えます。:

- [Object.keys(obj)](mdn:js/Object/keys) -- キーの配列を返します。
- [Object.values(obj)](mdn:js/Object/values) -- 値の配列を返します。
- [Object.entries(obj)](mdn:js/Object/entries) -- `[key, value]` ペアの配列を返します。

...しかしその違いに注意してください(例として map との比較です。):

|             | Map              | Object       |
|-------------|------------------|--------------|
| 構文 | `map.keys()`  | `Object.keys(obj)` です。 `obj.keys()` ではありません。 |
| 戻り値     | iterable    | "本当の" Array                     |

最初の違いは、`Object.keys(obj)` と呼ばないといけないことです。`obj.keys()` ではありません。

なぜそうなっているのでしょう？主な理由は柔軟性です。JavaScript では、オブジェクトは全ての複雑な構造のベースであることを覚えておいてください。従って、独自の `order.values()` メソッドを実装した `order` のような独自のオブジェクトを持つかもしれません。そして、その上でもまだ `Object.values(order)` を呼ぶことができます。

2つ目の違いは、`Object.*` メソッドが "本当の" 配列オブジェクトを返すことです、単なる iterable ではなく。これは主に歴史的な理由です。

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

// loop over values
for (let value of Object.values(user)) {
  alert(value); // John, then 30
}
```

## Object.keys/values/entries はシンボリックプロパティを無視します

ちょうど `for..in` ループのように、これらのメソッドはキーとして `Symbol(...)` を使っているプロパティを無視します。

通常それは便利です。しかし、もしもシンボリックなキーも同様にしたい場合、別のメソッド [Object.getOwnPropertySymbols](mdn:js/Object/getOwnPropertySymbols)  があります。これはシンボリックのキーのみの配列を返します。また、メソッド [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) は *全ての* キーを返します。
