<<<<<<< HEAD
# Private / protected プロパティとメソッド

オブジェクト指向プログラミングの最も重要な原則の 1 つは、内部インタフェースを外部インタフェースから切り離すことです。

これは、"hello world" アプリケーションよりも複雑なものを作るすべての開発において "必須" です。

これを理解するために、開発から離れて、現実の世界に目を向けましょう。

通常、私たちが使っているデバイスは非常に複雑です。しかし、内部インタフェースを外部インタフェースから切り離すことで、問題なく使うことができます。

## 実世界の例

例えばコーヒーメーカーです。外側はシンプルです: ボタン、ディスプレイやいくつかの穴があるだけです。そして、もちろん結果はおいしいコーヒーです :)

![](coffee.jpg)

しかし内側は...(修理マニュアルにある図です)

![](coffee-inside.jpg)

多くの構成要素があります。しかし、何も知らなくても私たちは使うことができます。

コーヒーメーカーはとても信頼性が高いですね。何年も使え、調子が悪い場合にだけ修正に持っていきます。

コーヒーメーカーの信頼性とシンプルさの秘密は、すべての構成要素がよく調整され、内部に _隠れている_ ことです。

もしコーヒーメーカーの保護カバーを外すと、使うのが非常に複雑になり(どこを押せばよい？)、危険です(感電するかもしれません)。

これから見ていきますが、プログラミングにおいてオブジェクトはコーヒーメーカーのようなものです。

しかし、内部の詳細を隠すには、保護カバーではなく言語や規則の特別な構文を使っていきます。

## 内部 / 外部インタフェース

オブジェクト指向プログラミングでは、プロパティとメソッドは 2 つのグループに分けられます:

- _内部インタフェース_: クラスの他のメソッドからアクセス可能だが、外側からはアクセスできないメソッドやプロパティ。
- _外部インタフェース_: 外部のクラスからもアクセス可能なメソッドやプロパティ。

コーヒーメーカーで例えるなら、内部に隠されているもの: ボイラーチューブや発熱体など、は内部インタフェースです。

内部インタフェースはオブジェクトが機能するために使われ、その構成要素はお互いに使用されます。例えば、ボイラーチューブは発熱体に取り付けられます。

しかし、コーヒーメーカーの外側からは、誰もそこに届かないよう保護カバーで閉ざされています。内部の詳細は隠されており、アクセスできません。私たちは、外部インタフェースを介してのみその機能を利用できます。

したがって、オブジェクトを使用するのに必要なことは、その外部インタフェースを知ることです。内部でどのように動いているか完全に分からないかもしれませんが、問題ありません。

ここまでは一般的な前置きでした。

JavaScript には、3 種類のプロパティとメンバがあります。

- パブリック(public): どこからでもアクセス可能です。これらは外部インタフェースになります。今まで、私たちはパブリックなプロパティとメソッドのみを使用していました。
- プライベート(private): クラス内部からのみアクセスできます。これらは内部インタフェース用です。

他の多くの言語には、"プロテクト(protected)" フィールドも存在します。: これは、クラス及び、そのクラスを継承したサブクラスの内部からのみアクセス可能であることを意味します。これも内部インタフェースには役立ちます。通常は、継承しているクラスを適切に拡張できるよう、それらにアクセスさせたいため、ある意味ではプライベートよりも広く知られています。

protected フィールドは言語レベルでは JavaScript に実装されていません。が、実際には非常に便利であるため、エミュレートされています。

次のステップでは、これらすべての種類のプロパティを使用した JavaScript でコーヒーメーカーを作ります。コーヒーメーカーには多くの構成要素がありますが、シンプルさを保つためにモデル化はしません（モデル化することも可能です）。

## "waterAmount" を保護(protect)する

最初に、単純なコーヒーメーカークラスを作りましょう。:

```js run
class CoffeeMachine {
  waterAmount = 0; // 内部の水の量

  constructor(power) {
    this.power = power;
    alert(`Created a coffee-machine, power: ${power}`);
  }
}

// コーヒーメーカーを生成
let coffeeMachine = new CoffeeMachine(100);

// 水を追加
coffeeMachine.waterAmount = 200;
```

今のところ、プロパティ `waterAmount` と `power` は public です。外側から簡単に値を取得したり、任意の値に設定できます。

より細かく制御できるように、`waterAmount` プロパティを protected に変更しましょう。例えば、誰もゼロより小さくは設定できないようにしたいです。

**protected プロパティは、通常アンダースコア `_` で始まります。**

これは言語レベルでは強制されていませんが、このようなプロパティやメソッドは外側からアクセスするべきではない、という慣習があります。ほとんどのプログラマはそれに従っています。

なので、プロパティは `_waterAmount` になります:
=======

# Private and protected properties and methods

One of the most important principles of object oriented programming -- delimiting internal interface from the external one.

That is "a must" practice in developing anything more complex than a "hello world" app.

To understand this, let's break away from development and turn our eyes into the real world.

Usually, devices that we're using are quite complex. But delimiting the internal interface from the external one allows to use them without problems.

## A real-life example

For instance, a coffee machine. Simple from outside: a button, a display, a few holes...And, surely, the result -- great coffee! :)

![](coffee.jpg)

But inside... (a picture from the repair manual)

![](coffee-inside.jpg)

A lot of details. But we can use it without knowing anything.

Coffee machines are quite reliable, aren't they? We can use one for years, and only if something goes wrong -- bring it for repairs.

The secret of reliability and simplicity of a coffee machine -- all details are well-tuned and *hidden* inside.

If we remove the protective cover from the coffee machine, then using it will be much more complex (where to press?), and dangerous (it can electrocute).

As we'll see, in programming objects are like coffee machines.

But in order to hide inner details, we'll use not a protective cover, but rather special syntax of the language and conventions.

## Internal and external interface

In object-oriented programming, properties and methods are split into two groups:

- *Internal interface* -- methods and properties, accessible from other methods of the class, but not from the outside.
- *External interface* -- methods and properties, accessible also from outside the class.

If we continue the analogy with the coffee machine -- what's hidden inside: a boiler tube, heating element, and so on -- is its internal interface.

An internal interface is used for the object to work, its details use each other. For instance, a boiler tube is attached to the heating element.

But from the outside a coffee machine is closed by the protective cover, so that no one can reach those. Details are hidden and inaccessible. We can use its features via the external interface.

So, all we need to use an object is to know its external interface. We may be completely unaware how it works inside, and that's great.

That was a general introduction.

In JavaScript, there are two types of object fields (properties and methods):

- Public: accessible from anywhere. They comprise the external interface. Until now we were only using public properties and methods.
- Private: accessible only from inside the class. These are for the internal interface.

In many other languages there also exist "protected" fields: accessible only from inside the class and those extending it (like private, but plus access from inheriting classes). They are also useful for the internal interface. They are in a sense more widespread than private ones, because we usually want inheriting classes to gain access to them.

Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.

Now we'll make a coffee machine in JavaScript with all these types of properties. A coffee machine has a lot of details, we won't model them to stay simple (though we could).

## Protecting "waterAmount"

Let's make a simple coffee machine class first:

```js run
class CoffeeMachine {
  waterAmount = 0; // the amount of water inside

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
  }

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = 200;
```

Right now the properties `waterAmount` and `power` are public. We can easily get/set them from the outside to any value.

Let's change `waterAmount` property to protected to have more control over it. For instance, we don't want anyone to set it below zero.

**Protected properties are usually prefixed with an underscore `_`.**

That is not enforced on the language level, but there's a well-known convention between programmers that such properties and methods should not be accessed from the outside.

So our property will be called `_waterAmount`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) {
      value = 0;
    }
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }
<<<<<<< HEAD
}

// コーヒーメーカーを生成
let coffeeMachine = new CoffeeMachine(100);

// 水を追加
coffeeMachine.waterAmount = -10; // _waterAmount は -10 ではなく、 0 になります
```

これでアクセスが制御されたので、ゼロより小さい値へ設定は不可能です。

## 読み取り専用(Read-only)の "power"

`power` プロパティは、読み取り専用にしましょう。作成時にのみ設定し、それ以降変更しないプロパティも時にあります。

これはまさにコーヒーメーカーの電力(power)のケースです。この値は決して変わりません。

そうするためには、getter のみを作成する必要があります。setter は不要です。:
=======

}

// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);

// add water
coffeeMachine.waterAmount = -10; // _waterAmount will become 0, not -10
```

Now the access is under control, so setting the water amount below zero becomes impossible.

## Read-only "power"

For `power` property, let's make it read-only. It sometimes happens that a property must be set at creation time only, and then never modified.

That's exactly the case for a coffee machine: power never changes.

To do so, we only need to make getter, but not the setter:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }
<<<<<<< HEAD
}

// コーヒーメーカーを作成
=======

}

// create the coffee machine
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

<<<<<<< HEAD
coffeeMachine.power = 25; // Error (setter はないので)
```

````smart header="Getter/setter 関数"
ここでは、getter/setter 構文を使いました。

しかし、多くの場合は次のような `get.../set...` 関数が好まれます。:
=======
coffeeMachine.power = 25; // Error (no setter)
```

````smart header="Getter/setter functions"
Here we used getter/setter syntax.

But most of the time `get.../set...` functions are preferred, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
<<<<<<< HEAD
    if (value < 0) throw new Error("Negative water");
=======
    if (value < 0) value = 0;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
<<<<<<< HEAD
    return this.waterAmount;
=======
    return this._waterAmount;
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}

new CoffeeMachine().setWaterAmount(100);
```

<<<<<<< HEAD
これは少し長く見えますが、関数はより柔軟です。たとえいま時点では必要ないとしても、この方法の場合、複数の引数を受け取ることができます。そのため、将来なにかをリファクタする必要がある場合に備えるなら、関数はより安全な選択肢です。

もちろん、これはトレードオフです。一方で get/set 構文はより短くかけます。ここに厳密なルールはないので、決めるのはあなた次第です。
````

```smart header="Protected フィールドは継承されます"
`class MegaMachine extends CoffeeMachine` と継承した場合、新しいクラスのメソッドから `this._waterAmount` や `this._power` にアクセスするのを妨げるものは何もありません。

つまり、protected フィールは当然のことながら継承可能です。下で見ていく private なものとは異なります。
=======
That looks a bit longer, but functions are more flexible. They can accept multiple arguments (even if we don't need them right now).

On the other hand, get/set syntax is shorter, so ultimately there's no strict rule, it's up to you to decide.
````

```smart header="Protected fields are inherited"
If we inherit `class MegaMachine extends CoffeeMachine`, then nothing prevents us from accessing `this._waterAmount` or `this._power` from the methods of the new class.

So protected fields are naturally inheritable. Unlike private ones that we'll see below.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

## Private "#waterLimit"

[recent browser=none]

<<<<<<< HEAD
プライベートなプロパティやメソッドに対する言語レベルのサポートを提供する、ほぼ標準的な完成した JavaScript の提案があります。

プライベートは `#` から始める必要があります。それらはクラス内部からのみアクセス可能です。

例えば、ここではプライベートな `#waterLimit` プロパティを追加し、水量をチェックするロジックを別のメソッドに抜き出しています:
=======
There's a finished JavaScript proposal, almost in the standard, that provides language-level support for private properties and methods.

Privates should start with `#`. They are only accessible from inside the class.

For instance, here's a private `#waterLimit` property and the water-checking private method `#fixWaterAmount`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #fixWaterAmount(value) {
    if (value < 0) return 0;
    if (value > this.#waterLimit) return this.#waterLimit;
  }
*/!*

  setWaterAmount(value) {
    this.#waterLimit = this.#fixWaterAmount(value);
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
// can't access privates from outside of the class
coffeeMachine.#fixWaterAmount(123); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*
```

<<<<<<< HEAD
言語レベルで、`#` はフィールドがプライベートであることを示す特別な記号です。その外側や継承したクラスからアクセスすることはできません。

プライベートフィールドはパブリックなものと衝突しません。プライベートな `#waterAmount` とパブリックな `waterAmount` フィールド両方を同時にもつことができます。

例えば、`#waterAmount` のアクセサとなる `waterAmount` を作りましょう。:

```js run
class CoffeeMachine {
=======
On the language level, `#` is a special sign that the field is private. We can't access it from outside or from inheriting classes.

Private fields do not conflict with public ones. We can have both private `#waterAmount` and public `waterAmount` fields at the same time.

For instance, let's make `waterAmount` an accessor for `#waterAmount`:

```js run
class CoffeeMachine {

>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) value = 0;
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

<<<<<<< HEAD
protected なものとは異なり、private フィールドは言語レベルで強制されます。

なお、`CoffeeMachine` を継承した場合、`#waterAmount` へアクセスはできません。アクセスするには、`waterAmount` の getter/setter を経由する必要があります。:

```js
class CoffeeMachine extends CoffeeMachine() {
  method() {
*!*
    alert( this.#waterAmount ); // Error: CoffeeMachine からのみアクセス可能
=======
Unlike protected ones, private fields are enforced by the language itself. That's a good thing.

But if we inherit from `CoffeeMachine`, then we'll have no direct access to `#waterAmount`. We'll need to rely on `waterAmount` getter/setter:

```js
class MegaCoffeeMachine extends CoffeeMachine {
  method() {
*!*
    alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
  }
}
```

<<<<<<< HEAD
多くのシナリオにおいて、このような制限は厳しすぎます。`CoffeeMachine` を拡張する際には、その内部にアクセスすべき正当な理由があるかもしれません。そのため、protected フィールドは言語レベルの構文ではサポートされていませんが、多くの場合 protected フィールドが使われています。

````warn
Private フィールドは特別です。

通常だと this[name] でフィールドにアクセスできます。:
=======
In many scenarios such limitation is too severe. If we extend a `CoffeeMachine`, we may have legitimate reasons to access its internals. That's why protected fields are used more often, even though they are not supported by the language syntax.

````warn header="Private fields are not available as this[name]"
Private fields are special.

As we know, usually we can access fields using `this[name]`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
<<<<<<< HEAD
    alert(`Hello, ${this[fieldName]}`);
=======
    alert(`Hello, ${*!*this[fieldName]*/!*}`);
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  }
}
```

<<<<<<< HEAD
しかし、private フィールドだとそれはできません。: `this['#name']` は期待通り動作しません。これは private であることを維持するための、構文上の制限になります。
````

## サマリ

OOP の用語では、外部インタフェースと内部インタフェースを切り離すことを、[カプセル化](<"https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)">) と呼びます。

これには次のような利点があります:

ユーザが自ら墓穴を掘らないようにするための保護
: 想像してください、コーヒーメーカーを使用している開発者のチームがあるとしましょう。それは "最も優れたコーヒーメーカー" の会社で作られたもので、上手く動作します。が、ある時保護カバーが外され、内部インタフェースが公開された状態になっています。

    開発者はみな、意図したとおりにコーヒーメーカーを使用していますが、その中の一人である John がコーヒーメーカーの内部にいくらかの調整を行いました。それにより、2日後、コーヒーメーカーは失敗するようになりました。

    これはもちろん John のせいではなく、むしろ保護カバーを外し、John に操作をさせた人の責任です。

    プログラミングでも同じです。外部からの変更を意図していないものが勝手に変更された場合、結果は予測不可能です。

Supportable
: プログラミングにおける状況は、実際のコーヒーメーカーでの場合よりも複雑です。なぜなら一度購入するだけではないからです。コードは絶えず開発と改良されます。

    **もし内部インタフェースを厳密に区切ると、クラスの開発者は利用者へ通知しなくても内部のプロパティとメソッドを自由に変更することができます。**

    特定のメソッド名を変更したり、パラメータを変更したり、あるいは削除したりすることができることが明らか(外部のコードはそれらに依存していないため)だと、開発は遥かに容易になります。

    利用者は、新しいバージョンが登場した際、全体的な見直しになる可能性はありますが、それでも外部インタフェースが同じであればアップグレードは簡単です。

複雑さを隠す
: 人々はシンプルなものを使うのを好みます。中身はそうでないかもしれませんが、少なくとも外から見たときは。

    プログラマも例外ではありません。

    **実装の詳細が隠されていて、シンプルかつ良くドキュメント化された外部インタフェースが利用可能であることは常に便利です。**

内部インタフェースを隠すために、proctected または public プロパティを使用します。]

- protected フィールドは `_` で始まります。これはよく知られた慣習であり、言語レベルで強制されているものではありません。プログラマはそのクラスと、それを継承したクラスからのみ `_` で始まるフィールドにアクセスするべきです。
- private フィールドは `#` で始まります。JavaScript では、クラス内からのみアクセスできます。

現時点では、private フィールドはブラウザ間では十分にはサポートされていませんが、polyfill することができます。
=======
With private fields that's impossible: `this['#name']` doesn't work. That's a syntax limitation to ensure privacy.
````

## Summary

In terms of OOP, delimiting of the internal interface from the external one is called [encapsulation](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)).

It gives the following benefits:

Protection for users, so that they don't shoot themselves in the foot
: Imagine, there's a team of developers using a coffee machine. It was made by the "Best CoffeeMachine" company, and works fine, but a protective cover was removed. So the internal interface is exposed.

    All developers are civilized -- they use the coffee machine as intended. But one of them, John, decided that he's the smartest one, and made some tweaks in the coffee machine internals. So the coffee machine failed two days later.

    That's surely not John's fault, but rather the person who removed the protective cover and let John do his manipulations.

    The same in programming. If a user of a class will change things not intended to be changed from the outside -- the consequences are unpredictable.

Supportable
: The situation in programming is more complex than with a real-life coffee machine, because we don't just buy it once. The code constantly undergoes development and improvement.

    **If we strictly delimit the internal interface, then the developer of the class can freely change its internal properties and methods, even without informing the users.**

    If you're a developer of such class, it's great to know that private methods can be safely renamed, their parameters can be changed, and even removed, because no external code depends on them.

    For users, when a new version comes out, it may be a total overhaul internally, but still simple to upgrade if the external interface is the same.

Hiding complexity
: People adore using things that are simple. At least from outside. What's inside is a different thing.

    Programmers are not an exception.

    **It's always convenient when implementation details are hidden, and a simple, well-documented external interface is available.**

To hide an internal interface we use either protected or private properties:

- Protected fields start with `_`. That's a well-known convention, not enforced at the language level. Programmers should only access a field starting with `_` from its class and classes inheriting from it.
- Private fields start with `#`. JavaScript makes sure we can only access those from inside the class.

Right now, private fields are not well-supported among browsers, but can be polyfilled.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
