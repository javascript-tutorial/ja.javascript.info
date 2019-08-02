
# クラスの継承

2つのクラスがあるとしましょう。

`Animal`:

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

これで `Rabbit` は `Animal` のコンストラクタをデフォルトで利用するので、コードは少し短くなりました。そして、`run` をすることもできます。

内部では、`extends` キーワードは、`Rabbit.prototype` から `Animal.prototype` へとの `[[Prototype]]` 参照を追加しています:

![](animal-rabbit-extends.svg)

したがって、`Rabbit.prototype` にメソッドが見つからない場合、JavaScript は `Animal.prototype` から取ります。

チャプター <info:native-prototypes> から想起できるように、JavaScript は同じプロトタイプ継承を組み込みオブジェクトに対しても使います。E.g. `Date.prototype.[[Prototype]]` は `Object.prototype` なので、date は一般的なオブジェクトメソッドを持っています。

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

## メソッドのオーバーライド 

では、前に進めてメソッドをオーバライドをしてみましょう。今のところ、`Rabbit` は `Animal` から `this.speed = 0` をセットする `stop` メソッドを継承しています。

もし `Rabbit` で自身の `stop` を指定すると、代わりにそれが使われるようになります。:

```js
class Rabbit extends Animal {
  stop() {
    // ...これは rabbit.stop() のために使われる
  }
}
```


...しかし、通常は親メソッドを完全に置き換えるのではなく、その上に組み立てて、その機能の微調整または拡張を行うことを望んできます。私たちはメソッド内で何かをしますが、その前後またはその処理の中で親メソッドを呼び出します。

クラスはそのために `"super"` キーワードを提供しています。

- `super.method(...)` は親メソッドを呼び出します。
- `super(...)` は親のコンストラクタを呼び出します(我々のコンストラクタの内側でのみ)。

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
    super.stop(); // 親の stop 呼び出し
    this.hide(); // その後隠す
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
    setTimeout(() => super.stop(), 1000); // 1秒後親の stop 実行
  }
}
```

アロー関数での `super` は `stop()` での `super` と同じです。なので、意図通りに動きます。ここのように "通常の" 関数を指定すると、エラーになります。:

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

簡単な回答: 継承したクラスのコンストラクタは `super(...)` を呼び出し、(!) `this` を使う前にそれを行わなければなりません。

...しかしなぜ？ ここで何が起きているのでしょう？ 確かにこの要件は奇妙に見えます。

もちろん、それへの説明があります。詳細を見てみましょう。それであなたは何が起こっているのかを本当に理解するでしょう。

JavaScriptでは、"継承しているクラスのコンストラクタ関数" とその他すべてで区別があります。継承しているクラスでは、該当するコンストラクタ関数は特別な内部プロパティ `[[ConstructorKind]]:"derived"` が付けられます。

違いは:

- 通常のコンストラクタを実行するとき、`this` として空のオブジェクトを作り、それを続けます。
- しかし、派生したコンストラクタが実行されると、そうは実行されません。親のコンストラクタがこのジョブを実行することを期待しています。

なので、もし独自のコンスタクタを作っている場合には、`super` を呼ばないといけません。なぜなら、そうしないとそれを参照する `this` を持つオブジェクトは生成されないからです。 結果、エラーになるでしょう。

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
// 今は問題ありませんｎ
let rabbit = new Rabbit("White Rabbit", 10);
alert(rabbit.name); // White Rabbit
alert(rabbit.earLength); // 10
*/!*
```


## Super: internals, [[HomeObject]]

`super` の内部をもう少し深く見てみましょう。ここで面白いことがいくつか見られます。

まず最初に、今まで私たちが学んだすべてのことだけでは、 `super` が動作するのは不可能です。

たしかに技術的にどのように動くのでしょうか？オブジェクトメソッドが実行されるとき、`this` として現在のオブジェクトを取ります。もし `super.method()` を呼び出す場合、どうやって `method` を取得するでしょう？当然ながら、我々は現在のオブジェクトのプロトタイプから `method` を取る必要があります。技術的に我々(またはJavaScriptエンジンは)どうやってそれをするのでしょうか？

恐らく、`this.__proto__.method` とすることで `this` の `[[Prototype]]` からメソッドを取得できる？残念ながらそれは動作しません。

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
    // これがおそらく super.eat() が動作する方法です
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
    // ...bounce around rabbit-style 
    // 親 (animal) メソッドを呼び出す
    this.__proto__.eat.call(this); // (*)
  }
};

let longEar = {
  __proto__: rabbit,
  eat() {
    // ...do something with long ears
    // 親 (rabbit) メソッドを呼び出す
    this.__proto__.eat.call(this); // (**)
  }
};

*!*
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

すべてのメソッドは内部の `[[HomeObject]]` プロパティで、そのオブジェクトを覚えています。そして `super` は親のプロトタイプの解決のために `[[HomeObject]]` を使います。

`[[HomeObject]]` はクラスと単純なオブジェクト両方で定義されたメソッドのために定義されています。しかし、オブジェクトの場合、メソッドは指定された方法で正確に指定されなければなりません。: `"method: function()"` ではなく `method()` として指定する必要があります。

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
