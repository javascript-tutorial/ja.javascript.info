<<<<<<< HEAD
# 配列

オブジェクトを使用すると、キー付きの値のコレクションを格納することができます。

しかし、実査には頻繁に *順序付されたコレクション* が必要であることがわかります。それは、1つ目、2つ目、3つ目... と言った要素であり、例えばユーザ、商品、HTML要素など何かのリストを格納します。
=======
# Arrays

Objects allow you to store keyed collections of values. That's fine.

But quite often we find that we need an *ordered collection*, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

ここでオブジェクトを使うのは便利ではありません。なぜなら、オブジェクトには要素の順序を管理するためのメソッドは提供されていないからです。既存のリストの "間に" 新しいプロパティを挿入することはできません。オブジェクトはこのように使うものではありません。

<<<<<<< HEAD
順序付けされたコレクションを格納するために、`Array` と呼ばれる特別なデータ構造があります。

[cut]
=======
There exists a special data structure named `Array`, to store ordered collections.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

## 宣言 

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
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

すべての行が同じようになるので、"末尾のカンマ" は項目の挿入や削除が容易になります。
````


## pop/push, shift/unshift メソッド 

<<<<<<< HEAD
[キュー(queue)](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) は配列で最も一般的に使われるものの１つです。コンピュータ・サイエンスでは、これは2つの操作をサポートする要素の順序付きコレクションを意味します。:
=======
A [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- `push` は要素を末尾に追加します。
- `shift` は最初から要素を取得し、2番目の要素が1番目になるようにキューを進めます。

![](queue.png)

配列は両方の操作をサポートします。

<<<<<<< HEAD
実践では、非常に頻繁にこれを見ます。例えば画面に表示が必要なメッセージのキューです。

配列の別のユースケースもあります -- [スタック(stack)](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) と呼ばれるデータ構造です。
=======
In practice we need it very often. For example, a queue of messages that need to be shown on-screen.

There's another use case for arrays -- the data structure named [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)).
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

これは2つの操作をサポートします。

- `push` は要素を末尾に追加します.
- `pop` は末尾から要素を取り出します。

なので、新しい要素は常に "末尾" から追加または取得されます。

スタックは、通常カードのパックとして例えられます。新しいカードが上に追加されるか、カードが上から取り出されます：

![](stack.png)

スタックの場合、最新のプッシュされたアイテムが最初に受け取られます。これはLIFO（Last-In-First-Out）の原則とも呼ばれます。 キューの場合、FIFO（First-In-First-Out）があります。

<<<<<<< HEAD
JavaScriptの配列は、キューとスタックどちらとしても動作します。これらの要素を使用すると、要素を先頭または最後に追加/削除することができます。
=======
Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements both to/from the beginning or the end.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

コンピュータサイエンスでは、それを許可するデータ構造を[両端キュー/デック(deque)](https://en.wikipedia.org/wiki/Double-ended_queue)と呼びます。

**配列の末尾で動作するメソッド:**

`pop`
: 配列の最後の要素を抽出して返します。:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // "Pear" を削除し alert する

    alert( fruits ); // Apple, Orange
    ```

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

    ```js
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.shift() ); // Apple を削除し alert する

    alert( fruits ); // Orange, Pear
    ```

`unshift`
: 配列の先頭に要素を追加します。:

    ```js
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
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

配列はデータの順序付きコレクションと、`length` プロパティを処理する特別なメソッドを提供するようオブジェクトを拡張します。しかし、コアではまだオブジェクトです。

<<<<<<< HEAD
JavaScriptには7つの基本タイプしかないことに注意してください。 配列はオブジェクトであるため、オブジェクトのように動作します。
=======
Remember, there are only 7 basic types in JavaScript. Array is an object and thus behaves like an object.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

例えば、これは参照としてコピーされます:

```js run
let fruits = ["Banana"]

let arr = fruits; // 参照によるコピー (2つの変数は同じ配列を参照する)

alert( arr === fruits ); // true
<<<<<<< HEAD
=======

arr.push("Pear"); // modify the array by reference
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

arr.push("Pear"); // 参照から配列を変更する

alert( fruits ); // Banana, Pear - 2 つの項目になっています
```

...しかし配列を本当に特別にするのは、その内部表現です。エンジンは、このチャプターの図に示されているように連続したメモリ領域に要素を格納しようとします。そして配列を非常に高速にするために、他の最適化も行われます。

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
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

*順序付きデータ* を処理するための特別な構造として配列があると考えてください。配列はそのための特別なメソッドを提供します。配列は連続した順序付きデータを処理するため、JavaScriptエンジン内部で注意深くチューニングされています。このために配列を使ってください。そして、任意のキーが必要なときは、通常のオブジェクト `{}` が必要な可能性が高いです。

## パフォーマンス 

メソッド `push/pop` は処理が速く、`shift/unshift` は遅いです。

![](array-speed.png)

なぜ、配列の最初よりも最後を処理する方が速いのでしょうか？実行中起こっている事を見てみましょう:

```js
fruits.shift(); // 先頭から1要素を取る
```

数値 `0` の要素を取得して削除するだけでは不十分です。他の要素も同様に番号をつけ直す必要があります。

`shift` 操作は3つのことをしなければなりません:

1. インデックス `0` の要素を削除します。
2. 全ての要素を左に移動させます。インデックス `1` から `0`、`2` から `1` と言うように番号をつけ直します。
3. `length` プロパティを更新します。

![](array-shift.png)

**配列内の要素が増えれば増えるほど、移動に必要な時間とメモリ内の操作が増えます。**

`unshift` でも似たようなことが起きます: 配列の先頭に要素を追加しますが、最初に存在する要素を右に移動させる必要があり、それらのインデックスを増やします。

そして、`push/pop` はどうでしょう？それらは何も移動させる必要がありません。末尾から要素を抽出するため、`pop` メソッドはインデックスを消去し、`length` を短くするだけです。

`pop` 操作のアクション:

```js
fruits.pop(); // 末尾から1要素取る
```

![](array-pop.png)

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
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

一般的に、配列に対しては `for..in` は使うべきではありません。


## "length" 

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
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

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

角括弧 `[]` がより短く書けるので、ほとんど使われません。また、トリッキーな特徴があります。

もし数値の１つの引数で `new Array` が呼ばれたとき、*アイテムはありませんが、与えられた長さを持った* 配列が作られます。

<<<<<<< HEAD
それがどのように墓穴を掘るか見てみましょう:
=======
Let's see how one can shoot themself in the foot:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

```js run
let arr = new Array(2); // [2] の配列を作成しますか？

alert( arr[0] ); // undefined! 要素がありません.

alert( arr.length ); // length は 2 です
```

上のコードでは、`new Array(number)` はすべて要素 `undefined` を持っています。

このような驚きを避けるため、何をしているのか本当に分かっていない限り、通常は角括弧を使います。

## 多次元配列 

<<<<<<< HEAD
配列は配列も持つことができます。我々は行列を格納するために、それを多次元配列として使うことができます。:
=======
Arrays can have items that are also arrays. We can use it for multidimensional arrays, for example to store matrices:
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // 中央の要素
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

## サマリ 

<<<<<<< HEAD
配列はオブジェクトの特別な種類であり、順序付けされたデータ項目を格納するのに適しています。
=======
Array is a special kind of object, suited to storing and managing ordered data items.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- 宣言:

    ```js
    // 角括弧 (通常)
    let arr = [item1, item2...];

    // new Array (例外的、ほとんど使われません)
    let arr = new Array(item1, item2...);
    ```

<<<<<<< HEAD
    `new Array(number)` への呼び出しは与えられた長さの配列を作りますが、要素を持ちません。
=======
    The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- `length` プロパティは配列の長さです。正確にはその最後の数値インデックスに1を加えたものです。それは配列のメソッドにより、自動的に調整されます。
- もし手動で `length` を短くした場合、配列は切り捨てられます。

<<<<<<< HEAD
以下の操作で配列を両端キュー(deque)として使用できます。:
=======
- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds `items` to the beginning.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3

- `push(...items)` は `items` を末尾に追加します。
- `pop()` は末尾の要素を削除し、それを返します。
- `shift()` は先頭の要素を削除し、それを返します。
- `unshift(...items)` はアイテムを先頭に追加します。

<<<<<<< HEAD
配列の要素をループするために:
  - `for (let i=0; i<arr.length; i++)` -- 最も速く動作し、古いブラウザ互換です。
  - `for (let item of arr)` -- アイテムだけのための、現代の構文です。
  - `for (let i in arr)` -- 決して使いません。

私たちは、チャプター <info:array-methods> で配列に戻り、追加、削除、要素の抽出や配列のソートと言ったより多くのメソッドを学びます。
=======
We will return to arrays and study more methods to add, remove, extract elements and sort arrays in the chapter <info:array-methods>.
>>>>>>> 4a8d8987dfc3256045e6b4a3bd8810ad3b25d1b3
