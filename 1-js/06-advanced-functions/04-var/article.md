
# 古い "var"

<<<<<<< HEAD
[変数](info:variables) の最初の章では、変数を宣言する3つの方法について述べました:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

1. `let`
2. `const`
3. `var`

`let` と `const` は、レキシカル環境に関してまったく同じように振る舞います。

しかし、`var` はそれらとは大きく異なり、そしてそれは非常に古くからのものです。一般的には、 `var` は現在のスクリプトでは使われませんが、古いスクリプトにはまだ潜んでいます。

<<<<<<< HEAD
もしあなたがこのようなスクリプトに出会う予定がなければ、このチャプターをスキップまたは後回しにして構いません。が、後でそれに噛みつかれることがあるかもしれないので注意してください。

[cut]
=======
If you don't plan on meeting such scripts you may even skip this chapter or postpone it, but then there's a chance that it bites you later.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

一見すると、`var` は `let` と同じ振る舞いをします。つまり、変数を宣言します:

```js run
function sayHi() {
  var phrase = "Hello"; // ローカル変数, "var", "let" の代わり

  alert(phrase); // Hello
}

sayHi();

alert(phrase); // Error, phrase は未定義です
```

...しかし、ここには違いがあります。

## "var" はブロックスコープを持ちません 

<<<<<<< HEAD
`var` 変数はのスコープは "関数全体" か "グローバル" のいずれかであり、ブロックを通って見ることができます。
=======
Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

例:

```js run
if (true) {
  var test = true; // "let" の代わりに "var" を使う
}

*!*
alert(test); // true, if の後も変数は生きています
*/!*
```

<<<<<<< HEAD
もし２行目で `let test` を使った場合、`alert` では見えません。しかし `var` はコードブロックを無視するので、グローバルの `test` を取得します。
=======
As `var` ignores code blocks, we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

ループでも同様です: `var` はブロック、またはループのローカルにはなれません:

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" ループ後も見え、それはグローバル変数です
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

上の通り、`var` は `if`, `for` もしくは他のコードブロックを貫通します。それは、JavaScriptは長い間ブロックがレキシカル環境を持っていなかったためです。そして、 `var` はそれを想起させます。

## "var" は関数の開始で処理されます 
=======
alert(phrase); // Error: phrase is not defined (Check the Developer Console)
```

As we can see, `var` pierces through `if`, `for` or other code blocks. That's because a long time ago in JavaScript blocks had no Lexical Environments. And `var` is a remnant of that.

## "var" declarations are processed at the function start
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874

`var` 宣言は、関数の開始時(またはグローバルのスクリプト開始時)に処理されます。

言い換えると、`var` 変数は関数の最初で定義され、定義される場所は関係ありません(定義がネストされた関数ではないと言う仮定で)。

従って、このようなコード:

```js run
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...は技術的にはこれと同じです(`var phrase` を上に移動させています):

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

また、すべての `var` が関数の先頭に "持ち上げられ" ているので、人々はそのような振る舞いを "巻き上げ" とも呼びます。

したがって、上の例では `if (false)` の分岐は決して実行されませんが、それは関係ありません。その内側の `var` は関数の最初に処理されるので、`(*)` の時点で変数は存在します。

**宣言は巻き上げられますが、代入はされません。**

次のコードはその例です:

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

<<<<<<< HEAD
## サマリ 

`var` の大きな違いが2つあります:

1. 変数はブロックスコープを持っておらず、最小のスコープが関数レベルです。
2. 変数宣言は関数開始時に処理されます。

グローバルオブジェクトに関連する小さな違いがもう少しあります。それは次のチャプターで説明します。

これらの違いは、実際にはほとんどの場合で悪いことです。 まず、ブロックローカル変数を作成することができません。また、巻き上げはエラーを引き起こす余地を増やします。 したがって、新しいスクリプトでは、 `var` はほとんど使用されません。
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Unexpected token (

  let message = "Hello";

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

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
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

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, they are visible minimum at the function level.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> a4a84083a7656f2b25de8b766b2457d3aae17874
