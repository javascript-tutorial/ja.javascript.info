
# Map, Set, WeakMap と WeakSet

今や、私たちは次のような複雑なデータ構造を知っています:

- キー付けされたコレクションを格納するオブジェクト
- 順序付けされたコレクションを格納する配列

しかし、実際にはこれだけでは不十分です。そのために、`Map` や `Set` が存在します。

## Map

[Map](mdn:js/Map) は `Object` と同じように、キー付されたデータ項目の集まりです。主な違いは `Map` は任意の型のキーを許可することです。

主なメソッドは次の通りです:

- `new Map()` -- 新しい map を作ります.
- `map.set(key, value)` -- キーで、値を格納します.
- `map.get(key)` -- 指定されたキーの値を返却します。map に存在しない `key` の場合には `undefined` になります.
- `map.has(key)` -- キーが存在する場合に `true` を返します。そうでなければ `false` になります.
- `map.delete(key)` -- キーで値を削除します.
- `map.clear()` -- map をクリアします.
- `map.size` -- 現在の要素の数です.

例:

```js run
let map = new Map();

map.set('1', 'str1');   // 文字列キー
map.set(1, 'num1');     // 数値キー
map.set(true, 'bool1'); // 真偽値キー

// 通常のオブジェクトを覚えていますか？キーを文字列に変換していました。
// Map は型を維持します。なので、これらは別ものです:
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

上の通り、オブジェクトとは違い、キーは文字列には変換されません。任意の型のキーが利用可能です。

**Map はキーとしてオブジェクトを使うこともできます。**

例:

```js run
let john = { name: "John" };

// 各ユーザに対し、訪問回数を保持しましょう
let visitsCountMap = new Map();

// john は map のキーです
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

オブジェクトをキーとして使うことは、最も重要で特筆すべき `Map` の機能の１つです。文字列キーを利用する場合は、`Object` で問題ありませんが、上記の例では、`Map` を通常の `Object` に置き換えるのは難しいでしょう。

`Map` が存在する前は、ユニークな識別子をオブジェクトに追加していました:

```js run
// id フィールドを追加します
let john = { name: "John", *!*id: 1*/!* };

let visitsCounts = {};

// id をキーに値を保持します
visitsCounts[john.id] = 123;

alert( visitsCounts[john.id] ); // 123
```

...しかし `Map` は遥かにエレガントです。


```smart header="`Map` はどのようにキーを比較するか"
等価のテストをするために、`Map` は [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) アルゴリズムを使います。大雑把には厳密等価 `===` と同じですが、違いは `NaN` は `NaN` と等しいとみなされる点です。なので、`NaN` も同様にキーとして使うことができます。

このアルゴリズムは変更したりカスタマイズすることはできません。
```


````smart header="チェーン"

`map.set` 呼び出しは map 自身を返すので、呼び出しを "チェーン" することができます:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

## オブジェクトから Map を生成

`Map` を生成する時、キー／値のペアをもつ配列(または別の反復可能(iterable)) を渡すことができます:

```js
// [key, value] ペアの配列
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);
```

オブジェクトのキー/値のペアの配列を、その形式で返す組み込みのメソッド [Object.entries(obj)](mdn:js/Object/entries) があります。

なので、次のようにオブジェクトから map の初期化をすることができます:

```js
let map = new Map(Object.entries({
  name: "John",
  age: 30
}));
```

ここで、`Object.entries` はキー/値のペアの配列を返します: `[ ["name","John"], ["age", 30] ]`。これは `Map` が必要とするものです。

## Map での繰り返し/ループ

`map` でループするためには３つのメソッドがあります:

- `map.keys()` -- キーに対する iterable を返します。
- `map.values()` -- 値に対する iterable を返します。
- `map.entries()` -- エントリ `[key, value]`　の iterable を返します。これは `for..of` でデフォルトで使われます。

例:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// キー(野菜)の反復
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomateos, onion
}

// 値(量)の反復 
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

// [key, value] エントリーの反復
for (let entry of recipeMap) { // recipeMap.entries() と同じ
  alert(entry); // cucumber,500 (など)
}
```

```smart header="挿入順が使われます"
繰り返しは値が挿入された順で行われます。通常の `Object` とは違い、`Map` はこの順番を保持しています。
```

それに加えて、`Map` は `Array` と同じように、組み込みの `forEach` メソッドを持っています。

```js
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```


## Set

`Set` -- は値の集まりで、それぞれの値は一度しか現れません。

主なメソッドは次の通りです:

- `new Set(iterable)` -- set を作ります。オプションで値の配列(任意の iterable が指定可能)からも可能です。
- `set.add(value)` -- 値を追加し、 set 自身を返します。
- `set.delete(value)` -- 値を削除し、`value` が呼び出し時に存在すれば `true`, そうでなければ `false` を返します。
- `set.has(value)` -- set の中に値が存在すれば `true` を返し、それ以外は `false` です。
- `set.clear()` -- set から全てを削除します。
- `set.size` -- set の要素数です。

例えば、訪問者全員を覚えておきたいです。が、繰り返し訪問しても重複しないようにしたいです。訪問者は一度だけ "カウント" される必要があります。

`Set` はそれに相応しいものです:

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// 訪問、何度も来るユーザもいます
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set はユニークな値のみをキープします
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (そして Pete と Mary)
}
```

`Set` の代替は、ユーザの配列と [arr.find](mdn:js/Array/find) を使って挿入毎に重複をチェックするコードです。しかし、このメソッドはすべての要素をチェックするため配列全体を見ます。そのためパフォーマンスははるかに悪いです。`Set` は一意性チェックを高速に行うよう、内部的に最適化されています。

## Set での繰り返し 

`for..of` または `forEach` を使うことで set をループすることができます:

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// forEach と同じ:
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

面白い点に注意してください。`Set` の中の `forEach` 関数は３つの引数を持っています: 値(value), 次に *再び値(valueAgain)*, 次にターゲットのオブジェクトです。実際、引数には同じ値が2回出現します。

これは `forEach` が3つの引数をもつ `Map` との互換性のために作られています。

- `set.keys()` -- 値に対する iterable なオブジェクトを返します。
- `set.values()` -- `set.keys` と同じで、`Map` との互換性のためです。
- `set.entries()` -- `[value, value]` のエントリのための iterable なオブジェクトを返します。`Map` の互換性のために存在します。

## WeakMap と WeakSet 

`WeakSet` はJavaScriptがメモリからそのアイテムを削除するのを妨げない、`Set` の特別な種類です。`WeakMap` は `Map` に対する同様のものです。

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
// john は配列内に格納されているので、ガベージコレクションされません。
// array[0] としてそれを取得することが可能です
*/!*
```

また、通常の Map のキーとしてオブジェクトを使うと、Map が存在している間はそのオブジェクトも存在します。これはメモリを占め、ガベージコレクションされないかもしれません。

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

`WeakMap/WeakSet` はこの点で根本的に異なります。これらはキーオブジェクトのガベージコレクションを妨げることはありません。

`WeakMap` を使って説明しましょう。

`Map` との最初の違いは、WeakMap のキーはプリミティブな値ではなくオブジェクトでなければならないことです:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常に動作します (オブジェクトのキー)

*!*
weakMap.set("test", "Whoops"); // エラー, "test" はプリミティブだからです
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

`WeakMap` のアイデアは、オブジェクトが存在している間だけ存在するオブジェクトに対して何かを格納することができる、と言うことです。しかし、何かを格納しているという事実だけで、オブジェクトを強制的に生存させることはしません。

```js
weakMap.put(john, "secret documents");
// もし john がなくなった場合、秘密のドキュメントは破壊されるでしょう
```

どこかにオブジェクトを格納するメインの場所を持ち、オブジェクトが存続している間だけ関連する追加情報を保持する必要がある、といった場合に便利です。

例を見てみましょう。

例えば、ユーザ毎の訪問回数を持つコードを持っているとします。情報は map に格納されており、ユーザがキーで、訪問回数が値です。ユーザが去ったとき、もう訪問回数の格納は不要です。

一つ目の方法は、各ユーザを追跡し、ユーザが去った際に手動で map から削除する方法です:

```js run
let john = { name: "John" };

// map: user => 訪問数
let visitsCountMap = new Map();

// john は map のキー
visitsCountMap.set(john, 123);

// 今 john は去りました。これ以上彼の情報は不要です
john = null;

*!*
// map の場合依然として残り続けるので、クリーンが必要です!
*/!*
alert( visitsCountMap.size ); // 1
// john は未だメモリに存在しています。Mapがキーとして使用しているためです
```

別の方法は `WeakMap` を使うことです:

```js
let john = { name: "John" };

let visitsCountMap = new WeakMap();

visitsCountMap.set(john, 123);

// 今 john は去りました。これ以上彼の情報は不要です
john = null;

// WeakMap 以外の参照がなくなりました
// オブジェクトはメモリと visitsCountMap 両方から自動的に削除されます
```

通常の `Map` での、ユーザが離れた後のクリーンアップはうんざりするタスクです: メインの格納域(変数または配列)から削除するだけでなく、`visitsCountMap` のような追加の格納域のクリーンアップも必要になります。また、ユーザがコードの一箇所で管理され、追加の構造は別の場所にあり、削除に関する情報が得られないようなより複雑なケースでは、煩雑になる可能性があります。

`WeakMap` は自動的にクリーンアップするので、物事をよりシンプルにすることができます。その中にある、上の例の訪問回数のような情報はキーオブジェクトが存在する間だけ生きています。

`WeakSet` も同じように振る舞います。:

- `Set` に似ていますが、`WeakSet` にはオブジェクトの追加だけができます(プリミティブは追加できません)。
- どこかから到達可能な間だけ、 set の中でオブジェクトが存在します。
- `Set` のように、`add`, `has`, `delete` をサポートしますが、`size`, `keys()` はサポートせず、反復処理もありません。

例えば、ある項目が確認済みかどうか追跡するために使うことができます:

```js
let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

// 配列要素(3項目)で埋めます
let unreadSet = new WeakSet(messages);

// message が未読かは unreadSet を見ることで確認できます
alert(unreadSet.has(messages[1])); // true
// 読んだ後にセットから取り除く
unreadSet.delete(messages[1]); // true

// そして、メッセージ履歴を shift すると、set は自動でクリーンアップされます
messages.shift();
// unreadSet をクリーンする必要はありません。
// 項目の正確な数をカウントするメソッドがないため、残念ながらここではお見せすることはできませんが、今は2つの要素になっています。
```

`WeakMap` と `WeakSet` の最も注目に値する制限は反復処理がないこと、また現在のすべての中身を取得することができないことです。それらは不便に見えるかもしれませんが、実際には、`WeakMap/WeakSet` の主な仕事(別の場所で格納/管理されているオブジェクトのための "追加" のデータ記憶域になる)を妨げることはありません。

## サマリ 

- `Map` -- はキー付けされた値のコレクションです。

    通常の `Object` との違いは次の通りです:

    - 任意のキー、オブジェクトをキーにすることができます。
    - 挿入した順番で反復処理します。
    - 追加の便利なメソッド、`size` プロパティがあります。

- `Set` -- ユニークな値のコレクションです。

    - 配列とは違い、要素の順序を変更することはできません。
    - 挿入した順序を保持します。

- `WeakMap` -- オブジェクトのみをキーとして許可し、他の手段でアクセスできなくなると削除を行う` Map`の変形です。

    - 構造全体に対する操作はサポートしていません: `size`、`clear()`、反復はありません。

- `WeakSet` -- はオブジェクトのみを格納し、他の手段でアクセスできなくなると削除する `Set` の変形です。

    - また、`size/clear()` や反復をサポートしていません。


`WeakMap` と `WeakSet` は "メインの" オブジェクト記憶域に加えて、"2つ目" のデータ構造として使われます。メインの記憶域からオブジェクトが削除されると、オブジェクトは `WeakMap/WeakSet` にしか残らず、自動的にクリーンアップされます。
