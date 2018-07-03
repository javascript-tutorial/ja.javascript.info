
# シンボル型

仕様によると、オブジェクトのプロパティのキーは文字列型、もしくはシンボル型のいずれかです。数値ではなく、真偽値でもなく、文字列またはシンボル、それら2つの型だけです。

私たちはこれまで文字列だけ見てきました。今シンボルが我々に与えてくれるアドバンテージを見てみましょう。

[cut]

## シンボル

"シンボル" 値はユニークな識別子を表現します。

このタイプの値は、`Symbol()` を使うことで作ることができます:

```js
// id is a new symbol
let id = Symbol();
```

また、シンボルに説明を与えることもでき(シンボル名と呼びます)、デバッグ目的で便利です。

```js
// id is a symbol with the description "id"
let id = Symbol("id");
```

シンボルはユニークであることが保証されます。たとえ同じ説明で複数のシンボルを作ったとしても、それらは異なる値です。説明は何にも影響を与えない単なるラベルです。

例えば、ここでは同じ説明をもつ2つのシンボルがあります -- それらは等しくありません:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

もしRubyもしくは他の言語にも慣れ親しんでいる人は、 -- 間違ってはいけません。 JavaScriptのシンボルは異なります。

````warn header="Symbols は文字列への自動変換はしません"
JavaScriptにおいて、ほとんどの値は文字列への暗黙の変換をサポートしています。例えば、ほとんどの任意の値で `alert` を呼び、それは動きます。シンボルは特別です。それらは自動変換しません。

例えば、この `alert` はエラーになります:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

もし本当にシンボルを表示したい場合は、このように `toString()` を呼ぶ必要があります:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), now it works
*/!*
```

それは文字列とシンボルが根本的に異なっており、それを変換すべきではないので、混乱することに対する「言語ガード」です。
````

## "隠れた" プロパティ

シンボルは、我々にオブジェクトの "隠れた" プロパティを作ることを許可します。コードの他の部分が時々アクセスしたり上書きしたりすることはありません。

例えば、もしも、オブジェクト `user` に "識別子" を格納したい場合、そのキーとしてシンボルを使うことができます:

```js run
let user = { name: "John" };
let id = Symbol("id");

user[id] = "ID Value";
alert( user[id] ); // we can access the data using the symbol as the key
```

文字列 `"id"`に対して `Symbol（"id"）` を使うことの利点は何ですか？

それを見るための少しディープな例を作ってみましょう。

別のスクリプトが独自の目的のために `user` の中に、それ自身の "id" プロパティを持ちたいとします。それは別のJavaScriptライブラリかもしれないので、スクリプトは完全お互いを認識していません。

そして、そのスクリプトはそれ自身の `Symbol("id")` を作ります。:

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

たとえ同じ名前でもシンボルは常に異なるため、衝突はありません。

今、もし同じ目的のためにシンボルの代わりに文字列 `"id"` を使ったとすると、衝突が発生する *かもしれません*。

```js run
let user = { name: "John" };

// our script uses "id" property
user.id = "ID Value";

// ...if later another script the uses "id" for its purposes...

user.id = "Their id value"
// boom! overwritten! it did not mean to harm the colleague, but did it!
```

### リテラルのシンボル

もしもオブジェクトリテラルの中でシンボルを使いたい場合、角括弧で囲む必要があります。
このように:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // not just "id: 123"
*/!*
};
```
キーとして、変数 `id` の値が必要であり、文字列 "id" ではないからです。

### シンボルは for..in によってスキップされます。

シンボリックなプロパティは `for..in` ループに参加しません。

例:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // name, age (no symbols)
*/!*

// the direct access by the symbol works
alert( "Direct: " + user[id] );
```

これは一般的な "隠れている" というコンセプトの一部です。もし別のスクリプトかライブラリが我々のオブジェクトをループした際に、予期せずシンボリックプロパティにアクセスすることはありません。

一方で、[Object.assign](mdn:js/Object/assign) は文字列とシンボルプロパティ両方をコピーします;

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

ここにはパンドラの箱はありません。それは設計されたものです。このアイデアは、オブジェクトをクローンしたりマージするとき、通常 *全ての* プロパティがコピーされることを望みます( `id` のようなシンボルも含めて)。

````smart header="他の型のプロパティキーは文字列に強制されます"
オブジェクトでは、キーとして文字列かシンボルのみを使うことが出来ます。他の型は文字列に変換されます。

例えば、プロパティのキーとして 数値 `0` を使ったとき、文字列 `"0"` になります。

```js run
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```
````

## グローバルシンボル

見てきたように、通常、たとえ同じ名前であったとしても、全てのシンボルは異なります。しかし、時には同じ名前のシンボルを同じエンティティにしたいときがあります。

例えば、我々のアプリケーションの異なる部分が、正確に同じプロパテイを意味するシンボル `"id"` にアクセスしたいとします。

それを達成するために、*グローバルシンボルレジストリ* があります。その中でシンボルを作り、後でそれらにアクセスすることができます。同じ名前への繰り返しアクセスは、まったく同じシンボルを返すことが保証されます。

レジストリ内でシンボルを作ったり読み込むために、`Symbol.for(key)` を使います。

これは、グローバルレジストリのチェックを呼び出し、もし `key` として記述されたシンボルが存在する場合には、それを返します。そうでない場合には、新しいシンボル `Symbol(key)` を作り、与えられた `key` で、レジストリ内に格納されます。

例:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

レジストリ内のシンボルは *グローバルシンボル* と呼ばれます。コード内のどこにでもアクセス可能なアプリケーション全体のシンボルが必要な場合、それがそのためのものです。

```smart header="That sounds like Ruby"
Rubyのようないくつかのプログラミング言語では、名前毎に1つのシンボルがあります。

JavaScriptでは、見てきたように、それはグローバルシンボルのことです。
```

### Symbol.keyFor

グローバルシンボルでは、`Symbol.for(key)` は名前によってシンボルを返すだけでなく、逆方向の呼び出しもあります:
`Symbol.keyFor(sym)`, これは逆のことをします: グローバルシンボルを元に名前を返します。

例:

```js run
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name from symbol
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

`Symbol.keyFor` は内部ではそのシンボルのキーを探すためにグローバルシンボルレジストリを使っています。従って、非グローバルのものに対しては動作しません。もしシンボルが非グローバルの場合、見つけることはできず、`undefined` を返します。

例:

```js run
alert( Symbol.keyFor(Symbol.for("name")) ); // name, global symbol

alert( Symbol.keyFor(Symbol("name2")) ); // undefined, the argument isn't a global symbol
```

## システムシンボル

JavaScriptが内部的に使用する多くの "システム" シンボルが存在し、それを使うことでオブジェクトの様々な側面を微調整することができます。

それらは[よく知られているシンボル](https://tc39.github.io/ecma262/#sec-well-known-symbols) テーブルの仕様にリストされています。

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...等.

例えば、`Symbol.toPrimitive` はオブジェクトからプリミティブへの変換を記述することができます。私たちはすぐにそれを使うところを見ていきます。

該当する言語の機能を学ぶとき、他のシンボルについても分かるようになるでしょう。

## サマリ

`Symbol` はユニークな識別子のためのプリミティブ型です。

シンボルはオプションの記述と合わせて呼ばれる `Symbol()` で生成されます。

シンボルは、たとえ同じ名前を持ったとしても常に異なった値です。もし等価のために同じ名前のシンボルが必要な場合、グローバルレジストリを使うべきです: `Symbol.for(key)` は名前として `key` をもつグローバルシンボルを返します(必要なら作ります)。`Symbol.for` の複数回の呼び出しは全く同じシンボルを返します。

シンボルは2つの主なユースケースがあります:

1. "隠れた" オブジェクトのプロパティ
    もし別のスクリプト、またはライブラリに "属している" オブジェクトにプロパティを追加したい場合、シンボルを作り、プロパティのキーとしてそれを使うことができます。シンボリックなプロパティは `for..in` には現れないため、リストされることはありません。また、直接アクセスされることもありません。なぜなら、別のスクリプトは我々のシンボルを持っていないため、そのアクションに介入することもありません。

    従って、シンボリックプロパティを使うことで、私たちが必要なオブジェクトに何かを "こっそり" 隠すことができますが、他人には見えません。

2. `Symbol.*` としてアクセス可能なJavaScriptで使われている多くのシステムシンボルがあります。いくつかの組み込みの振る舞いを変更するためにそれらを使うことができます。例えば、チュートリアルの後半で[iterables](info:iterable)のための `Symbol.iterator`, [object-to-primitive conversion](info:object-toprimitive)を設定するための `Symbol.toPrimitive` などを使います。

技術的には、シンボルは100%隠れる訳ではありません。全てのシンボルを取得する組み込み関数[Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) があります。また、シンボリックなものも含めてオブジェクトの *全ての* キーを返す[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys)と呼ばれる関数もあります。なので、それらは本当に隠れてはいません。しかしほとんどのライブラリや組み込み関数、構文構造は、共通の合意に忠実です。そして、前述の方法を明示的に呼び出す人は、それらがやっていることをよく理解しているでしょう。
