# 配列のメソッド

配列は多くのメソッドを提供します。分かりやすくするために、このチャプターではグループに分けて説明します。

<<<<<<< HEAD
## アイテムの追加/削除 

私たちは既に先頭または末尾にアイテムを追加/削除するメソッドを知っています:
=======
## Add/remove items
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- `push(...items)` は `items` を末尾に追加します。
- `pop()` は末尾の要素を削除し、それを返します。
- `shift()` は先頭の要素を削除し、それを返します。
- `unshift(...items)` はアイテムを先頭に追加します。

<<<<<<< HEAD
他にもいくつかあります。
=======
- `arr.push(...items)` -- adds items to the end,
- `arr.pop()` -- extracts an item from the end,
- `arr.shift()` -- extracts an item from the beginning,
- `arr.unshift(...items)` -- adds items to the beginning.

Here are a few others.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

### splice

配列から要素を削除する方法はどのようになるでしょう？

配列はオブジェクトなので、 `delete` を試すことができます:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // "go" を削除

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

要素は削除されましたが、配列は依然として3つの要素を持っており、`arr.length == 3` となります。

これは自然なことです。なぜなら、 `delete obj.key` は `key` で値を削除するためのものです。それがすべてであり、オブジェクトでは問題ありません。しかし、通常配列では残りの要素が移動し、解放された場所を埋めたいです。今より短い配列になることを期待しています。

なので、特別なメソッドを使用する必要があります。

<<<<<<< HEAD
[arr.splice(str)](mdn:js/Array/splice) メソッドは、配列用のスイス製アーミーナイフです。それは何でもすることができます: 追加、削除、また要素の挿入も。
=======
The [arr.splice](mdn:js/Array/splice) method is a swiss army knife for arrays. It can do everything: insert, remove and replace elements.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

構文:

```js
arr.splice(start[, deleteCount, elem1, ..., elemN])
```

<<<<<<< HEAD
位置 `index` から始まります。 `deleteCount` の要素を削除した後、その場所に `elem1, ..., elemN` を挿入します。このメソッドは削除した要素の配列を返します。
=======
It modifies `arr` starting from the index `start`: removes `deleteCount` elements and then inserts `elem1, ..., elemN` at their place. Returns the array of removed elements.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

このメソッドは例で簡単に把握できます。

削除してみましょう:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // インデックス 1 から 1 要素を削除
*/!*

alert( arr ); // ["I", "JavaScript"]
```

簡単ですね。インデックス `1` から始まり、`1` つ要素を削除します。

次の例では、3つの要素を削除し、他の2つの要素でそれらを置き換えます:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// 最初の 3 要素を削除し、別のものに置換
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // 今は [*!*"Let's", "dance"*/!*, "right", "now"]
```

ここで、`splice` が削除された要素の配列を返していることを見ることができます:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// 最初の 2 要素を削除
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- 削除された要素の配列
```

`splice` メソッドは削除せずに挿入することも可能です。そのためには、`deleteCount` に `0` をセットします:

```js run
let arr = ["I", "study", "JavaScript"];

// インデックス 2 から
// 削除 0
// その後 "complex" と "language" を挿入
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="負のインデックスも許容します"
上記や他の配列のメソッドでは、負のインデックスが許容されます。それらは配列の末尾からの位置を指定します。:

```js run
let arr = [1, 2, 5];

// インデックス -1 (末尾から1つ前) から
// 削除 0 要素,
// その後 3 と 4 を挿入
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

メソッド [arr.slice](mdn:js/Array/slice) は似たように見える `arr.splice` よりもはるかに単純です。

構文:

```js
arr.slice([start], [end])
```

<<<<<<< HEAD
開始インデックス `"start"` から `"end"` (`"end"` は含みません)のすべてのアイテムをコピーした新しい配列を返します。`start` と `end` はともに負値になることができます。そのときは、配列の末尾からの位置が想定されます。

`str.slice` のように動作しますが、部分文字列の代わりに部分配列を作ります。
=======
It returns a new array copying to it all items from index `start` to `end` (not including `end`). Both `start` and `end` can be negative, in that case position from array end is assumed.

It's similar to a string method `str.slice`, but instead of substrings it makes subarrays.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

例:

```js run
let arr = ["t", "e", "s", "t"];

<<<<<<< HEAD
alert( arr.slice(1, 3) ); // e,s (1 から 3 をコピー)

alert( arr.slice(-2) ); // s,t (-2 から末尾まで)
```

引数なし `arr.slice()` でも呼び出すことができ、これは `arr` のコピーを生成します。これは、オリジナルの配列に影響を与えない形でさらに変換するためのためのコピーを取得するのによく使用されます。

### concat

メソッド [arr.concat](mdn:js/Array/concat) は配列を他の配列またはアイテムと結合します。
=======
alert( arr.slice(1, 3) ); // e,s (copy from 1 to 3)

alert( arr.slice(-2) ); // s,t (copy from -2 till the end)
```

We can also call it without arguments: `arr.slice()` creates a copy of `arr`. That's often used to obtain a copy for further transformations that should not affect the original array.

### concat

The method [arr.concat](mdn:js/Array/concat) creates a new array that includes values from other arrays and additional items.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

構文:

```js
arr.concat(arg1, arg2...)
```

任意の数の引数(配列または値)を許容します。

結果は `arr`, 次に `arg1`, `arg2` などのアイテムを含む新しい配列を返します。

<<<<<<< HEAD
もし、引数が配列、もしくは `Symbol.isConcatSpreadable` プロパティを持っている場合、その全ての要素がコピーされます。そうでない場合、引数自体がコピーされます。
=======
If an argument `argN` is an array, then all its elements are copied. Otherwise, the argument itself is copied.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

例:

```js run
let arr = [1, 2];

<<<<<<< HEAD
// arr と [3,4] をマージ
alert( arr.concat([3, 4])); // 1,2,3,4

// arr と [3,4] と [5,6] をマージ
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// arr と [3,4] をマージ後, 5 と 6 を追加
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

通常は、配列から要素をコピーするだけです。それ以外のオブジェクトでは、配列のように見えたとしても、全体として追加されます:
=======
// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

<<<<<<< HEAD
...しかし、もし配列のようなオブジェクトが `Symbol.isConcatSpreadable` プロパティを持つ場合、`concat` は配列として扱います。つまり、代わりにその要素が追加されます:
=======
...But if an array-like object has a special `Symbol.isConcatSpreadable` property, then it's treated as an array by `concat`: its elements are added instead:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

<<<<<<< HEAD
## イテレート/反復: forEach 

[arr.forEach](mdn:js/Array/forEach) メソッドは配列の全要素に対して関数を実行することができます。

構文:
```js
arr.forEach(function(item, index, array) {
  // ... item に対して何か処理をする
});
```

例えば、これは配列の各要素を表示します:

```js run
// 各要素は alert を呼び出す
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

そしてこのコードは、ターゲットとなる配列内の位置についてより細かいです。
=======
## Iterate: forEach

The [arr.forEach](mdn:js/Array/forEach) method allows to run a function for every element of the array.

The syntax:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

For instance, this shows each element of the array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

And this code is more elaborate about their positions in the target array:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

<<<<<<< HEAD
関数の結果(もし何かを返す場合)は捨てられ、無視されます。


## 配列での検索 

これらは、配列で何かを探すためのメソッドです。

### indexOf/lastIndexOf and includes

メソッド [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) と [arr.includes](mdn:js/Array/includes) は文字列の場合と同じ構文を持ち、基本的に同じことを行いますが、文字の代わりにアイテムを操作します:

- `arr.indexOf(item, from)` はインデックス `from` から `item` を探し、見つかった場所のインデックスを返します。そうでない場合は `-1` になります。
- `arr.lastIndexOf(item, from)` は同じですが、右から左に見ていきます。
- `arr.includes(item, from)` はインデックス `from` から `item` を探し、見つかった場合、`true` を返します。

例:
=======
The result of the function (if it returns any) is thrown away and ignored.


## Searching in array

Now let's cover methods that search in an array.

### indexOf/lastIndexOf and includes

The methods [arr.indexOf](mdn:js/Array/indexOf) and [arr.includes](mdn:js/Array/includes) have the similar syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.

Usually these methods are used with only one argument: the `item` to search. By default, the search is from the beginning.

For instance:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

<<<<<<< HEAD
メソッドは `===` 比較を使うことに留意してください。そのため、もしも `false` を探す場合、ゼロではなく、正確な `false` を見つけようとします。

もしも含んでいるかをチェックしたいが、正確なインデックスは不要なときは、`arr.includes` が好ましいです。

また、`includes` の非常に小さな違いは、`indexOf/lastIndexOf` と違い、`NaN` を正しく処理することができます:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (0 になるべきですが, === 等値は NaN では機能しません)
alert( arr.includes(NaN) );// true (正しい)
=======
Please note that `indexOf` uses the strict equality `===` for comparison. So, if we look for `false`, it finds exactly `false` and not the zero.

If we want to check if `item` exists in the array, and don't need the index, then `arr.includes` is preferred.

The method [arr.lastIndexOf](mdn:js/Array/lastIndexOf) is the same as `indexOf`, but looks for from right to left.

```js run
let fruits = ['Apple', 'Orange', 'Apple']

alert( fruits.indexOf('Apple') ); // 0 (first Apple)
alert( fruits.lastIndexOf('Apple') ); // 2 (last Apple)
```

````smart header="The `includes` method handles `NaN` correctly"
A minor, but noteworthy feature of `includes` is that it correctly handles `NaN`, unlike `indexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (wrong, should be 0)
alert( arr.includes(NaN) );// true (correct)
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
```
That's because `includes` was added to JavaScript much later and uses the more up to date comparison algorithm internally.
````

<<<<<<< HEAD
### find と findIndex
=======
### find and findIndex/findLastIndex
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

オブジェクトの配列を持っていることを想像してください。特定条件を持つオブジェクトをどのようにして見つけますか？

<<<<<<< HEAD
ここで [arr.find](mdn:js/Array/find) メソッドが便利です。
=======
Here the [arr.find(fn)](mdn:js/Array/find) method comes in handy.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

構文はこうです:
```js
let result = arr.find(function(item, index, array) {
<<<<<<< HEAD
  // true が返却されると、item が返却され、イテレーションは停止します
  // 偽の場合は undefined です
});
```

関数は配列の要素毎に繰り返し呼ばれます:
=======
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
```

The function is called for elements of the array, one after another:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- `item` は要素です。
- `index` はインデックスです。
- `array` は配列自身です。

もし `true` を返すと、検索が止まり、`item` が返却されます。見つからない場合は `undefined` になります。

例えば、ユーザの配列を持っており、それぞれフィールド `id` と `name` を持っているとします。`id == 1` のものを見つけましょう:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

現実の世界では、オブジェクトの配列は一般的なことです。なので、 `find` メソッドは非常に役立ちます。

<<<<<<< HEAD
例の中では１つの引数、関数 `item => item.id == 1` で `find` を行っている点に注意してください。`find` の他のパラメータは殆ど使われません。

[arr.findIndex](mdn:js/Array/findIndex) メソッドは基本的に同じです。が、要素自体ではなく要素が見つかったインデックスを返します。
=======
Note that in the example we provide to `find` the function `item => item.id == 1` with one argument. That's typical, other arguments of this function are rarely used.

The [arr.findIndex](mdn:js/Array/findIndex) method has the same syntax, but returns the index where the element was found instead of the element itself. The value of `-1` is returned if nothing is found.

The [arr.findLastIndex](mdn:js/Array/findLastIndex) method is like `findIndex`, but searches from right to left, similar to `lastIndexOf`.

Here's an example:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"},
  {id: 4, name: "John"}
];

// Find the index of the first John
alert(users.findIndex(user => user.name == 'John')); // 0

// Find the index of the last John
alert(users.findLastIndex(user => user.name == 'John')); // 3
```
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

### filter

`find` メソッドは、関数が `true` を返すようにする単一の（最初の）要素を探します。

もし複数になる可能性がある場合、[arr.filter(fn)](mdn:js/Array/filter) を使います。

<<<<<<< HEAD
構文は大体 `find` と同じですが、`filter` はマッチしたすべて要素の配列を返します:

```js
let results = arr.filter(function(item, index, array) {
  // true の場合、item は results にプッシュされ、イテレーションは継続します
  // 何も見つからない場合は、空配列を返します
=======
The syntax is similar to `find`, but `filter` returns an array of all matching elements:

```js
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
});
```

例:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// 最初の2人のユーザの配列を返します
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

<<<<<<< HEAD
## 配列を変換する 

このセクションでは、配列を変換または並び替える方法について説明します。
=======
## Transform an array

Let's move on to methods that transform and reorder an array.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

### map

[arr.map](mdn:js/Array/map) メソッドは最も便利なものの1つで、よく使われます。

これは、配列の各要素に対して関数を呼び出し、結果の配列を返します。

<<<<<<< HEAD
構文は次の通りです:

```js
let result = arr.map(function(item, index, array) {
  // item の代わりに新しい値を返します
})
```

例えば、ここでは各要素をその長さに変換します:
=======
It calls the function for each element of the array and returns the array of results.

The syntax is:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
```

For instance, here we transform each element into its length:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

<<<<<<< HEAD
メソッド [arr.sort](mdn:js/Array/sort) は配列を *決まった位置に* ソートし、要素の順番を変更します。

これもソートされた配列を返しますが、`arr` 自身が変更されるので、返却値は通常無視されます。
=======
The call to [arr.sort()](mdn:js/Array/sort) sorts the array *in place*, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as `arr` itself is modified.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

例:

```js run
let arr = [ 1, 2, 15 ];

<<<<<<< HEAD
// このメソッドは arr の内容を並べ替え（てそれを返します）
=======
// the method reorders the content of arr
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

出力結果が何か不自然であることに気づきましたか？

並び順が `1, 15, 2` となりました。正しくないようです。しかしなぜでしょう？

**アイテムは、デフォルトでは文字列としてソートされます。**

<<<<<<< HEAD
文字通り、すべての要素は文字列に変換され、比較されます。なので、辞書編集順序が適用され、実際には `"2" > "15"` となります。

私たち独自のソート順を使うためには、`arr.sort()` の引数として、2つの引数をもつ関数を指定する必要があります。

関数はこのように動作する必要があります:
=======
Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function as the argument of `arr.sort()`.

The function should compare two arbitrary values and return:

>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

<<<<<<< HEAD
例:
=======
For instance, to sort as numbers:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

これで意図したとおりに動作します。

<<<<<<< HEAD
立ち止まって何が起きているのか考えてみましょう。`arr` は何でも配列にすることができます。それは数値や文字列、html要素やその他何でも含まれる可能性があります。私たちは *何かの* セットを持っています。それらをソートするためには、要素を比較する方法を知っている *順序付け関数* が必要です。 デフォルトは文字列です。

`arr.sort(fn)` メソッドは組み込みでソートアルゴリズムの実装を持っています。私たちはそれが正確にどのように動作するかについては気にする必要はありません (殆どの場合、最適化された[クイックソート](https://en.wikipedia.org/wiki/Quicksort) です)。配列の要素を見ていき、提供された関数を使ってその要素を比較し、並べ替えます。私たちに必要なのは、比較を行う `fn` を提供することだけです。
=======
Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) or [Timsort](https://en.wikipedia.org/wiki/Timsort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

ところで、もしどの要素が比較されているかを知りたいとき、`alert` をしても問題ありません:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

<<<<<<< HEAD
アルゴリズムは処理の中で複数回要素を比較しますが、できるだけ回数を少なくしようとします。

````smart header="比較関数は任意の数を返すことがあります"
実際には、比較関数は正の数を「より大きい」、負の数を「より小さい」として返せば十分です。
=======
The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

より短い関数で書くことができます:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

<<<<<<< HEAD
````smart header="ベストなアロー関数"
[アロー関数](info:arrow-functions-basics) を覚えていますか? すっきりしたソートを書くために使えます。:
=======
````smart header="Arrow functions for the best"
Remember [arrow functions](info:arrow-functions-basics)? We can use them here for neater sorting:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js
arr.sort( (a, b) => a - b );
```

<<<<<<< HEAD
これは、他の上で書いているより長いバージョンとまったく同じように動作します。
````

````smart header="文字列には `localeCompare` を使用します"
[strings](info:string#correct-comparisons)の比較アルゴリズムを思い出してください。デフォルトではコードで文字比較を行います。

多くのアルファベットでは、`Ö` などの文字のソートを正しく行うためのメソッド `str.localeCompare` を使用するのがよいです。

例えば、ドイツ語でいくつかの国をソートしてみましょう:
=======
This works exactly the same as the longer version above.
````

````smart header="Use `localeCompare` for strings"
Remember [strings](info:string#correct-comparisons) comparison algorithm? It compares letters by their codes by default.

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`.

For example, let's sort a few countries in German:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

<<<<<<< HEAD
alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (間違い)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (正しい!)
=======
alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
```
````

### reverse

メソッド [arr.reverse](mdn:js/Array/reverse) は `arr` 内の要素の順序を逆転させます。

例:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

また、反転後に配列 `arr` を返します。

### split と join

<<<<<<< HEAD
ここでは現実世界でのシチュエーションを考えます。私たちはメッセージングアプリを書いており、利用者はカンマ区切りで受信者のリスト(`John, Pete, Mary`)を入力します。しかし、我々にとっては、１つの文字列よりも名前の配列の方がはるかに扱いやすいです。それを得る方法は？
=======
Here's the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

[str.split(delim)](mdn:js/String/split) メソッドは、まさにそれをします。与えられた区切り文字 `delim` で文字列を配列に分割します。

下の例では、スペースに続くカンマで分割しています:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (と他の名前)
}
```

`split` メソッドは任意の2つ目の数値の引数を持っています。それは配列の長さの制限です。もしこれが指定された場合、余分な要素は無視されます。実際にはほとんど使われませんが。:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="文字への分割"
`s` を空にして `split(s)` を呼び出すと、文字列を文字の配列に分割します:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

<<<<<<< HEAD
[arr.join(str)](mdn:js/Array/join) は `split` と逆を行います。`arr` のアイテムを `str` で繋いだ文字列を作ります。
=======
The call [arr.join(glue)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items joined by `glue` between them.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

例:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

<<<<<<< HEAD
配列に対して繰り返し処理が必要なときは、`forEach`, `for` あるいは `for..of` を使うことができます。
=======
When we need to iterate over an array -- we can use `forEach`, `for` or `for..of`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

各要素のデータを反復して返す必要があるときには、`map`を使うことができます。

メソッド [arr.reduce](mdn:js/Array/reduce) と [arr.reduceRight](mdn:js/Array/reduceRight) もまたその種類に属しますが、少し複雑です。それらは、配列に基づいて単一の値を計算するために使用されます。

構文:

```js
<<<<<<< HEAD
let value = arr.reduce(function(accumulator, item, index, arr) {
=======
let value = arr.reduce(function(accumulator, item, index, array) {
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
  // ...
}, [initial]);
```

<<<<<<< HEAD
関数は各要素に順番に適用され、その結果を次の呼び出しに "引き継ぎ" ます:

引数: 

- `accumulator` - 前の関数呼び出しの結果で、初回は `initial` と等価です（`initial` が指定されている場合）
- `item` -- 現在の配列の項目です。
- `index` -- 位置です。
- `arr` -- 配列です。

関数が適用されると、前の関数呼び出しの結果が、次の関数呼び出しの最初の引数として渡されます。

したがって、最初の引数は基本的に、以前のすべての実行の結合結果を格納するアキュムレータです。そして、最後にそれは `reduce` の結果になります。
=======
The function is applied to all array elements one after another and "carries on" its result to the next call.

Arguments:

- `accumulator` -- is the result of the previous function call, equals `initial` the first time (if `initial` is provided).
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

As function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of `reduce`.

Sounds complicated?
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

複雑に見えますか？

<<<<<<< HEAD
これを掴むための最も簡単な方法は、例を見る、です。

ここでは、１行で配列の合計を取得します。
=======
Here we get a sum of an array in one line:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

<<<<<<< HEAD
ここでは、2つの引数だけを使用する `reduce` の最も一般的なパターンを使用しました。
=======
The function passed to `reduce` uses only 2 arguments, that's typically enough.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

何が起きているか、詳細を見てみましょう。

<<<<<<< HEAD
1. 最初の実行で `sum` は `initial` 値(`reduce` の最後の引数)であり、 `0` です。そして、`current` は最初の配列要素で `1` になります。従って、結果は `1` です。
2. ２回目の実行では、`sum = 1` で、2つ目の配列要素(`2`)をそれに足して返します。
3. ３回目の実行では、`sum = 3` で、それに１つ要素を足します。それが続きます。
=======
1. On the first run, `sum` is the `initial` value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the function result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

計算のフロー:

![](reduce.svg)

<<<<<<< HEAD
また、次のテーブルでは、各行は次の配列要素の関数呼び出しを表しています。
=======
Or in the form of a table, where each row represents a function call on the next array element:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

|   |`sum`|`current`|result|
|---|-----|---------|---------|
<<<<<<< HEAD
|最初の呼び出し|`0`|`1`|`1`|
|2回目の呼び出し|`1`|`2`|`3`|
|3回目の呼び出し|`3`|`3`|`6`|
|4回目の呼び出し|`6`|`4`|`10`|
|5回目の呼び出し|`10`|`5`|`15`|

これらから分かるように、前の呼び出しの結果は次の実行のときの最初の引数になっています。
=======
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|

Here we can clearly see how the result of the previous call becomes the first argument of the next one.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

また、 initial 値を省略することもできます。:

```js run
let arr = [1, 2, 3, 4, 5];

// reduce から初期値を削除する(最後の 0 を削除)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

結果は同じです。なぜなら、初期値が指定されていない場合、`reduce` は配列の最初の要素を初期値とみなし、2つ目の要素から繰り返し処理を始めるためです。

計算テーブルは、上と同じで最初の行を引いたものです。

しかし、このような利用は極度の注意を要求します。もし配列が空の場合、初期値がない状態で `reduce` を呼び出すと、エラーが発生してしまいます。

例:

```js run
let arr = [];

// Error: 初期値なしの空配列の reduce はエラーです
// 初期値が存在する場合、reduce は空の arr に対しそれを返します。
arr.reduce((sum, current) => sum + current);
```

<<<<<<< HEAD
従って、常に初期値を指定することをおすすめします。

[arr.reduceRight](mdn:js/Array/reduceRight) メソッドも同じをことを行いますが、右から左に実行します。


## Array.isArray 

配列は別の言語の型を形成しません。 それらはオブジェクトに基づいています。

なので `typeof` では、通常のオブジェクトと配列を区別するのには助けになりません:

```js run
alert(typeof {}); // object
alert(typeof []); // object(同じ)
=======
So it's advised to always specify the initial value.

The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same, but goes from right to left.

## Array.isArray

Arrays do not form a separate language type. They are based on objects.

So `typeof` does not help to distinguish a plain object from an array:

```js run
alert(typeof {}); // object
alert(typeof []); // object (same)
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
```

...しかし、配列は頻繁に使用されるため、そのための特別なメソッド [Array.isArray(value)](mdn:js/Array/isArray) があります。これは、`value` が配列のときに `true` を、そうでない場合には `false` を返します。

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## ほとんどのメソッドは "thisArg" をサポートします 

`find`、`filter`、`map`　のような関数を呼び出すほとんどの配列メソッドは、`sort` の例外を除いて、任意の追加パラメータ `thisArg` を受け取ります。

これは殆ど使われないため、このパラメータは上のセクションでは説明されていません。しかし、完全性のためにはそれをカバーする必要があります。

それらのメソッドの完全な構文です:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg はオプションの最後の引数です
```

`thisArg` パラメータの値は `func` での `this` になります。

<<<<<<< HEAD
例えば、ここでは filter で `army` オブジェクトのメソッドを使用し、`thisArg` はそのコンテキストを渡します。:
=======
For example, here we use a method of `army` object as a filter, and `thisArg` passes the context:
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
<<<<<<< HEAD
// army.canJoin が true となるユーザを見つけます
=======
// find users, for who army.canJoin returns true
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

<<<<<<< HEAD
もし上の例で `users.filter(army.canJoin)` としていた場合、`army.canJoin` はスタンドアローンの関数として呼び出されるため、`this=undefined` であり、即時エラーになります。

呼び出し `users.filter(army.canJoin, army)` は `users.filter(user => army.canJoin(user))` に置き換え可能であり、同じことをします。多くの人にとってより理解しやすいので、後者の方がよく利用されます。

## サマリ 
=======
If in the example above we used `users.filter(army.canJoin)`, then `army.canJoin` would be called as a standalone function, with `this=undefined`, thus leading to an instant error.

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The latter is used more often, as it's a bit easier to understand for most people.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

配列メソッドの チートシート です:

<<<<<<< HEAD
- 要素の追加/削除をする場合:
  - `push(...items)` -- アイテムを末尾に追加します,
  - `pop()` -- 末尾からアイテムを抽出します,
  - `shift()` -- 先頭からアイテムを抽出します,
  - `unshift(...items)` -- 先頭にアイテムを追加します.
  - `splice(pos, deleteCount, ...items)` -- インデックス `pos` から `deleteCount` 数要素を削除し `items` を挿入します。
  - `slice(start, end)` -- 新しい配列を作り、`start` から `end` まで(endは含まない) の要素をコピーします。
  - `concat(...items)` -- 新しい配列を返します: 現在のものすべてをコピーし、`items` を追加します。`items` のいずれかが配列の場合、その要素が取得されます。

- 要素を検索する場合:
  - `indexOf/lastIndexOf(item, pos)` -- 位置 `pos` から始めて `item` を探します。 インデックス、または見つからなかった場合は `-1` を返します。
  - `includes(value)` -- 配列が `value` を持っている場合 `true` を返します。そうでなければ `false` です。
  - `find/filter(func)` -- 関数を介して要素をフィルタリングし、`true` を返す最初の/すべての値を返します。
  - `findIndex` は `find` のようですが、値の代わりにインデックスを返します。
=======
A cheat sheet of array methods:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` deletes `deleteCount` elements and inserts `items`.
  - `slice(start, end)` -- creates a new array, copies elements from index `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- 要素を反復処理するには:
  - `forEach(func)` -- すべての要素に対して `func`を呼び出し、何も返しません。

<<<<<<< HEAD
- 配列を変換するには:
  - `map(func)` -- すべての要素に対して `func` を呼び出した結果から新しい配列を作成します。
  - `sort(func)` -- 配列を適切な位置でソートし、それを返します。
  - `reverse()` -- 配列を反転してそれを返します。
  - `split/join` -- 文字列を配列に変換したり、戻します。
  - `reduce/reduceRight(func, initial)` -- 各要素に対して `func`を呼び出し、呼び出しの間に中間結果を渡すことで配列全体の単一の値を計算します。

- さらに:
  - `Array.isArray(arr)` は `arr` が配列かどうかをチェックします。

`sort`, `reverse` と `splice` メソッドは、配列自身を変更することに注意してください。
=======
- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce/reduceRight(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

- Additionally:
  - `Array.isArray(value)` checks `value` for being an array, if so returns `true`, otherwise `false`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

これらのメソッドは最も使われるもので、ユースケースの99%をカバーしますが、他にもいくつかあります:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) は配列をチェックします。

  関数 `fn` は `map` と同じように配列の各要素で呼ばれます。もし どれか/すべて の結果が `true` であれば `true`, それ以外は `false` になります。

  これらのメソッドは `||` や `&&` 演算子のように振る舞います。もし `fn` が真の値を返す場合、`arr.some()` はすぐに `true` を返し、残りの項目に対するイテレーションを停止します。`fn` が偽の値を返す場合は、`arr.every()` はすぐに `false` を返し、同様に残りの項目のイテレーションは停止します。

  `every` は配列を比較するのに使えます:
  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

<<<<<<< HEAD
  alert( arraysEqual([1, 2], [1, 2])); // true
  ```
=======
- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) check the array.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- インデックス `start` から `end` まで `value` で配列を埋めます。

<<<<<<< HEAD
- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- 位置 `start` から `end` までの要素を、*自身* の `target` の位置にコピーします (既存のものを上書きします)。
=======
  These methods behave sort of like `||` and `&&` operators: if `fn` returns a truthy value, `arr.some()` immediately returns `true` and stops iterating over the rest of items; if `fn` returns a falsy value, `arr.every()` immediately returns `false` and stops iterating over the rest of items as well.

  We can use `every` to compare arrays:

  ```js run
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c

- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) は多次元配列からフラットな配列を生成します。

<<<<<<< HEAD
完全なリストは [manual](mdn:js/Array) を見てください。

初めてみたとき、多くのメソッドがあり覚えるのがとても難しいように見えるかもしれません。しかし、実際にはそう見えるよりもはるかに簡単です。

チートシートを見て、それらを認識してください。 それから、このチャプターのタスクで練習してください。そうすれば配列メソッドの経験を積むことができます。

今後、配列で何かをする必要があるとき、どうやればいいか分からないときはいつでもここに来て、 チートシート を見て正しいメソッドを見つけてください。例はあなたが正しくそのメソッドを使うのに役立つでしょう。使っていると自然とそれらのメソッドを覚えていくでしょう。
=======
- [arr.flat(depth)](mdn:js/Array/flat)/[arr.flatMap(fn)](mdn:js/Array/flatMap) create a new flat array from a multidimensional array.

For the full list, see the [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier.

Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
>>>>>>> 285083fc71ee3a7cf55fd8acac9c91ac6f62105c
