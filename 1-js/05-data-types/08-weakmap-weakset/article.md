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

```js
let john = { name: "John" };

let array = [ john ];

john = null; // 参照を上書きします

*!*
// 以前 john で参照されていたオブジェクトは配列内に格納されています
// そのため、ガベージコレクションされません。
// array[0] で取得することが可能です
*/!*
```

また、通常の `Map` のキーとしてオブジェクトを使うと、`Map` が存在している間はそのオブジェクトも存在します。これはメモリを占め、ガベージコレクションされないかもしれません。

例:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

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

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常に動作します (オブジェクトのキー)

*!*
// キーに文字列は使えません
weakMap.set("test", "Whoops"); // エラー, "test" はオブジェクトではないため
*/!*
```

いま、オブジェクトをキーとして使用し、そのオブジェクトへの参照が他にない場合、自動的にメモリ(と map)から削除されます。

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

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

別のコード、おそらくサードパーティライブラリに "属する" オブジェクトを操作していて、それに関連付けられたデータをいくつか保存したい場合、それは元のオブジェクトが生きている間だけ存在している必要があります。このとき、`WeakMap` はまたさに必要とされるものです。

キーとしてオブジェクトを使用して、`WeakMap` にデータを格納し、オブジェクトがガベージコレクションされたとき、データも同様自動的に消えます。

```js
weakMap.put(john, "secret documents");
// もし john がなくなった場合、秘密のドキュメントは破壊されるでしょう
```

例を見てみましょう。

例えば、ユーザの訪問カウントを保持するコードがあるとします。情報は map に保持されています。ユーザオブジェクトがキーであり、訪問カウントがその値です。ユーザが離れたとき（そのオブジェクトがガベージコレクションされる）、もうそのユーザの訪問カウントは保持する必要はありません。

これは、 `Map` を使用したカウント関数の例です:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 訪問カウントを増やす
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

また、これはコードの別の部分で、おそらく上の関数を使用する別のファイルです:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // 訪問をカウント

// あとで john が離脱したとき
john = null;
```

このとき、`john` オブジェクトはガベージコレクションされるべきですが、`visitsCountMap` のキーなので、メモリに残ったままです。

ユーザが削除されたとき、`visitsCountMap` をクリーンアップする必要があります。そうしないと、メモリ内で無限に大きくなります。このようなクリーニングは複雑なアーキテクチャでは面倒な作業になりえます。

代わりに `WeakMap` に切り替えることで回避できます:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// 訪問数を増加
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

これで、`visitsCountMap` をクリーンアップする必要はありません。`WeakMap` のキーを除いたすべての手段で `john` オブジェクトが到達不可能になった後、`WeakMap` からそのキーによる情報とともに、メモリからは削除されます。

## ユースケース: キャッシュ

もう一つの一般的な例はキャッシュです。関数からの結果を保持（"キャッシュ"）できるので、同じオブジェクトに対する将来の呼び出しで再利用することができます。 

これを実現するために、`Map`（最適ではないシナリオ）が利用できます:

```js run
// 📁 cache.js
let cache = new Map();

// 計算し結果を覚える
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* に対する計算結果 */;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
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

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// 計算し結果を覚える
function process(obj) {
  if (!cache.has(obj)) {
    let result = obj /* に対する計算結果 */;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...後ほど、オブジェクトがこれ以上は不要になったとき
obj = null;

// WeakMap なので cache.size は取得できません
// が、0 あるいはすぐに 0 になります
// オブジェクトがガベージコレクトされると、キャッシュされたデータも同様に削除されます。
```

## WeakSet

`WeakSet` も同様に動作します:

- `Set` に似ていますが、`WeakSet` へはオブジェクトのみ追加できます（プリミティブではありません）
- オブジェクトは、別の場所から到達可能である間、`Set` に存在します。
- `Set` 同様、`add`, `has`, `delete` をサポートしますが、`size`, `keys()` とイテレーションはサポートしません。

"弱い" ので、追加の格納場所としても使えます。ですが、任意のデータではなく、むしろ "はい/いいえ" の事実のためです。`WeakSet` のメンバーはオブジェクトについてなにかを意味する場合があります。

例えば、ユーザを `WeakSet` に追加して、サイトにアクセスしたユーザを追跡できます。:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John が訪問
visitedSet.add(pete); // 次に Pete
visitedSet.add(john); // John 再び

// visitedSet は 2 ユーザいます

// John が訪問したかどうかをチェック
alert(visitedSet.has(john)); // true

// Mary が訪問したかをチェック
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet は自動的にクリーンアップされます。
```

最も注目すべき `WeakMap` と `WeakSet` の制限は、イテレーションの欠如と現在のすべてのコンテンツを取得することができないことです。これは不便に見えるかもしれませんが、`WeakMap/WeakSet` がこれらの主要なジョブ -- 別の場所に保存/管理されているオブジェクトのデータの "追加の" 保管場所になること -- をするのを妨げることはありません。

## サマリ

`WeakMap` は `Map` ライクなコレクションであり、オブジェクトのみがキーとして許可され、他の手段でそのオブジェクトが到達不可能になると、関連付けされた値と一緒に削除されます。

`WeakSet` は `Set` ライクなコレクションであり、オブジェクトのみが保管でき、他の手段でそのオブジェクトが到達不可能になると、それらも削除されます。

これらの主なアドバンテージは、オブジェクトに対して弱い参照を持っていることです。なので、ガベージコレクションで容易に削除できます。

なお、これには `clear`, `size`, `keys`, `values` などのサポートがないという代償が伴います。 

`WeakMap` と `WeakSet` は "主要な" オブジェクト保管場所に加え、"2つ目の" データ構造として使用されます。一旦オブジェクトが主要な保管場所から削除されると、それが `WeakMap` のキーまたは `WeakSet` でのみ見つかった場合、オブジェクトは自動的にクリーンアップされます。
