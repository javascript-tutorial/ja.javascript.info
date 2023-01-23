
<<<<<<< HEAD
# クラスの継承

クラスの継承は、あるクラスが別のクラスを拡張するための方法です。

つまり、既存の機能の上に、新たな機能を作ることができます。

## "extends" キーワード

クラス `Animal` があるとします:
=======
# Class inheritance

Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.

## The "extends" keyword

Let's say we have class `Animal`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
<<<<<<< HEAD
    this.speed += speed;
=======
    this.speed = speed;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
<<<<<<< HEAD
    alert(`${this.name} stopped.`);
=======
    alert(`${this.name} stands still.`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}

let animal = new Animal("My animal");
```

<<<<<<< HEAD
これは、`animal` オブジェクトと `Animal` クラスを、グラフィカルに表現したものです。:

![](rabbit-animal-independent-animal.svg)

...そしてもう１つの `class Rabbit` を作成します。

うさぎ(rabbit)は動物(animal)なので、`Rabbit` クラスは `Animal` がベースとなり、animal メソッドへアクセスできます。これで、"一般的な" 動物が実行できることをうさぎも実行できます。

別のクラスを拡張する構文は `class Child extends Parent` です。

`Animal` を継承した `class Rabbit` を作成しましょう。:
=======
Here's how we can represent `animal` object and `Animal` class graphically:

![](rabbit-animal-independent-animal.svg)

...And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what "generic" animals can do.

The syntax to extend another class is: `class Child extends Parent`.

Let's create `class Rabbit` that inherits from `Animal`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
*!*
class Rabbit extends Animal {
*/!*
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

<<<<<<< HEAD
`Rabbit` クラスのオブジェクトは、`rabbit.hide()` のように `Rabbit` のメソッドと、`rabbit.run()` のように `Animal` メソッド両方が利用できます。

内部では、`extends` キーワードは、以前からあるプロトタイプの仕組みを使用して動作しています。`Rabbit.prototype.[[Prototype]]` を `Animal.prototype` にセットします。そのため、`Rabbit.prototype` でメソッドが見つからない場合には、JavaScript は `Animal.prototype` から取得します。

![](animal-rabbit-extends.svg)

例えば、`rabbit.run` メソッドを見つけるために、エンジンは次のようにチェックします（図の下から上）:
1. `rabbit` オブジェクト(`run` はありません)。
2. そのプロトタイプ、つまり `Rabbit.prototype`(`hide` はありますが、`run`はありません)。
3. そのプロトタイプ、つまり (`extends` しているため) `Animal.prototype`, (最終的に `run` メソッドを持ちます)。

<info:native-prototypes> の章から想起できるように、JavaScript は同じプロトタイプ継承を組み込みオブジェクトに対しても使います。E.g. `Date.prototype.[[Prototype]]` は `Object.prototype` なので、date は一般的なオブジェクトメソッドを持っています。

````smart header="`extends` の後では任意の式が指定できます"
クラス構文では単にクラスではなく、`extends` の後に任意の式を指定することができます。

例えば、親クラスを生成する関数呼び出します:
=======
Object of `Rabbit` class have access both to `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

Internally, `extends` keyword works using the good old prototype mechanics. It sets `Rabbit.prototype.[[Prototype]]` to `Animal.prototype`. So, if a method is not found in `Rabbit.prototype`, JavaScript takes it from `Animal.prototype`.

![](animal-rabbit-extends.svg)

For instance, to find `rabbit.run` method, the engine checks (bottom-up on the picture):
1. The `rabbit` object (has no `run`).
2. Its prototype, that is `Rabbit.prototype` (has `hide`, but not `run`).
3. Its prototype, that is (due to `extends`) `Animal.prototype`, that finally has the `run` method.

As we can recall from the chapter <info:native-prototypes>, JavaScript itself uses prototypal inheritance for built-in objects. E.g. `Date.prototype.[[Prototype]]` is `Object.prototype`. That's why dates have access to generic object methods.

````smart header="Any expression is allowed after `extends`"
Class syntax allows to specify not just a class, but any expression after `extends`.

For instance, a function call that generates the parent class:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function f(phrase) {
  return class {
<<<<<<< HEAD
    sayHi() { alert(phrase) }
  }
=======
    sayHi() { alert(phrase); }
  };
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
<<<<<<< HEAD
ここでは、 `class User` は `f("Hello")` の結果を継承しています。

多くの条件に依存したクラスを生成するために関数を使用し、それを継承するといった高度なプログラミングパターンに対して役立つ場合があります。
````

## メソッドのオーバーライド 

では、前に進めてメソッドをオーバライドをしてみましょう。デフォルトでは、`class Rabbit` では指定されておらず、`class Animal` から直接 "そのまま" 取得しています。

ですが、`Rabbit` で自身の `stop` を指定すると、代わりにそれが使われます。:
=======
Here `class User` inherits from the result of `f("Hello")`.

That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.
````

## Overriding a method

Now let's move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly "as is" from `class Animal`.

But if we specify our own method in `Rabbit`, such as `stop()` then it will be used instead:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class Rabbit extends Animal {
  stop() {
<<<<<<< HEAD
    // ...class Animal の stop() の代わりに
    // rabbit.stop() で利用されます
=======
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}
```

<<<<<<< HEAD
通常は親メソッドを完全に置き換えるのではなく、その上に機能の微調整または拡張を行うことを望みます。メソッド内で何かをしますが、その前後または処理中に親メソッドを呼び出します。

クラスはそのために `"super"` キーワードを提供しています。

- `super.method(...)` は親メソッドを呼び出します。
- `super(...)` は親のコンストラクタを呼び出します(コンストラクタの内側でのみ)。

例えば、うさぎ(rabbit)が止まったとき自動的に隠れさせます。:
=======
Usually, however, we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.

Classes provide `"super"` keyword for that.

- `super.method(...)` to call a parent method.
- `super(...)` to call a parent constructor (inside our constructor only).

For instance, let our rabbit autohide when stopped:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
<<<<<<< HEAD
    this.speed += speed;
=======
    this.speed = speed;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
<<<<<<< HEAD
    alert(`${this.name} stopped.`);
=======
    alert(`${this.name} stands still.`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }

}

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
<<<<<<< HEAD
    super.stop(); // 親の stop 呼び出し
    this.hide(); // その後隠す
=======
    super.stop(); // call parent stop
    this.hide(); // and then hide
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
<<<<<<< HEAD
rabbit.stop(); // White Rabbit stopped. White rabbit hides!
```

今、 `Rabbit` は処理の中で親 `super.stop()` を呼び出す `stop` メソッドを持ちます。

````smart header="アロー関数は `super` を持っていません"
<info:arrow-functions> の章で述べた通り、アロー関数には `super` がありません。

もしアクセスすると、外部の関数から取得されます。例えば:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // 1秒後、親の stop を実行
=======
rabbit.stop(); // White Rabbit stands still. White Rabbit hides!
```

Now `Rabbit` has the `stop` method that calls the parent `super.stop()` in the process.

````smart header="Arrow functions have no `super`"
As was mentioned in the chapter <info:arrow-functions>, arrow functions do not have `super`.

If accessed, it's taken from the outer function. For instance:

```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}
```

<<<<<<< HEAD
アロー関数での `super` は、 `stop()` 内での `super` と同じです。なので、意図通りに動きます。以下のように "通常の" 関数を指定するとエラーになります。:
=======
The `super` in the arrow function is the same as in `stop()`, so it works as intended. If we specified a "regular" function here, there would be an error:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````

<<<<<<< HEAD

## コンストラクタのオーバライド 

コンストラクタに対しては、少し用心が必要です。

今まで、`Rabbit` は自身の `constructor` を持っていませんでした。

[仕様(specification)](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation)によると、クラスが別のクラスを拡張し、`constructor` を持たない場合、次のような `constructor` が生成されます。

```js
class Rabbit extends Animal {
  // 独自のコンストラクタを持たないクラスを拡張するために生成されます
=======
## Overriding constructor

With constructors it gets a little bit tricky.

Until now, `Rabbit` did not have its own `constructor`.

According to the [specification](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation), if a class extends another class and has no `constructor`, then the following "empty" `constructor` is generated:

```js
class Rabbit extends Animal {
  // generated for extending classes without own constructors
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

<<<<<<< HEAD
ご覧の通り、基本的にはすべての引数を渡して親の `constructor` を呼び出します。それは自身のコンストラクタを書いていない場合に起こります。

では、カスタムのコンストラクタを `Rabbit` に追加してみましょう。それは `name` に加えて `earLength` を指定します。:
=======
As we can see, it basically calls the parent `constructor` passing it all the arguments. That happens if we don't write a constructor of our own.

Now let's add a custom constructor to `Rabbit`. It will specify the `earLength` in addition to `name`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  // ...
}

class Rabbit extends Animal {

*!*
  constructor(name, earLength) {
    this.speed = 0;
    this.name = name;
    this.earLength = earLength;
  }
*/!*

  // ...
}

*!*
<<<<<<< HEAD
// 動作しません!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this は定義されていません
*/!*
```

おっと! エラーになりました。これではうさぎを作ることができません。何が間違っていたのでしょう？

簡単な回答: 

- **継承したクラスのコンストラクタは `super(...)` を呼び出し、(!) `this` を使う前にそれを行わなければなりません。**

...しかしなぜでしょうか？ ここで何が起きているのでしょう？ 確かにこの要件は奇妙に見えます。

もちろん、これに対する説明がありますので詳細を見てみましょう。これで何が起こっているのかを理解するでしょう。

JavaScriptでは、継承しているクラスのコンストラクタ関数(いわゆる "派生コンストラクタ(derived constructor)") とその他の関数で区別があります。派生コンストラクタ関数は特別な内部プロパティ `[[ConstructorKind]]:"derived"` が付けられ、特別な内部のラベルです。

このラベルは `new` の振る舞いに影響を与えます、

- 通常の関数が `new` で実行される際、空のオブジェクトを作成し、 `this` に割り当てます。
- ですが、派生コンストラクタが実行されるとき、そうは実行されません。親のコンストラクタがこのジョブを実行することを期待します。

なので、親(元になる)コンストラクタを実行するために、派生コンスタクタは `super` の呼び出しが必要になります。そうしないと、`this` のオブジェクトは生成されないからです。結果、エラーになるでしょう。

`Rabbit` コンストラクタを動作させるために、`this` を使う前に `super()` を呼びます。:
=======
// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

Whoops! We've got an error. Now we can't create rabbits. What went wrong?

The short answer is:

- **Constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.**

...But why? What's going on here? Indeed, the requirement seems strange.

Of course, there's an explanation. Let's get into details, so you'll really understand what's going on.

In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called "derived constructor") and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That's a special internal label.

That label affects its behavior with `new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do this job.

So a derived constructor must call `super` in order to execute its parent (base) constructor, otherwise the object for `this` won't be created. And we'll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  // ...
}

class Rabbit extends Animal {

  constructor(name, earLength) {
*!*
    super(name);
*/!*
    this.earLength = earLength;
  }

  // ...
}

*!*
<<<<<<< HEAD
// 今は問題ありません
=======
// now fine
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```

<<<<<<< HEAD


### クラスフィールドのオーバーライド: a tricky note

```warn header="高度な内容です"
ここの内容は、他のプログラミング言語でのクラスに対してある程度経験あること前提としています。

言語へのよりよい洞察を提供し、バグの原因になりうる(ただし頻度はそれほど頻繁ではありません)振る舞いについても説明します。

理解するのが難しい場合は、先に進んで読み続けてから、しばらくしてから戻ってください。
```

メソッドだけではなく、クラスフィールドもオーバーライドすることができます。

ですが、親のコンストラクタでオーバーライドされたフィールドにアクセスする際、多くの他他のプログラミング言語とは大きく異る、トリッキーな振る舞いがあります。

この例を考えます:
=======
### Overriding class fields: a tricky note

```warn header="Advanced note"
This note assumes you have a certain experience with classes, maybe in other programming languages.

It provides better insight into the language and also explains the behavior that might be a source of bugs (but not very often).

If you find it difficult to understand, just go on, continue reading, then return to it some time later.
```

We can override not only methods, but also class fields.

Although, there's a tricky behavior when we access an overridden field in parent constructor, quite different from most other programming languages.

Consider this example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {
  name = 'animal';

  constructor() {
    alert(this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';
}

new Animal(); // animal
*!*
new Rabbit(); // animal
*/!*
```

<<<<<<< HEAD
ここでは、クラス `Rabbit` は `Animal` を拡張しており、`name` フィールドを自身の値としてオーバーライドしています。

`Rabbit` には自身のコンストラクタはないので、`Animal` コンストラクタが呼ばれます。

興味深いことは、`new Animal()` と `new Rabbit()` 両方のケースで、行 `(*)` の `alert` は `animal` を表示することです。

**言い換えると、親コンストラクタは常にオーバーライドされたものではなく、自身のフィールド値を利用します。**

何がおかしいでしょうか?

まだはっきりしない場合は、メソッドの場合と比較してみてください。

ここには同じコードがありますが、`this.name` フィールドの代わりに `this.showName()` メソッドを呼んでいます。:

```js run
class Animal {
  showName() {  // this.name = 'animal' の代わり
=======
Here, class `Rabbit` extends `Animal` and overrides the `name` field with its own value.

There's no own constructor in `Rabbit`, so `Animal` constructor is called.

What's interesting is that in both cases: `new Animal()` and `new Rabbit()`, the `alert` in the line `(*)` shows `animal`.

**In other words, the parent constructor always uses its own field value, not the overridden one.**

What's odd about it?

If it's not clear yet, please compare with methods.

Here's the same code, but instead of `this.name` field we call `this.showName()` method:

```js run
class Animal {
  showName() {  // instead of this.name = 'animal'
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    alert('animal');
  }

  constructor() {
<<<<<<< HEAD
    this.showName(); // alert(this.name); の代わり
=======
    this.showName(); // instead of alert(this.name);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}

class Rabbit extends Animal {
  showName() {
    alert('rabbit');
  }
}

new Animal(); // animal
*!*
new Rabbit(); // rabbit
*/!*
```

<<<<<<< HEAD
注目してください: 出力結果は異なります。

そして、これは自然に期待しているものです。親コンストラクタが派生クラスで呼び出されるとき、オーバーライドされたメソッドが使用されます。

...ですが、クラスフィールドの場合はそうではありません。前述のように、親コンストラクタは常に親フィールドを使用します。

なぜ差異があるのでしょうか？

理由は、フィールドの初期化順です。クラスフィールドは次のタイミングで初期化されます:
- ベースクラスのコンストラクタ(何も拡張していない)の前
- 派生クラスの `super()` の直後

今回のケースでは、`Rabbit` は派生クラスで、`constructor()` はありません。以前言った通り、これは`super(...args)` だけがある空のコンストラクタと同じです。

そのため、`new Rabbit()` は `super()` を呼び出し、親コンストラクタを実行し、(派生クラスのルールに従い)その後クラスフィールドが初期化されます。親コンストラクタが実行された時点では、まだ `Rabbit` クラスフィールドはないため、`Animal` フィールドが使用されます。

フィールドとメソッドのこの微妙な違いは、JavaScript 固有のものです。

幸い、この振る舞いはオーバーライドされたフィールドが親コンストラクタの中で使用されている場合にのみです。出くわすと何が起こっているのか理解するのが難しいかもしれないので、ここで説明しています。

問題担った場合には、フィールドの代わりにメソッドあるいは getter/setter を使用して修正できます。


## Super: internals, [[HomeObject]]

```warn header="高度な情報です"
初めてチュートリアルを読んでいるなら、このセクションはスキップして構いません。

ここは、継承と `super` の内部の仕組みについて説明しています。
```

`super` の内部をもう少し詳細に見ていきましょう。ここまでで、いくつか興味深いことがあります。

まず最初に、今まで学んできたすべてのことだけでは、 `super` が完全動作するのは不可能です!

確かに、それが技術的にどのように動くのか、自問してみましょう。オブジェクトメソッドを実行するとき、`this` は現在のオブジェクトを取ります。もし `super.method()` を呼び出す場合、エンジンは現在のオブジェクトのプロトタイプから `method` を取得する必要があります。

課題はシンプルに見えますが、そうではありません。エンジンは現在のオブジェクト `this` を知っているので、`this.__proto__.method` で親の `method` が取得できるかもしれません。残念ながら、このような "単純な" 解決策は機能しません。

問題をデモしてみましょう。簡単にするために、クラスなしで単純なオブジェクトを使用します。

詳細を知る必要がなければ、このパートをスキップして `[[HomeObject]]` サブセクションに進んでください。特に問題はありません。ここは物事を深く理解することに興味がある場合に呼んでください。

以下の例で、`rabbit.__proto__ = animal` です。`rabbit.eat()` で、`this.__proto__` を使用して、`animal.eat()` メソッドを呼び出します:
=======
Please note: now the output is different.

And that's what we naturally expect. When the parent constructor is called in the derived class, it uses the overridden method.

...But for class fields it's not so. As said, the parent constructor always uses the parent field.

Why is there a difference?

Well, the reason is the field initialization order. The class field is initialized:
- Before constructor for the base class (that doesn't extend anything),
- Immediately after `super()` for the derived class.

In our case, `Rabbit` is the derived class. There's no `constructor()` in it. As said previously, that's the same as if there was an empty constructor with only `super(...args)`.

So, `new Rabbit()` calls `super()`, thus executing the parent constructor, and (per the rule for derived classes) only after that its class fields are initialized. At the time of the parent constructor execution, there are no `Rabbit` class fields yet, that's why `Animal` fields are used.

This subtle difference between fields and methods is specific to JavaScript.

Luckily, this behavior only reveals itself if an overridden field is used in the parent constructor. Then it may be difficult to understand what's going on, so we're explaining it here.

If it becomes a problem, one can fix it by using methods or getters/setters instead of fields.

## Super: internals, [[HomeObject]]

```warn header="Advanced information"
If you're reading the tutorial for the first time - this section may be skipped.

It's about the internal mechanisms behind inheritance and `super`.
```

Let's get a little deeper under the hood of `super`. We'll see some interesting things along the way.

First to say, from all that we've learned till now, it's impossible for `super` to work at all!

Yeah, indeed, let's ask ourselves, how it should technically work? When an object method runs, it gets the current object as `this`. If we call `super.method()` then, the engine needs to get the `method` from the prototype of the current object. But how?

The task may seem simple, but it isn't. The engine knows the current object `this`, so it could get the parent `method` as `this.__proto__.method`. Unfortunately, such a "naive" solution won't work.

Let's demonstrate the problem. Without classes, using plain objects for the sake of simplicity.

You may skip this part and go below to the `[[HomeObject]]` subsection if you don't want to know the details. That won't harm. Or read on if you're interested in understanding things in-depth.

In the example below, `rabbit.__proto__ = animal`. Now let's try: in `rabbit.eat()` we'll call `animal.eat()`, using `this.__proto__`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  name: "Animal",
  eat() {
<<<<<<< HEAD
    alert(this.name + " eats.");
=======
    alert(`${this.name} eats.`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
<<<<<<< HEAD
    // これがおそらく super.eat() が動作する方法です
=======
    // that's how super.eat() could presumably work
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

<<<<<<< HEAD
行 `(*)` でプロトタイプ(`animal`) から `eat` を取り、現在のオブジェクトコンテキストでそれを呼び出します。`.call(this)` はここでは重要であることに注意してください。なぜなら、シンプルな `this.__proto__.eat()` は現在のオブジェクトではなくプロトタイプのコンテキストで親の `eat` を実行するためです。

また、上のコードは実際に期待通り動作します: 正しい `alert` になります。

今度はもう1つのオブジェクトをチェーンに追加しましょう。 どのように壊れるかを見てみます:
=======
At the line `(*)` we take `eat` from the prototype (`animal`) and call it in the context of the current object. Please note that `.call(this)` is important here, because a simple `this.__proto__.eat()` would execute parent `eat` in the context of the prototype, not the current object.

And in the code above it actually works as intended: we have the correct `alert`.

Now let's add one more object to the chain. We'll see how things break:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  name: "Animal",
  eat() {
<<<<<<< HEAD
    alert(this.name + " eats.");
=======
    alert(`${this.name} eats.`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
<<<<<<< HEAD
    // ...bounce around rabbit-style 親 (animal) メソッドを呼び出す
=======
    // ...bounce around rabbit-style and call parent (animal) method
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
<<<<<<< HEAD
    // ...do something with long ears 親 (rabbit) メソッドを呼び出す
=======
    // ...do something with long ears and call parent (rabbit) method
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
<<<<<<< HEAD
longEar.eat(); // Error: 最大呼び出しスタックサイズを超えました
*/!*
```

コードはこれ以上動作しません! `longEar.ear()` を呼び出そうとするとエラーになります。

これは明白ではないかもしれませんが、もし `longEar.eat()` 呼び出しをトレースをするとなぜかが分かります。行 `(*)` と `(**)` は共に、`this` の値は現在のオブジェクト (`longEar`) です。それが肝心です: すべてのオブジェクトメソッドはプロトタイプなどではなく、現在のオブジェクトを `this` として取得します。

したがって、行 `(*)` と `(**)` は共に、`this.__proto__` の値は全く同じで、`rabbit` です。それらは両方とも、無限ループで `rabbit.eat` を呼んでいます。

これは何が起きているかを示す図です。:

![](this-super-loop.svg)

1. `longEar.eat()` の中で、行 `(**)` は `this=longEar` となる `rabbit.eat` を呼び出します。
    ```js
    // longEar.eat() の中では this = longEar です
    this.__proto__.eat.call(this) // (**)
    // なので次のようになります
    longEar.__proto__.eat.call(this)
    // つまり呼ばれるのは
    rabbit.eat.call(this);
    ```
2. 次に `rabbit.eat` の 行 `(*)` で、チェーンの中でより高次へ呼び出しを渡したいですが、`this=longEar` なので、 `this=__prto__.eat` は再び `rabbit.eat` です!

    ```js
    // rabbit.eat() の中でも this = longEar です
    this.__proto__.eat.call(this) // (*)
    // なので次のようになります
    longEar.__proto__.eat.call(this)
    // なので (再び)
    rabbit.eat.call(this);
    ```

3. ...したがって、それ以上高次へ登ることができないので、`rabbit.eat` はエンドレスで自身を呼び出します。

`this` だけを使ってこの問題を解くことはできません。

### `[[HomeObject]]`

その解決策を提供するため、JavaScriptはもう１つ関数のための特別な内部プロパティを追加しています: `[[HomeObject]]` です。

関数がクラスまたはオブジェクトメソッドとして指定されたとき、その `[[HomeObject]]` プロパティはそのオブジェクトになります。

そして、`super` はこれを使って親のプロトタイプとメソッドメソッドを解決しましま。

最初のオブジェクトで、それがどのように動くのか見てみましょう:
=======
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

The code doesn't work anymore! We can see the error trying to call `longEar.eat()`.

It may be not that obvious, but if we trace `longEar.eat()` call, then we can see why. In both lines `(*)` and `(**)` the value of `this` is the current object (`longEar`). That's essential: all object methods get the current object as `this`, not a prototype or something.

So, in both lines `(*)` and `(**)` the value of `this.__proto__` is exactly the same: `rabbit`. They both call `rabbit.eat` without going up the chain in the endless loop.

Here's the picture of what happens:

![](this-super-loop.svg)

1. Inside `longEar.eat()`, the line `(**)` calls `rabbit.eat` providing it with `this=longEar`.
    ```js
    // inside longEar.eat() we have this = longEar
    this.__proto__.eat.call(this) // (**)
    // becomes
    longEar.__proto__.eat.call(this)
    // that is
    rabbit.eat.call(this);
    ```
2. Then in the line `(*)` of `rabbit.eat`, we'd like to pass the call even higher in the chain, but `this=longEar`, so `this.__proto__.eat` is again `rabbit.eat`!

    ```js
    // inside rabbit.eat() we also have this = longEar
    this.__proto__.eat.call(this) // (*)
    // becomes
    longEar.__proto__.eat.call(this)
    // or (again)
    rabbit.eat.call(this);
    ```

3. ...So `rabbit.eat` calls itself in the endless loop, because it can't ascend any further.

The problem can't be solved by using `this` alone.

### `[[HomeObject]]`

To provide the solution, JavaScript adds one more special internal property for functions: `[[HomeObject]]`.

When a function is specified as a class or object method, its `[[HomeObject]]` property becomes that object.

Then `super` uses it to resolve the parent prototype and its methods.

Let's see how it works, first with plain objects:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  name: "Animal",
<<<<<<< HEAD
  eat() {         // [[HomeObject]] == animal
    alert(this.name + " eats.");
=======
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
<<<<<<< HEAD
  eat() {         // [[HomeObject]] == rabbit
=======
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
<<<<<<< HEAD
  eat() {         // [[HomeObject]] == longEar
=======
  eat() {         // longEar.eat.[[HomeObject]] == longEar
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    super.eat();
  }
};

*!*
<<<<<<< HEAD
// ただしく機能します
=======
// works correctly
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
longEar.eat();  // Long Ear eats.
*/!*
```

<<<<<<< HEAD
`[[HomeObject]]` のより、意図したとおりに動作します。`longEar.eat` のようなメソッドは、その `[[HomeObject]]` を知っており、そのプロトタイプから親のメソッドを取得します。`this` を使用することなく。

### メソッドは "自由" ではありません

これまでの認識の通り、一般的な関数は "自由" であり、JavaScript のオブジェクトにバインドされていません。そのため、オブジェクト間でコピーしたり別の `this` で呼び出すことができます。

しかし、メソッドはそのオブジェクトを記録しているため、`[[HomeObject]]` の存在はその原則に違反します。`[[HomeObject]]` は変更できないため、このバインドは永遠です。

`[[HomeObject]]` が使用される言語での唯一の場所が `super` です。したがって、メソッドが `super` を使用しない場合、メソッドは以前として自由とみなせ、オブジェクト間でコピーできます。しかし、`super` があると、うまくいかない可能性があります。

これはコピー後の上手く行かない `super` の結果のデモです:
=======
It works as intended, due to `[[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its `[[HomeObject]]` and takes the parent method from its prototype. Without any use of `this`.

### Methods are not "free"

As we've known before, generally functions are "free", not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existence of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` result after copying:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

<<<<<<< HEAD
// rabbit は animal を継承
=======
// rabbit inherits from animal
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    alert("I'm a plant");
  }
};

<<<<<<< HEAD
// tree は plant を継承
=======
// tree inherits from plant
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let tree = {
  __proto__: plant,
*!*
  sayHi: rabbit.sayHi // (*)
*/!*
};

*!*
tree.sayHi();  // I'm an animal (?!?)
*/!*
```

<<<<<<< HEAD
`tree.sayHi()` の呼び出しは、"I'm an animal" を表示します。これは間違いです。

理由は簡単です:
- 行 `(*)` で、メソッド `tree.sayHi` は `rabbit` からコピーされました。
- `rabbit` で作られているので、`[[HomeObject]]` は `rabbit` です。`[[HomeObject]]` を変える方法はありません。
- `tree.sayHi()` のコードは `super.sayHi()` を内部に持ちます。`rabbit` から進み、`animal` よりメソッドを取得します。

これが、起きていることの図です。:

![](super-homeobject-wrong.svg)

### 関数プロパティではないメソッド

`[[HomeObject]]` はクラスと単純なオブジェクト両方で定義されたメソッドに対して定義されています。しかし、オブジェクトの場合、メソッドは指定された方法で正確に指定されなければなりません。: `"method: function()"` ではなく `method()` として指定する必要があります。

我々にとってこの違いは本質的ではないかもしれませんが、JavaScript にとっては重要です。

下の例では、上の例との比較のために非メソッド構文を使っています。`[[HomeObject]]` プロパティはセットされず、継承は動作しません。:

```js run
let animal = {
  eat: function() { // 短縮構文: eat() {...} にする必要があります
=======
A call to `tree.sayHi()` shows "I'm an animal". Definitely wrong.

The reason is simple:
- In the line `(*)`, the method `tree.sayHi` was copied from `rabbit`. Maybe we just wanted to avoid code duplication?
- Its `[[HomeObject]]` is `rabbit`, as it was created in `rabbit`. There's no way to change `[[HomeObject]]`.
- The code of `tree.sayHi()` has `super.sayHi()` inside. It goes up from `rabbit` and takes the method from `animal`.

Here's the diagram of what happens:

![](super-homeobject-wrong.svg)

### Methods, not function properties

`[[HomeObject]]` is defined for methods both in classes and in plain objects. But for objects, methods must be specified exactly as `method()`, not as `"method: function()"`.

The difference may be non-essential for us, but it's important for JavaScript.

In the example below a non-method syntax is used for comparison. `[[HomeObject]]` property is not set and the inheritance doesn't work:

```js run
let animal = {
  eat: function() { // intentionally writing like this instead of eat() {...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    // ...
  }
};

let rabbit = {
  __proto__: animal,
  eat: function() {
    super.eat();
  }
};

*!*
<<<<<<< HEAD
rabbit.eat();  // super 呼び出しエラー([[HomeObject]] が無いため)
*/!*
```

## サマリ

1. クラスを拡張するには: `class Child extends Parent`:
    - これは `Child.prototype.__proto__` は `Parent.prototype` になることを意味し、メソッドが継承されます。
2. コンストラクタをオーバーライドするとき:
    - `this` を使う前に `Child` コンストラクタの中で `super` として親のコンストラクタを呼ぶ必要があります。
3. 他のメソッドをオーバーライドするとき:
    - `super.method()` を使用することで、`Child` で親のメソッドを呼び出すことができます。
4. 内部:
    - メソッドは内部の `[[HomeObject]]` プロパティで自身のクラス/オブジェクトを覚えています。 これが `super` が親メソッドを解決する方法です。
    - そのため、あるオブジェクトから別のオブジェクトへ `super` を持つメソッドをコピーするのは安全ではありません。

また：
 - アロー関数は独自の `this` や `super` を持っていないので、周囲の文脈に透過的にフィットします。
=======
rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
*/!*
```

## Summary

1. To extend a class: `class Child extends Parent`:
    - That means `Child.prototype.__proto__` will be `Parent.prototype`, so methods are inherited.
2. When overriding a constructor:
    - We must call parent constructor as `super()` in `Child` constructor before using `this`.
3. When overriding another method:
    - We can use `super.method()` in a `Child` method to call `Parent` method.
4. Internals:
    - Methods remember their class/object in the internal `[[HomeObject]]` property. That's how `super` resolves parent methods.
    - So it's not safe to copy a method with `super` from one object to another.

Also:
- Arrow functions don't have their own `this` or `super`, so they transparently fit into the surrounding context.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
