
# Map と Set

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

オブジェクトをキーとして使用することは、最も注目に値する重要な `Map` の機能の1つです。文字列キーの場合、`Object` で問題ありませんが、オブジェクトキーの場合はそうではありません。

やってみましょう:

```js run
let john = { name: "John" };

let visitsCountObj = {}; // オブジェクトを用意

visitsCountObj[john] = 123; // john オブジェクトをキーとして使用

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

`visitsCountObj` はオブジェクトなので、`john` などのすべてのキーを文字列に変換します。そのため、文字列キー `"[object Object]"` となります。間違いなくこれは望むものではありません。


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

## Object.entries: オブジェクトから Map を生成

`Map` を生成する時、キー／値のペアをもつ配列(または別の反復可能(iterable)) を渡すことができます:

```js
// [key, value] ペアの配列
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

オブジェクトのキー/値のペアの配列を、その形式で返す組み込みのメソッド [Object.entries(obj)](mdn:js/Object/entries) があります。

なので、次のようにオブジェクトから map の初期化をすることができます:

```js run
let obj = {
  name: "John",
  age: 30
};

*!*
let map = new Map(Object.entries(obj));
*/!*

alert( map.get('name') ); // John
```

ここで、`Object.entries` はキー/値のペアの配列を返します: `[ ["name","John"], ["age", 30] ]`。これは `Map` が必要とするものです。

## Object.fromEntries: Map から オブジェクト

つい先程、通常のオブジェクトから `Object.entries(obj)` を使用して `Map` を作成する方法を見ました。

逆のことをする `Object.fromEntries` メソッドもあります。: `[key, value]` ペアの配列が与えられ、そこからオブジェクトを作成します:

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

// prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

`Map` から通常のオブジェクトを取得する際に `Object.fromEntries` が使えます。

E.g. `Map` にデータを保持しているが、通常のオブジェクトを期待するサードパーティのコードにわたす必要がある場合。

やってみましょう:

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
let obj = Object.fromEntries(map.entries()); // 通常のオブジェクトを作成します (*)
*/!*

// 完了!
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

`map.entries()` への呼び出しはキー/値ペアの配列を返し、それはまさに `Object.fromEntries` の正しい形式です。

また、行 `(*)` をより短くすることもできます:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

これは同じことです。なぜなら、`Object.fromEntries` は引数に反復可能なオブジェクトを期待するからです。つまり配列である必要はありません。そして、`map` の標準のイテレーションは `map.entries()` と同じキー/値を返します。したがって、`map` と同じキー/値を持つプレーンなオブジェクトが取得できます。

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

## サマリ 

`Map` -- はキー付けされた値のコレクションです。

メソッドとプロパティです:

- `new Map([iterable])` -- 初期化ではオプションで `[key,value]` ペアの `iterable`(e.g. 配列 ) で map を作成します
- `map.set(key, value)` -- キーで値を保存します
- `map.get(key)` -- キーで値を返します。`key` が map にない場合は `undefined` が返ります
- `map.has(key)` -- `key` が存在すれば `true` を、そうでなければ `false` を返します
- `map.delete(key)` -- 指定されたキーで値を削除します
- `map.clear()` -- map からすべてを削除します
- `map.size` -- 現在の要素数を返します

通常の `Object` との違いです:

- 任意のキー、オブジェクトをキーにすることができます。
- 追加の便利なメソッド、`size` プロパティ。

`Set` -- はユニーク値のコレクションです。

メソッドとプロパティです:

- `new Set([iterable])` -- set を作ります。オプションで値の配列(任意の iterable が指定可能)からも可能です。
- `set.add(value)` -- 値を追加し、 set 自身を返します。
- `set.delete(value)` -- 値を削除し、`value` が呼び出し時に存在すれば `true`, そうでなければ `false` を返します。
- `set.has(value)` -- set の中に値が存在すれば `true` を返し、それ以外は `false` です。
- `set.clear()` -- set から全てを削除します。
- `set.size` -- set の要素数です。

`Map` と `Set` のイテレーションは常に挿入順で行われます。そのため、これらのコレクションが順序付けられていないとは言えませんが、要素を並べ替えたり、その番号で要素を直接取得することはできません。
