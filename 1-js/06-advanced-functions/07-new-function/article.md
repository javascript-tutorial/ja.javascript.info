
# "new Function" 構文

関数を作るもう１つの方法があります。ほとんど使われませんが、代替手段がないことがたまにあります。

<<<<<<< HEAD
## 構文

関数を作る構文です:
=======
## Syntax

The syntax for creating a function:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
引数 `arg2...argN` と指定された `functionBody` で関数が作成されます。

例を見ると理解し易いです。以下は2つの引数を持つ関数です:
=======
The function is created with the arguments `arg1...argN` and the given `functionBody`.

It's easier to understand by looking at an example. Here's a function with two arguments:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
引数がない場合は関数本体だけを指定します:
=======
And here there's a function without arguments, with only the function body:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
let sayHi = new Function('alert("Hello")');

sayHi(); // Hello
```

<<<<<<< HEAD
これまで見てきたような他の方法との大きな違いは、関数は文字通り文字列から作られ、実行時に渡されるということです。
=======
The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

これまでのすべての宣言は、プログラマーがスクリプトに関数コードを書く必要がありました。

<<<<<<< HEAD
しかし、`new Function` は任意の文字列を関数にすることができます。例えば、サーバから新しい関数を受け取りそれを実行することができます:

```js
let str = ... サーバから動的にコードを受け取る ...
=======
But `new Function` allows to turn any string into a function. For example, we can receive a new function from a server and then execute it:

```js
let str = ... receive the code from a server dynamically ...
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

let func = new Function(str);
func();
```

<<<<<<< HEAD
これは 複雑なWebアプリケーションでサーバからコードを受け取ったり、テンプレートから動的に関数をコンパイルするような、非常に特定のケースで使われます。

## クロージャ

通常、関数は特別なプロパティ `[[Environment]]` でどこで生成されたかを覚えています。それは作成された場所からレキシカル環境を参照します（<info:closure> の章で説明しました）。

しかし、`new Function` を使用して作られた関数の場合、その `[[Environment]]` は現在のレキシカル環境ではなく、グローバルのレキシカル環境を参照します。

そのため、このような関数は外部変数へのアクセスは持たず、グローバル変数のみとなります。
=======
It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.

## Closure

Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it's created  (we covered that in the chapter <info:closure>).

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.

So, such function doesn't have access to outer variables, only to the global ones.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js run
function getFunc() {
  let value = "test";

*!*
  let func = new Function('alert(value)');
*/!*

  return func;
}

getFunc()(); // error: value は未定義
```

通常の振る舞いとの比較です:

```js run
function getFunc() {
  let value = "test";

*!*
  let func = function() { alert(value); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, getFunc のレキシカル環境から
```

<<<<<<< HEAD
この `new Function` の特殊な機能は奇妙に見えますが、実践では非常に役立ちます。
=======
This special feature of `new Function` looks strange, but appears very useful in practice.

Imagine that we must create a function from a string. The code of that function is not known at the time of writing the script (that's why we don't use regular functions), but will be known in the process of execution. We may receive it from the server or from another source.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

本当に文字列から関数を作る必要がある場合をイメージしてください。その関数のコードはスクリプト生成時には知られていません(そういう訳で通常の関数を使うことができません)が、実行中に認識されます。我々はサーバや別のソースからそれを受け取ることができます。

<<<<<<< HEAD
新しい関数はメインのスクリプトと相互にやり取りが必要です。

外部変数へアクセスしたいときはどうするのでしょうか？

問題はJavaScriptが本番環境に公開される前に、*minifier*（余分なコメントやスペースなどを削除することでコード小さくする特別なプログラム）を使用して圧縮されており、重要なことはローカル変数をより短いものにリネームします。

例えば、もし関数が `let userName` を持っていたとき、minifier はそれを `let a` (または既に使われていれば別の文字) に置き換え、その変数を使用します。変数はローカルであり関数の外部からアクセスすることはできないため、それは通常安全です。また、関数の内側では minifier はそれに関する全ての箇所を置き換えます。Minifiers は賢いので、単なる検索と置換ではなく、コード構造を分析するので問題ありません。

そのため、`new Function` が外部変数へアクセスする場合、リネームされた `userName` を見つけることはできません。

**`new Function` が外部変数へアクセスする場合、minifiers で問題になります。**

加えて、このようなコードはアーキテクチャ的に良くなく、エラーになりやすいです。

`new Function` として作成された関数に何かを渡すには、その引数を使用しなければなりません。

## サマリ 

構文:
=======
What if it could access the outer variables?

The problem is that before JavaScript is published to production, it's compressed using a *minifier* -- a special program that shrinks code by removing extra comments, spaces and -- what's important, renames local variables into shorter ones.

For instance, if a function has `let userName`, minifier replaces it with `let a` (or another letter if this one is occupied), and does it everywhere. That's usually a safe thing to do, because the variable is local, nothing outside the function can access it. And inside the function, minifier replaces every mention of it. Minifiers are smart, they analyze the code structure, so they don't break anything. They're not just a dumb find-and-replace.

So if `new Function` had access to outer variables, it would be unable to find renamed  `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.

## Summary

The syntax:
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
歴史的な理由から、引数はカンマ区切りのリストで与えられます。

これらの3つの意味は同じです:

```js
new Function('a', 'b', ' return a + b; '); // 基本構文
new Function('a,b', ' return a + b; '); // カンマ区切り
new Function('a , b', ' return a + b; '); // スペースありのカンマ区切り
```

`new Function` で作られた関数は グローバルレキシカル環境を参照する `[[Environment]]` を持っており、外部のレキシカル環境ではありません。従って、それらは外部の変数を使うことができません。ですが、それは良いことです。明示的なパラメータ渡しはアーキテクチャ的にはよりよい方法であり、minifierの問題も起きません。
=======
For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
