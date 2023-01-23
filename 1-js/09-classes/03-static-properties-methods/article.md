<<<<<<< HEAD
# 静的(static)プロパティとメソッド

クラス全体にメソッドを割り当てることもできます。このようなメソッドは _static(静的)_ と呼ばれます。

クラス宣言の中では、次のように `static` キーワードを付けます。
=======

# Static properties and methods

We can also assign a method to the class as a whole. Such methods are called *static*.

In a class declaration, they are prepended by `static` keyword, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
これは、実際にはプロパティとして直接割り当てるのと同じことをします。:

```js
class User {}

User.staticMethod = function () {
=======
That actually does the same as assigning it as a property directly:

```js run
class User { }

User.staticMethod = function() {
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  alert(this === User);
};

User.staticMethod(); // true
```

<<<<<<< HEAD
`User.staticMethod()` 内の `this` の値はクラスコンストラクタ `User` 自身("ドットの前のオブジェクト" ルール)です。

通常 static メソッドは、クラスには属するが、特定のオブジェクトには属さない関数を実装するのに使用されます。

例えば、`Article` オブジェクトがあり、それらを比較するための関数が必要とします。

自然な解決策は、静的メソッド `Article.compare` を追加することです。:
=======
The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the "object before dot" rule).

Usually, static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it.

For instance, we have `Article` objects and need a function to compare them.

A natural solution would be to add `Article.compare` static method:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

<<<<<<< HEAD
alert( articles[0].title ); // Body
```

ここでは、`Article.compare` は記事を比較する手段として、記事の “上位” にいます。記事のメソッドと言うよりはクラス全体のメソッドです。

別の例は、いわゆる “ファクトリー” メソッドです。

記事の作成には複数の方法が必要です:

1. 与えられたパラメータ(`title`, `date` など)による作成
2. 今日の日付の空の記事の作成
3. ...

最初の方法はコンストラクタで実装することができます。そして、2 つ目の方法としてはクラスの静的メソッドを作ることができます。

ここでの `Article.createTodays()` を見てください:
=======
alert( articles[0].title ); // CSS
```

Here `Article.compare` method stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.

Another example would be a so-called "factory" method.

Let's say, we need multiple ways to create an article:

1. Create by given parameters (`title`, `date` etc).
2. Create an empty article with today's date.
3. ...or else somehow.

The first way can be implemented by the constructor. And for the second one we can make a static method of the class.

Such as `Article.createTodays()` here:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    return new this("Today's digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

<<<<<<< HEAD
alert( article.title ); // Todays digest
```

これで今日のダイジェストを作成する必要があるたびに、`Article.createTodays()` を呼べます。改めて言いますが、これは記事のメソッドではなく、クラス全体のメソッドです。

静的メソッドは、次のように、データベース関連のクラスでデータベースの検索/保存/削除のためにも使用されます。:

```js
// Article は記事を管理するための特別なクラスと仮定します
// 記事を削除するための static メソッド:
Article.remove({ id: 12345 });
```

## 静的プロパティ

[recent browser=Chrome]

静的プロパティも可能で、通常のクラスプロパティと同じように見えますが、先頭に `static` が付きます。
=======
alert( article.title ); // Today's digest
```

Now every time we need to create a today's digest, we can call `Article.createTodays()`. Once again, that's not a method of an article, but a method of the whole class.

Static methods are also used in database-related classes to search/save/remove entries from the database, like this:

```js
// assuming Article is a special class for managing articles
// static method to remove the article by id:
Article.remove({id: 12345});
```

````warn header="Static methods aren't available for individual objects"
Static methods are callable on classes, not on individual objects.

E.g. such code won't work:

```js
// ...
article.createTodays(); /// Error: article.createTodays is not a function
```
````

## Static properties

[recent browser=Chrome]

Static properties are also possible, they look like regular class properties, but prepended by `static`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Article {
  static publisher = "Ilya Kantor";
}

<<<<<<< HEAD
alert(Article.publisher); // Ilya Kantor
```

これは直接 `Article` に代入するのと同じです。:
=======
alert( Article.publisher ); // Ilya Kantor
```

That is the same as a direct assignment to `Article`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
Article.publisher = "Ilya Kantor";
```

<<<<<<< HEAD
## 静的プロパティとメソッドの継承 [#statics-and-inheritance]

静的プロパティとメソッドは継承されます。

例えば、以下のコードの `Animal.compare` と `Animal.planet` は継承され、`Rabbit.compare` と `Rabbit.planet` としてアクセス可能です。
=======
## Inheritance of static properties and methods [#statics-and-inheritance]

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {
  static planet = "Earth";

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

*!*
rabbits.sort(Rabbit.compare);
*/!*

rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

<<<<<<< HEAD
`Rabbit.compare` を呼び出すと、継承された `Animal.compare` が呼び出されます。

これはどのように機能しているでしょう？すでに推測したかもしれませんが、`extends` もまた `Rabbit` に `Animal` への参照を持つ `[[Prototype]]` を与えます。

![](animal-rabbit-static.svg)

したがって, `Rabbit extends Animal` は 2 つの `[[Prototype]]` の参照を作成します:

1. `Rabbit` 関数は プロトタイプ的に `Animal` 関数を継承しています。
2. `Rabbit.prototype` はプロトタイプ的に `Animal.prototype` を継承しています。

結果、継承は通常のものと静的なメソッド両方で機能します。

ここで、それを確認しましょう:
=======
Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.

![](animal-rabbit-static.svg)

So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let's check that by code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
class Animal {}
class Rabbit extends Animal {}

<<<<<<< HEAD
// 静的
alert(Rabbit.__proto__ === Animal); // true

// 通常のメソッド
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## サマリ

静的メソッドは、具体的なクラスインスタンスに関連する機能やインスタンスが存在することを必要する機能ではなく、むしろクラス全体に属している機能のために使用されます。

例えば、比較用のメソッド `Article.compare(article1, article2)` や、ファクトリーメソッド `Article.createTodays()` です。

これらはクラス宣言の中で `static` と言うキーワードでラベル付けされます。

静的プロパティは、クラスレベルのデータを格納するときに使用され、インスタンスにバインドされません。

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

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
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
MyClass.property = ...
MyClass.method = ...
```

<<<<<<< HEAD
静的プロパティは継承されます。

`class B extends A` の場合、クラス `B` 自体のプロトタイプは `A` を指します、: `B.[[Prototype]] = A`。したがって、`B` の中にフィールドが見つからない場合は、検索は `A` の中で続行されます。
=======
Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
