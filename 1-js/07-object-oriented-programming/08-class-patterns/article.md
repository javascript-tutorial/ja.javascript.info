
# Class パターン

```quote author="Wikipedia"
オブジェクト指向プログラミングでは、*クラス* はオブジェクト生成、状態(メンバ変数)の初期値の提供や振る舞いの実装(メンバ関数またはメソッド)のための拡張可能なプログラムコードテンプレートです。
```

JavaScriptには特別な構文構文とキーワード `class` があります。しかしそれを学ぶ前に、 "クラス" という言葉はオブジェクト指向プログラミングの理論に由来すると考えるべきでしょう。定義は上記で引用されている通り、言語に依存しません。。

JavaScriptでは、`class` キーワードを使わずにクラスを作成する、いくつかのよく知られたプログラミングパターンがあります。そしてここでは最初にそれについて話しましょう。

`class` の構造は次のチャプターで説明しますが、JavaScriptでは、それは "シンタックスシュガー" であり、ここで学ぶパターンの1つの拡張です。

[cut]


## 関数クラスパターン 

下のコンストラクタ関数は定義に従って、"クラス" と考えることができます。:

```js run
function User(name) {
  this.sayHi = function() {
    alert(name);
  };
}

let user = new User("John");
user.sayHi(); // John
```

それは定義のすべての部分に従います:

1. オブジェクトを作成する (`new` で呼び出し可能) ための "プログラムコードテンプレート" である。
2. 状態 (パラメータから `name`) の初期値を提供する。
3. メソッド (`sayHi`) を提供する。

これは、*関数的なクラスパターン(functional class pattern)* と呼ばれます。

関数的なクラスパターンでは、`this` に割り当てられていない `User` の中のローカル変数とネストされた関数は内側からは見えますが、外のコードからはアクセスできません。

なので、私たちは簡単に内部関数や変数を追加することができます。次の `calcAge()` のように:

```js run
function User(name, birthday) {

*!*
  // User 内の他のメソッドからのみ見えます
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }
*/!*

  this.sayHi = function() {
    alert(name + ', age:' + calcAge());
  };
}

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

このコードでは、変数 `name`, `birthday` と関数 `calcAge()` はオブジェクトに対しては内部、*private* です。それはその内側からのみ見えます。

一方、`sayHi` は外部、*public* メソッドです。`user` を作成する外部コードはそれにアクセスできます。

このようにして、内部実装の詳細とヘルパーメソッドを外部コードから隠すことができます。 `this`に割り当てられたものだけが外側に見えるようになります。

## ファクトリークラスパターン 

私たちは、`new` を全く使わずにクラスを生成することができます。

このようになります:

```js run
function User(name, birthday) {
  // User 内の他のメソッドからのみ見えます
  function calcAge() {
    return new Date().getFullYear() - birthday.getFullYear();
  }

  return {
    sayHi() {
      alert(name + ', age:' + calcAge());
    }
  };
}

*!*
let user = User("John", new Date(2000,0,1));
*/!*
user.sayHi(); // John
```

ご覧の通り、関数 `User` はパブリックなプロパティとメソッドを持つオブジェクトを返します。このメソッドの唯一のメリットは、`new` を省略できることです。: `let user = new User(...)` の代わりに `let user = User(...)` と書きます。別の側面では、ほとんど関数的なパターンと同じです。

## プロトタイプベースのクラス 

プロトタイプベースのクラスは最も重要で一般的にベストです。 実際には、関数的なクラスパターンとファクトリクラスパターンはほとんど使用されません。

後ほどなぜかをお見せします。

ここでは、プロトタイプを使って同じクラスを再度書いています。:

```js run
function User(name, birthday) {
*!*
  this._name = name;
  this._birthday = birthday;
*/!*
}

*!*
User.prototype._calcAge = function() {
*/!*
  return new Date().getFullYear() - this._birthday.getFullYear();
};

User.prototype.sayHi = function() {
  alert(this._name + ', age:' + this._calcAge());
};

let user = new User("John", new Date(2000,0,1));
user.sayHi(); // John
```

コード構造:

- コンストラクタ `User` は現在のオブジェクトの状態のみを初期化します。
- メソッドは `User.prototype` に追加されています。

ご覧の通り、メソッドは字句的に `function User` の中にはなく、共通のレキシカル環境を共有しません。もし `function User` の内側で変数を宣言した場合、それらはメソッドには見えません。

従って、内部プロパティとメソッドはアンダースコア `"_"` が先頭に追加されているという、広く知られている合意があります。`_name` または `_calcAge()` のように。技術的にはそれは単なる合意であり、外部コードは依然としてそれらにアクセスすることはできます。しかし、ほとんどの開発者は `"_"` の意味を理解しており、外部コードの中でプロフィックスのついたプロパティやメソッドを触らないようにしています。

関数的なパターンと比較した時の利点は次の通りです。:

- 関数的なパターンでは、各オブジェクトにはすべてのメソッドの独自のコピーがあります。 コンストラクタで `this.sayHi = function（）{...}` と他のメソッドの別のコピーを割り当てます。
- プロトタイプ的なパターンでは、すべてのメソッドはすべての user オブジェクトで共有される `User.prototype` にあります。オブジェクト自身はデータだけを保持しています。

従って、プロトタイプパターンはよりメモリ効率が良いです。

...しかし、それだけではありません。プロトタイプを使うと継承を効率的にセットアップすることができます。すべての組み込みのJavaScriptオブジェクトはプロトタイプを使っています。また特別な構文構造があります: "class" は、見た目の良い構文を提供します。 そしてもっと多くのことがありますので、それらと一緒に進んでみましょう。

## クラスのためのプロトタイプベースの継承 

2つのプロトタイプベースのクラスを持っているとしましょう。

`Rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

let rabbit = new Rabbit("My rabbit");
```

![](rabbit-animal-independent-1.png)

...そして `Animal`:

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

let animal = new Animal("My animal");
```

![](rabbit-animal-independent-2.png)

今はそれらは完全に独立しています。

しかし、私たちは `Rabbit` は `Animal` を拡張させたものにしたいです。言い換えると、rabbits は animals をベースとし、`Animal` のメソッドへのアクセスを持ち、自身のメソッドでそれを拡張する必要があります。

プロトタイプの言語ではどういう意味でしょうか？

今、`rabbit` オブジェクトのメソッドは `Rabbit.prototype` にあります。`Rabbit.prototype` にメソッドが見つからない場合, `rabbit` に "フォールバック" として `Animal.prototype` を使ってほしいです。

なので、プロトタイプチェーンは `rabbit` -> `Rabbit.prototype` -> `Animal.prototype` である必要があります。

このように:

![](class-inheritance-rabbit-animal.png)

それを実装するコードは次の通りです:

```js run
// 以前と同じ Animal 
function Animal(name) {
  this.name = name;
}

// すべての animals 食べることができますよね?
Animal.prototype.eat = function() {
  alert(this.name + ' eats.');
};

// 以前と同じ Rabbit
function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype.jump = function() {
  alert(this.name + ' jumps!');
};

*!*
// 継承チェーンを設定します
Rabbit.prototype.__proto__ = Animal.prototype; // (*)
*/!*

let rabbit = new Rabbit("White Rabbit");
*!*
rabbit.eat(); // rabbits も食べることができる
*/!*
rabbit.jump();
```

行 `{*}` はプロトタイプチェーンを設定します。つまり、`rabbit` はまず `Rabbit.prototype` のメソッドを検索し、次に `Animal.prototype` を検索します。そして、完全性のために、もしメソッドが `Animal.prototype` に存在しない場合、`Object.prototype` で検索を継続します。`Animal.prototype` は通常のオブジェクトなので、それを継承しています。

ここはその完全なイメージです。:

![](class-inheritance-rabbit-animal-2.png)

## サマリ 

"クラス" の言葉はオブジェクト指向プログラミングからきています。JavaScriptでは、それは通常関数クラスパターンまたはプロトタイプパターンを意味します。プロトタイプパターンはより協力でメモリ効率がよいので、それを使うことを推奨します。

プロトタイプのパターンによれば：
1. メソッドは `Class.prototype` に格納されます。
2. プロトタイプはお互いから継承します。

次のチャプターでは、`class` キーワードと構造について学びます。プロトタイプクラスを短く書くことができ、いくつかの追加の利点があります。
