<<<<<<< HEAD
# WeakMap と WeakSet 

チャプター <info:garbage-collection> で学んだ通り、JavaScriptエンジンは、それが到達可能な(そして潜在的に利用される可能性がある)間、メモリ上に値を保持しています。

例:
```js
let john = { name: "John" };

// オブジェクトへはアクセス可能です。john がその参照を持っています

// 参照を上書きします
john = null;

*!*
// オブジェクトはメモリから削除されるでしょう
*/!*
```

通常、オブジェクトまたは配列の要素、もしくは別のデータ構造のプロパティは到達可能と考えられ、そのデータ構造がメモリにいる間は保持され続けます。

例えば、あるオブジェクトを配列に入れた場合、その配列が生きている間は、他の参照がなくてもそのオブジェクトは生きていることになります。

例:
=======

# WeakMap and WeakSet

As we know from the chapter <info:garbage-collection>, JavaScript engine keeps a value in memory while it is "reachable" and can potentially be used.

For instance:

```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

*!*
// the object will be removed from memory
*/!*
```

Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

Like this:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let john = { name: "John" };

let array = [ john ];

<<<<<<< HEAD
john = null; // 参照を上書きします

*!*
// 以前 john で参照されていたオブジェクトは配列内に格納されています
// そのため、ガベージコレクションされません。
// array[0] で取得することが可能です
*/!*
```

また、通常の `Map` のキーとしてオブジェクトを使うと、`Map` が存在している間はそのオブジェクトも存在します。これはメモリを占め、ガベージコレクションされないかもしれません。

例:
=======
john = null; // overwrite the reference

*!*
// the object previously referenced by john is stored inside the array
// therefore it won't be garbage-collected
// we can get it as array[0]
*/!*
```

Similar to that, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected.

For instance:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

<<<<<<< HEAD
john = null; // 参照を上書きします

*!*
// john は map の中に保持されています
// map.keys() で取得することができます
*/!*
```

`WeakMap` はこの点で根本的に異なります。これらはキーオブジェクトのガベージコレクションを妨げることはありません。

例でその意味するところを見ていきましょう。

## WeakMap

`Map` との最初の違いは、WeakMap のキーはプリミティブな値ではなくオブジェクトでなければならないことです:
=======
john = null; // overwrite the reference

*!*
// john is stored inside the map,
// we can get it by using map.keys()
*/!*
```

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects.

Let's see what it means on examples.

## WeakMap

The first difference between [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is that keys must be objects, not primitive values:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let weakMap = new WeakMap();

let obj = {};

<<<<<<< HEAD
weakMap.set(obj, "ok"); // 正常に動作します (オブジェクトのキー)

*!*
// キーに文字列は使えません
weakMap.set("test", "Whoops"); // エラー, "test" はオブジェクトではないため
*/!*
```

いま、オブジェクトをキーとして使用し、そのオブジェクトへの参照が他にない場合、自動的にメモリ(と map)から削除されます。
=======
weakMap.set(obj, "ok"); // works fine (object key)

*!*
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
*/!*
```

Now, if we use an object as the key in it, and there are no other references to that object -- it will be removed from memory (and from the map) automatically.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

<<<<<<< HEAD
john = null; // 参照を上書きします

// john はメモリから削除されます!
```

上の例を通常の `Map` の場合と比べて見てください。`WeakMap` のキーとしてのみ `john` が存在する場合、自動的に削除されます。

`WeakMap` は繰り返しと、メソッド `keys()`, `values()`, `entries()` をサポートしません。そのため、すべてのキーや値を取得する方法はありません。

`WeakMap` は次のメソッドのみを持っています:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key, value)`
- `weakMap.has(key)`

なぜこのような制限があるのでしょうか？これは技術的な理由です。もしオブジェクトがすべての他の参照を失った場合(上のコードの `john` のように)、自動的に削除されます。しかし、技術的には *いつクリーンアップが発生するか* は正確には指定されていません。

それはJavaScriptエンジンが決定します。エンジンはすぐにメモリのクリーンアップを実行するか、待ってより多くの削除が発生した後にクリーンアップするかを選択できます。従って、技術的には`WeakMap` の現在の要素数はわかりません。エンジンがクリーンアップしている/していない、または部分的にそれをしているかもしれません。このような理由から、`WeakMap` 全体にアクセスするメソッドはサポートされていません。

さて、どこでこのようなものが必要なのでしょう？

## ユースケース: additional data

`WeakMap` のアプリケーションの主な領域は、 *追加のデータ格納* です。

別のコード、おそらくサードパーティライブラリに "属する" オブジェクトを操作していて、それに関連付けられたデータをいくつか保存したい場合、それは元のオブジェクトが生きている間だけ存在している必要があります。このとき、`WeakMap` はまさに必要とされるものです。

キーとしてオブジェクトを使用して、`WeakMap` にデータを格納し、オブジェクトがガベージコレクションされたとき、データも同様自動的に消えます。

```js
weakMap.set(john, "secret documents");
// もし john がなくなった場合、秘密のドキュメントは破壊されるでしょう
```

例を見てみましょう。

例えば、ユーザの訪問カウントを保持するコードがあるとします。情報は map に保持されています。ユーザオブジェクトがキーであり、訪問カウントがその値です。ユーザが離れたとき（そのオブジェクトがガベージコレクションされる）、もうそのユーザの訪問カウントは保持する必要はありません。

これは、 `Map` を使用したカウント関数の例です:
=======
john = null; // overwrite the reference

// john is removed from memory!
```

Compare it with the regular `Map` example above. Now if `john` only exists as the key of `WeakMap` -- it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it.

`WeakMap` has only the following methods:

- [`weakMap.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set)
- [`weakMap.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get)
- [`weakMap.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete)
- [`weakMap.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has)

Why such a limitation? That's for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically, the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now, where do we need such a data structure?

## Use case: additional data

The main area of application for `WeakMap` is an *additional data storage*.

If we're working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive - then `WeakMap` is exactly what's needed.

We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Let's look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don't want to store their visit count anymore.

Here's an example of a counting function with `Map`:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

<<<<<<< HEAD
// 訪問カウントを増やす
=======
// increase the visits count
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
また、これはコードの別の部分で、おそらく上の関数を使用する別のファイルです:
=======
And here's another part of the code, maybe another file using it:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// 📁 main.js
let john = { name: "John" };

<<<<<<< HEAD
countUser(john); // 訪問をカウント

// あとで john が離脱したとき
john = null;
```

このとき、`john` オブジェクトはガベージコレクションされるべきですが、`visitsCountMap` のキーなので、メモリに残ったままです。

ユーザが削除されたとき、`visitsCountMap` をクリーンアップする必要があります。そうしないと、メモリ内で無限に大きくなります。このようなクリーニングは複雑なアーキテクチャでは面倒な作業になりえます。

代わりに `WeakMap` に切り替えることで回避できます:
=======
countUser(john); // count his visits

// later john leaves us
john = null;
```

Now, `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.

We need to clean `visitsCountMap` when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to `WeakMap` instead:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

<<<<<<< HEAD
// 訪問数を増加
=======
// increase the visits count
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
これで、`visitsCountMap` をクリーンアップする必要はありません。`WeakMap` のキーを除いたすべての手段で `john` オブジェクトが到達不可能になった後、`WeakMap` からそのキーによる情報とともに、メモリからは削除されます。

## ユースケース: キャッシュ

もう一つの一般的な例はキャッシュです。関数からの結果を保持（"キャッシュ"）できるので、同じオブジェクトに対する将来の呼び出しで再利用することができます。 

これを実現するために、`Map`（最適ではないシナリオ）が利用できます:
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable, by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.

## Use case: caching

Another common example is caching. We can store ("cache") results from a function, so that future calls on the same object can reuse it.

To achieve that, we can use `Map` (not optimal scenario):
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
// 📁 cache.js
let cache = new Map();

<<<<<<< HEAD
// 計算し結果を覚える
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* に対する計算結果 */;

    cache.set(obj, result);
=======
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
    return result;
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
  }

  return cache.get(obj);
}

*!*
<<<<<<< HEAD
// ここで、別のファイルで process() を使用します。
*/!*

// 📁 main.js
let obj = {/* オブジェクトがあるとします */};

let result1 = process(obj); // 計算します

// ...その後、別の場所で呼ばれるとします...
let result2 = process(obj); // キャッシュから取得した、記憶された結果が使われます

// ...後ほど、オブジェクトがこれ以上は不要になったとき
obj = null;

alert(cache.size); // 1 (なんと! オブジェクトは依然としてキャッシュされており、メモリを食っています!)
```

同じオブジェクトので `process(obj)` の複数回の呼び出しに対して、初回だけ結果の計算を行い、その後は `cache` から値を取ります。デメリットは、オブジェクトがこれ以上不要になったとき、`cache` のクリーンアップが必要なことです。

`Map` を `WeakMap` に置き換えた場合、この問題は消えます。キャッシュされた結果はオブジェクトのガベージコレクト後、自動的にメモリから削除されます。
=======
// Now we use process() in another file:
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears. The cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

<<<<<<< HEAD
// 計算し結果を覚える
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* に対する計算結果 */;

    cache.set(obj, result);
=======
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
    return result;
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

<<<<<<< HEAD
// ...後ほど、オブジェクトがこれ以上は不要になったとき
obj = null;

// WeakMap なので cache.size は取得できません
// が、0 あるいはすぐに 0 になります
// オブジェクトがガベージコレクトされると、キャッシュされたデータも同様に削除されます。
=======
// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
```

## WeakSet

<<<<<<< HEAD
`WeakSet` も同様に動作します:

- `Set` に似ていますが、`WeakSet` へはオブジェクトのみ追加できます（プリミティブではありません）
- オブジェクトは、別の場所から到達可能である間、`Set` に存在します。
- `Set` 同様、`add`, `has`, `delete` をサポートしますが、`size`, `keys()` とイテレーションはサポートしません。

"弱い" ので、追加の格納場所としても使えます。ですが、任意のデータではなく、むしろ "はい/いいえ" という boolean ライクな情報を記憶するためのものとしてです。`WeakSet` のメンバーはオブジェクトについてなにかを意味する場合があります。

例えば、ユーザを `WeakSet` に追加して、サイトにアクセスしたユーザを追跡できます。:
=======
[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports [`add`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/add), [`has`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/has) and [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Weakset/delete), but not `size`, `keys()` and no iterations.

Being "weak", it also serves as additional storage. But not for arbitrary data, rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
visitedSet.add(john); // John が訪問
visitedSet.add(pete); // 次に Pete
visitedSet.add(john); // John 再び

// visitedSet は 2 ユーザいます

// John が訪問したかどうかをチェック
alert(visitedSet.has(john)); // true

// Mary が訪問したかをチェック
=======
visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
alert(visitedSet.has(mary)); // false

john = null;

<<<<<<< HEAD
// visitedSet は自動的にクリーンアップされます。
```

最も注目すべき `WeakMap` と `WeakSet` の制限は、イテレーションの欠如と現在のすべてのコンテンツを取得することができないことです。これは不便に見えるかもしれませんが、`WeakMap/WeakSet` がこれらの主要なジョブ -- 別の場所に保存/管理されているオブジェクトのデータの "追加の" 保管場所になること -- をするのを妨げることはありません。

## サマリ

`WeakMap` は `Map` ライクなコレクションであり、オブジェクトのみがキーとして許可され、他の手段でそのオブジェクトが到達不可能になると、関連付けされた値と一緒に削除されます。

`WeakSet` は `Set` ライクなコレクションであり、オブジェクトのみが保管でき、他の手段でそのオブジェクトが到達不可能になると、それらも削除されます。

これらの主なアドバンテージは、オブジェクトに対して弱い参照を持っていることです。なので、ガベージコレクションで容易に削除できます。

なお、これには `clear`, `size`, `keys`, `values` などのサポートがないという代償が伴います。 

`WeakMap` と `WeakSet` は "主要な" オブジェクト保管場所に加え、"2つ目の" データ構造として使用されます。一旦オブジェクトが主要な保管場所から削除されると、それが `WeakMap` のキーまたは `WeakSet` でのみ見つかった場合、オブジェクトは自動的にクリーンアップされます。
=======
// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and the inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

[`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Their main advantages are that they have weak reference to objects, so they can easily be removed by garbage collector.

That comes at the cost of not having support for `clear`, `size`, `keys`, `values`...

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "primary" object storage. Once the object is removed from the primary storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> 3d7abb9cc8fa553963025547717f06f126c449b6
