
<<<<<<< HEAD
# クラス(Class) 基本構文

```quote author="Wikipedia"
オブジェクト指向プログラミングでは、*クラス* はオブジェクト生成、状態(メンバ変数)の初期値の提供や振る舞いの実装(メンバ関数またはメソッド)のための拡張可能なプログラムコードテンプレートです。
```

実践では、ユーザや商品など、同じ種類のオブジェクトを大量に作成することがしばしばあります。

<info:constructor-new> の章ですでにご存知の通り、`new function` はそれ場合に役立ちます。

ですが、最新の JavaScript では、より高度な "class" 構造があり、オブジェクト指向プログラミングに役立つ優れた新機能が導入されています。

## "class" 構文

基本の構文は次の通りです:
```js
class MyClass {
  // クラスメソッド
=======
# Class basic syntax

```quote author="Wikipedia"
In object-oriented programming, a *class* is an extensible program-code-template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods).
```

In practice, we often need to create many objects of the same kind, like users, or goods or whatever.

As we already know from the chapter <info:constructor-new>, `new function` can help with that.

But in the modern JavaScript, there's a more advanced "class" construct, that introduces great new features which are useful for object-oriented programming.

## The "class" syntax

The basic syntax is:
```js
class MyClass {
  // class methods
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

<<<<<<< HEAD
その後、`new MyClass()` で、リストされたすべてのメソッドをもつ新しいオブジェクトを作成します。

`constructor()` メソッドは `new` により自動で呼び出され、そこでオブジェクトを初期化できます。

例
=======
Then use `new MyClass()` to create a new object with all the listed methods.

The `constructor()` method is called automatically by `new`, so we can initialize the object there.

For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

<<<<<<< HEAD
// 使い方:
=======
// Usage:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
`new User("John")` が呼び出されると:
1. 新しいオブジェクトが作られます。
2. 指定された引数で `constructor` が実行され、`this.name` へ代入します。

...以降、`user.sayHi()` のように、オブジェクトメソッドが呼び出せます。


```warn header="クラスメソッドの間にはカンマは不要です"
初心者の開発者の落とし穴として、クラスメソッドの間にカンマを置くことがあります。これは構文エラーになります。

ここでの表記はオブジェクトリテラルと混同しないでください。クラス内では、カンマは必要ありません。
```

# クラスとは？

では、`class` は正確に何でしょうか？これはまったく新しい言語レベルのエンティティではありません。

魔法を解き明かして、クラスが実際に何であるか見てみましょう。これは多くの複雑な側面を理解するのに役立ちます。

JavaScript ではクラスは関数の一種です。

これを見てください:
=======
When `new User("John")` is called:
1. A new object is created.
2. The `constructor` runs with the given argument and assigns it to `this.name`.

...Then we can call object methods, such as `user.sayHi()`.


```warn header="No comma between class methods"
A common pitfall for novice developers is to put a comma between class methods, which would result in a syntax error.

The notation here is not to be confused with object literals. Within the class, no commas are required.
```

## What is a class?

So, what exactly is a `class`? That's not an entirely new language-level entity, as one might think.

Let's unveil any magic and see what a class really is. That'll help in understanding many complex aspects.

In JavaScript, a class is a kind of function.

Here, take a look:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

<<<<<<< HEAD
// 証拠: User は function です
=======
// proof: User is a function
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
alert(typeof User); // function
*/!*
```

<<<<<<< HEAD
`class User {...}` 構造は実際に行っていることは以下です:

1. クラス宣言の結果となる `User` と言う名前の関数を作成します。関数コードは `constructor` メソッドです（メソッドがない場合は空と想定します）。 
2. `User.prototype` に、`sayHi` などのクラスメソッドを格納します。 

`new User` オブジェクトが作成された後、そのメソッドを呼び出すと、<info:function-prototype> の章で説明しように、プロトタイプから取得されます。従って、オブジェクトはクラスメソッドへのアクセスを持ちます。

`class User` 宣言の結果を次のように説明できます:

![](class-user.svg)

これを確認するコードは以下です:
=======
What `class User {...}` construct really does is:

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don't write such method).
2. Stores class methods, such as `sayHi`, in `User.prototype`.

After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.

We can illustrate the result of `class User` declaration as:

![](class-user.svg)

Here's the code to introspect it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

<<<<<<< HEAD
// class は function
alert(typeof User); // function

// ...あるいは, より正確には User は constructor メソッド
alert(User === User.prototype.constructor); // true

// メソッドは User.prototype にあります e.g:
alert(User.prototype.sayHi); // sayHi メソッドのコード

// prototype には正確には2つのメソッドがあります
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## 単なるシンタックスシュガーではありません

`class` は "シンタックスシュガー"（新しいものは導入されていないが、より可読性が高い書き方）という人が時々います。実際、`class` キーワードを使わずに同じものを宣言することが可能です。:

```js run
// 純粋な関数で User クラスを書き換え

// 1. constructor 関数を作成
function User(name) {
  this.name = name;
}
// 関数 prototype は "constructor" プロパティをデフォルトで持ちます
// なので、作成は不要です

// 2. prototype へメソッドを追加
=======
// class is a function
alert(typeof User); // function

// ...or, more precisely, the constructor method
alert(User === User.prototype.constructor); // true

// The methods are in User.prototype, e.g:
alert(User.prototype.sayHi); // the code of the sayHi method

// there are exactly two methods in the prototype
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Not just a syntactic sugar

Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same thing without using the `class` keyword at all:

```js run
// rewriting class User in pure functions

// 1. Create constructor function
function User(name) {
  this.name = name;
}
// a function prototype has "constructor" property by default,
// so we don't need to create it

// 2. Add the method to prototype
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
User.prototype.sayHi = function() {
  alert(this.name);
};

<<<<<<< HEAD
// 使い方:
=======
// Usage:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
この定義の結果はほぼ同じです。なので、コンストラクタとそのプロトタイプメソッドを一緒に定義するための、`class` のシンタックスシュガーとみなされる理由はたしかにあります。

ですが、重要な違いがあります。

1. まず、`class` で生成された関数は特別な内部プロパティ `[[IsClassConstructor]]: true` でラベル付けされています。そのため、手動で作成するのとまったく同じではありません。

    言語は様々な箇所でそのプロパティをチェックします。例えば通常の関数とは異なり、`new` で呼び出す必要があります:
    
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.

1. First, a function created by `class` is labelled by a special internal property `[[IsClassConstructor]]: true`. So it's not entirely the same as creating it manually.

    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
<<<<<<< HEAD
    User(); // Error: クラスのコンストラクタ User は `new` なしで呼び出せません
    ```

    また、ほとんどの JavaScript エンジンではクラスのコンストラクタの文字列表現は、"class..." で始まります
=======
    User(); // Error: Class constructor User cannot be invoked without 'new'
    ```

    Also, a string representation of a class constructor in most JavaScript engines starts with the "class..."
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
<<<<<<< HEAD
    他の違いもあります。この後見ていきます。

2. クラス メソッドは列挙不可です
    クラス定義は、`"prototype"` にあるすべてのメソッドに対して `enumerable` フラグを `false` にセットします。

    オブジェクトを `for...in` するとき、通常はクラスメソッドは必要ないのでこれは便利です。

3. クラスは常に `use strict` です
    クラス構造の中のコードはすべて自動で strict モードです。

加えて、`class` 構文には後で説明するような多くの機能があります。

## クラス表現

関数と同じように、クラスも別の式の中で定義し、渡したり、返却したり代入することができます。

これはクラス式の例です。:
=======
    There are other differences, we'll see them soon.

2. Class methods are non-enumerable.
    A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.

    That's good, because if we `for..in` over an object, we usually don't want its class methods.

3. Classes always `use strict`.
    All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we'll explore later.

## Class Expression

Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

Here's an example of a class expression:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

<<<<<<< HEAD
名前付き関数と同様、クラスも名前を持つことができます。

クラス式に名前がある場合、そのクラス内部でのみ見えます:

```js run
// "名前付きクラス式"
// (スペックにはこのような用語はありませんが、名前付き関数式と同じです)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass の名前はクラスの内部でのみ見えます
  }
};

new User().sayHi(); // 動作します, MyClass の定義を表示

alert(MyClass); // error, MyClass の名前はクラスの外からは見えません
```

次のように。クラスを動的に "要求に応じて" 作ることもできます。:

```js run
function makeClass(phrase) {
  // クラス定義とその返却
=======
Similar to Named Function Expressions, class expressions may have a name.

If a class expression has a name, it's visible inside the class only:

```js run
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass name isn't visible outside of the class
```

We can even make classes dynamically "on-demand", like this:

```js run
function makeClass(phrase) {
  // declare a class and return it
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

<<<<<<< HEAD
// 新しいクラスを作成
=======
// Create a new class
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


<<<<<<< HEAD
### Getters/setters

リテラルオブジェクトのように、クラスも getters/setters, 算出プロパティなどを含めることができます。

これは、`get/set` を使用して実装された `user.name` の例です:
=======
## Getters/setters

Just like literal objects, classes may include getters/setters, computed properties etc.

Here's an example for `user.name` implemented using `get/set`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {

  constructor(name) {
<<<<<<< HEAD
    // setter を呼び出す
=======
    // invokes the setter
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this.name = name;
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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

<<<<<<< HEAD
user = new User(""); // Name too short.
```

技術的には、このようなクラス宣言は `User.prototype` に getter / setter を作成することで機能します。

## 計算された名前（computed name）

これは括弧 `[...]` を使用した計算されたメソッド名の例です。
=======
user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.

## Computed names [...]

Here's an example with a computed method name using brackets `[...]`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

<<<<<<< HEAD
このような特徴は、リテラルオブジェクトに似ているので、覚えやすいと思います。

## クラスフィールド

```warn header="古いブラウザではポリフィルが必要な場合があります"
クラスフィールドは最近言語に追加されたものです。
```

以前は、クラスはメソッドだけを持っていました。

"クラスフィールド" は任意のプロパティが追加できる構文です。

例えば、`class User` に `name` プロパティを追加しましょう。
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

<<<<<<< HEAD
つまり、宣言の中で、"<property name> = <value>" と記述するだけです。

クラスフィールドの重要な違いは、`User.prototype` ではなく、個々のオブジェクトにセットされることです。:
=======
So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

<<<<<<< HEAD
また、より複雑な式や関数呼び出しで値を代入することもできます。:
=======
We can also assign values using more complex expressions and function calls:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


<<<<<<< HEAD
### クラスフィールドでバインドされたメソッドを作成する

章 <info:bind> でデモしたように、JavaScript での関数は動的な `this` を持ちます。これは呼び出しのコンテキストに依存します。

そのため、オブジェクトメソッドが渡され、別のコンテキストで呼び出された場合、`this` はもうそのオブジェクトの参照ではありません。

例えば、このコードは `undefined` になります:
=======
### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

<<<<<<< HEAD
問題は "`this` なし" で呼び出されたことです。

章 <info:bind> で議論したように、これを直す2つのアプローチがあります。:

1. `setTimeout(() => button.click(), 1000)` のようにラッパー関数を渡す。
2. メソッドをオブジェクトにバインドする。 e.g. コンストラクタにて。

クラスフィールドは別の、すばらしい構文を提供します:
=======
The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

<<<<<<< HEAD
クラスフィールド `click = () => {...}` はオブジェクトごとに作られ、`Button` オブジェクトごとに別々の関数です。そして、`this` はそのオブジェクトを参照します。どこで `button.click` を渡しても、`this` は常に正しい値になります。

これはイベントリスナーなど、ブラウザ環境で特に役立ちます。

## サマリ

基本のクラス構文は次のようになります。:

```js
class MyClass {
  prop = value; // プロパティ

  constructor(...) { // コンストラクタ
    // ...
  }

  method(...) {} // メソッド

  get something(...) {} // getter
  set something(...) {} // setter

  [Symbol.iterator]() {} // 計算された名前のメソッド (ここではシンボル)
=======
The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.

## Summary

The basic class syntax looks like this:

```js
class MyClass {
  prop = value; // property

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // method

  get something(...) {} // getter method
  set something(...) {} // setter method

  [Symbol.iterator]() {} // method with computed name (symbol here)
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  // ...
}
```

<<<<<<< HEAD
`MyClass` は技術的には関数（`constructor` として提供）で、メソッド、getter / setter は `MyClass.prototype` に記述されます。

次の章では、継承など他の機能を含め、クラスにてより詳しく学びます。
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.

In the next chapters we'll learn more about classes, including inheritance and other features.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
