# 組み込みのクラスを拡張する

Array、Map などの組み込みのクラスも拡張可能です。

例えば、ここでは `PowerArray` はネイティブの `Array` を継承しています:

```js run
// 1つメソッドを追加しています(その他のことももちろん可能です)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter((item) => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

とても興味深い点に注目してください。`filter` や `map` といった組み込みのメソッドは、継承された型 `PowerArray` と同じ型の新しいオブジェクトを返します。そのために、内部の実装はオブジェクトの `constructor` プロパティを使用します。

上の例では、

```js
arr.constructor === PowerArray;
```

`arr.filter()` が呼ばれると、内部的には `Array` ではなく、`arr.constructor` を使用して新しい結果の配列を作成します。結果に対してさらに `PowerArray` が持つメソッドを使用し続けることができるため、これは非常に有用です。

さらに、その振る舞いをカスタマイズすることも可能です。

特別な静的な getter `Symbol.species` を追加することができます。これが存在する場合、`map` や `filter` などの場合に Javascript が内部的に使用するコンストラクタを返す必要があります。

もし、`map` や `filter` のような組み込みのメソッドが通常の配列を返してほしい場合、次のように `Symbol.species` で `Array` を返すようにします:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // 組み込みのメソッドは、これをコンストラクタとして使います
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter はコンストラクタとして arr.constructor[Symbol.species] を使って新しい配列を作ります
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr は PowerArray ではなく Array です
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

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
