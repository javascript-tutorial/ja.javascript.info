<<<<<<< HEAD
# アロー関数の基本

関数を作成するための、よりシンプルで簡潔な構文がもう1つあります。それはしばしば関数式よりも優れています。これは "アロー関数" と呼ばれ、次のようになります:
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let func = (arg1, arg2, ...argN) => expression
```

<<<<<<< HEAD
...これは引数 `arg1..argN` を取り、それらを使用する `expression` を評価し、その結果を返す関数 `func` を作ります。

言い換えると、次のコードと概ね一緒です:
=======
...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
<<<<<<< HEAD
}
```

...が、はるかに簡潔ですね。

例を見てみましょう:
=======
};
```

Let's see a concrete example:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* アロー関数は次よりも短い形式です:
=======
/* This arrow function is a shorter form of:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
<<<<<<< HEAD

```

もしも引数が1つだけの場合、括弧は省略可能なので、さらに短くできます:

```js run
// 次と同じです
// let double = function(n) { return n * 2 }
*!*
let double = n => n * 2;
*/!*

alert( double(3) ); // 6
```

もしも引数がない場合、括弧は必須で、空白にします:

```js run
let sayHi = () => alert("Hello!");

sayHi();
```

アロー関数は、関数式として同じ方法で使用できます。

例えば、ここでは `welcome()` の例を再び書きます:
=======
```

As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:

    ```js run
    *!*
    let double = n => n * 2;
    // roughly the same as: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- If there are no arguments, parentheses will be empty (but they should be present):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

<<<<<<< HEAD
アロー関数は、最初は馴染みが無く、読みにくいように見えるかもしれませんが、構造に慣れるとすぐに変わります。

多くの文字を書くのが面倒なとき、シンプルなワンライナーの処理を書くときにはとても便利です。

## 複数行のアロー関数

上の例は、`=>` の左から引数を取得し、右側の式を評価しました。

複数の式や文のように、もう少し複雑なものが必要な時があります。それも可能ですが、この場合は括弧で囲む必要があります。そして、その中で通常の `return` を使います。

このようになります:

```js run
let sum = (a, b) => {  // 波括弧を使って複数行の関数を書けます
  let result = a + b;
*!*
  return result; // 波括弧を使った場合、結果を得るには return を使います
=======
Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
```smart header="他にもあります"
ここでは、簡潔にするためにアロー関数を賞賛しました。しかし、それだけではありません!!

アロー関数は他にも興味深い機能を持っています。後ほどチャプター<info:arrow-functions> で触れます。

今の時点で、我々はすでにワンライナーの処理やコールバック処理のためにアロー関数を使うことができます。
```

## サマリ

アロー関数はワンライナーに対し便利です。2つの種類があります:

1. 括弧無し: `(...args) => expression` -- 右側は式です: 関数はそれを評価しその結果を返します。
2. 括弧あり: `(...args) => { body }` -- 括弧があると、関数内で複数の文を書くことができます、しかし何かを返却する場合には、明確に `return` が必要です。
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> 14e4e9f96bcc2bddc507f409eb4716ced897f91a
