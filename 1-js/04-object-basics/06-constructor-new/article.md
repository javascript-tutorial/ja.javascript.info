# コンストラクタ、 new 演算子

<<<<<<< HEAD
通常の `{...}` 構文では、1つのオブジェクトを作成できます。しかし、複数のユーザやメニューアイテムなど、似たようなオブジェクトを多数作成する必要がある場合もあります。
=======
The regular `{...}` syntax allows us to create one object. But often we need to create many similar objects, like multiple users or menu items and so on.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

このようなことは、コンストラクタ関数と `"new"` 演算子を使うことで実現できます。

<<<<<<< HEAD
## コンストラクタ 関数 

コンストラクタ関数は技術的には通常の関数です。それには2つの慣習があります:
=======
## Constructor function
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. 名前は大文字で始めます。
2. `"new"` 演算子を使ってのみ実行されるべきです。

例:

```js run
function User(name) {
  this.name = name;
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.name); // Jack
alert(user.isAdmin); // false
```

<<<<<<< HEAD
`new` 演算子を用いて関数が実行された場合、次のような処理が行われます:
=======
When a function is executed with `new`, it does the following steps:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. 新しい空のオブジェクトが作成され、 `this` に割り当てられます。
2. 関数本体を実行します。通常は新しいプロパティを追加することで `this` に変更を加えます。
3. `this` の値が返されます。

つまり、`new User(...)` は次のようなことを行います:

```js
function User(name) {
*!*
  // this = {};  (暗黙)
*/!*

  // this へプロパティを追加
  this.name = name;
  this.isAdmin = false;

*!*
  // return this;  (暗黙)
*/!*
}
```

<<<<<<< HEAD
したがって、`let user = new User("Jack")` は、以下と同じ結果となります:
=======
So `let user = new User("Jack")` gives the same result as:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

もし他のユーザを作りたいのであれば、`new User("Ann")`、`new User("Alice")` と言ったように呼び出すことができます。毎回リテラルを使うよりはるかに短く、また読みやすくなります。

再利用可能なオブジェクト作成のコードを実装すること、それがコンストラクタの主な目的です。

<<<<<<< HEAD
改めて留意しておきましょう。技術的にはどのような関数（`this` を持たないアロー関数を除く）でもコンストラクタとして使用できます。つまり、どの関数も `new` で実行することができ、上記のアルゴリズムが実行されることになります。"先頭が大文字" というのは、関数が `new` で実行されることを明確にするための共通の合意です。

````smart header="new function() { ... }"
1つの複雑なオブジェクトを作成するためのコードがたくさんある場合、次のように即座に呼び出されるコンストラクタ関数でラップすることができます:
=======
Let's note once again -- technically, any function (except arrow functions, as they don't have `this`) can be used as a constructor. It can be run with `new`, and it will execute the algorithm above. The "capital letter first" is a common agreement, to make it clear that a function is to be run with `new`.

````smart header="new function() { ... }"
If we have many lines of code all about creation of a single complex object, we can wrap them in an immediately called constructor function, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
// create a function and immediately call it with new
let user = new function() { 
  this.name = "John";
  this.isAdmin = false;

  // ...ユーザ作成のための他のコード。
  // 複雑なロジック、文
  // ローカル変数などを持つかもしれません。
};
```

<<<<<<< HEAD
このコンストラクタはどこにも保存されておらず、単に作って呼び出されただけなので再び呼び出すことはできません。したがってこのトリックは、将来の再利用は考えず、単一のオブジェクトを構成するコードをカプセル化することを目的としています。
````

## コンストラクタの呼び出しモードの確認: new.target 

```smart header="高度な内容"
このセクションで登場する構文はめったに使われないため、すべてについて知りたいのでなれけばスキップしても構いません。
=======
This constructor can't be called again, because it is not saved anywhere, just created and called. So this trick aims to encapsulate the code that constructs the single object, without future reuse.
````

## Constructor mode test: new.target

```smart header="Advanced stuff"
The syntax from this section is rarely used, skip it unless you want to know everything.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

関数の中では、`new.target` という特別なプロパティを使うことで、`new` を使って呼び出されたのかそうでないのかを確認することができます。

<<<<<<< HEAD
このプロパティは、通常の呼び出しでは `undefined` であり、 `new` で呼び出された場合はその関数と等しくなります:
=======
It is undefined for regular calls and equals the function if called with `new`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function User() {
  alert(new.target);
}

<<<<<<< HEAD
// new なし:
=======
// without "new":
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
User(); // undefined
*/!*

<<<<<<< HEAD
// new あり:
=======
// with "new":
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*!*
new User(); // function User { ... }
*/!*
```

<<<<<<< HEAD
これを関数内で使用することにより、`new` を付けて「コンストラクタモード」で呼び出されたのか、あるいは `new` を付けずに「通常モード」で呼び出されたのかを知ることができます。

`new` の場合と、通常呼び出し両方の構文が同じように動作するようにするために使用することもできます:
=======
That can be used inside the function to know whether it was called with `new`, "in constructor mode", or without it, "in regular mode".

We can also make both `new` and regular calls to do the same, like this:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function User(name) {
  if (!new.target) { // new なしで実行した場合
    return new User(name); // ...new を追加します
  }

  this.name = name;
}

let john = User("John"); // new User へのリダイレクト
alert(john.name); // John
```

<<<<<<< HEAD
このアプローチは、構文をより柔軟にするためにライブラリ中で使われることがあります。`new` の有無に関わらず同じ動作をするような、関数の呼び出しを可能とするためです。

`new` を省略すると何が起こっているのかが少しわかりにくくなるため、どこへでもこれを使うのは良いことではないでしょう。`new` があれば、新しいオブジェクトが作られることを知ることができます。
=======
This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without `new`, and it still works.

Probably not a good thing to use everywhere though, because omitting `new` makes it a bit less obvious what's going on. With `new` we all know that the new object is being created.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## コンストラクタからの返却 

通常、コンストラクタは `return` 文を持ちません。コンストラクタの仕事は、必要なものをすべて `this` の中に書き込むことであり、`this` が自動的に戻り値となります。

しかし、`return` 文がある場合のルールはシンプルです:

<<<<<<< HEAD
- もし `return` がオブジェクトと一緒に呼ばれた場合、`this` の代わりにオブジェクトが返されます。
- もし `return` がプリミティブと一緒に呼ばれた場合、それは無視されます。
=======
- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

言い換えると、オブエジェクトの`return` はそのオブジェクトを返し、それ以外のケースでは `this` が返されます。

例えば、ここで `return` はオブジェクトと共に呼ばれているため、`this` より優先してこのオブジェクトが返されます:

```js run
function BigUser() {

  this.name = "John";

<<<<<<< HEAD
  return { name: "Godzilla" };  // <-- オブジェクトを返す
}

alert( new BigUser().name );  // Godzilla, オブジェクトを取得 ^^
=======
  return { name: "Godzilla" };  // <-- returns this object
}

alert( new BigUser().name );  // Godzilla, got that object
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```

そして、これは空の `return` の例です(`return` の後にプリミティブを置いた場合も同じです)

```js run
function SmallUser() {

  this.name = "John";

  return; // <-- returns this
}

alert( new SmallUser().name );  // John
```

通常、コンストラクタは `return` 文を持ちません。ここで、オブジェクトを返すときの特別な動作について言及しているのは、主に網羅性のためです。

<<<<<<< HEAD
````smart header="丸括弧の省略"
ところで、もし引数を持たない場合は、`new` の後の丸括弧を省略することもできます。
=======
````smart header="Omitting parentheses"
By the way, we can omit parentheses after `new`:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let user = new User; // <-- 括弧なし
// これと同じ
let user = new User();
```

丸括弧の省略は "良いスタイル" ではありませんが、この構文は仕様で認められています。
````

## コンストラクタの中のメソッド 

オブジェクトを作るとき、コンストラクタ関数を使用することで高い柔軟性を得ることができます。コンストラクタ関数はオブジェクトがどのように組み立てられるか、その中に何を置くかを定義するパラメータを持っています。

もちろん、`this` にはプロパティだけではなく、同様にメソッドも追加することができます。

例えば、下の `new User(name)` は、`name` と `sayHi` メソッドを持つオブジェクトを作ります:

```js run
function User(name) {
  this.name = name;

  this.sayHi = function() {
    alert( "My name is: " + this.name );
  };
}

*!*
let john = new User("John");

john.sayHi(); // My name is: John
*/!*

/*
john = {
   name: "John",
   sayHi: function() { ... }
}
*/
```

<<<<<<< HEAD
複雑なオブジェクトを作るために、より高度な構文 [classes](info:classes) があります。これに関しては後ほど説明します。

## サマリ 
=======
To create complex objects, there's a more advanced syntax, [classes](info:classes), that we'll cover later.

## Summary
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

- コンストラクタ関数（もしくは簡潔にコンストラクタ）は通常の関数ですが、大文字から始まる名前を持つと言う共通の合意があります。
- コンストラクタ関数は `new` を使ってのみ呼び出されるべきです。この呼び出しは、最初に空の `this` を作成し、必要な処理が行われた `this` を最後に返すことを意味します。

複数の似たようなオブジェクトを作るために、コンストラクタ関数を使うことができます。

JavaScript には、日付を表す `Date` や集合を表す `Set`、そしてこのあと私たちが学ぶ予定のものなど、多くの組み込みオブジェクトに対するコンストラクタ関数が用意されています。

```smart header="オブジェクト、我々は戻ってきます!"
このチャプターでは、オブジェクトとコンストラクタについての基礎のみを説明しています。これらは、次の章でデータ型と関数についてより深く学ぶために不可欠です。

<<<<<<< HEAD
それらを学んだあとオブジェクトに戻り、<info:prototypes> と <info:classes> の各章で詳しく説明します。
=======
After we learn that, we return to objects and cover them in-depth in the chapters <info:prototypes> and <info:classes>.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
```
