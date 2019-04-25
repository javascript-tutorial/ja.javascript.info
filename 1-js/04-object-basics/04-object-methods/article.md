# オブジェクトメソッド, "this"

オブジェクトは通常、ユーザや注文などのような、実世界のエンティティを表現するために作られます。:

```js
let user = {
  name: "John",
  age: 30
};
```

そして、実世界ではユーザは *アクション* することができます: ショッピングカードから何かを選んだり、ログイン、ログアウトなど。

アクションは、JavaScriptではプロパティの中で関数で表現されます。

<<<<<<< HEAD
[cut]

## メソッド例 
=======
## Method examples
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

スタートとして、`user` が Hello と言うようにしましょう:

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("Hello!");
};
*/!*

user.sayHi(); // Hello!
```

ここでは関数を作るために関数式を使い、それをオブジェクトの `user.sayHi` プロパティに代入しました。

その後、関数を呼ぶことができます。ユーザは今話すことができます!

オブジェクトのプロパティの関数は、*メソッド* と呼ばれます。

従って、ここではオブジェクト `user` のメソッド `sayHi` を作りました。

もちろん、次のように、宣言済みの関数をメソッドとして使うこともできます:

```js run
let user = {
  // ...
};

*!*
// 最初、宣言
function sayHi() {
  alert("Hello!");
};

// その後、メソッドを追加
user.sayHi = sayHi;
*/!*

user.sayHi(); // Hello!
```

```smart header="オブジェクト指向プログラミング"
エンティティを表現するためにオブジェクトを使ってコードを書くとき、それは、[object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), 略すと "OOP" とばれます。

<<<<<<< HEAD
OOPは大きなものであり、それ自体の興味深い科学です。 正しいエンティティを選択するにはどうすればいいですか？ どのようにそれらの間の相互作用を整理しますか？それはアーキテクチャーであり、それらは E.Gamma, R.Helm, R.Johnson, J.Vissides による"Design Patterns: Elements of Reusable Object-Oriented Software" または G.Booch による "Object-Oriented Analysis and Design with Applications" などのような、そのトピックについての素晴らしい本があります。私たちは、チャプター <info:object-oriented-programming> の後半でそのトピックの表面について触れます。
=======
OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E.Gamma, R.Helm, R.Johnson, J.Vissides or "Object-Oriented Analysis and Design with Applications" by G.Booch, and more. 
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb
```
### メソッドの短縮表現

オブジェクトリテラルでは、メソッドのための短縮構文があります:

```js
// これらのオブジェクトは同じことをします

let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// メソッド簡略化はスッキリ見えますね
let user = {
*!*
  sayHi() { // "sayHi: function()" と同じです
*/!*
    alert("Hello");
  }
};
```

上の通り、`"function"` を除き、単に `sayHi()` と書くことができます。

実を言うと、この表記は完全に同一ではありません。オブジェクトの継承(後で説明します)に関して微妙な違いがあります。が、今のところは問題ありません。ほぼ全てのケースでこの短縮構文は好まれます。

## メソッド中の "this" 

オブジェクトメソッドが処理をするために、オブジェクトに格納されている情報にアクセスする必要があることは一般的です。

例えば、`user.sayHi()` の内側のコードが `user` の名前を必要とするかもしれません。

**オブジェクトにアクセスするために、メソッドは `this` キーワードを使うことができます。**

`this` の値はメソッドを呼び出すのに使われた "ドットの前" のオブジェクトです。

例:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

ここで `user.sayHi()` の実行中、`this` の値は `user` になります。

技術的には、`this` なしでもオブジェクトへのアクセスも可能です -- 外部変数経由での参照によって:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "this" の代わりに "user"
*/!*
  }

};
```

...しかし、このようなコードは信頼できません。もし `user` を `admin = user` のように別の変数にコピーすることにし、何かで`user`を上書きすると, 間違ったオブジェクトへアクセスすることになります。

次のような感じです:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // エラーにつながる
*/!*
  }

};


let admin = user;
user = null; // 明らかにするために上書きします

admin.sayHi(); // Whoops! sayHi() の中で古い名前が使われました! エラーです!
```

もし `alert` の内側で、`user.name` の代わりに `this.name` を使うと、コードは動作します。

## "this" はバインドされていません 

JavaScriptでは、 "this" キーワードは他のほとんどのプログラミング言語とは異なる振る舞いをします。まず、どの関数にでも使えます。

このようなコードも構文エラーにはなりません:

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

`this` の値は実行時に評価されます。そしてそれは何にでもなれます。

例えば、異なるオブジェクトから呼ばれた場合、同じ関数でも異なる "this" を持つ可能性があります:

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
// 2つのオブジェクトで同じ関数を使う
user.f = sayHi;
admin.f = sayHi;
*/!*

// これらの呼び出しは異なる this を持ちます
// 関数の中の "this" は "ドット" の前のオブジェクトです
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ドットでも角括弧でも問題なくメソッドにアクセスできます)
```

実際、オブジェクトまったくなしで関数を呼び出すこともできます:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

このケースでは、 strict モードでは `this` は `undefined` になります。もし `this.name` にアクセスしようとするとエラーになります。

<<<<<<< HEAD
非 strict モード(誰かが `use strict` を忘れた場合)では、このようなケースでは `this` の値は *グローバルオブジェクト* (ブラウザでは `window`, 後ほど学びます)になります。これは `"use strict"` が修正した歴史的な振る舞いです。
=======
In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

一般的に、オブジェクトなしで `this` を使う関数の呼び出しは、普通ではなくプログラム上の誤りであることに注意してください。もし関数が `this` を持っていたら、それは通常オブジェクトコンテキストで呼ばれることを意味しています。

```smart header="バインドしていない `this` の結果"
もしあなたが別のプログラミング言語から来ていたら、恐らく "`this` のバインド" の考えに慣れているでしょう。それは、オブジェクトに定義されたメソッドは常にそのオブジェクトを参照する `this` を持っている、と言うものです。

JavaScriptでは、 `this` は "自由" です。その値は実行時に評価され、メソッドが宣言されている場所には依存せず、 "ドットの前の" オブジェクトが何であるか、に依存します。

実行時に評価される `this` の概念はプラスとマイナス両方を持っています。一方では、関数は異なるオブジェクトで再利用することができます。他方では、より大きな柔軟性はミスを導きやすいです。

ここで、我々のポジションはこの言語が決めたことが良いか悪いかを判断するものではありません。我々は、それをどうやって使うか、どうやって利益を得るか/問題を回避するかを理解することです。
```

## 内部: 参照型 

```warn header="詳細な言語機能"
このセクションでは、特殊なケースをより理解するための高度なトピックについて説明します。

あなたが速く読み進めたいのであれば、スキップまたは別の機会に見てください。
```

複雑なメソッド呼び出しは、 `this` を失う可能性があります。例えば:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

user.hi(); // John (シンプルな呼び出しは動作します)

*!*
// 今、name に応じて user.hi または user.bye を読んでみましょう
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

最後の行では、`user.hi` か `user.bye` を選択する三項演算子があります。このケースでは、結果は `user.hi` です。

メソッドは丸括弧 `()` ですぐに呼び出されます。しかし、それは正しく動きません!

<<<<<<< HEAD
呼び出しはエラーになります、なぜなら、呼び出しの内側の `"this"` の値は `undefined` になるからです。
=======
You can see that the call results in an error, because the value of `"this"` inside the call becomes `undefined`.
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

これは動きます (オブジェクトドットメソッド):
```js
user.hi();
```

これはダメです (評価されたメソッド):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

なぜでしょう？なぜそのようなことが起こるのか理解したい場合、`obj.method()` の呼び出しがどのように機能するのかを理解してみましょう。

よく見ると、 `obj.method()` 文に2つの操作があります:

1. まず、ドット `'.'` がプロパティ `obj.method` を抽出します。
2. 次に、丸括弧 `()` でそれを実行します。

<<<<<<< HEAD
そして、`this` についての情報は最初の処理から２つ目の処理へどのように渡されるでしょう？
=======
So, how does the information about `this` get passed from the first part to the second one?
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

それらの操作を別々の行に書いた場合、`this` が失われるのは明らかでしょう:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
// メソッドの取得呼び出しを2行に分けます
let hi = user.hi;
hi(); // Error, this は undefined なので
*/!*
```

ここで `hi = user.hi` は関数を変数の中においています。そして最後の行は完全に独立しています。なので、`this` がありません。

**`user.hi()` 呼び出しを動作させるために、JavaScriptはトリックを使います -- ドット `'.'` は関数ではなく、特別な[参照型](https://tc39.github.io/ecma262/#sec-reference-specification-type)を返します。**

参照型は "仕様上の型" です。私たちは明示的にそれを使うことはできませんが、言語の中で内部的に使われています。

参照型の値は、３つの値の組み合わせ `(base, name, strict)` です。ここで:

- `base` はオブジェクトです。
- `name` はプロパティです。
- `strict` は `use strict` が効いている場合は true です。

`user.hi` へのプロパティアクセスの結果は、関数ではなく参照型です。strict mode での `user.hi` はこうなります:

```js
// 参照型の値
(user, "hi", true)
```

<<<<<<< HEAD
参照型に対して丸括弧 `()` 呼び出しがされると、それらはオブジェクトとそのメソッドについての完全な情報を受け取り、正しい `this` (このケースでは `user`)をセットできます。
=======
When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`=user` in this case).
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

代入 `hi = user.hi` のような他の操作は、参照型を破棄し、`user.hi`(関数)の値を渡します。従って、それ以降の操作は全て `this` を "失います"。

<<<<<<< HEAD
なので、結果として、`this` の値は、関数がドット `obj.method()`、もしくは角括弧 `obj[method]()`構文を使って直接呼び出された場合のみ正しく渡されます。このチュートリアルの後半では、func.bind() など、この問題を解決するためのさまざまな方法を学びます。
=======
So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). Later in this tutorial, we will learn various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).
>>>>>>> 273e47b70a14ae7a8b882b8d2543e581b000eefb

## アロー関数は "this" を持ちません 

アロー関数は特別です: それらは "自身の" `this` を持ちません。もしこのような関数で `this` を参照した場合、外部の "通常の" 関数から取得されます。

例えば、ここで `arrow()` は外部の `user.sayHi()` メソッドから `this` を使います:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

これはアロー関数の特別な機能です。別の `this` ではなく、外側のコンテキストから取り出したい場合に便利です。<info:arrow-functions>のセクションの後半では、より多くのアロー関数を扱います。


## サマリ 

- オブジェクトのプロパティに格納されている関数は "メソッド" と呼ばれます。
- メソッドを使うと、オブジェクトは `object.doSomething()` のように "振る舞う" ことができます。
- メソッドはオブジェクトを `this` で参照することができます。

`this` の値は実行時に定義されます。
- 関数が宣言されている場合、`this` を使うことができますが、その `this` は関数が呼び出されるまで値を持っていません。
- その関数はオブジェクト間でコピーできます。
- 関数が "メソッド" 構文で呼び出されたとき: `object.method()`, 呼び出し中の `this` の値は、`object` です。

アロー関数は特別であることに注意してください: それは　`this` を持っていません。`this` がアロー関数の中でアクセスされるとき、それは外側から取得されます。
