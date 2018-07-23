
# クラスの継承, super

クラスは別のクラスに拡張することができます。 技術的には、プロトタイプの継承に基づいた素晴らしい構文があります。

別のクラスから継承するためには、`"extends"` と括弧 `{..}` の前に親クラスを指定する必要があります。

[cut]

ここでは、`Rabbit` は `Animal` から継承しています:

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

*!*
// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}
*/!*

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.hide(); // White Rabbit hides!
```

`extends` キーワードは、実際には `Rabbit.prototype` から `Animal.prototype` へ `[[Prototype]]` 参照を追加します。

![](animal-rabbit-extends.png)

なので、現在 `rabbit` は自身のメソッドと `Animal` のメソッド両方へのアクセスを持ちます。

````smart header="`extends` の後では任意の式が指定できます"
クラス構文では単にクラスではなく、`extends` の後に任意の式を指定することができます。

例えば、親クラスを生成する関数呼び出します:

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
ここでは、 `class User` は `f("Hello")` の結果を継承しています。

多くの条件に依存したクラスを生成するための関数を使用し、それらから継承できるような高度なプログラミングパターンに対して、これは役立つ場合があります。
````

## メソッドのオーバーライド [#overriding-a-method]

では、前に進めてメソッドをオーバライドをしてみましょう。今のところ、`Rabbit` は `Animal` から `this.speed = 0` をセットする `stop` メソッドを継承しています。

もし `Rabbit` で自身の `stop` を指定すると、代わりにそれが使われるようになります。:

```js
class Rabbit extends Animal {
  stop() {
    // ...this will be used for rabbit.stop()
  }
}
```


...しかし、通常は親メソッドを完全に置き換えるのではなく、その上に組み立てて、その機能の微調整または拡張を行うことを望んできます。私たちはメソッド内で何かをしますが、その前後またはその処理の中で親メソッドを呼び出します。

クラスはそのために `"super"` キーワードを提供しています。

- `super.method(...)` は親メソッドを呼び出します。
- `super(...)` は親のコンストラクタを呼び出します(我々のコンスタクタの内側でのみ)。

例えば、私たちのうさぎが止まったとき自動的に隠れさせましょう。:

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

class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }

*!*
  stop() {
    super.stop(); // call parent stop
    this.hide(); // and then hide
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stopped. White rabbit hides!
```

これで `Rabbit` は処理の中で親 `super.stop()` を呼び出す `stop` メソッドを持っています。

````smart header="アロー関数は `super` を持っていません"
チャプター <info:arrow-functions> で述べた通り、アロー関数には `super` がありません。

もしアクセスすると、外部の関数から取得されます。例えば:
```js
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000); // call parent stop after 1sec
  }
}
```

アロー関数での `super` は `stop()` での `super` と同じです。なので、意図通りに動きます。ここのように "通常の" 関数を指定すると、エラーになります。:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````


## コンストラクタのオーバライド [#overriding-constructor]

コンストラクタに対しては、少し用心が必要です。

今まで、`Rabbit` は自身の `constructor` を持っていませんでした。


[仕様(specification)](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation)によると、クラスが別のクラスを拡張し、`constructor` を持たない場合、次のような `constructor` がせいせされます。

```js
class Rabbit extends Animal {
  // generated for extending classes without own constructors
*!*
  constructor(...args) {
    super(...args);
  }
*/!*
}
```

ご覧の通り、基本的にはすべての引数を渡して親の `constructor` を呼び出します。それは自身のコンストラクタを書いていない場合に起こります。
では、カスタムのコンストラクタを `Rabbit` に追加してみましょう。それは `name` に加えて `earLength` を指定します。:

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
// Doesn't work!
let rabbit = new Rabbit("White Rabbit", 10); // Error: this is not defined.
*/!*
```

おっと! エラーになりました。これではうさぎを作ることができません。何が間違っていたのでしょう？

簡単な回答: 継承したクラスのコンストラクタは `super(...)` を呼び出し、(!) `this` を使う前にそれを行わなければなりません。

...しかしなぜ？ ここで何が起きているのでしょう？ 確かにこの要件は奇妙に見えます。

もちろん、それへの説明があります。詳細を見てみましょう。それであなたは何が起こっているのかを本当に理解するでしょう。

JavaScriptでは、"継承しているクラスのコンストラクタ関数" とその他すべてで区別があります。継承しているクラスでは、該当するコンストラクタ関数は特別な内部プロパティ `[[ConstructorKind]]:"derived"` が付けられます。

違いは:

- 通常のコンストラクタを実行するとき、`this` として空のオブジェクトを作り、それを続けます。
- しかし、派生したコンストラクタが実行されると、そうは実行されません。それは親のコンストラクタがこのジョブを実行することを期待しています。

なので、もし独自のコンスタクタを作っている場合には、`super` を呼ばないといけません。なぜなら、そうしないとそれを参照する `this` を持つオブジェクトは生成されないからです。 そして、エラーになるでしょう。

`Rabbit` を動作させるために、`this` を使う前に `super()` を呼ぶ必要があります。:

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
// now fine
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```


## Super: internals, [[HomeObject]]

`super` の内部をもう少し深く見てみましょう。ここで面白いことがいくつか見られます。

まず最初に、今まで私たちが学んだすべてのことだけでは、 `super` が動作するのは不可能です。

ええ、たしかに技術的にどのように動くのでしょうか？オブジェクトメソッドを実行されるとき、`this` として現在のオブジェクトを取ります。もし `super.method()` を呼び出す場合、どうやって `method` を取得するでしょう？当然ながら、我々は現在のオブジェクトのプロトタイプから `method` を取る必要があります。技術的に我々(またはJavaScriptエンジンは)どうやってそれをするのでしょうか？

恐らく、私たちは `this.__proto__.method` とすることで `this` の `[[Prototype]]` からメソッドを取得できる？残念ながらそれは動作しません。

それにトライしてみましょう。簡単にするために、クラスなしで単純なオブジェクトを使用します。

ここでは、`rabbit.eat()` は親オブジェクトの `animal.eat()` メソッドを呼び出す必要があります。:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {
*!*
    // that's how super.eat() could presumably work
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

行 `(*)` でプロトタイプ(`animal`) から `eat` を取り、現在のオブジェクトコンテキストでそれを呼び出します。
`.call(this)` はここでは重要であることに注意してください。なぜなら、シンプルな `this.__proto__.eat()` は現在のオブジェクトではなくプロトタイプのコンテキストで親の `eat` を実行するためです。

また、上のコードは実際に期待通り動作します: 正しい `alert` になります。

今度はもう1つのオブジェクトをチェーンに追加しましょう。 私たちは物事がどのように壊れるかを見ていきます:

```js run
let animal = {
  name: "Animal",
  eat() {
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  eat() {
    // ...bounce around rabbit-style and call parent (animal) method
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears and call parent (rabbit) method
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
longEar.eat(); // Error: Maximum call stack size exceeded
*/!*
```

コードはこれ以上動作しません! `longEar.ear()` を呼び出そうとするとエラーになります。

これは明白ではないかもしれませんが、もし `longEar.eat()` 呼び出しのトレースをすると、それがなぜかがわかります。行 `(*)` と `(**)` は共に、`this` の値は現在のオブジェクト (`longEar`) です。それが肝心です: すべてのオブジェクトメソッドはプロトタイプなどではなく、現在のオブジェクトを `this` として取得します。

従って、行 `(*)` と `(**)` は共に、`this.__proto__` の値は全く同じで、`rabbit` です。それらは両方とも、無限ループで `rabbit.eat` を呼んでいます。

これは何が起きているかを示す図です。:

![](this-super-loop.png)

1. `longEar.eat()` の中で、行 `(**)` は `this=longEar` となる `rabbit.eat` を呼び出します。
    ```js
    // inside longEar.eat() we have this = longEar
    this.__proto__.eat.call(this) // (**)
    // becomes
    longEar.__proto__.eat.call(this)
    // that is
    rabbit.eat.call(this);
    ```
2. 次に `rabbit.eat` の 行 `(*)` で、チェーンの中でより高次へ呼び出しを渡したいですが、`this=longEar` なので、 `this=__prto__.eat` は再び `rabbit.eat` です!
    ```js
    // inside rabbit.eat() we also have this = longEar
    this.__proto__.eat.call(this) // (*)
    // becomes
    longEar.__proto__.eat.call(this)
    // or (again)
    rabbit.eat.call(this);
    ```

3. ...従って、それ以上高次へ登ることができないので、`rabbit.eat` はエンドレスで自身を呼び出します。

`this` だけを使ってこの問題を解くことはできません。

### `[[HomeObject]]`

その解決策を提供するため、JavaScriptはもう１つ関数のための特別な内部プロパティを追加しています: `[[HomeObject]]` です。

**関数がクラスまたはオブジェクトメソッドとして指定されたとき、その `[[HomeObject]]` プロパティはそのオブジェクトになります。**

メソッドはそれらのオブジェクトを覚えているため、これは実際には "バインドされていない" 関数の考え方に反しています。また、`[[HomeObject]]` は変更することはできないため、このバインドは永遠です。なので、これは言語上の非常に重要な変更です。

しかし、この変更は安全です。`[[HomeObject]]` は プロトタイプを解決するために、`super` の中で親メソッドを呼び出すためだけに使われます。従って、互換性を損ねることはありません。

`super` がどのように動くのか見てみましょう -- 平易なオブジェクトを使って再び。:

```js run
let animal = {
  name: "Animal",
  eat() {         // [[HomeObject]] == animal
    alert(this.name + " eats.");
  }
};

let rabbit = {
  __proto__: animal,
  name: "Rabbit",
  eat() {         // [[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "Long Ear",
  eat() {         // [[HomeObject]] == longEar
    super.eat();
  }
};

*!*
longEar.eat();  // Long Ear eats.
*/!*
```

すべてのメソッドは内部の `[[HomeObject]]` プロパティで、そのオブジェクトを覚えています。そして `super` は親のプロトタイプの解決のためにそれを使います。

`[[HomeObject]]` はクラスと単純なオブジェクト両方で定義されたメソッドのために定義されています。しかし、オブジェクトの場合、メソッドは指定された方法で正確に指定されなければなりません。: `"method: function()"` ではなく `method()` として指定する必要があります。

下の例では、上の例との比較のために非メソッド構文を使っています。`[[HomeObject]]` プロパティはセットされず、継承は動作しません。:

```js run
let animal = {
  eat: function() { // should be the short syntax: eat() {...}
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
rabbit.eat();  // Error calling super (because there's no [[HomeObject]])
*/!*
```

## 静的メソッドと継承 [#static-methods-and-inheritance]

`class` 構文は静的なプロパティに対しても継承をサポートしています。

例:

```js run
class Animal {

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }

  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }

}

// Inherit from Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compare);

rabbits[0].run(); // Black Rabbit runs with speed 5.
```

これで、継承された `Animal.compare` が呼び出されると想定される `Rabbit.compare` を呼ぶことができます。

どのように動くのでしょう？繰り返しますが、プロトタイプを使用します。 すでに推測したように、`extends` は `Rabbit` に `Animal` への `[[Prototype]]` 参照を与えます。

![](animal-rabbit-static.png)

従って、`Rabbit` 関数は `Animal` 関数から継承します。そして `Animal` 関数は通常 `Function.prototype` を参照する `[[Prototype]]` を持っています。なぜならそれは何も `extend` していないからです。

ここで、それを確認してみましょう。:

```js run
class Animal {}
class Rabbit extends Animal {}

// for static propertites and methods
alert(Rabbit.__proto__ == Animal); // true

// and the next step is Function.prototype
alert(Animal.__proto__ == Function.prototype); // true

// that's in addition to the "normal" prototype chain for object methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

このように `Rabbit` は `Animal` のすべての静的メソッドへアクセスです。

### 組み込みで、静的継承はありません

組み込みのクラスはこのような静的な `[[Prototype]]` 参照は持っていないことに注意してください。例えば、`Object` は `Object.defineProperty`, `Object.keys` やその他を持っていますが、`Array` や `Date` などはそれらを継承しません。

これは `Date` や `Object` の構造を示す図です。:

![](object-date-inheritance.png)

`Date` と `Object` の間のリンクはないことに注意してください。`Object` と `Date` は独立して存在します。`Date.prototype` は `Object.prototype` から継承しますが、それだけです。

このような差異は歴史的な理由で存在します。: JavaScript言語の幕開けにクラス構文と静的メソッドを継承することは考えられませんでした。

## ネイティブは拡張可能です [#natives-are-extendable]

Array, Map やその他のような組み込みのクラスもまた拡張可能です。

例えば、ここでは `PowerArray` はネイティブの `Array` から継承しています。:

```js run
// add one more method to it (can do more)
class PowerArray extends Array {
  isEmpty() {
    return this.length == 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // false
```

1つとても興味深いことに留意してください。`filter`, `map` やその他組み込みのメソッドは -- 正確に継承された型の新しいオブジェクトを返します。 それらはそうするために `constructor`プロパティに依存しています。

上の例です,
```js
arr.constructor === PowerArray
```

なので、`arr.filter()` が呼ばれた時、それは内部で `new PowerArray` と同じ結果の新しい配列が作成されます。 そして、私たちはその方法をチェーンの下でさらに使い続けることができます。

さらに、我々はその振る舞いをカスタマイズすることもできます。静的な getter `Symbol.species` が存在する場合、そのようなケースで使うためにコンストラクタを返します。

例えば、ここでは `Symbol.species` によって、`map`, `filter` のような組み込みメソッドは "通常の" 配列を返します。:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length == 0;
  }

*!*
  // built-in methods will use this as the constructor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // false

// filter creates new array using arr.constructor[Symbol.species] as constructor
let filteredArr = arr.filter(item => item >= 10);

*!*
// filteredArr is not PowerArray, but Array
*/!*
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty is not a function
```

より高度な手段としてそれを使用して、必要でない場合には結果の値から拡張機能を取り除くことができます。 あるいは、それをさらに拡張することもできます。
