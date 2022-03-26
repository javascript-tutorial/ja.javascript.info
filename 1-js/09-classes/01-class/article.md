
# クラス(Class) 基本構文

```quote author="Wikipedia"
オブジェクト指向プログラミングでは、*クラス* はオブジェクト生成、状態(メンバ変数)の初期値の提供や振る舞いの実装(メンバ関数またはメソッド)のための拡張可能なプログラムコードテンプレートです。
```

実践では、ユーザや商品など、同じ種類のオブジェクトを大量に作成することがしばしばあります。

<info:constructor-new> の章ですでにご存知の通り、`new function` はそれ場合に役立ちます。

ですが、最新の JavaScript では、より高度な "class" 構造があり、オブジェクト指向プログラミングに役立つ優れた新機能が導入されています。

## "class" 構文

基本の構文は次の通りです:
```js
class MyClass {
  // クラスメソッド
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

その後、`new MyClass()` で、リストされたすべてのメソッドをもつ新しいオブジェクトを作成します。

`constructor()` メソッドは `new` により自動で呼び出され、そこでオブジェクトを初期化できます。

例

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// 使い方:
let user = new User("John");
user.sayHi();
```

`new User("John")` が呼び出されると:
1. 新しいオブジェクトが作られます。
2. 指定された引数で `constructor` が実行され、`this.name` へ代入します。

...以降、`user.sayHi()` のように、オブジェクトメソッドが呼び出せます。


```warn header="クラスメソッドの間にはカンマは不要です"
初心者の開発者の落とし穴として、クラスメソッドの間にカンマを置くことがあります。これは構文エラーになります。

ここでの表記はオブジェクトリテラルと混同しないでください。クラス内では、カンマは必要ありません。
```

# クラスとは？

では、`class` は正確に何でしょうか？これはまったく新しい言語レベルのエンティティではありません。

魔法を解き明かして、クラスが実際に何であるか見てみましょう。これは多くの複雑な側面を理解するのに役立ちます。

JavaScript ではクラスは関数の一種です。

これを見てください:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// 証拠: User は function です
*!*
alert(typeof User); // function
*/!*
```

`class User {...}` 構造は実際に行っていることは以下です:

1. クラス宣言の結果となる `User` と言う名前の関数を作成します。関数コードは `constructor` メソッドです（メソッドがない場合は空と想定します）。 
2. `User.prototype` に、`sayHi` などのクラスメソッドを格納します。 

`new User` オブジェクトが作成された後、そのメソッドを呼び出すと、<info:function-prototype> の章で説明しように、プロトタイプから取得されます。従って、オブジェクトはクラスメソッドへのアクセスを持ちます。

`class User` 宣言の結果を次のように説明できます:

![](class-user.svg)

これを確認するコードは以下です:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// class は function
alert(typeof User); // function

// ...あるいは, より正確には User は constructor メソッド
alert(User === User.prototype.constructor); // true

// メソッドは User.prototype にあります e.g:
alert(User.prototype.sayHi); // sayHi メソッドのコード

// prototype には正確には2つのメソッドがあります
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## 単なるシンタックスシュガーではありません

`class` は "シンタックスシュガー"（新しいものは導入されていないが、より可読性が高い書き方）という人が時々います。実際、`class` キーワードを使わずに同じものを宣言することが可能です。:

```js run
// 純粋な関数で User クラスを書き換え

// 1. constructor 関数を作成
function User(name) {
  this.name = name;
}
// 関数 prototype は "constructor" プロパティをデフォルトで持ちます
// なので、作成は不要です

// 2. prototype へメソッドを追加
User.prototype.sayHi = function() {
  alert(this.name);
};

// 使い方:
let user = new User("John");
user.sayHi();
```

この定義の結果はほぼ同じです。なので、コンストラクタとそのプロトタイプメソッドを一緒に定義するための、`class` のシンタックスシュガーとみなされる理由はたしかにあります。

ですが、重要な違いがあります。

1. まず、`class` で生成された関数は特別な内部プロパティ `[[IsClassConstructor]]: true` でラベル付けされています。そのため、手動で作成するのとまったく同じではありません。

    言語は様々な箇所でそのプロパティをチェックします。例えば通常の関数とは異なり、`new` で呼び出す必要があります:
    
    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: クラスのコンストラクタ User は `new` なしで呼び出せません
    ```

    また、ほとんどの JavaScript エンジンではクラスのコンストラクタの文字列表現は、"class..." で始まります

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
    他の違いもあります。この後見ていきます。

2. クラス メソッドは列挙不可です
    クラス定義は、`"prototype"` にあるすべてのメソッドに対して `enumerable` フラグを `false` にセットします。

    オブジェクトを `for...in` するとき、通常はクラスメソッドは必要ないのでこれは便利です。

3. クラスは常に `use strict` です
    クラス構造の中のコードはすべて自動で strict モードです。

加えて、`class` 構文には後で説明するような多くの機能があります。

## クラス表現

関数と同じように、クラスも別の式の中で定義し、渡したり、返却したり代入することができます。

これはクラス式の例です。:

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

名前付き関数と同様、クラスも名前を持つことができます。

クラス式に名前がある場合、そのクラス内部でのみ見えます:

```js run
// "名前付きクラス式"
// (スペックにはこのような用語はありませんが、名前付き関数式と同じです)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass の名前はクラスの内部でのみ見えます
  }
};

new User().sayHi(); // 動作します, MyClass の定義を表示

alert(MyClass); // error, MyClass の名前はクラスの外からは見えません
```

次のように。クラスを動的に "要求に応じて" 作ることもできます。:

```js run
function makeClass(phrase) {
  // クラス定義とその返却
  return class {
    sayHi() {
      alert(phrase);
    }
  };
}

// 新しいクラスを作成
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


### Getters/setters

リテラルオブジェクトのように、クラスも getters/setters, 算出プロパティなどを含めることができます。

これは、`get/set` を使用して実装された `user.name` の例です:

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

技術的には、このようなクラス宣言は `User.prototype` に getter / setter を作成することで機能します。

## 計算された名前（computed name）

これは括弧 `[...]` を使用した計算されたメソッド名の例です。

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

このような特徴は、リテラルオブジェクトに似ているので、覚えやすいと思います。

## クラスフィールド

```warn header="古いブラウザではポリフィルが必要な場合があります"
クラスフィールドは最近言語に追加されたものです。
```

以前は、クラスはメソッドだけを持っていました。

"クラスフィールド" は任意のプロパティが追加できる構文です。

例えば、`class User` に `name` プロパティを追加しましょう。

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

つまり、宣言の中で、"<property name> = <value>" と記述するだけです。

クラスフィールドの重要な違いは、`User.prototype` ではなく、個々のオブジェクトにセットされることです。:

```js run
class User {
*!*
  name = "John";
*/!*
}

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

また、より複雑な式や関数呼び出しで値を代入することもできます。:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


### クラスフィールドでバインドされたメソッドを作成する

章 <info:bind> でデモしたように、JavaScript での関数は動的な `this` を持ちます。これは呼び出しのコンテキストに依存します。

そのため、オブジェクトメソッドが渡され、別のコンテキストで呼び出された場合、`this` はもうそのオブジェクトの参照ではありません。

例えば、このコードは `undefined` になります:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

問題は "`this` なし" で呼び出されたことです。

章 <info:bind> で議論したように、これを直す2つのアプローチがあります。:

1. `setTimeout(() => button.click(), 1000)` のようにラッパー関数を渡す。
2. メソッドをオブジェクトにバインドする。 e.g. コンストラクタにて。

クラスフィールドは別の、すばらしい構文を提供します:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

クラスフィールド `click = () => {...}` はオブジェクトごとに作られ、`Button` オブジェクトごとに別々の関数です。そして、`this` はそのオブジェクトを参照します。どこで `button.click` を渡しても、`this` は常に正しい値になります。

これはイベントリスナーなど、ブラウザ環境で特に役立ちます。

## サマリ

基本のクラス構文は次のようになります。:

```js
class MyClass {
  prop = value; // プロパティ

  constructor(...) { // コンストラクタ
    // ...
  }

  method(...) {} // メソッド

  get something(...) {} // getter
  set something(...) {} // setter

  [Symbol.iterator]() {} // 計算された名前のメソッド (ここではシンボル)
  // ...
}
```

`MyClass` は技術的には関数（`constructor` として提供）で、メソッド、getter / setter は `MyClass.prototype` に記述されます。

次の章では、継承など他の機能を含め、クラスにてより詳しく学びます。
