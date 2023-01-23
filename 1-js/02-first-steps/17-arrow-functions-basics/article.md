<<<<<<< HEAD
# アロー関数の基本

関数を作成するための、よりシンプルで簡潔な構文がもう1つあります。それはしばしば関数式よりも優れています。

これは "アロー関数" と呼ばれ、次のようになります:

```js
let func = (arg1, arg2, ...argN) => expression
```

...これは引数 `arg1..argN` を取り、それらを使用する `expression` を評価し、その結果を返す関数 `func` を作ります。

言い換えると、次のコードと概ね一緒です:

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
}
```

具体的な例を見てみましょう:
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Let's see a concrete example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* アロー関数は次よりも短い形式です:
=======
/* This arrow function is a shorter form of:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
ご覧の通り、`(a, b) => a + b` は `a` と `b` 、2つの引数を受け取る関数を意味します。実行時に、`a + b` を評価し、結果を返します。

- 引数が1つだけの場合、括弧は省略可能なので、さらに短くできます:

    例:
=======
As you can see, `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    *!*
    let double = n => n * 2;
<<<<<<< HEAD
    // おおよそこちらと同じ: let double = function(n) { return n * 2 }
=======
    // roughly the same as: let double = function(n) { return n * 2 }
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- 引数がない場合、空の括弧が必須です:
=======
- If there are no arguments, parentheses are empty, but they must be present:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

<<<<<<< HEAD
アロー関数は、関数式として同じ方法で使用できます。

例えば、ここでは `welcome()` の例を再び書きます:
=======
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
<<<<<<< HEAD
  () => alert('Hello') :
  () => alert("Greetings!");

welcome(); // ok now
```

アロー関数は、最初は馴染みが無く、読みにくいように見えるかもしれませんが、構造に慣れるとすぐに変わります。

シンプルなワンライナーの処理で、多くの文字を書くのが面倒なときにはとても便利です。

## 複数行のアロー関数

上の例は、`=>` の左から引数を取得し、右側の式を評価しました。

複数の式や文のように、もう少し複雑なものが必要な時があります。それも可能ですが、この場合は波括弧で囲む必要があります。そして、その中で通常の `return` を使います。

このようになります:

```js run
let sum = (a, b) => {  // 波括弧を使って複数行の関数を書けます
  let result = a + b;
*!*
  return result; // 波括弧を使う場合、明示的な return が必要です
=======
  () => alert('Hello!') :
  () => alert("Greetings!");

welcome();
```

Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The arrow functions that we've seen so far were very simple. They took arguments from the left of `=>`, evaluated and returned the right-side expression with them.

Sometimes we need a more complex function, with multiple expressions and statements. In that case, we can enclose them in curly braces. The major difference is that curly braces require a `return` within them to return a value (just like a regular function does).

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return"
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
```smart header="他にもあります"
ここでは、簡潔にするためにアロー関数を賞賛しました。しかし、それだけではありません!!

アロー関数は他にも興味深い機能を持っています。

これらを学ぶためには、最初に JavaScript の他の側面について知る必要があります。なので、後ほどチャプター<info:arrow-functions> で触れます。

今の時点で、我々はすでにワンライナーの処理やコールバック処理のためにアロー関数を使うことができます。
```

## サマリ

アロー関数はワンライナーに対し便利です。2つの種類があります:

1. 波括弧無し: `(...args) => expression` -- 右側は式です: 関数はそれを評価しその結果を返します。
2. 波括弧あり: `(...args) => { body }` -- 括弧があると、関数内で複数の文を書くことができます、しかし何かを返却する場合には、明示的な `return` が必要です。
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for simple actions, especially for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result. Parentheses can be omitted, if there's only a single argument, e.g. `n => n*2`.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
