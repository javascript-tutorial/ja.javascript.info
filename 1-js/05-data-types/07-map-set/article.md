
<<<<<<< HEAD
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
=======
# Map and Set

Till now, we've learned about the following complex data structures:

- Objects are used for storing keyed collections.
- Arrays are used for storing ordered collections.

But that's not enough for real life. That's why `Map` and `Set` also exist.

## Map

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.

Methods and properties are:

- [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element (the key/value pair) by the key.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let map = new Map();

<<<<<<< HEAD
map.set('1', 'str1');   // 文字列キー
map.set(1, 'num1');     // 数値キー
map.set(true, 'bool1'); // 真偽値キー

// 通常のオブジェクトを覚えていますか？キーを文字列に変換していました。
// Map は型を維持します。なので、これらは別ものです:
=======
map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

<<<<<<< HEAD
上の通り、オブジェクトとは違い、キーは文字列には変換されません。任意の型のキーが利用可能です。

```smart header="`map[key]` は `Map` を使用する正しい方法ではありません"
例えば、`map[key] = 2` のように、`map[key]` でも動作しますが、これは `map` を通常の JavaScript オブジェクトとして扱っているので、対応するすべての制限（文字列/シンボルキーのみなど）があることを意味します。

なので、`map` メソッドを使用するべきです: `set`, `get` など.
```

**Map はキーとしてオブジェクトを使うこともできます。**

例:
=======
As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

```smart header="`map[key]` isn't the right way to use a `Map`"
Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (only string/symbol keys and so on).

So we should use `map` methods: `set`, `get` and so on.
```

**Map can also use objects as keys.**

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let john = { name: "John" };

<<<<<<< HEAD
// 各ユーザに対し、訪問回数を保持しましょう
let visitsCountMap = new Map();

// john は map のキーです
=======
// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```

<<<<<<< HEAD
オブジェクトをキーとして使用することは、最も注目に値する重要な `Map` の機能の1つです。同じことは `Object` ではカウントされません。`Object` ではキーとして文字列使用は問題ありませんが、キーとして別のオブジェクトを使用することはできません。

やってみましょう:
=======
Using objects as keys is one of the most notable and important `Map` features. The same does not count for `Object`. String as a key in `Object` is fine, but we can't use another `Object` as a key in `Object`.

Let's try:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let john = { name: "John" };
let ben = { name: "Ben" };

<<<<<<< HEAD
let visitsCountObj = {}; // オブジェクトを使用

visitsCountObj[ben] = 234; // ben オブジェクトをキーに使用
visitsCountObj[john] = 123; // john オブジェクトをキーに使用。ben オブジェクトは置換されます
=======
let visitsCountObj = {}; // try to use an object

visitsCountObj[ben] = 234; // try to use ben object as the key
visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123 
*/!*
```

<<<<<<< HEAD
`visitsCountObj` はオブジェクトなので、`john` などのすべてのキーを文字列に変換します。そのため、文字列キー `"[object Object]"` となります。間違いなくこれは望むものではありません。

```smart header="`Map` はどのようにキーを比較するか"
等価のテストをするために、`Map` は [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) アルゴリズムを使います。大雑把には厳密等価 `===` と同じですが、違いは `NaN` は `NaN` と等しいとみなされる点です。なので、`NaN` も同様にキーとして使うことができます。

このアルゴリズムは変更したりカスタマイズすることはできません。
```

````smart header="チェーン"
すべての `map.set` 呼び出しは map 自身を返すので、呼び出しを "チェーン" することができます:
=======
As `visitsCountObj` is an object, it converts all `Object` keys, such as `john` and `ben` above, to same string `"[object Object]"`. Definitely not what we want.

```smart header="How `Map` compares keys"
To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed or customized.
```

````smart header="Chaining"
Every `map.set` call returns the map itself, so we can "chain" the calls:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````

<<<<<<< HEAD

## Map での繰り返し/ループ

`map` でループするためには３つのメソッドがあります:

- `map.keys()` -- キーに対する iterable を返します。
- `map.values()` -- 値に対する iterable を返します。
- `map.entries()` -- エントリ `[key, value]`　の iterable を返します。これは `for..of` でデフォルトで使われます。

例:
=======
## Iteration over Map

For looping over a `map`, there are 3 methods:

- [`map.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) -- returns an iterable for keys,
- [`map.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values) -- returns an iterable for values,
- [`map.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

For instance:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

<<<<<<< HEAD
// キー(野菜)の反復
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomateos, onion
}

// 値(量)の反復 
=======
// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

<<<<<<< HEAD
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
// 各 (key, value) ペアに対して関数を実行
=======
// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="The insertion order is used"
The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

```js
// runs the function for each (key, value) pair
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

<<<<<<< HEAD
## Object.entries: オブジェクトから Map を生成

`Map` を生成する時、キー／値のペアをもつ配列(または別の反復可能(iterable)) を渡すことができます:

```js
// [key, value] ペアの配列
=======
## Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

```js run
// array of [key, value] pairs
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```

<<<<<<< HEAD
通常のオブジェクトがあり、そこから `Map` を生成したい場合は、オブジェクトのキー/値のペアの配列を、その形式で返す組み込みのメソッド [Object.entries(obj)](mdn:js/Object/entries) を使用できます。

なので、次のようにオブジェクトから map の初期化をすることができます:
=======
If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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

<<<<<<< HEAD
ここで、`Object.entries` はキー/値のペアの配列を返します: `[ ["name","John"], ["age", 30] ]`。これは `Map` が必要とするものです。


## Object.fromEntries: Map から オブジェクト

つい先程、通常のオブジェクトから `Object.entries(obj)` を使用して `Map` を作成する方法を見ました。

逆のことをする `Object.fromEntries` メソッドもあります。: `[key, value]` ペアの配列が与えられ、そこからオブジェクトを作成します:
=======
Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.


## Object.fromEntries: Object from Map

We've just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There's `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

<<<<<<< HEAD
// prices = { banana: 1, orange: 2, meat: 4 }
=======
// now prices = { banana: 1, orange: 2, meat: 4 }
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

alert(prices.orange); // 2
```

<<<<<<< HEAD
`Map` から通常のオブジェクトを取得する際に `Object.fromEntries` が使えます。

E.g. `Map` にデータを保持しているが、通常のオブジェクトを期待するサードパーティのコードにわたす必要がある場合。

やってみましょう:
=======
We can use `Object.fromEntries` to get a plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

*!*
<<<<<<< HEAD
let obj = Object.fromEntries(map.entries()); // 通常のオブジェクトを作成します (*)
*/!*

// 完了!
=======
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// done!
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<<<<<<< HEAD
`map.entries()` への呼び出しはキー/値ペアの配列を返し、それはまさに `Object.fromEntries` の正しい形式です。

また、行 `(*)` をより短くすることもできます:
=======
A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let obj = Object.fromEntries(map); // omit .entries()
```

<<<<<<< HEAD
これは同じことです。なぜなら、`Object.fromEntries` は引数に反復可能なオブジェクトを期待するからです。つまり配列である必要はありません。そして、`map` の標準のイテレーションは `map.entries()` と同じキー/値を返します。したがって、`map` と同じキー/値を持つプレーンなオブジェクトが取得できます。

## Set

`Set` は、特別タイプのコレクションで、"値の集合" （キーなし）です。それぞれの値は一度しか現れません。

主なメソッドは次の通りです:

- `new Set(iterable)` -- set を作ります。オプションで値の配列(任意の iterable が指定可能)からも可能です。
- `set.add(value)` -- 値を追加し、 set 自身を返します。
- `set.delete(value)` -- 値を削除し、`value` が呼び出し時に存在すれば `true`, そうでなければ `false` を返します。
- `set.has(value)` -- set の中に値が存在すれば `true` を返し、それ以外は `false` です。
- `set.clear()` -- set から全てを削除します。
- `set.size` -- set の要素数です。

主な特徴は同じ値での `set.add(value)` の繰り返しの呼び出しでは何もしないことです。`Set` では各値は一度しか現れないためです。

例えば、訪問者全員を覚えておきたいです。が、繰り返し訪問しても重複しないようにしたいです。訪問者は一度だけ "カウント" される必要があります。

`Set` はそれに相応しいものです:
=======
That's the same, because `Object.fromEntries` expects an iterable object as the argument. Not necessarily an array. And the standard iteration for `map` returns same key/value pairs as `map.entries()`. So we get a plain object with same key/values as the `map`.

## Set

A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) is a special type collection - "set of values" (without keys), where each value may occur only once.

Its main methods are:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value, returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.

The main feature is that repeated calls of `set.add(value)` with the same value don't do anything. That's the reason why each value appears in a `Set` only once.

For example, we have visitors coming, and we'd like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be "counted" only once.

`Set` is just the right thing for that:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
// 訪問、何度も来るユーザもいます
=======
// visits, some users come multiple times
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

<<<<<<< HEAD
// set はユニークな値のみをキープします
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (そして Pete と Mary)
}
```

`Set` の代替は、ユーザの配列と [arr.find](mdn:js/Array/find) を使って挿入毎に重複をチェックするコードです。しかし、このメソッドはすべての要素をチェックするため配列全体を見ます。そのためパフォーマンスははるかに悪いです。`Set` は一意性チェックを高速に行うよう、内部的に最適化されています。

## Set での繰り返し 

`for..of` または `forEach` を使うことで set をループすることができます:
=======
// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

<<<<<<< HEAD
// forEach と同じ:
=======
// the same with forEach:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

<<<<<<< HEAD
面白い点に注意してください。`Set` の中の `forEach` 関数は３つの引数を持っています: 値(value), 次に *再び値(valueAgain)*, 次にターゲットのオブジェクトです。実際、引数には同じ値が2回出現します。

これは `forEach` が3つの引数をもつ `Map` との互換性のために作られています。少しおかしく見えるかもしれません。が、特定ケースにおいて簡単に `Map` を `Set` に、またその逆を行うのに役立ちます。

`Map` がイテレーションのために持っているメソッドと同じメソッドもサポートしています:

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
=======
Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But this may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- [`set.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) -- returns an iterable object for values,
- [`set.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values) -- same as `set.keys()`, for compatibility with `Map`,
- [`set.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

[`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) -- is a collection of keyed values.

Methods and properties:

- [`new Map([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map) -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- [`map.set(key, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set) -- stores the value by the key, returns the map itself.
- [`map.get(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- [`map.has(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has) -- returns `true` if the `key` exists, `false` otherwise.
- [`map.delete(key)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) -- removes the element by the key, returns `true` if `key` existed at the moment of the call, otherwise `false`.
- [`map.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) -- removes everything from the map.
- [`map.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size) -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

[`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) -- is a collection of unique values.

Methods and properties:

- [`new Set([iterable])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set) -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- [`set.add(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add) -- adds a value (does nothing if `value` exists), returns the set itself.
- [`set.delete(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- [`set.has(value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has) -- returns `true` if the value exists in the set, otherwise `false`.
- [`set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) -- removes everything from the set.
- [`set.size`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size) -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
