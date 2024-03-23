
# クラスの継承

クラスの継承は、あるクラスが別のクラスを拡張するための方法です。

つまり、既存の機能の上に、新たな機能を作ることができます。

## "extends" キーワード

クラス `Animal` があるとします:

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
    alert(`${this.name} stopped.`);
  }
}

let animal = new Animal("My animal");
```

これは、`animal` オブジェクトと `Animal` クラスを、グラフィカルに表現したものです。:

![](rabbit-animal-independent-animal.svg)

...そしてもう１つの `class Rabbit` を作成します。

うさぎ(rabbit)は動物(animal)なので、`Rabbit` クラスは `Animal` がベースとなり、animal メソッドへアクセスできます。これで、"一般的な" 動物が実行できることをうさぎも実行できます。

別のクラスを拡張する構文は `class Child extends Parent` です。

`Animal` を継承した `class Rabbit` を作成しましょう。:

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

多くの条件に依存したクラスを生成するために関数を使用し、それを継承するといった高度なプログラミングパターンに対して役立つ場合があります。
````

## メソッドのオーバーライド 

では、前に進めてメソッドをオーバライドをしてみましょう。デフォルトでは、`class Rabbit` では指定されておらず、`class Animal` から直接 "そのまま" 取得しています。

ですが、`Rabbit` で自身の `stop` を指定すると、代わりにそれが使われます。:

```js
class Rabbit extends Animal {
  stop() {
    // ...class Animal の stop() の代わりに
    // rabbit.stop() で利用されます
  }
}
```

通常は親メソッドを完全に置き換えるのではなく、その上に機能の微調整または拡張を行うことを望みます。メソッド内で何かをしますが、その前後または処理中に親メソッドを呼び出します。

クラスはそのために `"super"` キーワードを提供しています。

- `super.method(...)` は親メソッドを呼び出します。
- `super(...)` は親のコンストラクタを呼び出します(コンストラクタの内側でのみ)。

例えば、うさぎ(rabbit)が止まったとき自動的に隠れさせます。:

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
    super.stop(); // 親の stop 呼び出し
    this.hide(); // その後隠す
  }
*/!*
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); // White Rabbit runs with speed 5.
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
  }
}
```

アロー関数での `super` は、 `stop()` 内での `super` と同じです。なので、意図通りに動きます。以下のように "通常の" 関数を指定するとエラーになります。:

```js
// Unexpected super
setTimeout(function() { super.stop() }, 1000);
```
````


## コンストラクタのオーバライド 

コンストラクタに対しては、少し用心が必要です。

今まで、`Rabbit` は自身の `constructor` を持っていませんでした。

[仕様(specification)](https://tc39.github.io/ecma262/#sec-runtime-semantics-classdefinitionevaluation)によると、クラスが別のクラスを拡張し、`constructor` を持たない場合、次のような `constructor` が生成されます。

```js
class Rabbit extends Animal {
  // 独自のコンストラクタを持たないクラスを拡張するために生成されます
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

`Rabbit` コンストラクタを動作させるために、`this` を使う前に `super()` を呼びます:

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
// 今は問題ありません
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```



### クラスフィールドのオーバーライド: a tricky note

```warn header="高度な内容です"
ここの内容は、他のプログラミング言語でのクラスに対してある程度経験あること前提としています。

言語へのよりよい洞察を提供し、バグの原因になりうる(ただし頻度はそれほど頻繁ではありません)振る舞いについても説明します。

理解するのが難しい場合は、先に進んで読み続けてから、しばらくしてから戻ってください。
```

メソッドだけではなく、クラスフィールドもオーバーライドすることができます。

ですが、親のコンストラクタでオーバーライドされたフィールドにアクセスする際、多くの他のプログラミング言語とは大きく異なる、トリッキーな振る舞いがあります。

この例を考えます:

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
    alert('animal');
  }

  constructor() {
    this.showName(); // alert(this.name); の代わり
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

問題になった場合には、フィールドの代わりにメソッドあるいは getter/setter を使用して修正できます。


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
    // これがおそらく super.eat() が動作する方法です
    this.__proto__.eat.call(this); // (*)
*/!*
  }
};

rabbit.eat(); // Rabbit eats.
```

行 `(*)` でプロトタイプ(`animal`) から `eat` を取り、現在のオブジェクトコンテキストでそれを呼び出します。`.call(this)` はここでは重要であることに注意してください。なぜなら、シンプルな `this.__proto__.eat()` は現在のオブジェクトではなくプロトタイプのコンテキストで親の `eat` を実行するためです。

また、上のコードは実際に期待通り動作します: 正しい `alert` になります。

今度はもう1つのオブジェクトをチェーンに追加しましょう。 どのように壊れるかを見てみます:

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
    // ...bounce around rabbit-style 親 (animal) メソッドを呼び出す
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears 親 (rabbit) メソッドを呼び出す
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
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
// ただしく機能します
longEar.eat();  // Long Ear eats.
*/!*
```

`[[HomeObject]]` のより、意図したとおりに動作します。`longEar.eat` のようなメソッドは、その `[[HomeObject]]` を知っており、そのプロトタイプから親のメソッドを取得します。`this` を使用することなく。

### メソッドは "自由" ではありません

これまでの認識の通り、一般的な関数は "自由" であり、JavaScript のオブジェクトにバインドされていません。そのため、オブジェクト間でコピーしたり別の `this` で呼び出すことができます。

しかし、メソッドはそのオブジェクトを記録しているため、`[[HomeObject]]` の存在はその原則に違反します。`[[HomeObject]]` は変更できないため、このバインドは永遠です。

`[[HomeObject]]` が使用される言語での唯一の場所が `super` です。したがって、メソッドが `super` を使用しない場合、メソッドは以前として自由とみなせ、オブジェクト間でコピーできます。しかし、`super` があると、うまくいかない可能性があります。

これはコピー後の上手く行かない `super` の結果のデモです:

```js run
let animal = {
  sayHi() {
    alert(`I'm an animal`);
  }
};

// rabbit は animal を継承
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

// tree は plant を継承
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
