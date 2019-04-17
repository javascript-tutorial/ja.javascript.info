
<<<<<<< HEAD
# クラス

"class" 構造は、綺麗で見やすい構文でプロトタイプベースのクラスを定義することができます。

[cut]

## "class" 構文

`class` 構文は汎用性があり、最初にシンプルな例から始めます。

これはプロトタイプベースのクラス `User` です:
=======
# Classes

The "class" construct allows one to define prototype-based classes with a clean, nice-looking syntax. It also introduces great new features which are useful for object-oriented programming.

## The "class" syntax

The `class` syntax is versatile, we'll start with a simple example first.

Here's a prototype-based class `User`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
...そしてこれは `class` 構文を使った場合です:
=======
...And here's the same using `class` syntax:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
2つの例が似ていることは容易に分かると思います。クラス内のメソッドはそれらの間にカンマを持たないことに注意してください。新米の開発者はときどきそれを忘れて、クラスメソッドの間にカンマをおいてしまい動作しなくなります。これはリテラルオブジェクトではなく、クラス構文です。

では、`class` は正確になにをするでしょう？ それが新しい言語レベルの実態を定義していると思うかもしれませんが、それは間違っています。

ここで `class User {...}` は実際には2つのことをしています。:

1. `"constructor"` という名前の関数を参照する変数 `User` を宣言します。
2. その定義の中にリストされているメソッドを `User.prototype` の中に置きます。ここでは、`sayHi` と `constructor` です。

次のコードでクラスを掘り下げてみましょう。:
=======
It's easy to see that these two examples are alike. Be sure to note that methods in a class do not have a comma between them. A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error. The notation here is not to be confused with object literals. Within the class syntactical sugar, no commas are required.

## What is a class?

So, what exactly is a `class`? We may think that it defines a new language-level entity, but that would be wrong.

In Javascript, a class is a kind of function.

The definition `class User {...}` creates a function under the same name and puts the methods into `User.prototype`. So the structure is similar.

This is demonstrated in the following code, which you can run yourself:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
class User {
  constructor(name) { this.name = name; }
<<<<<<< HEAD
  sayHi() { alert(this.name);  }
}

*!*
// 証明: User は "constructor" 関数である
*/!*
alert(User == User.prototype.constructor); // true

*!*
// 証明: その "prototype" には 2つのメソッドがある
=======
  sayHi() { alert(this.name); }
}

*!*
// proof: User is a function
alert(typeof User); // function
*/!*

*!*
// proof: User is the "constructor" function
*/!*
alert(User === User.prototype.constructor); // true

*!*
// proof: there are two methods in its "prototype"
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<<<<<<< HEAD
これは `class User` が生成するものの図です。:

![](class-user.png)


従って、`class` はコンストラクタとプロトタイプメソッドを一緒に定義する特別な構文です。

...しかしそれだけではありません。小さな微調整があちこちにあります。:

コンストラクタは `new` を必要とします
: 通常の関数とは異なり、クラス `constructor` は `new` なしで呼ぶことはできません。:
=======
Abstractly, we can illustrate this process of `class User` creating a function as:

![](class-user.png)

`Class` is a special syntax to define a constructor together with its prototype methods. In addition to its basic operation, the `Class` syntax brings many other features with it which we'll explore later.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned etc.

Here's a class-returning function - otherwise known as a "class factory":

```js run
function makeClass(phrase) {
*!*
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```

That's quite normal if we recall that `class` is just a special form of a function-with-prototype definition.

And, like Named Function Expressions, such classes also may have a name, that is visible inside that class only:

```js run
// "Named Class Expression" (alas, no such term, but that's what's going on)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass not visible outside of the class
```

## Differences between classes and functions

Classes have some differences compared to regular functions:

Constructors require `new`
: Unlike a regular function, a class `constructor` can't be called without `new`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
<<<<<<< HEAD
User(); // Error: Class コンストラクタ User は `new` なしで呼べません
```

異なる文字列出力
: もし `alert(User)` のように出力すると、エンジンによって `"class User..."` や `"function User..."` と表示されます。

混乱しないでください: 文字列の表現は様々ですが、それは依然として関数であり、JavaScript言語で別の "class" エンティティはありません。

クラスメソッドは非列挙型
: クラス定義は、`"prototype"` の中のすべてのメソッドに対して `enumerable` フラグを `false` にセットします。オブジェクトを `for..in` したとき、通常クラスメソッドは出てきてほしくないので、これは良いことです。

クラスはデフォルトの `constructor() {}` を持っています
: `class` 構造の中に `constructor` がない場合、空の関数が生成され `constructor() {}` と書いたのと同じように動作します。

クラスは常に `use strict` です
: クラス構造の内側のすべてのコードは自動的に strict モードです。

### Getters/setters

クラスは getter/setter も含みます。以下はそれらを使って実装した `user.name` の例です。:
=======
User(); // Error: Class constructor User cannot be invoked without 'new'
```

Different string output
: If we output it like `alert(User)`, some engines show `"class User..."`, while others show `"function User..."`.

Please don't be confused: the string representation may vary, but that's still a function, there is no separate "class" entity in JavaScript language.

Class methods are non-enumerable
: A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`. That's good, because if we `for..in` over an object, we usually don't want its class methods.

Classes have a default `constructor() {}`
: If there's no `constructor` in the `class` construct, then an empty function is generated, just as if we had written `constructor() {}`.

Classes always `use strict`
: All code inside the class construct is automatically in strict mode.


## Getters/setters, other shorthands

Classes also include getters/setters, generators, computed properties etc.

Here's an example for `user.name` implemented using `get/set`:
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613

```js run
class User {

  constructor(name) {
<<<<<<< HEAD
    // setter を呼び出す
    this.name = name;
=======
    // invokes the setter
    this._name = name;
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
<<<<<<< HEAD
      alert("Name too short.");
=======
      alert("Name is too short.");
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

<<<<<<< HEAD
内部的に、getter と setter もまた次のように `User` プロトタイプ上に作られます。:

```js
Object.defineProperty(User.prototype, {
=======
Internally, getters and setters are created on `User.prototype`, like this:

```js
Object.defineProperties(User.prototype, {
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

<<<<<<< HEAD
### メソッドのみ

オブジェクトリテラルとは異なり、`class` の中で `property:value` 割り当ては許可していません。メソッドとgetter/setterのみです。その制限を緩和するために、仕様で進行中のものがいくつかありますが、それはまだありません。

もしプロトタイプに非関数の値を置く必要が本当にある場合、`prototype` を手動で修正することができます。以下を見てください:

```js run
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5
```

従って、技術的にはそれは可能です。が、なぜそうしているかを知るべきです。このようなプロパティはクラスのすべてのオブジェクトの間で共有されます。

"クラス内" の代替は getter を使うことです。:

```js run
class User {
  get test() {
    return 5;
  }
}

alert( new User().test ); // 5
```

外部コードからの使い方は同じですが、getter バリアントは少し遅いです。

## クラス表現 

関数と同様に、クラスは別の式の中で定義され、渡され、返されます。

これは、クラスを返す関数("クラスファクトリー")です。:

```js run
function makeClass(phrase) {
*!*
  // class を宣言しそれを返します
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```

`class` はプロトタイプ付き関数の特別な形式であることを思い出すと、これはとても普通です。

また、名前付けされた関数表現のように、このようなクラスもまた名前を保つ場合があります。それはクラスの中でのみ見えます。:

```js run
// "名前付けされたクラス式" (そのような言葉はありませんが)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass は class の内側でだけ見えます
  }
};

new User().sayHi(); // 動作します, MyClass の定義を表示します

alert(MyClass); // error, MyClass は class の外からは見えません
```

## サマリ 

基本のクラス構文はこのようになります。:

```js
class MyClass {
  constructor(...) {
    // ...
  }
  method1(...) {}
  method2(...) {}
  get something(...) {}
  set something(...) {}
  static staticMethod(..) {}
=======
Here's an example with computed properties:

```js run
function f() { return "sayHi"; }

class User {
  [f()]() {
    alert("Hello");
  }

}

new User().sayHi();
```

For a generator method, similarly, prepend it with `*`.

## Class properties

```warn header="Old browsers may need a polyfill"
Class-level properties are a recent addition to the language.
```

In the example above, `User` only had methods. Let's add a property:

```js run
class User {
  name = "Anonymous";

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi();
```

The property is not placed into `User.prototype`. Instead, it is created by `new`, separately for every object. So, the property will never be shared between different objects of the same class.


## Summary

The basic class syntax looks like this:

```js
class MyClass {
  prop = value;

  constructor(...) {
    // ...
  }

  method(...) {}

  get something(...) {}
  set something(...) {}

  [Symbol.iterator]() {}
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
  // ...
}
```

<<<<<<< HEAD
`MyClass` の値は `constructor` として提供された関数です。もし `constructor` がなければ、空の関数です。

いずれにしても、クラス宣言に列挙されたメソッドは `prototype`のメンバーになりますが、静的メソッドは関数自身に書き込まれ、`MyClass.staticMethod()` として呼び出すことができます。 静的メソッドは、クラスに結びつく関数が必要なときに使用されますが、そのクラスのオブジェクトに結びつく場合には使用されません。

次のチャプターでは、継承を含め、よりクラスについて学びます。
=======
`MyClass` is technically a function, while methods are written to `MyClass.prototype`.

In the next chapters we'll learn more about classes, including inheritance and other features.
>>>>>>> 30f1dc4e4ed9e93b891abd73f27da0a47c5bf613
