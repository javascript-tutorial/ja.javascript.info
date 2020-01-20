
<<<<<<< HEAD
# クラスの継承

2つのクラスがあるとしましょう。

`Animal`:
=======
# Class inheritance

Class inheritance is a way for one class to extend another class.

So we can create new functionality on top of the existing.

## The "extends" keyword

Let's say we have class `Animal`:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
<<<<<<< HEAD
    alert(`${this.name} stopped.`);
=======
    alert(`${this.name} stands still.`);
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
}

let animal = new Animal("My animal");
```

<<<<<<< HEAD
![](rabbit-animal-independent-animal.svg)


...そして `Rabbit`:

```js
class Rabbit {
  constructor(name) {
    this.name = name;
  }
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-rabbit.svg)


現時点では、完全に独立しています。

ですが、`Rabbit` は `Animal` を拡張したものにしたいです。言い換えると、うさぎ(rabbit)は動物(animal)をベースにするべきであり、`Animal` のメソッドへのアクセスを持ち、自身のメソッドでそれらを拡張するべきです。

他のクラスから継承するには、括弧 `{..}` の前に `"extends"` と親のクラスを指定します。

ここでは、`Rabbit` は `Animal` を継承しています。:

```js run
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stopped.`);
  }
}

// "extends Animal" を指定してAnimalから継承する
=======
Here's how we can represent `animal` object and `Animal` class graphically:

![](rabbit-animal-independent-animal.svg)

...And we would like to create another `class Rabbit`.

As rabbits are animals, `Rabbit` class should be based on `Animal`, have access to animal methods, so that rabbits can do what "generic" animals can do.

The syntax to extend another class is: `class Child extends Parent`.

Let's create `class Rabbit` that inherits from `Animal`:

```js
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
これで `Rabbit` は `Animal` のコンストラクタをデフォルトで利用するので、コードは少し短くなりました。そして、`run` をすることもできます。

内部では、`extends` キーワードは、`Rabbit.prototype` から `Animal.prototype` へとの `[[Prototype]]` 参照を追加しています:

![](animal-rabbit-extends.svg)

したがって、`Rabbit.prototype` にメソッドが見つからない場合、JavaScript は `Animal.prototype` から取ります。

チャプター <info:native-prototypes> から想起できるように、JavaScript は同じプロトタイプ継承を組み込みオブジェクトに対しても使います。E.g. `Date.prototype.[[Prototype]]` は `Object.prototype` なので、date は一般的なオブジェクトメソッドを持っています。

````smart header="`extends` の後では任意の式が指定できます"
クラス構文では単にクラスではなく、`extends` の後に任意の式を指定することができます。

例えば、親クラスを生成する関数呼び出します:
=======
Object of `Rabbit` class have access to both `Rabbit` methods, such as `rabbit.hide()`, and also to `Animal` methods, such as `rabbit.run()`.

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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

*!*
class User extends f("Hello") {}
*/!*

new User().sayHi(); // Hello
```
<<<<<<< HEAD
ここでは、 `class User` は `f("Hello")` の結果を継承しています。

多くの条件に依存したクラスを生成するための関数を使用し、それらから継承できるような高度なプログラミングパターンに対して、これは役立つ場合があります。
````

## メソッドのオーバーライド 

では、前に進めてメソッドをオーバライドをしてみましょう。今のところ、`Rabbit` は `Animal` から `this.speed = 0` をセットする `stop` メソッドを継承しています。

もし `Rabbit` で自身の `stop` を指定すると、代わりにそれが使われるようになります。:
=======
Here `class User` inherits from the result of `f("Hello")`.

That may be useful for advanced programming patterns when we use functions to generate classes depending on many conditions and can inherit from them.
````

## Overriding a method

Now let's move forward and override a method. By default, all methods that are not specified in `class Rabbit` are taken directly "as is" from `class Animal`.

But if we specify our own method in `Rabbit`, such as `stop()` then it will be used instead:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js
class Rabbit extends Animal {
  stop() {
<<<<<<< HEAD
    // ...これは rabbit.stop() のために使われる
=======
    // ...now this will be used for rabbit.stop()
    // instead of stop() from class Animal
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
}
```

<<<<<<< HEAD

...しかし、通常は親メソッドを完全に置き換えるのではなく、その上に組み立てて、その機能の微調整または拡張を行うことを望んできます。私たちはメソッド内で何かをしますが、その前後またはその処理の中で親メソッドを呼び出します。

クラスはそのために `"super"` キーワードを提供しています。

- `super.method(...)` は親メソッドを呼び出します。
- `super(...)` は親のコンストラクタを呼び出します(我々のコンストラクタの内側でのみ)。

例えば、私たちのうさぎが止まったとき自動的に隠れさせましょう。:
=======
Usually we don't want to totally replace a parent method, but rather to build on top of it to tweak or extend its functionality. We do something in our method, but call the parent method before/after it or in the process.

Classes provide `"super"` keyword for that.

- `super.method(...)` to call a parent method.
- `super(...)` to call a parent constructor (inside our constructor only).

For instance, let our rabbit autohide when stopped:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
class Animal {

  constructor(name) {
    this.speed = 0;
    this.name = name;
  }

  run(speed) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  stop() {
    this.speed = 0;
<<<<<<< HEAD
    alert(`${this.name} stopped.`);
=======
    alert(`${this.name} stands still.`);
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
<<<<<<< HEAD
rabbit.stop(); // White Rabbit stopped. White rabbit hides!
```

これで `Rabbit` は処理の中で親 `super.stop()` を呼び出す `stop` メソッドを持っています。

````smart header="アロー関数は `super` を持っていません"
チャプター <info:arrow-functions> で述べた通り、アロー関数には `super` がありません。

もしアクセスすると、外部の関数から取得されます。例えば:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // 1秒後親の stop 実行
=======
rabbit.stop(); // White Rabbit stands still. White rabbit hides!
```

Now `Rabbit` has the `stop` method that calls the parent `super.stop()` in the process.

````smart header="Arrow functions have no `super`"
As was mentioned in the chapter <info:arrow-functions>, arrow functions do not have `super`.

If accessed, it's taken from the outer function. For instance:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
}
```

<<<<<<< HEAD
アロー関数での `super` は `stop()` での `super` と同じです。なので、意図通りに動きます。ここのように "通常の" 関数を指定すると、エラーになります。:
=======
The `super` in the arrow function is the same as in `stop()`, so it works as intended. If we specified a "regular" function here, there would be an error:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

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

簡単な回答: 継承したクラスのコンストラクタは `super(...)` を呼び出し、(!) `this` を使う前にそれを行わなければなりません。

...しかしなぜ？ ここで何が起きているのでしょう？ 確かにこの要件は奇妙に見えます。

もちろん、それへの説明があります。詳細を見てみましょう。それであなたは何が起こっているのかを本当に理解するでしょう。

JavaScriptでは、"継承しているクラスのコンストラクタ関数" とその他すべてで区別があります。継承しているクラスでは、該当するコンストラクタ関数は特別な内部プロパティ `[[ConstructorKind]]:"derived"` が付けられます。

違いは:

- 通常のコンストラクタを実行するとき、`this` として空のオブジェクトを作り、それを続けます。
- しかし、派生したコンストラクタが実行されると、そうは実行されません。親のコンストラクタがこのジョブを実行することを期待しています。

なので、もし独自のコンスタクタを作っている場合には、`super` を呼ばないといけません。なぜなら、そうしないとそれを参照する `this` を持つオブジェクトは生成されないからです。 結果、エラーになるでしょう。

`Rabbit` を動作させるために、`this` を使う前に `super()` を呼ぶ必要があります。:
=======
// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

Whoops! We've got an error. Now we can't create rabbits. What went wrong?

The short answer is: constructors in inheriting classes must call `super(...)`, and (!) do it before using `this`.

...But why? What's going on here? Indeed, the requirement seems strange.

Of course, there's an explanation. Let's get into details, so you'll really understand what's going on.

In JavaScript, there's a distinction between a constructor function of an inheriting class (so-called "derived constructor") and other functions. A derived constructor has a special internal property `[[ConstructorKind]]:"derived"`. That's a special internal label.

That label affects its behavior with `new`.

- When a regular function is executed with `new`, it creates an empty object and assigns it to `this`.
- But when a derived constructor runs, it doesn't do this. It expects the parent constructor to do this job.

So a derived constructor must call `super` in order to execute its parent (non-derived) constructor, otherwise the object for `this` won't be created. And we'll get an error.

For the `Rabbit` constructor to work, it needs to call `super()` before using `this`, like here:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

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
// 今は問題ありませんｎ
=======
// now fine
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```


## Super: internals, [[HomeObject]]

<<<<<<< HEAD
`super` の内部をもう少し深く見てみましょう。ここで面白いことがいくつか見られます。

まず最初に、今まで私たちが学んだすべてのことだけでは、 `super` が動作するのは不可能です。

たしかに技術的にどのように動くのでしょうか？オブジェクトメソッドが実行されるとき、`this` として現在のオブジェクトを取ります。もし `super.method()` を呼び出す場合、どうやって `method` を取得するでしょう？当然ながら、我々は現在のオブジェクトのプロトタイプから `method` を取る必要があります。技術的に我々(またはJavaScriptエンジンは)どうやってそれをするのでしょうか？

恐らく、`this.__proto__.method` とすることで `this` の `[[Prototype]]` からメソッドを取得できる？残念ながらそれは動作しません。

それにトライしてみましょう。簡単にするために、クラスなしで単純なオブジェクトを使用します。

ここでは、`rabbit.eat()` は親オブジェクトの `animal.eat()` メソッドを呼び出す必要があります。:
=======
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let animal = {
  name: "Animal",
  eat() {
<<<<<<< HEAD
    alert(this.name + " eats.");
=======
    alert(`${this.name} eats.`);
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

<<<<<<< HEAD
行 `(*)` でプロトタイプ(`animal`) から `eat` を取り、現在のオブジェクトコンテキストでそれを呼び出します。
`.call(this)` はここでは重要であることに注意してください。なぜなら、シンプルな `this.__proto__.eat()` は現在のオブジェクトではなくプロトタイプのコンテキストで親の `eat` を実行するためです。

また、上のコードは実際に期待通り動作します: 正しい `alert` になります。

今度はもう1つのオブジェクトをチェーンに追加しましょう。 私たちは物事がどのように壊れるかを見ていきます:
=======
At the line `(*)` we take `eat` from the prototype (`animal`) and call it in the context of the current object. Please note that `.call(this)` is important here, because a simple `this.__proto__.eat()` would execute parent `eat` in the context of the prototype, not the current object.

And in the code above it actually works as intended: we have the correct `alert`.

Now let's add one more object to the chain. We'll see how things break:
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let animal = {
  name: "Animal",
  eat() {
<<<<<<< HEAD
    alert(this.name + " eats.");
=======
    alert(`${this.name} eats.`);
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
<<<<<<< HEAD
    // ...bounce around rabbit-style 
    // 親 (animal) メソッドを呼び出す
=======
    // ...bounce around rabbit-style and call parent (animal) method
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
<<<<<<< HEAD
    // ...do something with long ears
    // 親 (rabbit) メソッドを呼び出す
=======
    // ...do something with long ears and call parent (rabbit) method
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
<<<<<<< HEAD
longEar.eat(); // Error: 最大呼び出しスタックサイズを超えました
*/!*
```

コードはこれ以上動作しません! `longEar.ear()` を呼び出そうとするとエラーになります。

これは明白ではないかもしれませんが、もし `longEar.eat()` 呼び出しのトレースをすると、それがなぜかがわかります。行 `(*)` と `(**)` は共に、`this` の値は現在のオブジェクト (`longEar`) です。それが肝心です: すべてのオブジェクトメソッドはプロトタイプなどではなく、現在のオブジェクトを `this` として取得します。

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

**関数がクラスまたはオブジェクトメソッドとして指定されたとき、その `[[HomeObject]]` プロパティはそのオブジェクトになります。**

メソッドはそれらのオブジェクトを覚えているため、これは実際には "バインドされていない" 関数の考え方に反しています。また、`[[HomeObject]]` は変更することはできないため、このバインドは永遠です。なので、これは言語上の非常に重要な変更です。

しかし、この変更は安全です。`[[HomeObject]]` は プロトタイプを解決するために、`super` の中で親メソッドを呼び出すためだけに使われます。従って、互換性を損ねることはありません。

`super` がどのように動くのか見てみましょう -- 平易なオブジェクトを使って再び。:
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912

```js run
let animal = {
  name: "Animal",
<<<<<<< HEAD
  eat() {         // [[HomeObject]] == animal
    alert(this.name + " eats.");
=======
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} eats.`);
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
<<<<<<< HEAD
  eat() {         // [[HomeObject]] == rabbit
=======
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
    super.eat();
  }
};

*!*
<<<<<<< HEAD
=======
// works correctly
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
longEar.eat();  // Long Ear eats.
*/!*
```

<<<<<<< HEAD
すべてのメソッドは内部の `[[HomeObject]]` プロパティで、そのオブジェクトを覚えています。そして `super` は親のプロトタイプの解決のために `[[HomeObject]]` を使います。

`[[HomeObject]]` はクラスと単純なオブジェクト両方で定義されたメソッドのために定義されています。しかし、オブジェクトの場合、メソッドは指定された方法で正確に指定されなければなりません。: `"method: function()"` ではなく `method()` として指定する必要があります。

下の例では、上の例との比較のために非メソッド構文を使っています。`[[HomeObject]]` プロパティはセットされず、継承は動作しません。:

```js run
let animal = {
  eat: function() { // 短縮構文: eat() {...} にする必要があります
=======
It works as intended, due to `[[HomeObject]]` mechanics. A method, such as `longEar.eat`, knows its `[[HomeObject]]` and takes the parent method from its prototype. Without any use of `this`.

### Methods are not "free"

As we've known before, generally functions are "free", not bound to objects in JavaScript. So they can be copied between objects and called with another `this`.

The very existance of `[[HomeObject]]` violates that principle, because methods remember their objects. `[[HomeObject]]` can't be changed, so this bond is forever.

The only place in the language where `[[HomeObject]]` is used -- is `super`. So, if a method does not use `super`, then we can still consider it free and copy between objects. But with `super` things may go wrong.

Here's the demo of a wrong `super` result after copying:

```js run
let animal = {
  sayHi() {
    console.log(`I'm an animal`);
  }
};

// rabbit inherits from animal
let rabbit = {
  __proto__: animal,
  sayHi() {
    super.sayHi();
  }
};

let plant = {
  sayHi() {
    console.log("I'm a plant");
  }
};

// tree inherits from plant
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

A call to `tree.sayHi()` shows "I'm an animal". Definitevely wrong.

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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
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
    - これは `Child.prototype.__proto__` は `Parent.prototype` になることを意味するので、メソッドは継承されます。
2. コンストラクタをオーバーライドするとき:
    - `this` を使う前に `Child` コンストラクタの中で `super` として親のコンストラクタを呼ばなければなりません。
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
>>>>>>> db3b3f8e7a08c153ad8fa0ae50633cdf95fa8912
