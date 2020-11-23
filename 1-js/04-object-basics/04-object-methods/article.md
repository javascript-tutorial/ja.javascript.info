# オブジェクトメソッド, "this"

オブジェクトは通常、ユーザや注文などのような、実世界のエンティティを表現するために作られます。:

```js
let user = {
  name: "John",
  age: 30
};
```

そして、実世界ではユーザは *アクション* することができます: ショッピングカードから何かを選んだり、ログイン、ログアウトなど。

アクションは、JavaScriptではプロパティの中で関数で表現されます。

<<<<<<< HEAD
[cut]

## メソッド例 

スタートとして、`user` が Hello と言うようにしましょう:
=======
## Method examples

For a start, let's teach the `user` to say hello:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

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
ここでは関数を作るために関数式を使い、それをオブジェクトの `user.sayHi` プロパティに代入しました。

その後、関数を呼ぶことができます。ユーザは今話すことができます!

オブジェクトのプロパティの関数は、*メソッド* と呼ばれます。
=======
Here we've just used a Function Expression to create a function and assign it to the property `user.sayHi` of the object.

Then we can call it as `user.sayHi()`. The user can now speak!

A function that is a property of an object is called its *method*.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

従って、ここではオブジェクト `user` のメソッド `sayHi` を作りました。

もちろん、次のように、宣言済みの関数をメソッドとして使うこともできます:

```js run
let user = {
  // ...
};

*!*
// 最初、宣言
function sayHi() {
  alert("Hello!");
};

// その後、メソッドを追加
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

<<<<<<< HEAD
```smart header="オブジェクト指向プログラミング"
エンティティを表現するためにオブジェクトを使ってコードを書くとき、それは、[object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), 略すと "OOP" とばれます。

OOPは大きなものであり、それ自体の興味深い科学です。 正しいエンティティを選択するにはどうすればいいですか？ どのようにそれらの間の相互作用を整理しますか？それはアーキテクチャーであり、それらは E.Gamma, R.Helm, R.Johnson, J.Vissides による"Design Patterns: Elements of Reusable Object-Oriented Software" または G.Booch による "Object-Oriented Analysis and Design with Applications" などのような、そのトピックについての素晴らしい本があります。私たちは、チャプター <info:object-oriented-programming> の後半でそのトピックの表面について触れます。
=======
```smart header="Object-oriented programming"
When we write our code using objects to represent entities, that's called [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP".

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
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
=======
// method shorthand looks better, right?
user = {
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
*!*
  sayHi() { // "sayHi: function()" と同じです
*/!*
    alert("Hello");
  }
};
```

上の通り、`"function"` を除き、単に `sayHi()` と書くことができます。

実を言うと、この表記は完全に同一ではありません。オブジェクトの継承(後で説明します)に関して微妙な違いがあります。が、今のところは問題ありません。ほぼ全てのケースでこの短縮構文は好まれます。

## メソッド中の "this" 

オブジェクトメソッドが処理をするために、オブジェクトに格納されている情報にアクセスする必要があることは一般的です。

例えば、`user.sayHi()` の内側のコードが `user` の名前を必要とするかもしれません。

**オブジェクトにアクセスするために、メソッドは `this` キーワードを使うことができます。**

`this` の値はメソッドを呼び出すのに使われた "ドットの前" のオブジェクトです。

例:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    // "this" is the "current object"
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

ここで `user.sayHi()` の実行中、`this` の値は `user` になります。

技術的には、`this` なしでもオブジェクトへのアクセスも可能です -- 外部変数経由での参照によって:

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

...しかし、このようなコードは信頼できません。もし `user` を `admin = user` のように別の変数にコピーすることにし、何かで`user`を上書きすると, 間違ったオブジェクトへアクセスすることになります。

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

<<<<<<< HEAD
admin.sayHi(); // Whoops! sayHi() の中で古い名前が使われました! エラーです!
=======
*!*
admin.sayHi(); // TypeError: Cannot read property 'name' of null
*/!*
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
```

もし `alert` の内側で、`user.name` の代わりに `this.name` を使うと、コードは動作します。

## "this" はバインドされていません 

<<<<<<< HEAD
JavaScriptでは、 "this" キーワードは他のほとんどのプログラミング言語とは異なる振る舞いをします。まず、どの関数にでも使えます。

このようなコードも構文エラーにはなりません:
=======
In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it's not a method of an object.

There's no syntax error in the following example:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

<<<<<<< HEAD
`this` の値は実行時に評価されます。そしてそれは何にでもなれます。

例えば、異なるオブジェクトから呼ばれた場合、同じ関数でも異なる "this" を持つ可能性があります:
=======
The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different "this" in the calls:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

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
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93
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
実際、オブジェクトまったくなしで関数を呼び出すこともできます:
=======
The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it's either `user` or `admin` in the example above.

````smart header="Calling without an object: `this == undefined`"
We can even call the function without an object at all:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

このケースでは、 strict モードでは `this` は `undefined` になります。もし `this.name` にアクセスしようとするとエラーになります。

<<<<<<< HEAD
非 strict モード(誰かが `use strict` を忘れた場合)では、このようなケースでは `this` の値は *グローバルオブジェクト* (ブラウザでは `window`, 後ほど学びます)になります。これは `"use strict"` が修正した歴史的な振る舞いです。

一般的に、オブジェクトなしで `this` を使う関数の呼び出しは、普通ではなくプログラム上の誤りであることに注意してください。もし関数が `this` を持っていたら、それは通常オブジェクトコンテキストで呼ばれることを意味しています。
=======
In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.

Usually such call is a programming error. If there's `this` inside a function, it expects to be called in an object context.
````
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

```smart header="バインドしていない `this` の結果"
もしあなたが別のプログラミング言語から来ていたら、恐らく "`this` のバインド" の考えに慣れているでしょう。それは、オブジェクトに定義されたメソッドは常にそのオブジェクトを参照する `this` を持っている、と言うものです。

<<<<<<< HEAD
JavaScriptでは、 `this` は "自由" です。その値は実行時に評価され、メソッドが宣言されている場所には依存せず、 "ドットの前の" オブジェクトが何であるか、に依存します。

実行時に評価される `this` の概念はプラスとマイナス両方を持っています。一方では、関数は異なるオブジェクトで再利用することができます。他方では、より大きな柔軟性はミスを導きやすいです。

ここで、我々のポジションはこの言語が決めたことが良いか悪いかを判断するものではありません。我々は、それをどうやって使うか、どうやって利益を得るか/問題を回避するかを理解することです。
```

## アロー関数は "this" を持ちません 

アロー関数は特別です: それらは "自身の" `this` を持ちません。もしこのような関数で `this` を参照した場合、外部の "通常の" 関数から取得されます。

例えば、ここで `arrow()` は外部の `user.sayHi()` メソッドから `this` を使います:
=======
In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and avoid problems.
```

## Arrow functions have no "this"

Arrow functions are special: they don't have their "own" `this`. If we reference `this` from such a function, it's taken from the outer "normal" function.

For instance, here `arrow()` uses `this` from the outer `user.sayHi()` method:
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

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
- メソッドを使うと、オブジェクトは `object.doSomething()` のように "振る舞う" ことができます。
- メソッドはオブジェクトを `this` で参照することができます。

<<<<<<< HEAD
`this` の値は実行時に定義されます。
- 関数が宣言されている場合、`this` を使うことができますが、その `this` は関数が呼び出されるまで値を持っていません。
- その関数はオブジェクト間でコピーできます。
- 関数が "メソッド" 構文で呼び出されたとき: `object.method()`, 呼び出し中の `this` の値は、`object` です。
=======
The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.
>>>>>>> 23da191b58643387783f38e999f5b05be87d3d93

アロー関数は特別であることに注意してください: それは　`this` を持っていません。`this` がアロー関数の中でアクセスされるとき、それは外側から取得されます。
