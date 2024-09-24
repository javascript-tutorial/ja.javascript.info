
# 反復可能なオブジェクト

*反復可能な(iterables)* オブジェクトは配列の汎化です。これは、`for..of` ループで任意のオブジェクトを使用できるようにするための概念です。

もちろん、配列は反復可能です。しかし、他にも多くの組み込みオブジェクトがあり、それらも同様に反復可能です。例えば、文字列も反復可能です。後で分かりますが、多くの組み込みの演算子やメソッドはそれらに依存しています。

もしオブジェクトが何かの集合(リスト、セット)を表す場合、`for..of` はそれをループ処理するのに最適な構文です。それでは、それを動作させる方法を見てみましょう。


## Symbol.iterator 

自分自身で実際に作ってみると、反復可能(iterables) の概念を簡単に掴む事ができます。

例えば、配列ではありませんが、`for..of` に適したオブジェクトを持っています。

以下は数値の間隔を表す `range` オブジェクトです:

```js
let range = {
  from: 1,
  to: 5
};

// for..of が動作するようにしたい:
// for(let num of range) ... num=1,2,3,4,5
```

`range` を 反復可能(iterable) にするために (`for..of` を動作させるために)は、`Symbol.iterator` (このための特別な組み込みのシンボルです)という名前のメソッドをオブジェクトに追加する必要があります。

- `for..of` が始まると、そのメソッドを呼び出します(なければエラーになります)。
- メソッドは *iterator* (メソッド `next` をもつオブジェクト)を返さなければいけません。
- `for..of` が次の値を必要とするとき、そのオブジェクトの `next()` を呼びます。
- `next()` の結果は `{done: Boolean, value: any}` の形式でなければなりません。そして `done=true` は繰り返しが終わったことを示します。そうでない場合は、`value` は新しい値である必要があります。

これは `range` の完全な実装です:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. for..of の呼び出しは、最初にこれを呼び出します
range[Symbol.iterator] = function() {

  // ...これは iterator オブジェクトを返します:
  // 2. 以降、for..of はこのイテレータでのみ機能し、次の値を要求します
  return {
    current: this.from,
    last: this.to,      

    // 3. for..of ループにより、各繰り返しで next() が呼ばれます
    next() {
      // 4. オブジェクト {done:.., value :...} を返す必要があります
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// これで動作します!
for (let num of range) {
  alert(num); // 1, 2, 3, 4, 5
}
```

反復可能(iterables)の中心的な機能に注目してください。関心の分離です。

- `range` 自身は `next()` メソッドを持っていません。
- 代わりに、別のオブジェクト、いわゆる "イテレータ" は `range[Symbol.iterator]()` の呼び出しで生成され、反復を処理します。

従って、反復オブジェクトは反復処理されるオブジェクトから分離されています。

技術的には、コードをシンプルにするためにそれらをマージして、`range` 自身を イテレータ として使うこともできます。

このようになります:

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
  alert(num); // 1, そして 2, 3, 4, 5
}
```

今、`range[Symbol.iterator]()` は `range` オブジェクト自身を返します: `next()` メソッドを持ち、`this.current` で現在の反復の状況を覚えています。

欠点は、オブジェクトに対して同時に2つの `for..of` ループを実行することは不可能だということです。: イテレータ が1つしかないので、オブジェクトは繰り返し状態を共有します。ですが、2つの並列 for-of はたとえ非同期のシナリオにおいてもまれです。

```smart header="無限のイテレータ"
無限の イテレータ もまた実行可能です。例えば、 `range.to = Infinity` で、`range` が無限大になります。または、擬似乱数の無限のシーケンスを生成する反復可能なオブジェクトを作ることができます。これもまた役立つことがあります。

`next` には制限はなく、より多くの値を返すことができますが、これは正常です。

もちろん、このような反復可能なオブジェクトに対する `for..of` ループはエンドレスですが、`break` を使っていつでも止めることができます。
```


## 文字列は反復可能です 

配列と文字列は、最も広く組み込みの iterables で使われています。

文字列では、`for..of` はその文字をループします:

```js run
for (let char of "test") {
  // 文字ごとに1回、計4回実行します。
  alert( char ); // t, 次に e, 次に s, そして t
}
```

そしてサロゲートペアも正しく動作します!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, そして次は 😂
}
```

## イテレータを明示的に呼び出す 

通常、iterables の内部は外部のコードからは隠れています。`for..of` ループがあり、それが動作します。それだけを知っておけば問題ありません。

しかし、もう少し深く理解するために、明示的なイテレータの作り方を見てみましょう。

`for..of` と同じ方法で文字列を反復処理しますが、直接呼び出しをします。このコードは文字列のイテレータを取得し、それを "手動" で呼び出します。:

```js run
let str = "Hello";

// for (let char of str) alert(char);
// と同じことをしています

let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 1つずつ文字を出力します
}
```

これはほとんど必要とされませんが、`for..of` よりも処理をよりコントロールできます。例えば、繰り返し処理を分割したい場合: 少し反復してから停止し、別のことをしてから後で再開するような場合に役立ちます。

## 反復可能(Iterables) と 配列ライク(array-like)

同じように見える2つの正式な用語がありますが、大きく異なるものです。 混乱を避けるためにそれらをよく理解してください。

- *反復可能(Iterables)* は上で説明したように、`Symbol.iterator` メソッドを実装したオブジェクトです。
- *配列ライク(Array-likes)* は、インデックスと `length` を持ったオブジェクトです。なので、これらは配列のように見えます。

ブラウザや他の環境で、実際のタスクを処理するのに JavaScript を使用するとき、反復可能あるいは配列ライク、もしくはその両方のオブジェクトに出くわすことがあります。

例えば、文字列は 反復可能(iterable) (`for..of` が動作する) であり、かつ 配列ライク(array-like) (数値インデックスと `length` を持っています) です。

しかし、反復可能(iterable) は 配列ライク(array-like) でない可能性があります。そして、同じように 配列ライク(array-like) も 反復可能(iterable) でない場合があります。

例えば、上の例の `range` は 反復可能(iterable) ですが、 配列ライク(array-like) ではありません。なぜなら、インデックスと `length` を持っていないからです。

そして、この例は 配列ライク(array-like) ですが、 反復可能(iterable) ではないオブジェクトです:

```js run
let arrayLike = { // インデックスとlengthを持っている => 配列ライク
  0: "Hello",
  1: "World",
  length: 2
};

*!*
// エラー (Symbol.iterator はないので)
for (let item of arrayLike) {}
*/!*
```

それらの共通点は、反復可能(iterable) と 配列ライク(array-like) は両方とも通常の *配列ではなく*、`push` や `pop` などのメソッドを持っていません。もしもこのようなオブジェクトを持っていて、配列のように処理したい場合には不便です。

## Array.from

それらを結びつける共通のメソッド [Array.from](mdn:js/Array/from) があります。これは 反復可能(iterable) または 配列ライク(array-like) な値を引数に取り、そこから "本当の" `Array` を作ります。それ以降、配列のメソッドを呼べるようになります。

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
alert(arr.pop()); // World (メソッドが動作します)
```

行 `(*)` の `Array.from` はオブジェクトを取り出し、反復可能(iterable) か 配列ライク(array-like) なのか調べ、新しい配列を作りすべてのアイテムをコピーします。

反復可能(iterable) でも同じことが起こります:

```js
// range は上述の例で利用したものと仮定
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (配列の toString 変換が機能します)
```

`Array.from` の完全な構文では、オプションで "マッピング" 関数を指定できます:
```js
Array.from(obj[, mapFn, thisArg])
```

2つ目の引数 `mapFn` は、配列に追加する前に各要素に適用する関数であり、`thisArg` はそこでの `this` を指定できます。

例:

```js
// range は上述の例で利用したものと仮定

// 各数値の平方
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

ここで、文字列を文字配列に変換するために `Array.from` を使います:

```js run
let str = '𝒳😂';

// str を文字の配列に分割します
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

`str.split` とは違い、文字の反復可能な性質に依存するため、`for..of` のようにサロゲートペアでも正しく動作します。

技術的には、これは同じことをしています:

```js run
let str = '𝒳😂';

let chars = []; // Array.from は内部では同じループをします
for (let char of str) {
  chars.push(char);
}

alert(chars);
```

...が、より短く書けます。

サロゲートを意識した `slice` を実装することもできます:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// ネイティブメソッドはサロゲートペアをサポートしていません
alert( str.slice(1, 3) ); // ゴミ (異なるサロゲートペアの片割れです)
```


## サマリ 

`for..of` が使えるオブジェクトは *反復可能(iterable)* と呼ばれます。

- 技術的には、反復可能は `Symbol.iterator` と呼ばれるメソッドを実装しなければなりません。
    - `obj[Symbol.iterator]` の結果は *イテレータ* と呼ばれます。それは、さらなる反復処理を行います。
    - イテレータ はオブジェクト `{done: Boolean, value: any}` を返す `next()` と呼ばれるメソッドを持っていなければなりません。ここで `done:true` は繰り返しの終わりを意味し、そうでないときは、`value` が次の値になります。
- `Symbol.iterator` メソッドは `for..of` で自動的に呼び出されますが、それを直接呼び出すこともできます。
- 文字列や配列のような組み込みの iterables もまた、`Symbol.iterator` を実装しています。
- 文字列の イテレータ はサロゲートペアが考慮できます。


インデックス付きのプロパティと `length` をもつオブジェクトは *配列ライク(array-like)* と呼ばれます。このようなオブジェクトは他のプロパティやメソッドを持つことができますが、配列の組み込みメソッドは持っていません。

もしも仕様の内側を見ていくと、多くの組み込みメソッドは、"本当の" 配列の代わりに 反復可能(iterable) または 配列ライク(array-like) で動作することを想定していることがわかるでしょう。なぜなら、それらはより抽象的なためです。

`Array.from(obj[, mapFn, thisArg])` は 反復可能(iterable) または 配列ライク(array-like) な `obj` の実際の `Array` を作成し、その後配列のメソッドを使えるようになります。オプションの引数 `mapFn` と `thisArg` は、各項目に関数を適用することを可能にします。
