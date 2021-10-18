
# 反復可能なオブジェクト

<<<<<<< HEAD
*反復可能な(iterables)* オブジェクトは配列の汎化です。これは、`for..of` ループで任意のオブジェクトを使用できるようにするための概念です。

もちろん、配列は反復可能です。しかし、他にも多くの組み込みオブジェクトがあり、それらも同様に反復可能です。例えば、文字列も反復可能です。後で分かりますが、多くの組み込みの演算子やメソッドはそれらに依存しています。

もしオブジェクトが何かの集合(リスト、セット)を表す場合、`for..of` はそれをループ処理するのに最適な構文です。それでは、それを動作させる方法を見てみましょう。
=======
*Iterable* objects are a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef


## Symbol.iterator 

自分自身で実際に作ってみると、反復可能(iterables) の概念を簡単に掴む事ができます。

<<<<<<< HEAD
例えば、配列ではありませんが、`for..of` に適したオブジェクトを持っています。
=======
For instance, we have an object that is not an array, but looks suitable for `for..of`.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

以下は数値の間隔を表す `range` オブジェクト:

```js
let range = {
  from: 1,
  to: 5
};

// for..of が動作するようにしたい:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
`range` を 反復可能(iterable) にするために (`for..of` を動作させるために)は、`Symbol.iterator` (このための特別な組み込みのシンボルです)という名前のメソッドをオブジェクトに追加する必要があります。

- `for..of` が始まると、そのメソッドを呼び出します(なければエラーになります)。
- メソッドは *iterator* (メソッド `next` をもつオブジェクト)を返さなければいけません。
- `for..of` が次の値を必要とするとき、そのオブジェクトの `next()` を呼びます。
- `next()` の結果は `{done: Boolean, value: any}` の形式でなければなりません。そして `done=true` は繰り返しが終わったことを示します。そうでない場合は、`value` は新しい値である必要があります。

これは `range` の完全な実装です:
=======
To make the `range` object iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

```js run
let range = {
  from: 1,
  to: 5
};

// 1. for..of の呼び出しは、最初にこれを呼び出します
range[Symbol.iterator] = function() {

<<<<<<< HEAD
  // ...これは iterator オブジェクトを返します:
  // 2. 以降、for..of はこのイテレータでのみ機能し、次の値を要求します
=======
  // ...it returns the iterator object:
  // 2. Onward, for..of works only with this iterator, asking it for next values
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
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

<<<<<<< HEAD
反復可能(iterables)の中心的な機能に注目してください。関心の分離です。

- `range` 自身は `next()` メソッドを持っていません。
- 代わりに、別のオブジェクト、いわゆる "イテレータ" は `range[Symbol.iterator]()` の呼び出しで生成され、反復を処理します。
=======
Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

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

<<<<<<< HEAD
今、`range[Symbol.iterator]()` は `range` オブジェクト自身を返します: `next()` メソッドを持ち、`this.current` で現在の反復の状況を覚えています。

欠点は、オブジェクトに対して同時に2つの `for..of` ループを実行することは不可能だということです。: イテレータ が1つしかないので、オブジェクトは繰り返し状態を共有します。ですが、2つの並列 for-of はたとえ非同期のりナリオにおいてもまれです。
=======
Now `range[Symbol.iterator]()` returns the `range` object itself:  it has the necessary `next()` method and remembers the current iteration progress in `this.current`. Shorter? Yes. And sometimes that's fine too.

The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.

```smart header="Infinite iterators"
Infinite iterators are also possible. For instance, the `range` becomes infinite for `range.to = Infinity`. Or we can make an iterable object that generates an infinite sequence of pseudorandom numbers. Also can be useful.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

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
<<<<<<< HEAD
  // 文字ごとに1回、計4回実行します。
  alert( char ); // t, 次に e, 次に s, そして t
}
```

そしてサロゲートペアも正しく動作します!
=======
  // triggers 4 times: once for each character
  alert( char ); // t, then e, then s, then t
}
```

And it works correctly with surrogate pairs!
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, そして次は 😂
}
```

## イテレータを明示的に呼び出す 

<<<<<<< HEAD
通常、iterables の内部は外部のコードからは隠れています。`for..of` ループがあり、それが動作します。それだけを知っておけば問題ありません。

しかし、もう少し深く理解するために、明示的なイテレータの作り方を見てみましょう。

`for..of` と同じ方法で文字列を反復処理しますが、直接呼び出しをします。このコードは文字列のイテレータを取得し、それを "手動" で呼び出します。:
=======
For deeper understanding, let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

```js run
let str = "Hello";

// for (let char of str) alert(char);
// と同じことをしています

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 1つずつ文字を出力します
}
```

これはほとんど必要とされませんが、`for..of` よりも処理をよりコントロールできます。例えば、繰り返し処理を分割したい場合: 少し反復してから停止し、別のことをしてから後で再開するような場合に役立ちます。

## 反復可能(Iterables) と 配列ライク(array-like)

同じように見える2つの正式な用語がありますが、大きく異なるものです。 混乱を避けるためにそれらをよく理解してください。

<<<<<<< HEAD
- *反復可能(Iterables)* は上で説明したように、`Symbol.iterator` メソッドを実装したオブジェクトです。
- *配列ライク(Array-likes)* は、インデックスと `length` を持ったオブジェクトです。なので、これらは配列のように見えます。
=======
Two official terms look similar, but are very different. Please make sure you understand them well to avoid the confusion.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

ブラウザや他の環境で、実際のタスクを処理するのに JavaScript を使用するとき、反復可能あるいは配列ライク、もしくはその両方のオブジェクトに出くわすことがあります。

<<<<<<< HEAD
例えば、文字列は 反復可能(iterable) (`for..of` が動作する) であり、かつ 配列ライク(array-like) (数値インデックスと `length` を持っています) です。
=======
When we use JavaScript for practical tasks in a browser or any other environment, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

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

<<<<<<< HEAD
それらの共通点は、反復可能(iterable) と 配列ライク(array-like) は両方とも通常の *配列ではなく*、`push` や `pop` などのメソッドを持っていません。もしもこのようなオブジェクトを持っていて、配列のように処理したい場合には不便です。

## Array.from

それらを結びつける共通のメソッド [Array.from](mdn:js/Array/from) があります。これは 反復可能(iterable) または 配列ライク(array-like) な値を引数に取り、そこから "本当の" `Array` を作ります。それ以降、配列のメソッドを呼べるようになります。
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

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

<<<<<<< HEAD
行 `(*)` の `Array.from` はオブジェクトを取り出し、反復可能(iterable) か 配列ライク(array-like) なのか調べ、新しい配列を作りすべてのアイテムをコピーします。
=======
`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

反復可能(iterable) でも同じことが起こります:

```js
// range は上述の例で利用したものと仮定
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (配列の toString 変換が機能します)
```

<<<<<<< HEAD
`Array.from` の完全な構文では、オプションで "マッピング" 関数を指定できます:
=======
The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
2つ目の引数 `mapFn` は、配列に追加する前に各要素に適用する関数であり、`thisArg` はそこでの `this` を指定できます。
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

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

<<<<<<< HEAD
...が、より短く書けます。
=======
...But it is shorter.    
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

サロゲートを意識した `slice` を実装することもできます:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

<<<<<<< HEAD
// ネイティブメソッドはサロゲートペアをサポートしていません
alert( str.slice(1, 3) ); // ゴミ (異なるサロゲートペアの片割れです)
=======
// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
```


## サマリ 

`for..of` が使えるオブジェクトは *反復可能(iterable)* と呼ばれます。

<<<<<<< HEAD
- 技術的には、反復可能は `Symbol.iterator` と呼ばれるメソッドを実装しなければなりません。
    - `obj[Symbol.iterator]` の結果は *イテレータ* と呼ばれます。それは、さらなる反復処理を行います。
    - イテレータ はオブジェクト `{done: Boolean, value: any}` を返す `next()` と呼ばれるメソッドを持っていなければなりません。ここで `done:true` は繰り返しの終わりを意味し、そうでないときは、`value` が次の値になります。
- `Symbol.iterator` メソッドは `for..of` で自動的に呼び出されますが、それを直接呼び出すこともできます。
- 文字列や配列のような組み込みの iterables もまた、`Symbol.iterator` を実装しています。
- 文字列の イテレータ はサロゲートペアが考慮できます。


インデックス付きのプロパティと `length` をもつオブジェクトは *配列ライク(array-like)* と呼ばれます。このようなオブジェクトは他のプロパティやメソッドを持つことができますが、配列の組み込みメソッドは持っていません。
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]()` is called an *iterator*. It handles further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.


Objects that have indexed properties and `length` are called *array-like*. Such objects may also have other properties and methods, but lack the built-in methods of arrays.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef

もしも仕様の内側を見ていくと、多くの組み込みメソッドは、"本当の" 配列の代わりに 反復可能(iterable) または 配列ライク(array-like) で動作することを想定していることがわかるでしょう。なぜなら、それらはより抽象的なためです。

<<<<<<< HEAD
`Array.from(obj[, mapFn, thisArg])` は 反復可能(iterable) または 配列ライク(array-like) な `obj` の実際の `Array` を作成し、その後配列のメソッドを使えるようになります。オプションの引数 `mapFn` と `thisArg` は、各項目に関数を適用することを可能にします。
=======
`Array.from(obj[, mapFn, thisArg])` makes a real `Array` from an iterable or array-like `obj`, and we can then use array methods on it. The optional arguments `mapFn` and `thisArg` allow us to apply a function to each item.
>>>>>>> eda333d423db8ade41f75d2e2d30ea06c7d997ef
