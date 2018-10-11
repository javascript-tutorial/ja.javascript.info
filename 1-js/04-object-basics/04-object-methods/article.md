# オブジェクトメソッド, "this"

オブジェクトは通常、ユーザや注文などのような、実世界のエンティティを表現するために作られます。:

```js
let user = {
  name: "John",
  age: 30
};
```

そして、実世界ではユーザは *行動* することができます: ショッピングカードから何かを選んだり、ログイン、ログアウトなど。

アクションは、JavaScriptではプロパティの中で関数で表現されます。

[cut]

## メソッド例 [#method-examples]

スタートとして、`user` に Hello と言うように教えましょう:

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

ここで、関数を作るために関数式を使い、それをオブジェクトの `user.sayHi` プロパティに代入しました。

その後、呼ぶことが出来ます。ユーザは今話すことが出来ます!

オブジェクトのプロパティの関数は、*メソッド* と呼ばれます。

従って、ここではオブジェクト `user` のメソッド `sayHi` を作りました。

もちろん、次のように、宣言済みの関数をメソッドとして使うことも出来ます:

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

OOPは大きなものであり、それ自体の興味深い科学です。 正しいエンティティを選択するにはどうすればいいですか？ どのようにそれらの間の相互作用を整理しますか？それはアーキテクチャーであり、それらは E.Gamma, R.Helm, R.Johnson, J.Vissides による"Design Patterns: Elements of Reusable Object-Oriented Software" または G.Booch による "Object-Oriented Analysis and Design with Applications" などのような、そのトピックについての素晴らしい本があります。私たちは、チャプター <info:object-oriented-programming> の後半でそのトピックの表面について触れます。
```
### メソッドの短縮表現

オブジェクトリテラルにおいて、メソッドのための短縮構文があります:

```js
// これらのオブジェクトは同じことをします

let user = {
  sayHi: function() {
    alert("Hello");
  }
};

// メソッド簡略化はよく見えますね
let user = {
*!*
  sayHi() { // "sayHi: function()" と同じです
*/!*
    alert("Hello");
  }
};
```

デモしたように、`"function"` を除き、単に `sayHi()` と書くことが出来ます。

実を言うと、この表記は完全に同一ではありません。オブジェクトの継承(後で説明します)に関して微妙な違いがありますが、今のところは問題ありません。ほぼ全てのケースでこの短縮構文は好まれます。

## メソッド中の "this" [#this-in-methods]

オブジェクトメソッドが、その処理をするために、オブジェクトに格納されている情報にアクセスする必要があることは一般的です。

例えば、`user.sayHi()` の内側のコードが `user` の名前を必要とするかもしれません。

**オブジェクトにアクセスするために、メソッドは `this` キーワードを使うことが出来ます。**

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

...しかし、このようなコードは信頼できません。もし `user` を別の変数にコピーすると決めたら, e.g. `admin = user` と、何かで`user`を上書きすると, 間違ったオブジェクトへアクセスすることになります。

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

もし `alert` の内側で、`user.name` の代わりに `this.name` を使ったら、コードは動作します。

## "this" はバインドされていません [#this-is-not-bound]

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
// 2つのオブエジェクトで同じ関数を使う
user.f = sayHi;
admin.f = sayHi;
*/!*

// これらの呼び出しは異なる this を持ちます
// 関数の中の "this" は "ドット" の前のオブジェクトです
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (ドットまたは角括弧でのメソッドアクセス -- は関係ありません)
```

実際、オブジェクトまったくなしで関数を呼び出すこともできます:

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

このケースでは、 strict モードでは `this` は `undefined` になります。もし `this.name` にアクセスしようとするとエラーになります。

非 strict モード(誰かが `use strict` を忘れた場合)では、このようなケースでは `this` の値は *グローバルオブジェクト* (ブラウザでは `window`, 後ほど学びます)になります。これは `"use strict"` が修正した歴史的な振る舞いです。

一般的に、オブジェクトなしで `this` を使う関数の呼び出しは、通常ではなくプログラム上に誤りであることに注意してください。もし関数が `this` を持っていたら、それは通常オブエジェクトコンテキストで呼ばれることを意味しています。

```smart header="バインドしていない `this` の結果"
もしあなたが別のプログラミング言語から来ていたら、恐らく "`this` のバインド" の考えに慣れているでしょう。それは、オブジェクトに定義されたメソッドは常にそのオブジェクトを参照する `this` を持っている、と言うものです。

JavaScriptでは、 `this` は "自由" です。その値は実行時に評価され、メソッドが宣言されている場所には依存せず、 "ドットの前の" オブジェクトが何であるか、に依存します。

実行時に評価される `this` の概念はプラスとマイナス両方を持っています。一方では、関数は異なるオブジェクトで再利用することができます。他方では、より大きな柔軟性はミスを導きやすいです。

ここで、我々のポジションはこの言語が決めたことが良いか悪いかを判断するものではありません。我々は、それをどうやって使うか、どうやって利益を得るか/問題を回避するかを理解することです。
```

## 内部: 参照型 [#internals-reference-type]

```warn header="詳細な言語機能"
このセクションでは、特定のエッジケースをよりよく理解するための高度なトピックについて説明します。

あなたが速く進めたいのであれば、スキップまたは別の機会に見てください。
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

呼び出しはエラーになります、なぜなら、呼び出しの内側の `"this"` の値は `undefined` になるからです。

これは動きます (オブジェクトドットメソッド):
```js
user.hi();
```

これはダメです (評価されたメソッド):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

なぜでしょう？なぜそのようなことが起こるのか理解したい場合、`obj.method()` の呼び出しがどのように機能するのかを理解してみましょう。

よく見ると、 `obj.method()` 文の2つの操作に気付くかもしれません:

1. まず、ドット `'.'` がプロパティ `obj.method` を抽出します。
2. 次に、丸括弧 `()` でそれを実行します。

そして、`this` についての情報は最初の処理から２つ目の処理へどのように渡されるでしょう？

もしそれらの操作を別々の行に書くとしたら、`this` が失われるのは確かでしょう:

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

ここで `hi = user.hi` は関数を変数の中においています。そして最後の行は完全にスタンドアロンです。なので、`this` がありません。

**`user.hi()` 呼び出しを動作させるために、JavaScriptはトリックを使います -- ドット `'.'` は関数ではなく、特別な[参照型](https://tc39.github.io/ecma262/#sec-reference-specification-type)を返します。**

参照型は "使用型" です。私たちは明示的にそれを使うことはできませんが、言語の中で内部的に使われています。

参照型の値は、３つの値の連結 `(base, name, strict)` です。それは:

- `base` はオブジェクトです。
- `name` はプロパティです。
- `strict` は `use strict` が効いている場合は true です。

`user.hi` へのプロパティアクセスの結果は、関数ではなく参照型です。strict mode での `user.hi` はこうなります:

```js
// Reference Type value
(user, "hi", true)
```

参照型で丸括弧 `()` が呼ばれたとき、それらはオブジェクトとそのメソッドについての完全な情報を受け取り、正しい `this` (このケースでは `user`)をセットできます。

代入 `hi = user.hi` のような他の操作は、総じて参照型を破棄し、`user.hi`(関数)の値を渡します。従って、それ以降の操作は全て `this` を "失います"。

なので、結果として、`this` の値は、関数がドット `obj.method()`、もしくは角括弧 `obj[method]()`構文を使って直接呼び出された場合のみ正しく渡されます。

## アロー関数は "this" を持ちません [#arrow-functions-have-no-this]

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

これはアロー関数の特別な機能です。実際には別の `this`を望むのではなく、外側のコンテキストから取り出すのに便利です。<info:arrow-functions>のセクションの後半では、より多くのアロー関数を扱います。


## サマリ [#summary]

- オブジェクトのプロパティの格納されている関数は "メソッド" と呼ばれます。
- メソッドを使うと、オブジェクトは `object.doSomething()` のように "振る舞う" ことができます。
- メソッドはオブエジェクトを `this` で参照することができます。

`this` の値は実行時に定義されます。
- 関数が宣言されている場合、`this` を使うことができますが、その `this` は関数が呼び出されるまで値を持っていません。
- その関数はオブジェクト間でコピーできます。
- 関数が "メソッド" 構文で呼び出されたとき: `object.method()`, 呼び出し中の `this` の値は、`object` です。

アロー関数は特別であることに注意してください: それは　`this` を持っていません。`this` がアロー関数の中でアクセスされるとき、それは外側から取得されます。
