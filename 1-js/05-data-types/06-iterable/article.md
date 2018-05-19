
# 反復可能(iterables)なオブジェクト

*反復可能な* オブジェクトは配列の一般化です。その概念は、`for..of` ループが利用可能な任意のオブジェクトを作ることができます。

配列自体は反復可能です。しかし、配列だけではありません。文字列も反復可能ですし、多くの他の組み込みオブジェクトも同様です。

繰り返し可能なオブジェクトはJavaScriptのコアで広く使われています。多くの組み込みの演算子とメソッドがそれらに依存しています。

[cut]

## Symbol.iterator

我々自身で作ることで、iterables の概念を簡単に掴む事ができます。

例えば、配列ではありませんが、`for..of` に適したオブジェクトを持っています。

数値の間隔を表す `range` オブジェクトのように:

```js
let range = {
  from: 1,
  to: 5
};

// We want the for..of to work:
// for(let num of range) ... num=1,2,3,4,5
```

`range` を 反復可能(iterable) にするために (`for..of` を動作させるために)、`Symbol.iterator` (このための特別な組み込みのシンボルです)という名前のメソッドをオブジェクトに追加する必要があります。

- `for..of` が始まると、そのメソッドを呼びます(なければエラーになります)。
- メソッドは *iterator* (メソッド `next` をもつオブジェクト)を返さなければいけません。
- `for..of` が次の値を必要とするとき、そのオブジェクトの `next()` を呼びます。
- `next()` の結果は `{done: Boolean, value: any}` の形式でなければなりません。そして `done=true` は繰り返しが終わったことを示します。そうでない場合は、`value` は新しい値でなければなりません。

これは `range` の完全な実装です:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // 2. ...it returns the iterator:
  return {
    current: this.from,
    last: this.to,      

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// now it works!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

このコードには、重要な分離があります。:

- `range` 自身は `next()` メソッドを持っていません。
- 代わりに、別のオブジェクト、所謂 "iterator" は`range[Symbol.iterator]()` の呼び出しで生成され、反復を処理します。

従って、反復オブジェクトは反復処理されるオブジェクトから分離されています。

技術的には、コードをシンプルにするために、それらをマージして、`range` 自身を iterator として使うこともできます。

このように:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

今、`range[Symbol.iterator]()` は `range` オブジェクト自身を返します: それは必要な `next()` メソッドを持ち、`this.current` で現在の反復の状況を覚えています。場合によってはそれでも問題ありません。欠点は、オブジェクトに対して同時に2つの `for..of` ループを実行することは不可能だということです。: iterator が1つしかないので、オブジェクトは繰り返し状態を共有します。

```smart header="Infinite iterators"
無限の iterator もまた実行可能です。例えば、 `range.to = Infinity` で、`range` が無限大になります。または、擬似乱数の無限のシーケンスを生成する反復可能なオブジェクトを作ることができます。これもまた役立つことがあります。

`next` には制限はなく、より多くの値を返すことができますが、これは正常です。

もちろん、このような反復可能なオブジェクトに対する `for..of` ループはエンドレスですが、`break` を使っていつでも止めることができます。
```


## 文字列は反復可能です

配列と文字列は、最も広く組み込みの iterables で使われています。

文字列では、`for..of` はその文字をループします:

```js run
for (let char of "test") {
  alert( char ); // t, then e, then s, then t
}
```

そしてサロゲートペアも正しく動作します!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, and then 😂
}
```

## iterator を明示的に呼び出す

通常、iterables の内部は外部のコードから隠れています。`for..of` ループがありそれは動作します。それが知る必要があるすべてです。

しかし、もう少し深く理解するために、明示的な iterator の作り方を見てみましょう。

`for..of` と同じ方法で文字列を反復処理しますが、直接呼び出しをします。このコードは文字列 iterator を取得し、それを "手動" で呼び出します。:

```js run
let str = "Hello";

// does the same as
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // outputs characters one by one
}
```

これはほとんど必要とはされませんが、`for..of` よりもプロセスをよりコントロールできます。例えば、私たちが繰り返しのプロセスを分割したい場合: 少し反復してから停止し、別のことをしてから、後で再開します。

## 反復可能(Iterables) と 配列型(array-like)s [#array-like]

同じように見える2つの正式な用語がありますが、非常に異なっています。 混乱を避けるために、それらをよく理解してください。

- *反復可能(Iterables* は上で説明したように、`Symbol.iterator` メソッドを実装したオブジェクトです。
- *配列型(Array-likes)* は、インデックスと `length` を持ったオブジェクトです。なので、これらは配列のように見えます。

もちろん、それらの特性は組み合わせることができます。例えば、文字列は 反復可能(iterable) (`for..of` が動作する) であり、かつ 配列型(array-like) (数値インデックスと `length` を持っています) です。

しかし、反復可能(iterable) は 配列型(array-like) 出ない可能性があります。そして、同じように 配列型(array-like) も 反復可能(iterable) でない可能性があります。

例えば、上の例の `range` は 反復可能(iterable) ですが、 配列型(array-like) ではありません。なぜなら、インデックスと `length` を持っていないからです。

そして、ここでは 配列型(array-like) だけど、 反復可能(iterable) ではないオブジェクトです:

```js run
let arrayLike = { // has indexes and length => array-like
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// Error (no Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

それらの共通点は -- 反復可能(iterable) と 配列型(array-like) は両方とも通常 *配列ではなく*、`push` や `pop` などのメソッドを持っていません。もしもこのようなオブジェクトを持っていて、配列のように処理したい場合にはむしろ不便です。

## Array.from

それらを結びつける共通のメソッド [Array.from](mdn:js/Array/from) があります。これは 反復可能(iterable) または 配列型(array-like) の値を取り、そこから "本当の" `Array` を作ります。その後、配列のメソッドを呼べるようになります。

例:

```js run
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // World (method works)
```

行 `(*)` の `Array.from` はオブジェクトを取り出し、反復可能(iterable) か 配列型(array-like) なのか調べ、新しい配列を作り、そこにすべてのアイテムをコピーします。

反復可能(iterable) でも同じことが起こります:

```js
// assuming that range is taken from the example above
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (array toString conversion works)
```

`Array.from` の完全な構文では、オプションの "マッピング" 関数を指定できます:
```js
Array.from(obj[, mapFn, thisArg])
```

2つ目の引数 `mapFn` は配列に追加する前に各要素に適用するための関数である必要があり、`thisArg` はそこでの `this` をセットできます。

例:

```js
// assuming that range is taken from the example above

// square each number
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

ここで、文字列を文字配列に変換するために `Array.from` を使います:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

`str.split` とは違い、文字の反復可能な性質に依存するため、`for..of` のようにサロゲートペアでも正しく動作します。

技術的には、これは同じことをしています:

```js run
let str = '𝒳😂';

let chars = []; // Array.from internally does the same loop
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...しかしより短いです。

サロゲートを意識した `slice` を構築することもできます:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
```


## サマリ

`for..of` が使えるオブジェクトは *反復可能(iterable)* と呼ばれます。

- 技術的には、iterables は `Symbol.iterator` と呼ばれるメソッドを実装しなければなりません。
    - `obj[Symbol.iterator]` の結果は *iterator* と呼ばれます。それは、さらなる反復処理を行います。
    - iterator はオブジェクト `{done: Boolean, value: any}` を返す `next()` と呼ばれるメソッドを持っていなければなりません。ここで `done:true` は繰り返しの終わりを意味し、そうでないときは、`value` が次の値になります。
- `Symbol.iterator` メソッドは `for..of` で自動的に呼び出されますが、私たちはそれを直接呼び出すこともできます。
- 文字列や配列のような組み込みの iterables もまた、`Symbol.iterator` を実装しています。
- 文字列の iterator はサロゲートペアが考慮できます。

インデックス付きのプロパティと `length` をもつオブジェクトは *配列型(array-like)* と呼ばれます。このようなオブジェクトは他のプロパティやメソッドを持つことができますが、配列の組み込みメソッドは欠落しています。

もしも、仕様の内側を見ると、−− ほとんどの組み込みメソッドは、"本当の" 配列の代わりに 反復可能(iterable) または 配列型(array-like) で動作することを仮定していることがわかるでしょう。なぜなら、それらはより抽象的なためです。

`Array.from(obj[, mapFn, thisArg])` は 反復可能(iterable) または 配列型(array-like) な `obj` の実際の `Array` を作成し、その後配列のメソッドを使えるようになります。オプションの引数 `mapFn` と `thisArg` は、各項目に関数を適用することを可能にします。
