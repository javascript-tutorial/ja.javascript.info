
# 関数オブジェクト, NFE

<<<<<<< HEAD
既にご存知の通り、JavaScriptの関数は値です。

JavaScriptのすべての値は型を持っています。関数は型は何でしょうか？

JavaScriptでは、関数はオブジェクトです。
=======
As we already know, a function in JavaScript is a value.

Every value in JavaScript has a type. What type is a function?

In JavaScript, functions are objects.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

関数をイメージする良い方法は、呼び出し可能な "アクションオブジェクト" とみなすことです。私たちはそれらを呼び出すだけでなく、オブジェクトとして扱うこともできます: プロパティの追加/削除、参照渡しなど。


## "name" プロパティ

<<<<<<< HEAD
関数オブジェクトには、往々にして使用可能なプロパティが少ししかありません。

例えば、関数名は "name" プロパティとしてアクセス可能です:
=======
Function objects contain some useable properties.

For instance, a function's name is accessible as the "name" property:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

<<<<<<< HEAD
もっと面白いことに、名前を割り当てるロジックはスマートです。 割り当てに使用される関数にも正しい名前を貼り付けます。:
=======
What's kind of funny, the name-assigning logic is smart. It also assigns the correct name to a function even if it's created without one, and then immediately assigned:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi (there's a name!)
```

<<<<<<< HEAD
デフォルト値を通して行われた代入でも動作します:
=======
It also works if the assignment is done via a default value:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (works!)
}

f();
```

仕様では、この機能は "contextual name(文脈上の名前)" と呼ばれます。関数がそれを提供しない場合、代入ではコンテキストから見つけ出されます。

オブジェクトメソッドも名前を持っています。:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

<<<<<<< HEAD
しかし、正しい名前を把握する方法がない場合があります。そのようなとき、name プロパティは次ように空になります。:

```js
// 配列の中で作られた関数
=======
There's no magic though. There are cases when there's no way to figure out the right name. In that case, the name property is empty, like here:

```js run
// function created inside array
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// エンジンには正しい名前を設定する術がないので名前はありません
```

<<<<<<< HEAD
実際には、ほとんどの関数は名前を持っています。
=======
In practice, however, most functions do have a name.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## "length" プロパティ

関数パラメータの数を返す別の組み込みのプロパティ "length" があります。例えば:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

ここで、残りのパラメータはカウントされないことが分かります。

<<<<<<< HEAD
`length` プロパティは、他の関数上で動作する関数で内省のために使われることがあります。

例えば、下のコードでは、`ask` 関数は質問するための `question` と、呼び出すための任意の数の `handler` 関数を受けます。

ユーザが答えたとき、handler を呼びます。私たちは2つの種類の handler を渡すことができます:

- 引数なし関数の場合、肯定的な回答の場合にのみ呼ばれます。
- 引数を持つ関数の場合は、いずれのケースでも呼ばれそこから答えを得ます。

この考え方は、肯定的なケース（最も頻繁に変わるもの）のための単純な引数なしのハンドラ構文があるが、汎用のハンドラも提供できるということです。

`handlers` を正しい方法で呼ぶために、私たちは `length` プロパティを調べます:
=======
The `length` property is sometimes used for [introspection](https://en.wikipedia.org/wiki/Type_introspection) in functions that operate on other functions.

For instance, in the code below the `ask` function accepts a `question` to ask and an arbitrary number of `handler` functions to call.

Once a user provides their answer, the function calls the handlers. We can pass two kinds of handlers:

- A zero-argument function, which is only called when the user gives a positive answer.
- A function with arguments, which is called in either case and returns an answer.

To call `handler` the right way, we examine the `handler.length` property.

The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent variant), but are able to support universal handlers as well:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// 肯定的な解答では、両方のハンドラが呼ばれます
// 否定的な解答では、2つ目だけが呼ばれます
ask("Question?", () => alert('You said yes'), result => alert(result));
```

これは、いわゆる [ポリモーフィズム(polymorphism)](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) と呼ばれる特定のケースです -- 引数を型に応じて、または私たちの場合は `length` に応じた扱いをします。このアイデアはJavaScriptライブラリで使用されています。

## カスタムプロパティ 

我々は、独自のプロパティを追加することもできます。

ここでは、合計の呼び出しカウントを追跡するための `counter` プロパティを追加します:

```js run
function sayHi() {
  alert("Hi");

  *!*
  // 何度実行したかカウントしましょう
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // 初期値

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // 2度呼ばれました
```

```warn header="プロパティは変数ではありません"
`sayHi.counter = 0` のような関数に割り当てられたプロパティは、関数の中でローカル変数 `counter` として定義 *されません* 。言い換えると、プロパティ `counter` と変数 `let counter` は2つの無関係なものです。

<<<<<<< HEAD
私たちは、関数をオブジェクトとして扱うことができ、その中にプロパティを格納することが出来ます。しかしそれはその実行には影響を与えません。変数は関数プロパティを使うことはなく、逆も然りです。これらは単なる2つの並列した言葉です。
```

関数プロパティは時々クロージャを置き換えることができます。例えば、関数プロパティを使うために、チャプター <info:closure> のカウンターの例を書き換えてみます。:
=======
We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.
```

Function properties can replace closures sometimes. For instance, we can rewrite the counter function example from the chapter <info:closure> to use a function property:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function makeCounter() {
  // 次の代わり:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` は今や外部のレキシカル環境ではなく、関数の中に直接格納されています。

<<<<<<< HEAD
クロージャを使うよりも悪いのでしょうか？それとも良いのでしょうか？

主な違いは、`count` の値が外部変数にある場合、外部コードはそこへアクセスすることはできないということです。ネストされた関数だけがそれを変更することができます。:
=======
Is it better or worse than using a closure?

The main difference is that if the value of `count` lives in an outer variable, then external code is unable to access it. Only nested functions may modify it. And if it's bound to a function, then such a thing is possible:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

<<<<<<< HEAD
なので、どちらを選ぶかは私たちの目的次第です。
=======
So the choice of implementation depends on our aims.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## 名前付き関数式(Named Function Expression)

<<<<<<< HEAD
名前付き関数式、または略して NFE は名前を持つ関数式の用語です。
=======
Named Function Expression, or NFE, is a term for Function Expressions that have a name.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

例えば、一般的な関数式を考えてみましょう:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

<<<<<<< HEAD
...そしてそれに名前を追加しましょう:
=======
And add a name to it:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

<<<<<<< HEAD
追加の `"func"` の名前の役割は何でしょう？
=======
Did we achieve anything here? What's the purpose of that additional `"func"` name?
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

最初に、私たちはまだ関数式を持っていることに注意してください。`function` の後に名前 `"func"` を追加しても、関数宣言にはなりません。なぜなら、それはまだ代入式の一部として作成されているためです。

このような名前を追加しても何も破壊しません。

関数は依然として `sayHi()` で利用可能です。:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

<<<<<<< HEAD
そこには、名前 `func` に関して2つの特別なことがあります:

1. 関数の内側から関数を参照することができます。
2. 関数の外側からは見えません。

例えば、下の関数 `sayHi` は、`who` が提供されていない場合、`"Guest"` で自身を再度呼びます。:
=======
There are two special things about the name `func`, that are the reasons for it:

1. It allows the function to reference itself internally.
2. It is not visible outside of the function.

For instance, the function `sayHi` below calls itself again with `"Guest"` if no `who` is provided:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // 自身を再度呼ぶために func を使用
*/!*
  }
};

sayHi(); // Hello, Guest

// しかしこれは動作しません:
func(); // Error, func は未定義(関数の外からは見えません)
```

なぜ `func` を使うのでしょう？単に `sayHi` ではダメなのでしょうか？


実際には、多くのケースでは次のようにできます:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

<<<<<<< HEAD
そのコードの問題は、`sayHi` の値が変わるかもしれないと言うことです。関数は別の変数になり、コードがエラーを吐くようになるかもしれません。:
=======
The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi is not a function
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, 入れ子の sayHi 呼び出しはこれ以上動作しません！
```

関数が外部のレキシカル環境から `sayHi` を取得するために起こります。ローカルの `sayHi` がないので、外部変数が使われます。そして 呼び出しの瞬間、`sayHi` は `null` です。

<<<<<<< HEAD
関数式に入れることができるオプションの名前は、この種の問題を解決するためのものです。

コードを直すためにそれを使ってみましょう:
=======
The optional name which we can put into the Function Expression is meant to solve exactly these kinds of problems.

Let's use it to fix our code:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // 今はすべて問題ありません
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (ネスト呼び出しは機能します)
```

<<<<<<< HEAD
名前 `"func"` は関数ローカルなのでこれでうまく動作します。それは外部のものではありません(外部からは見えません)。仕様は常に現在の関数を参照することを保証します。

外部コードは依然として変数 `sayHi` または後の `welcome` を持っています。そして、`func` は "内部の関数名" であり、自身を呼び出すためのものです。

```smart header="関数宣言に対して、このようなことはありません"
ここで説明された "内部名" の機能は関数式でのみ利用可能で、関数宣言では利用できません。関数宣言に対して、もう１つの "内部" の名前を追加する構文はありません。
=======
Now it works, because the name `"func"` is function-local. It is not taken from outside (and not visible there). The specification guarantees that it will always reference the current function.

The outer code still has its variable `sayHi` or `welcome`. And `func` is an "internal function name", the way for the function to can call itself reliably.

```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

信頼できる内部名が必要なときには、それは関数宣言を名前付けされた関数式の形に書き換える理由になります。
```

## サマリ 

関数はオブジェクトです。

ここでは、私たちはそれらのプロパティをカバーしました:

- `name` -- 関数名です。関数定義で与えられたときだけでなく、代入やオブジェクトのプロパティに対しても存在します。
- `length` -- 関数定義での引数の数です。残りのパラメータはカウントされません。

<<<<<<< HEAD
もし関数が関数式として宣言され(メインコードフローではない所で)、名前を持っている場合、それは名前付けされた関数式と呼ばれます。その名前は再帰呼び出しなどをするために内部で自身を参照するために使うことができます。

また、関数は追加のプロパティをもつ場合があります。多くの知られているJavaScriptライブラリはこの機能を最大限に活用しています。

それらは "メインの" 関数を作り、それに多くの "ヘルパー" 関数を付与します。例えば、[jquery](https://jquery.com) ライブラリは `$` という名前の関数を作ります。[lodash](https://lodash.com) ライブラリは関数 `_` を作ります。そして、 `_.clone`, `_.keyBy` や他のプロパティを追加します(これらについてもっと知りたい場合は、[docs](https://lodash.com/docs) を参照してください)。実際には、グローバル空間の汚染を少なくするために、1つのライブラリで1つのグローバル変数のみが与えられます。 これにより、名前の競合が発生する可能性が低くなります。
=======
- `name` -- the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.

If the function is declared as a Function Expression (not in the main code flow), and it carries the name, then it is called a Named Function Expression. The name can be used inside to reference itself, for recursive calls or such.

Also, functions may carry additional properties. Many well-known JavaScript libraries make great use of this feature.

They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want to learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff


したがって、関数は単独で有益な仕事をすることができ、プロパティには他の機能も備えることができます。
