
# Private / protected プロパティとメソッド

オブジェクト指向プログラミングの最も重要な原則の1つは、内部インタフェースを外部インタフェースから切り離すことです。

これは、"hellow world" アプリケーションよりも複雑なものを作るすべての開発において "必須" です。

これを理解するために、開発から離れて、現実の正解に目を向けましょう。

通常、私たちが使っているデバイスは非常に複雑です。しかし、内部インタフェースを外部インタフェースから切り離すことで、問題なく使うことができます。

## 実世界の例

例えばコーヒーメーカーです。外側はシンプルです: ボタン、ディスプレイやいくつかの穴があるだけです。そして、もちろん結果はおいしいコーヒーです :)

![](coffee.jpg)

しかし内側は...(修理マニュアルにある図です)

![](coffee-inside.jpg)

多くの構成要素があります。しかし、何も知らなくても私たちは使うことができます。


コーヒーメーカーはとても信頼性が高いですね。何年も使え、調子が悪い場合にだけ修正に持っていきます。

コーヒーメーカーの信頼性とシンプルさの秘密は、すべての構成要素がよく調整され、内部に *隠れている* ことです。

もしコーヒーメーカーの保護カバーを外すと、使うのが非常に複雑になり(どこを押せばよい？)、危険です(感電するかもしれません)。

これから見ていきますが、プログラミングにおいてオブジェクトはコーヒーメーカーのようなものです。

しかし、内部の詳細を隠すには、保護カバーではなく言語や規則の特別な構文を使っていきます。

## 内部 / 外部インタフェース

オブジェクト指向プログラミングでは、プロパティとメソッドは2つのグループに分けられます:

- *内部インタフェース*: クラスの他のメソッドからアクセス可能だが、外側からはアクセスできないメソッドやプロパティ。
- *外部インタフェース*: 外部のクラスからもアクセス可能なメソッドやプロパティ。

コーヒーメーカーで例えるなら、内部に隠されているもの: ボイラーチューブや発熱体など、は内部インタフェースです。

内部インタフェースはオブジェクトが機能するために使われ、その構成要素はお互いに使用されます。例えば、ボイラーチューブは発熱体に取り付けられます。

しかし、コーヒーメーカーの外側からは、誰もそこに届かないよう保護カバーで閉ざされています。内部の詳細は隠されており、アクセスできません。私たちは、外部インタフェースを介してのみその機能を利用できます。

したがって、オブジェクトを使用するのに必要なことは、その外部インタフェースを知ることです。内部でどのように動いているか完全に分からないかもしれませんが、問題ありません。

ここまでは一般的な前置きでした。

JavaScript には、3種類のプロパティとメンバがあります。

- パブリック(public): どこからでもアクセス可能です。これらは外部インタフェースになります。今まで、私たちはパブリックなプロパティとメソッドのみを使用していました。
- プライベート(private): クラス内部からのみアクセスできます。これらは内部インタフェース用です。

他の多くの言語には、"プロテクト(protected)" フィールドも存在します。: これは、クラス及び、そのクラスを継承したサブクラスの内部からのみアクセス可能であることを意味します。これも内部インタフェースには役立ちます。通常は、継承しているクラスを適切に拡張できるよう、それらにアクセスさせたいため、ある意味ではプライベートよりも広く知られています。

protected フィールドは言語レベルでは Javascript に実装されていません。が、実際には非常に便利であるため、エミュレートされています。

次のステップでは、これらすべての種類のプロパティを使用した JavaScript でコーヒーメーカーを作ります。コーヒーメーカーには多くの構成要素がありますが、シンプルさを保つためにモデル化はしません（モデル化することも可能です）。

## "waterAmount" を保護(protect)する

最初に、単純なコーヒーメーカークラスを作りましょう。:

```js run
class CoffeeMachine {
  waterAmount = 0; // 内部の水の量

  constructor(power) {
    this.power = power;
    alert( `Created a coffee-machine, power: ${power}` );
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

```js run
class CoffeeMachine {
  _waterAmount = 0;

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  get waterAmount() {
    return this._waterAmount;
  }

  constructor(power) {
    this._power = power;
  }

}

// コーヒーメーカーを生成
let coffeeMachine = new CoffeeMachine(100);

// 水を追加
coffeeMachine.waterAmount = -10; // Error: Negative water
```

これでアクセスが制御されたので、ゼロより小さい値へ設定しようとしても失敗します。

## 読み取り専用(Read-only)の "power"

`power` プロパティは、読み取り専用にしましょう。作成時にのみ設定し、それ以降変更しないプロパティも時にあります。

これはまさにコーヒーメーカーの電力(power)のケースです。この値は決して変わりません。

そうするためには、getter のみを作成する必要があります。setter は不要です。:

```js run
class CoffeeMachine {
  // ...

  constructor(power) {
    this._power = power;
  }

  get power() {
    return this._power;
  }

}

// コーヒーメーカーを作成
let coffeeMachine = new CoffeeMachine(100);

alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W

coffeeMachine.power = 25; // Error (setter はないので)
```

````smart header="Getter/setter 関数"
ここでは、getter/setter 構文を使いました。

しかし、多くの場合は次のような `get.../set...` 関数が好まれます。:

```js
class CoffeeMachine {
  _waterAmount = 0;

  *!*setWaterAmount(value)*/!* {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }

  *!*getWaterAmount()*/!* {
    return this.waterAmount;
  }
}

new CoffeeMachine().setWaterAmount(100);
```

これは少し長く見えますが、関数はより柔軟です。たとえいま時点では必要ないとしても、この方法の場合、複数の引数を受け取ることができます。そのため、将来なにかをリファクタする必要がある場合に備えるなら、関数はより安全な選択肢です。

もちろん、これはトレードオフです。一方で get/set 構文はより短くかけます。ここに厳密なルールはないので、決めるのはあなた次第です。
````

```smart header="Protected フィールドは継承されます"
`class MegaMachine extends CoffeeMachine` と継承した場合、新しいクラスのメソッドから `this._waterAmount` や `this._power` にアクセスするのを妨げるものは何もありません。

つまり、protected フィールは当然のことながら継承可能です。下で見ていく private なものとは異なります。
```

## Private "#waterLimit"

[recent browser=none]

プライベートなプロパティやメソッドに対する言語レベルのサポートを提供する、ほぼ標準的な完成したJavascriptの提案があります。

プライベートは `#` から始める必要があります。それらはクラス内部からのみアクセス可能です。

例えば、ここではプライベートな `#waterLimit` プロパティを追加し、水量をチェックするロジックを別のメソッドに抜き出しています:

```js
class CoffeeMachine {
*!*
  #waterLimit = 200;
*/!*

*!*
  #checkWater(water) {
    if (value < 0) throw new Error("Negative water");
    if (value > this.#waterLimit) throw new Error("Too much water");
  }
*/!*

  _waterAmount = 0;

  set waterAmount(value) {
*!*
    this.#checkWater(value);
*/!*
    this._waterAmount = value;
  }

  get waterAmount() {
    return this.waterAmount;
  }

}

let coffeeMachine = new CoffeeMachine();

*!*
coffeeMachine.#checkWater(); // Error
coffeeMachine.#waterLimit = 1000; // Error
*/!*

coffeeMachine.waterAmount = 100; // Works
```

言語レベルで、`#` はフィールドがプライベートであることを示す特別な記号です。その外側や継承したクラスからアクセスすることはできません。

プライベートフィールドはパブリックなものと衝突しません。プライベートな `#waterAmount` とパブリックな `waterAmount` フィールド両方を同時にもつことができます。

例えば、`#waterAmount` のアクセサとなる `waterAmount` を作りましょう。:

```js run
class CoffeeMachine {

  #waterAmount = 0;

  get waterAmount() {
    return this.#waterAmount;
  }

  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this.#waterAmount = value;
  }
}

let machine = new CoffeeMachine();

machine.waterAmount = 100;
alert(machine.#waterAmount); // Error
```

protected なものとは異なり、private フィールドは言語レベルで強制されます。

なお、`CoffeeMachine` を継承した場合、`#waterAmount` へアクセスはできません。アクセスするには、`waterAmount` の getter/setter を経由する必要があります。
:

```js
class CoffeeMachine extends CoffeeMachine() {
  method() {
*!*
    alert( this.#waterAmount ); // Error: CoffeeMachine からのみアクセス可能
*/!*
  }
}
```

多くのシナリオにおいて、このような制限は厳しすぎます。`CoffeeMachine` を拡張する際には、その内部にアクセスすべき正当な理由があるかもしれません。そのため、protected フィールドは言語レベルの構文ではサポートされていませんが、多くの場合 protected フィールドが使われています。

````warn
Private フィールドは特別です。

通常だと this[name] でフィールドにアクセスできます。:

```js
class User {
  ...
  sayHi() {
    let fieldName = "name";
    alert(`Hello, ${this[fieldName]}`);
  }
}
```

しかし、private フィールドだとそれはできません。: `this['#name']` は期待通り動作しません。これは private であることを維持するための、構文上の制限になります。
````

## サマリ

OOP の用語では、外部インタフェースと内部インタフェースを切り離すことを、[カプセル化]("https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)") と呼びます。

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

    プログラマも例外ではありませｎ。

    **実装の詳細が隠されていて、シンプルかつ良くドキュメント化された外部インタフェースが利用可能であることは常に便利です。**

内部インタフェースを隠すために、proctected または public プロパティを使用します。]

- protected フィールドは `_` で始まります。これはよく知られた慣習であり、言語レベルで強制されているものではありません。プログラマはそのクラスと、それを継承したクラスからのみ `_` で始まるフィールドにアクセスするべきです。
- private フィールドは `#` で始まります。JavaScript では、クラス内からのみアクセスできます。

現時点では、private フィールドはブラウザ間では十分にはサポートされていませんが、polyfill することができます。
