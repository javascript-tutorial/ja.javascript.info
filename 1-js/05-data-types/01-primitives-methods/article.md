# プリミティブのメソッド

<<<<<<< HEAD
JavaScript はプリミティブ(文字列、数値など)をオブジェクトのように扱うことができます。また、それらはメソッドも提供しています。この後すぐに学んでいきますが、最初に、どのように動作するのか確認しましょう。なぜなら、プリミティブはオブジェクトではないからです(このチャプターでそれをさらに明確にしていきます)。

プリミティブとオブジェクトの主な違いを見ていきましょう。

プリミティブ

- プリミティブ型の値です。
- プリミティブ型は 7 つあります: `string`, `number`, `bigint`, `boolean`, `symbol`, `null`, `undefined`
=======
JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we'll see how it works because, of course, primitives are not objects (and here we will make it even clearer).

Let's look at the key distinctions between primitives and objects.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

オブジェクト

<<<<<<< HEAD
- プロパティとして複数の値を保持することができます。
- `{}` で作ることができます。例えば: `{name: "John", age: 30}`。JavaScriptでは他の種類のオブジェクトもあります。関数もオブジェクトです。

オブジェクトの最も良いところの1つは、そのプロパティの1つとして関数を保持することができることです:
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.

An object

- Is capable of storing multiple values as properties.
- Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript: functions, for example, are objects.

One of the best things about objects is that we can store a function as one of its properties.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

上の例では、`sayHi` メソッドをもつ `john` オブジェクトを作りました。

<<<<<<< HEAD
日付、エラー、HTML要素などで動作するような、多くの組み込みのオブジェクトが既に存在し、それらは異なるプロパティとメソッドを持っています。
=======
Many built-in objects already exist, such as those that work with dates, errors, HTML elements, etc. They have different properties and methods.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

しかし、これらの機能にはコストがかかります!

<<<<<<< HEAD
オブジェクトはプリミティブよりも "重い" です。内部の仕組みをサポートするために追加のリソースを必要とします。しかし、プロパティやメソッドはプログラミングをする上で非常に有用であり、JavaScriptエンジンはそれらの負担を減らすために最適化を試みます。
=======
Objects are "heavier" than primitives. They require additional resources to support the internal machinery.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## オブジェクトとしてのプリミティブ 

JavaScriptの作成者が直面するパラドックスは次の通りです。:

<<<<<<< HEAD
- 文字列や数字のようなプリミティブに対してやりたいことがたくさんあります。 それらをメソッドとして実現することは素晴らしいことでしょう。
- プリミティブはできるだけ高速、かつ軽量でなければなりません。
=======
- There are many things one would want to do with a primitive, like a string or a number. It would be great to access them using methods.
- Primitives must be as fast and lightweight as possible.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

解決策は少々野暮ですが次の通りです:

<<<<<<< HEAD
1. プリミティブは依然としてプリミティブです。要望どおり、単一の値です。
2. 言語は、文字列、数値、真偽値そしてシンボルのメソッドやプロパティにアクセスすることができます。
3. 必要に応じて、追加の機能を提供する特別な "オブジェクトラッパー" が作られ、その後、破棄されます。

"オブジェクトラッパー" はプリミティブ型毎に異なり、`String`, `Number`, `Boolean`, `Symbol` と呼ばれます。従って、それらは異なるメソッドのセットを提供します。

例えば、大文字化された文字列を返す [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) というメソッドがあります。
=======
1. Primitives are still primitive. A single value, as desired.
2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
3. In order for that to work, a special "object wrapper" that provides the extra functionality is created, and then is destroyed.

The "object wrappers" are different for each primitive type and are called: `String`, `Number`, `Boolean`, `Symbol` and `BigInt`. Thus, they provide different sets of methods.

For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

次のように動作します:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

シンプルですよね？ `str.toUpperCase()` で実際に何が起こっているのでしょう:

1. 文字列 `str` はプリミティブです。なので、プロパティへアクセスした瞬間に、文字列の値を知る特別なオブジェクトが作られ、それは `toUpperCase()` のような便利なメソッドを持っています。
2. メソッドは実行され、新たな文字列を返します(`alert` で表示されたものです)
3. 特別なオブジェクトは破棄され、プリミティブの `str` だけが残ります。

従って、プリミティブは依然として軽量なままですが、メソッドを提供できます。

JavaScriptエンジンはこの処理を高度に最適化しています。余分なオブジェクトの作成を完全にスキップするかもしれません。しかし、それは依然として仕様に準拠し、あたかもオブジェクトを作成したかのように動作しなければなりません。

数値は自身のメソッドを持っています。例えば、指定された精度に数値を丸める [toFixed(n)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) です:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

具体的なメソッドはチャプター <info:number> と <info:string> で見ましょう。


<<<<<<< HEAD
````warn header="コンストラクタ `String/Number/Boolean` は内部でのみ利用します"
Javaなどの言語は `new Number(1)` または `new Boolean(false)` のような構文を使うことで明示的にプリミティブのための "ラッパーオブジェクト" を作ることが出来ます。
=======
````warn header="Constructors `String/Number/Boolean` are for internal use only"
Some languages like Java allow us to explicitly create "wrapper objects" for primitives using a syntax like `new Number(1)` or `new Boolean(false)`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

JavaScriptにおいても、歴史的な理由から可能ですが、強く **推奨しません**。いくつかの場所で物事がおかしなことになっていくでしょう。

例:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

<<<<<<< HEAD
オブジェクトは `if` では常に true なので、アラートが表示されます。
=======
Objects are always truthy in `if`, so here the alert will show up:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let zero = new Number(0);

<<<<<<< HEAD
if (zero) { // zero は true, オブジェクトだからです
  alert( "zero is truthy?!?" );
}
```

一方、`new` をつけずに同じ関数 `String/Number/Boolean` を使うことは、普通であり役に立ちます。それらは値を対応する型へ変換します: 文字列、数値、もしくは真偽値(プリミティブ)

例えば、これはまったく問題ありません:
=======
if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
}
```

On the other hand, using the same functions `String/Number/Boolean` without `new` is totally fine and useful thing. They convert a value to the corresponding type: to a string, a number, or a boolean (primitive).

For example, this is entirely valid:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```js
let num = Number("123"); // string から number へ変換
```
````


````warn header="null/undefined はメソッドを持ちません"
特別なプリミティブ `null` と `undefined` は例外です。それらは対応する "ラッパーオブジェクト" を持たずメソッドを提供しません。ある意味では "最もプリミティブ" です。

このようなアクセスはエラーになります:

```js run
alert(null.test); // error
````

## サマリ 

- プリミティブは、`null` と `undefined` の例外を除いて、多くの役立つメソッドを提供します。次のチャプターで詳細を学んでいきます。
- 形式的には、それらのメソッドは一時的なオブジェクトを通して行われます。しかしJavaScriptエンジンは内部的に最適化するようチューニングされているため、呼び出しのコストはかかりません。
