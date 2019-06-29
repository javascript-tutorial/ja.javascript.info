
# 組み込みのクラスを拡張する

Array、Mapなどの組み込みのクラスも拡張可能です。

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

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

とても興味深い点に注目してください。`filter` や `map` といった組み込みのメソッドは、継承された型と同じ型の新しいオブジェクトを返します。そのようにするために、それらは `constructor` を当てにしています。

上の例では、

```js
arr.constructor === PowerArray
```

なので、`arr.filter()` が呼ばれると、内部的には結果の新しい配列は正確に `new PowerArray` として作成します。
結果に対してさらに `PowerArray` が持つメソッドを使用し続けることができるため、これは非常に有用です。

さらに、その振る舞いをカスタマイズすることも可能です。

特別な静的な getter `Symbol.species` があります。存在する場合、このような場合に使用するコンストラクタを返します。

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

## 組み込みでは、静的の継承はありません

組み込みのオブジェクトは独自の静的メソッドを持っています。例えば `Object.keys`, `Array.isArray` などです。

そして、既にそれら拡張するネイティブクラスについて話してきました。: `Array.[[Prototype]] = Object`.

しかし、静的は例外です。組み込みのクラスはお互いから静的なプロパティを継承しません。

つまり、組み込みのコンストラクタ `Array` のプロトタイプは `Object` を指していません。 `Array` や `Date` は `Array.key` あるいは `Date.keys` を持っていません。これは自然なことのように感じます。

これは、`Date` と `Object` の構造のイメージです:

![](object-date-inheritance.png)

`Date` と `Object` の間に繋がりはないことに注目してください。`Object` と `Date` は両方とも独立して存在します。`Date.prototype` は `Object.prototype` を継承していますが、それだけです。
