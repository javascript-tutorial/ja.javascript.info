
<<<<<<< HEAD
# シンボル型

仕様によると、オブジェクトのプロパティのキーは文字列型、もしくはシンボル型のいずれかです。数値ではなく、真偽値でもなく、文字列またはシンボル、それら2つの型だけです。

私たちはこれまで文字列だけ見てきました。今シンボルが我々に与えてくれるアドバンテージを見てみましょう。

## シンボル 

"シンボル" 値はユニークな識別子を表現します。

このタイプの値は、`Symbol()` を使って作ることができます:

```js
// id は新しい symbol です
let id = Symbol();
```

また、シンボルに説明を与えることもでき(シンボル名と呼びます)、デバッグ目的で便利です。

```js
// id は "id" という説明を持つ symbol です
let id = Symbol("id");
```

シンボルはユニークであることが保証されます。たとえ同じ説明で複数のシンボルを作ったとしても、それらは異なる値です。説明は何にも影響を与えない単なるラベルです。

例えば、ここでは同じ説明をもつ2つのシンボルがあります -- これらは等しくありません:
=======
# Symbol type

By specification, only two primitive types may serve as object property keys:

- string type, or
- symbol type.

Otherwise, if one uses another type, such as number, it's autoconverted to string. So that `obj[1]` is the same as `obj["1"]`, and `obj[true]` is the same as `obj["true"]`.

Until now we've been using only strings.

Now let's explore symbols, see what they can do for us.

## Symbols

A "symbol" represents a unique identifier.

A value of this type can be created using `Symbol()`:

```js
let id = Symbol();
```

Upon creation, we can give symbols a description (also called a symbol name), mostly useful for debugging purposes:

```js
// id is a symbol with the description "id"
let id = Symbol("id");
```

Symbols are guaranteed to be unique. Even if we create many symbols with exactly the same description, they are different values. The description is just a label that doesn't affect anything.

For instance, here are two symbols with the same description -- they are not equal:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

<<<<<<< HEAD
Rubyもしくは他の言語にも慣れ親しんでいる人は、 -- 間違ってはいけません。 JavaScriptのシンボルは異なります。

````warn header="Symbols は文字列への自動変換はしません"
JavaScriptにおいて、ほとんどの値は文字列への暗黙の変換をサポートしています。例えば、任意の値で `alert` を呼びだすと、たいていの値は動作します。が、シンボルは特別です。それらは自動変換されません。

例えば、この `alert` はエラーになります:
=======
If you are familiar with Ruby or another language that also has some sort of "symbols" -- please don't be misguided. JavaScript symbols are different.

So, to summarize, a symbol is a "primitive unique value" with an optional description. Let's see where we can use them.

````warn header="Symbols don't auto-convert to a string"
Most values in JavaScript support implicit conversion to a string. For instance, we can `alert` almost any value, and it will work. Symbols are special. They don't auto-convert.

For instance, this `alert` will show an error:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

<<<<<<< HEAD
これは、文字列とシンボルは根本的に異なるものであり、誤って別の文字列に変換してはいけないため、混乱を避けるための "言語によるガード" です。

もし本当にシンボルを表示したい場合は、このように `toString()` を呼ぶ必要があります:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), これは動作します
*/!*
```

あるいは、`symbol.description` プロパティを利用して、説明のみを表示します:
=======
That's a "language guard" against messing up, because strings and symbols are fundamentally different and should not accidentally convert one into another.

If we really want to show a symbol, we need to explicitly call `.toString()` on it, like here:

```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), now it works
*/!*
```

Or get `symbol.description` property to show the description only:

>>>>>>> 20208769e528337949e946f526534d61d38bac47
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

<<<<<<< HEAD
## "隠れた" プロパティ 

シンボルを使うと、オブジェクトの "隠れた" プロパティを作ることができます。他のコードがアクセスしたり上書きしたりすることはありません。

例えば、サードパーティのコードに属する `user` オブジェクトを使用している場合です。 それらに "識別子" を追加したいとします。

シンボルのキーを使用してみましょう:

```js run
let user = { // 別のコードに属しているオブジェクト
=======
## "Hidden" properties


Symbols allow us to create "hidden" properties of an object, that no other part of code can accidentally access or overwrite.

For instance, if we're working with `user` objects, that belong to a third-party code. We'd like to add identifiers to them.

Let's use a symbol key for it:

```js run
let user = { // belongs to another code
>>>>>>> 20208769e528337949e946f526534d61d38bac47
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

<<<<<<< HEAD
alert( user[id] ); // キーとして symbol を使ってデータにアクセスできます
```

文字列 `"id"` に対して `Symbol("id")` を使うことの利点は何でしょうか？

`user` オブジェクトは別のコードに属しており、コードはそこでも動作するので、そこに単純に任意のフィールドを追加するべきではありません。それは安全ではありません。しかし、シンボルは誤ってアクセスすることはできず、サードパーティのコードは恐らく見ることすらできないため、恐らく問題になりません。

また、別のスクリプトが、独自の目的のために自身の "id" プロパティを `user` の中に持ちたいとします。それは別のJavaScriptライブラリの場合もあり、スクリプトは完全にお互いを認識していない状況とします。

そして、そのスクリプトは自身の `Symbol("id")` を作ります。:
=======
alert( user[id] ); // we can access the data using the symbol as the key
```

What's the benefit of using `Symbol("id")` over a string `"id"`?

As `user` objects belong to another codebase, it's unsafe to add fields to them, since we might affect pre-defined behavior in that other codebase. However, symbols cannot be accessed accidentally. The third-party code won't be aware of newly defined symbols, so it's safe to add symbols to the `user` objects.

Also, imagine that another script wants to have its own identifier inside `user`, for its own purposes.

Then that script can create its own `Symbol("id")`, like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
// ...
let id = Symbol("id");

user[id] = "Their id value";
```

<<<<<<< HEAD
たとえ同じ名前でもシンボルは常に異なるため、衝突は起こりません。

ですが、もし同じ目的のためにシンボルの代わりに文字列 `"id"` を使ったとすると、衝突が発生する *かもしれません*。

```js run
let user = { name: "John" };

// 我々のスクリプトは　"id" プロパティを使います
user.id = "ID Value";

// ...もし後で別のスクリプトが別の目的で "id" を使ったら...

user.id = "Their id value"
// boom! 上書きされます! 同僚に危害を加えるつもりはありませんでした。が、してしまいました!
```

### リテラルのシンボル

オブジェクトリテラルの中でシンボルを使いたい場合は、角括弧で囲む必要があります。

このように:
=======
There will be no conflict between our and their identifiers, because symbols are always different, even if they have the same name.

...But if we used a string `"id"` instead of a symbol for the same purpose, then there *would* be a conflict:

```js
let user = { name: "John" };

// Our script uses "id" property
user.id = "Our id value";

// ...Another script also wants "id" for its purposes...

user.id = "Their id value"
// Boom! overwritten by another script!
```

### Symbols in an object literal

If we want to use a symbol in an object literal `{...}`, we need square brackets around it.

Like this:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
<<<<<<< HEAD
  [id]: 123 // 単に "id: 123" ではありません
*/!*
};
```
キーとして、変数 `id` の値が必要であり、文字列 "id" ではないからです。

### シンボルは for..in ではスキップされます。

シンボリックなプロパティは `for..in` ループに参加しません。

例:
=======
  [id]: 123 // not "id": 123
*/!*
};
```
That's because we need the value from the variable `id` as the key, not the string "id".

### Symbols are skipped by for..in

Symbolic properties do not participate in `for..in` loop.

For instance:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

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

<<<<<<< HEAD
// symbol による直アクセスは動作します
alert( "Direct: " + user[id] );
```

`Object.keys(user)` もそれらを無視します。これは一般的な "隠れている" というコンセプトの一部です。もし別のスクリプトかライブラリが我々のオブジェクトをループした際に、予期せずシンボリックプロパティにアクセスすることはありません。

一方で、[Object.assign](mdn:js/Object/assign) は文字列とシンボルプロパティ両方をコピーします;
=======
// the direct access by the symbol works
alert( "Direct: " + user[id] ); // Direct: 123
```

[Object.keys(user)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.

In contrast, [Object.assign](mdn:js/Object/assign) copies both string and symbol properties:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

<<<<<<< HEAD
ここにはパラドックスはありません。それはデザインによるものです。考え方としては、我々がオブジェクトをクローンしたりマージするとき、通常 *全ての* プロパティがコピーされることを望むであろうということです( `id` のようなシンボルも含めて)。

## グローバルシンボル 

これまで見てきたように、通常はたとえ同じ名前であったとしてもすべてのシンボルは異なります。しかし、時には同じ名前のシンボルを同じエンティティにしたいときがあります。例えば、我々のアプリケーションの異なる部分が、正確に同じプロパテイを意味するシンボル `"id"` にアクセスしたいとします。

それを達成するために、*グローバルシンボルレジストリ* があります。その中でシンボルを作り、後でそれらにアクセスすることができます。同じ名前への繰り返しアクセスは、まったく同じシンボルを返すことが保証されます。

レジストリからシンボルを読み取る（ない場合は作成する）ためには、`Symbol.for(key)` を使います。

この呼び出しはグローバルレジストリをチェックし、`key` として記述されたシンボルが存在する場合にはそれを返しますが、そうでなければ新しいシンボル `Symbol(key)` を作成し、与えられた `key` で、レジストリ内に格納します。

例:

```js run
// グローバルレジストリから読む
let id = Symbol.for("id"); // symbol が存在しない場合、作られます

// 再度読み込み
let idAgain = Symbol.for("id");

// 同じシンボル
alert( id === idAgain ); // true
```

レジストリ内のシンボルは *グローバルシンボル* と呼ばれます。コード内のどこからでもアクセス可能なアプリケーション全体のシンボルが必要な場合、これを使います。

```smart header="これは Ruby のようです"
Rubyのようないくつかのプログラミング言語では、名前毎に1つのシンボルがあります。

JavaScriptでは、ご覧の通りそれはグローバルシンボルのことです。
=======
There's no paradox here. That's by design. The idea is that when we clone an object or merge objects, we usually want *all* properties to be copied (including symbols like `id`).

## Global symbols

As we've seen, usually all symbols are different, even if they have the same name. But sometimes we want same-named symbols to be same entities. For instance, different parts of our application want to access symbol `"id"` meaning exactly the same property.

To achieve that, there exists a *global symbol registry*. We can create symbols in it and access them later, and it guarantees that repeated accesses by the same name return exactly the same symbol.

In order to read (create if absent) a symbol from the registry, use `Symbol.for(key)`.

That call checks the global registry, and if there's a symbol described as `key`, then returns it, otherwise creates a new symbol `Symbol(key)` and stores it in the registry by the given `key`.

For instance:

```js run
// read from the global registry
let id = Symbol.for("id"); // if the symbol did not exist, it is created

// read it again (maybe from another part of the code)
let idAgain = Symbol.for("id");

// the same symbol
alert( id === idAgain ); // true
```

Symbols inside the registry are called *global symbols*. If we want an application-wide symbol, accessible everywhere in the code -- that's what they are for.

```smart header="That sounds like Ruby"
In some programming languages, like Ruby, there's a single symbol per name.

In JavaScript, as we can see, that's true for global symbols.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
```

### Symbol.keyFor

<<<<<<< HEAD
グローバルシンボルでは、`Symbol.for(key)` は名前によってシンボルを返すだけでなく、逆方向の呼び出しもあります:`Symbol.keyFor(sym)`, これは逆のことをします: グローバルシンボルを元に、名前を返します。

例:

```js run
// 名前 から シンボルを取得
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// symbol から名前を取得
=======
We have seen that for global symbols, `Symbol.for(key)` returns a symbol by name. To do the opposite -- return a name by global symbol -- we can use: `Symbol.keyFor(sym)`:

For instance:

```js run
// get symbol by name
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// get name by symbol
>>>>>>> 20208769e528337949e946f526534d61d38bac47
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```

<<<<<<< HEAD
`Symbol.keyFor` は内部ではそのシンボルのキーを探すためにグローバルシンボルレジストリを使っています。従って、非グローバルのものに対しては動作しません。もしシンボルが非グローバルの場合、見つけることはできず、`undefined` を返します。

とは言え、どのシンボルも `description` プロパティを持っています。

例:
=======
The `Symbol.keyFor` internally uses the global symbol registry to look up the key for the symbol. So it doesn't work for non-global symbols. If the symbol is not global, it won't be able to find it and returns `undefined`.

That said, all symbols have the `description` property.

For instance:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

```js run
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

<<<<<<< HEAD
alert( Symbol.keyFor(globalSymbol) ); // name, グローバルシンボル
alert( Symbol.keyFor(localSymbol) ); // undefined, グローバルではないので
=======
alert( Symbol.keyFor(globalSymbol) ); // name, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, not global
>>>>>>> 20208769e528337949e946f526534d61d38bac47

alert( localSymbol.description ); // name
```

<<<<<<< HEAD
## システムシンボル 

JavaScriptが内部的に使用する多くの "システム" シンボルが存在し、それを使うことでオブジェクトの様々な側面を微調整することができます。

それらは[よく知られているシンボル](https://tc39.github.io/ecma262/#sec-well-known-symbols) テーブルの仕様にリストされています。
=======
## System symbols

There exist many "system" symbols that JavaScript uses internally, and we can use them to fine-tune various aspects of our objects.

They are listed in the specification in the [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) table:
>>>>>>> 20208769e528337949e946f526534d61d38bac47

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
<<<<<<< HEAD
- ...等.

例えば、`Symbol.toPrimitive` はオブジェクトからプリミティブへの変換を記述することができます。私たちはすぐにそれを使うところを見ていきます。

他のシンボルについても、該当する言語の機能を学ぶときに分かるようになるでしょう。

## サマリ 

`Symbol` はプリミティブ型で、ユニークな識別子のためのものです。

シンボルはオプションの記述と合わせて呼ばれる `Symbol()` で生成されます。

シンボルは、たとえ同じ名前を持ったとしても常に異なった値です。もし同じ名前のシンボルを同じものにしたいなら、グローバルレジストリを使う必要があります: `Symbol.for(key)` は名前として `key` をもつグローバルシンボルを返します(必要なら作ります)。`Symbol.for` の複数回の呼び出しは全く同じシンボルを返します。

シンボルは2つの主なユースケースがあります:

1. "隠れた" オブジェクトのプロパティ。
    もし別のスクリプト、またはライブラリに "属している" オブジェクトにプロパティを追加したい場合、シンボルを作り、プロパティのキーとしてそれを使うことができます。シンボリックなプロパティは `for..in` には現れないため、リストされることはありません。また、直接アクセスされることもありません。なぜなら、別のスクリプトは我々のシンボルを持っていないため、そのアクションに介入することはできません。

    従って、シンボリックプロパティを使うことで、必要なオブジェクトに何かを "こっそり" 隠すことができます。そしてそれは他人には見えません。

2. `Symbol.*` としてアクセス可能なJavaScriptで使われている多くのシステムシンボルがあります。いくつかの組み込みの振る舞いを変更するためにそれらを使うことができます。例えば、チュートリアルの後半で[iterables](info:iterable)のための `Symbol.iterator`, [object-to-primitive conversion](info:object-toprimitive)を設定するための `Symbol.toPrimitive` などを使います。

技術的には、シンボルは100%隠れる訳ではありません。全てのシンボルを取得する組み込み関数[Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) があります。また、シンボリックなものも含めてオブジェクトの *全ての* キーを返す[Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys)と呼ばれる関数もあります。なので、それらは本当に隠れてはいません。しかしほとんどのライブラリや組み込み関数、構文構造は共通の合意に忠実です。そして、前述の方法を明示的に呼び出す人は、それらがやっていることをよく理解しているでしょう。
=======
- ...and so on.

For instance, `Symbol.toPrimitive` allows us to describe object to primitive conversion. We'll see its use very soon.

Other symbols will also become familiar when we study the corresponding language features.

## Summary

`Symbol` is a primitive type for unique identifiers.

Symbols are created with `Symbol()` call with an optional description (name).

Symbols are always different values, even if they have the same name. If we want same-named symbols to be equal, then we should use the global registry: `Symbol.for(key)` returns (creates if needed) a global symbol with `key` as the name. Multiple calls of `Symbol.for` with the same `key` return exactly the same symbol.

Symbols have two main use cases:

1. "Hidden" object properties.

    If we want to add a property into an object that "belongs" to another script or a library, we can create a symbol and use it as a property key. A symbolic property does not appear in `for..in`, so it won't be accidentally processed together with other properties. Also it won't be accessed directly, because another script does not have our symbol. So the property will be protected from accidental use or overwrite.

    So we can "covertly" hide something into objects that we need, but others should not see, using symbolic properties.

2. There are many system symbols used by JavaScript which are accessible as `Symbol.*`. We can use them to alter some built-in behaviors. For instance, later in the tutorial we'll use `Symbol.iterator` for [iterables](info:iterable), `Symbol.toPrimitive` to setup [object-to-primitive conversion](info:object-toprimitive) and so on.

Technically, symbols are not 100% hidden. There is a built-in method [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) that allows us to get all symbols. Also there is a method named [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) that returns *all* keys of an object including symbolic ones. But most libraries, built-in functions and syntax constructs don't use these methods.
>>>>>>> 20208769e528337949e946f526534d61d38bac47
