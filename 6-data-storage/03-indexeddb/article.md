libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'

---

# IndexedDB

InexedDB は組み込みのデータベースで、`localStorage` よりも遥かに強力です。

- key/value ストレージ: 値は何でもよく、複数のキーの型があります。
- 信頼性のためのトランザクションをサポートします。
- キー範囲のクエリ、インデックスをサポートします。
- `localStorage` よりもずっと多くのデータを格納することができます。

通常、この機能は伝統的なクライアント-サーバアプリケーションには過大です。IndexedDB は、ServiceWorkers や他のテクノロジーと組み合わせるオフラインアプリケーションを想定しています。

[仕様](https://www.w3.org/TR/IndexedDB) に記載されている IndexedDB のネイティブインターフェースは、イベントベースです。

[idb](https://github.com/jakearchibald/idb) のように、promise ベースのラッパーを使って `async/await` を使うこともできます。これは非常に便利ですが、ラッパーは完璧ではありません。すべてのケースのイベントを置き換えることはできないので、イベントから始めて、その後ラッパーを使用しましょう。

## データベースを開く

IndexedDB を使い始めるには、データベースを open します。

構文:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- 文字列。データベースの名前です。
- `version` -- 正の整数で表現されるバージョン。デフォルトは `1` (後述).

私たちは、異なる名前で多くのデータベースを持つことができ、それらはすべて現在のオリジン (domain/protocol/port) の中にあります。そのため、別のWebサイトは互いのデータベースにアクセスすることはできません。

呼び出し後、`openRequest` オブジェクトのイベントをリッスンする必要があります。:
- `success`: データベースの準備ができました。以降の処理ではデータベースオブジェクト `openRequest.result` を使います。
- `error`: 開くのに失敗しました。
- `upgradeneeded`: データベースのバージョンが古くなっています(下を見てください)。

**IndexedDB には、サーバサイドのデータベースにはない、組み込みの "スキーマバージョニング" の仕組みがあります。**

サーバサイドのデータベースとは異なり、IndexedDB はクライアントサイドでありデータは手元にはありません。しかし、新しいアプリを公開するとき、データベースの更新が必要なことがあります。

ローカルデータベースバージョンが `open` で指定されたものより小さい場合、特別なイベント `upgradeneeded` がトリガーされ、必要に応じてバージョンを比較し、データ構造を更新する事ができます。

このイベントはデータベースがまだ存在しなかった場合にも起こるので、初期化の実行をすることもできます。

例えば、最初にアプリを公開するときには、バージョン `1` で open し、`upgradeneeded` ハンドラで初期化を実行します。:

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // クライアントがデータベースを持っていない場合にトリガーされます
  // ...初期化を行います...
};

openRequest.onerror = function() {
  console.error("Error", openResult.error);
};”

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // db オブジェクトを仕様してデータベースを操作します
};
```

次のバージョンをリリースした時:

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

// 既存のデータベースのバージョンをチェックし、必要なら更新する:
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  switch(db.version) { // 既存の (古い) db のバージョン
    case 0:
      // バージョン 0 は、クライアントがデータベースを持っていないことを意味します
      // 初期化を行います
    case 1:
      // クライアントはバージョン 1
      // 最新版に更新します
  }
};
```

`openRequest.onsuccess` の後、データベースオブジェクトは `openRequest.result` にあります。以降の操作でこれを使っていきます。

データベースを削除するには:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror で結果を追跡します
```


## オブジェクトストア

オブジェクトストアは IndexedDB の中心となる概念です。他のテーブルでは "テーブル" や "コレクション" と呼ばれているものです。これはデータが格納される場所です。データベースは複数のストアを持つことがあります。: 1つはユーザ用、もう１つは商品用、などです。

"オブジェクトストア" という名前ではありますが、プリミティブを格納することも可能です。

**複雑なオブジェクト含め、ほぼどんな値でも格納することができます。**

IndexedDB は [standard serialization algorithm](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) を使用してオブジェクトを複製し格納します。これは `JSON>stringify` に似ていますが、より強力で遥かに多くのデータタイプを格納することができます。

格納できないオブジェクトの例は、循環参照を持つオブジェクトです。このようなオブジェクトはシリアライズ可能ではありません。`JSON.stringify` も失敗します。

**ストア内のすべての値には一意となる `key` が必要です。**

キーは次のいずれかのタイプでなければなりません: number, date, string, binary, または array。これは一意なオブジェクト識別子で、キーを使って値の検索/削除/更新をすることができます。

![](indexeddb-structure.png)

`localStorage` と同様、ストアに値を追加するときにキーを指定できます。これはプリミティブ値を格納するのに適しています。 しかし、オブジェクトを格納するとき、IndexedDB はオブジェクトプロパティをキーとして設定することを可能にし、それはとても便利です。もしくは、キーを自動生成することもできます。

オブジェクトストアを作成する構文:
```js
db.createObjectStore(name[, keyOptions]);
```

操作は同期であり、`await` は必要ないことに留意してください。

- `name` はストア名です。e.g. 本用に `"books"` など
- `keyOptions` は2つのプロパティのうち1つを持つオプションのオブジェクトです。
  - `keyPath` -- IndexedDBがキーをして使用するオブジェクトプロパティのパスです。e.g. `id. 
  - `autoIncrement` -- `true` の場合、新しく格納されたオブジェクトのキーは、インクリメントされる数値として、自動的に生成されます。

何もオプションを指定しない場合は、あとでオブジェクトを格納するときに明示的にキーを指定する必要があります。

例えば、このオブジェクトストアはキーとして `id` プロパティを使用します。:
```js
db.createObjectStore('books', {keyPath: 'id'});
```

**オブジェクトストアは `upgradeneeded` ハンドラ内で DB バージョンを更新している間にだけ、生成/変更することができます。**

これは技術的な制限によるものです。ハンドラの外側ではデータの追加/削除/更新が可能ですが、オブジェクトストアの変更はバージョンの更新中だけです。

アップグレードする方法は、主に2つあります:
1. バージョンを比較し、バージョンごとの操作を行います。
2. あるいは、`db.objectStoreNames` で既存のオブジェクトストアの一覧が取得できます。このオブジェクトは [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist) であり、存在チェックのためのメソッド `contains(name)` を提供します。そして存在するものに応じて更新を行います。

これは２つ目のアプローチの場合のデモです:

```js
let openRequest = indexedDB.open("db", 1);

// 存在しない場合には books のためのオブジェクトストアを作成する
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) {
    db.createObjectStore('books', {keyPath: 'id'});
  }
};
```

オブジェクトストアを削除するには:

```js
db.deleteObjectStore('books')
```

## トランザクション

"トランザクション" という用語は一般的で、多くのデータベースで使われています。

トランザクションはグループ操作であり、すべて成功したか/すべて失敗したかのいずれかになります。

例えば、ある人が何かを購入するとき、次のことが必要です。:
1. 口座からお金を引き落とします。
2. 購入者の持ち物に購入した商品を追加します。

もしも最初の処理が完了し、その後、例えば停電などで上手く処理できず次の処理が失敗すると、非常にまずいでしょう。どちらも成功する(購入完了)もしくは失敗する(少なくとも購入者はお金は引かれておらず、リトリできる)べきです。

トランザクションはそれを保証します。

**IndexedDB でのすべてのデータ操作はトランザクション内で行わなければなりません。**

トランザクションを開始するには:

```js run
db.transaction(store[, type]);
```

- `store` はトランザクションがアクセスするストア名です。e.g. `"books"`。複数のストアにアクセスする場合は、ストア名の配列を指定します。
- `type` はトランザクションのタイプです。以下のいずれかです:
  - `readonly`: 参照のみ。デフォルトです。
  - `readwrite`: 読み書き可能ですが、オブジェクトストアの変更はできません。

`versionchange` というトランザクションタイプもあります。: このようなトランザクションは何でもできますが、手動で作ることはできません。IndexedDBは、`updateneeded` ハンドラの場合、データベースを開くときに `versionchange` トランザクションを自動的に作成します。そのため、ここがデータベース構造の更新やオブジェクトストアの作成/削除が可能な唯一の場所になります。

```smart header="トランザクションタイプとは何のためのあるのでしょう？"
トランザクションが `readonly` か `readwrite` のいずれかにラベル付けされる必要があるのは、パフォーマンスが理由です。

多くの `readonly` トランザクションは同じストアに同時にアクセス可能ですが、`readwrite` トランザクションはできません。`readwrite` トランザクションは書き込みのためにストアを "ロック" します。次のトランザクションは、同じストアにアクセスする前にまえのトランザクションが終了するまで待たなければなりません。
```

トランザクションが作成されたら、次のようにしてストアにアイテムを追加することができます:

```js
let transaction = db.transaction("books", "readwrite"); // (1)

// 操作するためにオブジェクトストアを取得
*!*
let books = transaction.objectStore("books"); // (2)
*/!*

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

*!*
let request = books.add(book); // (3)
*/!*

request.onsuccess = function() { // (4)
  console.log("Book added to the store", request.result);
};

request.onerror = function() {
  console.log("Error", request.error);
};
```

基本的に4つのステップがあります。:

1. トランザクションを作成し、`(1)` でアクセスしようとしているすべてのストアについて言及します。
2. `(2)` で `transaction.objectStore（name）` を使ってストアオブジェクトを取得します。
3. `(3)` でオブジェクトストアにリクエストを実行します: `books.add(book)`。
4. ...`(4)` でリクエストの成功/エラー を処理し、必要に応じて他のリクエストをする、など。

オブジェクトストアは値を格納するための2つのメソッドをサポートしています。:

- **put(value, [key])**
    ストアに `value` を追加します。`key` は、オブジェクトストアが `keyPath` や `autoIncrement` オプションを持っていなかった場合にのみ提供されます。もし同じキーをもつ値がすでに存在している場合には、値は置き換えられます。

- **add(value, [key])**
    `put` と同じですが、同じキーを持つ値がすでに存在する場合、リクエストは失敗し、`"ConstraintError"` という名前のエラーが生成されます。

データベースを開くときと同じように、リクエストを送信(`books.add(book)`)し、`success/error` イベントをまちます。

- `add` の場合の `request.result` は新しいオブジェクトのキーです。
- エラーは `request.error` にあります(あれば)。

## トランザクションの自動コミット

上の例では、トランザクションを開始して、`add` リクエストを行いました。より多くのリクエストを行うことも可能です。トランザクションをどのようにして終了 ("コミット")するでしょうか？

一言で言うと: そうではありません。

仕様の次のバージョン 3.0 では、おそらくトランザクションを手動で終了させる方法があるでしょう。しかし、今のところ、2.0 にはありません。

**すべてのトランザクションの要求が終了し、[microtasks queue](info:microtask-queue) が空になると、自動的にコミットされます。**

```smart header="What's an \"empty microtask queue\"?"
The microtask queue is explained in [another chapter](info:async-await#microtask-queue). In short, an empty microtask queue means that for all settled promises their `.then/catch/finally` handlers are executed.

In other words, handling of finished promises and resuming "awaits" is done before closing the transaction.

That's a minor technical detail. If we're using `async/await` instead of low-level promise calls, then we can assume that a transaction commits when all its requests are done, and the current code finishes.
```

So, in the example above no special code is needed to finish the transaction.

Transactions auto-commit principle has an important side effect. We can't insert an async operation like `fetch`, `setTimeout` in the middle of transaction. IndexedDB will not keep the transaction waiting till these are done.

In the code below `request2` in line `(*)` fails, because the transaction is already committed, can't make any request in it:

```js
let request1 = books.add(book);

request1.onsuccess = function() {
  fetch('/').then(response => {
*!*
    let request2 = books.add(anotherBook); // (*)
*/!*
    request2.onerror = function() {
      console.log(request2.error.name); // TransactionInactiveError
    };
  });
};
```

That's because `fetch` is an asynchronous operation, a macrotask. Transactions are closed before the browser starts doing macrotasks.

Authors of IndexedDB spec believe that transactions should be short-lived. Mostly for performance reasons.

Notably, `readwrite` transactions "lock" the stores for writing. So if one part of application initiated `readwrite` on `books` object store, then another part that wants to do the same has to wait: the new transaction "hangs" till the first one is done. That can lead to strange delays if transactions take a long time.

So, what to do?

In the example above we could make a new `db.transaction` right before the new request `(*)`.

But it will be even better, if we'd like to keep the operations together, in one transaction, to split apart IndexedDB transactions and "other" async stuff.

First, make `fetch`, prepare the data if needed, afterwards create a transaction and perform all the database requests, it'll work then.

To detect the moment of successful completion, we can listen to `transaction.oncomplete` event:

```js
let transaction = db.transaction("books", "readwrite");

// ...perform operations...

transaction.oncomplete = function() {
  console.log("Transaction is complete");
};
```

Only `complete` guarantees that the transaction is saved as a whole. Individual requests may succeed, but the final write operation may go wrong (e.g. I/O error or something).

To manually abort the transaction, call:

```js
transaction.abort();
```

That cancels all modification made by the requests in it and triggers `transaction.onabort` event.


## Error handling

Write requests may fail.

That's to be expected, not only because of possible errors at our side, but also for reasons not related to the transaction itself. For instance, the storage quota may be exceeded. So we must be ready to handle such case.

**A failed request automatically aborts the transaction, canceling all its changes.**

Sometimes a request may fail with a non-critical error. We'd like to handle it in `request.onerror` and continue the transaction. Then, to prevent the transaction abort, we should call `event.preventDefault()`.

In the example below a new book is added with the same key (`id`). The `store.add` method generates a `"ConstraintError"` in that case. We handle it without canceling the transaction:

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // ConstraintError occurs when an object with the same id already exists
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
  } else {
    // unexpected error, can't handle it
    // the transaction will abort
  }
};

transaction.onabort = function() {
  console.log("Error", transaction.error);
};
```

### Event delegation

Do we need onerror/onsuccess for every request? Not every time. We can use event delegation instead.

**IndexedDB events bubble: `request` -> `transaction` -> `database`.**

All events are DOM events, with capturing and bubbling, but usually only bubbling stage is used.

So we can catch all errors using `db.onerror` handler, for reporting or other purposes:

```js
db.onerror = function(event) {
  let request = event.target; // the request that caused the error

  console.log("Error", request.error);
};
```

...But what if an error is fully handled? We don't want to report it in that case.

We can stop the bubbling and hence `db.onerror` by using `event.stopPropagation()` in `request.onerror`.

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
    event.stopPropagation(); // don't bubble error up, "chew" it
  } else {
    // do nothing
    // transaction will be aborted
    // we can take care of error in transaction.onabort
  }
};
```

## Searching by keys

There are two main ways to search in an object store:
1. By a key or a key range. That is: by `book.id` in our "books" storage.
2. By another object field, e.g. `book.price`. We need an index for that.

First let's deal with the keys and key ranges `(1)`.

Methods that involve searching support either exact keys or so-called "range queries" -- [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) objects that specify a "key range".

Ranges are created using following calls:

- `IDBKeyRange.lowerBound(lower, [open])` means: `>lower` (or `≥lower` if `open` is true)
- `IDBKeyRange.upperBound(upper, [open])` means: `<upper` (or `≤upper` if `open` is true)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` means: between `lower` and `upper`, with optional equality if the corresponding `open` is true.
- `IDBKeyRange.only(key)` -- a range that consists of only one `key`, rarely used.

All searching methods accept a `query` argument that can be either an exact key or a key range:

- `store.get(query)` -- search for the first value by a key or a range.
- `store.getAll([query], [count])` -- search for all values, limit by `count` if given.
- `store.getKey(query)` -- search for the first key that satisfies the query, usually a range.
- `store.getAllKeys([query], [count])` -- search for all keys that satisfy the query, usually a range, up to `count` if given.
- `store.count([query])` -- get the total count of keys that satisfy the query, usually a range.

For instance, we have a lot of books in our store. Remember, the `id` field is the key, so all these methods can search by `id`.

Request examples:

```js
// get one book
books.get('js')

// get books with 'css' < id < 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// get books with 'html' <= id
books.getAll(IDBKeyRange.lowerBound('html', true))

// get all books
books.getAll()

// get all keys: id >= 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="Object store is always sorted"
Object store sorts values by key internally.

So requests that return many values always return them in sorted by key order.
```


## Searching by any field with an index

To search by other object fields, we need to create an additional data structure named "index".

An index is an "add-on" to the store that tracks a given object field. For each value of that field, it stores a list of keys for objects that have that value. There will be a more detailed picture below.

The syntax:

```js
objectStore.createIndex(name, keyPath, [options]);
```

- **`name`** -- index name,
- **`keyPath`** -- path to the object field that the index should track (we're going to search by that field),
- **`option`** -- an optional object with properties:
  - **`unique`** -- if true, then there may be only one object in the store with the given value at the `keyPath`. The index will enforce that by generating an error if we try to add a duplicate.
  - **`multiEntry`** -- only used if there value on `keyPath` is an array. In that case, by default, the index will treat the whole array as the key. But if `multiEntry` is true, then the index will keep a list of store objects for each value in that array. So array members become index keys.

In our example, we store books keyed by `id`.

Let's say we want to search by `price`.

First, we need to create an index. It must be done in `upgradeneeded`, just like an object store:

```js
openRequest.onupgradeneeded = function() {
  // we must create the index here, in versionchange transaction
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = inventory.createIndex('price_idx', 'price');
*/!*
};
```

- The index will track `price` field.
- The price is not unique, there may be multiple books with the same price, so we don't set `unique` option.
- The price is not an array, so `multiEntry` flag is not applicable.

Imagine that our `inventory` has 4 books. Here's the picture that shows exactly what the `index` is:

![](indexeddb-index.png)

As said, the index for each value of `price` (second argument) keeps the list of keys that have that price.

The index keeps itself up to date automatically, we don't have to care about it.

Now, when we want to search for a given price, we simply apply the same search methods to the index:

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Books", request.result); // array of books with price=10
  } else {
    console.log("No such books");
  }
};
```

We can also use `IDBKeyRange` to create ranges and looks for cheap/expensive books:

```js
// find books where price < 5
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

Indexes are internally sorted by the tracked object field, `price` in our case. So when we do the search, the results are also sorted by `price`.

## Deleting from store

The `delete` method looks up values to delete by a query, just like `getAll`.

- **`delete(query)`** -- delete matching values by query.

For instance:
```js
// delete the book with id='js'
books.delete('js');
```

If we'd like to delete books based on a price or another object field, then we should first find the key in the index, and then call `delete`:

```js
// find the key where price = 5
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

To delete everything:
```js
books.clear(); // clear the storage.
```

## Cursors

Methods like `getAll/getAllKeys` return an array of keys/values.

But an object storage can be huge, bigger than the available memory.

Then `getAll` will fail to get all records as an array.

What to do?

Cursors provide the means to work around that.

**A *cursor* is a special object that traverses the object storage, given a query, and returns one key/value at a time, thus saving memory.**

As an object store is sorted internally by key, a cursor walks the store in key order (ascending by default).

The syntax:
```js
// like getAll, but with a cursor:
let request = store.openCursor(query, [direction]);

// to get keys, not values (like getAllKeys): store.openKeyCursor
```

- **`query`** is a key or a key range, same as for `getAll`.
- **`direction`** is an optional argument, which order to use:
  - `"next"` -- the default, the cursor walks up from the record with the lowest key.
  - `"prev"` -- the reverse order: down from the record with the biggest key.
  - `"nextunique"`, `"prevunique"` -- same as above, but skip records with the same key (only for cursors over indexes, e.g. for multiple books with price=5 only the first one will be returned).

**The main difference of the cursor is that `request.onsuccess` triggers multiple times: once for each result.**

Here's an example of how to use a cursor:

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// called for each book found by the cursor
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id field)
    let value = cursor.value; // book object
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

The main cursor methods are:

- `advance(count)` -- advance the cursor `count` times, skipping values.
- `continue([key])` -- advance the cursor to the next value in range matching or after key.

Whether there are more values matching the cursor or not -- `onsuccess` gets called, and then in `result` we can get the cursor pointing to the next record, or `undefined`.

In the example above the cursor was made for the object store.

But we also can make a cursor over an index. As we remember, indexes allow to search by an object field. Cursors over indexes to precisely the same as over object stores -- they save memory by returning one value at a timee.

For cursors over indexes, `cursor.key` is the index key (e.g. price), and we should use `cursor.primaryKey` property the object key:

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// called for each record
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.primaryKey; // next object store key (id field)
    let value = cursor.value; // next object store object (book object)
    let key = cursor.key; // next index key (price)
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

## Promise wrapper

Adding `onsuccess/onerror` to every request is quite a cumbersome task. Sometimes we can make our life easier by using event delegation, e.g. set handlers on the whole transactions, but `async/await` is much more convenient.

Let's use a thin promise wrapper <https://github.com/jakearchibald/idb> further in this chapter. It creates a global `idb` object with [promisified](info:promisify) IndexedDB methods.

Then, instead of `onsuccess/onerror` we can write like this:

```js
let db = await idb.openDb('store', 1, db => {
  if (db.oldVersion == 0) {
    // perform the initialization
    db.createObjectStore('books', {keyPath: 'id'});
  }
});

let transaction = db.transaction('books', 'readwrite');
let books = transaction.objectStore('books');

try {
  await books.add(...);
  await books.add(...);

  await transaction.complete;

  console.log('jsbook saved');
} catch(err) {
  console.log('error', err.message);
}

```

So we have all the sweet "plain async code" and "try..catch" stuff.

### Error handling

If we don't catch the error, then it falls through, just as usual.

An uncaught error becomes an "unhandled promise rejection" event on `window` object.

We can handle such errors like this:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB native request object
  let error = event.reason; //  Unhandled error object, same as request.error
  ...report about the error...
});
```

### "Inactive transaction" pitfall

A we know already, a transaction auto-commits as soon as the browser is done with the current code and microtasks. So if we put an *macrotask* like `fetch` in the middle of a transaction, then the transaction won't wait for it to finish. It just auto-commits. So the next request in it fails.

For a promise wrapper and `async/await` the situation is the same.

Here's an example of `fetch` in the middle of the transaction:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
```

The next `inventory.add` after `fetch` `(*)` fails with an "inactive transaction" error, because the transaction is already committed and closed at that time.

The workaround is same as when working with native IndexedDB: either make a new transaction or just split things apart.
1. Prepare the data and fetch all that's needed first.
2. Then save in the database.

### Getting native objects

Internally, the wrapper performs a native IndexedDB request, adding `onerror/onsuccess` to it, and returns a promise that rejects/resolves with the result.

That works most fine of the time. The examples are at the lib page <https://github.com/jakearchibald/idb>.

In few rare cases, when we need the original `request` object, we can access it as `promise.request` property of the promise:

```js
let promise = books.add(book); // get a promise (don't await for its result)

let request = promise.request; // native request object
let transaction = request.transaction; // native transaction object

// ...do some native IndexedDB voodoo...

let result = await promise; // if still needed
```

## Summary

IndexedDB can be thought of as a "localStorage on steroids". It's a simple key-value database, powerful enough for offline apps, yet simple to use.

The best manual is the specification, [the current one](https://w3c.github.io/IndexedDB) is 2.0, but few methods from [3.0](https://w3c.github.io/IndexedDB/) (it's not much different) are partially supported.

The usage can be described with a few phrases:

1. Get a promise wrapper like [idb](https://github.com/jakearchibald/idb).
2. Open a database: `idb.openDb(name, version, onupgradeneeded)`
    - Create object storages in indexes in `onupgradeneeded` handlers.
    - Update version if needed - either by comparing numbers or just checking what exists.
3. For requests:
    - Create transaction `db.transaction('books')` (readwrite if needed).
    - Get the object store `transaction.objectStore('books')`.
4. Then, to search by a key, call methods on the object store directly.
    - To search by an object field, create an index.
5. If the data does not fit in memory, use a cursor.

Here's a small demo app:

[codetabs src="books" current="index.html"]
