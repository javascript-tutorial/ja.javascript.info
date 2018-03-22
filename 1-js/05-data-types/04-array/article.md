# 配列

オブジェクトを使用すると、キー付きの値のコレクションを格納できます。 それはいいです。

しかし、非常に頻繁に *順序付されたコレクション* が必要であることがわかります。それは、1つ目、2つ目、3つ目の要素などです。例えば、何かのリストを格納する必要があるとします: ユーザ、商品、HTML要素など。

ここでオブジェクトを使うのは便利ではありません。なぜなら、要素の順序を管理するためのメソッドは提供されていないからです。私たちは、既存のリストの "間に" 新しいプロパティを挿入することはできません。オブジェクトはこのように使うものではありません。

順序付けされたコレクションを格納するために、`Array` と呼ばれる特別なデータ構造があります。

[cut]

## 宣言

空の配列を作る2つの構文があります:

```js
let arr = new Array();
let arr = [];
```

ほぼほぼ全てのケースで2つ目の構文が使われます。角括弧の中に初期要素を指定することができます:

```js
let fruits = ["Apple", "Orange", "Plum"];
```

配列要素はゼロから始る番号が付けられます。

角括弧にその数値を指定することで、その要素を取得することができます:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

要素の置き換えも出来ます:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

...もしくは、配列に新しいものを追加することも可能です:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

配列内の要素の総数は、その `length` です:

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits.length ); // 3
```

すべての配列を表示するために `alert` を使うことも出来ます。

```js run
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits ); // Apple,Orange,Plum
```

配列はどんな型の要素も格納することができます。

例:

```js run no-beautify
// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];

// get the object at index 1 and then show its name
alert( arr[1].name ); // John

// get the function at index 3 and run it
arr[3](); // hello
```


````smart header="Trailing comma"
An array, just like an object, may end with a comma:
```js
let fruits = [
  "Apple",
  "Orange",
  "Plum"*!*,*/!*
];
```

全ての行が同じようになるので、"末尾のカンマ" は項目の挿入や削除が容易になります。
````


## pop/push, shift/unshift メソッド

[queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) は配列で最も一般的に使われるものの１つです。コンピュータ・サイエンスでは、これは2つの操作をサポートする要素の順序付きコレクションを意味します。:

- `push` は要素を末尾に追加します。
- `shift` は最初から要素を取得し、2番目の要素が1番目になるようにキューを進めます。

![](queue.png)

配列は両方の操作をサポートします。

実践では、非常に頻繁にこれを見ます。例えば画面に表示が必要なメッセージのキューです。

配列の別のユースケースもあります -- [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) と呼ばれるデータ構造です。

これは2つの操作をサポートします。

- `push` は要素を末尾に追加します.
- `pop` は末尾から要素を取り出します。

なので、新しい要素は常に "末尾" から追加または取得されます。

スタックは、通常、カードのパックとして例えられます。新しいカードが上に追加されるか、上から取り出されます：

![](stack.png)

スタックの場合、最新のプッシュされたアイテムが最初に受信されます。これはLIFO（Last-In-First-Out）の原則とも呼ばれます。 キューの場合、FIFO（First-In-First-Out）があります。

JavaScriptの配列キュー、スタックどちらとしても動作します。これらの要素を使用すると、要素を先頭または最後に追加/削除することができます。

コンピュータサイエンスでは、それを許可するデータ構造を[deque](https://en.wikipedia.org/wiki/Double-ended_queue)と呼びます。

**配列の末尾で動作するメソッド:******

`pop`
: 配列の最後の要素を抽出して返します。:

    ```js run
    let fruits = ["Apple", "Orange", "Pear"];

    alert( fruits.pop() ); // remove "Pear" and alert it

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

    alert( fruits.shift() ); // remove Apple and alert it

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

配列は特別な種類のオブジェクトです。プロパティ `arr[0]` にアクセスするために使う角括弧は、実際にはオブジェクト構文から来ています。数字がキーとして使用されます。

それらはデータの順序付きコレクションと、`length` プロパティを処理する特別なメソッドを提供するようオブジェクトを拡張します。しかし、コアではまだオブジェクトです。

JavaScriptには7つの基本タイプしかないことに注意してください。 配列はオブジェクトであるため、オブジェクトのように動作します。

例えば、これは参照としてコピーされます:

```js run
let fruits = ["Banana"]

let arr = fruits; // copy by reference (two variables reference the same array)

alert( arr === fruits ); // true

arr.push("Pear"); // modify the array by reference

alert( fruits ); // Banana, Pear - 2 items now
```

...しかし配列を本当に特別にするのは、その内部表現です。エンジンは、このチャプターの図に示されているように、連続したメモリ領域に要素を格納しようとします。そして配列を非常に高速にするために、他の最適化も行われます。

しかし、"順序付けられたコレクション" として配列を処理するのをやめ、普通のオブジェクトのように扱い始めると、それらは全て壊れます。

例えば、技術的にはこうすることもできます:

```js
let fruits = []; // make an array

fruits[99999] = 5; // assign a property with the index far greater than its length

fruits.age = 25; // create a property with an arbitrary name
```

配列のベースはオブジェクトなので、これは可能です。それらに任意のプロパティを追加することができます。

しかし、エンジンは、我々が配列を通常のオブジェクトとして処理していることを知るでしょう。配列固有の最適化は、このような場合には適しておらず、無効になります。その利点は消えます。

配列の誤った使い方:

- `arr.test = 5` のように非数値プロパティを追加する。
- 穴を作る: `arr[0]` を追加した後、`arr[1000]` を追加する(そしてその間は無し)。
- 逆順で配列を埋める: `arr[1000]`, `arr[999]` など。

*順序付きデータ* を処理するための特別な構造として配列を考えてください。配列はそのための特別なメソッドを提供します。配列は連続した順序付きデータを処理するため、JavaScriptエンジン内部で注意深くチューニングされています。このために配列を使ってください。そして、任意のキーが必要なときは、通常のオブジェクト `{}` が必要な可能性が高いです。

## パフォーマンス

メソッド `push/pop` は処理が速く、`shift/unshift` は遅いです。

![](array-speed.png)

なぜ、配列の最初よりも最後を処理する方が速いのでしょうか？実行中起こっている事を見てみましょう:

```js
fruits.shift(); // take 1 element from the start
```

数値 `0` の要素を取得して削除するだけでは不十分です。他の要素も同様に番号をつけ直す必要があります。

`shift` 操作は3つのことをしなければなりません:

1. インデックス `0` の要素を削除します。
2. 全ての要素を左に移動させ、インデックス `1` から `0`、`2` から `1` と言うように番号をつけ直します。
3. `length` プロパティを更新します。

![](array-shift.png)

**配列内の要素が増えれば増えるほど、それらを移動するための時間は増え、メモリ内の操作が増えます。**

`unshift` でも似たようなことが起きます: 配列の先頭に要素を追加しますが、最初に存在する要素を右に移動させる必要があり、それらのインデックスを増やします。

そして、`push/pop` はどうでしょう？それらは何も移動させる必要がありません。末尾から要素を抽出するため、`pop` メソッドはインデックスを消去し、`length` を短くします。

`pop` 操作のアクション:

```js
fruits.pop(); // take 1 element from the end
```

![](array-pop.png)

**The `pop` method does not need to move anything, because other elements keep their indexes. That's why it's blazingly fast.**

The similar thing with the `push` method.

## Loops

One of the oldest ways to cycle array items is the `for` loop over indexes:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let i = 0; i < arr.length; i++) {
*/!*
  alert( arr[i] );
}
```

But for arrays there is another form of loop, `for..of`:

```js run
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
```

The `for..of` doesn't give access to the number of the current element, just its value, but in most cases that's enough. And it's shorter.

Technically, because arrays are objects, it is also possible to use `for..in`:

```js run
let arr = ["Apple", "Orange", "Pear"];

*!*
for (let key in arr) {
*/!*
  alert( arr[key] ); // Apple, Orange, Pear
}
```

But that's actually a bad idea. There are potential problems with it:

1. The loop `for..in` iterates over *all properties*, not only the numeric ones.

    There are so-called "array-like" objects in the browser and in other environments, that *look like arrays*. That is, they have `length` and indexes properties, but they may also have other non-numeric properties and methods, which we usually don't need. The `for..in` loop will list them though. So if we need to work with array-like objects, then these "extra" properties can become a problem.

2. The `for..in` loop is optimized for generic objects, not arrays, and thus is 10-100 times slower. Of course, it's still very fast. The speedup may matter only in bottlenecks or just irrelevant. But still we should be aware of the difference.

Generally, we shouldn't use `for..in` for arrays.


## A word about "length"

The `length` property automatically updates when we modify the array. To be precise, it is actually not the count of values in the array, but the greatest numeric index plus one.

For instance, a single element with a large index gives a big length:

```js run
let fruits = [];
fruits[123] = "Apple";

alert( fruits.length ); // 124
```

Note that we usually don't use arrays like that.

Another interesting thing about the `length` property is that it's writable.

If we increase it manually, nothing interesting happens. But if we decrease it, the array is truncated. The process is irreversible, here's the example:

```js run
let arr = [1, 2, 3, 4, 5];

arr.length = 2; // truncate to 2 elements
alert( arr ); // [1, 2]

arr.length = 5; // return length back
alert( arr[3] ); // undefined: the values do not return
```

So, the simplest way to clear the array is: `arr.length = 0;`.


## new Array() [#new-array]

There is one more syntax to create an array:

```js
let arr = *!*new Array*/!*("Apple", "Pear", "etc");
```

It's rarely used, because square brackets `[]` are shorter. Also there's a tricky feature with it.

If `new Array` is called with a single argument which is a number, then it creates an array *without items, but with the given length*.

Let's see how one can shoot himself in the foot:

```js run
let arr = new Array(2); // will it create an array of [2] ?

alert( arr[0] ); // undefined! no elements.

alert( arr.length ); // length 2
```

In the code above, `new Array(number)` has all elements `undefined`.

To evade such surprises, we usually use square brackets, unless we really know what we're doing.

## Multidimensional arrays

Arrays can have items that are also arrays. We can use it for multidimensional arrays, to store matrices:

```js run
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

alert( matrix[1][1] ); // the central element
```

## toString

Arrays have their own implementation of `toString` method that returns a comma-separated list of elements.

For instance:


```js run
let arr = [1, 2, 3];

alert( arr ); // 1,2,3
alert( String(arr) === '1,2,3' ); // true
```

Also, let's try this:

```js run
alert( [] + 1 ); // "1"
alert( [1] + 1 ); // "11"
alert( [1,2] + 1 ); // "1,21"
```

Arrays do not have `Symbol.toPrimitive`, neither a viable `valueOf`, they implement only `toString` conversion, so here `[]` becomes an empty string, `[1]` becomes `"1"` and `[1,2]` becomes `"1,2"`.

When the binary plus `"+"` operator adds something to a string, it converts it to a string as well, so the next step looks like this:

```js run
alert( "" + 1 ); // "1"
alert( "1" + 1 ); // "11"
alert( "1,2" + 1 ); // "1,21"
```

## Summary

Array is a special kind of objects, suited to store and manage ordered data items.

- The declaration:

    ```js
    // square brackets (usual)
    let arr = [item1, item2...];

    // new Array (exceptionally rare)
    let arr = new Array(item1, item2...);
    ```

    The call to `new Array(number)` creates an array with the given length, but without elements.

- The `length` property is the array length or, to be precise, its last numeric index plus one. It is auto-adjusted by array methods.
- If we shorten `length` manually, the array is truncated.

We can use an array as a deque with the following operations:

- `push(...items)` adds `items` to the end.
- `pop()` removes the element from the end and returns it.
- `shift()` removes the element from the beginning and returns it.
- `unshift(...items)` adds items to the beginning.

To loop over the elements of the array:
  - `for (let i=0; i<arr.length; i++)` -- works fastest, old-browser-compatible.
  - `for (let item of arr)` -- the modern syntax for items only,
  - `for (let i in arr)` -- never use.

We will return to arrays and study more methods to add, remove, extract elements and sort arrays in the chapter <info:array-methods>.
