<<<<<<< HEAD
# 配列

オブジェクトを使用すると、キー付きの値のコレクションを格納することができます。

しかし、実際には多くの頻度で *順序付されたコレクション* が必要であることがわかります。それは、1つ目、2つ目、3つ目... と言った要素であり、例えばユーザ、商品、HTML要素など何かのリストを格納します。
=======
# Arrays

Objects allow you to store keyed collections of values. That's fine.

But quite often we find that we need an *ordered collection*, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

ここでオブジェクトを使うのは便利ではありません。なぜなら、オブジェクトには要素の順序を管理するためのメソッドは提供されていないからです。既存のリストの "間に" 新しいプロパティを挿入することはできません。オブジェクトはこのように使うものではありません。

<<<<<<< HEAD
順序付けされたコレクションを格納するために、`Array` と呼ばれる特別なデータ構造があります。

## 宣言 
=======
There exists a special data structure named `Array`, to store ordered collections.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

空の配列を作る2つの構文があります:

```js
let arr = new Array();
let arr = [];
```

ほぼすべてのケースで2つ目の構文が使われます。角括弧の中に初期値となる要素を指定することができます:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

配列要素はゼロから始まる番号が付けられます。

角括弧にその番号を指定することで、該当する要素を取得することができます:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

要素の置き換えも可能です:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

...もしくは、配列に新しいものを追加することもできます:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

配列内の要素の総数は、その `length` で取得できます:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

`alert` を使うことで、すべての配列を表示することも可能です。

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

配列はどんな型の要素も格納することができます。

例:

```js run no-beautify
// 値の混在
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// インデックス 1 のオブジェクトを取得し、その名前を表示
alert( arr[1].name ); // John

// インデックス 3 の関数を取得し、実行
arr[3](); // hello
```


<<<<<<< HEAD
````smart header="末尾のカンマ"
配列は、オブジェクトのようにカンマで終わる場合があります:
=======
````smart header="Trailing comma"
An array, just like an object, may end with a comma:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

すべての行が同じようになるので、"末尾のカンマ" は項目の挿入や削除が容易になります。
````

## Get last elements with "at"

[recent browser="new"]

Let's say we want the last element of the array.

Some programming languages allow to use negative indexes for the same purpose, like `fruits[-1]`.

Although, in JavaScript it won't work. The result will be `undefined`, because the index in square brackets is treated literally.

We can explicitly calculate the last element index and then access it: `fruits[fruits.length - 1]`.

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[fruits.length-1] ); // Plum
```

A bit cumbersome, isn't it? We need to write the variable name twice.

Luckily, there's a shorter syntax: `fruits.at(-1)`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
```

In other words, `arr.at(i)`:
- is exactly the same as `arr[i]`, if `i >= 0`.
- for negative values of `i`, it steps back from the end of the array.

## pop/push, shift/unshift メソッド 

<<<<<<< HEAD
[キュー(queue)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) は配列で最も一般的に使われるものの１つです。コンピュータ・サイエンスでは、これは2つの操作をサポートする要素の順序付きコレクションを意味します。:
=======
A [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- `push` は要素を末尾に追加します。
- `shift` は最初から要素を取得し、2番目の要素が1番目になるようにキューを進めます。

![](queue.svg)

配列は両方の操作をサポートします。

<<<<<<< HEAD
実践では、非常に頻繁にこれを見ます。例えば画面に表示が必要なメッセージのキューです。

配列の別のユースケースもあります -- [スタック(stack)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) と呼ばれるデータ構造です。
=======
In practice we need it very often. For example, a queue of messages that need to be shown on-screen.

There's another use case for arrays -- the data structure named [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これは2つの操作をサポートします。

- `push` は要素を末尾に追加します.
- `pop` は末尾から要素を取り出します。

なので、新しい要素は常に "末尾" から追加または取得されます。

スタックは、通常カードのパックとして例えられます。新しいカードが上に追加されるか、カードが上から取り出されます：

![](stack.svg)

スタックの場合、最新のプッシュされたアイテムが最初に受け取られます。これはLIFO（Last-In-First-Out）の原則とも呼ばれます。 キューの場合、FIFO（First-In-First-Out）があります。

<<<<<<< HEAD
JavaScriptの配列は、キューとスタックどちらとしても動作します。これらの要素を使用すると、要素を先頭または最後に追加/削除することができます。

コンピュータサイエンスでは、それを許可するデータ構造を[両端キュー/デック(deque)](https://en.wikipedia.org/wiki/Double-ended_queue)と呼びます。
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

In computer science, the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

**配列の末尾で動作するメソッド:**

`pop`
: 配列の最後の要素を抽出して返します。:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // "Pear" を削除し alert する

    alert( fruits ); // Apple, Orange
    ```

    Both `fruits.pop()` and `fruits.at(-1)` return the last element of the array, but `fruits.pop()` also modifies the array by removing it.

`push`
: 配列の末尾に要素を追加します。:

    ```js run
    let fruits = ["Apple", "Orange"];

    fruits.push("Pear");

    alert( fruits ); // Apple, Orange, Pear
    ```

    `fruits.push(...)` 呼び出しは `fruits[fruits.length] = ...` と同じです。

**配列の先頭で動作するメソッド:**

`shift`
: 配列の先頭の要素を抽出して返します。:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // Apple を削除し alert する

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: 配列の先頭に要素を追加します。:

    ```js run
    let fruits = ["Orange", "Pear"];

    fruits.unshift('Apple');

    alert( fruits ); // Apple, Orange, Pear
    ```

メソッド `push` と `unshift` は一度に複数の要素を操作することができます:

```js run
let fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## 内部詳細 

<<<<<<< HEAD
配列は特別な種類のオブジェクトです。プロパティ `arr[0]` にアクセスするために使う角括弧は、実際にはオブジェクト構文から来ています。数字がキーとして使用されます。
=======
An array is a special kind of object. The square brackets used to access a property `arr[0]` actually come from the object syntax. That's essentially the same as `obj[key]`, where `arr` is the object, while numbers are used as keys.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

配列はデータの順序付きコレクションと、`length` プロパティを処理する特別なメソッドを提供するようオブジェクトを拡張します。しかし、コアではまだオブジェクトです。

<<<<<<< HEAD
JavaScriptには7つの基本タイプしかないことに注意してください。 配列はオブジェクトであるため、オブジェクトのように動作します。
=======
Remember, there are only eight basic data types in JavaScript (see the [Data types](info:types) chapter for more info). Array is an object and thus behaves like an object.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、これは参照としてコピーされます:

```js run
let fruits = ["Banana"]

let arr = fruits; // 参照によるコピー (2つの変数は同じ配列を参照する)

alert( arr === fruits ); // true
<<<<<<< HEAD
=======

arr.push("Pear"); // modify the array by reference
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

arr.push("Pear"); // 参照から配列を変更する

alert( fruits ); // Banana, Pear - 2 つの項目になっています
```

<<<<<<< HEAD
...しかし配列を本当に特別にするのは、その内部表現です。エンジンは、このチャプターの図に示されているように連続したメモリ領域に要素を格納しようとします。そして配列を非常に高速にするために、他の最適化も行われます。
=======
...But what makes arrays really special is their internal representation. The engine tries to store its elements in the contiguous memory area, one after another, just as depicted on the illustrations in this chapter, and there are other optimizations as well, to make arrays work really fast.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、"順序付けられたコレクション" として配列を処理するのをやめ、普通のオブジェクトのように扱い始めると、それらはすべて壊れます。

例えば、技術的にはこうすることもできます:

```js
let fruits = []; // 配列を作ります

fruits[99999] = 5; // その length よりも非常に大きなインデックスでプロパティを割り当てます

fruits.age = 25; // 任意の名前でプロパティを作成します
```

配列のベースはオブジェクトなので、これは可能です。任意のプロパティを追加することができます。

しかし、エンジンは我々が配列を通常のオブジェクトとして処理していることを知るでしょう。配列固有の最適化は、このような場合には適しておらず無効になります。その利点は消えます。

配列の誤った使い方:

<<<<<<< HEAD
- `arr.test = 5` のように非数値プロパティを追加する。
- 穴を作る: `arr[0]` を追加した後、`arr[1000]` を追加する(その間は無し)。
- 逆順で配列を埋める: `arr[1000]`, `arr[999]` など。
=======
- Add a non-numeric property like `arr.test = 5`.
- Make holes, like: add `arr[0]` and then `arr[1000]` (and nothing between them).
- Fill the array in the reverse order, like `arr[1000]`, `arr[999]` and so on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

*順序付きデータ* を処理するための特別な構造として配列があると考えてください。配列はそのための特別なメソッドを提供します。配列は連続した順序付きデータを処理するため、JavaScriptエンジン内部で注意深くチューニングされています。このために配列を使ってください。そして、任意のキーが必要なときは、通常のオブジェクト `{}` が必要な可能性が高いです。

## パフォーマンス 

メソッド `push/pop` は処理が速く、`shift/unshift` は遅いです。

![](array-speed.svg)

なぜ、配列の最初よりも最後を処理する方が速いのでしょうか？実行中起こっている事を見てみましょう:

```js
fruits.shift(); // 先頭から1要素を取る
```

<<<<<<< HEAD
数値 `0` の要素を取得して削除するだけでは不十分です。他の要素も同様に番号をつけ直す必要があります。
=======
It's not enough to take and remove the element with the index `0`. Other elements need to be renumbered as well.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`shift` 操作は3つのことをしなければなりません:

1. インデックス `0` の要素を削除します。
2. 全ての要素を左に移動させます。インデックス `1` から `0`、`2` から `1` と言うように番号をつけ直します。
3. `length` プロパティを更新します。

![](array-shift.svg)

**配列内の要素が増えれば増えるほど、移動に必要な時間とメモリ内の操作が増えます。**

`unshift` でも似たようなことが起きます: 配列の先頭に要素を追加しますが、最初に存在する要素を右に移動させる必要があり、それらのインデックスを増やします。

そして、`push/pop` はどうでしょう？それらは何も移動させる必要がありません。末尾から要素を抽出するため、`pop` メソッドはインデックスを消去し、`length` を短くするだけです。

`pop` 操作のアクション:

```js
fruits.pop(); // 末尾から1要素取る
```

![](array-pop.svg)

**他の要素のインデックスは変わらないので、`pop` メソッドは何も移動させる必要はありません。そのため非常に高速です。**

`push` メソッドも同じです。

## ループ 

配列アイテムを循環させる最も古い方法の1つは、インデックス上の `for` ループです:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

しかし、配列のための `for..of` という別のループの形式があります:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// 配列要素の反復処理
for (let fruit of fruits) {
  alert( fruit );
}
```

`for..of` は現在の要素の番号へアクセスすることはできず、単に値のみです。しかし、殆どのケースではそれで十分です。また、より短い構文です。

技術的には、配列はオブジェクトなので `for..in` を利用することもできます:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

しかし、実際にこれは良くないアイデアです。そこには潜在的な問題があります:

1. ループ `for..in` は数値のものだけでなく、 *全てのプロパティ* を繰り返し処理します。

    ブラウザや他の環境では *配列のように見える* いわゆる "配列のような" オブジェクトがあります。つまり、それらは `length` とインデックスプロパティを持っています。しかし、それらは通常は必要のない他の非数値プロパティやメソッドも持っています。`for..in` ループはそれらもリストします。なので、もし配列のようなオブジェクトを処理する必要があるとき、それらの "余分な" プロパティが問題になる場合があります。

<<<<<<< HEAD
2. `for..in` ループは配列ではなく、汎用オブジェクトに対して最適化されているため、10から100倍遅くなります。もちろんそれでもとても速いです。高速化はボトルネックの場合にのみ問題なり、それ以外ではさほど重要でないこともあります。しかしそれでも私たちは違いに気をつけるべきです。
=======
2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may only matter in bottlenecks. But still we should be aware of the difference.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

一般的に、配列に対しては `for..in` は使うべきではありません。


## "length" について

配列を変更したとき、`length` プロパティは自動的に更新されます。正確には、それは配列の実際の値の数ではなく、最大の数値インデックスに1を加えたものです。

例えば、大きなインデックスの1つの要素は大きなlengthを返します:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

<<<<<<< HEAD
通常、そのように配列を使わないことに注意してください。
=======
Note that we usually don't use arrays like that.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`length` プロパティの別の興味深い点は、書き込み可能と言う点です。

手動で増やした場合、面白いことは起きません。しかし、それを減らしたとき、配列は切り捨てられます。この処理は不可逆です。これはその例です:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // 2つの要素に切り捨てる
alert( arr ); // [1, 2]

arr.length = 5; // length を戻す
alert( arr[3] ); // undefined: 値は返ってきません
```

なので、配列をクリアする最もシンプルな方法は `arr.length = 0;` です。


## new Array() 

配列を作るもう１つの構文があります:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

<<<<<<< HEAD
角括弧 `[]` がより短く書けるので、ほとんど使われません。また、トリッキーな特徴があります。
=======
It's rarely used, because square brackets `[]` are shorter. Also, there's a tricky feature with it.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

もし数値の１つの引数で `new Array` が呼ばれたとき、*アイテムはありませんが、与えられた長さを持った* 配列が作られます。

<<<<<<< HEAD
それがどのように墓穴を掘るか見てみましょう:
=======
Let's see how one can shoot themselves in the foot:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let arr = new Array(2); // [2] の配列を作成しますか？

alert( arr[0] ); // undefined! 要素がありません.

alert( arr.length ); // length は 2 です
```

<<<<<<< HEAD
このような驚きを避けるため、何をしているのか本当に分かっていない限り、通常は角括弧を使います。
=======
To avoid such surprises, we usually use square brackets, unless we really know what we're doing.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 多次元配列 

<<<<<<< HEAD
配列は配列も持つことができます。我々は行列を格納するために、それを多次元配列として使うことができます。:
=======
Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

<<<<<<< HEAD
alert( matrix[1][1] ); // 中央の要素
=======
alert( matrix[1][1] ); // 5, the central element
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## toString

配列は、要素のカンマ区切りのリストを返す独自の `toString` メソッドの実装を持ってます。

例:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

もしくは、これを試してみましょう:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

配列は `Symbol.toPrimitive` を持っておらず、`valueOf` もなく、`toString` 変換のみを実装しているため、ここでは `[]` は空文字列になり、`[1]` は `"1"` に、`[1,2]` は `"1,2"` になります。

二項演算子プラス `"+"` が文字列に何かを加えたとき、同様に文字列に変換します。なので、その次のステップはこのように見えます:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

<<<<<<< HEAD
## 配列を == で比較しないでください

JavaScript の配列は他のプログラミング言語とは異なり、`==` 演算子で比較すべきではありません。

この演算子は配列に対して特別な扱いせず、他のオブジェクトと同様に動作します。

ルールを思い出してみましょう:

- ２つのオブジェクトは、同じオブジェクトを参照しているときにだけ、等価 `==` です。
- `==` の引数の一方がオブジェクトで、もう一方がプリミティブの場合、オブジェクトはチャプター <info:object-toprimitive> で説明したように、プリミティブに変換されます。
- ...互いに `==` で等価である `null` と `undefined` を除いては、他には何もありません。

厳密比較 `===` は、型変換をしないためよりシンプルです。

なので、`==` で配列を比較する場合、全く同じ配列を参照している２つの変数を比較しない限り、決して等価にはなりません。

例:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

これらの配列は技術的には異なるオブジェクトです。したがって、等しくはなりません。`==` 演算子は要素毎の比較は行いません。

プリミティブとの比較では、以下のように、一見すると奇妙な結果がでることがあります:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

ここでは、両方のケースで配列オブジェクトとプリミティブを比較しています。なので、配列 `[]` は比較のためにプリミティブに変換され、空文字 `''` になります。

次に、チャプター <info:type-conversions> で説明されているように、比較のプロセスがプリミティブで続行されます。

```js run
// [] の変換後は '' です
alert( 0 == '' ); // true, '' は数値 0 に変換されるため

alert('0' == '' ); // false, 型変換はされません、異なる文字列です
```

では、どうやって配列を比較しましょう？

簡単です: `==` 演算子を使いません。代わりにループや次のチャプターで説明するイテレーションメソッドを使用して比較します。

## サマリ 

配列はオブジェクトの特別な種類であり、順序付けされたデータ項目を格納するのに適しています。

- 宣言:

    ```js
    // 角括弧 (通常)
    let arr = [item1, item2...];

    // new Array (例外的、ほとんど使われません)
    let arr = new Array(item1, item2...);
    ```

    `new Array(number)` への呼び出しは与えられた長さの配列を作りますが、要素を持ちません。

- `length` プロパティは配列の長さです。正確にはその最後の数値インデックスに1を加えたものです。それは配列のメソッドにより、自動的に調整されます。
- もし手動で `length` を短くした場合、配列は切り捨てられます。

以下の操作で配列を両端キュー(deque)として使用できます。:

- `push(...items)` は `items` を末尾に追加します。
- `pop()` は末尾の要素を削除し、それを返します。
- `shift()` は先頭の要素を削除し、それを返します。
- `unshift(...items)` はアイテムを先頭に追加します。

配列の要素をループするために:
  - `for (let i=0; i<arr.length; i++)` -- 最も速く動作し、古いブラウザ互換です。
  - `for (let item of arr)` -- アイテムだけのための、現代の構文です。
  - `for (let i in arr)` -- 決して使いません。
=======
## Don't compare arrays with ==

Arrays in JavaScript, unlike some other programming languages, shouldn't be compared with operator `==`.

This operator has no special treatment for arrays, it works with them as with any objects.

Let's recall the rules:

- Two objects are equal `==` only if they're references to the same object.
- If one of the arguments of `==` is an object, and the other one is a primitive, then the object gets converted to primitive, as explained in the chapter <info:object-toprimitive>.
- ...With an exception of `null` and `undefined` that equal `==` each other and nothing else.

The strict comparison `===` is even simpler, as it doesn't convert types.

So, if we compare arrays with `==`, they are never the same, unless we compare two variables that reference exactly the same array.

For example:
```js run
alert( [] == [] ); // false
alert( [0] == [0] ); // false
```

These arrays are technically different objects. So they aren't equal. The `==` operator doesn't do item-by-item comparison.

Comparison with primitives may give seemingly strange results as well:

```js run
alert( 0 == [] ); // true

alert('0' == [] ); // false
```

Here, in both cases, we compare a primitive with an array object. So the array `[]` gets converted to primitive for the purpose of comparison and becomes an empty string `''`.

Then the comparison process goes on with the primitives, as described in the chapter <info:type-conversions>:

```js run
// after [] was converted to ''
alert( 0 == '' ); // true, as '' becomes converted to number 0

alert('0' == '' ); // false, no type conversion, different strings
```

So, how to compare arrays?

That's simple: don't use the `==` operator. Instead, compare them item-by-item in a loop or using iteration methods explained in the next chapter.

## Summary

Array is a special kind of object, suited to storing and managing ordered data items.

The declaration:

```js
// square brackets (usual)
let arr = [item1, item2...];

// new Array (exceptionally rare)
let arr = new Array(item1, item2...);
```

The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.

Getting the elements:

- we can get element by its index, like `arr[0]`
- also we can use `at(i)` method that allows negative indexes. For negative values of `i`, it steps back from the end of the array. If `i >= 0`, it works same as `arr[i]`.

We can use an array as a deque with the following operations:

- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

配列を比較するには、`==` 演算子（`>`, `<` なども同様）は使用しません。これらは配列に対して特別な処理はしません。単にオブジェクトとして扱い、それは通常期待することではありません。

<<<<<<< HEAD
代わりに、配列を要素毎に比較するために `for..of` ループが使用できます。

私たちは、チャプター <info:array-methods> で配列に戻り、追加、削除、要素の抽出や配列のソートと言ったより多くのメソッドを学びます。
=======
To compare arrays, don't use the `==` operator (as well as `>`, `<` and others), as they have no special treatment for arrays. They handle them as any objects, and it's not what we usually want.

Instead you can use `for..of` loop to compare arrays item-by-item.

We will continue with arrays and study more methods to add, remove, extract elements and sort arrays in the next chapter <info:array-methods>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
