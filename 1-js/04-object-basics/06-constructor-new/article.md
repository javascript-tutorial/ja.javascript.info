# コンストラクタ 演算子 new

通常 `{...}` 構文で1つのオブジェクトを作ることができます。しかし、しばしば多くの似たようなオブジェクトを作る必要があります。例えば複数のユーザやメニューアイテムなどです。

それは、コンストラクタ関数と `"new"` 演算子を使うことで実現できます。

<<<<<<< HEAD
[cut]

## コンストラクタ 関数 
=======
## Constructor function
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

コンストラクタ関数は技術的には通常の関数です。それには2つの慣習があります:

1. 先頭は大文字で名前付けされます。
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
`new User(...)` として関数が実行されたとき、次のようなステップになります:
=======
When a function is executed with `new`, it does the following steps:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

1. 新しい空のオブジェクトが作られ、 `this` に代入されます。
2. 関数本体を実行します。通常は `this` を変更し、それに新しいプロパティを追加します。
3. `this` の値が返却されます。

つまり、`new User(...)` は次のようなことをします:

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
なので、`new User("Jack")` の結果は次と同じオブジェクトです:
=======
So `let user = new User("Jack")` gives the same result as:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

```js
let user = {
  name: "Jack",
  isAdmin: false
};
```

さて、もし他のユーザを作りたい場合、`new User("Ann")`, `new User("Alice")` と言ったように呼ぶことができます。毎回リテラルを使うよりはるかに短く、また簡単で読みやすいです。

再利用可能なオブジェクト作成のコードを実装すること、それがコンストラクタの主な目的です。

改めて留意しましょう、技術的にはどんな関数もコンストラクタとして使うことができます。つまり、どの関数も `new` で実行することができ、上のアルゴリズムで実行されるでしょう。"先頭が大文字" は共通の合意であり、関数が `new` で実行されることを明確にするためです。

````smart header="new function() { ... }"
1つの複雑なオブジェクトの作成に関する多くのコードがある場合、コンストラクタ関数でそれをラップすることができます。このようになります:

```js
let user = new function() {
  this.name = "John";
  this.isAdmin = false;

  // ...ユーザ作成のための他のコード。
  // 複雑なロジック、文やローカル変数などを持つかもしれません。
};
```

コンストラクタはどこにも保存されず、単に作られて呼び出されただけなので2度は呼び出せません。なので、このやり方は将来再利用することなく、単一のオブジェクトを構成するコードをカプセル化することを目指しています。
````

<<<<<<< HEAD
## 二重構文コンストラクタ: new.target 
=======
## Constructor mode test: new.target

```smart header="Advanced stuff"
The syntax from this section is rarely used, skip it unless you want to know everything.
```
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

関数の中では、`new.target` プロパティを使うことで、それが `new` で呼ばれたかそうでないかを確認することができます。

通常の呼び出しでは空であり、 `new` で呼び出された場合は関数と等しくなります:

```js run
function User() {
  alert(new.target);
}

<<<<<<< HEAD
// new なし:
=======
// without "new":
*!*
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
User(); // undefined
*/!*

<<<<<<< HEAD
// new あり:
=======
// with "new":
*!*
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
new User(); // function User { ... }
*/!*
```

<<<<<<< HEAD
これは、 `new` の場合と、通常呼び出し両方の構文が同じように動作するようにするために使用できます:
=======
That can be used inside the function to know whether it was called with `new`, "in constructor mode", or without it, "in regular mode".

We can also make both `new` and regular calls to do the same, like this:
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

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
このアプローチは、構文をより柔軟にするためにライブラリの中で使われることがあります。が、恐らくどこへでもこれを使うのは良いことではありません。なぜなら、 `new` を省略すると、何をしているのかが少し分かりにくくなるからです。 `new` があれば、新しいオブジェクトが作られることを知ることができます。
=======
This approach is sometimes used in libraries to make the syntax more flexible. So that people may call the function with or without `new`, and it still works.

Probably not a good thing to use everywhere though, because omitting `new` makes it a bit less obvious what's going on. With `new` we all know that the new object is being created.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

## コンストラクタからの返却 

通常、コンストラクタは `return` 文を持ちません。コンストラクタの仕事は必要なものをすべて `this` の中に書くことです。それが自動的に結果になります。

しかし、もし `return` 文があった場合はどうなるでしょう。ルールはシンプルです:

<<<<<<< HEAD
- もし `return` がオブジェクトと一緒に呼ばれた場合、`this` の代わりにそれを返します。
- もし `return` がプリミティブと一緒に呼ばれた場合、それは無視されます。
=======
- If `return` is called with an object, then the object is returned instead of `this`.
- If `return` is called with a primitive, it's ignored.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

言い換えると、オブエジェクトの`return` はそのオブジェクトを返し、それ以外のケースでは `this` が返却されます。

例えば、ここで `return` は オブジェクトを返却することで、`this` を上書きします:

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
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
```

また、これは空の `return` の例です(`return` の後に プリミティブを置いた場合も同じです)

```js run
function SmallUser() {

  this.name = "John";

<<<<<<< HEAD
  return; // 実行が終了し, this を返す

  // ...

=======
  return; // <-- returns this
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
}

alert( new SmallUser().name );  // John
```

通常、コンストラクタは `return` 文を持ちません。ここでは、主に完全性のためにオブジェクトを返す特殊な動作について説明しています。

````smart header="丸括弧の省略"
ところで、もし引数を取らない場合は、`new` の後の丸括弧を省略することもできます。

```js
let user = new User; // <-- 括弧なし
// これと同じ
let user = new User();
```

丸括弧の省略は "良いスタイル" ではありませんが、仕様では許可されています。
````

## コンストラクタの中のメソッド 

オブジェクトを作るとき、コンストラクタ関数を使用することで高い柔軟性を得ることができます。コンストラクタ関数はオブジェクトがどのように組み立てられるか、その中に何を置くかを定義するパラメータを持っています。

もちろん、`this` にプロパティだけでなく、同様にメソッドも追加することができます。

例えば、下の `new User(name)` は `name` と メソッド `sayHi` を持つオブジェクトを作ります:

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
## サマリ 
=======
To create complex objects, there's a more advanced syntax, [classes](info:classes), that we'll cover later.

## Summary
>>>>>>> 524d59884650be539544c34f71d821432b7280fd

- コンストラクタ関数、もしくは手短にコンストラクタ、は通常の関数ですが大文字から始まる名前を持つと言う共通の合意があります。
- コンストラクタ関数は `new` を使ってのみ呼び出されるべきです。この呼び出しは、最初に空の `this` を作成し、最後に追加された `this` を返すことを意味します。

複数の似たようなオブジェクトを作るときにコンストラクタ関数を使うことができます。

JavaScript は多くの組み込みのオブジェクトでコンストラクタを提供しています: 日付のための `Date`, セットのための `Set`、そしてその他私たちが学ぶ予定のものなどです。

```smart header="オブジェクト, 我々は戻ってきます!"
このチャプターでは、オブジェクトとコンストラクタについての基礎のみを説明しています。これらは、次のチャプターでデータ型と関数についてより深く学ぶために不可欠です。

<<<<<<< HEAD
それを学んだ後、チャプター <info:object-oriented-programming> では、オブジェクトに戻り、継承やクラスを含めそれらを詳細に説明します。
=======
After we learn that, we return to objects and cover them in-depth in the chapters <info:prototypes> and <info:classes>.
>>>>>>> 524d59884650be539544c34f71d821432b7280fd
```
