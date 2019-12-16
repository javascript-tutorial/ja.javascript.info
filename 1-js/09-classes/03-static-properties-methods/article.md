
<<<<<<< HEAD
# 静的プロパティとメソッド

`"prototype"` ではなく、クラス関数にメソッドを代入することもできます。このようなメソッドは *static(静的)* と呼ばれます。

例:
=======
# Static properties and methods

We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called *static*.

In a class, they are prepended by `static` keyword, like this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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

<<<<<<< HEAD
これは実際には、関数プロパティとして割り当てるのと同じことをします。:

```js
function User() { }
=======
That actually does the same as assigning it as a property directly:

```js run
class User { }
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

User.staticMethod = function() {
  alert(this === User);
};
<<<<<<< HEAD
```

`User.staticMethod()` 内の `this` の値はクラスコンストラクタ `User` 自身("ドットの前のオブジェクト" ルール)です。

通常 static メソッドは、クラスには属するが、特定のオブジェクトには属さない関数を実装するのに使用されます。

例えば、`Article` オブジェクトを持っており、それらを比較するための関数が必要です。自然な選択は、次のような `Article.compare` です。:
=======

User.staticMethod(); // true
```

The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the "object before dot" rule).

Usually, static methods are used to implement functions that belong to the class, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them. A natural solution would be to add `Article.compare` method, like this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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
<<<<<<< HEAD
  new Article("Mind", new Date(2019, 1, 1)),
  new Article("Body", new Date(2019, 0, 1)),
=======
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

<<<<<<< HEAD
alert( articles[0].title ); // Body
```

ここでは、`Article.compare` は記事を比較する手段として記事の “上に” 立っています。それは記事のメソッドではなく、むしろクラス全体のメソッドです。

別の例は、いわゆる “ファクトリー” メソッドです。想像してください、記事を作成する方法はいくつか必要です。:

1. 与えられたパラメータ(title, date など)による作成
2. 今日の日付の空の記事の作成
3. ...

最初の方法はコンストラクタで実装することができます。また2つ目の方法としてクラスの静的メソッドを作ることができます。

ここでの `Article.createTodays()` のように:
=======
alert( articles[0].title ); // CSS
```

Here `Article.compare` stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.

Another example would be a so-called "factory" method. Imagine, we need few ways to create an article:

1. Create by given parameters (`title`, `date` etc).
2. Create an empty article with today's date.
3. ...or else somehow.

The first way can be implemented by the constructor. And for the second one we can make a static method of the class.

Like `Article.createTodays()` here:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
<<<<<<< HEAD
    // 思い出してください, this = Article
=======
    // remember, this = Article
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

<<<<<<< HEAD
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
=======
alert( article.title ); // Today's digest
```

Now every time we need to create a today's digest, we can call `Article.createTodays()`. Once again, that's not a method of an article, but a method of the whole class.

Static methods are also used in database-related classes to search/save/remove entries from the database, like this:

```js
// assuming Article is a special class for managing articles
// static method to remove the article:
Article.remove({id: 12345});
```

## Static properties

[recent browser=Chrome]

Static properties are also possible, they look like regular class properties, but prepended by `static`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

<<<<<<< HEAD
これは直接 `Article` に代入するのと同じです。:
=======
That is the same as a direct assignment to `Article`:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
Article.publisher = "Ilya Kantor";
```

<<<<<<< HEAD
## 静的(Statics)と継承

静的なものは継承され、`Child.method` として `Parent.method` にアクセスできます。

例えば、以下のコードの `Animal.compare` は継承され、`Rabbit.compare` としてアクセス可能です。

```js run
class Animal {
=======
## Inheritance of static properties and methods

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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

<<<<<<< HEAD
// Animal から継承
=======
// Inherit from Animal
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
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
<<<<<<< HEAD
```

いま、継承された `Animal.compare` が呼び出されると想定して `Rabbit.compare` を呼ぶことができます。

これはどのように機能しているでしょう？改めて言いますが、プロトタイプを使用して、です。すでに推測したかもしれませんが、extends もまた `Rabbit` に `Animal` への参照を持つ `[[Prototype]]` を与えます。

![](animal-rabbit-static.svg)

したがって、`Rabbit` 関数は `Animal` 関数を継承しています。そして `Animal` 関数は通常 `Function.prototype` を参照する `[[Prototype]]` を持ちます。なぜなら、何も  `extend` していないからです。

ここで、それを確認しましょう:
=======

alert(Rabbit.planet); // Earth
```

Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.

![](animal-rabbit-static.svg)

So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let's check that by code:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js run
class Animal {}
class Rabbit extends Animal {}

<<<<<<< HEAD
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
=======
// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Summary

Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.

For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.

They are labeled by the word `static` in class declaration.

Static properties are used when we'd like to store class-level data, also not bound to an instance.

The syntax is:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

<<<<<<< HEAD
これは技術的には、クラス自身への代入と同じです:
=======
Technically, static declaration is the same as assigning to the class itself:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
MyClass.property = ...
MyClass.method = ...
```

<<<<<<< HEAD
静的プロパティは継承されます。

技術的には、`class B extends A` の場合、クラス `B` 自体のプロトタイプは `A` を指します、: `B.[[Prototype]] = A`。したがって、`B` の中にフィールドが見つからない場合は、検索は `A` の中で続行されます。
=======
Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
