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

もしも最初の処理が完了し、その後、例えば停電などで上手く処理できず次の処理が失敗すると、非常にまずいでしょう。どちらも成功する(購入完了)もしくは失敗する(少なくとも購入者はお金は引かれておらず、リトライできる)べきです。

トランザクションはそれを保証します。

**IndexedDB でのすべてのデータ操作はトランザクション内で行わなければなりません。**

トランザクションを開始するには:

```js
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

上の例では、トランザクションを開始して、`add` リクエストを行いましたが、前に述べたように、トランザクションには複数のリクエストを関連付けることも可能です。そしてそれらはすべて成功か失敗かのどちらかでないといけません。トランザクションを終了としてマークする（これ以上リクエストがない）にはどのようにしたらよいでしょうか。

一言で言うと: そのようなことはしません。

仕様の次のバージョン 3.0 では、おそらくトランザクションを手動で終了させる方法があるでしょうが、今のところ、2.0 にはありません。

**すべてのトランザクションの要求が終了し、[microtasks queue](info:microtask-queue) が空になると、自動的にコミットされます。**

通常、トランザクションはすべてのリクエストが完了し、現在のコードが終了したときにコミットすると想定できます。

なので、上の例ではトランザクションを終了させるための特別な呼び出しは必要ありません。

トランザクション自動コミットの原則には重要な副作用があります。トランザクションの途中で `fetch`, `setTimeout` といった非同期操作を挿入することができません。IndexedDB はそれらが終わるまでトランザクションを待機させません。

以下のコードでは、行 `(*)` の `request2` は失敗します。トランザクションはすでにコミットされており、ここではどんなリクエストも行うことができないためです: 

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

これは `fetch` が非同期操作、macrotask であるためです。トランザクションはブラウザが macrotask の実行を開始する前にクローズされます。

IndexedDB 仕様の作成者は、トランザクションは短命であるべきだと考えています。主にパフォーマンス上の理由からです。

特に、`readwrite` トランザクションは書き込みのためにストアを "ロック" します。したがって、アプリケーションの一部が `books` オブジェクトストア上で `readwrite` を開始した場合、同じことがしたかったアプリケーションの別の部分は待機しなければなりません。新たなトランザクションは、最初のトランザクションが終了するまで "ハング" します。 トランザクションに時間がかかると、奇妙な遅延につながる可能性があります。

では何をすればよいでしょうか？

上の例では、新たなリクエスト `(*)` の直前に新しい `db.transaction` を作成することができます。

ですが、１つのトランザクション内で操作をまとめたい場合には、IndexedDB トランザクション部分と "その他" の非同期部分に分割するのがさらに良い方法でしょう。

まず、`fetch` をして必要に応じてデータを準備します。その後、トランザクションを作成しすべてのデータベースリクエストを実行すると、うまく機能します。

正常に完了した瞬間を検知するには、`transaction.oncomplete`  イベントをリッスンします:

```js
let transaction = db.transaction("books", "readwrite");

// ...操作を実行します...

transaction.oncomplete = function() {
  console.log("Transaction is complete");
};
```

`complete` だけがトランザクション全体が保存されたことを保証します。個々のリクエストは成功したかもしれませんが、最終的な書き込み操作は失敗する可能性があります（例. I/O エラーなど）

トランザクションを手動で停止するには、以下を呼び出します:

```js
transaction.abort();
```

これにより、その中のリクエストにより行われたすべての変更をキャンセルし、`transaction.onabort` イベントをトリガーします。

## エラーハンドリング

書き込みリクエストは失敗する可能性があります。

これは、われわれ側で発生しうるエラーだけでなく、トランザクション自体とは関連しない理由から発生することも予想されます。例えば、ストレージ容量を超えた場合です。そのため、このようなケースを処理する準備ができている必要があります。

**リクエストが失敗すると、トランザクションは自動的に中止され、すべての変更がキャンセルされます。**

ケースによっては、既存の変更をキャンセルせずに失敗を処理（例えば別のリクエストを試みる）し、トランザクションを継続したいことがあります。これは可能です。`request.onerror` ハンドラでは、`event.preventDefault()` 呼び出しをすることで、トランザクションを中止しないようにすることができます。

以下の例は、すでに存在するキーと同じキー（`id`）で新しい本が追加されています。この場合、`store.add` メソッドは `"ConstraintError"` を生成します。この例ではトランザクションをキャンセルせずに処理しています。:

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // 同じ id のオブジェクトが既に存在する場合、ConstraintError が発生します
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // エラー処理
    event.preventDefault(); // トランザクションを中止しません
    // 別のキーを利用する？など
  } else {
    // unexpected error
    // 処理できないので、トランザクションは中止します
  }
};

transaction.onabort = function() {
  console.log("Error", transaction.error);
};
```

### イベント委譲（delegation）

すべてのリクエストに対して onerror/onsuccess が必要でしょうか？毎回ではありません。ので、代わりにイベント委譲が利用できます。

**IndexedDB のイベントバブル: `request` -> `transaction` -> `database`.**

すべてのイベントは キャプチャリングとバブリングを持つ DOM イベントで、通常はバブリングステージだけが利用されます。

したがって、レポートや他の目的のために `db.onerror` ハンドラを使用してすべてのエラーをキャッチすることが可能です。


```js
db.onerror = function(event) {
  let request = event.target; // エラーが発生したリクエスト

  console.log("Error", request.error);
};
```

...ですが、仮にエラーが完全に処理されたら？この場合はレポートしたくはありません。
`request.onerror` で `event.stopPropagation()` を利用することでバブリング、つまり `db.onerror` を停止することができます。

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Book with such id already exists"); // エラー処理
    event.preventDefault(); // トランザクションを中止したくない
    event.stopPropagation(); // エラーをバブルしません、よく考えてください
  } else {
    // 何もしません
    // トランザクションは中止されます
    // transaction.onabort でエラーを扱うことができます
  }
};
```

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

```js
objectStore.createIndex(name, keyPath, [options]);
```

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
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = books.createIndex('price_idx', 'price');
*/!*
};
```

- index は `price` フィールドを追跡します。
- price（価格）はユニークではないので、同じ価格で複数の本が存在する可能性があります。そのため、`unique` オプションは設定しません。
- price（価格）は配列ではないので、`multiEntry` フラグは適用されません。

`inventory` に4冊の本があるとします。これは `index` が何であるかを正確に示す図です:

![](indexeddb-index.svg)

既に述べた通り、`price` （2つ目の引数）の各値の index は、その 価格 をもつキーの一覧を保持します。

index は自動で最新状態が維持されるので、気にする必要は有りません。

いま、特定の価格で検索がしたい場合、単に index に対して同じ検索メソッドを適用するだけです。:

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Books", request.result); // price=10 の本の配列
  } else {
    console.log("No such books");
  }
};
```

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
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

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

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// カーソルで見つかった各本に対して呼び出されます
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // book key (id フィールド)
    let value = cursor.value; // book オブジェクト
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

主なカーソルメソッドは以下です:

- `advance(count)` -- カーソルを `count` 数進め、値をスキップします。
- `continue([key])` -- マッチした範囲の次の値にカーソルを進めます（あるいは指定された場合は、その `key` の直後）

カーソルに一致する値がもっとあるか否かは、`onsuccess` を呼び出した後 `result` を見ることで、次のレコードを指すカーソルあるいは `undefined` が取得できます。

上記の例では、オブジェクトストア用のカーソルが作成されました。

しかし、index 上にカーソルを作成することもできます。御存知の通り、index を利用することでオブジェクトフィールドで検索することができます。index 上のカーソルはオブジェクトストア上のカーソルとまったく同じように機能します、つまり、一度に１つの値を返すことでメモリを節約します。

index 上のカーソルの場合、`cursor.key` は index キー（例, price ）であり、オブジェクトキーに対しては `cursor.primaryKey` プロパティを使用する必要があります:

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// called for each record
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let primaryKey = cursor.primaryKey; // 次のオブジェクトストアキー(id フィールド)
    let value = cursor.value; // 次のオブジェクトストアオブジェクト (book オブジェクト)
    let key = cursor.key; // 次の index キー (price)
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No more books");
  }
};
```

## Promise ラッパー

すべてのリクエストに `onsuccess/onerror` を追加するのはとても面倒な作業です。イベント委譲を使用することで、楽にできる場合があることがあります。例えば、トランザクション全体にハンドラを設定しますが、`async/await` ははるかに便利です。

このチャプターでは、薄いPromise ラッパー <https://github.com/jakearchibald/idb> を使ってみましょう。これは [promise 化](info:promisify) された IndexedDB メソッドを持つ、グローバルな `idb` オブジェクトを生成します。


すると、`onsuccess/onerror` の代わりに、次のように記述することができます:

```js
let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
    // 初期化の実行
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

"通常の async コード" と "try...catch" だけになります。

### エラーハンドリング

エラーをキャッチしない場合、最も近い外側の `try...catch` までエラーがきます。

キャッチされなかったエラーは `window` オブジェクトの"未処理の prmise 拒否" イベントになります。

次のようにして、このようなエラーを処理することができます:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // IndexedDB ネイティブのリクエストオブジェクト
  let error = event.reason; //  未処理のエラーオブジェクト。request.error と同じ
  ...report about the error...
});
```

### "非アクティブなトランザクション" の落とし穴

すでにご存知のように、ブラウザが現在のコードと microtask を実行するとすぐにトランザクションは自動コミットされます。そのため、トランザクション中に `fetch` のような *macrotask* を置いた場合、トランザクションはその終了を待たず自動コミットします。したがって、次のリクエストは失敗するでしょう。

promise ラッパーや `async/await` の場合も同じです。

これはトランザクションの途中に `fetch` がある例です:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
```

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
