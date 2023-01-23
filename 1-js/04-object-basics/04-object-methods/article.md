# オブジェクトメソッド, "this"

オブジェクトは通常、ユーザや注文などのように、実世界に存在するものを表現するために作られます:

```js
let user = {
  name: "John",
  age: 30
};
```

そして、実世界では、ユーザはショッピングカードから何かを選んだり、ログインしたり、ログアウトしたりと、 *アクション* することができます。

アクションは、JavaScriptではプロパティの関数として表現されます。

<<<<<<< HEAD
## メソッド例 

まず初めに、`user` が Hello と言うようにしてみましょう:
=======
## Method examples

For a start, let's teach the `user` to say hello:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

<<<<<<< HEAD
ここでは関数式を使って関数を作成し、それをオブジェクトのプロパティ `user.sayHi` に割り当てています。

この関数は `user.sayHi()` という形式で呼び出すことができます。これでユーザが話せるようになりました!

オブジェクトのプロパティとなっている関数は、*メソッド* と呼ばれます。
=======
Here we've just used a Function Expression to create a function and assign it to the property `user.sayHi` of the object.

Then we can call it as `user.sayHi()`. The user can now speak!

A function that is a property of an object is called its *method*.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

つまり、ここでは `user` オブジェクトの `sayHi` メソッドができたということです。

もちろん、次のように、宣言済みの関数をメソッドとして使うこともできます:

```js run
let user = {
  // ...
};

*!*
// 最初に関数を記述
function sayHi() {
  alert("Hello!");
}

// その後、メソッドとして追加
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

<<<<<<< HEAD
```smart header="オブジェクト指向プログラミング"
エンティティを表現するためにオブジェクトを使ってコードを書くことを、それは、[オブジェクト指向プログラミング(object-oriented programming)](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E6%8C%87%E5%90%91%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0), 略して "OOP" と呼ばれます。

OOPは大きなものであり、それ自体が興味深い科学です。 どうやって適切なエンティティを選択し、それらの間の相互作用を整理するのか？ それがアーキテクチャであり、このトピックについては素晴らしい本があります。 E.Gamma, R.Helm, R.Johnson, J.Vissides による "Design Patterns: Elements of Reusable Object-Oriented Software" や、 G.Booch による "Object-Oriented Analysis and Design with Applications" などです。
=======
```smart header="Object-oriented programming"
When we write our code using objects to represent entities, that's called [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP".

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
### メソッドの短縮表現

オブジェクトリテラルでは、メソッドのための短縮構文があります:

```js
// これらのオブジェクトは同じことをします

user = {
  sayHi: function() {
    alert("Hello");
  }
};

<<<<<<< HEAD
// メソッド簡略化はスッキリ見えますね
let user = {
*!*
  sayHi() { // "sayHi: function()" と同じです
=======
// method shorthand looks better, right?
user = {
*!*
  sayHi() { // same as "sayHi: function(){...}"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
    alert("Hello");
  }
};
```

上の通り、`"function"` を省き、単に `sayHi()` と書くことができます。

<<<<<<< HEAD
実を言うと、両者の表記は完全に同一ではありません。オブジェクトの継承(後で説明します)に関して微妙な違いがありますが、今のところは問題ありません。ほとんどの場合、短い構文の方が好まれます。
=======
To tell the truth, the notations are not fully identical. There are subtle differences related to object inheritance (to be covered later), but for now they do not matter. In almost all cases, the shorter syntax is preferred.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## メソッド中の "this" 

オブジェクトのメソッドが処理をするために、オブジェクトに格納されている情報にアクセスする必要があることは一般的です。

例えば、`user.sayHi()` 内のコードが `user` の名前を必要とするかもしれません。

**オブジェクトにアクセスするために、メソッドは `this` キーワードを使うことができます。**

`this` の値はメソッドを呼び出すのに使われた "ドットの前" のオブジェクトです。

例:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
<<<<<<< HEAD
    // "this" は "現在のオブジェクト"
=======
    // "this" is the "current object"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

ここで `user.sayHi()` の実行中、`this` の値は `user` になります。

技術的には、外部変数を介して参照することで、`this` を使わずにオブジェクトにアクセスすることも可能です:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "this" の代わりに "user"
*/!*
  }

};
```

...しかし、このようなコードは信頼性に欠けます。もし `user` を `admin = user` のように別の変数にコピーすることにし、何かで`user`を上書きすると、間違ったオブジェクトにアクセスすることになります。

次のような感じです:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // エラーにつながる
*/!*
  }

};


let admin = user;
user = null; // 明らかにするために上書きします

*!*
<<<<<<< HEAD
admin.sayHi(); // Whoops! sayHi() の中で古い名前が使われました! エラーです!
=======
admin.sayHi(); // TypeError: Cannot read property 'name' of null
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
```

`alert` の呼び出しで、`user.name` ではなく `this.name` を使うのであれば、コードは動作するでしょう。

## "this" はバインドされていません 

<<<<<<< HEAD
JavaScriptでは、 "this" キーワードは他のほとんどのプログラミング言語とは異なる振る舞いをします。オブジェクトのメソッドだけではなく、任意の関数内で使用することができます。

このようなコードも構文エラーにはなりません:
=======
In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object.

There's no syntax error in the following example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

<<<<<<< HEAD
`this` の値は、実行時にコンテキストに応じて評価されます。

例えば、ここでは同じ関数が2つの異なるオブジェクトに割り当てられており、呼び出しの際に異なる "this "が使われています:
=======
The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different "this" in the calls:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
<<<<<<< HEAD
// 2つのオブジェクトで同じ関数を使う
=======
// use the same function in two objects
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
user.f = sayHi;
admin.f = sayHi;
*/!*

// これらの呼び出しは異なる this を持ちます
// 関数の中の "this" は "ドット" の前のオブジェクトです
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ドットでも角括弧でも問題なくメソッドにアクセスできます)
```

<<<<<<< HEAD
ルールはシンプルです。`obj.f()` が呼び出されると、`f` の呼び出し中は `this` は `obj` です。つまり、上の例では `user` または `admin` となります。

````smart header="オブジェクトなしでの呼び出し: `this == undefined`"
オブジェクトがなくても関数を呼び出すことができます:
=======
The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it's either `user` or `admin` in the example above.

````smart header="Calling without an object: `this == undefined`"
We can even call the function without an object at all:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

<<<<<<< HEAD
このケースでは、 strict モードでは `this` は `undefined` になります。もし `this.name` にアクセスしようとするとエラーになります。

非 strict モード(誰かが `use strict` を忘れた場合)では、このようなケースでは `this` の値は *グローバルオブジェクト* (ブラウザでは `window`、後ほど学びます)になります。これは `"use strict"` で修正された歴史的な振る舞いです。

オブジェクトなしで `this` を使う関数の呼び出しは、一般的にプログラミングエラーであることに注意してください。関数の中に `this` がある場合、それはオブジェクトのコンテキストで呼ばれることを期待しています。
````

```smart header="バインドしていない `this` の結果"
もしあなたが他のプログラミング言語から来たのであれば、恐らく "バインドされた `this`" の考え方に慣れているでしょう。それは、オブジェクトに定義されたメソッドは常にそのオブジェクトを参照する `this` を持っている、と言うものです。

JavaScriptでは、 `this` は "自由" です。その値は実行時に評価され、メソッドが宣言されている場所には依存せず、 "ドットの前の" オブジェクトが何であるか、に依存します。

実行時に評価される `this` の概念は、プラスとマイナスの両方を持っています。一方では、1つの関数を異なるオブジェクトで再利用することができます。他方では、より大きな柔軟性は、ミスの招きやすさにつながります。

ここで、我々のポジションは、この言語設計上の決定が良いか悪いかを判断するものではありません。我々は、それをどうやって使うか、どうやって利益を得て、どのように問題を回避するかを理解するのです。
```

## アロー関数は "this" を持ちません 
=======
In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.

Usually such call is a programming error. If there's `this` inside a function, it expects to be called in an object context.
````

```smart header="The consequences of unbound `this`"
If you come from another programming language, then you are probably used to the idea of a "bound `this`", where methods defined in an object always have `this` referencing that object.

In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and avoid problems.
```

## Arrow functions have no "this"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

アロー関数は特別で、それらは "自身の" `this` を持ちません。もしこのような関数で `this` を参照した場合、外部の "通常の" 関数から取得されます。

例えば、ここで `arrow()` は、外部の `user.sayHi()` メソッドから `this` を使います:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

これはアロー関数の特別な機能です。別の `this` ではなく、外側のコンテキストから取り出したい場合に便利です。<info:arrow-functions>のセクションの後半では、より多くのアロー関数を扱います。


## サマリ 

- オブジェクトのプロパティに格納されている関数は "メソッド" と呼ばれます。
- メソッドは、`object.doSomething()` のように、オブジェクトを "行動" させることができます。
- メソッドはオブジェクトを `this` で参照することができます。

<<<<<<< HEAD
`this` の値は実行時に定義されます。
- 関数の宣言時、関数内で `this` を使うことができますが、 その `this` は関数が呼び出されるまで値を持っていません。
- 関数はオブジェクト間でコピーすることができます。
- 関数が `object.method()` という "メソッド" 構文で呼び出された場合、呼び出し中の `this` の値は、`object` です。
=======
The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

アロー関数は特別で、`this` を持たないことに注意してください。`this` がアロー関数の中でアクセスされるとき、それは外側から取得されます。
