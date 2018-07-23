
# クラス

"class" 構造は、クリーンで見やすい構文でプロトタイプベースのクラスを定義することができます。

[cut]

## "class" 構文

`class` 構文は汎用性があり、最初にシンプルな例から始めます。

これはプロトタイプベースのクラス `User` です:

```js run
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function() {
  alert(this.name);
}

let user = new User("John");
user.sayHi();
```

...そしてこれは `class` 構文を使った場合です:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

let user = new User("John");
user.sayHi();
```

2つの例が似ていることは容易に分かると思います。クラス内のメソッドはそれらの間にカンマを持たないことに注意してください。新米の開発者はときどきそれを忘れて、クラスメソッドの間にカンマをおいてしまい動作しなくなります。これはリテラルオブジェクトではなく、クラス構文です。

では、`class` は正確になにをするでしょう？ 私たちはそれが新しい言語レベルの実態を定義していると思うかもしれませんが、それは間違っています。

ここで `class User {...}` は実際には2つのことをしています。:

1. `"constructor"` という名前の関数を参照する変数 `User` を宣言します。
2. その定義の中にリストされているメソッドを `User.prototype` の中に置きます。ここでは、`sayHi` と `constructor` です。

次のコードでクラスを掘り下げてみましょう。:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name);  }
}

*!*
// proof: User is the "constructor" function
*/!*
alert(User == User.prototype.constructor); // true

*!*
// proof: there are two methods in its "prototype"
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

これは `class User` が生成するものの図です。:

![](class-user.png)


従って、`class` はコンストラクタとプロトタイプメソッドを一緒に定義する特別な構文です。

...しかしそれだけではありません。小さな微調整があちこちにあります。:

コンストラクタは `new` を必要とします
: 通常の関数とは異なり、クラス `constructor` は `new` なしで呼ぶことはできません。:

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
```

異なる文字列出力
: もし `alert(User)` のように出力すると、エンジンによって `"class User..."` や `"function User..."` と表示されます。

混乱しないでください: 文字列の表現は様々ですが、それは依然として関数であり、JavaScript言語で別の "class" エンティティはありません。

クラスメソッドは非列挙型
: クラス定義は、`"prototype"` の中のすべてのメソッドに対して `enumerable` フラグを `false` にセットします。オブジェクトを `for..in` したとき、通常クラスメソッドは出てきてほしくないので、これは良いことです。

クラスはデフォルトの `constructor() {}` を持っています
: `class` 構造の中に `constructor` がない場合、空の関数が生成され `constructor() {}` と書いたのと同じように動作します。

クラスは常に `use strict` です
: クラス構造の内側のすべてのコードは自動的に strict モードです。

### Getters/setters

クラスは getter/setter も含みます。以下はそれらを使って実装した `user.name` の例です。:

```js run
class User {

  constructor(name) {
    // invokes the setter
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Name too short.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

user = new User(""); // Name too short.
```

内部的に、getter と setter もまた次のように `User` プロトタイプ上に作られます。:

```js
Object.defineProperty(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
```

### メソッドのみ

オブジェクトリテラルとは異なり、`class` の中で `property:value` 割り当ては許可していません。メソッドとgetter/setterのみです。その制限を緩和するために、仕様で進行中のものがいくつかありますが、それはまだありません。

もしプロトタイプに非関数の値を置く必要が本当にある場合、`prototype` を手動で修正することができます。以下を見てください:

```js run
class User { }

User.prototype.test = 5;

alert( new User().test ); // 5
```

従って、技術的にはそれは可能です。が、なぜそうしているかを知るべきです。このようなプロパティはクラスのすべてのオブジェクトの間で共有されます。

"クラス内" の代替は getter を使うことです。:

```js run
class User {
  get test() {
    return 5;
  }
}

alert( new User().test ); // 5
```

外部コードからの使い方は同じですが、getter バリアントは少し遅いです。

## クラス表現

関数と同様に、クラスは別の式の中で定義され、渡され、返されます。

これは、クラスを返す関数("クラスファクトリー")です。:

```js run
function makeClass(phrase) {
*!*
  // declare a class and return it
  return class {
    sayHi() {
      alert(phrase);
    };
  };
*/!*
}

let User = makeClass("Hello");

new User().sayHi(); // Hello
```

`class` はプロトタイプ付き関数の特別な形式であることを思い出すと、これはとても普通です。

また、名前付けされた関数表現のように、このようなクラスもまた名前を保つ場合があります。それはクラスの中でのみ見えます。:

```js run
// "Named Class Expression" (alas, no such term, but that's what's going on)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass is visible only inside the class
  }
};

new User().sayHi(); // works, shows MyClass definition

alert(MyClass); // error, MyClass not visible outside of the class
```

## 静的メソッド(Static method)

私たちは、その `"prototype"` ではなく、クラス関数へメソッドを割り当てることもできます。このようなメソッドは *static* と呼ばれます。

例:

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this == User);
  }
}

User.staticMethod(); // true
```

これは実際には、関数プロパティとして代入するのと同じです。:

```js
function User() { }

User.staticMethod = function() {
  alert(this == User);
};
```

`User.staticMethod()` の中での `this` の値はクラスコンストラクタ `User` 自身です("ドットの前のオブジェクト" ルールです)。

通常、静的メソッドは特定のオブジェクトに依存せず、クラスに属する関数を実装するときに使われます。

例えば、私たちは `Article` オブジェクトを持っており、それらを比較する関数が必要とします。自然な選択だと、このように `Article.compare` になるでしょう。:

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
  new Article("Mind", new Date(2016, 1, 1)),
  new Article("Body", new Date(2016, 0, 1)),
  new Article("JavaScript", new Date(2016, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // Body
```

ここで、`Article.compare` は記事を比較するための手段として記事の "上に" 立っています。それは記事のメソッドではなく、クラス全体のメソッドです。

別の例は、いわゆる "ファクトリー" メソッドです。イメージしてください、私たちは記事を作成する方法はほとんどありません。:

1. 与えられたパラメータ(`title`, `date` など)による作成
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
    // remember, this = Article
    return new this("Todays digest", new Date());
  }
*/!*
}

let article = Article.createTodays();

alert( article.title ); // Todays digest
```

現在、今日のダイジェストを作成する必要があるたびに、`Article.createTodays()` を呼ぶことができます。もう一度、これは記事のメソッドではなく、クラス全体のメソッドです。

静的メソッドは、次のように、データベース関連のクラスでデータベースの検索/保存/削除のためにも使用されます。:

```js
// assuming Article is a special class for managing articles
// static method to remove the article:
Article.remove({id: 12345});
```

## サマリ [#summary]

基本のクラス構文はこのようになります。:

```js
class MyClass {
  constructor(...) {
    // ...
  }
  method1(...) {}
  method2(...) {}
  get something(...) {}
  set something(...) {}
  static staticMethod(..) {}
  // ...
}
```

`MyClass` の値は `constructor` として提供された関数です。もし `constructor` がなければ、空の関数です。

いずれにしても、クラス宣言に列挙されたメソッドは `prototype`のメンバーになりますが、静的メソッドは関数自身に書き込まれ、`MyClass.staticMethod()` として呼び出すことができます。 静的メソッドは、クラスに結びつく関数が必要なときに使用されますが、そのクラスのオブジェクトに結びつく場合には使用されません。

次のチャプターでは、継承を含め、よりクラスについて学びます。
