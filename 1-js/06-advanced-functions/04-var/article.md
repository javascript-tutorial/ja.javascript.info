
# 古い "var"

<<<<<<< HEAD
```smart header="この記事は古いスクリプトを理解するためのものです"
この記事の情報は古いスクリプトを理解するのに役立ちます。

新しいコードを記述する方法ではありません。
```

[変数](info:variables) の最初の章では、変数を宣言する3つの方法について述べました:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
`var` 宣言は `let` と同じような振る舞いをします。ほとんどの場合で `let` を `var` あるいは後の逆に置き換えることができ、期待通りに動作するでしょう:

```js run
var message = "Hi";
alert(message); // Hi
```

ですが、内部的には `var` はずっと昔から使われてきた、全く異なるものです。一般的には最近のスクリプトでは利用されていませんが、古いスクリプトには依然として潜んでいます。

このようなスクリプトに出会う予定がないのであれば、この章はスキップするか後回しにしてください。

一方で、古いスクリプトを `var` から `let` に移行する際には奇妙なエラーを避けるために違いを理解することが重要です。

## "var" はブロックスコープを持ちません 

`var` で宣言された変数は、関数スコープかグローバルスコープのいずれかです。ブロックを通って見えます。

例:

```js
if (true) {
  var test = true; // "let" の代わりに "var" を使う
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

*!*
alert(test); // true, if の後も変数は生きています
*/!*
```

<<<<<<< HEAD
`var` はコードブロックを無視するので、グローバルの `test` を取得します。
=======
Variables, declared with `var`, are either function-scoped or global-scoped. They are visible through blocks.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

`var test` の代わりに `let test` を利用すると、変数は `if` の中でのみ見えます:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

<<<<<<< HEAD
ループでも同様です: `var` はブロック、またはループのローカルにはなれません:
=======
As `var` ignores code blocks, we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // ReferenceError: test is not defined
*/!*
```

The same thing for loops: `var` cannot be block- or loop-local:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
<<<<<<< HEAD
alert(i);   // 10, "i" ループ後も見え、それはグローバル変数です
alert(one); // 1, "one" はループ後も見え、それはグローバル変数です
=======
alert(i);   // 10, "i" is visible after loop, it's a global variable
alert(one); // 1, "one" is visible after loop, it's a global variable
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
```

コードブロックが関数の内側にある場合、`var` は関数レベルの変数になります:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // works
}

sayHi();
<<<<<<< HEAD
alert(phrase); // Error: phrase は未定義
```

上の通り、`var` は `if`, `for` もしくは他のコードブロックを貫通します。それは、JavaScriptは長い間ブロックがレキシカル環境を持っていなかったためです。`var` はそれを想起させます。

## "var" は再宣言を許容します
=======
alert(phrase); // ReferenceError: phrase is not defined
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript, blocks had no Lexical Environments, and `var` is a remnant of that.

## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

同じスコープ内で2回 `let` で同じ変数を宣言すると、エラーになります: 

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

`var` では何度でも変数の再宣言が可能です。`var` で既に宣言した変数を使用すると、`var` を無視します。

```js run
<<<<<<< HEAD
var user = "Pete";

var user = "John"; // "var" 花にもしません (宣言済み)
// ...エラーは発生しません

alert(user); // John
```

## "var" は、その使用の下で宣言することができます

`var` 宣言は、関数の開始時(またはグローバルのスクリプト開始時)に処理されます。

言い換えると、`var` 変数は関数の最初で定義され、定義される場所は関係ありません(定義がネストされた関数ではないと言う仮定で)。

なので、以下のコードをみてください:

```js run
=======
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...これは技術的には以下同じです(`var phrase` を上に移動させています):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...もしくはこれです(コードブロックが無視されることを忘れないでください):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

また、すべての `var` が関数の先頭に "持ち上げられ" ているので、人々はそのような振る舞いを "巻き上げ(hoisting/raising)" とも呼びます。

したがって、上の例では `if (false)` の分岐は決して実行されませんが、それは関係ありません。その内側の `var` は関数の最初に処理されるので、`(*)` の時点で変数は存在します。

**宣言は巻き上げられますが、代入はされません。**

<<<<<<< HEAD
次のコードはその例です:
=======
That's best demonstrated with an example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function sayHi() {
  alert(phrase);

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

行 `var phrase = "Hello"` はその中で2つのアクションを持っています:

1. 変数宣言 `var`
2. 変数代入 `=`.

宣言は関数実行の開始時に処理されます("巻き上げ")が、代入は常にそれが出現した場所で行われます。従って、コードは本質的にはこのように動作します:

```js run
function sayHi() {
*!*
  var phrase; // 宣言は最初にされます...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...代入 - 実行がここに来た時にされます.
*/!*
}

sayHi();
```

すべての `var` 宣言が関数開始時に処理されるため、どこからでもそれらを参照することができます。しかし、変数は代入されるまで undefined です。

上の両方の例では、 `alert` はエラーなく動作します。なぜなら変数 `phrase` が存在するからです。しかし、その値は代入されていないので、 `undefied` を表示します。

### IIFE(即時実行関数)

昔は `var` しかなく、ブロックレベルの可視性がないため、プログラマはそれをエミュレートする方法を考案しました。彼らが行ったのは "即時実行関数(immediately-invoked function expressions)" (IIFEと略します) と呼ばれます。

これは最近ではつかうべきものではありませんが、古いスクリプトでは見つけることができます。

IIFE はこのようなものです。:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

ここで、関数式は作成された後、すぐに呼ばれます。従って、コードはすぐに実行され自身のプライベート変数を持ちます。

関数式は括弧 `(function {...})` で囲まれています。なぜなら、JavaScriptはメインコードフローの中で `"function"` を見つけると、関数宣言の開始と理解します。しかし、関数宣言は名前が必須なので、エラーになります。:

```js run
// 宣言を行い、すぐに関数を実行しようとします
function() { // <-- SyntaxError: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

では関数宣言にして名前をつけよう" と思うかもしれませんが、これは動作しません。JavaScriptでは関数宣言をすぐに呼ぶことができません。:

```js run
// 下の括弧による構文エラー
function go() {

}(); // <-- 関数宣言は即時呼び出しできません
```

従って、関数が別の式のコンテキストで作られており、関数式であることを JavaScript に示すには括弧が必要になります。名前なしで、すぐに呼び出せる必要があります。

JavaScriptには、関数式を意味する他の方法があります:

```js run
// IIFE の作成方法

(function() {
  alert("関数を括弧で囲みます");
}*!*)*/!*();

(function() {
  alert("全体を括弧で囲みます");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("NOT 演算子は式を開始します");
}();

*!*+*/!*function() {
  alert("単項プラスは式を開始します");
}();
```

<<<<<<< HEAD
上のすべてのケースで、私たちは関数式を宣言した後すぐに実行することができます。
=======
In both examples above, `alert` runs without an error, because the variable `phrase` exists. But its value is not yet assigned, so it shows `undefined`.

## IIFE

In the past, as there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Here, a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript engine encounters `"function"` in the main code, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Tries to declare and immediately call a function
function() { // <-- SyntaxError: Function statements require a function name

  var message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

*!*(*/!*function() {
  alert("Parentheses around the function");
}*!*)*/!*();

*!*(*/!*function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

## サマリ 

<<<<<<< HEAD
`let/const` と比較して、`var` には大きな違いが2つあります:

1. `var` 変数はブロックスコープを持っておらず、可視性は現在の関数にスコープされ、関数外で宣言されている場合には、グローバルになります。
2. `var` 変数宣言は関数開始時に処理されます（グローバルの場合はスクリプト開始時）

グローバルオブジェクトに関連する小さな違いがもう少しあります。それは次のチャプターで説明します。

これらの違いにより、ほとんどの場合 `var` は `let` よりも不利になります。ブロックレベルの変数はとして役に立ちます。なので、`let` ずいぶん前に標準として導入され、今では `const` と並んで変数を宣言するための主要な手段となっています。
=======
There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, their visibility is scoped to current function, or global, if declared outside function.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
