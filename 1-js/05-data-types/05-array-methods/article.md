# 配列のメソッド

配列は多くのメソッドを提供します。分かりやすくするために、このチャプターではグループに分けて説明します。

[cut]

## アイテムの追加/削除 [#add-remove-items]

私たちは既に先頭または末尾にアイテムを追加/削除するメソッドを知っています:

- `push(...items)` は `items` を末尾に追加します。
- `pop()` は末尾の要素を削除し、それを返します。
- `shift()` は先頭の要素を削除し、それを返します。
- `unshift(...items)` はアイテムを先頭に追加します。

他にもいくつかあります。

### splice

どうやって配列から要素を削除するのでしょうか？

配列はオブジェクトなので、 `delete` を試すことができます:

```js run
let arr = ["I", "go", "home"];

delete arr[1]; // "go" を削除

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

要素は削除されましたが、配列はまだ3つの要素を持っており、`arr.length == 3` となります。

これは自然なことです。なぜなら、 `delete obj.key` は `key` で値を削除するためです。それがすべてであり、オブジェクトでは問題ありません。しかし、配列では通常残りの要素が移動し、解放された場所を埋めたいです。今より短い配列になることを期待しています。

なので、特別なメソッドを使用する必要があります。

[arr.splice(str)](mdn:js/Array/splice) メソッドは、配列のためのスイス製アーミーナイフです。それは何でもすることが出来ます: 追加、削除、また要素の挿入も。

構文:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

位置 `index` から始まります: `deleteCount` の要素を削除した後、その場所に `elem1, ..., elemN` を挿入します。削除した要素の配列を返します。

このメソッドは例で簡単に把握できます。

削除してみましょう:

```js run
let arr = ["I", "study", "JavaScript"];

*!*
arr.splice(1, 1); // インデックス 1 から 1 要素を削除
*/!*

alert( arr ); // ["I", "JavaScript"]
```

簡単ですよね？インデックス `1` から始まり、`1` つ要素を削除します。

次の例では、3つの要素を削除し、他の2つの要素でそれらを置き換えます:

```js run
let arr = [*!*"I", "study", "JavaScript",*/!* "right", "now"];

// 最初の 3 要素を削除し、別のものに置換
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // now [*!*"Let's", "dance"*/!*, "right", "now"]
```

ここで、`splice` が削除された要素の配列を返していることを見ることができます:

```js run
let arr = [*!*"I", "study",*/!* "JavaScript", "right", "now"];

// 最初の 2 要素を削除
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- 削除された要素の配列
```

`splice` メソッドは削除せずに挿入することも可能です。そのために、`deleteCount` に `0` をセットする必要があります:

```js run
let arr = ["I", "study", "JavaScript"];

// インデックス 2 から
// 削除 0
// その後 "complex" と "language" を挿入
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

````smart header="負のインデックスも許容されます"
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

メソッド [arr.slice](mdn:js/Array/slice) は似たように見える `arr.splice` よりもはるかにシンプルです。

構文:

```js
arr.slice(start, end)
```

開始インデックス `"start"` から `"end"` (`"end"` は含みません)の全てのアイテムをコピーした新しい配列を返します。`start` と `end` はともに負値になることができます。そのときは、配列の末尾からの位置が想定されます。

`str.slice` のように動作しますが、部分文字列の代わりに部分配列を作ります。

例:

```js run
let str = "test";
let arr = ["t", "e", "s", "t"];

alert( str.slice(1, 3) ); // es
alert( arr.slice(1, 3) ); // e,s

alert( str.slice(-2) ); // st
alert( arr.slice(-2) ); // s,t
```

### concat

メソッド [arr.concat](mdn:js/Array/concat) は配列を他の配列またはアイテムと結合します。

構文:

```js
arr.concat(arg1, arg2...)
```

任意の数の引数を許容します -- 配列または値。

結果は `arr`, 次に `arg1`, `arg2` などのアイテムを含む新しい配列を返します。

もし、引数が配列、もしくは `Symbol.isConcatSpreadable` プロパティを持っている場合、その全ての要素がコピーされます。そうでない場合、引数自体がコピーされます。

例:

```js run
let arr = [1, 2];

// arr と [3,4] をマージ
alert( arr.concat([3, 4])); // 1,2,3,4

// arr と [3,4] と [5,6] をマージ
alert( arr.concat([3, 4], [5, 6])); // 1,2,3,4,5,6

// arr と [3,4] をマージ後, 5 と 6 を追加
alert( arr.concat([3, 4], 5, 6)); // 1,2,3,4,5,6
```

通常は、配列から要素をコピーするだけです。それ以外のオブジェクトでは、配列のように見えたとしても、全体として追加されます:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
//[1, 2, arrayLike]
```

...しかし、もし配列のようなオブジェクトが `Symbol.isConcatSpreadable` プロパティを持つ場合、代わりにその要素が追加されます:

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

## 配列での検索 [#searching-in-array]

これらは、配列で何かを探すためのメソッドです。

### indexOf/lastIndexOf and includes

メソッド [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) と [arr.includes](mdn:js/Array/includes) は文字列の場合と同じ構文を持ち、基本的に同じことを行いますが、文字の代わりにアイテムを操作します:

- `arr.indexOf(item, from)` はインデックス `from` から `item` を探し、見つかった場所のインデックスを返します。そうでない場合は `-1` になります。
- `arr.lastIndexOf(item, from)` -- 同じですが、右から左に見ていきます。
- `arr.includes(item, from)` -- はインデックス `from` から `item` を探し、見つかった場合、`true` を返します。

例:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

メソッドは `===` 比較を使うことに留意してください。従って、もしも `false` を探す場合、ゼロではなく、正確な `false` を見つけようとします。

もしも含んでいるかをチェックしたいが、正確なインデックスは不要なときは、`arr.include` が好ましいです。

また、`include` の非常に小さな違いは、`indexOf/lastIndexOf` と違い、`NaN` を正しく処理することができます:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (0 になるべきですが, === 等値は NaN では機能しません)
alert( arr.includes(NaN) );// true (正しい)
```

### find と findIndex

オブジェクトの配列を持っていることを想像してください。特定条件を持つオブジェクトをどのようにして見つけますか？

ここで [arr.find](mdn:js/Array/find) メソッドが便利です。

構文はこうです:
```js
let result = arr.find(function(item, index, array) {
  // item が探しているものであれば true を返すようにします
});
```

関数は配列の要素毎に繰り返し呼ばれます:

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

例の中では１つの引数、関数 `item => item.id == 1` で `find` を行っている点に注意してください。`find` の他のパラメータは殆ど使われません。

[arr.findIndex](mdn:js/Array/findIndex) メソッドは基本的に同じです。が、要素自体ではなく要素が見つかったインデックスを返します。

### filter

`find` メソッドは、関数が `true` を返すようにする単一の（最初の）要素を探します。
もしそれが多い場合、[arr.filter(fn)](mdn:js/Array/filter) を使います。

構文は大体 `find` と同じですが、マッチした要素の配列を返します:

```js
let results = arr.filter(function(item, index, array) {
  // item がフィルタを通過する場合はtrueを返します
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

## 配列を変換する [#transform-an-array]

このセクションでは、配列を変換または並び替える方法について説明します。

### map

[arr.map](mdn:js/Array/map) メソッドは最も便利なものの1つで、よく使われます。

構文:

```js
let result = arr.map(function(item, index, array) {
  // item の代わりに新しい値を返します
})
```

これは、配列の各要素で関数を呼び出し、結果の配列を返します。

例えば、ここでは各要素をその長さに変換します:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length)
alert(lengths); // 5,7,6
```

### sort(fn)

メソッド [arr.sort](mdn:js/Array/sort) は配列を *決まった位置に* ソートします。

例:

```js run
let arr = [ 1, 2, 15 ];

// このメソッドは arr の内容を並べ替え（てそれを返します）
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

出力結果が何か不自然であることに気づきましたか？

並び順が `1, 15, 2` となりました。正しくないようです。しかしなぜでしょう？

**アイテムは、デフォルトでは文字列としてソートされます。**

文字通り、すべての要素は文字列に変換され、比較されます。なので、辞書編集順序が適用され、実際には `"2" > "15"` となります。

私たち自身のソート順を使うためには、`arr.sort()` の引数として、2つの引数をもつ関数を提供する必要があります。

関数ははこのように動作する必要があります:
```js
function compare(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}
```

例:

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

立ち止まって何が起きているのか考えてみましょう。`arr` は何でも配列にすることができますよね。それは数値や文字列、html要素やその他何でも含まれる可能性があります。私たちは *何かの* セットを持っています。それらをソートするためには、要素を比較する方法を知っている *順序付け関数* が必要です。 デフォルトは文字列です。

`arr.sort(fn)` メソッドは組み込みでソートアルゴリズムの実装を持っています。私たちはそれが正確にどのように動作するかについて気にする必要はありません (殆どの場合、最適化された[クイックソート](https://en.wikipedia.org/wiki/Quicksort) です)。配列を歩き、提供された関数を使ってその要素を比較し、並べ替えます。私たちに必要なのは、比較を行う `fn` を提供することだけです。

ところで、もしどの要素が比較されているかを知りたいとき -- アラートをしても問題ありません:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

アルゴリズムは処理の中で複数回要素を比較しますが、できるだけ回数を少なくしようとします。

````smart header="比較関数は任意の数を返すことがあります"
実際には、比較関数は正の数を「より大きい」、負の数を「より小さい」として返せば十分です。

より短い関数で書くことができます:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="ベストなアロー関数"
[アロー関数](info:function-expression#arrow-functions) を覚えていますか? すっきりしたソートを書くために使えます。:

```js
arr.sort( (a, b) => a - b );
```

これは他の、上で書いているより長いバージョンと全く同じように動作します。
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

ここでは現実の世界でのシチュエーションを考えます。私たちはメッセージングアプリを書いており、人々はカンマ区切りで受信者のリスト(`John, Pete, Mary`)を入力します。しかし、我々にとっては、１つの文字列よりも名前の配列の方がはるかに快適です。それを得る方法は？

[str.split(delim)](mdn:js/String/split) メソッドは、正確にそれをします。与えられた区切り文字 `delim` で文字列を配列に分割します。

下の例では、スペースに続くカンマで分割しています:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (と他の名前)
}
```

`split` メソッドは任意の2つ目の数値の引数を持っています -- それは配列の長さの制限です。もしこれが指定された場合、余分な要素は無視されます。実際にはほとんど使われませんが。:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="文字への分割"
空の `s` での `split(s)` の呼び出しは、文字列を文字の配列に分割します:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

[arr.join(str)](mdn:js/Array/join) は `split` と逆を行います。`arr` の項目を `str` で繋いだ文字列を作ります。

例:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';');

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

配列に対して繰り返し処理が必要なときは -- `forEach` を使うことができます。

各要素のデータを反復して返す必要があるときには -- `map`を使うことができます。

メソッド [arr.reduce](mdn:js/Array/reduce) と [arr.reduceRight](mdn:js/Array/reduceRight) もまたその種類に属しますが、少し複雑です。それらは、配列に基づいて単一の値を計算するために使用されます。

構文:

```js
let value = arr.reduce(function(previousValue, item, index, arr) {
  // ...
}, initial);
```

関数は各要素に適用されます。あなたはよく知られている引数に気づくかもしれません。2つ目から始まる引数は次の通りです:

- `item` -- 現在の配列の項目です。
- `index` -- その位置です。
- `arr` -- 配列です。

これまでのところ、`forEach/map` のようです。しかし、もう１つ引数があります:

- `previousValue` -- 前の関数の呼び出し結果です。最初の呼び出しは `initial` です。

これを掴むための最も簡単な方法は、例を見る、です。

ここでは、１行で配列の合計を取得します。

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

ここでは、2つの引数だけを使用する `reduce` の最も一般的なバリアントを使用しました。


何が起きているか、詳細を見てみましょう。

1. 最初の実行で `sum` は initial 値(`reduce` の最後の引数)であり、 `0` と等価です。そして、 `current` は最初の配列要素で `1` になります。従って、結果は `1` です。
2. ２回目の実行では、`sum = 1` で、2つ目の配列要素(`2`)をそれに足して返します。
3. ３回目の実行では、`sum = 3` で、それに１つ要素を足します。それが続きます。

計算のフロー:

![](reduce.png)

また、次のテーブルでは、各行は次の配列要素の関数呼び出しを表しています。

|   |`sum`|`current`|`result`|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|

これらから分かるように、前の呼び出しの結果は次の実行のときの最初の引数になっています。

また、 initial 値を省略することもできます。:

```js run
let arr = [1, 2, 3, 4, 5];

// reduce からの初期値を削除する(0なし)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

結果は同じです。なぜなら、初期値が指定されていない場合、`reduce` は配列の最初の要素を初期値とみなし、2つ目の要素から繰り返し処理を始めるためです。

計算テーブルは、上と同じで、最初の行を引いたものです。

しかし、このような利用は極度の注意を要求します。もし配列が空の場合、初期値なしでの `reduce` 呼び出しがエラーを返します。

例:

```js run
let arr = [];

// Error: 初期値なしの空配列の Reduce はエラーです
// 初期値が存在する場合、reduce は空の arr に対しそれを返します。
arr.reduce((sum, current) => sum + current);
```

従って、常に初期値を指定することをおすすめします。

[arr.reduceRight](mdn:js/Array/reduceRight) メソッドも同じをことを行いますが、右から左に実行します。


## 反復: forEach [#iterate-foreach]

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

そしてこのコードは、ターゲット配列内の位置についてより細かいです。

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

関数の結果(もし何かを返す場合)は捨てられ、無視されます。

## Array.isArray [#array-isarray]

配列は別の言語タイプを形成しません。 それらはオブジェクトに基づいています。

なので `typeof` では、通常のオブジェクトと配列を区別するのには助けになりません:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

...しかし、配列は頻繁に使用されるため、そのための特別なメソッド [Array.isArray(value)](mdn:js/Array/isArray) があります。これは、`value` が配列のときに `true` を、そうでない場合には `false` を返します。

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## ほとんどのメソッドは "thisArg" をサポートします [#most-methods-support-thisarg]

`find`、`filter`、`map`　のような関数を呼び出すほとんどの配列メソッドは、`sort` の例外を除いて、オプションの追加パラメータ `thisArg` を受け取ります。

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

例えば、フィルタとしてオブジェクトメソッドを使い、`thisArg` は便利です:

```js run
let user = {
  age: 18,
  younger(otherUser) {
    return otherUser.age < this.age;
  }
};

let users = [
  {age: 12},
  {age: 16},
  {age: 32}
];

*!*
// user より若いすべてのユーザを見つけます
let youngerUsers = users.filter(user.younger, user);
*/!*

alert(youngerUsers.length); // 2
```

上の呼び出しでは、フィルタとして `user.younger` を使い、そのコンテキストとして `user` を提供しています。もしもコンテキストを提供しなかった場合、`users.filter(user.younger)` はスタンドアロン関数として `this=undefined` で `user.younger` を呼び出します。それは即時エラーを意味します。

## サマリ [#summary]

配列メソッドの チートシート です:

- 要素の追加/削除をするため:
  - `push(...items)` -- アイテムを末尾に追加します,
  - `pop()` -- 末尾からアイテムを抽出します,
  - `shift()` -- 先頭からアイテムを抽出します,
  - `unshift(...items)` -- 先頭にアイテムを追加します.
  - `splice(pos, deleteCount, ...items)` -- インデックス `pos` で `deleteCount` 要素を削除し `items` を挿入します。
  - `slice(start, end)` -- 新しい配列を作り、`start` から `end` まで(endは含まない) の要素をコピーします。
  - `concat(...items)` -- 新しい配列を返します: 現在のものすべてをコピーし、`items` を追加します。`items` のいずれかが配列の場合、その要素が取得されます。

- 要素を検索するため:
  - `indexOf/lastIndexOf(item, pos)` -- 位置 `pos` から始めて `item` を探します。 インデックス、または見つからなかった場合は `-1` を返します。
  - `includes(value)` -- 配列が `value` を持っている場合 `true` を返します。そうでなければ `false` です。
  - `find/filter(func)` -- 関数を介して要素をフィルタリングし、`true` を返す最初の/すべての値を返します。
  - `findIndex` は `find` のようですが、値の代わりにインデックスを返します。

- 配列を変換するには:
  - `map(func)` -- すべての要素に対して `func` を呼び出した結果から新しい配列を作成します。
  - `sort(func)` -- 配列を適切な位置でソートし、それを返します。
  - `reverse()` -- 配列を反転してそれを返します。
  - `split/join` -- 文字列を配列に変換したり、戻します。
  - `reduce(func, initial)` -- 各要素に対して `func`を呼び出し、呼び出しの間に中間結果を渡すことで配列全体の単一の値を計算します。

- 要素を反復処理するには:
  - `forEach(func)` -- すべての要素に対して `func`を呼び出し、何も返しません。

- さらに:
  - `Array.isArray(arr)` は `arr` が配列かどうかをチェックします。

`sort`, `reverse` と `splice` メソッドは、配列自身を変更することに注意してください。

これらのメソッドは最も使われるもので、ユースケースの99%をカバーしますが、他にもいくつかあります:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) は配列をチェックします。

  関数 `fn` は `map` と同じように配列の各要素で呼ばれます。もし どれか/すべて の結果が `true` であれば `true`, それ以外は `false` になります。

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- インデックス `start` から `end` まで `value` で配列を埋めます。

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- 位置 `start` から `end` までの要素を、*自身* の `target` の位置にコピーします (既存のものを上書きします)。

完全なリストは [manual](mdn:js/Array) を見てください。

初めてみたとき、多くのメソッドがあり覚えるのがとても難しいように見えるかもしれません。しかし、実際にはそう見えるよりもはるかに簡単です。

それらを意識して チートシート を見てください。次にこのチャプターを通してあなたは配列のメソッドを経験しました。

今後、配列で何かをする必要があるとき、どうやればいいか分からないときはいつでも -- ここに来て チートシート を見て正しいメソッドを見つけてください。例はあなたが正しくそのメソッドを使うのを助けるでしょう。使っていると自然とそれらのメソッドを覚えていくでしょう。
