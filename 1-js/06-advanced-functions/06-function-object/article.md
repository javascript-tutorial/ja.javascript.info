
# 関数オブジェクト(Function object), NFE

既に知っている通り、JavaScriptの関数は値です。

JavaScriptのすべての値は型を持っています。関数は何の型でしょうか？

JavaScriptでは、関数はオブジェクトです。

関数をイメージする良い方法は、呼び出し可能な "アクションオブジェクト" とみなすことです。私たちはそれらを呼び出すだけでなく、オブジェクトとして扱うこともできます: プロパティの追加/削除、参照渡しなど。


## "name" プロパティ

関数オブジェクトには、往々にして使用可能なプロパティが少ししかありません。

例えば、関数名は "name" プロパティとしてアクセス可能です:

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

もっと面白いことに、名前を割り当てるロジックはスマートです。 割り当てに使用される関数にも正しい名前を貼り付けます。:

```js run
let sayHi = function() {
  alert("Hi");
}

alert(sayHi.name); // sayHi (works!)
```

デフォルト値を通して行われた代入でも動作します:

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

しかし、正しい名前を見つける方法がない場合があります。

その時、このように空になります。:

```js
// function created inside array
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// the engine has no way to set up the right name, so there is none
```

実際には、ほとんどの関数は名前を持っています。

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

`length` プロパティは、他の関数上で動作する関数で内省のために使われることがあります。

例えば、下のコードでは、`ask` 関数は、質問するための `question` と、呼び出すための任意の数の `handler` 関数を受けます。

ユーザが答えたとき、handler を呼びます。私たちは2つの種類の handler を渡すことができます:

- 引数なし関数の場合、肯定的な回答の場合にのみ呼ばれます。
- 引数を持つ関数の場合は、いずれのケースでも呼ばれそこから答えを得ます。

この考え方は、肯定的なケース（最も頻繁に変わるもの）のための単純な引数なしのハンドラ構文があるが、汎用のハンドラも提供できるということです。

`handlers` を正しい方法で呼ぶために、私たちは `length` プロパティを調べます:

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

// for positive answer, both handlers are called
// for negative answer, only the second one
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
  // let's count how many times we run
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // initial value

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```

```warn header="プロパティは変数ではありません"
`sayHi.counter = 0` のような関数に割り当てられたプロパティは、関数の中でローカル変数 `counter` として定義 *されません* 。言い換えると、プロパティ `counter` と変数 `let counter` は2つの無関係なものです。

私たちは、関数をオブジェクトとして扱うことができ、その中にプロパティを格納することが出来ます。しかしそれはその実行には影響を与えません。変数は関数プロパティを使うことはなく、逆も然りです。これらは単なる2つの並列した言葉です。
```

関数プロパティは時々クロージャを置き換えることができます。例えば、関数プロパティを使うために、チャプター <info:closure> のカウンターの例を書き換えてみます。:

```js run
function makeCounter() {
  // instead of:
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

クロージャを使う要理も悪いのでしょうか？それとも良いのでしょうか？

主な違いは、`count` の値が外部変数にある場合、外部コードはそこへアクセスすることはできないということです。ネストされた関数だけがそれを変更することができます。:

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

なので、どちらを選ぶかは私たちの目的次第です。

## 名前付き関数式(Named Function Expression)

名前付き関数式、または略して NFE は名前を持つ関数式の用語です。

例えば、一般的な関数式を考えてみましょう:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

...そしてそれに名前を追加しましょう:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

追加の `"func"` の名前の役割は何でしょう？

最初に、私たちはまだ関数式を持っていることに注意してください。`function` の後に名前 `"func"` を追加しても、関数宣言にはなりません。なぜなら、それはまだ代入式の一部として作成されているためです。

このような名前を追加しても何も破壊しません。

関数は依然として `sayHi()` で利用可能です。:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

そこには、名前 `func` に関して2つの特別なことがあります:

1. 関数の内側から関数を参照することができます。
2. 関数の外側からは見えません。

例えば、下の関数 `sayHi` は、`who` が提供されていない場合、`"Guest"` で自身を再度呼びます。:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // use func to re-call itself
*/!*
  }
};

sayHi(); // Hello, Guest

// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)
```

なぜ `func` を使うのでしょう？単に `sayHi` ではダメなのでしょうか？


実際には、ほとんどのケースでは我々は次のようにできます:

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

そのコードの問題は、`sayHi` の値が変わるかもしれないと言うことです。関数は別の変数になり、コードがエラーを吐くようになるかもしれません。:

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

welcome(); // Error, the nested sayHi call doesn't work any more!
```

関数が外部のレキシカル環境から `sayHi` を取得するために起こります。ローカルの `sayHi` がないので、外部変数が使われます。そして 呼び出しの瞬間、`sayHi` は `null` です。

関数式に入れることができるオプションの名前は、この種の問題を解決するためのものです。

コードを直すためにそれを使ってみましょう:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Now all fine
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (nested call works)
```

これでうまく動作します。なぜなら名前 `"func"` は関数ローカルだからです。それは外部のものではありません(また、外部からは見えません)。
この仕様は常に現在の関数を参照することを保証します。

外部コードは依然として変数 `sayHi` または後の `welcome` を持っています。そして、`func` は "内部の関数名" であり、自身を呼び出すためのものです。

```smart header="関数宣言に対して、このようなことはありません"
ここで説明された "内部名" の機能は関数式でのみ利用可能で、関数宣言では利用できません。関数宣言に対して、もう１つの "内部" の名前を追加する構文はありません。

信頼できる内部名が必要なときには、それは関数宣言を名前付けされた関数式の形に書き換える理由になります。
```

## サマリ

関数はオブジェクトです。

ここでは、私たちはそれらのプロパティをカバーしました:

- `name` -- 関数名です。関数定義で与えられたときだけでなく、代入やオブジェクトのプロパティに対しても存在します。
- `length` -- 関数定義での引数の数です。残りのパラメータはカウントされません。

もし関数が関数式として宣言され(メインコードフローではない所で)、名前を持っている場合、それは名前付けされた関数式と呼ばれます。その名前は再帰呼び出しなどをするために内部で自身を参照するために使うことができます。

また、関数は追加のプロパティをもつ場合があります。多くの知られているJavaScriptライブラリはこの機能を最大限に活用しています。

それらは "メインの" 関数を作り、それに多くの "ヘルパー" 関数を付与します。例えば、[jquery](https://jquery.com) ライブラリは `$` という名前の関数を作ります。[lodash](https://lodash.com) ライブラリは関数 `_` を作ります。そして、 `_.clone`, `_.keyBy` や他のプロパティを追加します(これらについてもっと知りたい場合は、[docs](https://lodash.com/docs) を参照してください)。実際には、グローバル空間の汚染を少なくするために、1つのライブラリで1つのグローバル変数のみが与えられます。 これにより、名前の競合が発生する可能性が低くなります。

したがって、関数は単独で有益な仕事をすることができ、プロパティには他の機能も備えることができます。
