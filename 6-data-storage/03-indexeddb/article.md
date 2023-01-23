libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'

---

# IndexedDB

<<<<<<< HEAD
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
=======
IndexedDB is a database that is built into a browser, much more powerful than `localStorage`.

- Stores almost any kind of values by keys, multiple key types.
- Supports transactions for reliability.
- Supports key range queries, indexes.
- Can store much bigger volumes of data than `localStorage`.

That power is usually excessive for traditional client-server apps. IndexedDB is intended for offline apps, to be combined with ServiceWorkers and other technologies.

The native interface to IndexedDB, described in the specification <https://www.w3.org/TR/IndexedDB>, is event-based.

We can also use `async/await` with the help of a promise-based wrapper, like <https://github.com/jakearchibald/idb>. That's pretty convenient, but the wrapper is not perfect, it can't replace events for all cases. So we'll start with events, and then, after we gain an understanding of IndexedDb, we'll use the wrapper.

```smart header="Where's the data?"
Technically, the data is usually stored in the visitor's home directory, along with browser settings, extensions, etc.

Different browsers and OS-level users have each their own independant storage.
```

## Open database

To start working with IndexedDB, we first need to `open` (connect to) a database.

The syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let openRequest = indexedDB.open(name, version);
```

<<<<<<< HEAD
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
=======
- `name` -- a string, the database name.
- `version` -- a positive integer version, by default `1` (explained below).

We can have many databases with different names, but all of them exist within the current origin (domain/protocol/port). Different websites can't access each other's databases.

The call returns `openRequest` object, we should listen to events on it:
- `success`: database is ready, there's the "database object" in `openRequest.result`, we should use it for further calls.
- `error`: opening failed.
- `upgradeneeded`: database is ready, but its version is outdated (see below).

**IndexedDB has a built-in mechanism of "schema versioning", absent in server-side databases.**

Unlike server-side databases, IndexedDB is client-side, the data is stored in the browser, so we, developers, don't have full-time access to it. So, when we have published a new version of our app, and the user visits our webpage, we may need to update the database.

If the local database version is less than specified in `open`, then a special event `upgradeneeded` is triggered, and we can compare versions and upgrade data structures as needed.

The `upgradeneeded` event also triggers when the database doesn't yet exist (technically, its version is `0`), so we can perform the initialization.

Let's say we published the first version of our app.

Then we can open the database with version `1` and perform the initialization in an `upgradeneeded` handler like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
<<<<<<< HEAD
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
=======
  // triggers if the client had no database
  // ...perform initialization...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continue working with database using db object
};
```

Then, later, we publish the 2nd version.

We can open it with version `2` and perform the upgrade like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

<<<<<<< HEAD
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
=======
openRequest.onupgradeneeded = function(event) {
  // the existing database version is less than 2 (or it doesn't exist)
  let db = openRequest.result;
  switch(event.oldVersion) { // existing db version
    case 0:
      // version 0 means that the client had no database
      // perform initialization
    case 1:
      // client had version 1
      // update
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};
```

<<<<<<< HEAD
`openRequest.onsuccess` の後、データベースオブジェクトは `openRequest.result` にあります。以降の操作でこれを使っていきます。

データベースを削除するには:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror で結果を追跡します
```


## オブジェクトストア

オブジェクトストアは IndexedDB の中心となる概念です。他のデータベースでは "テーブル" や "コレクション" と呼ばれているものです。これはデータが格納される場所です。データベースは複数のストアを持つことがあります。: 1つはユーザ用、もう１つは商品用、などです。

"オブジェクトストア" という名前ではありますが、プリミティブを格納することも可能です。

**複雑なオブジェクト含め、ほぼどんな値でも格納することができます。**

IndexedDB は [standard serialization algorithm](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) を使用してオブジェクトを複製し格納します。これは `JSON.stringify` に似ていますが、より強力で遥かに多くのデータタイプを格納することができます。

格納できないオブジェクトの例は、循環参照を持つオブジェクトです。このようなオブジェクトはシリアライズ可能ではありません。`JSON.stringify` も失敗します。

**ストア内のすべての値には一意となる `key` が必要です。**

キーは次のいずれかのタイプでなければなりません: number, date, string, binary, または array。これは一意なオブジェクト識別子で、キーを使って値の検索/削除/更新をすることができます。

![](indexeddb-structure.svg)

`localStorage` と同様、ストアに値を追加するときにキーを指定できます。これはプリミティブ値を格納するのに適しています。 しかし、オブジェクトを格納するとき、IndexedDB はオブジェクトプロパティをキーとして設定することを可能にし、それはとても便利です。もしくは、キーを自動生成することもできます。

オブジェクトストアを作成する構文:
=======
Please note: as our current version is `2`, the `onupgradeneeded` handler has a code branch for version `0`, suitable for users that are accessing for the first time and have no database, and also for version `1`, for upgrades.

And then, only if `onupgradeneeded` handler finishes without errors, `openRequest.onsuccess` triggers, and the database is considered successfully opened.

To delete a database:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror tracks the result
```

```warn header="We can't open a database using an older open call version"
If the current user database has a higher version than in the `open` call, e.g. the existing DB version is `3`, and we try to `open(...2)`, then that's an error, `openRequest.onerror` triggers.

That's rare, but such a thing may happen when a visitor loads outdated JavaScript code, e.g. from a proxy cache. So the code is old, but his database is new.

To protect from errors, we should check `db.version` and suggest a page reload. Use proper HTTP caching headers to avoid loading the old code, so that you'll never have such problems.
```

### Parallel update problem

As we're talking about versioning, let's tackle a small related problem.

Let's say:
1. A visitor opened our site in a browser tab, with database version `1`.
2. Then we rolled out an update, so our code is newer.
3. And then the same visitor opens our site in another tab.

So there's a tab with an open connection to DB version `1`, while the second one attempts to update it to version `2` in its `upgradeneeded` handler.

The problem is that a database is shared between two tabs, as it's the same site, same origin. And it can't be both version `1` and `2`. To perform the update to version `2`, all connections to version 1 must be closed, including the one in the first tab.

In order to organize that, the `versionchange` event triggers on the "outdated" database object. We should listen for it and close the old database connection (and probably suggest a page reload, to load the updated code).

If we don't listen for the `versionchange` event and don't close the old connection, then the second, new connection won't be made. The `openRequest` object will emit the `blocked` event instead of `success`. So the second tab won't work.

Here's the code to correctly handle the parallel upgrade. It installs the `onversionchange` handler, that triggers if the current database connection becomes outdated (db version is updated elsewhere) and closes the connection.

```js
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  *!*
  db.onversionchange = function() {
    db.close();
    alert("Database is outdated, please reload the page.")
  };
  */!*

  // ...the db is ready, use it...
};

*!*
openRequest.onblocked = function() {
  // this event shouldn't trigger if we handle onversionchange correctly

  // it means that there's another open connection to the same database
  // and it wasn't closed after db.onversionchange triggered for it
};
*/!*
```

...In other words, here we do two things:

1. The `db.onversionchange` listener informs us about a parallel update attempt, if the current database version becomes outdated.
2. The `openRequest.onblocked` listener informs us about the opposite situation: there's a connection to an outdated version elsewhere, and it doesn't close, so the newer connection can't be made.

We can handle things more gracefully in `db.onversionchange`, prompt the visitor to save the data before the connection is closed and so on. 

Or, an alternative approach would be to not close the database in `db.onversionchange`, but instead use the `onblocked` handler (in the new tab) to alert the visitor, tell him that the newer version can't be loaded until they close other tabs.

These update collisions happen rarely, but we should at least have some handling for them, at least an `onblocked` handler, to prevent our script from dying silently.

## Object store

To store something in IndexedDB, we need an *object store*.

An object store is a core concept of IndexedDB. Counterparts in other databases are called "tables" or "collections". It's where the data is stored. A database may have multiple stores: one for users, another one for goods, etc.

Despite being named an "object store", primitives can be stored too.

**We can store almost any value, including complex objects.**

IndexedDB uses the [standard serialization algorithm](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) to clone-and-store an object. It's like `JSON.stringify`, but more powerful, capable of storing much more datatypes.

An example of an object that can't be stored: an object with circular references. Such objects are not serializable. `JSON.stringify` also fails for such objects.

**There must be a unique `key` for every value in the store.**     

A key must be one of these types - number, date, string, binary, or array. It's a unique identifier, so we can search/remove/update values by the key.

![](indexeddb-structure.svg)

As we'll see very soon, we can provide a key when we add a value to the store, similar to `localStorage`. But when we store objects, IndexedDB allows setting up an object property as the key, which is much more convenient. Or we can auto-generate keys.

But we need to create an object store first.

The syntax to create an object store:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
db.createObjectStore(name[, keyOptions]);
```

<<<<<<< HEAD
操作は同期であり、`await` は必要ないことに留意してください。

- `name` はストア名です。e.g. 本用に `"books"` など
- `keyOptions` は2つのプロパティのうち1つを持つオプションのオブジェクトです。
  - `keyPath` -- IndexedDBがキーをして使用するオブジェクトプロパティのパスです。e.g. `id. 
  - `autoIncrement` -- `true` の場合、新しく格納されたオブジェクトのキーは、インクリメントされる数値として、自動的に生成されます。

何もオプションを指定しない場合は、あとでオブジェクトを格納するときに明示的にキーを指定する必要があります。

例えば、このオブジェクトストアはキーとして `id` プロパティを使用します。:
=======
Please note, the operation is synchronous, no `await` needed.

- `name` is the store name, e.g. `"books"` for books,
- `keyOptions` is an optional object with one of two properties:
  - `keyPath` -- a path to an object property that IndexedDB will use as the key, e.g. `id`.
  - `autoIncrement` -- if `true`, then the key for a newly stored object is generated automatically, as an ever-incrementing number.

If we don't supply `keyOptions`, then we'll need to provide a key explicitly later, when storing an object.

For instance, this object store uses `id` property as the key:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
db.createObjectStore('books', {keyPath: 'id'});
```

<<<<<<< HEAD
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
=======
**An object store can only be created/modified while updating the DB version, in `upgradeneeded` handler.**

That's a technical limitation. Outside of the handler we'll be able to add/remove/update the data, but object stores can only be created/removed/altered during a version update.

To perform a database version upgrade, there are two main approaches:

1. We can implement per-version upgrade functions: from 1 to 2, from 2 to 3, from 3 to 4 etc. Then, in `upgradeneeded` we can compare versions (e.g. old 2, now 4) and run per-version upgrades step by step, for every intermediate version (2 to 3, then 3 to 4).
2. Or we can just examine the database: get a list of existing object stores as `db.objectStoreNames`. That object is a [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist) that provides `contains(name)` method to check for existance. And then we can do updates depending on what exists and what doesn't.

For small databases the second variant may be simpler.

Here's the demo of the second approach:

```js
let openRequest = indexedDB.open("db", 2);

// create/upgrade the database without version checks
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // if there's no "books" store
    db.createObjectStore('books', {keyPath: 'id'}); // create it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};
```

<<<<<<< HEAD
オブジェクトストアを削除するには:
=======
To delete an object store:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
db.deleteObjectStore('books')
```

<<<<<<< HEAD
## トランザクション

"トランザクション" という用語は一般的で、多くのデータベースで使われています。

トランザクションはグループ操作であり、すべて成功したか/すべて失敗したかのいずれかになります。

例えば、ある人が何かを購入するとき、次のことが必要です。:
1. 口座からお金を引き落とします。
2. 購入者の持ち物に購入した商品を追加します。

もしも最初の処理が完了し、その後、例えば停電などで上手く処理できず次の処理が失敗すると、非常にまずいでしょう。どちらも成功する(購入完了)もしくは失敗する(少なくとも購入者はお金は引かれておらず、リトライできる)べきです。

トランザクションはそれを保証します。

**IndexedDB でのすべてのデータ操作はトランザクション内で行わなければなりません。**

トランザクションを開始するには:
=======
## Transactions

The term "transaction" is generic, used in many kinds of databases.

A transaction is a group of operations, that should either all succeed or all fail.

For instance, when a person buys something, we need to:

1. Subtract the money from their account.
2. Add the item to their inventory.

It would be pretty bad if we complete the 1st operation, and then something goes wrong, e.g. lights out, and we fail to do the 2nd. Both should either succeed (purchase complete, good!) or both fail (at least the person kept their money, so they can retry).

Transactions can guarantee that.

**All data operations must be made within a transaction in IndexedDB.**

To start a transaction:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
db.transaction(store[, type]);
```

<<<<<<< HEAD
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
=======
- `store` is a store name that the transaction is going to access, e.g. `"books"`. Can be an array of store names if we're going to access multiple stores.
- `type` – a transaction type, one of:
  - `readonly` -- can only read, the default.
  - `readwrite` -- can only read and write the data, but not create/remove/alter object stores.

There's also `versionchange` transaction type: such transactions can do everything, but we can't create them manually. IndexedDB automatically creates a `versionchange` transaction when opening the database, for `upgradeneeded` handler. That's why it's a single place where we can update the database structure, create/remove object stores.

```smart header="Why are there different types of transactions?"
Performance is the reason why transactions need to be labeled either `readonly` and `readwrite`.

Many `readonly` transactions are able to access the same store concurrently, but `readwrite` transactions can't. A `readwrite` transaction "locks" the store for writing. The next transaction must wait before the previous one finishes before accessing the same store.
```

After the transaction is created, we can add an item to the store, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("books", "readwrite"); // (1)

<<<<<<< HEAD
// 操作するためにオブジェクトストアを取得
=======
// get an object store to operate on it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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

<<<<<<< HEAD
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

上の例では、トランザクションを開始して、`add` リクエストを行いましたが、前に述べたように、トランザクションには複数のリクエストを関連付けることも可能です。そしてそれらはすべて成功か失敗かのどちらかでないといけません。トランザクションを終了としてマークする（これ以上リクエストがない）にはどのようにしたらよいでしょうか。

一言で言うと: そのようなことはしません。

仕様の次のバージョン 3.0 では、おそらくトランザクションを手動で終了させる方法があるでしょうが、今のところ、2.0 にはありません。

**すべてのトランザクションの要求が終了し、[microtasks queue](info:microtask-queue) が空になると、自動的にコミットされます。**

通常、トランザクションはすべてのリクエストが完了し、現在のコードが終了したときにコミットすると想定できます。

なので、上の例ではトランザクションを終了させるための特別な呼び出しは必要ありません。

トランザクション自動コミットの原則には重要な副作用があります。トランザクションの途中で `fetch`, `setTimeout` といった非同期操作を挿入することができません。IndexedDB はそれらが終わるまでトランザクションを待機させません。

以下のコードでは、行 `(*)` の `request2` は失敗します。トランザクションはすでにコミットされており、ここではどんなリクエストも行うことができないためです: 
=======
There were basically four steps:

1. Create a transaction, mentioning all the stores it's going to access, at `(1)`.
2. Get the store object using `transaction.objectStore(name)`, at `(2)`.
3. Perform the request to the object store `books.add(book)`, at `(3)`.
4. ...Handle request success/error `(4)`, then we can make other requests if needed, etc.

Object stores support two methods to store a value:

- **put(value, [key])**
    Add the `value` to the store. The `key` is supplied only if the object store did not have `keyPath` or `autoIncrement` option. If there's already a value with the same key, it will be replaced.

- **add(value, [key])**
    Same as `put`, but if there's already a value with the same key, then the request fails, and an error with the name `"ConstraintError"` is generated.

Similar to opening a database, we can send a request: `books.add(book)`, and then wait for `success/error` events.

- The `request.result` for `add` is the key of the new object.
- The error is in `request.error` (if any).

## Transactions' autocommit

In the example above we started the transaction and made `add` request. But as we stated previously, a transaction may have multiple associated requests, that must either all succeed or all fail. How do we mark the transaction as finished, with no more requests to come?

The short answer is: we don't.

In the next version 3.0 of the specification, there will probably be a manual way to finish the transaction, but right now in 2.0 there isn't.

**When all transaction requests are finished, and the [microtasks queue](info:microtask-queue) is empty, it is committed automatically.**

Usually, we can assume that a transaction commits when all its requests are complete, and the current code finishes.

So, in the example above no special call is needed to finish the transaction.

Transactions auto-commit principle has an important side effect. We can't insert an async operation like `fetch`, `setTimeout` in the middle of a transaction. IndexedDB will not keep the transaction waiting till these are done.

In the code below, `request2` in the line `(*)` fails, because the transaction is already committed, and can't make any request in it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
これは `fetch` が非同期操作、macrotask であるためです。トランザクションはブラウザが macrotask の実行を開始する前にクローズされます。

IndexedDB 仕様の作成者は、トランザクションは短命であるべきだと考えています。主にパフォーマンス上の理由からです。

特に、`readwrite` トランザクションは書き込みのためにストアを "ロック" します。したがって、アプリケーションの一部が `books` オブジェクトストア上で `readwrite` を開始した場合、同じことがしたかったアプリケーションの別の部分は待機しなければなりません。新たなトランザクションは、最初のトランザクションが終了するまで "ハング" します。 トランザクションに時間がかかると、奇妙な遅延につながる可能性があります。

では何をすればよいでしょうか？

上の例では、新たなリクエスト `(*)` の直前に新しい `db.transaction` を作成することができます。

ですが、１つのトランザクション内で操作をまとめたい場合には、IndexedDB トランザクション部分と "その他" の非同期部分に分割するのがさらに良い方法でしょう。

まず、`fetch` をして必要に応じてデータを準備します。その後、トランザクションを作成しすべてのデータベースリクエストを実行すると、うまく機能します。

正常に完了した瞬間を検知するには、`transaction.oncomplete`  イベントをリッスンします:
=======
That's because `fetch` is an asynchronous operation, a macrotask. Transactions are closed before the browser starts doing macrotasks.

Authors of IndexedDB spec believe that transactions should be short-lived. Mostly for performance reasons.

Notably, `readwrite` transactions "lock" the stores for writing. So if one part of the application initiated `readwrite` on `books` object store, then another part that wants to do the same has to wait: the new transaction "hangs" till the first one is done. That can lead to strange delays if transactions take a long time.

So, what to do?

In the example above we could make a new `db.transaction` right before the new request `(*)`.

But it will be even better, if we'd like to keep the operations together, in one transaction, to split apart IndexedDB transactions and "other" async stuff.

First, make `fetch`, prepare the data if needed, afterwards create a transaction and perform all the database requests, it'll work then.

To detect the moment of successful completion, we can listen to `transaction.oncomplete` event:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("books", "readwrite");

<<<<<<< HEAD
// ...操作を実行します...
=======
// ...perform operations...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

transaction.oncomplete = function() {
  console.log("Transaction is complete");
};
```

<<<<<<< HEAD
`complete` だけがトランザクション全体が保存されたことを保証します。個々のリクエストは成功したかもしれませんが、最終的な書き込み操作は失敗する可能性があります（例. I/O エラーなど）

トランザクションを手動で停止するには、以下を呼び出します:
=======
Only `complete` guarantees that the transaction is saved as a whole. Individual requests may succeed, but the final write operation may go wrong (e.g. I/O error or something).

To manually abort the transaction, call:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
transaction.abort();
```

<<<<<<< HEAD
これにより、その中のリクエストにより行われたすべての変更をキャンセルし、`transaction.onabort` イベントをトリガーします。

## エラーハンドリング

書き込みリクエストは失敗する可能性があります。

これは、われわれ側で発生しうるエラーだけでなく、トランザクション自体とは関連しない理由から発生することも予想されます。例えば、ストレージ容量を超えた場合です。そのため、このようなケースを処理する準備ができている必要があります。

**リクエストが失敗すると、トランザクションは自動的に中止され、すべての変更がキャンセルされます。**

ケースによっては、既存の変更をキャンセルせずに失敗を処理（例えば別のリクエストを試みる）し、トランザクションを継続したいことがあります。これは可能です。`request.onerror` ハンドラでは、`event.preventDefault()` 呼び出しをすることで、トランザクションを中止しないようにすることができます。

以下の例は、すでに存在するキーと同じキー（`id`）で新しい本が追加されています。この場合、`store.add` メソッドは `"ConstraintError"` を生成します。この例ではトランザクションをキャンセルせずに処理しています。:
=======
That cancels all modification made by the requests in it and triggers `transaction.onabort` event.


## Error handling

Write requests may fail.

That's to be expected, not only because of possible errors at our side, but also for reasons not related to the transaction itself. For instance, the storage quota may be exceeded. So we must be ready to handle such case.

**A failed request automatically aborts the transaction, canceling all its changes.**

In some situations, we may want to handle the failure (e.g. try another request), without canceling existing changes, and continue the transaction. That's possible. The `request.onerror` handler is able to prevent the transaction abort by calling `event.preventDefault()`.

In the example below a new book is added with the same key (`id`) as the existing one. The `store.add` method generates a `"ConstraintError"` in that case. We handle it without canceling the transaction:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
<<<<<<< HEAD
  // 同じ id のオブジェクトが既に存在する場合、ConstraintError が発生します
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // エラー処理
    event.preventDefault(); // トランザクションを中止しません
    // 別のキーを利用する？など
  } else {
    // unexpected error
    // 処理できないので、トランザクションは中止します
=======
  // ConstraintError occurs when an object with the same id already exists
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
    // use another key for the book?
  } else {
    // unexpected error, can't handle it
    // the transaction will abort
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

transaction.onabort = function() {
  console.log("Error", transaction.error);
};
```

<<<<<<< HEAD
### イベント委譲（delegation）

すべてのリクエストに対して onerror/onsuccess が必要でしょうか？毎回ではありません。ので、代わりにイベント委譲が利用できます。

**IndexedDB のイベントバブル: `request` -> `transaction` -> `database`.**

すべてのイベントは キャプチャリングとバブリングを持つ DOM イベントで、通常はバブリングステージだけが利用されます。

したがって、レポートや他の目的のために `db.onerror` ハンドラを使用してすべてのエラーをキャッチすることが可能です。


```js
db.onerror = function(event) {
  let request = event.target; // エラーが発生したリクエスト
=======
### Event delegation

Do we need onerror/onsuccess for every request? Not every time. We can use event delegation instead.

**IndexedDB events bubble: `request` -> `transaction` -> `database`.**

All events are DOM events, with capturing and bubbling, but usually only bubbling stage is used.

So we can catch all errors using `db.onerror` handler, for reporting or other purposes:

```js
db.onerror = function(event) {
  let request = event.target; // the request that caused the error
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

  console.log("Error", request.error);
};
```

<<<<<<< HEAD
...ですが、仮にエラーが完全に処理されたら？この場合はレポートしたくはありません。
`request.onerror` で `event.stopPropagation()` を利用することでバブリング、つまり `db.onerror` を停止することができます。
=======
...But what if an error is fully handled? We don't want to report it in that case.

We can stop the bubbling and hence `db.onerror` by using `event.stopPropagation()` in `request.onerror`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
<<<<<<< HEAD
    console.log("Book with such id already exists"); // エラー処理
    event.preventDefault(); // トランザクションを中止したくない
    event.stopPropagation(); // エラーをバブルしません、よく考えてください
  } else {
    // 何もしません
    // トランザクションは中止されます
    // transaction.onabort でエラーを扱うことができます
=======
    console.log("Book with such id already exists"); // handle the error
    event.preventDefault(); // don't abort the transaction
    event.stopPropagation(); // don't bubble error up, "chew" it
  } else {
    // do nothing
    // transaction will be aborted
    // we can take care of error in transaction.onabort
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};
```

<<<<<<< HEAD
## キーで検索する

オブジェクトストアの検索には主に２つの種類があります。:
1. キー or キー範囲によるもの。つまり、"books" ストレージでは `book.id` です。
2. 別のオブジェクトフィールドによるもの。例えば、`book.price`。

最初に、キーとキー範囲 `(1)` を取り扱いましょう。

検索を伴うメソッドは、正確なキー あるいはいわゆる "範囲クエリ"（"キー範囲" を指定する [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange)オブジェクト） のいずれかをサポートします。

範囲は次の呼び出しを使用して生成されます:

- `IDBKeyRange.lowerBound(lower, [open])` 意味: `≥lower` (`open` が true なら `>lower`)
- `IDBKeyRange.upperBound(upper, [open])` 意味: `≤upper` (`open` が true なら `<upper`)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` 意味: `lower` と `upper` の間. open フラグが true の場合、対応するキーは範囲に含まれません。
- `IDBKeyRange.only(key)` -- 単一の `key` のみで構成される範囲で、めったに使われません。

すべての検索メソッドは正確なキーまたはキー範囲のいずれかの `query` 引数を受け付けます。:

- `store.get(query)` -- キー or 範囲で、最初の値を検索します。
- `store.getAll([query], [count])` -- すべての値を検索します。`count` が指定されている場合はその数で制限されます。
- `store.getKey(query)` -- クエリを満たす最初のキーを検索します。通常は範囲です。
- `store.getAllKeys([query], [count])` -- クエリを満たすすべてのキーを検索します。通常は範囲で、`count` が指定されている場合はその数までです。
- `store.count([query])` -- クエリを満たすキーの総数を取得しまｓ．通常は範囲です。

例えば、ストアに大量の本(books)があるとします。`id` フィールドはキーなので、これらすべてのメソッドは `id` で検索ができること、忘れないでください。

リクエスト例:

```js
// 単一の本を取得
books.get('js')

// 'css' <= id <= 'html' の本を取得
books.getAll(IDBKeyRange.bound('css', 'html'))

// id < 'html' の本を取得
books.getAll(IDBKeyRange.upperBound('html', true))

// すべての本を取得
books.getAll()

// id > 'js' のすべてのキーを取得
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="オブジェクトストアは常にソートされています。"
オブジェクトストアは内部的に、キーにより値をソートしています。

そのため、多くの値を返すリクエストは、常にキー順にソートされた結果を返します。
```


## index 付きの任意のフィールドで検索する

他のオブジェクトフィールドで検索するには、"index" と呼ばれる追加のデータ構造を生成する必要があります。

index は特定のオブジェクトフィールドを追跡するストアへの "アドオン" です。そのフィールドの値ごとに、その値を持つオブジェクトのキーのリストを格納します。以下により詳細な図があります。

構文:
=======
## Searching

There are two main types of search in an object store:

1. By a key value or a key range. In our "books" storage that would be a value or range of values of `book.id`.
2. By another object field, e.g. `book.price`. This required an additional data structure, named "index".

### By key

First let's deal with the first type of search: by key.

Searching methods support both exact key values and so-called "ranges of values" -- [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) objects that specify an acceptable "key range".

`IDBKeyRange` objects are created using following calls:

- `IDBKeyRange.lowerBound(lower, [open])` means: `≥lower` (or `>lower` if `open` is true)
- `IDBKeyRange.upperBound(upper, [open])` means: `≤upper` (or `<upper` if `open` is true)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` means: between `lower` and `upper`. If the open flags is true, the corresponding key is not included in the range.
- `IDBKeyRange.only(key)` -- a range that consists of only one `key`, rarely used.

We'll see practical examples of using them very soon.

To perform the actual search, there are following methods. They accept a `query` argument that can be either an exact key or a key range:

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

// get books with 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// get books with id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true))

// get all books
books.getAll()

// get all keys, where id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="Object store is always sorted"
An object store sorts values by key internally.

So requests that return many values always return them in sorted by key order.
```

### By a field using an index

To search by other object fields, we need to create an additional data structure named "index".

An index is an "add-on" to the store that tracks a given object field. For each value of that field, it stores a list of keys for objects that have that value. There will be a more detailed picture below.

The syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
objectStore.createIndex(name, keyPath, [options]);
```

<<<<<<< HEAD
- **`name`** -- index 名,
- **`keyPath`** -- index が追跡すべきオブジェクトフィールドのパス（将来そのフィールドで検索します）
- **`option`** -- 次のプロパティをもつオプションのオブジェクト:
  - **`unique`** -- true の場合、ストアには `keyPath` で指定された値をもつオブジェクトが1つしかないことを示します。重複を追加しようとした場合、index はエラーを生成することでそれを強制します。
  - **`multiEntry`** -- `keyPath` の値が配列の場合にのみ使われます。この場合、デフォルトでは index は配列全体をキーとして扱いますが、`multiEntry` が true の場合は、index は配列内の各値のストアオブジェクトのリストを維持します。したがって、配列要素は index キーになります。

われわれの例では、`id` でキー設定された本を格納しています。

ここで、`price` で検索したいとしましょう。

まず、index を作成する必要があります。オブジェクトストア同様、`upgradeneeded` で行わなければなりません。:

```js
openRequest.onupgradeneeded = function() {
  // index はここ、バージョン変更のトランザクションの中で作成する必要があります
=======
- **`name`** -- index name,
- **`keyPath`** -- path to the object field that the index should track (we're going to search by that field),
- **`option`** -- an optional object with properties:
  - **`unique`** -- if true, then there may be only one object in the store with the given value at the `keyPath`. The index will enforce that by generating an error if we try to add a duplicate.
  - **`multiEntry`** -- only used if the value on `keyPath` is an array. In that case, by default, the index will treat the whole array as the key. But if `multiEntry` is true, then the index will keep a list of store objects for each value in that array. So array members become index keys.

In our example, we store books keyed by `id`.

Let's say we want to search by `price`.

First, we need to create an index. It must be done in `upgradeneeded`, just like an object store:

```js
openRequest.onupgradeneeded = function() {
  // we must create the index here, in versionchange transaction
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = books.createIndex('price_idx', 'price');
*/!*
};
```

<<<<<<< HEAD
- index は `price` フィールドを追跡します。
- price（価格）はユニークではないので、同じ価格で複数の本が存在する可能性があります。そのため、`unique` オプションは設定しません。
- price（価格）は配列ではないので、`multiEntry` フラグは適用されません。

`inventory` が4冊の本があるとします。これは `index` が何であるかを正確に示す図です:

![](indexeddb-index.svg)

既に述べた通り、`price` （2つ目の引数）の各値の index は、その 価格 をもつキーの一覧を保持します。

index は自動で最新状態が維持されるので、気にする必要は有りません。

いま、特定の価格で検索がしたい場合、単に index に対して同じ検索方メソッドを適用するだけです。:
=======
- The index will track `price` field.
- The price is not unique, there may be multiple books with the same price, so we don't set `unique` option.
- The price is not an array, so `multiEntry` flag is not applicable.

Imagine that our `inventory` has 4 books. Here's the picture that shows exactly what the `index` is:

![](indexeddb-index.svg)

As said, the index for each value of `price` (second argument) keeps the list of keys that have that price.

The index keeps itself up to date automatically, we don't have to care about it.

Now, when we want to search for a given price, we simply apply the same search methods to the index:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
<<<<<<< HEAD
    console.log("Books", request.result); // price=10 の本の配列
=======
    console.log("Books", request.result); // array of books with price=10
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  } else {
    console.log("No such books");
  }
};
```

<<<<<<< HEAD
`IDBKeyRange` で範囲を作成し、安い/高い本を探すこともできます:

```js
// price <= 5 の本を見つける
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

index は内部的には追跡されているオブジェクトフィールド（このケースでは `price`）でソートされています。なので、検索するとき、結果もまた `price` でソートされています。

## ストアから削除する

`delete` メソッドはクエリによって削除する値を調べます。呼び出し形式は `getAll` と同じです:

- **`delete(query)`** -- クエリにマッチする値を削除します

例:
```js
// id='js' の本を削除します
books.delete('js');
```

価格 あるいは別のオブジェクトフィールドを元に本を削除したい場合は、最初に index でキーを見つけ、その後に `delete` を呼び出します。:

```js
// price = 5 のキーを見つける
=======
We can also use `IDBKeyRange` to create ranges and looks for cheap/expensive books:

```js
// find books where price <= 5
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

Indexes are internally sorted by the tracked object field, `price` in our case. So when we do the search, the results are also sorted by `price`.

## Deleting from store

The `delete` method looks up values to delete by a query, the call format is similar to `getAll`:

- **`delete(query)`** -- delete matching values by query.

For instance:

```js
// delete the book with id='js'
books.delete('js');
```

If we'd like to delete books based on a price or another object field, then we should first find the key in the index, and then call `delete`:

```js
// find the key where price = 5
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

<<<<<<< HEAD
すべての削除するには:
```js
books.clear(); // ストレージをクリアします
```

## カーソル（Cursors）

`getAll/getAllKeys` のようなメソッドは キー/値 の配列を返します。

ですが、オブジェクトストレージは巨大になり、利用可能なメモリよりも大きくなる可能性があります。`getAll` はすべてのレコードを配列として取得することはできないでしょう。

何をしたらよいでしょう？

カーソルはそれを回避する手段を提供します。

***カーソル* は与えられたクエリでオブジェクトストレージを横断する特別なオブジェクトで、一度に1つのキー/値を返すため、メモリを節約します。**

オブジェクトストアは内部的にはキーでソートされているので、カーソルはキー順（デフォルトでは昇順）でストアを移動します。

構文:
```js
// getAll と似ていますが カーソルに対してです:
let request = store.openCursor(query, [direction]);

// 値ではなくキーを得るには（getAllKeysのような）: store.openKeyCursor
```

- **`query`** はキーまたはキー範囲で、`getAll` と同じです。
- **`direction`** はオプションの引数で、使用する順序です:
  - `"next"` -- デフォルトで, カーソルは最も小さいキーのレコードから上に移動します。
  - `"prev"` -- 逆順です: 最も大きなキーを持つレコードから下に移動します。
  - `"nextunique"`, `"prevunique"` -- 上と同じですが、同じキーを持つレコードをスキップします（index 上のカーソルのみ。例: price=5 の複数の本の場合、最初の1冊だけが返却されます）。

**カーソルの主な違いは `request.onsuccess` が複数回トリガーされることです: 各結果に対し1度トリガーされます。**

これは、カーソルの使用例です:
=======
To delete everything:

```js
books.clear(); // clear the storage.
```

## Cursors

Methods like `getAll/getAllKeys` return an array of keys/values.

But an object storage can be huge, bigger than the available memory. Then `getAll` will fail to get all records as an array.

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

<<<<<<< HEAD
// カーソルで見つかった各本に対して呼び出されます
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id フィールド)
    let value = cursor.value; // book オブジェクト
=======
// called for each book found by the cursor
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id field)
    let value = cursor.value; // book object
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

<<<<<<< HEAD
主なカーソルメソッドは以下です:

- `advance(count)` -- カーソルを `count` 数進め、値をスキップします。
- `continue([key])` -- マッチした範囲の次の値にカーソルを進めます（あるいは指定された場合は、その `key` の直後）

カーソルに一致する値がもっとあるか否かは、`onsuccess` を呼び出した後 `result` を見ることで、次のレコードを指すカーソルあるいは `undefined` が取得できます。

上記の例では、オブジェクトストア用のカーソルが作成されました。

しかし、index 上にカーソルを作成することもできます。御存知の通り、index を利用することでオブジェクトフィールドで検索することができます。index 上のカーソルはオブジェクトストア上のカーソルとまったく同じように機能します、つまり、一度に１つの値を返すことでメモリを節約します。

index 上のカーソルの場合、`cursor.key` は index キー（例, price ）であり、オブジェクトキーに対しては `cursor.primaryKey` プロパティを使用する必要があります:
=======
The main cursor methods are:

- `advance(count)` -- advance the cursor `count` times, skipping values.
- `continue([key])` -- advance the cursor to the next value in range matching (or immediately after `key` if given).

Whether there are more values matching the cursor or not -- `onsuccess` gets called, and then in `result` we can get the cursor pointing to the next record, or `undefined`.

In the example above the cursor was made for the object store.

But we also can make a cursor over an index. As we remember, indexes allow to search by an object field. Cursors over indexes do precisely the same as over object stores -- they save memory by returning one value at a time.

For cursors over indexes, `cursor.key` is the index key (e.g. price), and we should use `cursor.primaryKey` property for the object key:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// called for each record
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
<<<<<<< HEAD
    let primaryKey = cursor.primaryKey; // 次のオブジェクトストアキー(id フィールド)
    let value = cursor.value; // 次のオブジェクトストアオブジェクト (book オブジェクト)
    let key = cursor.key; // 次の index キー (price)
=======
    let primaryKey = cursor.primaryKey; // next object store key (id field)
    let value = cursor.value; // next object store object (book object)
    let key = cursor.key; // next index key (price)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

<<<<<<< HEAD
## Promise ラッパー

すべてのリクエストに `onsuccess/onerror` を追加するのはとても面倒な作業です。イベント委譲を使用することで、楽にできる場合があることがあります。例えば、トランザクション全体にハンドラを設定しますが、`async/await` ははるかに便利です。

このチャプターでは、薄いPromise ラッパー <https://github.com/jakearchibald/idb> を使ってみましょう。これは [promise 化](info:promisify) された IndexedDB メソッドを持つ、グローバルな `idb` オブジェクトを生成します。


すると、`onsuccess/onerror` の代わりに、次のように記述することができます:
=======
## Promise wrapper

Adding `onsuccess/onerror` to every request is quite a cumbersome task. Sometimes we can make our life easier by using event delegation, e.g. set handlers on the whole transactions, but `async/await` is much more convenient.

Let's use a thin promise wrapper <https://github.com/jakearchibald/idb> further in this chapter. It creates a global `idb` object with [promisified](info:promisify) IndexedDB methods.

Then, instead of `onsuccess/onerror` we can write like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
<<<<<<< HEAD
    // 初期化の実行
=======
    // perform the initialization
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
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
<<<<<<< HEAD

```

"通常の async コード" と "try...catch" だけになります。

### エラーハンドリング

エラーをキャッチしない場合、最も近い外側の `try...catch` までエラーがきます。

キャッチされなかったエラーは `window` オブジェクトの"未処理の prmise 拒否" イベントになります。

次のようにして、このようなエラーを処理することができます:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB ネイティブのリクエストオブジェクト
  let error = event.reason; //  未処理のエラーオブジェクト。request.error と同じ
=======
```

So we have all the sweet "plain async code" and "try..catch" stuff.

### Error handling

If we don't catch an error, then it falls through, till the closest outer `try..catch`.

An uncaught error becomes an "unhandled promise rejection" event on `window` object.

We can handle such errors like this:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB native request object
  let error = event.reason; //  Unhandled error object, same as request.error
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  ...report about the error...
});
```

<<<<<<< HEAD
### "非アクティブなトランザクション" の落とし穴

すでにご存知のように、ブラウザが現在のコードと microtask を実行するとすぐにトランザクションは自動コミットされます。そのため、トランザクション中に `fetch` のような *macrotask* を置いた場合、トランザクションはその終了を待たず自動コミットします。したがって、次のリクエストは失敗するでしょう。

promise ラッパーや `async/await` の場合も同じです。

これはトランザクションの途中に `fetch` がある例です:
=======
### "Inactive transaction" pitfall

As we already know, a transaction auto-commits as soon as the browser is done with the current code and microtasks. So if we put a *macrotask* like `fetch` in the middle of a transaction, then the transaction won't wait for it to finish. It just auto-commits. So the next request in it would fail.

For a promise wrapper and `async/await` the situation is the same.

Here's an example of `fetch` in the middle of the transaction:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
```

<<<<<<< HEAD
`fetch` `(*)` の後にある次の `inventory.add` は "非アクティブなトランザクション" エラーで失敗します。その時点でトランザクションは既にコミットされクローズされているためです。

回避策はネイテイブのIndexedDB を使用する場合と同じです。新たなトランザクションを作るか、単に物事を分割するか、です。
1. データを準備し、最初に必要なものをすべて取得します。
2. 次に、データベースに保存します。

### ネイティブオブジェクトを取得する

内部的には、ラッパーは `onerror/onsuccess` が追加されたネイテイブの IndexedDB リクエストを実行し、その結果を reject/resolve する promise を返します。

ほとんどの場合、これで問題なく動作します。例はライブラリのページ <https://github.com/jakearchibald/idb> にあります。

レアケースですが、オリジナルの `request` オブジェクトが必要なときは、promise の `promise.request` プロパティでアクセスすることができます:

```js
let promise = books.add(book); // promise を取得します (await は不要)

let request = promise.request; // ネイティブのリクエストオブジェクト
let transaction = request.transaction; // ネイティブのトランザクションオブジェクト

// ...do some native IndexedDB voodoo...

let result = await promise; // 必要であれば
```

## サマリ

IndexedDB はシンプルな key-value データベースであり、オフラインアプリケーションには十分強力なものでありつつ、使いやすいものです。

最良のマニュアルは仕様です。[現在のもの](https://www.w3.org/TR/IndexedDB-2/) は  2.0 ですが、[3.0](https://w3c.github.io/IndexedDB/) のいくつかのメソッド（大きな違いはありません）は部分的にサポートされています。

基本的な使用方法は次のフェーズで説明できます:

1. [idb](https://github.com/jakearchibald/idb) のような promise ラッパーを取得します。
2. データベースをオープンします `idb.openDb(name, version, onupgradeneeded)`
3. リクエストの場合:
    - トランザクションを作成します `db.transaction('books')` (必要に応じて読み書き)。
    - オブジェクトストアを取得します `transaction.objectStore('books')`。
4. 次に、キーで検索するためにオブジェクトストアのメソッドを直接呼び出します。
    - オブジェクトフィールドで検索する場合には index を作成します。
5. データがメモリに収まらない場合には、カーソルを使用します。

これは小さなデモアプリです:

[codetabs src="books" current="index.html"]
=======
The next `inventory.add` after `fetch` `(*)` fails with an "inactive transaction" error, because the transaction is already committed and closed at that time.

The workaround is the same as when working with native IndexedDB: either make a new transaction or just split things apart.

1. Prepare the data and fetch all that's needed first.
2. Then save in the database.

### Getting native objects

Internally, the wrapper performs a native IndexedDB request, adding `onerror/onsuccess` to it, and returns a promise that rejects/resolves with the result.

That works fine most of the time. The examples are at the lib page <https://github.com/jakearchibald/idb>.

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

The best manual is the specification, [the current one](https://www.w3.org/TR/IndexedDB-2/) is 2.0, but few methods from [3.0](https://w3c.github.io/IndexedDB/) (it's not much different) are partially supported.

The basic usage can be described with a few phrases:

1. Get a promise wrapper like [idb](https://github.com/jakearchibald/idb).
2. Open a database: `idb.openDb(name, version, onupgradeneeded)`
    - Create object storages and indexes in `onupgradeneeded` handler or perform version update if needed.
3. For requests:
    - Create transaction `db.transaction('books')` (readwrite if needed).
    - Get the object store `transaction.objectStore('books')`.
4. Then, to search by a key, call methods on the object store directly.
    - To search by an object field, create an index.
5. If the data does not fit in memory, use a cursor.

Here's a small demo app:

[codetabs src="books" current="index.html"]
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
