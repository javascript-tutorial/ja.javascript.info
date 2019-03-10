
# 静的プロパティとメソッド

`"prototype"` ではなく、クラス関数にメソッドを代入することもできます。このようなメソッドは *static(静的)* と呼ばれます。

例:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // true
```

これは実際には、関数プロパティとして割り当てるのと同じことをします。:

```js
function User() { }

User.staticMethod = function() {
  alert(this === User);
};
```

`User.staticMethod()` 内の `this` の値はクラスコンストラクタ `User` 自身("ドットの前のオブジェクト" ルール)です。

通常 static メソッドは、クラスには属するが、特定のオブジェクトには属さない関数を実装するのに使用されます。

例えば、`Article` オブジェクトを持っており、それらを比較するための関数が必要です。自然な選択は、次のような `Article.compare` です。:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// usage
let articles = [
  new Article("Mind", new Date(2019, 1, 1)),
  new Article("Body", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

ここでは、`Article.compare` は記事を比較する手段として記事の “上に” 立っています。それは記事のメソッドではなく、むしろクラス全体のメソッドです。

別の例は、いわゆる “ファクトリー” メソッドです。想像してください、記事を作成する方法はいくつか必要です。:

1. 与えられたパラメータ(title, date など)による作成
2. 今日の日付の空の記事の作成
3. ...

最初の方法はコンストラクタで実装することができます。また2つ目の方法としてクラスの静的メソッドを作ることができます。

ここでの `Article.createTodays()` のように:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // 思い出してください, this = Article
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

これで今日のダイジェストを作成する必要があるたびに、`Article.createTodays()` を呼ぶことができます。改めて言いますが、これは記事のメソッドではなく、クラス全体のメソッドです。

静的メソッドは、次のように、データベース関連のクラスでデータベースの検索/保存/削除のためにも使用されます。:

```js
// Article は記事を管理するための特別なクラスと仮定します
// 記事を削除するための static メソッド:
Article.remove({id: 12345});
```

## 静的プロパティ

[recent browser=Chrome]

通常のクラスプロパティと同じように、静的プロパティも可能です。

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

これは直接 `Article` に代入するのと同じです。:

```js
Article.publisher = "Ilya Kantor";
```

## 静的(Statics)と継承

静的なものは継承され、`Child.method` として `Parent.method` にアクセスできます。

例えば、以下のコードの `Animal.compare` は継承され、`Rabbit.compare` としてアクセス可能です。

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

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Animal から継承
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
}

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.
```

いま、継承された `Animal.compare` が呼び出されると想定して `Rabbit.compare` を呼ぶことができます。

これはどのように機能しているでしょう？改めて言いますが、プロトタイプを使用して、です。すでに推測したかもしれませんが、extends もまた `Rabbit` に `Animal` への参照を持つ `[[Prototype]]` を与えます。

![](animal-rabbit-static.png)

したがって、`Rabbit` 関数は `Animal` 関数を継承しています。そして `Animal` 関数は通常 `Function.prototype` を参照する `[[Prototype]]` を持ちます。なぜなら、何も  `extend` していないからです。

ここで、それを確認しましょう:

```js run
class Animal {}
class Rabbit extends Animal {}

// 静的プロパティとメソッド用
alert(Rabbit.__proto__ === Animal); // true

// そして、次のステップは Function.prototype です。
alert(Animal.__proto__ === Function.prototype); // true

// that's in addition to the "normal" prototype chain for object methods
alert(Rabbit.prototype.__proto__ === Animal.prototype);
```

このようにして、`Rabbit` は `Animal` のすべての静的メソッドにアクセスすることができます。

## サマリ

静的メソッドは、具体的なクラスインスタンスに関連する機能やインスタンスが存在することを必要する機能ではなく、むしろクラス全体に属している機能のために使用されます。例えば、`Article.compare` のような、2つの記事を比較する汎用メソッド。

静的プロパティは、クラスレベルのデータを格納するときに使用されます。これもインスタンスにバインドされません。

構文は次の通りです:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

これは技術的には、クラス自身への代入と同じです:

```js
MyClass.property = ...
MyClass.method = ...
```

静的プロパティは継承されます。

技術的には、`class B extends A` の場合、クラス `B` 自体のプロトタイプは `A` を指します、: `B.[[Prototype]] = A`。したがって、`B` の中にフィールドが見つからない場合は、検索は `A` の中で続行されます。
