
# クラス

"class" 構造は、綺麗で見やすい構文でプロトタイプベースのクラスを定義することができます。

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

では、`class` は正確になにをするでしょう？ それが新しい言語レベルの実態を定義していると思うかもしれませんが、それは間違っています。

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
// 証明: User は "constructor" 関数である
*/!*
alert(User == User.prototype.constructor); // true

*!*
// 証明: その "prototype" には 2つのメソッドがある
*/!*
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

これは `class User` が生成するものの図です。:

![](class-user.svg)


従って、`class` はコンストラクタとプロトタイプメソッドを一緒に定義する特別な構文です。

...しかしそれだけではありません。小さな微調整があちこちにあります。:

コンストラクタは `new` を必要とします
: 通常の関数とは異なり、クラス `constructor` は `new` なしで呼ぶことはできません。:

```js run
class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class コンストラクタ User は `new` なしで呼べません
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
    // setter を呼び出す
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
  // class を宣言しそれを返します
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
// "名前付けされたクラス式" (そのような言葉はありませんが)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass は class の内側でだけ見えます
  }
};

new User().sayHi(); // 動作します, MyClass の定義を表示します

alert(MyClass); // error, MyClass は class の外からは見えません
```

## サマリ 

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
